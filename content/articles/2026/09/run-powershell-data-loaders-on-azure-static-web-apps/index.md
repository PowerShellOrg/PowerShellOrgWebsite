---
title: "Run PowerShell Data Loaders on Azure Static Web Apps"
description: "Use PowerShell data loaders in Observable Framework and deploy the generated static site to Azure Static Web Apps without relying on the platform's automatic build environment."
author: Andrey Vernigora
authors:
  - Andrey Vernigora
date: "2026-09-28T00:00:00+00:00"
categories:
  - Tools
tags:
  - powershell
  - observable-framework
  - azure-static-web-apps
  - github-actions
  - data-visualization
---

Observable Framework can run PowerShell scripts during a build and expose their
output to interactive pages as static data. The part that needs extra attention is
deployment: the automatic Azure Static Web Apps build does not know about your custom
PowerShell interpreter.

This article shows how to register `.ps1` data loaders, build the site in GitHub
Actions where PowerShell is available, and ask Azure Static Web Apps to deploy the
already-generated files.

## How Observable data loaders work

[Observable Framework](https://observablehq.com/framework/) is a static site
generator for data apps, dashboards, and reports. A page can load a CSV file like
this:

```js
const movies = FileAttachment("movies.csv").csv({typed: true});
```

If `movies.csv` does not exist, Framework looks for a data loader with a double
extension, such as `movies.csv.py` or `movies.csv.js`. It runs the loader during the
build, saves its standard output as a static snapshot, and makes that snapshot
available to the page as `movies.csv`.

Framework supports several interpreters by default and lets us register additional
ones. Add PowerShell to `observablehq.config.js`:

```js
export default {
  root: "src",
  interpreters: {
    ".ps1": ["pwsh"]
  }
};
```

The `pwsh` executable must be installed and available on `PATH` wherever the site is
built.

## Create a PowerShell data loader

Create `src/movies.csv.ps1`:

```powershell
$uri = 'https://raw.githubusercontent.com/vega/vega/main/docs/data/movies.json'
$movies = Invoke-RestMethod -Uri $uri

$movies |
    Select-Object -Property Title, 'Worldwide Gross', 'US Gross', 'IMDB Rating' |
    ConvertTo-Csv -NoTypeInformation
```

The script retrieves JSON, selects the columns needed by the page, and writes CSV to
standard output. That last detail is important: standard output becomes the generated
file. Send diagnostics to the information, warning, or error streams so they do not
corrupt the CSV.

You can test the loader independently:

```powershell
pwsh ./src/movies.csv.ps1
```

Then use it from `src/index.md`:

````markdown
```js
const movies = FileAttachment("movies.csv").csv({typed: true});
```

```js
Inputs.table(movies)
```
````

Run the normal Framework build:

```powershell
npm run build
```

Framework executes the PowerShell loader, caches its result, and includes the
generated CSV in the static output.

## Why the default Azure build can fail

Azure Static Web Apps normally checks out the source and invokes its automatic build
environment. That works until the application requires an interpreter or native tool
that the environment does not provide or configure.

Instead of teaching the automatic builder about every dependency, build the site in
an ordinary GitHub Actions step and deploy only the output directory. This also makes
the failing stage obvious: if a PowerShell loader breaks, the `npm run build` step
fails before deployment starts.

## Keep the Azure configuration in the output

Azure looks for `staticwebapp.config.json` in the deployed directory. If you keep that
file at the project root, copy it after the Observable build.

For example, these scripts in `package.json` build the site into `dist` and copy the
configuration:

```json
{
  "scripts": {
    "build": "rimraf dist && observable build",
    "postbuild": "cp staticwebapp.config.json dist/staticwebapp.config.json"
  }
}
```

The `postbuild` script runs automatically after `npm run build`. For a
cross-platform project, replace `cp` with a small Node.js script.

## Build first, then deploy

The relevant part of the GitHub Actions workflow looks like this:

```yaml
jobs:
  build_and_deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Check out the repository
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Verify PowerShell
        shell: pwsh
        run: $PSVersionTable.PSVersion

      - name: Install dependencies
        run: npm ci

      - name: Build the Observable site
        run: npm run build

      - name: Deploy the prebuilt site
        uses: Azure/static-web-apps-deploy@v1
        with:
          azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN }}
          repo_token: ${{ secrets.GITHUB_TOKEN }}
          action: upload
          app_location: dist
          api_location: ""
          output_location: ""
          skip_app_build: true
```

The last four settings are the key:

- `app_location` points directly to the generated `dist` directory;
- `output_location` is empty because no build happens inside the Azure action;
- `skip_app_build` prevents the Azure action from invoking its automatic builder;
- `staticwebapp.config.json` is already inside `dist`.

Keep the pull-request close job and deployment token generated for your Static Web
App; only replace the build-and-upload portion of the workflow.

## The resulting build pipeline

The finished pipeline has a simple division of responsibility:

1. GitHub Actions provides Node.js and PowerShell.
2. Observable Framework runs `.ps1` data loaders and produces static files.
3. Azure Static Web Apps deploys those files without rebuilding them.

This pattern is not limited to PowerShell. It also works when an Observable project
depends on another interpreter, command-line tool, or native library that is easier to
control in a dedicated build step.

For more detail, see the Observable Framework documentation for
[data loaders](https://observablehq.com/framework/data-loaders) and
[custom interpreters](https://observablehq.com/framework/config#interpreters), plus
the Azure documentation for
[deploying a prebuilt application](https://learn.microsoft.com/azure/static-web-apps/build-configuration#skip-building-front-end-app).
