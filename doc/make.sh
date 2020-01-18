#!/bin/bash
cd "$(dirname "$0")"

# generate pdf from markdown
pandoc -f markdown-implicit_figures -o ./Webharo.pdf doc.md --toc

# generate html from markdown
pandoc -f markdown-implicit_figures -o ../partials/doc.html doc.md --toc
