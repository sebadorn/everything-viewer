"use strict";(self.webpackChunkeverything_viewer=self.webpackChunkeverything_viewer||[]).push([[8827],{88827:(e,s,t)=>{t.d(s,{EXT_texture_avif:()=>n});var r=t(45316),a=t(37812);const l="EXT_texture_avif";class n{constructor(e){this.name=l,this._loader=e,this.enabled=e.isExtensionUsed(l)}dispose(){this._loader=null}_loadTextureAsync(e,s,t){return r.BT.LoadExtensionAsync(e,s,this.name,((a,l)=>{const n=null==s.sampler?r.BT.DefaultSampler:r.l2.Get(`${e}/sampler`,this._loader.gltf.samplers,s.sampler),i=r.l2.Get(`${a}/source`,this._loader.gltf.images,l.source);return this._loader._createTextureAsync(e,n,i,(e=>{t(e)}),void 0,!s._textureInfo.nonColorData)}))}}(0,a.Hg)(l),(0,a.Ye)(l,!0,(e=>new n(e)))}}]);