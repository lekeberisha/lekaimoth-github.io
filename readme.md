---
title: "Webhartografia"
author: Diana Osmani
date: 29.08.2019
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
Projekti përfshin dy git repositories (depot). Depot janë ngarkuar në Github.

| Repository / Depot                                                                  | Përshkrim    | Dukshmëria |
| ----------------------------------------------------------------------------------- | ------------ | ---------- |
| [dianaosmaniii.github.io](https://github.com/dianaosmaniii/dianaosmaniii.github.io) | Webharto     | Publik     |
| [geoserver](https://github.com/dianaosmaniii/geoserver)                             | Webharto GIS | Privat     |

### Github Pages
Përmbajtja e failave (files) statike është paraqitur përmes Github Pages. Këtu përfshihen Ushtrimet (2, 3 dhe 4) si dhe [Webharto GUI](https://dianaosmaniii.github.io/heron-web-harto/webharto) (Heron). Faqja është në dispozicion nën url https://dianaosmaniii.github.io/.

## HTML / CSS / JavaScript
Ushtrimet 2, 3 dhe 4 përdorin teknologji të zakonshme në internet si HTML, CSS dhe JavaScript.

## Heron
[Heron](http://heron-mc.org/) është një aplikacion i bazuar në web për shfaqjen e hartave. Ajo bazohet në [GeoExt JavaScript Toolkit](https://geoext.org/).

Shtresat bazore jane marrë nga [Gjeoportali Shtetëror (RKS)](http://geoportal.rks-gov.net/). Shtresa të tjera ngarkohen nga gjeosverri (Geoserver). Ekzistojnë dy konfigurime gjeoserveri që janë plotësisht identike, por dy adresa të ndryshme: Amazon Cloud (Main) dhe localhost (Backup).


## Geoserver
Unë kam përdorë një sistem i cili është [geoserver](http://geoserver.org/) (open source) për të siguruar shërbimet per shakarimin e gjeodatatave. Konfigurimi i shtresave të ndryshme korrespondon me detyrën. Geoserveri është instaluar në Amazon Cloud (AWS) dhe gjithashtu mund të startohet në sistemin lokal (_localhost_).

## ArcMap
Për krijimin e shtresave individuale (shapefiles) unë përdori aplikacionin [ArcMap](http://desktop.arcgis.com/en/arcmap/).

## Amazone Web Services (Cloud)
[Amazone Web Services](https://aws.amazon.com) ofron shumë shërbime te ndryshme _cloud_. Për qëllimet e mia, unë përdori shërbimin [EC2](https://aws.amazon.com/ec2/) (sistem Linux). Në të ështe instaluar gjeosverri (Geoserver). Heron (Webharto) përdor kto shërbime për [WMS](https://en.wikipedia.org/wiki/Web_Map_Service)/[WMTS](https://en.wikipedia.org/wiki/Web_Map_Tile_Service).

Deployment / Shpërndarje
========================

## dianaosmaniii.github.io

### Shakarko depon
```
git clone https://github.com/dianaosmaniii/dianaosmaniii.github.io.git
```

### Krijo fajlat (files) statike
```shell
# Kujdes: është testetuar vetëm ne sistem Linux
cd dianaosmaniii.github.io.git/dev
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
git clone https://github.com/dianaosmaniii/geoserver.git
```

### Startoje gjeoserverin

#### Windows (localhost)
```batch
cd /geoserver/geoserver-2.15.2/bin
startup.bat
```

#### Linux (AWS)
```shell
cd /geoserver/geoserver-2.15.2/bin
./startup.sh
```

### Ndale gjeoserverin

#### Windows (localhost)
```batch
cd /geoserver/geoserver-2.15.2/bin
shutdown.bat
```

#### Linux (AWS)
```shell
cd /geoserver/geoserver-2.15.2/bin
./shutdown.sh
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
