"use strict";(self.webpackChunkeverything_viewer=self.webpackChunkeverything_viewer||[]).push([[362],{10362:(t,e,s)=>{s.r(e),s.d(e,{FlowGraphConditionalDataBlock:()=>n});var i=s(71294),a=s(4720),o=s(56552);class n extends i.e{constructor(t){super(t),this.condition=this.registerDataInput("condition",a.RI),this.onTrue=this.registerDataInput("onTrue",a.Vv),this.onFalse=this.registerDataInput("onFalse",a.Vv),this.output=this.registerDataOutput("output",a.Vv)}_updateOutputs(t){const e=this.condition.getValue(t);this.output.setValue(e?this.onTrue.getValue(t):this.onFalse.getValue(t),t)}getClassName(){return"FlowGraphConditionalBlock"}}(0,o.Y5)("FlowGraphConditionalBlock",n)}}]);