---
title: "Webhartografia"
author: Lekë Berishs
date: 20.01.2020
geometry: margin=1.8cm
output: pdf_document
---

Webhartografia
==============
Web mapping është teknikë e shfrytëzimit të hartave që merren nga një sistem informacioni për të dhënat hapësinore dhe gjeografike (GIS). GIS është më shumë se kuptimi i saj i drejtpërdrejtë dhe shihet nga pikëpamja e shërbimit dhe konsumatorit. Hartat në dispozicion në World Wide Web shërbejnë për qëllime të ndryshme në varësi të llojit të përdoruesit që shërbehet.  GIS njihet edhe si hartim në internet.

Komponentet teknike
===================

## Git
Për projektin tim, unë përdor Git si sisteme të kontrollit të versionit.

### Github
Projekti është ngarkuar në Github.

| Repository / Depot                                                                  | Përshkrim    | Dukshmëria |
| ----------------------------------------------------------------------------------- | ------------ | ---------- |
| [lekeberisha.github.io](https://github.com/lekeberisha/lekeberishs.github.io) | Webharto     | Publik        

### Github Pages
Përmbajtja e failave (files) statike është paraqitur përmes Github Pages. Këtu përfshihen Ushtrimet (2, 3 dhe 4) si dhe [Webharto GUI](https://lekeberisha.github.io/heron-web-harto/webharto) (Heron). Faqja është në dispozicion nën url https://lekeberisha.github.io/.

## HTML / CSS / JavaScript
Ushtrimet 2, 3 dhe 4 përdorin teknologji të zakonshme në internet si HTML, CSS dhe JavaScript.

## Heron
[Heron](http://heron-mc.org/) është një aplikacion i bazuar në web për shfaqjen e hartave. Ajo bazohet në [GeoExt JavaScript Toolkit](https://geoext.org/).

Shtresat bazore jane marrë nga [Gjeoportali Shtetëror (RKS)](http://geoportal.rks-gov.net/). Shtresa të tjera ngarkohen nga gjeosverri (Geoserver). Konfigurimi i gjeoserverit është locsl.


## Geoserver
Unë kam përdorë një sistem i cili është [geoserver](http://geoserver.org/) (open source) për të siguruar shërbimet per shakarimin e gjeodatatave. Konfigurimi i shtresave të ndryshme korrespondon me detyrën. Geoserveri është instaluar në localhost dhe  startohet në sistemin lokal (_localhost_).

## ArcMap
Për krijimin e shtresave individuale (shapefiles) unë përdori aplikacionin [ArcMap](http://desktop.arcgis.com/en/arcmap/).

Deployment / Shpërndarje
========================

## lekeberisha.github.io

### Shakarko depon
```
git clone https://github.com/lekeberisha/lekeberisha.github.io.git
```

### Krijo fajlat (files) statike
```shell
# Kujdes: është testetuar vetëm ne sistem Linux
cd lekeberisha.github.io.git/dev
./make.sh
```

### Ngarko ndryshimet ne Github (depon)
```shell
# git add ...
# git commit ...
git push
```

## geoserver

### Shakarko depon
```
git clone https://github.com/lekeberishs/geoserver.git
```

### Startoje gjeoserverin

#### Windows (localhost)
```batch
cd /geoserver/geoserver-2.15.2/bin
startup.bat
```

### Ndale gjeoserverin

#### Windows (localhost)
```batch
cd /geoserver/geoserver-2.15.2/bin
shutdown.bat
```


### Ngarko ndryshimet ne Github (depon)
```shell
# git add ...
# git commit ...
git push
```

Arkitektura e sistemit
======================
![Arkitektura e sistemit](../doc/architecture.png)
