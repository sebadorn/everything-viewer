(self.webpackChunkeverything_viewer=self.webpackChunkeverything_viewer||[]).push([[776],{7534:(e,t,i)=>{var r;void 0===(r=function(){var e,t;return e="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""),Math.uuid=function(t,i){var r,n,a=e,s=[];if(i=i||a.length,t)for(r=0;r<t;r++)s[r]=a[0|Math.random()*i];else for(s[8]=s[13]=s[18]=s[23]="-",s[14]="4",r=0;r<36;r++)s[r]||(n=0|16*Math.random(),s[r]=a[19==r?3&n|8:n]);return s.join("")},Math.uuidFast=function(){for(var t,i=e,r=new Array(36),n=0,a=0;a<36;a++)8==a||13==a||18==a||23==a?r[a]="-":14==a?r[a]="4":(n<=2&&(n=33554432+16777216*Math.random()|0),t=15&n,n>>=4,r[a]=i[19==a?3&t|8:t]);return r.join("")},Math.uuidCompact=function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(e){var t=16*Math.random()|0;return("x"==e?t:3&t|8).toString(16)}))},(t=function(e){if(this.changed=!1,"object"==typeof e)for(var t in e)this[t]=e[t],this.changed=!0}).prototype={validate:function(){var e,i,r=[];for(var n in this.fn||(e="fn",i="required",r.push([e,i])),t.multivaluedKeys)!this[n]||this[n]instanceof Array||(this[n]=[this[n]]);function a(e,t){for(var i in t){var n=t[i];"object"!=typeof n?r.push([e+"-"+i,"not-an-object"]):n.type?n.value||r.push([e+"-"+i,"missing-value"]):r.push([e+"-"+i,"missing-type"])}}return this.email&&a("email",this.email),this.tel&&a("email",this.tel),this.uid||this.addAttribute("uid",this.generateUID()),this.rev||this.addAttribute("rev",this.generateRev()),this.errors=r,!(r.length>0)},generateUID:function(){return"uuid:"+Math.uuid()},generateRev:function(){return(new Date).toISOString().replace(/[\.\:\-]/g,"")},setAttribute:function(e,t){this[e]=t,this.changed=!0},addAttribute:function(e,i){console.log("add attribute",e,i),i&&(t.multivaluedKeys[e]?this[e]?(console.log("multivalued push"),this[e].push(i)):(console.log("multivalued set"),this.setAttribute(e,[i])):this.setAttribute(e,i))},toJSON:function(){return JSON.stringify(this.toJCard())},toJCard:function(){var e={};for(var i in t.allKeys){var r=t.allKeys[i];this[r]&&(e[r]=this[r])}return e},merge:function(e){if(void 0!==e.uid&&void 0!==this.uid&&e.uid!==this.uid)throw"Won't merge vcards without matching UIDs.";var i=new t;function r(t){e[t]?e[t]==this[t]?i.setAttribute(this[t]):(i.addAttribute(this[t]),i.addAttribute(e[t])):i[t]=this[t]}for(key in this)r(key);for(key in e)i[key]||r(key)}},t.enums={telType:["text","voice","fax","cell","video","pager","textphone"],relatedType:["contact","acquaintance","friend","met","co-worker","colleague","co-resident","neighbor","child","parent","sibling","spouse","kin","muse","crush","date","sweetheart","me","agent","emergency"],emailType:["work","home","internet"],langType:["work","home"]},t.allKeys=["fn","n","nickname","photo","bday","anniversary","gender","tel","email","impp","lang","tz","geo","title","role","logo","org","member","related","categories","note","prodid","rev","sound","uid"],t.multivaluedKeys={email:!0,tel:!0,geo:!0,title:!0,role:!0,logo:!0,org:!0,member:!0,related:!0,categories:!0,note:!0},{VCF:{simpleKeys:["VERSION","FN","PHOTO","GEO","TITLE","ROLE","LOGO","MEMBER","NOTE","PRODID","SOUND","UID"],csvKeys:["NICKNAME","CATEGORIES"],dateAndOrTimeKeys:["BDAY","ANNIVERSARY","REV"],parse:function(e,i,r){var n=null;r||(r=this),this.lex(e,(function(e,a,s){function u(t){n&&n.addAttribute(e.toLowerCase(),t)}if("BEGIN"==e)n=new t;else if("END"==e)n&&(i.apply(r,[n]),n=null);else if(-1!=this.simpleKeys.indexOf(e))u(a);else if(-1!=this.csvKeys.indexOf(e))u(a.split(","));else if(-1!=this.dateAndOrTimeKeys.indexOf(e))"text"==s.VALUE?u(a):s.CALSCALE&&"gregorian"!=s.CALSCALE||u(this.parseDateAndOrTime(a));else if("N"==e)u(this.parseName(a));else if("GENDER"==e)u(this.parseGender(a));else if("TEL"==e)u({type:s.TYPE||"voice",pref:s.PREF,value:a});else if("EMAIL"==e)u({type:s.TYPE,pref:s.PREF,value:a});else if("IMPP"==e)u({value:a});else if("LANG"==e)u({type:s.TYPE,pref:s.PREF,value:a});else if("TZ"==e)"utc-offset"==s.VALUE?u({"utc-offset":this.parseTimezone(a)}):u({name:a});else if("ORG"==e){var o=a.split(";");u({"organization-name":o[0],"organization-unit":o[1]})}else"RELATED"==e?u({type:s.TYPE,pref:s.PREF,value:s.VALUE}):"ADR"==e?u({type:s.TYPE,pref:s.PREF,value:a}):console.log("WARNING: unhandled key: ",e)}))},nameParts:["family-name","given-name","additional-name","honorific-prefix","honorific-suffix"],parseName:function(e){var t=e.split(";"),i={};for(var r in t)t[r]&&(i[this.nameParts[r]]=t[r].split(","));return i},parseGender:function(e){var t={},i=e.split(";");switch(i[0]){case"M":t.sex="male";break;case"F":t.sex="female";break;case"O":t.sex="other"}return i[1]&&(t.identity=i[1]),t},dateRE:/^(\d{4})(\d{2})(\d{2})$/,dateReducedARE:/^(\d{4})\-(\d{2})$/,dateReducedBRE:/^(\d{4})$/,dateTruncatedMDRE:/^\-{2}(\d{2})(\d{2})$/,dateTruncatedDRE:/^\-{3}(\d{2})$/,timeRE:/^(\d{2})(\d{2})(\d{2})([+\-]\d+|Z|)$/,timeReducedARE:/^(\d{2})(\d{2})([+\-]\d+|Z|)$/,timeReducedBRE:/^(\d{2})([+\-]\d+|Z|)$/,timeTruncatedMSRE:/^\-{2}(\d{2})(\d{2})([+\-]\d+|Z|)$/,timeTruncatedSRE:/^\-{3}(\d{2})([+\-]\d+|Z|)$/,parseDate:function(e){var t,i,r,n;if(t=e.match(this.dateRE))i=t[1],r=t[2],n=t[3];else if(t=e.match(this.dateReducedARE))i=t[1],r=t[2];else if(t=e.match(this.dateReducedBRE))i=t[1];else if(t=e.match(this.dateTruncatedMDRE))r=t[1],n=t[2];else{if(!(t=e.match(this.dateTruncatedDRE)))return console.error("WARNING: failed to parse date: ",e),null;n=t[1]}var a=new Date(0);return void 0!==i&&a.setUTCFullYear(i),void 0!==r&&a.setUTCMonth(r-1),void 0!==n&&a.setUTCDate(n),a},parseTime:function(e){var t,i,r,n,a;if(t=e.match(this.timeRE))i=t[1],r=t[2],n=t[3],a=t[4];else if(t=e.match(this.timeReducedARE))i=t[1],r=t[2],a=t[3];else if(t=e.match(this.timeReducedBRE))i=t[1],a=t[2];else if(t=e.match(this.timeTruncatedMSRE))r=t[1],n=t[2],a=t[3];else{if(!(t=e.match(this.timeTruncatedSRE)))return console.error("WARNING: failed to parse time: ",e),null;n=t[1],a=t[2]}var s=new Date(0);return void 0!==i&&s.setUTCHours(i),void 0!==r&&s.setUTCMinutes(r),void 0!==n&&s.setUTCSeconds(n),a&&(s=this.applyTimezone(s,a)),s},addDates:function(e,t,i){if(void 0===i&&(i=!0),!e)return t;if(!t)return e;var r=Number(e),n=Number(t);return new Date(i?r+n:r-n)},parseTimezone:function(e){var t;if(t=e.match(/^([+\-])(\d{2})(\d{2})?/)){var i=new Date(0);return i.setUTCHours(t[2]),i.setUTCMinutes(t[3]||0),Number(i)*("+"==t[1]?1:-1)}return null},applyTimezone:function(e,t){var i=this.parseTimezone(t);return i?new Date(Number(e)+i):e},parseDateTime:function(e){var t=e.split("T"),i=this.parseDate(t[0]),r=this.parseTime(t[1]);return this.addDates(i,r)},parseDateAndOrTime:function(e){switch(e.indexOf("T")){case 0:return this.parseTime(e.slice(1));case-1:return this.parseDate(e);default:return this.parseDateTime(e)}},lineRE:/^([^\s].*)(?:\r?\n|$)/,foldedLineRE:/^\s(.+)(?:\r?\n|$)/,lex:function(e,t){for(var i,r=null,n=0;(i=e.match(this.lineRE))?r&&-1!=r.indexOf("QUOTED-PRINTABLE")&&"="==r.slice(-1)?(r=r.slice(0,-1)+i[1],n=i[0].length):(r&&this.lexLine(r,t),r=i[1],n=i[0].length):(i=e.match(this.foldedLineRE))?r&&(r+=i[1],n=i[0].length):console.error("Unmatched line: "+r),e=e.slice(n););r&&this.lexLine(r,t),r=null},lexLine:function(e,t){var i="",r=null,n={},a=null,s=null,u=e.indexOf("ENCODING=QUOTED-PRINTABLE");function o(){r?s?n[s]=i.split(","):"PREF"==i?n.PREF=1:n.TYPE?n.TYPE.push(i):n.TYPE=[i]:r=i}for(var d in-1!=u&&(e=e.substr(0,u)+this.decodeQP(e.substr(u+25))),e){var l=e[d];switch(l){case":":return o(),a=e.slice(Number(d)+1),void t.apply(this,[r,a,n]);case";":o(),i="";break;case"=":s=i,i="";break;default:i+=l}}},decodeQP:function(e){for(var t="",i=0,r=(e=(e=(e||"").toString()).replace(/\=(?:\r?\n|$)/g,"")).length;i<r;i++)chr=e.charAt(i),"="==chr&&(hex=e.substr(i+1,2))&&/[\da-fA-F]{2}/.test(hex)?(t+=String.fromCharCode(parseInt(hex,16)),i+=2):t+=chr;return t}},VCard:t}}.call(t,i,t,e))||(e.exports=r)}}]);