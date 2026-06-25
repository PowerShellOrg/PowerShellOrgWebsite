---
title: Running Universal Dashboard with Ubuntu and Nginx (With HTTPS!)
authors:
  - Nathaniel Webb (ArtisanByteCrafter)
date: "2019-03-22T14:37:28+00:00"
categories:
  - PowerShell for Admins
  - PowerShell for Developers
  - Tools
aliases:
  - /2019/03/running-universal-dashboard-with-ubuntu-and-nginx-with-https/
---

![Imgur](https://i.imgur.com/Rqj22dX.png)*A basic UniversalDashboard running on nginx* 

## Index {.wp-block-heading}


  - 
    [Prerequisites](#prerequisites)


  - 
    [Configuration](#configuration)


  - 
    [HTTPS (Optional)](#configuring-https)



## Prerequisites {.wp-block-heading}

For this writeup, I'm using Ubuntu 18.04. Software packages are geared toward using that version.

First, we'll need to install our dependencies

There are several ways to install Powershell core on Ubuntu. I recommend [Microsoft's documentation for ubuntu 18.04 here][1]

Once installed, enter Powershell and install the [UniversalDashboard][2] module. This will use the community edition.


`pwsh
PS> Install-Module UniversalDashboard.Community -Scope CurrentUser
`Confirm it is installed:


`PS> Get-Module -ListAvailable
`Next, we need to install our webserver:


`sudo apt install nginx
`## Configuration {.wp-block-heading}

First we need to have a dashboard to run, along with a place to run it.

Create a project directory. This example uses 


`my-site
`at the root of my user profile.


`cd ~
mkdir my-site
cd ./my-site
`Place the following into a file called 


`dashboard.ps1
`and place it at the root of your project:


`$MyDashboard = New-UDDashboard -Title "Nginx Dashboard" -Content {
    New-UDCard -Title "Running UD with Nginx!"
}
Start-UDDashboard -Port 8080 -Dashboard $MyDashboard -Name 'Nginx Dashboard' -Wait
`> 

> NOTE: You may have a dashboard which includes many folders, depending on the structure of your project. In that case, copy the entire folder structure into your project folder
> 
> 
> `> (my-site)
> `> . Make sure
> 
> 
> `> dashboard.ps1
> `> is at the root of this folder.
> 


Now, we need to configure our webserver to act as a reverse-proxy. This is done to make our site available via SSL in a very simple manner.

Let's create a very basic reverse-proxy configuration within nginx. Navigate to 


`/etc/nginx/sites-available
`and remove the 


`default
`file. This file is symlinked to 


`/etc/nginx/sites-enabled/default
`, so remove it as well.

Next, head back to 


`/etc/nginx/sites-available
`and create a file called 


`dashboard.conf`sudo nano dashboard.conf
`Place the following in it:


`server {
    listen        80;
    server_name   mydashboard;
    location / {
        proxy_pass         http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade $http_upgrade;
        proxy_set_header   Connection keep-alive;
        proxy_set_header   Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
    }
}
`Now we need to symlink our proxy's config file to the sites-enabled folder:


`sudo ln -s /etc/nginx/sites-available/dashboard.conf /etc/nginx/sites-enabled/dashboard.conf
`Next, we need it to run as a service so we can control our dashboard with 


`systemctl
`. I'm using Ubuntu, so I'm going to use systemd to manage my service.

Navigate to 


`/etc/systemd/system
`and create a service file for our service:


`sudo nano uddashboard.service
`Place the following in the service file. Note the path in 


`ExecStart
`. This will need to match the path of your project's 


`dashboard.ps1
`file. Also ensure the user specified to run the service has permissions to access your project folder.


`[Unit]
Description=Universal Dashboard Service
After=syslog.target network.target
[Service]
User=nate
Group=nate
Type=simple
StandardOutput=syslog
StandardError=syslog
ExecStart=/usr/bin/pwsh -c "& /home/nate/my-site/dashboard.ps1"
TimeoutStopSec=20
Restart=on-failure
[Install]
WantedBy=multi-user.target
`Now, start your dashboard:


`sudo systemctl start uddashboard.service
`Your site should now be available at http ://localhost:80

Finally, we want to enable our service so that it starts at boot and will attempt error correction if stopped unceremoniously.


`sudo systemctl enable uddashboard.service
`You should now have a fully functioning dashboard.

If you'd like to configure SSL, read on!

## Configuring HTTPS {.wp-block-heading}

For this tutorial, I'm using Let's Encrypt certificates. For more information on how to obtain LE certs, check out the Let's Encrypt documentation on [getting started][3].

Make a directory for your certificates. Exactly where is up to you.


`sudo mkdir /etc/nginx/certs
cd /etc/nginx/certs
`Since I'm using Let's Encrypt, I have 2 certificate files I need to put here - 


`fullchain.pem
`and 


`privkey.pem
`.

Be sure to set permissions on both to 400 (user read-only)


`sudo chmod 400 ./fullchain.pem
sudo chmod 400 ./privkey.pem
`Next, we need to modify our nginx config file to listen on HTTPS.


`sudo nano /etc/nginx/sites-available/dashboard.conf
`Now, we will listen on port 443, and port 80, which will perform a redirect to the secure version of our site:

> 

> NOTE: Change
> 
> 
> `> server_name
> `> to your own servername
> 


`server {
    listen 80;
    return 301 https://$host$request_uri;
}
server {
    listen 443 ssl;
    ssl on;
    server_name uddashboard.lab.natelab.us;
    ssl_protocols TLSv1.2;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_certificate /etc/nginx/certs/fullchain.pem;
    ssl_certificate_key /etc/nginx/certs/privkey.pem;
    location / {
        proxy_pass         http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade $http_upgrade;
        proxy_set_header   Connection keep-alive;
        proxy_set_header   Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
    }
}
`Now, simply reload nginx


`sudo service nginx reload
`You should now have a secure Universal Dashboard server, running as a service. Huzzah!

> 

> *NOTE: *This is a cross-post from my original blog post: 
[https://blog.natelab.us/running-universal-dashboard-with-ubuntu-and-nginx-with-https](https://blog.natelab.us/running-universal-dashboard-with-ubuntu-and-nginx-with-https)
> 


 [1]: https://docs.microsoft.com/en-us/powershell/scripting/install/installing-powershell-core-on-linux?view=powershell-6#ubuntu-1804
 [2]: https://www.poshud.com
 [3]: https://letsencrypt.org/getting-started/
