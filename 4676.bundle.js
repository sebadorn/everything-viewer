"use strict";(self.webpackChunkeverything_viewer=self.webpackChunkeverything_viewer||[]).push([[4676],{24676:(t,e,s)=>{s.r(e),s.d(e,{FlowGraphTransformCoordinatesSystemBlock:()=>n});var r=s(71294),o=s(4720),i=s(79923),a=s(56552);class n extends r.e{constructor(t){super(t),this.sourceSystem=this.registerDataInput("sourceSystem",o.Vv),this.destinationSystem=this.registerDataInput("destinationSystem",o.Vv),this.inputCoordinates=this.registerDataInput("inputCoordinates",o.Dx),this.outputCoordinates=this.registerDataOutput("outputCoordinates",o.Dx)}_updateOutputs(t){const e=this.sourceSystem.getValue(t),s=this.destinationSystem.getValue(t),r=this.inputCoordinates.getValue(t),o=e.getWorldMatrix(),a=s.getWorldMatrix(),n=i.AA.Matrix[0].copyFrom(a);n.invert();const u=i.AA.Matrix[1];n.multiplyToRef(o,u);const p=this.outputCoordinates.getValue(t);i.Pq.TransformCoordinatesToRef(r,u,p)}getClassName(){return"FlowGraphTransformCoordinatesSystemBlock"}}(0,a.Y5)("FlowGraphTransformCoordinatesSystemBlock",n)}}]);