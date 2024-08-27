;/*FB_PKG_DELIM*/

__d("FalcoAppUniverse",["$InternalEnum"],(function(a,b,c,d,e,f){a=b("$InternalEnum")({FACEBOOK:1,INSTAGRAM:2,OCULUS:3});c=a;f["default"]=c}),66);
__d("Queue",[],(function(a,b,c,d,e,f){var g={};a=function(){function a(a){this._timeout=null,this._interval=(a==null?void 0:a.interval)||0,this._processor=a==null?void 0:a.processor,this._queue=[],this._stopped=!0}var b=a.prototype;b._dispatch=function(a){var b=this;a===void 0;if(this._stopped||this._queue.length===0)return;a=this._processor;if(a==null){this._stopped=!0;throw new Error("No processor available")}var c=this._interval;if(c!=null)a.call(this,this._queue.shift()),this._timeout=setTimeout(function(){return b._dispatch()},c);else while(this._queue.length)a.call(this,this._queue.shift())};b.enqueue=function(a){this._processor&&!this._stopped?this._processor(a):this._queue.push(a);return this};b.start=function(a){a&&(this._processor=a);this._stopped=!1;this._dispatch();return this};b.isStarted=function(){return!this._stopped};b.dispatch=function(){this._dispatch(!0)};b.stop=function(a){this._stopped=!0;a&&this._timeout!=null&&clearTimeout(this._timeout);return this};b.merge=function(a,b){if(b){(b=this._queue).unshift.apply(b,a._queue)}else{(b=this._queue).push.apply(b,a._queue)}a._queue=[];this._dispatch();return this};b.getLength=function(){return this._queue.length};a.get=function(b,c){var d;b in g?d=g[b]:d=g[b]=new a(c);return d};a.exists=function(a){return a in g};a.remove=function(a){return delete g[a]};return a}();f["default"]=a}),66);
__d("FalcoLoggerTransports",["AnalyticsCoreData","Banzai","ExecutionEnvironment","FalcoAppUniverse","FalcoUtils","ODS","PersistedQueue","Queue","WebSession","performanceAbsoluteNow","promiseDone","requireDeferredForDisplay","uuidv4"],(function(a,b,c,d,e,f,g){"use strict";var h,i,j,k,l=c("requireDeferredForDisplay")("TransportSelectingClientSingletonConditional").__setRef("FalcoLoggerTransports"),m=5*1024,n=(b=(i||(i=c("AnalyticsCoreData"))).max_delay_br_queue)!=null?b:60*1e3,o=(e=(i||(i=c("AnalyticsCoreData"))).max_delay_br_queue_immediate)!=null?e:1e3;b=(f=(i||(i=c("AnalyticsCoreData"))).max_delay_br_init_not_complete)!=null?f:1e3;var p="falco:",q=new(c("Queue"))(),r=5e3,s=6e4,aa=c("uuidv4")(),ba="ods_web_batch",t=new Map(),u=new Set(),v=new Set(),w=d("FalcoUtils").getTaggedBitmap(38),x=(e=c("FalcoAppUniverse").cast((i||(i=c("AnalyticsCoreData"))).app_universe))!=null?e:1,y=[],z=0,A=null,B=!1,C=!1,D=!1,E=!0,F=!1,G=Date.now()-s,H=1,I=b>n?b:n,J=b;Y();for(e=(f=(i||(i=c("AnalyticsCoreData"))).stateful_events_list_for_br)!=null?f:[],b=Array.isArray(e),f=0,e=b?e:e[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]();;){var K;if(b){if(f>=e.length)break;K=e[f++]}else{f=e.next();if(f.done)break;K=f.value}K=K;u.add(K)}for(f=(K=(i||(i=c("AnalyticsCoreData"))).stateless_non_fb_events_for_br)!=null?K:[],b=Array.isArray(f),e=0,f=b?f:f[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]();;){if(b){if(e>=f.length)break;K=f[e++]}else{e=f.next();if(e.done)break;K=e.value}K=K;v.add(K)}function L(){return(i||(i=c("AnalyticsCoreData"))).enable_bladerunner&&!(k||(k=c("ExecutionEnvironment"))).isInWorker}function M(a,b){d("FalcoUtils").bumpODSMetrics(b.item.name,"event.info.streaming.batched",1);var c=b.item.extra.length;z+c>m&&(clearTimeout(A),N());y.push([a,b]);z+=c}function N(){A=null;B=!1;var a=y;S("event.info.streaming.batch_processing",a.map(function(a){return a[1].item}));!F?O(a,"event.non_critical_failure.streaming_init_not_complete"):q.enqueue(function(b){return b.log(a.map(function(a){return a[1].item}),function(b){if(!b){O(a,"event.info.banzai_fallback");return}P(a,b,"event.info.streaming.enqueued")})});y=[];z=0}function O(a,b){var c=function(){var c,f=a[e],g=f[0],h=f[1];f=h.item;d("FalcoUtils").bumpODSMetrics(f.name,b,1);if((c=f.logCritical)!=null?c:!1)U.logCritical([f],function(a){return g.markItem(h,a)});else{((c=f.logImmediate)!=null?c:!1)?U.logImmediately([f],function(a){return g.markItem(h,a)}):U.log([f],function(a){return g.markItem(h,a)})}};for(var e=0;e<a.length;e++)c();return}function P(a,b,c){for(var e=0;e<a.length;e++){var f=a[e],g=f[0];f=f[1];d("FalcoUtils").bumpODSMetrics(f.item.name,c,1);g.markItem(f,b)}}function ca(a){return{events:a.map(function(a){return{name:a.name,extra:a.extra,rate:a.policy.r,time:a.time/1e3,tag:0,tags:a.tags,shouldAddState:a.shouldAddState,identity:Q(a.identity),expTags:a.exptTags}})}}function da(a){var b;a={deviceId:(i||(i=c("AnalyticsCoreData"))).device_id,familyDeviceId:null,osBuildNumber:null,sessionId:a,appId:i.app_id,appVersion:(a=(i||(i=c("AnalyticsCoreData"))).app_version)!=null?a:null,bundleId:null,consentState:null,identity:null,pushPhase:i.push_phase};((b=(b=(i||(i=c("AnalyticsCoreData"))).stateful_events_list_for_br)==null?void 0:b.length)!=null?b:0)>0&&(a.ambientState=(i||(i=c("AnalyticsCoreData"))).state_for_br);a.identity=Q(i.identity);return Object.freeze(a)}function Q(a){if(x===2||x===3){var b=a==null?void 0:a.appScopedIdentity;if(b!==void 0)return{appScopedIdentity:{uid:b,identifier:b,claims:[]}}}else{b=a==null?void 0:a.fbIdentity;if(b!==void 0)return{facebookIdentity:{actorId:b.actorId,accountId:b.accountId,claims:[]}}}return null}function R(a,b){for(var e=0;e<a.length;e++){var f,g=a[e];f=(f={},f.e=g.extra,f.r=g.policy.r,f.d=(i||(i=c("AnalyticsCoreData"))).device_id,f.s=d("WebSession").getId(),f.t=g.time,f);g.privacyContext&&(f.p=g.privacyContext);g.tags!=null&&(f.b=g.tags);var h=g.identity;h&&(f.id=h);c("Banzai").post(p+g.name,f,b)}S("event.uploaded",a)}function S(a,b){for(var c=0;c<b.length;c++){var e=b[c];e.name!==ba&&d("FalcoUtils").bumpODSMetrics(e.name,a,1)}}function T(a,b){var e="falco.fabric.www."+(i||(i=c("AnalyticsCoreData"))).push_phase;(h||(h=d("ODS"))).bumpEntityKey(1344,e,a,b)}var U={log:function(a,b){S("event.info.banzai.log.upload_processing",a),R(a,c("Banzai").BASIC),b(!0)},logImmediately:function(a,b){S("event.info.banzai.log_immediately.upload_processing",a),R(a,c("Banzai").VITAL),b(!0)},logCritical:function(a,b){S("event.info.banzai.log_critical.upload_processing",a),R(a,{signal:!0,retry:!0}),b(!0)}};function ea(a){Y();var b=V(a,"banzai_data_loss","log"),d=V(a,"banzai_data_loss","logImmediately"),e=V(a,"banzai_data_loss","logCritical"),f=V(a,"bladerunner_data_loss",""),g=V(a,"bladerunner_data_loss","logCritical");T("js.br_data_loss.posted."+a,1);if(F&&E)try{q.enqueue(function(b){return b.log([f],function(b){if(!b){T("js.br.transport_failure."+a,1);U.logCritical([g],function(b){T("js.br.failure_fallback_success_callback."+a,1)});return}T("js.br.success_callback."+a,1)})})}catch(b){T("js.br.error_enqueueing."+a,1),U.logCritical([g],function(b){T("js.br.enqueuing_fallback_success_callback."+a,1)})}else E||T("js.br.failed."+a,1),F||T("js.br.init_not_complete."+a,1),U.logCritical([g],function(b){T("js.br.init_fallback_success_callback."+a,1)});R([b],c("Banzai").BASIC);R([d],c("Banzai").VITAL);R([e],{signal:!0,retry:!0})}function V(a,b,d){return{name:b,time:(j||(j=c("performanceAbsoluteNow")))(),policy:{r:1},extra:JSON.stringify({event_index:a,falco_js_connection_id:aa,logging_mode:d,logging_flow_flag:"original_flow"})}}function W(){G+r<Date.now()&&(ea(H),G=Date.now(),H++)}function X(){window.setTimeout(function(){W(),H<=40&&X()},s)}function fa(a){q.start(function(b){return b({log:function(d,b){S("event.info.streaming.queue_processing",d);var e=JSON.stringify(ca(d));a?(i||(i=c("AnalyticsCoreData"))).enable_ack?c("promiseDone")(a.amendWithAck(e),function(a){a?(S("event.streamed.with_ack",d),S("event.uploaded",d)):S("event.non_critical_failure.streaming.ack_failed",d),b(a)},function(){S("event.non_critical_failure.streaming.ack_rejected",d),b(!1)}):(a.amendWithoutAck(e),S("event.streamed.without_ack",d),S("event.uploaded",d)):(S("event.non_critical_error.streaming.stream_not_available",d),b(!1))},logImmediately:function(b,a){this.log(b,a)},logCritical:function(b,a){this.log(b,a)}})})}function Y(){if(C)return;F=!1;if(!L())return;l.onReady(function(a){if(!a){E=!1;q.start(function(a){return a(U)});return}a=a;var b={onTermination:function(a){a.message==="Stream closed"?(q.stop(!0),C=!1):(d("FalcoUtils").bumpODSMetrics("","streaming.non_critical_failure.rejected",1),E=!1,q.start(function(a){return a(U)}))},onFlowStatus:function(){}};c("promiseDone")(a.requestStream({method:"Falco"},JSON.stringify(da(d("WebSession").getId())),b,{requestId:""}).then(function(b){a=b,fa(a),F=!0,I=n,J=o})["catch"](function(a){d("FalcoUtils").bumpODSMetrics("","streaming.non_critical_failure.failed",1),q.stop(!0),C=!1}))});C=!0}function Z(a){var b,e=a.name;if(!L()||!E)return!1;if(u.has(e)||a.policy.s!==1&&((b=(i||(i=c("AnalyticsCoreData"))).br_stateful_migration_on)!=null?b:!1)){a.shouldAddState=!0;a.tags=d("FalcoUtils").xorBitmap((b=a.tags)!=null?b:[0,0],w);return!0}if(x!==1&&(i||(i=c("AnalyticsCoreData"))).enable_non_fb_br_stateless_by_default!==!0&&!v.has(e))return!1;if(a.policy.s===1){a.tags=d("FalcoUtils").xorBitmap((b=a.tags)!=null?b:[0,0],w);return!0}return!1}function $(a){if(a==="")return null;if(t.has(a))return t.get(a);else{var b={claim:""},c=a.split("^#");if(c.length>=4){var d=c[0],e=c[1],f=c[2];c=c[3];f!==""?b={appScopedIdentity:f,claim:c}:d!==""&&(b={fbIdentity:{accountId:d,actorId:e},claim:c});t.set(a,b)}return b}}function a(){if(D)return;D=!0;c("PersistedQueue").setHandler("falco_queue_log",function(b){var c,e=b.getQueueNameSuffix(),f=$(e);while(c=b.dequeueItem())(function(c){Z(c.item)?(d("FalcoUtils").bumpODSMetrics(c.item.name,"event.info.upload_method.streaming.log",1),Y(),A==null&&(A=setTimeout(N,I)),f&&!a(e)&&(c.item.identity=f),M(b,c)):(f&&(c.item.identity=f),U.log([c.item],function(a){return b.markItem(c,a)}))})(c)});c("PersistedQueue").setHandler("falco_queue_immediately",function(b){var e,f=b.getQueueNameSuffix(),g=$(f);while(e=b.dequeueItem())(function(e){Z(e.item)?(d("FalcoUtils").bumpODSMetrics(e.item.name,"event.info.upload_method.streaming.log_immediately",1),Y(),(A==null||!B)&&(clearTimeout(A),A=setTimeout(N,J),B=!0),e.item.logImmediate=!0,g&&!a(f)&&(e.item.identity=g),M(b,e),c("PersistedQueue").isPersistenceAllowed()||(d("FalcoUtils").bumpODSMetrics(e.item.name,"event.info.streaming_no_persistence.log_immediately",1),N())):(d("FalcoUtils").bumpODSMetrics(e.item.name,"event.info.upload_method.banzai.log_immediately",1),g&&(e.item.identity=g),U.logImmediately([e.item],function(a){return b.markItem(e,a)}))})(e)});c("PersistedQueue").setHandler("falco_queue_critical",function(b){var c,e=b.getQueueNameSuffix(),f=$(e);while(c=b.dequeueItem())(function(c){var g=c.item;Z(g)?(d("FalcoUtils").bumpODSMetrics(c.item.name,"event.info.upload_method.streaming.log_critical",1),Y(),g.logCritical=!0,!F?(f&&(g.identity=f),O([[b,c]],"event.non_critical_failure.streaming_init_not_complete.log_critical")):(f&&!a(e)&&(g.identity=f),q.enqueue(function(a){return a.logCritical([g],function(a){if(!a){!g.identity&&f&&(g.identity=f);O([[b,c]],"event.info.banzai_fallback.log_critical");return}P([[b,c]],a,"event.uploaded")})}))):(f&&(g.identity=f),d("FalcoUtils").bumpODSMetrics(c.item.name,"event.info.upload_method.banzai.log_critical",1),U.logCritical([g],function(a){return b.markItem(c,a)}))})(c)});(i||(i=c("AnalyticsCoreData"))).enable_dataloss_timer&&(Y(),W(),X());function a(a){try{var b=d("FalcoUtils").identityToString((i||(i=c("AnalyticsCoreData"))).identity);return a===b}catch(a){(h||(h=d("ODS"))).bumpEntityKey(1344,"js.br.identity.check","exception.when.comparing.with.current.user.identity",1);return!0}}}g.attach=a}),98);
__d("TransportSelectingClientSingletonConditional",["cr:710"],(function(a,b,c,d,e,f,g){"use strict";g["default"]=b("cr:710")}),98);/*FB_PKG_DELIM*/
__d("BaseProfilePhoto.react",["fbt","BaseAspectRatioContainer.react","BaseSvgImage.react","Locale","react","stylex","useSetAttributeRef"],(function(a,b,c,d,e,f,g,h){"use strict";var i,j,k=j||(j=d("react")),l=j.useId,m={overlay:{fill:"x1tgjyoi",$$css:!0}},n={"bottom-left":{bottom:"xy5qijl",left:"xsoyeob",start:null,end:null,position:"x10l6tqk",transform:"x1m9mm8y",$$css:!0},"bottom-right":{bottom:"xy5qijl",position:"x10l6tqk",right:"xitx4z4",start:null,end:null,transform:"x4v1no5",$$css:!0},left:{$$css:!0},right:{$$css:!0},"top-left":{left:"xsoyeob",start:null,end:null,position:"x10l6tqk",top:"x3yj52l",transform:"x11lhmoz",$$css:!0},"top-right":{position:"x10l6tqk",right:"xitx4z4",start:null,end:null,top:"x9ggj5r",transform:"x147yg2k",$$css:!0}},o={"bottom-left":{bottom:"x1ey2m1c",left:"xu96u03",start:null,end:null,position:"x10l6tqk",transform:"x1m9mm8y",$$css:!0},"bottom-right":{bottom:"x1ey2m1c",position:"x10l6tqk",right:"x3m8u43",start:null,end:null,transform:"x4v1no5",$$css:!0},left:{$$css:!0},right:{$$css:!0},"top-left":{left:"xu96u03",start:null,end:null,position:"x10l6tqk",top:"x13vifvy",transform:"x11lhmoz",$$css:!0},"top-right":{position:"x10l6tqk",right:"x3m8u43",start:null,end:null,top:"x13vifvy",transform:"x147yg2k",$$css:!0}},p=[];function q(a){var b=c("Locale").isRTL();switch(a){case"top-start":return b?"top-right":"top-left";case"top-end":return b?"top-left":"top-right";case"bottom-start":return b?"bottom-right":"bottom-left";case"bottom-end":return b?"bottom-left":"bottom-right";case"start":return b?"right":"left";case"end":return b?"left":"right"}}function a(a){var b,d=a.cutouts;d=d===void 0?p:d;var e=a.hasOverlay;e=e===void 0?!1:e;var f=a.imageUri,g=a.backgroundFill,j=a.maskedChildren,s=a.outline,t=a.addOns,u=a.overlayXStyle,v=a.ring,w=a.isDecorative;w=w===void 0?!1:w;var x=a.alt,y=a.shape,z=a.size;a=a.testid;a=l();var A=l(),B=c("useSetAttributeRef")("id",a),C="url(#"+a+")",D=c("useSetAttributeRef")("mask",C);b=(b=v)!=null?b:{};var E=b.gap;E=E===void 0?0:E;b=b.thickness;var F=b===void 0?0:b;b=E+F;E=y==="circle"?k.jsx("circle",{cx:"50%",cy:"50%",r:"calc(50% - "+b+"px)"}):y.type==="square"?k.jsx("rect",{height:"calc(100% - "+2*b+"px)",rx:Math.max(0,y.borderRadius-E-F/2),ry:Math.max(0,y.borderRadius-E-F/2),width:"calc(100% - "+2*b+"px)",x:b,y:b}):y.element;var G=function(a){if(v==null)return null;if(y==="circle"){var b;return k.jsx("circle",{cx:"50%",cy:"50%",fill:"transparent",r:v!=null?"calc(50% - "+F/2+"px)":"50%",stroke:(b=a)!=null?b:v.color,strokeWidth:F})}if(y.type==="square"){return k.jsx("rect",{fill:"transparent",height:"calc(100% - "+F+"px)",rx:y.borderRadius,ry:y.borderRadius,stroke:(b=a)!=null?b:v.color,strokeWidth:F,width:"calc(100% - "+F+"px)",x:F/2,y:F/2})}return null},H=g!=null&&typeof g!=="string"?k.jsx("defs",{children:k.jsx(g,{gradientId:A})}):null;return k.jsxs(c("BaseAspectRatioContainer.react"),{aspectRatio:1,testid:void 0,children:[k.jsxs("svg",{"aria-hidden":w,className:"x5yr21d xh8yej3",height:z,width:z,children:[(typeof x==="string"||h.isFbtInstance(x))&&k.jsx("title",{children:x}),H,k.jsxs("mask",{id:a,ref:B,suppressHydrationWarning:!0,children:[k.jsx("g",{fill:"white",children:E}),G("white"),k.jsx("g",{fill:"black",children:d.map(function(a,b){return k.jsx(r,{cutout:a,shape:y},b)})})]}),k.jsxs("g",{mask:C,ref:D,suppressHydrationWarning:!0,children:[g!=null?k.jsx("rect",{fill:typeof g==="string"?g:"url(#"+A+")",height:"calc(100% - "+2*b+"px)",suppressHydrationWarning:!0,width:"calc(100% - "+2*b+"px)",x:b,y:b}):null,f!=null&&k.jsx(c("BaseSvgImage.react"),{src:f,style:{height:"calc(100% - "+2*b+"px)",width:"calc(100% - "+2*b+"px)"},x:b,y:b}),s!=null&&k.jsx("g",{fill:"transparent",stroke:s.color,strokeWidth:s.thickness*2,children:E}),G(),j,e&&k.jsx("rect",{className:(i||(i=c("stylex")))(m.overlay,u),height:"100%",width:"100%"})]})]}),t&&k.jsx("div",{className:"x1ey2m1c x9f619 xds687c x17qophe x10l6tqk x13vifvy",children:t.map(function(a,b){if(a.type==="custom")return k.jsx(k.Fragment,{children:a.element},b);return y==="circle"?k.jsx("div",{className:(i||(i=c("stylex")))(n[q(a.position)]),children:a.children},b):k.jsx("div",{className:(i||(i=c("stylex")))(o[q(a.position)]),children:a.children},b)})})]})}a.displayName=a.name+" [from "+f.id+"]";function r(a){var b=a.cutout;a=a.shape;if(b.type==="addOnCircle"){var d=typeof b.radius==="number"?b.radius:b.radius.value/2+"%",e=b.offsetX;e=e===void 0?0:e;var f=b.offsetY;f=f===void 0?0:f;e=c("Locale").isRTL()?-e:e;switch(q(b.position)){case"top-left":if(a==="circle")return k.jsx("circle",{cx:e?"calc(14.65% + "+e+"px)":"14.65%",cy:f?"calc(14.65% + "+f+"px)":"14.65%",r:d});else return k.jsx("circle",{cx:e?"calc(0% + "+e+"px)":"0%",cy:f?"calc(0% + "+f+"px)":"0%",r:d});case"top-right":if(a==="circle")return k.jsx("circle",{cx:e?"calc(85.35% + "+e+"px)":"85.35%",cy:f?"calc(14.65% + "+f+"px)":"14.65%",r:d});else return k.jsx("circle",{cx:e?"calc(100% + "+e+"px)":"100%",cy:f?"calc(0% + "+f+"px)":"0%",r:d});case"bottom-left":if(a==="circle")return k.jsx("circle",{cx:e?"calc(14.65% + "+e+"px)":"14.65%",cy:f?"calc(85.35% + "+f+"px)":"85.35%",r:d});else return k.jsx("circle",{cx:e?"calc(0% + "+e+"px)":"0%",cy:f?"calc(100% + "+f+"px)":"100%",r:d});case"bottom-right":default:if(a==="circle")return k.jsx("circle",{cx:e?"calc(85.35% + "+e+"px)":"85.35%",cy:f?"calc(85.35% + "+f+"px)":"85.35%",r:d});else return k.jsx("circle",{cx:e?"calc(100% + "+e+"px)":"100%",cy:f?"calc(100% + "+f+"px)":"100%",r:d})}}if(b.type==="overlap"){if(a==="circle"){e=b.overlap;f=b.position;d=q(f);f=typeof e!=="number"?null:f==="bottom-start"?"translateXY("+e+"px, "+-e+"px)":"translateX("+(f==="start"?e:-e)+"px)";var g=50,h=50;switch(d){case"bottom-left":g=-35.36;h=135.36;typeof e!=="number"&&(g+=e.value,h-=e.value);break;case"bottom-right":g=35.36;h=135.36;typeof e!=="number"&&(g+=100-e.value,h-=e.value);break;case"left":g=-50;typeof e!=="number"&&(g+=e.value);break;case"right":g=50;typeof e!=="number"&&(g+=100-e.value);break}return k.jsx("circle",{cx:g+"%",cy:h+"%",r:"calc(50% + "+b.gap+"px)",style:f!=null?{transform:f}:{}})}if(a.type==="square")return k.jsx("rect",{height:"100%",rx:a.borderRadius,ry:a.borderRadius,width:"100%"})}else return b.element;return null}r.displayName=r.name+" [from "+f.id+"]";g["default"]=a}),98);
__d("CDSProfilePhotoImpl.react",["BaseProfilePhoto.react","BaseView.react","CDSImage.react","react","useBaseIsDecorative"],(function(a,b,c,d,e,f,g){"use strict";var h,i=h||d("react"),j={badgeStyle:{alignContent:"xc26acl",display:"x78zum5",justifyContent:"xl56j7k",$$css:!0},frame:{borderTopStartRadius:"x14yjl9h",borderTopEndRadius:"xudhj91",borderBottomEndRadius:"x18nykt9",borderBottomStartRadius:"xww2gxu",position:"x10l6tqk",$$css:!0}},k={24:{height:"xxk0z11",start:"xvsiv8e",left:null,right:null,top:"x3rvi15",width:"xvy4d1p",$$css:!0},28:{height:"x1fgtraw",start:"xcv8jiq",left:null,right:null,top:"x1xcsuk1",width:"xgd8bvy",$$css:!0},32:{height:"x10w6t97",start:"x3z54cy",left:null,right:null,top:"x1aj48qs",width:"x1td3qas",$$css:!0},40:{height:"x1vqgdyp",start:"x1w95yp9",left:null,right:null,top:"x5u4d5m",width:"x100vrsf",$$css:!0},60:{height:"xng8ra",start:"x1295k10",left:null,right:null,top:"xas85n",width:"x1247r65",$$css:!0},80:{height:"xwzfr38",start:"xvx6eq3",left:null,right:null,top:"x1y8mfey",width:"x1dmp6jm",$$css:!0},100:{height:"xpyat2d",start:"x1pivdj7",left:null,right:null,top:"x3evz2w",width:"x1exxlbk",$$css:!0},180:{height:"x1b51vyi",start:"x1ir6jk4",left:null,right:null,top:"x6b04ah",width:"xzjbwwf",$$css:!0},260:{height:"xdwzuf7",start:"x1h9elbt",left:null,right:null,top:"x1nvsgzu",width:"x1hfn5x7",$$css:!0}},l={dense:{borderTopStartRadius:"x1rcc7c0",borderTopEndRadius:"xbtbmw4",borderBottomEndRadius:"x1lie4ck",borderBottomStartRadius:"x16hxpj1",height:"x1v9usgg",width:"x6jxa94",$$css:!0},large:{borderTopStartRadius:"x12myldv",borderTopEndRadius:"x1udsgas",borderBottomEndRadius:"xrc8dwe",borderBottomStartRadius:"xxxhv2y",height:"xmix8c7",width:"x1xp8n7a",$$css:!0},regular:{borderTopStartRadius:"x1lq5wgf",borderTopEndRadius:"xgqcy7u",borderBottomEndRadius:"x30kzoy",borderBottomStartRadius:"x9jhf4c",height:"xlup9mm",width:"x1kky2od",$$css:!0}},m={dense:20/2,large:24/2,regular:22/2},n={24:{width:"xvy4d1p",$$css:!0},28:{width:"xgd8bvy",$$css:!0},32:{width:"x1td3qas",$$css:!0},40:{width:"x100vrsf",$$css:!0},60:{width:"x1247r65",$$css:!0},80:{width:"x1dmp6jm",$$css:!0},100:{width:"x1exxlbk",$$css:!0},180:{width:"xzjbwwf",$$css:!0},260:{width:"x1hfn5x7",$$css:!0}},o={24:{width:"xgd8bvy",$$css:!0},28:{width:"x1td3qas",$$css:!0},32:{width:"x14qfxbe",$$css:!0},40:{width:"x187nhsf",$$css:!0},60:{width:"x1fu8urw",$$css:!0},80:{width:"x19v3vle",$$css:!0},100:{width:"x1sb9yw4",$$css:!0},180:{width:"x1so1ns2",$$css:!0},260:{width:"x1q5yig5",$$css:!0}};function a(a){var b=a.hasBorder===!0&&a.shape==="circle",d,e;if(a.shape==="circle"&&a.badge!=null){d=a.addOns?a.addOns.slice():[];e=a.cutouts?a.cutouts.slice():[];var f=a.badge,g=f.icon;f=f.size;e.push({position:"bottom-end",radius:m[f],type:"addOnCircle"});d.push({children:i.jsx(c("BaseView.react"),{xstyle:[j.badgeStyle,l[f]],children:g}),position:"bottom-end",type:"badge"})}else if(a.shape==="circle"&&a.frameUri!=null){f=a.frameUri;d=a.addOns?a.addOns.slice():[];d.push({children:i.jsx(c("CDSImage.react"),{src:f,xstyle:[j.frame,k[a.size]]}),position:"top-start",type:"badge"})}g=c("useBaseIsDecorative")({isDecorative:a.isDecorative,label:a.label})?!0:void 0;return i.jsx(c("BaseView.react"),{"aria-hidden":g,"aria-label":a.label,role:"img",xstyle:[a.xstyle,b?o[a.size]:n[a.size]],children:i.jsx(c("BaseProfilePhoto.react"),{addOns:d||a.addOns,backgroundFill:a.backgroundFill,cutouts:e||a.cutouts,hasOverlay:a.hasOverlay,imageUri:a.imageUri,isDecorative:!0,maskedChildren:a.maskedChildren,outline:{color:"var(--media-inner-border)",thickness:1},overlayXStyle:a.hasOverlay===!0?a.overlayXStyle:void 0,ring:a.hasBorder===!0?{color:"var(--card-background)",gap:0,thickness:a.size===28||a.size===32||a.size===40||a.size===60?2:a.size===100?4:a.size===180||a.size===260?6:0}:void 0,shape:a.shape==="square"?{borderRadius:4,type:"square"}:"circle",size:a.size,testid:void 0})})}a.displayName=a.name+" [from "+f.id+"]";g["default"]=a}),98);
__d("CDSProfilePhoto.react",["CDSProfilePhotoImpl.react","react"],(function(a,b,c,d,e,f,g){"use strict";var h,i=h||d("react");function a(a){return i.jsx(c("CDSProfilePhotoImpl.react"),babelHelpers["extends"]({},a))}a.displayName=a.name+" [from "+f.id+"]";g["default"]=a}),98);
__d("CDSToast.react",["fbt","BaseToast.react","CDSIcon.react","CDSIconButton.react","CDSText.react","MetaBrandXFilled24.svg.react","react"],(function(a,b,c,d,e,f,g,h){"use strict";var i,j=i||d("react"),k={header:{marginBottom:"x1e56ztr",$$css:!0},link:{paddingTop:"x1iorvi4",paddingBottom:"xjkvuk6",wordBreak:"xdnwjd9",$$css:!0}};b=j.forwardRef(a);function a(a,b){var d=a.action,e=a.addOnStart,f=a.header,g=a.message,i=a.onDismiss,l=a.size;l=l===void 0?"full-width":l;var m=a.testid;m=a.withoutCloseButton;a=m===void 0?!1:m;return j.jsx(c("BaseToast.react"),{action:d!=null?{label:d.label,labelRenderer:function(a){return j.jsx(c("CDSText.react"),{color:"toastTextLink",textStyle:"body",xstyle:k.link,children:a})},onPress:d.onPress,testid:d.testid}:void 0,addOnStart:e,closeButton:!a&&j.jsx(c("CDSIconButton.react"),{"aria-label":h._("Close"),onPress:i,children:j.jsx(c("CDSIcon.react"),{color:"toast-DO_NOT_USE_WILL_BE_DELETED_WITHOUT_NOTICE",icon:c("MetaBrandXFilled24.svg.react"),size:24})}),message:function(a){a=a.toastMessageId;return j.jsxs("div",{className:"x78zum5 xdt5ytf",id:a,children:[f!=null&&j.jsx(c("CDSText.react"),{color:"toastText_DO_NOT_USE_WILL_BE_DELETED_WITHOUT_NOTICE",textStyle:"bodyEmphasized",xstyle:k.header,children:f}),j.jsx(c("CDSText.react"),{color:"toastText_DO_NOT_USE_WILL_BE_DELETED_WITHOUT_NOTICE",textStyle:"body",children:g})]})},onDismiss:i,size:l,testid:void 0,toastRef:b})}a.displayName=a.name+" [from "+f.id+"]";e=b;g["default"]=e}),226);
__d("PrivacyCenterFalcoEvent",["FalcoLoggerInternal","getFalcoLogPolicy_DO_NOT_USE"],(function(a,b,c,d,e,f,g){"use strict";a=c("getFalcoLogPolicy_DO_NOT_USE")("150");b=d("FalcoLoggerInternal").create("privacy_center",a);e=b;g["default"]=e}),98);