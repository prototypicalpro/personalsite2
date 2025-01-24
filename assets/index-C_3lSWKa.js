(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))t(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&t(a)}).observe(document,{childList:!0,subtree:!0});function e(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function t(r){if(r.ep)return;r.ep=!0;const n=e(r);fetch(r.href,n)}})();const Ze=typeof __SENTRY_DEBUG__>"u"||__SENTRY_DEBUG__,Hi="8.50.0",Ge=globalThis;function En(i,e,t){const r=t||Ge,n=r.__SENTRY__=r.__SENTRY__||{},a=n[Hi]=n[Hi]||{};return a[i]||(a[i]=e())}const Gi=typeof __SENTRY_DEBUG__>"u"||__SENTRY_DEBUG__,oh="Sentry Logger ",Tn=["debug","info","warn","error","log","assert","trace"],bn={};function Vi(i){if(!("console"in Ge))return i();const e=Ge.console,t={},r=Object.keys(bn);r.forEach(n=>{const a=bn[n];t[n]=e[n],e[n]=a});try{return i()}finally{r.forEach(n=>{e[n]=t[n]})}}function lh(){let i=!1;const e={enable:()=>{i=!0},disable:()=>{i=!1},isEnabled:()=>i};return Gi?Tn.forEach(t=>{e[t]=(...r)=>{i&&Vi(()=>{Ge.console[t](`${oh}[${t}]:`,...r)})}}):Tn.forEach(t=>{e[t]=()=>{}}),e}const Me=En("logger",lh),Zo=50,Wi="?",Jo=/\(error: (.*)\)/,Qo=/captureMessage|captureException/;function el(...i){const e=i.sort((t,r)=>t[0]-r[0]).map(t=>t[1]);return(t,r=0,n=0)=>{const a=[],s=t.split(`
`);for(let o=r;o<s.length;o++){const l=s[o];if(l.length>1024)continue;const c=Jo.test(l)?l.replace(Jo,"$1"):l;if(!c.match(/\S*Error: /)){for(const u of e){const h=u(c);if(h){a.push(h);break}}if(a.length>=Zo+n)break}}return uh(a.slice(n))}}function ch(i){return Array.isArray(i)?el(...i):i}function uh(i){if(!i.length)return[];const e=Array.from(i);return/sentryWrapped/.test(wn(e).function||"")&&e.pop(),e.reverse(),Qo.test(wn(e).function||"")&&(e.pop(),Qo.test(wn(e).function||"")&&e.pop()),e.slice(0,Zo).map(t=>({...t,filename:t.filename||wn(e).filename,function:t.function||Wi}))}function wn(i){return i[i.length-1]||{}}const La="<anonymous>";function Ei(i){try{return!i||typeof i!="function"?La:i.name||La}catch{return La}}function tl(i){const e=i.exception;if(e){const t=[];try{return e.values.forEach(r=>{r.stacktrace.frames&&t.push(...r.stacktrace.frames)}),t}catch{return}}}const An={},il={};function Xi(i,e){An[i]=An[i]||[],An[i].push(e)}function ji(i,e){if(!il[i]){il[i]=!0;try{e()}catch(t){Gi&&Me.error(`Error while instrumenting ${i}`,t)}}}function Yt(i,e){const t=i&&An[i];if(t)for(const r of t)try{r(e)}catch(n){Gi&&Me.error(`Error while triggering instrumentation handler.
Type: ${i}
Name: ${Ei(r)}
Error:`,n)}}let Ua=null;function hh(i){const e="error";Xi(e,i),ji(e,dh)}function dh(){Ua=Ge.onerror,Ge.onerror=function(i,e,t,r,n){return Yt("error",{column:r,error:n,line:t,msg:i,url:e}),Ua?Ua.apply(this,arguments):!1},Ge.onerror.__SENTRY_INSTRUMENTED__=!0}let Da=null;function ph(i){const e="unhandledrejection";Xi(e,i),ji(e,fh)}function fh(){Da=Ge.onunhandledrejection,Ge.onunhandledrejection=function(i){return Yt("unhandledrejection",i),Da?Da.apply(this,arguments):!0},Ge.onunhandledrejection.__SENTRY_INSTRUMENTED__=!0}function Rn(){return Ia(Ge),Ge}function Ia(i){const e=i.__SENTRY__=i.__SENTRY__||{};return e.version=e.version||Hi,e[Hi]=e[Hi]||{}}const rl=Object.prototype.toString;function Na(i){switch(rl.call(i)){case"[object Error]":case"[object Exception]":case"[object DOMException]":case"[object WebAssembly.Exception]":return!0;default:return qi(i,Error)}}function mr(i,e){return rl.call(i)===`[object ${e}]`}function nl(i){return mr(i,"ErrorEvent")}function al(i){return mr(i,"DOMError")}function mh(i){return mr(i,"DOMException")}function si(i){return mr(i,"String")}function Oa(i){return typeof i=="object"&&i!==null&&"__sentry_template_string__"in i&&"__sentry_template_values__"in i}function Fa(i){return i===null||Oa(i)||typeof i!="object"&&typeof i!="function"}function gr(i){return mr(i,"Object")}function Cn(i){return typeof Event<"u"&&qi(i,Event)}function gh(i){return typeof Element<"u"&&qi(i,Element)}function _h(i){return mr(i,"RegExp")}function Pn(i){return!!(i&&i.then&&typeof i.then=="function")}function vh(i){return gr(i)&&"nativeEvent"in i&&"preventDefault"in i&&"stopPropagation"in i}function qi(i,e){try{return i instanceof e}catch{return!1}}function sl(i){return!!(typeof i=="object"&&i!==null&&(i.__isVue||i._isVue))}const za=Ge,xh=80;function ol(i,e={}){if(!i)return"<unknown>";try{let t=i;const r=5,n=[];let a=0,s=0;const o=" > ",l=o.length;let c;const u=Array.isArray(e)?e:e.keyAttrs,h=!Array.isArray(e)&&e.maxStringLength||xh;for(;t&&a++<r&&(c=yh(t,u),!(c==="html"||a>1&&s+n.length*l+c.length>=h));)n.push(c),s+=c.length,t=t.parentNode;return n.reverse().join(o)}catch{return"<unknown>"}}function yh(i,e){const t=i,r=[];if(!t||!t.tagName)return"";if(za.HTMLElement&&t instanceof HTMLElement&&t.dataset){if(t.dataset.sentryComponent)return t.dataset.sentryComponent;if(t.dataset.sentryElement)return t.dataset.sentryElement}r.push(t.tagName.toLowerCase());const n=e&&e.length?e.filter(s=>t.getAttribute(s)).map(s=>[s,t.getAttribute(s)]):null;if(n&&n.length)n.forEach(s=>{r.push(`[${s[0]}="${s[1]}"]`)});else{t.id&&r.push(`#${t.id}`);const s=t.className;if(s&&si(s)){const o=s.split(/\s+/);for(const l of o)r.push(`.${l}`)}}const a=["aria-label","type","name","title","alt"];for(const s of a){const o=t.getAttribute(s);o&&r.push(`[${s}="${o}"]`)}return r.join("")}function Sh(){try{return za.document.location.href}catch{return""}}function Mh(i){if(!za.HTMLElement)return null;let e=i;const t=5;for(let r=0;r<t;r++){if(!e)return null;if(e instanceof HTMLElement){if(e.dataset.sentryComponent)return e.dataset.sentryComponent;if(e.dataset.sentryElement)return e.dataset.sentryElement}e=e.parentNode}return null}function _r(i,e=0){return typeof i!="string"||e===0||i.length<=e?i:`${i.slice(0,e)}...`}function Ln(i,e){if(!Array.isArray(i))return"";const t=[];for(let r=0;r<i.length;r++){const n=i[r];try{sl(n)?t.push("[VueViewModel]"):t.push(String(n))}catch{t.push("[value cannot be serialized]")}}return t.join(e)}function Eh(i,e,t=!1){return si(i)?_h(e)?e.test(i):si(e)?t?i===e:i.includes(e):!1:!1}function Un(i,e=[],t=!1){return e.some(r=>Eh(i,r,t))}function Pt(i,e,t){if(!(e in i))return;const r=i[e],n=t(r);typeof n=="function"&&ll(n,r);try{i[e]=n}catch{Gi&&Me.log(`Failed to replace method "${e}" in object`,i)}}function Yi(i,e,t){try{Object.defineProperty(i,e,{value:t,writable:!0,configurable:!0})}catch{Gi&&Me.log(`Failed to add non-enumerable property "${e}" to object`,i)}}function ll(i,e){try{const t=e.prototype||{};i.prototype=e.prototype=t,Yi(i,"__sentry_original__",e)}catch{}}function Ba(i){return i.__sentry_original__}function cl(i){if(Na(i))return{message:i.message,name:i.name,stack:i.stack,...hl(i)};if(Cn(i)){const e={type:i.type,target:ul(i.target),currentTarget:ul(i.currentTarget),...hl(i)};return typeof CustomEvent<"u"&&qi(i,CustomEvent)&&(e.detail=i.detail),e}else return i}function ul(i){try{return gh(i)?ol(i):Object.prototype.toString.call(i)}catch{return"<unknown>"}}function hl(i){if(typeof i=="object"&&i!==null){const e={};for(const t in i)Object.prototype.hasOwnProperty.call(i,t)&&(e[t]=i[t]);return e}else return{}}function Th(i,e=40){const t=Object.keys(cl(i));t.sort();const r=t[0];if(!r)return"[object has no keys]";if(r.length>=e)return _r(r,e);for(let n=t.length;n>0;n--){const a=t.slice(0,n).join(", ");if(!(a.length>e))return n===t.length?a:_r(a,e)}return""}function Ft(i){return ka(i,new Map)}function ka(i,e){if(bh(i)){const t=e.get(i);if(t!==void 0)return t;const r={};e.set(i,r);for(const n of Object.getOwnPropertyNames(i))typeof i[n]<"u"&&(r[n]=ka(i[n],e));return r}if(Array.isArray(i)){const t=e.get(i);if(t!==void 0)return t;const r=[];return e.set(i,r),i.forEach(n=>{r.push(ka(n,e))}),r}return i}function bh(i){if(!gr(i))return!1;try{const e=Object.getPrototypeOf(i).constructor.name;return!e||e==="Object"}catch{return!0}}const dl=1e3;function Kr(){return Date.now()/dl}function wh(){const{performance:i}=Ge;if(!i||!i.now)return Kr;const e=Date.now()-i.now(),t=i.timeOrigin==null?e:i.timeOrigin;return()=>(t+i.now())/dl}const oi=wh();(()=>{const{performance:i}=Ge;if(!i||!i.now)return;const e=3600*1e3,t=i.now(),r=Date.now(),n=i.timeOrigin?Math.abs(i.timeOrigin+t-r):e,a=n<e,s=i.timing&&i.timing.navigationStart,o=typeof s=="number"?Math.abs(s+t-r):e,l=o<e;return a||l?n<=o?i.timeOrigin:s:r})();function zt(){const i=Ge,e=i.crypto||i.msCrypto;let t=()=>Math.random()*16;try{if(e&&e.randomUUID)return e.randomUUID().replace(/-/g,"");e&&e.getRandomValues&&(t=()=>{const r=new Uint8Array(1);return e.getRandomValues(r),r[0]})}catch{}return("10000000100040008000"+1e11).replace(/[018]/g,r=>(r^(t()&15)>>r/4).toString(16))}function pl(i){return i.exception&&i.exception.values?i.exception.values[0]:void 0}function Ti(i){const{message:e,event_id:t}=i;if(e)return e;const r=pl(i);return r?r.type&&r.value?`${r.type}: ${r.value}`:r.type||r.value||t||"<unknown>":t||"<unknown>"}function Ha(i,e,t){const r=i.exception=i.exception||{},n=r.values=r.values||[],a=n[0]=n[0]||{};a.value||(a.value=e||""),a.type||(a.type="Error")}function $i(i,e){const t=pl(i);if(!t)return;const r={type:"generic",handled:!0},n=t.mechanism;if(t.mechanism={...r,...n,...e},e&&"data"in e){const a={...n&&n.data,...e.data};t.mechanism.data=a}}function fl(i){if(Ah(i))return!0;try{Yi(i,"__sentry_captured__",!0)}catch{}return!1}function Ah(i){try{return i.__sentry_captured__}catch{}}var li;(function(i){i[i.PENDING=0]="PENDING";const e=1;i[i.RESOLVED=e]="RESOLVED";const t=2;i[i.REJECTED=t]="REJECTED"})(li||(li={}));function Ki(i){return new Wt(e=>{e(i)})}function Dn(i){return new Wt((e,t)=>{t(i)})}class Wt{constructor(e){Wt.prototype.__init.call(this),Wt.prototype.__init2.call(this),Wt.prototype.__init3.call(this),Wt.prototype.__init4.call(this),this._state=li.PENDING,this._handlers=[];try{e(this._resolve,this._reject)}catch(t){this._reject(t)}}then(e,t){return new Wt((r,n)=>{this._handlers.push([!1,a=>{if(!e)r(a);else try{r(e(a))}catch(s){n(s)}},a=>{if(!t)n(a);else try{r(t(a))}catch(s){n(s)}}]),this._executeHandlers()})}catch(e){return this.then(t=>t,e)}finally(e){return new Wt((t,r)=>{let n,a;return this.then(s=>{a=!1,n=s,e&&e()},s=>{a=!0,n=s,e&&e()}).then(()=>{if(a){r(n);return}t(n)})})}__init(){this._resolve=e=>{this._setResult(li.RESOLVED,e)}}__init2(){this._reject=e=>{this._setResult(li.REJECTED,e)}}__init3(){this._setResult=(e,t)=>{if(this._state===li.PENDING){if(Pn(t)){t.then(this._resolve,this._reject);return}this._state=e,this._value=t,this._executeHandlers()}}}__init4(){this._executeHandlers=()=>{if(this._state===li.PENDING)return;const e=this._handlers.slice();this._handlers=[],e.forEach(t=>{t[0]||(this._state===li.RESOLVED&&t[1](this._value),this._state===li.REJECTED&&t[2](this._value),t[0]=!0)})}}}function Rh(i){const e=oi(),t={sid:zt(),init:!0,timestamp:e,started:e,duration:0,status:"ok",errors:0,ignoreDuration:!1,toJSON:()=>Ph(t)};return vr(t,i),t}function vr(i,e={}){if(e.user&&(!i.ipAddress&&e.user.ip_address&&(i.ipAddress=e.user.ip_address),!i.did&&!e.did&&(i.did=e.user.id||e.user.email||e.user.username)),i.timestamp=e.timestamp||oi(),e.abnormal_mechanism&&(i.abnormal_mechanism=e.abnormal_mechanism),e.ignoreDuration&&(i.ignoreDuration=e.ignoreDuration),e.sid&&(i.sid=e.sid.length===32?e.sid:zt()),e.init!==void 0&&(i.init=e.init),!i.did&&e.did&&(i.did=`${e.did}`),typeof e.started=="number"&&(i.started=e.started),i.ignoreDuration)i.duration=void 0;else if(typeof e.duration=="number")i.duration=e.duration;else{const t=i.timestamp-i.started;i.duration=t>=0?t:0}e.release&&(i.release=e.release),e.environment&&(i.environment=e.environment),!i.ipAddress&&e.ipAddress&&(i.ipAddress=e.ipAddress),!i.userAgent&&e.userAgent&&(i.userAgent=e.userAgent),typeof e.errors=="number"&&(i.errors=e.errors),e.status&&(i.status=e.status)}function Ch(i,e){let t={};i.status==="ok"&&(t={status:"exited"}),vr(i,t)}function Ph(i){return Ft({sid:`${i.sid}`,init:i.init,started:new Date(i.started*1e3).toISOString(),timestamp:new Date(i.timestamp*1e3).toISOString(),status:i.status,errors:i.errors,did:typeof i.did=="number"||typeof i.did=="string"?`${i.did}`:void 0,duration:i.duration,abnormal_mechanism:i.abnormal_mechanism,attrs:{release:i.release,environment:i.environment,ip_address:i.ipAddress,user_agent:i.userAgent}})}function ml(){return zt()}function Ga(){return zt().substring(16)}function In(i,e,t=2){if(!e||typeof e!="object"||t<=0)return e;if(i&&e&&Object.keys(e).length===0)return i;const r={...i};for(const n in e)Object.prototype.hasOwnProperty.call(e,n)&&(r[n]=In(r[n],e[n],t-1));return r}const Va="_sentrySpan";function gl(i,e){e?Yi(i,Va,e):delete i[Va]}function _l(i){return i[Va]}const Lh=100;class Go{constructor(){this._notifyingListeners=!1,this._scopeListeners=[],this._eventProcessors=[],this._breadcrumbs=[],this._attachments=[],this._user={},this._tags={},this._extra={},this._contexts={},this._sdkProcessingMetadata={},this._propagationContext={traceId:ml(),spanId:Ga()}}clone(){const e=new Go;return e._breadcrumbs=[...this._breadcrumbs],e._tags={...this._tags},e._extra={...this._extra},e._contexts={...this._contexts},this._contexts.flags&&(e._contexts.flags={values:[...this._contexts.flags.values]}),e._user=this._user,e._level=this._level,e._session=this._session,e._transactionName=this._transactionName,e._fingerprint=this._fingerprint,e._eventProcessors=[...this._eventProcessors],e._requestSession=this._requestSession,e._attachments=[...this._attachments],e._sdkProcessingMetadata={...this._sdkProcessingMetadata},e._propagationContext={...this._propagationContext},e._client=this._client,e._lastEventId=this._lastEventId,gl(e,_l(this)),e}setClient(e){this._client=e}setLastEventId(e){this._lastEventId=e}getClient(){return this._client}lastEventId(){return this._lastEventId}addScopeListener(e){this._scopeListeners.push(e)}addEventProcessor(e){return this._eventProcessors.push(e),this}setUser(e){return this._user=e||{email:void 0,id:void 0,ip_address:void 0,username:void 0},this._session&&vr(this._session,{user:e}),this._notifyScopeListeners(),this}getUser(){return this._user}getRequestSession(){return this._requestSession}setRequestSession(e){return this._requestSession=e,this}setTags(e){return this._tags={...this._tags,...e},this._notifyScopeListeners(),this}setTag(e,t){return this._tags={...this._tags,[e]:t},this._notifyScopeListeners(),this}setExtras(e){return this._extra={...this._extra,...e},this._notifyScopeListeners(),this}setExtra(e,t){return this._extra={...this._extra,[e]:t},this._notifyScopeListeners(),this}setFingerprint(e){return this._fingerprint=e,this._notifyScopeListeners(),this}setLevel(e){return this._level=e,this._notifyScopeListeners(),this}setTransactionName(e){return this._transactionName=e,this._notifyScopeListeners(),this}setContext(e,t){return t===null?delete this._contexts[e]:this._contexts[e]=t,this._notifyScopeListeners(),this}setSession(e){return e?this._session=e:delete this._session,this._notifyScopeListeners(),this}getSession(){return this._session}update(e){if(!e)return this;const t=typeof e=="function"?e(this):e,[r,n]=t instanceof bi?[t.getScopeData(),t.getRequestSession()]:gr(t)?[e,e.requestSession]:[],{tags:a,extra:s,user:o,contexts:l,level:c,fingerprint:u=[],propagationContext:h}=r||{};return this._tags={...this._tags,...a},this._extra={...this._extra,...s},this._contexts={...this._contexts,...l},o&&Object.keys(o).length&&(this._user=o),c&&(this._level=c),u.length&&(this._fingerprint=u),h&&(this._propagationContext=h),n&&(this._requestSession=n),this}clear(){return this._breadcrumbs=[],this._tags={},this._extra={},this._user={},this._contexts={},this._level=void 0,this._transactionName=void 0,this._fingerprint=void 0,this._requestSession=void 0,this._session=void 0,gl(this,void 0),this._attachments=[],this.setPropagationContext({traceId:ml()}),this._notifyScopeListeners(),this}addBreadcrumb(e,t){const r=typeof t=="number"?t:Lh;if(r<=0)return this;const n={timestamp:Kr(),...e},a=this._breadcrumbs;return a.push(n),this._breadcrumbs=a.length>r?a.slice(-r):a,this._notifyScopeListeners(),this}getLastBreadcrumb(){return this._breadcrumbs[this._breadcrumbs.length-1]}clearBreadcrumbs(){return this._breadcrumbs=[],this._notifyScopeListeners(),this}addAttachment(e){return this._attachments.push(e),this}clearAttachments(){return this._attachments=[],this}getScopeData(){return{breadcrumbs:this._breadcrumbs,attachments:this._attachments,contexts:this._contexts,tags:this._tags,extra:this._extra,user:this._user,level:this._level,fingerprint:this._fingerprint||[],eventProcessors:this._eventProcessors,propagationContext:this._propagationContext,sdkProcessingMetadata:this._sdkProcessingMetadata,transactionName:this._transactionName,span:_l(this)}}setSDKProcessingMetadata(e){return this._sdkProcessingMetadata=In(this._sdkProcessingMetadata,e,2),this}setPropagationContext(e){return this._propagationContext={spanId:Ga(),...e},this}getPropagationContext(){return this._propagationContext}captureException(e,t){const r=t&&t.event_id?t.event_id:zt();if(!this._client)return Me.warn("No client configured on scope - will not capture exception!"),r;const n=new Error("Sentry syntheticException");return this._client.captureException(e,{originalException:e,syntheticException:n,...t,event_id:r},this),r}captureMessage(e,t,r){const n=r&&r.event_id?r.event_id:zt();if(!this._client)return Me.warn("No client configured on scope - will not capture message!"),n;const a=new Error(e);return this._client.captureMessage(e,t,{originalException:e,syntheticException:a,...r,event_id:n},this),n}captureEvent(e,t){const r=t&&t.event_id?t.event_id:zt();return this._client?(this._client.captureEvent(e,{...t,event_id:r},this),r):(Me.warn("No client configured on scope - will not capture event!"),r)}_notifyScopeListeners(){this._notifyingListeners||(this._notifyingListeners=!0,this._scopeListeners.forEach(e=>{e(this)}),this._notifyingListeners=!1)}}const bi=Go;function Uh(){return En("defaultCurrentScope",()=>new bi)}function Dh(){return En("defaultIsolationScope",()=>new bi)}class Ih{constructor(e,t){let r;e?r=e:r=new bi;let n;t?n=t:n=new bi,this._stack=[{scope:r}],this._isolationScope=n}withScope(e){const t=this._pushScope();let r;try{r=e(t)}catch(n){throw this._popScope(),n}return Pn(r)?r.then(n=>(this._popScope(),n),n=>{throw this._popScope(),n}):(this._popScope(),r)}getClient(){return this.getStackTop().client}getScope(){return this.getStackTop().scope}getIsolationScope(){return this._isolationScope}getStackTop(){return this._stack[this._stack.length-1]}_pushScope(){const e=this.getScope().clone();return this._stack.push({client:this.getClient(),scope:e}),e}_popScope(){return this._stack.length<=1?!1:!!this._stack.pop()}}function xr(){const i=Rn(),e=Ia(i);return e.stack=e.stack||new Ih(Uh(),Dh())}function Nh(i){return xr().withScope(i)}function Oh(i,e){const t=xr();return t.withScope(()=>(t.getStackTop().scope=i,e(i)))}function vl(i){return xr().withScope(()=>i(xr().getIsolationScope()))}function Fh(){return{withIsolationScope:vl,withScope:Nh,withSetScope:Oh,withSetIsolationScope:(i,e)=>vl(e),getCurrentScope:()=>xr().getScope(),getIsolationScope:()=>xr().getIsolationScope()}}function Wa(i){const e=Ia(i);return e.acs?e.acs:Fh()}function Qt(){const i=Rn();return Wa(i).getCurrentScope()}function Zr(){const i=Rn();return Wa(i).getIsolationScope()}function zh(){return En("globalScope",()=>new bi)}function xl(...i){const e=Rn(),t=Wa(e);if(i.length===2){const[r,n]=i;return r?t.withSetScope(r,n):t.withScope(n)}return t.withScope(i[0])}function gt(){return Qt().getClient()}function Bh(i){const e=i.getPropagationContext(),{traceId:t,spanId:r,parentSpanId:n}=e;return Ft({trace_id:t,span_id:r,parent_span_id:n})}const kh="_sentryMetrics";function Hh(i){const e=i[kh];if(!e)return;const t={};for(const[,[r,n]]of e)(t[r]||(t[r]=[])).push(Ft(n));return t}const Gh="sentry.source",Vh="sentry.sample_rate",Wh="sentry.op",Xh="sentry.origin",jh=0,qh=1,Yh="sentry-",$h=/^sentry-/;function Kh(i){const e=Zh(i);if(!e)return;const t=Object.entries(e).reduce((r,[n,a])=>{if(n.match($h)){const s=n.slice(Yh.length);r[s]=a}return r},{});if(Object.keys(t).length>0)return t}function Zh(i){if(!(!i||!si(i)&&!Array.isArray(i)))return Array.isArray(i)?i.reduce((e,t)=>{const r=yl(t);return Object.entries(r).forEach(([n,a])=>{e[n]=a}),e},{}):yl(i)}function yl(i){return i.split(",").map(e=>e.split("=").map(t=>decodeURIComponent(t.trim()))).reduce((e,[t,r])=>(t&&r&&(e[t]=r),e),{})}const Jh=1;let Sl=!1;function Qh(i){const{spanId:e,traceId:t,isRemote:r}=i.spanContext(),n=r?e:Xa(i).parent_span_id,a=r?Ga():e;return Ft({parent_span_id:n,span_id:a,trace_id:t})}function Ml(i){return typeof i=="number"?El(i):Array.isArray(i)?i[0]+i[1]/1e9:i instanceof Date?El(i.getTime()):oi()}function El(i){return i>9999999999?i/1e3:i}function Xa(i){if(td(i))return i.getSpanJSON();try{const{spanId:e,traceId:t}=i.spanContext();if(ed(i)){const{attributes:r,startTime:n,name:a,endTime:s,parentSpanId:o,status:l}=i;return Ft({span_id:e,trace_id:t,data:r,description:a,parent_span_id:o,start_timestamp:Ml(n),timestamp:Ml(s)||void 0,status:rd(l),op:r[Wh],origin:r[Xh],_metrics_summary:Hh(i)})}return{span_id:e,trace_id:t}}catch{return{}}}function ed(i){const e=i;return!!e.attributes&&!!e.startTime&&!!e.name&&!!e.endTime&&!!e.status}function td(i){return typeof i.getSpanJSON=="function"}function id(i){const{traceFlags:e}=i.spanContext();return e===Jh}function rd(i){if(!(!i||i.code===jh))return i.code===qh?"ok":i.message||"unknown_error"}const nd="_sentryRootSpan";function Tl(i){return i[nd]||i}function ad(){Sl||(Vi(()=>{console.warn("[Sentry] Deprecation warning: Returning null from `beforeSendSpan` will be disallowed from SDK version 9.0.0 onwards. The callback will only support mutating spans. To drop certain spans, configure the respective integrations directly.")}),Sl=!0)}function sd(i){if(typeof __SENTRY_TRACING__=="boolean"&&!__SENTRY_TRACING__)return!1;const e=gt(),t=e&&e.getOptions();return!!t&&(t.enableTracing||"tracesSampleRate"in t||"tracesSampler"in t)}const ja="production",od="_frozenDsc";function bl(i,e){const t=e.getOptions(),{publicKey:r}=e.getDsn()||{},n=Ft({environment:t.environment||ja,release:t.release,public_key:r,trace_id:i});return e.emit("createDsc",n),n}function ld(i,e){const t=e.getPropagationContext();return t.dsc||bl(t.traceId,i)}function cd(i){const e=gt();if(!e)return{};const t=Tl(i),r=t[od];if(r)return r;const n=t.spanContext().traceState,a=n&&n.get("sentry.dsc"),s=a&&Kh(a);if(s)return s;const o=bl(i.spanContext().traceId,e),l=Xa(t),c=l.data||{},u=c[Vh];u!=null&&(o.sample_rate=`${u}`);const h=c[Gh],d=l.description;return h!=="url"&&d&&(o.transaction=d),sd()&&(o.sampled=String(id(t))),e.emit("createDsc",o,t),o}function ud(i){if(typeof i=="boolean")return Number(i);const e=typeof i=="string"?parseFloat(i):i;if(typeof e!="number"||isNaN(e)||e<0||e>1){Ze&&Me.warn(`[Tracing] Given sample rate is invalid. Sample rate must be a boolean or a number between 0 and 1. Got ${JSON.stringify(i)} of type ${JSON.stringify(typeof i)}.`);return}return e}const hd=/^(?:(\w+):)\/\/(?:(\w+)(?::(\w+)?)?@)([\w.-]+)(?::(\d+))?\/(.+)/;function dd(i){return i==="http"||i==="https"}function Nn(i,e=!1){const{host:t,path:r,pass:n,port:a,projectId:s,protocol:o,publicKey:l}=i;return`${o}://${l}${e&&n?`:${n}`:""}@${t}${a?`:${a}`:""}/${r&&`${r}/`}${s}`}function pd(i){const e=hd.exec(i);if(!e){Vi(()=>{console.error(`Invalid Sentry Dsn: ${i}`)});return}const[t,r,n="",a="",s="",o=""]=e.slice(1);let l="",c=o;const u=c.split("/");if(u.length>1&&(l=u.slice(0,-1).join("/"),c=u.pop()),c){const h=c.match(/^\d+/);h&&(c=h[0])}return wl({host:a,pass:n,path:l,projectId:c,port:s,protocol:t,publicKey:r})}function wl(i){return{protocol:i.protocol,publicKey:i.publicKey||"",pass:i.pass||"",host:i.host,port:i.port||"",path:i.path||"",projectId:i.projectId}}function fd(i){if(!Gi)return!0;const{port:e,projectId:t,protocol:r}=i;return["protocol","publicKey","host","projectId"].find(n=>i[n]?!1:(Me.error(`Invalid Sentry Dsn: ${n} missing`),!0))?!1:t.match(/^\d+$/)?dd(r)?e&&isNaN(parseInt(e,10))?(Me.error(`Invalid Sentry Dsn: Invalid port ${e}`),!1):!0:(Me.error(`Invalid Sentry Dsn: Invalid protocol ${r}`),!1):(Me.error(`Invalid Sentry Dsn: Invalid projectId ${t}`),!1)}function md(i){const e=typeof i=="string"?pd(i):wl(i);if(!(!e||!fd(e)))return e}function gd(){const i=typeof WeakSet=="function",e=i?new WeakSet:[];function t(n){if(i)return e.has(n)?!0:(e.add(n),!1);for(let a=0;a<e.length;a++)if(e[a]===n)return!0;return e.push(n),!1}function r(n){if(i)e.delete(n);else for(let a=0;a<e.length;a++)if(e[a]===n){e.splice(a,1);break}}return[t,r]}function ci(i,e=100,t=1/0){try{return qa("",i,e,t)}catch(r){return{ERROR:`**non-serializable** (${r})`}}}function Al(i,e=3,t=100*1024){const r=ci(i,e);return yd(r)>t?Al(i,e-1,t):r}function qa(i,e,t=1/0,r=1/0,n=gd()){const[a,s]=n;if(e==null||["boolean","string"].includes(typeof e)||typeof e=="number"&&Number.isFinite(e))return e;const o=_d(i,e);if(!o.startsWith("[object "))return o;if(e.__sentry_skip_normalization__)return e;const l=typeof e.__sentry_override_normalization_depth__=="number"?e.__sentry_override_normalization_depth__:t;if(l===0)return o.replace("object ","");if(a(e))return"[Circular ~]";const c=e;if(c&&typeof c.toJSON=="function")try{const f=c.toJSON();return qa("",f,l-1,r,n)}catch{}const u=Array.isArray(e)?[]:{};let h=0;const d=cl(e);for(const f in d){if(!Object.prototype.hasOwnProperty.call(d,f))continue;if(h>=r){u[f]="[MaxProperties ~]";break}const v=d[f];u[f]=qa(f,v,l-1,r,n),h++}return s(e),u}function _d(i,e){try{if(i==="domain"&&e&&typeof e=="object"&&e._events)return"[Domain]";if(i==="domainEmitter")return"[DomainEmitter]";if(typeof global<"u"&&e===global)return"[Global]";if(typeof window<"u"&&e===window)return"[Window]";if(typeof document<"u"&&e===document)return"[Document]";if(sl(e))return"[VueViewModel]";if(vh(e))return"[SyntheticEvent]";if(typeof e=="number"&&!Number.isFinite(e))return`[${e}]`;if(typeof e=="function")return`[Function: ${Ei(e)}]`;if(typeof e=="symbol")return`[${String(e)}]`;if(typeof e=="bigint")return`[BigInt: ${String(e)}]`;const t=vd(e);return/^HTML(\w*)Element$/.test(t)?`[HTMLElement: ${t}]`:`[object ${t}]`}catch(t){return`**non-serializable** (${t})`}}function vd(i){const e=Object.getPrototypeOf(i);return e?e.constructor.name:"null prototype"}function xd(i){return~-encodeURI(i).split(/%..|./).length}function yd(i){return xd(JSON.stringify(i))}function Jr(i,e=[]){return[i,e]}function Sd(i,e){const[t,r]=i;return[t,[...r,e]]}function Rl(i,e){const t=i[1];for(const r of t){const n=r[0].type;if(e(r,n))return!0}return!1}function Ya(i){return Ge.__SENTRY__&&Ge.__SENTRY__.encodePolyfill?Ge.__SENTRY__.encodePolyfill(i):new TextEncoder().encode(i)}function Md(i){const[e,t]=i;let r=JSON.stringify(e);function n(a){typeof r=="string"?r=typeof a=="string"?r+a:[Ya(r),a]:r.push(typeof a=="string"?Ya(a):a)}for(const a of t){const[s,o]=a;if(n(`
${JSON.stringify(s)}
`),typeof o=="string"||o instanceof Uint8Array)n(o);else{let l;try{l=JSON.stringify(o)}catch{l=JSON.stringify(ci(o))}n(l)}}return typeof r=="string"?r:Ed(r)}function Ed(i){const e=i.reduce((n,a)=>n+a.length,0),t=new Uint8Array(e);let r=0;for(const n of i)t.set(n,r),r+=n.length;return t}function Td(i){const e=typeof i.data=="string"?Ya(i.data):i.data;return[Ft({type:"attachment",length:e.length,filename:i.filename,content_type:i.contentType,attachment_type:i.attachmentType}),e]}const bd={session:"session",sessions:"session",attachment:"attachment",transaction:"transaction",event:"error",client_report:"internal",user_report:"default",profile:"profile",profile_chunk:"profile",replay_event:"replay",replay_recording:"replay",check_in:"monitor",feedback:"feedback",span:"span",statsd:"metric_bucket",raw_security:"security"};function Cl(i){return bd[i]}function Pl(i){if(!i||!i.sdk)return;const{name:e,version:t}=i.sdk;return{name:e,version:t}}function wd(i,e,t,r){const n=i.sdkProcessingMetadata&&i.sdkProcessingMetadata.dynamicSamplingContext;return{event_id:i.event_id,sent_at:new Date().toISOString(),...e&&{sdk:e},...!!t&&r&&{dsn:Nn(r)},...n&&{trace:Ft({...n})}}}function Ad(i,e){return e&&(i.sdk=i.sdk||{},i.sdk.name=i.sdk.name||e.name,i.sdk.version=i.sdk.version||e.version,i.sdk.integrations=[...i.sdk.integrations||[],...e.integrations||[]],i.sdk.packages=[...i.sdk.packages||[],...e.packages||[]]),i}function Rd(i,e,t,r){const n=Pl(t),a={sent_at:new Date().toISOString(),...n&&{sdk:n},...!!r&&e&&{dsn:Nn(e)}},s="aggregates"in i?[{type:"sessions"},i]:[{type:"session"},i.toJSON()];return Jr(a,[s])}function Cd(i,e,t,r){const n=Pl(t),a=i.type&&i.type!=="replay_event"?i.type:"event";Ad(i,t&&t.sdk);const s=wd(i,n,r,e);return delete i.sdkProcessingMetadata,Jr(s,[[{type:a},i]])}function $a(i,e,t,r=0){return new Wt((n,a)=>{const s=i[r];if(e===null||typeof s!="function")n(e);else{const o=s({...e},t);Ze&&s.id&&o===null&&Me.log(`Event processor "${s.id}" dropped event`),Pn(o)?o.then(l=>$a(i,l,t,r+1).then(n)).then(null,a):$a(i,o,t,r+1).then(n).then(null,a)}})}let On,Ll,Ka;function Pd(i){const e=Ge._sentryDebugIds;if(!e)return{};const t=Object.keys(e);return Ka&&t.length===Ll||(Ll=t.length,Ka=t.reduce((r,n)=>{On||(On={});const a=On[n];if(a)r[a[0]]=a[1];else{const s=i(n);for(let o=s.length-1;o>=0;o--){const l=s[o],c=l&&l.filename,u=e[n];if(c&&u){r[c]=u,On[n]=[c,u];break}}}return r},{})),Ka}function Ld(i,e){const{fingerprint:t,span:r,breadcrumbs:n,sdkProcessingMetadata:a}=e;Ud(i,e),r&&Nd(i,r),Od(i,t),Dd(i,n),Id(i,a)}function Ul(i,e){const{extra:t,tags:r,user:n,contexts:a,level:s,sdkProcessingMetadata:o,breadcrumbs:l,fingerprint:c,eventProcessors:u,attachments:h,propagationContext:d,transactionName:f,span:v}=e;Fn(i,"extra",t),Fn(i,"tags",r),Fn(i,"user",n),Fn(i,"contexts",a),i.sdkProcessingMetadata=In(i.sdkProcessingMetadata,o,2),s&&(i.level=s),f&&(i.transactionName=f),v&&(i.span=v),l.length&&(i.breadcrumbs=[...i.breadcrumbs,...l]),c.length&&(i.fingerprint=[...i.fingerprint,...c]),u.length&&(i.eventProcessors=[...i.eventProcessors,...u]),h.length&&(i.attachments=[...i.attachments,...h]),i.propagationContext={...i.propagationContext,...d}}function Fn(i,e,t){i[e]=In(i[e],t,1)}function Ud(i,e){const{extra:t,tags:r,user:n,contexts:a,level:s,transactionName:o}=e,l=Ft(t);l&&Object.keys(l).length&&(i.extra={...l,...i.extra});const c=Ft(r);c&&Object.keys(c).length&&(i.tags={...c,...i.tags});const u=Ft(n);u&&Object.keys(u).length&&(i.user={...u,...i.user});const h=Ft(a);h&&Object.keys(h).length&&(i.contexts={...h,...i.contexts}),s&&(i.level=s),o&&i.type!=="transaction"&&(i.transaction=o)}function Dd(i,e){const t=[...i.breadcrumbs||[],...e];i.breadcrumbs=t.length?t:void 0}function Id(i,e){i.sdkProcessingMetadata={...i.sdkProcessingMetadata,...e}}function Nd(i,e){i.contexts={trace:Qh(e),...i.contexts},i.sdkProcessingMetadata={dynamicSamplingContext:cd(e),...i.sdkProcessingMetadata};const t=Tl(e),r=Xa(t).description;r&&!i.transaction&&i.type==="transaction"&&(i.transaction=r)}function Od(i,e){i.fingerprint=i.fingerprint?Array.isArray(i.fingerprint)?i.fingerprint:[i.fingerprint]:[],e&&(i.fingerprint=i.fingerprint.concat(e)),i.fingerprint&&!i.fingerprint.length&&delete i.fingerprint}function Fd(i,e,t,r,n,a){const{normalizeDepth:s=3,normalizeMaxBreadth:o=1e3}=i,l={...e,event_id:e.event_id||t.event_id||zt(),timestamp:e.timestamp||Kr()},c=t.integrations||i.integrations.map(x=>x.name);zd(l,i),Hd(l,c),n&&n.emit("applyFrameMetadata",e),e.type===void 0&&Bd(l,i.stackParser);const u=Vd(r,t.captureContext);t.mechanism&&$i(l,t.mechanism);const h=n?n.getEventProcessors():[],d=zh().getScopeData();if(a){const x=a.getScopeData();Ul(d,x)}if(u){const x=u.getScopeData();Ul(d,x)}const f=[...t.attachments||[],...d.attachments];f.length&&(t.attachments=f),Ld(l,d);const v=[...h,...d.eventProcessors];return $a(v,l,t).then(x=>(x&&kd(x),typeof s=="number"&&s>0?Gd(x,s,o):x))}function zd(i,e){const{environment:t,release:r,dist:n,maxValueLength:a=250}=e;i.environment=i.environment||t||ja,!i.release&&r&&(i.release=r),!i.dist&&n&&(i.dist=n),i.message&&(i.message=_r(i.message,a));const s=i.exception&&i.exception.values&&i.exception.values[0];s&&s.value&&(s.value=_r(s.value,a));const o=i.request;o&&o.url&&(o.url=_r(o.url,a))}function Bd(i,e){const t=Pd(e);try{i.exception.values.forEach(r=>{r.stacktrace.frames.forEach(n=>{t&&n.filename&&(n.debug_id=t[n.filename])})})}catch{}}function kd(i){const e={};try{i.exception.values.forEach(r=>{r.stacktrace.frames.forEach(n=>{n.debug_id&&(n.abs_path?e[n.abs_path]=n.debug_id:n.filename&&(e[n.filename]=n.debug_id),delete n.debug_id)})})}catch{}if(Object.keys(e).length===0)return;i.debug_meta=i.debug_meta||{},i.debug_meta.images=i.debug_meta.images||[];const t=i.debug_meta.images;Object.entries(e).forEach(([r,n])=>{t.push({type:"sourcemap",code_file:r,debug_id:n})})}function Hd(i,e){e.length>0&&(i.sdk=i.sdk||{},i.sdk.integrations=[...i.sdk.integrations||[],...e])}function Gd(i,e,t){if(!i)return null;const r={...i,...i.breadcrumbs&&{breadcrumbs:i.breadcrumbs.map(n=>({...n,...n.data&&{data:ci(n.data,e,t)}}))},...i.user&&{user:ci(i.user,e,t)},...i.contexts&&{contexts:ci(i.contexts,e,t)},...i.extra&&{extra:ci(i.extra,e,t)}};return i.contexts&&i.contexts.trace&&r.contexts&&(r.contexts.trace=i.contexts.trace,i.contexts.trace.data&&(r.contexts.trace.data=ci(i.contexts.trace.data,e,t))),i.spans&&(r.spans=i.spans.map(n=>({...n,...n.data&&{data:ci(n.data,e,t)}}))),i.contexts&&i.contexts.flags&&r.contexts&&(r.contexts.flags=ci(i.contexts.flags,3,t)),r}function Vd(i,e){if(!e)return i;const t=i?i.clone():new bi;return t.update(e),t}function Wd(i){if(i)return Xd(i)?{captureContext:i}:qd(i)?{captureContext:i}:i}function Xd(i){return i instanceof bi||typeof i=="function"}const jd=["user","level","extra","contexts","tags","fingerprint","requestSession","propagationContext"];function qd(i){return Object.keys(i).some(e=>jd.includes(e))}function Dl(i,e){return Qt().captureException(i,Wd(e))}function Il(i,e){const t=typeof e=="string"?e:void 0,r=typeof e!="string"?{captureContext:e}:void 0;return Qt().captureMessage(i,t,r)}function Nl(i,e){return Qt().captureEvent(i,e)}function Ol(i){const e=gt(),t=Zr(),r=Qt(),{release:n,environment:a=ja}=e&&e.getOptions()||{},{userAgent:s}=Ge.navigator||{},o=Rh({release:n,environment:a,user:r.getUser()||t.getUser(),...s&&{userAgent:s},...i}),l=t.getSession();return l&&l.status==="ok"&&vr(l,{status:"exited"}),Fl(),t.setSession(o),r.setSession(o),o}function Fl(){const i=Zr(),e=Qt(),t=e.getSession()||i.getSession();t&&Ch(t),zl(),i.setSession(),e.setSession()}function zl(){const i=Zr(),e=Qt(),t=gt(),r=e.getSession()||i.getSession();r&&t&&t.captureSession(r)}function Bl(i=!1){if(i){Fl();return}zl()}const Yd="7";function $d(i){const e=i.protocol?`${i.protocol}:`:"",t=i.port?`:${i.port}`:"";return`${e}//${i.host}${t}${i.path?`/${i.path}`:""}/api/`}function Kd(i){return`${$d(i)}${i.projectId}/envelope/`}function Zd(i,e){const t={sentry_version:Yd};return i.publicKey&&(t.sentry_key=i.publicKey),e&&(t.sentry_client=`${e.name}/${e.version}`),new URLSearchParams(t).toString()}function Jd(i,e,t){return e||`${Kd(i)}?${Zd(i,t)}`}const kl=[];function Qd(i){const e={};return i.forEach(t=>{const{name:r}=t,n=e[r];n&&!n.isDefaultInstance&&t.isDefaultInstance||(e[r]=t)}),Object.values(e)}function ep(i){const e=i.defaultIntegrations||[],t=i.integrations;e.forEach(s=>{s.isDefaultInstance=!0});let r;if(Array.isArray(t))r=[...e,...t];else if(typeof t=="function"){const s=t(e);r=Array.isArray(s)?s:[s]}else r=e;const n=Qd(r),a=n.findIndex(s=>s.name==="Debug");if(a>-1){const[s]=n.splice(a,1);n.push(s)}return n}function tp(i,e){const t={};return e.forEach(r=>{r&&Gl(i,r,t)}),t}function Hl(i,e){for(const t of e)t&&t.afterAllSetup&&t.afterAllSetup(i)}function Gl(i,e,t){if(t[e.name]){Ze&&Me.log(`Integration skipped because it was already installed: ${e.name}`);return}if(t[e.name]=e,kl.indexOf(e.name)===-1&&typeof e.setupOnce=="function"&&(e.setupOnce(),kl.push(e.name)),e.setup&&typeof e.setup=="function"&&e.setup(i),typeof e.preprocessEvent=="function"){const r=e.preprocessEvent.bind(e);i.on("preprocessEvent",(n,a)=>r(n,a,i))}if(typeof e.processEvent=="function"){const r=e.processEvent.bind(e),n=Object.assign((a,s)=>r(a,s,i),{id:e.name});i.addEventProcessor(n)}Ze&&Me.log(`Integration installed: ${e.name}`)}function ip(i,e,t){const r=[{type:"client_report"},{timestamp:Kr(),discarded_events:i}];return Jr(e?{dsn:e}:{},[r])}class ei extends Error{constructor(e,t="warn"){super(e),this.message=e,this.name=new.target.prototype.constructor.name,Object.setPrototypeOf(this,new.target.prototype),this.logLevel=t}}const Vl="Not capturing exception because it's already been captured.";class rp{constructor(e){if(this._options=e,this._integrations={},this._numProcessing=0,this._outcomes={},this._hooks={},this._eventProcessors=[],e.dsn?this._dsn=md(e.dsn):Ze&&Me.warn("No DSN provided, client will not send events."),this._dsn){const r=Jd(this._dsn,e.tunnel,e._metadata?e._metadata.sdk:void 0);this._transport=e.transport({tunnel:this._options.tunnel,recordDroppedEvent:this.recordDroppedEvent.bind(this),...e.transportOptions,url:r})}const t=["enableTracing","tracesSampleRate","tracesSampler"].find(r=>r in e&&e[r]==null);t&&Vi(()=>{console.warn(`[Sentry] Deprecation warning: \`${t}\` is set to undefined, which leads to tracing being enabled. In v9, a value of \`undefined\` will result in tracing being disabled.`)})}captureException(e,t,r){const n=zt();if(fl(e))return Ze&&Me.log(Vl),n;const a={event_id:n,...t};return this._process(this.eventFromException(e,a).then(s=>this._captureEvent(s,a,r))),a.event_id}captureMessage(e,t,r,n){const a={event_id:zt(),...r},s=Oa(e)?e:String(e),o=Fa(e)?this.eventFromMessage(s,t,a):this.eventFromException(e,a);return this._process(o.then(l=>this._captureEvent(l,a,n))),a.event_id}captureEvent(e,t,r){const n=zt();if(t&&t.originalException&&fl(t.originalException))return Ze&&Me.log(Vl),n;const a={event_id:n,...t},s=(e.sdkProcessingMetadata||{}).capturedSpanScope;return this._process(this._captureEvent(e,a,s||r)),a.event_id}captureSession(e){typeof e.release!="string"?Ze&&Me.warn("Discarded session because of missing or non-string release"):(this.sendSession(e),vr(e,{init:!1}))}getDsn(){return this._dsn}getOptions(){return this._options}getSdkMetadata(){return this._options._metadata}getTransport(){return this._transport}flush(e){const t=this._transport;return t?(this.emit("flush"),this._isClientDoneProcessing(e).then(r=>t.flush(e).then(n=>r&&n))):Ki(!0)}close(e){return this.flush(e).then(t=>(this.getOptions().enabled=!1,this.emit("close"),t))}getEventProcessors(){return this._eventProcessors}addEventProcessor(e){this._eventProcessors.push(e)}init(){(this._isEnabled()||this._options.integrations.some(({name:e})=>e.startsWith("Spotlight")))&&this._setupIntegrations()}getIntegrationByName(e){return this._integrations[e]}addIntegration(e){const t=this._integrations[e.name];Gl(this,e,this._integrations),t||Hl(this,[e])}sendEvent(e,t={}){this.emit("beforeSendEvent",e,t);let r=Cd(e,this._dsn,this._options._metadata,this._options.tunnel);for(const a of t.attachments||[])r=Sd(r,Td(a));const n=this.sendEnvelope(r);n&&n.then(a=>this.emit("afterSendEvent",e,a),null)}sendSession(e){const t=Rd(e,this._dsn,this._options._metadata,this._options.tunnel);this.sendEnvelope(t)}recordDroppedEvent(e,t,r){if(this._options.sendClientReports){const n=typeof r=="number"?r:1,a=`${e}:${t}`;Ze&&Me.log(`Recording outcome: "${a}"${n>1?` (${n} times)`:""}`),this._outcomes[a]=(this._outcomes[a]||0)+n}}on(e,t){const r=this._hooks[e]=this._hooks[e]||[];return r.push(t),()=>{const n=r.indexOf(t);n>-1&&r.splice(n,1)}}emit(e,...t){const r=this._hooks[e];r&&r.forEach(n=>n(...t))}sendEnvelope(e){return this.emit("beforeEnvelope",e),this._isEnabled()&&this._transport?this._transport.send(e).then(null,t=>(Ze&&Me.error("Error while sending envelope:",t),t)):(Ze&&Me.error("Transport disabled"),Ki({}))}_setupIntegrations(){const{integrations:e}=this._options;this._integrations=tp(this,e),Hl(this,e)}_updateSessionFromEvent(e,t){let r=!1,n=!1;const a=t.exception&&t.exception.values;if(a){n=!0;for(const o of a){const l=o.mechanism;if(l&&l.handled===!1){r=!0;break}}}const s=e.status==="ok";(s&&e.errors===0||s&&r)&&(vr(e,{...r&&{status:"crashed"},errors:e.errors||Number(n||r)}),this.captureSession(e))}_isClientDoneProcessing(e){return new Wt(t=>{let r=0;const n=1,a=setInterval(()=>{this._numProcessing==0?(clearInterval(a),t(!0)):(r+=n,e&&r>=e&&(clearInterval(a),t(!1)))},n)})}_isEnabled(){return this.getOptions().enabled!==!1&&this._transport!==void 0}_prepareEvent(e,t,r=Qt(),n=Zr()){const a=this.getOptions(),s=Object.keys(this._integrations);return!t.integrations&&s.length>0&&(t.integrations=s),this.emit("preprocessEvent",e,t),e.type||n.setLastEventId(e.event_id||t.event_id),Fd(a,e,t,r,this,n).then(o=>{if(o===null)return o;o.contexts={trace:Bh(r),...o.contexts};const l=ld(this,r);return o.sdkProcessingMetadata={dynamicSamplingContext:l,...o.sdkProcessingMetadata},o})}_captureEvent(e,t={},r){return this._processEvent(e,t,r).then(n=>n.event_id,n=>{if(Ze){const a=n;a.logLevel==="log"?Me.log(a.message):Me.warn(a)}})}_processEvent(e,t,r){const n=this.getOptions(),{sampleRate:a}=n,s=Xl(e),o=Wl(e),l=e.type||"error",c=`before send for type \`${l}\``,u=typeof a>"u"?void 0:ud(a);if(o&&typeof u=="number"&&Math.random()>u)return this.recordDroppedEvent("sample_rate","error",e),Dn(new ei(`Discarding event because it's not included in the random sample (sampling rate = ${a})`,"log"));const h=l==="replay_event"?"replay":l,d=(e.sdkProcessingMetadata||{}).capturedSpanIsolationScope;return this._prepareEvent(e,t,r,d).then(f=>{if(f===null)throw this.recordDroppedEvent("event_processor",h,e),new ei("An event processor returned `null`, will not send event.","log");if(t.data&&t.data.__sentry__===!0)return f;const v=ap(this,n,f,t);return np(v,c)}).then(f=>{if(f===null){if(this.recordDroppedEvent("before_send",h,e),s){const m=1+(e.spans||[]).length;this.recordDroppedEvent("before_send","span",m)}throw new ei(`${c} returned \`null\`, will not send event.`,"log")}const v=r&&r.getSession();if(!s&&v&&this._updateSessionFromEvent(v,f),s){const m=f.sdkProcessingMetadata&&f.sdkProcessingMetadata.spanCountBeforeProcessing||0,p=f.spans?f.spans.length:0,w=m-p;w>0&&this.recordDroppedEvent("before_send","span",w)}const x=f.transaction_info;if(s&&x&&f.transaction!==e.transaction){const m="custom";f.transaction_info={...x,source:m}}return this.sendEvent(f,t),f}).then(null,f=>{throw f instanceof ei?f:(this.captureException(f,{data:{__sentry__:!0},originalException:f}),new ei(`Event processing pipeline threw an error, original event will not be sent. Details have been sent as a new event.
Reason: ${f}`))})}_process(e){this._numProcessing++,e.then(t=>(this._numProcessing--,t),t=>(this._numProcessing--,t))}_clearOutcomes(){const e=this._outcomes;return this._outcomes={},Object.entries(e).map(([t,r])=>{const[n,a]=t.split(":");return{reason:n,category:a,quantity:r}})}_flushOutcomes(){Ze&&Me.log("Flushing outcomes...");const e=this._clearOutcomes();if(e.length===0){Ze&&Me.log("No outcomes to send");return}if(!this._dsn){Ze&&Me.log("No dsn provided, will not send outcomes");return}Ze&&Me.log("Sending outcomes:",e);const t=ip(e,this._options.tunnel&&Nn(this._dsn));this.sendEnvelope(t)}}function np(i,e){const t=`${e} must return \`null\` or a valid event.`;if(Pn(i))return i.then(r=>{if(!gr(r)&&r!==null)throw new ei(t);return r},r=>{throw new ei(`${e} rejected with ${r}`)});if(!gr(i)&&i!==null)throw new ei(t);return i}function ap(i,e,t,r){const{beforeSend:n,beforeSendTransaction:a,beforeSendSpan:s}=e;if(Wl(t)&&n)return n(t,r);if(Xl(t)){if(t.spans&&s){const o=[];for(const l of t.spans){const c=s(l);c?o.push(c):(ad(),i.recordDroppedEvent("before_send","span"))}t.spans=o}if(a){if(t.spans){const o=t.spans.length;t.sdkProcessingMetadata={...t.sdkProcessingMetadata,spanCountBeforeProcessing:o}}return a(t,r)}}return t}function Wl(i){return i.type===void 0}function Xl(i){return i.type==="transaction"}function sp(i,e){e.debug===!0&&(Ze?Me.enable():Vi(()=>{console.warn("[Sentry] Cannot initialize SDK with `debug` option using a non-debug bundle.")})),Qt().update(e.initialScope);const t=new i(e);return op(t),t.init(),t}function op(i){Qt().setClient(i)}function lp(i){const e=[];function t(){return i===void 0||e.length<i}function r(s){return e.splice(e.indexOf(s),1)[0]||Promise.resolve(void 0)}function n(s){if(!t())return Dn(new ei("Not adding Promise because buffer limit was reached."));const o=s();return e.indexOf(o)===-1&&e.push(o),o.then(()=>r(o)).then(null,()=>r(o).then(null,()=>{})),o}function a(s){return new Wt((o,l)=>{let c=e.length;if(!c)return o(!0);const u=setTimeout(()=>{s&&s>0&&o(!1)},s);e.forEach(h=>{Ki(h).then(()=>{--c||(clearTimeout(u),o(!0))},l)})})}return{$:e,add:n,drain:a}}const cp=60*1e3;function up(i,e=Date.now()){const t=parseInt(`${i}`,10);if(!isNaN(t))return t*1e3;const r=Date.parse(`${i}`);return isNaN(r)?cp:r-e}function hp(i,e){return i[e]||i.all||0}function dp(i,e,t=Date.now()){return hp(i,e)>t}function pp(i,{statusCode:e,headers:t},r=Date.now()){const n={...i},a=t&&t["x-sentry-rate-limits"],s=t&&t["retry-after"];if(a)for(const o of a.trim().split(",")){const[l,c,,,u]=o.split(":",5),h=parseInt(l,10),d=(isNaN(h)?60:h)*1e3;if(!c)n.all=r+d;else for(const f of c.split(";"))f==="metric_bucket"?(!u||u.split(";").includes("custom"))&&(n[f]=r+d):n[f]=r+d}else s?n.all=r+up(s,r):e===429&&(n.all=r+60*1e3);return n}const fp=64;function mp(i,e,t=lp(i.bufferSize||fp)){let r={};const n=s=>t.drain(s);function a(s){const o=[];if(Rl(s,(h,d)=>{const f=Cl(d);if(dp(r,f)){const v=jl(h,d);i.recordDroppedEvent("ratelimit_backoff",f,v)}else o.push(h)}),o.length===0)return Ki({});const l=Jr(s[0],o),c=h=>{Rl(l,(d,f)=>{const v=jl(d,f);i.recordDroppedEvent(h,Cl(f),v)})},u=()=>e({body:Md(l)}).then(h=>(h.statusCode!==void 0&&(h.statusCode<200||h.statusCode>=300)&&Ze&&Me.warn(`Sentry responded with status code ${h.statusCode} to sent event.`),r=pp(r,h),h),h=>{throw c("network_error"),h});return t.add(u).then(h=>h,h=>{if(h instanceof ei)return Ze&&Me.error("Skipped sending event because buffer is full."),c("queue_overflow"),Ki({});throw h})}return{send:a,flush:n}}function jl(i,e){if(!(e!=="event"&&e!=="transaction"))return Array.isArray(i)?i[1]:void 0}function gp(i,e,t=[e],r="npm"){const n=i._metadata||{};n.sdk||(n.sdk={name:`sentry.javascript.${e}`,packages:t.map(a=>({name:`${r}:@sentry/${a}`,version:Hi})),version:Hi}),i._metadata=n}const _p=100;function Zi(i,e){const t=gt(),r=Zr();if(!t)return;const{beforeBreadcrumb:n=null,maxBreadcrumbs:a=_p}=t.getOptions();if(a<=0)return;const s={timestamp:Kr(),...i},o=n?Vi(()=>n(s,e)):s;o!==null&&(t.emit&&t.emit("beforeAddBreadcrumb",o,e),r.addBreadcrumb(o,a))}let ql;const vp="FunctionToString",Yl=new WeakMap,xp=()=>({name:vp,setupOnce(){ql=Function.prototype.toString;try{Function.prototype.toString=function(...i){const e=Ba(this),t=Yl.has(gt())&&e!==void 0?e:this;return ql.apply(t,i)}}catch{}},setup(i){Yl.set(i,!0)}}),yp=xp,Sp=[/^Script error\.?$/,/^Javascript error: Script error\.? on line 0$/,/^ResizeObserver loop completed with undelivered notifications.$/,/^Cannot redefine property: googletag$/,"undefined is not an object (evaluating 'a.L')",`can't redefine non-configurable property "solana"`,"vv().getRestrictions is not a function. (In 'vv().getRestrictions(1,a)', 'vv().getRestrictions' is undefined)","Can't find variable: _AutofillCallbackHandler",/^Non-Error promise rejection captured with value: Object Not Found Matching Id:\d+, MethodName:simulateEvent, ParamCount:\d+$/],Mp="InboundFilters",Ep=(i={})=>({name:Mp,processEvent(e,t,r){const n=r.getOptions(),a=bp(i,n);return wp(e,a)?null:e}}),Tp=Ep;function bp(i={},e={}){return{allowUrls:[...i.allowUrls||[],...e.allowUrls||[]],denyUrls:[...i.denyUrls||[],...e.denyUrls||[]],ignoreErrors:[...i.ignoreErrors||[],...e.ignoreErrors||[],...i.disableErrorDefaults?[]:Sp],ignoreTransactions:[...i.ignoreTransactions||[],...e.ignoreTransactions||[]],ignoreInternal:i.ignoreInternal!==void 0?i.ignoreInternal:!0}}function wp(i,e){return e.ignoreInternal&&Up(i)?(Ze&&Me.warn(`Event dropped due to being internal Sentry Error.
Event: ${Ti(i)}`),!0):Ap(i,e.ignoreErrors)?(Ze&&Me.warn(`Event dropped due to being matched by \`ignoreErrors\` option.
Event: ${Ti(i)}`),!0):Ip(i)?(Ze&&Me.warn(`Event dropped due to not having an error message, error type or stacktrace.
Event: ${Ti(i)}`),!0):Rp(i,e.ignoreTransactions)?(Ze&&Me.warn(`Event dropped due to being matched by \`ignoreTransactions\` option.
Event: ${Ti(i)}`),!0):Cp(i,e.denyUrls)?(Ze&&Me.warn(`Event dropped due to being matched by \`denyUrls\` option.
Event: ${Ti(i)}.
Url: ${zn(i)}`),!0):Pp(i,e.allowUrls)?!1:(Ze&&Me.warn(`Event dropped due to not being matched by \`allowUrls\` option.
Event: ${Ti(i)}.
Url: ${zn(i)}`),!0)}function Ap(i,e){return i.type||!e||!e.length?!1:Lp(i).some(t=>Un(t,e))}function Rp(i,e){if(i.type!=="transaction"||!e||!e.length)return!1;const t=i.transaction;return t?Un(t,e):!1}function Cp(i,e){if(!e||!e.length)return!1;const t=zn(i);return t?Un(t,e):!1}function Pp(i,e){if(!e||!e.length)return!0;const t=zn(i);return t?Un(t,e):!0}function Lp(i){const e=[];i.message&&e.push(i.message);let t;try{t=i.exception.values[i.exception.values.length-1]}catch{}return t&&t.value&&(e.push(t.value),t.type&&e.push(`${t.type}: ${t.value}`)),e}function Up(i){try{return i.exception.values[0].type==="SentryError"}catch{}return!1}function Dp(i=[]){for(let e=i.length-1;e>=0;e--){const t=i[e];if(t&&t.filename!=="<anonymous>"&&t.filename!=="[native code]")return t.filename||null}return null}function zn(i){try{let e;try{e=i.exception.values[0].stacktrace.frames}catch{}return e?Dp(e):null}catch{return Ze&&Me.error(`Cannot extract url for event ${Ti(i)}`),null}}function Ip(i){return i.type||!i.exception||!i.exception.values||i.exception.values.length===0?!1:!i.message&&!i.exception.values.some(e=>e.stacktrace||e.type&&e.type!=="Error"||e.value)}function Np(i,e,t=250,r,n,a,s){if(!a.exception||!a.exception.values||!s||!qi(s.originalException,Error))return;const o=a.exception.values.length>0?a.exception.values[a.exception.values.length-1]:void 0;o&&(a.exception.values=Op(Za(i,e,n,s.originalException,r,a.exception.values,o,0),t))}function Za(i,e,t,r,n,a,s,o){if(a.length>=t+1)return a;let l=[...a];if(qi(r[n],Error)){$l(s,o);const c=i(e,r[n]),u=l.length;Kl(c,n,u,o),l=Za(i,e,t,r[n],n,[c,...l],c,u)}return Array.isArray(r.errors)&&r.errors.forEach((c,u)=>{if(qi(c,Error)){$l(s,o);const h=i(e,c),d=l.length;Kl(h,`errors[${u}]`,d,o),l=Za(i,e,t,c,n,[h,...l],h,d)}}),l}function $l(i,e){i.mechanism=i.mechanism||{type:"generic",handled:!0},i.mechanism={...i.mechanism,...i.type==="AggregateError"&&{is_exception_group:!0},exception_id:e}}function Kl(i,e,t,r){i.mechanism=i.mechanism||{type:"generic",handled:!0},i.mechanism={...i.mechanism,type:"chained",source:e,exception_id:t,parent_id:r}}function Op(i,e){return i.map(t=>(t.value&&(t.value=_r(t.value,e)),t))}function Ja(i){if(!i)return{};const e=i.match(/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);if(!e)return{};const t=e[6]||"",r=e[8]||"";return{host:e[4],path:e[5],protocol:e[2],search:t,hash:r,relative:e[5]+t+r}}function Zl(i){const e="console";Xi(e,i),ji(e,Fp)}function Fp(){"console"in Ge&&Tn.forEach(function(i){i in Ge.console&&Pt(Ge.console,i,function(e){return bn[i]=e,function(...t){Yt("console",{args:t,level:i});const r=bn[i];r&&r.apply(Ge.console,t)}})})}function Jl(i){return i==="warn"?"warning":["fatal","error","warning","log","info","debug"].includes(i)?i:"log"}const zp="CaptureConsole",Bp=(i={})=>{const e=i.levels||Tn,t=!!i.handled;return{name:zp,setup(r){"console"in Ge&&Zl(({args:n,level:a})=>{gt()!==r||!e.includes(a)||Hp(n,a,t)})}}},kp=Bp;function Hp(i,e,t){const r={level:Jl(e),extra:{arguments:i}};xl(n=>{if(n.addEventProcessor(o=>(o.logger="console",$i(o,{handled:t,type:"console"}),o)),e==="assert"){if(!i[0]){const o=`Assertion failed: ${Ln(i.slice(1)," ")||"console.assert"}`;n.setExtra("arguments",i.slice(1)),Il(o,r)}return}const a=i.find(o=>o instanceof Error);if(a){Dl(a,r);return}const s=Ln(i," ");Il(s,r)})}const Gp="Dedupe",Vp=()=>{let i;return{name:Gp,processEvent(e){if(e.type)return e;try{if(Xp(e,i))return Ze&&Me.warn("Event dropped due to being a duplicate of previously captured event."),null}catch{}return i=e}}},Wp=Vp;function Xp(i,e){return e?!!(jp(i,e)||qp(i,e)):!1}function jp(i,e){const t=i.message,r=e.message;return!(!t&&!r||t&&!r||!t&&r||t!==r||!ec(i,e)||!Ql(i,e))}function qp(i,e){const t=tc(e),r=tc(i);return!(!t||!r||t.type!==r.type||t.value!==r.value||!ec(i,e)||!Ql(i,e))}function Ql(i,e){let t=tl(i),r=tl(e);if(!t&&!r)return!0;if(t&&!r||!t&&r||(t=t,r=r,r.length!==t.length))return!1;for(let n=0;n<r.length;n++){const a=r[n],s=t[n];if(a.filename!==s.filename||a.lineno!==s.lineno||a.colno!==s.colno||a.function!==s.function)return!1}return!0}function ec(i,e){let t=i.fingerprint,r=e.fingerprint;if(!t&&!r)return!0;if(t&&!r||!t&&r)return!1;t=t,r=r;try{return t.join("")===r.join("")}catch{return!1}}function tc(i){return i.exception&&i.exception.values&&i.exception.values[0]}function ic(i){if(i!==void 0)return i>=400&&i<500?"warning":i>=500?"error":void 0}const Qa=Ge;function rc(){if(!("fetch"in Qa))return!1;try{return new Headers,new Request("http://www.example.com"),new Response,!0}catch{return!1}}function es(i){return i&&/^function\s+\w+\(\)\s+\{\s+\[native code\]\s+\}$/.test(i.toString())}function Yp(){if(typeof EdgeRuntime=="string")return!0;if(!rc())return!1;if(es(Qa.fetch))return!0;let i=!1;const e=Qa.document;if(e&&typeof e.createElement=="function")try{const t=e.createElement("iframe");t.hidden=!0,e.head.appendChild(t),t.contentWindow&&t.contentWindow.fetch&&(i=es(t.contentWindow.fetch)),e.head.removeChild(t)}catch(t){Gi&&Me.warn("Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ",t)}return i}function $p(i,e){const t="fetch";Xi(t,i),ji(t,()=>Kp(void 0,e))}function Kp(i,e=!1){e&&!Yp()||Pt(Ge,"fetch",function(t){return function(...r){const n=new Error,{method:a,url:s}=Zp(r),o={args:r,fetchData:{method:a,url:s},startTimestamp:oi()*1e3,virtualError:n};return Yt("fetch",{...o}),t.apply(Ge,r).then(async l=>(Yt("fetch",{...o,endTimestamp:oi()*1e3,response:l}),l),l=>{throw Yt("fetch",{...o,endTimestamp:oi()*1e3,error:l}),Na(l)&&l.stack===void 0&&(l.stack=n.stack,Yi(l,"framesToPop",1)),l})}})}function ts(i,e){return!!i&&typeof i=="object"&&!!i[e]}function nc(i){return typeof i=="string"?i:i?ts(i,"url")?i.url:i.toString?i.toString():"":""}function Zp(i){if(i.length===0)return{method:"GET",url:""};if(i.length===2){const[t,r]=i;return{url:nc(t),method:ts(r,"method")?String(r.method).toUpperCase():"GET"}}const e=i[0];return{url:nc(e),method:ts(e,"method")?String(e.method).toUpperCase():"GET"}}function Jp(){return"npm"}const Bn=Ge;function Qp(){const i=Bn.chrome,e=i&&i.app&&i.app.runtime,t="history"in Bn&&!!Bn.history.pushState&&!!Bn.history.replaceState;return!e&&t}const Je=Ge;let is=0;function ac(){return is>0}function ef(){is++,setTimeout(()=>{is--})}function yr(i,e={}){function t(n){return typeof n=="function"}if(!t(i))return i;try{const n=i.__sentry_wrapped__;if(n)return typeof n=="function"?n:i;if(Ba(i))return i}catch{return i}const r=function(...n){try{const a=n.map(s=>yr(s,e));return i.apply(this,a)}catch(a){throw ef(),xl(s=>{s.addEventProcessor(o=>(e.mechanism&&(Ha(o,void 0),$i(o,e.mechanism)),o.extra={...o.extra,arguments:n},o)),Dl(a)}),a}};try{for(const n in i)Object.prototype.hasOwnProperty.call(i,n)&&(r[n]=i[n])}catch{}ll(r,i),Yi(i,"__sentry_wrapped__",r);try{Object.getOwnPropertyDescriptor(r,"name").configurable&&Object.defineProperty(r,"name",{get(){return i.name}})}catch{}return r}const Qr=typeof __SENTRY_DEBUG__>"u"||__SENTRY_DEBUG__;function rs(i,e){const t=as(i,e),r={type:sf(e),value:of(e)};return t.length&&(r.stacktrace={frames:t}),r.type===void 0&&r.value===""&&(r.value="Unrecoverable error caught"),r}function tf(i,e,t,r){const n=gt(),a=n&&n.getOptions().normalizeDepth,s=df(e),o={__serialized__:Al(e,a)};if(s)return{exception:{values:[rs(i,s)]},extra:o};const l={exception:{values:[{type:Cn(e)?e.constructor.name:r?"UnhandledRejection":"Error",value:uf(e,{isUnhandledRejection:r})}]},extra:o};if(t){const c=as(i,t);c.length&&(l.exception.values[0].stacktrace={frames:c})}return l}function ns(i,e){return{exception:{values:[rs(i,e)]}}}function as(i,e){const t=e.stacktrace||e.stack||"",r=nf(e),n=af(e);try{return i(t,r,n)}catch{}return[]}const rf=/Minified React error #\d+;/i;function nf(i){return i&&rf.test(i.message)?1:0}function af(i){return typeof i.framesToPop=="number"?i.framesToPop:0}function sc(i){return typeof WebAssembly<"u"&&typeof WebAssembly.Exception<"u"?i instanceof WebAssembly.Exception:!1}function sf(i){const e=i&&i.name;return!e&&sc(i)?i.message&&Array.isArray(i.message)&&i.message.length==2?i.message[0]:"WebAssembly.Exception":e}function of(i){const e=i&&i.message;return e?e.error&&typeof e.error.message=="string"?e.error.message:sc(i)&&Array.isArray(i.message)&&i.message.length==2?i.message[1]:e:"No error message"}function lf(i,e,t,r){const n=t&&t.syntheticException||void 0,a=ss(i,e,n,r);return $i(a),a.level="error",t&&t.event_id&&(a.event_id=t.event_id),Ki(a)}function cf(i,e,t="info",r,n){const a=r&&r.syntheticException||void 0,s=os(i,e,a,n);return s.level=t,r&&r.event_id&&(s.event_id=r.event_id),Ki(s)}function ss(i,e,t,r,n){let a;if(nl(e)&&e.error)return ns(i,e.error);if(al(e)||mh(e)){const s=e;if("stack"in e)a=ns(i,e);else{const o=s.name||(al(s)?"DOMError":"DOMException"),l=s.message?`${o}: ${s.message}`:o;a=os(i,l,t,r),Ha(a,l)}return"code"in s&&(a.tags={...a.tags,"DOMException.code":`${s.code}`}),a}return Na(e)?ns(i,e):gr(e)||Cn(e)?(a=tf(i,e,t,n),$i(a,{synthetic:!0}),a):(a=os(i,e,t,r),Ha(a,`${e}`),$i(a,{synthetic:!0}),a)}function os(i,e,t,r){const n={};if(r&&t){const a=as(i,t);a.length&&(n.exception={values:[{value:e,stacktrace:{frames:a}}]}),$i(n,{synthetic:!0})}if(Oa(e)){const{__sentry_template_string__:a,__sentry_template_values__:s}=e;return n.logentry={message:a,params:s},n}return n.message=e,n}function uf(i,{isUnhandledRejection:e}){const t=Th(i),r=e?"promise rejection":"exception";return nl(i)?`Event \`ErrorEvent\` captured as ${r} with message \`${i.message}\``:Cn(i)?`Event \`${hf(i)}\` (type=${i.type}) captured as ${r}`:`Object captured as ${r} with keys: ${t}`}function hf(i){try{const e=Object.getPrototypeOf(i);return e?e.constructor.name:void 0}catch{}}function df(i){for(const e in i)if(Object.prototype.hasOwnProperty.call(i,e)){const t=i[e];if(t instanceof Error)return t}}function pf(i,{metadata:e,tunnel:t,dsn:r}){const n={event_id:i.event_id,sent_at:new Date().toISOString(),...e&&e.sdk&&{sdk:{name:e.sdk.name,version:e.sdk.version}},...!!t&&!!r&&{dsn:Nn(r)}},a=ff(i);return Jr(n,[a])}function ff(i){return[{type:"user_report"},i]}class mf extends rp{constructor(e){const t={parentSpanIsAlwaysRootSpan:!0,...e},r=Je.SENTRY_SDK_SOURCE||Jp();gp(t,"browser",["browser"],r),super(t),t.sendClientReports&&Je.document&&Je.document.addEventListener("visibilitychange",()=>{Je.document.visibilityState==="hidden"&&this._flushOutcomes()})}eventFromException(e,t){return lf(this._options.stackParser,e,t,this._options.attachStacktrace)}eventFromMessage(e,t="info",r){return cf(this._options.stackParser,e,t,r,this._options.attachStacktrace)}captureUserFeedback(e){if(!this._isEnabled()){Qr&&Me.warn("SDK not enabled, will not capture user feedback.");return}const t=pf(e,{metadata:this.getSdkMetadata(),dsn:this.getDsn(),tunnel:this.getOptions().tunnel});this.sendEnvelope(t)}_prepareEvent(e,t,r){return e.platform=e.platform||"javascript",super._prepareEvent(e,t,r)}}const gf=typeof __SENTRY_DEBUG__>"u"||__SENTRY_DEBUG__,Et=Ge,_f=1e3;let oc,ls,cs;function vf(i){const e="dom";Xi(e,i),ji(e,xf)}function xf(){if(!Et.document)return;const i=Yt.bind(null,"dom"),e=lc(i,!0);Et.document.addEventListener("click",e,!1),Et.document.addEventListener("keypress",e,!1),["EventTarget","Node"].forEach(t=>{const r=Et[t],n=r&&r.prototype;!n||!n.hasOwnProperty||!n.hasOwnProperty("addEventListener")||(Pt(n,"addEventListener",function(a){return function(s,o,l){if(s==="click"||s=="keypress")try{const c=this.__sentry_instrumentation_handlers__=this.__sentry_instrumentation_handlers__||{},u=c[s]=c[s]||{refCount:0};if(!u.handler){const h=lc(i);u.handler=h,a.call(this,s,h,l)}u.refCount++}catch{}return a.call(this,s,o,l)}}),Pt(n,"removeEventListener",function(a){return function(s,o,l){if(s==="click"||s=="keypress")try{const c=this.__sentry_instrumentation_handlers__||{},u=c[s];u&&(u.refCount--,u.refCount<=0&&(a.call(this,s,u.handler,l),u.handler=void 0,delete c[s]),Object.keys(c).length===0&&delete this.__sentry_instrumentation_handlers__)}catch{}return a.call(this,s,o,l)}}))})}function yf(i){if(i.type!==ls)return!1;try{if(!i.target||i.target._sentryId!==cs)return!1}catch{}return!0}function Sf(i,e){return i!=="keypress"?!1:!e||!e.tagName?!0:!(e.tagName==="INPUT"||e.tagName==="TEXTAREA"||e.isContentEditable)}function lc(i,e=!1){return t=>{if(!t||t._sentryCaptured)return;const r=Mf(t);if(Sf(t.type,r))return;Yi(t,"_sentryCaptured",!0),r&&!r._sentryId&&Yi(r,"_sentryId",zt());const n=t.type==="keypress"?"input":t.type;yf(t)||(i({event:t,name:n,global:e}),ls=t.type,cs=r?r._sentryId:void 0),clearTimeout(oc),oc=Et.setTimeout(()=>{cs=void 0,ls=void 0},_f)}}function Mf(i){try{return i.target}catch{return null}}let kn;function cc(i){const e="history";Xi(e,i),ji(e,Ef)}function Ef(){if(!Qp())return;const i=Et.onpopstate;Et.onpopstate=function(...t){const r=Et.location.href,n=kn;if(kn=r,Yt("history",{from:n,to:r}),i)try{return i.apply(this,t)}catch{}};function e(t){return function(...r){const n=r.length>2?r[2]:void 0;if(n){const a=kn,s=String(n);kn=s,Yt("history",{from:a,to:s})}return t.apply(this,r)}}Pt(Et.history,"pushState",e),Pt(Et.history,"replaceState",e)}const Hn={};function Tf(i){const e=Hn[i];if(e)return e;let t=Et[i];if(es(t))return Hn[i]=t.bind(Et);const r=Et.document;if(r&&typeof r.createElement=="function")try{const n=r.createElement("iframe");n.hidden=!0,r.head.appendChild(n);const a=n.contentWindow;a&&a[i]&&(t=a[i]),r.head.removeChild(n)}catch(n){gf&&Me.warn(`Could not create sandbox iframe for ${i} check, bailing to window.${i}: `,n)}return t&&(Hn[i]=t.bind(Et))}function uc(i){Hn[i]=void 0}const en="__sentry_xhr_v3__";function bf(i){const e="xhr";Xi(e,i),ji(e,wf)}function wf(){if(!Et.XMLHttpRequest)return;const i=XMLHttpRequest.prototype;i.open=new Proxy(i.open,{apply(e,t,r){const n=new Error,a=oi()*1e3,s=si(r[0])?r[0].toUpperCase():void 0,o=Af(r[1]);if(!s||!o)return e.apply(t,r);t[en]={method:s,url:o,request_headers:{}},s==="POST"&&o.match(/sentry_key/)&&(t.__sentry_own_request__=!0);const l=()=>{const c=t[en];if(c&&t.readyState===4){try{c.status_code=t.status}catch{}const u={endTimestamp:oi()*1e3,startTimestamp:a,xhr:t,virtualError:n};Yt("xhr",u)}};return"onreadystatechange"in t&&typeof t.onreadystatechange=="function"?t.onreadystatechange=new Proxy(t.onreadystatechange,{apply(c,u,h){return l(),c.apply(u,h)}}):t.addEventListener("readystatechange",l),t.setRequestHeader=new Proxy(t.setRequestHeader,{apply(c,u,h){const[d,f]=h,v=u[en];return v&&si(d)&&si(f)&&(v.request_headers[d.toLowerCase()]=f),c.apply(u,h)}}),e.apply(t,r)}}),i.send=new Proxy(i.send,{apply(e,t,r){const n=t[en];if(!n)return e.apply(t,r);r[0]!==void 0&&(n.body=r[0]);const a={startTimestamp:oi()*1e3,xhr:t};return Yt("xhr",a),e.apply(t,r)}})}function Af(i){if(si(i))return i;try{return i.toString()}catch{}}function Rf(i,e=Tf("fetch")){let t=0,r=0;function n(a){const s=a.body.length;t+=s,r++;const o={body:a.body,method:"POST",referrerPolicy:"origin",headers:i.headers,keepalive:t<=6e4&&r<15,...i.fetchOptions};if(!e)return uc("fetch"),Dn("No fetch implementation available");try{return e(i.url,o).then(l=>(t-=s,r--,{statusCode:l.status,headers:{"x-sentry-rate-limits":l.headers.get("X-Sentry-Rate-Limits"),"retry-after":l.headers.get("Retry-After")}}))}catch(l){return uc("fetch"),t-=s,r--,Dn(l)}}return mp(i,n)}const Cf=30,Pf=50;function us(i,e,t,r){const n={filename:i,function:e==="<anonymous>"?Wi:e,in_app:!0};return t!==void 0&&(n.lineno=t),r!==void 0&&(n.colno=r),n}const Lf=/^\s*at (\S+?)(?::(\d+))(?::(\d+))\s*$/i,Uf=/^\s*at (?:(.+?\)(?: \[.+\])?|.*?) ?\((?:address at )?)?(?:async )?((?:<anonymous>|[-a-z]+:|.*bundle|\/)?.*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i,Df=/\((\S*)(?::(\d+))(?::(\d+))\)/,If=i=>{const e=Lf.exec(i);if(e){const[,r,n,a]=e;return us(r,Wi,+n,+a)}const t=Uf.exec(i);if(t){if(t[2]&&t[2].indexOf("eval")===0){const a=Df.exec(t[2]);a&&(t[2]=a[1],t[3]=a[2],t[4]=a[3])}const[r,n]=hc(t[1]||Wi,t[2]);return us(n,r,t[3]?+t[3]:void 0,t[4]?+t[4]:void 0)}},Nf=[Cf,If],Of=/^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:[-a-z]+)?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js)|\/[\w\-. /=]+)(?::(\d+))?(?::(\d+))?\s*$/i,Ff=/(\S+) line (\d+)(?: > eval line \d+)* > eval/i,zf=i=>{const e=Of.exec(i);if(e){if(e[3]&&e[3].indexOf(" > eval")>-1){const n=Ff.exec(e[3]);n&&(e[1]=e[1]||"eval",e[3]=n[1],e[4]=n[2],e[5]="")}let t=e[3],r=e[1]||Wi;return[r,t]=hc(r,t),us(t,r,e[4]?+e[4]:void 0,e[5]?+e[5]:void 0)}},Bf=[Pf,zf],kf=[Nf,Bf],Hf=el(...kf),hc=(i,e)=>{const t=i.indexOf("safari-extension")!==-1,r=i.indexOf("safari-web-extension")!==-1;return t||r?[i.indexOf("@")!==-1?i.split("@")[0]:Wi,t?`safari-extension:${e}`:`safari-web-extension:${e}`]:[i,e]},Gn=1024,Gf="Breadcrumbs",Vf=(i={})=>{const e={console:!0,dom:!0,fetch:!0,history:!0,sentry:!0,xhr:!0,...i};return{name:Gf,setup(t){e.console&&Zl(qf(t)),e.dom&&vf(jf(t,e.dom)),e.xhr&&bf(Yf(t)),e.fetch&&$p($f(t)),e.history&&cc(Kf(t)),e.sentry&&t.on("beforeSendEvent",Xf(t))}}},Wf=Vf;function Xf(i){return function(e){gt()===i&&Zi({category:`sentry.${e.type==="transaction"?"transaction":"event"}`,event_id:e.event_id,level:e.level,message:Ti(e)},{event:e})}}function jf(i,e){return function(t){if(gt()!==i)return;let r,n,a=typeof e=="object"?e.serializeAttribute:void 0,s=typeof e=="object"&&typeof e.maxStringLength=="number"?e.maxStringLength:void 0;s&&s>Gn&&(Qr&&Me.warn(`\`dom.maxStringLength\` cannot exceed ${Gn}, but a value of ${s} was configured. Sentry will use ${Gn} instead.`),s=Gn),typeof a=="string"&&(a=[a]);try{const l=t.event,c=Zf(l)?l.target:l;r=ol(c,{keyAttrs:a,maxStringLength:s}),n=Mh(c)}catch{r="<unknown>"}if(r.length===0)return;const o={category:`ui.${t.name}`,message:r};n&&(o.data={"ui.component_name":n}),Zi(o,{event:t.event,name:t.name,global:t.global})}}function qf(i){return function(e){if(gt()!==i)return;const t={category:"console",data:{arguments:e.args,logger:"console"},level:Jl(e.level),message:Ln(e.args," ")};if(e.level==="assert")if(e.args[0]===!1)t.message=`Assertion failed: ${Ln(e.args.slice(1)," ")||"console.assert"}`,t.data.arguments=e.args.slice(1);else return;Zi(t,{input:e.args,level:e.level})}}function Yf(i){return function(e){if(gt()!==i)return;const{startTimestamp:t,endTimestamp:r}=e,n=e.xhr[en];if(!t||!r||!n)return;const{method:a,url:s,status_code:o,body:l}=n,c={method:a,url:s,status_code:o},u={xhr:e.xhr,input:l,startTimestamp:t,endTimestamp:r},h=ic(o);Zi({category:"xhr",data:c,type:"http",level:h},u)}}function $f(i){return function(e){if(gt()!==i)return;const{startTimestamp:t,endTimestamp:r}=e;if(r&&!(e.fetchData.url.match(/sentry_key/)&&e.fetchData.method==="POST"))if(e.error){const n=e.fetchData,a={data:e.error,input:e.args,startTimestamp:t,endTimestamp:r};Zi({category:"fetch",data:n,level:"error",type:"http"},a)}else{const n=e.response,a={...e.fetchData,status_code:n&&n.status},s={input:e.args,response:n,startTimestamp:t,endTimestamp:r},o=ic(a.status_code);Zi({category:"fetch",data:a,type:"http",level:o},s)}}}function Kf(i){return function(e){if(gt()!==i)return;let t=e.from,r=e.to;const n=Ja(Je.location.href);let a=t?Ja(t):void 0;const s=Ja(r);(!a||!a.path)&&(a=n),n.protocol===s.protocol&&n.host===s.host&&(r=s.relative),n.protocol===a.protocol&&n.host===a.host&&(t=a.relative),Zi({category:"navigation",data:{from:t,to:r}})}}function Zf(i){return!!i&&!!i.target}const Jf=["EventTarget","Window","Node","ApplicationCache","AudioTrackList","BroadcastChannel","ChannelMergerNode","CryptoOperation","EventSource","FileReader","HTMLUnknownElement","IDBDatabase","IDBRequest","IDBTransaction","KeyOperation","MediaController","MessagePort","ModalWindow","Notification","SVGElementInstance","Screen","SharedWorker","TextTrack","TextTrackCue","TextTrackList","WebSocket","WebSocketWorker","Worker","XMLHttpRequest","XMLHttpRequestEventTarget","XMLHttpRequestUpload"],Qf="BrowserApiErrors",em=(i={})=>{const e={XMLHttpRequest:!0,eventTarget:!0,requestAnimationFrame:!0,setInterval:!0,setTimeout:!0,...i};return{name:Qf,setupOnce(){e.setTimeout&&Pt(Je,"setTimeout",dc),e.setInterval&&Pt(Je,"setInterval",dc),e.requestAnimationFrame&&Pt(Je,"requestAnimationFrame",im),e.XMLHttpRequest&&"XMLHttpRequest"in Je&&Pt(XMLHttpRequest.prototype,"send",rm);const t=e.eventTarget;t&&(Array.isArray(t)?t:Jf).forEach(nm)}}},tm=em;function dc(i){return function(...e){const t=e[0];return e[0]=yr(t,{mechanism:{data:{function:Ei(i)},handled:!1,type:"instrument"}}),i.apply(this,e)}}function im(i){return function(e){return i.apply(this,[yr(e,{mechanism:{data:{function:"requestAnimationFrame",handler:Ei(i)},handled:!1,type:"instrument"}})])}}function rm(i){return function(...e){const t=this;return["onload","onerror","onprogress","onreadystatechange"].forEach(r=>{r in t&&typeof t[r]=="function"&&Pt(t,r,function(n){const a={mechanism:{data:{function:r,handler:Ei(n)},handled:!1,type:"instrument"}},s=Ba(n);return s&&(a.mechanism.data.handler=Ei(s)),yr(n,a)})}),i.apply(this,e)}}function nm(i){const e=Je[i],t=e&&e.prototype;!t||!t.hasOwnProperty||!t.hasOwnProperty("addEventListener")||(Pt(t,"addEventListener",function(r){return function(n,a,s){try{am(a)&&(a.handleEvent=yr(a.handleEvent,{mechanism:{data:{function:"handleEvent",handler:Ei(a),target:i},handled:!1,type:"instrument"}}))}catch{}return r.apply(this,[n,yr(a,{mechanism:{data:{function:"addEventListener",handler:Ei(a),target:i},handled:!1,type:"instrument"}}),s])}}),Pt(t,"removeEventListener",function(r){return function(n,a,s){try{const o=a.__sentry_wrapped__;o&&r.call(this,n,o,s)}catch{}return r.call(this,n,a,s)}}))}function am(i){return typeof i.handleEvent=="function"}const sm=()=>({name:"BrowserSession",setupOnce(){if(typeof Je.document>"u"){Qr&&Me.warn("Using the `browserSessionIntegration` in non-browser environments is not supported.");return}Ol({ignoreDuration:!0}),Bl(),cc(({from:i,to:e})=>{i!==void 0&&i!==e&&(Ol({ignoreDuration:!0}),Bl())})}}),om="GlobalHandlers",lm=(i={})=>{const e={onerror:!0,onunhandledrejection:!0,...i};return{name:om,setupOnce(){Error.stackTraceLimit=50},setup(t){e.onerror&&(um(t),pc("onerror")),e.onunhandledrejection&&(hm(t),pc("onunhandledrejection"))}}},cm=lm;function um(i){hh(e=>{const{stackParser:t,attachStacktrace:r}=fc();if(gt()!==i||ac())return;const{msg:n,url:a,line:s,column:o,error:l}=e,c=fm(ss(t,l||n,void 0,r,!1),a,s,o);c.level="error",Nl(c,{originalException:l,mechanism:{handled:!1,type:"onerror"}})})}function hm(i){ph(e=>{const{stackParser:t,attachStacktrace:r}=fc();if(gt()!==i||ac())return;const n=dm(e),a=Fa(n)?pm(n):ss(t,n,void 0,r,!0);a.level="error",Nl(a,{originalException:n,mechanism:{handled:!1,type:"onunhandledrejection"}})})}function dm(i){if(Fa(i))return i;try{if("reason"in i)return i.reason;if("detail"in i&&"reason"in i.detail)return i.detail.reason}catch{}return i}function pm(i){return{exception:{values:[{type:"UnhandledRejection",value:`Non-Error promise rejection captured with value: ${String(i)}`}]}}}function fm(i,e,t,r){const n=i.exception=i.exception||{},a=n.values=n.values||[],s=a[0]=a[0]||{},o=s.stacktrace=s.stacktrace||{},l=o.frames=o.frames||[],c=r,u=t,h=si(e)&&e.length>0?e:Sh();return l.length===0&&l.push({colno:c,filename:h,function:Wi,in_app:!0,lineno:u}),i}function pc(i){Qr&&Me.log(`Global Handler attached: ${i}`)}function fc(){const i=gt();return i&&i.getOptions()||{stackParser:()=>[],attachStacktrace:!1}}const mm=()=>({name:"HttpContext",preprocessEvent(i){if(!Je.navigator&&!Je.location&&!Je.document)return;const e=i.request&&i.request.url||Je.location&&Je.location.href,{referrer:t}=Je.document||{},{userAgent:r}=Je.navigator||{},n={...i.request&&i.request.headers,...t&&{Referer:t},...r&&{"User-Agent":r}},a={...i.request,...e&&{url:e},headers:n};i.request=a}}),gm="cause",_m=5,vm="LinkedErrors",xm=(i={})=>{const e=i.limit||_m,t=i.key||gm;return{name:vm,preprocessEvent(r,n,a){const s=a.getOptions();Np(rs,s.stackParser,s.maxValueLength,t,e,r,n)}}},ym=xm;function Sm(i){const e=[Tp(),yp(),tm(),Wf(),cm(),ym(),Wp(),mm()];return i.autoSessionTracking!==!1&&e.push(sm()),e}function Mm(i={}){const e={defaultIntegrations:Sm(i),release:typeof __SENTRY_RELEASE__=="string"?__SENTRY_RELEASE__:Je.SENTRY_RELEASE&&Je.SENTRY_RELEASE.id?Je.SENTRY_RELEASE.id:void 0,autoSessionTracking:!0,sendClientReports:!0};return i.defaultIntegrations==null&&delete i.defaultIntegrations,{...e,...i}}function Em(){const i=typeof Je.window<"u"&&Je;if(!i)return!1;const e=i.chrome?"chrome":"browser",t=i[e],r=t&&t.runtime&&t.runtime.id,n=Je.location&&Je.location.href||"",a=["chrome-extension:","moz-extension:","ms-browser-extension:","safari-web-extension:"],s=!!r&&Je===Je.top&&a.some(l=>n.startsWith(`${l}//`)),o=typeof i.nw<"u";return!!r&&!s&&!o}function Tm(i={}){const e=Mm(i);if(!e.skipBrowserExtensionCheck&&Em()){Vi(()=>{console.error("[Sentry] You cannot run Sentry this way in a browser extension, check: https://docs.sentry.io/platforms/javascript/best-practices/browser-extensions/")});return}Qr&&(rc()||Me.warn("No Fetch API detected. The Sentry SDK requires a Fetch API compatible environment to send events. Please add a Fetch API polyfill."));const t={...e,stackParser:ch(e.stackParser||Hf),integrations:ep(e),transport:e.transport||Rf};return sp(mf,t)}Tm({dsn:"https://fd67b78fc5bc4a05bdd2297d68a44d08@o292714.ingest.us.sentry.io/1536614",release:"prototypicalpro@2.1.0",integrations:[kp({levels:["log","info","warn","error","assert"]})]});/**
* @license
* Copyright 2010-2024 Three.js Authors
* SPDX-License-Identifier: MIT
*/const hs="172",bm=0,mc=1,wm=2,gc=1,Am=2,ui=3,wi=0,bt=1,hi=2,Ai=0,Sr=1,_c=2,vc=3,xc=4,Rm=5,Ji=100,Cm=101,Pm=102,Lm=103,Um=104,Dm=200,Im=201,Nm=202,Om=203,ds=204,ps=205,Fm=206,zm=207,Bm=208,km=209,Hm=210,Gm=211,Vm=212,Wm=213,Xm=214,fs=0,ms=1,gs=2,Mr=3,_s=4,vs=5,xs=6,ys=7,yc=0,jm=1,qm=2,Ri=0,Ym=1,$m=2,Km=3,Zm=4,Jm=5,Qm=6,eg=7,Sc=300,Er=301,Tr=302,Ss=303,Ms=304,Vn=306,Qi=1e3,er=1001,Es=1002,wt=1003,tg=1004,ig=1004,Wn=1005,Bt=1006,Ts=1007,tr=1008,rg=1008,di=1009,Mc=1010,Ec=1011,tn=1012,bs=1013,ir=1014,ti=1015,rn=1016,ws=1017,As=1018,br=1020,Tc=35902,bc=1021,wc=1022,kt=1023,Ac=1024,Rc=1025,wr=1026,Ar=1027,Cc=1028,Rs=1029,Pc=1030,Cs=1031,Ps=1033,Xn=33776,jn=33777,qn=33778,Yn=33779,Ls=35840,Us=35841,Ds=35842,Is=35843,Ns=36196,Os=37492,Fs=37496,zs=37808,Bs=37809,ks=37810,Hs=37811,Gs=37812,Vs=37813,Ws=37814,Xs=37815,js=37816,qs=37817,Ys=37818,$s=37819,Ks=37820,Zs=37821,$n=36492,Js=36494,Qs=36495,Lc=36283,eo=36284,to=36285,io=36286,ng=3200,ag=3201,sg=0,og=1,Ci="",Ht="srgb",Rr="srgb-linear",Kn="linear",$e="srgb",Cr=7680,Uc=519,lg=512,cg=513,ug=514,Dc=515,hg=516,dg=517,pg=518,fg=519,Ic=35044,Nc=35040,Zn="300 es",pi=2e3,Jn=2001;class Pr{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const r=this._listeners;r[e]===void 0&&(r[e]=[]),r[e].indexOf(t)===-1&&r[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const r=this._listeners;return r[e]!==void 0&&r[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const n=r.indexOf(t);n!==-1&&r.splice(n,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const t=this._listeners[e.type];if(t!==void 0){e.target=this;const r=t.slice(0);for(let n=0,a=r.length;n<a;n++)r[n].call(this,e);e.target=null}}}const xt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],ro=Math.PI/180,no=180/Math.PI;function nn(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(xt[i&255]+xt[i>>8&255]+xt[i>>16&255]+xt[i>>24&255]+"-"+xt[e&255]+xt[e>>8&255]+"-"+xt[e>>16&15|64]+xt[e>>24&255]+"-"+xt[t&63|128]+xt[t>>8&255]+"-"+xt[t>>16&255]+xt[t>>24&255]+xt[r&255]+xt[r>>8&255]+xt[r>>16&255]+xt[r>>24&255]).toLowerCase()}function Ie(i,e,t){return Math.max(e,Math.min(t,i))}function mg(i,e){return(i%e+e)%e}function ao(i,e,t){return(1-t)*i+t*e}function an(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function At(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}class Qe{constructor(e=0,t=0){Qe.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,r=this.y,n=e.elements;return this.x=n[0]*t+n[3]*r+n[6],this.y=n[1]*t+n[4]*r+n[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ie(this.x,e.x,t.x),this.y=Ie(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ie(this.x,e,t),this.y=Ie(this.y,e,t),this}clampLength(e,t){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Ie(r,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const r=this.dot(e)/t;return Math.acos(Ie(r,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,r=this.y-e.y;return t*t+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,r){return this.x=e.x+(t.x-e.x)*r,this.y=e.y+(t.y-e.y)*r,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const r=Math.cos(t),n=Math.sin(t),a=this.x-e.x,s=this.y-e.y;return this.x=a*r-s*n+e.x,this.y=a*n+s*r+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ae{constructor(e,t,r,n,a,s,o,l,c){Ae.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,r,n,a,s,o,l,c)}set(e,t,r,n,a,s,o,l,c){const u=this.elements;return u[0]=e,u[1]=n,u[2]=o,u[3]=t,u[4]=a,u[5]=l,u[6]=r,u[7]=s,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,r=e.elements;return t[0]=r[0],t[1]=r[1],t[2]=r[2],t[3]=r[3],t[4]=r[4],t[5]=r[5],t[6]=r[6],t[7]=r[7],t[8]=r[8],this}extractBasis(e,t,r){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),r.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const r=e.elements,n=t.elements,a=this.elements,s=r[0],o=r[3],l=r[6],c=r[1],u=r[4],h=r[7],d=r[2],f=r[5],v=r[8],x=n[0],m=n[3],p=n[6],w=n[1],T=n[4],E=n[7],D=n[2],U=n[5],A=n[8];return a[0]=s*x+o*w+l*D,a[3]=s*m+o*T+l*U,a[6]=s*p+o*E+l*A,a[1]=c*x+u*w+h*D,a[4]=c*m+u*T+h*U,a[7]=c*p+u*E+h*A,a[2]=d*x+f*w+v*D,a[5]=d*m+f*T+v*U,a[8]=d*p+f*E+v*A,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],r=e[1],n=e[2],a=e[3],s=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*s*u-t*o*c-r*a*u+r*o*l+n*a*c-n*s*l}invert(){const e=this.elements,t=e[0],r=e[1],n=e[2],a=e[3],s=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=u*s-o*c,d=o*l-u*a,f=c*a-s*l,v=t*h+r*d+n*f;if(v===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/v;return e[0]=h*x,e[1]=(n*c-u*r)*x,e[2]=(o*r-n*s)*x,e[3]=d*x,e[4]=(u*t-n*l)*x,e[5]=(n*a-o*t)*x,e[6]=f*x,e[7]=(r*l-c*t)*x,e[8]=(s*t-r*a)*x,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,r,n,a,s,o){const l=Math.cos(a),c=Math.sin(a);return this.set(r*l,r*c,-r*(l*s+c*o)+s+e,-n*c,n*l,-n*(-c*s+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(so.makeScale(e,t)),this}rotate(e){return this.premultiply(so.makeRotation(-e)),this}translate(e,t){return this.premultiply(so.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),r=Math.sin(e);return this.set(t,-r,0,r,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,r=e.elements;for(let n=0;n<9;n++)if(t[n]!==r[n])return!1;return!0}fromArray(e,t=0){for(let r=0;r<9;r++)this.elements[r]=e[r+t];return this}toArray(e=[],t=0){const r=this.elements;return e[t]=r[0],e[t+1]=r[1],e[t+2]=r[2],e[t+3]=r[3],e[t+4]=r[4],e[t+5]=r[5],e[t+6]=r[6],e[t+7]=r[7],e[t+8]=r[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const so=new Ae;function Oc(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Qn(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function gg(){const i=Qn("canvas");return i.style.display="block",i}const Fc={};function Lr(i){i in Fc||(Fc[i]=!0,console.warn(i))}function _g(i,e,t){return new Promise(function(r,n){function a(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:n();break;case i.TIMEOUT_EXPIRED:setTimeout(a,t);break;default:r()}}setTimeout(a,t)})}function vg(i){const e=i.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function xg(i){const e=i.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const zc=new Ae().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Bc=new Ae().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function yg(){const i={enabled:!0,workingColorSpace:Rr,spaces:{},convert:function(n,a,s){return this.enabled===!1||a===s||!a||!s||(this.spaces[a].transfer===$e&&(n.r=fi(n.r),n.g=fi(n.g),n.b=fi(n.b)),this.spaces[a].primaries!==this.spaces[s].primaries&&(n.applyMatrix3(this.spaces[a].toXYZ),n.applyMatrix3(this.spaces[s].fromXYZ)),this.spaces[s].transfer===$e&&(n.r=Ur(n.r),n.g=Ur(n.g),n.b=Ur(n.b))),n},fromWorkingColorSpace:function(n,a){return this.convert(n,this.workingColorSpace,a)},toWorkingColorSpace:function(n,a){return this.convert(n,a,this.workingColorSpace)},getPrimaries:function(n){return this.spaces[n].primaries},getTransfer:function(n){return n===Ci?Kn:this.spaces[n].transfer},getLuminanceCoefficients:function(n,a=this.workingColorSpace){return n.fromArray(this.spaces[a].luminanceCoefficients)},define:function(n){Object.assign(this.spaces,n)},_getMatrix:function(n,a,s){return n.copy(this.spaces[a].toXYZ).multiply(this.spaces[s].fromXYZ)},_getDrawingBufferColorSpace:function(n){return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(n=this.workingColorSpace){return this.spaces[n].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],r=[.3127,.329];return i.define({[Rr]:{primaries:e,whitePoint:r,transfer:Kn,toXYZ:zc,fromXYZ:Bc,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Ht},outputColorSpaceConfig:{drawingBufferColorSpace:Ht}},[Ht]:{primaries:e,whitePoint:r,transfer:$e,toXYZ:zc,fromXYZ:Bc,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Ht}}}),i}const Ve=yg();function fi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Ur(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Dr;class Sg{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Dr===void 0&&(Dr=Qn("canvas")),Dr.width=e.width,Dr.height=e.height;const r=Dr.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),t=Dr}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Qn("canvas");t.width=e.width,t.height=e.height;const r=t.getContext("2d");r.drawImage(e,0,0,e.width,e.height);const n=r.getImageData(0,0,e.width,e.height),a=n.data;for(let s=0;s<a.length;s++)a[s]=fi(a[s]/255)*255;return r.putImageData(n,0,0),t}else if(e.data){const t=e.data.slice(0);for(let r=0;r<t.length;r++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[r]=Math.floor(fi(t[r]/255)*255):t[r]=fi(t[r]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Mg=0;class kc{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Mg++}),this.uuid=nn(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const r={uuid:this.uuid,url:""},n=this.data;if(n!==null){let a;if(Array.isArray(n)){a=[];for(let s=0,o=n.length;s<o;s++)n[s].isDataTexture?a.push(oo(n[s].image)):a.push(oo(n[s]))}else a=oo(n);r.url=a}return t||(e.images[this.uuid]=r),r}}function oo(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Sg.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Eg=0;class _t extends Pr{constructor(e=_t.DEFAULT_IMAGE,t=_t.DEFAULT_MAPPING,r=er,n=er,a=Bt,s=tr,o=kt,l=di,c=_t.DEFAULT_ANISOTROPY,u=Ci){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Eg++}),this.uuid=nn(),this.name="",this.source=new kc(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=r,this.wrapT=n,this.magFilter=a,this.minFilter=s,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Qe(0,0),this.repeat=new Qe(1,1),this.center=new Qe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ae,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const r={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(r.userData=this.userData),t||(e.textures[this.uuid]=r),r}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Sc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Qi:e.x=e.x-Math.floor(e.x);break;case er:e.x=e.x<0?0:1;break;case Es:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Qi:e.y=e.y-Math.floor(e.y);break;case er:e.y=e.y<0?0:1;break;case Es:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}_t.DEFAULT_IMAGE=null,_t.DEFAULT_MAPPING=Sc,_t.DEFAULT_ANISOTROPY=1;class lt{constructor(e=0,t=0,r=0,n=1){lt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=r,this.w=n}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,r,n){return this.x=e,this.y=t,this.z=r,this.w=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,r=this.y,n=this.z,a=this.w,s=e.elements;return this.x=s[0]*t+s[4]*r+s[8]*n+s[12]*a,this.y=s[1]*t+s[5]*r+s[9]*n+s[13]*a,this.z=s[2]*t+s[6]*r+s[10]*n+s[14]*a,this.w=s[3]*t+s[7]*r+s[11]*n+s[15]*a,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,r,n,a;const s=e.elements,o=s[0],l=s[4],c=s[8],u=s[1],h=s[5],d=s[9],f=s[2],v=s[6],x=s[10];if(Math.abs(l-u)<.01&&Math.abs(c-f)<.01&&Math.abs(d-v)<.01){if(Math.abs(l+u)<.1&&Math.abs(c+f)<.1&&Math.abs(d+v)<.1&&Math.abs(o+h+x-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const p=(o+1)/2,w=(h+1)/2,T=(x+1)/2,E=(l+u)/4,D=(c+f)/4,U=(d+v)/4;return p>w&&p>T?p<.01?(r=0,n=.707106781,a=.707106781):(r=Math.sqrt(p),n=E/r,a=D/r):w>T?w<.01?(r=.707106781,n=0,a=.707106781):(n=Math.sqrt(w),r=E/n,a=U/n):T<.01?(r=.707106781,n=.707106781,a=0):(a=Math.sqrt(T),r=D/a,n=U/a),this.set(r,n,a,t),this}let m=Math.sqrt((v-d)*(v-d)+(c-f)*(c-f)+(u-l)*(u-l));return Math.abs(m)<.001&&(m=1),this.x=(v-d)/m,this.y=(c-f)/m,this.z=(u-l)/m,this.w=Math.acos((o+h+x-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ie(this.x,e.x,t.x),this.y=Ie(this.y,e.y,t.y),this.z=Ie(this.z,e.z,t.z),this.w=Ie(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ie(this.x,e,t),this.y=Ie(this.y,e,t),this.z=Ie(this.z,e,t),this.w=Ie(this.w,e,t),this}clampLength(e,t){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Ie(r,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,r){return this.x=e.x+(t.x-e.x)*r,this.y=e.y+(t.y-e.y)*r,this.z=e.z+(t.z-e.z)*r,this.w=e.w+(t.w-e.w)*r,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Tg extends Pr{constructor(e=1,t=1,r={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new lt(0,0,e,t),this.scissorTest=!1,this.viewport=new lt(0,0,e,t);const n={width:e,height:t,depth:1};r=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Bt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},r);const a=new _t(n,r.mapping,r.wrapS,r.wrapT,r.magFilter,r.minFilter,r.format,r.type,r.anisotropy,r.colorSpace);a.flipY=!1,a.generateMipmaps=r.generateMipmaps,a.internalFormat=r.internalFormat,this.textures=[];const s=r.count;for(let o=0;o<s;o++)this.textures[o]=a.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this.depthBuffer=r.depthBuffer,this.stencilBuffer=r.stencilBuffer,this.resolveDepthBuffer=r.resolveDepthBuffer,this.resolveStencilBuffer=r.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=r.depthTexture,this.samples=r.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,r=1){if(this.width!==e||this.height!==t||this.depth!==r){this.width=e,this.height=t,this.depth=r;for(let n=0,a=this.textures.length;n<a;n++)this.textures[n].image.width=e,this.textures[n].image.height=t,this.textures[n].image.depth=r;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let r=0,n=e.textures.length;r<n;r++)this.textures[r]=e.textures[r].clone(),this.textures[r].isRenderTargetTexture=!0,this.textures[r].renderTarget=this;const t=Object.assign({},e.texture.image);return this.texture.source=new kc(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Pi extends Tg{constructor(e=1,t=1,r={}){super(e,t,r),this.isWebGLRenderTarget=!0}}class Hc extends _t{constructor(e=null,t=1,r=1,n=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:r,depth:n},this.magFilter=wt,this.minFilter=wt,this.wrapR=er,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class bg extends _t{constructor(e=null,t=1,r=1,n=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:r,depth:n},this.magFilter=wt,this.minFilter=wt,this.wrapR=er,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class sn{constructor(e=0,t=0,r=0,n=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=r,this._w=n}static slerpFlat(e,t,r,n,a,s,o){let l=r[n+0],c=r[n+1],u=r[n+2],h=r[n+3];const d=a[s+0],f=a[s+1],v=a[s+2],x=a[s+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h;return}if(o===1){e[t+0]=d,e[t+1]=f,e[t+2]=v,e[t+3]=x;return}if(h!==x||l!==d||c!==f||u!==v){let m=1-o;const p=l*d+c*f+u*v+h*x,w=p>=0?1:-1,T=1-p*p;if(T>Number.EPSILON){const D=Math.sqrt(T),U=Math.atan2(D,p*w);m=Math.sin(m*U)/D,o=Math.sin(o*U)/D}const E=o*w;if(l=l*m+d*E,c=c*m+f*E,u=u*m+v*E,h=h*m+x*E,m===1-o){const D=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=D,c*=D,u*=D,h*=D}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,r,n,a,s){const o=r[n],l=r[n+1],c=r[n+2],u=r[n+3],h=a[s],d=a[s+1],f=a[s+2],v=a[s+3];return e[t]=o*v+u*h+l*f-c*d,e[t+1]=l*v+u*d+c*h-o*f,e[t+2]=c*v+u*f+o*d-l*h,e[t+3]=u*v-o*h-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,r,n){return this._x=e,this._y=t,this._z=r,this._w=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const r=e._x,n=e._y,a=e._z,s=e._order,o=Math.cos,l=Math.sin,c=o(r/2),u=o(n/2),h=o(a/2),d=l(r/2),f=l(n/2),v=l(a/2);switch(s){case"XYZ":this._x=d*u*h+c*f*v,this._y=c*f*h-d*u*v,this._z=c*u*v+d*f*h,this._w=c*u*h-d*f*v;break;case"YXZ":this._x=d*u*h+c*f*v,this._y=c*f*h-d*u*v,this._z=c*u*v-d*f*h,this._w=c*u*h+d*f*v;break;case"ZXY":this._x=d*u*h-c*f*v,this._y=c*f*h+d*u*v,this._z=c*u*v+d*f*h,this._w=c*u*h-d*f*v;break;case"ZYX":this._x=d*u*h-c*f*v,this._y=c*f*h+d*u*v,this._z=c*u*v-d*f*h,this._w=c*u*h+d*f*v;break;case"YZX":this._x=d*u*h+c*f*v,this._y=c*f*h+d*u*v,this._z=c*u*v-d*f*h,this._w=c*u*h-d*f*v;break;case"XZY":this._x=d*u*h-c*f*v,this._y=c*f*h-d*u*v,this._z=c*u*v+d*f*h,this._w=c*u*h+d*f*v;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+s)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const r=t/2,n=Math.sin(r);return this._x=e.x*n,this._y=e.y*n,this._z=e.z*n,this._w=Math.cos(r),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,r=t[0],n=t[4],a=t[8],s=t[1],o=t[5],l=t[9],c=t[2],u=t[6],h=t[10],d=r+o+h;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(u-l)*f,this._y=(a-c)*f,this._z=(s-n)*f}else if(r>o&&r>h){const f=2*Math.sqrt(1+r-o-h);this._w=(u-l)/f,this._x=.25*f,this._y=(n+s)/f,this._z=(a+c)/f}else if(o>h){const f=2*Math.sqrt(1+o-r-h);this._w=(a-c)/f,this._x=(n+s)/f,this._y=.25*f,this._z=(l+u)/f}else{const f=2*Math.sqrt(1+h-r-o);this._w=(s-n)/f,this._x=(a+c)/f,this._y=(l+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let r=e.dot(t)+1;return r<Number.EPSILON?(r=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=r):(this._x=0,this._y=-e.z,this._z=e.y,this._w=r)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=r),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ie(this.dot(e),-1,1)))}rotateTowards(e,t){const r=this.angleTo(e);if(r===0)return this;const n=Math.min(1,t/r);return this.slerp(e,n),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const r=e._x,n=e._y,a=e._z,s=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=r*u+s*o+n*c-a*l,this._y=n*u+s*l+a*o-r*c,this._z=a*u+s*c+r*l-n*o,this._w=s*u-r*o-n*l-a*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const r=this._x,n=this._y,a=this._z,s=this._w;let o=s*e._w+r*e._x+n*e._y+a*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=s,this._x=r,this._y=n,this._z=a,this;const l=1-o*o;if(l<=Number.EPSILON){const f=1-t;return this._w=f*s+t*this._w,this._x=f*r+t*this._x,this._y=f*n+t*this._y,this._z=f*a+t*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,o),h=Math.sin((1-t)*u)/c,d=Math.sin(t*u)/c;return this._w=s*h+this._w*d,this._x=r*h+this._x*d,this._y=n*h+this._y*d,this._z=a*h+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,r){return this.copy(e).slerp(t,r)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),r=Math.random(),n=Math.sqrt(1-r),a=Math.sqrt(r);return this.set(n*Math.sin(e),n*Math.cos(e),a*Math.sin(t),a*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class F{constructor(e=0,t=0,r=0){F.prototype.isVector3=!0,this.x=e,this.y=t,this.z=r}set(e,t,r){return r===void 0&&(r=this.z),this.x=e,this.y=t,this.z=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Gc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Gc.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,r=this.y,n=this.z,a=e.elements;return this.x=a[0]*t+a[3]*r+a[6]*n,this.y=a[1]*t+a[4]*r+a[7]*n,this.z=a[2]*t+a[5]*r+a[8]*n,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,r=this.y,n=this.z,a=e.elements,s=1/(a[3]*t+a[7]*r+a[11]*n+a[15]);return this.x=(a[0]*t+a[4]*r+a[8]*n+a[12])*s,this.y=(a[1]*t+a[5]*r+a[9]*n+a[13])*s,this.z=(a[2]*t+a[6]*r+a[10]*n+a[14])*s,this}applyQuaternion(e){const t=this.x,r=this.y,n=this.z,a=e.x,s=e.y,o=e.z,l=e.w,c=2*(s*n-o*r),u=2*(o*t-a*n),h=2*(a*r-s*t);return this.x=t+l*c+s*h-o*u,this.y=r+l*u+o*c-a*h,this.z=n+l*h+a*u-s*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,r=this.y,n=this.z,a=e.elements;return this.x=a[0]*t+a[4]*r+a[8]*n,this.y=a[1]*t+a[5]*r+a[9]*n,this.z=a[2]*t+a[6]*r+a[10]*n,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ie(this.x,e.x,t.x),this.y=Ie(this.y,e.y,t.y),this.z=Ie(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ie(this.x,e,t),this.y=Ie(this.y,e,t),this.z=Ie(this.z,e,t),this}clampLength(e,t){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Ie(r,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,r){return this.x=e.x+(t.x-e.x)*r,this.y=e.y+(t.y-e.y)*r,this.z=e.z+(t.z-e.z)*r,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const r=e.x,n=e.y,a=e.z,s=t.x,o=t.y,l=t.z;return this.x=n*l-a*o,this.y=a*s-r*l,this.z=r*o-n*s,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const r=e.dot(this)/t;return this.copy(e).multiplyScalar(r)}projectOnPlane(e){return lo.copy(this).projectOnVector(e),this.sub(lo)}reflect(e){return this.sub(lo.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const r=this.dot(e)/t;return Math.acos(Ie(r,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,r=this.y-e.y,n=this.z-e.z;return t*t+r*r+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,r){const n=Math.sin(t)*e;return this.x=n*Math.sin(r),this.y=Math.cos(t)*e,this.z=n*Math.cos(r),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,r){return this.x=e*Math.sin(t),this.y=r,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),r=this.setFromMatrixColumn(e,1).length(),n=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=r,this.z=n,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,r=Math.sqrt(1-t*t);return this.x=r*Math.cos(e),this.y=t,this.z=r*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const lo=new F,Gc=new sn;class on{constructor(e=new F(1/0,1/0,1/0),t=new F(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,r=e.length;t<r;t+=3)this.expandByPoint($t.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,r=e.count;t<r;t++)this.expandByPoint($t.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,r=e.length;t<r;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const r=$t.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(r),this.max.copy(e).add(r),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const r=e.geometry;if(r!==void 0){const a=r.getAttribute("position");if(t===!0&&a!==void 0&&e.isInstancedMesh!==!0)for(let s=0,o=a.count;s<o;s++)e.isMesh===!0?e.getVertexPosition(s,$t):$t.fromBufferAttribute(a,s),$t.applyMatrix4(e.matrixWorld),this.expandByPoint($t);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ea.copy(e.boundingBox)):(r.boundingBox===null&&r.computeBoundingBox(),ea.copy(r.boundingBox)),ea.applyMatrix4(e.matrixWorld),this.union(ea)}const n=e.children;for(let a=0,s=n.length;a<s;a++)this.expandByObject(n[a],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,$t),$t.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,r;return e.normal.x>0?(t=e.normal.x*this.min.x,r=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,r=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,r+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,r+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,r+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,r+=e.normal.z*this.min.z),t<=-e.constant&&r>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ln),ta.subVectors(this.max,ln),Ir.subVectors(e.a,ln),Nr.subVectors(e.b,ln),Or.subVectors(e.c,ln),Li.subVectors(Nr,Ir),Ui.subVectors(Or,Nr),rr.subVectors(Ir,Or);let t=[0,-Li.z,Li.y,0,-Ui.z,Ui.y,0,-rr.z,rr.y,Li.z,0,-Li.x,Ui.z,0,-Ui.x,rr.z,0,-rr.x,-Li.y,Li.x,0,-Ui.y,Ui.x,0,-rr.y,rr.x,0];return!co(t,Ir,Nr,Or,ta)||(t=[1,0,0,0,1,0,0,0,1],!co(t,Ir,Nr,Or,ta))?!1:(ia.crossVectors(Li,Ui),t=[ia.x,ia.y,ia.z],co(t,Ir,Nr,Or,ta))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,$t).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize($t).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(mi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),mi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),mi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),mi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),mi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),mi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),mi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),mi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(mi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const mi=[new F,new F,new F,new F,new F,new F,new F,new F],$t=new F,ea=new on,Ir=new F,Nr=new F,Or=new F,Li=new F,Ui=new F,rr=new F,ln=new F,ta=new F,ia=new F,nr=new F;function co(i,e,t,r,n){for(let a=0,s=i.length-3;a<=s;a+=3){nr.fromArray(i,a);const o=n.x*Math.abs(nr.x)+n.y*Math.abs(nr.y)+n.z*Math.abs(nr.z),l=e.dot(nr),c=t.dot(nr),u=r.dot(nr);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const wg=new on,cn=new F,uo=new F;class ra{constructor(e=new F,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const r=this.center;t!==void 0?r.copy(t):wg.setFromPoints(e).getCenter(r);let n=0;for(let a=0,s=e.length;a<s;a++)n=Math.max(n,r.distanceToSquared(e[a]));return this.radius=Math.sqrt(n),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const r=this.center.distanceToSquared(e);return t.copy(e),r>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;cn.subVectors(e,this.center);const t=cn.lengthSq();if(t>this.radius*this.radius){const r=Math.sqrt(t),n=(r-this.radius)*.5;this.center.addScaledVector(cn,n/r),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(uo.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(cn.copy(e.center).add(uo)),this.expandByPoint(cn.copy(e.center).sub(uo))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const gi=new F,ho=new F,na=new F,Di=new F,po=new F,aa=new F,fo=new F;class Vc{constructor(e=new F,t=new F(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,gi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const r=t.dot(this.direction);return r<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,r)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=gi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(gi.copy(this.origin).addScaledVector(this.direction,t),gi.distanceToSquared(e))}distanceSqToSegment(e,t,r,n){ho.copy(e).add(t).multiplyScalar(.5),na.copy(t).sub(e).normalize(),Di.copy(this.origin).sub(ho);const a=e.distanceTo(t)*.5,s=-this.direction.dot(na),o=Di.dot(this.direction),l=-Di.dot(na),c=Di.lengthSq(),u=Math.abs(1-s*s);let h,d,f,v;if(u>0)if(h=s*l-o,d=s*o-l,v=a*u,h>=0)if(d>=-v)if(d<=v){const x=1/u;h*=x,d*=x,f=h*(h+s*d+2*o)+d*(s*h+d+2*l)+c}else d=a,h=Math.max(0,-(s*d+o)),f=-h*h+d*(d+2*l)+c;else d=-a,h=Math.max(0,-(s*d+o)),f=-h*h+d*(d+2*l)+c;else d<=-v?(h=Math.max(0,-(-s*a+o)),d=h>0?-a:Math.min(Math.max(-a,-l),a),f=-h*h+d*(d+2*l)+c):d<=v?(h=0,d=Math.min(Math.max(-a,-l),a),f=d*(d+2*l)+c):(h=Math.max(0,-(s*a+o)),d=h>0?a:Math.min(Math.max(-a,-l),a),f=-h*h+d*(d+2*l)+c);else d=s>0?-a:a,h=Math.max(0,-(s*d+o)),f=-h*h+d*(d+2*l)+c;return r&&r.copy(this.origin).addScaledVector(this.direction,h),n&&n.copy(ho).addScaledVector(na,d),f}intersectSphere(e,t){gi.subVectors(e.center,this.origin);const r=gi.dot(this.direction),n=gi.dot(gi)-r*r,a=e.radius*e.radius;if(n>a)return null;const s=Math.sqrt(a-n),o=r-s,l=r+s;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const r=-(this.origin.dot(e.normal)+e.constant)/t;return r>=0?r:null}intersectPlane(e,t){const r=this.distanceToPlane(e);return r===null?null:this.at(r,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let r,n,a,s,o,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,d=this.origin;return c>=0?(r=(e.min.x-d.x)*c,n=(e.max.x-d.x)*c):(r=(e.max.x-d.x)*c,n=(e.min.x-d.x)*c),u>=0?(a=(e.min.y-d.y)*u,s=(e.max.y-d.y)*u):(a=(e.max.y-d.y)*u,s=(e.min.y-d.y)*u),r>s||a>n||((a>r||isNaN(r))&&(r=a),(s<n||isNaN(n))&&(n=s),h>=0?(o=(e.min.z-d.z)*h,l=(e.max.z-d.z)*h):(o=(e.max.z-d.z)*h,l=(e.min.z-d.z)*h),r>l||o>n)||((o>r||r!==r)&&(r=o),(l<n||n!==n)&&(n=l),n<0)?null:this.at(r>=0?r:n,t)}intersectsBox(e){return this.intersectBox(e,gi)!==null}intersectTriangle(e,t,r,n,a){po.subVectors(t,e),aa.subVectors(r,e),fo.crossVectors(po,aa);let s=this.direction.dot(fo),o;if(s>0){if(n)return null;o=1}else if(s<0)o=-1,s=-s;else return null;Di.subVectors(this.origin,e);const l=o*this.direction.dot(aa.crossVectors(Di,aa));if(l<0)return null;const c=o*this.direction.dot(po.cross(Di));if(c<0||l+c>s)return null;const u=-o*Di.dot(fo);return u<0?null:this.at(u/s,a)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ct{constructor(e,t,r,n,a,s,o,l,c,u,h,d,f,v,x,m){ct.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,r,n,a,s,o,l,c,u,h,d,f,v,x,m)}set(e,t,r,n,a,s,o,l,c,u,h,d,f,v,x,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=r,p[12]=n,p[1]=a,p[5]=s,p[9]=o,p[13]=l,p[2]=c,p[6]=u,p[10]=h,p[14]=d,p[3]=f,p[7]=v,p[11]=x,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ct().fromArray(this.elements)}copy(e){const t=this.elements,r=e.elements;return t[0]=r[0],t[1]=r[1],t[2]=r[2],t[3]=r[3],t[4]=r[4],t[5]=r[5],t[6]=r[6],t[7]=r[7],t[8]=r[8],t[9]=r[9],t[10]=r[10],t[11]=r[11],t[12]=r[12],t[13]=r[13],t[14]=r[14],t[15]=r[15],this}copyPosition(e){const t=this.elements,r=e.elements;return t[12]=r[12],t[13]=r[13],t[14]=r[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,r){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),r.setFromMatrixColumn(this,2),this}makeBasis(e,t,r){return this.set(e.x,t.x,r.x,0,e.y,t.y,r.y,0,e.z,t.z,r.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,r=e.elements,n=1/Fr.setFromMatrixColumn(e,0).length(),a=1/Fr.setFromMatrixColumn(e,1).length(),s=1/Fr.setFromMatrixColumn(e,2).length();return t[0]=r[0]*n,t[1]=r[1]*n,t[2]=r[2]*n,t[3]=0,t[4]=r[4]*a,t[5]=r[5]*a,t[6]=r[6]*a,t[7]=0,t[8]=r[8]*s,t[9]=r[9]*s,t[10]=r[10]*s,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,r=e.x,n=e.y,a=e.z,s=Math.cos(r),o=Math.sin(r),l=Math.cos(n),c=Math.sin(n),u=Math.cos(a),h=Math.sin(a);if(e.order==="XYZ"){const d=s*u,f=s*h,v=o*u,x=o*h;t[0]=l*u,t[4]=-l*h,t[8]=c,t[1]=f+v*c,t[5]=d-x*c,t[9]=-o*l,t[2]=x-d*c,t[6]=v+f*c,t[10]=s*l}else if(e.order==="YXZ"){const d=l*u,f=l*h,v=c*u,x=c*h;t[0]=d+x*o,t[4]=v*o-f,t[8]=s*c,t[1]=s*h,t[5]=s*u,t[9]=-o,t[2]=f*o-v,t[6]=x+d*o,t[10]=s*l}else if(e.order==="ZXY"){const d=l*u,f=l*h,v=c*u,x=c*h;t[0]=d-x*o,t[4]=-s*h,t[8]=v+f*o,t[1]=f+v*o,t[5]=s*u,t[9]=x-d*o,t[2]=-s*c,t[6]=o,t[10]=s*l}else if(e.order==="ZYX"){const d=s*u,f=s*h,v=o*u,x=o*h;t[0]=l*u,t[4]=v*c-f,t[8]=d*c+x,t[1]=l*h,t[5]=x*c+d,t[9]=f*c-v,t[2]=-c,t[6]=o*l,t[10]=s*l}else if(e.order==="YZX"){const d=s*l,f=s*c,v=o*l,x=o*c;t[0]=l*u,t[4]=x-d*h,t[8]=v*h+f,t[1]=h,t[5]=s*u,t[9]=-o*u,t[2]=-c*u,t[6]=f*h+v,t[10]=d-x*h}else if(e.order==="XZY"){const d=s*l,f=s*c,v=o*l,x=o*c;t[0]=l*u,t[4]=-h,t[8]=c*u,t[1]=d*h+x,t[5]=s*u,t[9]=f*h-v,t[2]=v*h-f,t[6]=o*u,t[10]=x*h+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Ag,e,Rg)}lookAt(e,t,r){const n=this.elements;return Lt.subVectors(e,t),Lt.lengthSq()===0&&(Lt.z=1),Lt.normalize(),Ii.crossVectors(r,Lt),Ii.lengthSq()===0&&(Math.abs(r.z)===1?Lt.x+=1e-4:Lt.z+=1e-4,Lt.normalize(),Ii.crossVectors(r,Lt)),Ii.normalize(),sa.crossVectors(Lt,Ii),n[0]=Ii.x,n[4]=sa.x,n[8]=Lt.x,n[1]=Ii.y,n[5]=sa.y,n[9]=Lt.y,n[2]=Ii.z,n[6]=sa.z,n[10]=Lt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const r=e.elements,n=t.elements,a=this.elements,s=r[0],o=r[4],l=r[8],c=r[12],u=r[1],h=r[5],d=r[9],f=r[13],v=r[2],x=r[6],m=r[10],p=r[14],w=r[3],T=r[7],E=r[11],D=r[15],U=n[0],A=n[4],I=n[8],S=n[12],y=n[1],C=n[5],G=n[9],k=n[13],W=n[2],Z=n[6],V=n[10],J=n[14],H=n[3],te=n[7],pe=n[11],Re=n[15];return a[0]=s*U+o*y+l*W+c*H,a[4]=s*A+o*C+l*Z+c*te,a[8]=s*I+o*G+l*V+c*pe,a[12]=s*S+o*k+l*J+c*Re,a[1]=u*U+h*y+d*W+f*H,a[5]=u*A+h*C+d*Z+f*te,a[9]=u*I+h*G+d*V+f*pe,a[13]=u*S+h*k+d*J+f*Re,a[2]=v*U+x*y+m*W+p*H,a[6]=v*A+x*C+m*Z+p*te,a[10]=v*I+x*G+m*V+p*pe,a[14]=v*S+x*k+m*J+p*Re,a[3]=w*U+T*y+E*W+D*H,a[7]=w*A+T*C+E*Z+D*te,a[11]=w*I+T*G+E*V+D*pe,a[15]=w*S+T*k+E*J+D*Re,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],r=e[4],n=e[8],a=e[12],s=e[1],o=e[5],l=e[9],c=e[13],u=e[2],h=e[6],d=e[10],f=e[14],v=e[3],x=e[7],m=e[11],p=e[15];return v*(+a*l*h-n*c*h-a*o*d+r*c*d+n*o*f-r*l*f)+x*(+t*l*f-t*c*d+a*s*d-n*s*f+n*c*u-a*l*u)+m*(+t*c*h-t*o*f-a*s*h+r*s*f+a*o*u-r*c*u)+p*(-n*o*u-t*l*h+t*o*d+n*s*h-r*s*d+r*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,r){const n=this.elements;return e.isVector3?(n[12]=e.x,n[13]=e.y,n[14]=e.z):(n[12]=e,n[13]=t,n[14]=r),this}invert(){const e=this.elements,t=e[0],r=e[1],n=e[2],a=e[3],s=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=e[9],d=e[10],f=e[11],v=e[12],x=e[13],m=e[14],p=e[15],w=h*m*c-x*d*c+x*l*f-o*m*f-h*l*p+o*d*p,T=v*d*c-u*m*c-v*l*f+s*m*f+u*l*p-s*d*p,E=u*x*c-v*h*c+v*o*f-s*x*f-u*o*p+s*h*p,D=v*h*l-u*x*l-v*o*d+s*x*d+u*o*m-s*h*m,U=t*w+r*T+n*E+a*D;if(U===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/U;return e[0]=w*A,e[1]=(x*d*a-h*m*a-x*n*f+r*m*f+h*n*p-r*d*p)*A,e[2]=(o*m*a-x*l*a+x*n*c-r*m*c-o*n*p+r*l*p)*A,e[3]=(h*l*a-o*d*a-h*n*c+r*d*c+o*n*f-r*l*f)*A,e[4]=T*A,e[5]=(u*m*a-v*d*a+v*n*f-t*m*f-u*n*p+t*d*p)*A,e[6]=(v*l*a-s*m*a-v*n*c+t*m*c+s*n*p-t*l*p)*A,e[7]=(s*d*a-u*l*a+u*n*c-t*d*c-s*n*f+t*l*f)*A,e[8]=E*A,e[9]=(v*h*a-u*x*a-v*r*f+t*x*f+u*r*p-t*h*p)*A,e[10]=(s*x*a-v*o*a+v*r*c-t*x*c-s*r*p+t*o*p)*A,e[11]=(u*o*a-s*h*a-u*r*c+t*h*c+s*r*f-t*o*f)*A,e[12]=D*A,e[13]=(u*x*n-v*h*n+v*r*d-t*x*d-u*r*m+t*h*m)*A,e[14]=(v*o*n-s*x*n-v*r*l+t*x*l+s*r*m-t*o*m)*A,e[15]=(s*h*n-u*o*n+u*r*l-t*h*l-s*r*d+t*o*d)*A,this}scale(e){const t=this.elements,r=e.x,n=e.y,a=e.z;return t[0]*=r,t[4]*=n,t[8]*=a,t[1]*=r,t[5]*=n,t[9]*=a,t[2]*=r,t[6]*=n,t[10]*=a,t[3]*=r,t[7]*=n,t[11]*=a,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],r=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],n=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,r,n))}makeTranslation(e,t,r){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,r,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),r=Math.sin(e);return this.set(1,0,0,0,0,t,-r,0,0,r,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),r=Math.sin(e);return this.set(t,0,r,0,0,1,0,0,-r,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),r=Math.sin(e);return this.set(t,-r,0,0,r,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const r=Math.cos(t),n=Math.sin(t),a=1-r,s=e.x,o=e.y,l=e.z,c=a*s,u=a*o;return this.set(c*s+r,c*o-n*l,c*l+n*o,0,c*o+n*l,u*o+r,u*l-n*s,0,c*l-n*o,u*l+n*s,a*l*l+r,0,0,0,0,1),this}makeScale(e,t,r){return this.set(e,0,0,0,0,t,0,0,0,0,r,0,0,0,0,1),this}makeShear(e,t,r,n,a,s){return this.set(1,r,a,0,e,1,s,0,t,n,1,0,0,0,0,1),this}compose(e,t,r){const n=this.elements,a=t._x,s=t._y,o=t._z,l=t._w,c=a+a,u=s+s,h=o+o,d=a*c,f=a*u,v=a*h,x=s*u,m=s*h,p=o*h,w=l*c,T=l*u,E=l*h,D=r.x,U=r.y,A=r.z;return n[0]=(1-(x+p))*D,n[1]=(f+E)*D,n[2]=(v-T)*D,n[3]=0,n[4]=(f-E)*U,n[5]=(1-(d+p))*U,n[6]=(m+w)*U,n[7]=0,n[8]=(v+T)*A,n[9]=(m-w)*A,n[10]=(1-(d+x))*A,n[11]=0,n[12]=e.x,n[13]=e.y,n[14]=e.z,n[15]=1,this}decompose(e,t,r){const n=this.elements;let a=Fr.set(n[0],n[1],n[2]).length();const s=Fr.set(n[4],n[5],n[6]).length(),o=Fr.set(n[8],n[9],n[10]).length();this.determinant()<0&&(a=-a),e.x=n[12],e.y=n[13],e.z=n[14],Kt.copy(this);const l=1/a,c=1/s,u=1/o;return Kt.elements[0]*=l,Kt.elements[1]*=l,Kt.elements[2]*=l,Kt.elements[4]*=c,Kt.elements[5]*=c,Kt.elements[6]*=c,Kt.elements[8]*=u,Kt.elements[9]*=u,Kt.elements[10]*=u,t.setFromRotationMatrix(Kt),r.x=a,r.y=s,r.z=o,this}makePerspective(e,t,r,n,a,s,o=pi){const l=this.elements,c=2*a/(t-e),u=2*a/(r-n),h=(t+e)/(t-e),d=(r+n)/(r-n);let f,v;if(o===pi)f=-(s+a)/(s-a),v=-2*s*a/(s-a);else if(o===Jn)f=-s/(s-a),v=-s*a/(s-a);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=u,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=v,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,r,n,a,s,o=pi){const l=this.elements,c=1/(t-e),u=1/(r-n),h=1/(s-a),d=(t+e)*c,f=(r+n)*u;let v,x;if(o===pi)v=(s+a)*h,x=-2*h;else if(o===Jn)v=a*h,x=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=x,l[14]=-v,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,r=e.elements;for(let n=0;n<16;n++)if(t[n]!==r[n])return!1;return!0}fromArray(e,t=0){for(let r=0;r<16;r++)this.elements[r]=e[r+t];return this}toArray(e=[],t=0){const r=this.elements;return e[t]=r[0],e[t+1]=r[1],e[t+2]=r[2],e[t+3]=r[3],e[t+4]=r[4],e[t+5]=r[5],e[t+6]=r[6],e[t+7]=r[7],e[t+8]=r[8],e[t+9]=r[9],e[t+10]=r[10],e[t+11]=r[11],e[t+12]=r[12],e[t+13]=r[13],e[t+14]=r[14],e[t+15]=r[15],e}}const Fr=new F,Kt=new ct,Ag=new F(0,0,0),Rg=new F(1,1,1),Ii=new F,sa=new F,Lt=new F,Wc=new ct,Xc=new sn;class Si{constructor(e=0,t=0,r=0,n=Si.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=r,this._order=n}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,r,n=this._order){return this._x=e,this._y=t,this._z=r,this._order=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,r=!0){const n=e.elements,a=n[0],s=n[4],o=n[8],l=n[1],c=n[5],u=n[9],h=n[2],d=n[6],f=n[10];switch(t){case"XYZ":this._y=Math.asin(Ie(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-s,a)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ie(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,a),this._z=0);break;case"ZXY":this._x=Math.asin(Ie(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,f),this._z=Math.atan2(-s,c)):(this._y=0,this._z=Math.atan2(l,a));break;case"ZYX":this._y=Math.asin(-Ie(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,a)):(this._x=0,this._z=Math.atan2(-s,c));break;case"YZX":this._z=Math.asin(Ie(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,a)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Ie(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,a)):(this._x=Math.atan2(-u,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,r===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,r){return Wc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Wc,t,r)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Xc.setFromEuler(this),this.setFromQuaternion(Xc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Si.DEFAULT_ORDER="XYZ";class jc{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Cg=0;const qc=new F,zr=new sn,_i=new ct,oa=new F,un=new F,Pg=new F,Lg=new sn,Yc=new F(1,0,0),$c=new F(0,1,0),Kc=new F(0,0,1),Zc={type:"added"},Ug={type:"removed"},Br={type:"childadded",child:null},mo={type:"childremoved",child:null};class Rt extends Pr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Cg++}),this.uuid=nn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Rt.DEFAULT_UP.clone();const e=new F,t=new Si,r=new sn,n=new F(1,1,1);function a(){r.setFromEuler(t,!1)}function s(){t.setFromQuaternion(r,void 0,!1)}t._onChange(a),r._onChange(s),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:n},modelViewMatrix:{value:new ct},normalMatrix:{value:new Ae}}),this.matrix=new ct,this.matrixWorld=new ct,this.matrixAutoUpdate=Rt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Rt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new jc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return zr.setFromAxisAngle(e,t),this.quaternion.multiply(zr),this}rotateOnWorldAxis(e,t){return zr.setFromAxisAngle(e,t),this.quaternion.premultiply(zr),this}rotateX(e){return this.rotateOnAxis(Yc,e)}rotateY(e){return this.rotateOnAxis($c,e)}rotateZ(e){return this.rotateOnAxis(Kc,e)}translateOnAxis(e,t){return qc.copy(e).applyQuaternion(this.quaternion),this.position.add(qc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Yc,e)}translateY(e){return this.translateOnAxis($c,e)}translateZ(e){return this.translateOnAxis(Kc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(_i.copy(this.matrixWorld).invert())}lookAt(e,t,r){e.isVector3?oa.copy(e):oa.set(e,t,r);const n=this.parent;this.updateWorldMatrix(!0,!1),un.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?_i.lookAt(un,oa,this.up):_i.lookAt(oa,un,this.up),this.quaternion.setFromRotationMatrix(_i),n&&(_i.extractRotation(n.matrixWorld),zr.setFromRotationMatrix(_i),this.quaternion.premultiply(zr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Zc),Br.child=e,this.dispatchEvent(Br),Br.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let r=0;r<arguments.length;r++)this.remove(arguments[r]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Ug),mo.child=e,this.dispatchEvent(mo),mo.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),_i.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),_i.multiply(e.parent.matrixWorld)),e.applyMatrix4(_i),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Zc),Br.child=e,this.dispatchEvent(Br),Br.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let r=0,n=this.children.length;r<n;r++){const a=this.children[r].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,r=[]){this[e]===t&&r.push(this);const n=this.children;for(let a=0,s=n.length;a<s;a++)n[a].getObjectsByProperty(e,t,r);return r}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(un,e,Pg),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(un,Lg,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let r=0,n=t.length;r<n;r++)t[r].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let r=0,n=t.length;r<n;r++)t[r].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let r=0,n=t.length;r<n;r++)t[r].updateMatrixWorld(e)}updateWorldMatrix(e,t){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const n=this.children;for(let a=0,s=n.length;a<s;a++)n[a].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",r={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},r.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const n={};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.castShadow===!0&&(n.castShadow=!0),this.receiveShadow===!0&&(n.receiveShadow=!0),this.visible===!1&&(n.visible=!1),this.frustumCulled===!1&&(n.frustumCulled=!1),this.renderOrder!==0&&(n.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(n.userData=this.userData),n.layers=this.layers.mask,n.matrix=this.matrix.toArray(),n.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(n.matrixAutoUpdate=!1),this.isInstancedMesh&&(n.type="InstancedMesh",n.count=this.count,n.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(n.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(n.type="BatchedMesh",n.perObjectFrustumCulled=this.perObjectFrustumCulled,n.sortObjects=this.sortObjects,n.drawRanges=this._drawRanges,n.reservedRanges=this._reservedRanges,n.visibility=this._visibility,n.active=this._active,n.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),n.maxInstanceCount=this._maxInstanceCount,n.maxVertexCount=this._maxVertexCount,n.maxIndexCount=this._maxIndexCount,n.geometryInitialized=this._geometryInitialized,n.geometryCount=this._geometryCount,n.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(n.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(n.boundingSphere={center:n.boundingSphere.center.toArray(),radius:n.boundingSphere.radius}),this.boundingBox!==null&&(n.boundingBox={min:n.boundingBox.min.toArray(),max:n.boundingBox.max.toArray()}));function a(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?n.background=this.background.toJSON():this.background.isTexture&&(n.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(n.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){n.geometry=a(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];a(e.shapes,h)}else a(e.shapes,l)}}if(this.isSkinnedMesh&&(n.bindMode=this.bindMode,n.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(a(e.skeletons,this.skeleton),n.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(a(e.materials,this.material[l]));n.material=o}else n.material=a(e.materials,this.material);if(this.children.length>0){n.children=[];for(let o=0;o<this.children.length;o++)n.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){n.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];n.animations.push(a(e.animations,l))}}if(t){const o=s(e.geometries),l=s(e.materials),c=s(e.textures),u=s(e.images),h=s(e.shapes),d=s(e.skeletons),f=s(e.animations),v=s(e.nodes);o.length>0&&(r.geometries=o),l.length>0&&(r.materials=l),c.length>0&&(r.textures=c),u.length>0&&(r.images=u),h.length>0&&(r.shapes=h),d.length>0&&(r.skeletons=d),f.length>0&&(r.animations=f),v.length>0&&(r.nodes=v)}return r.object=n,r;function s(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let r=0;r<e.children.length;r++){const n=e.children[r];this.add(n.clone())}return this}}Rt.DEFAULT_UP=new F(0,1,0),Rt.DEFAULT_MATRIX_AUTO_UPDATE=!0,Rt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Zt=new F,vi=new F,go=new F,xi=new F,kr=new F,Hr=new F,Jc=new F,_o=new F,vo=new F,xo=new F,yo=new lt,So=new lt,Mo=new lt;class Jt{constructor(e=new F,t=new F,r=new F){this.a=e,this.b=t,this.c=r}static getNormal(e,t,r,n){n.subVectors(r,t),Zt.subVectors(e,t),n.cross(Zt);const a=n.lengthSq();return a>0?n.multiplyScalar(1/Math.sqrt(a)):n.set(0,0,0)}static getBarycoord(e,t,r,n,a){Zt.subVectors(n,t),vi.subVectors(r,t),go.subVectors(e,t);const s=Zt.dot(Zt),o=Zt.dot(vi),l=Zt.dot(go),c=vi.dot(vi),u=vi.dot(go),h=s*c-o*o;if(h===0)return a.set(0,0,0),null;const d=1/h,f=(c*l-o*u)*d,v=(s*u-o*l)*d;return a.set(1-f-v,v,f)}static containsPoint(e,t,r,n){return this.getBarycoord(e,t,r,n,xi)===null?!1:xi.x>=0&&xi.y>=0&&xi.x+xi.y<=1}static getInterpolation(e,t,r,n,a,s,o,l){return this.getBarycoord(e,t,r,n,xi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(a,xi.x),l.addScaledVector(s,xi.y),l.addScaledVector(o,xi.z),l)}static getInterpolatedAttribute(e,t,r,n,a,s){return yo.setScalar(0),So.setScalar(0),Mo.setScalar(0),yo.fromBufferAttribute(e,t),So.fromBufferAttribute(e,r),Mo.fromBufferAttribute(e,n),s.setScalar(0),s.addScaledVector(yo,a.x),s.addScaledVector(So,a.y),s.addScaledVector(Mo,a.z),s}static isFrontFacing(e,t,r,n){return Zt.subVectors(r,t),vi.subVectors(e,t),Zt.cross(vi).dot(n)<0}set(e,t,r){return this.a.copy(e),this.b.copy(t),this.c.copy(r),this}setFromPointsAndIndices(e,t,r,n){return this.a.copy(e[t]),this.b.copy(e[r]),this.c.copy(e[n]),this}setFromAttributeAndIndices(e,t,r,n){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,r),this.c.fromBufferAttribute(e,n),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Zt.subVectors(this.c,this.b),vi.subVectors(this.a,this.b),Zt.cross(vi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Jt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Jt.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,r,n,a){return Jt.getInterpolation(e,this.a,this.b,this.c,t,r,n,a)}containsPoint(e){return Jt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Jt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const r=this.a,n=this.b,a=this.c;let s,o;kr.subVectors(n,r),Hr.subVectors(a,r),_o.subVectors(e,r);const l=kr.dot(_o),c=Hr.dot(_o);if(l<=0&&c<=0)return t.copy(r);vo.subVectors(e,n);const u=kr.dot(vo),h=Hr.dot(vo);if(u>=0&&h<=u)return t.copy(n);const d=l*h-u*c;if(d<=0&&l>=0&&u<=0)return s=l/(l-u),t.copy(r).addScaledVector(kr,s);xo.subVectors(e,a);const f=kr.dot(xo),v=Hr.dot(xo);if(v>=0&&f<=v)return t.copy(a);const x=f*c-l*v;if(x<=0&&c>=0&&v<=0)return o=c/(c-v),t.copy(r).addScaledVector(Hr,o);const m=u*v-f*h;if(m<=0&&h-u>=0&&f-v>=0)return Jc.subVectors(a,n),o=(h-u)/(h-u+(f-v)),t.copy(n).addScaledVector(Jc,o);const p=1/(m+x+d);return s=x*p,o=d*p,t.copy(r).addScaledVector(kr,s).addScaledVector(Hr,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Qc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ni={h:0,s:0,l:0},la={h:0,s:0,l:0};function Eo(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class Xe{constructor(e,t,r){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,r)}set(e,t,r){if(t===void 0&&r===void 0){const n=e;n&&n.isColor?this.copy(n):typeof n=="number"?this.setHex(n):typeof n=="string"&&this.setStyle(n)}else this.setRGB(e,t,r);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Ht){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ve.toWorkingColorSpace(this,t),this}setRGB(e,t,r,n=Ve.workingColorSpace){return this.r=e,this.g=t,this.b=r,Ve.toWorkingColorSpace(this,n),this}setHSL(e,t,r,n=Ve.workingColorSpace){if(e=mg(e,1),t=Ie(t,0,1),r=Ie(r,0,1),t===0)this.r=this.g=this.b=r;else{const a=r<=.5?r*(1+t):r+t-r*t,s=2*r-a;this.r=Eo(s,a,e+1/3),this.g=Eo(s,a,e),this.b=Eo(s,a,e-1/3)}return Ve.toWorkingColorSpace(this,n),this}setStyle(e,t=Ht){function r(a){a!==void 0&&parseFloat(a)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let n;if(n=/^(\w+)\(([^\)]*)\)/.exec(e)){let a;const s=n[1],o=n[2];switch(s){case"rgb":case"rgba":if(a=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return r(a[4]),this.setRGB(Math.min(255,parseInt(a[1],10))/255,Math.min(255,parseInt(a[2],10))/255,Math.min(255,parseInt(a[3],10))/255,t);if(a=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return r(a[4]),this.setRGB(Math.min(100,parseInt(a[1],10))/100,Math.min(100,parseInt(a[2],10))/100,Math.min(100,parseInt(a[3],10))/100,t);break;case"hsl":case"hsla":if(a=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return r(a[4]),this.setHSL(parseFloat(a[1])/360,parseFloat(a[2])/100,parseFloat(a[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(n=/^\#([A-Fa-f\d]+)$/.exec(e)){const a=n[1],s=a.length;if(s===3)return this.setRGB(parseInt(a.charAt(0),16)/15,parseInt(a.charAt(1),16)/15,parseInt(a.charAt(2),16)/15,t);if(s===6)return this.setHex(parseInt(a,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Ht){const r=Qc[e.toLowerCase()];return r!==void 0?this.setHex(r,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=fi(e.r),this.g=fi(e.g),this.b=fi(e.b),this}copyLinearToSRGB(e){return this.r=Ur(e.r),this.g=Ur(e.g),this.b=Ur(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ht){return Ve.fromWorkingColorSpace(yt.copy(this),e),Math.round(Ie(yt.r*255,0,255))*65536+Math.round(Ie(yt.g*255,0,255))*256+Math.round(Ie(yt.b*255,0,255))}getHexString(e=Ht){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ve.workingColorSpace){Ve.fromWorkingColorSpace(yt.copy(this),t);const r=yt.r,n=yt.g,a=yt.b,s=Math.max(r,n,a),o=Math.min(r,n,a);let l,c;const u=(o+s)/2;if(o===s)l=0,c=0;else{const h=s-o;switch(c=u<=.5?h/(s+o):h/(2-s-o),s){case r:l=(n-a)/h+(n<a?6:0);break;case n:l=(a-r)/h+2;break;case a:l=(r-n)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=Ve.workingColorSpace){return Ve.fromWorkingColorSpace(yt.copy(this),t),e.r=yt.r,e.g=yt.g,e.b=yt.b,e}getStyle(e=Ht){Ve.fromWorkingColorSpace(yt.copy(this),e);const t=yt.r,r=yt.g,n=yt.b;return e!==Ht?`color(${e} ${t.toFixed(3)} ${r.toFixed(3)} ${n.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(r*255)},${Math.round(n*255)})`}offsetHSL(e,t,r){return this.getHSL(Ni),this.setHSL(Ni.h+e,Ni.s+t,Ni.l+r)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,r){return this.r=e.r+(t.r-e.r)*r,this.g=e.g+(t.g-e.g)*r,this.b=e.b+(t.b-e.b)*r,this}lerpHSL(e,t){this.getHSL(Ni),e.getHSL(la);const r=ao(Ni.h,la.h,t),n=ao(Ni.s,la.s,t),a=ao(Ni.l,la.l,t);return this.setHSL(r,n,a),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,r=this.g,n=this.b,a=e.elements;return this.r=a[0]*t+a[3]*r+a[6]*n,this.g=a[1]*t+a[4]*r+a[7]*n,this.b=a[2]*t+a[5]*r+a[8]*n,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const yt=new Xe;Xe.NAMES=Qc;let Dg=0;class hn extends Pr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Dg++}),this.uuid=nn(),this.name="",this.type="Material",this.blending=Sr,this.side=wi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ds,this.blendDst=ps,this.blendEquation=Ji,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Xe(0,0,0),this.blendAlpha=0,this.depthFunc=Mr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Uc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Cr,this.stencilZFail=Cr,this.stencilZPass=Cr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const r=e[t];if(r===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const n=this[t];if(n===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}n&&n.isColor?n.set(r):n&&n.isVector3&&r&&r.isVector3?n.copy(r):this[t]=r}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const r={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.color&&this.color.isColor&&(r.color=this.color.getHex()),this.roughness!==void 0&&(r.roughness=this.roughness),this.metalness!==void 0&&(r.metalness=this.metalness),this.sheen!==void 0&&(r.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(r.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(r.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(r.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(r.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(r.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(r.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(r.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(r.shininess=this.shininess),this.clearcoat!==void 0&&(r.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(r.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(r.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(r.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(r.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,r.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(r.dispersion=this.dispersion),this.iridescence!==void 0&&(r.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(r.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(r.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(r.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(r.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(r.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(r.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(r.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(r.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(r.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(r.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(r.lightMap=this.lightMap.toJSON(e).uuid,r.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(r.aoMap=this.aoMap.toJSON(e).uuid,r.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(r.bumpMap=this.bumpMap.toJSON(e).uuid,r.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(r.normalMap=this.normalMap.toJSON(e).uuid,r.normalMapType=this.normalMapType,r.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(r.displacementMap=this.displacementMap.toJSON(e).uuid,r.displacementScale=this.displacementScale,r.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(r.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(r.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(r.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(r.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(r.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(r.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(r.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(r.combine=this.combine)),this.envMapRotation!==void 0&&(r.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(r.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(r.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(r.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(r.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(r.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(r.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(r.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(r.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(r.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(r.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(r.size=this.size),this.shadowSide!==null&&(r.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(r.sizeAttenuation=this.sizeAttenuation),this.blending!==Sr&&(r.blending=this.blending),this.side!==wi&&(r.side=this.side),this.vertexColors===!0&&(r.vertexColors=!0),this.opacity<1&&(r.opacity=this.opacity),this.transparent===!0&&(r.transparent=!0),this.blendSrc!==ds&&(r.blendSrc=this.blendSrc),this.blendDst!==ps&&(r.blendDst=this.blendDst),this.blendEquation!==Ji&&(r.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(r.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(r.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(r.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(r.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(r.blendAlpha=this.blendAlpha),this.depthFunc!==Mr&&(r.depthFunc=this.depthFunc),this.depthTest===!1&&(r.depthTest=this.depthTest),this.depthWrite===!1&&(r.depthWrite=this.depthWrite),this.colorWrite===!1&&(r.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(r.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Uc&&(r.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(r.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(r.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Cr&&(r.stencilFail=this.stencilFail),this.stencilZFail!==Cr&&(r.stencilZFail=this.stencilZFail),this.stencilZPass!==Cr&&(r.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(r.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(r.rotation=this.rotation),this.polygonOffset===!0&&(r.polygonOffset=!0),this.polygonOffsetFactor!==0&&(r.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(r.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(r.linewidth=this.linewidth),this.dashSize!==void 0&&(r.dashSize=this.dashSize),this.gapSize!==void 0&&(r.gapSize=this.gapSize),this.scale!==void 0&&(r.scale=this.scale),this.dithering===!0&&(r.dithering=!0),this.alphaTest>0&&(r.alphaTest=this.alphaTest),this.alphaHash===!0&&(r.alphaHash=!0),this.alphaToCoverage===!0&&(r.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(r.premultipliedAlpha=!0),this.forceSinglePass===!0&&(r.forceSinglePass=!0),this.wireframe===!0&&(r.wireframe=!0),this.wireframeLinewidth>1&&(r.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(r.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(r.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(r.flatShading=!0),this.visible===!1&&(r.visible=!1),this.toneMapped===!1&&(r.toneMapped=!1),this.fog===!1&&(r.fog=!1),Object.keys(this.userData).length>0&&(r.userData=this.userData);function n(a){const s=[];for(const o in a){const l=a[o];delete l.metadata,s.push(l)}return s}if(t){const a=n(e.textures),s=n(e.images);a.length>0&&(r.textures=a),s.length>0&&(r.images=s)}return r}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let r=null;if(t!==null){const n=t.length;r=new Array(n);for(let a=0;a!==n;++a)r[a]=t[a].clone()}return this.clippingPlanes=r,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class eu extends hn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Xe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Si,this.combine=yc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const ut=new F,ca=new Qe;class Ut{constructor(e,t,r=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=r,this.usage=Ic,this.updateRanges=[],this.gpuType=ti,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,r){e*=this.itemSize,r*=t.itemSize;for(let n=0,a=this.itemSize;n<a;n++)this.array[e+n]=t.array[r+n];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,r=this.count;t<r;t++)ca.fromBufferAttribute(this,t),ca.applyMatrix3(e),this.setXY(t,ca.x,ca.y);else if(this.itemSize===3)for(let t=0,r=this.count;t<r;t++)ut.fromBufferAttribute(this,t),ut.applyMatrix3(e),this.setXYZ(t,ut.x,ut.y,ut.z);return this}applyMatrix4(e){for(let t=0,r=this.count;t<r;t++)ut.fromBufferAttribute(this,t),ut.applyMatrix4(e),this.setXYZ(t,ut.x,ut.y,ut.z);return this}applyNormalMatrix(e){for(let t=0,r=this.count;t<r;t++)ut.fromBufferAttribute(this,t),ut.applyNormalMatrix(e),this.setXYZ(t,ut.x,ut.y,ut.z);return this}transformDirection(e){for(let t=0,r=this.count;t<r;t++)ut.fromBufferAttribute(this,t),ut.transformDirection(e),this.setXYZ(t,ut.x,ut.y,ut.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let r=this.array[e*this.itemSize+t];return this.normalized&&(r=an(r,this.array)),r}setComponent(e,t,r){return this.normalized&&(r=At(r,this.array)),this.array[e*this.itemSize+t]=r,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=an(t,this.array)),t}setX(e,t){return this.normalized&&(t=At(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=an(t,this.array)),t}setY(e,t){return this.normalized&&(t=At(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=an(t,this.array)),t}setZ(e,t){return this.normalized&&(t=At(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=an(t,this.array)),t}setW(e,t){return this.normalized&&(t=At(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,r){return e*=this.itemSize,this.normalized&&(t=At(t,this.array),r=At(r,this.array)),this.array[e+0]=t,this.array[e+1]=r,this}setXYZ(e,t,r,n){return e*=this.itemSize,this.normalized&&(t=At(t,this.array),r=At(r,this.array),n=At(n,this.array)),this.array[e+0]=t,this.array[e+1]=r,this.array[e+2]=n,this}setXYZW(e,t,r,n,a){return e*=this.itemSize,this.normalized&&(t=At(t,this.array),r=At(r,this.array),n=At(n,this.array),a=At(a,this.array)),this.array[e+0]=t,this.array[e+1]=r,this.array[e+2]=n,this.array[e+3]=a,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Ic&&(e.usage=this.usage),e}}class tu extends Ut{constructor(e,t,r){super(new Uint16Array(e),t,r)}}class iu extends Ut{constructor(e,t,r){super(new Uint32Array(e),t,r)}}class ar extends Ut{constructor(e,t,r){super(new Float32Array(e),t,r)}}let Ig=0;const Gt=new ct,To=new Rt,Gr=new F,Dt=new on,dn=new on,ft=new F;class Mi extends Pr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Ig++}),this.uuid=nn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Oc(e)?iu:tu)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,r=0){this.groups.push({start:e,count:t,materialIndex:r})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const r=this.attributes.normal;if(r!==void 0){const a=new Ae().getNormalMatrix(e);r.applyNormalMatrix(a),r.needsUpdate=!0}const n=this.attributes.tangent;return n!==void 0&&(n.transformDirection(e),n.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Gt.makeRotationFromQuaternion(e),this.applyMatrix4(Gt),this}rotateX(e){return Gt.makeRotationX(e),this.applyMatrix4(Gt),this}rotateY(e){return Gt.makeRotationY(e),this.applyMatrix4(Gt),this}rotateZ(e){return Gt.makeRotationZ(e),this.applyMatrix4(Gt),this}translate(e,t,r){return Gt.makeTranslation(e,t,r),this.applyMatrix4(Gt),this}scale(e,t,r){return Gt.makeScale(e,t,r),this.applyMatrix4(Gt),this}lookAt(e){return To.lookAt(e),To.updateMatrix(),this.applyMatrix4(To.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Gr).negate(),this.translate(Gr.x,Gr.y,Gr.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const r=[];for(let n=0,a=e.length;n<a;n++){const s=e[n];r.push(s.x,s.y,s.z||0)}this.setAttribute("position",new ar(r,3))}else{const r=Math.min(e.length,t.count);for(let n=0;n<r;n++){const a=e[n];t.setXYZ(n,a.x,a.y,a.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new on);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new F(-1/0,-1/0,-1/0),new F(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let r=0,n=t.length;r<n;r++){const a=t[r];Dt.setFromBufferAttribute(a),this.morphTargetsRelative?(ft.addVectors(this.boundingBox.min,Dt.min),this.boundingBox.expandByPoint(ft),ft.addVectors(this.boundingBox.max,Dt.max),this.boundingBox.expandByPoint(ft)):(this.boundingBox.expandByPoint(Dt.min),this.boundingBox.expandByPoint(Dt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ra);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new F,1/0);return}if(e){const r=this.boundingSphere.center;if(Dt.setFromBufferAttribute(e),t)for(let a=0,s=t.length;a<s;a++){const o=t[a];dn.setFromBufferAttribute(o),this.morphTargetsRelative?(ft.addVectors(Dt.min,dn.min),Dt.expandByPoint(ft),ft.addVectors(Dt.max,dn.max),Dt.expandByPoint(ft)):(Dt.expandByPoint(dn.min),Dt.expandByPoint(dn.max))}Dt.getCenter(r);let n=0;for(let a=0,s=e.count;a<s;a++)ft.fromBufferAttribute(e,a),n=Math.max(n,r.distanceToSquared(ft));if(t)for(let a=0,s=t.length;a<s;a++){const o=t[a],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)ft.fromBufferAttribute(o,c),l&&(Gr.fromBufferAttribute(e,c),ft.add(Gr)),n=Math.max(n,r.distanceToSquared(ft))}this.boundingSphere.radius=Math.sqrt(n),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const r=t.position,n=t.normal,a=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ut(new Float32Array(4*r.count),4));const s=this.getAttribute("tangent"),o=[],l=[];for(let I=0;I<r.count;I++)o[I]=new F,l[I]=new F;const c=new F,u=new F,h=new F,d=new Qe,f=new Qe,v=new Qe,x=new F,m=new F;function p(I,S,y){c.fromBufferAttribute(r,I),u.fromBufferAttribute(r,S),h.fromBufferAttribute(r,y),d.fromBufferAttribute(a,I),f.fromBufferAttribute(a,S),v.fromBufferAttribute(a,y),u.sub(c),h.sub(c),f.sub(d),v.sub(d);const C=1/(f.x*v.y-v.x*f.y);isFinite(C)&&(x.copy(u).multiplyScalar(v.y).addScaledVector(h,-f.y).multiplyScalar(C),m.copy(h).multiplyScalar(f.x).addScaledVector(u,-v.x).multiplyScalar(C),o[I].add(x),o[S].add(x),o[y].add(x),l[I].add(m),l[S].add(m),l[y].add(m))}let w=this.groups;w.length===0&&(w=[{start:0,count:e.count}]);for(let I=0,S=w.length;I<S;++I){const y=w[I],C=y.start,G=y.count;for(let k=C,W=C+G;k<W;k+=3)p(e.getX(k+0),e.getX(k+1),e.getX(k+2))}const T=new F,E=new F,D=new F,U=new F;function A(I){D.fromBufferAttribute(n,I),U.copy(D);const S=o[I];T.copy(S),T.sub(D.multiplyScalar(D.dot(S))).normalize(),E.crossVectors(U,S);const y=E.dot(l[I])<0?-1:1;s.setXYZW(I,T.x,T.y,T.z,y)}for(let I=0,S=w.length;I<S;++I){const y=w[I],C=y.start,G=y.count;for(let k=C,W=C+G;k<W;k+=3)A(e.getX(k+0)),A(e.getX(k+1)),A(e.getX(k+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let r=this.getAttribute("normal");if(r===void 0)r=new Ut(new Float32Array(t.count*3),3),this.setAttribute("normal",r);else for(let d=0,f=r.count;d<f;d++)r.setXYZ(d,0,0,0);const n=new F,a=new F,s=new F,o=new F,l=new F,c=new F,u=new F,h=new F;if(e)for(let d=0,f=e.count;d<f;d+=3){const v=e.getX(d+0),x=e.getX(d+1),m=e.getX(d+2);n.fromBufferAttribute(t,v),a.fromBufferAttribute(t,x),s.fromBufferAttribute(t,m),u.subVectors(s,a),h.subVectors(n,a),u.cross(h),o.fromBufferAttribute(r,v),l.fromBufferAttribute(r,x),c.fromBufferAttribute(r,m),o.add(u),l.add(u),c.add(u),r.setXYZ(v,o.x,o.y,o.z),r.setXYZ(x,l.x,l.y,l.z),r.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)n.fromBufferAttribute(t,d+0),a.fromBufferAttribute(t,d+1),s.fromBufferAttribute(t,d+2),u.subVectors(s,a),h.subVectors(n,a),u.cross(h),r.setXYZ(d+0,u.x,u.y,u.z),r.setXYZ(d+1,u.x,u.y,u.z),r.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),r.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,r=e.count;t<r;t++)ft.fromBufferAttribute(e,t),ft.normalize(),e.setXYZ(t,ft.x,ft.y,ft.z)}toNonIndexed(){function e(o,l){const c=o.array,u=o.itemSize,h=o.normalized,d=new c.constructor(l.length*u);let f=0,v=0;for(let x=0,m=l.length;x<m;x++){o.isInterleavedBufferAttribute?f=l[x]*o.data.stride+o.offset:f=l[x]*u;for(let p=0;p<u;p++)d[v++]=c[f++]}return new Ut(d,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Mi,r=this.index.array,n=this.attributes;for(const o in n){const l=n[o],c=e(l,r);t.setAttribute(o,c)}const a=this.morphAttributes;for(const o in a){const l=[],c=a[o];for(let u=0,h=c.length;u<h;u++){const d=c[u],f=e(d,r);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const s=this.groups;for(let o=0,l=s.length;o<l;o++){const c=s[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const r=this.attributes;for(const l in r){const c=r[l];e.data.attributes[l]=c.toJSON(e.data)}const n={};let a=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,d=c.length;h<d;h++){const f=c[h];u.push(f.toJSON(e.data))}u.length>0&&(n[l]=u,a=!0)}a&&(e.data.morphAttributes=n,e.data.morphTargetsRelative=this.morphTargetsRelative);const s=this.groups;s.length>0&&(e.data.groups=JSON.parse(JSON.stringify(s)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const r=e.index;r!==null&&this.setIndex(r.clone(t));const n=e.attributes;for(const c in n){const u=n[c];this.setAttribute(c,u.clone(t))}const a=e.morphAttributes;for(const c in a){const u=[],h=a[c];for(let d=0,f=h.length;d<f;d++)u.push(h[d].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const s=e.groups;for(let c=0,u=s.length;c<u;c++){const h=s[c];this.addGroup(h.start,h.count,h.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const ru=new ct,sr=new Vc,ua=new ra,nu=new F,ha=new F,da=new F,pa=new F,bo=new F,fa=new F,au=new F,ma=new F;class ii extends Rt{constructor(e=new Mi,t=new eu){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){const r=e[t[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let n=0,a=r.length;n<a;n++){const s=r[n].name||String(n);this.morphTargetInfluences.push(0),this.morphTargetDictionary[s]=n}}}}getVertexPosition(e,t){const r=this.geometry,n=r.attributes.position,a=r.morphAttributes.position,s=r.morphTargetsRelative;t.fromBufferAttribute(n,e);const o=this.morphTargetInfluences;if(a&&o){fa.set(0,0,0);for(let l=0,c=a.length;l<c;l++){const u=o[l],h=a[l];u!==0&&(bo.fromBufferAttribute(h,e),s?fa.addScaledVector(bo,u):fa.addScaledVector(bo.sub(t),u))}t.add(fa)}return t}raycast(e,t){const r=this.geometry,n=this.material,a=this.matrixWorld;n!==void 0&&(r.boundingSphere===null&&r.computeBoundingSphere(),ua.copy(r.boundingSphere),ua.applyMatrix4(a),sr.copy(e.ray).recast(e.near),!(ua.containsPoint(sr.origin)===!1&&(sr.intersectSphere(ua,nu)===null||sr.origin.distanceToSquared(nu)>(e.far-e.near)**2))&&(ru.copy(a).invert(),sr.copy(e.ray).applyMatrix4(ru),!(r.boundingBox!==null&&sr.intersectsBox(r.boundingBox)===!1)&&this._computeIntersections(e,t,sr)))}_computeIntersections(e,t,r){let n;const a=this.geometry,s=this.material,o=a.index,l=a.attributes.position,c=a.attributes.uv,u=a.attributes.uv1,h=a.attributes.normal,d=a.groups,f=a.drawRange;if(o!==null)if(Array.isArray(s))for(let v=0,x=d.length;v<x;v++){const m=d[v],p=s[m.materialIndex],w=Math.max(m.start,f.start),T=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let E=w,D=T;E<D;E+=3){const U=o.getX(E),A=o.getX(E+1),I=o.getX(E+2);n=ga(this,p,e,r,c,u,h,U,A,I),n&&(n.faceIndex=Math.floor(E/3),n.face.materialIndex=m.materialIndex,t.push(n))}}else{const v=Math.max(0,f.start),x=Math.min(o.count,f.start+f.count);for(let m=v,p=x;m<p;m+=3){const w=o.getX(m),T=o.getX(m+1),E=o.getX(m+2);n=ga(this,s,e,r,c,u,h,w,T,E),n&&(n.faceIndex=Math.floor(m/3),t.push(n))}}else if(l!==void 0)if(Array.isArray(s))for(let v=0,x=d.length;v<x;v++){const m=d[v],p=s[m.materialIndex],w=Math.max(m.start,f.start),T=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let E=w,D=T;E<D;E+=3){const U=E,A=E+1,I=E+2;n=ga(this,p,e,r,c,u,h,U,A,I),n&&(n.faceIndex=Math.floor(E/3),n.face.materialIndex=m.materialIndex,t.push(n))}}else{const v=Math.max(0,f.start),x=Math.min(l.count,f.start+f.count);for(let m=v,p=x;m<p;m+=3){const w=m,T=m+1,E=m+2;n=ga(this,s,e,r,c,u,h,w,T,E),n&&(n.faceIndex=Math.floor(m/3),t.push(n))}}}}function Ng(i,e,t,r,n,a,s,o){let l;if(e.side===bt?l=r.intersectTriangle(s,a,n,!0,o):l=r.intersectTriangle(n,a,s,e.side===wi,o),l===null)return null;ma.copy(o),ma.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(ma);return c<t.near||c>t.far?null:{distance:c,point:ma.clone(),object:i}}function ga(i,e,t,r,n,a,s,o,l,c){i.getVertexPosition(o,ha),i.getVertexPosition(l,da),i.getVertexPosition(c,pa);const u=Ng(i,e,t,r,ha,da,pa,au);if(u){const h=new F;Jt.getBarycoord(au,ha,da,pa,h),n&&(u.uv=Jt.getInterpolatedAttribute(n,o,l,c,h,new Qe)),a&&(u.uv1=Jt.getInterpolatedAttribute(a,o,l,c,h,new Qe)),s&&(u.normal=Jt.getInterpolatedAttribute(s,o,l,c,h,new F),u.normal.dot(r.direction)>0&&u.normal.multiplyScalar(-1));const d={a:o,b:l,c,normal:new F,materialIndex:0};Jt.getNormal(ha,da,pa,d.normal),u.face=d,u.barycoord=h}return u}class xn extends Mi{constructor(e=1,t=1,r=1,n=1,a=1,s=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:r,widthSegments:n,heightSegments:a,depthSegments:s};const o=this;n=Math.floor(n),a=Math.floor(a),s=Math.floor(s);const l=[],c=[],u=[],h=[];let d=0,f=0;v("z","y","x",-1,-1,r,t,e,s,a,0),v("z","y","x",1,-1,r,t,-e,s,a,1),v("x","z","y",1,1,e,r,t,n,s,2),v("x","z","y",1,-1,e,r,-t,n,s,3),v("x","y","z",1,-1,e,t,r,n,a,4),v("x","y","z",-1,-1,e,t,-r,n,a,5),this.setIndex(l),this.setAttribute("position",new ar(c,3)),this.setAttribute("normal",new ar(u,3)),this.setAttribute("uv",new ar(h,2));function v(x,m,p,w,T,E,D,U,A,I,S){const y=E/A,C=D/I,G=E/2,k=D/2,W=U/2,Z=A+1,V=I+1;let J=0,H=0;const te=new F;for(let pe=0;pe<V;pe++){const Re=pe*C-k;for(let Ue=0;Ue<Z;Ue++){const Ke=Ue*y-G;te[x]=Ke*w,te[m]=Re*T,te[p]=W,c.push(te.x,te.y,te.z),te[x]=0,te[m]=0,te[p]=U>0?1:-1,u.push(te.x,te.y,te.z),h.push(Ue/A),h.push(1-pe/I),J+=1}}for(let pe=0;pe<I;pe++)for(let Re=0;Re<A;Re++){const Ue=d+Re+Z*pe,Ke=d+Re+Z*(pe+1),X=d+(Re+1)+Z*(pe+1),ee=d+(Re+1)+Z*pe;l.push(Ue,Ke,ee),l.push(Ke,X,ee),H+=6}o.addGroup(f,H,S),f+=H,d+=J}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new xn(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Vr(i){const e={};for(const t in i){e[t]={};for(const r in i[t]){const n=i[t][r];n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)?n.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][r]=null):e[t][r]=n.clone():Array.isArray(n)?e[t][r]=n.slice():e[t][r]=n}}return e}function Tt(i){const e={};for(let t=0;t<i.length;t++){const r=Vr(i[t]);for(const n in r)e[n]=r[n]}return e}function Og(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function su(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ve.workingColorSpace}const Fg={clone:Vr,merge:Tt};var zg=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Bg=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ri extends hn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=zg,this.fragmentShader=Bg,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Vr(e.uniforms),this.uniformsGroups=Og(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const n in this.uniforms){const a=this.uniforms[n].value;a&&a.isTexture?t.uniforms[n]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[n]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[n]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[n]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[n]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[n]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[n]={type:"m4",value:a.toArray()}:t.uniforms[n]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const r={};for(const n in this.extensions)this.extensions[n]===!0&&(r[n]=!0);return Object.keys(r).length>0&&(t.extensions=r),t}}class wo extends Rt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ct,this.projectionMatrix=new ct,this.projectionMatrixInverse=new ct,this.coordinateSystem=pi}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Oi=new F,ou=new Qe,lu=new Qe;class Vt extends wo{constructor(e=50,t=1,r=.1,n=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=r,this.far=n,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=no*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(ro*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return no*2*Math.atan(Math.tan(ro*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,r){Oi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Oi.x,Oi.y).multiplyScalar(-e/Oi.z),Oi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),r.set(Oi.x,Oi.y).multiplyScalar(-e/Oi.z)}getViewSize(e,t){return this.getViewBounds(e,ou,lu),t.subVectors(lu,ou)}setViewOffset(e,t,r,n,a,s){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=r,this.view.offsetY=n,this.view.width=a,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(ro*.5*this.fov)/this.zoom,r=2*t,n=this.aspect*r,a=-.5*n;const s=this.view;if(this.view!==null&&this.view.enabled){const l=s.fullWidth,c=s.fullHeight;a+=s.offsetX*n/l,t-=s.offsetY*r/c,n*=s.width/l,r*=s.height/c}const o=this.filmOffset;o!==0&&(a+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(a,a+n,t,t-r,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Wr=-90,Xr=1;class kg extends Rt{constructor(e,t,r){super(),this.type="CubeCamera",this.renderTarget=r,this.coordinateSystem=null,this.activeMipmapLevel=0;const n=new Vt(Wr,Xr,e,t);n.layers=this.layers,this.add(n);const a=new Vt(Wr,Xr,e,t);a.layers=this.layers,this.add(a);const s=new Vt(Wr,Xr,e,t);s.layers=this.layers,this.add(s);const o=new Vt(Wr,Xr,e,t);o.layers=this.layers,this.add(o);const l=new Vt(Wr,Xr,e,t);l.layers=this.layers,this.add(l);const c=new Vt(Wr,Xr,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[r,n,a,s,o,l]=t;for(const c of t)this.remove(c);if(e===pi)r.up.set(0,1,0),r.lookAt(1,0,0),n.up.set(0,1,0),n.lookAt(-1,0,0),a.up.set(0,0,-1),a.lookAt(0,1,0),s.up.set(0,0,1),s.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Jn)r.up.set(0,-1,0),r.lookAt(-1,0,0),n.up.set(0,-1,0),n.lookAt(1,0,0),a.up.set(0,0,1),a.lookAt(0,1,0),s.up.set(0,0,-1),s.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:r,activeMipmapLevel:n}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[a,s,o,l,c,u]=this.children,h=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),v=e.xr.enabled;e.xr.enabled=!1;const x=r.texture.generateMipmaps;r.texture.generateMipmaps=!1,e.setRenderTarget(r,0,n),e.render(t,a),e.setRenderTarget(r,1,n),e.render(t,s),e.setRenderTarget(r,2,n),e.render(t,o),e.setRenderTarget(r,3,n),e.render(t,l),e.setRenderTarget(r,4,n),e.render(t,c),r.texture.generateMipmaps=x,e.setRenderTarget(r,5,n),e.render(t,u),e.setRenderTarget(h,d,f),e.xr.enabled=v,r.texture.needsPMREMUpdate=!0}}class cu extends _t{constructor(e,t,r,n,a,s,o,l,c,u){e=e!==void 0?e:[],t=t!==void 0?t:Er,super(e,t,r,n,a,s,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Hg extends Pi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const r={width:e,height:e,depth:1},n=[r,r,r,r,r,r];this.texture=new cu(n,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Bt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const r={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},n=new xn(5,5,5),a=new ri({name:"CubemapFromEquirect",uniforms:Vr(r.uniforms),vertexShader:r.vertexShader,fragmentShader:r.fragmentShader,side:bt,blending:Ai});a.uniforms.tEquirect.value=t;const s=new ii(n,a),o=t.minFilter;return t.minFilter===tr&&(t.minFilter=Bt),new kg(1,10,this).update(e,s),t.minFilter=o,s.geometry.dispose(),s.material.dispose(),this}clear(e,t,r,n){const a=e.getRenderTarget();for(let s=0;s<6;s++)e.setRenderTarget(this,s),e.clear(t,r,n);e.setRenderTarget(a)}}class Gg extends Rt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Si,this.environmentIntensity=1,this.environmentRotation=new Si,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Ao=new F,Vg=new F,Wg=new Ae;class or{constructor(e=new F(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,r,n){return this.normal.set(e,t,r),this.constant=n,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,r){const n=Ao.subVectors(r,t).cross(Vg.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(n,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const r=e.delta(Ao),n=this.normal.dot(r);if(n===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/n;return a<0||a>1?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),r=this.distanceToPoint(e.end);return t<0&&r>0||r<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const r=t||Wg.getNormalMatrix(e),n=this.coplanarPoint(Ao).applyMatrix4(e),a=this.normal.applyMatrix3(r).normalize();return this.constant=-n.dot(a),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const lr=new ra,_a=new F;class uu{constructor(e=new or,t=new or,r=new or,n=new or,a=new or,s=new or){this.planes=[e,t,r,n,a,s]}set(e,t,r,n,a,s){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(r),o[3].copy(n),o[4].copy(a),o[5].copy(s),this}copy(e){const t=this.planes;for(let r=0;r<6;r++)t[r].copy(e.planes[r]);return this}setFromProjectionMatrix(e,t=pi){const r=this.planes,n=e.elements,a=n[0],s=n[1],o=n[2],l=n[3],c=n[4],u=n[5],h=n[6],d=n[7],f=n[8],v=n[9],x=n[10],m=n[11],p=n[12],w=n[13],T=n[14],E=n[15];if(r[0].setComponents(l-a,d-c,m-f,E-p).normalize(),r[1].setComponents(l+a,d+c,m+f,E+p).normalize(),r[2].setComponents(l+s,d+u,m+v,E+w).normalize(),r[3].setComponents(l-s,d-u,m-v,E-w).normalize(),r[4].setComponents(l-o,d-h,m-x,E-T).normalize(),t===pi)r[5].setComponents(l+o,d+h,m+x,E+T).normalize();else if(t===Jn)r[5].setComponents(o,h,x,T).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),lr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),lr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(lr)}intersectsSprite(e){return lr.center.set(0,0,0),lr.radius=.7071067811865476,lr.applyMatrix4(e.matrixWorld),this.intersectsSphere(lr)}intersectsSphere(e){const t=this.planes,r=e.center,n=-e.radius;for(let a=0;a<6;a++)if(t[a].distanceToPoint(r)<n)return!1;return!0}intersectsBox(e){const t=this.planes;for(let r=0;r<6;r++){const n=t[r];if(_a.x=n.normal.x>0?e.max.x:e.min.x,_a.y=n.normal.y>0?e.max.y:e.min.y,_a.z=n.normal.z>0?e.max.z:e.min.z,n.distanceToPoint(_a)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let r=0;r<6;r++)if(t[r].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Xg extends hn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Xe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const hu=new ct,Ro=new Vc,va=new ra,xa=new F;class jg extends Rt{constructor(e=new Mi,t=new Xg){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const r=this.geometry,n=this.matrixWorld,a=e.params.Points.threshold,s=r.drawRange;if(r.boundingSphere===null&&r.computeBoundingSphere(),va.copy(r.boundingSphere),va.applyMatrix4(n),va.radius+=a,e.ray.intersectsSphere(va)===!1)return;hu.copy(n).invert(),Ro.copy(e.ray).applyMatrix4(hu);const o=a/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=r.index,u=r.attributes.position;if(c!==null){const h=Math.max(0,s.start),d=Math.min(c.count,s.start+s.count);for(let f=h,v=d;f<v;f++){const x=c.getX(f);xa.fromBufferAttribute(u,x),du(xa,x,l,n,e,t,this)}}else{const h=Math.max(0,s.start),d=Math.min(u.count,s.start+s.count);for(let f=h,v=d;f<v;f++)xa.fromBufferAttribute(u,f),du(xa,f,l,n,e,t,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){const r=e[t[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let n=0,a=r.length;n<a;n++){const s=r[n].name||String(n);this.morphTargetInfluences.push(0),this.morphTargetDictionary[s]=n}}}}}function du(i,e,t,r,n,a,s){const o=Ro.distanceSqToPoint(i);if(o<t){const l=new F;Ro.closestPointToPoint(i,l),l.applyMatrix4(r);const c=n.ray.origin.distanceTo(l);if(c<n.near||c>n.far)return;a.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:s})}}class ya extends Rt{constructor(){super(),this.isGroup=!0,this.type="Group"}}class pu extends _t{constructor(e,t,r,n,a,s,o,l,c,u=wr){if(u!==wr&&u!==Ar)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");r===void 0&&u===wr&&(r=ir),r===void 0&&u===Ar&&(r=br),super(null,n,a,s,o,l,u,r,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:wt,this.minFilter=l!==void 0?l:wt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class yn extends Mi{constructor(e=1,t=1,r=1,n=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:r,heightSegments:n};const a=e/2,s=t/2,o=Math.floor(r),l=Math.floor(n),c=o+1,u=l+1,h=e/o,d=t/l,f=[],v=[],x=[],m=[];for(let p=0;p<u;p++){const w=p*d-s;for(let T=0;T<c;T++){const E=T*h-a;v.push(E,-w,0),x.push(0,0,1),m.push(T/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let w=0;w<o;w++){const T=w+c*p,E=w+c*(p+1),D=w+1+c*(p+1),U=w+1+c*p;f.push(T,E,U),f.push(E,D,U)}this.setIndex(f),this.setAttribute("position",new ar(v,3)),this.setAttribute("normal",new ar(x,3)),this.setAttribute("uv",new ar(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new yn(e.width,e.height,e.widthSegments,e.heightSegments)}}class qg extends ri{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Yg extends hn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=ng,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class $g extends hn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Kg extends wo{constructor(e=-1,t=1,r=1,n=-1,a=.1,s=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=r,this.bottom=n,this.near=a,this.far=s,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,r,n,a,s){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=r,this.view.offsetY=n,this.view.width=a,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),r=(this.right+this.left)/2,n=(this.top+this.bottom)/2;let a=r-e,s=r+e,o=n+t,l=n-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a+=c*this.view.offsetX,s=a+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(a,s,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Zg extends Vt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class St{constructor(e){this.value=e}clone(){return new St(this.value.clone===void 0?this.value:this.value.clone())}}function fu(i,e,t,r){const n=Jg(r);switch(t){case bc:return i*e;case Ac:return i*e;case Rc:return i*e*2;case Cc:return i*e/n.components*n.byteLength;case Rs:return i*e/n.components*n.byteLength;case Pc:return i*e*2/n.components*n.byteLength;case Cs:return i*e*2/n.components*n.byteLength;case wc:return i*e*3/n.components*n.byteLength;case kt:return i*e*4/n.components*n.byteLength;case Ps:return i*e*4/n.components*n.byteLength;case Xn:case jn:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case qn:case Yn:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Us:case Is:return Math.max(i,16)*Math.max(e,8)/4;case Ls:case Ds:return Math.max(i,8)*Math.max(e,8)/2;case Ns:case Os:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Fs:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case zs:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Bs:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case ks:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Hs:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Gs:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Vs:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Ws:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Xs:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case js:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case qs:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Ys:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case $s:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Ks:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Zs:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case $n:case Js:case Qs:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Lc:case eo:return Math.ceil(i/4)*Math.ceil(e/4)*8;case to:case io:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Jg(i){switch(i){case di:case Mc:return{byteLength:1,components:1};case tn:case Ec:case rn:return{byteLength:2,components:1};case ws:case As:return{byteLength:2,components:4};case ir:case bs:case ti:return{byteLength:4,components:1};case Tc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:hs}})),typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=hs);/**
* @license
* Copyright 2010-2024 Three.js Authors
* SPDX-License-Identifier: MIT
*/function mu(){let i=null,e=!1,t=null,r=null;function n(a,s){t(a,s),r=i.requestAnimationFrame(n)}return{start:function(){e!==!0&&t!==null&&(r=i.requestAnimationFrame(n),e=!0)},stop:function(){i.cancelAnimationFrame(r),e=!1},setAnimationLoop:function(a){t=a},setContext:function(a){i=a}}}function Qg(i){const e=new WeakMap;function t(o,l){const c=o.array,u=o.usage,h=c.byteLength,d=i.createBuffer();i.bindBuffer(l,d),i.bufferData(l,c,u),o.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:h}}function r(o,l,c){const u=l.array,h=l.updateRanges;if(i.bindBuffer(c,o),h.length===0)i.bufferSubData(c,0,u);else{h.sort((f,v)=>f.start-v.start);let d=0;for(let f=1;f<h.length;f++){const v=h[d],x=h[f];x.start<=v.start+v.count+1?v.count=Math.max(v.count,x.start+x.count-v.start):(++d,h[d]=x)}h.length=d+1;for(let f=0,v=h.length;f<v;f++){const x=h[f];i.bufferSubData(c,x.start*u.BYTES_PER_ELEMENT,u,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function n(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function a(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function s(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(c.buffer,o,l),c.version=o.version}}return{get:n,remove:a,update:s}}var e_=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,t_=`#ifdef USE_ALPHAHASH
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
#endif`,i_=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,r_=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,n_=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,a_=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,s_=`#ifdef USE_AOMAP
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
#endif`,o_=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,l_=`#ifdef USE_BATCHING
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
#endif`,c_=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,u_=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,h_=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,d_=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,p_=`#ifdef USE_IRIDESCENCE
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
#endif`,f_=`#ifdef USE_BUMPMAP
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
#endif`,m_=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,g_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,__=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,v_=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,x_=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,y_=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,S_=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,M_=`#if defined( USE_COLOR_ALPHA )
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
#endif`,E_=`#define PI 3.141592653589793
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
} // validated`,T_=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,b_=`vec3 transformedNormal = objectNormal;
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
#endif`,w_=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,A_=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,R_=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,C_=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,P_="gl_FragColor = linearToOutputTexel( gl_FragColor );",L_=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,U_=`#ifdef USE_ENVMAP
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
#endif`,D_=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,I_=`#ifdef USE_ENVMAP
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
#endif`,N_=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,O_=`#ifdef USE_ENVMAP
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
#endif`,F_=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,z_=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,B_=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,k_=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,H_=`#ifdef USE_GRADIENTMAP
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
}`,G_=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,V_=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,W_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,X_=`uniform bool receiveShadow;
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
#endif`,j_=`#ifdef USE_ENVMAP
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
#endif`,q_=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Y_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,$_=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,K_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Z_=`PhysicalMaterial material;
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
#endif`,J_=`struct PhysicalMaterial {
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
}`,Q_=`
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
#endif`,ev=`#if defined( RE_IndirectDiffuse )
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
#endif`,tv=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,iv=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,rv=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,nv=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,av=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,sv=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,ov=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,lv=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,cv=`#if defined( USE_POINTS_UV )
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
#endif`,uv=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,hv=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,dv=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,pv=`#if defined( USE_MORPHCOLORS )
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
#endif`,mv=`#ifdef USE_MORPHTARGETS
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
#endif`,gv=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,_v=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,vv=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,xv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,yv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Sv=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Mv=`#ifdef USE_NORMALMAP
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
#endif`,Ev=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Tv=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,bv=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,wv=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Av=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Rv=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Cv=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Pv=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Lv=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Uv=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Dv=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Iv=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Nv=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Ov=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Fv=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,zv=`float getShadowMask() {
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
}`,Bv=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,kv=`#ifdef USE_SKINNING
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
#endif`,Hv=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Gv=`#ifdef USE_SKINNING
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
#endif`,Vv=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Wv=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Xv=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,jv=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,qv=`#ifdef USE_TRANSMISSION
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
#endif`,Yv=`#ifdef USE_TRANSMISSION
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
#endif`,$v=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Kv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Zv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Jv=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Qv=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,e0=`uniform sampler2D t2D;
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
}`,t0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,i0=`#ifdef ENVMAP_TYPE_CUBE
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
}`,r0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,n0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,a0=`#include <common>
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
}`,s0=`#if DEPTH_PACKING == 3200
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
}`,o0=`#define DISTANCE
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
}`,l0=`#define DISTANCE
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
}`,c0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,u0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,h0=`uniform float scale;
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
}`,d0=`uniform vec3 diffuse;
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
}`,p0=`#include <common>
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
}`,f0=`uniform vec3 diffuse;
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
}`,m0=`#define LAMBERT
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
}`,g0=`#define LAMBERT
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
}`,_0=`#define MATCAP
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
}`,v0=`#define MATCAP
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
}`,x0=`#define NORMAL
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
}`,y0=`#define NORMAL
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
}`,S0=`#define PHONG
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
}`,M0=`#define PHONG
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
}`,E0=`#define STANDARD
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
}`,T0=`#define STANDARD
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
}`,b0=`#define TOON
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
}`,w0=`#define TOON
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
}`,A0=`uniform float size;
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
}`,R0=`uniform vec3 diffuse;
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
}`,C0=`#include <common>
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
}`,P0=`uniform vec3 color;
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
}`,L0=`uniform float rotation;
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
}`,U0=`uniform vec3 diffuse;
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
}`,Le={alphahash_fragment:e_,alphahash_pars_fragment:t_,alphamap_fragment:i_,alphamap_pars_fragment:r_,alphatest_fragment:n_,alphatest_pars_fragment:a_,aomap_fragment:s_,aomap_pars_fragment:o_,batching_pars_vertex:l_,batching_vertex:c_,begin_vertex:u_,beginnormal_vertex:h_,bsdfs:d_,iridescence_fragment:p_,bumpmap_pars_fragment:f_,clipping_planes_fragment:m_,clipping_planes_pars_fragment:g_,clipping_planes_pars_vertex:__,clipping_planes_vertex:v_,color_fragment:x_,color_pars_fragment:y_,color_pars_vertex:S_,color_vertex:M_,common:E_,cube_uv_reflection_fragment:T_,defaultnormal_vertex:b_,displacementmap_pars_vertex:w_,displacementmap_vertex:A_,emissivemap_fragment:R_,emissivemap_pars_fragment:C_,colorspace_fragment:P_,colorspace_pars_fragment:L_,envmap_fragment:U_,envmap_common_pars_fragment:D_,envmap_pars_fragment:I_,envmap_pars_vertex:N_,envmap_physical_pars_fragment:j_,envmap_vertex:O_,fog_vertex:F_,fog_pars_vertex:z_,fog_fragment:B_,fog_pars_fragment:k_,gradientmap_pars_fragment:H_,lightmap_pars_fragment:G_,lights_lambert_fragment:V_,lights_lambert_pars_fragment:W_,lights_pars_begin:X_,lights_toon_fragment:q_,lights_toon_pars_fragment:Y_,lights_phong_fragment:$_,lights_phong_pars_fragment:K_,lights_physical_fragment:Z_,lights_physical_pars_fragment:J_,lights_fragment_begin:Q_,lights_fragment_maps:ev,lights_fragment_end:tv,logdepthbuf_fragment:iv,logdepthbuf_pars_fragment:rv,logdepthbuf_pars_vertex:nv,logdepthbuf_vertex:av,map_fragment:sv,map_pars_fragment:ov,map_particle_fragment:lv,map_particle_pars_fragment:cv,metalnessmap_fragment:uv,metalnessmap_pars_fragment:hv,morphinstance_vertex:dv,morphcolor_vertex:pv,morphnormal_vertex:fv,morphtarget_pars_vertex:mv,morphtarget_vertex:gv,normal_fragment_begin:_v,normal_fragment_maps:vv,normal_pars_fragment:xv,normal_pars_vertex:yv,normal_vertex:Sv,normalmap_pars_fragment:Mv,clearcoat_normal_fragment_begin:Ev,clearcoat_normal_fragment_maps:Tv,clearcoat_pars_fragment:bv,iridescence_pars_fragment:wv,opaque_fragment:Av,packing:Rv,premultiplied_alpha_fragment:Cv,project_vertex:Pv,dithering_fragment:Lv,dithering_pars_fragment:Uv,roughnessmap_fragment:Dv,roughnessmap_pars_fragment:Iv,shadowmap_pars_fragment:Nv,shadowmap_pars_vertex:Ov,shadowmap_vertex:Fv,shadowmask_pars_fragment:zv,skinbase_vertex:Bv,skinning_pars_vertex:kv,skinning_vertex:Hv,skinnormal_vertex:Gv,specularmap_fragment:Vv,specularmap_pars_fragment:Wv,tonemapping_fragment:Xv,tonemapping_pars_fragment:jv,transmission_fragment:qv,transmission_pars_fragment:Yv,uv_pars_fragment:$v,uv_pars_vertex:Kv,uv_vertex:Zv,worldpos_vertex:Jv,background_vert:Qv,background_frag:e0,backgroundCube_vert:t0,backgroundCube_frag:i0,cube_vert:r0,cube_frag:n0,depth_vert:a0,depth_frag:s0,distanceRGBA_vert:o0,distanceRGBA_frag:l0,equirect_vert:c0,equirect_frag:u0,linedashed_vert:h0,linedashed_frag:d0,meshbasic_vert:p0,meshbasic_frag:f0,meshlambert_vert:m0,meshlambert_frag:g0,meshmatcap_vert:_0,meshmatcap_frag:v0,meshnormal_vert:x0,meshnormal_frag:y0,meshphong_vert:S0,meshphong_frag:M0,meshphysical_vert:E0,meshphysical_frag:T0,meshtoon_vert:b0,meshtoon_frag:w0,points_vert:A0,points_frag:R0,shadow_vert:C0,shadow_frag:P0,sprite_vert:L0,sprite_frag:U0},re={common:{diffuse:{value:new Xe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ae},alphaMap:{value:null},alphaMapTransform:{value:new Ae},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ae}},envmap:{envMap:{value:null},envMapRotation:{value:new Ae},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ae}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ae}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ae},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ae},normalScale:{value:new Qe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ae},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ae}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ae}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ae}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Xe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Xe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ae},alphaTest:{value:0},uvTransform:{value:new Ae}},sprite:{diffuse:{value:new Xe(16777215)},opacity:{value:1},center:{value:new Qe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ae},alphaMap:{value:null},alphaMapTransform:{value:new Ae},alphaTest:{value:0}}},ni={basic:{uniforms:Tt([re.common,re.specularmap,re.envmap,re.aomap,re.lightmap,re.fog]),vertexShader:Le.meshbasic_vert,fragmentShader:Le.meshbasic_frag},lambert:{uniforms:Tt([re.common,re.specularmap,re.envmap,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.fog,re.lights,{emissive:{value:new Xe(0)}}]),vertexShader:Le.meshlambert_vert,fragmentShader:Le.meshlambert_frag},phong:{uniforms:Tt([re.common,re.specularmap,re.envmap,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.fog,re.lights,{emissive:{value:new Xe(0)},specular:{value:new Xe(1118481)},shininess:{value:30}}]),vertexShader:Le.meshphong_vert,fragmentShader:Le.meshphong_frag},standard:{uniforms:Tt([re.common,re.envmap,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.roughnessmap,re.metalnessmap,re.fog,re.lights,{emissive:{value:new Xe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Le.meshphysical_vert,fragmentShader:Le.meshphysical_frag},toon:{uniforms:Tt([re.common,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.gradientmap,re.fog,re.lights,{emissive:{value:new Xe(0)}}]),vertexShader:Le.meshtoon_vert,fragmentShader:Le.meshtoon_frag},matcap:{uniforms:Tt([re.common,re.bumpmap,re.normalmap,re.displacementmap,re.fog,{matcap:{value:null}}]),vertexShader:Le.meshmatcap_vert,fragmentShader:Le.meshmatcap_frag},points:{uniforms:Tt([re.points,re.fog]),vertexShader:Le.points_vert,fragmentShader:Le.points_frag},dashed:{uniforms:Tt([re.common,re.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Le.linedashed_vert,fragmentShader:Le.linedashed_frag},depth:{uniforms:Tt([re.common,re.displacementmap]),vertexShader:Le.depth_vert,fragmentShader:Le.depth_frag},normal:{uniforms:Tt([re.common,re.bumpmap,re.normalmap,re.displacementmap,{opacity:{value:1}}]),vertexShader:Le.meshnormal_vert,fragmentShader:Le.meshnormal_frag},sprite:{uniforms:Tt([re.sprite,re.fog]),vertexShader:Le.sprite_vert,fragmentShader:Le.sprite_frag},background:{uniforms:{uvTransform:{value:new Ae},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Le.background_vert,fragmentShader:Le.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ae}},vertexShader:Le.backgroundCube_vert,fragmentShader:Le.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Le.cube_vert,fragmentShader:Le.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Le.equirect_vert,fragmentShader:Le.equirect_frag},distanceRGBA:{uniforms:Tt([re.common,re.displacementmap,{referencePosition:{value:new F},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Le.distanceRGBA_vert,fragmentShader:Le.distanceRGBA_frag},shadow:{uniforms:Tt([re.lights,re.fog,{color:{value:new Xe(0)},opacity:{value:1}}]),vertexShader:Le.shadow_vert,fragmentShader:Le.shadow_frag}};ni.physical={uniforms:Tt([ni.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ae},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ae},clearcoatNormalScale:{value:new Qe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ae},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ae},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ae},sheen:{value:0},sheenColor:{value:new Xe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ae},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ae},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ae},transmissionSamplerSize:{value:new Qe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ae},attenuationDistance:{value:0},attenuationColor:{value:new Xe(0)},specularColor:{value:new Xe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ae},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ae},anisotropyVector:{value:new Qe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ae}}]),vertexShader:Le.meshphysical_vert,fragmentShader:Le.meshphysical_frag};const Sa={r:0,b:0,g:0},cr=new Si,D0=new ct;function I0(i,e,t,r,n,a,s){const o=new Xe(0);let l=a===!0?0:1,c,u,h=null,d=0,f=null;function v(T){let E=T.isScene===!0?T.background:null;return E&&E.isTexture&&(E=(T.backgroundBlurriness>0?t:e).get(E)),E}function x(T){let E=!1;const D=v(T);D===null?p(o,l):D&&D.isColor&&(p(D,1),E=!0);const U=i.xr.getEnvironmentBlendMode();U==="additive"?r.buffers.color.setClear(0,0,0,1,s):U==="alpha-blend"&&r.buffers.color.setClear(0,0,0,0,s),(i.autoClear||E)&&(r.buffers.depth.setTest(!0),r.buffers.depth.setMask(!0),r.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(T,E){const D=v(E);D&&(D.isCubeTexture||D.mapping===Vn)?(u===void 0&&(u=new ii(new xn(1,1,1),new ri({name:"BackgroundCubeMaterial",uniforms:Vr(ni.backgroundCube.uniforms),vertexShader:ni.backgroundCube.vertexShader,fragmentShader:ni.backgroundCube.fragmentShader,side:bt,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(U,A,I){this.matrixWorld.copyPosition(I.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(u)),cr.copy(E.backgroundRotation),cr.x*=-1,cr.y*=-1,cr.z*=-1,D.isCubeTexture&&D.isRenderTargetTexture===!1&&(cr.y*=-1,cr.z*=-1),u.material.uniforms.envMap.value=D,u.material.uniforms.flipEnvMap.value=D.isCubeTexture&&D.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(D0.makeRotationFromEuler(cr)),u.material.toneMapped=Ve.getTransfer(D.colorSpace)!==$e,(h!==D||d!==D.version||f!==i.toneMapping)&&(u.material.needsUpdate=!0,h=D,d=D.version,f=i.toneMapping),u.layers.enableAll(),T.unshift(u,u.geometry,u.material,0,0,null)):D&&D.isTexture&&(c===void 0&&(c=new ii(new yn(2,2),new ri({name:"BackgroundMaterial",uniforms:Vr(ni.background.uniforms),vertexShader:ni.background.vertexShader,fragmentShader:ni.background.fragmentShader,side:wi,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=D,c.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,c.material.toneMapped=Ve.getTransfer(D.colorSpace)!==$e,D.matrixAutoUpdate===!0&&D.updateMatrix(),c.material.uniforms.uvTransform.value.copy(D.matrix),(h!==D||d!==D.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,h=D,d=D.version,f=i.toneMapping),c.layers.enableAll(),T.unshift(c,c.geometry,c.material,0,0,null))}function p(T,E){T.getRGB(Sa,su(i)),r.buffers.color.setClear(Sa.r,Sa.g,Sa.b,E,s)}function w(){u!==void 0&&(u.geometry.dispose(),u.material.dispose()),c!==void 0&&(c.geometry.dispose(),c.material.dispose())}return{getClearColor:function(){return o},setClearColor:function(T,E=1){o.set(T),l=E,p(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(T){l=T,p(o,l)},render:x,addToRenderList:m,dispose:w}}function N0(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),r={},n=d(null);let a=n,s=!1;function o(y,C,G,k,W){let Z=!1;const V=h(k,G,C);a!==V&&(a=V,c(a.object)),Z=f(y,k,G,W),Z&&v(y,k,G,W),W!==null&&e.update(W,i.ELEMENT_ARRAY_BUFFER),(Z||s)&&(s=!1,E(y,C,G,k),W!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(W).buffer))}function l(){return i.createVertexArray()}function c(y){return i.bindVertexArray(y)}function u(y){return i.deleteVertexArray(y)}function h(y,C,G){const k=G.wireframe===!0;let W=r[y.id];W===void 0&&(W={},r[y.id]=W);let Z=W[C.id];Z===void 0&&(Z={},W[C.id]=Z);let V=Z[k];return V===void 0&&(V=d(l()),Z[k]=V),V}function d(y){const C=[],G=[],k=[];for(let W=0;W<t;W++)C[W]=0,G[W]=0,k[W]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:G,attributeDivisors:k,object:y,attributes:{},index:null}}function f(y,C,G,k){const W=a.attributes,Z=C.attributes;let V=0;const J=G.getAttributes();for(const H in J)if(J[H].location>=0){const te=W[H];let pe=Z[H];if(pe===void 0&&(H==="instanceMatrix"&&y.instanceMatrix&&(pe=y.instanceMatrix),H==="instanceColor"&&y.instanceColor&&(pe=y.instanceColor)),te===void 0||te.attribute!==pe||pe&&te.data!==pe.data)return!0;V++}return a.attributesNum!==V||a.index!==k}function v(y,C,G,k){const W={},Z=C.attributes;let V=0;const J=G.getAttributes();for(const H in J)if(J[H].location>=0){let te=Z[H];te===void 0&&(H==="instanceMatrix"&&y.instanceMatrix&&(te=y.instanceMatrix),H==="instanceColor"&&y.instanceColor&&(te=y.instanceColor));const pe={};pe.attribute=te,te&&te.data&&(pe.data=te.data),W[H]=pe,V++}a.attributes=W,a.attributesNum=V,a.index=k}function x(){const y=a.newAttributes;for(let C=0,G=y.length;C<G;C++)y[C]=0}function m(y){p(y,0)}function p(y,C){const G=a.newAttributes,k=a.enabledAttributes,W=a.attributeDivisors;G[y]=1,k[y]===0&&(i.enableVertexAttribArray(y),k[y]=1),W[y]!==C&&(i.vertexAttribDivisor(y,C),W[y]=C)}function w(){const y=a.newAttributes,C=a.enabledAttributes;for(let G=0,k=C.length;G<k;G++)C[G]!==y[G]&&(i.disableVertexAttribArray(G),C[G]=0)}function T(y,C,G,k,W,Z,V){V===!0?i.vertexAttribIPointer(y,C,G,W,Z):i.vertexAttribPointer(y,C,G,k,W,Z)}function E(y,C,G,k){x();const W=k.attributes,Z=G.getAttributes(),V=C.defaultAttributeValues;for(const J in Z){const H=Z[J];if(H.location>=0){let te=W[J];if(te===void 0&&(J==="instanceMatrix"&&y.instanceMatrix&&(te=y.instanceMatrix),J==="instanceColor"&&y.instanceColor&&(te=y.instanceColor)),te!==void 0){const pe=te.normalized,Re=te.itemSize,Ue=e.get(te);if(Ue===void 0)continue;const Ke=Ue.buffer,X=Ue.type,ee=Ue.bytesPerElement,me=X===i.INT||X===i.UNSIGNED_INT||te.gpuType===bs;if(te.isInterleavedBufferAttribute){const ae=te.data,Se=ae.stride,Ce=te.offset;if(ae.isInstancedInterleavedBuffer){for(let De=0;De<H.locationSize;De++)p(H.location+De,ae.meshPerAttribute);y.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=ae.meshPerAttribute*ae.count)}else for(let De=0;De<H.locationSize;De++)m(H.location+De);i.bindBuffer(i.ARRAY_BUFFER,Ke);for(let De=0;De<H.locationSize;De++)T(H.location+De,Re/H.locationSize,X,pe,Se*ee,(Ce+Re/H.locationSize*De)*ee,me)}else{if(te.isInstancedBufferAttribute){for(let ae=0;ae<H.locationSize;ae++)p(H.location+ae,te.meshPerAttribute);y.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=te.meshPerAttribute*te.count)}else for(let ae=0;ae<H.locationSize;ae++)m(H.location+ae);i.bindBuffer(i.ARRAY_BUFFER,Ke);for(let ae=0;ae<H.locationSize;ae++)T(H.location+ae,Re/H.locationSize,X,pe,Re*ee,Re/H.locationSize*ae*ee,me)}}else if(V!==void 0){const pe=V[J];if(pe!==void 0)switch(pe.length){case 2:i.vertexAttrib2fv(H.location,pe);break;case 3:i.vertexAttrib3fv(H.location,pe);break;case 4:i.vertexAttrib4fv(H.location,pe);break;default:i.vertexAttrib1fv(H.location,pe)}}}}w()}function D(){I();for(const y in r){const C=r[y];for(const G in C){const k=C[G];for(const W in k)u(k[W].object),delete k[W];delete C[G]}delete r[y]}}function U(y){if(r[y.id]===void 0)return;const C=r[y.id];for(const G in C){const k=C[G];for(const W in k)u(k[W].object),delete k[W];delete C[G]}delete r[y.id]}function A(y){for(const C in r){const G=r[C];if(G[y.id]===void 0)continue;const k=G[y.id];for(const W in k)u(k[W].object),delete k[W];delete G[y.id]}}function I(){S(),s=!0,a!==n&&(a=n,c(a.object))}function S(){n.geometry=null,n.program=null,n.wireframe=!1}return{setup:o,reset:I,resetDefaultState:S,dispose:D,releaseStatesOfGeometry:U,releaseStatesOfProgram:A,initAttributes:x,enableAttribute:m,disableUnusedAttributes:w}}function O0(i,e,t){let r;function n(c){r=c}function a(c,u){i.drawArrays(r,c,u),t.update(u,r,1)}function s(c,u,h){h!==0&&(i.drawArraysInstanced(r,c,u,h),t.update(u,r,h))}function o(c,u,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(r,c,0,u,0,h);let d=0;for(let f=0;f<h;f++)d+=u[f];t.update(d,r,1)}function l(c,u,h,d){if(h===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let v=0;v<c.length;v++)s(c[v],u[v],d[v]);else{f.multiDrawArraysInstancedWEBGL(r,c,0,u,0,d,0,h);let v=0;for(let x=0;x<h;x++)v+=u[x]*d[x];t.update(v,r,1)}}this.setMode=n,this.render=a,this.renderInstances=s,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function F0(i,e,t,r){let n;function a(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");n=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function s(A){return!(A!==kt&&r.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){const I=A===rn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==di&&r.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==ti&&!I)}function l(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const h=t.logarithmicDepthBuffer===!0,d=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),w=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),T=i.getParameter(i.MAX_VARYING_VECTORS),E=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),D=v>0,U=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:l,textureFormatReadable:s,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:h,reverseDepthBuffer:d,maxTextures:f,maxVertexTextures:v,maxTextureSize:x,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:w,maxVaryings:T,maxFragmentUniforms:E,vertexTextures:D,maxSamples:U}}function z0(i){const e=this;let t=null,r=0,n=!1,a=!1;const s=new or,o=new Ae,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){const f=h.length!==0||d||r!==0||n;return n=d,r=h.length,f},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(h,d){t=u(h,d,0)},this.setState=function(h,d,f){const v=h.clippingPlanes,x=h.clipIntersection,m=h.clipShadows,p=i.get(h);if(!n||v===null||v.length===0||a&&!m)a?u(null):c();else{const w=a?0:r,T=w*4;let E=p.clippingState||null;l.value=E,E=u(v,d,T,f);for(let D=0;D!==T;++D)E[D]=t[D];p.clippingState=E,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=w}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=r>0),e.numPlanes=r,e.numIntersection=0}function u(h,d,f,v){const x=h!==null?h.length:0;let m=null;if(x!==0){if(m=l.value,v!==!0||m===null){const p=f+x*4,w=d.matrixWorldInverse;o.getNormalMatrix(w),(m===null||m.length<p)&&(m=new Float32Array(p));for(let T=0,E=f;T!==x;++T,E+=4)s.copy(h[T]).applyMatrix4(w,o),s.normal.toArray(m,E),m[E+3]=s.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,m}}function B0(i){let e=new WeakMap;function t(s,o){return o===Ss?s.mapping=Er:o===Ms&&(s.mapping=Tr),s}function r(s){if(s&&s.isTexture){const o=s.mapping;if(o===Ss||o===Ms)if(e.has(s)){const l=e.get(s).texture;return t(l,s.mapping)}else{const l=s.image;if(l&&l.height>0){const c=new Hg(l.height);return c.fromEquirectangularTexture(i,s),e.set(s,c),s.addEventListener("dispose",n),t(c.texture,s.mapping)}else return null}}return s}function n(s){const o=s.target;o.removeEventListener("dispose",n);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function a(){e=new WeakMap}return{get:r,dispose:a}}const jr=4,gu=[.125,.215,.35,.446,.526,.582],ur=20,Co=new Kg,_u=new Xe;let Po=null,Lo=0,Uo=0,Do=!1;const hr=(1+Math.sqrt(5))/2,qr=1/hr,vu=[new F(-hr,qr,0),new F(hr,qr,0),new F(-qr,0,hr),new F(qr,0,hr),new F(0,hr,-qr),new F(0,hr,qr),new F(-1,1,-1),new F(1,1,-1),new F(-1,1,1),new F(1,1,1)];class xu{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,r=.1,n=100){Po=this._renderer.getRenderTarget(),Lo=this._renderer.getActiveCubeFace(),Uo=this._renderer.getActiveMipmapLevel(),Do=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const a=this._allocateTargets();return a.depthBuffer=!0,this._sceneToCubeUV(e,r,n,a),t>0&&this._blur(a,0,0,t),this._applyPMREM(a),this._cleanup(a),a}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Mu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Su(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Po,Lo,Uo),this._renderer.xr.enabled=Do,e.scissorTest=!1,Ma(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Er||e.mapping===Tr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Po=this._renderer.getRenderTarget(),Lo=this._renderer.getActiveCubeFace(),Uo=this._renderer.getActiveMipmapLevel(),Do=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const r=t||this._allocateTargets();return this._textureToCubeUV(e,r),this._applyPMREM(r),this._cleanup(r),r}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,r={magFilter:Bt,minFilter:Bt,generateMipmaps:!1,type:rn,format:kt,colorSpace:Rr,depthBuffer:!1},n=yu(e,t,r);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=yu(e,t,r);const{_lodMax:a}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=k0(a)),this._blurMaterial=H0(a,e,t)}return n}_compileMaterial(e){const t=new ii(this._lodPlanes[0],e);this._renderer.compile(t,Co)}_sceneToCubeUV(e,t,r,n){const a=new Vt(90,1,t,r),s=[1,-1,1,1,1,1],o=[1,1,1,-1,-1,-1],l=this._renderer,c=l.autoClear,u=l.toneMapping;l.getClearColor(_u),l.toneMapping=Ri,l.autoClear=!1;const h=new eu({name:"PMREM.Background",side:bt,depthWrite:!1,depthTest:!1}),d=new ii(new xn,h);let f=!1;const v=e.background;v?v.isColor&&(h.color.copy(v),e.background=null,f=!0):(h.color.copy(_u),f=!0);for(let x=0;x<6;x++){const m=x%3;m===0?(a.up.set(0,s[x],0),a.lookAt(o[x],0,0)):m===1?(a.up.set(0,0,s[x]),a.lookAt(0,o[x],0)):(a.up.set(0,s[x],0),a.lookAt(0,0,o[x]));const p=this._cubeSize;Ma(n,m*p,x>2?p:0,p,p),l.setRenderTarget(n),f&&l.render(d,a),l.render(e,a)}d.geometry.dispose(),d.material.dispose(),l.toneMapping=u,l.autoClear=c,e.background=v}_textureToCubeUV(e,t){const r=this._renderer,n=e.mapping===Er||e.mapping===Tr;n?(this._cubemapMaterial===null&&(this._cubemapMaterial=Mu()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Su());const a=n?this._cubemapMaterial:this._equirectMaterial,s=new ii(this._lodPlanes[0],a),o=a.uniforms;o.envMap.value=e;const l=this._cubeSize;Ma(t,0,0,3*l,2*l),r.setRenderTarget(t),r.render(s,Co)}_applyPMREM(e){const t=this._renderer,r=t.autoClear;t.autoClear=!1;const n=this._lodPlanes.length;for(let a=1;a<n;a++){const s=Math.sqrt(this._sigmas[a]*this._sigmas[a]-this._sigmas[a-1]*this._sigmas[a-1]),o=vu[(n-a-1)%vu.length];this._blur(e,a-1,a,s,o)}t.autoClear=r}_blur(e,t,r,n,a){const s=this._pingPongRenderTarget;this._halfBlur(e,s,t,r,n,"latitudinal",a),this._halfBlur(s,e,r,r,n,"longitudinal",a)}_halfBlur(e,t,r,n,a,s,o){const l=this._renderer,c=this._blurMaterial;s!=="latitudinal"&&s!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new ii(this._lodPlanes[n],c),d=c.uniforms,f=this._sizeLods[r]-1,v=isFinite(a)?Math.PI/(2*f):2*Math.PI/(2*ur-1),x=a/v,m=isFinite(a)?1+Math.floor(u*x):ur;m>ur&&console.warn(`sigmaRadians, ${a}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ur}`);const p=[];let w=0;for(let A=0;A<ur;++A){const I=A/x,S=Math.exp(-I*I/2);p.push(S),A===0?w+=S:A<m&&(w+=2*S)}for(let A=0;A<p.length;A++)p[A]=p[A]/w;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=s==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:T}=this;d.dTheta.value=v,d.mipInt.value=T-r;const E=this._sizeLods[n],D=3*E*(n>T-jr?n-T+jr:0),U=4*(this._cubeSize-E);Ma(t,D,U,3*E,2*E),l.setRenderTarget(t),l.render(h,Co)}}function k0(i){const e=[],t=[],r=[];let n=i;const a=i-jr+1+gu.length;for(let s=0;s<a;s++){const o=Math.pow(2,n);t.push(o);let l=1/o;s>i-jr?l=gu[s-i+jr-1]:s===0&&(l=0),r.push(l);const c=1/(o-2),u=-c,h=1+c,d=[u,u,h,u,h,h,u,u,h,h,u,h],f=6,v=6,x=3,m=2,p=1,w=new Float32Array(x*v*f),T=new Float32Array(m*v*f),E=new Float32Array(p*v*f);for(let U=0;U<f;U++){const A=U%3*2/3-1,I=U>2?0:-1,S=[A,I,0,A+2/3,I,0,A+2/3,I+1,0,A,I,0,A+2/3,I+1,0,A,I+1,0];w.set(S,x*v*U),T.set(d,m*v*U);const y=[U,U,U,U,U,U];E.set(y,p*v*U)}const D=new Mi;D.setAttribute("position",new Ut(w,x)),D.setAttribute("uv",new Ut(T,m)),D.setAttribute("faceIndex",new Ut(E,p)),e.push(D),n>jr&&n--}return{lodPlanes:e,sizeLods:t,sigmas:r}}function yu(i,e,t){const r=new Pi(i,e,t);return r.texture.mapping=Vn,r.texture.name="PMREM.cubeUv",r.scissorTest=!0,r}function Ma(i,e,t,r,n){i.viewport.set(e,t,r,n),i.scissor.set(e,t,r,n)}function H0(i,e,t){const r=new Float32Array(ur),n=new F(0,1,0);return new ri({name:"SphericalGaussianBlur",defines:{n:ur,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:r},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:n}},vertexShader:Io(),fragmentShader:`

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
		`,blending:Ai,depthTest:!1,depthWrite:!1})}function Su(){return new ri({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Io(),fragmentShader:`

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
		`,blending:Ai,depthTest:!1,depthWrite:!1})}function Mu(){return new ri({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Io(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ai,depthTest:!1,depthWrite:!1})}function Io(){return`

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
	`}function G0(i){let e=new WeakMap,t=null;function r(o){if(o&&o.isTexture){const l=o.mapping,c=l===Ss||l===Ms,u=l===Er||l===Tr;if(c||u){let h=e.get(o);const d=h!==void 0?h.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==d)return t===null&&(t=new xu(i)),h=c?t.fromEquirectangular(o,h):t.fromCubemap(o,h),h.texture.pmremVersion=o.pmremVersion,e.set(o,h),h.texture;if(h!==void 0)return h.texture;{const f=o.image;return c&&f&&f.height>0||u&&f&&n(f)?(t===null&&(t=new xu(i)),h=c?t.fromEquirectangular(o):t.fromCubemap(o),h.texture.pmremVersion=o.pmremVersion,e.set(o,h),o.addEventListener("dispose",a),h.texture):null}}}return o}function n(o){let l=0;const c=6;for(let u=0;u<c;u++)o[u]!==void 0&&l++;return l===c}function a(o){const l=o.target;l.removeEventListener("dispose",a);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function s(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:r,dispose:s}}function V0(i){const e={};function t(r){if(e[r]!==void 0)return e[r];let n;switch(r){case"WEBGL_depth_texture":n=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":n=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":n=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":n=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:n=i.getExtension(r)}return e[r]=n,n}return{has:function(r){return t(r)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(r){const n=t(r);return n===null&&Lr("THREE.WebGLRenderer: "+r+" extension not supported."),n}}}function W0(i,e,t,r){const n={},a=new WeakMap;function s(h){const d=h.target;d.index!==null&&e.remove(d.index);for(const v in d.attributes)e.remove(d.attributes[v]);d.removeEventListener("dispose",s),delete n[d.id];const f=a.get(d);f&&(e.remove(f),a.delete(d)),r.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(h,d){return n[d.id]===!0||(d.addEventListener("dispose",s),n[d.id]=!0,t.memory.geometries++),d}function l(h){const d=h.attributes;for(const f in d)e.update(d[f],i.ARRAY_BUFFER)}function c(h){const d=[],f=h.index,v=h.attributes.position;let x=0;if(f!==null){const w=f.array;x=f.version;for(let T=0,E=w.length;T<E;T+=3){const D=w[T+0],U=w[T+1],A=w[T+2];d.push(D,U,U,A,A,D)}}else if(v!==void 0){const w=v.array;x=v.version;for(let T=0,E=w.length/3-1;T<E;T+=3){const D=T+0,U=T+1,A=T+2;d.push(D,U,U,A,A,D)}}else return;const m=new(Oc(d)?iu:tu)(d,1);m.version=x;const p=a.get(h);p&&e.remove(p),a.set(h,m)}function u(h){const d=a.get(h);if(d){const f=h.index;f!==null&&d.version<f.version&&c(h)}else c(h);return a.get(h)}return{get:o,update:l,getWireframeAttribute:u}}function X0(i,e,t){let r;function n(d){r=d}let a,s;function o(d){a=d.type,s=d.bytesPerElement}function l(d,f){i.drawElements(r,f,a,d*s),t.update(f,r,1)}function c(d,f,v){v!==0&&(i.drawElementsInstanced(r,f,a,d*s,v),t.update(f,r,v))}function u(d,f,v){if(v===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(r,f,0,a,d,0,v);let x=0;for(let m=0;m<v;m++)x+=f[m];t.update(x,r,1)}function h(d,f,v,x){if(v===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<d.length;p++)c(d[p]/s,f[p],x[p]);else{m.multiDrawElementsInstancedWEBGL(r,f,0,a,d,0,x,0,v);let p=0;for(let w=0;w<v;w++)p+=f[w]*x[w];t.update(p,r,1)}}this.setMode=n,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function j0(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function r(a,s,o){switch(t.calls++,s){case i.TRIANGLES:t.triangles+=o*(a/3);break;case i.LINES:t.lines+=o*(a/2);break;case i.LINE_STRIP:t.lines+=o*(a-1);break;case i.LINE_LOOP:t.lines+=o*a;break;case i.POINTS:t.points+=o*a;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",s);break}}function n(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:n,update:r}}function q0(i,e,t){const r=new WeakMap,n=new lt;function a(s,o,l){const c=s.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=u!==void 0?u.length:0;let d=r.get(o);if(d===void 0||d.count!==h){let f=function(){I.dispose(),r.delete(o),o.removeEventListener("dispose",f)};d!==void 0&&d.texture.dispose();const v=o.morphAttributes.position!==void 0,x=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],w=o.morphAttributes.normal||[],T=o.morphAttributes.color||[];let E=0;v===!0&&(E=1),x===!0&&(E=2),m===!0&&(E=3);let D=o.attributes.position.count*E,U=1;D>e.maxTextureSize&&(U=Math.ceil(D/e.maxTextureSize),D=e.maxTextureSize);const A=new Float32Array(D*U*4*h),I=new Hc(A,D,U,h);I.type=ti,I.needsUpdate=!0;const S=E*4;for(let y=0;y<h;y++){const C=p[y],G=w[y],k=T[y],W=D*U*4*y;for(let Z=0;Z<C.count;Z++){const V=Z*S;v===!0&&(n.fromBufferAttribute(C,Z),A[W+V+0]=n.x,A[W+V+1]=n.y,A[W+V+2]=n.z,A[W+V+3]=0),x===!0&&(n.fromBufferAttribute(G,Z),A[W+V+4]=n.x,A[W+V+5]=n.y,A[W+V+6]=n.z,A[W+V+7]=0),m===!0&&(n.fromBufferAttribute(k,Z),A[W+V+8]=n.x,A[W+V+9]=n.y,A[W+V+10]=n.z,A[W+V+11]=k.itemSize===4?n.w:1)}}d={count:h,texture:I,size:new Qe(D,U)},r.set(o,d),o.addEventListener("dispose",f)}if(s.isInstancedMesh===!0&&s.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",s.morphTexture,t);else{let f=0;for(let x=0;x<c.length;x++)f+=c[x];const v=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(i,"morphTargetBaseInfluence",v),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:a}}function Y0(i,e,t,r){let n=new WeakMap;function a(l){const c=r.render.frame,u=l.geometry,h=e.get(l,u);if(n.get(h)!==c&&(e.update(h),n.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),n.get(l)!==c&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),n.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;n.get(d)!==c&&(d.update(),n.set(d,c))}return h}function s(){n=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:a,dispose:s}}const Eu=new _t,Tu=new pu(1,1),bu=new Hc,wu=new bg,Au=new cu,Ru=[],Cu=[],Pu=new Float32Array(16),Lu=new Float32Array(9),Uu=new Float32Array(4);function Yr(i,e,t){const r=i[0];if(r<=0||r>0)return i;const n=e*t;let a=Ru[n];if(a===void 0&&(a=new Float32Array(n),Ru[n]=a),e!==0){r.toArray(a,0);for(let s=1,o=0;s!==e;++s)o+=t,i[s].toArray(a,o)}return a}function dt(i,e){if(i.length!==e.length)return!1;for(let t=0,r=i.length;t<r;t++)if(i[t]!==e[t])return!1;return!0}function pt(i,e){for(let t=0,r=e.length;t<r;t++)i[t]=e[t]}function Ea(i,e){let t=Cu[e];t===void 0&&(t=new Int32Array(e),Cu[e]=t);for(let r=0;r!==e;++r)t[r]=i.allocateTextureUnit();return t}function $0(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function K0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(dt(t,e))return;i.uniform2fv(this.addr,e),pt(t,e)}}function Z0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(dt(t,e))return;i.uniform3fv(this.addr,e),pt(t,e)}}function J0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(dt(t,e))return;i.uniform4fv(this.addr,e),pt(t,e)}}function Q0(i,e){const t=this.cache,r=e.elements;if(r===void 0){if(dt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),pt(t,e)}else{if(dt(t,r))return;Uu.set(r),i.uniformMatrix2fv(this.addr,!1,Uu),pt(t,r)}}function ex(i,e){const t=this.cache,r=e.elements;if(r===void 0){if(dt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),pt(t,e)}else{if(dt(t,r))return;Lu.set(r),i.uniformMatrix3fv(this.addr,!1,Lu),pt(t,r)}}function tx(i,e){const t=this.cache,r=e.elements;if(r===void 0){if(dt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),pt(t,e)}else{if(dt(t,r))return;Pu.set(r),i.uniformMatrix4fv(this.addr,!1,Pu),pt(t,r)}}function ix(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function rx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(dt(t,e))return;i.uniform2iv(this.addr,e),pt(t,e)}}function nx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(dt(t,e))return;i.uniform3iv(this.addr,e),pt(t,e)}}function ax(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(dt(t,e))return;i.uniform4iv(this.addr,e),pt(t,e)}}function sx(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function ox(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(dt(t,e))return;i.uniform2uiv(this.addr,e),pt(t,e)}}function lx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(dt(t,e))return;i.uniform3uiv(this.addr,e),pt(t,e)}}function cx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(dt(t,e))return;i.uniform4uiv(this.addr,e),pt(t,e)}}function ux(i,e,t){const r=this.cache,n=t.allocateTextureUnit();r[0]!==n&&(i.uniform1i(this.addr,n),r[0]=n);let a;this.type===i.SAMPLER_2D_SHADOW?(Tu.compareFunction=Dc,a=Tu):a=Eu,t.setTexture2D(e||a,n)}function hx(i,e,t){const r=this.cache,n=t.allocateTextureUnit();r[0]!==n&&(i.uniform1i(this.addr,n),r[0]=n),t.setTexture3D(e||wu,n)}function dx(i,e,t){const r=this.cache,n=t.allocateTextureUnit();r[0]!==n&&(i.uniform1i(this.addr,n),r[0]=n),t.setTextureCube(e||Au,n)}function px(i,e,t){const r=this.cache,n=t.allocateTextureUnit();r[0]!==n&&(i.uniform1i(this.addr,n),r[0]=n),t.setTexture2DArray(e||bu,n)}function fx(i){switch(i){case 5126:return $0;case 35664:return K0;case 35665:return Z0;case 35666:return J0;case 35674:return Q0;case 35675:return ex;case 35676:return tx;case 5124:case 35670:return ix;case 35667:case 35671:return rx;case 35668:case 35672:return nx;case 35669:case 35673:return ax;case 5125:return sx;case 36294:return ox;case 36295:return lx;case 36296:return cx;case 35678:case 36198:case 36298:case 36306:case 35682:return ux;case 35679:case 36299:case 36307:return hx;case 35680:case 36300:case 36308:case 36293:return dx;case 36289:case 36303:case 36311:case 36292:return px}}function mx(i,e){i.uniform1fv(this.addr,e)}function gx(i,e){const t=Yr(e,this.size,2);i.uniform2fv(this.addr,t)}function _x(i,e){const t=Yr(e,this.size,3);i.uniform3fv(this.addr,t)}function vx(i,e){const t=Yr(e,this.size,4);i.uniform4fv(this.addr,t)}function xx(i,e){const t=Yr(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function yx(i,e){const t=Yr(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Sx(i,e){const t=Yr(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Mx(i,e){i.uniform1iv(this.addr,e)}function Ex(i,e){i.uniform2iv(this.addr,e)}function Tx(i,e){i.uniform3iv(this.addr,e)}function bx(i,e){i.uniform4iv(this.addr,e)}function wx(i,e){i.uniform1uiv(this.addr,e)}function Ax(i,e){i.uniform2uiv(this.addr,e)}function Rx(i,e){i.uniform3uiv(this.addr,e)}function Cx(i,e){i.uniform4uiv(this.addr,e)}function Px(i,e,t){const r=this.cache,n=e.length,a=Ea(t,n);dt(r,a)||(i.uniform1iv(this.addr,a),pt(r,a));for(let s=0;s!==n;++s)t.setTexture2D(e[s]||Eu,a[s])}function Lx(i,e,t){const r=this.cache,n=e.length,a=Ea(t,n);dt(r,a)||(i.uniform1iv(this.addr,a),pt(r,a));for(let s=0;s!==n;++s)t.setTexture3D(e[s]||wu,a[s])}function Ux(i,e,t){const r=this.cache,n=e.length,a=Ea(t,n);dt(r,a)||(i.uniform1iv(this.addr,a),pt(r,a));for(let s=0;s!==n;++s)t.setTextureCube(e[s]||Au,a[s])}function Dx(i,e,t){const r=this.cache,n=e.length,a=Ea(t,n);dt(r,a)||(i.uniform1iv(this.addr,a),pt(r,a));for(let s=0;s!==n;++s)t.setTexture2DArray(e[s]||bu,a[s])}function Ix(i){switch(i){case 5126:return mx;case 35664:return gx;case 35665:return _x;case 35666:return vx;case 35674:return xx;case 35675:return yx;case 35676:return Sx;case 5124:case 35670:return Mx;case 35667:case 35671:return Ex;case 35668:case 35672:return Tx;case 35669:case 35673:return bx;case 5125:return wx;case 36294:return Ax;case 36295:return Rx;case 36296:return Cx;case 35678:case 36198:case 36298:case 36306:case 35682:return Px;case 35679:case 36299:case 36307:return Lx;case 35680:case 36300:case 36308:case 36293:return Ux;case 36289:case 36303:case 36311:case 36292:return Dx}}class Nx{constructor(e,t,r){this.id=e,this.addr=r,this.cache=[],this.type=t.type,this.setValue=fx(t.type)}}class Ox{constructor(e,t,r){this.id=e,this.addr=r,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Ix(t.type)}}class Fx{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,r){const n=this.seq;for(let a=0,s=n.length;a!==s;++a){const o=n[a];o.setValue(e,t[o.id],r)}}}const No=/(\w+)(\])?(\[|\.)?/g;function Du(i,e){i.seq.push(e),i.map[e.id]=e}function zx(i,e,t){const r=i.name,n=r.length;for(No.lastIndex=0;;){const a=No.exec(r),s=No.lastIndex;let o=a[1];const l=a[2]==="]",c=a[3];if(l&&(o=o|0),c===void 0||c==="["&&s+2===n){Du(t,c===void 0?new Nx(o,i,e):new Ox(o,i,e));break}else{let u=t.map[o];u===void 0&&(u=new Fx(o),Du(t,u)),t=u}}}class Ta{constructor(e,t){this.seq=[],this.map={};const r=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let n=0;n<r;++n){const a=e.getActiveUniform(t,n),s=e.getUniformLocation(t,a.name);zx(a,s,this)}}setValue(e,t,r,n){const a=this.map[t];a!==void 0&&a.setValue(e,r,n)}setOptional(e,t,r){const n=t[r];n!==void 0&&this.setValue(e,r,n)}static upload(e,t,r,n){for(let a=0,s=t.length;a!==s;++a){const o=t[a],l=r[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,n)}}static seqWithValue(e,t){const r=[];for(let n=0,a=e.length;n!==a;++n){const s=e[n];s.id in t&&r.push(s)}return r}}function Iu(i,e,t){const r=i.createShader(e);return i.shaderSource(r,t),i.compileShader(r),r}const Bx=37297;let kx=0;function Hx(i,e){const t=i.split(`
`),r=[],n=Math.max(e-6,0),a=Math.min(e+6,t.length);for(let s=n;s<a;s++){const o=s+1;r.push(`${o===e?">":" "} ${o}: ${t[s]}`)}return r.join(`
`)}const Nu=new Ae;function Gx(i){Ve._getMatrix(Nu,Ve.workingColorSpace,i);const e=`mat3( ${Nu.elements.map(t=>t.toFixed(4))} )`;switch(Ve.getTransfer(i)){case Kn:return[e,"LinearTransferOETF"];case $e:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Ou(i,e,t){const r=i.getShaderParameter(e,i.COMPILE_STATUS),n=i.getShaderInfoLog(e).trim();if(r&&n==="")return"";const a=/ERROR: 0:(\d+)/.exec(n);if(a){const s=parseInt(a[1]);return t.toUpperCase()+`

`+n+`

`+Hx(i.getShaderSource(e),s)}else return n}function Vx(i,e){const t=Gx(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function Wx(i,e){let t;switch(e){case Ym:t="Linear";break;case $m:t="Reinhard";break;case Km:t="Cineon";break;case Zm:t="ACESFilmic";break;case Qm:t="AgX";break;case eg:t="Neutral";break;case Jm:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const ba=new F;function Xx(){Ve.getLuminanceCoefficients(ba);const i=ba.x.toFixed(4),e=ba.y.toFixed(4),t=ba.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function jx(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(pn).join(`
`)}function qx(i){const e=[];for(const t in i){const r=i[t];r!==!1&&e.push("#define "+t+" "+r)}return e.join(`
`)}function Yx(i,e){const t={},r=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let n=0;n<r;n++){const a=i.getActiveAttrib(e,n),s=a.name;let o=1;a.type===i.FLOAT_MAT2&&(o=2),a.type===i.FLOAT_MAT3&&(o=3),a.type===i.FLOAT_MAT4&&(o=4),t[s]={type:a.type,location:i.getAttribLocation(e,s),locationSize:o}}return t}function pn(i){return i!==""}function Fu(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function zu(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const $x=/^[ \t]*#include +<([\w\d./]+)>/gm;function Oo(i){return i.replace($x,Zx)}const Kx=new Map;function Zx(i,e){let t=Le[e];if(t===void 0){const r=Kx.get(e);if(r!==void 0)t=Le[r],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,r);else throw new Error("Can not resolve #include <"+e+">")}return Oo(t)}const Jx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Bu(i){return i.replace(Jx,Qx)}function Qx(i,e,t,r){let n="";for(let a=parseInt(e);a<parseInt(t);a++)n+=r.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return n}function ku(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function ey(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===gc?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===Am?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===ui&&(e="SHADOWMAP_TYPE_VSM"),e}function ty(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Er:case Tr:e="ENVMAP_TYPE_CUBE";break;case Vn:e="ENVMAP_TYPE_CUBE_UV";break}return e}function iy(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Tr:e="ENVMAP_MODE_REFRACTION";break}return e}function ry(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case yc:e="ENVMAP_BLENDING_MULTIPLY";break;case jm:e="ENVMAP_BLENDING_MIX";break;case qm:e="ENVMAP_BLENDING_ADD";break}return e}function ny(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,r=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:r,maxMip:t}}function ay(i,e,t,r){const n=i.getContext(),a=t.defines;let s=t.vertexShader,o=t.fragmentShader;const l=ey(t),c=ty(t),u=iy(t),h=ry(t),d=ny(t),f=jx(t),v=qx(a),x=n.createProgram();let m,p,w=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(pn).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(pn).join(`
`),p.length>0&&(p+=`
`)):(m=[ku(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(pn).join(`
`),p=[ku(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Ri?"#define TONE_MAPPING":"",t.toneMapping!==Ri?Le.tonemapping_pars_fragment:"",t.toneMapping!==Ri?Wx("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Le.colorspace_pars_fragment,Vx("linearToOutputTexel",t.outputColorSpace),Xx(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(pn).join(`
`)),s=Oo(s),s=Fu(s,t),s=zu(s,t),o=Oo(o),o=Fu(o,t),o=zu(o,t),s=Bu(s),o=Bu(o),t.isRawShaderMaterial!==!0&&(w=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===Zn?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Zn?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const T=w+m+s,E=w+p+o,D=Iu(n,n.VERTEX_SHADER,T),U=Iu(n,n.FRAGMENT_SHADER,E);n.attachShader(x,D),n.attachShader(x,U),t.index0AttributeName!==void 0?n.bindAttribLocation(x,0,t.index0AttributeName):t.morphTargets===!0&&n.bindAttribLocation(x,0,"position"),n.linkProgram(x);function A(C){if(i.debug.checkShaderErrors){const G=n.getProgramInfoLog(x).trim(),k=n.getShaderInfoLog(D).trim(),W=n.getShaderInfoLog(U).trim();let Z=!0,V=!0;if(n.getProgramParameter(x,n.LINK_STATUS)===!1)if(Z=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(n,x,D,U);else{const J=Ou(n,D,"vertex"),H=Ou(n,U,"fragment");console.error("THREE.WebGLProgram: Shader Error "+n.getError()+" - VALIDATE_STATUS "+n.getProgramParameter(x,n.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+G+`
`+J+`
`+H)}else G!==""?console.warn("THREE.WebGLProgram: Program Info Log:",G):(k===""||W==="")&&(V=!1);V&&(C.diagnostics={runnable:Z,programLog:G,vertexShader:{log:k,prefix:m},fragmentShader:{log:W,prefix:p}})}n.deleteShader(D),n.deleteShader(U),I=new Ta(n,x),S=Yx(n,x)}let I;this.getUniforms=function(){return I===void 0&&A(this),I};let S;this.getAttributes=function(){return S===void 0&&A(this),S};let y=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=n.getProgramParameter(x,Bx)),y},this.destroy=function(){r.releaseStatesOfProgram(this),n.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=kx++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=D,this.fragmentShader=U,this}let sy=0;class oy{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,r=e.fragmentShader,n=this._getShaderStage(t),a=this._getShaderStage(r),s=this._getShaderCacheForMaterial(e);return s.has(n)===!1&&(s.add(n),n.usedTimes++),s.has(a)===!1&&(s.add(a),a.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const r of t)r.usedTimes--,r.usedTimes===0&&this.shaderCache.delete(r.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let r=t.get(e);return r===void 0&&(r=new Set,t.set(e,r)),r}_getShaderStage(e){const t=this.shaderCache;let r=t.get(e);return r===void 0&&(r=new ly(e),t.set(e,r)),r}}class ly{constructor(e){this.id=sy++,this.code=e,this.usedTimes=0}}function cy(i,e,t,r,n,a,s){const o=new jc,l=new oy,c=new Set,u=[],h=n.logarithmicDepthBuffer,d=n.vertexTextures;let f=n.precision;const v={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(S){return c.add(S),S===0?"uv":`uv${S}`}function m(S,y,C,G,k){const W=G.fog,Z=k.geometry,V=S.isMeshStandardMaterial?G.environment:null,J=(S.isMeshStandardMaterial?t:e).get(S.envMap||V),H=J&&J.mapping===Vn?J.image.height:null,te=v[S.type];S.precision!==null&&(f=n.getMaxPrecision(S.precision),f!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",f,"instead."));const pe=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,Re=pe!==void 0?pe.length:0;let Ue=0;Z.morphAttributes.position!==void 0&&(Ue=1),Z.morphAttributes.normal!==void 0&&(Ue=2),Z.morphAttributes.color!==void 0&&(Ue=3);let Ke,X,ee,me;if(te){const je=ni[te];Ke=je.vertexShader,X=je.fragmentShader}else Ke=S.vertexShader,X=S.fragmentShader,l.update(S),ee=l.getVertexShaderID(S),me=l.getFragmentShaderID(S);const ae=i.getRenderTarget(),Se=i.state.buffers.depth.getReversed(),Ce=k.isInstancedMesh===!0,De=k.isBatchedMesh===!0,at=!!S.map,Be=!!S.matcap,ot=!!J,b=!!S.aoMap,It=!!S.lightMap,Ne=!!S.bumpMap,Oe=!!S.normalMap,ve=!!S.displacementMap,it=!!S.emissiveMap,_e=!!S.metalnessMap,M=!!S.roughnessMap,g=S.anisotropy>0,N=S.clearcoat>0,q=S.dispersion>0,K=S.iridescence>0,j=S.sheen>0,ge=S.transmission>0,se=g&&!!S.anisotropyMap,de=N&&!!S.clearcoatMap,ke=N&&!!S.clearcoatNormalMap,Q=N&&!!S.clearcoatRoughnessMap,ue=K&&!!S.iridescenceMap,ye=K&&!!S.iridescenceThicknessMap,Ee=j&&!!S.sheenColorMap,he=j&&!!S.sheenRoughnessMap,Fe=!!S.specularMap,Pe=!!S.specularColorMap,et=!!S.specularIntensityMap,R=ge&&!!S.transmissionMap,ne=ge&&!!S.thicknessMap,B=!!S.gradientMap,Y=!!S.alphaMap,oe=S.alphaTest>0,ie=!!S.alphaHash,ze=!!S.extensions;let st=Ri;S.toneMapped&&(ae===null||ae.isXRRenderTarget===!0)&&(st=i.toneMapping);const vt={shaderID:te,shaderType:S.type,shaderName:S.name,vertexShader:Ke,fragmentShader:X,defines:S.defines,customVertexShaderID:ee,customFragmentShaderID:me,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:f,batching:De,batchingColor:De&&k._colorsTexture!==null,instancing:Ce,instancingColor:Ce&&k.instanceColor!==null,instancingMorph:Ce&&k.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:ae===null?i.outputColorSpace:ae.isXRRenderTarget===!0?ae.texture.colorSpace:Rr,alphaToCoverage:!!S.alphaToCoverage,map:at,matcap:Be,envMap:ot,envMapMode:ot&&J.mapping,envMapCubeUVHeight:H,aoMap:b,lightMap:It,bumpMap:Ne,normalMap:Oe,displacementMap:d&&ve,emissiveMap:it,normalMapObjectSpace:Oe&&S.normalMapType===og,normalMapTangentSpace:Oe&&S.normalMapType===sg,metalnessMap:_e,roughnessMap:M,anisotropy:g,anisotropyMap:se,clearcoat:N,clearcoatMap:de,clearcoatNormalMap:ke,clearcoatRoughnessMap:Q,dispersion:q,iridescence:K,iridescenceMap:ue,iridescenceThicknessMap:ye,sheen:j,sheenColorMap:Ee,sheenRoughnessMap:he,specularMap:Fe,specularColorMap:Pe,specularIntensityMap:et,transmission:ge,transmissionMap:R,thicknessMap:ne,gradientMap:B,opaque:S.transparent===!1&&S.blending===Sr&&S.alphaToCoverage===!1,alphaMap:Y,alphaTest:oe,alphaHash:ie,combine:S.combine,mapUv:at&&x(S.map.channel),aoMapUv:b&&x(S.aoMap.channel),lightMapUv:It&&x(S.lightMap.channel),bumpMapUv:Ne&&x(S.bumpMap.channel),normalMapUv:Oe&&x(S.normalMap.channel),displacementMapUv:ve&&x(S.displacementMap.channel),emissiveMapUv:it&&x(S.emissiveMap.channel),metalnessMapUv:_e&&x(S.metalnessMap.channel),roughnessMapUv:M&&x(S.roughnessMap.channel),anisotropyMapUv:se&&x(S.anisotropyMap.channel),clearcoatMapUv:de&&x(S.clearcoatMap.channel),clearcoatNormalMapUv:ke&&x(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Q&&x(S.clearcoatRoughnessMap.channel),iridescenceMapUv:ue&&x(S.iridescenceMap.channel),iridescenceThicknessMapUv:ye&&x(S.iridescenceThicknessMap.channel),sheenColorMapUv:Ee&&x(S.sheenColorMap.channel),sheenRoughnessMapUv:he&&x(S.sheenRoughnessMap.channel),specularMapUv:Fe&&x(S.specularMap.channel),specularColorMapUv:Pe&&x(S.specularColorMap.channel),specularIntensityMapUv:et&&x(S.specularIntensityMap.channel),transmissionMapUv:R&&x(S.transmissionMap.channel),thicknessMapUv:ne&&x(S.thicknessMap.channel),alphaMapUv:Y&&x(S.alphaMap.channel),vertexTangents:!!Z.attributes.tangent&&(Oe||g),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!Z.attributes.uv&&(at||Y),fog:!!W,useFog:S.fog===!0,fogExp2:!!W&&W.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:h,reverseDepthBuffer:Se,skinning:k.isSkinnedMesh===!0,morphTargets:Z.morphAttributes.position!==void 0,morphNormals:Z.morphAttributes.normal!==void 0,morphColors:Z.morphAttributes.color!==void 0,morphTargetsCount:Re,morphTextureStride:Ue,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:S.dithering,shadowMapEnabled:i.shadowMap.enabled&&C.length>0,shadowMapType:i.shadowMap.type,toneMapping:st,decodeVideoTexture:at&&S.map.isVideoTexture===!0&&Ve.getTransfer(S.map.colorSpace)===$e,decodeVideoTextureEmissive:it&&S.emissiveMap.isVideoTexture===!0&&Ve.getTransfer(S.emissiveMap.colorSpace)===$e,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===hi,flipSided:S.side===bt,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:ze&&S.extensions.clipCullDistance===!0&&r.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ze&&S.extensions.multiDraw===!0||De)&&r.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:r.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return vt.vertexUv1s=c.has(1),vt.vertexUv2s=c.has(2),vt.vertexUv3s=c.has(3),c.clear(),vt}function p(S){const y=[];if(S.shaderID?y.push(S.shaderID):(y.push(S.customVertexShaderID),y.push(S.customFragmentShaderID)),S.defines!==void 0)for(const C in S.defines)y.push(C),y.push(S.defines[C]);return S.isRawShaderMaterial===!1&&(w(y,S),T(y,S),y.push(i.outputColorSpace)),y.push(S.customProgramCacheKey),y.join()}function w(S,y){S.push(y.precision),S.push(y.outputColorSpace),S.push(y.envMapMode),S.push(y.envMapCubeUVHeight),S.push(y.mapUv),S.push(y.alphaMapUv),S.push(y.lightMapUv),S.push(y.aoMapUv),S.push(y.bumpMapUv),S.push(y.normalMapUv),S.push(y.displacementMapUv),S.push(y.emissiveMapUv),S.push(y.metalnessMapUv),S.push(y.roughnessMapUv),S.push(y.anisotropyMapUv),S.push(y.clearcoatMapUv),S.push(y.clearcoatNormalMapUv),S.push(y.clearcoatRoughnessMapUv),S.push(y.iridescenceMapUv),S.push(y.iridescenceThicknessMapUv),S.push(y.sheenColorMapUv),S.push(y.sheenRoughnessMapUv),S.push(y.specularMapUv),S.push(y.specularColorMapUv),S.push(y.specularIntensityMapUv),S.push(y.transmissionMapUv),S.push(y.thicknessMapUv),S.push(y.combine),S.push(y.fogExp2),S.push(y.sizeAttenuation),S.push(y.morphTargetsCount),S.push(y.morphAttributeCount),S.push(y.numDirLights),S.push(y.numPointLights),S.push(y.numSpotLights),S.push(y.numSpotLightMaps),S.push(y.numHemiLights),S.push(y.numRectAreaLights),S.push(y.numDirLightShadows),S.push(y.numPointLightShadows),S.push(y.numSpotLightShadows),S.push(y.numSpotLightShadowsWithMaps),S.push(y.numLightProbes),S.push(y.shadowMapType),S.push(y.toneMapping),S.push(y.numClippingPlanes),S.push(y.numClipIntersection),S.push(y.depthPacking)}function T(S,y){o.disableAll(),y.supportsVertexTextures&&o.enable(0),y.instancing&&o.enable(1),y.instancingColor&&o.enable(2),y.instancingMorph&&o.enable(3),y.matcap&&o.enable(4),y.envMap&&o.enable(5),y.normalMapObjectSpace&&o.enable(6),y.normalMapTangentSpace&&o.enable(7),y.clearcoat&&o.enable(8),y.iridescence&&o.enable(9),y.alphaTest&&o.enable(10),y.vertexColors&&o.enable(11),y.vertexAlphas&&o.enable(12),y.vertexUv1s&&o.enable(13),y.vertexUv2s&&o.enable(14),y.vertexUv3s&&o.enable(15),y.vertexTangents&&o.enable(16),y.anisotropy&&o.enable(17),y.alphaHash&&o.enable(18),y.batching&&o.enable(19),y.dispersion&&o.enable(20),y.batchingColor&&o.enable(21),S.push(o.mask),o.disableAll(),y.fog&&o.enable(0),y.useFog&&o.enable(1),y.flatShading&&o.enable(2),y.logarithmicDepthBuffer&&o.enable(3),y.reverseDepthBuffer&&o.enable(4),y.skinning&&o.enable(5),y.morphTargets&&o.enable(6),y.morphNormals&&o.enable(7),y.morphColors&&o.enable(8),y.premultipliedAlpha&&o.enable(9),y.shadowMapEnabled&&o.enable(10),y.doubleSided&&o.enable(11),y.flipSided&&o.enable(12),y.useDepthPacking&&o.enable(13),y.dithering&&o.enable(14),y.transmission&&o.enable(15),y.sheen&&o.enable(16),y.opaque&&o.enable(17),y.pointsUvs&&o.enable(18),y.decodeVideoTexture&&o.enable(19),y.decodeVideoTextureEmissive&&o.enable(20),y.alphaToCoverage&&o.enable(21),S.push(o.mask)}function E(S){const y=v[S.type];let C;if(y){const G=ni[y];C=Fg.clone(G.uniforms)}else C=S.uniforms;return C}function D(S,y){let C;for(let G=0,k=u.length;G<k;G++){const W=u[G];if(W.cacheKey===y){C=W,++C.usedTimes;break}}return C===void 0&&(C=new ay(i,y,S,a),u.push(C)),C}function U(S){if(--S.usedTimes===0){const y=u.indexOf(S);u[y]=u[u.length-1],u.pop(),S.destroy()}}function A(S){l.remove(S)}function I(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:E,acquireProgram:D,releaseProgram:U,releaseShaderCache:A,programs:u,dispose:I}}function uy(){let i=new WeakMap;function e(s){return i.has(s)}function t(s){let o=i.get(s);return o===void 0&&(o={},i.set(s,o)),o}function r(s){i.delete(s)}function n(s,o,l){i.get(s)[o]=l}function a(){i=new WeakMap}return{has:e,get:t,remove:r,update:n,dispose:a}}function hy(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function Hu(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Gu(){const i=[];let e=0;const t=[],r=[],n=[];function a(){e=0,t.length=0,r.length=0,n.length=0}function s(h,d,f,v,x,m){let p=i[e];return p===void 0?(p={id:h.id,object:h,geometry:d,material:f,groupOrder:v,renderOrder:h.renderOrder,z:x,group:m},i[e]=p):(p.id=h.id,p.object=h,p.geometry=d,p.material=f,p.groupOrder=v,p.renderOrder=h.renderOrder,p.z=x,p.group=m),e++,p}function o(h,d,f,v,x,m){const p=s(h,d,f,v,x,m);f.transmission>0?r.push(p):f.transparent===!0?n.push(p):t.push(p)}function l(h,d,f,v,x,m){const p=s(h,d,f,v,x,m);f.transmission>0?r.unshift(p):f.transparent===!0?n.unshift(p):t.unshift(p)}function c(h,d){t.length>1&&t.sort(h||hy),r.length>1&&r.sort(d||Hu),n.length>1&&n.sort(d||Hu)}function u(){for(let h=e,d=i.length;h<d;h++){const f=i[h];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:r,transparent:n,init:a,push:o,unshift:l,finish:u,sort:c}}function dy(){let i=new WeakMap;function e(r,n){const a=i.get(r);let s;return a===void 0?(s=new Gu,i.set(r,[s])):n>=a.length?(s=new Gu,a.push(s)):s=a[n],s}function t(){i=new WeakMap}return{get:e,dispose:t}}function py(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new F,color:new Xe};break;case"SpotLight":t={position:new F,direction:new F,color:new Xe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new F,color:new Xe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new F,skyColor:new Xe,groundColor:new Xe};break;case"RectAreaLight":t={color:new Xe,position:new F,halfWidth:new F,halfHeight:new F};break}return i[e.id]=t,t}}}function fy(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Qe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Qe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Qe,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let my=0;function gy(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function _y(i){const e=new py,t=fy(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)r.probe.push(new F);const n=new F,a=new ct,s=new ct;function o(c){let u=0,h=0,d=0;for(let S=0;S<9;S++)r.probe[S].set(0,0,0);let f=0,v=0,x=0,m=0,p=0,w=0,T=0,E=0,D=0,U=0,A=0;c.sort(gy);for(let S=0,y=c.length;S<y;S++){const C=c[S],G=C.color,k=C.intensity,W=C.distance,Z=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)u+=G.r*k,h+=G.g*k,d+=G.b*k;else if(C.isLightProbe){for(let V=0;V<9;V++)r.probe[V].addScaledVector(C.sh.coefficients[V],k);A++}else if(C.isDirectionalLight){const V=e.get(C);if(V.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const J=C.shadow,H=t.get(C);H.shadowIntensity=J.intensity,H.shadowBias=J.bias,H.shadowNormalBias=J.normalBias,H.shadowRadius=J.radius,H.shadowMapSize=J.mapSize,r.directionalShadow[f]=H,r.directionalShadowMap[f]=Z,r.directionalShadowMatrix[f]=C.shadow.matrix,w++}r.directional[f]=V,f++}else if(C.isSpotLight){const V=e.get(C);V.position.setFromMatrixPosition(C.matrixWorld),V.color.copy(G).multiplyScalar(k),V.distance=W,V.coneCos=Math.cos(C.angle),V.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),V.decay=C.decay,r.spot[x]=V;const J=C.shadow;if(C.map&&(r.spotLightMap[D]=C.map,D++,J.updateMatrices(C),C.castShadow&&U++),r.spotLightMatrix[x]=J.matrix,C.castShadow){const H=t.get(C);H.shadowIntensity=J.intensity,H.shadowBias=J.bias,H.shadowNormalBias=J.normalBias,H.shadowRadius=J.radius,H.shadowMapSize=J.mapSize,r.spotShadow[x]=H,r.spotShadowMap[x]=Z,E++}x++}else if(C.isRectAreaLight){const V=e.get(C);V.color.copy(G).multiplyScalar(k),V.halfWidth.set(C.width*.5,0,0),V.halfHeight.set(0,C.height*.5,0),r.rectArea[m]=V,m++}else if(C.isPointLight){const V=e.get(C);if(V.color.copy(C.color).multiplyScalar(C.intensity),V.distance=C.distance,V.decay=C.decay,C.castShadow){const J=C.shadow,H=t.get(C);H.shadowIntensity=J.intensity,H.shadowBias=J.bias,H.shadowNormalBias=J.normalBias,H.shadowRadius=J.radius,H.shadowMapSize=J.mapSize,H.shadowCameraNear=J.camera.near,H.shadowCameraFar=J.camera.far,r.pointShadow[v]=H,r.pointShadowMap[v]=Z,r.pointShadowMatrix[v]=C.shadow.matrix,T++}r.point[v]=V,v++}else if(C.isHemisphereLight){const V=e.get(C);V.skyColor.copy(C.color).multiplyScalar(k),V.groundColor.copy(C.groundColor).multiplyScalar(k),r.hemi[p]=V,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=re.LTC_FLOAT_1,r.rectAreaLTC2=re.LTC_FLOAT_2):(r.rectAreaLTC1=re.LTC_HALF_1,r.rectAreaLTC2=re.LTC_HALF_2)),r.ambient[0]=u,r.ambient[1]=h,r.ambient[2]=d;const I=r.hash;(I.directionalLength!==f||I.pointLength!==v||I.spotLength!==x||I.rectAreaLength!==m||I.hemiLength!==p||I.numDirectionalShadows!==w||I.numPointShadows!==T||I.numSpotShadows!==E||I.numSpotMaps!==D||I.numLightProbes!==A)&&(r.directional.length=f,r.spot.length=x,r.rectArea.length=m,r.point.length=v,r.hemi.length=p,r.directionalShadow.length=w,r.directionalShadowMap.length=w,r.pointShadow.length=T,r.pointShadowMap.length=T,r.spotShadow.length=E,r.spotShadowMap.length=E,r.directionalShadowMatrix.length=w,r.pointShadowMatrix.length=T,r.spotLightMatrix.length=E+D-U,r.spotLightMap.length=D,r.numSpotLightShadowsWithMaps=U,r.numLightProbes=A,I.directionalLength=f,I.pointLength=v,I.spotLength=x,I.rectAreaLength=m,I.hemiLength=p,I.numDirectionalShadows=w,I.numPointShadows=T,I.numSpotShadows=E,I.numSpotMaps=D,I.numLightProbes=A,r.version=my++)}function l(c,u){let h=0,d=0,f=0,v=0,x=0;const m=u.matrixWorldInverse;for(let p=0,w=c.length;p<w;p++){const T=c[p];if(T.isDirectionalLight){const E=r.directional[h];E.direction.setFromMatrixPosition(T.matrixWorld),n.setFromMatrixPosition(T.target.matrixWorld),E.direction.sub(n),E.direction.transformDirection(m),h++}else if(T.isSpotLight){const E=r.spot[f];E.position.setFromMatrixPosition(T.matrixWorld),E.position.applyMatrix4(m),E.direction.setFromMatrixPosition(T.matrixWorld),n.setFromMatrixPosition(T.target.matrixWorld),E.direction.sub(n),E.direction.transformDirection(m),f++}else if(T.isRectAreaLight){const E=r.rectArea[v];E.position.setFromMatrixPosition(T.matrixWorld),E.position.applyMatrix4(m),s.identity(),a.copy(T.matrixWorld),a.premultiply(m),s.extractRotation(a),E.halfWidth.set(T.width*.5,0,0),E.halfHeight.set(0,T.height*.5,0),E.halfWidth.applyMatrix4(s),E.halfHeight.applyMatrix4(s),v++}else if(T.isPointLight){const E=r.point[d];E.position.setFromMatrixPosition(T.matrixWorld),E.position.applyMatrix4(m),d++}else if(T.isHemisphereLight){const E=r.hemi[x];E.direction.setFromMatrixPosition(T.matrixWorld),E.direction.transformDirection(m),x++}}}return{setup:o,setupView:l,state:r}}function Vu(i){const e=new _y(i),t=[],r=[];function n(u){c.camera=u,t.length=0,r.length=0}function a(u){t.push(u)}function s(u){r.push(u)}function o(){e.setup(t)}function l(u){e.setupView(t,u)}const c={lightsArray:t,shadowsArray:r,camera:null,lights:e,transmissionRenderTarget:{}};return{init:n,state:c,setupLights:o,setupLightsView:l,pushLight:a,pushShadow:s}}function vy(i){let e=new WeakMap;function t(n,a=0){const s=e.get(n);let o;return s===void 0?(o=new Vu(i),e.set(n,[o])):a>=s.length?(o=new Vu(i),s.push(o)):o=s[a],o}function r(){e=new WeakMap}return{get:t,dispose:r}}const xy=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,yy=`uniform sampler2D shadow_pass;
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
}`;function Sy(i,e,t){let r=new uu;const n=new Qe,a=new Qe,s=new lt,o=new Yg({depthPacking:ag}),l=new $g,c={},u=t.maxTextureSize,h={[wi]:bt,[bt]:wi,[hi]:hi},d=new ri({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Qe},radius:{value:4}},vertexShader:xy,fragmentShader:yy}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const v=new Mi;v.setAttribute("position",new Ut(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new ii(v,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=gc;let p=this.type;this.render=function(U,A,I){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||U.length===0)return;const S=i.getRenderTarget(),y=i.getActiveCubeFace(),C=i.getActiveMipmapLevel(),G=i.state;G.setBlending(Ai),G.buffers.color.setClear(1,1,1,1),G.buffers.depth.setTest(!0),G.setScissorTest(!1);const k=p!==ui&&this.type===ui,W=p===ui&&this.type!==ui;for(let Z=0,V=U.length;Z<V;Z++){const J=U[Z],H=J.shadow;if(H===void 0){console.warn("THREE.WebGLShadowMap:",J,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;n.copy(H.mapSize);const te=H.getFrameExtents();if(n.multiply(te),a.copy(H.mapSize),(n.x>u||n.y>u)&&(n.x>u&&(a.x=Math.floor(u/te.x),n.x=a.x*te.x,H.mapSize.x=a.x),n.y>u&&(a.y=Math.floor(u/te.y),n.y=a.y*te.y,H.mapSize.y=a.y)),H.map===null||k===!0||W===!0){const Re=this.type!==ui?{minFilter:wt,magFilter:wt}:{};H.map!==null&&H.map.dispose(),H.map=new Pi(n.x,n.y,Re),H.map.texture.name=J.name+".shadowMap",H.camera.updateProjectionMatrix()}i.setRenderTarget(H.map),i.clear();const pe=H.getViewportCount();for(let Re=0;Re<pe;Re++){const Ue=H.getViewport(Re);s.set(a.x*Ue.x,a.y*Ue.y,a.x*Ue.z,a.y*Ue.w),G.viewport(s),H.updateMatrices(J,Re),r=H.getFrustum(),E(A,I,H.camera,J,this.type)}H.isPointLightShadow!==!0&&this.type===ui&&w(H,I),H.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(S,y,C)};function w(U,A){const I=e.update(x);d.defines.VSM_SAMPLES!==U.blurSamples&&(d.defines.VSM_SAMPLES=U.blurSamples,f.defines.VSM_SAMPLES=U.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),U.mapPass===null&&(U.mapPass=new Pi(n.x,n.y)),d.uniforms.shadow_pass.value=U.map.texture,d.uniforms.resolution.value=U.mapSize,d.uniforms.radius.value=U.radius,i.setRenderTarget(U.mapPass),i.clear(),i.renderBufferDirect(A,null,I,d,x,null),f.uniforms.shadow_pass.value=U.mapPass.texture,f.uniforms.resolution.value=U.mapSize,f.uniforms.radius.value=U.radius,i.setRenderTarget(U.map),i.clear(),i.renderBufferDirect(A,null,I,f,x,null)}function T(U,A,I,S){let y=null;const C=I.isPointLight===!0?U.customDistanceMaterial:U.customDepthMaterial;if(C!==void 0)y=C;else if(y=I.isPointLight===!0?l:o,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const G=y.uuid,k=A.uuid;let W=c[G];W===void 0&&(W={},c[G]=W);let Z=W[k];Z===void 0&&(Z=y.clone(),W[k]=Z,A.addEventListener("dispose",D)),y=Z}if(y.visible=A.visible,y.wireframe=A.wireframe,S===ui?y.side=A.shadowSide!==null?A.shadowSide:A.side:y.side=A.shadowSide!==null?A.shadowSide:h[A.side],y.alphaMap=A.alphaMap,y.alphaTest=A.alphaTest,y.map=A.map,y.clipShadows=A.clipShadows,y.clippingPlanes=A.clippingPlanes,y.clipIntersection=A.clipIntersection,y.displacementMap=A.displacementMap,y.displacementScale=A.displacementScale,y.displacementBias=A.displacementBias,y.wireframeLinewidth=A.wireframeLinewidth,y.linewidth=A.linewidth,I.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const G=i.properties.get(y);G.light=I}return y}function E(U,A,I,S,y){if(U.visible===!1)return;if(U.layers.test(A.layers)&&(U.isMesh||U.isLine||U.isPoints)&&(U.castShadow||U.receiveShadow&&y===ui)&&(!U.frustumCulled||r.intersectsObject(U))){U.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,U.matrixWorld);const G=e.update(U),k=U.material;if(Array.isArray(k)){const W=G.groups;for(let Z=0,V=W.length;Z<V;Z++){const J=W[Z],H=k[J.materialIndex];if(H&&H.visible){const te=T(U,H,S,y);U.onBeforeShadow(i,U,A,I,G,te,J),i.renderBufferDirect(I,null,G,te,U,J),U.onAfterShadow(i,U,A,I,G,te,J)}}}else if(k.visible){const W=T(U,k,S,y);U.onBeforeShadow(i,U,A,I,G,W,null),i.renderBufferDirect(I,null,G,W,U,null),U.onAfterShadow(i,U,A,I,G,W,null)}}const C=U.children;for(let G=0,k=C.length;G<k;G++)E(C[G],A,I,S,y)}function D(U){U.target.removeEventListener("dispose",D);for(const A in c){const I=c[A],S=U.target.uuid;S in I&&(I[S].dispose(),delete I[S])}}}const My={[fs]:ms,[gs]:xs,[_s]:ys,[Mr]:vs,[ms]:fs,[xs]:gs,[ys]:_s,[vs]:Mr};function Ey(i,e){function t(){let R=!1;const ne=new lt;let B=null;const Y=new lt(0,0,0,0);return{setMask:function(oe){B!==oe&&!R&&(i.colorMask(oe,oe,oe,oe),B=oe)},setLocked:function(oe){R=oe},setClear:function(oe,ie,ze,st,vt){vt===!0&&(oe*=st,ie*=st,ze*=st),ne.set(oe,ie,ze,st),Y.equals(ne)===!1&&(i.clearColor(oe,ie,ze,st),Y.copy(ne))},reset:function(){R=!1,B=null,Y.set(-1,0,0,0)}}}function r(){let R=!1,ne=!1,B=null,Y=null,oe=null;return{setReversed:function(ie){if(ne!==ie){const ze=e.get("EXT_clip_control");ne?ze.clipControlEXT(ze.LOWER_LEFT_EXT,ze.ZERO_TO_ONE_EXT):ze.clipControlEXT(ze.LOWER_LEFT_EXT,ze.NEGATIVE_ONE_TO_ONE_EXT);const st=oe;oe=null,this.setClear(st)}ne=ie},getReversed:function(){return ne},setTest:function(ie){ie?ae(i.DEPTH_TEST):Se(i.DEPTH_TEST)},setMask:function(ie){B!==ie&&!R&&(i.depthMask(ie),B=ie)},setFunc:function(ie){if(ne&&(ie=My[ie]),Y!==ie){switch(ie){case fs:i.depthFunc(i.NEVER);break;case ms:i.depthFunc(i.ALWAYS);break;case gs:i.depthFunc(i.LESS);break;case Mr:i.depthFunc(i.LEQUAL);break;case _s:i.depthFunc(i.EQUAL);break;case vs:i.depthFunc(i.GEQUAL);break;case xs:i.depthFunc(i.GREATER);break;case ys:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Y=ie}},setLocked:function(ie){R=ie},setClear:function(ie){oe!==ie&&(ne&&(ie=1-ie),i.clearDepth(ie),oe=ie)},reset:function(){R=!1,B=null,Y=null,oe=null,ne=!1}}}function n(){let R=!1,ne=null,B=null,Y=null,oe=null,ie=null,ze=null,st=null,vt=null;return{setTest:function(je){R||(je?ae(i.STENCIL_TEST):Se(i.STENCIL_TEST))},setMask:function(je){ne!==je&&!R&&(i.stencilMask(je),ne=je)},setFunc:function(je,Xt,ai){(B!==je||Y!==Xt||oe!==ai)&&(i.stencilFunc(je,Xt,ai),B=je,Y=Xt,oe=ai)},setOp:function(je,Xt,ai){(ie!==je||ze!==Xt||st!==ai)&&(i.stencilOp(je,Xt,ai),ie=je,ze=Xt,st=ai)},setLocked:function(je){R=je},setClear:function(je){vt!==je&&(i.clearStencil(je),vt=je)},reset:function(){R=!1,ne=null,B=null,Y=null,oe=null,ie=null,ze=null,st=null,vt=null}}}const a=new t,s=new r,o=new n,l=new WeakMap,c=new WeakMap;let u={},h={},d=new WeakMap,f=[],v=null,x=!1,m=null,p=null,w=null,T=null,E=null,D=null,U=null,A=new Xe(0,0,0),I=0,S=!1,y=null,C=null,G=null,k=null,W=null;const Z=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let V=!1,J=0;const H=i.getParameter(i.VERSION);H.indexOf("WebGL")!==-1?(J=parseFloat(/^WebGL (\d)/.exec(H)[1]),V=J>=1):H.indexOf("OpenGL ES")!==-1&&(J=parseFloat(/^OpenGL ES (\d)/.exec(H)[1]),V=J>=2);let te=null,pe={};const Re=i.getParameter(i.SCISSOR_BOX),Ue=i.getParameter(i.VIEWPORT),Ke=new lt().fromArray(Re),X=new lt().fromArray(Ue);function ee(R,ne,B,Y){const oe=new Uint8Array(4),ie=i.createTexture();i.bindTexture(R,ie),i.texParameteri(R,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(R,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let ze=0;ze<B;ze++)R===i.TEXTURE_3D||R===i.TEXTURE_2D_ARRAY?i.texImage3D(ne,0,i.RGBA,1,1,Y,0,i.RGBA,i.UNSIGNED_BYTE,oe):i.texImage2D(ne+ze,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,oe);return ie}const me={};me[i.TEXTURE_2D]=ee(i.TEXTURE_2D,i.TEXTURE_2D,1),me[i.TEXTURE_CUBE_MAP]=ee(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),me[i.TEXTURE_2D_ARRAY]=ee(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),me[i.TEXTURE_3D]=ee(i.TEXTURE_3D,i.TEXTURE_3D,1,1),a.setClear(0,0,0,1),s.setClear(1),o.setClear(0),ae(i.DEPTH_TEST),s.setFunc(Mr),Ne(!1),Oe(mc),ae(i.CULL_FACE),b(Ai);function ae(R){u[R]!==!0&&(i.enable(R),u[R]=!0)}function Se(R){u[R]!==!1&&(i.disable(R),u[R]=!1)}function Ce(R,ne){return h[R]!==ne?(i.bindFramebuffer(R,ne),h[R]=ne,R===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=ne),R===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=ne),!0):!1}function De(R,ne){let B=f,Y=!1;if(R){B=d.get(ne),B===void 0&&(B=[],d.set(ne,B));const oe=R.textures;if(B.length!==oe.length||B[0]!==i.COLOR_ATTACHMENT0){for(let ie=0,ze=oe.length;ie<ze;ie++)B[ie]=i.COLOR_ATTACHMENT0+ie;B.length=oe.length,Y=!0}}else B[0]!==i.BACK&&(B[0]=i.BACK,Y=!0);Y&&i.drawBuffers(B)}function at(R){return v!==R?(i.useProgram(R),v=R,!0):!1}const Be={[Ji]:i.FUNC_ADD,[Cm]:i.FUNC_SUBTRACT,[Pm]:i.FUNC_REVERSE_SUBTRACT};Be[Lm]=i.MIN,Be[Um]=i.MAX;const ot={[Dm]:i.ZERO,[Im]:i.ONE,[Nm]:i.SRC_COLOR,[ds]:i.SRC_ALPHA,[Hm]:i.SRC_ALPHA_SATURATE,[Bm]:i.DST_COLOR,[Fm]:i.DST_ALPHA,[Om]:i.ONE_MINUS_SRC_COLOR,[ps]:i.ONE_MINUS_SRC_ALPHA,[km]:i.ONE_MINUS_DST_COLOR,[zm]:i.ONE_MINUS_DST_ALPHA,[Gm]:i.CONSTANT_COLOR,[Vm]:i.ONE_MINUS_CONSTANT_COLOR,[Wm]:i.CONSTANT_ALPHA,[Xm]:i.ONE_MINUS_CONSTANT_ALPHA};function b(R,ne,B,Y,oe,ie,ze,st,vt,je){if(R===Ai){x===!0&&(Se(i.BLEND),x=!1);return}if(x===!1&&(ae(i.BLEND),x=!0),R!==Rm){if(R!==m||je!==S){if((p!==Ji||E!==Ji)&&(i.blendEquation(i.FUNC_ADD),p=Ji,E=Ji),je)switch(R){case Sr:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case _c:i.blendFunc(i.ONE,i.ONE);break;case vc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case xc:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",R);break}else switch(R){case Sr:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case _c:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case vc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case xc:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",R);break}w=null,T=null,D=null,U=null,A.set(0,0,0),I=0,m=R,S=je}return}oe=oe||ne,ie=ie||B,ze=ze||Y,(ne!==p||oe!==E)&&(i.blendEquationSeparate(Be[ne],Be[oe]),p=ne,E=oe),(B!==w||Y!==T||ie!==D||ze!==U)&&(i.blendFuncSeparate(ot[B],ot[Y],ot[ie],ot[ze]),w=B,T=Y,D=ie,U=ze),(st.equals(A)===!1||vt!==I)&&(i.blendColor(st.r,st.g,st.b,vt),A.copy(st),I=vt),m=R,S=!1}function It(R,ne){R.side===hi?Se(i.CULL_FACE):ae(i.CULL_FACE);let B=R.side===bt;ne&&(B=!B),Ne(B),R.blending===Sr&&R.transparent===!1?b(Ai):b(R.blending,R.blendEquation,R.blendSrc,R.blendDst,R.blendEquationAlpha,R.blendSrcAlpha,R.blendDstAlpha,R.blendColor,R.blendAlpha,R.premultipliedAlpha),s.setFunc(R.depthFunc),s.setTest(R.depthTest),s.setMask(R.depthWrite),a.setMask(R.colorWrite);const Y=R.stencilWrite;o.setTest(Y),Y&&(o.setMask(R.stencilWriteMask),o.setFunc(R.stencilFunc,R.stencilRef,R.stencilFuncMask),o.setOp(R.stencilFail,R.stencilZFail,R.stencilZPass)),it(R.polygonOffset,R.polygonOffsetFactor,R.polygonOffsetUnits),R.alphaToCoverage===!0?ae(i.SAMPLE_ALPHA_TO_COVERAGE):Se(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ne(R){y!==R&&(R?i.frontFace(i.CW):i.frontFace(i.CCW),y=R)}function Oe(R){R!==bm?(ae(i.CULL_FACE),R!==C&&(R===mc?i.cullFace(i.BACK):R===wm?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Se(i.CULL_FACE),C=R}function ve(R){R!==G&&(V&&i.lineWidth(R),G=R)}function it(R,ne,B){R?(ae(i.POLYGON_OFFSET_FILL),(k!==ne||W!==B)&&(i.polygonOffset(ne,B),k=ne,W=B)):Se(i.POLYGON_OFFSET_FILL)}function _e(R){R?ae(i.SCISSOR_TEST):Se(i.SCISSOR_TEST)}function M(R){R===void 0&&(R=i.TEXTURE0+Z-1),te!==R&&(i.activeTexture(R),te=R)}function g(R,ne,B){B===void 0&&(te===null?B=i.TEXTURE0+Z-1:B=te);let Y=pe[B];Y===void 0&&(Y={type:void 0,texture:void 0},pe[B]=Y),(Y.type!==R||Y.texture!==ne)&&(te!==B&&(i.activeTexture(B),te=B),i.bindTexture(R,ne||me[R]),Y.type=R,Y.texture=ne)}function N(){const R=pe[te];R!==void 0&&R.type!==void 0&&(i.bindTexture(R.type,null),R.type=void 0,R.texture=void 0)}function q(){try{i.compressedTexImage2D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function K(){try{i.compressedTexImage3D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function j(){try{i.texSubImage2D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function ge(){try{i.texSubImage3D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function se(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function de(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function ke(){try{i.texStorage2D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Q(){try{i.texStorage3D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function ue(){try{i.texImage2D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function ye(){try{i.texImage3D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Ee(R){Ke.equals(R)===!1&&(i.scissor(R.x,R.y,R.z,R.w),Ke.copy(R))}function he(R){X.equals(R)===!1&&(i.viewport(R.x,R.y,R.z,R.w),X.copy(R))}function Fe(R,ne){let B=c.get(ne);B===void 0&&(B=new WeakMap,c.set(ne,B));let Y=B.get(R);Y===void 0&&(Y=i.getUniformBlockIndex(ne,R.name),B.set(R,Y))}function Pe(R,ne){const B=c.get(ne).get(R);l.get(ne)!==B&&(i.uniformBlockBinding(ne,B,R.__bindingPointIndex),l.set(ne,B))}function et(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),s.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},te=null,pe={},h={},d=new WeakMap,f=[],v=null,x=!1,m=null,p=null,w=null,T=null,E=null,D=null,U=null,A=new Xe(0,0,0),I=0,S=!1,y=null,C=null,G=null,k=null,W=null,Ke.set(0,0,i.canvas.width,i.canvas.height),X.set(0,0,i.canvas.width,i.canvas.height),a.reset(),s.reset(),o.reset()}return{buffers:{color:a,depth:s,stencil:o},enable:ae,disable:Se,bindFramebuffer:Ce,drawBuffers:De,useProgram:at,setBlending:b,setMaterial:It,setFlipSided:Ne,setCullFace:Oe,setLineWidth:ve,setPolygonOffset:it,setScissorTest:_e,activeTexture:M,bindTexture:g,unbindTexture:N,compressedTexImage2D:q,compressedTexImage3D:K,texImage2D:ue,texImage3D:ye,updateUBOMapping:Fe,uniformBlockBinding:Pe,texStorage2D:ke,texStorage3D:Q,texSubImage2D:j,texSubImage3D:ge,compressedTexSubImage2D:se,compressedTexSubImage3D:de,scissor:Ee,viewport:he,reset:et}}function Ty(i,e,t,r,n,a,s){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Qe,u=new WeakMap;let h;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(M,g){return f?new OffscreenCanvas(M,g):Qn("canvas")}function x(M,g,N){let q=1;const K=_e(M);if((K.width>N||K.height>N)&&(q=N/Math.max(K.width,K.height)),q<1)if(typeof HTMLImageElement<"u"&&M instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&M instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&M instanceof ImageBitmap||typeof VideoFrame<"u"&&M instanceof VideoFrame){const j=Math.floor(q*K.width),ge=Math.floor(q*K.height);h===void 0&&(h=v(j,ge));const se=g?v(j,ge):h;return se.width=j,se.height=ge,se.getContext("2d").drawImage(M,0,0,j,ge),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+K.width+"x"+K.height+") to ("+j+"x"+ge+")."),se}else return"data"in M&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+K.width+"x"+K.height+")."),M;return M}function m(M){return M.generateMipmaps}function p(M){i.generateMipmap(M)}function w(M){return M.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:M.isWebGL3DRenderTarget?i.TEXTURE_3D:M.isWebGLArrayRenderTarget||M.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function T(M,g,N,q,K=!1){if(M!==null){if(i[M]!==void 0)return i[M];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+M+"'")}let j=g;if(g===i.RED&&(N===i.FLOAT&&(j=i.R32F),N===i.HALF_FLOAT&&(j=i.R16F),N===i.UNSIGNED_BYTE&&(j=i.R8)),g===i.RED_INTEGER&&(N===i.UNSIGNED_BYTE&&(j=i.R8UI),N===i.UNSIGNED_SHORT&&(j=i.R16UI),N===i.UNSIGNED_INT&&(j=i.R32UI),N===i.BYTE&&(j=i.R8I),N===i.SHORT&&(j=i.R16I),N===i.INT&&(j=i.R32I)),g===i.RG&&(N===i.FLOAT&&(j=i.RG32F),N===i.HALF_FLOAT&&(j=i.RG16F),N===i.UNSIGNED_BYTE&&(j=i.RG8)),g===i.RG_INTEGER&&(N===i.UNSIGNED_BYTE&&(j=i.RG8UI),N===i.UNSIGNED_SHORT&&(j=i.RG16UI),N===i.UNSIGNED_INT&&(j=i.RG32UI),N===i.BYTE&&(j=i.RG8I),N===i.SHORT&&(j=i.RG16I),N===i.INT&&(j=i.RG32I)),g===i.RGB_INTEGER&&(N===i.UNSIGNED_BYTE&&(j=i.RGB8UI),N===i.UNSIGNED_SHORT&&(j=i.RGB16UI),N===i.UNSIGNED_INT&&(j=i.RGB32UI),N===i.BYTE&&(j=i.RGB8I),N===i.SHORT&&(j=i.RGB16I),N===i.INT&&(j=i.RGB32I)),g===i.RGBA_INTEGER&&(N===i.UNSIGNED_BYTE&&(j=i.RGBA8UI),N===i.UNSIGNED_SHORT&&(j=i.RGBA16UI),N===i.UNSIGNED_INT&&(j=i.RGBA32UI),N===i.BYTE&&(j=i.RGBA8I),N===i.SHORT&&(j=i.RGBA16I),N===i.INT&&(j=i.RGBA32I)),g===i.RGB&&N===i.UNSIGNED_INT_5_9_9_9_REV&&(j=i.RGB9_E5),g===i.RGBA){const ge=K?Kn:Ve.getTransfer(q);N===i.FLOAT&&(j=i.RGBA32F),N===i.HALF_FLOAT&&(j=i.RGBA16F),N===i.UNSIGNED_BYTE&&(j=ge===$e?i.SRGB8_ALPHA8:i.RGBA8),N===i.UNSIGNED_SHORT_4_4_4_4&&(j=i.RGBA4),N===i.UNSIGNED_SHORT_5_5_5_1&&(j=i.RGB5_A1)}return(j===i.R16F||j===i.R32F||j===i.RG16F||j===i.RG32F||j===i.RGBA16F||j===i.RGBA32F)&&e.get("EXT_color_buffer_float"),j}function E(M,g){let N;return M?g===null||g===ir||g===br?N=i.DEPTH24_STENCIL8:g===ti?N=i.DEPTH32F_STENCIL8:g===tn&&(N=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):g===null||g===ir||g===br?N=i.DEPTH_COMPONENT24:g===ti?N=i.DEPTH_COMPONENT32F:g===tn&&(N=i.DEPTH_COMPONENT16),N}function D(M,g){return m(M)===!0||M.isFramebufferTexture&&M.minFilter!==wt&&M.minFilter!==Bt?Math.log2(Math.max(g.width,g.height))+1:M.mipmaps!==void 0&&M.mipmaps.length>0?M.mipmaps.length:M.isCompressedTexture&&Array.isArray(M.image)?g.mipmaps.length:1}function U(M){const g=M.target;g.removeEventListener("dispose",U),I(g),g.isVideoTexture&&u.delete(g)}function A(M){const g=M.target;g.removeEventListener("dispose",A),y(g)}function I(M){const g=r.get(M);if(g.__webglInit===void 0)return;const N=M.source,q=d.get(N);if(q){const K=q[g.__cacheKey];K.usedTimes--,K.usedTimes===0&&S(M),Object.keys(q).length===0&&d.delete(N)}r.remove(M)}function S(M){const g=r.get(M);i.deleteTexture(g.__webglTexture);const N=M.source,q=d.get(N);delete q[g.__cacheKey],s.memory.textures--}function y(M){const g=r.get(M);if(M.depthTexture&&(M.depthTexture.dispose(),r.remove(M.depthTexture)),M.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(g.__webglFramebuffer[q]))for(let K=0;K<g.__webglFramebuffer[q].length;K++)i.deleteFramebuffer(g.__webglFramebuffer[q][K]);else i.deleteFramebuffer(g.__webglFramebuffer[q]);g.__webglDepthbuffer&&i.deleteRenderbuffer(g.__webglDepthbuffer[q])}else{if(Array.isArray(g.__webglFramebuffer))for(let q=0;q<g.__webglFramebuffer.length;q++)i.deleteFramebuffer(g.__webglFramebuffer[q]);else i.deleteFramebuffer(g.__webglFramebuffer);if(g.__webglDepthbuffer&&i.deleteRenderbuffer(g.__webglDepthbuffer),g.__webglMultisampledFramebuffer&&i.deleteFramebuffer(g.__webglMultisampledFramebuffer),g.__webglColorRenderbuffer)for(let q=0;q<g.__webglColorRenderbuffer.length;q++)g.__webglColorRenderbuffer[q]&&i.deleteRenderbuffer(g.__webglColorRenderbuffer[q]);g.__webglDepthRenderbuffer&&i.deleteRenderbuffer(g.__webglDepthRenderbuffer)}const N=M.textures;for(let q=0,K=N.length;q<K;q++){const j=r.get(N[q]);j.__webglTexture&&(i.deleteTexture(j.__webglTexture),s.memory.textures--),r.remove(N[q])}r.remove(M)}let C=0;function G(){C=0}function k(){const M=C;return M>=n.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+M+" texture units while this GPU supports only "+n.maxTextures),C+=1,M}function W(M){const g=[];return g.push(M.wrapS),g.push(M.wrapT),g.push(M.wrapR||0),g.push(M.magFilter),g.push(M.minFilter),g.push(M.anisotropy),g.push(M.internalFormat),g.push(M.format),g.push(M.type),g.push(M.generateMipmaps),g.push(M.premultiplyAlpha),g.push(M.flipY),g.push(M.unpackAlignment),g.push(M.colorSpace),g.join()}function Z(M,g){const N=r.get(M);if(M.isVideoTexture&&ve(M),M.isRenderTargetTexture===!1&&M.version>0&&N.__version!==M.version){const q=M.image;if(q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{X(N,M,g);return}}t.bindTexture(i.TEXTURE_2D,N.__webglTexture,i.TEXTURE0+g)}function V(M,g){const N=r.get(M);if(M.version>0&&N.__version!==M.version){X(N,M,g);return}t.bindTexture(i.TEXTURE_2D_ARRAY,N.__webglTexture,i.TEXTURE0+g)}function J(M,g){const N=r.get(M);if(M.version>0&&N.__version!==M.version){X(N,M,g);return}t.bindTexture(i.TEXTURE_3D,N.__webglTexture,i.TEXTURE0+g)}function H(M,g){const N=r.get(M);if(M.version>0&&N.__version!==M.version){ee(N,M,g);return}t.bindTexture(i.TEXTURE_CUBE_MAP,N.__webglTexture,i.TEXTURE0+g)}const te={[Qi]:i.REPEAT,[er]:i.CLAMP_TO_EDGE,[Es]:i.MIRRORED_REPEAT},pe={[wt]:i.NEAREST,[tg]:i.NEAREST_MIPMAP_NEAREST,[Wn]:i.NEAREST_MIPMAP_LINEAR,[Bt]:i.LINEAR,[Ts]:i.LINEAR_MIPMAP_NEAREST,[tr]:i.LINEAR_MIPMAP_LINEAR},Re={[lg]:i.NEVER,[fg]:i.ALWAYS,[cg]:i.LESS,[Dc]:i.LEQUAL,[ug]:i.EQUAL,[pg]:i.GEQUAL,[hg]:i.GREATER,[dg]:i.NOTEQUAL};function Ue(M,g){if(g.type===ti&&e.has("OES_texture_float_linear")===!1&&(g.magFilter===Bt||g.magFilter===Ts||g.magFilter===Wn||g.magFilter===tr||g.minFilter===Bt||g.minFilter===Ts||g.minFilter===Wn||g.minFilter===tr)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(M,i.TEXTURE_WRAP_S,te[g.wrapS]),i.texParameteri(M,i.TEXTURE_WRAP_T,te[g.wrapT]),(M===i.TEXTURE_3D||M===i.TEXTURE_2D_ARRAY)&&i.texParameteri(M,i.TEXTURE_WRAP_R,te[g.wrapR]),i.texParameteri(M,i.TEXTURE_MAG_FILTER,pe[g.magFilter]),i.texParameteri(M,i.TEXTURE_MIN_FILTER,pe[g.minFilter]),g.compareFunction&&(i.texParameteri(M,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(M,i.TEXTURE_COMPARE_FUNC,Re[g.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(g.magFilter===wt||g.minFilter!==Wn&&g.minFilter!==tr||g.type===ti&&e.has("OES_texture_float_linear")===!1)return;if(g.anisotropy>1||r.get(g).__currentAnisotropy){const N=e.get("EXT_texture_filter_anisotropic");i.texParameterf(M,N.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(g.anisotropy,n.getMaxAnisotropy())),r.get(g).__currentAnisotropy=g.anisotropy}}}function Ke(M,g){let N=!1;M.__webglInit===void 0&&(M.__webglInit=!0,g.addEventListener("dispose",U));const q=g.source;let K=d.get(q);K===void 0&&(K={},d.set(q,K));const j=W(g);if(j!==M.__cacheKey){K[j]===void 0&&(K[j]={texture:i.createTexture(),usedTimes:0},s.memory.textures++,N=!0),K[j].usedTimes++;const ge=K[M.__cacheKey];ge!==void 0&&(K[M.__cacheKey].usedTimes--,ge.usedTimes===0&&S(g)),M.__cacheKey=j,M.__webglTexture=K[j].texture}return N}function X(M,g,N){let q=i.TEXTURE_2D;(g.isDataArrayTexture||g.isCompressedArrayTexture)&&(q=i.TEXTURE_2D_ARRAY),g.isData3DTexture&&(q=i.TEXTURE_3D);const K=Ke(M,g),j=g.source;t.bindTexture(q,M.__webglTexture,i.TEXTURE0+N);const ge=r.get(j);if(j.version!==ge.__version||K===!0){t.activeTexture(i.TEXTURE0+N);const se=Ve.getPrimaries(Ve.workingColorSpace),de=g.colorSpace===Ci?null:Ve.getPrimaries(g.colorSpace),ke=g.colorSpace===Ci||se===de?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,g.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,g.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ke);let Q=x(g.image,!1,n.maxTextureSize);Q=it(g,Q);const ue=a.convert(g.format,g.colorSpace),ye=a.convert(g.type);let Ee=T(g.internalFormat,ue,ye,g.colorSpace,g.isVideoTexture);Ue(q,g);let he;const Fe=g.mipmaps,Pe=g.isVideoTexture!==!0,et=ge.__version===void 0||K===!0,R=j.dataReady,ne=D(g,Q);if(g.isDepthTexture)Ee=E(g.format===Ar,g.type),et&&(Pe?t.texStorage2D(i.TEXTURE_2D,1,Ee,Q.width,Q.height):t.texImage2D(i.TEXTURE_2D,0,Ee,Q.width,Q.height,0,ue,ye,null));else if(g.isDataTexture)if(Fe.length>0){Pe&&et&&t.texStorage2D(i.TEXTURE_2D,ne,Ee,Fe[0].width,Fe[0].height);for(let B=0,Y=Fe.length;B<Y;B++)he=Fe[B],Pe?R&&t.texSubImage2D(i.TEXTURE_2D,B,0,0,he.width,he.height,ue,ye,he.data):t.texImage2D(i.TEXTURE_2D,B,Ee,he.width,he.height,0,ue,ye,he.data);g.generateMipmaps=!1}else Pe?(et&&t.texStorage2D(i.TEXTURE_2D,ne,Ee,Q.width,Q.height),R&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,Q.width,Q.height,ue,ye,Q.data)):t.texImage2D(i.TEXTURE_2D,0,Ee,Q.width,Q.height,0,ue,ye,Q.data);else if(g.isCompressedTexture)if(g.isCompressedArrayTexture){Pe&&et&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ne,Ee,Fe[0].width,Fe[0].height,Q.depth);for(let B=0,Y=Fe.length;B<Y;B++)if(he=Fe[B],g.format!==kt)if(ue!==null)if(Pe){if(R)if(g.layerUpdates.size>0){const oe=fu(he.width,he.height,g.format,g.type);for(const ie of g.layerUpdates){const ze=he.data.subarray(ie*oe/he.data.BYTES_PER_ELEMENT,(ie+1)*oe/he.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,B,0,0,ie,he.width,he.height,1,ue,ze)}g.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,B,0,0,0,he.width,he.height,Q.depth,ue,he.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,B,Ee,he.width,he.height,Q.depth,0,he.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Pe?R&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,B,0,0,0,he.width,he.height,Q.depth,ue,ye,he.data):t.texImage3D(i.TEXTURE_2D_ARRAY,B,Ee,he.width,he.height,Q.depth,0,ue,ye,he.data)}else{Pe&&et&&t.texStorage2D(i.TEXTURE_2D,ne,Ee,Fe[0].width,Fe[0].height);for(let B=0,Y=Fe.length;B<Y;B++)he=Fe[B],g.format!==kt?ue!==null?Pe?R&&t.compressedTexSubImage2D(i.TEXTURE_2D,B,0,0,he.width,he.height,ue,he.data):t.compressedTexImage2D(i.TEXTURE_2D,B,Ee,he.width,he.height,0,he.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Pe?R&&t.texSubImage2D(i.TEXTURE_2D,B,0,0,he.width,he.height,ue,ye,he.data):t.texImage2D(i.TEXTURE_2D,B,Ee,he.width,he.height,0,ue,ye,he.data)}else if(g.isDataArrayTexture)if(Pe){if(et&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ne,Ee,Q.width,Q.height,Q.depth),R)if(g.layerUpdates.size>0){const B=fu(Q.width,Q.height,g.format,g.type);for(const Y of g.layerUpdates){const oe=Q.data.subarray(Y*B/Q.data.BYTES_PER_ELEMENT,(Y+1)*B/Q.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Y,Q.width,Q.height,1,ue,ye,oe)}g.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,Q.width,Q.height,Q.depth,ue,ye,Q.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Ee,Q.width,Q.height,Q.depth,0,ue,ye,Q.data);else if(g.isData3DTexture)Pe?(et&&t.texStorage3D(i.TEXTURE_3D,ne,Ee,Q.width,Q.height,Q.depth),R&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,Q.width,Q.height,Q.depth,ue,ye,Q.data)):t.texImage3D(i.TEXTURE_3D,0,Ee,Q.width,Q.height,Q.depth,0,ue,ye,Q.data);else if(g.isFramebufferTexture){if(et)if(Pe)t.texStorage2D(i.TEXTURE_2D,ne,Ee,Q.width,Q.height);else{let B=Q.width,Y=Q.height;for(let oe=0;oe<ne;oe++)t.texImage2D(i.TEXTURE_2D,oe,Ee,B,Y,0,ue,ye,null),B>>=1,Y>>=1}}else if(Fe.length>0){if(Pe&&et){const B=_e(Fe[0]);t.texStorage2D(i.TEXTURE_2D,ne,Ee,B.width,B.height)}for(let B=0,Y=Fe.length;B<Y;B++)he=Fe[B],Pe?R&&t.texSubImage2D(i.TEXTURE_2D,B,0,0,ue,ye,he):t.texImage2D(i.TEXTURE_2D,B,Ee,ue,ye,he);g.generateMipmaps=!1}else if(Pe){if(et){const B=_e(Q);t.texStorage2D(i.TEXTURE_2D,ne,Ee,B.width,B.height)}R&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ue,ye,Q)}else t.texImage2D(i.TEXTURE_2D,0,Ee,ue,ye,Q);m(g)&&p(q),ge.__version=j.version,g.onUpdate&&g.onUpdate(g)}M.__version=g.version}function ee(M,g,N){if(g.image.length!==6)return;const q=Ke(M,g),K=g.source;t.bindTexture(i.TEXTURE_CUBE_MAP,M.__webglTexture,i.TEXTURE0+N);const j=r.get(K);if(K.version!==j.__version||q===!0){t.activeTexture(i.TEXTURE0+N);const ge=Ve.getPrimaries(Ve.workingColorSpace),se=g.colorSpace===Ci?null:Ve.getPrimaries(g.colorSpace),de=g.colorSpace===Ci||ge===se?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,g.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,g.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,de);const ke=g.isCompressedTexture||g.image[0].isCompressedTexture,Q=g.image[0]&&g.image[0].isDataTexture,ue=[];for(let Y=0;Y<6;Y++)!ke&&!Q?ue[Y]=x(g.image[Y],!0,n.maxCubemapSize):ue[Y]=Q?g.image[Y].image:g.image[Y],ue[Y]=it(g,ue[Y]);const ye=ue[0],Ee=a.convert(g.format,g.colorSpace),he=a.convert(g.type),Fe=T(g.internalFormat,Ee,he,g.colorSpace),Pe=g.isVideoTexture!==!0,et=j.__version===void 0||q===!0,R=K.dataReady;let ne=D(g,ye);Ue(i.TEXTURE_CUBE_MAP,g);let B;if(ke){Pe&&et&&t.texStorage2D(i.TEXTURE_CUBE_MAP,ne,Fe,ye.width,ye.height);for(let Y=0;Y<6;Y++){B=ue[Y].mipmaps;for(let oe=0;oe<B.length;oe++){const ie=B[oe];g.format!==kt?Ee!==null?Pe?R&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,oe,0,0,ie.width,ie.height,Ee,ie.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,oe,Fe,ie.width,ie.height,0,ie.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Pe?R&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,oe,0,0,ie.width,ie.height,Ee,he,ie.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,oe,Fe,ie.width,ie.height,0,Ee,he,ie.data)}}}else{if(B=g.mipmaps,Pe&&et){B.length>0&&ne++;const Y=_e(ue[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,ne,Fe,Y.width,Y.height)}for(let Y=0;Y<6;Y++)if(Q){Pe?R&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,0,0,ue[Y].width,ue[Y].height,Ee,he,ue[Y].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,Fe,ue[Y].width,ue[Y].height,0,Ee,he,ue[Y].data);for(let oe=0;oe<B.length;oe++){const ie=B[oe].image[Y].image;Pe?R&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,oe+1,0,0,ie.width,ie.height,Ee,he,ie.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,oe+1,Fe,ie.width,ie.height,0,Ee,he,ie.data)}}else{Pe?R&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,0,0,Ee,he,ue[Y]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,Fe,Ee,he,ue[Y]);for(let oe=0;oe<B.length;oe++){const ie=B[oe];Pe?R&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,oe+1,0,0,Ee,he,ie.image[Y]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,oe+1,Fe,Ee,he,ie.image[Y])}}}m(g)&&p(i.TEXTURE_CUBE_MAP),j.__version=K.version,g.onUpdate&&g.onUpdate(g)}M.__version=g.version}function me(M,g,N,q,K,j){const ge=a.convert(N.format,N.colorSpace),se=a.convert(N.type),de=T(N.internalFormat,ge,se,N.colorSpace),ke=r.get(g),Q=r.get(N);if(Q.__renderTarget=g,!ke.__hasExternalTextures){const ue=Math.max(1,g.width>>j),ye=Math.max(1,g.height>>j);K===i.TEXTURE_3D||K===i.TEXTURE_2D_ARRAY?t.texImage3D(K,j,de,ue,ye,g.depth,0,ge,se,null):t.texImage2D(K,j,de,ue,ye,0,ge,se,null)}t.bindFramebuffer(i.FRAMEBUFFER,M),Oe(g)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,q,K,Q.__webglTexture,0,Ne(g)):(K===i.TEXTURE_2D||K>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,q,K,Q.__webglTexture,j),t.bindFramebuffer(i.FRAMEBUFFER,null)}function ae(M,g,N){if(i.bindRenderbuffer(i.RENDERBUFFER,M),g.depthBuffer){const q=g.depthTexture,K=q&&q.isDepthTexture?q.type:null,j=E(g.stencilBuffer,K),ge=g.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,se=Ne(g);Oe(g)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,se,j,g.width,g.height):N?i.renderbufferStorageMultisample(i.RENDERBUFFER,se,j,g.width,g.height):i.renderbufferStorage(i.RENDERBUFFER,j,g.width,g.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,ge,i.RENDERBUFFER,M)}else{const q=g.textures;for(let K=0;K<q.length;K++){const j=q[K],ge=a.convert(j.format,j.colorSpace),se=a.convert(j.type),de=T(j.internalFormat,ge,se,j.colorSpace),ke=Ne(g);N&&Oe(g)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,ke,de,g.width,g.height):Oe(g)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ke,de,g.width,g.height):i.renderbufferStorage(i.RENDERBUFFER,de,g.width,g.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Se(M,g){if(g&&g.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,M),!(g.depthTexture&&g.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const N=r.get(g.depthTexture);N.__renderTarget=g,(!N.__webglTexture||g.depthTexture.image.width!==g.width||g.depthTexture.image.height!==g.height)&&(g.depthTexture.image.width=g.width,g.depthTexture.image.height=g.height,g.depthTexture.needsUpdate=!0),Z(g.depthTexture,0);const q=N.__webglTexture,K=Ne(g);if(g.depthTexture.format===wr)Oe(g)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,q,0,K):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,q,0);else if(g.depthTexture.format===Ar)Oe(g)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,q,0,K):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,q,0);else throw new Error("Unknown depthTexture format")}function Ce(M){const g=r.get(M),N=M.isWebGLCubeRenderTarget===!0;if(g.__boundDepthTexture!==M.depthTexture){const q=M.depthTexture;if(g.__depthDisposeCallback&&g.__depthDisposeCallback(),q){const K=()=>{delete g.__boundDepthTexture,delete g.__depthDisposeCallback,q.removeEventListener("dispose",K)};q.addEventListener("dispose",K),g.__depthDisposeCallback=K}g.__boundDepthTexture=q}if(M.depthTexture&&!g.__autoAllocateDepthBuffer){if(N)throw new Error("target.depthTexture not supported in Cube render targets");Se(g.__webglFramebuffer,M)}else if(N){g.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(t.bindFramebuffer(i.FRAMEBUFFER,g.__webglFramebuffer[q]),g.__webglDepthbuffer[q]===void 0)g.__webglDepthbuffer[q]=i.createRenderbuffer(),ae(g.__webglDepthbuffer[q],M,!1);else{const K=M.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,j=g.__webglDepthbuffer[q];i.bindRenderbuffer(i.RENDERBUFFER,j),i.framebufferRenderbuffer(i.FRAMEBUFFER,K,i.RENDERBUFFER,j)}}else if(t.bindFramebuffer(i.FRAMEBUFFER,g.__webglFramebuffer),g.__webglDepthbuffer===void 0)g.__webglDepthbuffer=i.createRenderbuffer(),ae(g.__webglDepthbuffer,M,!1);else{const q=M.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,K=g.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,K),i.framebufferRenderbuffer(i.FRAMEBUFFER,q,i.RENDERBUFFER,K)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function De(M,g,N){const q=r.get(M);g!==void 0&&me(q.__webglFramebuffer,M,M.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),N!==void 0&&Ce(M)}function at(M){const g=M.texture,N=r.get(M),q=r.get(g);M.addEventListener("dispose",A);const K=M.textures,j=M.isWebGLCubeRenderTarget===!0,ge=K.length>1;if(ge||(q.__webglTexture===void 0&&(q.__webglTexture=i.createTexture()),q.__version=g.version,s.memory.textures++),j){N.__webglFramebuffer=[];for(let se=0;se<6;se++)if(g.mipmaps&&g.mipmaps.length>0){N.__webglFramebuffer[se]=[];for(let de=0;de<g.mipmaps.length;de++)N.__webglFramebuffer[se][de]=i.createFramebuffer()}else N.__webglFramebuffer[se]=i.createFramebuffer()}else{if(g.mipmaps&&g.mipmaps.length>0){N.__webglFramebuffer=[];for(let se=0;se<g.mipmaps.length;se++)N.__webglFramebuffer[se]=i.createFramebuffer()}else N.__webglFramebuffer=i.createFramebuffer();if(ge)for(let se=0,de=K.length;se<de;se++){const ke=r.get(K[se]);ke.__webglTexture===void 0&&(ke.__webglTexture=i.createTexture(),s.memory.textures++)}if(M.samples>0&&Oe(M)===!1){N.__webglMultisampledFramebuffer=i.createFramebuffer(),N.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,N.__webglMultisampledFramebuffer);for(let se=0;se<K.length;se++){const de=K[se];N.__webglColorRenderbuffer[se]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,N.__webglColorRenderbuffer[se]);const ke=a.convert(de.format,de.colorSpace),Q=a.convert(de.type),ue=T(de.internalFormat,ke,Q,de.colorSpace,M.isXRRenderTarget===!0),ye=Ne(M);i.renderbufferStorageMultisample(i.RENDERBUFFER,ye,ue,M.width,M.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+se,i.RENDERBUFFER,N.__webglColorRenderbuffer[se])}i.bindRenderbuffer(i.RENDERBUFFER,null),M.depthBuffer&&(N.__webglDepthRenderbuffer=i.createRenderbuffer(),ae(N.__webglDepthRenderbuffer,M,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(j){t.bindTexture(i.TEXTURE_CUBE_MAP,q.__webglTexture),Ue(i.TEXTURE_CUBE_MAP,g);for(let se=0;se<6;se++)if(g.mipmaps&&g.mipmaps.length>0)for(let de=0;de<g.mipmaps.length;de++)me(N.__webglFramebuffer[se][de],M,g,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+se,de);else me(N.__webglFramebuffer[se],M,g,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0);m(g)&&p(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ge){for(let se=0,de=K.length;se<de;se++){const ke=K[se],Q=r.get(ke);t.bindTexture(i.TEXTURE_2D,Q.__webglTexture),Ue(i.TEXTURE_2D,ke),me(N.__webglFramebuffer,M,ke,i.COLOR_ATTACHMENT0+se,i.TEXTURE_2D,0),m(ke)&&p(i.TEXTURE_2D)}t.unbindTexture()}else{let se=i.TEXTURE_2D;if((M.isWebGL3DRenderTarget||M.isWebGLArrayRenderTarget)&&(se=M.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(se,q.__webglTexture),Ue(se,g),g.mipmaps&&g.mipmaps.length>0)for(let de=0;de<g.mipmaps.length;de++)me(N.__webglFramebuffer[de],M,g,i.COLOR_ATTACHMENT0,se,de);else me(N.__webglFramebuffer,M,g,i.COLOR_ATTACHMENT0,se,0);m(g)&&p(se),t.unbindTexture()}M.depthBuffer&&Ce(M)}function Be(M){const g=M.textures;for(let N=0,q=g.length;N<q;N++){const K=g[N];if(m(K)){const j=w(M),ge=r.get(K).__webglTexture;t.bindTexture(j,ge),p(j),t.unbindTexture()}}}const ot=[],b=[];function It(M){if(M.samples>0){if(Oe(M)===!1){const g=M.textures,N=M.width,q=M.height;let K=i.COLOR_BUFFER_BIT;const j=M.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ge=r.get(M),se=g.length>1;if(se)for(let de=0;de<g.length;de++)t.bindFramebuffer(i.FRAMEBUFFER,ge.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+de,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,ge.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+de,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,ge.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ge.__webglFramebuffer);for(let de=0;de<g.length;de++){if(M.resolveDepthBuffer&&(M.depthBuffer&&(K|=i.DEPTH_BUFFER_BIT),M.stencilBuffer&&M.resolveStencilBuffer&&(K|=i.STENCIL_BUFFER_BIT)),se){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ge.__webglColorRenderbuffer[de]);const ke=r.get(g[de]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,ke,0)}i.blitFramebuffer(0,0,N,q,0,0,N,q,K,i.NEAREST),l===!0&&(ot.length=0,b.length=0,ot.push(i.COLOR_ATTACHMENT0+de),M.depthBuffer&&M.resolveDepthBuffer===!1&&(ot.push(j),b.push(j),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,b)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ot))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),se)for(let de=0;de<g.length;de++){t.bindFramebuffer(i.FRAMEBUFFER,ge.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+de,i.RENDERBUFFER,ge.__webglColorRenderbuffer[de]);const ke=r.get(g[de]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,ge.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+de,i.TEXTURE_2D,ke,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ge.__webglMultisampledFramebuffer)}else if(M.depthBuffer&&M.resolveDepthBuffer===!1&&l){const g=M.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[g])}}}function Ne(M){return Math.min(n.maxSamples,M.samples)}function Oe(M){const g=r.get(M);return M.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&g.__useRenderToTexture!==!1}function ve(M){const g=s.render.frame;u.get(M)!==g&&(u.set(M,g),M.update())}function it(M,g){const N=M.colorSpace,q=M.format,K=M.type;return M.isCompressedTexture===!0||M.isVideoTexture===!0||N!==Rr&&N!==Ci&&(Ve.getTransfer(N)===$e?(q!==kt||K!==di)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",N)),g}function _e(M){return typeof HTMLImageElement<"u"&&M instanceof HTMLImageElement?(c.width=M.naturalWidth||M.width,c.height=M.naturalHeight||M.height):typeof VideoFrame<"u"&&M instanceof VideoFrame?(c.width=M.displayWidth,c.height=M.displayHeight):(c.width=M.width,c.height=M.height),c}this.allocateTextureUnit=k,this.resetTextureUnits=G,this.setTexture2D=Z,this.setTexture2DArray=V,this.setTexture3D=J,this.setTextureCube=H,this.rebindTextures=De,this.setupRenderTarget=at,this.updateRenderTargetMipmap=Be,this.updateMultisampleRenderTarget=It,this.setupDepthRenderbuffer=Ce,this.setupFrameBufferTexture=me,this.useMultisampledRTT=Oe}function by(i,e){function t(r,n=Ci){let a;const s=Ve.getTransfer(n);if(r===di)return i.UNSIGNED_BYTE;if(r===ws)return i.UNSIGNED_SHORT_4_4_4_4;if(r===As)return i.UNSIGNED_SHORT_5_5_5_1;if(r===Tc)return i.UNSIGNED_INT_5_9_9_9_REV;if(r===Mc)return i.BYTE;if(r===Ec)return i.SHORT;if(r===tn)return i.UNSIGNED_SHORT;if(r===bs)return i.INT;if(r===ir)return i.UNSIGNED_INT;if(r===ti)return i.FLOAT;if(r===rn)return i.HALF_FLOAT;if(r===bc)return i.ALPHA;if(r===wc)return i.RGB;if(r===kt)return i.RGBA;if(r===Ac)return i.LUMINANCE;if(r===Rc)return i.LUMINANCE_ALPHA;if(r===wr)return i.DEPTH_COMPONENT;if(r===Ar)return i.DEPTH_STENCIL;if(r===Cc)return i.RED;if(r===Rs)return i.RED_INTEGER;if(r===Pc)return i.RG;if(r===Cs)return i.RG_INTEGER;if(r===Ps)return i.RGBA_INTEGER;if(r===Xn||r===jn||r===qn||r===Yn)if(s===$e)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(r===Xn)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===jn)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===qn)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===Yn)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(r===Xn)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===jn)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===qn)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===Yn)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===Ls||r===Us||r===Ds||r===Is)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(r===Ls)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===Us)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===Ds)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===Is)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===Ns||r===Os||r===Fs)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(r===Ns||r===Os)return s===$e?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(r===Fs)return s===$e?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===zs||r===Bs||r===ks||r===Hs||r===Gs||r===Vs||r===Ws||r===Xs||r===js||r===qs||r===Ys||r===$s||r===Ks||r===Zs)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(r===zs)return s===$e?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===Bs)return s===$e?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===ks)return s===$e?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===Hs)return s===$e?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===Gs)return s===$e?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===Vs)return s===$e?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===Ws)return s===$e?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===Xs)return s===$e?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===js)return s===$e?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===qs)return s===$e?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===Ys)return s===$e?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===$s)return s===$e?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===Ks)return s===$e?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===Zs)return s===$e?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===$n||r===Js||r===Qs)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(r===$n)return s===$e?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===Js)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===Qs)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===Lc||r===eo||r===to||r===io)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(r===$n)return a.COMPRESSED_RED_RGTC1_EXT;if(r===eo)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===to)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===io)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===br?i.UNSIGNED_INT_24_8:i[r]!==void 0?i[r]:null}return{convert:t}}const wy={type:"move"};class Fo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ya,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ya,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new F,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new F),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ya,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new F,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new F),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const r of e.hand.values())this._getHandJoint(t,r)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,r){let n=null,a=null,s=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){s=!0;for(const x of e.hand.values()){const m=t.getJointPose(x,r),p=this._getHandJoint(c,x);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],d=u.position.distanceTo(h.position),f=.02,v=.005;c.inputState.pinching&&d>f+v?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-v&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(a=t.getPose(e.gripSpace,r),a!==null&&(l.matrix.fromArray(a.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,a.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(a.linearVelocity)):l.hasLinearVelocity=!1,a.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(a.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(n=t.getPose(e.targetRaySpace,r),n===null&&a!==null&&(n=a),n!==null&&(o.matrix.fromArray(n.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,n.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(n.linearVelocity)):o.hasLinearVelocity=!1,n.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(n.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(wy)))}return o!==null&&(o.visible=n!==null),l!==null&&(l.visible=a!==null),c!==null&&(c.visible=s!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const r=new ya;r.matrixAutoUpdate=!1,r.visible=!1,e.joints[t.jointName]=r,e.add(r)}return e.joints[t.jointName]}}const Ay=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Ry=`
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

}`;class Cy{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,r){if(this.texture===null){const n=new _t,a=e.properties.get(n);a.__webglTexture=t.texture,(t.depthNear!==r.depthNear||t.depthFar!==r.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,r=new ri({vertexShader:Ay,fragmentShader:Ry,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ii(new yn(20,20),r)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Py extends Pr{constructor(e,t){super();const r=this;let n=null,a=1,s=null,o="local-floor",l=1,c=null,u=null,h=null,d=null,f=null,v=null;const x=new Cy,m=t.getContextAttributes();let p=null,w=null;const T=[],E=[],D=new Qe;let U=null;const A=new Vt;A.viewport=new lt;const I=new Vt;I.viewport=new lt;const S=[A,I],y=new Zg;let C=null,G=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let ee=T[X];return ee===void 0&&(ee=new Fo,T[X]=ee),ee.getTargetRaySpace()},this.getControllerGrip=function(X){let ee=T[X];return ee===void 0&&(ee=new Fo,T[X]=ee),ee.getGripSpace()},this.getHand=function(X){let ee=T[X];return ee===void 0&&(ee=new Fo,T[X]=ee),ee.getHandSpace()};function k(X){const ee=E.indexOf(X.inputSource);if(ee===-1)return;const me=T[ee];me!==void 0&&(me.update(X.inputSource,X.frame,c||s),me.dispatchEvent({type:X.type,data:X.inputSource}))}function W(){n.removeEventListener("select",k),n.removeEventListener("selectstart",k),n.removeEventListener("selectend",k),n.removeEventListener("squeeze",k),n.removeEventListener("squeezestart",k),n.removeEventListener("squeezeend",k),n.removeEventListener("end",W),n.removeEventListener("inputsourceschange",Z);for(let X=0;X<T.length;X++){const ee=E[X];ee!==null&&(E[X]=null,T[X].disconnect(ee))}C=null,G=null,x.reset(),e.setRenderTarget(p),f=null,d=null,h=null,n=null,w=null,Ke.stop(),r.isPresenting=!1,e.setPixelRatio(U),e.setSize(D.width,D.height,!1),r.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){a=X,r.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){o=X,r.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||s},this.setReferenceSpace=function(X){c=X},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return h},this.getFrame=function(){return v},this.getSession=function(){return n},this.setSession=async function(X){if(n=X,n!==null){if(p=e.getRenderTarget(),n.addEventListener("select",k),n.addEventListener("selectstart",k),n.addEventListener("selectend",k),n.addEventListener("squeeze",k),n.addEventListener("squeezestart",k),n.addEventListener("squeezeend",k),n.addEventListener("end",W),n.addEventListener("inputsourceschange",Z),m.xrCompatible!==!0&&await t.makeXRCompatible(),U=e.getPixelRatio(),e.getSize(D),n.enabledFeatures!==void 0&&n.enabledFeatures.includes("layers")){let ee=null,me=null,ae=null;m.depth&&(ae=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ee=m.stencil?Ar:wr,me=m.stencil?br:ir);const Se={colorFormat:t.RGBA8,depthFormat:ae,scaleFactor:a};h=new XRWebGLBinding(n,t),d=h.createProjectionLayer(Se),n.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),w=new Pi(d.textureWidth,d.textureHeight,{format:kt,type:di,depthTexture:new pu(d.textureWidth,d.textureHeight,me,void 0,void 0,void 0,void 0,void 0,void 0,ee),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}else{const ee={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:a};f=new XRWebGLLayer(n,t,ee),n.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),w=new Pi(f.framebufferWidth,f.framebufferHeight,{format:kt,type:di,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}w.isXRRenderTarget=!0,this.setFoveation(l),c=null,s=await n.requestReferenceSpace(o),Ke.setContext(n),Ke.start(),r.isPresenting=!0,r.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(n!==null)return n.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function Z(X){for(let ee=0;ee<X.removed.length;ee++){const me=X.removed[ee],ae=E.indexOf(me);ae>=0&&(E[ae]=null,T[ae].disconnect(me))}for(let ee=0;ee<X.added.length;ee++){const me=X.added[ee];let ae=E.indexOf(me);if(ae===-1){for(let Ce=0;Ce<T.length;Ce++)if(Ce>=E.length){E.push(me),ae=Ce;break}else if(E[Ce]===null){E[Ce]=me,ae=Ce;break}if(ae===-1)break}const Se=T[ae];Se&&Se.connect(me)}}const V=new F,J=new F;function H(X,ee,me){V.setFromMatrixPosition(ee.matrixWorld),J.setFromMatrixPosition(me.matrixWorld);const ae=V.distanceTo(J),Se=ee.projectionMatrix.elements,Ce=me.projectionMatrix.elements,De=Se[14]/(Se[10]-1),at=Se[14]/(Se[10]+1),Be=(Se[9]+1)/Se[5],ot=(Se[9]-1)/Se[5],b=(Se[8]-1)/Se[0],It=(Ce[8]+1)/Ce[0],Ne=De*b,Oe=De*It,ve=ae/(-b+It),it=ve*-b;if(ee.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(it),X.translateZ(ve),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert(),Se[10]===-1)X.projectionMatrix.copy(ee.projectionMatrix),X.projectionMatrixInverse.copy(ee.projectionMatrixInverse);else{const _e=De+ve,M=at+ve,g=Ne-it,N=Oe+(ae-it),q=Be*at/M*_e,K=ot*at/M*_e;X.projectionMatrix.makePerspective(g,N,q,K,_e,M),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}}function te(X,ee){ee===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(ee.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(n===null)return;let ee=X.near,me=X.far;x.texture!==null&&(x.depthNear>0&&(ee=x.depthNear),x.depthFar>0&&(me=x.depthFar)),y.near=I.near=A.near=ee,y.far=I.far=A.far=me,(C!==y.near||G!==y.far)&&(n.updateRenderState({depthNear:y.near,depthFar:y.far}),C=y.near,G=y.far),A.layers.mask=X.layers.mask|2,I.layers.mask=X.layers.mask|4,y.layers.mask=A.layers.mask|I.layers.mask;const ae=X.parent,Se=y.cameras;te(y,ae);for(let Ce=0;Ce<Se.length;Ce++)te(Se[Ce],ae);Se.length===2?H(y,A,I):y.projectionMatrix.copy(A.projectionMatrix),pe(X,y,ae)};function pe(X,ee,me){me===null?X.matrix.copy(ee.matrixWorld):(X.matrix.copy(me.matrixWorld),X.matrix.invert(),X.matrix.multiply(ee.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(ee.projectionMatrix),X.projectionMatrixInverse.copy(ee.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=no*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(X){l=X,d!==null&&(d.fixedFoveation=X),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=X)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(y)};let Re=null;function Ue(X,ee){if(u=ee.getViewerPose(c||s),v=ee,u!==null){const me=u.views;f!==null&&(e.setRenderTargetFramebuffer(w,f.framebuffer),e.setRenderTarget(w));let ae=!1;me.length!==y.cameras.length&&(y.cameras.length=0,ae=!0);for(let Ce=0;Ce<me.length;Ce++){const De=me[Ce];let at=null;if(f!==null)at=f.getViewport(De);else{const ot=h.getViewSubImage(d,De);at=ot.viewport,Ce===0&&(e.setRenderTargetTextures(w,ot.colorTexture,d.ignoreDepthValues?void 0:ot.depthStencilTexture),e.setRenderTarget(w))}let Be=S[Ce];Be===void 0&&(Be=new Vt,Be.layers.enable(Ce),Be.viewport=new lt,S[Ce]=Be),Be.matrix.fromArray(De.transform.matrix),Be.matrix.decompose(Be.position,Be.quaternion,Be.scale),Be.projectionMatrix.fromArray(De.projectionMatrix),Be.projectionMatrixInverse.copy(Be.projectionMatrix).invert(),Be.viewport.set(at.x,at.y,at.width,at.height),Ce===0&&(y.matrix.copy(Be.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),ae===!0&&y.cameras.push(Be)}const Se=n.enabledFeatures;if(Se&&Se.includes("depth-sensing")){const Ce=h.getDepthInformation(me[0]);Ce&&Ce.isValid&&Ce.texture&&x.init(e,Ce,n.renderState)}}for(let me=0;me<T.length;me++){const ae=E[me],Se=T[me];ae!==null&&Se!==void 0&&Se.update(ae,ee,c||s)}Re&&Re(X,ee),ee.detectedPlanes&&r.dispatchEvent({type:"planesdetected",data:ee}),v=null}const Ke=new mu;Ke.setAnimationLoop(Ue),this.setAnimationLoop=function(X){Re=X},this.dispose=function(){}}}const dr=new Si,Ly=new ct;function Uy(i,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function r(m,p){p.color.getRGB(m.fogColor.value,su(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function n(m,p,w,T,E){p.isMeshBasicMaterial||p.isMeshLambertMaterial?a(m,p):p.isMeshToonMaterial?(a(m,p),h(m,p)):p.isMeshPhongMaterial?(a(m,p),u(m,p)):p.isMeshStandardMaterial?(a(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,E)):p.isMeshMatcapMaterial?(a(m,p),v(m,p)):p.isMeshDepthMaterial?a(m,p):p.isMeshDistanceMaterial?(a(m,p),x(m,p)):p.isMeshNormalMaterial?a(m,p):p.isLineBasicMaterial?(s(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,w,T):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function a(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===bt&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===bt&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const w=e.get(p),T=w.envMap,E=w.envMapRotation;T&&(m.envMap.value=T,dr.copy(E),dr.x*=-1,dr.y*=-1,dr.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1&&(dr.y*=-1,dr.z*=-1),m.envMapRotation.value.setFromMatrix4(Ly.makeRotationFromEuler(dr)),m.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function s(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,w,T){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*w,m.scale.value=T*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function h(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,w){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===bt&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=w.texture,m.transmissionSamplerSize.value.set(w.width,w.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function v(m,p){p.matcap&&(m.matcap.value=p.matcap)}function x(m,p){const w=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(w.matrixWorld),m.nearDistance.value=w.shadow.camera.near,m.farDistance.value=w.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:n}}function Dy(i,e,t,r){let n={},a={},s=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(w,T){const E=T.program;r.uniformBlockBinding(w,E)}function c(w,T){let E=n[w.id];E===void 0&&(v(w),E=u(w),n[w.id]=E,w.addEventListener("dispose",m));const D=T.program;r.updateUBOMapping(w,D);const U=e.render.frame;a[w.id]!==U&&(d(w),a[w.id]=U)}function u(w){const T=h();w.__bindingPointIndex=T;const E=i.createBuffer(),D=w.__size,U=w.usage;return i.bindBuffer(i.UNIFORM_BUFFER,E),i.bufferData(i.UNIFORM_BUFFER,D,U),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,T,E),E}function h(){for(let w=0;w<o;w++)if(s.indexOf(w)===-1)return s.push(w),w;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(w){const T=n[w.id],E=w.uniforms,D=w.__cache;i.bindBuffer(i.UNIFORM_BUFFER,T);for(let U=0,A=E.length;U<A;U++){const I=Array.isArray(E[U])?E[U]:[E[U]];for(let S=0,y=I.length;S<y;S++){const C=I[S];if(f(C,U,S,D)===!0){const G=C.__offset,k=Array.isArray(C.value)?C.value:[C.value];let W=0;for(let Z=0;Z<k.length;Z++){const V=k[Z],J=x(V);typeof V=="number"||typeof V=="boolean"?(C.__data[0]=V,i.bufferSubData(i.UNIFORM_BUFFER,G+W,C.__data)):V.isMatrix3?(C.__data[0]=V.elements[0],C.__data[1]=V.elements[1],C.__data[2]=V.elements[2],C.__data[3]=0,C.__data[4]=V.elements[3],C.__data[5]=V.elements[4],C.__data[6]=V.elements[5],C.__data[7]=0,C.__data[8]=V.elements[6],C.__data[9]=V.elements[7],C.__data[10]=V.elements[8],C.__data[11]=0):(V.toArray(C.__data,W),W+=J.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,G,C.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(w,T,E,D){const U=w.value,A=T+"_"+E;if(D[A]===void 0)return typeof U=="number"||typeof U=="boolean"?D[A]=U:D[A]=U.clone(),!0;{const I=D[A];if(typeof U=="number"||typeof U=="boolean"){if(I!==U)return D[A]=U,!0}else if(I.equals(U)===!1)return I.copy(U),!0}return!1}function v(w){const T=w.uniforms;let E=0;const D=16;for(let A=0,I=T.length;A<I;A++){const S=Array.isArray(T[A])?T[A]:[T[A]];for(let y=0,C=S.length;y<C;y++){const G=S[y],k=Array.isArray(G.value)?G.value:[G.value];for(let W=0,Z=k.length;W<Z;W++){const V=k[W],J=x(V),H=E%D,te=H%J.boundary,pe=H+te;E+=te,pe!==0&&D-pe<J.storage&&(E+=D-pe),G.__data=new Float32Array(J.storage/Float32Array.BYTES_PER_ELEMENT),G.__offset=E,E+=J.storage}}}const U=E%D;return U>0&&(E+=D-U),w.__size=E,w.__cache={},this}function x(w){const T={boundary:0,storage:0};return typeof w=="number"||typeof w=="boolean"?(T.boundary=4,T.storage=4):w.isVector2?(T.boundary=8,T.storage=8):w.isVector3||w.isColor?(T.boundary=16,T.storage=12):w.isVector4?(T.boundary=16,T.storage=16):w.isMatrix3?(T.boundary=48,T.storage=48):w.isMatrix4?(T.boundary=64,T.storage=64):w.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",w),T}function m(w){const T=w.target;T.removeEventListener("dispose",m);const E=s.indexOf(T.__bindingPointIndex);s.splice(E,1),i.deleteBuffer(n[T.id]),delete n[T.id],delete a[T.id]}function p(){for(const w in n)i.deleteBuffer(n[w]);s=[],n={},a={}}return{bind:l,update:c,dispose:p}}class Iy{constructor(e={}){const{canvas:t=gg(),context:r=null,depth:n=!0,stencil:a=!1,alpha:s=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reverseDepthBuffer:d=!1}=e;this.isWebGLRenderer=!0;let f;if(r!==null){if(typeof WebGLRenderingContext<"u"&&r instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=r.getContextAttributes().alpha}else f=s;const v=new Uint32Array(4),x=new Int32Array(4);let m=null,p=null;const w=[],T=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ht,this.toneMapping=Ri,this.toneMappingExposure=1;const E=this;let D=!1,U=0,A=0,I=null,S=-1,y=null;const C=new lt,G=new lt;let k=null;const W=new Xe(0);let Z=0,V=t.width,J=t.height,H=1,te=null,pe=null;const Re=new lt(0,0,V,J),Ue=new lt(0,0,V,J);let Ke=!1;const X=new uu;let ee=!1,me=!1;this.transmissionResolutionScale=1;const ae=new ct,Se=new ct,Ce=new F,De=new lt,at={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Be=!1;function ot(){return I===null?H:1}let b=r;function It(_,L){return t.getContext(_,L)}try{const _={alpha:!0,depth:n,stencil:a,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${hs}`),t.addEventListener("webglcontextlost",Y,!1),t.addEventListener("webglcontextrestored",oe,!1),t.addEventListener("webglcontextcreationerror",ie,!1),b===null){const L="webgl2";if(b=It(L,_),b===null)throw It(L)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(_){throw console.error("THREE.WebGLRenderer: "+_.message),_}let Ne,Oe,ve,it,_e,M,g,N,q,K,j,ge,se,de,ke,Q,ue,ye,Ee,he,Fe,Pe,et,R;function ne(){Ne=new V0(b),Ne.init(),Pe=new by(b,Ne),Oe=new F0(b,Ne,e,Pe),ve=new Ey(b,Ne),Oe.reverseDepthBuffer&&d&&ve.buffers.depth.setReversed(!0),it=new j0(b),_e=new uy,M=new Ty(b,Ne,ve,_e,Oe,Pe,it),g=new B0(E),N=new G0(E),q=new Qg(b),et=new N0(b,q),K=new W0(b,q,it,et),j=new Y0(b,K,q,it),Ee=new q0(b,Oe,M),Q=new z0(_e),ge=new cy(E,g,N,Ne,Oe,et,Q),se=new Uy(E,_e),de=new dy,ke=new vy(Ne),ye=new I0(E,g,N,ve,j,f,l),ue=new Sy(E,j,Oe),R=new Dy(b,it,Oe,ve),he=new O0(b,Ne,it),Fe=new X0(b,Ne,it),it.programs=ge.programs,E.capabilities=Oe,E.extensions=Ne,E.properties=_e,E.renderLists=de,E.shadowMap=ue,E.state=ve,E.info=it}ne();const B=new Py(E,b);this.xr=B,this.getContext=function(){return b},this.getContextAttributes=function(){return b.getContextAttributes()},this.forceContextLoss=function(){const _=Ne.get("WEBGL_lose_context");_&&_.loseContext()},this.forceContextRestore=function(){const _=Ne.get("WEBGL_lose_context");_&&_.restoreContext()},this.getPixelRatio=function(){return H},this.setPixelRatio=function(_){_!==void 0&&(H=_,this.setSize(V,J,!1))},this.getSize=function(_){return _.set(V,J)},this.setSize=function(_,L,O=!0){if(B.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}V=_,J=L,t.width=Math.floor(_*H),t.height=Math.floor(L*H),O===!0&&(t.style.width=_+"px",t.style.height=L+"px"),this.setViewport(0,0,_,L)},this.getDrawingBufferSize=function(_){return _.set(V*H,J*H).floor()},this.setDrawingBufferSize=function(_,L,O){V=_,J=L,H=O,t.width=Math.floor(_*O),t.height=Math.floor(L*O),this.setViewport(0,0,_,L)},this.getCurrentViewport=function(_){return _.copy(C)},this.getViewport=function(_){return _.copy(Re)},this.setViewport=function(_,L,O,z){_.isVector4?Re.set(_.x,_.y,_.z,_.w):Re.set(_,L,O,z),ve.viewport(C.copy(Re).multiplyScalar(H).round())},this.getScissor=function(_){return _.copy(Ue)},this.setScissor=function(_,L,O,z){_.isVector4?Ue.set(_.x,_.y,_.z,_.w):Ue.set(_,L,O,z),ve.scissor(G.copy(Ue).multiplyScalar(H).round())},this.getScissorTest=function(){return Ke},this.setScissorTest=function(_){ve.setScissorTest(Ke=_)},this.setOpaqueSort=function(_){te=_},this.setTransparentSort=function(_){pe=_},this.getClearColor=function(_){return _.copy(ye.getClearColor())},this.setClearColor=function(){ye.setClearColor.apply(ye,arguments)},this.getClearAlpha=function(){return ye.getClearAlpha()},this.setClearAlpha=function(){ye.setClearAlpha.apply(ye,arguments)},this.clear=function(_=!0,L=!0,O=!0){let z=0;if(_){let P=!1;if(I!==null){const $=I.texture.format;P=$===Ps||$===Cs||$===Rs}if(P){const $=I.texture.type,le=$===di||$===ir||$===tn||$===br||$===ws||$===As,ce=ye.getClearColor(),fe=ye.getClearAlpha(),be=ce.r,Te=ce.g,we=ce.b;le?(v[0]=be,v[1]=Te,v[2]=we,v[3]=fe,b.clearBufferuiv(b.COLOR,0,v)):(x[0]=be,x[1]=Te,x[2]=we,x[3]=fe,b.clearBufferiv(b.COLOR,0,x))}else z|=b.COLOR_BUFFER_BIT}L&&(z|=b.DEPTH_BUFFER_BIT),O&&(z|=b.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),b.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Y,!1),t.removeEventListener("webglcontextrestored",oe,!1),t.removeEventListener("webglcontextcreationerror",ie,!1),ye.dispose(),de.dispose(),ke.dispose(),_e.dispose(),g.dispose(),N.dispose(),j.dispose(),et.dispose(),R.dispose(),ge.dispose(),B.dispose(),B.removeEventListener("sessionstart",Wo),B.removeEventListener("sessionend",Xo),zi.stop()};function Y(_){_.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),D=!0}function oe(){console.log("THREE.WebGLRenderer: Context Restored."),D=!1;const _=it.autoReset,L=ue.enabled,O=ue.autoUpdate,z=ue.needsUpdate,P=ue.type;ne(),it.autoReset=_,ue.enabled=L,ue.autoUpdate=O,ue.needsUpdate=z,ue.type=P}function ie(_){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",_.statusMessage)}function ze(_){const L=_.target;L.removeEventListener("dispose",ze),st(L)}function st(_){vt(_),_e.remove(_)}function vt(_){const L=_e.get(_).programs;L!==void 0&&(L.forEach(function(O){ge.releaseProgram(O)}),_.isShaderMaterial&&ge.releaseShaderCache(_))}this.renderBufferDirect=function(_,L,O,z,P,$){L===null&&(L=at);const le=P.isMesh&&P.matrixWorld.determinant()<0,ce=th(_,L,O,z,P);ve.setMaterial(z,le);let fe=O.index,be=1;if(z.wireframe===!0){if(fe=K.getWireframeAttribute(O),fe===void 0)return;be=2}const Te=O.drawRange,we=O.attributes.position;let He=Te.start*be,qe=(Te.start+Te.count)*be;$!==null&&(He=Math.max(He,$.start*be),qe=Math.min(qe,($.start+$.count)*be)),fe!==null?(He=Math.max(He,0),qe=Math.min(qe,fe.count)):we!=null&&(He=Math.max(He,0),qe=Math.min(qe,we.count));const ht=qe-He;if(ht<0||ht===1/0)return;et.setup(P,z,ce,O,fe);let Ye,tt=he;if(fe!==null&&(Ye=q.get(fe),tt=Fe,tt.setIndex(Ye)),P.isMesh)z.wireframe===!0?(ve.setLineWidth(z.wireframeLinewidth*ot()),tt.setMode(b.LINES)):tt.setMode(b.TRIANGLES);else if(P.isLine){let xe=z.linewidth;xe===void 0&&(xe=1),ve.setLineWidth(xe*ot()),P.isLineSegments?tt.setMode(b.LINES):P.isLineLoop?tt.setMode(b.LINE_LOOP):tt.setMode(b.LINE_STRIP)}else P.isPoints?tt.setMode(b.POINTS):P.isSprite&&tt.setMode(b.TRIANGLES);if(P.isBatchedMesh)if(P._multiDrawInstances!==null)tt.renderMultiDrawInstances(P._multiDrawStarts,P._multiDrawCounts,P._multiDrawCount,P._multiDrawInstances);else if(Ne.get("WEBGL_multi_draw"))tt.renderMultiDraw(P._multiDrawStarts,P._multiDrawCounts,P._multiDrawCount);else{const xe=P._multiDrawStarts,Mt=P._multiDrawCounts,Bi=P._multiDrawCount,jt=fe?q.get(fe).bytesPerElement:1,fr=_e.get(z).currentProgram.getUniforms();for(let Ct=0;Ct<Bi;Ct++)fr.setValue(b,"_gl_DrawID",Ct),tt.render(xe[Ct]/jt,Mt[Ct])}else if(P.isInstancedMesh)tt.renderInstances(He,ht,P.count);else if(O.isInstancedBufferGeometry){const xe=O._maxInstanceCount!==void 0?O._maxInstanceCount:1/0,Mt=Math.min(O.instanceCount,xe);tt.renderInstances(He,ht,Mt)}else tt.render(He,ht)};function je(_,L,O){_.transparent===!0&&_.side===hi&&_.forceSinglePass===!1?(_.side=bt,_.needsUpdate=!0,Mn(_,L,O),_.side=wi,_.needsUpdate=!0,Mn(_,L,O),_.side=hi):Mn(_,L,O)}this.compile=function(_,L,O=null){O===null&&(O=_),p=ke.get(O),p.init(L),T.push(p),O.traverseVisible(function(P){P.isLight&&P.layers.test(L.layers)&&(p.pushLight(P),P.castShadow&&p.pushShadow(P))}),_!==O&&_.traverseVisible(function(P){P.isLight&&P.layers.test(L.layers)&&(p.pushLight(P),P.castShadow&&p.pushShadow(P))}),p.setupLights();const z=new Set;return _.traverse(function(P){if(!(P.isMesh||P.isPoints||P.isLine||P.isSprite))return;const $=P.material;if($)if(Array.isArray($))for(let le=0;le<$.length;le++){const ce=$[le];je(ce,O,P),z.add(ce)}else je($,O,P),z.add($)}),T.pop(),p=null,z},this.compileAsync=function(_,L,O=null){const z=this.compile(_,L,O);return new Promise(P=>{function $(){if(z.forEach(function(le){_e.get(le).currentProgram.isReady()&&z.delete(le)}),z.size===0){P(_);return}setTimeout($,10)}Ne.get("KHR_parallel_shader_compile")!==null?$():setTimeout($,10)})};let Xt=null;function ai(_){Xt&&Xt(_)}function Wo(){zi.stop()}function Xo(){zi.start()}const zi=new mu;zi.setAnimationLoop(ai),typeof self<"u"&&zi.setContext(self),this.setAnimationLoop=function(_){Xt=_,B.setAnimationLoop(_),_===null?zi.stop():zi.start()},B.addEventListener("sessionstart",Wo),B.addEventListener("sessionend",Xo),this.render=function(_,L){if(L!==void 0&&L.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(D===!0)return;if(_.matrixWorldAutoUpdate===!0&&_.updateMatrixWorld(),L.parent===null&&L.matrixWorldAutoUpdate===!0&&L.updateMatrixWorld(),B.enabled===!0&&B.isPresenting===!0&&(B.cameraAutoUpdate===!0&&B.updateCamera(L),L=B.getCamera()),_.isScene===!0&&_.onBeforeRender(E,_,L,I),p=ke.get(_,T.length),p.init(L),T.push(p),Se.multiplyMatrices(L.projectionMatrix,L.matrixWorldInverse),X.setFromProjectionMatrix(Se),me=this.localClippingEnabled,ee=Q.init(this.clippingPlanes,me),m=de.get(_,w.length),m.init(),w.push(m),B.enabled===!0&&B.isPresenting===!0){const $=E.xr.getDepthSensingMesh();$!==null&&Ca($,L,-1/0,E.sortObjects)}Ca(_,L,0,E.sortObjects),m.finish(),E.sortObjects===!0&&m.sort(te,pe),Be=B.enabled===!1||B.isPresenting===!1||B.hasDepthSensing()===!1,Be&&ye.addToRenderList(m,_),this.info.render.frame++,ee===!0&&Q.beginShadows();const O=p.state.shadowsArray;ue.render(O,_,L),ee===!0&&Q.endShadows(),this.info.autoReset===!0&&this.info.reset();const z=m.opaque,P=m.transmissive;if(p.setupLights(),L.isArrayCamera){const $=L.cameras;if(P.length>0)for(let le=0,ce=$.length;le<ce;le++){const fe=$[le];qo(z,P,_,fe)}Be&&ye.render(_);for(let le=0,ce=$.length;le<ce;le++){const fe=$[le];jo(m,_,fe,fe.viewport)}}else P.length>0&&qo(z,P,_,L),Be&&ye.render(_),jo(m,_,L);I!==null&&A===0&&(M.updateMultisampleRenderTarget(I),M.updateRenderTargetMipmap(I)),_.isScene===!0&&_.onAfterRender(E,_,L),et.resetDefaultState(),S=-1,y=null,T.pop(),T.length>0?(p=T[T.length-1],ee===!0&&Q.setGlobalState(E.clippingPlanes,p.state.camera)):p=null,w.pop(),w.length>0?m=w[w.length-1]:m=null};function Ca(_,L,O,z){if(_.visible===!1)return;if(_.layers.test(L.layers)){if(_.isGroup)O=_.renderOrder;else if(_.isLOD)_.autoUpdate===!0&&_.update(L);else if(_.isLight)p.pushLight(_),_.castShadow&&p.pushShadow(_);else if(_.isSprite){if(!_.frustumCulled||X.intersectsSprite(_)){z&&De.setFromMatrixPosition(_.matrixWorld).applyMatrix4(Se);const $=j.update(_),le=_.material;le.visible&&m.push(_,$,le,O,De.z,null)}}else if((_.isMesh||_.isLine||_.isPoints)&&(!_.frustumCulled||X.intersectsObject(_))){const $=j.update(_),le=_.material;if(z&&(_.boundingSphere!==void 0?(_.boundingSphere===null&&_.computeBoundingSphere(),De.copy(_.boundingSphere.center)):($.boundingSphere===null&&$.computeBoundingSphere(),De.copy($.boundingSphere.center)),De.applyMatrix4(_.matrixWorld).applyMatrix4(Se)),Array.isArray(le)){const ce=$.groups;for(let fe=0,be=ce.length;fe<be;fe++){const Te=ce[fe],we=le[Te.materialIndex];we&&we.visible&&m.push(_,$,we,O,De.z,Te)}}else le.visible&&m.push(_,$,le,O,De.z,null)}}const P=_.children;for(let $=0,le=P.length;$<le;$++)Ca(P[$],L,O,z)}function jo(_,L,O,z){const P=_.opaque,$=_.transmissive,le=_.transparent;p.setupLightsView(O),ee===!0&&Q.setGlobalState(E.clippingPlanes,O),z&&ve.viewport(C.copy(z)),P.length>0&&Sn(P,L,O),$.length>0&&Sn($,L,O),le.length>0&&Sn(le,L,O),ve.buffers.depth.setTest(!0),ve.buffers.depth.setMask(!0),ve.buffers.color.setMask(!0),ve.setPolygonOffset(!1)}function qo(_,L,O,z){if((O.isScene===!0?O.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[z.id]===void 0&&(p.state.transmissionRenderTarget[z.id]=new Pi(1,1,{generateMipmaps:!0,type:Ne.has("EXT_color_buffer_half_float")||Ne.has("EXT_color_buffer_float")?rn:di,minFilter:tr,samples:4,stencilBuffer:a,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ve.workingColorSpace}));const P=p.state.transmissionRenderTarget[z.id],$=z.viewport||C;P.setSize($.z*E.transmissionResolutionScale,$.w*E.transmissionResolutionScale);const le=E.getRenderTarget();E.setRenderTarget(P),E.getClearColor(W),Z=E.getClearAlpha(),Z<1&&E.setClearColor(16777215,.5),E.clear(),Be&&ye.render(O);const ce=E.toneMapping;E.toneMapping=Ri;const fe=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),p.setupLightsView(z),ee===!0&&Q.setGlobalState(E.clippingPlanes,z),Sn(_,O,z),M.updateMultisampleRenderTarget(P),M.updateRenderTargetMipmap(P),Ne.has("WEBGL_multisampled_render_to_texture")===!1){let be=!1;for(let Te=0,we=L.length;Te<we;Te++){const He=L[Te],qe=He.object,ht=He.geometry,Ye=He.material,tt=He.group;if(Ye.side===hi&&qe.layers.test(z.layers)){const xe=Ye.side;Ye.side=bt,Ye.needsUpdate=!0,Yo(qe,O,z,ht,Ye,tt),Ye.side=xe,Ye.needsUpdate=!0,be=!0}}be===!0&&(M.updateMultisampleRenderTarget(P),M.updateRenderTargetMipmap(P))}E.setRenderTarget(le),E.setClearColor(W,Z),fe!==void 0&&(z.viewport=fe),E.toneMapping=ce}function Sn(_,L,O){const z=L.isScene===!0?L.overrideMaterial:null;for(let P=0,$=_.length;P<$;P++){const le=_[P],ce=le.object,fe=le.geometry,be=z===null?le.material:z,Te=le.group;ce.layers.test(O.layers)&&Yo(ce,L,O,fe,be,Te)}}function Yo(_,L,O,z,P,$){_.onBeforeRender(E,L,O,z,P,$),_.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse,_.matrixWorld),_.normalMatrix.getNormalMatrix(_.modelViewMatrix),P.onBeforeRender(E,L,O,z,_,$),P.transparent===!0&&P.side===hi&&P.forceSinglePass===!1?(P.side=bt,P.needsUpdate=!0,E.renderBufferDirect(O,L,z,P,_,$),P.side=wi,P.needsUpdate=!0,E.renderBufferDirect(O,L,z,P,_,$),P.side=hi):E.renderBufferDirect(O,L,z,P,_,$),_.onAfterRender(E,L,O,z,P,$)}function Mn(_,L,O){L.isScene!==!0&&(L=at);const z=_e.get(_),P=p.state.lights,$=p.state.shadowsArray,le=P.state.version,ce=ge.getParameters(_,P.state,$,L,O),fe=ge.getProgramCacheKey(ce);let be=z.programs;z.environment=_.isMeshStandardMaterial?L.environment:null,z.fog=L.fog,z.envMap=(_.isMeshStandardMaterial?N:g).get(_.envMap||z.environment),z.envMapRotation=z.environment!==null&&_.envMap===null?L.environmentRotation:_.envMapRotation,be===void 0&&(_.addEventListener("dispose",ze),be=new Map,z.programs=be);let Te=be.get(fe);if(Te!==void 0){if(z.currentProgram===Te&&z.lightsStateVersion===le)return Ko(_,ce),Te}else ce.uniforms=ge.getUniforms(_),_.onBeforeCompile(ce,E),Te=ge.acquireProgram(ce,fe),be.set(fe,Te),z.uniforms=ce.uniforms;const we=z.uniforms;return(!_.isShaderMaterial&&!_.isRawShaderMaterial||_.clipping===!0)&&(we.clippingPlanes=Q.uniform),Ko(_,ce),z.needsLights=rh(_),z.lightsStateVersion=le,z.needsLights&&(we.ambientLightColor.value=P.state.ambient,we.lightProbe.value=P.state.probe,we.directionalLights.value=P.state.directional,we.directionalLightShadows.value=P.state.directionalShadow,we.spotLights.value=P.state.spot,we.spotLightShadows.value=P.state.spotShadow,we.rectAreaLights.value=P.state.rectArea,we.ltc_1.value=P.state.rectAreaLTC1,we.ltc_2.value=P.state.rectAreaLTC2,we.pointLights.value=P.state.point,we.pointLightShadows.value=P.state.pointShadow,we.hemisphereLights.value=P.state.hemi,we.directionalShadowMap.value=P.state.directionalShadowMap,we.directionalShadowMatrix.value=P.state.directionalShadowMatrix,we.spotShadowMap.value=P.state.spotShadowMap,we.spotLightMatrix.value=P.state.spotLightMatrix,we.spotLightMap.value=P.state.spotLightMap,we.pointShadowMap.value=P.state.pointShadowMap,we.pointShadowMatrix.value=P.state.pointShadowMatrix),z.currentProgram=Te,z.uniformsList=null,Te}function $o(_){if(_.uniformsList===null){const L=_.currentProgram.getUniforms();_.uniformsList=Ta.seqWithValue(L.seq,_.uniforms)}return _.uniformsList}function Ko(_,L){const O=_e.get(_);O.outputColorSpace=L.outputColorSpace,O.batching=L.batching,O.batchingColor=L.batchingColor,O.instancing=L.instancing,O.instancingColor=L.instancingColor,O.instancingMorph=L.instancingMorph,O.skinning=L.skinning,O.morphTargets=L.morphTargets,O.morphNormals=L.morphNormals,O.morphColors=L.morphColors,O.morphTargetsCount=L.morphTargetsCount,O.numClippingPlanes=L.numClippingPlanes,O.numIntersection=L.numClipIntersection,O.vertexAlphas=L.vertexAlphas,O.vertexTangents=L.vertexTangents,O.toneMapping=L.toneMapping}function th(_,L,O,z,P){L.isScene!==!0&&(L=at),M.resetTextureUnits();const $=L.fog,le=z.isMeshStandardMaterial?L.environment:null,ce=I===null?E.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:Rr,fe=(z.isMeshStandardMaterial?N:g).get(z.envMap||le),be=z.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,Te=!!O.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),we=!!O.morphAttributes.position,He=!!O.morphAttributes.normal,qe=!!O.morphAttributes.color;let ht=Ri;z.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(ht=E.toneMapping);const Ye=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,tt=Ye!==void 0?Ye.length:0,xe=_e.get(z),Mt=p.state.lights;if(ee===!0&&(me===!0||_!==y)){const mt=_===y&&z.id===S;Q.setState(z,_,mt)}let Bi=!1;z.version===xe.__version?(xe.needsLights&&xe.lightsStateVersion!==Mt.state.version||xe.outputColorSpace!==ce||P.isBatchedMesh&&xe.batching===!1||!P.isBatchedMesh&&xe.batching===!0||P.isBatchedMesh&&xe.batchingColor===!0&&P.colorTexture===null||P.isBatchedMesh&&xe.batchingColor===!1&&P.colorTexture!==null||P.isInstancedMesh&&xe.instancing===!1||!P.isInstancedMesh&&xe.instancing===!0||P.isSkinnedMesh&&xe.skinning===!1||!P.isSkinnedMesh&&xe.skinning===!0||P.isInstancedMesh&&xe.instancingColor===!0&&P.instanceColor===null||P.isInstancedMesh&&xe.instancingColor===!1&&P.instanceColor!==null||P.isInstancedMesh&&xe.instancingMorph===!0&&P.morphTexture===null||P.isInstancedMesh&&xe.instancingMorph===!1&&P.morphTexture!==null||xe.envMap!==fe||z.fog===!0&&xe.fog!==$||xe.numClippingPlanes!==void 0&&(xe.numClippingPlanes!==Q.numPlanes||xe.numIntersection!==Q.numIntersection)||xe.vertexAlphas!==be||xe.vertexTangents!==Te||xe.morphTargets!==we||xe.morphNormals!==He||xe.morphColors!==qe||xe.toneMapping!==ht||xe.morphTargetsCount!==tt)&&(Bi=!0):(Bi=!0,xe.__version=z.version);let jt=xe.currentProgram;Bi===!0&&(jt=Mn(z,L,P));let fr=!1,Ct=!1,$r=!1;const rt=jt.getUniforms(),Nt=xe.uniforms;if(ve.useProgram(jt.program)&&(fr=!0,Ct=!0,$r=!0),z.id!==S&&(S=z.id,Ct=!0),fr||y!==_){ve.buffers.depth.getReversed()?(ae.copy(_.projectionMatrix),vg(ae),xg(ae),rt.setValue(b,"projectionMatrix",ae)):rt.setValue(b,"projectionMatrix",_.projectionMatrix),rt.setValue(b,"viewMatrix",_.matrixWorldInverse);const mt=rt.map.cameraPosition;mt!==void 0&&mt.setValue(b,Ce.setFromMatrixPosition(_.matrixWorld)),Oe.logarithmicDepthBuffer&&rt.setValue(b,"logDepthBufFC",2/(Math.log(_.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&rt.setValue(b,"isOrthographic",_.isOrthographicCamera===!0),y!==_&&(y=_,Ct=!0,$r=!0)}if(P.isSkinnedMesh){rt.setOptional(b,P,"bindMatrix"),rt.setOptional(b,P,"bindMatrixInverse");const mt=P.skeleton;mt&&(mt.boneTexture===null&&mt.computeBoneTexture(),rt.setValue(b,"boneTexture",mt.boneTexture,M))}P.isBatchedMesh&&(rt.setOptional(b,P,"batchingTexture"),rt.setValue(b,"batchingTexture",P._matricesTexture,M),rt.setOptional(b,P,"batchingIdTexture"),rt.setValue(b,"batchingIdTexture",P._indirectTexture,M),rt.setOptional(b,P,"batchingColorTexture"),P._colorsTexture!==null&&rt.setValue(b,"batchingColorTexture",P._colorsTexture,M));const Ot=O.morphAttributes;if((Ot.position!==void 0||Ot.normal!==void 0||Ot.color!==void 0)&&Ee.update(P,O,jt),(Ct||xe.receiveShadow!==P.receiveShadow)&&(xe.receiveShadow=P.receiveShadow,rt.setValue(b,"receiveShadow",P.receiveShadow)),z.isMeshGouraudMaterial&&z.envMap!==null&&(Nt.envMap.value=fe,Nt.flipEnvMap.value=fe.isCubeTexture&&fe.isRenderTargetTexture===!1?-1:1),z.isMeshStandardMaterial&&z.envMap===null&&L.environment!==null&&(Nt.envMapIntensity.value=L.environmentIntensity),Ct&&(rt.setValue(b,"toneMappingExposure",E.toneMappingExposure),xe.needsLights&&ih(Nt,$r),$&&z.fog===!0&&se.refreshFogUniforms(Nt,$),se.refreshMaterialUniforms(Nt,z,H,J,p.state.transmissionRenderTarget[_.id]),Ta.upload(b,$o(xe),Nt,M)),z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(Ta.upload(b,$o(xe),Nt,M),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&rt.setValue(b,"center",P.center),rt.setValue(b,"modelViewMatrix",P.modelViewMatrix),rt.setValue(b,"normalMatrix",P.normalMatrix),rt.setValue(b,"modelMatrix",P.matrixWorld),z.isShaderMaterial||z.isRawShaderMaterial){const mt=z.uniformsGroups;for(let qt=0,Pa=mt.length;qt<Pa;qt++){const ki=mt[qt];R.update(ki,jt),R.bind(ki,jt)}}return jt}function ih(_,L){_.ambientLightColor.needsUpdate=L,_.lightProbe.needsUpdate=L,_.directionalLights.needsUpdate=L,_.directionalLightShadows.needsUpdate=L,_.pointLights.needsUpdate=L,_.pointLightShadows.needsUpdate=L,_.spotLights.needsUpdate=L,_.spotLightShadows.needsUpdate=L,_.rectAreaLights.needsUpdate=L,_.hemisphereLights.needsUpdate=L}function rh(_){return _.isMeshLambertMaterial||_.isMeshToonMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isShadowMaterial||_.isShaderMaterial&&_.lights===!0}this.getActiveCubeFace=function(){return U},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(_,L,O){_e.get(_.texture).__webglTexture=L,_e.get(_.depthTexture).__webglTexture=O;const z=_e.get(_);z.__hasExternalTextures=!0,z.__autoAllocateDepthBuffer=O===void 0,z.__autoAllocateDepthBuffer||Ne.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),z.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(_,L){const O=_e.get(_);O.__webglFramebuffer=L,O.__useDefaultFramebuffer=L===void 0};const nh=b.createFramebuffer();this.setRenderTarget=function(_,L=0,O=0){I=_,U=L,A=O;let z=!0,P=null,$=!1,le=!1;if(_){const ce=_e.get(_);if(ce.__useDefaultFramebuffer!==void 0)ve.bindFramebuffer(b.FRAMEBUFFER,null),z=!1;else if(ce.__webglFramebuffer===void 0)M.setupRenderTarget(_);else if(ce.__hasExternalTextures)M.rebindTextures(_,_e.get(_.texture).__webglTexture,_e.get(_.depthTexture).__webglTexture);else if(_.depthBuffer){const Te=_.depthTexture;if(ce.__boundDepthTexture!==Te){if(Te!==null&&_e.has(Te)&&(_.width!==Te.image.width||_.height!==Te.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");M.setupDepthRenderbuffer(_)}}const fe=_.texture;(fe.isData3DTexture||fe.isDataArrayTexture||fe.isCompressedArrayTexture)&&(le=!0);const be=_e.get(_).__webglFramebuffer;_.isWebGLCubeRenderTarget?(Array.isArray(be[L])?P=be[L][O]:P=be[L],$=!0):_.samples>0&&M.useMultisampledRTT(_)===!1?P=_e.get(_).__webglMultisampledFramebuffer:Array.isArray(be)?P=be[O]:P=be,C.copy(_.viewport),G.copy(_.scissor),k=_.scissorTest}else C.copy(Re).multiplyScalar(H).floor(),G.copy(Ue).multiplyScalar(H).floor(),k=Ke;if(O!==0&&(P=nh),ve.bindFramebuffer(b.FRAMEBUFFER,P)&&z&&ve.drawBuffers(_,P),ve.viewport(C),ve.scissor(G),ve.setScissorTest(k),$){const ce=_e.get(_.texture);b.framebufferTexture2D(b.FRAMEBUFFER,b.COLOR_ATTACHMENT0,b.TEXTURE_CUBE_MAP_POSITIVE_X+L,ce.__webglTexture,O)}else if(le){const ce=_e.get(_.texture),fe=L;b.framebufferTextureLayer(b.FRAMEBUFFER,b.COLOR_ATTACHMENT0,ce.__webglTexture,O,fe)}else if(_!==null&&O!==0){const ce=_e.get(_.texture);b.framebufferTexture2D(b.FRAMEBUFFER,b.COLOR_ATTACHMENT0,b.TEXTURE_2D,ce.__webglTexture,O)}S=-1},this.readRenderTargetPixels=function(_,L,O,z,P,$,le){if(!(_&&_.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ce=_e.get(_).__webglFramebuffer;if(_.isWebGLCubeRenderTarget&&le!==void 0&&(ce=ce[le]),ce){ve.bindFramebuffer(b.FRAMEBUFFER,ce);try{const fe=_.texture,be=fe.format,Te=fe.type;if(!Oe.textureFormatReadable(be)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Oe.textureTypeReadable(Te)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}L>=0&&L<=_.width-z&&O>=0&&O<=_.height-P&&b.readPixels(L,O,z,P,Pe.convert(be),Pe.convert(Te),$)}finally{const fe=I!==null?_e.get(I).__webglFramebuffer:null;ve.bindFramebuffer(b.FRAMEBUFFER,fe)}}},this.readRenderTargetPixelsAsync=async function(_,L,O,z,P,$,le){if(!(_&&_.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ce=_e.get(_).__webglFramebuffer;if(_.isWebGLCubeRenderTarget&&le!==void 0&&(ce=ce[le]),ce){const fe=_.texture,be=fe.format,Te=fe.type;if(!Oe.textureFormatReadable(be))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Oe.textureTypeReadable(Te))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(L>=0&&L<=_.width-z&&O>=0&&O<=_.height-P){ve.bindFramebuffer(b.FRAMEBUFFER,ce);const we=b.createBuffer();b.bindBuffer(b.PIXEL_PACK_BUFFER,we),b.bufferData(b.PIXEL_PACK_BUFFER,$.byteLength,b.STREAM_READ),b.readPixels(L,O,z,P,Pe.convert(be),Pe.convert(Te),0);const He=I!==null?_e.get(I).__webglFramebuffer:null;ve.bindFramebuffer(b.FRAMEBUFFER,He);const qe=b.fenceSync(b.SYNC_GPU_COMMANDS_COMPLETE,0);return b.flush(),await _g(b,qe,4),b.bindBuffer(b.PIXEL_PACK_BUFFER,we),b.getBufferSubData(b.PIXEL_PACK_BUFFER,0,$),b.deleteBuffer(we),b.deleteSync(qe),$}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(_,L=null,O=0){_.isTexture!==!0&&(Lr("WebGLRenderer: copyFramebufferToTexture function signature has changed."),L=arguments[0]||null,_=arguments[1]);const z=Math.pow(2,-O),P=Math.floor(_.image.width*z),$=Math.floor(_.image.height*z),le=L!==null?L.x:0,ce=L!==null?L.y:0;M.setTexture2D(_,0),b.copyTexSubImage2D(b.TEXTURE_2D,O,0,0,le,ce,P,$),ve.unbindTexture()};const ah=b.createFramebuffer(),sh=b.createFramebuffer();this.copyTextureToTexture=function(_,L,O=null,z=null,P=0,$=null){_.isTexture!==!0&&(Lr("WebGLRenderer: copyTextureToTexture function signature has changed."),z=arguments[0]||null,_=arguments[1],L=arguments[2],$=arguments[3]||0,O=null),$===null&&(P!==0?(Lr("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),$=P,P=0):$=0);let le,ce,fe,be,Te,we,He,qe,ht;const Ye=_.isCompressedTexture?_.mipmaps[$]:_.image;if(O!==null)le=O.max.x-O.min.x,ce=O.max.y-O.min.y,fe=O.isBox3?O.max.z-O.min.z:1,be=O.min.x,Te=O.min.y,we=O.isBox3?O.min.z:0;else{const Ot=Math.pow(2,-P);le=Math.floor(Ye.width*Ot),ce=Math.floor(Ye.height*Ot),_.isDataArrayTexture?fe=Ye.depth:_.isData3DTexture?fe=Math.floor(Ye.depth*Ot):fe=1,be=0,Te=0,we=0}z!==null?(He=z.x,qe=z.y,ht=z.z):(He=0,qe=0,ht=0);const tt=Pe.convert(L.format),xe=Pe.convert(L.type);let Mt;L.isData3DTexture?(M.setTexture3D(L,0),Mt=b.TEXTURE_3D):L.isDataArrayTexture||L.isCompressedArrayTexture?(M.setTexture2DArray(L,0),Mt=b.TEXTURE_2D_ARRAY):(M.setTexture2D(L,0),Mt=b.TEXTURE_2D),b.pixelStorei(b.UNPACK_FLIP_Y_WEBGL,L.flipY),b.pixelStorei(b.UNPACK_PREMULTIPLY_ALPHA_WEBGL,L.premultiplyAlpha),b.pixelStorei(b.UNPACK_ALIGNMENT,L.unpackAlignment);const Bi=b.getParameter(b.UNPACK_ROW_LENGTH),jt=b.getParameter(b.UNPACK_IMAGE_HEIGHT),fr=b.getParameter(b.UNPACK_SKIP_PIXELS),Ct=b.getParameter(b.UNPACK_SKIP_ROWS),$r=b.getParameter(b.UNPACK_SKIP_IMAGES);b.pixelStorei(b.UNPACK_ROW_LENGTH,Ye.width),b.pixelStorei(b.UNPACK_IMAGE_HEIGHT,Ye.height),b.pixelStorei(b.UNPACK_SKIP_PIXELS,be),b.pixelStorei(b.UNPACK_SKIP_ROWS,Te),b.pixelStorei(b.UNPACK_SKIP_IMAGES,we);const rt=_.isDataArrayTexture||_.isData3DTexture,Nt=L.isDataArrayTexture||L.isData3DTexture;if(_.isDepthTexture){const Ot=_e.get(_),mt=_e.get(L),qt=_e.get(Ot.__renderTarget),Pa=_e.get(mt.__renderTarget);ve.bindFramebuffer(b.READ_FRAMEBUFFER,qt.__webglFramebuffer),ve.bindFramebuffer(b.DRAW_FRAMEBUFFER,Pa.__webglFramebuffer);for(let ki=0;ki<fe;ki++)rt&&(b.framebufferTextureLayer(b.READ_FRAMEBUFFER,b.COLOR_ATTACHMENT0,_e.get(_).__webglTexture,P,we+ki),b.framebufferTextureLayer(b.DRAW_FRAMEBUFFER,b.COLOR_ATTACHMENT0,_e.get(L).__webglTexture,$,ht+ki)),b.blitFramebuffer(be,Te,le,ce,He,qe,le,ce,b.DEPTH_BUFFER_BIT,b.NEAREST);ve.bindFramebuffer(b.READ_FRAMEBUFFER,null),ve.bindFramebuffer(b.DRAW_FRAMEBUFFER,null)}else if(P!==0||_.isRenderTargetTexture||_e.has(_)){const Ot=_e.get(_),mt=_e.get(L);ve.bindFramebuffer(b.READ_FRAMEBUFFER,ah),ve.bindFramebuffer(b.DRAW_FRAMEBUFFER,sh);for(let qt=0;qt<fe;qt++)rt?b.framebufferTextureLayer(b.READ_FRAMEBUFFER,b.COLOR_ATTACHMENT0,Ot.__webglTexture,P,we+qt):b.framebufferTexture2D(b.READ_FRAMEBUFFER,b.COLOR_ATTACHMENT0,b.TEXTURE_2D,Ot.__webglTexture,P),Nt?b.framebufferTextureLayer(b.DRAW_FRAMEBUFFER,b.COLOR_ATTACHMENT0,mt.__webglTexture,$,ht+qt):b.framebufferTexture2D(b.DRAW_FRAMEBUFFER,b.COLOR_ATTACHMENT0,b.TEXTURE_2D,mt.__webglTexture,$),P!==0?b.blitFramebuffer(be,Te,le,ce,He,qe,le,ce,b.COLOR_BUFFER_BIT,b.NEAREST):Nt?b.copyTexSubImage3D(Mt,$,He,qe,ht+qt,be,Te,le,ce):b.copyTexSubImage2D(Mt,$,He,qe,be,Te,le,ce);ve.bindFramebuffer(b.READ_FRAMEBUFFER,null),ve.bindFramebuffer(b.DRAW_FRAMEBUFFER,null)}else Nt?_.isDataTexture||_.isData3DTexture?b.texSubImage3D(Mt,$,He,qe,ht,le,ce,fe,tt,xe,Ye.data):L.isCompressedArrayTexture?b.compressedTexSubImage3D(Mt,$,He,qe,ht,le,ce,fe,tt,Ye.data):b.texSubImage3D(Mt,$,He,qe,ht,le,ce,fe,tt,xe,Ye):_.isDataTexture?b.texSubImage2D(b.TEXTURE_2D,$,He,qe,le,ce,tt,xe,Ye.data):_.isCompressedTexture?b.compressedTexSubImage2D(b.TEXTURE_2D,$,He,qe,Ye.width,Ye.height,tt,Ye.data):b.texSubImage2D(b.TEXTURE_2D,$,He,qe,le,ce,tt,xe,Ye);b.pixelStorei(b.UNPACK_ROW_LENGTH,Bi),b.pixelStorei(b.UNPACK_IMAGE_HEIGHT,jt),b.pixelStorei(b.UNPACK_SKIP_PIXELS,fr),b.pixelStorei(b.UNPACK_SKIP_ROWS,Ct),b.pixelStorei(b.UNPACK_SKIP_IMAGES,$r),$===0&&L.generateMipmaps&&b.generateMipmap(Mt),ve.unbindTexture()},this.copyTextureToTexture3D=function(_,L,O=null,z=null,P=0){return _.isTexture!==!0&&(Lr("WebGLRenderer: copyTextureToTexture3D function signature has changed."),O=arguments[0]||null,z=arguments[1]||null,_=arguments[2],L=arguments[3],P=arguments[4]||0),Lr('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(_,L,O,z,P)},this.initRenderTarget=function(_){_e.get(_).__webglFramebuffer===void 0&&M.setupRenderTarget(_)},this.initTexture=function(_){_.isCubeTexture?M.setTextureCube(_,0):_.isData3DTexture?M.setTexture3D(_,0):_.isDataArrayTexture||_.isCompressedArrayTexture?M.setTexture2DArray(_,0):M.setTexture2D(_,0),ve.unbindTexture()},this.resetState=function(){U=0,A=0,I=null,ve.reset(),et.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return pi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=Ve._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ve._getUnpackColorSpace()}}function wa(i){const e=`#pragma end_pre_strip
`,t=i.indexOf(e);if(t<0)throw new Error(`Invalid shader found when stripping header: ${i}`);return i.slice(t+e.length)}let We;const Wu=typeof TextDecoder<"u"?new TextDecoder("utf-8",{ignoreBOM:!0,fatal:!0}):{decode:()=>{throw Error("TextDecoder not available")}};typeof TextDecoder<"u"&&Wu.decode();let fn=null;function mn(){return(fn===null||fn.byteLength===0)&&(fn=new Uint8Array(We.memory.buffer)),fn}function Xu(i,e){return i=i>>>0,Wu.decode(mn().subarray(i,i+e))}const Fi=new Array(128).fill(void 0);Fi.push(void 0,null,!0,!1);let zo=Fi.length;function Ny(i){zo===Fi.length&&Fi.push(Fi.length+1);const e=zo;return zo=Fi[e],Fi[e]=i,e}function Oy(i){return Fi[i]}let yi=0;const Aa=typeof TextEncoder<"u"?new TextEncoder("utf-8"):{encode:()=>{throw Error("TextEncoder not available")}},Fy=typeof Aa.encodeInto=="function"?function(i,e){return Aa.encodeInto(i,e)}:function(i,e){const t=Aa.encode(i);return e.set(t),{read:i.length,written:t.length}};function zy(i,e,t){if(t===void 0){const o=Aa.encode(i),l=e(o.length,1)>>>0;return mn().subarray(l,l+o.length).set(o),yi=o.length,l}let r=i.length,n=e(r,1)>>>0;const a=mn();let s=0;for(;s<r;s++){const o=i.charCodeAt(s);if(o>127)break;a[n+s]=o}if(s!==r){s!==0&&(i=i.slice(s)),n=t(n,r,r=s+i.length*3,1)>>>0;const o=mn().subarray(n+s,n+r),l=Fy(i,o);s+=l.written,n=t(n,r,s,1)>>>0}return yi=s,n}let pr=null;function ju(){return(pr===null||pr.buffer.detached===!0||pr.buffer.detached===void 0&&pr.buffer!==We.memory.buffer)&&(pr=new DataView(We.memory.buffer)),pr}function qu(i,e){const t=e(i.length*1,1)>>>0;return mn().set(i,t/1),yi=i.length,t}let gn=null;function By(){return(gn===null||gn.byteLength===0)&&(gn=new Float32Array(We.memory.buffer)),gn}function Yu(i,e){const t=e(i.length*4,4)>>>0;return By().set(i,t/4),yi=i.length,t}function Ra(i,e){if(!(i instanceof e))throw new Error(`expected instance of ${e.name}`)}function ky(i,e,t,r,n,a,s,o){const l=Yu(s,We.__wbindgen_malloc),c=yi;Ra(o,Bo),We.gen_wavefield_128(i,e,t,r,n,a,l,c,o.__wbg_ptr)}function Hy(i,e,t,r,n,a,s,o){const l=Yu(s,We.__wbindgen_malloc),c=yi;Ra(o,ko),We.gen_wavefield_256(i,e,t,r,n,a,l,c,o.__wbg_ptr)}function Gy(i,e){Ra(e,ko),We.gen_and_paint_height_field_256(i,e.__wbg_ptr)}function Vy(i,e){Ra(e,Bo),We.gen_and_paint_height_field_128(i,e.__wbg_ptr)}const $u=typeof FinalizationRegistry>"u"?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(i=>We.__wbg_retbuf128_free(i>>>0,1));class Bo{__destroy_into_raw(){const e=this.__wbg_ptr;return this.__wbg_ptr=0,$u.unregister(this),e}free(){const e=this.__destroy_into_raw();We.__wbg_retbuf128_free(e,0)}constructor(e){const t=qu(e,We.__wbindgen_malloc),r=yi,n=We.retbuf128_new(t,r);return this.__wbg_ptr=n>>>0,$u.register(this,this.__wbg_ptr,this),this}get_pos_out_ptr(){return We.retbuf128_get_pos_out_ptr(this.__wbg_ptr)>>>0}get_partial_out_ptr(){return We.retbuf128_get_partial_out_ptr(this.__wbg_ptr)>>>0}}const Ku=typeof FinalizationRegistry>"u"?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(i=>We.__wbg_retbuf256_free(i>>>0,1));class ko{__destroy_into_raw(){const e=this.__wbg_ptr;return this.__wbg_ptr=0,Ku.unregister(this),e}free(){const e=this.__destroy_into_raw();We.__wbg_retbuf256_free(e,0)}constructor(e){const t=qu(e,We.__wbindgen_malloc),r=yi,n=We.retbuf256_new(t,r);return this.__wbg_ptr=n>>>0,Ku.register(this,this.__wbg_ptr,this),this}get_pos_out_ptr(){return We.retbuf128_get_pos_out_ptr(this.__wbg_ptr)>>>0}get_partial_out_ptr(){return We.retbuf128_get_partial_out_ptr(this.__wbg_ptr)>>>0}}async function Wy(i,e){if(typeof Response=="function"&&i instanceof Response){if(typeof WebAssembly.instantiateStreaming=="function")try{return await WebAssembly.instantiateStreaming(i,e)}catch(r){if(i.headers.get("Content-Type")!="application/wasm")console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n",r);else throw r}const t=await i.arrayBuffer();return await WebAssembly.instantiate(t,e)}else{const t=await WebAssembly.instantiate(i,e);return t instanceof WebAssembly.Instance?{instance:t,module:i}:t}}function Zu(){const i={};return i.wbg={},i.wbg.__wbg_error_88cb2fa5fe3d262d=function(e,t){let r,n;try{r=e,n=t,console.error(Xu(e,t))}finally{We.__wbindgen_free(r,n,1)}},i.wbg.__wbg_new_4ad03ffdef838e54=function(){const e=new Error;return Ny(e)},i.wbg.__wbg_stack_9bb99f71ef2cdec5=function(e,t){const r=Oy(t).stack,n=zy(r,We.__wbindgen_malloc,We.__wbindgen_realloc),a=yi;ju().setInt32(e+4*1,a,!0),ju().setInt32(e+4*0,n,!0)},i.wbg.__wbindgen_throw=function(e,t){throw new Error(Xu(e,t))},i}function Ju(i,e){return We=i.exports,Ho.__wbindgen_wasm_module=e,pr=null,gn=null,fn=null,We}function Xy(i){if(We!==void 0)return We;typeof i<"u"&&(Object.getPrototypeOf(i)===Object.prototype?{module:i}=i:console.warn("using deprecated parameters for `initSync()`; pass a single object instead"));const e=Zu();i instanceof WebAssembly.Module||(i=new WebAssembly.Module(i));const t=new WebAssembly.Instance(i,e);return Ju(t,i)}async function Ho(i){if(We!==void 0)return We;typeof i<"u"&&(Object.getPrototypeOf(i)===Object.prototype?{module_or_path:i}=i:console.warn("using deprecated parameters for the initialization function; pass a single object instead")),typeof i>"u"&&(i=new URL("https://prototypical.pro/assets/wasm_waves_bg-bePCLHGy.wasm",import.meta.url));const e=Zu();(typeof i=="string"||typeof Request=="function"&&i instanceof Request||typeof URL=="function"&&i instanceof URL)&&(i=fetch(i));const{instance:t,module:r}=await Wy(await i,e);return Ju(t,r)}const jy=Object.freeze(Object.defineProperty({__proto__:null,RetBuf128:Bo,RetBuf256:ko,default:Ho,gen_and_paint_height_field_128:Vy,gen_and_paint_height_field_256:Gy,gen_wavefield_128:ky,gen_wavefield_256:Hy,initSync:Xy},Symbol.toStringTag,{value:"Module"}));class Vo{constructor(e,t,r,n,a){this.memory=e,this.module=t,this.retBuf=r,this.step=n,this.width=a}static async MakeWasmWaves({depth:e,wind_speed:t,fetch:r,damping:n,swell:a,rad_off:s,windows:o,lowPerf:l=!1}){const c=await Ho(),u=jy,h=new Uint8Array(16);for(let f=0;f<h.length;f++)h[f]=Math.round(Math.random()*255);let d;return l?(d=new u.RetBuf128(h),u.gen_wavefield_128(e,t,r,n,a,s,new Float32Array(o),d)):(d=new u.RetBuf256(h),u.gen_wavefield_256(e,t,r,n,a,s,new Float32Array(o),d)),new Vo(c.memory,c,d,l?u.gen_and_paint_height_field_128:u.gen_and_paint_height_field_256,l?128:256)}getPtrs(){return[this.retBuf.get_pos_out_ptr(),this.retBuf.get_partial_out_ptr()]}getPackedSize(){return this.width*this.width}getPackedSizeFloats(){return this.getPackedSize()*4}getPackedSizeBytes(){return this.getPackedSizeFloats()*Float32Array.BYTES_PER_ELEMENT}render({time:e}){this.step(e,this.retBuf)}getBuffer(){return this.memory.buffer}}var qy=`#version 300 es

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
}`,Yy=`#version 300 es

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
}`;class $y{constructor(e,t,r,n,a){this.width=r,this.filterCount=n,this.blankCamera=new wo,this.blankCamera.position.z=1,this.makeTexMat=new qg({glslVersion:Zn,vertexShader:wa(qy),fragmentShader:wa(Yy)});const s=2/this.width,o=1/this.width,l=new Float32Array({length:this.width**2*3});let c=0;for(let u=0;u<this.width;u++)for(let h=0;h<this.width;h++)l[c++]=h*s+o-1,l[c++]=u*s+o-1,l[c++]=0;this.makeTexMeshs=[];for(let u=0;u<this.filterCount;u++){const h=new Mi;h.setAttribute("position",new Ut(l,3)),h.setAttribute("wavePosition",e[u]),h.setAttribute("wavePartial",t[u]),this.makeTexMeshs.push(new jg(h,this.makeTexMat))}this.renderTargets=new Array(this.filterCount).fill(0).map(()=>new Pi(this.width,this.width,{count:3,magFilter:a?Bt:wt,minFilter:wt,depthBuffer:!1,stencilBuffer:!1,type:ti,generateMipmaps:!0,wrapS:Qi,wrapT:Qi,format:kt}))}render(e){if(!this.makeTexMeshs[0].geometry.attributes.wavePosition.array)throw new Error("Geometry attributes not updated!");for(let t=0;t<this.filterCount;t++)e.setRenderTarget(this.renderTargets[t]),e.render(this.makeTexMeshs[t],this.blankCamera)}getDisplacementTexs(){return this.renderTargets.map(e=>e.textures[0])}getFirstMomentTexs(){return this.renderTargets.map(e=>e.textures[1])}getSecondMomentTexs(){return this.renderTargets.map(e=>e.textures[2])}}class Ky{constructor(e){this.p=e,this.target=[0,0],this.current=[0,0],this.lastTime=Date.now()}easeOutCirc(e){return Math.sqrt(1-Math.pow(e-1,2))}pushValue(e){(this.target[0]!==e[0]||this.target[1]!==e[1])&&(this.target=e)}getValue(){const e=Date.now(),t=e-this.lastTime;this.lastTime=e;const r=[this.target[0]-this.current[0],this.target[1]-this.current[1]];if(r[0]==0&&r[1]==0)return this.target;const n=[r[0]*this.p,r[1]*this.p];return this.current=[this.current[0]+n[0]*t,this.current[1]+n[1]*t],this.current}}var Zy=`#version 300 es

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
}`,Jy=`#version 300 es
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

    
}`;const _n=2,vn=class nt{constructor(e,t,r,n,a,s,o){this.canvasElem=e,this.wasmWaves=n,this.memory=a,this.lowPerf=o,this.camera=new Vt(50,1,.2,1e4),this.scene=new Gg,this.parallaxSmoother=new Ky(.01),this.oceanMeshList=[],[this.posPtr,this.partPtr]=s,this.renderer=new Iy({canvas:e,stencil:!1,depth:!0,antialias:!0,powerPreference:"high-performance"}),this.camera.position.set(0,0,nt.cameraDistance),this.wavePartialBufs=new Array(_n).fill(0).map(()=>new Ut(void 0,4)),this.wavePartialBufs.forEach(v=>v.setUsage(Nc)),this.wavePosBufs=new Array(_n).fill(0).map(()=>new Ut(void 0,4)),this.wavePosBufs.forEach(v=>v.setUsage(Nc));const l=this.renderer.extensions.has("OES_texture_float_linear");this.makeTex=new $y(this.wavePosBufs,this.wavePartialBufs,this.wasmWaves.width,_n,l);const c=[_t.DEFAULT_MAPPING,Qi,Qi,...l?[Bt,rg]:[wt,ig]];this.backTexLowRes=new _t(t,...c),this.backTexHighRes=new _t(r,...c),t.complete?(this.readyPromise=Promise.resolve(),this.backTexLowRes.needsUpdate=!0):this.readyPromise=new Promise(v=>{t.addEventListener("load",()=>{this.backTexLowRes.needsUpdate=!0,v()})}),r.complete?(this.floorTextureUniform=new St(this.backTexHighRes),this.backTexHighRes.needsUpdate=!0):(this.floorTextureUniform=new St(this.backTexLowRes),r.addEventListener("load",(()=>{this.floorTextureUniform.value=this.backTexHighRes,this.backTexHighRes.needsUpdate=!0}).bind(this))),this.oceanGeo=new yn(nt.getDomain(),nt.getDomain(),nt.waveProps.segments,nt.waveProps.segments);const u=this.makeRaytraceUniforms(),h=this.makeRaytraceDefines(),d=new ri({glslVersion:Zn,vertexShader:wa(Zy),fragmentShader:wa(Jy),uniforms:u,defines:h}),f=new ii(this.oceanGeo,d);f.position.set(0,0,0),this.scene.add(f),this.resizeObserver=new ResizeObserver(this.onResizeEvent.bind(this));try{this.resizeObserver.observe(e,{box:"device-pixel-content-box"})}catch{this.resizeObserver.observe(e,{box:"content-box"})}}static async MakeView(e,t,r,n){const a=await Vo.MakeWasmWaves({...nt.waveProps,lowPerf:n}),s=a.memory,o=a.getPtrs();return new nt(e,t,r,a,s,o,n)}static makeWaveTextureUvTransform(e,t){const r=[];for(let n=0;n<_n;n++){const a=nt.waveProps.tiling_off*Math.pow(10,-n),s=nt.waveProps.windows[n*2+1];r.push(new Ae().setUvTransform(t[0]+a,t[1]+a,e[0]/s,e[1]/s,0,0,0))}return r}static getDomain(){return nt.waveProps.windows[nt.waveProps.windows.length-1]}makeRaytraceDefines(){const{LeadrSampleCount:e,LeadrSampleSize:t}=nt.waveProps,r=t*(e-1)/2,n=Array.from({length:e},(o,l)=>t*l-r),a=n.map(o=>Math.exp(-.5*o*o)),s=n.flatMap((o,l)=>n.map((c,u)=>`vec4(${o}, ${c}, ${a[l]}, ${a[u]})`));return{LEADR_SAMPLE_COUNT:e,LEADR_SAMPLE_SIZE:t.toPrecision(21),LEADR_WEIGHTS:s.join(", ")}}makeRaytraceUniforms(){const{blending:e}=nt.waveProps,t=new Ae().setUvTransform(.5,.5,1/nt.getDomain(),1/nt.getDomain(),0,0,0);return{waveDisplacement:new St(this.makeTex.getDisplacementTexs()),waveMoments:new St(this.makeTex.getFirstMomentTexs()),waveSecMoments:new St(this.makeTex.getSecondMomentTexs()),waveTextureMatrix:new St(nt.makeWaveTextureUvTransform([1,-1],[1,1])),domain:new St(nt.getDomain()),floorPosition:new St(new F(0,0,-nt.waveProps.visualDepth)),floorTextureMatrix:new St(t),floorTexture:this.floorTextureUniform,floorSize:new St(nt.getDomain()),sunDirection:new St(nt.sunDirection),sunColor:new St(nt.sunColor),skyboxTex:new St(this.scene.background),waveBlending:new St(e)}}onResizeEvent(e){const t=e.filter(l=>l.target===this.canvasElem)[0];if(!t)return;let r,n,a;a=window.devicePixelRatio,t.devicePixelContentBoxSize?(r=t.devicePixelContentBoxSize[0].inlineSize,n=t.devicePixelContentBoxSize[0].blockSize,a=1):t.contentBoxSize?t.contentBoxSize[0]?(r=t.contentBoxSize[0].inlineSize,n=t.contentBoxSize[0].blockSize):(r=t.contentBoxSize.inlineSize,n=t.contentBoxSize.blockSize):(r=t.contentRect.width,n=t.contentRect.height);const s=this.lowPerf?.5:1;this.camera.aspect=r/n;let o=nt.cameraDistance;this.camera.aspect>=1&&(o=o/this.camera.aspect),this.camera.position.set(0,0,o),this.camera.updateProjectionMatrix(),this.renderer.setPixelRatio(a),this.renderer.setSize(r*s,n*s,!1)}updateGeoBuffers(e,t){for(let r=0;r<_n;r++){const n=this.wasmWaves.getPackedSizeBytes()*r,a=new Float32Array(this.memory.buffer,e+n,this.wasmWaves.getPackedSizeFloats());t[r].array=a,t[r].count=this.wasmWaves.getPackedSize(),t[r].needsUpdate=!0}}setParallax(e){this.parallaxSmoother.pushValue(e)}setParallaxInternal(e){const t=new F(e[0]*1.5,e[1]*1.5,this.camera.position.z);this.camera.position.set(t.x,t.y,t.z),this.camera.lookAt(0,0,0)}async update(e,t=!0){await this.readyPromise,t&&(this.wasmWaves.render({time:e*nt.waveProps.timeScale}),this.updateGeoBuffers(this.posPtr,this.wavePosBufs),this.updateGeoBuffers(this.partPtr,this.wavePartialBufs),this.makeTex.render(this.renderer)),this.setParallaxInternal(this.parallaxSmoother.getValue()),this.renderer.setRenderTarget(null),this.renderer.render(this.scene,this.camera)}};vn.waveProps={windows:[.13,5,5,10],blending:[.6,1],timeScale:.5,segments:128,depth:100,visualDepth:1,wind_speed:5,fetch:2e3,damping:3.3,swell:.7,rad_off:-60*Math.PI/180,tiling_off:.1,LeadrSampleCount:3,LeadrSampleSize:1.8},vn.sunDirection=new F(-2,0,-1).normalize(),vn.sunColor=new Xe(1,.8,.9),vn.cameraDistance=9;let Qy=vn;function Qu(i,e){return Math.min(Math.max(i,-e),e)}function eh(i,e){let t=(e-i+180)%360;return t<0&&(t+=360),t-180}async function eS(){const i=document.getElementById("canvas"),e=document.getElementById("bg"),t=document.getElementById("bg_sm"),r=document.getElementById("preview"),n=window.matchMedia("(max-width: 768px)");console.debug("Performance check",n.matches);const a=await Qy.MakeView(i,t,e,n.matches);let s=!1;const o=async h=>{await a.update(h/1e3,!0),s||(s=!0,r.style.opacity="0"),requestAnimationFrame(o)};requestAnimationFrame(o);let l,c;window.addEventListener("deviceorientation",h=>{if(typeof h.beta!="number"||typeof h.gamma!="number")return;(l===void 0||c===void 0)&&(l=h.beta,c=h.gamma);const d=180/Math.PI;a.setParallax([-Qu(eh(h.gamma,c)*d*.001,1),Qu(eh(h.beta,l)*d*.001,1)])},!0);const u=i.parentElement;u.addEventListener("mousemove",h=>{a.setParallax([-(h.offsetX/u.clientWidth*2-1),h.offsetY/u.clientHeight*2-1])}),u.addEventListener("mouseleave",()=>{a.setParallax([0,0])})}eS();
