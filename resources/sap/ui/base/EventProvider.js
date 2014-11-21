/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./Event','./Object','./ObjectPool'],function(q,E,B,O){"use strict";var a=B.extend("sap.ui.base.EventProvider",{constructor:function(){B.apply(this);this.mEventRegistry={}}});a.M_EVENTS={EventHandlerChange:"EventHandlerChange"};a.prototype.oEventPool=new O(E);a.prototype.attachEvent=function(e,d,f,l){if(typeof(d)==="function"){l=f;f=d;d=undefined}if(!this.mEventRegistry[e]){this.mEventRegistry[e]=[]}this.mEventRegistry[e].push({oListener:l,fFunction:f,oData:d});this.fireEvent(a.M_EVENTS.EventHandlerChange,{EventId:e,type:'listenerAttached'});return this};a.prototype.attachEventOnce=function(e,d,f,l){if(typeof(d)==="function"){l=f;f=d;d=undefined}function o(){this.detachEvent(e,o);f.apply(l||this,arguments)}this.attachEvent(e,d,o,undefined);return this};a.prototype.detachEvent=function(e,f,l){var b=this.mEventRegistry[e];if(!b){return this}var L=false;for(var i=0,c=b.length;i<c;i++){if(b[i].fFunction===f&&b[i].oListener===l){b.splice(i,1);L=true;break}}if(b.length==0){delete this.mEventRegistry[e]}if(L){this.fireEvent(a.M_EVENTS.EventHandlerChange,{EventId:e,type:'listenerDetached'})}return this};a.prototype.fireEvent=function(e,p,A,b){if(typeof p=="boolean"){b=A;A=p}var c=this.mEventRegistry[e],P=false,o,d,I;if(b||(c&&q.isArray(c))){c=c?c.slice():[];o=this.oEventPool.borrowObject(e,this,p);for(var i=0,l=c.length;i<l;i++){I=c[i];I.fFunction.call(I.oListener||this,o,I.oData)}if(b){d=this.getEventingParent();while(d&&!o.bCancelBubble){c=d.mEventRegistry[e];if(c&&c instanceof Array){c=c.slice();for(var i=0,l=c.length;i<l;i++){I=c[i];I.fFunction.call(I.oListener||d,o,I.oData)}}d=d.getEventingParent()}}P=o.bPreventDefault;this.oEventPool.returnObject(o)}if(A){return!P}else{return this}};a.prototype.hasListeners=function(e){return!!this.mEventRegistry[e]};a.getEventList=function(e){return e.mEventRegistry};a.prototype.getEventingParent=function(){return null};a.prototype.toString=function(){if(this.getMetadata){return"EventProvider "+this.getMetadata().getName()}else{return"EventProvider"}};a.prototype.destroy=function(){this.mEventRegistry={};B.prototype.destroy.apply(this,arguments)};return a},true);
