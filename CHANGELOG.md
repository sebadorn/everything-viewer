# Changelog


## Build 2026-07-12

* **chore:** add dependencies
	* `crypto-browserify@3.12.1`
	* `mailparser@3.9.14`
	* `process@0.11.10`
	* `setimmediate@1.0.5`
	* `stream-browserify@3.0.0`
	* `vm-browserify@1.1.2`
* **chore:** update dependencies
	* `@babylonjs/core@9.13.0`
	* `@babylonjs/loaders@9.13.0`
	* `@babylonjs/materials@9.13.0`
	* `@babylonjs/viewer@9.13.0`
	* `@cornerstonejs/dicom-image-loader@4.22.13`
	* `@cornerstonejs/nifti-volume-loader@4.22.13`
	* `@cornerstonejs/tools@4.22.13`
	* `@kenjiuno/msgreader@1.28.0`
	* `@vanillaes/csv@4.1.3`
	* `copy-webpack-plugin@14.0.0`
	* `css-loader@7.1.4`
	* `css-minimizer-webpack-plugin@8.0.0`
	* `file-type@22.0.1`
	* `mini-css-extract-plugin@2.10.2`
	* `parse-torrent@11.0.21`
	* `sass@1.101.0`
	* `sass-loader@17.0.0`
	* `terser-webpack-plugin@5.6.1`
	* `webpack@5.108.4`
	* `webpack-cli@7.2.1`
* **feat(eml):** support more formats
* **feat(eml):** new tab for attachments
* **fix(eml):** showing content without external resources did not work anymore


## Build 2025-11-16

* **chore:** update dependencies (`@babylonjs/*`, `@cornerstonejs/*`, `file-type`, `highlightjs-line-numbers.js`, `sass`, `sass-loader`)
* **chore:** add screenshot to README and improve its presentation
* **feat:** add language selection, support "en" and "de"
* **fix:** fix check if opened content is directory because Chromium does not support checking for the standard element `FileSystemDirectoryEntry`
* **fix(model3d):** weird graphical glitch with high GPU load caused by tiled background
* **fix(model3d):** prefer BabylonJS to use WebGL instead of WebGPU, because support for WebGPU is not quite there yet in browsers on Linux


## Build 2025-10-12

* **feat(ai):** add support for `.safetensors` AI model files, show info from header


## Build 2025-10-10

* **chore:** update dependencies (`@babylonjs/*`, `@cornerstonejs/*`, `parse-torrent`)
* **feat(mhtml):** add support for single file webpage archives (`.mhtml`, `.mht`)


## Build 2025-10-04

* **chore:** update dependencies (`@babylonjs/*`, `@cornerstonejs/*`, `ical.js`, `@kenjiuno/msgreader`)
* **chore:** remove dependency on `vcardjs`
* **feat(ai):** add support for `.gguf` AI model files, show info from header
* **feat(vcf):** use `ical.js` package instead of `vcardjs` and support more attributes
* **refactor:** reduce initial bundle size by loading more plugin view and parser code only when needed


## Build 2025-08-03

* **chore:** update dependencies (`@babylonjs/*`, `@cornerstonejs/*`)
* **feat:** add favicon
* **feat:** add changelog and include build number on page
* **feat(torrent):** add support for `.torrent` files, show contained info
* **feat(zip):** add own colored symbol for audio files
* **fix:** add build number as cache buster for CSS and main bundle JS
* **fix(nifti):** use font icons for icon buttons


## Build 2025-07-13

* **feat(midi):** add Midi support (`.mid`) including an audio player
