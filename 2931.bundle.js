"use strict";(self.webpackChunkeverything_viewer=self.webpackChunkeverything_viewer||[]).push([[2931],{92931:(e,s,n)=>{n.d(s,{KHR_materials_sheen:()=>l});var r=n(23975),o=n(45316),t=n(26041),h=n(37812);const a="KHR_materials_sheen";class l{constructor(e){this.name=a,this.order=190,this._loader=e,this.enabled=this._loader.isExtensionUsed(a)}dispose(){this._loader=null}loadMaterialPropertiesAsync(e,s,n){return o.BT.LoadExtensionAsync(e,s,this.name,((r,o)=>{const t=new Array;return t.push(this._loader.loadMaterialPropertiesAsync(e,s,n)),t.push(this._loadSheenPropertiesAsync(r,o,n)),Promise.all(t).then((()=>{}))}))}_loadSheenPropertiesAsync(e,s,n){if(!(n instanceof r.Y))throw new Error(`${e}: Material type not supported`);const o=new Array;return n.sheen.isEnabled=!0,n.sheen.intensity=1,null!=s.sheenColorFactor?n.sheen.color=t.v9.FromArray(s.sheenColorFactor):n.sheen.color=t.v9.Black(),s.sheenColorTexture&&o.push(this._loader.loadTextureInfoAsync(`${e}/sheenColorTexture`,s.sheenColorTexture,(e=>{e.name=`${n.name} (Sheen Color)`,n.sheen.texture=e}))),void 0!==s.sheenRoughnessFactor?n.sheen.roughness=s.sheenRoughnessFactor:n.sheen.roughness=0,s.sheenRoughnessTexture&&(s.sheenRoughnessTexture.nonColorData=!0,o.push(this._loader.loadTextureInfoAsync(`${e}/sheenRoughnessTexture`,s.sheenRoughnessTexture,(e=>{e.name=`${n.name} (Sheen Roughness)`,n.sheen.textureRoughness=e})))),n.sheen.albedoScaling=!0,n.sheen.useRoughnessFromMainTexture=!1,Promise.all(o).then((()=>{}))}}(0,h.Hg)(a),(0,h.Ye)(a,!0,(e=>new l(e)))}}]);