"use strict";(self.webpackChunkeverything_viewer=self.webpackChunkeverything_viewer||[]).push([[6161],{86161:(e,r,a)=>{a.d(r,{KHR_materials_specular:()=>n});var t=a(23975),l=a(45316),s=a(26041),o=a(37812);const c="KHR_materials_specular";class n{constructor(e){this.name=c,this.order=190,this._loader=e,this.enabled=this._loader.isExtensionUsed(c)}dispose(){this._loader=null}loadMaterialPropertiesAsync(e,r,a){return l.BT.LoadExtensionAsync(e,r,this.name,((t,l)=>{const s=new Array;return s.push(this._loader.loadMaterialPropertiesAsync(e,r,a)),s.push(this._loadSpecularPropertiesAsync(t,l,a)),Promise.all(s).then((()=>{}))}))}_loadSpecularPropertiesAsync(e,r,a){if(!(a instanceof t.Y))throw new Error(`${e}: Material type not supported`);const l=new Array;return void 0!==r.specularFactor&&(a.metallicF0Factor=r.specularFactor),void 0!==r.specularColorFactor&&(a.metallicReflectanceColor=s.v9.FromArray(r.specularColorFactor)),r.specularTexture&&(r.specularTexture.nonColorData=!0,l.push(this._loader.loadTextureInfoAsync(`${e}/specularTexture`,r.specularTexture,(e=>{e.name=`${a.name} (Specular)`,a.metallicReflectanceTexture=e,a.useOnlyMetallicFromMetallicReflectanceTexture=!0})))),r.specularColorTexture&&l.push(this._loader.loadTextureInfoAsync(`${e}/specularColorTexture`,r.specularColorTexture,(e=>{e.name=`${a.name} (Specular Color)`,a.reflectanceTexture=e}))),Promise.all(l).then((()=>{}))}}(0,o.Hg)(c),(0,o.Ye)(c,!0,(e=>new n(e)))}}]);