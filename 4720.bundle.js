"use strict";(self.webpackChunkeverything_viewer=self.webpackChunkeverything_viewer||[]).push([[4720],{4720:(t,r,e)=>{e.d(r,{D:()=>u,Dx:()=>f,Es:()=>h,F4:()=>b,Gx:()=>v,K$:()=>w,KV:()=>m,Ko:()=>d,Nf:()=>y,P_:()=>x,Qd:()=>n,RI:()=>l,Sp:()=>_,U_:()=>C,Vv:()=>c,Yd:()=>p,aZ:()=>T,cZ:()=>M,k4:()=>g,x2:()=>V});var n,a=e(79923),s=e(26041),o=e(90868),i=e(57565);!function(t){t.Any="any",t.String="string",t.Number="number",t.Boolean="boolean",t.Object="object",t.Integer="FlowGraphInteger",t.Vector2="Vector2",t.Vector3="Vector3",t.Vector4="Vector4",t.Quaternion="Quaternion",t.Matrix="Matrix",t.Matrix2D="Matrix2D",t.Matrix3D="Matrix3D",t.Color3="Color3",t.Color4="Color4"}(n||(n={}));class u{constructor(t,r,e=-1){this.typeName=t,this.defaultValue=r,this.animationType=e}serialize(t){t.typeName=this.typeName,t.defaultValue=this.defaultValue}}const c=new u("any",void 0),m=new u("string",""),h=new u("number",0,0),l=new u("boolean",!1),w=new u("Vector2",a.I9.Zero(),5),f=new u("Vector3",a.Pq.Zero(),1),d=new u("Vector4",a.IU.Zero()),_=new u("Matrix",a.uq.Identity(),3),M=new u("Matrix2D",new i.K),b=new u("Matrix3D",new i.z),y=new u("Color3",s.v9.Black(),4),v=new u("Color4",new s.ov(0,0,0,0),7),x=new u("Quaternion",a.PT.Identity(),2);x.typeTransformer=t=>t.getClassName&&"Vector4"===t.getClassName()?a.PT.FromArray(t.asArray()):t.getClassName&&"Vector3"===t.getClassName()?a.PT.FromEulerVector(t):t.getClassName&&"Matrix"===t.getClassName()?a.PT.FromRotationMatrix(t):t;const V=new u("FlowGraphInteger",new o.P(0),0);function g(t){const r=t;switch(typeof t){case"string":return m;case"number":return h;case"boolean":return l;case"object":if(r.getClassName)switch(r.getClassName()){case"Vector2":return w;case"Vector3":return f;case"Vector4":return d;case"Matrix":return _;case"Color3":return y;case"Color4":return v;case"Quaternion":return x;case"FlowGraphInteger":return V;case"Matrix2D":return M;case"Matrix3D":return b}return c;default:return c}}function p(t){switch(t){case"string":return m;case"number":return h;case"boolean":return l;case"Vector2":return w;case"Vector3":return f;case"Vector4":return d;case"Matrix":return _;case"Color3":return y;case"Color4":return v;case"Quaternion":return x;case"FlowGraphInteger":return V;case"Matrix2D":return M;case"Matrix3D":return b;default:return c}}function C(t){switch(t){case"number":default:return 0;case"Vector2":return 5;case"Vector3":return 1;case"Matrix":return 3;case"Color3":return 4;case"Color4":return 7;case"Quaternion":return 2}}function T(t){switch(t){case 0:return h;case 5:return w;case 1:return f;case 3:return _;case 4:return y;case 7:return v;case 2:return x;default:return c}}},57565:(t,r,e)=>{e.d(r,{K:()=>a,z:()=>s});var n=e(79923);class a{constructor(t=[1,0,0,1]){this._m=t}get m(){return this._m}transformVector(t){return this.transformVectorToRef(t,new n.I9)}transformVectorToRef(t,r){return r.x=t.x*this._m[0]+t.y*this._m[1],r.y=t.x*this._m[2]+t.y*this._m[3],r}asArray(){return this.toArray()}toArray(t=[]){for(let r=0;r<4;r++)t[r]=this._m[r];return t}fromArray(t){for(let r=0;r<4;r++)this._m[r]=t[r];return this}multiplyToRef(t,r){const e=t._m,n=this._m,a=r._m;return a[0]=e[0]*n[0]+e[1]*n[2],a[1]=e[0]*n[1]+e[1]*n[3],a[2]=e[2]*n[0]+e[3]*n[2],a[3]=e[2]*n[1]+e[3]*n[3],r}multiply(t){return this.multiplyToRef(t,new a)}divideToRef(t,r){const e=this._m,n=t._m,a=r._m;return a[0]=e[0]/n[0],a[1]=e[1]/n[1],a[2]=e[2]/n[2],a[3]=e[3]/n[3],r}divide(t){return this.divideToRef(t,new a)}addToRef(t,r){const e=this._m,n=t.m,a=r.m;return a[0]=e[0]+n[0],a[1]=e[1]+n[1],a[2]=e[2]+n[2],a[3]=e[3]+n[3],r}add(t){return this.addToRef(t,new a)}subtractToRef(t,r){const e=this._m,n=t.m,a=r.m;return a[0]=e[0]-n[0],a[1]=e[1]-n[1],a[2]=e[2]-n[2],a[3]=e[3]-n[3],r}subtract(t){return this.subtractToRef(t,new a)}transpose(){const t=this._m;return new a([t[0],t[2],t[1],t[3]])}determinant(){const t=this._m;return t[0]*t[3]-t[1]*t[2]}inverse(){const t=this.determinant();if(0===t)throw new Error("Matrix is not invertible");const r=this._m,e=1/t;return new a([r[3]*e,-r[1]*e,-r[2]*e,r[0]*e])}equals(t,r=0){const e=this._m,n=t.m;return 0===r?e[0]===n[0]&&e[1]===n[1]&&e[2]===n[2]&&e[3]===n[3]:Math.abs(e[0]-n[0])<r&&Math.abs(e[1]-n[1])<r&&Math.abs(e[2]-n[2])<r&&Math.abs(e[3]-n[3])<r}getClassName(){return"FlowGraphMatrix2D"}toString(){return`FlowGraphMatrix2D(${this._m.join(", ")})`}}class s{constructor(t=[1,0,0,0,1,0,0,0,1]){this._m=t}get m(){return this._m}transformVector(t){return this.transformVectorToRef(t,new n.Pq)}transformVectorToRef(t,r){const e=this._m;return r.x=t.x*e[0]+t.y*e[1]+t.z*e[2],r.y=t.x*e[3]+t.y*e[4]+t.z*e[5],r.z=t.x*e[6]+t.y*e[7]+t.z*e[8],r}multiplyToRef(t,r){const e=t._m,n=this._m,a=r.m;return a[0]=e[0]*n[0]+e[1]*n[3]+e[2]*n[6],a[1]=e[0]*n[1]+e[1]*n[4]+e[2]*n[7],a[2]=e[0]*n[2]+e[1]*n[5]+e[2]*n[8],a[3]=e[3]*n[0]+e[4]*n[3]+e[5]*n[6],a[4]=e[3]*n[1]+e[4]*n[4]+e[5]*n[7],a[5]=e[3]*n[2]+e[4]*n[5]+e[5]*n[8],a[6]=e[6]*n[0]+e[7]*n[3]+e[8]*n[6],a[7]=e[6]*n[1]+e[7]*n[4]+e[8]*n[7],a[8]=e[6]*n[2]+e[7]*n[5]+e[8]*n[8],r}multiply(t){return this.multiplyToRef(t,new s)}divideToRef(t,r){const e=this._m,n=t.m,a=r.m;return a[0]=e[0]/n[0],a[1]=e[1]/n[1],a[2]=e[2]/n[2],a[3]=e[3]/n[3],a[4]=e[4]/n[4],a[5]=e[5]/n[5],a[6]=e[6]/n[6],a[7]=e[7]/n[7],a[8]=e[8]/n[8],r}divide(t){return this.divideToRef(t,new s)}addToRef(t,r){const e=this._m,n=t.m,a=r.m;return a[0]=e[0]+n[0],a[1]=e[1]+n[1],a[2]=e[2]+n[2],a[3]=e[3]+n[3],a[4]=e[4]+n[4],a[5]=e[5]+n[5],a[6]=e[6]+n[6],a[7]=e[7]+n[7],a[8]=e[8]+n[8],r}add(t){return this.addToRef(t,new s)}subtractToRef(t,r){const e=this._m,n=t.m,a=r.m;return a[0]=e[0]-n[0],a[1]=e[1]-n[1],a[2]=e[2]-n[2],a[3]=e[3]-n[3],a[4]=e[4]-n[4],a[5]=e[5]-n[5],a[6]=e[6]-n[6],a[7]=e[7]-n[7],a[8]=e[8]-n[8],r}subtract(t){return this.subtractToRef(t,new s)}toArray(t=[]){for(let r=0;r<9;r++)t[r]=this._m[r];return t}asArray(){return this.toArray()}fromArray(t){for(let r=0;r<9;r++)this._m[r]=t[r];return this}transpose(){const t=this._m;return new s([t[0],t[3],t[6],t[1],t[4],t[7],t[2],t[5],t[8]])}determinant(){const t=this._m;return t[0]*(t[4]*t[8]-t[5]*t[7])-t[1]*(t[3]*t[8]-t[5]*t[6])+t[2]*(t[3]*t[7]-t[4]*t[6])}inverse(){const t=this.determinant();if(0===t)throw new Error("Matrix is not invertible");const r=this._m,e=1/t;return new s([(r[4]*r[8]-r[5]*r[7])*e,(r[2]*r[7]-r[1]*r[8])*e,(r[1]*r[5]-r[2]*r[4])*e,(r[5]*r[6]-r[3]*r[8])*e,(r[0]*r[8]-r[2]*r[6])*e,(r[2]*r[3]-r[0]*r[5])*e,(r[3]*r[7]-r[4]*r[6])*e,(r[1]*r[6]-r[0]*r[7])*e,(r[0]*r[4]-r[1]*r[3])*e])}equals(t,r=0){const e=this._m,n=t.m;return 0===r?e[0]===n[0]&&e[1]===n[1]&&e[2]===n[2]&&e[3]===n[3]&&e[4]===n[4]&&e[5]===n[5]&&e[6]===n[6]&&e[7]===n[7]&&e[8]===n[8]:Math.abs(e[0]-n[0])<r&&Math.abs(e[1]-n[1])<r&&Math.abs(e[2]-n[2])<r&&Math.abs(e[3]-n[3])<r&&Math.abs(e[4]-n[4])<r&&Math.abs(e[5]-n[5])<r&&Math.abs(e[6]-n[6])<r&&Math.abs(e[7]-n[7])<r&&Math.abs(e[8]-n[8])<r}getClassName(){return"FlowGraphMatrix3D"}toString(){return`FlowGraphMatrix3D(${this._m.join(", ")})`}}},90868:(t,r,e)=>{e.d(r,{P:()=>a});var n=e(56552);class a{constructor(t){this.value=this._toInt(t)}_toInt(t){return 0|t}add(t){return new a(this.value+t.value)}subtract(t){return new a(this.value-t.value)}multiply(t){return new a(Math.imul(this.value,t.value))}divide(t){return new a(this.value/t.value)}getClassName(){return a.ClassName}equals(t){return this.value===t.value}static FromValue(t){return new a(t)}toString(){return this.value.toString()}}a.ClassName="FlowGraphInteger",(0,n.Y5)("FlowGraphInteger",a)}}]);