"use strict";(self.webpackChunkeverything_viewer=self.webpackChunkeverything_viewer||[]).push([[9278],{19278:(e,r,o)=>{o.r(r),o.d(r,{lodPixelShader:()=>l});const a="lodPixelShader",n="#extension GL_EXT_shader_texture_lod : enable\nprecision highp float;const float GammaEncodePowerApprox=1.0/2.2;varying vec2 vUV;uniform sampler2D textureSampler;uniform float lod;uniform vec2 texSize;uniform int gamma;void main(void)\n{gl_FragColor=texture2DLodEXT(textureSampler,vUV,lod);if (gamma==0) {gl_FragColor.rgb=pow(gl_FragColor.rgb,vec3(GammaEncodePowerApprox));}}\n";o(69610).l.ShadersStore[a]=n;const l={name:a,shader:n}}}]);