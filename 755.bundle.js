(self.webpackChunkeverything_viewer=self.webpackChunkeverything_viewer||[]).push([[755],{11:(e,n,t)=>{"use strict";t.r(n),t.d(n,{HighlightJS:()=>i,default:()=>o});var i=t(8416);const o=i},8416:e=>{function n(e){return e instanceof Map?e.clear=e.delete=e.set=function(){throw new Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=function(){throw new Error("set is read-only")}),Object.freeze(e),Object.getOwnPropertyNames(e).forEach((t=>{const i=e[t],o=typeof i;"object"!==o&&"function"!==o||Object.isFrozen(i)||n(i)})),e}class t{constructor(e){void 0===e.data&&(e.data={}),this.data=e.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}}function i(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function o(e,...n){const t=Object.create(null);for(const n in e)t[n]=e[n];return n.forEach((function(e){for(const n in e)t[n]=e[n]})),t}const r=e=>!!e.scope;class s{constructor(e,n){this.buffer="",this.classPrefix=n.classPrefix,e.walk(this)}addText(e){this.buffer+=i(e)}openNode(e){if(!r(e))return;const n=((e,{prefix:n})=>{if(e.startsWith("language:"))return e.replace("language:","language-");if(e.includes(".")){const t=e.split(".");return[`${n}${t.shift()}`,...t.map(((e,n)=>`${e}${"_".repeat(n+1)}`))].join(" ")}return`${n}${e}`})(e.scope,{prefix:this.classPrefix});this.span(n)}closeNode(e){r(e)&&(this.buffer+="</span>")}value(){return this.buffer}span(e){this.buffer+=`<span class="${e}">`}}const a=(e={})=>{const n={children:[]};return Object.assign(n,e),n};class c{constructor(){this.rootNode=a(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(e){this.top.children.push(e)}openNode(e){const n=a({scope:e});this.add(n),this.stack.push(n)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(e){return this.constructor._walk(e,this.rootNode)}static _walk(e,n){return"string"==typeof n?e.addText(n):n.children&&(e.openNode(n),n.children.forEach((n=>this._walk(e,n))),e.closeNode(n)),e}static _collapse(e){"string"!=typeof e&&e.children&&(e.children.every((e=>"string"==typeof e))?e.children=[e.children.join("")]:e.children.forEach((e=>{c._collapse(e)})))}}class l extends c{constructor(e){super(),this.options=e}addText(e){""!==e&&this.add(e)}startScope(e){this.openNode(e)}endScope(){this.closeNode()}__addSublanguage(e,n){const t=e.root;n&&(t.scope=`language:${n}`),this.add(t)}toHTML(){return new s(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}}function u(e){return e?"string"==typeof e?e:e.source:null}function g(e){return f("(?=",e,")")}function d(e){return f("(?:",e,")*")}function h(e){return f("(?:",e,")?")}function f(...e){return e.map((e=>u(e))).join("")}function p(...e){const n=function(e){const n=e[e.length-1];return"object"==typeof n&&n.constructor===Object?(e.splice(e.length-1,1),n):{}}(e);return"("+(n.capture?"":"?:")+e.map((e=>u(e))).join("|")+")"}function b(e){return new RegExp(e.toString()+"|").exec("").length-1}const m=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function E(e,{joinWith:n}){let t=0;return e.map((e=>{t+=1;const n=t;let i=u(e),o="";for(;i.length>0;){const e=m.exec(i);if(!e){o+=i;break}o+=i.substring(0,e.index),i=i.substring(e.index+e[0].length),"\\"===e[0][0]&&e[1]?o+="\\"+String(Number(e[1])+n):(o+=e[0],"("===e[0]&&t++)}return o})).map((e=>`(${e})`)).join(n)}const w="[a-zA-Z]\\w*",x="[a-zA-Z_]\\w*",_="\\b\\d+(\\.\\d+)?",y="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",v="\\b(0b[01]+)",k={begin:"\\\\[\\s\\S]",relevance:0},O={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[k]},S={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[k]},N=function(e,n,t={}){const i=o({scope:"comment",begin:e,end:n,contains:[]},t);i.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});const r=p("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return i.contains.push({begin:f(/[ ]+/,"(",r,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),i},M=N("//","$"),R=N("/\\*","\\*/"),A=N("#","$"),j={scope:"number",begin:_,relevance:0},I={scope:"number",begin:y,relevance:0},T={scope:"number",begin:v,relevance:0},L={scope:"regexp",begin:/\/(?=[^/\n]*\/)/,end:/\/[gimuy]*/,contains:[k,{begin:/\[/,end:/\]/,relevance:0,contains:[k]}]},B={scope:"title",begin:w,relevance:0},H={scope:"title",begin:x,relevance:0},P={begin:"\\.\\s*"+x,relevance:0};var C=Object.freeze({__proto__:null,APOS_STRING_MODE:O,BACKSLASH_ESCAPE:k,BINARY_NUMBER_MODE:T,BINARY_NUMBER_RE:v,COMMENT:N,C_BLOCK_COMMENT_MODE:R,C_LINE_COMMENT_MODE:M,C_NUMBER_MODE:I,C_NUMBER_RE:y,END_SAME_AS_BEGIN:function(e){return Object.assign(e,{"on:begin":(e,n)=>{n.data._beginMatch=e[1]},"on:end":(e,n)=>{n.data._beginMatch!==e[1]&&n.ignoreMatch()}})},HASH_COMMENT_MODE:A,IDENT_RE:w,MATCH_NOTHING_RE:/\b\B/,METHOD_GUARD:P,NUMBER_MODE:j,NUMBER_RE:_,PHRASAL_WORDS_MODE:{begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},QUOTE_STRING_MODE:S,REGEXP_MODE:L,RE_STARTERS_RE:"!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",SHEBANG:(e={})=>{const n=/^#![ ]*\//;return e.binary&&(e.begin=f(n,/.*\b/,e.binary,/\b.*/)),o({scope:"meta",begin:n,end:/$/,relevance:0,"on:begin":(e,n)=>{0!==e.index&&n.ignoreMatch()}},e)},TITLE_MODE:B,UNDERSCORE_IDENT_RE:x,UNDERSCORE_TITLE_MODE:H});function D(e,n){"."===e.input[e.index-1]&&n.ignoreMatch()}function $(e,n){void 0!==e.className&&(e.scope=e.className,delete e.className)}function U(e,n){n&&e.beginKeywords&&(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",e.__beforeBegin=D,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,void 0===e.relevance&&(e.relevance=0))}function z(e,n){Array.isArray(e.illegal)&&(e.illegal=p(...e.illegal))}function W(e,n){if(e.match){if(e.begin||e.end)throw new Error("begin & end are not supported with match");e.begin=e.match,delete e.match}}function X(e,n){void 0===e.relevance&&(e.relevance=1)}const G=(e,n)=>{if(!e.beforeMatch)return;if(e.starts)throw new Error("beforeMatch cannot be used with starts");const t=Object.assign({},e);Object.keys(e).forEach((n=>{delete e[n]})),e.keywords=t.keywords,e.begin=f(t.beforeMatch,g(t.begin)),e.starts={relevance:0,contains:[Object.assign(t,{endsParent:!0})]},e.relevance=0,delete t.beforeMatch},K=["of","and","for","in","not","or","if","then","parent","list","value"];function F(e,n,t="keyword"){const i=Object.create(null);return"string"==typeof e?o(t,e.split(" ")):Array.isArray(e)?o(t,e):Object.keys(e).forEach((function(t){Object.assign(i,F(e[t],n,t))})),i;function o(e,t){n&&(t=t.map((e=>e.toLowerCase()))),t.forEach((function(n){const t=n.split("|");i[t[0]]=[e,Z(t[0],t[1])]}))}}function Z(e,n){return n?Number(n):function(e){return K.includes(e.toLowerCase())}(e)?0:1}const J={},V=e=>{console.error(e)},q=(e,...n)=>{console.log(`WARN: ${e}`,...n)},Y=(e,n)=>{J[`${e}/${n}`]||(console.log(`Deprecated as of ${e}. ${n}`),J[`${e}/${n}`]=!0)},Q=new Error;function ee(e,n,{key:t}){let i=0;const o=e[t],r={},s={};for(let e=1;e<=n.length;e++)s[e+i]=o[e],r[e+i]=!0,i+=b(n[e-1]);e[t]=s,e[t]._emit=r,e[t]._multi=!0}function ne(e){!function(e){e.scope&&"object"==typeof e.scope&&null!==e.scope&&(e.beginScope=e.scope,delete e.scope)}(e),"string"==typeof e.beginScope&&(e.beginScope={_wrap:e.beginScope}),"string"==typeof e.endScope&&(e.endScope={_wrap:e.endScope}),function(e){if(Array.isArray(e.begin)){if(e.skip||e.excludeBegin||e.returnBegin)throw V("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),Q;if("object"!=typeof e.beginScope||null===e.beginScope)throw V("beginScope must be object"),Q;ee(e,e.begin,{key:"beginScope"}),e.begin=E(e.begin,{joinWith:""})}}(e),function(e){if(Array.isArray(e.end)){if(e.skip||e.excludeEnd||e.returnEnd)throw V("skip, excludeEnd, returnEnd not compatible with endScope: {}"),Q;if("object"!=typeof e.endScope||null===e.endScope)throw V("endScope must be object"),Q;ee(e,e.end,{key:"endScope"}),e.end=E(e.end,{joinWith:""})}}(e)}function te(e){function n(n,t){return new RegExp(u(n),"m"+(e.case_insensitive?"i":"")+(e.unicodeRegex?"u":"")+(t?"g":""))}class t{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(e,n){n.position=this.position++,this.matchIndexes[this.matchAt]=n,this.regexes.push([n,e]),this.matchAt+=b(e)+1}compile(){0===this.regexes.length&&(this.exec=()=>null);const e=this.regexes.map((e=>e[1]));this.matcherRe=n(E(e,{joinWith:"|"}),!0),this.lastIndex=0}exec(e){this.matcherRe.lastIndex=this.lastIndex;const n=this.matcherRe.exec(e);if(!n)return null;const t=n.findIndex(((e,n)=>n>0&&void 0!==e)),i=this.matchIndexes[t];return n.splice(0,t),Object.assign(n,i)}}class i{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(e){if(this.multiRegexes[e])return this.multiRegexes[e];const n=new t;return this.rules.slice(e).forEach((([e,t])=>n.addRule(e,t))),n.compile(),this.multiRegexes[e]=n,n}resumingScanAtSamePosition(){return 0!==this.regexIndex}considerAll(){this.regexIndex=0}addRule(e,n){this.rules.push([e,n]),"begin"===n.type&&this.count++}exec(e){const n=this.getMatcher(this.regexIndex);n.lastIndex=this.lastIndex;let t=n.exec(e);if(this.resumingScanAtSamePosition())if(t&&t.index===this.lastIndex);else{const n=this.getMatcher(0);n.lastIndex=this.lastIndex+1,t=n.exec(e)}return t&&(this.regexIndex+=t.position+1,this.regexIndex===this.count&&this.considerAll()),t}}if(e.compilerExtensions||(e.compilerExtensions=[]),e.contains&&e.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return e.classNameAliases=o(e.classNameAliases||{}),function t(r,s){const a=r;if(r.isCompiled)return a;[$,W,ne,G].forEach((e=>e(r,s))),e.compilerExtensions.forEach((e=>e(r,s))),r.__beforeBegin=null,[U,z,X].forEach((e=>e(r,s))),r.isCompiled=!0;let c=null;return"object"==typeof r.keywords&&r.keywords.$pattern&&(r.keywords=Object.assign({},r.keywords),c=r.keywords.$pattern,delete r.keywords.$pattern),c=c||/\w+/,r.keywords&&(r.keywords=F(r.keywords,e.case_insensitive)),a.keywordPatternRe=n(c,!0),s&&(r.begin||(r.begin=/\B|\b/),a.beginRe=n(a.begin),r.end||r.endsWithParent||(r.end=/\B|\b/),r.end&&(a.endRe=n(a.end)),a.terminatorEnd=u(a.end)||"",r.endsWithParent&&s.terminatorEnd&&(a.terminatorEnd+=(r.end?"|":"")+s.terminatorEnd)),r.illegal&&(a.illegalRe=n(r.illegal)),r.contains||(r.contains=[]),r.contains=[].concat(...r.contains.map((function(e){return function(e){e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map((function(n){return o(e,{variants:null},n)})));if(e.cachedVariants)return e.cachedVariants;if(ie(e))return o(e,{starts:e.starts?o(e.starts):null});if(Object.isFrozen(e))return o(e);return e}("self"===e?r:e)}))),r.contains.forEach((function(e){t(e,a)})),r.starts&&t(r.starts,s),a.matcher=function(e){const n=new i;return e.contains.forEach((e=>n.addRule(e.begin,{rule:e,type:"begin"}))),e.terminatorEnd&&n.addRule(e.terminatorEnd,{type:"end"}),e.illegal&&n.addRule(e.illegal,{type:"illegal"}),n}(a),a}(e)}function ie(e){return!!e&&(e.endsWithParent||ie(e.starts))}class oe extends Error{constructor(e,n){super(e),this.name="HTMLInjectionError",this.html=n}}const re=i,se=o,ae=Symbol("nomatch"),ce=function(e){const i=Object.create(null),o=Object.create(null),r=[];let s=!0;const a="Could not find the language '{}', did you forget to load/include a language module?",c={disableAutodetect:!0,name:"Plain text",contains:[]};let u={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:l};function b(e){return u.noHighlightRe.test(e)}function m(e,n,t){let i="",o="";"object"==typeof n?(i=e,t=n.ignoreIllegals,o=n.language):(Y("10.7.0","highlight(lang, code, ...args) has been deprecated."),Y("10.7.0","Please use highlight(code, options) instead.\nhttps://github.com/highlightjs/highlight.js/issues/2277"),o=e,i=n),void 0===t&&(t=!0);const r={code:i,language:o};S("before:highlight",r);const s=r.result?r.result:E(r.language,r.code,t);return s.code=r.code,S("after:highlight",s),s}function E(e,n,o,r){const c=Object.create(null);function l(){if(!S.keywords)return void M.addText(R);let e=0;S.keywordPatternRe.lastIndex=0;let n=S.keywordPatternRe.exec(R),t="";for(;n;){t+=R.substring(e,n.index);const o=y.case_insensitive?n[0].toLowerCase():n[0],r=(i=o,S.keywords[i]);if(r){const[e,i]=r;if(M.addText(t),t="",c[o]=(c[o]||0)+1,c[o]<=7&&(A+=i),e.startsWith("_"))t+=n[0];else{const t=y.classNameAliases[e]||e;d(n[0],t)}}else t+=n[0];e=S.keywordPatternRe.lastIndex,n=S.keywordPatternRe.exec(R)}var i;t+=R.substring(e),M.addText(t)}function g(){null!=S.subLanguage?function(){if(""===R)return;let e=null;if("string"==typeof S.subLanguage){if(!i[S.subLanguage])return void M.addText(R);e=E(S.subLanguage,R,!0,N[S.subLanguage]),N[S.subLanguage]=e._top}else e=w(R,S.subLanguage.length?S.subLanguage:null);S.relevance>0&&(A+=e.relevance),M.__addSublanguage(e._emitter,e.language)}():l(),R=""}function d(e,n){""!==e&&(M.startScope(n),M.addText(e),M.endScope())}function h(e,n){let t=1;const i=n.length-1;for(;t<=i;){if(!e._emit[t]){t++;continue}const i=y.classNameAliases[e[t]]||e[t],o=n[t];i?d(o,i):(R=o,l(),R=""),t++}}function f(e,n){return e.scope&&"string"==typeof e.scope&&M.openNode(y.classNameAliases[e.scope]||e.scope),e.beginScope&&(e.beginScope._wrap?(d(R,y.classNameAliases[e.beginScope._wrap]||e.beginScope._wrap),R=""):e.beginScope._multi&&(h(e.beginScope,n),R="")),S=Object.create(e,{parent:{value:S}}),S}function p(e,n,i){let o=function(e,n){const t=e&&e.exec(n);return t&&0===t.index}(e.endRe,i);if(o){if(e["on:end"]){const i=new t(e);e["on:end"](n,i),i.isMatchIgnored&&(o=!1)}if(o){for(;e.endsParent&&e.parent;)e=e.parent;return e}}if(e.endsWithParent)return p(e.parent,n,i)}function b(e){return 0===S.matcher.regexIndex?(R+=e[0],1):(T=!0,0)}function m(e){const t=e[0],i=n.substring(e.index),o=p(S,e,i);if(!o)return ae;const r=S;S.endScope&&S.endScope._wrap?(g(),d(t,S.endScope._wrap)):S.endScope&&S.endScope._multi?(g(),h(S.endScope,e)):r.skip?R+=t:(r.returnEnd||r.excludeEnd||(R+=t),g(),r.excludeEnd&&(R=t));do{S.scope&&M.closeNode(),S.skip||S.subLanguage||(A+=S.relevance),S=S.parent}while(S!==o.parent);return o.starts&&f(o.starts,e),r.returnEnd?0:t.length}let x={};function _(i,r){const a=r&&r[0];if(R+=i,null==a)return g(),0;if("begin"===x.type&&"end"===r.type&&x.index===r.index&&""===a){if(R+=n.slice(r.index,r.index+1),!s){const n=new Error(`0 width match regex (${e})`);throw n.languageName=e,n.badRule=x.rule,n}return 1}if(x=r,"begin"===r.type)return function(e){const n=e[0],i=e.rule,o=new t(i),r=[i.__beforeBegin,i["on:begin"]];for(const t of r)if(t&&(t(e,o),o.isMatchIgnored))return b(n);return i.skip?R+=n:(i.excludeBegin&&(R+=n),g(),i.returnBegin||i.excludeBegin||(R=n)),f(i,e),i.returnBegin?0:n.length}(r);if("illegal"===r.type&&!o){const e=new Error('Illegal lexeme "'+a+'" for mode "'+(S.scope||"<unnamed>")+'"');throw e.mode=S,e}if("end"===r.type){const e=m(r);if(e!==ae)return e}if("illegal"===r.type&&""===a)return R+="\n",1;if(I>1e5&&I>3*r.index){throw new Error("potential infinite loop, way more iterations than matches")}return R+=a,a.length}const y=v(e);if(!y)throw V(a.replace("{}",e)),new Error('Unknown language: "'+e+'"');const k=te(y);let O="",S=r||k;const N={},M=new u.__emitter(u);!function(){const e=[];for(let n=S;n!==y;n=n.parent)n.scope&&e.unshift(n.scope);e.forEach((e=>M.openNode(e)))}();let R="",A=0,j=0,I=0,T=!1;try{if(y.__emitTokens)y.__emitTokens(n,M);else{for(S.matcher.considerAll();;){I++,T?T=!1:S.matcher.considerAll(),S.matcher.lastIndex=j;const e=S.matcher.exec(n);if(!e)break;const t=_(n.substring(j,e.index),e);j=e.index+t}_(n.substring(j))}return M.finalize(),O=M.toHTML(),{language:e,value:O,relevance:A,illegal:!1,_emitter:M,_top:S}}catch(t){if(t.message&&t.message.includes("Illegal"))return{language:e,value:re(n),illegal:!0,relevance:0,_illegalBy:{message:t.message,index:j,context:n.slice(j-100,j+100),mode:t.mode,resultSoFar:O},_emitter:M};if(s)return{language:e,value:re(n),illegal:!1,relevance:0,errorRaised:t,_emitter:M,_top:S};throw t}}function w(e,n){n=n||u.languages||Object.keys(i);const t=function(e){const n={value:re(e),illegal:!1,relevance:0,_top:c,_emitter:new u.__emitter(u)};return n._emitter.addText(e),n}(e),o=n.filter(v).filter(O).map((n=>E(n,e,!1)));o.unshift(t);const r=o.sort(((e,n)=>{if(e.relevance!==n.relevance)return n.relevance-e.relevance;if(e.language&&n.language){if(v(e.language).supersetOf===n.language)return 1;if(v(n.language).supersetOf===e.language)return-1}return 0})),[s,a]=r,l=s;return l.secondBest=a,l}function x(e){let n=null;const t=function(e){let n=e.className+" ";n+=e.parentNode?e.parentNode.className:"";const t=u.languageDetectRe.exec(n);if(t){const n=v(t[1]);return n||(q(a.replace("{}",t[1])),q("Falling back to no-highlight mode for this block.",e)),n?t[1]:"no-highlight"}return n.split(/\s+/).find((e=>b(e)||v(e)))}(e);if(b(t))return;if(S("before:highlightElement",{el:e,language:t}),e.dataset.highlighted)return void console.log("Element previously highlighted. To highlight again, first unset `dataset.highlighted`.",e);if(e.children.length>0&&(u.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(e)),u.throwUnescapedHTML)){throw new oe("One of your code blocks includes unescaped HTML.",e.innerHTML)}n=e;const i=n.textContent,r=t?m(i,{language:t,ignoreIllegals:!0}):w(i);e.innerHTML=r.value,e.dataset.highlighted="yes",function(e,n,t){const i=n&&o[n]||t;e.classList.add("hljs"),e.classList.add(`language-${i}`)}(e,t,r.language),e.result={language:r.language,re:r.relevance,relevance:r.relevance},r.secondBest&&(e.secondBest={language:r.secondBest.language,relevance:r.secondBest.relevance}),S("after:highlightElement",{el:e,result:r,text:i})}let _=!1;function y(){if("loading"===document.readyState)return _||window.addEventListener("DOMContentLoaded",(function(){y()}),!1),void(_=!0);document.querySelectorAll(u.cssSelector).forEach(x)}function v(e){return e=(e||"").toLowerCase(),i[e]||i[o[e]]}function k(e,{languageName:n}){"string"==typeof e&&(e=[e]),e.forEach((e=>{o[e.toLowerCase()]=n}))}function O(e){const n=v(e);return n&&!n.disableAutodetect}function S(e,n){const t=e;r.forEach((function(e){e[t]&&e[t](n)}))}Object.assign(e,{highlight:m,highlightAuto:w,highlightAll:y,highlightElement:x,highlightBlock:function(e){return Y("10.7.0","highlightBlock will be removed entirely in v12.0"),Y("10.7.0","Please use highlightElement now."),x(e)},configure:function(e){u=se(u,e)},initHighlighting:()=>{y(),Y("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")},initHighlightingOnLoad:function(){y(),Y("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")},registerLanguage:function(n,t){let o=null;try{o=t(e)}catch(e){if(V("Language definition for '{}' could not be registered.".replace("{}",n)),!s)throw e;V(e),o=c}o.name||(o.name=n),i[n]=o,o.rawDefinition=t.bind(null,e),o.aliases&&k(o.aliases,{languageName:n})},unregisterLanguage:function(e){delete i[e];for(const n of Object.keys(o))o[n]===e&&delete o[n]},listLanguages:function(){return Object.keys(i)},getLanguage:v,registerAliases:k,autoDetection:O,inherit:se,addPlugin:function(e){!function(e){e["before:highlightBlock"]&&!e["before:highlightElement"]&&(e["before:highlightElement"]=n=>{e["before:highlightBlock"](Object.assign({block:n.el},n))}),e["after:highlightBlock"]&&!e["after:highlightElement"]&&(e["after:highlightElement"]=n=>{e["after:highlightBlock"](Object.assign({block:n.el},n))})}(e),r.push(e)},removePlugin:function(e){const n=r.indexOf(e);-1!==n&&r.splice(n,1)}}),e.debugMode=function(){s=!1},e.safeMode=function(){s=!0},e.versionString="11.11.1",e.regex={concat:f,lookahead:g,either:p,optional:h,anyNumberOfTimes:d};for(const e in C)"object"==typeof C[e]&&n(C[e]);return Object.assign(e,C),e},le=ce({});le.newInstance=()=>ce({}),e.exports=le,le.HighlightJS=le,le.default=le}}]);