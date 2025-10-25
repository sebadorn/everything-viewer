# Everything Viewer

**An online viewer for various file formats.**

<img src="./screenshots/2025-07-15_multi.png?raw=true" alt="Screenshot of the web application showing multiple open windows: MIDI player, GIF viewer with single frames, SPLAT viewer using BabylonJS" height="486" /><br>

**Try it: https://sebadorn.github.io/everything-viewer/**

Runs locally in the browser, no files are uploaded to any server. Modules are loaded lazily, so only the contents actually needed for parsing and viewing an opened file will be loaded.


## Supported formats

### 📐 3D models

* A simple viewer (Babylon Viewer) for single-file models in the format `.glb`, `.obj`, `.ply`, `.splat` and `.stl`.

### 🤖 AI

* Show the header data of `.gguf` (GGML Universal File) AI model files.
* Show the header data of `.safetensors` (Safetensors) AI model files.

### 🎧 Audio

* Show the default audio element to play formats supported by the browser.
* Support Midi files (`.mid`) using Tone.js and a custom player UI.

### 🎨 Image

* Shows an image if the browser supports the format.
* Offers a tool for `.gif` files to step through each frame.

### 🩺 Medical

* Uses Cornerstone to view DCM/DICOM and NIFTI files (`.dcm`, `.dicom`, `.nii`) including showing a lot of meta data and playing images as animation if multiple are contained.
	* Also works if drag & dropping a directory of DICOM files. Uses an optionally included `dicomdir` file for the order.

### 📎 Office

* Show `.csv` table data as HTML table.
* Show exported emails in `.eml` format. Lists headers and optionally the body with external resources removed or loaded.
* Show calendar events (`.ical`, `.ics`, `.ifb`, `.vcs`).
* Show visiting cards / vCards (`.vcf`).
* Show the contents of `.msg` files and list its attachments for viewing or extraction. Commonly used format for email exports.
* Show a PDF viewer for `.pdf` files if the browser has PDF.js integrated.

### 📑 Text/Code

* Show the contents of text files with syntax highlighting for various programming/scripting/configuration/markup languages.

### 🎬 Video

* Show the default video element to play formats supported by the browser.

### 📚 Other

* Show single file web archive files (`.mhtml`, `.mht`).
* Show meta data of Torrent identifier files (`.torrent`).
* For `.zip` files show a list of its contents. Does not supported encrypted archives yet.


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
* parse-torrent – https://www.npmjs.com/package/parse-torrent
* Tone.js – https://github.com/Tonejs/Tone.js
* Tone.js/Midi – https://github.com/Tonejs/Midi


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
