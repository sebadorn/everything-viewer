"use strict";(self.webpackChunkeverything_viewer=self.webpackChunkeverything_viewer||[]).push([[4770],{84770:(e,r,o)=>{o.d(r,{KHR_materials_unlit:()=>n});var t=o(26041),a=o(23975),s=o(45316),l=o(37812);const i="KHR_materials_unlit";class n{constructor(e){this.name=i,this.order=210,this._loader=e,this.enabled=this._loader.isExtensionUsed(i)}dispose(){this._loader=null}loadMaterialPropertiesAsync(e,r,o){return s.BT.LoadExtensionAsync(e,r,this.name,(()=>this._loadUnlitPropertiesAsync(e,r,o)))}_loadUnlitPropertiesAsync(e,r,o){if(!(o instanceof a.Y))throw new Error(`${e}: Material type not supported`);const s=new Array;o.unlit=!0;const l=r.pbrMetallicRoughness;return l&&(l.baseColorFactor?(o.albedoColor=t.v9.FromArray(l.baseColorFactor),o.alpha=l.baseColorFactor[3]):o.albedoColor=t.v9.White(),l.baseColorTexture&&s.push(this._loader.loadTextureInfoAsync(`${e}/baseColorTexture`,l.baseColorTexture,(e=>{e.name=`${o.name} (Base Color)`,o.albedoTexture=e})))),r.doubleSided&&(o.backFaceCulling=!1,o.twoSidedLighting=!0),this._loader.loadMaterialAlphaProperties(e,r,o),Promise.all(s).then((()=>{}))}}(0,l.Hg)(i),(0,l.Ye)(i,!0,(e=>new n(e)))}}]);