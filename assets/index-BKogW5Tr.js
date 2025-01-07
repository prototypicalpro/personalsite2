(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();const Qe=typeof __SENTRY_DEBUG__>"u"||__SENTRY_DEBUG__,Qn="8.47.0",Xe=globalThis;function Es(n,e,t){const i=t||Xe,r=i.__SENTRY__=i.__SENTRY__||{},s=r[Qn]=r[Qn]||{};return s[n]||(s[n]=e())}const li=typeof __SENTRY_DEBUG__>"u"||__SENTRY_DEBUG__,sf="Sentry Logger ",fs=["debug","info","warn","error","log","assert","trace"],ds={};function ui(n){if(!("console"in Xe))return n();const e=Xe.console,t={},i=Object.keys(ds);i.forEach(r=>{const s=ds[r];t[r]=e[r],e[r]=s});try{return n()}finally{i.forEach(r=>{e[r]=t[r]})}}function of(){let n=!1;const e={enable:()=>{n=!0},disable:()=>{n=!1},isEnabled:()=>n};return li?fs.forEach(t=>{e[t]=(...i)=>{n&&ui(()=>{Xe.console[t](`${sf}[${t}]:`,...i)})}}):fs.forEach(t=>{e[t]=()=>{}}),e}const Te=Es("logger",of),Bl=50,ti="?",Ja=/\(error: (.*)\)/,Qa=/captureMessage|captureException/;function zl(...n){const e=n.sort((t,i)=>t[0]-i[0]).map(t=>t[1]);return(t,i=0,r=0)=>{const s=[],o=t.split(`
`);for(let a=i;a<o.length;a++){const c=o[a];if(c.length>1024)continue;const l=Ja.test(c)?c.replace(Ja,"$1"):c;if(!l.match(/\S*Error: /)){for(const u of e){const f=u(l);if(f){s.push(f);break}}if(s.length>=Bl+r)break}}return cf(s.slice(r))}}function af(n){return Array.isArray(n)?zl(...n):n}function cf(n){if(!n.length)return[];const e=Array.from(n);return/sentryWrapped/.test(Mr(e).function||"")&&e.pop(),e.reverse(),Qa.test(Mr(e).function||"")&&(e.pop(),Qa.test(Mr(e).function||"")&&e.pop()),e.slice(0,Bl).map(t=>({...t,filename:t.filename||Mr(e).filename,function:t.function||ti}))}function Mr(n){return n[n.length-1]||{}}const Us="<anonymous>";function Un(n){try{return!n||typeof n!="function"?Us:n.name||Us}catch{return Us}}function ec(n){const e=n.exception;if(e){const t=[];try{return e.values.forEach(i=>{i.stacktrace.frames&&t.push(...i.stacktrace.frames)}),t}catch{return}}}const ts={},tc={};function fi(n,e){ts[n]=ts[n]||[],ts[n].push(e)}function di(n,e){if(!tc[n]){tc[n]=!0;try{e()}catch(t){li&&Te.error(`Error while instrumenting ${n}`,t)}}}function Qt(n,e){const t=n&&ts[n];if(t)for(const i of t)try{i(e)}catch(r){li&&Te.error(`Error while triggering instrumentation handler.
Type: ${n}
Name: ${Un(i)}
Error:`,r)}}let Ns=null;function lf(n){const e="error";fi(e,n),di(e,uf)}function uf(){Ns=Xe.onerror,Xe.onerror=function(n,e,t,i,r){return Qt("error",{column:i,error:r,line:t,msg:n,url:e}),Ns?Ns.apply(this,arguments):!1},Xe.onerror.__SENTRY_INSTRUMENTED__=!0}let Fs=null;function ff(n){const e="unhandledrejection";fi(e,n),di(e,df)}function df(){Fs=Xe.onunhandledrejection,Xe.onunhandledrejection=function(n){return Qt("unhandledrejection",n),Fs?Fs.apply(this,arguments):!0},Xe.onunhandledrejection.__SENTRY_INSTRUMENTED__=!0}function Ms(){return Sa(Xe),Xe}function Sa(n){const e=n.__SENTRY__=n.__SENTRY__||{};return e.version=e.version||Qn,e[Qn]=e[Qn]||{}}const kl=Object.prototype.toString;function Ea(n){switch(kl.call(n)){case"[object Error]":case"[object Exception]":case"[object DOMException]":case"[object WebAssembly.Exception]":return!0;default:return ni(n,Error)}}function qi(n,e){return kl.call(n)===`[object ${e}]`}function Hl(n){return qi(n,"ErrorEvent")}function nc(n){return qi(n,"DOMError")}function hf(n){return qi(n,"DOMException")}function vn(n){return qi(n,"String")}function Ma(n){return typeof n=="object"&&n!==null&&"__sentry_template_string__"in n&&"__sentry_template_values__"in n}function ya(n){return n===null||Ma(n)||typeof n!="object"&&typeof n!="function"}function Ui(n){return qi(n,"Object")}function ys(n){return typeof Event<"u"&&ni(n,Event)}function pf(n){return typeof Element<"u"&&ni(n,Element)}function mf(n){return qi(n,"RegExp")}function Ts(n){return!!(n&&n.then&&typeof n.then=="function")}function _f(n){return Ui(n)&&"nativeEvent"in n&&"preventDefault"in n&&"stopPropagation"in n}function ni(n,e){try{return n instanceof e}catch{return!1}}function Gl(n){return!!(typeof n=="object"&&n!==null&&(n.__isVue||n._isVue))}const Ta=Xe,gf=80;function Vl(n,e={}){if(!n)return"<unknown>";try{let t=n;const i=5,r=[];let s=0,o=0;const a=" > ",c=a.length;let l;const u=Array.isArray(e)?e:e.keyAttrs,f=!Array.isArray(e)&&e.maxStringLength||gf;for(;t&&s++<i&&(l=vf(t,u),!(l==="html"||s>1&&o+r.length*c+l.length>=f));)r.push(l),o+=l.length,t=t.parentNode;return r.reverse().join(a)}catch{return"<unknown>"}}function vf(n,e){const t=n,i=[];if(!t||!t.tagName)return"";if(Ta.HTMLElement&&t instanceof HTMLElement&&t.dataset){if(t.dataset.sentryComponent)return t.dataset.sentryComponent;if(t.dataset.sentryElement)return t.dataset.sentryElement}i.push(t.tagName.toLowerCase());const r=e&&e.length?e.filter(o=>t.getAttribute(o)).map(o=>[o,t.getAttribute(o)]):null;if(r&&r.length)r.forEach(o=>{i.push(`[${o[0]}="${o[1]}"]`)});else{t.id&&i.push(`#${t.id}`);const o=t.className;if(o&&vn(o)){const a=o.split(/\s+/);for(const c of a)i.push(`.${c}`)}}const s=["aria-label","type","name","title","alt"];for(const o of s){const a=t.getAttribute(o);a&&i.push(`[${o}="${a}"]`)}return i.join("")}function xf(){try{return Ta.document.location.href}catch{return""}}function Sf(n){if(!Ta.HTMLElement)return null;let e=n;const t=5;for(let i=0;i<t;i++){if(!e)return null;if(e instanceof HTMLElement){if(e.dataset.sentryComponent)return e.dataset.sentryComponent;if(e.dataset.sentryElement)return e.dataset.sentryElement}e=e.parentNode}return null}function Pi(n,e=0){return typeof n!="string"||e===0||n.length<=e?n:`${n.slice(0,e)}...`}function hs(n,e){if(!Array.isArray(n))return"";const t=[];for(let i=0;i<n.length;i++){const r=n[i];try{Gl(r)?t.push("[VueViewModel]"):t.push(String(r))}catch{t.push("[value cannot be serialized]")}}return t.join(e)}function Ef(n,e,t=!1){return vn(n)?mf(e)?e.test(n):vn(e)?t?n===e:n.includes(e):!1:!1}function bs(n,e=[],t=!1){return e.some(i=>Ef(n,i,t))}function Ut(n,e,t){if(!(e in n))return;const i=n[e],r=t(i);typeof r=="function"&&Wl(r,i);try{n[e]=r}catch{li&&Te.log(`Failed to replace method "${e}" in object`,n)}}function ii(n,e,t){try{Object.defineProperty(n,e,{value:t,writable:!0,configurable:!0})}catch{li&&Te.log(`Failed to add non-enumerable property "${e}" to object`,n)}}function Wl(n,e){try{const t=e.prototype||{};n.prototype=e.prototype=t,ii(n,"__sentry_original__",e)}catch{}}function ba(n){return n.__sentry_original__}function Xl(n){if(Ea(n))return{message:n.message,name:n.name,stack:n.stack,...rc(n)};if(ys(n)){const e={type:n.type,target:ic(n.target),currentTarget:ic(n.currentTarget),...rc(n)};return typeof CustomEvent<"u"&&ni(n,CustomEvent)&&(e.detail=n.detail),e}else return n}function ic(n){try{return pf(n)?Vl(n):Object.prototype.toString.call(n)}catch{return"<unknown>"}}function rc(n){if(typeof n=="object"&&n!==null){const e={};for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&(e[t]=n[t]);return e}else return{}}function Mf(n,e=40){const t=Object.keys(Xl(n));t.sort();const i=t[0];if(!i)return"[object has no keys]";if(i.length>=e)return Pi(i,e);for(let r=t.length;r>0;r--){const s=t.slice(0,r).join(", ");if(!(s.length>e))return r===t.length?s:Pi(s,e)}return""}function Vt(n){return _o(n,new Map)}function _o(n,e){if(yf(n)){const t=e.get(n);if(t!==void 0)return t;const i={};e.set(n,i);for(const r of Object.getOwnPropertyNames(n))typeof n[r]<"u"&&(i[r]=_o(n[r],e));return i}if(Array.isArray(n)){const t=e.get(n);if(t!==void 0)return t;const i=[];return e.set(n,i),n.forEach(r=>{i.push(_o(r,e))}),i}return n}function yf(n){if(!Ui(n))return!1;try{const e=Object.getPrototypeOf(n).constructor.name;return!e||e==="Object"}catch{return!0}}const ql=1e3;function lr(){return Date.now()/ql}function Tf(){const{performance:n}=Xe;if(!n||!n.now)return lr;const e=Date.now()-n.now(),t=n.timeOrigin==null?e:n.timeOrigin;return()=>(t+n.now())/ql}const xn=Tf();(()=>{const{performance:n}=Xe;if(!n||!n.now)return;const e=3600*1e3,t=n.now(),i=Date.now(),r=n.timeOrigin?Math.abs(n.timeOrigin+t-i):e,s=r<e,o=n.timing&&n.timing.navigationStart,c=typeof o=="number"?Math.abs(o+t-i):e,l=c<e;return s||l?r<=c?n.timeOrigin:o:i})();function qt(){const n=Xe,e=n.crypto||n.msCrypto;let t=()=>Math.random()*16;try{if(e&&e.randomUUID)return e.randomUUID().replace(/-/g,"");e&&e.getRandomValues&&(t=()=>{const i=new Uint8Array(1);return e.getRandomValues(i),i[0]})}catch{}return("10000000100040008000"+1e11).replace(/[018]/g,i=>(i^(t()&15)>>i/4).toString(16))}function Yl(n){return n.exception&&n.exception.values?n.exception.values[0]:void 0}function Pn(n){const{message:e,event_id:t}=n;if(e)return e;const i=Yl(n);return i?i.type&&i.value?`${i.type}: ${i.value}`:i.type||i.value||t||"<unknown>":t||"<unknown>"}function go(n,e,t){const i=n.exception=n.exception||{},r=i.values=i.values||[],s=r[0]=r[0]||{};s.value||(s.value=e||""),s.type||(s.type="Error")}function ri(n,e){const t=Yl(n);if(!t)return;const i={type:"generic",handled:!0},r=t.mechanism;if(t.mechanism={...i,...r,...e},e&&"data"in e){const s={...r&&r.data,...e.data};t.mechanism.data=s}}function sc(n){if(bf(n))return!0;try{ii(n,"__sentry_captured__",!0)}catch{}return!1}function bf(n){try{return n.__sentry_captured__}catch{}}var pn;(function(n){n[n.PENDING=0]="PENDING";const t=1;n[n.RESOLVED=t]="RESOLVED";const i=2;n[n.REJECTED=i]="REJECTED"})(pn||(pn={}));function si(n){return new Ht(e=>{e(n)})}function ps(n){return new Ht((e,t)=>{t(n)})}class Ht{constructor(e){Ht.prototype.__init.call(this),Ht.prototype.__init2.call(this),Ht.prototype.__init3.call(this),Ht.prototype.__init4.call(this),this._state=pn.PENDING,this._handlers=[];try{e(this._resolve,this._reject)}catch(t){this._reject(t)}}then(e,t){return new Ht((i,r)=>{this._handlers.push([!1,s=>{if(!e)i(s);else try{i(e(s))}catch(o){r(o)}},s=>{if(!t)r(s);else try{i(t(s))}catch(o){r(o)}}]),this._executeHandlers()})}catch(e){return this.then(t=>t,e)}finally(e){return new Ht((t,i)=>{let r,s;return this.then(o=>{s=!1,r=o,e&&e()},o=>{s=!0,r=o,e&&e()}).then(()=>{if(s){i(r);return}t(r)})})}__init(){this._resolve=e=>{this._setResult(pn.RESOLVED,e)}}__init2(){this._reject=e=>{this._setResult(pn.REJECTED,e)}}__init3(){this._setResult=(e,t)=>{if(this._state===pn.PENDING){if(Ts(t)){t.then(this._resolve,this._reject);return}this._state=e,this._value=t,this._executeHandlers()}}}__init4(){this._executeHandlers=()=>{if(this._state===pn.PENDING)return;const e=this._handlers.slice();this._handlers=[],e.forEach(t=>{t[0]||(this._state===pn.RESOLVED&&t[1](this._value),this._state===pn.REJECTED&&t[2](this._value),t[0]=!0)})}}}function wf(n){const e=xn(),t={sid:qt(),init:!0,timestamp:e,started:e,duration:0,status:"ok",errors:0,ignoreDuration:!1,toJSON:()=>Rf(t)};return Ni(t,n),t}function Ni(n,e={}){if(e.user&&(!n.ipAddress&&e.user.ip_address&&(n.ipAddress=e.user.ip_address),!n.did&&!e.did&&(n.did=e.user.id||e.user.email||e.user.username)),n.timestamp=e.timestamp||xn(),e.abnormal_mechanism&&(n.abnormal_mechanism=e.abnormal_mechanism),e.ignoreDuration&&(n.ignoreDuration=e.ignoreDuration),e.sid&&(n.sid=e.sid.length===32?e.sid:qt()),e.init!==void 0&&(n.init=e.init),!n.did&&e.did&&(n.did=`${e.did}`),typeof e.started=="number"&&(n.started=e.started),n.ignoreDuration)n.duration=void 0;else if(typeof e.duration=="number")n.duration=e.duration;else{const t=n.timestamp-n.started;n.duration=t>=0?t:0}e.release&&(n.release=e.release),e.environment&&(n.environment=e.environment),!n.ipAddress&&e.ipAddress&&(n.ipAddress=e.ipAddress),!n.userAgent&&e.userAgent&&(n.userAgent=e.userAgent),typeof e.errors=="number"&&(n.errors=e.errors),e.status&&(n.status=e.status)}function Af(n,e){let t={};n.status==="ok"&&(t={status:"exited"}),Ni(n,t)}function Rf(n){return Vt({sid:`${n.sid}`,init:n.init,started:new Date(n.started*1e3).toISOString(),timestamp:new Date(n.timestamp*1e3).toISOString(),status:n.status,errors:n.errors,did:typeof n.did=="number"||typeof n.did=="string"?`${n.did}`:void 0,duration:n.duration,abnormal_mechanism:n.abnormal_mechanism,attrs:{release:n.release,environment:n.environment,ip_address:n.ipAddress,user_agent:n.userAgent}})}function oc(){return qt()}function vo(){return qt().substring(16)}function ws(n,e,t=2){if(!e||typeof e!="object"||t<=0)return e;if(n&&e&&Object.keys(e).length===0)return n;const i={...n};for(const r in e)Object.prototype.hasOwnProperty.call(e,r)&&(i[r]=ws(i[r],e[r],t-1));return i}const xo="_sentrySpan";function ac(n,e){e?ii(n,xo,e):delete n[xo]}function cc(n){return n[xo]}const Cf=100;class wa{constructor(){this._notifyingListeners=!1,this._scopeListeners=[],this._eventProcessors=[],this._breadcrumbs=[],this._attachments=[],this._user={},this._tags={},this._extra={},this._contexts={},this._sdkProcessingMetadata={},this._propagationContext={traceId:oc(),spanId:vo()}}clone(){const e=new wa;return e._breadcrumbs=[...this._breadcrumbs],e._tags={...this._tags},e._extra={...this._extra},e._contexts={...this._contexts},this._contexts.flags&&(e._contexts.flags={values:[...this._contexts.flags.values]}),e._user=this._user,e._level=this._level,e._session=this._session,e._transactionName=this._transactionName,e._fingerprint=this._fingerprint,e._eventProcessors=[...this._eventProcessors],e._requestSession=this._requestSession,e._attachments=[...this._attachments],e._sdkProcessingMetadata={...this._sdkProcessingMetadata},e._propagationContext={...this._propagationContext},e._client=this._client,e._lastEventId=this._lastEventId,ac(e,cc(this)),e}setClient(e){this._client=e}setLastEventId(e){this._lastEventId=e}getClient(){return this._client}lastEventId(){return this._lastEventId}addScopeListener(e){this._scopeListeners.push(e)}addEventProcessor(e){return this._eventProcessors.push(e),this}setUser(e){return this._user=e||{email:void 0,id:void 0,ip_address:void 0,username:void 0},this._session&&Ni(this._session,{user:e}),this._notifyScopeListeners(),this}getUser(){return this._user}getRequestSession(){return this._requestSession}setRequestSession(e){return this._requestSession=e,this}setTags(e){return this._tags={...this._tags,...e},this._notifyScopeListeners(),this}setTag(e,t){return this._tags={...this._tags,[e]:t},this._notifyScopeListeners(),this}setExtras(e){return this._extra={...this._extra,...e},this._notifyScopeListeners(),this}setExtra(e,t){return this._extra={...this._extra,[e]:t},this._notifyScopeListeners(),this}setFingerprint(e){return this._fingerprint=e,this._notifyScopeListeners(),this}setLevel(e){return this._level=e,this._notifyScopeListeners(),this}setTransactionName(e){return this._transactionName=e,this._notifyScopeListeners(),this}setContext(e,t){return t===null?delete this._contexts[e]:this._contexts[e]=t,this._notifyScopeListeners(),this}setSession(e){return e?this._session=e:delete this._session,this._notifyScopeListeners(),this}getSession(){return this._session}update(e){if(!e)return this;const t=typeof e=="function"?e(this):e,[i,r]=t instanceof Nn?[t.getScopeData(),t.getRequestSession()]:Ui(t)?[e,e.requestSession]:[],{tags:s,extra:o,user:a,contexts:c,level:l,fingerprint:u=[],propagationContext:f}=i||{};return this._tags={...this._tags,...s},this._extra={...this._extra,...o},this._contexts={...this._contexts,...c},a&&Object.keys(a).length&&(this._user=a),l&&(this._level=l),u.length&&(this._fingerprint=u),f&&(this._propagationContext=f),r&&(this._requestSession=r),this}clear(){return this._breadcrumbs=[],this._tags={},this._extra={},this._user={},this._contexts={},this._level=void 0,this._transactionName=void 0,this._fingerprint=void 0,this._requestSession=void 0,this._session=void 0,ac(this,void 0),this._attachments=[],this.setPropagationContext({traceId:oc()}),this._notifyScopeListeners(),this}addBreadcrumb(e,t){const i=typeof t=="number"?t:Cf;if(i<=0)return this;const r={timestamp:lr(),...e},s=this._breadcrumbs;return s.push(r),this._breadcrumbs=s.length>i?s.slice(-i):s,this._notifyScopeListeners(),this}getLastBreadcrumb(){return this._breadcrumbs[this._breadcrumbs.length-1]}clearBreadcrumbs(){return this._breadcrumbs=[],this._notifyScopeListeners(),this}addAttachment(e){return this._attachments.push(e),this}clearAttachments(){return this._attachments=[],this}getScopeData(){return{breadcrumbs:this._breadcrumbs,attachments:this._attachments,contexts:this._contexts,tags:this._tags,extra:this._extra,user:this._user,level:this._level,fingerprint:this._fingerprint||[],eventProcessors:this._eventProcessors,propagationContext:this._propagationContext,sdkProcessingMetadata:this._sdkProcessingMetadata,transactionName:this._transactionName,span:cc(this)}}setSDKProcessingMetadata(e){return this._sdkProcessingMetadata=ws(this._sdkProcessingMetadata,e,2),this}setPropagationContext(e){return this._propagationContext={spanId:vo(),...e},this}getPropagationContext(){return this._propagationContext}captureException(e,t){const i=t&&t.event_id?t.event_id:qt();if(!this._client)return Te.warn("No client configured on scope - will not capture exception!"),i;const r=new Error("Sentry syntheticException");return this._client.captureException(e,{originalException:e,syntheticException:r,...t,event_id:i},this),i}captureMessage(e,t,i){const r=i&&i.event_id?i.event_id:qt();if(!this._client)return Te.warn("No client configured on scope - will not capture message!"),r;const s=new Error(e);return this._client.captureMessage(e,t,{originalException:e,syntheticException:s,...i,event_id:r},this),r}captureEvent(e,t){const i=t&&t.event_id?t.event_id:qt();return this._client?(this._client.captureEvent(e,{...t,event_id:i},this),i):(Te.warn("No client configured on scope - will not capture event!"),i)}_notifyScopeListeners(){this._notifyingListeners||(this._notifyingListeners=!0,this._scopeListeners.forEach(e=>{e(this)}),this._notifyingListeners=!1)}}const Nn=wa;function Pf(){return Es("defaultCurrentScope",()=>new Nn)}function Df(){return Es("defaultIsolationScope",()=>new Nn)}class If{constructor(e,t){let i;e?i=e:i=new Nn;let r;t?r=t:r=new Nn,this._stack=[{scope:i}],this._isolationScope=r}withScope(e){const t=this._pushScope();let i;try{i=e(t)}catch(r){throw this._popScope(),r}return Ts(i)?i.then(r=>(this._popScope(),r),r=>{throw this._popScope(),r}):(this._popScope(),i)}getClient(){return this.getStackTop().client}getScope(){return this.getStackTop().scope}getIsolationScope(){return this._isolationScope}getStackTop(){return this._stack[this._stack.length-1]}_pushScope(){const e=this.getScope().clone();return this._stack.push({client:this.getClient(),scope:e}),e}_popScope(){return this._stack.length<=1?!1:!!this._stack.pop()}}function Fi(){const n=Ms(),e=Sa(n);return e.stack=e.stack||new If(Pf(),Df())}function Lf(n){return Fi().withScope(n)}function Uf(n,e){const t=Fi();return t.withScope(()=>(t.getStackTop().scope=n,e(n)))}function lc(n){return Fi().withScope(()=>n(Fi().getIsolationScope()))}function Nf(){return{withIsolationScope:lc,withScope:Lf,withSetScope:Uf,withSetIsolationScope:(n,e)=>lc(e),getCurrentScope:()=>Fi().getScope(),getIsolationScope:()=>Fi().getIsolationScope()}}function Aa(n){const e=Sa(n);return e.acs?e.acs:Nf()}function on(){const n=Ms();return Aa(n).getCurrentScope()}function ur(){const n=Ms();return Aa(n).getIsolationScope()}function Ff(){return Es("globalScope",()=>new Nn)}function $l(...n){const e=Ms(),t=Aa(e);if(n.length===2){const[i,r]=n;return i?t.withSetScope(i,r):t.withScope(r)}return t.withScope(n[0])}function vt(){return on().getClient()}function Of(n){const e=n.getPropagationContext(),{traceId:t,spanId:i,parentSpanId:r}=e;return Vt({trace_id:t,span_id:i,parent_span_id:r})}const Bf="_sentryMetrics";function zf(n){const e=n[Bf];if(!e)return;const t={};for(const[,[i,r]]of e)(t[i]||(t[i]=[])).push(Vt(r));return t}const kf="sentry.source",Hf="sentry.sample_rate",Gf="sentry.op",Vf="sentry.origin",Wf=0,Xf=1,qf="sentry-",Yf=/^sentry-/;function $f(n){const e=jf(n);if(!e)return;const t=Object.entries(e).reduce((i,[r,s])=>{if(r.match(Yf)){const o=r.slice(qf.length);i[o]=s}return i},{});if(Object.keys(t).length>0)return t}function jf(n){if(!(!n||!vn(n)&&!Array.isArray(n)))return Array.isArray(n)?n.reduce((e,t)=>{const i=uc(t);return Object.entries(i).forEach(([r,s])=>{e[r]=s}),e},{}):uc(n)}function uc(n){return n.split(",").map(e=>e.split("=").map(t=>decodeURIComponent(t.trim()))).reduce((e,[t,i])=>(t&&i&&(e[t]=i),e),{})}const Kf=1;let fc=!1;function Zf(n){const{spanId:e,traceId:t,isRemote:i}=n.spanContext(),r=i?e:Ra(n).parent_span_id,s=i?vo():e;return Vt({parent_span_id:r,span_id:s,trace_id:t})}function dc(n){return typeof n=="number"?hc(n):Array.isArray(n)?n[0]+n[1]/1e9:n instanceof Date?hc(n.getTime()):xn()}function hc(n){return n>9999999999?n/1e3:n}function Ra(n){if(Qf(n))return n.getSpanJSON();try{const{spanId:e,traceId:t}=n.spanContext();if(Jf(n)){const{attributes:i,startTime:r,name:s,endTime:o,parentSpanId:a,status:c}=n;return Vt({span_id:e,trace_id:t,data:i,description:s,parent_span_id:a,start_timestamp:dc(r),timestamp:dc(o)||void 0,status:td(c),op:i[Gf],origin:i[Vf],_metrics_summary:zf(n)})}return{span_id:e,trace_id:t}}catch{return{}}}function Jf(n){const e=n;return!!e.attributes&&!!e.startTime&&!!e.name&&!!e.endTime&&!!e.status}function Qf(n){return typeof n.getSpanJSON=="function"}function ed(n){const{traceFlags:e}=n.spanContext();return e===Kf}function td(n){if(!(!n||n.code===Wf))return n.code===Xf?"ok":n.message||"unknown_error"}const nd="_sentryRootSpan";function jl(n){return n[nd]||n}function id(){fc||(ui(()=>{console.warn("[Sentry] Deprecation warning: Returning null from `beforeSendSpan` will be disallowed from SDK version 9.0.0 onwards. The callback will only support mutating spans. To drop certain spans, configure the respective integrations directly.")}),fc=!0)}function rd(n){if(typeof __SENTRY_TRACING__=="boolean"&&!__SENTRY_TRACING__)return!1;const e=vt(),t=e&&e.getOptions();return!!t&&(t.enableTracing||"tracesSampleRate"in t||"tracesSampler"in t)}const Ca="production",sd="_frozenDsc";function Kl(n,e){const t=e.getOptions(),{publicKey:i}=e.getDsn()||{},r=Vt({environment:t.environment||Ca,release:t.release,public_key:i,trace_id:n});return e.emit("createDsc",r),r}function od(n,e){const t=e.getPropagationContext();return t.dsc||Kl(t.traceId,n)}function ad(n){const e=vt();if(!e)return{};const t=jl(n),i=t[sd];if(i)return i;const r=t.spanContext().traceState,s=r&&r.get("sentry.dsc"),o=s&&$f(s);if(o)return o;const a=Kl(n.spanContext().traceId,e),c=Ra(t),l=c.data||{},u=l[Hf];u!=null&&(a.sample_rate=`${u}`);const f=l[kf],h=c.description;return f!=="url"&&h&&(a.transaction=h),rd()&&(a.sampled=String(ed(t))),e.emit("createDsc",a,t),a}function cd(n){if(typeof n=="boolean")return Number(n);const e=typeof n=="string"?parseFloat(n):n;if(typeof e!="number"||isNaN(e)||e<0||e>1){Qe&&Te.warn(`[Tracing] Given sample rate is invalid. Sample rate must be a boolean or a number between 0 and 1. Got ${JSON.stringify(n)} of type ${JSON.stringify(typeof n)}.`);return}return e}const ld=/^(?:(\w+):)\/\/(?:(\w+)(?::(\w+)?)?@)([\w.-]+)(?::(\d+))?\/(.+)/;function ud(n){return n==="http"||n==="https"}function As(n,e=!1){const{host:t,path:i,pass:r,port:s,projectId:o,protocol:a,publicKey:c}=n;return`${a}://${c}${e&&r?`:${r}`:""}@${t}${s?`:${s}`:""}/${i&&`${i}/`}${o}`}function fd(n){const e=ld.exec(n);if(!e){ui(()=>{console.error(`Invalid Sentry Dsn: ${n}`)});return}const[t,i,r="",s="",o="",a=""]=e.slice(1);let c="",l=a;const u=l.split("/");if(u.length>1&&(c=u.slice(0,-1).join("/"),l=u.pop()),l){const f=l.match(/^\d+/);f&&(l=f[0])}return Zl({host:s,pass:r,path:c,projectId:l,port:o,protocol:t,publicKey:i})}function Zl(n){return{protocol:n.protocol,publicKey:n.publicKey||"",pass:n.pass||"",host:n.host,port:n.port||"",path:n.path||"",projectId:n.projectId}}function dd(n){if(!li)return!0;const{port:e,projectId:t,protocol:i}=n;return["protocol","publicKey","host","projectId"].find(o=>n[o]?!1:(Te.error(`Invalid Sentry Dsn: ${o} missing`),!0))?!1:t.match(/^\d+$/)?ud(i)?e&&isNaN(parseInt(e,10))?(Te.error(`Invalid Sentry Dsn: Invalid port ${e}`),!1):!0:(Te.error(`Invalid Sentry Dsn: Invalid protocol ${i}`),!1):(Te.error(`Invalid Sentry Dsn: Invalid projectId ${t}`),!1)}function hd(n){const e=typeof n=="string"?fd(n):Zl(n);if(!(!e||!dd(e)))return e}function pd(){const n=typeof WeakSet=="function",e=n?new WeakSet:[];function t(r){if(n)return e.has(r)?!0:(e.add(r),!1);for(let s=0;s<e.length;s++)if(e[s]===r)return!0;return e.push(r),!1}function i(r){if(n)e.delete(r);else for(let s=0;s<e.length;s++)if(e[s]===r){e.splice(s,1);break}}return[t,i]}function mn(n,e=100,t=1/0){try{return So("",n,e,t)}catch(i){return{ERROR:`**non-serializable** (${i})`}}}function Jl(n,e=3,t=100*1024){const i=mn(n,e);return vd(i)>t?Jl(n,e-1,t):i}function So(n,e,t=1/0,i=1/0,r=pd()){const[s,o]=r;if(e==null||["boolean","string"].includes(typeof e)||typeof e=="number"&&Number.isFinite(e))return e;const a=md(n,e);if(!a.startsWith("[object "))return a;if(e.__sentry_skip_normalization__)return e;const c=typeof e.__sentry_override_normalization_depth__=="number"?e.__sentry_override_normalization_depth__:t;if(c===0)return a.replace("object ","");if(s(e))return"[Circular ~]";const l=e;if(l&&typeof l.toJSON=="function")try{const m=l.toJSON();return So("",m,c-1,i,r)}catch{}const u=Array.isArray(e)?[]:{};let f=0;const h=Xl(e);for(const m in h){if(!Object.prototype.hasOwnProperty.call(h,m))continue;if(f>=i){u[m]="[MaxProperties ~]";break}const _=h[m];u[m]=So(m,_,c-1,i,r),f++}return o(e),u}function md(n,e){try{if(n==="domain"&&e&&typeof e=="object"&&e._events)return"[Domain]";if(n==="domainEmitter")return"[DomainEmitter]";if(typeof global<"u"&&e===global)return"[Global]";if(typeof window<"u"&&e===window)return"[Window]";if(typeof document<"u"&&e===document)return"[Document]";if(Gl(e))return"[VueViewModel]";if(_f(e))return"[SyntheticEvent]";if(typeof e=="number"&&!Number.isFinite(e))return`[${e}]`;if(typeof e=="function")return`[Function: ${Un(e)}]`;if(typeof e=="symbol")return`[${String(e)}]`;if(typeof e=="bigint")return`[BigInt: ${String(e)}]`;const t=_d(e);return/^HTML(\w*)Element$/.test(t)?`[HTMLElement: ${t}]`:`[object ${t}]`}catch(t){return`**non-serializable** (${t})`}}function _d(n){const e=Object.getPrototypeOf(n);return e?e.constructor.name:"null prototype"}function gd(n){return~-encodeURI(n).split(/%..|./).length}function vd(n){return gd(JSON.stringify(n))}function fr(n,e=[]){return[n,e]}function xd(n,e){const[t,i]=n;return[t,[...i,e]]}function pc(n,e){const t=n[1];for(const i of t){const r=i[0].type;if(e(i,r))return!0}return!1}function Eo(n){return Xe.__SENTRY__&&Xe.__SENTRY__.encodePolyfill?Xe.__SENTRY__.encodePolyfill(n):new TextEncoder().encode(n)}function Sd(n){const[e,t]=n;let i=JSON.stringify(e);function r(s){typeof i=="string"?i=typeof s=="string"?i+s:[Eo(i),s]:i.push(typeof s=="string"?Eo(s):s)}for(const s of t){const[o,a]=s;if(r(`
${JSON.stringify(o)}
`),typeof a=="string"||a instanceof Uint8Array)r(a);else{let c;try{c=JSON.stringify(a)}catch{c=JSON.stringify(mn(a))}r(c)}}return typeof i=="string"?i:Ed(i)}function Ed(n){const e=n.reduce((r,s)=>r+s.length,0),t=new Uint8Array(e);let i=0;for(const r of n)t.set(r,i),i+=r.length;return t}function Md(n){const e=typeof n.data=="string"?Eo(n.data):n.data;return[Vt({type:"attachment",length:e.length,filename:n.filename,content_type:n.contentType,attachment_type:n.attachmentType}),e]}const yd={session:"session",sessions:"session",attachment:"attachment",transaction:"transaction",event:"error",client_report:"internal",user_report:"default",profile:"profile",profile_chunk:"profile",replay_event:"replay",replay_recording:"replay",check_in:"monitor",feedback:"feedback",span:"span",statsd:"metric_bucket",raw_security:"security"};function mc(n){return yd[n]}function Ql(n){if(!n||!n.sdk)return;const{name:e,version:t}=n.sdk;return{name:e,version:t}}function Td(n,e,t,i){const r=n.sdkProcessingMetadata&&n.sdkProcessingMetadata.dynamicSamplingContext;return{event_id:n.event_id,sent_at:new Date().toISOString(),...e&&{sdk:e},...!!t&&i&&{dsn:As(i)},...r&&{trace:Vt({...r})}}}function bd(n,e){return e&&(n.sdk=n.sdk||{},n.sdk.name=n.sdk.name||e.name,n.sdk.version=n.sdk.version||e.version,n.sdk.integrations=[...n.sdk.integrations||[],...e.integrations||[]],n.sdk.packages=[...n.sdk.packages||[],...e.packages||[]]),n}function wd(n,e,t,i){const r=Ql(t),s={sent_at:new Date().toISOString(),...r&&{sdk:r},...!!i&&e&&{dsn:As(e)}},o="aggregates"in n?[{type:"sessions"},n]:[{type:"session"},n.toJSON()];return fr(s,[o])}function Ad(n,e,t,i){const r=Ql(t),s=n.type&&n.type!=="replay_event"?n.type:"event";bd(n,t&&t.sdk);const o=Td(n,r,i,e);return delete n.sdkProcessingMetadata,fr(o,[[{type:s},n]])}function Mo(n,e,t,i=0){return new Ht((r,s)=>{const o=n[i];if(e===null||typeof o!="function")r(e);else{const a=o({...e},t);Qe&&o.id&&a===null&&Te.log(`Event processor "${o.id}" dropped event`),Ts(a)?a.then(c=>Mo(n,c,t,i+1).then(r)).then(null,s):Mo(n,a,t,i+1).then(r).then(null,s)}})}let yr,_c,Tr;function Rd(n){const e=Xe._sentryDebugIds;if(!e)return{};const t=Object.keys(e);return Tr&&t.length===_c||(_c=t.length,Tr=t.reduce((i,r)=>{yr||(yr={});const s=yr[r];if(s)i[s[0]]=s[1];else{const o=n(r);for(let a=o.length-1;a>=0;a--){const c=o[a],l=c&&c.filename,u=e[r];if(l&&u){i[l]=u,yr[r]=[l,u];break}}}return i},{})),Tr}function Cd(n,e){const{fingerprint:t,span:i,breadcrumbs:r,sdkProcessingMetadata:s}=e;Pd(n,e),i&&Ld(n,i),Ud(n,t),Dd(n,r),Id(n,s)}function gc(n,e){const{extra:t,tags:i,user:r,contexts:s,level:o,sdkProcessingMetadata:a,breadcrumbs:c,fingerprint:l,eventProcessors:u,attachments:f,propagationContext:h,transactionName:m,span:_}=e;br(n,"extra",t),br(n,"tags",i),br(n,"user",r),br(n,"contexts",s),n.sdkProcessingMetadata=ws(n.sdkProcessingMetadata,a,2),o&&(n.level=o),m&&(n.transactionName=m),_&&(n.span=_),c.length&&(n.breadcrumbs=[...n.breadcrumbs,...c]),l.length&&(n.fingerprint=[...n.fingerprint,...l]),u.length&&(n.eventProcessors=[...n.eventProcessors,...u]),f.length&&(n.attachments=[...n.attachments,...f]),n.propagationContext={...n.propagationContext,...h}}function br(n,e,t){n[e]=ws(n[e],t,1)}function Pd(n,e){const{extra:t,tags:i,user:r,contexts:s,level:o,transactionName:a}=e,c=Vt(t);c&&Object.keys(c).length&&(n.extra={...c,...n.extra});const l=Vt(i);l&&Object.keys(l).length&&(n.tags={...l,...n.tags});const u=Vt(r);u&&Object.keys(u).length&&(n.user={...u,...n.user});const f=Vt(s);f&&Object.keys(f).length&&(n.contexts={...f,...n.contexts}),o&&(n.level=o),a&&n.type!=="transaction"&&(n.transaction=a)}function Dd(n,e){const t=[...n.breadcrumbs||[],...e];n.breadcrumbs=t.length?t:void 0}function Id(n,e){n.sdkProcessingMetadata={...n.sdkProcessingMetadata,...e}}function Ld(n,e){n.contexts={trace:Zf(e),...n.contexts},n.sdkProcessingMetadata={dynamicSamplingContext:ad(e),...n.sdkProcessingMetadata};const t=jl(e),i=Ra(t).description;i&&!n.transaction&&n.type==="transaction"&&(n.transaction=i)}function Ud(n,e){n.fingerprint=n.fingerprint?Array.isArray(n.fingerprint)?n.fingerprint:[n.fingerprint]:[],e&&(n.fingerprint=n.fingerprint.concat(e)),n.fingerprint&&!n.fingerprint.length&&delete n.fingerprint}function Nd(n,e,t,i,r,s){const{normalizeDepth:o=3,normalizeMaxBreadth:a=1e3}=n,c={...e,event_id:e.event_id||t.event_id||qt(),timestamp:e.timestamp||lr()},l=t.integrations||n.integrations.map(p=>p.name);Fd(c,n),zd(c,l),r&&r.emit("applyFrameMetadata",e),e.type===void 0&&Od(c,n.stackParser);const u=Hd(i,t.captureContext);t.mechanism&&ri(c,t.mechanism);const f=r?r.getEventProcessors():[],h=Ff().getScopeData();if(s){const p=s.getScopeData();gc(h,p)}if(u){const p=u.getScopeData();gc(h,p)}const m=[...t.attachments||[],...h.attachments];m.length&&(t.attachments=m),Cd(c,h);const _=[...f,...h.eventProcessors];return Mo(_,c,t).then(p=>(p&&Bd(p),typeof o=="number"&&o>0?kd(p,o,a):p))}function Fd(n,e){const{environment:t,release:i,dist:r,maxValueLength:s=250}=e;n.environment=n.environment||t||Ca,!n.release&&i&&(n.release=i),!n.dist&&r&&(n.dist=r),n.message&&(n.message=Pi(n.message,s));const o=n.exception&&n.exception.values&&n.exception.values[0];o&&o.value&&(o.value=Pi(o.value,s));const a=n.request;a&&a.url&&(a.url=Pi(a.url,s))}function Od(n,e){const t=Rd(e);try{n.exception.values.forEach(i=>{i.stacktrace.frames.forEach(r=>{t&&r.filename&&(r.debug_id=t[r.filename])})})}catch{}}function Bd(n){const e={};try{n.exception.values.forEach(i=>{i.stacktrace.frames.forEach(r=>{r.debug_id&&(r.abs_path?e[r.abs_path]=r.debug_id:r.filename&&(e[r.filename]=r.debug_id),delete r.debug_id)})})}catch{}if(Object.keys(e).length===0)return;n.debug_meta=n.debug_meta||{},n.debug_meta.images=n.debug_meta.images||[];const t=n.debug_meta.images;Object.entries(e).forEach(([i,r])=>{t.push({type:"sourcemap",code_file:i,debug_id:r})})}function zd(n,e){e.length>0&&(n.sdk=n.sdk||{},n.sdk.integrations=[...n.sdk.integrations||[],...e])}function kd(n,e,t){if(!n)return null;const i={...n,...n.breadcrumbs&&{breadcrumbs:n.breadcrumbs.map(r=>({...r,...r.data&&{data:mn(r.data,e,t)}}))},...n.user&&{user:mn(n.user,e,t)},...n.contexts&&{contexts:mn(n.contexts,e,t)},...n.extra&&{extra:mn(n.extra,e,t)}};return n.contexts&&n.contexts.trace&&i.contexts&&(i.contexts.trace=n.contexts.trace,n.contexts.trace.data&&(i.contexts.trace.data=mn(n.contexts.trace.data,e,t))),n.spans&&(i.spans=n.spans.map(r=>({...r,...r.data&&{data:mn(r.data,e,t)}}))),n.contexts&&n.contexts.flags&&i.contexts&&(i.contexts.flags=mn(n.contexts.flags,3,t)),i}function Hd(n,e){if(!e)return n;const t=n?n.clone():new Nn;return t.update(e),t}function Gd(n){if(n)return Vd(n)?{captureContext:n}:Xd(n)?{captureContext:n}:n}function Vd(n){return n instanceof Nn||typeof n=="function"}const Wd=["user","level","extra","contexts","tags","fingerprint","requestSession","propagationContext"];function Xd(n){return Object.keys(n).some(e=>Wd.includes(e))}function eu(n,e){return on().captureException(n,Gd(e))}function vc(n,e){const t=typeof e=="string"?e:void 0,i=typeof e!="string"?{captureContext:e}:void 0;return on().captureMessage(n,t,i)}function tu(n,e){return on().captureEvent(n,e)}function xc(n){const e=vt(),t=ur(),i=on(),{release:r,environment:s=Ca}=e&&e.getOptions()||{},{userAgent:o}=Xe.navigator||{},a=wf({release:r,environment:s,user:i.getUser()||t.getUser(),...o&&{userAgent:o},...n}),c=t.getSession();return c&&c.status==="ok"&&Ni(c,{status:"exited"}),nu(),t.setSession(a),i.setSession(a),a}function nu(){const n=ur(),e=on(),t=e.getSession()||n.getSession();t&&Af(t),iu(),n.setSession(),e.setSession()}function iu(){const n=ur(),e=on(),t=vt(),i=e.getSession()||n.getSession();i&&t&&t.captureSession(i)}function Sc(n=!1){if(n){nu();return}iu()}const qd="7";function Yd(n){const e=n.protocol?`${n.protocol}:`:"",t=n.port?`:${n.port}`:"";return`${e}//${n.host}${t}${n.path?`/${n.path}`:""}/api/`}function $d(n){return`${Yd(n)}${n.projectId}/envelope/`}function jd(n,e){const t={sentry_version:qd};return n.publicKey&&(t.sentry_key=n.publicKey),e&&(t.sentry_client=`${e.name}/${e.version}`),new URLSearchParams(t).toString()}function Kd(n,e,t){return e||`${$d(n)}?${jd(n,t)}`}const Ec=[];function Zd(n){const e={};return n.forEach(t=>{const{name:i}=t,r=e[i];r&&!r.isDefaultInstance&&t.isDefaultInstance||(e[i]=t)}),Object.values(e)}function Jd(n){const e=n.defaultIntegrations||[],t=n.integrations;e.forEach(o=>{o.isDefaultInstance=!0});let i;if(Array.isArray(t))i=[...e,...t];else if(typeof t=="function"){const o=t(e);i=Array.isArray(o)?o:[o]}else i=e;const r=Zd(i),s=r.findIndex(o=>o.name==="Debug");if(s>-1){const[o]=r.splice(s,1);r.push(o)}return r}function Qd(n,e){const t={};return e.forEach(i=>{i&&ru(n,i,t)}),t}function Mc(n,e){for(const t of e)t&&t.afterAllSetup&&t.afterAllSetup(n)}function ru(n,e,t){if(t[e.name]){Qe&&Te.log(`Integration skipped because it was already installed: ${e.name}`);return}if(t[e.name]=e,Ec.indexOf(e.name)===-1&&typeof e.setupOnce=="function"&&(e.setupOnce(),Ec.push(e.name)),e.setup&&typeof e.setup=="function"&&e.setup(n),typeof e.preprocessEvent=="function"){const i=e.preprocessEvent.bind(e);n.on("preprocessEvent",(r,s)=>i(r,s,n))}if(typeof e.processEvent=="function"){const i=e.processEvent.bind(e),r=Object.assign((s,o)=>i(s,o,n),{id:e.name});n.addEventProcessor(r)}Qe&&Te.log(`Integration installed: ${e.name}`)}function eh(n,e,t){const i=[{type:"client_report"},{timestamp:lr(),discarded_events:n}];return fr(e?{dsn:e}:{},[i])}class tn extends Error{constructor(e,t="warn"){super(e),this.message=e,this.name=new.target.prototype.constructor.name,Object.setPrototypeOf(this,new.target.prototype),this.logLevel=t}}const yc="Not capturing exception because it's already been captured.";class th{constructor(e){if(this._options=e,this._integrations={},this._numProcessing=0,this._outcomes={},this._hooks={},this._eventProcessors=[],e.dsn?this._dsn=hd(e.dsn):Qe&&Te.warn("No DSN provided, client will not send events."),this._dsn){const r=Kd(this._dsn,e.tunnel,e._metadata?e._metadata.sdk:void 0);this._transport=e.transport({tunnel:this._options.tunnel,recordDroppedEvent:this.recordDroppedEvent.bind(this),...e.transportOptions,url:r})}const i=["enableTracing","tracesSampleRate","tracesSampler"].find(r=>r in e&&e[r]==null);i&&ui(()=>{console.warn(`[Sentry] Deprecation warning: \`${i}\` is set to undefined, which leads to tracing being enabled. In v9, a value of \`undefined\` will result in tracing being disabled.`)})}captureException(e,t,i){const r=qt();if(sc(e))return Qe&&Te.log(yc),r;const s={event_id:r,...t};return this._process(this.eventFromException(e,s).then(o=>this._captureEvent(o,s,i))),s.event_id}captureMessage(e,t,i,r){const s={event_id:qt(),...i},o=Ma(e)?e:String(e),a=ya(e)?this.eventFromMessage(o,t,s):this.eventFromException(e,s);return this._process(a.then(c=>this._captureEvent(c,s,r))),s.event_id}captureEvent(e,t,i){const r=qt();if(t&&t.originalException&&sc(t.originalException))return Qe&&Te.log(yc),r;const s={event_id:r,...t},a=(e.sdkProcessingMetadata||{}).capturedSpanScope;return this._process(this._captureEvent(e,s,a||i)),s.event_id}captureSession(e){typeof e.release!="string"?Qe&&Te.warn("Discarded session because of missing or non-string release"):(this.sendSession(e),Ni(e,{init:!1}))}getDsn(){return this._dsn}getOptions(){return this._options}getSdkMetadata(){return this._options._metadata}getTransport(){return this._transport}flush(e){const t=this._transport;return t?(this.emit("flush"),this._isClientDoneProcessing(e).then(i=>t.flush(e).then(r=>i&&r))):si(!0)}close(e){return this.flush(e).then(t=>(this.getOptions().enabled=!1,this.emit("close"),t))}getEventProcessors(){return this._eventProcessors}addEventProcessor(e){this._eventProcessors.push(e)}init(){(this._isEnabled()||this._options.integrations.some(({name:e})=>e.startsWith("Spotlight")))&&this._setupIntegrations()}getIntegrationByName(e){return this._integrations[e]}addIntegration(e){const t=this._integrations[e.name];ru(this,e,this._integrations),t||Mc(this,[e])}sendEvent(e,t={}){this.emit("beforeSendEvent",e,t);let i=Ad(e,this._dsn,this._options._metadata,this._options.tunnel);for(const s of t.attachments||[])i=xd(i,Md(s));const r=this.sendEnvelope(i);r&&r.then(s=>this.emit("afterSendEvent",e,s),null)}sendSession(e){const t=wd(e,this._dsn,this._options._metadata,this._options.tunnel);this.sendEnvelope(t)}recordDroppedEvent(e,t,i){if(this._options.sendClientReports){const r=typeof i=="number"?i:1,s=`${e}:${t}`;Qe&&Te.log(`Recording outcome: "${s}"${r>1?` (${r} times)`:""}`),this._outcomes[s]=(this._outcomes[s]||0)+r}}on(e,t){const i=this._hooks[e]=this._hooks[e]||[];return i.push(t),()=>{const r=i.indexOf(t);r>-1&&i.splice(r,1)}}emit(e,...t){const i=this._hooks[e];i&&i.forEach(r=>r(...t))}sendEnvelope(e){return this.emit("beforeEnvelope",e),this._isEnabled()&&this._transport?this._transport.send(e).then(null,t=>(Qe&&Te.error("Error while sending envelope:",t),t)):(Qe&&Te.error("Transport disabled"),si({}))}_setupIntegrations(){const{integrations:e}=this._options;this._integrations=Qd(this,e),Mc(this,e)}_updateSessionFromEvent(e,t){let i=!1,r=!1;const s=t.exception&&t.exception.values;if(s){r=!0;for(const c of s){const l=c.mechanism;if(l&&l.handled===!1){i=!0;break}}}const o=e.status==="ok";(o&&e.errors===0||o&&i)&&(Ni(e,{...i&&{status:"crashed"},errors:e.errors||Number(r||i)}),this.captureSession(e))}_isClientDoneProcessing(e){return new Ht(t=>{let i=0;const r=1,s=setInterval(()=>{this._numProcessing==0?(clearInterval(s),t(!0)):(i+=r,e&&i>=e&&(clearInterval(s),t(!1)))},r)})}_isEnabled(){return this.getOptions().enabled!==!1&&this._transport!==void 0}_prepareEvent(e,t,i=on(),r=ur()){const s=this.getOptions(),o=Object.keys(this._integrations);return!t.integrations&&o.length>0&&(t.integrations=o),this.emit("preprocessEvent",e,t),e.type||r.setLastEventId(e.event_id||t.event_id),Nd(s,e,t,i,this,r).then(a=>{if(a===null)return a;a.contexts={trace:Of(i),...a.contexts};const c=od(this,i);return a.sdkProcessingMetadata={dynamicSamplingContext:c,...a.sdkProcessingMetadata},a})}_captureEvent(e,t={},i){return this._processEvent(e,t,i).then(r=>r.event_id,r=>{if(Qe){const s=r;s.logLevel==="log"?Te.log(s.message):Te.warn(s)}})}_processEvent(e,t,i){const r=this.getOptions(),{sampleRate:s}=r,o=ou(e),a=su(e),c=e.type||"error",l=`before send for type \`${c}\``,u=typeof s>"u"?void 0:cd(s);if(a&&typeof u=="number"&&Math.random()>u)return this.recordDroppedEvent("sample_rate","error",e),ps(new tn(`Discarding event because it's not included in the random sample (sampling rate = ${s})`,"log"));const f=c==="replay_event"?"replay":c,m=(e.sdkProcessingMetadata||{}).capturedSpanIsolationScope;return this._prepareEvent(e,t,i,m).then(_=>{if(_===null)throw this.recordDroppedEvent("event_processor",f,e),new tn("An event processor returned `null`, will not send event.","log");if(t.data&&t.data.__sentry__===!0)return _;const p=ih(this,r,_,t);return nh(p,l)}).then(_=>{if(_===null){if(this.recordDroppedEvent("before_send",f,e),o){const b=1+(e.spans||[]).length;this.recordDroppedEvent("before_send","span",b)}throw new tn(`${l} returned \`null\`, will not send event.`,"log")}const S=i&&i.getSession();if(!o&&S&&this._updateSessionFromEvent(S,_),o){const d=_.sdkProcessingMetadata&&_.sdkProcessingMetadata.spanCountBeforeProcessing||0,b=_.spans?_.spans.length:0,T=d-b;T>0&&this.recordDroppedEvent("before_send","span",T)}const p=_.transaction_info;if(o&&p&&_.transaction!==e.transaction){const d="custom";_.transaction_info={...p,source:d}}return this.sendEvent(_,t),_}).then(null,_=>{throw _ instanceof tn?_:(this.captureException(_,{data:{__sentry__:!0},originalException:_}),new tn(`Event processing pipeline threw an error, original event will not be sent. Details have been sent as a new event.
Reason: ${_}`))})}_process(e){this._numProcessing++,e.then(t=>(this._numProcessing--,t),t=>(this._numProcessing--,t))}_clearOutcomes(){const e=this._outcomes;return this._outcomes={},Object.entries(e).map(([t,i])=>{const[r,s]=t.split(":");return{reason:r,category:s,quantity:i}})}_flushOutcomes(){Qe&&Te.log("Flushing outcomes...");const e=this._clearOutcomes();if(e.length===0){Qe&&Te.log("No outcomes to send");return}if(!this._dsn){Qe&&Te.log("No dsn provided, will not send outcomes");return}Qe&&Te.log("Sending outcomes:",e);const t=eh(e,this._options.tunnel&&As(this._dsn));this.sendEnvelope(t)}}function nh(n,e){const t=`${e} must return \`null\` or a valid event.`;if(Ts(n))return n.then(i=>{if(!Ui(i)&&i!==null)throw new tn(t);return i},i=>{throw new tn(`${e} rejected with ${i}`)});if(!Ui(n)&&n!==null)throw new tn(t);return n}function ih(n,e,t,i){const{beforeSend:r,beforeSendTransaction:s,beforeSendSpan:o}=e;if(su(t)&&r)return r(t,i);if(ou(t)){if(t.spans&&o){const a=[];for(const c of t.spans){const l=o(c);l?a.push(l):(id(),n.recordDroppedEvent("before_send","span"))}t.spans=a}if(s){if(t.spans){const a=t.spans.length;t.sdkProcessingMetadata={...t.sdkProcessingMetadata,spanCountBeforeProcessing:a}}return s(t,i)}}return t}function su(n){return n.type===void 0}function ou(n){return n.type==="transaction"}function rh(n,e){e.debug===!0&&(Qe?Te.enable():ui(()=>{console.warn("[Sentry] Cannot initialize SDK with `debug` option using a non-debug bundle.")})),on().update(e.initialScope);const i=new n(e);return sh(i),i.init(),i}function sh(n){on().setClient(n)}function oh(n){const e=[];function t(){return n===void 0||e.length<n}function i(o){return e.splice(e.indexOf(o),1)[0]||Promise.resolve(void 0)}function r(o){if(!t())return ps(new tn("Not adding Promise because buffer limit was reached."));const a=o();return e.indexOf(a)===-1&&e.push(a),a.then(()=>i(a)).then(null,()=>i(a).then(null,()=>{})),a}function s(o){return new Ht((a,c)=>{let l=e.length;if(!l)return a(!0);const u=setTimeout(()=>{o&&o>0&&a(!1)},o);e.forEach(f=>{si(f).then(()=>{--l||(clearTimeout(u),a(!0))},c)})})}return{$:e,add:r,drain:s}}const ah=60*1e3;function ch(n,e=Date.now()){const t=parseInt(`${n}`,10);if(!isNaN(t))return t*1e3;const i=Date.parse(`${n}`);return isNaN(i)?ah:i-e}function lh(n,e){return n[e]||n.all||0}function uh(n,e,t=Date.now()){return lh(n,e)>t}function fh(n,{statusCode:e,headers:t},i=Date.now()){const r={...n},s=t&&t["x-sentry-rate-limits"],o=t&&t["retry-after"];if(s)for(const a of s.trim().split(",")){const[c,l,,,u]=a.split(":",5),f=parseInt(c,10),h=(isNaN(f)?60:f)*1e3;if(!l)r.all=i+h;else for(const m of l.split(";"))m==="metric_bucket"?(!u||u.split(";").includes("custom"))&&(r[m]=i+h):r[m]=i+h}else o?r.all=i+ch(o,i):e===429&&(r.all=i+60*1e3);return r}const dh=64;function hh(n,e,t=oh(n.bufferSize||dh)){let i={};const r=o=>t.drain(o);function s(o){const a=[];if(pc(o,(f,h)=>{const m=mc(h);if(uh(i,m)){const _=Tc(f,h);n.recordDroppedEvent("ratelimit_backoff",m,_)}else a.push(f)}),a.length===0)return si({});const c=fr(o[0],a),l=f=>{pc(c,(h,m)=>{const _=Tc(h,m);n.recordDroppedEvent(f,mc(m),_)})},u=()=>e({body:Sd(c)}).then(f=>(f.statusCode!==void 0&&(f.statusCode<200||f.statusCode>=300)&&Qe&&Te.warn(`Sentry responded with status code ${f.statusCode} to sent event.`),i=fh(i,f),f),f=>{throw l("network_error"),f});return t.add(u).then(f=>f,f=>{if(f instanceof tn)return Qe&&Te.error("Skipped sending event because buffer is full."),l("queue_overflow"),si({});throw f})}return{send:s,flush:r}}function Tc(n,e){if(!(e!=="event"&&e!=="transaction"))return Array.isArray(n)?n[1]:void 0}function ph(n,e,t=[e],i="npm"){const r=n._metadata||{};r.sdk||(r.sdk={name:`sentry.javascript.${e}`,packages:t.map(s=>({name:`${i}:@sentry/${s}`,version:Qn})),version:Qn}),n._metadata=r}const mh=100;function oi(n,e){const t=vt(),i=ur();if(!t)return;const{beforeBreadcrumb:r=null,maxBreadcrumbs:s=mh}=t.getOptions();if(s<=0)return;const a={timestamp:lr(),...n},c=r?ui(()=>r(a,e)):a;c!==null&&(t.emit&&t.emit("beforeAddBreadcrumb",c,e),i.addBreadcrumb(c,s))}let bc;const _h="FunctionToString",wc=new WeakMap,gh=()=>({name:_h,setupOnce(){bc=Function.prototype.toString;try{Function.prototype.toString=function(...n){const e=ba(this),t=wc.has(vt())&&e!==void 0?e:this;return bc.apply(t,n)}}catch{}},setup(n){wc.set(n,!0)}}),vh=gh,xh=[/^Script error\.?$/,/^Javascript error: Script error\.? on line 0$/,/^ResizeObserver loop completed with undelivered notifications.$/,/^Cannot redefine property: googletag$/,"undefined is not an object (evaluating 'a.L')",`can't redefine non-configurable property "solana"`,"vv().getRestrictions is not a function. (In 'vv().getRestrictions(1,a)', 'vv().getRestrictions' is undefined)","Can't find variable: _AutofillCallbackHandler",/^Non-Error promise rejection captured with value: Object Not Found Matching Id:\d+, MethodName:simulateEvent, ParamCount:\d+$/],Sh="InboundFilters",Eh=(n={})=>({name:Sh,processEvent(e,t,i){const r=i.getOptions(),s=yh(n,r);return Th(e,s)?null:e}}),Mh=Eh;function yh(n={},e={}){return{allowUrls:[...n.allowUrls||[],...e.allowUrls||[]],denyUrls:[...n.denyUrls||[],...e.denyUrls||[]],ignoreErrors:[...n.ignoreErrors||[],...e.ignoreErrors||[],...n.disableErrorDefaults?[]:xh],ignoreTransactions:[...n.ignoreTransactions||[],...e.ignoreTransactions||[]],ignoreInternal:n.ignoreInternal!==void 0?n.ignoreInternal:!0}}function Th(n,e){return e.ignoreInternal&&Ph(n)?(Qe&&Te.warn(`Event dropped due to being internal Sentry Error.
Event: ${Pn(n)}`),!0):bh(n,e.ignoreErrors)?(Qe&&Te.warn(`Event dropped due to being matched by \`ignoreErrors\` option.
Event: ${Pn(n)}`),!0):Ih(n)?(Qe&&Te.warn(`Event dropped due to not having an error message, error type or stacktrace.
Event: ${Pn(n)}`),!0):wh(n,e.ignoreTransactions)?(Qe&&Te.warn(`Event dropped due to being matched by \`ignoreTransactions\` option.
Event: ${Pn(n)}`),!0):Ah(n,e.denyUrls)?(Qe&&Te.warn(`Event dropped due to being matched by \`denyUrls\` option.
Event: ${Pn(n)}.
Url: ${ms(n)}`),!0):Rh(n,e.allowUrls)?!1:(Qe&&Te.warn(`Event dropped due to not being matched by \`allowUrls\` option.
Event: ${Pn(n)}.
Url: ${ms(n)}`),!0)}function bh(n,e){return n.type||!e||!e.length?!1:Ch(n).some(t=>bs(t,e))}function wh(n,e){if(n.type!=="transaction"||!e||!e.length)return!1;const t=n.transaction;return t?bs(t,e):!1}function Ah(n,e){if(!e||!e.length)return!1;const t=ms(n);return t?bs(t,e):!1}function Rh(n,e){if(!e||!e.length)return!0;const t=ms(n);return t?bs(t,e):!0}function Ch(n){const e=[];n.message&&e.push(n.message);let t;try{t=n.exception.values[n.exception.values.length-1]}catch{}return t&&t.value&&(e.push(t.value),t.type&&e.push(`${t.type}: ${t.value}`)),e}function Ph(n){try{return n.exception.values[0].type==="SentryError"}catch{}return!1}function Dh(n=[]){for(let e=n.length-1;e>=0;e--){const t=n[e];if(t&&t.filename!=="<anonymous>"&&t.filename!=="[native code]")return t.filename||null}return null}function ms(n){try{let e;try{e=n.exception.values[0].stacktrace.frames}catch{}return e?Dh(e):null}catch{return Qe&&Te.error(`Cannot extract url for event ${Pn(n)}`),null}}function Ih(n){return n.type||!n.exception||!n.exception.values||n.exception.values.length===0?!1:!n.message&&!n.exception.values.some(e=>e.stacktrace||e.type&&e.type!=="Error"||e.value)}function Lh(n,e,t=250,i,r,s,o){if(!s.exception||!s.exception.values||!o||!ni(o.originalException,Error))return;const a=s.exception.values.length>0?s.exception.values[s.exception.values.length-1]:void 0;a&&(s.exception.values=Uh(yo(n,e,r,o.originalException,i,s.exception.values,a,0),t))}function yo(n,e,t,i,r,s,o,a){if(s.length>=t+1)return s;let c=[...s];if(ni(i[r],Error)){Ac(o,a);const l=n(e,i[r]),u=c.length;Rc(l,r,u,a),c=yo(n,e,t,i[r],r,[l,...c],l,u)}return Array.isArray(i.errors)&&i.errors.forEach((l,u)=>{if(ni(l,Error)){Ac(o,a);const f=n(e,l),h=c.length;Rc(f,`errors[${u}]`,h,a),c=yo(n,e,t,l,r,[f,...c],f,h)}}),c}function Ac(n,e){n.mechanism=n.mechanism||{type:"generic",handled:!0},n.mechanism={...n.mechanism,...n.type==="AggregateError"&&{is_exception_group:!0},exception_id:e}}function Rc(n,e,t,i){n.mechanism=n.mechanism||{type:"generic",handled:!0},n.mechanism={...n.mechanism,type:"chained",source:e,exception_id:t,parent_id:i}}function Uh(n,e){return n.map(t=>(t.value&&(t.value=Pi(t.value,e)),t))}function Os(n){if(!n)return{};const e=n.match(/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);if(!e)return{};const t=e[6]||"",i=e[8]||"";return{host:e[4],path:e[5],protocol:e[2],search:t,hash:i,relative:e[5]+t+i}}function au(n){const e="console";fi(e,n),di(e,Nh)}function Nh(){"console"in Xe&&fs.forEach(function(n){n in Xe.console&&Ut(Xe.console,n,function(e){return ds[n]=e,function(...t){Qt("console",{args:t,level:n});const r=ds[n];r&&r.apply(Xe.console,t)}})})}function cu(n){return n==="warn"?"warning":["fatal","error","warning","log","info","debug"].includes(n)?n:"log"}const Fh="CaptureConsole",Oh=(n={})=>{const e=n.levels||fs,t=!!n.handled;return{name:Fh,setup(i){"console"in Xe&&au(({args:r,level:s})=>{vt()!==i||!e.includes(s)||zh(r,s,t)})}}},Bh=Oh;function zh(n,e,t){const i={level:cu(e),extra:{arguments:n}};$l(r=>{if(r.addEventProcessor(a=>(a.logger="console",ri(a,{handled:t,type:"console"}),a)),e==="assert"){if(!n[0]){const a=`Assertion failed: ${hs(n.slice(1)," ")||"console.assert"}`;r.setExtra("arguments",n.slice(1)),vc(a,i)}return}const s=n.find(a=>a instanceof Error);if(s){eu(s,i);return}const o=hs(n," ");vc(o,i)})}const kh="Dedupe",Hh=()=>{let n;return{name:kh,processEvent(e){if(e.type)return e;try{if(Vh(e,n))return Qe&&Te.warn("Event dropped due to being a duplicate of previously captured event."),null}catch{}return n=e}}},Gh=Hh;function Vh(n,e){return e?!!(Wh(n,e)||Xh(n,e)):!1}function Wh(n,e){const t=n.message,i=e.message;return!(!t&&!i||t&&!i||!t&&i||t!==i||!uu(n,e)||!lu(n,e))}function Xh(n,e){const t=Cc(e),i=Cc(n);return!(!t||!i||t.type!==i.type||t.value!==i.value||!uu(n,e)||!lu(n,e))}function lu(n,e){let t=ec(n),i=ec(e);if(!t&&!i)return!0;if(t&&!i||!t&&i||(t=t,i=i,i.length!==t.length))return!1;for(let r=0;r<i.length;r++){const s=i[r],o=t[r];if(s.filename!==o.filename||s.lineno!==o.lineno||s.colno!==o.colno||s.function!==o.function)return!1}return!0}function uu(n,e){let t=n.fingerprint,i=e.fingerprint;if(!t&&!i)return!0;if(t&&!i||!t&&i)return!1;t=t,i=i;try{return t.join("")===i.join("")}catch{return!1}}function Cc(n){return n.exception&&n.exception.values&&n.exception.values[0]}function fu(n){if(n!==void 0)return n>=400&&n<500?"warning":n>=500?"error":void 0}const To=Xe;function du(){if(!("fetch"in To))return!1;try{return new Headers,new Request("http://www.example.com"),new Response,!0}catch{return!1}}function bo(n){return n&&/^function\s+\w+\(\)\s+\{\s+\[native code\]\s+\}$/.test(n.toString())}function qh(){if(typeof EdgeRuntime=="string")return!0;if(!du())return!1;if(bo(To.fetch))return!0;let n=!1;const e=To.document;if(e&&typeof e.createElement=="function")try{const t=e.createElement("iframe");t.hidden=!0,e.head.appendChild(t),t.contentWindow&&t.contentWindow.fetch&&(n=bo(t.contentWindow.fetch)),e.head.removeChild(t)}catch(t){li&&Te.warn("Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ",t)}return n}function Yh(n,e){const t="fetch";fi(t,n),di(t,()=>$h(void 0,e))}function $h(n,e=!1){e&&!qh()||Ut(Xe,"fetch",function(t){return function(...i){const r=new Error,{method:s,url:o}=jh(i),a={args:i,fetchData:{method:s,url:o},startTimestamp:xn()*1e3,virtualError:r};return Qt("fetch",{...a}),t.apply(Xe,i).then(async c=>(Qt("fetch",{...a,endTimestamp:xn()*1e3,response:c}),c),c=>{throw Qt("fetch",{...a,endTimestamp:xn()*1e3,error:c}),Ea(c)&&c.stack===void 0&&(c.stack=r.stack,ii(c,"framesToPop",1)),c})}})}function wo(n,e){return!!n&&typeof n=="object"&&!!n[e]}function Pc(n){return typeof n=="string"?n:n?wo(n,"url")?n.url:n.toString?n.toString():"":""}function jh(n){if(n.length===0)return{method:"GET",url:""};if(n.length===2){const[t,i]=n;return{url:Pc(t),method:wo(i,"method")?String(i.method).toUpperCase():"GET"}}const e=n[0];return{url:Pc(e),method:wo(e,"method")?String(e.method).toUpperCase():"GET"}}function Kh(){return"npm"}const wr=Xe;function Zh(){const n=wr.chrome,e=n&&n.app&&n.app.runtime,t="history"in wr&&!!wr.history.pushState&&!!wr.history.replaceState;return!e&&t}const et=Xe;let Ao=0;function hu(){return Ao>0}function Jh(){Ao++,setTimeout(()=>{Ao--})}function Oi(n,e={}){function t(r){return typeof r=="function"}if(!t(n))return n;try{const r=n.__sentry_wrapped__;if(r)return typeof r=="function"?r:n;if(ba(n))return n}catch{return n}const i=function(...r){try{const s=r.map(o=>Oi(o,e));return n.apply(this,s)}catch(s){throw Jh(),$l(o=>{o.addEventProcessor(a=>(e.mechanism&&(go(a,void 0),ri(a,e.mechanism)),a.extra={...a.extra,arguments:r},a)),eu(s)}),s}};try{for(const r in n)Object.prototype.hasOwnProperty.call(n,r)&&(i[r]=n[r])}catch{}Wl(i,n),ii(n,"__sentry_wrapped__",i);try{Object.getOwnPropertyDescriptor(i,"name").configurable&&Object.defineProperty(i,"name",{get(){return n.name}})}catch{}return i}const dr=typeof __SENTRY_DEBUG__>"u"||__SENTRY_DEBUG__;function Pa(n,e){const t=Da(n,e),i={type:ip(e),value:rp(e)};return t.length&&(i.stacktrace={frames:t}),i.type===void 0&&i.value===""&&(i.value="Unrecoverable error caught"),i}function Qh(n,e,t,i){const r=vt(),s=r&&r.getOptions().normalizeDepth,o=lp(e),a={__serialized__:Jl(e,s)};if(o)return{exception:{values:[Pa(n,o)]},extra:a};const c={exception:{values:[{type:ys(e)?e.constructor.name:i?"UnhandledRejection":"Error",value:ap(e,{isUnhandledRejection:i})}]},extra:a};if(t){const l=Da(n,t);l.length&&(c.exception.values[0].stacktrace={frames:l})}return c}function Bs(n,e){return{exception:{values:[Pa(n,e)]}}}function Da(n,e){const t=e.stacktrace||e.stack||"",i=tp(e),r=np(e);try{return n(t,i,r)}catch{}return[]}const ep=/Minified React error #\d+;/i;function tp(n){return n&&ep.test(n.message)?1:0}function np(n){return typeof n.framesToPop=="number"?n.framesToPop:0}function pu(n){return typeof WebAssembly<"u"&&typeof WebAssembly.Exception<"u"?n instanceof WebAssembly.Exception:!1}function ip(n){const e=n&&n.name;return!e&&pu(n)?n.message&&Array.isArray(n.message)&&n.message.length==2?n.message[0]:"WebAssembly.Exception":e}function rp(n){const e=n&&n.message;return e?e.error&&typeof e.error.message=="string"?e.error.message:pu(n)&&Array.isArray(n.message)&&n.message.length==2?n.message[1]:e:"No error message"}function sp(n,e,t,i){const r=t&&t.syntheticException||void 0,s=Ia(n,e,r,i);return ri(s),s.level="error",t&&t.event_id&&(s.event_id=t.event_id),si(s)}function op(n,e,t="info",i,r){const s=i&&i.syntheticException||void 0,o=Ro(n,e,s,r);return o.level=t,i&&i.event_id&&(o.event_id=i.event_id),si(o)}function Ia(n,e,t,i,r){let s;if(Hl(e)&&e.error)return Bs(n,e.error);if(nc(e)||hf(e)){const o=e;if("stack"in e)s=Bs(n,e);else{const a=o.name||(nc(o)?"DOMError":"DOMException"),c=o.message?`${a}: ${o.message}`:a;s=Ro(n,c,t,i),go(s,c)}return"code"in o&&(s.tags={...s.tags,"DOMException.code":`${o.code}`}),s}return Ea(e)?Bs(n,e):Ui(e)||ys(e)?(s=Qh(n,e,t,r),ri(s,{synthetic:!0}),s):(s=Ro(n,e,t,i),go(s,`${e}`),ri(s,{synthetic:!0}),s)}function Ro(n,e,t,i){const r={};if(i&&t){const s=Da(n,t);s.length&&(r.exception={values:[{value:e,stacktrace:{frames:s}}]}),ri(r,{synthetic:!0})}if(Ma(e)){const{__sentry_template_string__:s,__sentry_template_values__:o}=e;return r.logentry={message:s,params:o},r}return r.message=e,r}function ap(n,{isUnhandledRejection:e}){const t=Mf(n),i=e?"promise rejection":"exception";return Hl(n)?`Event \`ErrorEvent\` captured as ${i} with message \`${n.message}\``:ys(n)?`Event \`${cp(n)}\` (type=${n.type}) captured as ${i}`:`Object captured as ${i} with keys: ${t}`}function cp(n){try{const e=Object.getPrototypeOf(n);return e?e.constructor.name:void 0}catch{}}function lp(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e)){const t=n[e];if(t instanceof Error)return t}}function up(n,{metadata:e,tunnel:t,dsn:i}){const r={event_id:n.event_id,sent_at:new Date().toISOString(),...e&&e.sdk&&{sdk:{name:e.sdk.name,version:e.sdk.version}},...!!t&&!!i&&{dsn:As(i)}},s=fp(n);return fr(r,[s])}function fp(n){return[{type:"user_report"},n]}class dp extends th{constructor(e){const t={parentSpanIsAlwaysRootSpan:!0,...e},i=et.SENTRY_SDK_SOURCE||Kh();ph(t,"browser",["browser"],i),super(t),t.sendClientReports&&et.document&&et.document.addEventListener("visibilitychange",()=>{et.document.visibilityState==="hidden"&&this._flushOutcomes()})}eventFromException(e,t){return sp(this._options.stackParser,e,t,this._options.attachStacktrace)}eventFromMessage(e,t="info",i){return op(this._options.stackParser,e,t,i,this._options.attachStacktrace)}captureUserFeedback(e){if(!this._isEnabled()){dr&&Te.warn("SDK not enabled, will not capture user feedback.");return}const t=up(e,{metadata:this.getSdkMetadata(),dsn:this.getDsn(),tunnel:this.getOptions().tunnel});this.sendEnvelope(t)}_prepareEvent(e,t,i){return e.platform=e.platform||"javascript",super._prepareEvent(e,t,i)}}const hp=typeof __SENTRY_DEBUG__>"u"||__SENTRY_DEBUG__,bt=Xe,pp=1e3;let Dc,Co,Po;function mp(n){const e="dom";fi(e,n),di(e,_p)}function _p(){if(!bt.document)return;const n=Qt.bind(null,"dom"),e=Ic(n,!0);bt.document.addEventListener("click",e,!1),bt.document.addEventListener("keypress",e,!1),["EventTarget","Node"].forEach(t=>{const r=bt[t],s=r&&r.prototype;!s||!s.hasOwnProperty||!s.hasOwnProperty("addEventListener")||(Ut(s,"addEventListener",function(o){return function(a,c,l){if(a==="click"||a=="keypress")try{const u=this.__sentry_instrumentation_handlers__=this.__sentry_instrumentation_handlers__||{},f=u[a]=u[a]||{refCount:0};if(!f.handler){const h=Ic(n);f.handler=h,o.call(this,a,h,l)}f.refCount++}catch{}return o.call(this,a,c,l)}}),Ut(s,"removeEventListener",function(o){return function(a,c,l){if(a==="click"||a=="keypress")try{const u=this.__sentry_instrumentation_handlers__||{},f=u[a];f&&(f.refCount--,f.refCount<=0&&(o.call(this,a,f.handler,l),f.handler=void 0,delete u[a]),Object.keys(u).length===0&&delete this.__sentry_instrumentation_handlers__)}catch{}return o.call(this,a,c,l)}}))})}function gp(n){if(n.type!==Co)return!1;try{if(!n.target||n.target._sentryId!==Po)return!1}catch{}return!0}function vp(n,e){return n!=="keypress"?!1:!e||!e.tagName?!0:!(e.tagName==="INPUT"||e.tagName==="TEXTAREA"||e.isContentEditable)}function Ic(n,e=!1){return t=>{if(!t||t._sentryCaptured)return;const i=xp(t);if(vp(t.type,i))return;ii(t,"_sentryCaptured",!0),i&&!i._sentryId&&ii(i,"_sentryId",qt());const r=t.type==="keypress"?"input":t.type;gp(t)||(n({event:t,name:r,global:e}),Co=t.type,Po=i?i._sentryId:void 0),clearTimeout(Dc),Dc=bt.setTimeout(()=>{Po=void 0,Co=void 0},pp)}}function xp(n){try{return n.target}catch{return null}}let Ar;function mu(n){const e="history";fi(e,n),di(e,Sp)}function Sp(){if(!Zh())return;const n=bt.onpopstate;bt.onpopstate=function(...t){const i=bt.location.href,r=Ar;if(Ar=i,Qt("history",{from:r,to:i}),n)try{return n.apply(this,t)}catch{}};function e(t){return function(...i){const r=i.length>2?i[2]:void 0;if(r){const s=Ar,o=String(r);Ar=o,Qt("history",{from:s,to:o})}return t.apply(this,i)}}Ut(bt.history,"pushState",e),Ut(bt.history,"replaceState",e)}const ns={};function Ep(n){const e=ns[n];if(e)return e;let t=bt[n];if(bo(t))return ns[n]=t.bind(bt);const i=bt.document;if(i&&typeof i.createElement=="function")try{const r=i.createElement("iframe");r.hidden=!0,i.head.appendChild(r);const s=r.contentWindow;s&&s[n]&&(t=s[n]),i.head.removeChild(r)}catch(r){hp&&Te.warn(`Could not create sandbox iframe for ${n} check, bailing to window.${n}: `,r)}return t&&(ns[n]=t.bind(bt))}function Lc(n){ns[n]=void 0}const ir="__sentry_xhr_v3__";function Mp(n){const e="xhr";fi(e,n),di(e,yp)}function yp(){if(!bt.XMLHttpRequest)return;const n=XMLHttpRequest.prototype;n.open=new Proxy(n.open,{apply(e,t,i){const r=new Error,s=xn()*1e3,o=vn(i[0])?i[0].toUpperCase():void 0,a=Tp(i[1]);if(!o||!a)return e.apply(t,i);t[ir]={method:o,url:a,request_headers:{}},o==="POST"&&a.match(/sentry_key/)&&(t.__sentry_own_request__=!0);const c=()=>{const l=t[ir];if(l&&t.readyState===4){try{l.status_code=t.status}catch{}const u={endTimestamp:xn()*1e3,startTimestamp:s,xhr:t,virtualError:r};Qt("xhr",u)}};return"onreadystatechange"in t&&typeof t.onreadystatechange=="function"?t.onreadystatechange=new Proxy(t.onreadystatechange,{apply(l,u,f){return c(),l.apply(u,f)}}):t.addEventListener("readystatechange",c),t.setRequestHeader=new Proxy(t.setRequestHeader,{apply(l,u,f){const[h,m]=f,_=u[ir];return _&&vn(h)&&vn(m)&&(_.request_headers[h.toLowerCase()]=m),l.apply(u,f)}}),e.apply(t,i)}}),n.send=new Proxy(n.send,{apply(e,t,i){const r=t[ir];if(!r)return e.apply(t,i);i[0]!==void 0&&(r.body=i[0]);const s={startTimestamp:xn()*1e3,xhr:t};return Qt("xhr",s),e.apply(t,i)}})}function Tp(n){if(vn(n))return n;try{return n.toString()}catch{}}function bp(n,e=Ep("fetch")){let t=0,i=0;function r(s){const o=s.body.length;t+=o,i++;const a={body:s.body,method:"POST",referrerPolicy:"origin",headers:n.headers,keepalive:t<=6e4&&i<15,...n.fetchOptions};if(!e)return Lc("fetch"),ps("No fetch implementation available");try{return e(n.url,a).then(c=>(t-=o,i--,{statusCode:c.status,headers:{"x-sentry-rate-limits":c.headers.get("X-Sentry-Rate-Limits"),"retry-after":c.headers.get("Retry-After")}}))}catch(c){return Lc("fetch"),t-=o,i--,ps(c)}}return hh(n,r)}const wp=30,Ap=50;function Do(n,e,t,i){const r={filename:n,function:e==="<anonymous>"?ti:e,in_app:!0};return t!==void 0&&(r.lineno=t),i!==void 0&&(r.colno=i),r}const Rp=/^\s*at (\S+?)(?::(\d+))(?::(\d+))\s*$/i,Cp=/^\s*at (?:(.+?\)(?: \[.+\])?|.*?) ?\((?:address at )?)?(?:async )?((?:<anonymous>|[-a-z]+:|.*bundle|\/)?.*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i,Pp=/\((\S*)(?::(\d+))(?::(\d+))\)/,Dp=n=>{const e=Rp.exec(n);if(e){const[,i,r,s]=e;return Do(i,ti,+r,+s)}const t=Cp.exec(n);if(t){if(t[2]&&t[2].indexOf("eval")===0){const o=Pp.exec(t[2]);o&&(t[2]=o[1],t[3]=o[2],t[4]=o[3])}const[r,s]=_u(t[1]||ti,t[2]);return Do(s,r,t[3]?+t[3]:void 0,t[4]?+t[4]:void 0)}},Ip=[wp,Dp],Lp=/^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:[-a-z]+)?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js)|\/[\w\-. /=]+)(?::(\d+))?(?::(\d+))?\s*$/i,Up=/(\S+) line (\d+)(?: > eval line \d+)* > eval/i,Np=n=>{const e=Lp.exec(n);if(e){if(e[3]&&e[3].indexOf(" > eval")>-1){const s=Up.exec(e[3]);s&&(e[1]=e[1]||"eval",e[3]=s[1],e[4]=s[2],e[5]="")}let i=e[3],r=e[1]||ti;return[r,i]=_u(r,i),Do(i,r,e[4]?+e[4]:void 0,e[5]?+e[5]:void 0)}},Fp=[Ap,Np],Op=[Ip,Fp],Bp=zl(...Op),_u=(n,e)=>{const t=n.indexOf("safari-extension")!==-1,i=n.indexOf("safari-web-extension")!==-1;return t||i?[n.indexOf("@")!==-1?n.split("@")[0]:ti,t?`safari-extension:${e}`:`safari-web-extension:${e}`]:[n,e]},Rr=1024,zp="Breadcrumbs",kp=(n={})=>{const e={console:!0,dom:!0,fetch:!0,history:!0,sentry:!0,xhr:!0,...n};return{name:zp,setup(t){e.console&&au(Wp(t)),e.dom&&mp(Vp(t,e.dom)),e.xhr&&Mp(Xp(t)),e.fetch&&Yh(qp(t)),e.history&&mu(Yp(t)),e.sentry&&t.on("beforeSendEvent",Gp(t))}}},Hp=kp;function Gp(n){return function(t){vt()===n&&oi({category:`sentry.${t.type==="transaction"?"transaction":"event"}`,event_id:t.event_id,level:t.level,message:Pn(t)},{event:t})}}function Vp(n,e){return function(i){if(vt()!==n)return;let r,s,o=typeof e=="object"?e.serializeAttribute:void 0,a=typeof e=="object"&&typeof e.maxStringLength=="number"?e.maxStringLength:void 0;a&&a>Rr&&(dr&&Te.warn(`\`dom.maxStringLength\` cannot exceed ${Rr}, but a value of ${a} was configured. Sentry will use ${Rr} instead.`),a=Rr),typeof o=="string"&&(o=[o]);try{const l=i.event,u=$p(l)?l.target:l;r=Vl(u,{keyAttrs:o,maxStringLength:a}),s=Sf(u)}catch{r="<unknown>"}if(r.length===0)return;const c={category:`ui.${i.name}`,message:r};s&&(c.data={"ui.component_name":s}),oi(c,{event:i.event,name:i.name,global:i.global})}}function Wp(n){return function(t){if(vt()!==n)return;const i={category:"console",data:{arguments:t.args,logger:"console"},level:cu(t.level),message:hs(t.args," ")};if(t.level==="assert")if(t.args[0]===!1)i.message=`Assertion failed: ${hs(t.args.slice(1)," ")||"console.assert"}`,i.data.arguments=t.args.slice(1);else return;oi(i,{input:t.args,level:t.level})}}function Xp(n){return function(t){if(vt()!==n)return;const{startTimestamp:i,endTimestamp:r}=t,s=t.xhr[ir];if(!i||!r||!s)return;const{method:o,url:a,status_code:c,body:l}=s,u={method:o,url:a,status_code:c},f={xhr:t.xhr,input:l,startTimestamp:i,endTimestamp:r},h=fu(c);oi({category:"xhr",data:u,type:"http",level:h},f)}}function qp(n){return function(t){if(vt()!==n)return;const{startTimestamp:i,endTimestamp:r}=t;if(r&&!(t.fetchData.url.match(/sentry_key/)&&t.fetchData.method==="POST"))if(t.error){const s=t.fetchData,o={data:t.error,input:t.args,startTimestamp:i,endTimestamp:r};oi({category:"fetch",data:s,level:"error",type:"http"},o)}else{const s=t.response,o={...t.fetchData,status_code:s&&s.status},a={input:t.args,response:s,startTimestamp:i,endTimestamp:r},c=fu(o.status_code);oi({category:"fetch",data:o,type:"http",level:c},a)}}}function Yp(n){return function(t){if(vt()!==n)return;let i=t.from,r=t.to;const s=Os(et.location.href);let o=i?Os(i):void 0;const a=Os(r);(!o||!o.path)&&(o=s),s.protocol===a.protocol&&s.host===a.host&&(r=a.relative),s.protocol===o.protocol&&s.host===o.host&&(i=o.relative),oi({category:"navigation",data:{from:i,to:r}})}}function $p(n){return!!n&&!!n.target}const jp=["EventTarget","Window","Node","ApplicationCache","AudioTrackList","BroadcastChannel","ChannelMergerNode","CryptoOperation","EventSource","FileReader","HTMLUnknownElement","IDBDatabase","IDBRequest","IDBTransaction","KeyOperation","MediaController","MessagePort","ModalWindow","Notification","SVGElementInstance","Screen","SharedWorker","TextTrack","TextTrackCue","TextTrackList","WebSocket","WebSocketWorker","Worker","XMLHttpRequest","XMLHttpRequestEventTarget","XMLHttpRequestUpload"],Kp="BrowserApiErrors",Zp=(n={})=>{const e={XMLHttpRequest:!0,eventTarget:!0,requestAnimationFrame:!0,setInterval:!0,setTimeout:!0,...n};return{name:Kp,setupOnce(){e.setTimeout&&Ut(et,"setTimeout",Uc),e.setInterval&&Ut(et,"setInterval",Uc),e.requestAnimationFrame&&Ut(et,"requestAnimationFrame",Qp),e.XMLHttpRequest&&"XMLHttpRequest"in et&&Ut(XMLHttpRequest.prototype,"send",em);const t=e.eventTarget;t&&(Array.isArray(t)?t:jp).forEach(tm)}}},Jp=Zp;function Uc(n){return function(...e){const t=e[0];return e[0]=Oi(t,{mechanism:{data:{function:Un(n)},handled:!1,type:"instrument"}}),n.apply(this,e)}}function Qp(n){return function(e){return n.apply(this,[Oi(e,{mechanism:{data:{function:"requestAnimationFrame",handler:Un(n)},handled:!1,type:"instrument"}})])}}function em(n){return function(...e){const t=this;return["onload","onerror","onprogress","onreadystatechange"].forEach(r=>{r in t&&typeof t[r]=="function"&&Ut(t,r,function(s){const o={mechanism:{data:{function:r,handler:Un(s)},handled:!1,type:"instrument"}},a=ba(s);return a&&(o.mechanism.data.handler=Un(a)),Oi(s,o)})}),n.apply(this,e)}}function tm(n){const t=et[n],i=t&&t.prototype;!i||!i.hasOwnProperty||!i.hasOwnProperty("addEventListener")||(Ut(i,"addEventListener",function(r){return function(s,o,a){try{nm(o)&&(o.handleEvent=Oi(o.handleEvent,{mechanism:{data:{function:"handleEvent",handler:Un(o),target:n},handled:!1,type:"instrument"}}))}catch{}return r.apply(this,[s,Oi(o,{mechanism:{data:{function:"addEventListener",handler:Un(o),target:n},handled:!1,type:"instrument"}}),a])}}),Ut(i,"removeEventListener",function(r){return function(s,o,a){try{const c=o.__sentry_wrapped__;c&&r.call(this,s,c,a)}catch{}return r.call(this,s,o,a)}}))}function nm(n){return typeof n.handleEvent=="function"}const im=()=>({name:"BrowserSession",setupOnce(){if(typeof et.document>"u"){dr&&Te.warn("Using the `browserSessionIntegration` in non-browser environments is not supported.");return}xc({ignoreDuration:!0}),Sc(),mu(({from:n,to:e})=>{n!==void 0&&n!==e&&(xc({ignoreDuration:!0}),Sc())})}}),rm="GlobalHandlers",sm=(n={})=>{const e={onerror:!0,onunhandledrejection:!0,...n};return{name:rm,setupOnce(){Error.stackTraceLimit=50},setup(t){e.onerror&&(am(t),Nc("onerror")),e.onunhandledrejection&&(cm(t),Nc("onunhandledrejection"))}}},om=sm;function am(n){lf(e=>{const{stackParser:t,attachStacktrace:i}=gu();if(vt()!==n||hu())return;const{msg:r,url:s,line:o,column:a,error:c}=e,l=fm(Ia(t,c||r,void 0,i,!1),s,o,a);l.level="error",tu(l,{originalException:c,mechanism:{handled:!1,type:"onerror"}})})}function cm(n){ff(e=>{const{stackParser:t,attachStacktrace:i}=gu();if(vt()!==n||hu())return;const r=lm(e),s=ya(r)?um(r):Ia(t,r,void 0,i,!0);s.level="error",tu(s,{originalException:r,mechanism:{handled:!1,type:"onunhandledrejection"}})})}function lm(n){if(ya(n))return n;try{if("reason"in n)return n.reason;if("detail"in n&&"reason"in n.detail)return n.detail.reason}catch{}return n}function um(n){return{exception:{values:[{type:"UnhandledRejection",value:`Non-Error promise rejection captured with value: ${String(n)}`}]}}}function fm(n,e,t,i){const r=n.exception=n.exception||{},s=r.values=r.values||[],o=s[0]=s[0]||{},a=o.stacktrace=o.stacktrace||{},c=a.frames=a.frames||[],l=i,u=t,f=vn(e)&&e.length>0?e:xf();return c.length===0&&c.push({colno:l,filename:f,function:ti,in_app:!0,lineno:u}),n}function Nc(n){dr&&Te.log(`Global Handler attached: ${n}`)}function gu(){const n=vt();return n&&n.getOptions()||{stackParser:()=>[],attachStacktrace:!1}}const dm=()=>({name:"HttpContext",preprocessEvent(n){if(!et.navigator&&!et.location&&!et.document)return;const e=n.request&&n.request.url||et.location&&et.location.href,{referrer:t}=et.document||{},{userAgent:i}=et.navigator||{},r={...n.request&&n.request.headers,...t&&{Referer:t},...i&&{"User-Agent":i}},s={...n.request,...e&&{url:e},headers:r};n.request=s}}),hm="cause",pm=5,mm="LinkedErrors",_m=(n={})=>{const e=n.limit||pm,t=n.key||hm;return{name:mm,preprocessEvent(i,r,s){const o=s.getOptions();Lh(Pa,o.stackParser,o.maxValueLength,t,e,i,r)}}},gm=_m;function vm(n){const e=[Mh(),vh(),Jp(),Hp(),om(),gm(),Gh(),dm()];return n.autoSessionTracking!==!1&&e.push(im()),e}function xm(n={}){const e={defaultIntegrations:vm(n),release:typeof __SENTRY_RELEASE__=="string"?__SENTRY_RELEASE__:et.SENTRY_RELEASE&&et.SENTRY_RELEASE.id?et.SENTRY_RELEASE.id:void 0,autoSessionTracking:!0,sendClientReports:!0};return n.defaultIntegrations==null&&delete n.defaultIntegrations,{...e,...n}}function Sm(){const n=typeof et.window<"u"&&et;if(!n)return!1;const e=n.chrome?"chrome":"browser",t=n[e],i=t&&t.runtime&&t.runtime.id,r=et.location&&et.location.href||"",s=["chrome-extension:","moz-extension:","ms-browser-extension:","safari-web-extension:"],o=!!i&&et===et.top&&s.some(c=>r.startsWith(`${c}//`)),a=typeof n.nw<"u";return!!i&&!o&&!a}function Em(n={}){const e=xm(n);if(!e.skipBrowserExtensionCheck&&Sm()){ui(()=>{console.error("[Sentry] You cannot run Sentry this way in a browser extension, check: https://docs.sentry.io/platforms/javascript/best-practices/browser-extensions/")});return}dr&&(du()||Te.warn("No Fetch API detected. The Sentry SDK requires a Fetch API compatible environment to send events. Please add a Fetch API polyfill."));const t={...e,stackParser:af(e.stackParser||Bp),integrations:Jd(e),transport:e.transport||bp};return rh(dp,t)}Em({dsn:"https://fd67b78fc5bc4a05bdd2297d68a44d08@o292714.ingest.us.sentry.io/1536614",release:"prototypicalpro@2.0.1",integrations:[Bh({levels:["log","info","warn","error","assert"]})]});/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const La="171",Mm=0,Fc=1,ym=2,vu=1,Tm=2,hn=3,Fn=0,Rt=1,_n=2,In=0,Di=1,Oc=2,Bc=3,zc=4,bm=5,jn=100,wm=101,Am=102,Rm=103,Cm=104,Pm=200,Dm=201,Im=202,Lm=203,Io=204,Lo=205,Um=206,Nm=207,Fm=208,Om=209,Bm=210,zm=211,km=212,Hm=213,Gm=214,Uo=0,No=1,Fo=2,Bi=3,Oo=4,Bo=5,zo=6,ko=7,xu=0,Vm=1,Wm=2,Ln=0,Xm=1,qm=2,Ym=3,$m=4,jm=5,Km=6,Zm=7,Su=300,zi=301,ki=302,Ho=303,Go=304,Rs=306,ai=1e3,Zn=1001,Vo=1002,Ct=1003,Jm=1004,Qm=1004,Cr=1005,Wt=1006,zs=1007,Jn=1008,e_=1008,En=1009,Eu=1010,Mu=1011,cr=1012,Ua=1013,ci=1014,nn=1015,hr=1016,Na=1017,Fa=1018,Hi=1020,yu=35902,Tu=1021,bu=1022,Xt=1023,wu=1024,Au=1025,Ii=1026,Gi=1027,Ru=1028,Oa=1029,Cu=1030,Ba=1031,za=1033,is=33776,rs=33777,ss=33778,os=33779,Wo=35840,Xo=35841,qo=35842,Yo=35843,$o=36196,jo=37492,Ko=37496,Zo=37808,Jo=37809,Qo=37810,ea=37811,ta=37812,na=37813,ia=37814,ra=37815,sa=37816,oa=37817,aa=37818,ca=37819,la=37820,ua=37821,as=36492,fa=36494,da=36495,Pu=36283,ha=36284,pa=36285,ma=36286,t_=3200,n_=3201,i_=0,r_=1,Dn="",kt="srgb",Vi="srgb-linear",_s="linear",Ze="srgb",pi=7680,kc=519,s_=512,o_=513,a_=514,Du=515,c_=516,l_=517,u_=518,f_=519,Hc=35044,Gc=35040,gs="300 es",gn=2e3,vs=2001;class Yi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}}const St=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],ks=Math.PI/180,_a=180/Math.PI;function pr(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(St[n&255]+St[n>>8&255]+St[n>>16&255]+St[n>>24&255]+"-"+St[e&255]+St[e>>8&255]+"-"+St[e>>16&15|64]+St[e>>24&255]+"-"+St[t&63|128]+St[t>>8&255]+"-"+St[t>>16&255]+St[t>>24&255]+St[i&255]+St[i>>8&255]+St[i>>16&255]+St[i>>24&255]).toLowerCase()}function Ne(n,e,t){return Math.max(e,Math.min(t,n))}function d_(n,e){return(n%e+e)%e}function Hs(n,e,t){return(1-t)*n+t*e}function Ki(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function At(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}class tt{constructor(e=0,t=0){tt.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ne(this.x,e.x,t.x),this.y=Ne(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ne(this.x,e,t),this.y=Ne(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ne(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ne(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*i-o*r+e.x,this.y=s*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Re{constructor(e,t,i,r,s,o,a,c,l){Re.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,c,l)}set(e,t,i,r,s,o,a,c,l){const u=this.elements;return u[0]=e,u[1]=r,u[2]=a,u[3]=t,u[4]=s,u[5]=c,u[6]=i,u[7]=o,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[3],c=i[6],l=i[1],u=i[4],f=i[7],h=i[2],m=i[5],_=i[8],S=r[0],p=r[3],d=r[6],b=r[1],T=r[4],y=r[7],L=r[2],A=r[5],P=r[8];return s[0]=o*S+a*b+c*L,s[3]=o*p+a*T+c*A,s[6]=o*d+a*y+c*P,s[1]=l*S+u*b+f*L,s[4]=l*p+u*T+f*A,s[7]=l*d+u*y+f*P,s[2]=h*S+m*b+_*L,s[5]=h*p+m*T+_*A,s[8]=h*d+m*y+_*P,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8];return t*o*u-t*a*l-i*s*u+i*a*c+r*s*l-r*o*c}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8],f=u*o-a*l,h=a*c-u*s,m=l*s-o*c,_=t*f+i*h+r*m;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const S=1/_;return e[0]=f*S,e[1]=(r*l-u*i)*S,e[2]=(a*i-r*o)*S,e[3]=h*S,e[4]=(u*t-r*c)*S,e[5]=(r*s-a*t)*S,e[6]=m*S,e[7]=(i*c-l*t)*S,e[8]=(o*t-i*s)*S,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,o,a){const c=Math.cos(s),l=Math.sin(s);return this.set(i*c,i*l,-i*(c*o+l*a)+o+e,-r*l,r*c,-r*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Gs.makeScale(e,t)),this}rotate(e){return this.premultiply(Gs.makeRotation(-e)),this}translate(e,t){return this.premultiply(Gs.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Gs=new Re;function Iu(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function xs(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function h_(){const n=xs("canvas");return n.style.display="block",n}const Vc={};function Ri(n){n in Vc||(Vc[n]=!0,console.warn(n))}function p_(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}function m_(n){const e=n.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function __(n){const e=n.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const Wc=new Re().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Xc=new Re().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function g_(){const n={enabled:!0,workingColorSpace:Vi,spaces:{},convert:function(r,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===Ze&&(r.r=Sn(r.r),r.g=Sn(r.g),r.b=Sn(r.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===Ze&&(r.r=Li(r.r),r.g=Li(r.g),r.b=Li(r.b))),r},fromWorkingColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},toWorkingColorSpace:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Dn?_s:this.spaces[r].transfer},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,o){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Vi]:{primaries:e,whitePoint:i,transfer:_s,toXYZ:Wc,fromXYZ:Xc,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:kt},outputColorSpaceConfig:{drawingBufferColorSpace:kt}},[kt]:{primaries:e,whitePoint:i,transfer:Ze,toXYZ:Wc,fromXYZ:Xc,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:kt}}}),n}const We=g_();function Sn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Li(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let mi;class v_{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{mi===void 0&&(mi=xs("canvas")),mi.width=e.width,mi.height=e.height;const i=mi.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=mi}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=xs("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=Sn(s[o]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Sn(t[i]/255)*255):t[i]=Sn(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let x_=0;class Lu{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:x_++}),this.uuid=pr(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(Vs(r[o].image)):s.push(Vs(r[o]))}else s=Vs(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function Vs(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?v_.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let S_=0;class gt extends Yi{constructor(e=gt.DEFAULT_IMAGE,t=gt.DEFAULT_MAPPING,i=Zn,r=Zn,s=Wt,o=Jn,a=Xt,c=En,l=gt.DEFAULT_ANISOTROPY,u=Dn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:S_++}),this.uuid=pr(),this.name="",this.source=new Lu(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new tt(0,0),this.repeat=new tt(1,1),this.center=new tt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Re,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Su)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ai:e.x=e.x-Math.floor(e.x);break;case Zn:e.x=e.x<0?0:1;break;case Vo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ai:e.y=e.y-Math.floor(e.y);break;case Zn:e.y=e.y<0?0:1;break;case Vo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}gt.DEFAULT_IMAGE=null;gt.DEFAULT_MAPPING=Su;gt.DEFAULT_ANISOTROPY=1;class lt{constructor(e=0,t=0,i=0,r=1){lt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*t+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*t+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*t+o[7]*i+o[11]*r+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const c=e.elements,l=c[0],u=c[4],f=c[8],h=c[1],m=c[5],_=c[9],S=c[2],p=c[6],d=c[10];if(Math.abs(u-h)<.01&&Math.abs(f-S)<.01&&Math.abs(_-p)<.01){if(Math.abs(u+h)<.1&&Math.abs(f+S)<.1&&Math.abs(_+p)<.1&&Math.abs(l+m+d-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const T=(l+1)/2,y=(m+1)/2,L=(d+1)/2,A=(u+h)/4,P=(f+S)/4,U=(_+p)/4;return T>y&&T>L?T<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(T),r=A/i,s=P/i):y>L?y<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(y),i=A/r,s=U/r):L<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(L),i=P/s,r=U/s),this.set(i,r,s,t),this}let b=Math.sqrt((p-_)*(p-_)+(f-S)*(f-S)+(h-u)*(h-u));return Math.abs(b)<.001&&(b=1),this.x=(p-_)/b,this.y=(f-S)/b,this.z=(h-u)/b,this.w=Math.acos((l+m+d-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ne(this.x,e.x,t.x),this.y=Ne(this.y,e.y,t.y),this.z=Ne(this.z,e.z,t.z),this.w=Ne(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ne(this.x,e,t),this.y=Ne(this.y,e,t),this.z=Ne(this.z,e,t),this.w=Ne(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ne(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class E_ extends Yi{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new lt(0,0,e,t),this.scissorTest=!1,this.viewport=new lt(0,0,e,t);const r={width:e,height:t,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Wt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const s=new gt(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);s.flipY=!1,s.generateMipmaps=i.generateMipmaps,s.internalFormat=i.internalFormat,this.textures=[];const o=i.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,r=e.textures.length;i<r;i++)this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Lu(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class On extends E_{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Uu extends gt{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Ct,this.minFilter=Ct,this.wrapR=Zn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class M_ extends gt{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Ct,this.minFilter=Ct,this.wrapR=Zn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class mr{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,o,a){let c=i[r+0],l=i[r+1],u=i[r+2],f=i[r+3];const h=s[o+0],m=s[o+1],_=s[o+2],S=s[o+3];if(a===0){e[t+0]=c,e[t+1]=l,e[t+2]=u,e[t+3]=f;return}if(a===1){e[t+0]=h,e[t+1]=m,e[t+2]=_,e[t+3]=S;return}if(f!==S||c!==h||l!==m||u!==_){let p=1-a;const d=c*h+l*m+u*_+f*S,b=d>=0?1:-1,T=1-d*d;if(T>Number.EPSILON){const L=Math.sqrt(T),A=Math.atan2(L,d*b);p=Math.sin(p*A)/L,a=Math.sin(a*A)/L}const y=a*b;if(c=c*p+h*y,l=l*p+m*y,u=u*p+_*y,f=f*p+S*y,p===1-a){const L=1/Math.sqrt(c*c+l*l+u*u+f*f);c*=L,l*=L,u*=L,f*=L}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=f}static multiplyQuaternionsFlat(e,t,i,r,s,o){const a=i[r],c=i[r+1],l=i[r+2],u=i[r+3],f=s[o],h=s[o+1],m=s[o+2],_=s[o+3];return e[t]=a*_+u*f+c*m-l*h,e[t+1]=c*_+u*h+l*f-a*m,e[t+2]=l*_+u*m+a*h-c*f,e[t+3]=u*_-a*f-c*h-l*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(i/2),u=a(r/2),f=a(s/2),h=c(i/2),m=c(r/2),_=c(s/2);switch(o){case"XYZ":this._x=h*u*f+l*m*_,this._y=l*m*f-h*u*_,this._z=l*u*_+h*m*f,this._w=l*u*f-h*m*_;break;case"YXZ":this._x=h*u*f+l*m*_,this._y=l*m*f-h*u*_,this._z=l*u*_-h*m*f,this._w=l*u*f+h*m*_;break;case"ZXY":this._x=h*u*f-l*m*_,this._y=l*m*f+h*u*_,this._z=l*u*_+h*m*f,this._w=l*u*f-h*m*_;break;case"ZYX":this._x=h*u*f-l*m*_,this._y=l*m*f+h*u*_,this._z=l*u*_-h*m*f,this._w=l*u*f+h*m*_;break;case"YZX":this._x=h*u*f+l*m*_,this._y=l*m*f+h*u*_,this._z=l*u*_-h*m*f,this._w=l*u*f-h*m*_;break;case"XZY":this._x=h*u*f-l*m*_,this._y=l*m*f-h*u*_,this._z=l*u*_+h*m*f,this._w=l*u*f+h*m*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],o=t[1],a=t[5],c=t[9],l=t[2],u=t[6],f=t[10],h=i+a+f;if(h>0){const m=.5/Math.sqrt(h+1);this._w=.25/m,this._x=(u-c)*m,this._y=(s-l)*m,this._z=(o-r)*m}else if(i>a&&i>f){const m=2*Math.sqrt(1+i-a-f);this._w=(u-c)/m,this._x=.25*m,this._y=(r+o)/m,this._z=(s+l)/m}else if(a>f){const m=2*Math.sqrt(1+a-i-f);this._w=(s-l)/m,this._x=(r+o)/m,this._y=.25*m,this._z=(c+u)/m}else{const m=2*Math.sqrt(1+f-i-a);this._w=(o-r)/m,this._x=(s+l)/m,this._y=(c+u)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ne(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,o=e._w,a=t._x,c=t._y,l=t._z,u=t._w;return this._x=i*u+o*a+r*l-s*c,this._y=r*u+o*c+s*a-i*l,this._z=s*u+o*l+i*c-r*a,this._w=o*u-i*a-r*c-s*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,r=this._y,s=this._z,o=this._w;let a=o*e._w+i*e._x+r*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=i,this._y=r,this._z=s,this;const c=1-a*a;if(c<=Number.EPSILON){const m=1-t;return this._w=m*o+t*this._w,this._x=m*i+t*this._x,this._y=m*r+t*this._y,this._z=m*s+t*this._z,this.normalize(),this}const l=Math.sqrt(c),u=Math.atan2(l,a),f=Math.sin((1-t)*u)/l,h=Math.sin(t*u)/l;return this._w=o*f+this._w*h,this._x=i*f+this._x*h,this._y=r*f+this._y*h,this._z=s*f+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class O{constructor(e=0,t=0,i=0){O.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(qc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(qc.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,o=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*r-a*i),u=2*(a*t-s*r),f=2*(s*i-o*t);return this.x=t+c*l+o*f-a*u,this.y=i+c*u+a*l-s*f,this.z=r+c*f+s*u-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ne(this.x,e.x,t.x),this.y=Ne(this.y,e.y,t.y),this.z=Ne(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ne(this.x,e,t),this.y=Ne(this.y,e,t),this.z=Ne(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ne(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,o=t.x,a=t.y,c=t.z;return this.x=r*c-s*a,this.y=s*o-i*c,this.z=i*a-r*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Ws.copy(this).projectOnVector(e),this.sub(Ws)}reflect(e){return this.sub(Ws.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ne(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ws=new O,qc=new mr;class _r{constructor(e=new O(1/0,1/0,1/0),t=new O(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(jt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(jt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=jt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,jt):jt.fromBufferAttribute(s,o),jt.applyMatrix4(e.matrixWorld),this.expandByPoint(jt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Pr.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Pr.copy(i.boundingBox)),Pr.applyMatrix4(e.matrixWorld),this.union(Pr)}const r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,jt),jt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Zi),Dr.subVectors(this.max,Zi),_i.subVectors(e.a,Zi),gi.subVectors(e.b,Zi),vi.subVectors(e.c,Zi),Tn.subVectors(gi,_i),bn.subVectors(vi,gi),kn.subVectors(_i,vi);let t=[0,-Tn.z,Tn.y,0,-bn.z,bn.y,0,-kn.z,kn.y,Tn.z,0,-Tn.x,bn.z,0,-bn.x,kn.z,0,-kn.x,-Tn.y,Tn.x,0,-bn.y,bn.x,0,-kn.y,kn.x,0];return!Xs(t,_i,gi,vi,Dr)||(t=[1,0,0,0,1,0,0,0,1],!Xs(t,_i,gi,vi,Dr))?!1:(Ir.crossVectors(Tn,bn),t=[Ir.x,Ir.y,Ir.z],Xs(t,_i,gi,vi,Dr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,jt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(jt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(cn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),cn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),cn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),cn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),cn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),cn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),cn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),cn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(cn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const cn=[new O,new O,new O,new O,new O,new O,new O,new O],jt=new O,Pr=new _r,_i=new O,gi=new O,vi=new O,Tn=new O,bn=new O,kn=new O,Zi=new O,Dr=new O,Ir=new O,Hn=new O;function Xs(n,e,t,i,r){for(let s=0,o=n.length-3;s<=o;s+=3){Hn.fromArray(n,s);const a=r.x*Math.abs(Hn.x)+r.y*Math.abs(Hn.y)+r.z*Math.abs(Hn.z),c=e.dot(Hn),l=t.dot(Hn),u=i.dot(Hn);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>a)return!1}return!0}const y_=new _r,Ji=new O,qs=new O;class Cs{constructor(e=new O,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):y_.setFromPoints(e).getCenter(i);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ji.subVectors(e,this.center);const t=Ji.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(Ji,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(qs.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ji.copy(e.center).add(qs)),this.expandByPoint(Ji.copy(e.center).sub(qs))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const ln=new O,Ys=new O,Lr=new O,wn=new O,$s=new O,Ur=new O,js=new O;class Nu{constructor(e=new O,t=new O(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ln)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=ln.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ln.copy(this.origin).addScaledVector(this.direction,t),ln.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){Ys.copy(e).add(t).multiplyScalar(.5),Lr.copy(t).sub(e).normalize(),wn.copy(this.origin).sub(Ys);const s=e.distanceTo(t)*.5,o=-this.direction.dot(Lr),a=wn.dot(this.direction),c=-wn.dot(Lr),l=wn.lengthSq(),u=Math.abs(1-o*o);let f,h,m,_;if(u>0)if(f=o*c-a,h=o*a-c,_=s*u,f>=0)if(h>=-_)if(h<=_){const S=1/u;f*=S,h*=S,m=f*(f+o*h+2*a)+h*(o*f+h+2*c)+l}else h=s,f=Math.max(0,-(o*h+a)),m=-f*f+h*(h+2*c)+l;else h=-s,f=Math.max(0,-(o*h+a)),m=-f*f+h*(h+2*c)+l;else h<=-_?(f=Math.max(0,-(-o*s+a)),h=f>0?-s:Math.min(Math.max(-s,-c),s),m=-f*f+h*(h+2*c)+l):h<=_?(f=0,h=Math.min(Math.max(-s,-c),s),m=h*(h+2*c)+l):(f=Math.max(0,-(o*s+a)),h=f>0?s:Math.min(Math.max(-s,-c),s),m=-f*f+h*(h+2*c)+l);else h=o>0?-s:s,f=Math.max(0,-(o*h+a)),m=-f*f+h*(h+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(Ys).addScaledVector(Lr,h),m}intersectSphere(e,t){ln.subVectors(e.center,this.origin);const i=ln.dot(this.direction),r=ln.dot(ln)-i*i,s=e.radius*e.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=i-o,c=i+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,o,a,c;const l=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,h=this.origin;return l>=0?(i=(e.min.x-h.x)*l,r=(e.max.x-h.x)*l):(i=(e.max.x-h.x)*l,r=(e.min.x-h.x)*l),u>=0?(s=(e.min.y-h.y)*u,o=(e.max.y-h.y)*u):(s=(e.max.y-h.y)*u,o=(e.min.y-h.y)*u),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),f>=0?(a=(e.min.z-h.z)*f,c=(e.max.z-h.z)*f):(a=(e.max.z-h.z)*f,c=(e.min.z-h.z)*f),i>c||a>r)||((a>i||i!==i)&&(i=a),(c<r||r!==r)&&(r=c),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,ln)!==null}intersectTriangle(e,t,i,r,s){$s.subVectors(t,e),Ur.subVectors(i,e),js.crossVectors($s,Ur);let o=this.direction.dot(js),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;wn.subVectors(this.origin,e);const c=a*this.direction.dot(Ur.crossVectors(wn,Ur));if(c<0)return null;const l=a*this.direction.dot($s.cross(wn));if(l<0||c+l>o)return null;const u=-a*wn.dot(js);return u<0?null:this.at(u/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ut{constructor(e,t,i,r,s,o,a,c,l,u,f,h,m,_,S,p){ut.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,c,l,u,f,h,m,_,S,p)}set(e,t,i,r,s,o,a,c,l,u,f,h,m,_,S,p){const d=this.elements;return d[0]=e,d[4]=t,d[8]=i,d[12]=r,d[1]=s,d[5]=o,d[9]=a,d[13]=c,d[2]=l,d[6]=u,d[10]=f,d[14]=h,d[3]=m,d[7]=_,d[11]=S,d[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ut().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,r=1/xi.setFromMatrixColumn(e,0).length(),s=1/xi.setFromMatrixColumn(e,1).length(),o=1/xi.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,o=Math.cos(i),a=Math.sin(i),c=Math.cos(r),l=Math.sin(r),u=Math.cos(s),f=Math.sin(s);if(e.order==="XYZ"){const h=o*u,m=o*f,_=a*u,S=a*f;t[0]=c*u,t[4]=-c*f,t[8]=l,t[1]=m+_*l,t[5]=h-S*l,t[9]=-a*c,t[2]=S-h*l,t[6]=_+m*l,t[10]=o*c}else if(e.order==="YXZ"){const h=c*u,m=c*f,_=l*u,S=l*f;t[0]=h+S*a,t[4]=_*a-m,t[8]=o*l,t[1]=o*f,t[5]=o*u,t[9]=-a,t[2]=m*a-_,t[6]=S+h*a,t[10]=o*c}else if(e.order==="ZXY"){const h=c*u,m=c*f,_=l*u,S=l*f;t[0]=h-S*a,t[4]=-o*f,t[8]=_+m*a,t[1]=m+_*a,t[5]=o*u,t[9]=S-h*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){const h=o*u,m=o*f,_=a*u,S=a*f;t[0]=c*u,t[4]=_*l-m,t[8]=h*l+S,t[1]=c*f,t[5]=S*l+h,t[9]=m*l-_,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){const h=o*c,m=o*l,_=a*c,S=a*l;t[0]=c*u,t[4]=S-h*f,t[8]=_*f+m,t[1]=f,t[5]=o*u,t[9]=-a*u,t[2]=-l*u,t[6]=m*f+_,t[10]=h-S*f}else if(e.order==="XZY"){const h=o*c,m=o*l,_=a*c,S=a*l;t[0]=c*u,t[4]=-f,t[8]=l*u,t[1]=h*f+S,t[5]=o*u,t[9]=m*f-_,t[2]=_*f-m,t[6]=a*u,t[10]=S*f+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(T_,e,b_)}lookAt(e,t,i){const r=this.elements;return It.subVectors(e,t),It.lengthSq()===0&&(It.z=1),It.normalize(),An.crossVectors(i,It),An.lengthSq()===0&&(Math.abs(i.z)===1?It.x+=1e-4:It.z+=1e-4,It.normalize(),An.crossVectors(i,It)),An.normalize(),Nr.crossVectors(It,An),r[0]=An.x,r[4]=Nr.x,r[8]=It.x,r[1]=An.y,r[5]=Nr.y,r[9]=It.y,r[2]=An.z,r[6]=Nr.z,r[10]=It.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[4],c=i[8],l=i[12],u=i[1],f=i[5],h=i[9],m=i[13],_=i[2],S=i[6],p=i[10],d=i[14],b=i[3],T=i[7],y=i[11],L=i[15],A=r[0],P=r[4],U=r[8],E=r[12],x=r[1],R=r[5],q=r[9],z=r[13],W=r[2],K=r[6],G=r[10],Q=r[14],H=r[3],re=r[7],ue=r[11],ge=r[15];return s[0]=o*A+a*x+c*W+l*H,s[4]=o*P+a*R+c*K+l*re,s[8]=o*U+a*q+c*G+l*ue,s[12]=o*E+a*z+c*Q+l*ge,s[1]=u*A+f*x+h*W+m*H,s[5]=u*P+f*R+h*K+m*re,s[9]=u*U+f*q+h*G+m*ue,s[13]=u*E+f*z+h*Q+m*ge,s[2]=_*A+S*x+p*W+d*H,s[6]=_*P+S*R+p*K+d*re,s[10]=_*U+S*q+p*G+d*ue,s[14]=_*E+S*z+p*Q+d*ge,s[3]=b*A+T*x+y*W+L*H,s[7]=b*P+T*R+y*K+L*re,s[11]=b*U+T*q+y*G+L*ue,s[15]=b*E+T*z+y*Q+L*ge,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],o=e[1],a=e[5],c=e[9],l=e[13],u=e[2],f=e[6],h=e[10],m=e[14],_=e[3],S=e[7],p=e[11],d=e[15];return _*(+s*c*f-r*l*f-s*a*h+i*l*h+r*a*m-i*c*m)+S*(+t*c*m-t*l*h+s*o*h-r*o*m+r*l*u-s*c*u)+p*(+t*l*f-t*a*m-s*o*f+i*o*m+s*a*u-i*l*u)+d*(-r*a*u-t*c*f+t*a*h+r*o*f-i*o*h+i*c*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8],f=e[9],h=e[10],m=e[11],_=e[12],S=e[13],p=e[14],d=e[15],b=f*p*l-S*h*l+S*c*m-a*p*m-f*c*d+a*h*d,T=_*h*l-u*p*l-_*c*m+o*p*m+u*c*d-o*h*d,y=u*S*l-_*f*l+_*a*m-o*S*m-u*a*d+o*f*d,L=_*f*c-u*S*c-_*a*h+o*S*h+u*a*p-o*f*p,A=t*b+i*T+r*y+s*L;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const P=1/A;return e[0]=b*P,e[1]=(S*h*s-f*p*s-S*r*m+i*p*m+f*r*d-i*h*d)*P,e[2]=(a*p*s-S*c*s+S*r*l-i*p*l-a*r*d+i*c*d)*P,e[3]=(f*c*s-a*h*s-f*r*l+i*h*l+a*r*m-i*c*m)*P,e[4]=T*P,e[5]=(u*p*s-_*h*s+_*r*m-t*p*m-u*r*d+t*h*d)*P,e[6]=(_*c*s-o*p*s-_*r*l+t*p*l+o*r*d-t*c*d)*P,e[7]=(o*h*s-u*c*s+u*r*l-t*h*l-o*r*m+t*c*m)*P,e[8]=y*P,e[9]=(_*f*s-u*S*s-_*i*m+t*S*m+u*i*d-t*f*d)*P,e[10]=(o*S*s-_*a*s+_*i*l-t*S*l-o*i*d+t*a*d)*P,e[11]=(u*a*s-o*f*s-u*i*l+t*f*l+o*i*m-t*a*m)*P,e[12]=L*P,e[13]=(u*S*r-_*f*r+_*i*h-t*S*h-u*i*p+t*f*p)*P,e[14]=(_*a*r-o*S*r-_*i*c+t*S*c+o*i*p-t*a*p)*P,e[15]=(o*f*r-u*a*r+u*i*c-t*f*c-o*i*h+t*a*h)*P,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,o=e.x,a=e.y,c=e.z,l=s*o,u=s*a;return this.set(l*o+i,l*a-r*c,l*c+r*a,0,l*a+r*c,u*a+i,u*c-r*o,0,l*c-r*a,u*c+r*o,s*c*c+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,o){return this.set(1,i,s,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,o=t._y,a=t._z,c=t._w,l=s+s,u=o+o,f=a+a,h=s*l,m=s*u,_=s*f,S=o*u,p=o*f,d=a*f,b=c*l,T=c*u,y=c*f,L=i.x,A=i.y,P=i.z;return r[0]=(1-(S+d))*L,r[1]=(m+y)*L,r[2]=(_-T)*L,r[3]=0,r[4]=(m-y)*A,r[5]=(1-(h+d))*A,r[6]=(p+b)*A,r[7]=0,r[8]=(_+T)*P,r[9]=(p-b)*P,r[10]=(1-(h+S))*P,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;let s=xi.set(r[0],r[1],r[2]).length();const o=xi.set(r[4],r[5],r[6]).length(),a=xi.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],Kt.copy(this);const l=1/s,u=1/o,f=1/a;return Kt.elements[0]*=l,Kt.elements[1]*=l,Kt.elements[2]*=l,Kt.elements[4]*=u,Kt.elements[5]*=u,Kt.elements[6]*=u,Kt.elements[8]*=f,Kt.elements[9]*=f,Kt.elements[10]*=f,t.setFromRotationMatrix(Kt),i.x=s,i.y=o,i.z=a,this}makePerspective(e,t,i,r,s,o,a=gn){const c=this.elements,l=2*s/(t-e),u=2*s/(i-r),f=(t+e)/(t-e),h=(i+r)/(i-r);let m,_;if(a===gn)m=-(o+s)/(o-s),_=-2*o*s/(o-s);else if(a===vs)m=-o/(o-s),_=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=u,c[9]=h,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,r,s,o,a=gn){const c=this.elements,l=1/(t-e),u=1/(i-r),f=1/(o-s),h=(t+e)*l,m=(i+r)*u;let _,S;if(a===gn)_=(o+s)*f,S=-2*f;else if(a===vs)_=s*f,S=-1*f;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-h,c[1]=0,c[5]=2*u,c[9]=0,c[13]=-m,c[2]=0,c[6]=0,c[10]=S,c[14]=-_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const xi=new O,Kt=new ut,T_=new O(0,0,0),b_=new O(1,1,1),An=new O,Nr=new O,It=new O,Yc=new ut,$c=new mr;class Mn{constructor(e=0,t=0,i=0,r=Mn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],o=r[4],a=r[8],c=r[1],l=r[5],u=r[9],f=r[2],h=r[6],m=r[10];switch(t){case"XYZ":this._y=Math.asin(Ne(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,m),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(h,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Ne(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,m),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(Ne(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,m),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-Ne(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,m),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Ne(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(a,m));break;case"XZY":this._z=Math.asin(-Ne(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(h,l),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Yc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Yc,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return $c.setFromEuler(this),this.setFromQuaternion($c,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Mn.DEFAULT_ORDER="XYZ";class Fu{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let w_=0;const jc=new O,Si=new mr,un=new ut,Fr=new O,Qi=new O,A_=new O,R_=new mr,Kc=new O(1,0,0),Zc=new O(0,1,0),Jc=new O(0,0,1),Qc={type:"added"},C_={type:"removed"},Ei={type:"childadded",child:null},Ks={type:"childremoved",child:null};class Pt extends Yi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:w_++}),this.uuid=pr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Pt.DEFAULT_UP.clone();const e=new O,t=new Mn,i=new mr,r=new O(1,1,1);function s(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new ut},normalMatrix:{value:new Re}}),this.matrix=new ut,this.matrixWorld=new ut,this.matrixAutoUpdate=Pt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Pt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Fu,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Si.setFromAxisAngle(e,t),this.quaternion.multiply(Si),this}rotateOnWorldAxis(e,t){return Si.setFromAxisAngle(e,t),this.quaternion.premultiply(Si),this}rotateX(e){return this.rotateOnAxis(Kc,e)}rotateY(e){return this.rotateOnAxis(Zc,e)}rotateZ(e){return this.rotateOnAxis(Jc,e)}translateOnAxis(e,t){return jc.copy(e).applyQuaternion(this.quaternion),this.position.add(jc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Kc,e)}translateY(e){return this.translateOnAxis(Zc,e)}translateZ(e){return this.translateOnAxis(Jc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(un.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Fr.copy(e):Fr.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),Qi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?un.lookAt(Qi,Fr,this.up):un.lookAt(Fr,Qi,this.up),this.quaternion.setFromRotationMatrix(un),r&&(un.extractRotation(r.matrixWorld),Si.setFromRotationMatrix(un),this.quaternion.premultiply(Si.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Qc),Ei.child=e,this.dispatchEvent(Ei),Ei.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(C_),Ks.child=e,this.dispatchEvent(Ks),Ks.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),un.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),un.multiply(e.parent.matrixWorld)),e.applyMatrix4(un),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Qc),Ei.child=e,this.dispatchEvent(Ei),Ei.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Qi,e,A_),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Qi,R_,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const f=c[l];s(e.shapes,f)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(s(e.materials,this.material[c]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];r.animations.push(s(e.animations,c))}}if(t){const a=o(e.geometries),c=o(e.materials),l=o(e.textures),u=o(e.images),f=o(e.shapes),h=o(e.skeletons),m=o(e.animations),_=o(e.nodes);a.length>0&&(i.geometries=a),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),u.length>0&&(i.images=u),f.length>0&&(i.shapes=f),h.length>0&&(i.skeletons=h),m.length>0&&(i.animations=m),_.length>0&&(i.nodes=_)}return i.object=r,i;function o(a){const c=[];for(const l in a){const u=a[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}Pt.DEFAULT_UP=new O(0,1,0);Pt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Pt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Zt=new O,fn=new O,Zs=new O,dn=new O,Mi=new O,yi=new O,el=new O,Js=new O,Qs=new O,eo=new O,to=new lt,no=new lt,io=new lt;class Jt{constructor(e=new O,t=new O,i=new O){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),Zt.subVectors(e,t),r.cross(Zt);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){Zt.subVectors(r,t),fn.subVectors(i,t),Zs.subVectors(e,t);const o=Zt.dot(Zt),a=Zt.dot(fn),c=Zt.dot(Zs),l=fn.dot(fn),u=fn.dot(Zs),f=o*l-a*a;if(f===0)return s.set(0,0,0),null;const h=1/f,m=(l*c-a*u)*h,_=(o*u-a*c)*h;return s.set(1-m-_,_,m)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,dn)===null?!1:dn.x>=0&&dn.y>=0&&dn.x+dn.y<=1}static getInterpolation(e,t,i,r,s,o,a,c){return this.getBarycoord(e,t,i,r,dn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,dn.x),c.addScaledVector(o,dn.y),c.addScaledVector(a,dn.z),c)}static getInterpolatedAttribute(e,t,i,r,s,o){return to.setScalar(0),no.setScalar(0),io.setScalar(0),to.fromBufferAttribute(e,t),no.fromBufferAttribute(e,i),io.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(to,s.x),o.addScaledVector(no,s.y),o.addScaledVector(io,s.z),o}static isFrontFacing(e,t,i,r){return Zt.subVectors(i,t),fn.subVectors(e,t),Zt.cross(fn).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Zt.subVectors(this.c,this.b),fn.subVectors(this.a,this.b),Zt.cross(fn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Jt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Jt.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return Jt.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return Jt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Jt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let o,a;Mi.subVectors(r,i),yi.subVectors(s,i),Js.subVectors(e,i);const c=Mi.dot(Js),l=yi.dot(Js);if(c<=0&&l<=0)return t.copy(i);Qs.subVectors(e,r);const u=Mi.dot(Qs),f=yi.dot(Qs);if(u>=0&&f<=u)return t.copy(r);const h=c*f-u*l;if(h<=0&&c>=0&&u<=0)return o=c/(c-u),t.copy(i).addScaledVector(Mi,o);eo.subVectors(e,s);const m=Mi.dot(eo),_=yi.dot(eo);if(_>=0&&m<=_)return t.copy(s);const S=m*l-c*_;if(S<=0&&l>=0&&_<=0)return a=l/(l-_),t.copy(i).addScaledVector(yi,a);const p=u*_-m*f;if(p<=0&&f-u>=0&&m-_>=0)return el.subVectors(s,r),a=(f-u)/(f-u+(m-_)),t.copy(r).addScaledVector(el,a);const d=1/(p+S+h);return o=S*d,a=h*d,t.copy(i).addScaledVector(Mi,o).addScaledVector(yi,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Ou={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Rn={h:0,s:0,l:0},Or={h:0,s:0,l:0};function ro(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class $e{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=kt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,We.toWorkingColorSpace(this,t),this}setRGB(e,t,i,r=We.workingColorSpace){return this.r=e,this.g=t,this.b=i,We.toWorkingColorSpace(this,r),this}setHSL(e,t,i,r=We.workingColorSpace){if(e=d_(e,1),t=Ne(t,0,1),i=Ne(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,o=2*i-s;this.r=ro(o,s,e+1/3),this.g=ro(o,s,e),this.b=ro(o,s,e-1/3)}return We.toWorkingColorSpace(this,r),this}setStyle(e,t=kt){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=kt){const i=Ou[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Sn(e.r),this.g=Sn(e.g),this.b=Sn(e.b),this}copyLinearToSRGB(e){return this.r=Li(e.r),this.g=Li(e.g),this.b=Li(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=kt){return We.fromWorkingColorSpace(Et.copy(this),e),Math.round(Ne(Et.r*255,0,255))*65536+Math.round(Ne(Et.g*255,0,255))*256+Math.round(Ne(Et.b*255,0,255))}getHexString(e=kt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=We.workingColorSpace){We.fromWorkingColorSpace(Et.copy(this),t);const i=Et.r,r=Et.g,s=Et.b,o=Math.max(i,r,s),a=Math.min(i,r,s);let c,l;const u=(a+o)/2;if(a===o)c=0,l=0;else{const f=o-a;switch(l=u<=.5?f/(o+a):f/(2-o-a),o){case i:c=(r-s)/f+(r<s?6:0);break;case r:c=(s-i)/f+2;break;case s:c=(i-r)/f+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=We.workingColorSpace){return We.fromWorkingColorSpace(Et.copy(this),t),e.r=Et.r,e.g=Et.g,e.b=Et.b,e}getStyle(e=kt){We.fromWorkingColorSpace(Et.copy(this),e);const t=Et.r,i=Et.g,r=Et.b;return e!==kt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(Rn),this.setHSL(Rn.h+e,Rn.s+t,Rn.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Rn),e.getHSL(Or);const i=Hs(Rn.h,Or.h,t),r=Hs(Rn.s,Or.s,t),s=Hs(Rn.l,Or.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Et=new $e;$e.NAMES=Ou;let P_=0;class gr extends Yi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:P_++}),this.uuid=pr(),this.name="",this.type="Material",this.blending=Di,this.side=Fn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Io,this.blendDst=Lo,this.blendEquation=jn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new $e(0,0,0),this.blendAlpha=0,this.depthFunc=Bi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=kc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=pi,this.stencilZFail=pi,this.stencilZPass=pi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Di&&(i.blending=this.blending),this.side!==Fn&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Io&&(i.blendSrc=this.blendSrc),this.blendDst!==Lo&&(i.blendDst=this.blendDst),this.blendEquation!==jn&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Bi&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==kc&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==pi&&(i.stencilFail=this.stencilFail),this.stencilZFail!==pi&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==pi&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const o=[];for(const a in s){const c=s[a];delete c.metadata,o.push(c)}return o}if(t){const s=r(e.textures),o=r(e.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Bu extends gr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new $e(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Mn,this.combine=xu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const dt=new O,Br=new tt;class Nt{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Hc,this.updateRanges=[],this.gpuType=nn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Br.fromBufferAttribute(this,t),Br.applyMatrix3(e),this.setXY(t,Br.x,Br.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)dt.fromBufferAttribute(this,t),dt.applyMatrix3(e),this.setXYZ(t,dt.x,dt.y,dt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)dt.fromBufferAttribute(this,t),dt.applyMatrix4(e),this.setXYZ(t,dt.x,dt.y,dt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)dt.fromBufferAttribute(this,t),dt.applyNormalMatrix(e),this.setXYZ(t,dt.x,dt.y,dt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)dt.fromBufferAttribute(this,t),dt.transformDirection(e),this.setXYZ(t,dt.x,dt.y,dt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Ki(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=At(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ki(t,this.array)),t}setX(e,t){return this.normalized&&(t=At(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ki(t,this.array)),t}setY(e,t){return this.normalized&&(t=At(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ki(t,this.array)),t}setZ(e,t){return this.normalized&&(t=At(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ki(t,this.array)),t}setW(e,t){return this.normalized&&(t=At(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=At(t,this.array),i=At(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=At(t,this.array),i=At(i,this.array),r=At(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=At(t,this.array),i=At(i,this.array),r=At(r,this.array),s=At(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Hc&&(e.usage=this.usage),e}}class zu extends Nt{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class ku extends Nt{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class ei extends Nt{constructor(e,t,i){super(new Float32Array(e),t,i)}}let D_=0;const zt=new ut,so=new Pt,Ti=new O,Lt=new _r,er=new _r,mt=new O;class yn extends Yi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:D_++}),this.uuid=pr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Iu(e)?ku:zu)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Re().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return zt.makeRotationFromQuaternion(e),this.applyMatrix4(zt),this}rotateX(e){return zt.makeRotationX(e),this.applyMatrix4(zt),this}rotateY(e){return zt.makeRotationY(e),this.applyMatrix4(zt),this}rotateZ(e){return zt.makeRotationZ(e),this.applyMatrix4(zt),this}translate(e,t,i){return zt.makeTranslation(e,t,i),this.applyMatrix4(zt),this}scale(e,t,i){return zt.makeScale(e,t,i),this.applyMatrix4(zt),this}lookAt(e){return so.lookAt(e),so.updateMatrix(),this.applyMatrix4(so.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ti).negate(),this.translate(Ti.x,Ti.y,Ti.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const o=e[r];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new ei(i,3))}else{const i=Math.min(e.length,t.count);for(let r=0;r<i;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new _r);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new O(-1/0,-1/0,-1/0),new O(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];Lt.setFromBufferAttribute(s),this.morphTargetsRelative?(mt.addVectors(this.boundingBox.min,Lt.min),this.boundingBox.expandByPoint(mt),mt.addVectors(this.boundingBox.max,Lt.max),this.boundingBox.expandByPoint(mt)):(this.boundingBox.expandByPoint(Lt.min),this.boundingBox.expandByPoint(Lt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Cs);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new O,1/0);return}if(e){const i=this.boundingSphere.center;if(Lt.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];er.setFromBufferAttribute(a),this.morphTargetsRelative?(mt.addVectors(Lt.min,er.min),Lt.expandByPoint(mt),mt.addVectors(Lt.max,er.max),Lt.expandByPoint(mt)):(Lt.expandByPoint(er.min),Lt.expandByPoint(er.max))}Lt.getCenter(i);let r=0;for(let s=0,o=e.count;s<o;s++)mt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(mt));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],c=this.morphTargetsRelative;for(let l=0,u=a.count;l<u;l++)mt.fromBufferAttribute(a,l),c&&(Ti.fromBufferAttribute(e,l),mt.add(Ti)),r=Math.max(r,i.distanceToSquared(mt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Nt(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let U=0;U<i.count;U++)a[U]=new O,c[U]=new O;const l=new O,u=new O,f=new O,h=new tt,m=new tt,_=new tt,S=new O,p=new O;function d(U,E,x){l.fromBufferAttribute(i,U),u.fromBufferAttribute(i,E),f.fromBufferAttribute(i,x),h.fromBufferAttribute(s,U),m.fromBufferAttribute(s,E),_.fromBufferAttribute(s,x),u.sub(l),f.sub(l),m.sub(h),_.sub(h);const R=1/(m.x*_.y-_.x*m.y);isFinite(R)&&(S.copy(u).multiplyScalar(_.y).addScaledVector(f,-m.y).multiplyScalar(R),p.copy(f).multiplyScalar(m.x).addScaledVector(u,-_.x).multiplyScalar(R),a[U].add(S),a[E].add(S),a[x].add(S),c[U].add(p),c[E].add(p),c[x].add(p))}let b=this.groups;b.length===0&&(b=[{start:0,count:e.count}]);for(let U=0,E=b.length;U<E;++U){const x=b[U],R=x.start,q=x.count;for(let z=R,W=R+q;z<W;z+=3)d(e.getX(z+0),e.getX(z+1),e.getX(z+2))}const T=new O,y=new O,L=new O,A=new O;function P(U){L.fromBufferAttribute(r,U),A.copy(L);const E=a[U];T.copy(E),T.sub(L.multiplyScalar(L.dot(E))).normalize(),y.crossVectors(A,E);const R=y.dot(c[U])<0?-1:1;o.setXYZW(U,T.x,T.y,T.z,R)}for(let U=0,E=b.length;U<E;++U){const x=b[U],R=x.start,q=x.count;for(let z=R,W=R+q;z<W;z+=3)P(e.getX(z+0)),P(e.getX(z+1)),P(e.getX(z+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Nt(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let h=0,m=i.count;h<m;h++)i.setXYZ(h,0,0,0);const r=new O,s=new O,o=new O,a=new O,c=new O,l=new O,u=new O,f=new O;if(e)for(let h=0,m=e.count;h<m;h+=3){const _=e.getX(h+0),S=e.getX(h+1),p=e.getX(h+2);r.fromBufferAttribute(t,_),s.fromBufferAttribute(t,S),o.fromBufferAttribute(t,p),u.subVectors(o,s),f.subVectors(r,s),u.cross(f),a.fromBufferAttribute(i,_),c.fromBufferAttribute(i,S),l.fromBufferAttribute(i,p),a.add(u),c.add(u),l.add(u),i.setXYZ(_,a.x,a.y,a.z),i.setXYZ(S,c.x,c.y,c.z),i.setXYZ(p,l.x,l.y,l.z)}else for(let h=0,m=t.count;h<m;h+=3)r.fromBufferAttribute(t,h+0),s.fromBufferAttribute(t,h+1),o.fromBufferAttribute(t,h+2),u.subVectors(o,s),f.subVectors(r,s),u.cross(f),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)mt.fromBufferAttribute(e,t),mt.normalize(),e.setXYZ(t,mt.x,mt.y,mt.z)}toNonIndexed(){function e(a,c){const l=a.array,u=a.itemSize,f=a.normalized,h=new l.constructor(c.length*u);let m=0,_=0;for(let S=0,p=c.length;S<p;S++){a.isInterleavedBufferAttribute?m=c[S]*a.data.stride+a.offset:m=c[S]*u;for(let d=0;d<u;d++)h[_++]=l[m++]}return new Nt(h,u,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new yn,i=this.index.array,r=this.attributes;for(const a in r){const c=r[a],l=e(c,i);t.setAttribute(a,l)}const s=this.morphAttributes;for(const a in s){const c=[],l=s[a];for(let u=0,f=l.length;u<f;u++){const h=l[u],m=e(h,i);c.push(m)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const c in i){const l=i[c];e.data.attributes[c]=l.toJSON(e.data)}const r={};let s=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let f=0,h=l.length;f<h;f++){const m=l[f];u.push(m.toJSON(e.data))}u.length>0&&(r[c]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(t));const r=e.attributes;for(const l in r){const u=r[l];this.setAttribute(l,u.clone(t))}const s=e.morphAttributes;for(const l in s){const u=[],f=s[l];for(let h=0,m=f.length;h<m;h++)u.push(f[h].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let l=0,u=o.length;l<u;l++){const f=o[l];this.addGroup(f.start,f.count,f.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const tl=new ut,Gn=new Nu,zr=new Cs,nl=new O,kr=new O,Hr=new O,Gr=new O,oo=new O,Vr=new O,il=new O,Wr=new O;class rn extends Pt{constructor(e=new yn,t=new Bu){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const a=this.morphTargetInfluences;if(s&&a){Vr.set(0,0,0);for(let c=0,l=s.length;c<l;c++){const u=a[c],f=s[c];u!==0&&(oo.fromBufferAttribute(f,e),o?Vr.addScaledVector(oo,u):Vr.addScaledVector(oo.sub(t),u))}t.add(Vr)}return t}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),zr.copy(i.boundingSphere),zr.applyMatrix4(s),Gn.copy(e.ray).recast(e.near),!(zr.containsPoint(Gn.origin)===!1&&(Gn.intersectSphere(zr,nl)===null||Gn.origin.distanceToSquared(nl)>(e.far-e.near)**2))&&(tl.copy(s).invert(),Gn.copy(e.ray).applyMatrix4(tl),!(i.boundingBox!==null&&Gn.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Gn)))}_computeIntersections(e,t,i){let r;const s=this.geometry,o=this.material,a=s.index,c=s.attributes.position,l=s.attributes.uv,u=s.attributes.uv1,f=s.attributes.normal,h=s.groups,m=s.drawRange;if(a!==null)if(Array.isArray(o))for(let _=0,S=h.length;_<S;_++){const p=h[_],d=o[p.materialIndex],b=Math.max(p.start,m.start),T=Math.min(a.count,Math.min(p.start+p.count,m.start+m.count));for(let y=b,L=T;y<L;y+=3){const A=a.getX(y),P=a.getX(y+1),U=a.getX(y+2);r=Xr(this,d,e,i,l,u,f,A,P,U),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=p.materialIndex,t.push(r))}}else{const _=Math.max(0,m.start),S=Math.min(a.count,m.start+m.count);for(let p=_,d=S;p<d;p+=3){const b=a.getX(p),T=a.getX(p+1),y=a.getX(p+2);r=Xr(this,o,e,i,l,u,f,b,T,y),r&&(r.faceIndex=Math.floor(p/3),t.push(r))}}else if(c!==void 0)if(Array.isArray(o))for(let _=0,S=h.length;_<S;_++){const p=h[_],d=o[p.materialIndex],b=Math.max(p.start,m.start),T=Math.min(c.count,Math.min(p.start+p.count,m.start+m.count));for(let y=b,L=T;y<L;y+=3){const A=y,P=y+1,U=y+2;r=Xr(this,d,e,i,l,u,f,A,P,U),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=p.materialIndex,t.push(r))}}else{const _=Math.max(0,m.start),S=Math.min(c.count,m.start+m.count);for(let p=_,d=S;p<d;p+=3){const b=p,T=p+1,y=p+2;r=Xr(this,o,e,i,l,u,f,b,T,y),r&&(r.faceIndex=Math.floor(p/3),t.push(r))}}}}function I_(n,e,t,i,r,s,o,a){let c;if(e.side===Rt?c=i.intersectTriangle(o,s,r,!0,a):c=i.intersectTriangle(r,s,o,e.side===Fn,a),c===null)return null;Wr.copy(a),Wr.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(Wr);return l<t.near||l>t.far?null:{distance:l,point:Wr.clone(),object:n}}function Xr(n,e,t,i,r,s,o,a,c,l){n.getVertexPosition(a,kr),n.getVertexPosition(c,Hr),n.getVertexPosition(l,Gr);const u=I_(n,e,t,i,kr,Hr,Gr,il);if(u){const f=new O;Jt.getBarycoord(il,kr,Hr,Gr,f),r&&(u.uv=Jt.getInterpolatedAttribute(r,a,c,l,f,new tt)),s&&(u.uv1=Jt.getInterpolatedAttribute(s,a,c,l,f,new tt)),o&&(u.normal=Jt.getInterpolatedAttribute(o,a,c,l,f,new O),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const h={a,b:c,c:l,normal:new O,materialIndex:0};Jt.getNormal(kr,Hr,Gr,h.normal),u.face=h,u.barycoord=f}return u}class vr extends yn{constructor(e=1,t=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const c=[],l=[],u=[],f=[];let h=0,m=0;_("z","y","x",-1,-1,i,t,e,o,s,0),_("z","y","x",1,-1,i,t,-e,o,s,1),_("x","z","y",1,1,e,i,t,r,o,2),_("x","z","y",1,-1,e,i,-t,r,o,3),_("x","y","z",1,-1,e,t,i,r,s,4),_("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(c),this.setAttribute("position",new ei(l,3)),this.setAttribute("normal",new ei(u,3)),this.setAttribute("uv",new ei(f,2));function _(S,p,d,b,T,y,L,A,P,U,E){const x=y/P,R=L/U,q=y/2,z=L/2,W=A/2,K=P+1,G=U+1;let Q=0,H=0;const re=new O;for(let ue=0;ue<G;ue++){const ge=ue*R-z;for(let Le=0;Le<K;Le++){const Je=Le*x-q;re[S]=Je*b,re[p]=ge*T,re[d]=W,l.push(re.x,re.y,re.z),re[S]=0,re[p]=0,re[d]=A>0?1:-1,u.push(re.x,re.y,re.z),f.push(Le/P),f.push(1-ue/U),Q+=1}}for(let ue=0;ue<U;ue++)for(let ge=0;ge<P;ge++){const Le=h+ge+K*ue,Je=h+ge+K*(ue+1),X=h+(ge+1)+K*(ue+1),ee=h+(ge+1)+K*ue;c.push(Le,Je,ee),c.push(Je,X,ee),H+=6}a.addGroup(m,H,E),m+=H,h+=Q}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new vr(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Wi(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone():Array.isArray(r)?e[t][i]=r.slice():e[t][i]=r}}return e}function Tt(n){const e={};for(let t=0;t<n.length;t++){const i=Wi(n[t]);for(const r in i)e[r]=i[r]}return e}function L_(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Hu(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:We.workingColorSpace}const U_={clone:Wi,merge:Tt};var N_=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,F_=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class sn extends gr{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=N_,this.fragmentShader=F_,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Wi(e.uniforms),this.uniformsGroups=L_(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?t.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[r]={type:"m4",value:o.toArray()}:t.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class ka extends Pt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ut,this.projectionMatrix=new ut,this.projectionMatrixInverse=new ut,this.coordinateSystem=gn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Cn=new O,rl=new tt,sl=new tt;class Gt extends ka{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=_a*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(ks*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return _a*2*Math.atan(Math.tan(ks*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Cn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Cn.x,Cn.y).multiplyScalar(-e/Cn.z),Cn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Cn.x,Cn.y).multiplyScalar(-e/Cn.z)}getViewSize(e,t){return this.getViewBounds(e,rl,sl),t.subVectors(sl,rl)}setViewOffset(e,t,i,r,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(ks*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;s+=o.offsetX*r/c,t-=o.offsetY*i/l,r*=o.width/c,i*=o.height/l}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const bi=-90,wi=1;class O_ extends Pt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Gt(bi,wi,e,t);r.layers=this.layers,this.add(r);const s=new Gt(bi,wi,e,t);s.layers=this.layers,this.add(s);const o=new Gt(bi,wi,e,t);o.layers=this.layers,this.add(o);const a=new Gt(bi,wi,e,t);a.layers=this.layers,this.add(a);const c=new Gt(bi,wi,e,t);c.layers=this.layers,this.add(c);const l=new Gt(bi,wi,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,o,a,c]=t;for(const l of t)this.remove(l);if(e===gn)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===vs)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,c,l,u]=this.children,f=e.getRenderTarget(),h=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const S=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(t,s),e.setRenderTarget(i,1,r),e.render(t,o),e.setRenderTarget(i,2,r),e.render(t,a),e.setRenderTarget(i,3,r),e.render(t,c),e.setRenderTarget(i,4,r),e.render(t,l),i.texture.generateMipmaps=S,e.setRenderTarget(i,5,r),e.render(t,u),e.setRenderTarget(f,h,m),e.xr.enabled=_,i.texture.needsPMREMUpdate=!0}}class Gu extends gt{constructor(e,t,i,r,s,o,a,c,l,u){e=e!==void 0?e:[],t=t!==void 0?t:zi,super(e,t,i,r,s,o,a,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class B_ extends On{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new Gu(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Wt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new vr(5,5,5),s=new sn({name:"CubemapFromEquirect",uniforms:Wi(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Rt,blending:In});s.uniforms.tEquirect.value=t;const o=new rn(r,s),a=t.minFilter;return t.minFilter===Jn&&(t.minFilter=Wt),new O_(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,i,r){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,r);e.setRenderTarget(s)}}class z_ extends Pt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Mn,this.environmentIntensity=1,this.environmentRotation=new Mn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const ao=new O,k_=new O,H_=new Re;class qn{constructor(e=new O(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=ao.subVectors(i,t).cross(k_.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(ao),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||H_.getNormalMatrix(e),r=this.coplanarPoint(ao).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Vn=new Cs,qr=new O;class Vu{constructor(e=new qn,t=new qn,i=new qn,r=new qn,s=new qn,o=new qn){this.planes=[e,t,i,r,s,o]}set(e,t,i,r,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=gn){const i=this.planes,r=e.elements,s=r[0],o=r[1],a=r[2],c=r[3],l=r[4],u=r[5],f=r[6],h=r[7],m=r[8],_=r[9],S=r[10],p=r[11],d=r[12],b=r[13],T=r[14],y=r[15];if(i[0].setComponents(c-s,h-l,p-m,y-d).normalize(),i[1].setComponents(c+s,h+l,p+m,y+d).normalize(),i[2].setComponents(c+o,h+u,p+_,y+b).normalize(),i[3].setComponents(c-o,h-u,p-_,y-b).normalize(),i[4].setComponents(c-a,h-f,p-S,y-T).normalize(),t===gn)i[5].setComponents(c+a,h+f,p+S,y+T).normalize();else if(t===vs)i[5].setComponents(a,f,S,T).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Vn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Vn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Vn)}intersectsSprite(e){return Vn.center.set(0,0,0),Vn.radius=.7071067811865476,Vn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Vn)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(qr.x=r.normal.x>0?e.max.x:e.min.x,qr.y=r.normal.y>0?e.max.y:e.min.y,qr.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(qr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class G_ extends gr{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new $e(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const ol=new ut,ga=new Nu,Yr=new Cs,$r=new O;class V_ extends Pt{constructor(e=new yn,t=new G_){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const i=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Yr.copy(i.boundingSphere),Yr.applyMatrix4(r),Yr.radius+=s,e.ray.intersectsSphere(Yr)===!1)return;ol.copy(r).invert(),ga.copy(e.ray).applyMatrix4(ol);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=i.index,f=i.attributes.position;if(l!==null){const h=Math.max(0,o.start),m=Math.min(l.count,o.start+o.count);for(let _=h,S=m;_<S;_++){const p=l.getX(_);$r.fromBufferAttribute(f,p),al($r,p,c,r,e,t,this)}}else{const h=Math.max(0,o.start),m=Math.min(f.count,o.start+o.count);for(let _=h,S=m;_<S;_++)$r.fromBufferAttribute(f,_),al($r,_,c,r,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function al(n,e,t,i,r,s,o){const a=ga.distanceSqToPoint(n);if(a<t){const c=new O;ga.closestPointToPoint(n,c),c.applyMatrix4(i);const l=r.ray.origin.distanceTo(c);if(l<r.near||l>r.far)return;s.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class jr extends Pt{constructor(){super(),this.isGroup=!0,this.type="Group"}}class Wu extends gt{constructor(e,t,i,r,s,o,a,c,l,u=Ii){if(u!==Ii&&u!==Gi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&u===Ii&&(i=ci),i===void 0&&u===Gi&&(i=Hi),super(null,r,s,o,a,c,u,i,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:Ct,this.minFilter=c!==void 0?c:Ct,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class xr extends yn{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,o=t/2,a=Math.floor(i),c=Math.floor(r),l=a+1,u=c+1,f=e/a,h=t/c,m=[],_=[],S=[],p=[];for(let d=0;d<u;d++){const b=d*h-o;for(let T=0;T<l;T++){const y=T*f-s;_.push(y,-b,0),S.push(0,0,1),p.push(T/a),p.push(1-d/c)}}for(let d=0;d<c;d++)for(let b=0;b<a;b++){const T=b+l*d,y=b+l*(d+1),L=b+1+l*(d+1),A=b+1+l*d;m.push(T,y,A),m.push(y,L,A)}this.setIndex(m),this.setAttribute("position",new ei(_,3)),this.setAttribute("normal",new ei(S,3)),this.setAttribute("uv",new ei(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new xr(e.width,e.height,e.widthSegments,e.heightSegments)}}class W_ extends sn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class X_ extends gr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=t_,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class q_ extends gr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Y_ extends ka{constructor(e=-1,t=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,o=i+e,a=r+t,c=r-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,o=s+l*this.view.width,a-=u*this.view.offsetY,c=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class $_ extends Gt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Mt{constructor(e){this.value=e}clone(){return new Mt(this.value.clone===void 0?this.value:this.value.clone())}}function cl(n,e,t,i){const r=j_(i);switch(t){case Tu:return n*e;case wu:return n*e;case Au:return n*e*2;case Ru:return n*e/r.components*r.byteLength;case Oa:return n*e/r.components*r.byteLength;case Cu:return n*e*2/r.components*r.byteLength;case Ba:return n*e*2/r.components*r.byteLength;case bu:return n*e*3/r.components*r.byteLength;case Xt:return n*e*4/r.components*r.byteLength;case za:return n*e*4/r.components*r.byteLength;case is:case rs:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case ss:case os:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Xo:case Yo:return Math.max(n,16)*Math.max(e,8)/4;case Wo:case qo:return Math.max(n,8)*Math.max(e,8)/2;case $o:case jo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Ko:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Zo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Jo:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Qo:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case ea:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case ta:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case na:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case ia:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case ra:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case sa:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case oa:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case aa:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case ca:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case la:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case ua:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case as:case fa:case da:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Pu:case ha:return Math.ceil(n/4)*Math.ceil(e/4)*8;case pa:case ma:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function j_(n){switch(n){case En:case Eu:return{byteLength:1,components:1};case cr:case Mu:case hr:return{byteLength:2,components:1};case Na:case Fa:return{byteLength:2,components:4};case ci:case Ua:case nn:return{byteLength:4,components:1};case yu:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:La}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=La);/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Xu(){let n=null,e=!1,t=null,i=null;function r(s,o){t(s,o),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function K_(n){const e=new WeakMap;function t(a,c){const l=a.array,u=a.usage,f=l.byteLength,h=n.createBuffer();n.bindBuffer(c,h),n.bufferData(c,l,u),a.onUploadCallback();let m;if(l instanceof Float32Array)m=n.FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?m=n.HALF_FLOAT:m=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)m=n.SHORT;else if(l instanceof Uint32Array)m=n.UNSIGNED_INT;else if(l instanceof Int32Array)m=n.INT;else if(l instanceof Int8Array)m=n.BYTE;else if(l instanceof Uint8Array)m=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)m=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:h,type:m,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:f}}function i(a,c,l){const u=c.array,f=c.updateRanges;if(n.bindBuffer(l,a),f.length===0)n.bufferSubData(l,0,u);else{f.sort((m,_)=>m.start-_.start);let h=0;for(let m=1;m<f.length;m++){const _=f[h],S=f[m];S.start<=_.start+_.count+1?_.count=Math.max(_.count,S.start+S.count-_.start):(++h,f[h]=S)}f.length=h+1;for(let m=0,_=f.length;m<_;m++){const S=f[m];n.bufferSubData(l,S.start*u.BYTES_PER_ELEMENT,u,S.start,S.count)}c.clearUpdateRanges()}c.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=e.get(a);c&&(n.deleteBuffer(c.buffer),e.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=e.get(a);if(l===void 0)e.set(a,t(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,a,c),l.version=a.version}}return{get:r,remove:s,update:o}}var Z_=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,J_=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Q_=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,eg=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,tg=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,ng=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,ig=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,rg=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,sg=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,og=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,ag=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,cg=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,lg=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,ug=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,fg=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,dg=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,hg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,pg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,mg=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,_g=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,gg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,vg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,xg=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Sg=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Eg=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Mg=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,yg=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Tg=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,bg=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,wg=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Ag="gl_FragColor = linearToOutputTexel( gl_FragColor );",Rg=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Cg=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Pg=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Dg=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Ig=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Lg=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Ug=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Ng=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Fg=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Og=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Bg=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,zg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,kg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Hg=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Gg=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Vg=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Wg=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Xg=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,qg=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Yg=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,$g=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,jg=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Kg=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Zg=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Jg=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Qg=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,ev=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,tv=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,nv=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,iv=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,rv=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,sv=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,ov=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,av=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,cv=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,lv=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,uv=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,fv=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,dv=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,hv=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,pv=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,mv=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,_v=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,gv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,vv=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,xv=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Sv=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Ev=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Mv=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,yv=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Tv=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,bv=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,wv=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Av=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Rv=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Cv=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Pv=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Dv=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Iv=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Lv=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Uv=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Nv=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Fv=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Ov=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Bv=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,zv=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,kv=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Hv=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Gv=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Vv=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Wv=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Xv=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,qv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Yv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,$v=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,jv=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Kv=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Zv=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Jv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Qv=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ex=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,tx=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,nx=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,ix=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,rx=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,sx=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,ox=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,ax=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cx=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,lx=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,ux=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,fx=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,dx=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,hx=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,px=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,mx=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,_x=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,gx=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,vx=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,xx=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Sx=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Ex=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Mx=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,yx=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Tx=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,bx=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,wx=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ax=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Rx=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Cx=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ie={alphahash_fragment:Z_,alphahash_pars_fragment:J_,alphamap_fragment:Q_,alphamap_pars_fragment:eg,alphatest_fragment:tg,alphatest_pars_fragment:ng,aomap_fragment:ig,aomap_pars_fragment:rg,batching_pars_vertex:sg,batching_vertex:og,begin_vertex:ag,beginnormal_vertex:cg,bsdfs:lg,iridescence_fragment:ug,bumpmap_pars_fragment:fg,clipping_planes_fragment:dg,clipping_planes_pars_fragment:hg,clipping_planes_pars_vertex:pg,clipping_planes_vertex:mg,color_fragment:_g,color_pars_fragment:gg,color_pars_vertex:vg,color_vertex:xg,common:Sg,cube_uv_reflection_fragment:Eg,defaultnormal_vertex:Mg,displacementmap_pars_vertex:yg,displacementmap_vertex:Tg,emissivemap_fragment:bg,emissivemap_pars_fragment:wg,colorspace_fragment:Ag,colorspace_pars_fragment:Rg,envmap_fragment:Cg,envmap_common_pars_fragment:Pg,envmap_pars_fragment:Dg,envmap_pars_vertex:Ig,envmap_physical_pars_fragment:Vg,envmap_vertex:Lg,fog_vertex:Ug,fog_pars_vertex:Ng,fog_fragment:Fg,fog_pars_fragment:Og,gradientmap_pars_fragment:Bg,lightmap_pars_fragment:zg,lights_lambert_fragment:kg,lights_lambert_pars_fragment:Hg,lights_pars_begin:Gg,lights_toon_fragment:Wg,lights_toon_pars_fragment:Xg,lights_phong_fragment:qg,lights_phong_pars_fragment:Yg,lights_physical_fragment:$g,lights_physical_pars_fragment:jg,lights_fragment_begin:Kg,lights_fragment_maps:Zg,lights_fragment_end:Jg,logdepthbuf_fragment:Qg,logdepthbuf_pars_fragment:ev,logdepthbuf_pars_vertex:tv,logdepthbuf_vertex:nv,map_fragment:iv,map_pars_fragment:rv,map_particle_fragment:sv,map_particle_pars_fragment:ov,metalnessmap_fragment:av,metalnessmap_pars_fragment:cv,morphinstance_vertex:lv,morphcolor_vertex:uv,morphnormal_vertex:fv,morphtarget_pars_vertex:dv,morphtarget_vertex:hv,normal_fragment_begin:pv,normal_fragment_maps:mv,normal_pars_fragment:_v,normal_pars_vertex:gv,normal_vertex:vv,normalmap_pars_fragment:xv,clearcoat_normal_fragment_begin:Sv,clearcoat_normal_fragment_maps:Ev,clearcoat_pars_fragment:Mv,iridescence_pars_fragment:yv,opaque_fragment:Tv,packing:bv,premultiplied_alpha_fragment:wv,project_vertex:Av,dithering_fragment:Rv,dithering_pars_fragment:Cv,roughnessmap_fragment:Pv,roughnessmap_pars_fragment:Dv,shadowmap_pars_fragment:Iv,shadowmap_pars_vertex:Lv,shadowmap_vertex:Uv,shadowmask_pars_fragment:Nv,skinbase_vertex:Fv,skinning_pars_vertex:Ov,skinning_vertex:Bv,skinnormal_vertex:zv,specularmap_fragment:kv,specularmap_pars_fragment:Hv,tonemapping_fragment:Gv,tonemapping_pars_fragment:Vv,transmission_fragment:Wv,transmission_pars_fragment:Xv,uv_pars_fragment:qv,uv_pars_vertex:Yv,uv_vertex:$v,worldpos_vertex:jv,background_vert:Kv,background_frag:Zv,backgroundCube_vert:Jv,backgroundCube_frag:Qv,cube_vert:ex,cube_frag:tx,depth_vert:nx,depth_frag:ix,distanceRGBA_vert:rx,distanceRGBA_frag:sx,equirect_vert:ox,equirect_frag:ax,linedashed_vert:cx,linedashed_frag:lx,meshbasic_vert:ux,meshbasic_frag:fx,meshlambert_vert:dx,meshlambert_frag:hx,meshmatcap_vert:px,meshmatcap_frag:mx,meshnormal_vert:_x,meshnormal_frag:gx,meshphong_vert:vx,meshphong_frag:xx,meshphysical_vert:Sx,meshphysical_frag:Ex,meshtoon_vert:Mx,meshtoon_frag:yx,points_vert:Tx,points_frag:bx,shadow_vert:wx,shadow_frag:Ax,sprite_vert:Rx,sprite_frag:Cx},te={common:{diffuse:{value:new $e(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Re},alphaMap:{value:null},alphaMapTransform:{value:new Re},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Re}},envmap:{envMap:{value:null},envMapRotation:{value:new Re},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Re}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Re}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Re},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Re},normalScale:{value:new tt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Re},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Re}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Re}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Re}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new $e(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new $e(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Re},alphaTest:{value:0},uvTransform:{value:new Re}},sprite:{diffuse:{value:new $e(16777215)},opacity:{value:1},center:{value:new tt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Re},alphaMap:{value:null},alphaMapTransform:{value:new Re},alphaTest:{value:0}}},en={basic:{uniforms:Tt([te.common,te.specularmap,te.envmap,te.aomap,te.lightmap,te.fog]),vertexShader:Ie.meshbasic_vert,fragmentShader:Ie.meshbasic_frag},lambert:{uniforms:Tt([te.common,te.specularmap,te.envmap,te.aomap,te.lightmap,te.emissivemap,te.bumpmap,te.normalmap,te.displacementmap,te.fog,te.lights,{emissive:{value:new $e(0)}}]),vertexShader:Ie.meshlambert_vert,fragmentShader:Ie.meshlambert_frag},phong:{uniforms:Tt([te.common,te.specularmap,te.envmap,te.aomap,te.lightmap,te.emissivemap,te.bumpmap,te.normalmap,te.displacementmap,te.fog,te.lights,{emissive:{value:new $e(0)},specular:{value:new $e(1118481)},shininess:{value:30}}]),vertexShader:Ie.meshphong_vert,fragmentShader:Ie.meshphong_frag},standard:{uniforms:Tt([te.common,te.envmap,te.aomap,te.lightmap,te.emissivemap,te.bumpmap,te.normalmap,te.displacementmap,te.roughnessmap,te.metalnessmap,te.fog,te.lights,{emissive:{value:new $e(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ie.meshphysical_vert,fragmentShader:Ie.meshphysical_frag},toon:{uniforms:Tt([te.common,te.aomap,te.lightmap,te.emissivemap,te.bumpmap,te.normalmap,te.displacementmap,te.gradientmap,te.fog,te.lights,{emissive:{value:new $e(0)}}]),vertexShader:Ie.meshtoon_vert,fragmentShader:Ie.meshtoon_frag},matcap:{uniforms:Tt([te.common,te.bumpmap,te.normalmap,te.displacementmap,te.fog,{matcap:{value:null}}]),vertexShader:Ie.meshmatcap_vert,fragmentShader:Ie.meshmatcap_frag},points:{uniforms:Tt([te.points,te.fog]),vertexShader:Ie.points_vert,fragmentShader:Ie.points_frag},dashed:{uniforms:Tt([te.common,te.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ie.linedashed_vert,fragmentShader:Ie.linedashed_frag},depth:{uniforms:Tt([te.common,te.displacementmap]),vertexShader:Ie.depth_vert,fragmentShader:Ie.depth_frag},normal:{uniforms:Tt([te.common,te.bumpmap,te.normalmap,te.displacementmap,{opacity:{value:1}}]),vertexShader:Ie.meshnormal_vert,fragmentShader:Ie.meshnormal_frag},sprite:{uniforms:Tt([te.sprite,te.fog]),vertexShader:Ie.sprite_vert,fragmentShader:Ie.sprite_frag},background:{uniforms:{uvTransform:{value:new Re},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ie.background_vert,fragmentShader:Ie.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Re}},vertexShader:Ie.backgroundCube_vert,fragmentShader:Ie.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ie.cube_vert,fragmentShader:Ie.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ie.equirect_vert,fragmentShader:Ie.equirect_frag},distanceRGBA:{uniforms:Tt([te.common,te.displacementmap,{referencePosition:{value:new O},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ie.distanceRGBA_vert,fragmentShader:Ie.distanceRGBA_frag},shadow:{uniforms:Tt([te.lights,te.fog,{color:{value:new $e(0)},opacity:{value:1}}]),vertexShader:Ie.shadow_vert,fragmentShader:Ie.shadow_frag}};en.physical={uniforms:Tt([en.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Re},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Re},clearcoatNormalScale:{value:new tt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Re},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Re},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Re},sheen:{value:0},sheenColor:{value:new $e(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Re},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Re},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Re},transmissionSamplerSize:{value:new tt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Re},attenuationDistance:{value:0},attenuationColor:{value:new $e(0)},specularColor:{value:new $e(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Re},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Re},anisotropyVector:{value:new tt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Re}}]),vertexShader:Ie.meshphysical_vert,fragmentShader:Ie.meshphysical_frag};const Kr={r:0,b:0,g:0},Wn=new Mn,Px=new ut;function Dx(n,e,t,i,r,s,o){const a=new $e(0);let c=s===!0?0:1,l,u,f=null,h=0,m=null;function _(T){let y=T.isScene===!0?T.background:null;return y&&y.isTexture&&(y=(T.backgroundBlurriness>0?t:e).get(y)),y}function S(T){let y=!1;const L=_(T);L===null?d(a,c):L&&L.isColor&&(d(L,1),y=!0);const A=n.xr.getEnvironmentBlendMode();A==="additive"?i.buffers.color.setClear(0,0,0,1,o):A==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||y)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function p(T,y){const L=_(y);L&&(L.isCubeTexture||L.mapping===Rs)?(u===void 0&&(u=new rn(new vr(1,1,1),new sn({name:"BackgroundCubeMaterial",uniforms:Wi(en.backgroundCube.uniforms),vertexShader:en.backgroundCube.vertexShader,fragmentShader:en.backgroundCube.fragmentShader,side:Rt,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(A,P,U){this.matrixWorld.copyPosition(U.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),Wn.copy(y.backgroundRotation),Wn.x*=-1,Wn.y*=-1,Wn.z*=-1,L.isCubeTexture&&L.isRenderTargetTexture===!1&&(Wn.y*=-1,Wn.z*=-1),u.material.uniforms.envMap.value=L,u.material.uniforms.flipEnvMap.value=L.isCubeTexture&&L.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(Px.makeRotationFromEuler(Wn)),u.material.toneMapped=We.getTransfer(L.colorSpace)!==Ze,(f!==L||h!==L.version||m!==n.toneMapping)&&(u.material.needsUpdate=!0,f=L,h=L.version,m=n.toneMapping),u.layers.enableAll(),T.unshift(u,u.geometry,u.material,0,0,null)):L&&L.isTexture&&(l===void 0&&(l=new rn(new xr(2,2),new sn({name:"BackgroundMaterial",uniforms:Wi(en.background.uniforms),vertexShader:en.background.vertexShader,fragmentShader:en.background.fragmentShader,side:Fn,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(l)),l.material.uniforms.t2D.value=L,l.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,l.material.toneMapped=We.getTransfer(L.colorSpace)!==Ze,L.matrixAutoUpdate===!0&&L.updateMatrix(),l.material.uniforms.uvTransform.value.copy(L.matrix),(f!==L||h!==L.version||m!==n.toneMapping)&&(l.material.needsUpdate=!0,f=L,h=L.version,m=n.toneMapping),l.layers.enableAll(),T.unshift(l,l.geometry,l.material,0,0,null))}function d(T,y){T.getRGB(Kr,Hu(n)),i.buffers.color.setClear(Kr.r,Kr.g,Kr.b,y,o)}function b(){u!==void 0&&(u.geometry.dispose(),u.material.dispose()),l!==void 0&&(l.geometry.dispose(),l.material.dispose())}return{getClearColor:function(){return a},setClearColor:function(T,y=1){a.set(T),c=y,d(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(T){c=T,d(a,c)},render:S,addToRenderList:p,dispose:b}}function Ix(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=h(null);let s=r,o=!1;function a(x,R,q,z,W){let K=!1;const G=f(z,q,R);s!==G&&(s=G,l(s.object)),K=m(x,z,q,W),K&&_(x,z,q,W),W!==null&&e.update(W,n.ELEMENT_ARRAY_BUFFER),(K||o)&&(o=!1,y(x,R,q,z),W!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(W).buffer))}function c(){return n.createVertexArray()}function l(x){return n.bindVertexArray(x)}function u(x){return n.deleteVertexArray(x)}function f(x,R,q){const z=q.wireframe===!0;let W=i[x.id];W===void 0&&(W={},i[x.id]=W);let K=W[R.id];K===void 0&&(K={},W[R.id]=K);let G=K[z];return G===void 0&&(G=h(c()),K[z]=G),G}function h(x){const R=[],q=[],z=[];for(let W=0;W<t;W++)R[W]=0,q[W]=0,z[W]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:R,enabledAttributes:q,attributeDivisors:z,object:x,attributes:{},index:null}}function m(x,R,q,z){const W=s.attributes,K=R.attributes;let G=0;const Q=q.getAttributes();for(const H in Q)if(Q[H].location>=0){const ue=W[H];let ge=K[H];if(ge===void 0&&(H==="instanceMatrix"&&x.instanceMatrix&&(ge=x.instanceMatrix),H==="instanceColor"&&x.instanceColor&&(ge=x.instanceColor)),ue===void 0||ue.attribute!==ge||ge&&ue.data!==ge.data)return!0;G++}return s.attributesNum!==G||s.index!==z}function _(x,R,q,z){const W={},K=R.attributes;let G=0;const Q=q.getAttributes();for(const H in Q)if(Q[H].location>=0){let ue=K[H];ue===void 0&&(H==="instanceMatrix"&&x.instanceMatrix&&(ue=x.instanceMatrix),H==="instanceColor"&&x.instanceColor&&(ue=x.instanceColor));const ge={};ge.attribute=ue,ue&&ue.data&&(ge.data=ue.data),W[H]=ge,G++}s.attributes=W,s.attributesNum=G,s.index=z}function S(){const x=s.newAttributes;for(let R=0,q=x.length;R<q;R++)x[R]=0}function p(x){d(x,0)}function d(x,R){const q=s.newAttributes,z=s.enabledAttributes,W=s.attributeDivisors;q[x]=1,z[x]===0&&(n.enableVertexAttribArray(x),z[x]=1),W[x]!==R&&(n.vertexAttribDivisor(x,R),W[x]=R)}function b(){const x=s.newAttributes,R=s.enabledAttributes;for(let q=0,z=R.length;q<z;q++)R[q]!==x[q]&&(n.disableVertexAttribArray(q),R[q]=0)}function T(x,R,q,z,W,K,G){G===!0?n.vertexAttribIPointer(x,R,q,W,K):n.vertexAttribPointer(x,R,q,z,W,K)}function y(x,R,q,z){S();const W=z.attributes,K=q.getAttributes(),G=R.defaultAttributeValues;for(const Q in K){const H=K[Q];if(H.location>=0){let re=W[Q];if(re===void 0&&(Q==="instanceMatrix"&&x.instanceMatrix&&(re=x.instanceMatrix),Q==="instanceColor"&&x.instanceColor&&(re=x.instanceColor)),re!==void 0){const ue=re.normalized,ge=re.itemSize,Le=e.get(re);if(Le===void 0)continue;const Je=Le.buffer,X=Le.type,ee=Le.bytesPerElement,me=X===n.INT||X===n.UNSIGNED_INT||re.gpuType===Ua;if(re.isInterleavedBufferAttribute){const se=re.data,ye=se.stride,Ce=re.offset;if(se.isInstancedInterleavedBuffer){for(let Ue=0;Ue<H.locationSize;Ue++)d(H.location+Ue,se.meshPerAttribute);x.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=se.meshPerAttribute*se.count)}else for(let Ue=0;Ue<H.locationSize;Ue++)p(H.location+Ue);n.bindBuffer(n.ARRAY_BUFFER,Je);for(let Ue=0;Ue<H.locationSize;Ue++)T(H.location+Ue,ge/H.locationSize,X,ue,ye*ee,(Ce+ge/H.locationSize*Ue)*ee,me)}else{if(re.isInstancedBufferAttribute){for(let se=0;se<H.locationSize;se++)d(H.location+se,re.meshPerAttribute);x.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=re.meshPerAttribute*re.count)}else for(let se=0;se<H.locationSize;se++)p(H.location+se);n.bindBuffer(n.ARRAY_BUFFER,Je);for(let se=0;se<H.locationSize;se++)T(H.location+se,ge/H.locationSize,X,ue,ge*ee,ge/H.locationSize*se*ee,me)}}else if(G!==void 0){const ue=G[Q];if(ue!==void 0)switch(ue.length){case 2:n.vertexAttrib2fv(H.location,ue);break;case 3:n.vertexAttrib3fv(H.location,ue);break;case 4:n.vertexAttrib4fv(H.location,ue);break;default:n.vertexAttrib1fv(H.location,ue)}}}}b()}function L(){U();for(const x in i){const R=i[x];for(const q in R){const z=R[q];for(const W in z)u(z[W].object),delete z[W];delete R[q]}delete i[x]}}function A(x){if(i[x.id]===void 0)return;const R=i[x.id];for(const q in R){const z=R[q];for(const W in z)u(z[W].object),delete z[W];delete R[q]}delete i[x.id]}function P(x){for(const R in i){const q=i[R];if(q[x.id]===void 0)continue;const z=q[x.id];for(const W in z)u(z[W].object),delete z[W];delete q[x.id]}}function U(){E(),o=!0,s!==r&&(s=r,l(s.object))}function E(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:U,resetDefaultState:E,dispose:L,releaseStatesOfGeometry:A,releaseStatesOfProgram:P,initAttributes:S,enableAttribute:p,disableUnusedAttributes:b}}function Lx(n,e,t){let i;function r(l){i=l}function s(l,u){n.drawArrays(i,l,u),t.update(u,i,1)}function o(l,u,f){f!==0&&(n.drawArraysInstanced(i,l,u,f),t.update(u,i,f))}function a(l,u,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,u,0,f);let m=0;for(let _=0;_<f;_++)m+=u[_];t.update(m,i,1)}function c(l,u,f,h){if(f===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let _=0;_<l.length;_++)o(l[_],u[_],h[_]);else{m.multiDrawArraysInstancedWEBGL(i,l,0,u,0,h,0,f);let _=0;for(let S=0;S<f;S++)_+=u[S]*h[S];t.update(_,i,1)}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function Ux(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const P=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(P){return!(P!==Xt&&i.convert(P)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(P){const U=P===hr&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(P!==En&&i.convert(P)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==nn&&!U)}function c(P){if(P==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const u=c(l);u!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const f=t.logarithmicDepthBuffer===!0,h=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),m=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),S=n.getParameter(n.MAX_TEXTURE_SIZE),p=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),d=n.getParameter(n.MAX_VERTEX_ATTRIBS),b=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),T=n.getParameter(n.MAX_VARYING_VECTORS),y=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),L=_>0,A=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:f,reverseDepthBuffer:h,maxTextures:m,maxVertexTextures:_,maxTextureSize:S,maxCubemapSize:p,maxAttributes:d,maxVertexUniforms:b,maxVaryings:T,maxFragmentUniforms:y,vertexTextures:L,maxSamples:A}}function Nx(n){const e=this;let t=null,i=0,r=!1,s=!1;const o=new qn,a=new Re,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h){const m=f.length!==0||h||i!==0||r;return r=h,i=f.length,m},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,h){t=u(f,h,0)},this.setState=function(f,h,m){const _=f.clippingPlanes,S=f.clipIntersection,p=f.clipShadows,d=n.get(f);if(!r||_===null||_.length===0||s&&!p)s?u(null):l();else{const b=s?0:i,T=b*4;let y=d.clippingState||null;c.value=y,y=u(_,h,T,m);for(let L=0;L!==T;++L)y[L]=t[L];d.clippingState=y,this.numIntersection=S?this.numPlanes:0,this.numPlanes+=b}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(f,h,m,_){const S=f!==null?f.length:0;let p=null;if(S!==0){if(p=c.value,_!==!0||p===null){const d=m+S*4,b=h.matrixWorldInverse;a.getNormalMatrix(b),(p===null||p.length<d)&&(p=new Float32Array(d));for(let T=0,y=m;T!==S;++T,y+=4)o.copy(f[T]).applyMatrix4(b,a),o.normal.toArray(p,y),p[y+3]=o.constant}c.value=p,c.needsUpdate=!0}return e.numPlanes=S,e.numIntersection=0,p}}function Fx(n){let e=new WeakMap;function t(o,a){return a===Ho?o.mapping=zi:a===Go&&(o.mapping=ki),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===Ho||a===Go)if(e.has(o)){const c=e.get(o).texture;return t(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new B_(c.height);return l.fromEquirectangularTexture(n,o),e.set(o,l),o.addEventListener("dispose",r),t(l.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const c=e.get(a);c!==void 0&&(e.delete(a),c.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}const Ci=4,ll=[.125,.215,.35,.446,.526,.582],Kn=20,co=new Y_,ul=new $e;let lo=null,uo=0,fo=0,ho=!1;const Yn=(1+Math.sqrt(5))/2,Ai=1/Yn,fl=[new O(-Yn,Ai,0),new O(Yn,Ai,0),new O(-Ai,0,Yn),new O(Ai,0,Yn),new O(0,Yn,-Ai),new O(0,Yn,Ai),new O(-1,1,-1),new O(1,1,-1),new O(-1,1,1),new O(1,1,1)];class dl{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,r=100){lo=this._renderer.getRenderTarget(),uo=this._renderer.getActiveCubeFace(),fo=this._renderer.getActiveMipmapLevel(),ho=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,i,r,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ml(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=pl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(lo,uo,fo),this._renderer.xr.enabled=ho,e.scissorTest=!1,Zr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===zi||e.mapping===ki?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),lo=this._renderer.getRenderTarget(),uo=this._renderer.getActiveCubeFace(),fo=this._renderer.getActiveMipmapLevel(),ho=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Wt,minFilter:Wt,generateMipmaps:!1,type:hr,format:Xt,colorSpace:Vi,depthBuffer:!1},r=hl(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=hl(e,t,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Ox(s)),this._blurMaterial=Bx(s,e,t)}return r}_compileMaterial(e){const t=new rn(this._lodPlanes[0],e);this._renderer.compile(t,co)}_sceneToCubeUV(e,t,i,r){const a=new Gt(90,1,t,i),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,h=u.toneMapping;u.getClearColor(ul),u.toneMapping=Ln,u.autoClear=!1;const m=new Bu({name:"PMREM.Background",side:Rt,depthWrite:!1,depthTest:!1}),_=new rn(new vr,m);let S=!1;const p=e.background;p?p.isColor&&(m.color.copy(p),e.background=null,S=!0):(m.color.copy(ul),S=!0);for(let d=0;d<6;d++){const b=d%3;b===0?(a.up.set(0,c[d],0),a.lookAt(l[d],0,0)):b===1?(a.up.set(0,0,c[d]),a.lookAt(0,l[d],0)):(a.up.set(0,c[d],0),a.lookAt(0,0,l[d]));const T=this._cubeSize;Zr(r,b*T,d>2?T:0,T,T),u.setRenderTarget(r),S&&u.render(_,a),u.render(e,a)}_.geometry.dispose(),_.material.dispose(),u.toneMapping=h,u.autoClear=f,e.background=p}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===zi||e.mapping===ki;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=ml()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=pl());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new rn(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const c=this._cubeSize;Zr(t,0,0,3*c,2*c),i.setRenderTarget(t),i.render(o,co)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=fl[(r-s-1)%fl.length];this._blur(e,s-1,s,o,a)}t.autoClear=i}_blur(e,t,i,r,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,i,r,"latitudinal",s),this._halfBlur(o,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,f=new rn(this._lodPlanes[r],l),h=l.uniforms,m=this._sizeLods[i]-1,_=isFinite(s)?Math.PI/(2*m):2*Math.PI/(2*Kn-1),S=s/_,p=isFinite(s)?1+Math.floor(u*S):Kn;p>Kn&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${Kn}`);const d=[];let b=0;for(let P=0;P<Kn;++P){const U=P/S,E=Math.exp(-U*U/2);d.push(E),P===0?b+=E:P<p&&(b+=2*E)}for(let P=0;P<d.length;P++)d[P]=d[P]/b;h.envMap.value=e.texture,h.samples.value=p,h.weights.value=d,h.latitudinal.value=o==="latitudinal",a&&(h.poleAxis.value=a);const{_lodMax:T}=this;h.dTheta.value=_,h.mipInt.value=T-i;const y=this._sizeLods[r],L=3*y*(r>T-Ci?r-T+Ci:0),A=4*(this._cubeSize-y);Zr(t,L,A,3*y,2*y),c.setRenderTarget(t),c.render(f,co)}}function Ox(n){const e=[],t=[],i=[];let r=n;const s=n-Ci+1+ll.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);t.push(a);let c=1/a;o>n-Ci?c=ll[o-n+Ci-1]:o===0&&(c=0),i.push(c);const l=1/(a-2),u=-l,f=1+l,h=[u,u,f,u,f,f,u,u,f,f,u,f],m=6,_=6,S=3,p=2,d=1,b=new Float32Array(S*_*m),T=new Float32Array(p*_*m),y=new Float32Array(d*_*m);for(let A=0;A<m;A++){const P=A%3*2/3-1,U=A>2?0:-1,E=[P,U,0,P+2/3,U,0,P+2/3,U+1,0,P,U,0,P+2/3,U+1,0,P,U+1,0];b.set(E,S*_*A),T.set(h,p*_*A);const x=[A,A,A,A,A,A];y.set(x,d*_*A)}const L=new yn;L.setAttribute("position",new Nt(b,S)),L.setAttribute("uv",new Nt(T,p)),L.setAttribute("faceIndex",new Nt(y,d)),e.push(L),r>Ci&&r--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function hl(n,e,t){const i=new On(n,e,t);return i.texture.mapping=Rs,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Zr(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function Bx(n,e,t){const i=new Float32Array(Kn),r=new O(0,1,0);return new sn({name:"SphericalGaussianBlur",defines:{n:Kn,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Ha(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:In,depthTest:!1,depthWrite:!1})}function pl(){return new sn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ha(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:In,depthTest:!1,depthWrite:!1})}function ml(){return new sn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ha(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:In,depthTest:!1,depthWrite:!1})}function Ha(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function zx(n){let e=new WeakMap,t=null;function i(a){if(a&&a.isTexture){const c=a.mapping,l=c===Ho||c===Go,u=c===zi||c===ki;if(l||u){let f=e.get(a);const h=f!==void 0?f.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==h)return t===null&&(t=new dl(n)),f=l?t.fromEquirectangular(a,f):t.fromCubemap(a,f),f.texture.pmremVersion=a.pmremVersion,e.set(a,f),f.texture;if(f!==void 0)return f.texture;{const m=a.image;return l&&m&&m.height>0||u&&m&&r(m)?(t===null&&(t=new dl(n)),f=l?t.fromEquirectangular(a):t.fromCubemap(a),f.texture.pmremVersion=a.pmremVersion,e.set(a,f),a.addEventListener("dispose",s),f.texture):null}}}return a}function r(a){let c=0;const l=6;for(let u=0;u<l;u++)a[u]!==void 0&&c++;return c===l}function s(a){const c=a.target;c.removeEventListener("dispose",s);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:o}}function kx(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=n.getExtension(i)}return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const r=t(i);return r===null&&Ri("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function Hx(n,e,t,i){const r={},s=new WeakMap;function o(f){const h=f.target;h.index!==null&&e.remove(h.index);for(const _ in h.attributes)e.remove(h.attributes[_]);h.removeEventListener("dispose",o),delete r[h.id];const m=s.get(h);m&&(e.remove(m),s.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function a(f,h){return r[h.id]===!0||(h.addEventListener("dispose",o),r[h.id]=!0,t.memory.geometries++),h}function c(f){const h=f.attributes;for(const m in h)e.update(h[m],n.ARRAY_BUFFER)}function l(f){const h=[],m=f.index,_=f.attributes.position;let S=0;if(m!==null){const b=m.array;S=m.version;for(let T=0,y=b.length;T<y;T+=3){const L=b[T+0],A=b[T+1],P=b[T+2];h.push(L,A,A,P,P,L)}}else if(_!==void 0){const b=_.array;S=_.version;for(let T=0,y=b.length/3-1;T<y;T+=3){const L=T+0,A=T+1,P=T+2;h.push(L,A,A,P,P,L)}}else return;const p=new(Iu(h)?ku:zu)(h,1);p.version=S;const d=s.get(f);d&&e.remove(d),s.set(f,p)}function u(f){const h=s.get(f);if(h){const m=f.index;m!==null&&h.version<m.version&&l(f)}else l(f);return s.get(f)}return{get:a,update:c,getWireframeAttribute:u}}function Gx(n,e,t){let i;function r(h){i=h}let s,o;function a(h){s=h.type,o=h.bytesPerElement}function c(h,m){n.drawElements(i,m,s,h*o),t.update(m,i,1)}function l(h,m,_){_!==0&&(n.drawElementsInstanced(i,m,s,h*o,_),t.update(m,i,_))}function u(h,m,_){if(_===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,m,0,s,h,0,_);let p=0;for(let d=0;d<_;d++)p+=m[d];t.update(p,i,1)}function f(h,m,_,S){if(_===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let d=0;d<h.length;d++)l(h[d]/o,m[d],S[d]);else{p.multiDrawElementsInstancedWEBGL(i,m,0,s,h,0,S,0,_);let d=0;for(let b=0;b<_;b++)d+=m[b]*S[b];t.update(d,i,1)}}this.setMode=r,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=f}function Vx(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=a*(s/3);break;case n.LINES:t.lines+=a*(s/2);break;case n.LINE_STRIP:t.lines+=a*(s-1);break;case n.LINE_LOOP:t.lines+=a*s;break;case n.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function Wx(n,e,t){const i=new WeakMap,r=new lt;function s(o,a,c){const l=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,f=u!==void 0?u.length:0;let h=i.get(a);if(h===void 0||h.count!==f){let E=function(){P.dispose(),i.delete(a),a.removeEventListener("dispose",E)};h!==void 0&&h.texture.dispose();const m=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,S=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],d=a.morphAttributes.normal||[],b=a.morphAttributes.color||[];let T=0;m===!0&&(T=1),_===!0&&(T=2),S===!0&&(T=3);let y=a.attributes.position.count*T,L=1;y>e.maxTextureSize&&(L=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);const A=new Float32Array(y*L*4*f),P=new Uu(A,y,L,f);P.type=nn,P.needsUpdate=!0;const U=T*4;for(let x=0;x<f;x++){const R=p[x],q=d[x],z=b[x],W=y*L*4*x;for(let K=0;K<R.count;K++){const G=K*U;m===!0&&(r.fromBufferAttribute(R,K),A[W+G+0]=r.x,A[W+G+1]=r.y,A[W+G+2]=r.z,A[W+G+3]=0),_===!0&&(r.fromBufferAttribute(q,K),A[W+G+4]=r.x,A[W+G+5]=r.y,A[W+G+6]=r.z,A[W+G+7]=0),S===!0&&(r.fromBufferAttribute(z,K),A[W+G+8]=r.x,A[W+G+9]=r.y,A[W+G+10]=r.z,A[W+G+11]=z.itemSize===4?r.w:1)}}h={count:f,texture:P,size:new tt(y,L)},i.set(a,h),a.addEventListener("dispose",E)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",o.morphTexture,t);else{let m=0;for(let S=0;S<l.length;S++)m+=l[S];const _=a.morphTargetsRelative?1:1-m;c.getUniforms().setValue(n,"morphTargetBaseInfluence",_),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",h.texture,t),c.getUniforms().setValue(n,"morphTargetsTextureSize",h.size)}return{update:s}}function Xx(n,e,t,i){let r=new WeakMap;function s(c){const l=i.render.frame,u=c.geometry,f=e.get(c,u);if(r.get(f)!==l&&(e.update(f),r.set(f,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),r.get(c)!==l&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),r.set(c,l))),c.isSkinnedMesh){const h=c.skeleton;r.get(h)!==l&&(h.update(),r.set(h,l))}return f}function o(){r=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:s,dispose:o}}const qu=new gt,_l=new Wu(1,1),Yu=new Uu,$u=new M_,ju=new Gu,gl=[],vl=[],xl=new Float32Array(16),Sl=new Float32Array(9),El=new Float32Array(4);function $i(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=gl[r];if(s===void 0&&(s=new Float32Array(r),gl[r]=s),e!==0){i.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,n[o].toArray(s,a)}return s}function ht(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function pt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Ps(n,e){let t=vl[e];t===void 0&&(t=new Int32Array(e),vl[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function qx(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function Yx(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ht(t,e))return;n.uniform2fv(this.addr,e),pt(t,e)}}function $x(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(ht(t,e))return;n.uniform3fv(this.addr,e),pt(t,e)}}function jx(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ht(t,e))return;n.uniform4fv(this.addr,e),pt(t,e)}}function Kx(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(ht(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),pt(t,e)}else{if(ht(t,i))return;El.set(i),n.uniformMatrix2fv(this.addr,!1,El),pt(t,i)}}function Zx(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(ht(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),pt(t,e)}else{if(ht(t,i))return;Sl.set(i),n.uniformMatrix3fv(this.addr,!1,Sl),pt(t,i)}}function Jx(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(ht(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),pt(t,e)}else{if(ht(t,i))return;xl.set(i),n.uniformMatrix4fv(this.addr,!1,xl),pt(t,i)}}function Qx(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function e0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ht(t,e))return;n.uniform2iv(this.addr,e),pt(t,e)}}function t0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(ht(t,e))return;n.uniform3iv(this.addr,e),pt(t,e)}}function n0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ht(t,e))return;n.uniform4iv(this.addr,e),pt(t,e)}}function i0(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function r0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ht(t,e))return;n.uniform2uiv(this.addr,e),pt(t,e)}}function s0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(ht(t,e))return;n.uniform3uiv(this.addr,e),pt(t,e)}}function o0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ht(t,e))return;n.uniform4uiv(this.addr,e),pt(t,e)}}function a0(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(_l.compareFunction=Du,s=_l):s=qu,t.setTexture2D(e||s,r)}function c0(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||$u,r)}function l0(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||ju,r)}function u0(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||Yu,r)}function f0(n){switch(n){case 5126:return qx;case 35664:return Yx;case 35665:return $x;case 35666:return jx;case 35674:return Kx;case 35675:return Zx;case 35676:return Jx;case 5124:case 35670:return Qx;case 35667:case 35671:return e0;case 35668:case 35672:return t0;case 35669:case 35673:return n0;case 5125:return i0;case 36294:return r0;case 36295:return s0;case 36296:return o0;case 35678:case 36198:case 36298:case 36306:case 35682:return a0;case 35679:case 36299:case 36307:return c0;case 35680:case 36300:case 36308:case 36293:return l0;case 36289:case 36303:case 36311:case 36292:return u0}}function d0(n,e){n.uniform1fv(this.addr,e)}function h0(n,e){const t=$i(e,this.size,2);n.uniform2fv(this.addr,t)}function p0(n,e){const t=$i(e,this.size,3);n.uniform3fv(this.addr,t)}function m0(n,e){const t=$i(e,this.size,4);n.uniform4fv(this.addr,t)}function _0(n,e){const t=$i(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function g0(n,e){const t=$i(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function v0(n,e){const t=$i(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function x0(n,e){n.uniform1iv(this.addr,e)}function S0(n,e){n.uniform2iv(this.addr,e)}function E0(n,e){n.uniform3iv(this.addr,e)}function M0(n,e){n.uniform4iv(this.addr,e)}function y0(n,e){n.uniform1uiv(this.addr,e)}function T0(n,e){n.uniform2uiv(this.addr,e)}function b0(n,e){n.uniform3uiv(this.addr,e)}function w0(n,e){n.uniform4uiv(this.addr,e)}function A0(n,e,t){const i=this.cache,r=e.length,s=Ps(t,r);ht(i,s)||(n.uniform1iv(this.addr,s),pt(i,s));for(let o=0;o!==r;++o)t.setTexture2D(e[o]||qu,s[o])}function R0(n,e,t){const i=this.cache,r=e.length,s=Ps(t,r);ht(i,s)||(n.uniform1iv(this.addr,s),pt(i,s));for(let o=0;o!==r;++o)t.setTexture3D(e[o]||$u,s[o])}function C0(n,e,t){const i=this.cache,r=e.length,s=Ps(t,r);ht(i,s)||(n.uniform1iv(this.addr,s),pt(i,s));for(let o=0;o!==r;++o)t.setTextureCube(e[o]||ju,s[o])}function P0(n,e,t){const i=this.cache,r=e.length,s=Ps(t,r);ht(i,s)||(n.uniform1iv(this.addr,s),pt(i,s));for(let o=0;o!==r;++o)t.setTexture2DArray(e[o]||Yu,s[o])}function D0(n){switch(n){case 5126:return d0;case 35664:return h0;case 35665:return p0;case 35666:return m0;case 35674:return _0;case 35675:return g0;case 35676:return v0;case 5124:case 35670:return x0;case 35667:case 35671:return S0;case 35668:case 35672:return E0;case 35669:case 35673:return M0;case 5125:return y0;case 36294:return T0;case 36295:return b0;case 36296:return w0;case 35678:case 36198:case 36298:case 36306:case 35682:return A0;case 35679:case 36299:case 36307:return R0;case 35680:case 36300:case 36308:case 36293:return C0;case 36289:case 36303:case 36311:case 36292:return P0}}class I0{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=f0(t.type)}}class L0{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=D0(t.type)}}class U0{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(e,t[a.id],i)}}}const po=/(\w+)(\])?(\[|\.)?/g;function Ml(n,e){n.seq.push(e),n.map[e.id]=e}function N0(n,e,t){const i=n.name,r=i.length;for(po.lastIndex=0;;){const s=po.exec(i),o=po.lastIndex;let a=s[1];const c=s[2]==="]",l=s[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===r){Ml(t,l===void 0?new I0(a,n,e):new L0(a,n,e));break}else{let f=t.map[a];f===void 0&&(f=new U0(a),Ml(t,f)),t=f}}}class cs{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(t,r),o=e.getUniformLocation(t,s.name);N0(s,o,this)}}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,o=t.length;s!==o;++s){const a=t[s],c=i[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const o=e[r];o.id in t&&i.push(o)}return i}}function yl(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const F0=37297;let O0=0;function B0(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=r;o<s;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return i.join(`
`)}const Tl=new Re;function z0(n){We._getMatrix(Tl,We.workingColorSpace,n);const e=`mat3( ${Tl.elements.map(t=>t.toFixed(4))} )`;switch(We.getTransfer(n)){case _s:return[e,"LinearTransferOETF"];case Ze:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function bl(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=n.getShaderInfoLog(e).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const o=parseInt(s[1]);return t.toUpperCase()+`

`+r+`

`+B0(n.getShaderSource(e),o)}else return r}function k0(n,e){const t=z0(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function H0(n,e){let t;switch(e){case Xm:t="Linear";break;case qm:t="Reinhard";break;case Ym:t="Cineon";break;case $m:t="ACESFilmic";break;case Km:t="AgX";break;case Zm:t="Neutral";break;case jm:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Jr=new O;function G0(){We.getLuminanceCoefficients(Jr);const n=Jr.x.toFixed(4),e=Jr.y.toFixed(4),t=Jr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function V0(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(rr).join(`
`)}function W0(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function X0(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),o=s.name;let a=1;s.type===n.FLOAT_MAT2&&(a=2),s.type===n.FLOAT_MAT3&&(a=3),s.type===n.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:n.getAttribLocation(e,o),locationSize:a}}return t}function rr(n){return n!==""}function wl(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Al(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const q0=/^[ \t]*#include +<([\w\d./]+)>/gm;function va(n){return n.replace(q0,$0)}const Y0=new Map;function $0(n,e){let t=Ie[e];if(t===void 0){const i=Y0.get(e);if(i!==void 0)t=Ie[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return va(t)}const j0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Rl(n){return n.replace(j0,K0)}function K0(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Cl(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Z0(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===vu?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===Tm?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===hn&&(e="SHADOWMAP_TYPE_VSM"),e}function J0(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case zi:case ki:e="ENVMAP_TYPE_CUBE";break;case Rs:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Q0(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case ki:e="ENVMAP_MODE_REFRACTION";break}return e}function eS(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case xu:e="ENVMAP_BLENDING_MULTIPLY";break;case Vm:e="ENVMAP_BLENDING_MIX";break;case Wm:e="ENVMAP_BLENDING_ADD";break}return e}function tS(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function nS(n,e,t,i){const r=n.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const c=Z0(t),l=J0(t),u=Q0(t),f=eS(t),h=tS(t),m=V0(t),_=W0(s),S=r.createProgram();let p,d,b=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(rr).join(`
`),p.length>0&&(p+=`
`),d=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(rr).join(`
`),d.length>0&&(d+=`
`)):(p=[Cl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(rr).join(`
`),d=[Cl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+f:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Ln?"#define TONE_MAPPING":"",t.toneMapping!==Ln?Ie.tonemapping_pars_fragment:"",t.toneMapping!==Ln?H0("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ie.colorspace_pars_fragment,k0("linearToOutputTexel",t.outputColorSpace),G0(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(rr).join(`
`)),o=va(o),o=wl(o,t),o=Al(o,t),a=va(a),a=wl(a,t),a=Al(a,t),o=Rl(o),a=Rl(a),t.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,p=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,d=["#define varying in",t.glslVersion===gs?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===gs?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const T=b+p+o,y=b+d+a,L=yl(r,r.VERTEX_SHADER,T),A=yl(r,r.FRAGMENT_SHADER,y);r.attachShader(S,L),r.attachShader(S,A),t.index0AttributeName!==void 0?r.bindAttribLocation(S,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(S,0,"position"),r.linkProgram(S);function P(R){if(n.debug.checkShaderErrors){const q=r.getProgramInfoLog(S).trim(),z=r.getShaderInfoLog(L).trim(),W=r.getShaderInfoLog(A).trim();let K=!0,G=!0;if(r.getProgramParameter(S,r.LINK_STATUS)===!1)if(K=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,S,L,A);else{const Q=bl(r,L,"vertex"),H=bl(r,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(S,r.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+q+`
`+Q+`
`+H)}else q!==""?console.warn("THREE.WebGLProgram: Program Info Log:",q):(z===""||W==="")&&(G=!1);G&&(R.diagnostics={runnable:K,programLog:q,vertexShader:{log:z,prefix:p},fragmentShader:{log:W,prefix:d}})}r.deleteShader(L),r.deleteShader(A),U=new cs(r,S),E=X0(r,S)}let U;this.getUniforms=function(){return U===void 0&&P(this),U};let E;this.getAttributes=function(){return E===void 0&&P(this),E};let x=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return x===!1&&(x=r.getProgramParameter(S,F0)),x},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(S),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=O0++,this.cacheKey=e,this.usedTimes=1,this.program=S,this.vertexShader=L,this.fragmentShader=A,this}let iS=0;class rS{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new sS(e),t.set(e,i)),i}}class sS{constructor(e){this.id=iS++,this.code=e,this.usedTimes=0}}function oS(n,e,t,i,r,s,o){const a=new Fu,c=new rS,l=new Set,u=[],f=r.logarithmicDepthBuffer,h=r.vertexTextures;let m=r.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function S(E){return l.add(E),E===0?"uv":`uv${E}`}function p(E,x,R,q,z){const W=q.fog,K=z.geometry,G=E.isMeshStandardMaterial?q.environment:null,Q=(E.isMeshStandardMaterial?t:e).get(E.envMap||G),H=Q&&Q.mapping===Rs?Q.image.height:null,re=_[E.type];E.precision!==null&&(m=r.getMaxPrecision(E.precision),m!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",m,"instead."));const ue=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,ge=ue!==void 0?ue.length:0;let Le=0;K.morphAttributes.position!==void 0&&(Le=1),K.morphAttributes.normal!==void 0&&(Le=2),K.morphAttributes.color!==void 0&&(Le=3);let Je,X,ee,me;if(re){const je=en[re];Je=je.vertexShader,X=je.fragmentShader}else Je=E.vertexShader,X=E.fragmentShader,c.update(E),ee=c.getVertexShaderID(E),me=c.getFragmentShaderID(E);const se=n.getRenderTarget(),ye=n.state.buffers.depth.getReversed(),Ce=z.isInstancedMesh===!0,Ue=z.isBatchedMesh===!0,st=!!E.map,ze=!!E.matcap,ct=!!Q,w=!!E.aoMap,Ft=!!E.lightMap,Fe=!!E.bumpMap,Oe=!!E.normalMap,ve=!!E.displacementMap,it=!!E.emissiveMap,xe=!!E.metalnessMap,M=!!E.roughnessMap,g=E.anisotropy>0,N=E.clearcoat>0,Y=E.dispersion>0,j=E.iridescence>0,V=E.sheen>0,_e=E.transmission>0,oe=g&&!!E.anisotropyMap,fe=N&&!!E.clearcoatMap,ke=N&&!!E.clearcoatNormalMap,J=N&&!!E.clearcoatRoughnessMap,de=j&&!!E.iridescenceMap,Me=j&&!!E.iridescenceThicknessMap,be=V&&!!E.sheenColorMap,he=V&&!!E.sheenRoughnessMap,Be=!!E.specularMap,De=!!E.specularColorMap,nt=!!E.specularIntensityMap,C=_e&&!!E.transmissionMap,ne=_e&&!!E.thicknessMap,k=!!E.gradientMap,$=!!E.alphaMap,ce=E.alphaTest>0,ae=!!E.alphaHash,Pe=!!E.extensions;let ot=Ln;E.toneMapped&&(se===null||se.isXRRenderTarget===!0)&&(ot=n.toneMapping);const xt={shaderID:re,shaderType:E.type,shaderName:E.name,vertexShader:Je,fragmentShader:X,defines:E.defines,customVertexShaderID:ee,customFragmentShaderID:me,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:m,batching:Ue,batchingColor:Ue&&z._colorsTexture!==null,instancing:Ce,instancingColor:Ce&&z.instanceColor!==null,instancingMorph:Ce&&z.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:se===null?n.outputColorSpace:se.isXRRenderTarget===!0?se.texture.colorSpace:Vi,alphaToCoverage:!!E.alphaToCoverage,map:st,matcap:ze,envMap:ct,envMapMode:ct&&Q.mapping,envMapCubeUVHeight:H,aoMap:w,lightMap:Ft,bumpMap:Fe,normalMap:Oe,displacementMap:h&&ve,emissiveMap:it,normalMapObjectSpace:Oe&&E.normalMapType===r_,normalMapTangentSpace:Oe&&E.normalMapType===i_,metalnessMap:xe,roughnessMap:M,anisotropy:g,anisotropyMap:oe,clearcoat:N,clearcoatMap:fe,clearcoatNormalMap:ke,clearcoatRoughnessMap:J,dispersion:Y,iridescence:j,iridescenceMap:de,iridescenceThicknessMap:Me,sheen:V,sheenColorMap:be,sheenRoughnessMap:he,specularMap:Be,specularColorMap:De,specularIntensityMap:nt,transmission:_e,transmissionMap:C,thicknessMap:ne,gradientMap:k,opaque:E.transparent===!1&&E.blending===Di&&E.alphaToCoverage===!1,alphaMap:$,alphaTest:ce,alphaHash:ae,combine:E.combine,mapUv:st&&S(E.map.channel),aoMapUv:w&&S(E.aoMap.channel),lightMapUv:Ft&&S(E.lightMap.channel),bumpMapUv:Fe&&S(E.bumpMap.channel),normalMapUv:Oe&&S(E.normalMap.channel),displacementMapUv:ve&&S(E.displacementMap.channel),emissiveMapUv:it&&S(E.emissiveMap.channel),metalnessMapUv:xe&&S(E.metalnessMap.channel),roughnessMapUv:M&&S(E.roughnessMap.channel),anisotropyMapUv:oe&&S(E.anisotropyMap.channel),clearcoatMapUv:fe&&S(E.clearcoatMap.channel),clearcoatNormalMapUv:ke&&S(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:J&&S(E.clearcoatRoughnessMap.channel),iridescenceMapUv:de&&S(E.iridescenceMap.channel),iridescenceThicknessMapUv:Me&&S(E.iridescenceThicknessMap.channel),sheenColorMapUv:be&&S(E.sheenColorMap.channel),sheenRoughnessMapUv:he&&S(E.sheenRoughnessMap.channel),specularMapUv:Be&&S(E.specularMap.channel),specularColorMapUv:De&&S(E.specularColorMap.channel),specularIntensityMapUv:nt&&S(E.specularIntensityMap.channel),transmissionMapUv:C&&S(E.transmissionMap.channel),thicknessMapUv:ne&&S(E.thicknessMap.channel),alphaMapUv:$&&S(E.alphaMap.channel),vertexTangents:!!K.attributes.tangent&&(Oe||g),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,pointsUvs:z.isPoints===!0&&!!K.attributes.uv&&(st||$),fog:!!W,useFog:E.fog===!0,fogExp2:!!W&&W.isFogExp2,flatShading:E.flatShading===!0,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:f,reverseDepthBuffer:ye,skinning:z.isSkinnedMesh===!0,morphTargets:K.morphAttributes.position!==void 0,morphNormals:K.morphAttributes.normal!==void 0,morphColors:K.morphAttributes.color!==void 0,morphTargetsCount:ge,morphTextureStride:Le,numDirLights:x.directional.length,numPointLights:x.point.length,numSpotLights:x.spot.length,numSpotLightMaps:x.spotLightMap.length,numRectAreaLights:x.rectArea.length,numHemiLights:x.hemi.length,numDirLightShadows:x.directionalShadowMap.length,numPointLightShadows:x.pointShadowMap.length,numSpotLightShadows:x.spotShadowMap.length,numSpotLightShadowsWithMaps:x.numSpotLightShadowsWithMaps,numLightProbes:x.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:E.dithering,shadowMapEnabled:n.shadowMap.enabled&&R.length>0,shadowMapType:n.shadowMap.type,toneMapping:ot,decodeVideoTexture:st&&E.map.isVideoTexture===!0&&We.getTransfer(E.map.colorSpace)===Ze,decodeVideoTextureEmissive:it&&E.emissiveMap.isVideoTexture===!0&&We.getTransfer(E.emissiveMap.colorSpace)===Ze,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===_n,flipSided:E.side===Rt,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:Pe&&E.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Pe&&E.extensions.multiDraw===!0||Ue)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return xt.vertexUv1s=l.has(1),xt.vertexUv2s=l.has(2),xt.vertexUv3s=l.has(3),l.clear(),xt}function d(E){const x=[];if(E.shaderID?x.push(E.shaderID):(x.push(E.customVertexShaderID),x.push(E.customFragmentShaderID)),E.defines!==void 0)for(const R in E.defines)x.push(R),x.push(E.defines[R]);return E.isRawShaderMaterial===!1&&(b(x,E),T(x,E),x.push(n.outputColorSpace)),x.push(E.customProgramCacheKey),x.join()}function b(E,x){E.push(x.precision),E.push(x.outputColorSpace),E.push(x.envMapMode),E.push(x.envMapCubeUVHeight),E.push(x.mapUv),E.push(x.alphaMapUv),E.push(x.lightMapUv),E.push(x.aoMapUv),E.push(x.bumpMapUv),E.push(x.normalMapUv),E.push(x.displacementMapUv),E.push(x.emissiveMapUv),E.push(x.metalnessMapUv),E.push(x.roughnessMapUv),E.push(x.anisotropyMapUv),E.push(x.clearcoatMapUv),E.push(x.clearcoatNormalMapUv),E.push(x.clearcoatRoughnessMapUv),E.push(x.iridescenceMapUv),E.push(x.iridescenceThicknessMapUv),E.push(x.sheenColorMapUv),E.push(x.sheenRoughnessMapUv),E.push(x.specularMapUv),E.push(x.specularColorMapUv),E.push(x.specularIntensityMapUv),E.push(x.transmissionMapUv),E.push(x.thicknessMapUv),E.push(x.combine),E.push(x.fogExp2),E.push(x.sizeAttenuation),E.push(x.morphTargetsCount),E.push(x.morphAttributeCount),E.push(x.numDirLights),E.push(x.numPointLights),E.push(x.numSpotLights),E.push(x.numSpotLightMaps),E.push(x.numHemiLights),E.push(x.numRectAreaLights),E.push(x.numDirLightShadows),E.push(x.numPointLightShadows),E.push(x.numSpotLightShadows),E.push(x.numSpotLightShadowsWithMaps),E.push(x.numLightProbes),E.push(x.shadowMapType),E.push(x.toneMapping),E.push(x.numClippingPlanes),E.push(x.numClipIntersection),E.push(x.depthPacking)}function T(E,x){a.disableAll(),x.supportsVertexTextures&&a.enable(0),x.instancing&&a.enable(1),x.instancingColor&&a.enable(2),x.instancingMorph&&a.enable(3),x.matcap&&a.enable(4),x.envMap&&a.enable(5),x.normalMapObjectSpace&&a.enable(6),x.normalMapTangentSpace&&a.enable(7),x.clearcoat&&a.enable(8),x.iridescence&&a.enable(9),x.alphaTest&&a.enable(10),x.vertexColors&&a.enable(11),x.vertexAlphas&&a.enable(12),x.vertexUv1s&&a.enable(13),x.vertexUv2s&&a.enable(14),x.vertexUv3s&&a.enable(15),x.vertexTangents&&a.enable(16),x.anisotropy&&a.enable(17),x.alphaHash&&a.enable(18),x.batching&&a.enable(19),x.dispersion&&a.enable(20),x.batchingColor&&a.enable(21),E.push(a.mask),a.disableAll(),x.fog&&a.enable(0),x.useFog&&a.enable(1),x.flatShading&&a.enable(2),x.logarithmicDepthBuffer&&a.enable(3),x.reverseDepthBuffer&&a.enable(4),x.skinning&&a.enable(5),x.morphTargets&&a.enable(6),x.morphNormals&&a.enable(7),x.morphColors&&a.enable(8),x.premultipliedAlpha&&a.enable(9),x.shadowMapEnabled&&a.enable(10),x.doubleSided&&a.enable(11),x.flipSided&&a.enable(12),x.useDepthPacking&&a.enable(13),x.dithering&&a.enable(14),x.transmission&&a.enable(15),x.sheen&&a.enable(16),x.opaque&&a.enable(17),x.pointsUvs&&a.enable(18),x.decodeVideoTexture&&a.enable(19),x.decodeVideoTextureEmissive&&a.enable(20),x.alphaToCoverage&&a.enable(21),E.push(a.mask)}function y(E){const x=_[E.type];let R;if(x){const q=en[x];R=U_.clone(q.uniforms)}else R=E.uniforms;return R}function L(E,x){let R;for(let q=0,z=u.length;q<z;q++){const W=u[q];if(W.cacheKey===x){R=W,++R.usedTimes;break}}return R===void 0&&(R=new nS(n,x,E,s),u.push(R)),R}function A(E){if(--E.usedTimes===0){const x=u.indexOf(E);u[x]=u[u.length-1],u.pop(),E.destroy()}}function P(E){c.remove(E)}function U(){c.dispose()}return{getParameters:p,getProgramCacheKey:d,getUniforms:y,acquireProgram:L,releaseProgram:A,releaseShaderCache:P,programs:u,dispose:U}}function aS(){let n=new WeakMap;function e(o){return n.has(o)}function t(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function r(o,a,c){n.get(o)[a]=c}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function cS(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function Pl(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Dl(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function o(f,h,m,_,S,p){let d=n[e];return d===void 0?(d={id:f.id,object:f,geometry:h,material:m,groupOrder:_,renderOrder:f.renderOrder,z:S,group:p},n[e]=d):(d.id=f.id,d.object=f,d.geometry=h,d.material=m,d.groupOrder=_,d.renderOrder=f.renderOrder,d.z=S,d.group=p),e++,d}function a(f,h,m,_,S,p){const d=o(f,h,m,_,S,p);m.transmission>0?i.push(d):m.transparent===!0?r.push(d):t.push(d)}function c(f,h,m,_,S,p){const d=o(f,h,m,_,S,p);m.transmission>0?i.unshift(d):m.transparent===!0?r.unshift(d):t.unshift(d)}function l(f,h){t.length>1&&t.sort(f||cS),i.length>1&&i.sort(h||Pl),r.length>1&&r.sort(h||Pl)}function u(){for(let f=e,h=n.length;f<h;f++){const m=n[f];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:a,unshift:c,finish:u,sort:l}}function lS(){let n=new WeakMap;function e(i,r){const s=n.get(i);let o;return s===void 0?(o=new Dl,n.set(i,[o])):r>=s.length?(o=new Dl,s.push(o)):o=s[r],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function uS(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new O,color:new $e};break;case"SpotLight":t={position:new O,direction:new O,color:new $e,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new O,color:new $e,distance:0,decay:0};break;case"HemisphereLight":t={direction:new O,skyColor:new $e,groundColor:new $e};break;case"RectAreaLight":t={color:new $e,position:new O,halfWidth:new O,halfHeight:new O};break}return n[e.id]=t,t}}}function fS(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new tt};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new tt};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new tt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let dS=0;function hS(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function pS(n){const e=new uS,t=fS(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new O);const r=new O,s=new ut,o=new ut;function a(l){let u=0,f=0,h=0;for(let E=0;E<9;E++)i.probe[E].set(0,0,0);let m=0,_=0,S=0,p=0,d=0,b=0,T=0,y=0,L=0,A=0,P=0;l.sort(hS);for(let E=0,x=l.length;E<x;E++){const R=l[E],q=R.color,z=R.intensity,W=R.distance,K=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)u+=q.r*z,f+=q.g*z,h+=q.b*z;else if(R.isLightProbe){for(let G=0;G<9;G++)i.probe[G].addScaledVector(R.sh.coefficients[G],z);P++}else if(R.isDirectionalLight){const G=e.get(R);if(G.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const Q=R.shadow,H=t.get(R);H.shadowIntensity=Q.intensity,H.shadowBias=Q.bias,H.shadowNormalBias=Q.normalBias,H.shadowRadius=Q.radius,H.shadowMapSize=Q.mapSize,i.directionalShadow[m]=H,i.directionalShadowMap[m]=K,i.directionalShadowMatrix[m]=R.shadow.matrix,b++}i.directional[m]=G,m++}else if(R.isSpotLight){const G=e.get(R);G.position.setFromMatrixPosition(R.matrixWorld),G.color.copy(q).multiplyScalar(z),G.distance=W,G.coneCos=Math.cos(R.angle),G.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),G.decay=R.decay,i.spot[S]=G;const Q=R.shadow;if(R.map&&(i.spotLightMap[L]=R.map,L++,Q.updateMatrices(R),R.castShadow&&A++),i.spotLightMatrix[S]=Q.matrix,R.castShadow){const H=t.get(R);H.shadowIntensity=Q.intensity,H.shadowBias=Q.bias,H.shadowNormalBias=Q.normalBias,H.shadowRadius=Q.radius,H.shadowMapSize=Q.mapSize,i.spotShadow[S]=H,i.spotShadowMap[S]=K,y++}S++}else if(R.isRectAreaLight){const G=e.get(R);G.color.copy(q).multiplyScalar(z),G.halfWidth.set(R.width*.5,0,0),G.halfHeight.set(0,R.height*.5,0),i.rectArea[p]=G,p++}else if(R.isPointLight){const G=e.get(R);if(G.color.copy(R.color).multiplyScalar(R.intensity),G.distance=R.distance,G.decay=R.decay,R.castShadow){const Q=R.shadow,H=t.get(R);H.shadowIntensity=Q.intensity,H.shadowBias=Q.bias,H.shadowNormalBias=Q.normalBias,H.shadowRadius=Q.radius,H.shadowMapSize=Q.mapSize,H.shadowCameraNear=Q.camera.near,H.shadowCameraFar=Q.camera.far,i.pointShadow[_]=H,i.pointShadowMap[_]=K,i.pointShadowMatrix[_]=R.shadow.matrix,T++}i.point[_]=G,_++}else if(R.isHemisphereLight){const G=e.get(R);G.skyColor.copy(R.color).multiplyScalar(z),G.groundColor.copy(R.groundColor).multiplyScalar(z),i.hemi[d]=G,d++}}p>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=te.LTC_FLOAT_1,i.rectAreaLTC2=te.LTC_FLOAT_2):(i.rectAreaLTC1=te.LTC_HALF_1,i.rectAreaLTC2=te.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=f,i.ambient[2]=h;const U=i.hash;(U.directionalLength!==m||U.pointLength!==_||U.spotLength!==S||U.rectAreaLength!==p||U.hemiLength!==d||U.numDirectionalShadows!==b||U.numPointShadows!==T||U.numSpotShadows!==y||U.numSpotMaps!==L||U.numLightProbes!==P)&&(i.directional.length=m,i.spot.length=S,i.rectArea.length=p,i.point.length=_,i.hemi.length=d,i.directionalShadow.length=b,i.directionalShadowMap.length=b,i.pointShadow.length=T,i.pointShadowMap.length=T,i.spotShadow.length=y,i.spotShadowMap.length=y,i.directionalShadowMatrix.length=b,i.pointShadowMatrix.length=T,i.spotLightMatrix.length=y+L-A,i.spotLightMap.length=L,i.numSpotLightShadowsWithMaps=A,i.numLightProbes=P,U.directionalLength=m,U.pointLength=_,U.spotLength=S,U.rectAreaLength=p,U.hemiLength=d,U.numDirectionalShadows=b,U.numPointShadows=T,U.numSpotShadows=y,U.numSpotMaps=L,U.numLightProbes=P,i.version=dS++)}function c(l,u){let f=0,h=0,m=0,_=0,S=0;const p=u.matrixWorldInverse;for(let d=0,b=l.length;d<b;d++){const T=l[d];if(T.isDirectionalLight){const y=i.directional[f];y.direction.setFromMatrixPosition(T.matrixWorld),r.setFromMatrixPosition(T.target.matrixWorld),y.direction.sub(r),y.direction.transformDirection(p),f++}else if(T.isSpotLight){const y=i.spot[m];y.position.setFromMatrixPosition(T.matrixWorld),y.position.applyMatrix4(p),y.direction.setFromMatrixPosition(T.matrixWorld),r.setFromMatrixPosition(T.target.matrixWorld),y.direction.sub(r),y.direction.transformDirection(p),m++}else if(T.isRectAreaLight){const y=i.rectArea[_];y.position.setFromMatrixPosition(T.matrixWorld),y.position.applyMatrix4(p),o.identity(),s.copy(T.matrixWorld),s.premultiply(p),o.extractRotation(s),y.halfWidth.set(T.width*.5,0,0),y.halfHeight.set(0,T.height*.5,0),y.halfWidth.applyMatrix4(o),y.halfHeight.applyMatrix4(o),_++}else if(T.isPointLight){const y=i.point[h];y.position.setFromMatrixPosition(T.matrixWorld),y.position.applyMatrix4(p),h++}else if(T.isHemisphereLight){const y=i.hemi[S];y.direction.setFromMatrixPosition(T.matrixWorld),y.direction.transformDirection(p),S++}}}return{setup:a,setupView:c,state:i}}function Il(n){const e=new pS(n),t=[],i=[];function r(u){l.camera=u,t.length=0,i.length=0}function s(u){t.push(u)}function o(u){i.push(u)}function a(){e.setup(t)}function c(u){e.setupView(t,u)}const l={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:l,setupLights:a,setupLightsView:c,pushLight:s,pushShadow:o}}function mS(n){let e=new WeakMap;function t(r,s=0){const o=e.get(r);let a;return o===void 0?(a=new Il(n),e.set(r,[a])):s>=o.length?(a=new Il(n),o.push(a)):a=o[s],a}function i(){e=new WeakMap}return{get:t,dispose:i}}const _S=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,gS=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function vS(n,e,t){let i=new Vu;const r=new tt,s=new tt,o=new lt,a=new X_({depthPacking:n_}),c=new q_,l={},u=t.maxTextureSize,f={[Fn]:Rt,[Rt]:Fn,[_n]:_n},h=new sn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new tt},radius:{value:4}},vertexShader:_S,fragmentShader:gS}),m=h.clone();m.defines.HORIZONTAL_PASS=1;const _=new yn;_.setAttribute("position",new Nt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const S=new rn(_,h),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=vu;let d=this.type;this.render=function(A,P,U){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||A.length===0)return;const E=n.getRenderTarget(),x=n.getActiveCubeFace(),R=n.getActiveMipmapLevel(),q=n.state;q.setBlending(In),q.buffers.color.setClear(1,1,1,1),q.buffers.depth.setTest(!0),q.setScissorTest(!1);const z=d!==hn&&this.type===hn,W=d===hn&&this.type!==hn;for(let K=0,G=A.length;K<G;K++){const Q=A[K],H=Q.shadow;if(H===void 0){console.warn("THREE.WebGLShadowMap:",Q,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;r.copy(H.mapSize);const re=H.getFrameExtents();if(r.multiply(re),s.copy(H.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/re.x),r.x=s.x*re.x,H.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/re.y),r.y=s.y*re.y,H.mapSize.y=s.y)),H.map===null||z===!0||W===!0){const ge=this.type!==hn?{minFilter:Ct,magFilter:Ct}:{};H.map!==null&&H.map.dispose(),H.map=new On(r.x,r.y,ge),H.map.texture.name=Q.name+".shadowMap",H.camera.updateProjectionMatrix()}n.setRenderTarget(H.map),n.clear();const ue=H.getViewportCount();for(let ge=0;ge<ue;ge++){const Le=H.getViewport(ge);o.set(s.x*Le.x,s.y*Le.y,s.x*Le.z,s.y*Le.w),q.viewport(o),H.updateMatrices(Q,ge),i=H.getFrustum(),y(P,U,H.camera,Q,this.type)}H.isPointLightShadow!==!0&&this.type===hn&&b(H,U),H.needsUpdate=!1}d=this.type,p.needsUpdate=!1,n.setRenderTarget(E,x,R)};function b(A,P){const U=e.update(S);h.defines.VSM_SAMPLES!==A.blurSamples&&(h.defines.VSM_SAMPLES=A.blurSamples,m.defines.VSM_SAMPLES=A.blurSamples,h.needsUpdate=!0,m.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new On(r.x,r.y)),h.uniforms.shadow_pass.value=A.map.texture,h.uniforms.resolution.value=A.mapSize,h.uniforms.radius.value=A.radius,n.setRenderTarget(A.mapPass),n.clear(),n.renderBufferDirect(P,null,U,h,S,null),m.uniforms.shadow_pass.value=A.mapPass.texture,m.uniforms.resolution.value=A.mapSize,m.uniforms.radius.value=A.radius,n.setRenderTarget(A.map),n.clear(),n.renderBufferDirect(P,null,U,m,S,null)}function T(A,P,U,E){let x=null;const R=U.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(R!==void 0)x=R;else if(x=U.isPointLight===!0?c:a,n.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0){const q=x.uuid,z=P.uuid;let W=l[q];W===void 0&&(W={},l[q]=W);let K=W[z];K===void 0&&(K=x.clone(),W[z]=K,P.addEventListener("dispose",L)),x=K}if(x.visible=P.visible,x.wireframe=P.wireframe,E===hn?x.side=P.shadowSide!==null?P.shadowSide:P.side:x.side=P.shadowSide!==null?P.shadowSide:f[P.side],x.alphaMap=P.alphaMap,x.alphaTest=P.alphaTest,x.map=P.map,x.clipShadows=P.clipShadows,x.clippingPlanes=P.clippingPlanes,x.clipIntersection=P.clipIntersection,x.displacementMap=P.displacementMap,x.displacementScale=P.displacementScale,x.displacementBias=P.displacementBias,x.wireframeLinewidth=P.wireframeLinewidth,x.linewidth=P.linewidth,U.isPointLight===!0&&x.isMeshDistanceMaterial===!0){const q=n.properties.get(x);q.light=U}return x}function y(A,P,U,E,x){if(A.visible===!1)return;if(A.layers.test(P.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&x===hn)&&(!A.frustumCulled||i.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(U.matrixWorldInverse,A.matrixWorld);const z=e.update(A),W=A.material;if(Array.isArray(W)){const K=z.groups;for(let G=0,Q=K.length;G<Q;G++){const H=K[G],re=W[H.materialIndex];if(re&&re.visible){const ue=T(A,re,E,x);A.onBeforeShadow(n,A,P,U,z,ue,H),n.renderBufferDirect(U,null,z,ue,A,H),A.onAfterShadow(n,A,P,U,z,ue,H)}}}else if(W.visible){const K=T(A,W,E,x);A.onBeforeShadow(n,A,P,U,z,K,null),n.renderBufferDirect(U,null,z,K,A,null),A.onAfterShadow(n,A,P,U,z,K,null)}}const q=A.children;for(let z=0,W=q.length;z<W;z++)y(q[z],P,U,E,x)}function L(A){A.target.removeEventListener("dispose",L);for(const U in l){const E=l[U],x=A.target.uuid;x in E&&(E[x].dispose(),delete E[x])}}}const xS={[Uo]:No,[Fo]:zo,[Oo]:ko,[Bi]:Bo,[No]:Uo,[zo]:Fo,[ko]:Oo,[Bo]:Bi};function SS(n,e){function t(){let C=!1;const ne=new lt;let k=null;const $=new lt(0,0,0,0);return{setMask:function(ce){k!==ce&&!C&&(n.colorMask(ce,ce,ce,ce),k=ce)},setLocked:function(ce){C=ce},setClear:function(ce,ae,Pe,ot,xt){xt===!0&&(ce*=ot,ae*=ot,Pe*=ot),ne.set(ce,ae,Pe,ot),$.equals(ne)===!1&&(n.clearColor(ce,ae,Pe,ot),$.copy(ne))},reset:function(){C=!1,k=null,$.set(-1,0,0,0)}}}function i(){let C=!1,ne=!1,k=null,$=null,ce=null;return{setReversed:function(ae){if(ne!==ae){const Pe=e.get("EXT_clip_control");ne?Pe.clipControlEXT(Pe.LOWER_LEFT_EXT,Pe.ZERO_TO_ONE_EXT):Pe.clipControlEXT(Pe.LOWER_LEFT_EXT,Pe.NEGATIVE_ONE_TO_ONE_EXT);const ot=ce;ce=null,this.setClear(ot)}ne=ae},getReversed:function(){return ne},setTest:function(ae){ae?se(n.DEPTH_TEST):ye(n.DEPTH_TEST)},setMask:function(ae){k!==ae&&!C&&(n.depthMask(ae),k=ae)},setFunc:function(ae){if(ne&&(ae=xS[ae]),$!==ae){switch(ae){case Uo:n.depthFunc(n.NEVER);break;case No:n.depthFunc(n.ALWAYS);break;case Fo:n.depthFunc(n.LESS);break;case Bi:n.depthFunc(n.LEQUAL);break;case Oo:n.depthFunc(n.EQUAL);break;case Bo:n.depthFunc(n.GEQUAL);break;case zo:n.depthFunc(n.GREATER);break;case ko:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}$=ae}},setLocked:function(ae){C=ae},setClear:function(ae){ce!==ae&&(ne&&(ae=1-ae),n.clearDepth(ae),ce=ae)},reset:function(){C=!1,k=null,$=null,ce=null,ne=!1}}}function r(){let C=!1,ne=null,k=null,$=null,ce=null,ae=null,Pe=null,ot=null,xt=null;return{setTest:function(je){C||(je?se(n.STENCIL_TEST):ye(n.STENCIL_TEST))},setMask:function(je){ne!==je&&!C&&(n.stencilMask(je),ne=je)},setFunc:function(je,Yt,an){(k!==je||$!==Yt||ce!==an)&&(n.stencilFunc(je,Yt,an),k=je,$=Yt,ce=an)},setOp:function(je,Yt,an){(ae!==je||Pe!==Yt||ot!==an)&&(n.stencilOp(je,Yt,an),ae=je,Pe=Yt,ot=an)},setLocked:function(je){C=je},setClear:function(je){xt!==je&&(n.clearStencil(je),xt=je)},reset:function(){C=!1,ne=null,k=null,$=null,ce=null,ae=null,Pe=null,ot=null,xt=null}}}const s=new t,o=new i,a=new r,c=new WeakMap,l=new WeakMap;let u={},f={},h=new WeakMap,m=[],_=null,S=!1,p=null,d=null,b=null,T=null,y=null,L=null,A=null,P=new $e(0,0,0),U=0,E=!1,x=null,R=null,q=null,z=null,W=null;const K=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let G=!1,Q=0;const H=n.getParameter(n.VERSION);H.indexOf("WebGL")!==-1?(Q=parseFloat(/^WebGL (\d)/.exec(H)[1]),G=Q>=1):H.indexOf("OpenGL ES")!==-1&&(Q=parseFloat(/^OpenGL ES (\d)/.exec(H)[1]),G=Q>=2);let re=null,ue={};const ge=n.getParameter(n.SCISSOR_BOX),Le=n.getParameter(n.VIEWPORT),Je=new lt().fromArray(ge),X=new lt().fromArray(Le);function ee(C,ne,k,$){const ce=new Uint8Array(4),ae=n.createTexture();n.bindTexture(C,ae),n.texParameteri(C,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(C,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Pe=0;Pe<k;Pe++)C===n.TEXTURE_3D||C===n.TEXTURE_2D_ARRAY?n.texImage3D(ne,0,n.RGBA,1,1,$,0,n.RGBA,n.UNSIGNED_BYTE,ce):n.texImage2D(ne+Pe,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,ce);return ae}const me={};me[n.TEXTURE_2D]=ee(n.TEXTURE_2D,n.TEXTURE_2D,1),me[n.TEXTURE_CUBE_MAP]=ee(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),me[n.TEXTURE_2D_ARRAY]=ee(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),me[n.TEXTURE_3D]=ee(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),se(n.DEPTH_TEST),o.setFunc(Bi),Fe(!1),Oe(Fc),se(n.CULL_FACE),w(In);function se(C){u[C]!==!0&&(n.enable(C),u[C]=!0)}function ye(C){u[C]!==!1&&(n.disable(C),u[C]=!1)}function Ce(C,ne){return f[C]!==ne?(n.bindFramebuffer(C,ne),f[C]=ne,C===n.DRAW_FRAMEBUFFER&&(f[n.FRAMEBUFFER]=ne),C===n.FRAMEBUFFER&&(f[n.DRAW_FRAMEBUFFER]=ne),!0):!1}function Ue(C,ne){let k=m,$=!1;if(C){k=h.get(ne),k===void 0&&(k=[],h.set(ne,k));const ce=C.textures;if(k.length!==ce.length||k[0]!==n.COLOR_ATTACHMENT0){for(let ae=0,Pe=ce.length;ae<Pe;ae++)k[ae]=n.COLOR_ATTACHMENT0+ae;k.length=ce.length,$=!0}}else k[0]!==n.BACK&&(k[0]=n.BACK,$=!0);$&&n.drawBuffers(k)}function st(C){return _!==C?(n.useProgram(C),_=C,!0):!1}const ze={[jn]:n.FUNC_ADD,[wm]:n.FUNC_SUBTRACT,[Am]:n.FUNC_REVERSE_SUBTRACT};ze[Rm]=n.MIN,ze[Cm]=n.MAX;const ct={[Pm]:n.ZERO,[Dm]:n.ONE,[Im]:n.SRC_COLOR,[Io]:n.SRC_ALPHA,[Bm]:n.SRC_ALPHA_SATURATE,[Fm]:n.DST_COLOR,[Um]:n.DST_ALPHA,[Lm]:n.ONE_MINUS_SRC_COLOR,[Lo]:n.ONE_MINUS_SRC_ALPHA,[Om]:n.ONE_MINUS_DST_COLOR,[Nm]:n.ONE_MINUS_DST_ALPHA,[zm]:n.CONSTANT_COLOR,[km]:n.ONE_MINUS_CONSTANT_COLOR,[Hm]:n.CONSTANT_ALPHA,[Gm]:n.ONE_MINUS_CONSTANT_ALPHA};function w(C,ne,k,$,ce,ae,Pe,ot,xt,je){if(C===In){S===!0&&(ye(n.BLEND),S=!1);return}if(S===!1&&(se(n.BLEND),S=!0),C!==bm){if(C!==p||je!==E){if((d!==jn||y!==jn)&&(n.blendEquation(n.FUNC_ADD),d=jn,y=jn),je)switch(C){case Di:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Oc:n.blendFunc(n.ONE,n.ONE);break;case Bc:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case zc:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",C);break}else switch(C){case Di:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Oc:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case Bc:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case zc:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",C);break}b=null,T=null,L=null,A=null,P.set(0,0,0),U=0,p=C,E=je}return}ce=ce||ne,ae=ae||k,Pe=Pe||$,(ne!==d||ce!==y)&&(n.blendEquationSeparate(ze[ne],ze[ce]),d=ne,y=ce),(k!==b||$!==T||ae!==L||Pe!==A)&&(n.blendFuncSeparate(ct[k],ct[$],ct[ae],ct[Pe]),b=k,T=$,L=ae,A=Pe),(ot.equals(P)===!1||xt!==U)&&(n.blendColor(ot.r,ot.g,ot.b,xt),P.copy(ot),U=xt),p=C,E=!1}function Ft(C,ne){C.side===_n?ye(n.CULL_FACE):se(n.CULL_FACE);let k=C.side===Rt;ne&&(k=!k),Fe(k),C.blending===Di&&C.transparent===!1?w(In):w(C.blending,C.blendEquation,C.blendSrc,C.blendDst,C.blendEquationAlpha,C.blendSrcAlpha,C.blendDstAlpha,C.blendColor,C.blendAlpha,C.premultipliedAlpha),o.setFunc(C.depthFunc),o.setTest(C.depthTest),o.setMask(C.depthWrite),s.setMask(C.colorWrite);const $=C.stencilWrite;a.setTest($),$&&(a.setMask(C.stencilWriteMask),a.setFunc(C.stencilFunc,C.stencilRef,C.stencilFuncMask),a.setOp(C.stencilFail,C.stencilZFail,C.stencilZPass)),it(C.polygonOffset,C.polygonOffsetFactor,C.polygonOffsetUnits),C.alphaToCoverage===!0?se(n.SAMPLE_ALPHA_TO_COVERAGE):ye(n.SAMPLE_ALPHA_TO_COVERAGE)}function Fe(C){x!==C&&(C?n.frontFace(n.CW):n.frontFace(n.CCW),x=C)}function Oe(C){C!==Mm?(se(n.CULL_FACE),C!==R&&(C===Fc?n.cullFace(n.BACK):C===ym?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):ye(n.CULL_FACE),R=C}function ve(C){C!==q&&(G&&n.lineWidth(C),q=C)}function it(C,ne,k){C?(se(n.POLYGON_OFFSET_FILL),(z!==ne||W!==k)&&(n.polygonOffset(ne,k),z=ne,W=k)):ye(n.POLYGON_OFFSET_FILL)}function xe(C){C?se(n.SCISSOR_TEST):ye(n.SCISSOR_TEST)}function M(C){C===void 0&&(C=n.TEXTURE0+K-1),re!==C&&(n.activeTexture(C),re=C)}function g(C,ne,k){k===void 0&&(re===null?k=n.TEXTURE0+K-1:k=re);let $=ue[k];$===void 0&&($={type:void 0,texture:void 0},ue[k]=$),($.type!==C||$.texture!==ne)&&(re!==k&&(n.activeTexture(k),re=k),n.bindTexture(C,ne||me[C]),$.type=C,$.texture=ne)}function N(){const C=ue[re];C!==void 0&&C.type!==void 0&&(n.bindTexture(C.type,null),C.type=void 0,C.texture=void 0)}function Y(){try{n.compressedTexImage2D.apply(n,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function j(){try{n.compressedTexImage3D.apply(n,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function V(){try{n.texSubImage2D.apply(n,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function _e(){try{n.texSubImage3D.apply(n,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function oe(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function fe(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function ke(){try{n.texStorage2D.apply(n,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function J(){try{n.texStorage3D.apply(n,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function de(){try{n.texImage2D.apply(n,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function Me(){try{n.texImage3D.apply(n,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function be(C){Je.equals(C)===!1&&(n.scissor(C.x,C.y,C.z,C.w),Je.copy(C))}function he(C){X.equals(C)===!1&&(n.viewport(C.x,C.y,C.z,C.w),X.copy(C))}function Be(C,ne){let k=l.get(ne);k===void 0&&(k=new WeakMap,l.set(ne,k));let $=k.get(C);$===void 0&&($=n.getUniformBlockIndex(ne,C.name),k.set(C,$))}function De(C,ne){const $=l.get(ne).get(C);c.get(ne)!==$&&(n.uniformBlockBinding(ne,$,C.__bindingPointIndex),c.set(ne,$))}function nt(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),u={},re=null,ue={},f={},h=new WeakMap,m=[],_=null,S=!1,p=null,d=null,b=null,T=null,y=null,L=null,A=null,P=new $e(0,0,0),U=0,E=!1,x=null,R=null,q=null,z=null,W=null,Je.set(0,0,n.canvas.width,n.canvas.height),X.set(0,0,n.canvas.width,n.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:se,disable:ye,bindFramebuffer:Ce,drawBuffers:Ue,useProgram:st,setBlending:w,setMaterial:Ft,setFlipSided:Fe,setCullFace:Oe,setLineWidth:ve,setPolygonOffset:it,setScissorTest:xe,activeTexture:M,bindTexture:g,unbindTexture:N,compressedTexImage2D:Y,compressedTexImage3D:j,texImage2D:de,texImage3D:Me,updateUBOMapping:Be,uniformBlockBinding:De,texStorage2D:ke,texStorage3D:J,texSubImage2D:V,texSubImage3D:_e,compressedTexSubImage2D:oe,compressedTexSubImage3D:fe,scissor:be,viewport:he,reset:nt}}function ES(n,e,t,i,r,s,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new tt,u=new WeakMap;let f;const h=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(M,g){return m?new OffscreenCanvas(M,g):xs("canvas")}function S(M,g,N){let Y=1;const j=xe(M);if((j.width>N||j.height>N)&&(Y=N/Math.max(j.width,j.height)),Y<1)if(typeof HTMLImageElement<"u"&&M instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&M instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&M instanceof ImageBitmap||typeof VideoFrame<"u"&&M instanceof VideoFrame){const V=Math.floor(Y*j.width),_e=Math.floor(Y*j.height);f===void 0&&(f=_(V,_e));const oe=g?_(V,_e):f;return oe.width=V,oe.height=_e,oe.getContext("2d").drawImage(M,0,0,V,_e),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+j.width+"x"+j.height+") to ("+V+"x"+_e+")."),oe}else return"data"in M&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+j.width+"x"+j.height+")."),M;return M}function p(M){return M.generateMipmaps}function d(M){n.generateMipmap(M)}function b(M){return M.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:M.isWebGL3DRenderTarget?n.TEXTURE_3D:M.isWebGLArrayRenderTarget||M.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function T(M,g,N,Y,j=!1){if(M!==null){if(n[M]!==void 0)return n[M];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+M+"'")}let V=g;if(g===n.RED&&(N===n.FLOAT&&(V=n.R32F),N===n.HALF_FLOAT&&(V=n.R16F),N===n.UNSIGNED_BYTE&&(V=n.R8)),g===n.RED_INTEGER&&(N===n.UNSIGNED_BYTE&&(V=n.R8UI),N===n.UNSIGNED_SHORT&&(V=n.R16UI),N===n.UNSIGNED_INT&&(V=n.R32UI),N===n.BYTE&&(V=n.R8I),N===n.SHORT&&(V=n.R16I),N===n.INT&&(V=n.R32I)),g===n.RG&&(N===n.FLOAT&&(V=n.RG32F),N===n.HALF_FLOAT&&(V=n.RG16F),N===n.UNSIGNED_BYTE&&(V=n.RG8)),g===n.RG_INTEGER&&(N===n.UNSIGNED_BYTE&&(V=n.RG8UI),N===n.UNSIGNED_SHORT&&(V=n.RG16UI),N===n.UNSIGNED_INT&&(V=n.RG32UI),N===n.BYTE&&(V=n.RG8I),N===n.SHORT&&(V=n.RG16I),N===n.INT&&(V=n.RG32I)),g===n.RGB_INTEGER&&(N===n.UNSIGNED_BYTE&&(V=n.RGB8UI),N===n.UNSIGNED_SHORT&&(V=n.RGB16UI),N===n.UNSIGNED_INT&&(V=n.RGB32UI),N===n.BYTE&&(V=n.RGB8I),N===n.SHORT&&(V=n.RGB16I),N===n.INT&&(V=n.RGB32I)),g===n.RGBA_INTEGER&&(N===n.UNSIGNED_BYTE&&(V=n.RGBA8UI),N===n.UNSIGNED_SHORT&&(V=n.RGBA16UI),N===n.UNSIGNED_INT&&(V=n.RGBA32UI),N===n.BYTE&&(V=n.RGBA8I),N===n.SHORT&&(V=n.RGBA16I),N===n.INT&&(V=n.RGBA32I)),g===n.RGB&&N===n.UNSIGNED_INT_5_9_9_9_REV&&(V=n.RGB9_E5),g===n.RGBA){const _e=j?_s:We.getTransfer(Y);N===n.FLOAT&&(V=n.RGBA32F),N===n.HALF_FLOAT&&(V=n.RGBA16F),N===n.UNSIGNED_BYTE&&(V=_e===Ze?n.SRGB8_ALPHA8:n.RGBA8),N===n.UNSIGNED_SHORT_4_4_4_4&&(V=n.RGBA4),N===n.UNSIGNED_SHORT_5_5_5_1&&(V=n.RGB5_A1)}return(V===n.R16F||V===n.R32F||V===n.RG16F||V===n.RG32F||V===n.RGBA16F||V===n.RGBA32F)&&e.get("EXT_color_buffer_float"),V}function y(M,g){let N;return M?g===null||g===ci||g===Hi?N=n.DEPTH24_STENCIL8:g===nn?N=n.DEPTH32F_STENCIL8:g===cr&&(N=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):g===null||g===ci||g===Hi?N=n.DEPTH_COMPONENT24:g===nn?N=n.DEPTH_COMPONENT32F:g===cr&&(N=n.DEPTH_COMPONENT16),N}function L(M,g){return p(M)===!0||M.isFramebufferTexture&&M.minFilter!==Ct&&M.minFilter!==Wt?Math.log2(Math.max(g.width,g.height))+1:M.mipmaps!==void 0&&M.mipmaps.length>0?M.mipmaps.length:M.isCompressedTexture&&Array.isArray(M.image)?g.mipmaps.length:1}function A(M){const g=M.target;g.removeEventListener("dispose",A),U(g),g.isVideoTexture&&u.delete(g)}function P(M){const g=M.target;g.removeEventListener("dispose",P),x(g)}function U(M){const g=i.get(M);if(g.__webglInit===void 0)return;const N=M.source,Y=h.get(N);if(Y){const j=Y[g.__cacheKey];j.usedTimes--,j.usedTimes===0&&E(M),Object.keys(Y).length===0&&h.delete(N)}i.remove(M)}function E(M){const g=i.get(M);n.deleteTexture(g.__webglTexture);const N=M.source,Y=h.get(N);delete Y[g.__cacheKey],o.memory.textures--}function x(M){const g=i.get(M);if(M.depthTexture&&(M.depthTexture.dispose(),i.remove(M.depthTexture)),M.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(g.__webglFramebuffer[Y]))for(let j=0;j<g.__webglFramebuffer[Y].length;j++)n.deleteFramebuffer(g.__webglFramebuffer[Y][j]);else n.deleteFramebuffer(g.__webglFramebuffer[Y]);g.__webglDepthbuffer&&n.deleteRenderbuffer(g.__webglDepthbuffer[Y])}else{if(Array.isArray(g.__webglFramebuffer))for(let Y=0;Y<g.__webglFramebuffer.length;Y++)n.deleteFramebuffer(g.__webglFramebuffer[Y]);else n.deleteFramebuffer(g.__webglFramebuffer);if(g.__webglDepthbuffer&&n.deleteRenderbuffer(g.__webglDepthbuffer),g.__webglMultisampledFramebuffer&&n.deleteFramebuffer(g.__webglMultisampledFramebuffer),g.__webglColorRenderbuffer)for(let Y=0;Y<g.__webglColorRenderbuffer.length;Y++)g.__webglColorRenderbuffer[Y]&&n.deleteRenderbuffer(g.__webglColorRenderbuffer[Y]);g.__webglDepthRenderbuffer&&n.deleteRenderbuffer(g.__webglDepthRenderbuffer)}const N=M.textures;for(let Y=0,j=N.length;Y<j;Y++){const V=i.get(N[Y]);V.__webglTexture&&(n.deleteTexture(V.__webglTexture),o.memory.textures--),i.remove(N[Y])}i.remove(M)}let R=0;function q(){R=0}function z(){const M=R;return M>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+M+" texture units while this GPU supports only "+r.maxTextures),R+=1,M}function W(M){const g=[];return g.push(M.wrapS),g.push(M.wrapT),g.push(M.wrapR||0),g.push(M.magFilter),g.push(M.minFilter),g.push(M.anisotropy),g.push(M.internalFormat),g.push(M.format),g.push(M.type),g.push(M.generateMipmaps),g.push(M.premultiplyAlpha),g.push(M.flipY),g.push(M.unpackAlignment),g.push(M.colorSpace),g.join()}function K(M,g){const N=i.get(M);if(M.isVideoTexture&&ve(M),M.isRenderTargetTexture===!1&&M.version>0&&N.__version!==M.version){const Y=M.image;if(Y===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{X(N,M,g);return}}t.bindTexture(n.TEXTURE_2D,N.__webglTexture,n.TEXTURE0+g)}function G(M,g){const N=i.get(M);if(M.version>0&&N.__version!==M.version){X(N,M,g);return}t.bindTexture(n.TEXTURE_2D_ARRAY,N.__webglTexture,n.TEXTURE0+g)}function Q(M,g){const N=i.get(M);if(M.version>0&&N.__version!==M.version){X(N,M,g);return}t.bindTexture(n.TEXTURE_3D,N.__webglTexture,n.TEXTURE0+g)}function H(M,g){const N=i.get(M);if(M.version>0&&N.__version!==M.version){ee(N,M,g);return}t.bindTexture(n.TEXTURE_CUBE_MAP,N.__webglTexture,n.TEXTURE0+g)}const re={[ai]:n.REPEAT,[Zn]:n.CLAMP_TO_EDGE,[Vo]:n.MIRRORED_REPEAT},ue={[Ct]:n.NEAREST,[Jm]:n.NEAREST_MIPMAP_NEAREST,[Cr]:n.NEAREST_MIPMAP_LINEAR,[Wt]:n.LINEAR,[zs]:n.LINEAR_MIPMAP_NEAREST,[Jn]:n.LINEAR_MIPMAP_LINEAR},ge={[s_]:n.NEVER,[f_]:n.ALWAYS,[o_]:n.LESS,[Du]:n.LEQUAL,[a_]:n.EQUAL,[u_]:n.GEQUAL,[c_]:n.GREATER,[l_]:n.NOTEQUAL};function Le(M,g){if(g.type===nn&&e.has("OES_texture_float_linear")===!1&&(g.magFilter===Wt||g.magFilter===zs||g.magFilter===Cr||g.magFilter===Jn||g.minFilter===Wt||g.minFilter===zs||g.minFilter===Cr||g.minFilter===Jn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(M,n.TEXTURE_WRAP_S,re[g.wrapS]),n.texParameteri(M,n.TEXTURE_WRAP_T,re[g.wrapT]),(M===n.TEXTURE_3D||M===n.TEXTURE_2D_ARRAY)&&n.texParameteri(M,n.TEXTURE_WRAP_R,re[g.wrapR]),n.texParameteri(M,n.TEXTURE_MAG_FILTER,ue[g.magFilter]),n.texParameteri(M,n.TEXTURE_MIN_FILTER,ue[g.minFilter]),g.compareFunction&&(n.texParameteri(M,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(M,n.TEXTURE_COMPARE_FUNC,ge[g.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(g.magFilter===Ct||g.minFilter!==Cr&&g.minFilter!==Jn||g.type===nn&&e.has("OES_texture_float_linear")===!1)return;if(g.anisotropy>1||i.get(g).__currentAnisotropy){const N=e.get("EXT_texture_filter_anisotropic");n.texParameterf(M,N.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(g.anisotropy,r.getMaxAnisotropy())),i.get(g).__currentAnisotropy=g.anisotropy}}}function Je(M,g){let N=!1;M.__webglInit===void 0&&(M.__webglInit=!0,g.addEventListener("dispose",A));const Y=g.source;let j=h.get(Y);j===void 0&&(j={},h.set(Y,j));const V=W(g);if(V!==M.__cacheKey){j[V]===void 0&&(j[V]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,N=!0),j[V].usedTimes++;const _e=j[M.__cacheKey];_e!==void 0&&(j[M.__cacheKey].usedTimes--,_e.usedTimes===0&&E(g)),M.__cacheKey=V,M.__webglTexture=j[V].texture}return N}function X(M,g,N){let Y=n.TEXTURE_2D;(g.isDataArrayTexture||g.isCompressedArrayTexture)&&(Y=n.TEXTURE_2D_ARRAY),g.isData3DTexture&&(Y=n.TEXTURE_3D);const j=Je(M,g),V=g.source;t.bindTexture(Y,M.__webglTexture,n.TEXTURE0+N);const _e=i.get(V);if(V.version!==_e.__version||j===!0){t.activeTexture(n.TEXTURE0+N);const oe=We.getPrimaries(We.workingColorSpace),fe=g.colorSpace===Dn?null:We.getPrimaries(g.colorSpace),ke=g.colorSpace===Dn||oe===fe?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,g.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,g.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ke);let J=S(g.image,!1,r.maxTextureSize);J=it(g,J);const de=s.convert(g.format,g.colorSpace),Me=s.convert(g.type);let be=T(g.internalFormat,de,Me,g.colorSpace,g.isVideoTexture);Le(Y,g);let he;const Be=g.mipmaps,De=g.isVideoTexture!==!0,nt=_e.__version===void 0||j===!0,C=V.dataReady,ne=L(g,J);if(g.isDepthTexture)be=y(g.format===Gi,g.type),nt&&(De?t.texStorage2D(n.TEXTURE_2D,1,be,J.width,J.height):t.texImage2D(n.TEXTURE_2D,0,be,J.width,J.height,0,de,Me,null));else if(g.isDataTexture)if(Be.length>0){De&&nt&&t.texStorage2D(n.TEXTURE_2D,ne,be,Be[0].width,Be[0].height);for(let k=0,$=Be.length;k<$;k++)he=Be[k],De?C&&t.texSubImage2D(n.TEXTURE_2D,k,0,0,he.width,he.height,de,Me,he.data):t.texImage2D(n.TEXTURE_2D,k,be,he.width,he.height,0,de,Me,he.data);g.generateMipmaps=!1}else De?(nt&&t.texStorage2D(n.TEXTURE_2D,ne,be,J.width,J.height),C&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,J.width,J.height,de,Me,J.data)):t.texImage2D(n.TEXTURE_2D,0,be,J.width,J.height,0,de,Me,J.data);else if(g.isCompressedTexture)if(g.isCompressedArrayTexture){De&&nt&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ne,be,Be[0].width,Be[0].height,J.depth);for(let k=0,$=Be.length;k<$;k++)if(he=Be[k],g.format!==Xt)if(de!==null)if(De){if(C)if(g.layerUpdates.size>0){const ce=cl(he.width,he.height,g.format,g.type);for(const ae of g.layerUpdates){const Pe=he.data.subarray(ae*ce/he.data.BYTES_PER_ELEMENT,(ae+1)*ce/he.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,k,0,0,ae,he.width,he.height,1,de,Pe)}g.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,k,0,0,0,he.width,he.height,J.depth,de,he.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,k,be,he.width,he.height,J.depth,0,he.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else De?C&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,k,0,0,0,he.width,he.height,J.depth,de,Me,he.data):t.texImage3D(n.TEXTURE_2D_ARRAY,k,be,he.width,he.height,J.depth,0,de,Me,he.data)}else{De&&nt&&t.texStorage2D(n.TEXTURE_2D,ne,be,Be[0].width,Be[0].height);for(let k=0,$=Be.length;k<$;k++)he=Be[k],g.format!==Xt?de!==null?De?C&&t.compressedTexSubImage2D(n.TEXTURE_2D,k,0,0,he.width,he.height,de,he.data):t.compressedTexImage2D(n.TEXTURE_2D,k,be,he.width,he.height,0,he.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):De?C&&t.texSubImage2D(n.TEXTURE_2D,k,0,0,he.width,he.height,de,Me,he.data):t.texImage2D(n.TEXTURE_2D,k,be,he.width,he.height,0,de,Me,he.data)}else if(g.isDataArrayTexture)if(De){if(nt&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ne,be,J.width,J.height,J.depth),C)if(g.layerUpdates.size>0){const k=cl(J.width,J.height,g.format,g.type);for(const $ of g.layerUpdates){const ce=J.data.subarray($*k/J.data.BYTES_PER_ELEMENT,($+1)*k/J.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,$,J.width,J.height,1,de,Me,ce)}g.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,J.width,J.height,J.depth,de,Me,J.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,be,J.width,J.height,J.depth,0,de,Me,J.data);else if(g.isData3DTexture)De?(nt&&t.texStorage3D(n.TEXTURE_3D,ne,be,J.width,J.height,J.depth),C&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,J.width,J.height,J.depth,de,Me,J.data)):t.texImage3D(n.TEXTURE_3D,0,be,J.width,J.height,J.depth,0,de,Me,J.data);else if(g.isFramebufferTexture){if(nt)if(De)t.texStorage2D(n.TEXTURE_2D,ne,be,J.width,J.height);else{let k=J.width,$=J.height;for(let ce=0;ce<ne;ce++)t.texImage2D(n.TEXTURE_2D,ce,be,k,$,0,de,Me,null),k>>=1,$>>=1}}else if(Be.length>0){if(De&&nt){const k=xe(Be[0]);t.texStorage2D(n.TEXTURE_2D,ne,be,k.width,k.height)}for(let k=0,$=Be.length;k<$;k++)he=Be[k],De?C&&t.texSubImage2D(n.TEXTURE_2D,k,0,0,de,Me,he):t.texImage2D(n.TEXTURE_2D,k,be,de,Me,he);g.generateMipmaps=!1}else if(De){if(nt){const k=xe(J);t.texStorage2D(n.TEXTURE_2D,ne,be,k.width,k.height)}C&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,de,Me,J)}else t.texImage2D(n.TEXTURE_2D,0,be,de,Me,J);p(g)&&d(Y),_e.__version=V.version,g.onUpdate&&g.onUpdate(g)}M.__version=g.version}function ee(M,g,N){if(g.image.length!==6)return;const Y=Je(M,g),j=g.source;t.bindTexture(n.TEXTURE_CUBE_MAP,M.__webglTexture,n.TEXTURE0+N);const V=i.get(j);if(j.version!==V.__version||Y===!0){t.activeTexture(n.TEXTURE0+N);const _e=We.getPrimaries(We.workingColorSpace),oe=g.colorSpace===Dn?null:We.getPrimaries(g.colorSpace),fe=g.colorSpace===Dn||_e===oe?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,g.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,g.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,fe);const ke=g.isCompressedTexture||g.image[0].isCompressedTexture,J=g.image[0]&&g.image[0].isDataTexture,de=[];for(let $=0;$<6;$++)!ke&&!J?de[$]=S(g.image[$],!0,r.maxCubemapSize):de[$]=J?g.image[$].image:g.image[$],de[$]=it(g,de[$]);const Me=de[0],be=s.convert(g.format,g.colorSpace),he=s.convert(g.type),Be=T(g.internalFormat,be,he,g.colorSpace),De=g.isVideoTexture!==!0,nt=V.__version===void 0||Y===!0,C=j.dataReady;let ne=L(g,Me);Le(n.TEXTURE_CUBE_MAP,g);let k;if(ke){De&&nt&&t.texStorage2D(n.TEXTURE_CUBE_MAP,ne,Be,Me.width,Me.height);for(let $=0;$<6;$++){k=de[$].mipmaps;for(let ce=0;ce<k.length;ce++){const ae=k[ce];g.format!==Xt?be!==null?De?C&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,ce,0,0,ae.width,ae.height,be,ae.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,ce,Be,ae.width,ae.height,0,ae.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):De?C&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,ce,0,0,ae.width,ae.height,be,he,ae.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,ce,Be,ae.width,ae.height,0,be,he,ae.data)}}}else{if(k=g.mipmaps,De&&nt){k.length>0&&ne++;const $=xe(de[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,ne,Be,$.width,$.height)}for(let $=0;$<6;$++)if(J){De?C&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,de[$].width,de[$].height,be,he,de[$].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,Be,de[$].width,de[$].height,0,be,he,de[$].data);for(let ce=0;ce<k.length;ce++){const Pe=k[ce].image[$].image;De?C&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,ce+1,0,0,Pe.width,Pe.height,be,he,Pe.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,ce+1,Be,Pe.width,Pe.height,0,be,he,Pe.data)}}else{De?C&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,be,he,de[$]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,Be,be,he,de[$]);for(let ce=0;ce<k.length;ce++){const ae=k[ce];De?C&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,ce+1,0,0,be,he,ae.image[$]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,ce+1,Be,be,he,ae.image[$])}}}p(g)&&d(n.TEXTURE_CUBE_MAP),V.__version=j.version,g.onUpdate&&g.onUpdate(g)}M.__version=g.version}function me(M,g,N,Y,j,V){const _e=s.convert(N.format,N.colorSpace),oe=s.convert(N.type),fe=T(N.internalFormat,_e,oe,N.colorSpace),ke=i.get(g),J=i.get(N);if(J.__renderTarget=g,!ke.__hasExternalTextures){const de=Math.max(1,g.width>>V),Me=Math.max(1,g.height>>V);j===n.TEXTURE_3D||j===n.TEXTURE_2D_ARRAY?t.texImage3D(j,V,fe,de,Me,g.depth,0,_e,oe,null):t.texImage2D(j,V,fe,de,Me,0,_e,oe,null)}t.bindFramebuffer(n.FRAMEBUFFER,M),Oe(g)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Y,j,J.__webglTexture,0,Fe(g)):(j===n.TEXTURE_2D||j>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&j<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,Y,j,J.__webglTexture,V),t.bindFramebuffer(n.FRAMEBUFFER,null)}function se(M,g,N){if(n.bindRenderbuffer(n.RENDERBUFFER,M),g.depthBuffer){const Y=g.depthTexture,j=Y&&Y.isDepthTexture?Y.type:null,V=y(g.stencilBuffer,j),_e=g.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,oe=Fe(g);Oe(g)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,oe,V,g.width,g.height):N?n.renderbufferStorageMultisample(n.RENDERBUFFER,oe,V,g.width,g.height):n.renderbufferStorage(n.RENDERBUFFER,V,g.width,g.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,_e,n.RENDERBUFFER,M)}else{const Y=g.textures;for(let j=0;j<Y.length;j++){const V=Y[j],_e=s.convert(V.format,V.colorSpace),oe=s.convert(V.type),fe=T(V.internalFormat,_e,oe,V.colorSpace),ke=Fe(g);N&&Oe(g)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,ke,fe,g.width,g.height):Oe(g)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ke,fe,g.width,g.height):n.renderbufferStorage(n.RENDERBUFFER,fe,g.width,g.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function ye(M,g){if(g&&g.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,M),!(g.depthTexture&&g.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Y=i.get(g.depthTexture);Y.__renderTarget=g,(!Y.__webglTexture||g.depthTexture.image.width!==g.width||g.depthTexture.image.height!==g.height)&&(g.depthTexture.image.width=g.width,g.depthTexture.image.height=g.height,g.depthTexture.needsUpdate=!0),K(g.depthTexture,0);const j=Y.__webglTexture,V=Fe(g);if(g.depthTexture.format===Ii)Oe(g)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,j,0,V):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,j,0);else if(g.depthTexture.format===Gi)Oe(g)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,j,0,V):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,j,0);else throw new Error("Unknown depthTexture format")}function Ce(M){const g=i.get(M),N=M.isWebGLCubeRenderTarget===!0;if(g.__boundDepthTexture!==M.depthTexture){const Y=M.depthTexture;if(g.__depthDisposeCallback&&g.__depthDisposeCallback(),Y){const j=()=>{delete g.__boundDepthTexture,delete g.__depthDisposeCallback,Y.removeEventListener("dispose",j)};Y.addEventListener("dispose",j),g.__depthDisposeCallback=j}g.__boundDepthTexture=Y}if(M.depthTexture&&!g.__autoAllocateDepthBuffer){if(N)throw new Error("target.depthTexture not supported in Cube render targets");ye(g.__webglFramebuffer,M)}else if(N){g.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)if(t.bindFramebuffer(n.FRAMEBUFFER,g.__webglFramebuffer[Y]),g.__webglDepthbuffer[Y]===void 0)g.__webglDepthbuffer[Y]=n.createRenderbuffer(),se(g.__webglDepthbuffer[Y],M,!1);else{const j=M.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,V=g.__webglDepthbuffer[Y];n.bindRenderbuffer(n.RENDERBUFFER,V),n.framebufferRenderbuffer(n.FRAMEBUFFER,j,n.RENDERBUFFER,V)}}else if(t.bindFramebuffer(n.FRAMEBUFFER,g.__webglFramebuffer),g.__webglDepthbuffer===void 0)g.__webglDepthbuffer=n.createRenderbuffer(),se(g.__webglDepthbuffer,M,!1);else{const Y=M.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,j=g.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,j),n.framebufferRenderbuffer(n.FRAMEBUFFER,Y,n.RENDERBUFFER,j)}t.bindFramebuffer(n.FRAMEBUFFER,null)}function Ue(M,g,N){const Y=i.get(M);g!==void 0&&me(Y.__webglFramebuffer,M,M.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),N!==void 0&&Ce(M)}function st(M){const g=M.texture,N=i.get(M),Y=i.get(g);M.addEventListener("dispose",P);const j=M.textures,V=M.isWebGLCubeRenderTarget===!0,_e=j.length>1;if(_e||(Y.__webglTexture===void 0&&(Y.__webglTexture=n.createTexture()),Y.__version=g.version,o.memory.textures++),V){N.__webglFramebuffer=[];for(let oe=0;oe<6;oe++)if(g.mipmaps&&g.mipmaps.length>0){N.__webglFramebuffer[oe]=[];for(let fe=0;fe<g.mipmaps.length;fe++)N.__webglFramebuffer[oe][fe]=n.createFramebuffer()}else N.__webglFramebuffer[oe]=n.createFramebuffer()}else{if(g.mipmaps&&g.mipmaps.length>0){N.__webglFramebuffer=[];for(let oe=0;oe<g.mipmaps.length;oe++)N.__webglFramebuffer[oe]=n.createFramebuffer()}else N.__webglFramebuffer=n.createFramebuffer();if(_e)for(let oe=0,fe=j.length;oe<fe;oe++){const ke=i.get(j[oe]);ke.__webglTexture===void 0&&(ke.__webglTexture=n.createTexture(),o.memory.textures++)}if(M.samples>0&&Oe(M)===!1){N.__webglMultisampledFramebuffer=n.createFramebuffer(),N.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,N.__webglMultisampledFramebuffer);for(let oe=0;oe<j.length;oe++){const fe=j[oe];N.__webglColorRenderbuffer[oe]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,N.__webglColorRenderbuffer[oe]);const ke=s.convert(fe.format,fe.colorSpace),J=s.convert(fe.type),de=T(fe.internalFormat,ke,J,fe.colorSpace,M.isXRRenderTarget===!0),Me=Fe(M);n.renderbufferStorageMultisample(n.RENDERBUFFER,Me,de,M.width,M.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+oe,n.RENDERBUFFER,N.__webglColorRenderbuffer[oe])}n.bindRenderbuffer(n.RENDERBUFFER,null),M.depthBuffer&&(N.__webglDepthRenderbuffer=n.createRenderbuffer(),se(N.__webglDepthRenderbuffer,M,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(V){t.bindTexture(n.TEXTURE_CUBE_MAP,Y.__webglTexture),Le(n.TEXTURE_CUBE_MAP,g);for(let oe=0;oe<6;oe++)if(g.mipmaps&&g.mipmaps.length>0)for(let fe=0;fe<g.mipmaps.length;fe++)me(N.__webglFramebuffer[oe][fe],M,g,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,fe);else me(N.__webglFramebuffer[oe],M,g,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0);p(g)&&d(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(_e){for(let oe=0,fe=j.length;oe<fe;oe++){const ke=j[oe],J=i.get(ke);t.bindTexture(n.TEXTURE_2D,J.__webglTexture),Le(n.TEXTURE_2D,ke),me(N.__webglFramebuffer,M,ke,n.COLOR_ATTACHMENT0+oe,n.TEXTURE_2D,0),p(ke)&&d(n.TEXTURE_2D)}t.unbindTexture()}else{let oe=n.TEXTURE_2D;if((M.isWebGL3DRenderTarget||M.isWebGLArrayRenderTarget)&&(oe=M.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(oe,Y.__webglTexture),Le(oe,g),g.mipmaps&&g.mipmaps.length>0)for(let fe=0;fe<g.mipmaps.length;fe++)me(N.__webglFramebuffer[fe],M,g,n.COLOR_ATTACHMENT0,oe,fe);else me(N.__webglFramebuffer,M,g,n.COLOR_ATTACHMENT0,oe,0);p(g)&&d(oe),t.unbindTexture()}M.depthBuffer&&Ce(M)}function ze(M){const g=M.textures;for(let N=0,Y=g.length;N<Y;N++){const j=g[N];if(p(j)){const V=b(M),_e=i.get(j).__webglTexture;t.bindTexture(V,_e),d(V),t.unbindTexture()}}}const ct=[],w=[];function Ft(M){if(M.samples>0){if(Oe(M)===!1){const g=M.textures,N=M.width,Y=M.height;let j=n.COLOR_BUFFER_BIT;const V=M.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,_e=i.get(M),oe=g.length>1;if(oe)for(let fe=0;fe<g.length;fe++)t.bindFramebuffer(n.FRAMEBUFFER,_e.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+fe,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,_e.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+fe,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,_e.__webglMultisampledFramebuffer),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,_e.__webglFramebuffer);for(let fe=0;fe<g.length;fe++){if(M.resolveDepthBuffer&&(M.depthBuffer&&(j|=n.DEPTH_BUFFER_BIT),M.stencilBuffer&&M.resolveStencilBuffer&&(j|=n.STENCIL_BUFFER_BIT)),oe){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,_e.__webglColorRenderbuffer[fe]);const ke=i.get(g[fe]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,ke,0)}n.blitFramebuffer(0,0,N,Y,0,0,N,Y,j,n.NEAREST),c===!0&&(ct.length=0,w.length=0,ct.push(n.COLOR_ATTACHMENT0+fe),M.depthBuffer&&M.resolveDepthBuffer===!1&&(ct.push(V),w.push(V),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,w)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,ct))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),oe)for(let fe=0;fe<g.length;fe++){t.bindFramebuffer(n.FRAMEBUFFER,_e.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+fe,n.RENDERBUFFER,_e.__webglColorRenderbuffer[fe]);const ke=i.get(g[fe]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,_e.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+fe,n.TEXTURE_2D,ke,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,_e.__webglMultisampledFramebuffer)}else if(M.depthBuffer&&M.resolveDepthBuffer===!1&&c){const g=M.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[g])}}}function Fe(M){return Math.min(r.maxSamples,M.samples)}function Oe(M){const g=i.get(M);return M.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&g.__useRenderToTexture!==!1}function ve(M){const g=o.render.frame;u.get(M)!==g&&(u.set(M,g),M.update())}function it(M,g){const N=M.colorSpace,Y=M.format,j=M.type;return M.isCompressedTexture===!0||M.isVideoTexture===!0||N!==Vi&&N!==Dn&&(We.getTransfer(N)===Ze?(Y!==Xt||j!==En)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",N)),g}function xe(M){return typeof HTMLImageElement<"u"&&M instanceof HTMLImageElement?(l.width=M.naturalWidth||M.width,l.height=M.naturalHeight||M.height):typeof VideoFrame<"u"&&M instanceof VideoFrame?(l.width=M.displayWidth,l.height=M.displayHeight):(l.width=M.width,l.height=M.height),l}this.allocateTextureUnit=z,this.resetTextureUnits=q,this.setTexture2D=K,this.setTexture2DArray=G,this.setTexture3D=Q,this.setTextureCube=H,this.rebindTextures=Ue,this.setupRenderTarget=st,this.updateRenderTargetMipmap=ze,this.updateMultisampleRenderTarget=Ft,this.setupDepthRenderbuffer=Ce,this.setupFrameBufferTexture=me,this.useMultisampledRTT=Oe}function MS(n,e){function t(i,r=Dn){let s;const o=We.getTransfer(r);if(i===En)return n.UNSIGNED_BYTE;if(i===Na)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Fa)return n.UNSIGNED_SHORT_5_5_5_1;if(i===yu)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Eu)return n.BYTE;if(i===Mu)return n.SHORT;if(i===cr)return n.UNSIGNED_SHORT;if(i===Ua)return n.INT;if(i===ci)return n.UNSIGNED_INT;if(i===nn)return n.FLOAT;if(i===hr)return n.HALF_FLOAT;if(i===Tu)return n.ALPHA;if(i===bu)return n.RGB;if(i===Xt)return n.RGBA;if(i===wu)return n.LUMINANCE;if(i===Au)return n.LUMINANCE_ALPHA;if(i===Ii)return n.DEPTH_COMPONENT;if(i===Gi)return n.DEPTH_STENCIL;if(i===Ru)return n.RED;if(i===Oa)return n.RED_INTEGER;if(i===Cu)return n.RG;if(i===Ba)return n.RG_INTEGER;if(i===za)return n.RGBA_INTEGER;if(i===is||i===rs||i===ss||i===os)if(o===Ze)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===is)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===rs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===ss)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===os)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===is)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===rs)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===ss)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===os)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Wo||i===Xo||i===qo||i===Yo)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===Wo)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Xo)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===qo)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Yo)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===$o||i===jo||i===Ko)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===$o||i===jo)return o===Ze?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Ko)return o===Ze?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Zo||i===Jo||i===Qo||i===ea||i===ta||i===na||i===ia||i===ra||i===sa||i===oa||i===aa||i===ca||i===la||i===ua)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Zo)return o===Ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Jo)return o===Ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Qo)return o===Ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===ea)return o===Ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===ta)return o===Ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===na)return o===Ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===ia)return o===Ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===ra)return o===Ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===sa)return o===Ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===oa)return o===Ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===aa)return o===Ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===ca)return o===Ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===la)return o===Ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===ua)return o===Ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===as||i===fa||i===da)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===as)return o===Ze?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===fa)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===da)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Pu||i===ha||i===pa||i===ma)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===as)return s.COMPRESSED_RED_RGTC1_EXT;if(i===ha)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===pa)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===ma)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Hi?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const yS={type:"move"};class mo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new jr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new jr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new O,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new O),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new jr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new O,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new O),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(const S of e.hand.values()){const p=t.getJointPose(S,i),d=this._getHandJoint(l,S);p!==null&&(d.matrix.fromArray(p.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=p.radius),d.visible=p!==null}const u=l.joints["index-finger-tip"],f=l.joints["thumb-tip"],h=u.position.distanceTo(f.position),m=.02,_=.005;l.inputState.pinching&&h>m+_?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&h<=m-_&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(yS)))}return a!==null&&(a.visible=r!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new jr;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const TS=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,bS=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class wS{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,i){if(this.texture===null){const r=new gt,s=e.properties.get(r);s.__webglTexture=t.texture,(t.depthNear!=i.depthNear||t.depthFar!=i.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new sn({vertexShader:TS,fragmentShader:bS,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new rn(new xr(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class AS extends Yi{constructor(e,t){super();const i=this;let r=null,s=1,o=null,a="local-floor",c=1,l=null,u=null,f=null,h=null,m=null,_=null;const S=new wS,p=t.getContextAttributes();let d=null,b=null;const T=[],y=[],L=new tt;let A=null;const P=new Gt;P.viewport=new lt;const U=new Gt;U.viewport=new lt;const E=[P,U],x=new $_;let R=null,q=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let ee=T[X];return ee===void 0&&(ee=new mo,T[X]=ee),ee.getTargetRaySpace()},this.getControllerGrip=function(X){let ee=T[X];return ee===void 0&&(ee=new mo,T[X]=ee),ee.getGripSpace()},this.getHand=function(X){let ee=T[X];return ee===void 0&&(ee=new mo,T[X]=ee),ee.getHandSpace()};function z(X){const ee=y.indexOf(X.inputSource);if(ee===-1)return;const me=T[ee];me!==void 0&&(me.update(X.inputSource,X.frame,l||o),me.dispatchEvent({type:X.type,data:X.inputSource}))}function W(){r.removeEventListener("select",z),r.removeEventListener("selectstart",z),r.removeEventListener("selectend",z),r.removeEventListener("squeeze",z),r.removeEventListener("squeezestart",z),r.removeEventListener("squeezeend",z),r.removeEventListener("end",W),r.removeEventListener("inputsourceschange",K);for(let X=0;X<T.length;X++){const ee=y[X];ee!==null&&(y[X]=null,T[X].disconnect(ee))}R=null,q=null,S.reset(),e.setRenderTarget(d),m=null,h=null,f=null,r=null,b=null,Je.stop(),i.isPresenting=!1,e.setPixelRatio(A),e.setSize(L.width,L.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){s=X,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){a=X,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(X){l=X},this.getBaseLayer=function(){return h!==null?h:m},this.getBinding=function(){return f},this.getFrame=function(){return _},this.getSession=function(){return r},this.setSession=async function(X){if(r=X,r!==null){if(d=e.getRenderTarget(),r.addEventListener("select",z),r.addEventListener("selectstart",z),r.addEventListener("selectend",z),r.addEventListener("squeeze",z),r.addEventListener("squeezestart",z),r.addEventListener("squeezeend",z),r.addEventListener("end",W),r.addEventListener("inputsourceschange",K),p.xrCompatible!==!0&&await t.makeXRCompatible(),A=e.getPixelRatio(),e.getSize(L),r.renderState.layers===void 0){const ee={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:s};m=new XRWebGLLayer(r,t,ee),r.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),b=new On(m.framebufferWidth,m.framebufferHeight,{format:Xt,type:En,colorSpace:e.outputColorSpace,stencilBuffer:p.stencil})}else{let ee=null,me=null,se=null;p.depth&&(se=p.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ee=p.stencil?Gi:Ii,me=p.stencil?Hi:ci);const ye={colorFormat:t.RGBA8,depthFormat:se,scaleFactor:s};f=new XRWebGLBinding(r,t),h=f.createProjectionLayer(ye),r.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),b=new On(h.textureWidth,h.textureHeight,{format:Xt,type:En,depthTexture:new Wu(h.textureWidth,h.textureHeight,me,void 0,void 0,void 0,void 0,void 0,void 0,ee),stencilBuffer:p.stencil,colorSpace:e.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await r.requestReferenceSpace(a),Je.setContext(r),Je.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return S.getDepthTexture()};function K(X){for(let ee=0;ee<X.removed.length;ee++){const me=X.removed[ee],se=y.indexOf(me);se>=0&&(y[se]=null,T[se].disconnect(me))}for(let ee=0;ee<X.added.length;ee++){const me=X.added[ee];let se=y.indexOf(me);if(se===-1){for(let Ce=0;Ce<T.length;Ce++)if(Ce>=y.length){y.push(me),se=Ce;break}else if(y[Ce]===null){y[Ce]=me,se=Ce;break}if(se===-1)break}const ye=T[se];ye&&ye.connect(me)}}const G=new O,Q=new O;function H(X,ee,me){G.setFromMatrixPosition(ee.matrixWorld),Q.setFromMatrixPosition(me.matrixWorld);const se=G.distanceTo(Q),ye=ee.projectionMatrix.elements,Ce=me.projectionMatrix.elements,Ue=ye[14]/(ye[10]-1),st=ye[14]/(ye[10]+1),ze=(ye[9]+1)/ye[5],ct=(ye[9]-1)/ye[5],w=(ye[8]-1)/ye[0],Ft=(Ce[8]+1)/Ce[0],Fe=Ue*w,Oe=Ue*Ft,ve=se/(-w+Ft),it=ve*-w;if(ee.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(it),X.translateZ(ve),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert(),ye[10]===-1)X.projectionMatrix.copy(ee.projectionMatrix),X.projectionMatrixInverse.copy(ee.projectionMatrixInverse);else{const xe=Ue+ve,M=st+ve,g=Fe-it,N=Oe+(se-it),Y=ze*st/M*xe,j=ct*st/M*xe;X.projectionMatrix.makePerspective(g,N,Y,j,xe,M),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}}function re(X,ee){ee===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(ee.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(r===null)return;let ee=X.near,me=X.far;S.texture!==null&&(S.depthNear>0&&(ee=S.depthNear),S.depthFar>0&&(me=S.depthFar)),x.near=U.near=P.near=ee,x.far=U.far=P.far=me,(R!==x.near||q!==x.far)&&(r.updateRenderState({depthNear:x.near,depthFar:x.far}),R=x.near,q=x.far),P.layers.mask=X.layers.mask|2,U.layers.mask=X.layers.mask|4,x.layers.mask=P.layers.mask|U.layers.mask;const se=X.parent,ye=x.cameras;re(x,se);for(let Ce=0;Ce<ye.length;Ce++)re(ye[Ce],se);ye.length===2?H(x,P,U):x.projectionMatrix.copy(P.projectionMatrix),ue(X,x,se)};function ue(X,ee,me){me===null?X.matrix.copy(ee.matrixWorld):(X.matrix.copy(me.matrixWorld),X.matrix.invert(),X.matrix.multiply(ee.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(ee.projectionMatrix),X.projectionMatrixInverse.copy(ee.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=_a*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return x},this.getFoveation=function(){if(!(h===null&&m===null))return c},this.setFoveation=function(X){c=X,h!==null&&(h.fixedFoveation=X),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=X)},this.hasDepthSensing=function(){return S.texture!==null},this.getDepthSensingMesh=function(){return S.getMesh(x)};let ge=null;function Le(X,ee){if(u=ee.getViewerPose(l||o),_=ee,u!==null){const me=u.views;m!==null&&(e.setRenderTargetFramebuffer(b,m.framebuffer),e.setRenderTarget(b));let se=!1;me.length!==x.cameras.length&&(x.cameras.length=0,se=!0);for(let Ce=0;Ce<me.length;Ce++){const Ue=me[Ce];let st=null;if(m!==null)st=m.getViewport(Ue);else{const ct=f.getViewSubImage(h,Ue);st=ct.viewport,Ce===0&&(e.setRenderTargetTextures(b,ct.colorTexture,h.ignoreDepthValues?void 0:ct.depthStencilTexture),e.setRenderTarget(b))}let ze=E[Ce];ze===void 0&&(ze=new Gt,ze.layers.enable(Ce),ze.viewport=new lt,E[Ce]=ze),ze.matrix.fromArray(Ue.transform.matrix),ze.matrix.decompose(ze.position,ze.quaternion,ze.scale),ze.projectionMatrix.fromArray(Ue.projectionMatrix),ze.projectionMatrixInverse.copy(ze.projectionMatrix).invert(),ze.viewport.set(st.x,st.y,st.width,st.height),Ce===0&&(x.matrix.copy(ze.matrix),x.matrix.decompose(x.position,x.quaternion,x.scale)),se===!0&&x.cameras.push(ze)}const ye=r.enabledFeatures;if(ye&&ye.includes("depth-sensing")){const Ce=f.getDepthInformation(me[0]);Ce&&Ce.isValid&&Ce.texture&&S.init(e,Ce,r.renderState)}}for(let me=0;me<T.length;me++){const se=y[me],ye=T[me];se!==null&&ye!==void 0&&ye.update(se,ee,l||o)}ge&&ge(X,ee),ee.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ee}),_=null}const Je=new Xu;Je.setAnimationLoop(Le),this.setAnimationLoop=function(X){ge=X},this.dispose=function(){}}}const Xn=new Mn,RS=new ut;function CS(n,e){function t(p,d){p.matrixAutoUpdate===!0&&p.updateMatrix(),d.value.copy(p.matrix)}function i(p,d){d.color.getRGB(p.fogColor.value,Hu(n)),d.isFog?(p.fogNear.value=d.near,p.fogFar.value=d.far):d.isFogExp2&&(p.fogDensity.value=d.density)}function r(p,d,b,T,y){d.isMeshBasicMaterial||d.isMeshLambertMaterial?s(p,d):d.isMeshToonMaterial?(s(p,d),f(p,d)):d.isMeshPhongMaterial?(s(p,d),u(p,d)):d.isMeshStandardMaterial?(s(p,d),h(p,d),d.isMeshPhysicalMaterial&&m(p,d,y)):d.isMeshMatcapMaterial?(s(p,d),_(p,d)):d.isMeshDepthMaterial?s(p,d):d.isMeshDistanceMaterial?(s(p,d),S(p,d)):d.isMeshNormalMaterial?s(p,d):d.isLineBasicMaterial?(o(p,d),d.isLineDashedMaterial&&a(p,d)):d.isPointsMaterial?c(p,d,b,T):d.isSpriteMaterial?l(p,d):d.isShadowMaterial?(p.color.value.copy(d.color),p.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function s(p,d){p.opacity.value=d.opacity,d.color&&p.diffuse.value.copy(d.color),d.emissive&&p.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(p.map.value=d.map,t(d.map,p.mapTransform)),d.alphaMap&&(p.alphaMap.value=d.alphaMap,t(d.alphaMap,p.alphaMapTransform)),d.bumpMap&&(p.bumpMap.value=d.bumpMap,t(d.bumpMap,p.bumpMapTransform),p.bumpScale.value=d.bumpScale,d.side===Rt&&(p.bumpScale.value*=-1)),d.normalMap&&(p.normalMap.value=d.normalMap,t(d.normalMap,p.normalMapTransform),p.normalScale.value.copy(d.normalScale),d.side===Rt&&p.normalScale.value.negate()),d.displacementMap&&(p.displacementMap.value=d.displacementMap,t(d.displacementMap,p.displacementMapTransform),p.displacementScale.value=d.displacementScale,p.displacementBias.value=d.displacementBias),d.emissiveMap&&(p.emissiveMap.value=d.emissiveMap,t(d.emissiveMap,p.emissiveMapTransform)),d.specularMap&&(p.specularMap.value=d.specularMap,t(d.specularMap,p.specularMapTransform)),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest);const b=e.get(d),T=b.envMap,y=b.envMapRotation;T&&(p.envMap.value=T,Xn.copy(y),Xn.x*=-1,Xn.y*=-1,Xn.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1&&(Xn.y*=-1,Xn.z*=-1),p.envMapRotation.value.setFromMatrix4(RS.makeRotationFromEuler(Xn)),p.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=d.reflectivity,p.ior.value=d.ior,p.refractionRatio.value=d.refractionRatio),d.lightMap&&(p.lightMap.value=d.lightMap,p.lightMapIntensity.value=d.lightMapIntensity,t(d.lightMap,p.lightMapTransform)),d.aoMap&&(p.aoMap.value=d.aoMap,p.aoMapIntensity.value=d.aoMapIntensity,t(d.aoMap,p.aoMapTransform))}function o(p,d){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity,d.map&&(p.map.value=d.map,t(d.map,p.mapTransform))}function a(p,d){p.dashSize.value=d.dashSize,p.totalSize.value=d.dashSize+d.gapSize,p.scale.value=d.scale}function c(p,d,b,T){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity,p.size.value=d.size*b,p.scale.value=T*.5,d.map&&(p.map.value=d.map,t(d.map,p.uvTransform)),d.alphaMap&&(p.alphaMap.value=d.alphaMap,t(d.alphaMap,p.alphaMapTransform)),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest)}function l(p,d){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity,p.rotation.value=d.rotation,d.map&&(p.map.value=d.map,t(d.map,p.mapTransform)),d.alphaMap&&(p.alphaMap.value=d.alphaMap,t(d.alphaMap,p.alphaMapTransform)),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest)}function u(p,d){p.specular.value.copy(d.specular),p.shininess.value=Math.max(d.shininess,1e-4)}function f(p,d){d.gradientMap&&(p.gradientMap.value=d.gradientMap)}function h(p,d){p.metalness.value=d.metalness,d.metalnessMap&&(p.metalnessMap.value=d.metalnessMap,t(d.metalnessMap,p.metalnessMapTransform)),p.roughness.value=d.roughness,d.roughnessMap&&(p.roughnessMap.value=d.roughnessMap,t(d.roughnessMap,p.roughnessMapTransform)),d.envMap&&(p.envMapIntensity.value=d.envMapIntensity)}function m(p,d,b){p.ior.value=d.ior,d.sheen>0&&(p.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),p.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(p.sheenColorMap.value=d.sheenColorMap,t(d.sheenColorMap,p.sheenColorMapTransform)),d.sheenRoughnessMap&&(p.sheenRoughnessMap.value=d.sheenRoughnessMap,t(d.sheenRoughnessMap,p.sheenRoughnessMapTransform))),d.clearcoat>0&&(p.clearcoat.value=d.clearcoat,p.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(p.clearcoatMap.value=d.clearcoatMap,t(d.clearcoatMap,p.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,t(d.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(p.clearcoatNormalMap.value=d.clearcoatNormalMap,t(d.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===Rt&&p.clearcoatNormalScale.value.negate())),d.dispersion>0&&(p.dispersion.value=d.dispersion),d.iridescence>0&&(p.iridescence.value=d.iridescence,p.iridescenceIOR.value=d.iridescenceIOR,p.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(p.iridescenceMap.value=d.iridescenceMap,t(d.iridescenceMap,p.iridescenceMapTransform)),d.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=d.iridescenceThicknessMap,t(d.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),d.transmission>0&&(p.transmission.value=d.transmission,p.transmissionSamplerMap.value=b.texture,p.transmissionSamplerSize.value.set(b.width,b.height),d.transmissionMap&&(p.transmissionMap.value=d.transmissionMap,t(d.transmissionMap,p.transmissionMapTransform)),p.thickness.value=d.thickness,d.thicknessMap&&(p.thicknessMap.value=d.thicknessMap,t(d.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=d.attenuationDistance,p.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(p.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(p.anisotropyMap.value=d.anisotropyMap,t(d.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=d.specularIntensity,p.specularColor.value.copy(d.specularColor),d.specularColorMap&&(p.specularColorMap.value=d.specularColorMap,t(d.specularColorMap,p.specularColorMapTransform)),d.specularIntensityMap&&(p.specularIntensityMap.value=d.specularIntensityMap,t(d.specularIntensityMap,p.specularIntensityMapTransform))}function _(p,d){d.matcap&&(p.matcap.value=d.matcap)}function S(p,d){const b=e.get(d).light;p.referencePosition.value.setFromMatrixPosition(b.matrixWorld),p.nearDistance.value=b.shadow.camera.near,p.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function PS(n,e,t,i){let r={},s={},o=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(b,T){const y=T.program;i.uniformBlockBinding(b,y)}function l(b,T){let y=r[b.id];y===void 0&&(_(b),y=u(b),r[b.id]=y,b.addEventListener("dispose",p));const L=T.program;i.updateUBOMapping(b,L);const A=e.render.frame;s[b.id]!==A&&(h(b),s[b.id]=A)}function u(b){const T=f();b.__bindingPointIndex=T;const y=n.createBuffer(),L=b.__size,A=b.usage;return n.bindBuffer(n.UNIFORM_BUFFER,y),n.bufferData(n.UNIFORM_BUFFER,L,A),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,T,y),y}function f(){for(let b=0;b<a;b++)if(o.indexOf(b)===-1)return o.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(b){const T=r[b.id],y=b.uniforms,L=b.__cache;n.bindBuffer(n.UNIFORM_BUFFER,T);for(let A=0,P=y.length;A<P;A++){const U=Array.isArray(y[A])?y[A]:[y[A]];for(let E=0,x=U.length;E<x;E++){const R=U[E];if(m(R,A,E,L)===!0){const q=R.__offset,z=Array.isArray(R.value)?R.value:[R.value];let W=0;for(let K=0;K<z.length;K++){const G=z[K],Q=S(G);typeof G=="number"||typeof G=="boolean"?(R.__data[0]=G,n.bufferSubData(n.UNIFORM_BUFFER,q+W,R.__data)):G.isMatrix3?(R.__data[0]=G.elements[0],R.__data[1]=G.elements[1],R.__data[2]=G.elements[2],R.__data[3]=0,R.__data[4]=G.elements[3],R.__data[5]=G.elements[4],R.__data[6]=G.elements[5],R.__data[7]=0,R.__data[8]=G.elements[6],R.__data[9]=G.elements[7],R.__data[10]=G.elements[8],R.__data[11]=0):(G.toArray(R.__data,W),W+=Q.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,q,R.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function m(b,T,y,L){const A=b.value,P=T+"_"+y;if(L[P]===void 0)return typeof A=="number"||typeof A=="boolean"?L[P]=A:L[P]=A.clone(),!0;{const U=L[P];if(typeof A=="number"||typeof A=="boolean"){if(U!==A)return L[P]=A,!0}else if(U.equals(A)===!1)return U.copy(A),!0}return!1}function _(b){const T=b.uniforms;let y=0;const L=16;for(let P=0,U=T.length;P<U;P++){const E=Array.isArray(T[P])?T[P]:[T[P]];for(let x=0,R=E.length;x<R;x++){const q=E[x],z=Array.isArray(q.value)?q.value:[q.value];for(let W=0,K=z.length;W<K;W++){const G=z[W],Q=S(G),H=y%L,re=H%Q.boundary,ue=H+re;y+=re,ue!==0&&L-ue<Q.storage&&(y+=L-ue),q.__data=new Float32Array(Q.storage/Float32Array.BYTES_PER_ELEMENT),q.__offset=y,y+=Q.storage}}}const A=y%L;return A>0&&(y+=L-A),b.__size=y,b.__cache={},this}function S(b){const T={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(T.boundary=4,T.storage=4):b.isVector2?(T.boundary=8,T.storage=8):b.isVector3||b.isColor?(T.boundary=16,T.storage=12):b.isVector4?(T.boundary=16,T.storage=16):b.isMatrix3?(T.boundary=48,T.storage=48):b.isMatrix4?(T.boundary=64,T.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),T}function p(b){const T=b.target;T.removeEventListener("dispose",p);const y=o.indexOf(T.__bindingPointIndex);o.splice(y,1),n.deleteBuffer(r[T.id]),delete r[T.id],delete s[T.id]}function d(){for(const b in r)n.deleteBuffer(r[b]);o=[],r={},s={}}return{bind:c,update:l,dispose:d}}class DS{constructor(e={}){const{canvas:t=h_(),context:i=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reverseDepthBuffer:h=!1}=e;this.isWebGLRenderer=!0;let m;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=i.getContextAttributes().alpha}else m=o;const _=new Uint32Array(4),S=new Int32Array(4);let p=null,d=null;const b=[],T=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=kt,this.toneMapping=Ln,this.toneMappingExposure=1;const y=this;let L=!1,A=0,P=0,U=null,E=-1,x=null;const R=new lt,q=new lt;let z=null;const W=new $e(0);let K=0,G=t.width,Q=t.height,H=1,re=null,ue=null;const ge=new lt(0,0,G,Q),Le=new lt(0,0,G,Q);let Je=!1;const X=new Vu;let ee=!1,me=!1;const se=new ut,ye=new ut,Ce=new O,Ue=new lt,st={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ze=!1;function ct(){return U===null?H:1}let w=i;function Ft(v,D){return t.getContext(v,D)}try{const v={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${La}`),t.addEventListener("webglcontextlost",$,!1),t.addEventListener("webglcontextrestored",ce,!1),t.addEventListener("webglcontextcreationerror",ae,!1),w===null){const D="webgl2";if(w=Ft(D,v),w===null)throw Ft(D)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(v){throw console.error("THREE.WebGLRenderer: "+v.message),v}let Fe,Oe,ve,it,xe,M,g,N,Y,j,V,_e,oe,fe,ke,J,de,Me,be,he,Be,De,nt,C;function ne(){Fe=new kx(w),Fe.init(),De=new MS(w,Fe),Oe=new Ux(w,Fe,e,De),ve=new SS(w,Fe),Oe.reverseDepthBuffer&&h&&ve.buffers.depth.setReversed(!0),it=new Vx(w),xe=new aS,M=new ES(w,Fe,ve,xe,Oe,De,it),g=new Fx(y),N=new zx(y),Y=new K_(w),nt=new Ix(w,Y),j=new Hx(w,Y,it,nt),V=new Xx(w,j,Y,it),be=new Wx(w,Oe,M),J=new Nx(xe),_e=new oS(y,g,N,Fe,Oe,nt,J),oe=new CS(y,xe),fe=new lS,ke=new mS(Fe),Me=new Dx(y,g,N,ve,V,m,c),de=new vS(y,V,Oe),C=new PS(w,it,Oe,ve),he=new Lx(w,Fe,it),Be=new Gx(w,Fe,it),it.programs=_e.programs,y.capabilities=Oe,y.extensions=Fe,y.properties=xe,y.renderLists=fe,y.shadowMap=de,y.state=ve,y.info=it}ne();const k=new AS(y,w);this.xr=k,this.getContext=function(){return w},this.getContextAttributes=function(){return w.getContextAttributes()},this.forceContextLoss=function(){const v=Fe.get("WEBGL_lose_context");v&&v.loseContext()},this.forceContextRestore=function(){const v=Fe.get("WEBGL_lose_context");v&&v.restoreContext()},this.getPixelRatio=function(){return H},this.setPixelRatio=function(v){v!==void 0&&(H=v,this.setSize(G,Q,!1))},this.getSize=function(v){return v.set(G,Q)},this.setSize=function(v,D,F=!0){if(k.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}G=v,Q=D,t.width=Math.floor(v*H),t.height=Math.floor(D*H),F===!0&&(t.style.width=v+"px",t.style.height=D+"px"),this.setViewport(0,0,v,D)},this.getDrawingBufferSize=function(v){return v.set(G*H,Q*H).floor()},this.setDrawingBufferSize=function(v,D,F){G=v,Q=D,H=F,t.width=Math.floor(v*F),t.height=Math.floor(D*F),this.setViewport(0,0,v,D)},this.getCurrentViewport=function(v){return v.copy(R)},this.getViewport=function(v){return v.copy(ge)},this.setViewport=function(v,D,F,B){v.isVector4?ge.set(v.x,v.y,v.z,v.w):ge.set(v,D,F,B),ve.viewport(R.copy(ge).multiplyScalar(H).round())},this.getScissor=function(v){return v.copy(Le)},this.setScissor=function(v,D,F,B){v.isVector4?Le.set(v.x,v.y,v.z,v.w):Le.set(v,D,F,B),ve.scissor(q.copy(Le).multiplyScalar(H).round())},this.getScissorTest=function(){return Je},this.setScissorTest=function(v){ve.setScissorTest(Je=v)},this.setOpaqueSort=function(v){re=v},this.setTransparentSort=function(v){ue=v},this.getClearColor=function(v){return v.copy(Me.getClearColor())},this.setClearColor=function(){Me.setClearColor.apply(Me,arguments)},this.getClearAlpha=function(){return Me.getClearAlpha()},this.setClearAlpha=function(){Me.setClearAlpha.apply(Me,arguments)},this.clear=function(v=!0,D=!0,F=!0){let B=0;if(v){let I=!1;if(U!==null){const Z=U.texture.format;I=Z===za||Z===Ba||Z===Oa}if(I){const Z=U.texture.type,ie=Z===En||Z===ci||Z===cr||Z===Hi||Z===Na||Z===Fa,le=Me.getClearColor(),pe=Me.getClearAlpha(),we=le.r,Ae=le.g,Se=le.b;ie?(_[0]=we,_[1]=Ae,_[2]=Se,_[3]=pe,w.clearBufferuiv(w.COLOR,0,_)):(S[0]=we,S[1]=Ae,S[2]=Se,S[3]=pe,w.clearBufferiv(w.COLOR,0,S))}else B|=w.COLOR_BUFFER_BIT}D&&(B|=w.DEPTH_BUFFER_BIT),F&&(B|=w.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),w.clear(B)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",$,!1),t.removeEventListener("webglcontextrestored",ce,!1),t.removeEventListener("webglcontextcreationerror",ae,!1),Me.dispose(),fe.dispose(),ke.dispose(),xe.dispose(),g.dispose(),N.dispose(),V.dispose(),nt.dispose(),C.dispose(),_e.dispose(),k.dispose(),k.removeEventListener("sessionstart",Xa),k.removeEventListener("sessionend",qa),Bn.stop()};function $(v){v.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),L=!0}function ce(){console.log("THREE.WebGLRenderer: Context Restored."),L=!1;const v=it.autoReset,D=de.enabled,F=de.autoUpdate,B=de.needsUpdate,I=de.type;ne(),it.autoReset=v,de.enabled=D,de.autoUpdate=F,de.needsUpdate=B,de.type=I}function ae(v){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",v.statusMessage)}function Pe(v){const D=v.target;D.removeEventListener("dispose",Pe),ot(D)}function ot(v){xt(v),xe.remove(v)}function xt(v){const D=xe.get(v).programs;D!==void 0&&(D.forEach(function(F){_e.releaseProgram(F)}),v.isShaderMaterial&&_e.releaseShaderCache(v))}this.renderBufferDirect=function(v,D,F,B,I,Z){D===null&&(D=st);const ie=I.isMesh&&I.matrixWorld.determinant()<0,le=Qu(v,D,F,B,I);ve.setMaterial(B,ie);let pe=F.index,we=1;if(B.wireframe===!0){if(pe=j.getWireframeAttribute(F),pe===void 0)return;we=2}const Ae=F.drawRange,Se=F.attributes.position;let He=Ae.start*we,qe=(Ae.start+Ae.count)*we;Z!==null&&(He=Math.max(He,Z.start*we),qe=Math.min(qe,(Z.start+Z.count)*we)),pe!==null?(He=Math.max(He,0),qe=Math.min(qe,pe.count)):Se!=null&&(He=Math.max(He,0),qe=Math.min(qe,Se.count));const ft=qe-He;if(ft<0||ft===1/0)return;nt.setup(I,B,le,F,pe);let at,Ve=he;if(pe!==null&&(at=Y.get(pe),Ve=Be,Ve.setIndex(at)),I.isMesh)B.wireframe===!0?(ve.setLineWidth(B.wireframeLinewidth*ct()),Ve.setMode(w.LINES)):Ve.setMode(w.TRIANGLES);else if(I.isLine){let Ee=B.linewidth;Ee===void 0&&(Ee=1),ve.setLineWidth(Ee*ct()),I.isLineSegments?Ve.setMode(w.LINES):I.isLineLoop?Ve.setMode(w.LINE_LOOP):Ve.setMode(w.LINE_STRIP)}else I.isPoints?Ve.setMode(w.POINTS):I.isSprite&&Ve.setMode(w.TRIANGLES);if(I.isBatchedMesh)if(I._multiDrawInstances!==null)Ve.renderMultiDrawInstances(I._multiDrawStarts,I._multiDrawCounts,I._multiDrawCount,I._multiDrawInstances);else if(Fe.get("WEBGL_multi_draw"))Ve.renderMultiDraw(I._multiDrawStarts,I._multiDrawCounts,I._multiDrawCount);else{const Ee=I._multiDrawStarts,_t=I._multiDrawCounts,Ye=I._multiDrawCount,$t=pe?Y.get(pe).bytesPerElement:1,hi=xe.get(B).currentProgram.getUniforms();for(let Dt=0;Dt<Ye;Dt++)hi.setValue(w,"_gl_DrawID",Dt),Ve.render(Ee[Dt]/$t,_t[Dt])}else if(I.isInstancedMesh)Ve.renderInstances(He,ft,I.count);else if(F.isInstancedBufferGeometry){const Ee=F._maxInstanceCount!==void 0?F._maxInstanceCount:1/0,_t=Math.min(F.instanceCount,Ee);Ve.renderInstances(He,ft,_t)}else Ve.render(He,ft)};function je(v,D,F){v.transparent===!0&&v.side===_n&&v.forceSinglePass===!1?(v.side=Rt,v.needsUpdate=!0,Er(v,D,F),v.side=Fn,v.needsUpdate=!0,Er(v,D,F),v.side=_n):Er(v,D,F)}this.compile=function(v,D,F=null){F===null&&(F=v),d=ke.get(F),d.init(D),T.push(d),F.traverseVisible(function(I){I.isLight&&I.layers.test(D.layers)&&(d.pushLight(I),I.castShadow&&d.pushShadow(I))}),v!==F&&v.traverseVisible(function(I){I.isLight&&I.layers.test(D.layers)&&(d.pushLight(I),I.castShadow&&d.pushShadow(I))}),d.setupLights();const B=new Set;return v.traverse(function(I){if(!(I.isMesh||I.isPoints||I.isLine||I.isSprite))return;const Z=I.material;if(Z)if(Array.isArray(Z))for(let ie=0;ie<Z.length;ie++){const le=Z[ie];je(le,F,I),B.add(le)}else je(Z,F,I),B.add(Z)}),T.pop(),d=null,B},this.compileAsync=function(v,D,F=null){const B=this.compile(v,D,F);return new Promise(I=>{function Z(){if(B.forEach(function(ie){xe.get(ie).currentProgram.isReady()&&B.delete(ie)}),B.size===0){I(v);return}setTimeout(Z,10)}Fe.get("KHR_parallel_shader_compile")!==null?Z():setTimeout(Z,10)})};let Yt=null;function an(v){Yt&&Yt(v)}function Xa(){Bn.stop()}function qa(){Bn.start()}const Bn=new Xu;Bn.setAnimationLoop(an),typeof self<"u"&&Bn.setContext(self),this.setAnimationLoop=function(v){Yt=v,k.setAnimationLoop(v),v===null?Bn.stop():Bn.start()},k.addEventListener("sessionstart",Xa),k.addEventListener("sessionend",qa),this.render=function(v,D){if(D!==void 0&&D.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(L===!0)return;if(v.matrixWorldAutoUpdate===!0&&v.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),k.enabled===!0&&k.isPresenting===!0&&(k.cameraAutoUpdate===!0&&k.updateCamera(D),D=k.getCamera()),v.isScene===!0&&v.onBeforeRender(y,v,D,U),d=ke.get(v,T.length),d.init(D),T.push(d),ye.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),X.setFromProjectionMatrix(ye),me=this.localClippingEnabled,ee=J.init(this.clippingPlanes,me),p=fe.get(v,b.length),p.init(),b.push(p),k.enabled===!0&&k.isPresenting===!0){const Z=y.xr.getDepthSensingMesh();Z!==null&&Is(Z,D,-1/0,y.sortObjects)}Is(v,D,0,y.sortObjects),p.finish(),y.sortObjects===!0&&p.sort(re,ue),ze=k.enabled===!1||k.isPresenting===!1||k.hasDepthSensing()===!1,ze&&Me.addToRenderList(p,v),this.info.render.frame++,ee===!0&&J.beginShadows();const F=d.state.shadowsArray;de.render(F,v,D),ee===!0&&J.endShadows(),this.info.autoReset===!0&&this.info.reset();const B=p.opaque,I=p.transmissive;if(d.setupLights(),D.isArrayCamera){const Z=D.cameras;if(I.length>0)for(let ie=0,le=Z.length;ie<le;ie++){const pe=Z[ie];$a(B,I,v,pe)}ze&&Me.render(v);for(let ie=0,le=Z.length;ie<le;ie++){const pe=Z[ie];Ya(p,v,pe,pe.viewport)}}else I.length>0&&$a(B,I,v,D),ze&&Me.render(v),Ya(p,v,D);U!==null&&(M.updateMultisampleRenderTarget(U),M.updateRenderTargetMipmap(U)),v.isScene===!0&&v.onAfterRender(y,v,D),nt.resetDefaultState(),E=-1,x=null,T.pop(),T.length>0?(d=T[T.length-1],ee===!0&&J.setGlobalState(y.clippingPlanes,d.state.camera)):d=null,b.pop(),b.length>0?p=b[b.length-1]:p=null};function Is(v,D,F,B){if(v.visible===!1)return;if(v.layers.test(D.layers)){if(v.isGroup)F=v.renderOrder;else if(v.isLOD)v.autoUpdate===!0&&v.update(D);else if(v.isLight)d.pushLight(v),v.castShadow&&d.pushShadow(v);else if(v.isSprite){if(!v.frustumCulled||X.intersectsSprite(v)){B&&Ue.setFromMatrixPosition(v.matrixWorld).applyMatrix4(ye);const ie=V.update(v),le=v.material;le.visible&&p.push(v,ie,le,F,Ue.z,null)}}else if((v.isMesh||v.isLine||v.isPoints)&&(!v.frustumCulled||X.intersectsObject(v))){const ie=V.update(v),le=v.material;if(B&&(v.boundingSphere!==void 0?(v.boundingSphere===null&&v.computeBoundingSphere(),Ue.copy(v.boundingSphere.center)):(ie.boundingSphere===null&&ie.computeBoundingSphere(),Ue.copy(ie.boundingSphere.center)),Ue.applyMatrix4(v.matrixWorld).applyMatrix4(ye)),Array.isArray(le)){const pe=ie.groups;for(let we=0,Ae=pe.length;we<Ae;we++){const Se=pe[we],He=le[Se.materialIndex];He&&He.visible&&p.push(v,ie,He,F,Ue.z,Se)}}else le.visible&&p.push(v,ie,le,F,Ue.z,null)}}const Z=v.children;for(let ie=0,le=Z.length;ie<le;ie++)Is(Z[ie],D,F,B)}function Ya(v,D,F,B){const I=v.opaque,Z=v.transmissive,ie=v.transparent;d.setupLightsView(F),ee===!0&&J.setGlobalState(y.clippingPlanes,F),B&&ve.viewport(R.copy(B)),I.length>0&&Sr(I,D,F),Z.length>0&&Sr(Z,D,F),ie.length>0&&Sr(ie,D,F),ve.buffers.depth.setTest(!0),ve.buffers.depth.setMask(!0),ve.buffers.color.setMask(!0),ve.setPolygonOffset(!1)}function $a(v,D,F,B){if((F.isScene===!0?F.overrideMaterial:null)!==null)return;d.state.transmissionRenderTarget[B.id]===void 0&&(d.state.transmissionRenderTarget[B.id]=new On(1,1,{generateMipmaps:!0,type:Fe.has("EXT_color_buffer_half_float")||Fe.has("EXT_color_buffer_float")?hr:En,minFilter:Jn,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:We.workingColorSpace}));const Z=d.state.transmissionRenderTarget[B.id],ie=B.viewport||R;Z.setSize(ie.z,ie.w);const le=y.getRenderTarget();y.setRenderTarget(Z),y.getClearColor(W),K=y.getClearAlpha(),K<1&&y.setClearColor(16777215,.5),y.clear(),ze&&Me.render(F);const pe=y.toneMapping;y.toneMapping=Ln;const we=B.viewport;if(B.viewport!==void 0&&(B.viewport=void 0),d.setupLightsView(B),ee===!0&&J.setGlobalState(y.clippingPlanes,B),Sr(v,F,B),M.updateMultisampleRenderTarget(Z),M.updateRenderTargetMipmap(Z),Fe.has("WEBGL_multisampled_render_to_texture")===!1){let Ae=!1;for(let Se=0,He=D.length;Se<He;Se++){const qe=D[Se],ft=qe.object,at=qe.geometry,Ve=qe.material,Ee=qe.group;if(Ve.side===_n&&ft.layers.test(B.layers)){const _t=Ve.side;Ve.side=Rt,Ve.needsUpdate=!0,ja(ft,F,B,at,Ve,Ee),Ve.side=_t,Ve.needsUpdate=!0,Ae=!0}}Ae===!0&&(M.updateMultisampleRenderTarget(Z),M.updateRenderTargetMipmap(Z))}y.setRenderTarget(le),y.setClearColor(W,K),we!==void 0&&(B.viewport=we),y.toneMapping=pe}function Sr(v,D,F){const B=D.isScene===!0?D.overrideMaterial:null;for(let I=0,Z=v.length;I<Z;I++){const ie=v[I],le=ie.object,pe=ie.geometry,we=B===null?ie.material:B,Ae=ie.group;le.layers.test(F.layers)&&ja(le,D,F,pe,we,Ae)}}function ja(v,D,F,B,I,Z){v.onBeforeRender(y,D,F,B,I,Z),v.modelViewMatrix.multiplyMatrices(F.matrixWorldInverse,v.matrixWorld),v.normalMatrix.getNormalMatrix(v.modelViewMatrix),I.onBeforeRender(y,D,F,B,v,Z),I.transparent===!0&&I.side===_n&&I.forceSinglePass===!1?(I.side=Rt,I.needsUpdate=!0,y.renderBufferDirect(F,D,B,I,v,Z),I.side=Fn,I.needsUpdate=!0,y.renderBufferDirect(F,D,B,I,v,Z),I.side=_n):y.renderBufferDirect(F,D,B,I,v,Z),v.onAfterRender(y,D,F,B,I,Z)}function Er(v,D,F){D.isScene!==!0&&(D=st);const B=xe.get(v),I=d.state.lights,Z=d.state.shadowsArray,ie=I.state.version,le=_e.getParameters(v,I.state,Z,D,F),pe=_e.getProgramCacheKey(le);let we=B.programs;B.environment=v.isMeshStandardMaterial?D.environment:null,B.fog=D.fog,B.envMap=(v.isMeshStandardMaterial?N:g).get(v.envMap||B.environment),B.envMapRotation=B.environment!==null&&v.envMap===null?D.environmentRotation:v.envMapRotation,we===void 0&&(v.addEventListener("dispose",Pe),we=new Map,B.programs=we);let Ae=we.get(pe);if(Ae!==void 0){if(B.currentProgram===Ae&&B.lightsStateVersion===ie)return Za(v,le),Ae}else le.uniforms=_e.getUniforms(v),v.onBeforeCompile(le,y),Ae=_e.acquireProgram(le,pe),we.set(pe,Ae),B.uniforms=le.uniforms;const Se=B.uniforms;return(!v.isShaderMaterial&&!v.isRawShaderMaterial||v.clipping===!0)&&(Se.clippingPlanes=J.uniform),Za(v,le),B.needsLights=tf(v),B.lightsStateVersion=ie,B.needsLights&&(Se.ambientLightColor.value=I.state.ambient,Se.lightProbe.value=I.state.probe,Se.directionalLights.value=I.state.directional,Se.directionalLightShadows.value=I.state.directionalShadow,Se.spotLights.value=I.state.spot,Se.spotLightShadows.value=I.state.spotShadow,Se.rectAreaLights.value=I.state.rectArea,Se.ltc_1.value=I.state.rectAreaLTC1,Se.ltc_2.value=I.state.rectAreaLTC2,Se.pointLights.value=I.state.point,Se.pointLightShadows.value=I.state.pointShadow,Se.hemisphereLights.value=I.state.hemi,Se.directionalShadowMap.value=I.state.directionalShadowMap,Se.directionalShadowMatrix.value=I.state.directionalShadowMatrix,Se.spotShadowMap.value=I.state.spotShadowMap,Se.spotLightMatrix.value=I.state.spotLightMatrix,Se.spotLightMap.value=I.state.spotLightMap,Se.pointShadowMap.value=I.state.pointShadowMap,Se.pointShadowMatrix.value=I.state.pointShadowMatrix),B.currentProgram=Ae,B.uniformsList=null,Ae}function Ka(v){if(v.uniformsList===null){const D=v.currentProgram.getUniforms();v.uniformsList=cs.seqWithValue(D.seq,v.uniforms)}return v.uniformsList}function Za(v,D){const F=xe.get(v);F.outputColorSpace=D.outputColorSpace,F.batching=D.batching,F.batchingColor=D.batchingColor,F.instancing=D.instancing,F.instancingColor=D.instancingColor,F.instancingMorph=D.instancingMorph,F.skinning=D.skinning,F.morphTargets=D.morphTargets,F.morphNormals=D.morphNormals,F.morphColors=D.morphColors,F.morphTargetsCount=D.morphTargetsCount,F.numClippingPlanes=D.numClippingPlanes,F.numIntersection=D.numClipIntersection,F.vertexAlphas=D.vertexAlphas,F.vertexTangents=D.vertexTangents,F.toneMapping=D.toneMapping}function Qu(v,D,F,B,I){D.isScene!==!0&&(D=st),M.resetTextureUnits();const Z=D.fog,ie=B.isMeshStandardMaterial?D.environment:null,le=U===null?y.outputColorSpace:U.isXRRenderTarget===!0?U.texture.colorSpace:Vi,pe=(B.isMeshStandardMaterial?N:g).get(B.envMap||ie),we=B.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,Ae=!!F.attributes.tangent&&(!!B.normalMap||B.anisotropy>0),Se=!!F.morphAttributes.position,He=!!F.morphAttributes.normal,qe=!!F.morphAttributes.color;let ft=Ln;B.toneMapped&&(U===null||U.isXRRenderTarget===!0)&&(ft=y.toneMapping);const at=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,Ve=at!==void 0?at.length:0,Ee=xe.get(B),_t=d.state.lights;if(ee===!0&&(me===!0||v!==x)){const yt=v===x&&B.id===E;J.setState(B,v,yt)}let Ye=!1;B.version===Ee.__version?(Ee.needsLights&&Ee.lightsStateVersion!==_t.state.version||Ee.outputColorSpace!==le||I.isBatchedMesh&&Ee.batching===!1||!I.isBatchedMesh&&Ee.batching===!0||I.isBatchedMesh&&Ee.batchingColor===!0&&I.colorTexture===null||I.isBatchedMesh&&Ee.batchingColor===!1&&I.colorTexture!==null||I.isInstancedMesh&&Ee.instancing===!1||!I.isInstancedMesh&&Ee.instancing===!0||I.isSkinnedMesh&&Ee.skinning===!1||!I.isSkinnedMesh&&Ee.skinning===!0||I.isInstancedMesh&&Ee.instancingColor===!0&&I.instanceColor===null||I.isInstancedMesh&&Ee.instancingColor===!1&&I.instanceColor!==null||I.isInstancedMesh&&Ee.instancingMorph===!0&&I.morphTexture===null||I.isInstancedMesh&&Ee.instancingMorph===!1&&I.morphTexture!==null||Ee.envMap!==pe||B.fog===!0&&Ee.fog!==Z||Ee.numClippingPlanes!==void 0&&(Ee.numClippingPlanes!==J.numPlanes||Ee.numIntersection!==J.numIntersection)||Ee.vertexAlphas!==we||Ee.vertexTangents!==Ae||Ee.morphTargets!==Se||Ee.morphNormals!==He||Ee.morphColors!==qe||Ee.toneMapping!==ft||Ee.morphTargetsCount!==Ve)&&(Ye=!0):(Ye=!0,Ee.__version=B.version);let $t=Ee.currentProgram;Ye===!0&&($t=Er(B,D,I));let hi=!1,Dt=!1,ji=!1;const rt=$t.getUniforms(),Ot=Ee.uniforms;if(ve.useProgram($t.program)&&(hi=!0,Dt=!0,ji=!0),B.id!==E&&(E=B.id,Dt=!0),hi||x!==v){ve.buffers.depth.getReversed()?(se.copy(v.projectionMatrix),m_(se),__(se),rt.setValue(w,"projectionMatrix",se)):rt.setValue(w,"projectionMatrix",v.projectionMatrix),rt.setValue(w,"viewMatrix",v.matrixWorldInverse);const wt=rt.map.cameraPosition;wt!==void 0&&wt.setValue(w,Ce.setFromMatrixPosition(v.matrixWorld)),Oe.logarithmicDepthBuffer&&rt.setValue(w,"logDepthBufFC",2/(Math.log(v.far+1)/Math.LN2)),(B.isMeshPhongMaterial||B.isMeshToonMaterial||B.isMeshLambertMaterial||B.isMeshBasicMaterial||B.isMeshStandardMaterial||B.isShaderMaterial)&&rt.setValue(w,"isOrthographic",v.isOrthographicCamera===!0),x!==v&&(x=v,Dt=!0,ji=!0)}if(I.isSkinnedMesh){rt.setOptional(w,I,"bindMatrix"),rt.setOptional(w,I,"bindMatrixInverse");const yt=I.skeleton;yt&&(yt.boneTexture===null&&yt.computeBoneTexture(),rt.setValue(w,"boneTexture",yt.boneTexture,M))}I.isBatchedMesh&&(rt.setOptional(w,I,"batchingTexture"),rt.setValue(w,"batchingTexture",I._matricesTexture,M),rt.setOptional(w,I,"batchingIdTexture"),rt.setValue(w,"batchingIdTexture",I._indirectTexture,M),rt.setOptional(w,I,"batchingColorTexture"),I._colorsTexture!==null&&rt.setValue(w,"batchingColorTexture",I._colorsTexture,M));const Bt=F.morphAttributes;if((Bt.position!==void 0||Bt.normal!==void 0||Bt.color!==void 0)&&be.update(I,F,$t),(Dt||Ee.receiveShadow!==I.receiveShadow)&&(Ee.receiveShadow=I.receiveShadow,rt.setValue(w,"receiveShadow",I.receiveShadow)),B.isMeshGouraudMaterial&&B.envMap!==null&&(Ot.envMap.value=pe,Ot.flipEnvMap.value=pe.isCubeTexture&&pe.isRenderTargetTexture===!1?-1:1),B.isMeshStandardMaterial&&B.envMap===null&&D.environment!==null&&(Ot.envMapIntensity.value=D.environmentIntensity),Dt&&(rt.setValue(w,"toneMappingExposure",y.toneMappingExposure),Ee.needsLights&&ef(Ot,ji),Z&&B.fog===!0&&oe.refreshFogUniforms(Ot,Z),oe.refreshMaterialUniforms(Ot,B,H,Q,d.state.transmissionRenderTarget[v.id]),cs.upload(w,Ka(Ee),Ot,M)),B.isShaderMaterial&&B.uniformsNeedUpdate===!0&&(cs.upload(w,Ka(Ee),Ot,M),B.uniformsNeedUpdate=!1),B.isSpriteMaterial&&rt.setValue(w,"center",I.center),rt.setValue(w,"modelViewMatrix",I.modelViewMatrix),rt.setValue(w,"normalMatrix",I.normalMatrix),rt.setValue(w,"modelMatrix",I.matrixWorld),B.isShaderMaterial||B.isRawShaderMaterial){const yt=B.uniformsGroups;for(let wt=0,Ls=yt.length;wt<Ls;wt++){const zn=yt[wt];C.update(zn,$t),C.bind(zn,$t)}}return $t}function ef(v,D){v.ambientLightColor.needsUpdate=D,v.lightProbe.needsUpdate=D,v.directionalLights.needsUpdate=D,v.directionalLightShadows.needsUpdate=D,v.pointLights.needsUpdate=D,v.pointLightShadows.needsUpdate=D,v.spotLights.needsUpdate=D,v.spotLightShadows.needsUpdate=D,v.rectAreaLights.needsUpdate=D,v.hemisphereLights.needsUpdate=D}function tf(v){return v.isMeshLambertMaterial||v.isMeshToonMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isShadowMaterial||v.isShaderMaterial&&v.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return P},this.getRenderTarget=function(){return U},this.setRenderTargetTextures=function(v,D,F){xe.get(v.texture).__webglTexture=D,xe.get(v.depthTexture).__webglTexture=F;const B=xe.get(v);B.__hasExternalTextures=!0,B.__autoAllocateDepthBuffer=F===void 0,B.__autoAllocateDepthBuffer||Fe.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),B.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(v,D){const F=xe.get(v);F.__webglFramebuffer=D,F.__useDefaultFramebuffer=D===void 0},this.setRenderTarget=function(v,D=0,F=0){U=v,A=D,P=F;let B=!0,I=null,Z=!1,ie=!1;if(v){const pe=xe.get(v);if(pe.__useDefaultFramebuffer!==void 0)ve.bindFramebuffer(w.FRAMEBUFFER,null),B=!1;else if(pe.__webglFramebuffer===void 0)M.setupRenderTarget(v);else if(pe.__hasExternalTextures)M.rebindTextures(v,xe.get(v.texture).__webglTexture,xe.get(v.depthTexture).__webglTexture);else if(v.depthBuffer){const Se=v.depthTexture;if(pe.__boundDepthTexture!==Se){if(Se!==null&&xe.has(Se)&&(v.width!==Se.image.width||v.height!==Se.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");M.setupDepthRenderbuffer(v)}}const we=v.texture;(we.isData3DTexture||we.isDataArrayTexture||we.isCompressedArrayTexture)&&(ie=!0);const Ae=xe.get(v).__webglFramebuffer;v.isWebGLCubeRenderTarget?(Array.isArray(Ae[D])?I=Ae[D][F]:I=Ae[D],Z=!0):v.samples>0&&M.useMultisampledRTT(v)===!1?I=xe.get(v).__webglMultisampledFramebuffer:Array.isArray(Ae)?I=Ae[F]:I=Ae,R.copy(v.viewport),q.copy(v.scissor),z=v.scissorTest}else R.copy(ge).multiplyScalar(H).floor(),q.copy(Le).multiplyScalar(H).floor(),z=Je;if(ve.bindFramebuffer(w.FRAMEBUFFER,I)&&B&&ve.drawBuffers(v,I),ve.viewport(R),ve.scissor(q),ve.setScissorTest(z),Z){const pe=xe.get(v.texture);w.framebufferTexture2D(w.FRAMEBUFFER,w.COLOR_ATTACHMENT0,w.TEXTURE_CUBE_MAP_POSITIVE_X+D,pe.__webglTexture,F)}else if(ie){const pe=xe.get(v.texture),we=D||0;w.framebufferTextureLayer(w.FRAMEBUFFER,w.COLOR_ATTACHMENT0,pe.__webglTexture,F||0,we)}E=-1},this.readRenderTargetPixels=function(v,D,F,B,I,Z,ie){if(!(v&&v.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let le=xe.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&ie!==void 0&&(le=le[ie]),le){ve.bindFramebuffer(w.FRAMEBUFFER,le);try{const pe=v.texture,we=pe.format,Ae=pe.type;if(!Oe.textureFormatReadable(we)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Oe.textureTypeReadable(Ae)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=v.width-B&&F>=0&&F<=v.height-I&&w.readPixels(D,F,B,I,De.convert(we),De.convert(Ae),Z)}finally{const pe=U!==null?xe.get(U).__webglFramebuffer:null;ve.bindFramebuffer(w.FRAMEBUFFER,pe)}}},this.readRenderTargetPixelsAsync=async function(v,D,F,B,I,Z,ie){if(!(v&&v.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let le=xe.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&ie!==void 0&&(le=le[ie]),le){const pe=v.texture,we=pe.format,Ae=pe.type;if(!Oe.textureFormatReadable(we))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Oe.textureTypeReadable(Ae))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(D>=0&&D<=v.width-B&&F>=0&&F<=v.height-I){ve.bindFramebuffer(w.FRAMEBUFFER,le);const Se=w.createBuffer();w.bindBuffer(w.PIXEL_PACK_BUFFER,Se),w.bufferData(w.PIXEL_PACK_BUFFER,Z.byteLength,w.STREAM_READ),w.readPixels(D,F,B,I,De.convert(we),De.convert(Ae),0);const He=U!==null?xe.get(U).__webglFramebuffer:null;ve.bindFramebuffer(w.FRAMEBUFFER,He);const qe=w.fenceSync(w.SYNC_GPU_COMMANDS_COMPLETE,0);return w.flush(),await p_(w,qe,4),w.bindBuffer(w.PIXEL_PACK_BUFFER,Se),w.getBufferSubData(w.PIXEL_PACK_BUFFER,0,Z),w.deleteBuffer(Se),w.deleteSync(qe),Z}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(v,D=null,F=0){v.isTexture!==!0&&(Ri("WebGLRenderer: copyFramebufferToTexture function signature has changed."),D=arguments[0]||null,v=arguments[1]);const B=Math.pow(2,-F),I=Math.floor(v.image.width*B),Z=Math.floor(v.image.height*B),ie=D!==null?D.x:0,le=D!==null?D.y:0;M.setTexture2D(v,0),w.copyTexSubImage2D(w.TEXTURE_2D,F,0,0,ie,le,I,Z),ve.unbindTexture()};const nf=w.createFramebuffer(),rf=w.createFramebuffer();this.copyTextureToTexture=function(v,D,F=null,B=null,I=0,Z=null){v.isTexture!==!0&&(Ri("WebGLRenderer: copyTextureToTexture function signature has changed."),B=arguments[0]||null,v=arguments[1],D=arguments[2],Z=arguments[3]||0,F=null),Z===null&&(I!==0?(Ri("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),Z=I,I=0):Z=0);let ie,le,pe,we,Ae,Se,He,qe,ft;const at=v.isCompressedTexture?v.mipmaps[Z]:v.image;if(F!==null)ie=F.max.x-F.min.x,le=F.max.y-F.min.y,pe=F.isBox3?F.max.z-F.min.z:1,we=F.min.x,Ae=F.min.y,Se=F.isBox3?F.min.z:0;else{const Bt=Math.pow(2,-I);ie=Math.floor(at.width*Bt),le=Math.floor(at.height*Bt),v.isDataArrayTexture?pe=at.depth:v.isData3DTexture?pe=Math.floor(at.depth*Bt):pe=1,we=0,Ae=0,Se=0}B!==null?(He=B.x,qe=B.y,ft=B.z):(He=0,qe=0,ft=0);const Ve=De.convert(D.format),Ee=De.convert(D.type);let _t;D.isData3DTexture?(M.setTexture3D(D,0),_t=w.TEXTURE_3D):D.isDataArrayTexture||D.isCompressedArrayTexture?(M.setTexture2DArray(D,0),_t=w.TEXTURE_2D_ARRAY):(M.setTexture2D(D,0),_t=w.TEXTURE_2D),w.pixelStorei(w.UNPACK_FLIP_Y_WEBGL,D.flipY),w.pixelStorei(w.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),w.pixelStorei(w.UNPACK_ALIGNMENT,D.unpackAlignment);const Ye=w.getParameter(w.UNPACK_ROW_LENGTH),$t=w.getParameter(w.UNPACK_IMAGE_HEIGHT),hi=w.getParameter(w.UNPACK_SKIP_PIXELS),Dt=w.getParameter(w.UNPACK_SKIP_ROWS),ji=w.getParameter(w.UNPACK_SKIP_IMAGES);w.pixelStorei(w.UNPACK_ROW_LENGTH,at.width),w.pixelStorei(w.UNPACK_IMAGE_HEIGHT,at.height),w.pixelStorei(w.UNPACK_SKIP_PIXELS,we),w.pixelStorei(w.UNPACK_SKIP_ROWS,Ae),w.pixelStorei(w.UNPACK_SKIP_IMAGES,Se);const rt=v.isDataArrayTexture||v.isData3DTexture,Ot=D.isDataArrayTexture||D.isData3DTexture;if(v.isDepthTexture){const Bt=xe.get(v),yt=xe.get(D),wt=xe.get(Bt.__renderTarget),Ls=xe.get(yt.__renderTarget);ve.bindFramebuffer(w.READ_FRAMEBUFFER,wt.__webglFramebuffer),ve.bindFramebuffer(w.DRAW_FRAMEBUFFER,Ls.__webglFramebuffer);for(let zn=0;zn<pe;zn++)rt&&(w.framebufferTextureLayer(w.READ_FRAMEBUFFER,w.COLOR_ATTACHMENT0,xe.get(v).__webglTexture,I,Se+zn),w.framebufferTextureLayer(w.DRAW_FRAMEBUFFER,w.COLOR_ATTACHMENT0,xe.get(D).__webglTexture,Z,ft+zn)),w.blitFramebuffer(we,Ae,ie,le,He,qe,ie,le,w.DEPTH_BUFFER_BIT,w.NEAREST);ve.bindFramebuffer(w.READ_FRAMEBUFFER,null),ve.bindFramebuffer(w.DRAW_FRAMEBUFFER,null)}else if(I!==0||v.isRenderTargetTexture||xe.has(v)){const Bt=xe.get(v),yt=xe.get(D);ve.bindFramebuffer(w.READ_FRAMEBUFFER,nf),ve.bindFramebuffer(w.DRAW_FRAMEBUFFER,rf);for(let wt=0;wt<pe;wt++)rt?w.framebufferTextureLayer(w.READ_FRAMEBUFFER,w.COLOR_ATTACHMENT0,Bt.__webglTexture,I,Se+wt):w.framebufferTexture2D(w.READ_FRAMEBUFFER,w.COLOR_ATTACHMENT0,w.TEXTURE_2D,Bt.__webglTexture,I),Ot?w.framebufferTextureLayer(w.DRAW_FRAMEBUFFER,w.COLOR_ATTACHMENT0,yt.__webglTexture,Z,ft+wt):w.framebufferTexture2D(w.DRAW_FRAMEBUFFER,w.COLOR_ATTACHMENT0,w.TEXTURE_2D,yt.__webglTexture,Z),I!==0?w.blitFramebuffer(we,Ae,ie,le,He,qe,ie,le,w.COLOR_BUFFER_BIT,w.NEAREST):Ot?w.copyTexSubImage3D(_t,Z,He,qe,ft+wt,we,Ae,ie,le):w.copyTexSubImage2D(_t,Z,He,qe,we,Ae,ie,le);ve.bindFramebuffer(w.READ_FRAMEBUFFER,null),ve.bindFramebuffer(w.DRAW_FRAMEBUFFER,null)}else Ot?v.isDataTexture||v.isData3DTexture?w.texSubImage3D(_t,Z,He,qe,ft,ie,le,pe,Ve,Ee,at.data):D.isCompressedArrayTexture?w.compressedTexSubImage3D(_t,Z,He,qe,ft,ie,le,pe,Ve,at.data):w.texSubImage3D(_t,Z,He,qe,ft,ie,le,pe,Ve,Ee,at):v.isDataTexture?w.texSubImage2D(w.TEXTURE_2D,Z,He,qe,ie,le,Ve,Ee,at.data):v.isCompressedTexture?w.compressedTexSubImage2D(w.TEXTURE_2D,Z,He,qe,at.width,at.height,Ve,at.data):w.texSubImage2D(w.TEXTURE_2D,Z,He,qe,ie,le,Ve,Ee,at);w.pixelStorei(w.UNPACK_ROW_LENGTH,Ye),w.pixelStorei(w.UNPACK_IMAGE_HEIGHT,$t),w.pixelStorei(w.UNPACK_SKIP_PIXELS,hi),w.pixelStorei(w.UNPACK_SKIP_ROWS,Dt),w.pixelStorei(w.UNPACK_SKIP_IMAGES,ji),Z===0&&D.generateMipmaps&&w.generateMipmap(_t),ve.unbindTexture()},this.copyTextureToTexture3D=function(v,D,F=null,B=null,I=0){return v.isTexture!==!0&&(Ri("WebGLRenderer: copyTextureToTexture3D function signature has changed."),F=arguments[0]||null,B=arguments[1]||null,v=arguments[2],D=arguments[3],I=arguments[4]||0),Ri('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(v,D,F,B,I)},this.initRenderTarget=function(v){xe.get(v).__webglFramebuffer===void 0&&M.setupRenderTarget(v)},this.initTexture=function(v){v.isCubeTexture?M.setTextureCube(v,0):v.isData3DTexture?M.setTexture3D(v,0):v.isDataArrayTexture||v.isCompressedArrayTexture?M.setTexture2DArray(v,0):M.setTexture2D(v,0),ve.unbindTexture()},this.resetState=function(){A=0,P=0,U=null,ve.reset(),nt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return gn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=We._getDrawingBufferColorSpace(e),t.unpackColorSpace=We._getUnpackColorSpace()}}function Ss(n){const e=`#pragma end_pre_strip
`,t=n.indexOf(e);if(t<0)throw new Error(`Invalid shader found when stripping header: ${n}`);return n.slice(t+e.length)}let Ge;function sr(n){const e=Ge.__externref_table_alloc();return Ge.__wbindgen_export_2.set(e,n),e}function tr(n,e){try{return n.apply(this,e)}catch(t){const i=sr(t);Ge.__wbindgen_exn_store(i)}}const Ku=typeof TextDecoder<"u"?new TextDecoder("utf-8",{ignoreBOM:!0,fatal:!0}):{decode:()=>{throw Error("TextDecoder not available")}};typeof TextDecoder<"u"&&Ku.decode();let or=null;function ls(){return(or===null||or.byteLength===0)&&(or=new Uint8Array(Ge.memory.buffer)),or}function Qr(n,e){return n=n>>>0,Ku.decode(ls().subarray(n,n+e))}let Xi=0;const us=typeof TextEncoder<"u"?new TextEncoder("utf-8"):{encode:()=>{throw Error("TextEncoder not available")}},IS=typeof us.encodeInto=="function"?function(n,e){return us.encodeInto(n,e)}:function(n,e){const t=us.encode(n);return e.set(t),{read:n.length,written:t.length}};function LS(n,e,t){if(t===void 0){const a=us.encode(n),c=e(a.length,1)>>>0;return ls().subarray(c,c+a.length).set(a),Xi=a.length,c}let i=n.length,r=e(i,1)>>>0;const s=ls();let o=0;for(;o<i;o++){const a=n.charCodeAt(o);if(a>127)break;s[r+o]=a}if(o!==i){o!==0&&(n=n.slice(o)),r=t(r,i,i=o+n.length*3,1)>>>0;const a=ls().subarray(r+o,r+i),c=IS(n,a);o+=c.written,r=t(r,i,o,1)>>>0}return Xi=o,r}let $n=null;function Ll(){return($n===null||$n.buffer.detached===!0||$n.buffer.detached===void 0&&$n.buffer!==Ge.memory.buffer)&&($n=new DataView(Ge.memory.buffer)),$n}function es(n){return n==null}let ar=null;function US(){return(ar===null||ar.byteLength===0)&&(ar=new Float32Array(Ge.memory.buffer)),ar}function Zu(n,e){const t=e(n.length*4,4)>>>0;return US().set(n,t/4),Xi=n.length,t}function Ds(n,e){if(!(n instanceof e))throw new Error(`expected instance of ${e.name}`)}function NS(n,e,t,i,r,s,o,a){const c=Zu(o,Ge.__wbindgen_malloc),l=Xi;Ds(a,Ga),Ge.gen_wavefield_128(n,e,t,i,r,s,c,l,a.__wbg_ptr)}function FS(n,e,t,i,r,s,o,a){const c=Zu(o,Ge.__wbindgen_malloc),l=Xi;Ds(a,Va),Ge.gen_wavefield_256(n,e,t,i,r,s,c,l,a.__wbg_ptr)}function OS(n,e){Ds(e,Va),Ge.gen_and_paint_height_field_256(n,e.__wbg_ptr)}function BS(n,e){Ds(e,Ga),Ge.gen_and_paint_height_field_128(n,e.__wbg_ptr)}const Ul=typeof FinalizationRegistry>"u"?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(n=>Ge.__wbg_retbuf128_free(n>>>0,1));class Ga{__destroy_into_raw(){const e=this.__wbg_ptr;return this.__wbg_ptr=0,Ul.unregister(this),e}free(){const e=this.__destroy_into_raw();Ge.__wbg_retbuf128_free(e,0)}constructor(){const e=Ge.retbuf128_new();return this.__wbg_ptr=e>>>0,Ul.register(this,this.__wbg_ptr,this),this}get_pos_out_ptr(){return Ge.retbuf128_get_pos_out_ptr(this.__wbg_ptr)>>>0}get_partial_out_ptr(){return Ge.retbuf128_get_partial_out_ptr(this.__wbg_ptr)>>>0}}const Nl=typeof FinalizationRegistry>"u"?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(n=>Ge.__wbg_retbuf256_free(n>>>0,1));class Va{__destroy_into_raw(){const e=this.__wbg_ptr;return this.__wbg_ptr=0,Nl.unregister(this),e}free(){const e=this.__destroy_into_raw();Ge.__wbg_retbuf256_free(e,0)}constructor(){const e=Ge.retbuf256_new();return this.__wbg_ptr=e>>>0,Nl.register(this,this.__wbg_ptr,this),this}get_pos_out_ptr(){return Ge.retbuf256_get_pos_out_ptr(this.__wbg_ptr)>>>0}get_partial_out_ptr(){return Ge.retbuf256_get_partial_out_ptr(this.__wbg_ptr)>>>0}}async function zS(n,e){if(typeof Response=="function"&&n instanceof Response){if(typeof WebAssembly.instantiateStreaming=="function")try{return await WebAssembly.instantiateStreaming(n,e)}catch(i){if(n.headers.get("Content-Type")!="application/wasm")console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n",i);else throw i}const t=await n.arrayBuffer();return await WebAssembly.instantiate(t,e)}else{const t=await WebAssembly.instantiate(n,e);return t instanceof WebAssembly.Instance?{instance:t,module:n}:t}}function kS(){const n={};return n.wbg={},n.wbg.__wbg_buffer_61b7ce01341d7f88=function(e){return e.buffer},n.wbg.__wbg_call_500db948e69c7330=function(){return tr(function(e,t,i){return e.call(t,i)},arguments)},n.wbg.__wbg_call_b0d8e36992d9900d=function(){return tr(function(e,t){return e.call(t)},arguments)},n.wbg.__wbg_crypto_ed58b8e10a292839=function(e){return e.crypto},n.wbg.__wbg_error_7534b8e9a36f1ab4=function(e,t){let i,r;try{i=e,r=t,console.error(Qr(e,t))}finally{Ge.__wbindgen_free(i,r,1)}},n.wbg.__wbg_getRandomValues_bcb4912f16000dc4=function(){return tr(function(e,t){e.getRandomValues(t)},arguments)},n.wbg.__wbg_msCrypto_0a36e2ec3a343d26=function(e){return e.msCrypto},n.wbg.__wbg_new_3ff5b33b1ce712df=function(e){return new Uint8Array(e)},n.wbg.__wbg_new_8a6f238a6ece86ea=function(){return new Error},n.wbg.__wbg_newnoargs_fd9e4bf8be2bc16d=function(e,t){return new Function(Qr(e,t))},n.wbg.__wbg_newwithbyteoffsetandlength_ba35896968751d91=function(e,t,i){return new Uint8Array(e,t>>>0,i>>>0)},n.wbg.__wbg_newwithlength_34ce8f1051e74449=function(e){return new Uint8Array(e>>>0)},n.wbg.__wbg_node_02999533c4ea02e3=function(e){return e.node},n.wbg.__wbg_process_5c1d670bc53614b8=function(e){return e.process},n.wbg.__wbg_randomFillSync_ab2cfe79ebbf2740=function(){return tr(function(e,t){e.randomFillSync(t)},arguments)},n.wbg.__wbg_require_79b1e9274cde3c87=function(){return tr(function(){return module.require},arguments)},n.wbg.__wbg_set_23d69db4e5c66a6e=function(e,t,i){e.set(t,i>>>0)},n.wbg.__wbg_stack_0ed75d68575b0f3c=function(e,t){const i=t.stack,r=LS(i,Ge.__wbindgen_malloc,Ge.__wbindgen_realloc),s=Xi;Ll().setInt32(e+4*1,s,!0),Ll().setInt32(e+4*0,r,!0)},n.wbg.__wbg_static_accessor_GLOBAL_0be7472e492ad3e3=function(){const e=typeof global>"u"?null:global;return es(e)?0:sr(e)},n.wbg.__wbg_static_accessor_GLOBAL_THIS_1a6eb482d12c9bfb=function(){const e=typeof globalThis>"u"?null:globalThis;return es(e)?0:sr(e)},n.wbg.__wbg_static_accessor_SELF_1dc398a895c82351=function(){const e=typeof self>"u"?null:self;return es(e)?0:sr(e)},n.wbg.__wbg_static_accessor_WINDOW_ae1c80c7eea8d64a=function(){const e=typeof window>"u"?null:window;return es(e)?0:sr(e)},n.wbg.__wbg_subarray_46adeb9b86949d12=function(e,t,i){return e.subarray(t>>>0,i>>>0)},n.wbg.__wbg_versions_c71aa1626a93e0a1=function(e){return e.versions},n.wbg.__wbindgen_init_externref_table=function(){const e=Ge.__wbindgen_export_2,t=e.grow(4);e.set(0,void 0),e.set(t+0,void 0),e.set(t+1,null),e.set(t+2,!0),e.set(t+3,!1)},n.wbg.__wbindgen_is_function=function(e){return typeof e=="function"},n.wbg.__wbindgen_is_object=function(e){const t=e;return typeof t=="object"&&t!==null},n.wbg.__wbindgen_is_string=function(e){return typeof e=="string"},n.wbg.__wbindgen_is_undefined=function(e){return e===void 0},n.wbg.__wbindgen_memory=function(){return Ge.memory},n.wbg.__wbindgen_string_new=function(e,t){return Qr(e,t)},n.wbg.__wbindgen_throw=function(e,t){throw new Error(Qr(e,t))},n}function HS(n,e){return Ge=n.exports,Ju.__wbindgen_wasm_module=e,$n=null,ar=null,or=null,Ge.__wbindgen_start(),Ge}async function Ju(n){if(Ge!==void 0)return Ge;typeof n<"u"&&(Object.getPrototypeOf(n)===Object.prototype?{module_or_path:n}=n:console.warn("using deprecated parameters for the initialization function; pass a single object instead")),typeof n>"u"&&(n=new URL("https://prototypical.pro/assets/wasm_waves_bg-CVBMQLId.wasm",import.meta.url));const e=kS();(typeof n=="string"||typeof Request=="function"&&n instanceof Request||typeof URL=="function"&&n instanceof URL)&&(n=fetch(n));const{instance:t,module:i}=await zS(await n,e);return HS(t,i)}class Wa{constructor(e,t,i,r,s){this.memory=e,this.module=t,this.retBuf=i,this.step=r,this.width=s}static async MakeWasmWaves({depth:e,wind_speed:t,fetch:i,damping:r,swell:s,rad_off:o,windows:a,lowPerf:c=!1}){const l=await Ju();let u;return c?(u=new Ga,NS(e,t,i,r,s,o,new Float32Array(a),u)):(u=new Va,FS(e,t,i,r,s,o,new Float32Array(a),u)),new Wa(l.memory,l,u,c?BS:OS,c?128:256)}getPtrs(){return[this.retBuf.get_pos_out_ptr(),this.retBuf.get_partial_out_ptr()]}getPackedSize(){return this.width*this.width}getPackedSizeFloats(){return this.getPackedSize()*4}getPackedSizeBytes(){return this.getPackedSizeFloats()*Float32Array.BYTES_PER_ELEMENT}render({time:e}){this.step(e,this.retBuf)}getBuffer(){return this.memory.buffer}}var GS=`#version 300 es

#pragma end_pre_strip

in vec3 position;
in vec4 wavePosition;
in vec4 wavePartial;

flat out vec4 fragPosition;
flat out vec4 fragPartial;

void main() {
    gl_Position = vec4(position, 1.0);
    gl_PointSize = 1.0;
    fragPosition = wavePosition;
    fragPartial = wavePartial;
}`,VS=`#version 300 es

#pragma end_pre_strip

precision highp float;
precision highp int;
precision highp sampler2D;

flat in vec4 fragPosition; 
flat in vec4 fragPartial; 

layout(location = 0) out vec4 position; 
layout(location = 1) out vec2 firstMoments; 
layout(location = 2) out vec3 secondMoments; 

void main() {
    position = fragPosition;
    firstMoments = vec2(fragPartial.zw / (1. + fragPartial.xy));
    secondMoments = vec3(firstMoments.xyx * firstMoments.xyy);
}`;class WS{constructor(e,t,i,r,s){this.width=i,this.filterCount=r,this.blankCamera=new ka,this.blankCamera.position.z=1,this.makeTexMat=new W_({glslVersion:gs,vertexShader:Ss(GS),fragmentShader:Ss(VS)});const o=2/this.width,a=1/this.width,c=new Float32Array({length:this.width**2*3});let l=0;for(let u=0;u<this.width;u++)for(let f=0;f<this.width;f++)c[l++]=f*o+a-1,c[l++]=u*o+a-1,c[l++]=0;this.makeTexMeshs=[];for(let u=0;u<this.filterCount;u++){const f=new yn;f.setAttribute("position",new Nt(c,3)),f.setAttribute("wavePosition",e[u]),f.setAttribute("wavePartial",t[u]),this.makeTexMeshs.push(new V_(f,this.makeTexMat))}this.renderTargets=new Array(this.filterCount).fill(0).map(()=>new On(this.width,this.width,{count:3,magFilter:s?Wt:Ct,minFilter:Ct,depthBuffer:!1,stencilBuffer:!1,type:nn,generateMipmaps:!0,wrapS:ai,wrapT:ai,format:Xt}))}render(e){if(!this.makeTexMeshs[0].geometry.attributes.wavePosition.array)throw new Error("Geometry attributes not updated!");for(let t=0;t<this.filterCount;t++)e.setRenderTarget(this.renderTargets[t]),e.render(this.makeTexMeshs[t],this.blankCamera)}getDisplacementTexs(){return this.renderTargets.map(e=>e.textures[0])}getFirstMomentTexs(){return this.renderTargets.map(e=>e.textures[1])}getSecondMomentTexs(){return this.renderTargets.map(e=>e.textures[2])}}class XS{constructor(e){this.p=e,this.target=[0,0],this.current=[0,0],this.lastTime=Date.now()}easeOutCirc(e){return Math.sqrt(1-Math.pow(e-1,2))}pushValue(e){(this.target[0]!==e[0]||this.target[1]!==e[1])&&(this.target=e)}getValue(){const e=Date.now(),t=e-this.lastTime;this.lastTime=e;const i=[this.target[0]-this.current[0],this.target[1]-this.current[1]];if(i[0]==0&&i[1]==0)return this.target;const r=[i[0]*this.p,i[1]*this.p];return this.current=[this.current[0]+r[0]*t,this.current[1]+r[1]*t],this.current}}var qS=`#version 300 es

uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform vec3 cameraPosition;

in vec3 position; 

#define UNROLLED_LOOP_INDEX 0

#pragma end_pre_strip

#define FILTER_COUNT 2

precision highp float;
precision highp int;
precision highp sampler2D;

const float WIDTH = 256.;

uniform sampler2D waveDisplacement[FILTER_COUNT];
uniform mat3 waveTextureMatrix[FILTER_COUNT]; 
uniform float domain;
uniform float waveBlending[FILTER_COUNT];

out vec2 v_wave_tex_uv[FILTER_COUNT]; 

out vec3 v_position; 

vec3 proj(vec4 a) {
    return a.xyz / a.w;
}

void main() {
    vec3 positionTmp = position.xyz;

    
    vec3 waveTexCoords;
    float scale;
#pragma unroll_loop_start
    for (int i = 0; i < 2; i++) {
        scale = domain * waveTextureMatrix[i][0][0];

        waveTexCoords = waveTextureMatrix[i]*vec3(position.xy, 1.0);
        v_wave_tex_uv[i] = waveTexCoords.xy / waveTexCoords.z;
        positionTmp += waveBlending[i]*texture(waveDisplacement[UNROLLED_LOOP_INDEX], v_wave_tex_uv[i]).xyz;
    }
#pragma unroll_loop_end
    v_position = proj(modelMatrix*vec4(positionTmp, 1.));
	gl_Position = projectionMatrix*modelViewMatrix*vec4(positionTmp, 1.);
}`,YS=`#version 300 es
#extension GL_GOOGLE_include_directive : enable

#define SUNSET_COLOR_COUNT 1
#define UNROLLED_LOOP_INDEX 0

#define LEADR_SAMPLE_COUNT 1
#define LEADR_SAMPLE_SIZE 1.
#define LEADR_WEIGHTS vec4(0, 0, 0, 0)

#define cameraPosition vec3(0)

#pragma end_pre_strip

#define FILTER_COUNT 2

precision highp float;
precision highp int;
precision highp sampler2D;

const float TWO_PI = 6.28318530717958647693;
const float AIR_REFRACT = 1.;
const float WATER_REFRACT = 4./3.;
const float OIL_REFRACT = 1.5;
const float ETA = AIR_REFRACT / WATER_REFRACT;
const float INV_ETA = WATER_REFRACT / AIR_REFRACT;

const vec3 floorNormal = vec3(0., 0., 1.);  
uniform vec3 floorPosition;
uniform mat3 floorTextureMatrix; 
uniform float floorSize; 
uniform float floorPixels;
uniform sampler2D floorTexture;

uniform samplerCube skyboxTex;

uniform vec3 sunDirection;
uniform vec3 sunColor;

uniform sampler2D waveDisplacement[FILTER_COUNT]; 
uniform sampler2D waveMoments[FILTER_COUNT]; 
uniform sampler2D waveSecMoments[FILTER_COUNT]; 
uniform float waveBlending[FILTER_COUNT];

in vec2 v_wave_tex_uv[FILTER_COUNT];
in vec3 v_position; 

out vec4 color;

vec4 cubic(float v){
    vec4 n = vec4(1.0, 2.0, 3.0, 4.0) - v;
    vec4 s = n * n * n;
    float x = s.x;
    float y = s.y - 4.0 * s.x;
    float z = s.z - 4.0 * s.y + 6.0 * s.x;
    float w = 6.0 - x - y - z;
    return vec4(x, y, z, w) * (1.0/6.0);
}

vec4 textureBicubic(sampler2D sampler, vec2 texCoords){
    vec2 texSize = vec2(textureSize(sampler, 0));
    vec2 invTexSize = 1.0 / texSize;
    
    texCoords = texCoords * texSize - 0.5;

    vec2 fxy = fract(texCoords);
    texCoords -= fxy;

    vec4 xcubic = cubic(fxy.x);
    vec4 ycubic = cubic(fxy.y);

    vec4 c = texCoords.xxyy + vec2 (-0.5, +1.5).xyxy;

    vec4 s = vec4(xcubic.xz + xcubic.yw, ycubic.xz + ycubic.yw);
    vec4 offset = c + vec4 (xcubic.yw, ycubic.yw) / s;

    offset *= invTexSize.xxyy;

    vec4 sample0 = texture(sampler, offset.xz);
    vec4 sample1 = texture(sampler, offset.yz);
    vec4 sample2 = texture(sampler, offset.xw);
    vec4 sample3 = texture(sampler, offset.yw);

    float sx = s.x / (s.x + s.y);
    float sy = s.z / (s.z + s.w);

    return mix(mix(sample3, sample2, sx), mix(sample1, sample0, sx), sy);
}

vec2 combineFirstMoments(vec2 moments[FILTER_COUNT]) {
    return moments[0] + moments[1];
}

vec3 addSecondMoments(vec2 firstMomentLhs, vec3 secMomentsLhs, vec2 firstMomentRhs, vec3 secMomentsRhs) {
    return vec3(
        secMomentsLhs.xy + secMomentsRhs.xy + 2.*firstMomentLhs.xy*firstMomentRhs.xy,
        secMomentsLhs.z + secMomentsRhs.z + firstMomentLhs.x*firstMomentRhs.y + firstMomentLhs.y*firstMomentRhs.x);
}

vec3 combineSecondMoments(vec2 moments[FILTER_COUNT], vec3 secMoments[FILTER_COUNT]) {
    vec2 moments01 = moments[0] + moments[1];
    return addSecondMoments(moments[0], secMoments[0], moments[1], secMoments[1]);
}

float fresnel(vec3 wi, vec3 wn, vec3 secMoments) {
    const float R = (ETA - 1.)*(ETA - 1.)/pow(ETA + 1., 2.); 
    float alpha_v = sqrt(dot(secMoments.xy, wi.xy*wi.xy));
    return R + (1. - R)*pow(1. - dot(wi, wn), 5.*exp(-2.69*alpha_v)) / (1. + 22.7*pow(alpha_v, 1.5));
}

float P22(vec2 wnSlope, vec2 firstMoments, vec3 secMoments, float c_xy) {
    vec2 wn = wnSlope - firstMoments.xy;
    float det = secMoments.x*secMoments.y - c_xy*c_xy;
    float arg_exp = -0.5 * (wn.x*wn.x*secMoments.y + wn.y*wn.y*secMoments.x - 2.0*wn.x*wn.y*c_xy) / det;
    return 0.15915 * inversesqrt(det)*exp(arg_exp);
}

float Beckmann(vec3 wn, vec2 firstMoments, vec3 secMoments, float c_xy) {
    vec2 wnSlope = -wn.xy / wn.z;
    float p22_ = P22(wnSlope, firstMoments, secMoments, c_xy);
    return p22_ / pow(wn.z, 4.);
}

float Lambda(vec3 wi, vec2 firstMoments, vec3 secMoments, float c_xy) {
    vec2 wp = normalize(wi.xy);
    float mu_phi = wp.x*firstMoments.x + wp.y*firstMoments.y;
    float var_phi = wp.x*wp.x*secMoments.x + wp.y*wp.y*secMoments.y + 2.*wp.x*wp.y*c_xy;

    float cot_theta_v = wi.z / sqrt(1. - wi.z*wi.z);

    float nu_v = clamp((cot_theta_v - mu_phi)*inversesqrt(2.*var_phi), 0.001, 1.599);
    return (1.0 - 1.259*nu_v + 0.396*nu_v*nu_v) / (3.535*nu_v + 2.181*nu_v*nu_v);
}

float LEADRSpecular(vec3 wi, vec2 firstMoments, vec3 secMoments, float c_xy) {
    vec3 wh = normalize(-wi + -sunDirection);
    if (wh.z <= 0.) return 0.;

    float d = Beckmann(wh, firstMoments, secMoments, c_xy);

    float lamda_v = Lambda(-wi, firstMoments, secMoments, c_xy);
    float lamda_l = Lambda(-sunDirection, firstMoments, secMoments, c_xy);
    float shadowing = 1. / (1. + lamda_v + lamda_l);

    float invProjArea = 1. / dot(vec3(-firstMoments, 1.), -wi);

    float f = 1. - fresnel(-wi, normalize(vec3(-firstMoments, 1.)), secMoments);

    float I = 0.25*invProjArea*d*f*shadowing;

    
    
    

    
    return I;
}

vec3 saturate (vec3 x)
{
    return clamp(x, 0., 1.);
}

vec3 bump3y (vec3 x, vec3 yoffset)
{
	vec3 y = vec3(1.,1.,1.) - x * x;
	y = saturate(y-yoffset);
	return y;
}

vec3 spectral_zucconi6 (float w)
{
	
	
	float x = clamp((w - 400.0)/ 300.0, 0., 1.);

	const vec3 c1 = vec3(3.54585104, 2.93225262, 2.41593945);
	const vec3 x1 = vec3(0.69549072, 0.49228336, 0.27699880);
	const vec3 y1 = vec3(0.02312639, 0.15225084, 0.52607955);

	const vec3 c2 = vec3(3.90307140, 3.21182957, 3.96587128);
	const vec3 x2 = vec3(0.11748627, 0.86755042, 0.66077860);
	const vec3 y2 = vec3(0.84897130, 0.88445281, 0.73949448);

	return
		bump3y(c1 * (x - x1), y1) +
		bump3y(c2 * (x - x2), y2) ;
}

float smoothstep_spectral(float w) {
    return smoothstep(300., 400., w)*(1. - smoothstep(700., 800., w));
}

vec3 sample_slick(float w) {
    return spectral_zucconi6 (w)*smoothstep_spectral(w);
}

vec3 OilSlickSampling(vec3 wi, vec2 firstMoments, vec3 secMoments) {
    vec2 sigma = sqrt(abs(secMoments.xy - firstMoments.xy*firstMoments.xy));
    float oil_thickness = max(sigma.x, sigma.y)*500. + 100.;
    
    

    vec3 wn = normalize(vec3(-firstMoments.xy, 1.));
    vec3 wp = refract(wi, wn, AIR_REFRACT / OIL_REFRACT);
    float lambda_base = 2.*OIL_REFRACT*oil_thickness*abs(dot(wp, wn));

    vec3 color3 = vec3(0);

#pragma unroll_loop_start
    for (int i = 0; i < 3; i++) {
        color3 = color3 + sample_slick(lambda_base / (float(UNROLLED_LOOP_INDEX) + 1.));
    }
#pragma unroll_loop_end

    return color3;
}

float linePlaneDistance(vec3 linePoint, vec3 lineSlope, vec3 planePoint, vec3 planeNormal) {
    return dot(planePoint - linePoint, planeNormal) / dot(lineSlope, planeNormal);
}

vec3 linePlaneIntersection(vec3 linePoint, vec3 lineSlope, vec3 planePoint, vec3 planeNormal) {
    float d = linePlaneDistance(linePoint, lineSlope, planePoint, planeNormal);
    return linePoint + lineSlope*d;
}

vec3 sampleRefractLEADR(vec3 wi, vec3 wn, float lodOffset) {
    const vec3 macronormal = vec3(0, 0, 1.);

    
    vec3 wt = refract(wi, wn, ETA);
    float eta_wtwn = INV_ETA*dot(wt, wn);
    float J = (pow(abs(dot(wi, wn)) + eta_wtwn, 2.) / (INV_ETA*abs(eta_wtwn)))*pow(dot(wn, macronormal), 3.);

    float d = linePlaneDistance(v_position, wt, floorPosition, floorNormal);
    float lod = 0.72 * log(max(0.0001, J * (0.5 / 1.5))) + lodOffset;

    vec3 floorIntersect = v_position + d*wt;
    vec3 floorTex = floorTextureMatrix*vec3(floorIntersect.xy, 1.0);
    return textureProjLod(floorTexture, floorTex, lod).xyz;
}

vec3 LEADREnvironmentMapSampling(vec3 wi, vec2 firstMoments, vec3 secMoments, float cxy) {
    const vec3 macronormal = vec3(0, 0, 1.);
    
    const vec4[LEADR_SAMPLE_COUNT*LEADR_SAMPLE_COUNT] weights = vec4[] (
        LEADR_WEIGHTS
    );

    vec2 sigma = sqrt(abs(secMoments.xy - firstMoments.xy*firstMoments.xy));
    float lodOffset = -1.0 + log2(LEADR_SAMPLE_SIZE * (0.5 / 1.5) * max(sigma.x, sigma.y) * 2048.0);
    float rxy = cxy/(sigma.x*sigma.y);
    float rxyTerm = sqrt(1. - rxy*rxy);
    

    
    vec3 I = vec3(0, 0, 0);
    vec3 S = vec3(0, 0, 0);

    for (int i = 0; i < LEADR_SAMPLE_COUNT*LEADR_SAMPLE_COUNT; i++) {
        vec4 wvec = weights[i];

        float x = firstMoments.x + wvec.x*sigma.x;
        float y = (rxy*wvec.x + rxyTerm*wvec.y)*sigma.y + firstMoments.y;
        vec3 wn = normalize(vec3(-x, -y, 1.)); 
        float c = abs(dot(wi, wn));

        float Wn = wvec.z*wvec.w;
        float proj = max(0., dot(wn, -wi)) / wn.z;
        float f = 1. - fresnel(-wi, wn, secMoments);

        
        vec3 ftex = sampleRefractLEADR(wi, wn, lodOffset);
        

        I += Wn*proj*ftex*f;
        S += Wn*proj;
    }

    
    const float BIAS = 1.01;
    const float WEIGHT = 0.00001;
    vec3 mesonormal = normalize(vec3(-firstMoments, 1.)); 
    vec3 wnfix = normalize(mesonormal - dot(mesonormal, -wi)*1.01*(-wi));
    float fixproj = max(0., dot(wnfix, -wi)) / dot(wnfix, macronormal);
    float fbar = 1. - fresnel(-wi, wnfix, secMoments);
    vec3 texbar = sampleRefractLEADR(wi, wnfix, lodOffset);
    I += WEIGHT*fixproj*fbar*texbar;
    S += WEIGHT*fixproj;

    return I / S;
}

void main() {
    vec2 firstMomentsList[FILTER_COUNT];
firstMomentsList[0] = waveBlending[0]*textureBicubic(waveMoments[0], v_wave_tex_uv[0]).xy;
firstMomentsList[1] = waveBlending[1]*textureBicubic(waveMoments[1], v_wave_tex_uv[1]).xy;
    
vec3 secMomentsList[FILTER_COUNT];
secMomentsList[0] = waveBlending[0]*textureBicubic(waveSecMoments[0], v_wave_tex_uv[0]).xyz;
secMomentsList[1] = waveBlending[1]*textureBicubic(waveSecMoments[1], v_wave_tex_uv[1]).xyz;

vec2 firstMoments = combineFirstMoments(firstMomentsList);
vec3 secMoments = combineSecondMoments(firstMomentsList, secMomentsList);
float cxy = secMoments.z - firstMoments.x*firstMoments.y;
vec3 camera_normal = normalize(v_position - cameraPosition);

    
    

    
    

    vec3 ledar3 = LEADREnvironmentMapSampling(camera_normal, firstMoments, secMoments, cxy);
    vec3 spec3 = sunColor*LEADRSpecular(camera_normal, firstMoments, secMoments, cxy);
    vec3 inputLight = spec3 + ledar3;
    color = vec4(0.2*inputLight + inputLight*OilSlickSampling(camera_normal, firstMoments, secMoments), 1.);

    
}`;const nr=2,Ke=class Ke{constructor(e,t,i,r,s,o,a){this.canvasElem=e,this.wasmWaves=r,this.memory=s,this.lowPerf=a,this.camera=new Gt(50,1,.2,1e4),this.scene=new z_,this.parallaxSmoother=new XS(.01),this.oceanMeshList=[],[this.posPtr,this.partPtr]=o,this.renderer=new DS({canvas:e,stencil:!1,depth:!0,antialias:!0,powerPreference:"high-performance"}),this.camera.position.set(0,0,Ke.cameraDistance),this.wavePartialBufs=new Array(nr).fill(0).map(()=>new Nt(void 0,4)),this.wavePartialBufs.forEach(_=>_.setUsage(Gc)),this.wavePosBufs=new Array(nr).fill(0).map(()=>new Nt(void 0,4)),this.wavePosBufs.forEach(_=>_.setUsage(Gc));const c=this.renderer.extensions.has("OES_texture_float_linear");this.makeTex=new WS(this.wavePosBufs,this.wavePartialBufs,this.wasmWaves.width,nr,c);const l=[gt.DEFAULT_MAPPING,ai,ai,...c?[Wt,e_]:[Ct,Qm]];this.backTexLowRes=new gt(t,...l),this.backTexHighRes=new gt(i,...l),t.complete?(this.readyPromise=Promise.resolve(),this.backTexLowRes.needsUpdate=!0):this.readyPromise=new Promise(_=>{t.addEventListener("load",()=>{this.backTexLowRes.needsUpdate=!0,_()})}),i.complete?(this.floorTextureUniform=new Mt(this.backTexHighRes),this.backTexHighRes.needsUpdate=!0):(this.floorTextureUniform=new Mt(this.backTexLowRes),i.addEventListener("load",(()=>{this.floorTextureUniform.value=this.backTexHighRes,this.backTexHighRes.needsUpdate=!0}).bind(this))),this.oceanGeo=new xr(Ke.getDomain(),Ke.getDomain(),Ke.waveProps.segments,Ke.waveProps.segments);const u=this.makeRaytraceUniforms(),f=this.makeRaytraceDefines(),h=new sn({glslVersion:gs,vertexShader:Ss(qS),fragmentShader:Ss(YS),uniforms:u,defines:f}),m=new rn(this.oceanGeo,h);m.position.set(0,0,0),this.scene.add(m),this.resizeObserver=new ResizeObserver(this.onResizeEvent.bind(this));try{this.resizeObserver.observe(e,{box:"device-pixel-content-box"})}catch{this.resizeObserver.observe(e,{box:"content-box"})}}static async MakeView(e,t,i,r){const s=await Wa.MakeWasmWaves({...Ke.waveProps,lowPerf:r}),o=s.memory,a=s.getPtrs();return new Ke(e,t,i,s,o,a,r)}static makeWaveTextureUvTransform(e,t){const i=[];for(let r=0;r<nr;r++){const s=Ke.waveProps.tiling_off*Math.pow(10,-r),o=Ke.waveProps.windows[r*2+1];i.push(new Re().setUvTransform(t[0]+s,t[1]+s,e[0]/o,e[1]/o,0,0,0))}return i}static getDomain(){return Ke.waveProps.windows[Ke.waveProps.windows.length-1]}makeRaytraceDefines(){const{LeadrSampleCount:e,LeadrSampleSize:t}=Ke.waveProps,i=t*(e-1)/2,r=Array.from({length:e},(a,c)=>t*c-i),s=r.map(a=>Math.exp(-.5*a*a)),o=r.flatMap((a,c)=>r.map((l,u)=>`vec4(${a}, ${l}, ${s[c]}, ${s[u]})`));return{LEADR_SAMPLE_COUNT:e,LEADR_SAMPLE_SIZE:t.toPrecision(21),LEADR_WEIGHTS:o.join(", ")}}makeRaytraceUniforms(){const{blending:e}=Ke.waveProps,t=new Re().setUvTransform(.5,.5,1/Ke.getDomain(),1/Ke.getDomain(),0,0,0);return{waveDisplacement:new Mt(this.makeTex.getDisplacementTexs()),waveMoments:new Mt(this.makeTex.getFirstMomentTexs()),waveSecMoments:new Mt(this.makeTex.getSecondMomentTexs()),waveTextureMatrix:new Mt(Ke.makeWaveTextureUvTransform([1,-1],[1,1])),domain:new Mt(Ke.getDomain()),floorPosition:new Mt(new O(0,0,-Ke.waveProps.visualDepth)),floorTextureMatrix:new Mt(t),floorTexture:this.floorTextureUniform,floorSize:new Mt(Ke.getDomain()),sunDirection:new Mt(Ke.sunDirection),sunColor:new Mt(Ke.sunColor),skyboxTex:new Mt(this.scene.background),waveBlending:new Mt(e)}}onResizeEvent(e){const t=e.filter(c=>c.target===this.canvasElem)[0];if(!t)return;let i,r,s;s=window.devicePixelRatio,t.devicePixelContentBoxSize?(i=t.devicePixelContentBoxSize[0].inlineSize,r=t.devicePixelContentBoxSize[0].blockSize,s=1):t.contentBoxSize?t.contentBoxSize[0]?(i=t.contentBoxSize[0].inlineSize,r=t.contentBoxSize[0].blockSize):(i=t.contentBoxSize.inlineSize,r=t.contentBoxSize.blockSize):(i=t.contentRect.width,r=t.contentRect.height);const o=this.lowPerf?.5:1;this.camera.aspect=i/r;let a=Ke.cameraDistance;this.camera.aspect>=1&&(a=a/this.camera.aspect),this.camera.position.set(0,0,a),this.camera.updateProjectionMatrix(),this.renderer.setPixelRatio(s),this.renderer.setSize(i*o,r*o,!1)}updateGeoBuffers(e,t){for(let i=0;i<nr;i++){const r=this.wasmWaves.getPackedSizeBytes()*i,s=new Float32Array(this.memory.buffer,e+r,this.wasmWaves.getPackedSizeFloats());t[i].array=s,t[i].count=this.wasmWaves.getPackedSize(),t[i].needsUpdate=!0}}setParallax(e){this.parallaxSmoother.pushValue(e)}setParallaxInternal(e){const t=new O(e[0]*1.5,e[1]*1.5,this.camera.position.z);this.camera.position.set(t.x,t.y,t.z),this.camera.lookAt(0,0,0)}async update(e,t=!0){await this.readyPromise,t&&(this.wasmWaves.render({time:e*Ke.waveProps.timeScale}),this.updateGeoBuffers(this.posPtr,this.wavePosBufs),this.updateGeoBuffers(this.partPtr,this.wavePartialBufs),this.makeTex.render(this.renderer)),this.setParallaxInternal(this.parallaxSmoother.getValue()),this.renderer.setRenderTarget(null),this.renderer.render(this.scene,this.camera)}};Ke.waveProps={windows:[.13,5,5,10],blending:[.6,1],timeScale:.5,segments:128,depth:100,visualDepth:1,wind_speed:5,fetch:2e3,damping:3.3,swell:.7,rad_off:-60*Math.PI/180,tiling_off:.1,LeadrSampleCount:3,LeadrSampleSize:1.8},Ke.sunDirection=new O(-2,0,-1).normalize(),Ke.sunColor=new $e(1,.8,.9),Ke.cameraDistance=9;let xa=Ke;function Fl(n,e){return Math.min(Math.max(n,-e),e)}function Ol(n,e){let t=(e-n+180)%360;return t<0&&(t+=360),t-180}async function $S(){const n=document.getElementById("canvas"),e=document.getElementById("bg"),t=document.getElementById("bg_sm"),i=document.getElementById("preview"),r=window.matchMedia("(max-width: 768px)");console.debug("Performance check",r.matches);const s=await xa.MakeView(n,t,e,r.matches);let o=!1;const a=async f=>{await s.update(f/1e3,!0),o||(o=!0,i.style.opacity="0"),requestAnimationFrame(a)};requestAnimationFrame(a);let c,l;window.addEventListener("deviceorientation",f=>{if(typeof f.beta!="number"||typeof f.gamma!="number")return;(c===void 0||l===void 0)&&(c=f.beta,l=f.gamma);const h=180/Math.PI;s.setParallax([-Fl(Ol(f.gamma,l)*h*.001,1),Fl(Ol(f.beta,c)*h*.001,1)])},!0);const u=n.parentElement;u.addEventListener("mousemove",f=>{s.setParallax([-(f.offsetX/u.clientWidth*2-1),f.offsetY/u.clientHeight*2-1])}),u.addEventListener("mouseleave",()=>{s.setParallax([0,0])})}$S();
