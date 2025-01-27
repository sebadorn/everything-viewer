"use strict";(self.webpackChunkeverything_viewer=self.webpackChunkeverything_viewer||[]).push([[216],{3216:(e,r,n)=>{n.r(r),n.d(r,{default:()=>w});var a={Unkown:0,Grayscale:1,AdobeRGB:2,RGB:3,CYMK:4},o=new Int32Array([0,1,8,16,9,2,3,10,17,24,32,25,18,11,4,5,12,19,26,33,40,48,41,34,27,20,13,6,7,14,21,28,35,42,49,56,57,50,43,36,29,22,15,23,30,37,44,51,58,59,52,45,38,31,39,46,53,60,61,54,47,55,62,63]),t=4017,s=799,i=3406,c=2276,l=1567,f=3784,h=5793,u=2896;function b(e,r){for(var n,a,o=0,t=[],s=16;s>0&&!e[s-1];)s--;t.push({children:[],index:0});var i,c=t[0];for(n=0;n<s;n++){for(a=0;a<e[n];a++){for((c=t.pop()).children[c.index]=r[o];c.index>0;)c=t.pop();for(c.index++,t.push(c);t.length<=n;)t.push(i={children:[],index:0}),c.children[c.index]=i.children,c=i;o++}n+1<s&&(t.push(i={children:[],index:0}),c.children[c.index]=i.children,c=i)}return t[0].children}function v(e,r,n){return 64*((e.blocksPerLine+1)*r+n)}function m(e,r,n,a,t,s,i,c,l){n.precision,n.samplesPerLine,n.scanLines;var f=n.mcusPerLine,h=n.progressive,u=(n.maxH,n.maxV,r),b=0,m=0;function d(){if(m>0)return m--,b>>m&1;if(255==(b=e[r++])){var n=e[r++];if(n)throw"unexpected marker: "+(b<<8|n).toString(16)}return m=7,b>>>7}function p(e){for(var r,n=e;null!==(r=d());){if("number"==typeof(n=n[r]))return n;if("object"!=typeof n)throw"invalid huffman sequence"}return null}function k(e){for(var r=0;e>0;){var n=d();if(null===n)return;r=r<<1|n,e--}return r}function w(e){var r=k(e);return r>=1<<e-1?r:r+(-1<<e)+1}var C=0;var P,g=0;function y(e,r,n,a,o){var t=n%f;r(e,v(e,(n/f|0)*e.v+a,t*e.h+o))}function D(e,r,n){r(e,v(e,n/e.blocksPerLine|0,n%e.blocksPerLine))}var L,x,T,A,U,I,q=a.length;I=h?0===s?0===c?function(e,r){var n=p(e.huffmanTableDC),a=0===n?0:w(n)<<l;e.blockData[r]=e.pred+=a}:function(e,r){e.blockData[r]|=d()<<l}:0===c?function(e,r){if(C>0)C--;else for(var n=s,a=i;n<=a;){var t=p(e.huffmanTableAC),c=15&t,f=t>>4;if(0!==c){var h=o[n+=f];e.blockData[r+h]=w(c)*(1<<l),n++}else{if(f<15){C=k(f)+(1<<f)-1;break}n+=16}}}:function(e,r){for(var n=s,a=i,t=0;n<=a;){var c=o[n];switch(g){case 0:var f=p(e.huffmanTableAC),h=15&f;if(t=f>>4,0===h)t<15?(C=k(t)+(1<<t),g=4):(t=16,g=1);else{if(1!==h)throw"invalid ACn encoding";P=w(h),g=t?2:3}continue;case 1:case 2:e.blockData[r+c]?e.blockData[r+c]+=d()<<l:0==--t&&(g=2==g?3:0);break;case 3:e.blockData[r+c]?e.blockData[r+c]+=d()<<l:(e.blockData[r+c]=P<<l,g=0);break;case 4:e.blockData[r+c]&&(e.blockData[r+c]+=d()<<l)}n++}4===g&&0==--C&&(g=0)}:function(e,r){var n=p(e.huffmanTableDC),a=0===n?0:w(n);e.blockData[r]=e.pred+=a;for(var t=1;t<64;){var s=p(e.huffmanTableAC),i=15&s,c=s>>4;if(0!==i){var l=o[t+=c];e.blockData[r+l]=w(i),t++}else{if(c<15)break;t+=16}}};var G,M,z,H,R=0;for(M=1==q?a[0].blocksPerLine*a[0].blocksPerColumn:f*n.mcusPerColumn,t||(t=M);R<M;){for(x=0;x<q;x++)a[x].pred=0;if(C=0,1==q)for(L=a[0],U=0;U<t;U++)D(L,I,R),R++;else for(U=0;U<t;U++){for(x=0;x<q;x++)for(z=(L=a[x]).h,H=L.v,T=0;T<H;T++)for(A=0;A<z;A++)y(L,I,R,T,A);R++}if(m=0,(G=e[r]<<8|e[r+1])<=65280)throw"marker was not found";if(!(G>=65488&&G<=65495))break;r+=2}return r-u}function d(e,r,n){var a,o,b,v,m,d,p,k,w,C,P=e.quantizationTable;for(C=0;C<64;C++)n[C]=e.blockData[r+C]*P[C];for(C=0;C<8;++C){var g=8*C;0!==n[1+g]||0!==n[2+g]||0!==n[3+g]||0!==n[4+g]||0!==n[5+g]||0!==n[6+g]||0!==n[7+g]?(a=h*n[0+g]+128>>8,o=h*n[4+g]+128>>8,b=n[2+g],v=n[6+g],m=u*(n[1+g]-n[7+g])+128>>8,k=u*(n[1+g]+n[7+g])+128>>8,d=n[3+g]<<4,p=n[5+g]<<4,w=a-o+1>>1,a=a+o+1>>1,o=w,w=b*f+v*l+128>>8,b=b*l-v*f+128>>8,v=w,w=m-p+1>>1,m=m+p+1>>1,p=w,w=k+d+1>>1,d=k-d+1>>1,k=w,w=a-v+1>>1,a=a+v+1>>1,v=w,w=o-b+1>>1,o=o+b+1>>1,b=w,w=m*c+k*i+2048>>12,m=m*i-k*c+2048>>12,k=w,w=d*s+p*t+2048>>12,d=d*t-p*s+2048>>12,p=w,n[0+g]=a+k,n[7+g]=a-k,n[1+g]=o+p,n[6+g]=o-p,n[2+g]=b+d,n[5+g]=b-d,n[3+g]=v+m,n[4+g]=v-m):(w=h*n[0+g]+512>>10,n[0+g]=w,n[1+g]=w,n[2+g]=w,n[3+g]=w,n[4+g]=w,n[5+g]=w,n[6+g]=w,n[7+g]=w)}for(C=0;C<8;++C){var y=C;0!==n[8+y]||0!==n[16+y]||0!==n[24+y]||0!==n[32+y]||0!==n[40+y]||0!==n[48+y]||0!==n[56+y]?(a=h*n[0+y]+2048>>12,o=h*n[32+y]+2048>>12,b=n[16+y],v=n[48+y],m=u*(n[8+y]-n[56+y])+2048>>12,k=u*(n[8+y]+n[56+y])+2048>>12,d=n[24+y],p=n[40+y],w=a-o+1>>1,a=a+o+1>>1,o=w,w=b*f+v*l+2048>>12,b=b*l-v*f+2048>>12,v=w,w=m-p+1>>1,m=m+p+1>>1,p=w,w=k+d+1>>1,d=k-d+1>>1,k=w,w=a-v+1>>1,a=a+v+1>>1,v=w,w=o-b+1>>1,o=o+b+1>>1,b=w,w=m*c+k*i+2048>>12,m=m*i-k*c+2048>>12,k=w,w=d*s+p*t+2048>>12,d=d*t-p*s+2048>>12,p=w,n[0+y]=a+k,n[56+y]=a-k,n[8+y]=o+p,n[48+y]=o-p,n[16+y]=b+d,n[40+y]=b-d,n[24+y]=v+m,n[32+y]=v-m):(w=h*n[C+0]+8192>>14,n[0+y]=w,n[8+y]=w,n[16+y]=w,n[24+y]=w,n[32+y]=w,n[40+y]=w,n[48+y]=w,n[56+y]=w)}for(C=0;C<64;++C){var D=r+C,L=n[C];L=L<=-2056/e.bitConversion?0:L>=2024/e.bitConversion?255/e.bitConversion:L+2056/e.bitConversion>>4,e.blockData[D]=L}}function p(e,r){for(var n=r.blocksPerLine,a=r.blocksPerColumn,o=new Int32Array(64),t=0;t<a;t++)for(var s=0;s<n;s++){d(r,v(r,t,s),o)}return r.blockData}function k(e){return e<=0?0:e>=255?255:0|e}const w=class{constructor(){}load(e){var r=function(e){this.parse(e),this.onload&&this.onload()}.bind(this);if(e.indexOf("data:")>-1){for(var n=e.indexOf("base64,")+7,a=atob(e.substring(n)),o=new Uint8Array(a.length),t=a.length-1;t>=0;t--)o[t]=a.charCodeAt(t);r(a)}else{var s=new XMLHttpRequest;s.open("GET",e,!0),s.responseType="arraybuffer",s.onload=function(){var e=new Uint8Array(s.response);r(e)}.bind(this),s.send(null)}}parse(e){function r(){var r=e[c]<<8|e[c+1];return c+=2,r}function n(){var n=r(),a=e.subarray(c,c+n-2);return c+=a.length,a}function t(e){for(var r=Math.ceil(e.samplesPerLine/8/e.maxH),n=Math.ceil(e.scanLines/8/e.maxV),a=0;a<e.components.length;a++){J=e.components[a];var o=Math.ceil(Math.ceil(e.samplesPerLine/8)*J.h/e.maxH),t=Math.ceil(Math.ceil(e.scanLines/8)*J.v/e.maxV),s=r*J.h,i=64*(n*J.v)*(s+1);J.blockData=new Int16Array(i),J.blocksPerLine=o,J.blocksPerColumn=t}e.mcusPerLine=r,e.mcusPerColumn=n}var s,i,c=0,l=(e.length,null),f=null,h=[],u=[],v=[],d=r();if(65496!=d)throw"SOI not found";for(d=r();65497!=d;){var k,w;switch(d){case 65504:case 65505:case 65506:case 65507:case 65508:case 65509:case 65510:case 65511:case 65512:case 65513:case 65514:case 65515:case 65516:case 65517:case 65518:case 65519:case 65534:var C=n();65504===d&&74===C[0]&&70===C[1]&&73===C[2]&&70===C[3]&&0===C[4]&&(l={version:{major:C[5],minor:C[6]},densityUnits:C[7],xDensity:C[8]<<8|C[9],yDensity:C[10]<<8|C[11],thumbWidth:C[12],thumbHeight:C[13],thumbData:C.subarray(14,14+3*C[12]*C[13])}),65518===d&&65===C[0]&&100===C[1]&&111===C[2]&&98===C[3]&&101===C[4]&&0===C[5]&&(f={version:C[6],flags0:C[7]<<8|C[8],flags1:C[9]<<8|C[10],transformCode:C[11]});break;case 65499:for(var P=r()+c-2;c<P;){var g=e[c++],y=new Int32Array(64);if(g>>4){if(g>>4!=1)throw"DQT: invalid table spec";for(k=0;k<64;k++){y[o[k]]=r()}}else for(k=0;k<64;k++){y[o[k]]=e[c++]}h[15&g]=y}break;case 65472:case 65473:case 65474:if(s)throw"Only single frame JPEGs supported";r(),(s={}).extended=65473===d,s.progressive=65474===d,s.precision=e[c++],s.scanLines=r(),s.samplesPerLine=r(),s.components=[],s.componentIds={};var D,L=e[c++],x=0,T=0;for(S=0;S<L;S++){D=e[c];var A=e[c+1]>>4,U=15&e[c+1];x<A&&(x=A),T<U&&(T=U);var I=e[c+2];w=s.components.push({h:A,v:U,quantizationTable:h[I],quantizationTableId:I,bitConversion:255/((1<<s.precision)-1)}),s.componentIds[D]=w-1,c+=3}s.maxH=x,s.maxV=T,t(s);break;case 65476:var q=r();for(S=2;S<q;){var G=e[c++],M=new Uint8Array(16),z=0;for(k=0;k<16;k++,c++)z+=M[k]=e[c];var H=new Uint8Array(z);for(k=0;k<z;k++,c++)H[k]=e[c];S+=17+z,(G>>4?u:v)[15&G]=b(M,H)}break;case 65501:r(),i=r();break;case 65498:r();var R=e[c++],V=[];for(S=0;S<R;S++){var Y=s.componentIds[e[c++]];J=s.components[Y];var B=e[c++];J.huffmanTableDC=v[B>>4],J.huffmanTableAC=u[15&B],V.push(J)}var O=e[c++],X=e[c++],j=e[c++],E=m(e,c,s,V,i,O,X,j>>4,15&j);c+=E;break;case 65535:255!==e[c]&&c--;break;default:if(255==e[c-3]&&e[c-2]>=192&&e[c-2]<=254){c-=3;break}throw"unknown JPEG marker "+d.toString(16)}d=r()}switch(this.width=s.samplesPerLine,this.height=s.scanLines,this.jfif=l,this.adobe=f,this.components=[],s.components.length){case 1:this.colorspace=a.Grayscale;break;case 3:this.adobe?this.colorspace=a.AdobeRGB:this.colorspace=a.RGB;break;case 4:this.colorspace=a.CYMK;break;default:this.colorspace=a.Unknown}for(var S=0;S<s.components.length;S++){var J;(J=s.components[S]).quantizationTable||null===J.quantizationTableId||(J.quantizationTable=h[J.quantizationTableId]),this.components.push({output:p(0,J),scaleX:J.h/s.maxH,scaleY:J.v/s.maxV,blocksPerLine:J.blocksPerLine,blocksPerColumn:J.blocksPerColumn,bitConversion:J.bitConversion})}}getData16(e,r){if(1!==this.components.length)throw"Unsupported color mode";var n,a,o,t,s,i,c=this.width/e,l=this.height/r,f=0,h=this.components.length,u=new Uint16Array(e*r*h),b=new Uint16Array((this.components[0].blocksPerLine<<3)*this.components[0].blocksPerColumn*8);for(i=0;i<h;i++){for(var m,d,p,k=(n=this.components[i]).blocksPerLine,w=n.blocksPerColumn,C=k<<3,P=0,g=0;g<w;g++)for(var y=g<<3,D=0;D<k;D++){var L=v(n,g,D),x=(f=0,D<<3);for(m=0;m<8;m++){P=(y+m)*C;for(d=0;d<8;d++)b[P+x+d]=n.output[L+f++]}}for(a=n.scaleX*c,o=n.scaleY*l,f=i,s=0;s<r;s++)for(t=0;t<e;t++)p=(0|s*o)*C+(0|t*a),u[f]=b[p],f+=h}return u}getData(e,r){var n,a,o,t,s,i,c,l,f,h,u,b,m,d,p,w=this.width/e,C=this.height/r,P=0,g=this.components.length,y=e*r*g,D=new Uint8Array(y),L=new Uint8Array((this.components[0].blocksPerLine<<3)*this.components[0].blocksPerColumn*8);for(i=0;i<g;i++){for(var x,T,A,U=(n=this.components[i]).blocksPerLine,I=n.blocksPerColumn,q=U<<3,G=0,M=0;M<I;M++)for(var z=M<<3,H=0;H<U;H++){var R=v(n,M,H),V=(P=0,H<<3);for(x=0;x<8;x++){G=(z+x)*q;for(T=0;T<8;T++)L[G+V+T]=n.output[R+P++]*n.bitConversion}}for(a=n.scaleX*w,o=n.scaleY*C,P=i,s=0;s<r;s++)for(t=0;t<e;t++)A=(0|s*o)*q+(0|t*a),D[P]=L[A],P+=g}switch(g){case 1:case 2:break;case 3:if(p=!0,this.adobe&&this.adobe.transformCode?p=!0:void 0!==this.colorTransform&&(p=!!this.colorTransform),p)for(i=0;i<y;i+=g)c=D[i],l=D[i+1],b=k(c-179.456+1.402*(f=D[i+2])),m=k(c+135.459-.344*l-.714*f),d=k(c-226.816+1.772*l),D[i]=b,D[i+1]=m,D[i+2]=d;break;case 4:if(!this.adobe)throw"Unsupported color mode (4 components)";if(p=!1,this.adobe&&this.adobe.transformCode?p=!0:void 0!==this.colorTransform&&(p=!!this.colorTransform),p)for(i=0;i<y;i+=g)c=D[i],l=D[i+1],h=k(434.456-c-1.402*(f=D[i+2])),u=k(119.541-c+.344*l+.714*f),c=k(481.816-c-1.772*l),D[i]=h,D[i+1]=u,D[i+2]=c;break;default:throw"Unsupported color mode"}return D}}}}]);