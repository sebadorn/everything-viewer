# Everything Viewer

Okay, not *everything*. The idea is to support different formats and maybe provide some additional information or tools.


## Supported formats

* Audio – *if the browser supports the format*
* CSV
* DCM, DICOM
* EML
	* Show the email headers
	* Show the email body with external resources removed
	* Show the email body with loaded external resources
* iCal
* Image – *if the browser supports the format*
	* GIF: Step through each frame
* PDF – *if the browser has a PDF viewer integrated*
* Text
	* With syntax highlighting for selected languages
* VCF (vCard)
* Video – *if the browser supports the format*
* ZIP
	* Show a list of the directory structure and files


## Libraries

* Cornerstone.js – https://www.cornerstonejs.org/
* CSV – https://github.com/vanillaes/csv
* dicomParser – https://github.com/cornerstonejs/dicomParser
* highlight.js – https://highlightjs.org/
* ical.js – https://github.com/mozilla-comm/ical.js
* JSZip – https://github.com/Stuk/jszip
* omggif – https://github.com/deanm/omggif
* vCardJS – https://github.com/nilclass/vcardjs


## How to build

```sh
npx webpack --mode production
```
