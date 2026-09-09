---
title: '{{ replace .File.ContentBaseName "-" " " | title }}'
description: ""
author: ""
authors:
  - ""
date: '{{ .Date }}'
url: '/articles/{{ .Date.Format "2006-01-02" }}-{{ .File.ContentBaseName }}/'
categories: []
tags: []
draft: true
---
