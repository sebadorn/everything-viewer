"use strict";(self.webpackChunkeverything_viewer=self.webpackChunkeverything_viewer||[]).push([[829],{40304:(e,r,t)=>{function a(e,r,t=e=>e){const a=Object.create(null);a.options=r||{},a.reviver=t,a.value="",a.entry=[],a.output=[],a.col=1,a.row=1;const n=/"|,|\r\n|\n|\r|[^",\r\n]+/y,o=/^(\r\n|\n|\r)$/;let l=[],u="",i=0;for(;null!==(l=n.exec(e));)switch(u=l[0],i){case 0:switch(!0){case'"'===u:i=3;break;case","===u:i=0,s(a);break;case o.test(u):i=0,s(a),c(a);break;default:a.value+=u,i=2}break;case 2:switch(!0){case","===u:i=0,s(a);break;case o.test(u):i=0,s(a),c(a);break;default:throw i=4,Error(`CSVError: Illegal state [row:${a.row}, col:${a.col}]`)}break;case 3:if(!0==('"'===u))i=4;else i=3,a.value+=u;break;case 4:switch(!0){case'"'===u:i=3,a.value+=u;break;case","===u:i=0,s(a);break;case o.test(u):i=0,s(a),c(a);break;default:throw Error(`CSVError: Illegal state [row:${a.row}, col:${a.col}]`)}}return 0!==a.entry.length&&(s(a),c(a)),a.output}function s(e){const r=e.options.typed?function(e){switch(!0){case"true"===e:case"false"===e:return"true"===e;case/.\./.test(e):return parseFloat(e);case isFinite(e):return parseInt(e);default:return e}}(e.value):e.value;e.entry.push(e.reviver(r,e.row,e.col)),e.value="",e.col++}function c(e){e.output.push(e.entry),e.entry=[],e.row++,e.col=1}t.d(r,{parse:()=>a})}}]);