"use strict";(self.webpackChunkeverything_viewer=self.webpackChunkeverything_viewer||[]).push([[7399],{17399:(t,e,a)=>{a.r(e),a.d(e,{FlowGraphBooleanToFloat:()=>n,FlowGraphBooleanToInt:()=>u,FlowGraphFloatToBoolean:()=>i,FlowGraphFloatToInt:()=>p,FlowGraphIntToBoolean:()=>c,FlowGraphIntToFloat:()=>h});var o=a(63318),s=a(4720),l=a(56552),r=a(90868);class n extends o.a{constructor(t){super(s.RI,s.Es,(t=>+t),"FlowGraphBooleanToFloat",t)}}(0,l.Y5)("FlowGraphBooleanToFloat",n);class u extends o.a{constructor(t){super(s.RI,s.x2,(t=>r.P.FromValue(+t)),"FlowGraphBooleanToInt",t)}}(0,l.Y5)("FlowGraphBooleanToInt",u);class i extends o.a{constructor(t){super(s.Es,s.RI,(t=>!!t),"FlowGraphFloatToBoolean",t)}}(0,l.Y5)("FlowGraphFloatToBoolean",i);class c extends o.a{constructor(t){super(s.x2,s.RI,(t=>!!t.value),"FlowGraphIntToBoolean",t)}}(0,l.Y5)("FlowGraphIntToBoolean",c);class h extends o.a{constructor(t){super(s.x2,s.Es,(t=>t.value),"FlowGraphIntToFloat",t)}}(0,l.Y5)("FlowGraphIntToFloat",h);class p extends o.a{constructor(t){super(s.Es,s.x2,(e=>{const a=t?.roundingMode;switch(a){case"floor":return r.P.FromValue(Math.floor(e));case"ceil":return r.P.FromValue(Math.ceil(e));case"round":return r.P.FromValue(Math.round(e));default:return r.P.FromValue(e)}}),"FlowGraphFloatToInt",t)}}(0,l.Y5)("FlowGraphFloatToInt",p)},63318:(t,e,a)=>{a.d(e,{a:()=>s});var o=a(94423);class s extends o.r{constructor(t,e,a,o,s){super(e,s),this._operation=a,this._className=o,this.a=this.registerDataInput("a",t)}_doOperation(t){return this._operation(this.a.getValue(t))}getClassName(){return this._className}}},94423:(t,e,a)=>{a.d(e,{r:()=>n});var o=a(71294),s=a(4720);const l="cachedOperationValue",r="cachedExecutionId";class n extends o.e{constructor(t,e){super(e),this.value=this.registerDataOutput("value",t),this.isValid=this.registerDataOutput("isValid",s.RI)}_updateOutputs(t){const e=t._getExecutionVariable(this,r,-1),a=t._getExecutionVariable(this,l,null);if(null!=a&&e===t.executionId)this.isValid.setValue(!0,t),this.value.setValue(a,t);else try{const e=this._doOperation(t);if(null==e)return void this.isValid.setValue(!1,t);t._setExecutionVariable(this,l,e),t._setExecutionVariable(this,r,t.executionId),this.value.setValue(e,t),this.isValid.setValue(!0,t)}catch(e){this.isValid.setValue(!1,t)}}}}}]);