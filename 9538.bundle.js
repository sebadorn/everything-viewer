"use strict";(self.webpackChunkeverything_viewer=self.webpackChunkeverything_viewer||[]).push([[9538],{99538:(e,o,n)=>{n.d(o,{KHR_node_selectability:()=>l});var t=n(37812),i=n(48966),a=n(49532);const s="KHR_node_selectability";(0,i.rO)("event/onSelect",s,{blocks:["FlowGraphMeshPickEventBlock","FlowGraphGetVariableBlock","FlowGraphIndexOfBlock","KHR_interactivity/FlowGraphGLTFDataProvider"],configuration:{stopPropagation:{name:"stopPropagation"},nodeIndex:{name:"variable",toBlock:"FlowGraphGetVariableBlock",dataTransformer:e=>["pickedMesh_"+e[0]]}},outputs:{values:{selectedNodeIndex:{name:"index",toBlock:"FlowGraphIndexOfBlock"},controllerIndex:{name:"pointerId"},selectionPoint:{name:"pickedPoint"},selectionRayOrigin:{name:"pickOrigin"}},flows:{out:{name:"done"}}},interBlockConnectors:[{input:"asset",output:"value",inputBlockIndex:0,outputBlockIndex:1,isVariable:!0},{input:"array",output:"nodes",inputBlockIndex:2,outputBlockIndex:3,isVariable:!0},{input:"object",output:"pickedMesh",inputBlockIndex:2,outputBlockIndex:0,isVariable:!0}],extraProcessor(e,o,n,t,i,a,s){const l=i[i.length-1];l.config=l.config||{},l.config.glTF=s;const r=e.configuration?.nodeIndex?.value[0];if(void 0===r||"number"!=typeof r)throw new Error("nodeIndex not found in configuration");const c="pickedMesh_"+r;return i[1].config.variable=c,a._userVariables[c]={className:"Mesh",id:s?.nodes?.[r]._babylonTransformNode?.id,uniqueId:s?.nodes?.[r]._babylonTransformNode?.uniqueId},i}}),(0,a.oR)("/nodes/{}/extensions/KHR_node_selectability/selectable",{get:e=>{const o=e._babylonTransformNode;return!o||void 0===o.isPickable||o.isPickable},set:(e,o)=>{o._primitiveBabylonMeshes?.forEach((o=>{o.isPickable=e}))},getTarget:e=>e._babylonTransformNode,getPropertyName:[()=>"isPickable"],type:"boolean"});class l{constructor(e){this.name=s,this._loader=e,this.enabled=e.isExtensionUsed(s)}async onReady(){this._loader.gltf.nodes?.forEach((e=>{e.extensions?.KHR_node_selectability&&!1===e.extensions?.KHR_node_selectability.selectable&&e._babylonTransformNode?.getChildMeshes().forEach((e=>{e.isPickable=!1}))}))}dispose(){this._loader=null}}(0,t.Hg)(s),(0,t.Ye)(s,!0,(e=>new l(e)))}}]);