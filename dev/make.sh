#!/bin/bash
cd "$(dirname "$0")"

# Create folder structure
echo "Create folder structure"
mkdir -p ../web
mkdir -p ../web/u2
mkdir -p ../web/u3
mkdir -p ../web/u4

# Copy static resources
echo "Copy static resources"
cp -r css ../
cp -r js ../
cp -r doc ../
cp -r img ../

# Copy some other resources (u3, u4)
echo "Copy some other resources"
cp -r web/u2/js/ ../web/u2
cp -r web/u3/data ../web/u3
cp -r web/u3/img ../web/u3
cp -r web/u3/js ../web/u3
cp -r web/u4/js ../web/u4

# Run make.sh for doc
echo "Run make.sh for doc"
./doc/make.sh

# Create readme.md
echo "Create readme.md"
cp ./doc/doc.md ../readme.md

# Create static html Files
echo "Create static html Files"
html-partials-compiler index.html > ../index.html
html-partials-compiler web/u2.html > ../web/u2.html
html-partials-compiler web/u3.html > ../web/u3.html
html-partials-compiler web/u4.html > ../web/u4.html
html-partials-compiler web/u2/1_simplemap.html > ../web/u2/1_simplemap.html
html-partials-compiler web/u2/2_syncsimplemap.html > ../web/u2/2_syncsimplemap.html
html-partials-compiler web/u2/3_controls.html > ../web/u2/3_controls.html
html-partials-compiler web/u2/4_eventclick.html > ../web/u2/4_eventclick.html
html-partials-compiler web/u2/5_displaycoordinates.html > ../web/u2/5_displaycoordinates.html
html-partials-compiler web/u2/6_rotation.html > ../web/u2/6_rotation.html
html-partials-compiler web/u2/7_markers.html > ../web/u2/7_markers.html
html-partials-compiler web/u2/8_infowindow.html > ../web/u2/8_infowindow.html
html-partials-compiler web/u2/9_polyline.html > ../web/u2/9_polyline.html
html-partials-compiler web/u2/11_dashedpolyline.html > ../web/u2/11_dashedpolyline.html
html-partials-compiler web/u2/12_drawingpolyline.html > ../web/u2/12_drawingpolyline.html
html-partials-compiler web/u2/13_MultiPolygon.html > ../web/u2/13_MultiPolygon.html
html-partials-compiler web/u2/14_EditingPolygon.html > ../web/u2/14_EditingPolygon.html
html-partials-compiler web/u2/15_GroundOverlay.html > ../web/u2/15_GroundOverlay.html
html-partials-compiler web/u3/15_GeoJSON.html > ../web/u3/15_GeoJSON.html
html-partials-compiler web/u3/16_GeoJSON.html > ../web/u3/16_GeoJSON.html
html-partials-compiler web/u4/17_Proj4Js.html > ../web/u4/17_Proj4Js.html
html-partials-compiler web/u4/18_Proj4JsTransformim.html > ../web/u4/18_Proj4JsTransformim.html
html-partials-compiler web/u4/19_StringFormat.html > ../web/u4/19_StringFormat.html
html-partials-compiler architecture.html > ../architecture.html
html-partials-compiler doc.html > ../doc.html
html-partials-compiler gis.html > ../gis.html

echo "OK"
