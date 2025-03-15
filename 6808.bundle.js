"use strict";(self.webpackChunkeverything_viewer=self.webpackChunkeverything_viewer||[]).push([[6808],{2972:(e,t,i)=>{i.d(t,{_:()=>s,i:()=>n});const n="Z2xURg",s={name:"gltf",extensions:{".gltf":{isBinary:!1,mimeType:"model/gltf+json"},".glb":{isBinary:!0,mimeType:"model/gltf-binary"}},canDirectLoad:e=>-1!==e.indexOf("asset")&&-1!==e.indexOf("version")||e.startsWith("data:base64,"+n)||e.startsWith("data:;base64,"+n)||e.startsWith("data:application/octet-stream;base64,"+n)||e.startsWith("data:model/gltf-binary;base64,"+n)}},22412:(e,t,i)=>{i.d(t,{M:()=>n});const n={name:"obj",extensions:".obj"}},31612:(e,t,i)=>{i.d(t,{B:()=>n});const n={name:"splat",extensions:{".splat":{isBinary:!0},".ply":{isBinary:!0},".spz":{isBinary:!0}}}},37812:(e,t,i)=>{i.d(t,{Hg:()=>a,Sv:()=>o,Ye:()=>r});var n=i(51137);const s=new Map,o=s;function r(e,t,i){a(e)&&n.V.Warn(`Extension with the name '${e}' already exists`),s.set(e,{isGLTFExtension:t,factory:i})}function a(e){return s.delete(e)}},44768:(e,t,i)=>{i.r(t),i.d(t,{CreateHotSpotFromCamera:()=>gt,HTML3DAnnotationElement:()=>bt,HTML3DElement:()=>vt,Viewer:()=>F,ViewerElement:()=>_t,ViewerHotSpotResult:()=>I,createViewerForCanvas:()=>pt});var n=i(7839),s=i(66240),o=i(71513),r=i(15909),a=i(32033),l=i(23975),h=i(7481),c=i(26041),d=i(84867),u=i(79923),p=i(54494),m=i(85456),g=i(96793),_=i(93970),v=i(27309),b=i(88394),y=i(28853),w=i(88563),f=i(51137),C=i(99848),A=i(41546),P=i(21797),S=i(96789),x=i(87491),$=i(2972),k=i(22412),M=i(31612),E=i(71452),R=i(37812);function O(){(0,r.qS)({...$._,createPlugin:async e=>{const{GLTFFileLoader:t}=await Promise.all([i.e(1396),i.e(9532),i.e(7889),i.e(6504),i.e(5393),i.e(5316)]).then(i.bind(i,45316));return new t(e[$._.name])}}),(0,R.Ye)("EXT_lights_image_based",!0,(async e=>{const{EXT_lights_image_based:t}=await Promise.all([i.e(1396),i.e(9532),i.e(7889),i.e(6504),i.e(5393),i.e(5316),i.e(5234),i.e(6400)]).then(i.bind(i,56400));return new t(e)})),(0,R.Ye)("EXT_mesh_gpu_instancing",!0,(async e=>{const{EXT_mesh_gpu_instancing:t}=await Promise.all([i.e(1396),i.e(9532),i.e(7889),i.e(6504),i.e(5393),i.e(5316),i.e(6897)]).then(i.bind(i,89278));return new t(e)})),(0,R.Ye)("EXT_meshopt_compression",!0,(async e=>{const{EXT_meshopt_compression:t}=await Promise.all([i.e(1396),i.e(9532),i.e(7889),i.e(6504),i.e(5393),i.e(5316),i.e(6272)]).then(i.bind(i,66272));return new t(e)})),(0,R.Ye)("EXT_texture_avif",!0,(async e=>{const{EXT_texture_avif:t}=await Promise.all([i.e(1396),i.e(9532),i.e(7889),i.e(6504),i.e(5393),i.e(5316),i.e(8827)]).then(i.bind(i,88827));return new t(e)})),(0,R.Ye)("EXT_texture_webp",!0,(async e=>{const{EXT_texture_webp:t}=await Promise.all([i.e(1396),i.e(9532),i.e(7889),i.e(6504),i.e(5393),i.e(5316),i.e(4717)]).then(i.bind(i,34717));return new t(e)})),(0,R.Ye)("ExtrasAsMetadata",!1,(async e=>{const{ExtrasAsMetadata:t}=await i.e(7993).then(i.bind(i,27993));return new t(e)})),(0,R.Ye)("KHR_animation_pointer",!0,(async e=>{const{KHR_animation_pointer:t}=await Promise.all([i.e(1396),i.e(9532),i.e(1784)]).then(i.bind(i,1784));return new t(e)})),(0,R.Ye)("KHR_draco_mesh_compression",!0,(async e=>{const{KHR_draco_mesh_compression:t}=await Promise.all([i.e(1396),i.e(9532),i.e(7889),i.e(6504),i.e(5393),i.e(5316),i.e(7728),i.e(2182)]).then(i.bind(i,39991));return new t(e)})),(0,R.Ye)("KHR_interactivity",!0,(async e=>{const{KHR_interactivity:t}=await Promise.all([i.e(1396),i.e(9532),i.e(4720),i.e(8966),i.e(5048),i.e(935)]).then(i.bind(i,20935));return new t(e)})),(0,R.Ye)("KHR_lights_punctual",!0,(async e=>{const{KHR_lights:t}=await Promise.all([i.e(1396),i.e(9532),i.e(7889),i.e(6504),i.e(5393),i.e(5316),i.e(967)]).then(i.bind(i,90967));return new t(e)})),(0,R.Ye)("EXT_lights_ies",!0,(async e=>{const{EXT_lights_ies:t}=await Promise.all([i.e(1396),i.e(9532),i.e(7889),i.e(6504),i.e(5393),i.e(5316),i.e(5302)]).then(i.bind(i,45302));return new t(e)})),(0,R.Ye)("KHR_materials_anisotropy",!0,(async e=>{const{KHR_materials_anisotropy:t}=await Promise.all([i.e(1396),i.e(9532),i.e(7889),i.e(6504),i.e(5393),i.e(5316),i.e(2032)]).then(i.bind(i,12032));return new t(e)})),(0,R.Ye)("KHR_materials_clearcoat",!0,(async e=>{const{KHR_materials_clearcoat:t}=await Promise.all([i.e(1396),i.e(9532),i.e(7889),i.e(6504),i.e(5393),i.e(5316),i.e(6804)]).then(i.bind(i,6804));return new t(e)})),(0,R.Ye)("KHR_materials_diffuse_transmission",!0,(async e=>{const{KHR_materials_diffuse_transmission:t}=await Promise.all([i.e(1396),i.e(9532),i.e(7889),i.e(6504),i.e(5393),i.e(5316),i.e(3155)]).then(i.bind(i,53155));return new t(e)})),(0,R.Ye)("KHR_materials_dispersion",!0,(async e=>{const{KHR_materials_dispersion:t}=await Promise.all([i.e(1396),i.e(9532),i.e(7889),i.e(6504),i.e(5393),i.e(5316),i.e(1386)]).then(i.bind(i,91386));return new t(e)})),(0,R.Ye)("KHR_materials_emissive_strength",!0,(async e=>{const{KHR_materials_emissive_strength:t}=await Promise.all([i.e(1396),i.e(9532),i.e(7889),i.e(6504),i.e(5393),i.e(5316),i.e(459)]).then(i.bind(i,459));return new t(e)})),(0,R.Ye)("KHR_materials_ior",!0,(async e=>{const{KHR_materials_ior:t}=await Promise.all([i.e(1396),i.e(9532),i.e(7889),i.e(6504),i.e(5393),i.e(5316),i.e(932)]).then(i.bind(i,60932));return new t(e)})),(0,R.Ye)("KHR_materials_iridescence",!0,(async e=>{const{KHR_materials_iridescence:t}=await Promise.all([i.e(1396),i.e(9532),i.e(7889),i.e(6504),i.e(5393),i.e(5316),i.e(718)]).then(i.bind(i,20718));return new t(e)})),(0,R.Ye)("KHR_materials_pbrSpecularGlossiness",!0,(async e=>{const{KHR_materials_pbrSpecularGlossiness:t}=await Promise.all([i.e(1396),i.e(9532),i.e(7889),i.e(6504),i.e(5393),i.e(5316),i.e(2593)]).then(i.bind(i,52593));return new t(e)})),(0,R.Ye)("KHR_materials_sheen",!0,(async e=>{const{KHR_materials_sheen:t}=await Promise.all([i.e(1396),i.e(9532),i.e(7889),i.e(6504),i.e(5393),i.e(5316),i.e(2931)]).then(i.bind(i,92931));return new t(e)})),(0,R.Ye)("KHR_materials_specular",!0,(async e=>{const{KHR_materials_specular:t}=await Promise.all([i.e(1396),i.e(9532),i.e(7889),i.e(6504),i.e(5393),i.e(5316),i.e(6161)]).then(i.bind(i,86161));return new t(e)})),(0,R.Ye)("KHR_materials_transmission",!0,(async e=>{const{KHR_materials_transmission:t}=await Promise.all([i.e(1396),i.e(9532),i.e(7889),i.e(6504),i.e(5393),i.e(5316),i.e(6360)]).then(i.bind(i,66360));return new t(e)})),(0,R.Ye)("KHR_materials_unlit",!0,(async e=>{const{KHR_materials_unlit:t}=await Promise.all([i.e(1396),i.e(9532),i.e(7889),i.e(6504),i.e(5393),i.e(5316),i.e(4770)]).then(i.bind(i,84770));return new t(e)})),(0,R.Ye)("KHR_materials_variants",!0,(async e=>{const{KHR_materials_variants:t}=await Promise.all([i.e(1396),i.e(9532),i.e(7889),i.e(6504),i.e(5393),i.e(5316),i.e(5538)]).then(i.bind(i,35538));return new t(e)})),(0,R.Ye)("KHR_materials_volume",!0,(async e=>{const{KHR_materials_volume:t}=await Promise.all([i.e(1396),i.e(9532),i.e(7889),i.e(6504),i.e(5393),i.e(5316),i.e(1578)]).then(i.bind(i,81578));return new t(e)})),(0,R.Ye)("KHR_mesh_quantization",!0,(async e=>{const{KHR_mesh_quantization:t}=await i.e(3152).then(i.bind(i,63152));return new t(e)})),(0,R.Ye)("KHR_texture_basisu",!0,(async e=>{const{KHR_texture_basisu:t}=await Promise.all([i.e(1396),i.e(9532),i.e(7889),i.e(6504),i.e(5393),i.e(5316),i.e(6122)]).then(i.bind(i,6122));return new t(e)})),(0,R.Ye)("KHR_texture_transform",!0,(async e=>{const{KHR_texture_transform:t}=await Promise.all([i.e(1396),i.e(9532),i.e(7889),i.e(6504),i.e(5393),i.e(5316),i.e(2787)]).then(i.bind(i,82787));return new t(e)})),(0,R.Ye)("KHR_xmp_json_ld",!0,(async e=>{const{KHR_xmp_json_ld:t}=await i.e(7010).then(i.bind(i,57010));return new t(e)})),(0,R.Ye)("MSFT_audio_emitter",!0,(async e=>{const{MSFT_audio_emitter:t}=await Promise.all([i.e(1396),i.e(9532),i.e(7889),i.e(6504),i.e(5393),i.e(5316),i.e(4401),i.e(2305)]).then(i.bind(i,85777));return new t(e)})),(0,R.Ye)("MSFT_lod",!0,(async e=>{const{MSFT_lod:t}=await Promise.all([i.e(1396),i.e(9532),i.e(7889),i.e(6504),i.e(5393),i.e(5316),i.e(7433)]).then(i.bind(i,27433));return new t(e)})),(0,R.Ye)("MSFT_minecraftMesh",!0,(async e=>{const{MSFT_minecraftMesh:t}=await Promise.all([i.e(1396),i.e(9532),i.e(7889),i.e(6504),i.e(5393),i.e(5316),i.e(3096)]).then(i.bind(i,3096));return new t(e)})),(0,R.Ye)("MSFT_sRGBFactors",!0,(async e=>{const{MSFT_sRGBFactors:t}=await Promise.all([i.e(1396),i.e(9532),i.e(7889),i.e(6504),i.e(5393),i.e(5316),i.e(5870)]).then(i.bind(i,25870));return new t(e)})),(0,R.Ye)("KHR_node_visibility",!0,(async e=>{const{KHR_node_visibility:t}=await Promise.all([i.e(1396),i.e(9532),i.e(7574)]).then(i.bind(i,37574));return new t(e)})),(0,R.Ye)("KHR_node_hoverability",!0,(async e=>{const{KHR_node_hoverability:t}=await Promise.all([i.e(1396),i.e(9532),i.e(4720),i.e(8966),i.e(4610)]).then(i.bind(i,74610));return new t(e)})),(0,R.Ye)("KHR_interactivity",!0,(async e=>{const{KHR_interactivity:t}=await Promise.all([i.e(1396),i.e(9532),i.e(4720),i.e(8966),i.e(5048),i.e(935)]).then(i.bind(i,20935));return new t(e)})),(0,R.Ye)("KHR_node_selectability",!0,(async e=>{const{KHR_node_selectability:t}=await Promise.all([i.e(1396),i.e(9532),i.e(4720),i.e(8966),i.e(9538)]).then(i.bind(i,99538));return new t(e)})),(0,r.qS)({...k.M,createPlugin:async e=>{const{OBJFileLoader:t}=await Promise.all([i.e(7889),i.e(2093),i.e(6996)]).then(i.bind(i,6996));return new t(e[k.M.name])}}),(0,r.qS)({...M.B,createPlugin:async e=>{const{SPLATFileLoader:t}=await Promise.all([i.e(7889),i.e(2093),i.e(6919),i.e(9864),i.e(8292)]).then(i.bind(i,76391));return new t(e[M.B.name])}}),(0,r.qS)({...E.W,createPlugin:async()=>{const{STLFileLoader:e}=await Promise.all([i.e(7889),i.e(2093),i.e(3239)]).then(i.bind(i,63239));return new e}})}var H=i(75524),T=i(39018);const L=["none","standard","aces","neutral"];function B(...e){for(const t of e)t?.throwIfAborted()}function D(e,t){e?.scaling.setAll((t.maxZ-t.minZ)/2)}function V(e){const t=function(e){return e.flatMap((e=>(0,_.J)(e.assetContainer.meshes,e.assetContainer.animationGroups[e.selectedAnimation])))}(e);return function(e){const t=new u.Pq(Math.min(...e.map((e=>e.minimum.x))),Math.min(...e.map((e=>e.minimum.y))),Math.min(...e.map((e=>e.minimum.z)))),i=new u.Pq(Math.max(...e.map((e=>e.maximum.x))),Math.max(...e.map((e=>e.maximum.y))),Math.max(...e.map((e=>e.maximum.z)))),n=i.subtract(t),s=t.add(n.scale(.5));return{extents:{min:t.asArray(),max:i.asArray()},size:n.asArray(),center:s.asArray()}}(t)}const N={lighting:!0,skybox:!0};class I{constructor(){this.screenPosition=[NaN,NaN],this.worldPosition=[NaN,NaN,NaN],this.visibility=NaN}}class F{constructor(e,t){this._engine=e,this.showDebugLogs=!1,this.onEnvironmentChanged=new C.cP,this.onEnvironmentConfigurationChanged=new C.cP,this.onEnvironmentError=new C.cP,this.onPostProcessingChanged=new C.cP,this.onModelChanged=new C.cP,this.onModelError=new C.cP,this.onLoadingProgressChanged=new C.cP,this.onCameraAutoOrbitChanged=new C.cP,this.onSelectedAnimationChanged=new C.cP,this.onAnimationSpeedChanged=new C.cP,this.onIsAnimationPlayingChanged=new C.cP,this.onAnimationProgressChanged=new C.cP,this.onSelectedMaterialVariantChanged=new C.cP,this._renderedLastFrame=null,this._sceneOptimizer=null,this._tempVectors=(0,v.ln)(4,u.Pq.Zero),this._meshDataCache=new Map,this._renderLoopController=null,this._loadedModelsBacking=[],this._activeModelBacking=null,this._skybox=null,this._skyboxBlur=.3,this._skyboxVisible=!0,this._skyboxTexture=null,this._reflectionTexture=null,this._reflectionsIntensity=1,this._reflectionsRotation=0,this._light=null,this._sceneMutated=!1,this._suspendRenderCount=0,this._isDisposed=!1,this._loadModelLock=new b.m,this._loadModelAbortController=null,this._loadEnvironmentLock=new b.m,this._loadEnvironmentAbortController=null,this._loadSkyboxLock=new b.m,this._loadSkyboxAbortController=null,this._loadOperations=new Set,this._activeAnimationObservers=[],this._animationSpeed=1,this._defaultHardwareScalingLevel=this._lastHardwareScalingLevel=this._engine.getHardwareScalingLevel(),this._autoSuspendRendering=t?.autoSuspendRendering??!0;{const e=new x.Z(this._engine);e.clearColor=t?.clearColor?new c.ov(...t.clearColor):new c.ov(0,0,0,0),this._toneMappingEnabled=e.imageProcessingConfiguration.toneMappingEnabled,this._toneMappingType=e.imageProcessingConfiguration.toneMappingType,this._contrast=e.imageProcessingConfiguration.contrast,this._exposure=e.imageProcessingConfiguration.exposure,this._imageProcessingConfigurationObserver=e.imageProcessingConfiguration.onUpdateParameters.add((()=>{let t=!1;this._toneMappingEnabled!==e.imageProcessingConfiguration.toneMappingEnabled&&(this._toneMappingEnabled=e.imageProcessingConfiguration.toneMappingEnabled,t=!0),this._toneMappingType!==e.imageProcessingConfiguration.toneMappingType&&(this._toneMappingType=e.imageProcessingConfiguration.toneMappingType,t=!0),this._contrast!==e.imageProcessingConfiguration.contrast&&(this._contrast=e.imageProcessingConfiguration.contrast,t=!0),this._exposure!==e.imageProcessingConfiguration.exposure&&(this._exposure=e.imageProcessingConfiguration.exposure,t=!0),t&&this.onPostProcessingChanged.notifyObservers()}));const i=new n.Lq("Viewer Default Camera",0,0,1,u.Pq.Zero(),e);i.useInputToRestoreState=!1,i.onViewMatrixChangedObservable.add((()=>{this._markSceneMutated()})),e.onClearColorChangedObservable.add((()=>{this._markSceneMutated()})),e.onPointerObservable.add((async e=>{const t=await this._pick(e.event.offsetX,e.event.offsetY);if(t?.pickedPoint){const e=t.pickedPoint.subtract(i.position).dot(i.getForwardRay().direction);i.target=i.position.add(i.getForwardRay().direction.scale(e)),i.radius=e,i.interpolateTo(void 0,void 0,void 0,t.pickedPoint)}else i.restoreState()}),s.Zp.POINTERDOUBLETAP),this._scene=e,this._camera=i}this._scene.skipFrustumClipping=!0,this._scene.skipPointerDownPicking=!0,this._scene.skipPointerUpPicking=!0,this._scene.skipPointerMovePicking=!0,this._snapshotHelper=new P.j(this._scene,{morphTargetsNumMaxInfluences:30}),this._beforeRenderObserver=this._scene.onBeforeRenderObservable.add((()=>{this._snapshotHelper.updateMesh(this._scene.meshes)})),this._camera.attachControl(),this._reframeCamera(),this._autoRotationBehavior=this._camera.getBehaviorByName("AutoRotation"),this.postProcessing={toneMapping:"neutral"},this.resetEnvironment().catch((()=>{})),this._beginRendering();const i=this;t?.onInitialized?.({scene:i._scene,camera:i._camera,get model(){return i._activeModel??null},suspendRendering:()=>this._suspendRendering(),markSceneMutated:()=>this._markSceneMutated(),pick:(e,t)=>this._pick(e,t)})}get cameraAutoOrbit(){return{enabled:this._camera.behaviors.includes(this._autoRotationBehavior),speed:this._autoRotationBehavior.idleRotationSpeed,delay:this._autoRotationBehavior.idleRotationWaitTime}}set cameraAutoOrbit(e){void 0!==e.enabled&&e.enabled!==this.cameraAutoOrbit.enabled&&(e.enabled?this._camera.addBehavior(this._autoRotationBehavior):this._camera.removeBehavior(this._autoRotationBehavior)),void 0!==e.delay&&(this._autoRotationBehavior.idleRotationWaitTime=e.delay),void 0!==e.speed&&(this._autoRotationBehavior.idleRotationSpeed=e.speed),this.onCameraAutoOrbitChanged.notifyObservers()}get environmentConfig(){return{intensity:this._reflectionsIntensity,blur:this._skyboxBlur,rotation:this._reflectionsRotation,visible:this._skyboxVisible}}set environmentConfig(e){void 0!==e.blur&&this._changeSkyboxBlur(e.blur),void 0!==e.intensity&&this._changeEnvironmentIntensity(e.intensity),void 0!==e.rotation&&this._changeEnvironmentRotation(e.rotation),void 0!==e.visible&&this._changeSkyboxVisible(e.visible),this.onEnvironmentConfigurationChanged.notifyObservers()}_changeSkyboxBlur(e){if(e!==this._skyboxBlur&&(this._skyboxBlur=e,this._skybox)){const e=this._skybox.material;e instanceof l.Y&&(this._snapshotHelper.disableSnapshotRendering(),e.microSurface=1-this._skyboxBlur,this._snapshotHelper.enableSnapshotRendering(),this._markSceneMutated())}}_changeEnvironmentRotation(e){e!==this._reflectionsRotation&&(this._reflectionsRotation=e,this._snapshotHelper.disableSnapshotRendering(),this._skyboxTexture&&(this._skyboxTexture.rotationY=this._reflectionsRotation),this._reflectionTexture&&(this._reflectionTexture.rotationY=this._reflectionsRotation),this._snapshotHelper.enableSnapshotRendering(),this._markSceneMutated())}_changeEnvironmentIntensity(e){e!==this._reflectionsIntensity&&(this._reflectionsIntensity=e,this._snapshotHelper.disableSnapshotRendering(),this._skyboxTexture&&(this._skyboxTexture.level=this._reflectionsIntensity),this._reflectionTexture&&(this._reflectionTexture.level=this._reflectionsIntensity),this._snapshotHelper.enableSnapshotRendering(),this._markSceneMutated())}_changeSkyboxVisible(e){e!==this._skyboxVisible&&(this._skyboxVisible=e,this._skybox&&(this._snapshotHelper.disableSnapshotRendering(),this._skybox.setEnabled(this._skyboxVisible),this._updateAutoClear(),this._snapshotHelper.enableSnapshotRendering(),this._markSceneMutated()))}_updateAutoClear(){this._scene.autoClear=!0,this._markSceneMutated()}get postProcessing(){let e="none";if(this._toneMappingEnabled)switch(this._toneMappingType){case a.p.TONEMAPPING_STANDARD:e="standard";break;case a.p.TONEMAPPING_ACES:e="aces";break;case a.p.TONEMAPPING_KHR_PBR_NEUTRAL:e="neutral"}return{toneMapping:e,contrast:this._contrast,exposure:this._exposure}}set postProcessing(e){if(this._snapshotHelper.disableSnapshotRendering(),void 0!==e.toneMapping)if("none"===e.toneMapping)this._scene.imageProcessingConfiguration.toneMappingEnabled=!1;else{switch(e.toneMapping){case"standard":this._scene.imageProcessingConfiguration.toneMappingType=a.p.TONEMAPPING_STANDARD;break;case"aces":this._scene.imageProcessingConfiguration.toneMappingType=a.p.TONEMAPPING_ACES;break;case"neutral":this._scene.imageProcessingConfiguration.toneMappingType=a.p.TONEMAPPING_KHR_PBR_NEUTRAL}this._scene.imageProcessingConfiguration.toneMappingEnabled=!0}void 0!==e.contrast&&(this._scene.imageProcessingConfiguration.contrast=e.contrast),void 0!==e.exposure&&(this._scene.imageProcessingConfiguration.exposure=e.exposure),this._scene.imageProcessingConfiguration.isEnabled=this._toneMappingEnabled||1!==this._contrast||1!==this._exposure,this._snapshotHelper.enableSnapshotRendering(),this._markSceneMutated()}get loadingProgress(){if(this._loadOperations.size>0){let e=0;for(const t of this._loadOperations){if(null==t.progress)return!0;e+=t.progress}return e/this._loadOperations.size}return!1}get _loadedModels(){return this._loadedModelsBacking}get _activeModel(){return this._activeModelBacking}_setActiveModel(...e){const[t,i]=e;t!==this._activeModelBacking&&(this._activeModelBacking=t,this._updateLight(),this._applyAnimationSpeed(),this._selectAnimation(i?.defaultAnimation??0,!1),i?.animationAutoPlay&&this.playAnimation(),this.onSelectedMaterialVariantChanged.notifyObservers(),this._reframeCamera(i?.interpolateCamera),this.onModelChanged.notifyObservers(i?.source??null))}get animations(){return this._activeModel?.assetContainer.animationGroups.map((e=>e.name))??[]}get selectedAnimation(){return this._activeModel?.selectedAnimation??-1}set selectedAnimation(e){this._selectAnimation(e,0===this._loadOperations.size)}_selectAnimation(e,t=!0){e=Math.round((0,d.Clamp)(e,-1,this.animations.length-1)),this._activeModel&&e!==this._activeModel.selectedAnimation&&(this._activeAnimationObservers.forEach((e=>e.remove())),this._activeAnimationObservers=[],this._activeModel.selectedAnimation=e,this._activeAnimation&&(this._activeAnimationObservers=[this._activeAnimation.onAnimationGroupPlayObservable.add((()=>{this.onIsAnimationPlayingChanged.notifyObservers()})),this._activeAnimation.onAnimationGroupPauseObservable.add((()=>{this.onIsAnimationPlayingChanged.notifyObservers()})),this._activeAnimation.onAnimationGroupEndObservable.add((()=>{this.onIsAnimationPlayingChanged.notifyObservers(),this.onAnimationProgressChanged.notifyObservers()}))],this._reframeCamera(t)),this.onSelectedAnimationChanged.notifyObservers(),this.onAnimationProgressChanged.notifyObservers())}get isAnimationPlaying(){return this._activeModelBacking?._animationPlaying()??!1}get animationSpeed(){return this._animationSpeed}set animationSpeed(e){this._animationSpeed=e,this._applyAnimationSpeed(),this.onAnimationSpeedChanged.notifyObservers()}get animationProgress(){return this._activeAnimation?this._activeAnimation.getCurrentFrame()/(this._activeAnimation.to-this._activeAnimation.from):0}set animationProgress(e){this._activeAnimation&&(this._activeAnimation.goToFrame(e*(this._activeAnimation.to-this._activeAnimation.from)),this.onAnimationProgressChanged.notifyObservers(),this._autoRotationBehavior.resetLastInteractionTime(),this._markSceneMutated())}get _activeAnimation(){return this._activeModel?.assetContainer.animationGroups[this._activeModel?.selectedAnimation]??null}get materialVariants(){return this._activeModel?.materialVariantsController?.variants??[]}get selectedMaterialVariant(){return this._activeModel?.materialVariantsController?.selectedVariant??null}set selectedMaterialVariant(e){e!==this.selectedMaterialVariant&&this._activeModel?.materialVariantsController?.variants.includes(e)&&(this._snapshotHelper.disableSnapshotRendering(),this._activeModel.materialVariantsController.selectedVariant=e,this._snapshotHelper.enableSnapshotRendering(),this._markSceneMutated(),this.onSelectedMaterialVariantChanged.notifyObservers())}_beginLoadOperation(){const e=this;let t=null;const i={get progress(){return t},set progress(i){t=i,e.onLoadingProgressChanged.notifyObservers()},dispose:()=>{e._loadOperations.delete(i),e.onLoadingProgressChanged.notifyObservers()}};return this._loadOperations.add(i),this.onLoadingProgressChanged.notifyObservers(),i}async loadModel(e,t,i){await this._updateModel(e,t,i)}async resetModel(e){await this._updateModel(void 0,void 0,e)}async _loadModel(e,t,i){this._throwIfDisposedOrAborted(i);const n=this._beginLoadOperation(),s=t?.onProgress;delete t?.onProgress;let o=null;const a=t?.pluginOptions?.gltf?.extensionOptions?.KHR_materials_variants?.onLoaded;delete t?.pluginOptions?.gltf?.extensionOptions?.KHR_materials_variants?.onLoaded;const l={onProgress:e=>{s?.(e),n.progress=e.lengthComputable?e.loaded/e.total:null},pluginOptions:{gltf:{transparencyAsCoverage:!0,extensionOptions:{KHR_materials_variants:{onLoaded:e=>{a?.(e),o=e}}}}}};t=(0,y.$)(l,t??{}),this._snapshotHelper.disableSnapshotRendering();try{const i=await(0,r.uD)(e,this._scene,t);i.animationGroups.forEach((e=>{e.start(!0,this.animationSpeed),e.pause()})),i.addAllToScene(),this._snapshotHelper.fixMeshes(i.meshes);let n=-1;const s=[],a={assetContainer:i,materialVariantsController:o,_animationPlaying:()=>{const e=i.animationGroups[n];return e?.isPlaying??!1},_shouldRender:()=>{const e=a?.assetContainer.animationGroups.some((e=>e.animatables.some((e=>e.animationStarted))));return a._animationPlaying()||e},getHotSpotToRef:(e,t)=>this._getHotSpotToRef(i,e,t),dispose:()=>{this._snapshotHelper.disableSnapshotRendering(),i.meshes.forEach((e=>this._meshDataCache.delete(e))),i.dispose();const e=this._loadedModelsBacking.indexOf(a);-1!==e&&(this._loadedModelsBacking.splice(e,1),a===this._activeModel&&(this._activeModelBacking=null)),this._snapshotHelper.enableSnapshotRendering(),this._markSceneMutated()},getWorldBounds:(e=n)=>{let t=s[e];return t||(t=V([a]),t&&(s[e]=t)),t},resetWorldBounds:()=>{s.length=0},get selectedAnimation(){return n},set selectedAnimation(e){let t=i.animationGroups[n];const s=t?.isPlaying??!1;t&&(t.pause(),t.goToFrame(0)),n=e,t=i.animationGroups[n],t&&(t.goToFrame(0),t.play(!0),s||t.pause())},makeActive:e=>{this._setActiveModel(a,e)}};return this._loadedModelsBacking.push(a),a}catch(e){throw this.onModelError.notifyObservers(e),e}finally{n.dispose(),this._snapshotHelper.enableSnapshotRendering(),this._markSceneMutated()}}async _updateModel(e,t,i){this._throwIfDisposedOrAborted(i),this._loadModelAbortController?.abort(new w.lc("New model is being loaded before previous model finished loading."));const n=this._loadModelAbortController=new AbortController;await this._loadModelLock.lockAsync((async()=>{if(B(i,n.signal),this._activeModel?.dispose(),this._activeModelBacking=null,this.selectedAnimation=-1,e){(await this._loadModel(e,t,n.signal)).makeActive(Object.assign({source:e,interpolateCamera:!1},t))}})),!this._scene.environmentTexture&&this._scene.materials.some((e=>e instanceof l.Y))&&await this.resetEnvironment({lighting:!0},i),this._startSceneOptimizer(!0)}async loadEnvironment(e,t,i){await this._updateEnvironment(e,t,i)}async resetEnvironment(e,t){const i=[];if(e?.lighting&&this._scene.materials.some((e=>e instanceof l.Y))){const n={...e,skybox:!1};e={...e,lighting:!1},i.push(this._updateEnvironment("auto",n,t))}i.push(this._updateEnvironment(void 0,e,t)),await Promise.all(i)}async _updateEnvironment(e,t,n){this._throwIfDisposedOrAborted(n);let s=e;if(e&&"auto"===e.trim()&&(t={...t,extension:".env"},s=(async()=>(await i.e(7121).then(i.bind(i,17121))).default)()),!(t=t??N).lighting&&!t.skybox)return;const o=[];t.lighting&&(this._loadEnvironmentAbortController?.abort(new w.lc("New environment lighting is being loaded before previous environment lighting finished loading.")),o.push(this._loadEnvironmentLock)),t.skybox&&(this._loadSkyboxAbortController?.abort(new w.lc("New environment skybox is being loaded before previous environment skybox finished loading.")),o.push(this._loadSkyboxLock));const r=this._loadEnvironmentAbortController=t.lighting?new AbortController:null,c=this._loadSkyboxAbortController=t.skybox?new AbortController:null;await b.m.LockAsync((async()=>{B(n,r?.signal,c?.signal),this._snapshotHelper.disableSnapshotRendering();const o=()=>{t.lighting&&(this._reflectionTexture?.dispose(),this._reflectionTexture=null),t.skybox&&(this._skybox?.dispose(void 0,!0),this._skyboxTexture=null,this._skybox=null,this._updateAutoClear())};o();try{if(e=await s){const n=await async function(e,t,n){n=n??(0,S.r)(e);const s=await(async()=>{if(".hdr"===n){const{HDRCubeTexture:n}=await Promise.all([i.e(391),i.e(6041)]).then(i.bind(i,40391));return()=>new n(e,t,256,!1,!0,!1,!0,void 0,void 0,void 0,!0,!0)}{const{CubeTexture:s}=await i.e(4294).then(i.bind(i,34294));return()=>new s(e,t,null,!1,null,null,null,void 0,!0,n,!0)}})(),o=t.useDelayedTextureLoading;try{return t.useDelayedTextureLoading=!1,s()}finally{t.useDelayedTextureLoading=o}}(e,this._scene,t.extension);t.lighting&&(this._reflectionTexture=n,this._scene.environmentTexture=this._reflectionTexture,n.level=this.environmentConfig.intensity,n.rotationY=this.environmentConfig.rotation),t.skybox&&(this._skyboxTexture=t.lighting?n.clone():n,this._skyboxTexture.level=this.environmentConfig.intensity,this._skyboxTexture.rotationY=this.environmentConfig.rotation,this._skybox=function(e,t,i,n){const s=e.blockMaterialDirtyMechanism;e.blockMaterialDirtyMechanism=!0;try{const s=(0,g.an)("hdrSkyBox",void 0,e),o=new l.Y("skyBox",e);return o.imageProcessingConfiguration=new a.p,o.backFaceCulling=!1,o.reflectionTexture=i,o.reflectionTexture&&(o.reflectionTexture.coordinatesMode=h.g.SKYBOX_MODE),o.microSurface=1-n,o.disableLighting=!0,o.twoSidedLighting=!0,s.material=o,s.isPickable=!1,s.infiniteDistance=!0,D(s,t),s}finally{e.blockMaterialDirtyMechanism=s}}(this._scene,this._camera,this._skyboxTexture,this.environmentConfig.blur),this._skybox.setEnabled(this._skyboxVisible),this._snapshotHelper.fixMeshes([this._skybox]),this._updateAutoClear()),await new Promise(((e,t)=>{const i=n.onLoadObservable.addOnce((()=>{i.remove(),s.remove(),e()})),s=h.g.OnTextureLoadErrorObservable.add((e=>{e===n&&(i.remove(),s.remove(),t(new Error("Failed to load environment texture.")))}))}))}this._updateLight(),this.onEnvironmentChanged.notifyObservers()}catch(e){throw o(),this.onEnvironmentError.notifyObservers(e),e}finally{this._snapshotHelper.enableSnapshotRendering(),this._markSceneMutated()}}),o)}toggleAnimation(){this.isAnimationPlaying?this.pauseAnimation():this.playAnimation()}playAnimation(){this._activeAnimation?.play(!0)}async pauseAnimation(){this._activeAnimation?.pause()}resetCamera(){this._camera.restoreState()}dispose(){this.selectedAnimation=-1,this.animationProgress=0,this._loadEnvironmentAbortController?.abort(new w.lc("Thew viewer is being disposed.")),this._loadSkyboxAbortController?.abort(new w.lc("Thew viewer is being disposed.")),this._loadModelAbortController?.abort(new w.lc("Thew viewer is being disposed.")),this._renderLoopController?.dispose(),this._activeModel?.dispose(),this._loadedModelsBacking.forEach((e=>e.dispose())),this._scene.dispose(),this.onEnvironmentChanged.clear(),this.onEnvironmentError.clear(),this.onEnvironmentConfigurationChanged.clear(),this.onPostProcessingChanged.clear(),this.onModelChanged.clear(),this.onModelError.clear(),this.onCameraAutoOrbitChanged.clear(),this.onSelectedAnimationChanged.clear(),this.onAnimationSpeedChanged.clear(),this.onIsAnimationPlayingChanged.clear(),this.onAnimationProgressChanged.clear(),this.onLoadingProgressChanged.clear(),this._imageProcessingConfigurationObserver.remove(),this._beforeRenderObserver.remove(),this._isDisposed=!0}getHotSpotToRef(e,t){return this._activeModel?.getHotSpotToRef(e,t)??!1}_getHotSpotToRef(e,t,i){const n=this._tempVectors[2],s=this._tempVectors[1],o=this._tempVectors[0];if("surface"===t.type){const i=e?.meshes[t.meshIndex];if(!i)return!1;if(!(0,m.e0)(i,t,s,n))return!1}else s.copyFromFloats(t.position[0],t.position[1],t.position[2]),n.copyFromFloats(t.normal[0],t.normal[1],t.normal[2]);const r=this._camera.viewport.width*this._engine.getRenderWidth()*this._engine.getHardwareScalingLevel(),a=this._camera.viewport.height*this._engine.getRenderHeight()*this._engine.getHardwareScalingLevel(),l=this._scene;u.Pq.ProjectToRef(s,u.uq.IdentityReadOnly,l.getTransformMatrix(),new p.L(0,0,r,a),o),i.screenPosition[0]=o.x,i.screenPosition[1]=o.y,i.worldPosition[0]=s.x,i.worldPosition[1]=s.y,i.worldPosition[2]=s.z;const h=this._tempVectors[3];return h.copyFrom(this._camera.globalPosition),h.subtractInPlace(s),h.normalize(),i.visibility=u.Pq.Dot(h,n),!0}get _shouldRender(){return!this._autoSuspendRendering||this._sceneMutated||!this._snapshotHelper.isReady||this._loadedModelsBacking.some((e=>e._shouldRender()))}_markSceneMutated(){this._sceneMutated=!0}_suspendRendering(){this._renderLoopController?.dispose(),this._suspendRenderCount++;let e=!1;return{dispose:()=>{e||(e=!0,this._suspendRenderCount--,0===this._suspendRenderCount&&this._beginRendering())}}}_beginRendering(){if(!this._renderLoopController){let e=!1;const t=()=>{this._log("Viewer Resumed Rendering"),this._engine.setHardwareScalingLevel(this._lastHardwareScalingLevel),this._engine.performanceMonitor.enable(),this._startSceneOptimizer()},i=()=>{this._log("Viewer Suspended Rendering"),this._renderedLastFrame=!1,e=!1,this._lastHardwareScalingLevel=this._engine.getHardwareScalingLevel(),this._stopSceneOptimizer(),this._engine.performanceMonitor.disable(),this._engine.setHardwareScalingLevel(this._defaultHardwareScalingLevel),this._engine.beginFrame(),this._scene.render(),this._engine.endFrame()},n=()=>{let n=this._shouldRender;n||!this._renderedLastFrame||e||(e=this._scene.isReady(!0),n=!0),n?(this._renderedLastFrame||(null!==this._renderedLastFrame&&t(),this._renderedLastFrame=!0),this._sceneMutated=!1,this._scene.render(),this._camera.panningSensibility=5e3/this._camera.radius,this._camera.speed=.2*this._camera.radius,this.isAnimationPlaying&&(this.onAnimationProgressChanged.notifyObservers(),this._autoRotationBehavior.resetLastInteractionTime())):(this._camera.update(),this._renderedLastFrame&&i())};this._engine.runRenderLoop(n);let s=!1;this._renderLoopController={dispose:()=>{s||(s=!0,this._engine.stopRenderLoop(n),this._renderLoopController=null,this._renderedLastFrame&&i())}}}}_reframeCamera(e=!1,t=this._loadedModelsBacking){const i=V(t);this._reframeCameraFromBounds(i,e)}_reframeCameraFromBounds(e,t=!1){this._camera.useFramingBehavior=!0;const i=this._camera.getBehaviorByName("Framing");i.framingTime=0,i.elevationReturnTime=-1,this._camera.useAutoRotationBehavior=!0;const n=this._camera.alpha,s=this._camera.beta,o=this._camera.radius,r=this._camera.target,a=Math.PI/2,l=Math.PI/2.4;let h=1,c=r;if(e){this._camera.lowerRadiusLimit=null;const t=this._tempVectors[0].copyFromFloats(...e.extents.min),n=this._tempVectors[1].copyFromFloats(...e.extents.max);i.zoomOnBoundingInfo(t,n),h=1.1*u.Pq.FromArray(e.size).length(),c=u.Pq.FromArray(e.center),isFinite(h)||(h=1,c.copyFromFloats(0,0,0))}this._camera.alpha=Math.PI/2,this._camera.beta=Math.PI/2.4,this._camera.radius=h,this._camera.target=c,this._camera.lowerRadiusLimit=.001*h,this._camera.upperRadiusLimit=5*h,this._camera.minZ=.001*h,this._camera.maxZ=1e3*h,this._camera.wheelDeltaPercentage=.01,this._camera.useNaturalPinchZoom=!0,this._camera.restoreStateInterpolationFactor=.1,this._camera.storeState(),t&&(this._camera.alpha=n,this._camera.beta=s,this._camera.radius=o,this._camera.target=r,this._camera.interpolateTo(a,l,h,c)),D(this._skybox,this._camera)}_updateLight(){let e;if(this._activeModel){const t=this._activeModel.assetContainer.lights.length>0,i=!!this._reflectionTexture,n=this._activeModel.assetContainer.materials.length>0,s=this._activeModel.assetContainer.materials.some((e=>!(e instanceof l.Y)));e=!t&&(!i||!n||s)}else e=!1;e?this._light||(this._light=new o.g("defaultLight",u.Pq.Up(),this._scene)):(this._light?.dispose(),this._light=null)}_applyAnimationSpeed(){this._activeModel?.assetContainer.animationGroups.forEach((e=>e.speedRatio=this._animationSpeed))}async _pick(e,t){if(await i.e(6919).then(i.bind(i,86919)),this._loadedModels.length>0){const i=this._loadedModelsBacking.flatMap((e=>e.assetContainer.meshes));i.forEach((e=>{let t=this._meshDataCache.get(e);t||(t={},this._meshDataCache.set(e,t)),e.refreshBoundingInfo({applyMorph:!0,applySkeleton:!0,cache:t})}));const n=this._scene.pick(e,t,(e=>i.includes(e)));if(n.hit)return n}return null}_startSceneOptimizer(e=!1){this._stopSceneOptimizer(),e&&this._engine.setHardwareScalingLevel(this._defaultHardwareScalingLevel);const t=new A.cR(60,1e3),i=new A.bu(void 0,1);t.addOptimization(i),this._sceneOptimizer=new A.o8(this._scene,t),this._sceneOptimizer.start()}_stopSceneOptimizer(){this._sceneOptimizer?.dispose(),this._sceneOptimizer=null}_log(e){this.showDebugLogs&&f.V.Log(e)}_throwIfDisposedOrAborted(...e){if(this._isDisposed)throw new Error("Viewer is disposed.");B(...e)}}O();
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const z=globalThis,U=z.ShadowRoot&&(void 0===z.ShadyCSS||z.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Y=Symbol(),K=new WeakMap;let W=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==Y)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(U&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=K.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&K.set(t,e))}return e}toString(){return this.cssText}};const q=(e,...t)=>{const i=1===e.length?e[0]:t.reduce(((t,i,n)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[n+1]),e[0]);return new W(i,e,Y)},G=U?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new W("string"==typeof e?e:e+"",void 0,Y))(t)})(e):e
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */,{is:j,defineProperty:Z,getOwnPropertyDescriptor:X,getOwnPropertyNames:J,getOwnPropertySymbols:Q,getPrototypeOf:ee}=Object,te=globalThis,ie=te.trustedTypes,ne=ie?ie.emptyScript:"",se=te.reactiveElementPolyfillSupport,oe=(e,t)=>e,re={toAttribute(e,t){switch(t){case Boolean:e=e?ne:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},ae=(e,t)=>!j(e,t),le={attribute:!0,type:String,converter:re,reflect:!1,hasChanged:ae};Symbol.metadata??=Symbol("metadata"),te.litPropertyMetadata??=new WeakMap;class he extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=le){if(t.state&&(t.attribute=!1),this._$Ei(),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),n=this.getPropertyDescriptor(e,i,t);void 0!==n&&Z(this.prototype,e,n)}}static getPropertyDescriptor(e,t,i){const{get:n,set:s}=X(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get(){return n?.call(this)},set(t){const o=n?.call(this);s.call(this,t),this.requestUpdate(e,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??le}static _$Ei(){if(this.hasOwnProperty(oe("elementProperties")))return;const e=ee(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(oe("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(oe("properties"))){const e=this.properties,t=[...J(e),...Q(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(G(e))}else void 0!==e&&t.push(G(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((e=>e(this)))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,t)=>{if(U)e.adoptedStyleSheets=t.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet));else for(const i of t){const t=document.createElement("style"),n=z.litNonce;void 0!==n&&t.setAttribute("nonce",n),t.textContent=i.cssText,e.appendChild(t)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((e=>e.hostConnected?.()))}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach((e=>e.hostDisconnected?.()))}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$EC(e,t){const i=this.constructor.elementProperties.get(e),n=this.constructor._$Eu(e,i);if(void 0!==n&&!0===i.reflect){const s=(void 0!==i.converter?.toAttribute?i.converter:re).toAttribute(t,i.type);this._$Em=e,null==s?this.removeAttribute(n):this.setAttribute(n,s),this._$Em=null}}_$AK(e,t){const i=this.constructor,n=i._$Eh.get(e);if(void 0!==n&&this._$Em!==n){const e=i.getPropertyOptions(n),s="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:re;this._$Em=n,this[n]=s.fromAttribute(t,e.type),this._$Em=null}}requestUpdate(e,t,i){if(void 0!==e){if(i??=this.constructor.getPropertyOptions(e),!(i.hasChanged??ae)(this[e],t))return;this.P(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$ET())}P(e,t,i){this._$AL.has(e)||this._$AL.set(e,t),!0===i.reflect&&this._$Em!==e&&(this._$Ej??=new Set).add(e)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e)!0!==i.wrapped||this._$AL.has(t)||void 0===this[t]||this.P(t,this[t],i)}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach((e=>e.hostUpdate?.())),this.update(t)):this._$EU()}catch(t){throw e=!1,this._$EU(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach((e=>e.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Ej&&=this._$Ej.forEach((e=>this._$EC(e,this[e]))),this._$EU()}updated(e){}firstUpdated(e){}}he.elementStyles=[],he.shadowRootOptions={mode:"open"},he[oe("elementProperties")]=new Map,he[oe("finalized")]=new Map,se?.({ReactiveElement:he}),(te.reactiveElementVersions??=[]).push("2.0.4");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ce=globalThis,de=ce.trustedTypes,ue=de?de.createPolicy("lit-html",{createHTML:e=>e}):void 0,pe="$lit$",me=`lit$${Math.random().toFixed(9).slice(2)}$`,ge="?"+me,_e=`<${ge}>`,ve=document,be=()=>ve.createComment(""),ye=e=>null===e||"object"!=typeof e&&"function"!=typeof e,we=Array.isArray,fe="[ \t\n\f\r]",Ce=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ae=/-->/g,Pe=/>/g,Se=RegExp(`>|${fe}(?:([^\\s"'>=/]+)(${fe}*=${fe}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),xe=/'/g,$e=/"/g,ke=/^(?:script|style|textarea|title)$/i,Me=(e=>(t,...i)=>({_$litType$:e,strings:t,values:i}))(1),Ee=Symbol.for("lit-noChange"),Re=Symbol.for("lit-nothing"),Oe=new WeakMap,He=ve.createTreeWalker(ve,129);function Te(e,t){if(!we(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==ue?ue.createHTML(t):t}const Le=(e,t)=>{const i=e.length-1,n=[];let s,o=2===t?"<svg>":3===t?"<math>":"",r=Ce;for(let t=0;t<i;t++){const i=e[t];let a,l,h=-1,c=0;for(;c<i.length&&(r.lastIndex=c,l=r.exec(i),null!==l);)c=r.lastIndex,r===Ce?"!--"===l[1]?r=Ae:void 0!==l[1]?r=Pe:void 0!==l[2]?(ke.test(l[2])&&(s=RegExp("</"+l[2],"g")),r=Se):void 0!==l[3]&&(r=Se):r===Se?">"===l[0]?(r=s??Ce,h=-1):void 0===l[1]?h=-2:(h=r.lastIndex-l[2].length,a=l[1],r=void 0===l[3]?Se:'"'===l[3]?$e:xe):r===$e||r===xe?r=Se:r===Ae||r===Pe?r=Ce:(r=Se,s=void 0);const d=r===Se&&e[t+1].startsWith("/>")?" ":"";o+=r===Ce?i+_e:h>=0?(n.push(a),i.slice(0,h)+pe+i.slice(h)+me+d):i+me+(-2===h?t:d)}return[Te(e,o+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),n]};class Be{constructor({strings:e,_$litType$:t},i){let n;this.parts=[];let s=0,o=0;const r=e.length-1,a=this.parts,[l,h]=Le(e,t);if(this.el=Be.createElement(l,i),He.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(n=He.nextNode())&&a.length<r;){if(1===n.nodeType){if(n.hasAttributes())for(const e of n.getAttributeNames())if(e.endsWith(pe)){const t=h[o++],i=n.getAttribute(e).split(me),r=/([.?@])?(.*)/.exec(t);a.push({type:1,index:s,name:r[2],strings:i,ctor:"."===r[1]?Fe:"?"===r[1]?ze:"@"===r[1]?Ue:Ie}),n.removeAttribute(e)}else e.startsWith(me)&&(a.push({type:6,index:s}),n.removeAttribute(e));if(ke.test(n.tagName)){const e=n.textContent.split(me),t=e.length-1;if(t>0){n.textContent=de?de.emptyScript:"";for(let i=0;i<t;i++)n.append(e[i],be()),He.nextNode(),a.push({type:2,index:++s});n.append(e[t],be())}}}else if(8===n.nodeType)if(n.data===ge)a.push({type:2,index:s});else{let e=-1;for(;-1!==(e=n.data.indexOf(me,e+1));)a.push({type:7,index:s}),e+=me.length-1}s++}}static createElement(e,t){const i=ve.createElement("template");return i.innerHTML=e,i}}function De(e,t,i=e,n){if(t===Ee)return t;let s=void 0!==n?i._$Co?.[n]:i._$Cl;const o=ye(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),void 0===o?s=void 0:(s=new o(e),s._$AT(e,i,n)),void 0!==n?(i._$Co??=[])[n]=s:i._$Cl=s),void 0!==s&&(t=De(e,s._$AS(e,t.values),s,n)),t}class Ve{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,n=(e?.creationScope??ve).importNode(t,!0);He.currentNode=n;let s=He.nextNode(),o=0,r=0,a=i[0];for(;void 0!==a;){if(o===a.index){let t;2===a.type?t=new Ne(s,s.nextSibling,this,e):1===a.type?t=new a.ctor(s,a.name,a.strings,this,e):6===a.type&&(t=new Ye(s,this,e)),this._$AV.push(t),a=i[++r]}o!==a?.index&&(s=He.nextNode(),o++)}return He.currentNode=ve,n}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class Ne{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,n){this.type=2,this._$AH=Re,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=De(this,e,t),ye(e)?e===Re||null==e||""===e?(this._$AH!==Re&&this._$AR(),this._$AH=Re):e!==this._$AH&&e!==Ee&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>we(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==Re&&ye(this._$AH)?this._$AA.nextSibling.data=e:this.T(ve.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,n="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=Be.createElement(Te(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===n)this._$AH.p(t);else{const e=new Ve(n,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=Oe.get(e.strings);return void 0===t&&Oe.set(e.strings,t=new Be(e)),t}k(e){we(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,n=0;for(const s of e)n===t.length?t.push(i=new Ne(this.O(be()),this.O(be()),this,this.options)):i=t[n],i._$AI(s),n++;n<t.length&&(this._$AR(i&&i._$AB.nextSibling,n),t.length=n)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e&&e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class Ie{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,n,s){this.type=1,this._$AH=Re,this._$AN=void 0,this.element=e,this.name=t,this._$AM=n,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=Re}_$AI(e,t=this,i,n){const s=this.strings;let o=!1;if(void 0===s)e=De(this,e,t,0),o=!ye(e)||e!==this._$AH&&e!==Ee,o&&(this._$AH=e);else{const n=e;let r,a;for(e=s[0],r=0;r<s.length-1;r++)a=De(this,n[i+r],t,r),a===Ee&&(a=this._$AH[r]),o||=!ye(a)||a!==this._$AH[r],a===Re?e=Re:e!==Re&&(e+=(a??"")+s[r+1]),this._$AH[r]=a}o&&!n&&this.j(e)}j(e){e===Re?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Fe extends Ie{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===Re?void 0:e}}class ze extends Ie{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==Re)}}class Ue extends Ie{constructor(e,t,i,n,s){super(e,t,i,n,s),this.type=5}_$AI(e,t=this){if((e=De(this,e,t,0)??Re)===Ee)return;const i=this._$AH,n=e===Re&&i!==Re||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,s=e!==Re&&(i===Re||n);n&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class Ye{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){De(this,e)}}const Ke=ce.litHtmlPolyfillSupport;Ke?.(Be,Ne),(ce.litHtmlVersions??=[]).push("3.2.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
let We=class extends he{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const n=i?.renderBefore??t;let s=n._$litPart$;if(void 0===s){const e=i?.renderBefore??null;n._$litPart$=s=new Ne(t.insertBefore(be(),e),e,void 0,i??{})}return s._$AI(e),s})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Ee}};We._$litElement$=!0,We.finalized=!0,globalThis.litElementHydrateSupport?.({LitElement:We});const qe=globalThis.litElementPolyfillSupport;qe?.({LitElement:We}),(globalThis.litElementVersions??=[]).push("4.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ge=e=>(t,i)=>{void 0!==i?i.addInitializer((()=>{customElements.define(e,t)})):customElements.define(e,t)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */,je={attribute:!0,type:String,converter:re,reflect:!1,hasChanged:ae},Ze=(e=je,t,i)=>{const{kind:n,metadata:s}=i;let o=globalThis.litPropertyMetadata.get(s);if(void 0===o&&globalThis.litPropertyMetadata.set(s,o=new Map),o.set(i.name,e),"accessor"===n){const{name:n}=i;return{set(i){const s=t.get.call(this);t.set.call(this,i),this.requestUpdate(n,s,e)},init(t){return void 0!==t&&this.P(n,void 0,e),t}}}if("setter"===n){const{name:n}=i;return function(i){const s=this[n];t.call(this,i),this.requestUpdate(n,s,e)}}throw Error("Unsupported decorator location: "+n)};function Xe(e){return(t,i)=>"object"==typeof i?Ze(e,t,i):((e,t,i)=>{const n=t.hasOwnProperty(i);return t.constructor.createProperty(i,n?{...e,wrapped:!0}:e),n?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}function Je(e){return Xe({...e,state:!0,attribute:!1})}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Qe(e,t){return(t,i,n)=>((e,t,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&"object"!=typeof t&&Object.defineProperty(e,t,i),i))(t,i,{get(){return(t=>t.renderRoot?.querySelector(e)??null)(this)}})}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const et=2;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class tt{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const it=(e,t)=>{const i=e._$AN;if(void 0===i)return!1;for(const e of i)e._$AO?.(t,!1),it(e,t);return!0},nt=e=>{let t,i;do{if(void 0===(t=e._$AM))break;i=t._$AN,i.delete(e),e=t}while(0===i?.size)},st=e=>{for(let t;t=e._$AM;e=t){let i=t._$AN;if(void 0===i)t._$AN=i=new Set;else if(i.has(e))break;i.add(e),at(t)}};function ot(e){void 0!==this._$AN?(nt(this),this._$AM=e,st(this)):this._$AM=e}function rt(e,t=!1,i=0){const n=this._$AH,s=this._$AN;if(void 0!==s&&0!==s.size)if(t)if(Array.isArray(n))for(let e=i;e<n.length;e++)it(n[e],!1),nt(n[e]);else null!=n&&(it(n,!1),nt(n));else it(this,e)}const at=e=>{e.type==et&&(e._$AP??=rt,e._$AQ??=ot)};class lt extends tt{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,t,i){super._$AT(e,t,i),st(this),this.isConnected=e._$AU}_$AO(e,t=!0){e!==this.isConnected&&(this.isConnected=e,e?this.reconnected?.():this.disconnected?.()),t&&(it(this,e),nt(this))}setValue(e){if((e=>void 0===e.strings)(this._$Ct))this._$Ct._$AI(e,this);else{const t=[...this._$Ct._$AH];t[this._$Ci]=e,this._$Ct._$AI(t,this,0)}}disconnected(){}reconnected(){}}const ht=new WeakMap,ct=(e=>(...t)=>({_$litDirective$:e,values:t}))(class extends lt{render(e){return Re}update(e,[t]){const i=t!==this.Y;return i&&void 0!==this.Y&&this.rt(void 0),(i||this.lt!==this.ct)&&(this.Y=t,this.ht=e.options?.host,this.rt(this.ct=e.element)),Re}rt(e){if(this.isConnected||(e=void 0),"function"==typeof this.Y){const t=this.ht??globalThis;let i=ht.get(t);void 0===i&&(i=new WeakMap,ht.set(t,i)),void 0!==i.get(this.Y)&&this.Y.call(this.ht,void 0),i.set(this.Y,e),void 0!==e&&this.Y.call(this.ht,e)}else this.Y.value=e}get lt(){return"function"==typeof this.Y?ht.get(this.ht??globalThis)?.get(this.Y):this.Y?.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}}),dt={antialias:!0,adaptToDeviceRatio:!0};function ut(){return"gpu"in navigator&&"chrome"in window?"WebGPU":"WebGL"}async function pt(e,t){t={...dt,...t};const n=[];let s;switch(t.engine??ut()){case"WebGL":{const{Engine:n}=await Promise.resolve().then(i.bind(i,93856));s=new n(e,void 0,t);break}case"WebGPU":{const{WebGPUEngine:n}=await Promise.all([i.e(6960),i.e(1824)]).then(i.bind(i,66960)),o=new n(e,t);await o.initAsync(),s=o;break}}if(t.onFaulted){const e=t.onFaulted,i=s.onContextLostObservable.addOnce((()=>{e(new Error("The engine context was lost."))}));n.push((()=>i.remove()))}const o=t.onInitialized;t.onInitialized=t=>{let i=!1;const r=new ResizeObserver((()=>{i=!0,t.markSceneMutated()}));r.observe(e),n.push((()=>r.disconnect()));const a=t.scene.onBeforeRenderObservable.add((()=>{i&&(s.resize(),i=!1)}));n.push((()=>a.remove()));let l=null;const h=new IntersectionObserver((e=>{e.length>0&&(e[e.length-1].isIntersecting?(l?.dispose(),l=null):l=t.suspendRendering())}));h.observe(e),n.push((()=>h.disconnect())),o?.(t)};const r=new(t?.viewerClass??F)(s,t);return n.push(r.dispose.bind(r)),n.push((()=>s.dispose())),r.dispose=()=>n.forEach((e=>e())),r}const mt=[.5,1,1.5,2];async function gt(e,t){await i.e(6919).then(i.bind(i,86919));const s=e.assetContainer.scene,o=t.getForwardRay(100,t.getWorldMatrix(),t.globalPosition),r=t.globalPosition.clone();let a=1e-4;const l=u.Pq.Zero(),h=s.pickWithRay(o,(t=>e.assetContainer.meshes.includes(t)));if(h&&h.hit)l.copyFrom(h.pickedPoint);else{const t=e.getWorldBounds(),i=t?t.center:[0,0,0],n=u.Pq.FromArray(i),s=o.direction.clone();l.copyFrom(r),a=u.Pq.Distance(r,n),s.scaleAndAddToRef(a,l)}const c=u.Pq.Zero();r.subtractToRef(l,c),h&&h.hit&&(a=c.length());const d=(0,n.m$)(c),p=(0,n.__)(c.y,a),m=l.asArray();return{type:"world",position:m,normal:m,cameraOrbit:[d,p,a]}}class _t extends We{constructor(e,t={}){super(),this._viewerClass=e,this._options=t,this._viewerLock=new b.m,this._animationSliderResizeObserver=null,this._camerasAsHotSpotsAbortController=null,this._propertyBindings=[this._createPropertyBinding("clearColor",(e=>e.scene.onClearColorChangedObservable),(e=>e.scene.clearColor=this.clearColor??new c.ov(0,0,0,0)),(e=>this.clearColor=e.scene.clearColor)),this._createPropertyBinding("skyboxBlur",(e=>e.viewer.onEnvironmentConfigurationChanged),(e=>e.viewer.environmentConfig={blur:this.skyboxBlur??e.viewer.environmentConfig.blur}),(e=>this.skyboxBlur=e.viewer.environmentConfig.blur)),this._createPropertyBinding("environmentIntensity",(e=>e.viewer.onEnvironmentConfigurationChanged),(e=>e.viewer.environmentConfig={intensity:this.environmentIntensity??e.viewer.environmentConfig.intensity}),(e=>this.environmentIntensity=e.viewer.environmentConfig.intensity)),this._createPropertyBinding("environmentRotation",(e=>e.viewer.onEnvironmentConfigurationChanged),(e=>e.viewer.environmentConfig={rotation:this.environmentRotation??e.viewer.environmentConfig.rotation}),(e=>this.environmentRotation=e.viewer.environmentConfig.rotation)),this._createPropertyBinding("environmentVisible",(e=>e.viewer.onEnvironmentConfigurationChanged),(e=>e.viewer.environmentConfig={visible:this.environmentVisible??e.viewer.environmentConfig.visible}),(e=>this.environmentVisible=e.viewer.environmentConfig.visible)),this._createPropertyBinding("toneMapping",(e=>e.viewer.onPostProcessingChanged),(e=>{this.toneMapping&&(e.viewer.postProcessing={toneMapping:this.toneMapping})}),(e=>this.toneMapping=e.viewer.postProcessing?.toneMapping)),this._createPropertyBinding("contrast",(e=>e.viewer.onPostProcessingChanged),(e=>e.viewer.postProcessing={contrast:this.contrast??void 0}),(e=>this.contrast=e.viewer.postProcessing.contrast)),this._createPropertyBinding("exposure",(e=>e.viewer.onPostProcessingChanged),(e=>e.viewer.postProcessing={exposure:this.exposure??void 0}),(e=>this.exposure=e.viewer.postProcessing.exposure)),this._createPropertyBinding("cameraAutoOrbit",(e=>e.viewer.onCameraAutoOrbitChanged),(e=>e.viewer.cameraAutoOrbit={enabled:this.cameraAutoOrbit}),(e=>this.cameraAutoOrbit=e.viewer.cameraAutoOrbit.enabled)),this._createPropertyBinding("cameraAutoOrbitSpeed",(e=>e.viewer.onCameraAutoOrbitChanged),(e=>e.viewer.cameraAutoOrbit={speed:this.cameraAutoOrbitSpeed??void 0}),(e=>this.cameraAutoOrbitSpeed=e.viewer.cameraAutoOrbit.speed)),this._createPropertyBinding("cameraAutoOrbitDelay",(e=>e.viewer.onCameraAutoOrbitChanged),(e=>e.viewer.cameraAutoOrbit={delay:this.cameraAutoOrbitDelay??void 0}),(e=>this.cameraAutoOrbitDelay=e.viewer.cameraAutoOrbit.delay)),this._createPropertyBinding("animationSpeed",(e=>e.viewer.onAnimationSpeedChanged),(e=>e.viewer.animationSpeed=this.animationSpeed),(e=>{let t=e.viewer.animationSpeed;t=mt.reduce(((e,i)=>Math.abs(i-t)<Math.abs(e-t)?i:e)),this.animationSpeed=t,this._dispatchCustomEvent("animationspeedchange",(e=>new Event(e)))})),this._createPropertyBinding("selectedAnimation",(e=>e.viewer.onSelectedAnimationChanged),(e=>e.viewer.selectedAnimation=this.selectedAnimation??e.viewer.selectedAnimation),(e=>this.selectedAnimation=e.viewer.selectedAnimation)),this._createPropertyBinding("selectedMaterialVariant",(e=>e.viewer.onSelectedMaterialVariantChanged),(e=>e.viewer.selectedMaterialVariant=this.selectedMaterialVariant??e.viewer.selectedMaterialVariant??""),(e=>this.selectedMaterialVariant=e.viewer.selectedMaterialVariant))],this._isFaultedBacking=!1,this.engine=ut(),this.renderWhenIdle=!1,this.source=null,this.extension=null,this.environmentLighting=null,this.environmentSkybox=null,this.environmentIntensity=null,this.environmentRotation=null,this.environmentVisible=null,this._loadingProgress=!1,this.skyboxBlur=null,this.toneMapping=null,this.contrast=null,this.exposure=null,this.clearColor=null,this.cameraAutoOrbit=!1,this.cameraAutoOrbitSpeed=null,this.cameraAutoOrbitDelay=null,this._cameraOrbitCoercer=null,this._cameraTargetCoercer=null,this.hotSpots={},this.animationAutoPlay=!1,this.selectedAnimation=null,this.animationSpeed=1,this.animationProgress=0,this._animations=[],this._isAnimationPlaying=!1,this._showAnimationSlider=!0,this.selectedMaterialVariant=null,this.camerasAsHotSpots=!1}get viewerDetails(){return this._viewerDetails}queryHotSpot(e,t){return null!=this._queryHotSpot(e,t)}_queryHotSpot(e,t){if(this._viewerDetails){const i=this.hotSpots?.[e];if(i&&this._viewerDetails.viewer.getHotSpotToRef(i,t))return i}return null}focusHotSpot(e){const t=new I,i=this._queryHotSpot(e,t);if(i&&this._viewerDetails){this._viewerDetails.viewer.pauseAnimation();const e=i.cameraOrbit??[void 0,void 0,void 0];return this._viewerDetails.camera.interpolateTo(e[0],e[1],e[2],new u.Pq(t.worldPosition[0],t.worldPosition[1],t.worldPosition[2])),!0}return!1}get _isFaulted(){return this._isFaultedBacking}get environment(){return{lighting:this.environmentLighting,skybox:this.environmentSkybox}}set environment(e){this.environmentLighting=e||null,this.environmentSkybox=e||null}get loadingProgress(){return this._loadingProgress}get _hasHotSpots(){return Object.keys(this.hotSpots).length>0}get animations(){return this._animations}get _hasAnimations(){return this._animations.length>0}get isAnimationPlaying(){return this._isAnimationPlaying}get materialVariants(){return this._viewerDetails?.viewer.materialVariants??[]}toggleAnimation(){this._viewerDetails?.viewer.toggleAnimation()}resetCamera(){this._viewerDetails?.viewer.resetCamera()}connectedCallback(){super.connectedCallback(),this._setupViewer()}disconnectedCallback(){super.disconnectedCallback(),this._tearDownViewer()}update(e){super.update(e),this._hotSpotSelect&&(this._hotSpotSelect.value=""),e.get("engine")||null!=e.get("renderWhenIdle")?(this._tearDownViewer(),this._setupViewer()):(this._propertyBindings.filter((t=>e.has(t.property))).forEach((e=>e.updateViewer())),e.has("source")&&this._updateModel(),(e.has("environmentLighting")||e.has("environmentSkybox"))&&this._updateEnv({lighting:e.has("environmentLighting"),skybox:e.has("environmentSkybox")})),e.has("camerasAsHotSpots")&&this._toggleCamerasAsHotSpots()}render(){return Me`
            <div class="full-size">
                <div id="canvasContainer" class="full-size"></div>
                ${this._renderOverlay()}
            </div>
        `}_renderProgressBar(){const e=!1!==this.loadingProgress,t="boolean"==typeof this.loadingProgress?0:100*this.loadingProgress,i=!0===this.loadingProgress;return Me`
            <div part="progress-bar" class="bar loading-progress-outer ${e?"":"loading-progress-outer-inactive"}" aria-label="Loading Progress">
                <div
                    class="loading-progress-inner ${i?"loading-progress-inner-indeterminate":""}"
                    style="${i?"":`width: ${t}%`}"
                ></div>
            </div>
        `}_renderToolbar(){let e=[];if(null!=this._viewerDetails?.model){this._hasAnimations&&e.push(Me`
                    <div class="animation-timeline">
                        <button aria-label="${this.isAnimationPlaying?"Pause":"Play"}" @click="${this.toggleAnimation}">
                            ${this.isAnimationPlaying?Me`
                                      <svg viewBox="0 0 24 24">
                                          <path d="${"M5.74609 3C4.7796 3 3.99609 3.7835 3.99609 4.75V19.25C3.99609 20.2165 4.7796 21 5.74609 21H9.24609C10.2126 21 10.9961 20.2165 10.9961 19.25V4.75C10.9961 3.7835 10.2126 3 9.24609 3H5.74609ZM14.7461 3C13.7796 3 12.9961 3.7835 12.9961 4.75V19.25C12.9961 20.2165 13.7796 21 14.7461 21H18.2461C19.2126 21 19.9961 20.2165 19.9961 19.25V4.75C19.9961 3.7835 19.2126 3 18.2461 3H14.7461Z"}" fill="currentColor"></path>
                                      </svg>
                                  `:Me`
                                      <svg viewBox="0 0 24 24">
                                          <path d="${"M5 5.27368C5 3.56682 6.82609 2.48151 8.32538 3.2973L20.687 10.0235C22.2531 10.8756 22.2531 13.124 20.687 13.9762L8.32538 20.7024C6.82609 21.5181 5 20.4328 5 18.726V5.27368Z"}" fill="currentColor"></path>
                                      </svg>
                                  `}
                        </button>
                        <input
                            ${ct(this._onAnimationSliderChanged)}
                            aria-label="Animation Progress"
                            class="animation-timeline-input"
                            style="${this._showAnimationSlider?"":"visibility: hidden"}"
                            type="range"
                            min="0"
                            max="1"
                            step="0.0001"
                            .value="${this.animationProgress}"
                            @input="${this._onAnimationTimelineChanged}"
                            @pointerdown="${this._onAnimationTimelinePointerDown}"
                        />
                    </div>
                    <select aria-label="Select Animation Speed" @change="${this._onAnimationSpeedChanged}">
                        ${mt.map((e=>Me`<option value="${e}" .selected="${this.animationSpeed===e}">${e}x</option> `))}
                    </select>
                    ${this.animations.length>1?Me`<select aria-label="Select Animation" @change="${this._onSelectedAnimationChanged}">
                              ${this.animations.map(((e,t)=>Me`<option value="${t}" .selected="${this.selectedAnimation===t}">${e}</option>`))}
                          </select>`:""}
                `),this.materialVariants.length>1&&e.push(Me`
                    <select aria-label="Select Material Variant" @change="${this._onMaterialVariantChanged}">
                        ${this.materialVariants.map((e=>Me`<option value="${e}" .selected="${this.selectedMaterialVariant===e}">${e}</option>`))}
                    </select>
                `),e.push(Me`
                <button aria-label="Reset Camera Pose" @click="${this.resetCamera}">
                    <svg viewBox="0 0 24 24">
                        <path d="${"M7.20711 2.54289C7.59763 2.93342 7.59763 3.56658 7.20711 3.95711L5.41421 5.75H13.25C17.6683 5.75 21.25 9.33172 21.25 13.75C21.25 18.1683 17.6683 21.75 13.25 21.75C8.83172 21.75 5.25 18.1683 5.25 13.75C5.25 13.1977 5.69772 12.75 6.25 12.75C6.80228 12.75 7.25 13.1977 7.25 13.75C7.25 17.0637 9.93629 19.75 13.25 19.75C16.5637 19.75 19.25 17.0637 19.25 13.75C19.25 10.4363 16.5637 7.75 13.25 7.75H5.41421L7.20711 9.54289C7.59763 9.93342 7.59763 10.5666 7.20711 10.9571C6.81658 11.3476 6.18342 11.3476 5.79289 10.9571L2.29289 7.45711C1.90237 7.06658 1.90237 6.43342 2.29289 6.04289L5.79289 2.54289C6.18342 2.15237 6.81658 2.15237 7.20711 2.54289Z"}" fill="currentColor"></path>
                    </svg>
                </button>
            `),this._hasHotSpots&&e.push(Me`
                    <div class="select-container">
                        <select id="hotSpotSelect" aria-label="Select HotSpot" @change="${this._onHotSpotsChanged}">
                            <!-- When the select is forced to be less wide than the options, padding on the right is lost. Pad with white space. -->
                            ${Object.keys(this.hotSpots).map((e=>Me`<option value="${e}">${e}&nbsp;&nbsp;</option>`))}
                        </select>
                        <!-- This button is not actually interactive, we want input to pass through to the select below. -->
                        <button style="pointer-events: none">
                            <svg viewBox="0 0 24 24">
                                <path d="${"M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14ZM6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12C18 15.3137 15.3137 18 12 18C8.68629 18 6 15.3137 6 12ZM12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4Z"}" fill="currentColor"></path>
                            </svg>
                        </button>
                    </div>
                `);const t=e.length,i=Me`<div class="divider"></div>`;e=e.reduce(((e,n,s)=>s<t-1?[...e,n,i]:[...e,n]),new Array)}return e.length>0?Me` <div part="tool-bar" class="bar ${this._hasAnimations?"":"bar-min"} tool-bar">${e}</div>`:Me``}_renderReloadButton(){return Me`${this._isFaulted?Me`
                  <button aria-label="Reload" part="reload-button" class="reload-button" @click="${this._setupViewer}">
                      <svg viewBox="0 0 24 24">
                          <path d="${"M5 12C5 8.13401 8.13401 5 12 5C13.32 5 14.5542 5.36484 15.608 6H15C14.4477 6 14 6.44772 14 7C14 7.55228 14.4477 8 15 8H18C18.5523 8 19 7.55228 19 7C19 6 19 5 19 4C19 3.44772 18.5523 3 18 3C17.4477 3 17 3.44772 17 4V4.51575C15.5702 3.5588 13.85 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 11.6199 20.9764 11.2448 20.9304 10.8763C20.8621 10.3282 20.3624 9.93935 19.8144 10.0077C19.2663 10.076 18.8775 10.5757 18.9458 11.1237C18.9815 11.4104 19 11.7028 19 12C19 15.866 15.866 19 12 19C8.13401 19 5 15.866 5 12Z"}" fill="currentColor"></path>
                      </svg>
                  </button>
              `:""}`}_renderOverlay(){return Me`
            <slot class="full-size children-slot"></slot>
            <slot name="progress-bar">${this._renderProgressBar()}</slot>
            <slot name="tool-bar">${this._renderToolbar()}</slot>
            <slot name="reload-button">${this._renderReloadButton()}</slot>
        `}_dispatchCustomEvent(e,t){this.dispatchEvent(t(e))}_onSelectedAnimationChanged(e){const t=e.target;this.selectedAnimation=Number(t.value)}_onAnimationSpeedChanged(e){const t=e.target;this.animationSpeed=Number(t.value)}_onAnimationTimelineChanged(e){if(this._viewerDetails){const t=e.target,i=Number(t.value);i!==this.animationProgress&&(this._viewerDetails.viewer.animationProgress=i)}}_onAnimationTimelinePointerDown(e){if(this._viewerDetails?.viewer.isAnimationPlaying){this._viewerDetails.viewer.pauseAnimation();e.target.addEventListener("pointerup",(()=>this._viewerDetails?.viewer.playAnimation()),{once:!0})}}_onMaterialVariantChanged(e){const t=e.target;this.selectedMaterialVariant=t.value}_onHotSpotsChanged(e){const t=e.target,i=t.value;t.value="",this.focusHotSpot(i)}_onAnimationSliderChanged(e){this._animationSliderResizeObserver?.disconnect(),e&&(this._animationSliderResizeObserver=new ResizeObserver((()=>{this._showAnimationSlider=e.clientWidth>=80})),this._animationSliderResizeObserver.observe(e))}_createPropertyBinding(e,t,i,n){return{property:e,onInitialized:e=>{t(e).add((()=>{n(e)})),i(e)},updateViewer:()=>{this._viewerDetails&&i(this._viewerDetails)},syncToAttribute:()=>{const t=_t.elementProperties.get(e);if(t&&t.attribute){const i=!0===t.attribute?e:t.attribute;if(this.hasAttribute(i)){const n=this.getAttribute(i),s="function"==typeof t.converter?t.converter:void 0!==t.converter?.fromAttribute?t.converter.fromAttribute:re.fromAttribute;this[e]=s?s(n,t.type):n}}}}}async _addCameraHotSpot(e,t){if(e!==this._viewerDetails?.camera){const i=await this._createHotSpotFromCamera(e);i&&!t?.aborted&&(this.hotSpots={...this.hotSpots,[`camera-${e.name}`]:i})}}_removeCameraHotSpot(e){delete this.hotSpots[`camera-${e.name}`],this.hotSpots={...this.hotSpots}}_toggleCamerasAsHotSpots(){if(this.camerasAsHotSpots){const e=this._camerasAsHotSpotsAbortController=new AbortController;this._viewerDetails?.scene.cameras.forEach((t=>this._addCameraHotSpot(t,e.signal)))}else this._camerasAsHotSpotsAbortController?.abort(),this._camerasAsHotSpotsAbortController=null,this._viewerDetails?.scene.cameras.forEach((e=>this._removeCameraHotSpot(e)))}async _setupViewer(){await this._viewerLock.lockAsync((async()=>{if(this._canvasContainer||await this.updateComplete,this._canvasContainer&&!this._viewerDetails){const e=document.createElement("canvas");e.className="full-size canvas",e.setAttribute("touch-action","none"),this._canvasContainer.appendChild(e);{const t=new T.c,i=await this._createViewer(e,Object.assign({engine:this.engine,autoSuspendRendering:!this.renderWhenIdle,onFaulted:()=>{this._isFaultedBacking=!0,this._tearDownViewer()},onInitialized:e=>{t.resolve(e)}},this._options)),n=await t.promise;this._viewerDetails=Object.assign(n,{viewer:i})}const t=this._viewerDetails;t.viewer.onEnvironmentChanged.add((()=>{this._dispatchCustomEvent("environmentchange",(e=>new Event(e)))})),t.viewer.onEnvironmentConfigurationChanged.add((()=>{this._dispatchCustomEvent("environmentconfigurationchange",(e=>new Event(e)))})),t.viewer.onEnvironmentError.add((e=>{this._dispatchCustomEvent("environmenterror",(t=>new ErrorEvent(t,{error:e})))})),t.viewer.onModelChanged.add((e=>{this._animations=[...t.viewer.animations],this._propertyBindings.forEach((e=>e.syncToAttribute())),this._cameraOrbitCoercer?.(t.camera),this._cameraTargetCoercer?.(t.camera),this._dispatchCustomEvent("modelchange",(t=>new CustomEvent(t,{detail:e})))})),t.viewer.onModelError.add((e=>{this._animations=[...t.viewer.animations],this._dispatchCustomEvent("modelerror",(t=>new ErrorEvent(t,{error:e})))})),t.viewer.onLoadingProgressChanged.add((()=>{this._loadingProgress=t.viewer.loadingProgress,this._dispatchCustomEvent("loadingprogresschange",(e=>new Event(e)))})),t.viewer.onIsAnimationPlayingChanged.add((()=>{this._isAnimationPlaying=t.viewer.isAnimationPlaying??!1,this._dispatchCustomEvent("animationplayingchange",(e=>new Event(e)))})),t.viewer.onAnimationProgressChanged.add((()=>{this.animationProgress=t.viewer.animationProgress??0,this._dispatchCustomEvent("animationprogresschange",(e=>new Event(e)))})),t.scene.onNewCameraAddedObservable.add((e=>{this.camerasAsHotSpots&&this._addCameraHotSpot(e,this._camerasAsHotSpotsAbortController?.signal)})),t.scene.onCameraRemovedObservable.add((e=>{this._removeCameraHotSpot(e)})),t.scene.onAfterRenderCameraObservable.add((()=>{this._dispatchCustomEvent("viewerrender",(e=>new Event(e)))})),this._updateModel(),this._updateEnv({lighting:!0,skybox:!0}),this._propertyBindings.forEach((e=>e.onInitialized(t))),this._dispatchCustomEvent("viewerready",(e=>new Event(e)))}this._isFaultedBacking=!1}))}async _createViewer(e,t){return pt(e,Object.assign(t,{viewerClass:this._viewerClass}))}async _tearDownViewer(){await this._viewerLock.lockAsync((async()=>{this._viewerDetails&&(this._viewerDetails.viewer.dispose(),this._viewerDetails=void 0),this._loadingProgress=!1,this._canvasContainer&&this._canvasContainer.firstElementChild&&this._canvasContainer.removeChild(this._canvasContainer.firstElementChild)}))}async _updateModel(){if(this._viewerDetails)try{this.source?await this._viewerDetails.viewer.loadModel(this.source,{pluginExtension:this.extension??void 0,defaultAnimation:this.selectedAnimation??0,animationAutoPlay:this.animationAutoPlay}):await this._viewerDetails.viewer.resetModel()}catch(e){e instanceof w.lc||f.V.Error(e)}}async _updateEnv(e){if(this._viewerDetails)try{const t=[];e.lighting&&e.skybox&&this.environmentLighting===this.environmentSkybox?t.push([this.environmentLighting,{lighting:!0,skybox:!0}]):(e.lighting&&t.push([this.environmentLighting,{lighting:!0}]),e.skybox&&t.push([this.environmentSkybox,{skybox:!0}]));const i=t.map((async([e,t])=>{e?await(this._viewerDetails?.viewer.loadEnvironment(e,t)):await(this._viewerDetails?.viewer.resetEnvironment(t))}));await Promise.all(i)}catch(e){e instanceof w.lc||f.V.Error(e)}}async _createHotSpotFromCamera(e){if(e instanceof n.Lq){const t=e.target.asArray();return{type:"world",position:t,normal:t,cameraOrbit:[e.alpha,e.beta,e.radius]}}return this._viewerDetails?.model?gt(this._viewerDetails.model,e):null}}_t.styles=q`
        :host {
            --ui-foreground-color: white;
            --ui-background-hue: 233;
            --ui-background-saturation: 8%;
            --ui-background-lightness: 39%;
            --ui-background-opacity: 0.75;
            --ui-background-color: hsla(var(--ui-background-hue), var(--ui-background-saturation), var(--ui-background-lightness), var(--ui-background-opacity));
            --ui-background-color-hover: hsla(
                var(--ui-background-hue),
                var(--ui-background-saturation),
                calc(var(--ui-background-lightness) - 10%),
                calc(var(--ui-background-opacity) - 0.1)
            );
            all: inherit;
            overflow: hidden;
        }

        .full-size {
            display: block;
            position: relative;
            width: 100%;
            height: 100%;
        }

        .canvas {
            outline: none;
        }

        .children-slot {
            position: absolute;
            top: 0;
            background: transparent;
            pointer-events: none;
        }

        .reload-button {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 25%;
            transform: translate(-50%, -50%);
            color: var(--ui-foreground-color);
            background-color: var(--ui-background-color);
            border: 1px solid transparent;
            border-radius: 24px;
            padding: 0;
            cursor: pointer;
            outline: none;
        }

        .reload-button:hover {
            background-color: var(--ui-background-color-hover);
        }

        .bar {
            position: absolute;
            width: calc(100% - 24px);
            min-width: 150px;
            max-width: 1280px;
            left: 50%;
            transform: translateX(-50%);
            background-color: var(--ui-background-color);
        }

        .bar-min {
            width: unset;
            min-width: unset;
            max-width: unset;
        }

        .loading-progress-outer {
            height: 4px;
            border-radius: 4px;
            border: 1px solid var(--ui-background-color);
            outline: none;
            top: 12px;
            pointer-events: none;
            transition: opacity 0.5s ease;
        }

        .loading-progress-outer-inactive {
            opacity: 0;
            /* Set the background color to the foreground color while in the inactive state so that the color seen is correct while fading out the opacity. */
            background-color: var(--ui-foreground-color);
        }

        .loading-progress-inner {
            width: 0;
            height: 100%;
            border-radius: inherit;
            background-color: var(--ui-foreground-color);
            transition: width 0.3s linear;
        }

        /* The right side of the inner progress bar starts aligned with the left side of the outer progress bar (container).
           So, if the width is 30%, then the left side of the inner progress bar moves a total of 130% of the width of the container.
           This is why the first keyframe is at 23% ((100/130)*30).
         */
        @keyframes indeterminate {
            0% {
                left: 0%;
                width: 0%;
            }
            23% {
                left: 0%;
                width: 30%;
            }
            77% {
                left: 70%;
                width: 30%;
            }
            100% {
                left: 100%;
                width: 0%;
            }
        }

        .loading-progress-inner-indeterminate {
            position: absolute;
            animation: indeterminate 1.5s infinite;
            animation-timing-function: linear;
        }

        .tool-bar {
            display: flex;
            flex-direction: row;
            align-items: center;
            border-radius: 12px;
            border-color: var(--ui-foreground-color);
            height: 48px;
            bottom: 12px;
            min-width: 370px;
            color: var(--ui-foreground-color);
            -webkit-tap-highlight-color: transparent;
        }

        .tool-bar * {
            height: 100%;
            min-width: 48px;
        }

        .tool-bar .divider {
            min-width: 1px;
            margin: 0px 6px;
            height: 66%;
            background-color: var(--ui-foreground-color);
        }

        .tool-bar select {
            background: none;
            min-width: 52px;
            max-width: 128px;
            border: 1px solid transparent;
            border-radius: inherit;
            color: inherit;
            font-size: 14px;
            padding: 0px 12px;
            cursor: pointer;
            outline: none;
            appearance: none; /* Remove default styling */
            -webkit-appearance: none; /* Remove default styling for Safari */
        }

        .tool-bar .select-container {
            position: relative;
            display: flex;
            border-radius: inherit;
            border-width: 0;
            padding: 0;
        }

        .tool-bar .select-container select {
            position: absolute;
            min-width: 0;
            width: 100%;
        }

        .tool-bar .select-container button {
            position: absolute;
            border-width: 0;
        }

        .tool-bar select:hover,
        .tool-bar select:focus {
            background-color: var(--ui-background-color-hover);
        }

        .tool-bar select option {
            background-color: var(--ui-background-color);
            color: var(--ui-foreground-color);
        }

        .tool-bar select:focus-visible {
            border-color: inherit;
        }

        .tool-bar button {
            background: none;
            border: 1px solid transparent;
            border-radius: inherit;
            color: inherit;
            padding: 0;
            cursor: pointer;
            outline: none;
        }

        .tool-bar button:hover {
            background-color: var(--ui-background-color-hover);
        }

        .tool-bar button:focus-visible {
            border-color: inherit;
        }

        .tool-bar button svg {
            width: 32px;
            height: 32px;
        }

        .animation-timeline {
            display: flex;
            flex: 1;
            position: relative;
            overflow: hidden;
            cursor: pointer;
            align-items: center;
            border-radius: inherit;
            border-color: inherit;
        }

        .animation-timeline-input {
            -webkit-appearance: none;
            cursor: pointer;
            width: 100%;
            height: 100%;
            outline: none;
            border: 1px solid transparent;
            border-radius: inherit;
            padding: 0 12px;
            background-color: transparent;
        }

        .animation-timeline-input:focus-visible {
            border-color: inherit;
        }

        /*Chrome -webkit */

        .animation-timeline-input::-webkit-slider-thumb {
            -webkit-appearance: none;
            width: 20px;
            height: 20px;
            border: 2px solid;
            color: var(--ui-foreground-color);
            border-radius: 50%;
            background: hsla(var(--ui-background-hue), var(--ui-background-saturation), var(--ui-background-lightness), 1);
            margin-top: -10px;
        }

        .animation-timeline-input::-webkit-slider-runnable-track {
            height: 2px;
            -webkit-appearance: none;
            background-color: var(--ui-foreground-color);
        }

        /** FireFox -moz */

        .animation-timeline-input::-moz-range-progress {
            height: 2px;
            background-color: var(--ui-foreground-color);
        }

        .animation-timeline-input::-moz-range-thumb {
            width: 16px;
            height: 16px;
            border: 2px solid var(--ui-foreground-color);
            border-radius: 50%;
            background: hsla(var(--ui-background-hue), var(--ui-background-saturation), var(--ui-background-lightness), 1);
        }

        .animation-timeline-input::-moz-range-track {
            height: 2px;
            background: var(--ui-foreground-color);
        }
    `,(0,H.Cg)([Je()],_t.prototype,"_isFaultedBacking",void 0),(0,H.Cg)([Xe({converter:e=>"WebGL"===e||"WebGPU"===e?e:ut()})],_t.prototype,"engine",void 0),(0,H.Cg)([Xe({attribute:"render-when-idle",type:Boolean})],_t.prototype,"renderWhenIdle",void 0),(0,H.Cg)([Xe()],_t.prototype,"source",void 0),(0,H.Cg)([Xe()],_t.prototype,"extension",void 0),(0,H.Cg)([Xe({hasChanged:(e,t)=>e.lighting!==t.lighting||e.skybox!==t.skybox})],_t.prototype,"environment",null),(0,H.Cg)([Xe({attribute:"environment-lighting"})],_t.prototype,"environmentLighting",void 0),(0,H.Cg)([Xe({attribute:"environment-skybox"})],_t.prototype,"environmentSkybox",void 0),(0,H.Cg)([Xe({type:Number,attribute:"environment-intensity"})],_t.prototype,"environmentIntensity",void 0),(0,H.Cg)([Xe({type:Number,attribute:"environment-rotation"})],_t.prototype,"environmentRotation",void 0),(0,H.Cg)([Xe({attribute:"environment-visible"})],_t.prototype,"environmentVisible",void 0),(0,H.Cg)([Je()],_t.prototype,"_loadingProgress",void 0),(0,H.Cg)([Xe({attribute:"skybox-blur"})],_t.prototype,"skyboxBlur",void 0),(0,H.Cg)([Xe({attribute:"tone-mapping",converter:e=>e&&function(e){return L.includes(e)}(e)?e:"neutral"})],_t.prototype,"toneMapping",void 0),(0,H.Cg)([Xe()],_t.prototype,"contrast",void 0),(0,H.Cg)([Xe()],_t.prototype,"exposure",void 0),(0,H.Cg)([Xe({attribute:"clear-color",reflect:!0,converter:{fromAttribute:function(e){if(!e)return null;const t=document.createElement("canvas");t.width=t.height=1;const i=t.getContext("2d");if(!i)throw new Error("Unable to get 2d context for parseColor");i.clearRect(0,0,1,1),i.fillStyle=e,i.fillRect(0,0,1,1);const n=i.getImageData(0,0,1,1).data;return new c.ov(n[0]/255,n[1]/255,n[2]/255,n[3]/255)},toAttribute:e=>e?e.toHexString():null}})],_t.prototype,"clearColor",void 0),(0,H.Cg)([Xe({attribute:"camera-auto-orbit",type:Boolean})],_t.prototype,"cameraAutoOrbit",void 0),(0,H.Cg)([Xe({attribute:"camera-auto-orbit-speed",type:Number})],_t.prototype,"cameraAutoOrbitSpeed",void 0),(0,H.Cg)([Xe({attribute:"camera-auto-orbit-delay",type:Number})],_t.prototype,"cameraAutoOrbitDelay",void 0),(0,H.Cg)([Xe({attribute:"camera-orbit",converter:e=>{if(!e)return null;const t=e.trim().split(/\s+/);if(3!==t.length)throw new Error("cameraOrbit should be defined as 'alpha beta radius'");return e=>{for(const[i,n]of["alpha","beta","radius"].entries()){const s=t[i];"auto"!==s&&(e[n]=Number(s))}}}})],_t.prototype,"_cameraOrbitCoercer",void 0),(0,H.Cg)([Xe({attribute:"camera-target",converter:e=>{if(!e)return null;const t=e.trim().split(/\s+/);if(3!==t.length)throw new Error("cameraTarget should be defined as 'x y z'");return e=>{const i=e.target;for(const[e,n]of["x","y","z"].entries()){const s=t[e];"auto"!==s&&(i[n]=Number(s))}e.target=i.clone()}}})],_t.prototype,"_cameraTargetCoercer",void 0),(0,H.Cg)([Xe({attribute:"hotspots",converter:e=>e?JSON.parse(e):{}})],_t.prototype,"hotSpots",void 0),(0,H.Cg)([Xe({attribute:"animation-auto-play",reflect:!0,type:Boolean})],_t.prototype,"animationAutoPlay",void 0),(0,H.Cg)([Xe({attribute:"selected-animation",type:Number})],_t.prototype,"selectedAnimation",void 0),(0,H.Cg)([Xe({attribute:"animation-speed"})],_t.prototype,"animationSpeed",void 0),(0,H.Cg)([Xe({attribute:!1})],_t.prototype,"animationProgress",void 0),(0,H.Cg)([Je()],_t.prototype,"_animations",void 0),(0,H.Cg)([Je()],_t.prototype,"_isAnimationPlaying",void 0),(0,H.Cg)([Je()],_t.prototype,"_showAnimationSlider",void 0),(0,H.Cg)([Xe({attribute:"material-variant"})],_t.prototype,"selectedMaterialVariant",void 0),(0,H.Cg)([Xe({attribute:"cameras-as-hotspots",reflect:!0,type:Boolean})],_t.prototype,"camerasAsHotSpots",void 0),(0,H.Cg)([Qe("#canvasContainer")],_t.prototype,"_canvasContainer",void 0),(0,H.Cg)([Qe("#hotSpotSelect")],_t.prototype,"_hotSpotSelect",void 0);let vt=class extends _t{constructor(e){super(F,e)}};vt=(0,H.Cg)([Ge("babylon-viewer")],vt);let bt=class extends We{constructor(){super(...arguments),this._internals=this.attachInternals(),this._mutationObserver=new MutationObserver((e=>{e.some((e=>"childList"===e.type))&&this._sanitizeInnerHTML()})),this._viewerAttachment=null,this._connectingAbortController=null,this._updateAnnotation=null,this.hotSpot=""}connectedCallback(){super.connectedCallback(),this._internals.states?.add("invalid"),this._connectingAbortController?.abort(),this._connectingAbortController=new AbortController;const e=this._connectingAbortController.signal;(async()=>{if(this.parentElement?.matches(":not(:defined)")&&(await customElements.whenDefined(this.parentElement?.tagName.toLowerCase()),e.aborted))return;if(!(this.parentElement instanceof _t))return void console.warn("The babylon-viewer-annotation element must be a child of a babylon-viewer element.");this._mutationObserver.observe(this,{childList:!0,characterData:!0}),this._sanitizeInnerHTML();const t=this.parentElement,i=new I,n=this._updateAnnotation=()=>{if(this.hotSpot)if(t.queryHotSpot(this.hotSpot,i)){const[e,t]=i.screenPosition;this.style.transform=`translate(${e}px, ${t}px)`,this._internals.states?.delete("invalid"),i.visibility<=0?this._internals.states?.add("back-facing"):this._internals.states?.delete("back-facing")}else this._internals.states?.add("invalid")};this._updateAnnotation(),t.addEventListener("viewerrender",n),this._viewerAttachment={dispose(){t.removeEventListener("viewerrender",n)}}})()}disconnectedCallback(){super.disconnectedCallback(),this._connectingAbortController?.abort(),this._connectingAbortController=null,this._viewerAttachment?.dispose(),this._viewerAttachment=null,this._internals.states?.add("invalid"),this._updateAnnotation=null}render(){return Me` <slot><div aria-label="${this.hotSpot} annotation" part="annotation" class="annotation">${this.hotSpot}</div></slot> `}update(e){super.update(e),e.has("hotSpot")&&this._updateAnnotation?.()}_sanitizeInnerHTML(){0===this.innerHTML.trim().length&&(this.innerHTML="")}};bt.styles=q`
        :host {
            --annotation-foreground-color: black;
            --annotation-background-color: white;
            display: inline-block;
            position: absolute;
            transition: opacity 0.25s;
        }

        :host([hidden]) {
            display: none;
        }

        :host(:state(back-facing)) {
            opacity: 0.2;
        }

        :host(:state(invalid)) {
            display: none;
        }

        .annotation {
            transform: translate(-50%, -135%);
            font-size: 14px;
            padding: 0px 6px;
            border-radius: 6px;
            color: var(--annotation-foreground-color);
            background-color: var(--annotation-background-color);
        }

        .annotation::after {
            content: "";
            position: absolute;
            left: 50%;
            height: 60%;
            aspect-ratio: 1;
            transform: translate(-50%, 110%) rotate(-45deg);
            background-color: inherit;
            clip-path: polygon(0 0, 100% 100%, 0 100%, 0 0);
        }
    `,(0,H.Cg)([Xe({attribute:"hotspot"})],bt.prototype,"hotSpot",void 0),bt=(0,H.Cg)([Ge("babylon-viewer-annotation")],bt)},71452:(e,t,i)=>{i.d(t,{W:()=>n});const n={name:"stl",extensions:{".stl":{isBinary:!0}}}}}]);