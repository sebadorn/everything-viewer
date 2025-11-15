# Changelog


## Build 2025-1x-xx

* **chore:** update dependencies (`@babylonjs/*`, `@cornerstonejs/*`, `file-type`, `highlightjs-line-numbers.js`, `sass`, `sass-loader`)
* **chore:** add screenshot to README and improve its presentation
* **feat:** add language selection, support "en" and "de"


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
