"use strict";(self.webpackChunkeverything_viewer=self.webpackChunkeverything_viewer||[]).push([[6041],{96041:(e,t,r)=>{r.d(t,{I:()=>n});var i=r(7481);class n extends i.g{constructor(e,t,r,n,s,a=!0,u=!1,h=3,_=0,g,c,x){super(null,s,!a,u,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,g),this.format=n,this._engine&&(this._engine._caps.textureFloatLinearFiltering||1!==_||(h=1),this._engine._caps.textureHalfFloatLinearFiltering||2!==_||(h=1),this._texture=this._engine.createRawTexture(e,t,r,n,a,u,h,null,_,g??0,c??!1),this.wrapU=i.g.CLAMP_ADDRESSMODE,this.wrapV=i.g.CLAMP_ADDRESSMODE,this._waitingForData=!!x&&!e)}update(e){this._getEngine().updateRawTexture(this._texture,e,this._texture.format,this._texture.invertY,null,this._texture.type,this._texture._useSRGBBuffer),this._waitingForData=!1}clone(){if(!this._texture)return super.clone();const e=new n(null,this.getSize().width,this.getSize().height,this.format,this.getScene(),this._texture.generateMipMaps,this._invertY,this.samplingMode,this._texture.type,this._texture._creationFlags,this._useSRGBBuffer);return e._texture=this._texture,this._texture.incrementReferences(),e}isReady(){return super.isReady()&&!this._waitingForData}static CreateLuminanceTexture(e,t,r,i,s=!0,a=!1,u=3){return new n(e,t,r,1,i,s,a,u)}static CreateLuminanceAlphaTexture(e,t,r,i,s=!0,a=!1,u=3){return new n(e,t,r,2,i,s,a,u)}static CreateAlphaTexture(e,t,r,i,s=!0,a=!1,u=3){return new n(e,t,r,0,i,s,a,u)}static CreateRGBTexture(e,t,r,i,s=!0,a=!1,u=3,h=0,_=0,g=!1){return new n(e,t,r,4,i,s,a,u,h,_,g)}static CreateRGBATexture(e,t,r,i,s=!0,a=!1,u=3,h=0,_=0,g=!1,c=!1){return new n(e,t,r,5,i,s,a,u,h,_,g,c)}static CreateRGBAStorageTexture(e,t,r,i,s=!0,a=!1,u=3,h=0,_=!1){return new n(e,t,r,5,i,s,a,u,h,1,_)}static CreateRTexture(e,t,r,s,a=!0,u=!1,h=i.g.TRILINEAR_SAMPLINGMODE,_=1){return new n(e,t,r,6,s,a,u,h,_)}static CreateRStorageTexture(e,t,r,s,a=!0,u=!1,h=i.g.TRILINEAR_SAMPLINGMODE,_=1){return new n(e,t,r,6,s,a,u,h,_,1)}}}}]);