"use strict";(self.webpackChunkeverything_viewer=self.webpackChunkeverything_viewer||[]).push([[7911],{27911:(t,e,r)=>{r.r(e),r.d(e,{_HDRTextureLoader:()=>n});var a=r(82814);class n{constructor(){this.supportCascades=!1}loadCubeData(){throw".hdr not supported in Cube."}loadData(t,e,r){const n=new Uint8Array(t.buffer,t.byteOffset,t.byteLength),o=(0,a.NK)(n),i=(0,a.LT)(n,o),h=o.width*o.height,s=new Float32Array(4*h);for(let t=0;t<h;t+=1)s[4*t]=i[3*t],s[4*t+1]=i[3*t+1],s[4*t+2]=i[3*t+2],s[4*t+3]=1;r(o.width,o.height,e.generateMipMaps,!1,(()=>{const t=e.getEngine();e.type=1,e.format=5,e._gammaSpace=!1,t._uploadDataToTextureDirectly(e,s)}))}}},73647:(t,e,r)=>{r.d(e,{D:()=>n});var a=r(79923);class n{static ConvertPanoramaToCubemap(t,e,r,a,n=!1){if(!t)throw"ConvertPanoramaToCubemap: input cannot be null";if(t.length!=e*r*3)throw"ConvertPanoramaToCubemap: input size is wrong";return{front:this.CreateCubemapTexture(a,this.FACE_FRONT,t,e,r,n),back:this.CreateCubemapTexture(a,this.FACE_BACK,t,e,r,n),left:this.CreateCubemapTexture(a,this.FACE_LEFT,t,e,r,n),right:this.CreateCubemapTexture(a,this.FACE_RIGHT,t,e,r,n),up:this.CreateCubemapTexture(a,this.FACE_UP,t,e,r,n),down:this.CreateCubemapTexture(a,this.FACE_DOWN,t,e,r,n),size:a,type:1,format:4,gammaSpace:!1}}static CreateCubemapTexture(t,e,r,a,n,o=!1){const i=new ArrayBuffer(t*t*4*3),h=new Float32Array(i),s=o?Math.max(1,Math.round(a/4/t)):1,u=1/s,w=u*u,f=e[1].subtract(e[0]).scale(u/t),d=e[3].subtract(e[2]).scale(u/t),l=1/t;let c=0;for(let o=0;o<t;o++)for(let i=0;i<s;i++){let i=e[0],C=e[2];for(let e=0;e<t;e++)for(let u=0;u<s;u++){const s=C.subtract(i).scale(c).add(i);s.normalize();const u=this.CalcProjectionSpherical(s,r,a,n);h[o*t*3+3*e+0]+=u.r*w,h[o*t*3+3*e+1]+=u.g*w,h[o*t*3+3*e+2]+=u.b*w,i=i.add(f),C=C.add(d)}c+=l*u}return h}static CalcProjectionSpherical(t,e,r,a){let n=Math.atan2(t.z,t.x);const o=Math.acos(t.y);for(;n<-Math.PI;)n+=2*Math.PI;for(;n>Math.PI;)n-=2*Math.PI;let i=n/Math.PI;const h=o/Math.PI;i=.5*i+.5;let s=Math.round(i*r);s<0?s=0:s>=r&&(s=r-1);let u=Math.round(h*a);u<0?u=0:u>=a&&(u=a-1);const w=a-u-1;return{r:e[w*r*3+3*s+0],g:e[w*r*3+3*s+1],b:e[w*r*3+3*s+2]}}}n.FACE_LEFT=[new a.Pq(-1,-1,-1),new a.Pq(1,-1,-1),new a.Pq(-1,1,-1),new a.Pq(1,1,-1)],n.FACE_RIGHT=[new a.Pq(1,-1,1),new a.Pq(-1,-1,1),new a.Pq(1,1,1),new a.Pq(-1,1,1)],n.FACE_FRONT=[new a.Pq(1,-1,-1),new a.Pq(1,-1,1),new a.Pq(1,1,-1),new a.Pq(1,1,1)],n.FACE_BACK=[new a.Pq(-1,-1,1),new a.Pq(-1,-1,-1),new a.Pq(-1,1,1),new a.Pq(-1,1,-1)],n.FACE_DOWN=[new a.Pq(1,1,-1),new a.Pq(1,1,1),new a.Pq(-1,1,-1),new a.Pq(-1,1,1)],n.FACE_UP=[new a.Pq(-1,-1,-1),new a.Pq(-1,-1,1),new a.Pq(1,-1,-1),new a.Pq(1,-1,1)]},82814:(t,e,r)=>{r.d(e,{I9:()=>w,LT:()=>s,NK:()=>i,VH:()=>h});var a=r(73647);function n(t,e,r,a,n,o){n>0?(n=function(t,e){return e>1023?t*Math.pow(2,1023)*Math.pow(2,e-1023):e<-1074?t*Math.pow(2,-1074)*Math.pow(2,e+1074):t*Math.pow(2,e)}(1,n-136),t[o+0]=e*n,t[o+1]=r*n,t[o+2]=a*n):(t[o+0]=0,t[o+1]=0,t[o+2]=0)}function o(t,e){let r="",a="";for(let n=e;n<t.length-e&&(a=String.fromCharCode(t[n]),"\n"!=a);n++)r+=a;return r}function i(t){let e=0,r=0,a=o(t,0);if("#"!=a[0]||"?"!=a[1])throw"Bad HDR Format.";let n=!1,i=!1,h=0;do{h+=a.length+1,a=o(t,h),"FORMAT=32-bit_rle_rgbe"==a?i=!0:0==a.length&&(n=!0)}while(!n);if(!i)throw"HDR Bad header format, unsupported FORMAT";h+=a.length+1,a=o(t,h);const s=/^-Y (.*) \+X (.*)$/g.exec(a);if(!s||s.length<3)throw"HDR Bad header format, no size";if(r=parseInt(s[2]),e=parseInt(s[1]),r<8||r>32767)throw"HDR Bad header format, unsupported size";return h+=a.length+1,{height:e,width:r,dataPosition:h}}function h(t,e,r=!1){const n=new Uint8Array(t),o=i(n),h=s(n,o);return a.D.ConvertPanoramaToCubemap(h,o.width,o.height,e,r)}function s(t,e){return function(t,e){let r=e.height;const a=e.width;let o,i,h,s,w,f=e.dataPosition,d=0,l=0,c=0;const C=new ArrayBuffer(4*a),p=new Uint8Array(C),P=new ArrayBuffer(e.width*e.height*4*3),g=new Float32Array(P);for(;r>0;){if(o=t[f++],i=t[f++],h=t[f++],s=t[f++],2!=o||2!=i||128&h||e.width<8||e.width>32767)return u(t,e);if((h<<8|s)!=a)throw"HDR Bad header format, wrong scan line width";for(d=0,c=0;c<4;c++)for(l=(c+1)*a;d<l;)if(o=t[f++],i=t[f++],o>128){if(w=o-128,0==w||w>l-d)throw"HDR Bad Format, bad scanline data (run)";for(;w-- >0;)p[d++]=i}else{if(w=o,0==w||w>l-d)throw"HDR Bad Format, bad scanline data (non-run)";if(p[d++]=i,--w>0)for(let e=0;e<w;e++)p[d++]=t[f++]}for(c=0;c<a;c++)o=p[c],i=p[c+a],h=p[c+2*a],s=p[c+3*a],n(g,o,i,h,s,(e.height-r)*a*3+3*c);r--}return g}(t,e)}function u(t,e){let r=e.height;const a=e.width;let o,i,h,s,u,w=e.dataPosition;const f=new ArrayBuffer(e.width*e.height*4*3),d=new Float32Array(f);for(;r>0;){for(u=0;u<e.width;u++)o=t[w++],i=t[w++],h=t[w++],s=t[w++],n(d,o,i,h,s,(e.height-r)*a*3+3*u);r--}return d}const w={RGBE_ReadHeader:i,GetCubeMapTextureData:h,RGBE_ReadPixels:s}}}]);