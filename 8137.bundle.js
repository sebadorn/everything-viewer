"use strict";(self.webpackChunkeverything_viewer=self.webpackChunkeverything_viewer||[]).push([[8137],{48137:(e,r,f)=>{f.r(r),f.d(r,{iblCdfDebugPixelShaderWGSL:()=>i});const c="iblCdfDebugPixelShader",t="#define PI 3.1415927\nvarying vUV: vec2f;var cdfySampler: sampler;var cdfy: texture_2d<f32>;var cdfxSampler: sampler;var cdfx: texture_2d<f32>;var icdfSampler: sampler;var icdf: texture_2d<f32>;\n#ifdef IBL_USE_CUBE_MAP\nvar iblSourceSampler: sampler;var iblSource: texture_cube<f32>;\n#else\nvar iblSourceSampler: sampler;var iblSource: texture_2d<f32>;\n#endif\nvar textureSamplerSampler: sampler;var textureSampler: texture_2d<f32>;\n#define cdfyVSize (0.8/3.0)\n#define cdfxVSize 0.1\n#define cdfyHSize 0.5\nuniform sizeParams: vec4f;\n#ifdef IBL_USE_CUBE_MAP\nfn equirectangularToCubemapDirection(uv: vec2f)->vec3f {var longitude: f32=uv.x*2.0*PI-PI;var latitude: f32=PI*0.5-uv.y*PI;var direction: vec3f;direction.x=cos(latitude)*sin(longitude);direction.y=sin(latitude);direction.z=cos(latitude)*cos(longitude);return direction;}\n#endif\n@fragment\nfn main(input: FragmentInputs)->FragmentOutputs { \nvar colour: vec3f= vec3f(0.0);var uv: vec2f =\nvec2f((uniforms.sizeParams.x+input.vUV.x)*uniforms.sizeParams.z,(uniforms.sizeParams.y+input.vUV.y)*uniforms.sizeParams.w);var backgroundColour: vec3f=textureSample(textureSampler,textureSamplerSampler,input.vUV).rgb;var cdfxWidth: u32=textureDimensions(cdfx,0).x;var cdfyHeight: u32=textureDimensions(cdfy,0).y;const iblStart: f32=1.0-cdfyVSize;const pdfStart: f32=1.0-2.0*cdfyVSize;const cdfyStart: f32=1.0-3.0*cdfyVSize;const cdfxStart: f32=1.0-3.0*cdfyVSize-cdfxVSize;const icdfxStart: f32=1.0-3.0*cdfyVSize-2.0*cdfxVSize;\n#ifdef IBL_USE_CUBE_MAP\nvar direction: vec3f=equirectangularToCubemapDirection(\n(uv- vec2f(0.0,iblStart))* vec2f(1.0,1.0/cdfyVSize));var iblColour: vec3f=textureSampleLevel(iblSource,iblSourceSampler,direction,0.0).rgb;\n#else\nvar iblColour: vec3f=textureSample(iblSource,iblSourceSampler,(uv- vec2f(0.0,iblStart)) *\nvec2f(1.0,1.0/cdfyVSize))\n.rgb;\n#endif\nvar pdfColour: vec3f =\ntextureSample(icdf,icdfSampler,(uv- vec2f(0.0,pdfStart))* vec2f(1.0,1.0/cdfyVSize)).zzz;var cdfyColour: f32 =\ntextureSample(cdfy,cdfySampler,(uv- vec2f(0.0,cdfyStart))* vec2f(2.0,1.0/cdfyVSize)).r;var icdfyColour: f32 =\ntextureSample(icdf,icdfSampler,(uv- vec2f(0.5,cdfyStart))* vec2f(2.0,1.0/cdfyVSize)).g;var cdfxColour: f32 =\ntextureSample(cdfx,cdfxSampler,(uv- vec2f(0.0,cdfxStart))* vec2f(1.0,1.0/cdfxVSize)).r;var icdfxColour: f32=textureSample(icdf,icdfSampler,(uv- vec2f(0.0,icdfxStart)) *\nvec2f(1.0,1.0/cdfxVSize)).r;if (uv.x<0.0 || uv.x>1.0 || uv.y<0.0 || uv.y>1.0) {colour=backgroundColour;} else if (uv.y>iblStart) {colour+=iblColour;} else if (uv.y>pdfStart) {colour+=pdfColour;} else if (uv.y>cdfyStart && uv.x<0.5) {colour.r+=cdfyColour/f32(cdfyHeight);} else if (uv.y>cdfyStart && uv.x>0.5) {colour.r+=icdfyColour;} else if (uv.y>cdfxStart) {colour.r+=cdfxColour/f32(cdfxWidth);} else if (uv.y>icdfxStart) {colour.r+=icdfxColour;}\nfragmentOutputs.color =vec4(mix(colour,backgroundColour,0.5),1.0);}";f(69610).l.ShadersStoreWGSL[c]=t;const i={name:c,shader:t}}}]);