# Everything Viewer

Okay, not *everything*. The idea is to support a bunch of different formats and maybe provide some additional information or tools.


## Supported formats

* 3D models (.glb, .obj, .ply, .splat, .stl)
* Audio – *if the browser supports the format*
	* Midi
* CFB (.msg)
* CSV
* DCM, DICOM
* EML
	* Show the email headers
	* Show the email body with external resources removed
	* Show the email body with loaded external resources
* iCal (.ical, .ics, .ifb, .vcs)
* Image – *if the browser supports the format*
	* GIF: Step through each frame
* NIFTI (.nii)
* PDF – *if the browser has a PDF viewer integrated*
* Text
	* With syntax highlighting for selected languages
* vCard (.vcf)
* Video – *if the browser supports the format*
* ZIP
	* Show a list of the directory structure and files


## Libraries/Packages

* Babylon Viewer – https://www.babylonjs.com/viewer/
* Cornerstone.js – https://www.cornerstonejs.org/
* CSV – https://github.com/vanillaes/csv
* dicomParser – https://github.com/cornerstonejs/dicomParser
* file-type – https://github.com/sindresorhus/file-type
* highlight.js – https://highlightjs.org/
* highlightjs-line-numbers.js – https://wcoder.github.io/highlightjs-line-numbers.js/
* ical.js – https://github.com/mozilla-comm/ical.js
* JSZip – https://github.com/Stuk/jszip
* msgreader – https://github.com/HiraokaHyperTools/msgreader
* omggif – https://github.com/deanm/omggif
* Tone.js – https://github.com/Tonejs/Tone.js
* Tone.js/Midi – https://github.com/Tonejs/Midi
* vCardJS – https://github.com/nilclass/vcardjs


## Setup

```sh
npm install
```


## Run locally for development

```sh
# Build in development mode
npx webpack --mode development
# Change to output directory
cd dist
# Run a local webserver on http://localhost:8000
python3 -m http.server
```


## How to build

```sh
npx webpack --mode production
```
