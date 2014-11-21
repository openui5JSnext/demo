/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./library','sap/ui/core/Control','sap/ui/core/PopupSupport'],function(q,a,C,P){"use strict";var N=C.extend("sap.m.NavContainer",{metadata:{library:"sap.m",properties:{height:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:'100%'},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:'100%'},visible:{type:"boolean",group:"Appearance",defaultValue:true},defaultTransitionName:{type:"string",group:"Appearance",defaultValue:"slide"}},defaultAggregation:"pages",aggregations:{pages:{type:"sap.ui.core.Control",multiple:true,singularName:"page"}},associations:{initialPage:{type:"sap.ui.core.Control",multiple:false}},events:{navigate:{allowPreventDefault:true,parameters:{from:{type:"sap.ui.core.Control"},fromId:{type:"string"},to:{type:"sap.ui.core.Control"},toId:{type:"string"},firstTime:{type:"boolean"},isTo:{type:"boolean"},isBack:{type:"boolean"},isBackToTop:{type:"boolean"},isBackToPage:{type:"boolean"},direction:{type:"string"}}},afterNavigate:{parameters:{from:{type:"sap.ui.core.Control"},fromId:{type:"string"},to:{type:"sap.ui.core.Control"},toId:{type:"string"},firstTime:{type:"boolean"},isTo:{type:"boolean"},isBack:{type:"boolean"},isBackToTop:{type:"boolean"},isBackToPage:{type:"boolean"},direction:{type:"string"}}}}}});N.prototype.init=function(){this._pageStack=[];this._aQueue=[];this._mVisitedPages={};this._mFocusObject={};this._iTransitionsCompleted=0;this._bNeverRendered=true;this._bNavigating=false};N.prototype.onBeforeRendering=function(){var p=this.getCurrentPage();if(this._bNeverRendered&&p){var b=p.getId();if(!this._mVisitedPages[b]){this._mVisitedPages[b]=true;var n={from:null,fromId:null,to:p,toId:b,firstTime:true,isTo:false,isBack:false,isBackToPage:false,isBackToTop:false,direction:"initial"};var e=q.Event("BeforeFirstShow",n);e.srcControl=this;e.data=this._oToDataBeforeRendering||{};e.backData={};p._handleEvent(e);e=q.Event("BeforeShow",n);e.srcControl=this;e.data=this._oToDataBeforeRendering||{};e.backData={};p._handleEvent(e)}}};N.prototype.onAfterRendering=function(){var p=this.getCurrentPage();if(this._bNeverRendered&&p){this._bNeverRendered=false;delete this._bNeverRendered;var b=p.getId();if(!this.$().closest('[data-sap-ui-area="sap-ui-static"]').length){var f=q.sap.byId(b).firstFocusableDomRef();if(f){q.sap.focus(f);this._mFocusObject[b]=f}}var n={from:null,fromId:null,to:p,toId:b,firstTime:true,isTo:false,isBack:false,isBackToTop:false,isBackToPage:false,direction:"initial"};var e=q.Event("AfterShow",n);e.srcControl=this;e.data=this._oToDataBeforeRendering||{};e.backData={};p._handleEvent(e)}};N.prototype._getActualInitialPage=function(){var p=this.getInitialPage();if(p){var b=sap.ui.getCore().byId(p);if(b){return b}else{q.sap.log.error("NavContainer: control with ID '"+p+"' was set as 'initialPage' but was not found as a DIRECT child of this NavContainer (number of current children: "+this.getPages().length+").")}}var c=this.getPages();return(c.length>0?c[0]:null)};N.prototype.getPage=function(p){var b=this.getPages();for(var i=0;i<b.length;i++){if(b[i]&&(b[i].getId()==p)){return b[i]}}return null};N.prototype._ensurePageStackInitialized=function(){if(this._pageStack.length===0){var p=this._getActualInitialPage();if(p){this._pageStack.push({id:p.getId(),mode:"initial",data:{}})}}return this._pageStack};N.prototype.getCurrentPage=function(){var s=this._ensurePageStackInitialized();if(s.length>=1){return this.getPage(s[s.length-1].id)}else{q.sap.log.warning(this+": page stack is empty but should have been initialized - application failed to provide a page to display");return undefined}};N.prototype.getPreviousPage=function(){var s=this._ensurePageStackInitialized();if(s.length>1){return this.getPage(s[s.length-2].id)}else if(s.length==1){return undefined}else{q.sap.log.warning(this+": page stack is empty but should have been initialized - application failed to provide a page to display")}};N.prototype.currentPageIsTopPage=function(){var s=this._ensurePageStackInitialized();return(s.length===1)};N.prototype.insertPreviousPage=function(p,t,d){var s=this._ensurePageStackInitialized();if(this._pageStack.length>0){var i=s.length-1;var b={id:p,mode:t,data:d};if(i===0){b.mode="initial";delete s[s.length-1].mode}s.splice(i,0,b)}else{q.sap.log.warning(this+": insertPreviousPage called with empty page stack; ignoring")}return this};N.prototype._afterTransitionCallback=function(n,d,b){var e=q.Event("AfterShow",n);e.data=d||{};e.backData=b||{};e.srcControl=this;n.to._handleEvent(e);e=q.Event("AfterHide",n);e.srcControl=this;n.from._handleEvent(e);this._iTransitionsCompleted++;this._bNavigating=false;var f=null;if(n.isBack||n.isBackToPage||n.isBackToTop){f=this._mFocusObject[n.toId];if(f){q.sap.focus(f)}else{f=q('#'+n.toId).firstFocusableDomRef();if(f){q.sap.focus(f)}}}else if(n.isTo){f=q('#'+n.toId).firstFocusableDomRef();if(f){q.sap.focus(f)}}this.fireAfterNavigate(n);q.sap.log.info(this+": _afterTransitionCallback called, to: "+n.toId);if(this._aQueue.length>0){var c=this._aQueue.shift();c()}};N.prototype.to=function(p,t,d,T){if(p instanceof C){p=p.getId()}if(typeof(t)!=="string"){T=d;d=t}t=t||this.getDefaultTransitionName();T=T||{};d=d||{};this._ensurePageStackInitialized();if(this._bNavigating){q.sap.log.info(this.toString()+": Cannot navigate to page "+p+" because another navigation is already in progress. - navigation will be executed after the previous one");this._aQueue.push(q.proxy(function(){this.to(p,t,d,T)},this));return this}if(this._bNeverRendered){this._oToDataBeforeRendering=d}var f=this.getCurrentPage();if(f&&(f.getId()===p)){q.sap.log.warning(this.toString()+": Cannot navigate to page "+p+" because this is the current page.");return this}var o=this.getPage(p);if(o){this._mFocusObject[f.getId()]=document.activeElement;var n={from:f,fromId:f.getId(),to:o,toId:p,firstTime:!this._mVisitedPages[p],isTo:true,isBack:false,isBackToTop:false,isBackToPage:false,direction:"to"};var c=this.fireNavigate(n);if(c){sap.m.closeKeyboard();var e=q.Event("BeforeHide",n);e.srcControl=this;f._handleEvent(e);if(!this._mVisitedPages[p]){e=q.Event("BeforeFirstShow",n);e.srcControl=this;e.data=d||{};e.backData={};o._handleEvent(e)}e=q.Event("BeforeShow",n);e.srcControl=this;e.data=d||{};e.backData={};o._handleEvent(e);this._pageStack.push({id:p,mode:t,data:d});this._mVisitedPages[p]=true;if(!this.getDomRef()){q.sap.log.info("'Hidden' 'to' navigation in not-rendered NavContainer "+this.toString());return this}var b;if(!(b=o.getDomRef())||b.parentNode!=this.getDomRef()||sap.ui.core.RenderManager.isPreservedContent(b)){o.addStyleClass("sapMNavItemRendering");q.sap.log.debug("Rendering 'to' page '"+o.toString()+"' for 'to' navigation");var r=sap.ui.getCore().createRenderManager();r.render(o,this.getDomRef());r.destroy();o.addStyleClass("sapMNavItemHidden").removeStyleClass("sapMNavItemRendering")}var g=N.transitions[t]||N.transitions["slide"];var i=this._iTransitionsCompleted;var h=this;window.setTimeout(function(){if(h&&(h._iTransitionsCompleted<i+1)){q.sap.log.warning("Transition '"+t+"' 'to' was triggered five seconds ago, but has not yet invoked the end-of-transition callback.")}},5000);this._bNavigating=true;g.to.call(this,f,o,q.proxy(function(){this._afterTransitionCallback(n,d)},this),T)}else{q.sap.log.info("Navigation to page with ID '"+p+"' has been aborted by the application")}}else{q.sap.log.warning("Navigation triggered to page with ID '"+p+"', but this page is not known/aggregated by "+this)}return this};N.prototype.back=function(b,t){this._backTo("back",b,t);return this};N.prototype.backToPage=function(p,b,t){this._backTo("backToPage",b,t,p);return this};N.prototype.backToTop=function(b,t){this._backTo("backToTop",b,t);return this};N.prototype._backTo=function(t,b,T,r){if(this._bNavigating){q.sap.log.warning(this.toString()+": Cannot navigate back because another navigation is already in progress. - navigation will be executed after the previous one");this._aQueue.push(q.proxy(function(){this._backTo(t,b,T,r)},this));return this}if(this._pageStack.length<=1){if(this._pageStack.length===1&&this._pageStack[0].mode!="initial"){throw new Error("Initial page not found on the stack. How did this happen?")}return this}else{if(r instanceof C){r=r.getId()}var f=this._pageStack[this._pageStack.length-1];var m=f.mode;var F=this.getPage(f.id);var o;var c;if(t==="backToTop"){o=this._getActualInitialPage();c=null}else if(t==="backToPage"){var i=this._findClosestPreviousPageInfo(r);if(!i){q.sap.log.error(this.toString()+": Cannot navigate backToPage('"+r+"') because target page was not found among the previous pages.");return this}o=sap.ui.getCore().byId(i.id);if(!o){q.sap.log.error(this.toString()+": Cannot navigate backToPage('"+r+"') because target page does not exist anymore.");return this}c=i.data}else{o=this.getPreviousPage();c=this._pageStack[this._pageStack.length-2].data}if(!o){q.sap.log.error("NavContainer back navigation: target page is not defined or not aggregated by this NavContainer. Aborting navigation.");return}var d=o.getId();b=b||{};T=T||{};var n={from:F,fromId:F.getId(),to:o,toId:d,firstTime:!this._mVisitedPages[d],isTo:false,isBack:(t==="back"),isBackToPage:(t==="backToPage"),isBackToTop:(t==="backToTop"),direction:t};var e=this.fireNavigate(n);if(e){sap.m.closeKeyboard();var E=q.Event("BeforeHide",n);E.srcControl=this;F._handleEvent(E);if(!this._mVisitedPages[d]){E=q.Event("BeforeFirstShow",n);E.srcControl=this;E.backData=b||{};E.data={};o._handleEvent(E)}E=q.Event("BeforeShow",n);E.srcControl=this;E.backData=b||{};E.data=c||{};o._handleEvent(E);this._pageStack.pop();this._mVisitedPages[d]=true;if(t==="backToTop"){this._pageStack=[];this.getCurrentPage()}else if(t==="backToPage"){while(this._pageStack[this._pageStack.length-1].id!==r){this._pageStack.pop()}}if(!this.getDomRef()){q.sap.log.info("'Hidden' back navigation in not-rendered NavContainer "+this.toString());return this}var g=N.transitions[m]||N.transitions["slide"];var h=this._iTransitionsCompleted;var j=this;window.setTimeout(function(){if(j&&(j._iTransitionsCompleted<h+1)){q.sap.log.warning("Transition '"+m+"' 'back' was triggered five seconds ago, but has not yet invoked the end-of-transition callback.")}},5000);this._bNavigating=true;var k;if(!(k=o.getDomRef())||k.parentNode!=this.getDomRef()||sap.ui.core.RenderManager.isPreservedContent(k)){o.addStyleClass("sapMNavItemRendering");q.sap.log.debug("Rendering 'to' page '"+o.toString()+"' for back navigation");var l=sap.ui.getCore().createRenderManager();var p=this.$().children().index(F.getDomRef());l.renderControl(o);l.flush(this.getDomRef(),false,p);l.destroy();o.addStyleClass("sapMNavItemHidden").removeStyleClass("sapMNavItemRendering")}if(F.getId()===o.getId()){q.sap.log.info("Transition is skipped when navigating back to the same page instance"+o.toString());this._afterTransitionCallback(n,c,b);return this}g.back.call(this,F,o,q.proxy(function(){this._afterTransitionCallback(n,c,b)},this),T)}}return this};N.prototype._findClosestPreviousPageInfo=function(r){for(var i=this._pageStack.length-2;i>=0;i--){var b=this._pageStack[i];if(b.id===r){return b}}return null};N.transitions=N.transitions||{};N.transitions["show"]={to:function(f,t,c){t.removeStyleClass("sapMNavItemHidden");f&&f.addStyleClass("sapMNavItemHidden");c()},back:function(f,t,c){t.removeStyleClass("sapMNavItemHidden");f&&f.addStyleClass("sapMNavItemHidden");c()}};if(q.support.cssTransitions){N.transitions["slide"]={to:function(f,t,c){f.addStyleClass("sapMNavItemCenter");window.setTimeout(function(){t.addStyleClass("sapMNavItemRight");t.removeStyleClass("sapMNavItemHidden");window.setTimeout(function(){var o=false;var T=true;var A=null;A=function(){q(this).unbind("webkitTransitionEnd transitionend");if(!o){o=true}else{T=false;t.removeStyleClass("sapMNavItemSliding").removeStyleClass("sapMNavItemCenter");f.removeStyleClass("sapMNavItemSliding").addStyleClass("sapMNavItemHidden").removeStyleClass("sapMNavItemLeft");c()}};f.$().bind("webkitTransitionEnd transitionend",A);t.$().bind("webkitTransitionEnd transitionend",A);t.addStyleClass("sapMNavItemSliding").addStyleClass("sapMNavItemCenter").removeStyleClass("sapMNavItemRight");f.addStyleClass("sapMNavItemSliding").removeStyleClass("sapMNavItemCenter").addStyleClass("sapMNavItemLeft");window.setTimeout(function(){if(T){o=true;A.apply(f.$().add(t.$()))}},400)},60)},0)},back:function(f,t,c){t.addStyleClass("sapMNavItemLeft");t.removeStyleClass("sapMNavItemHidden");f.addStyleClass("sapMNavItemCenter");window.setTimeout(function(){var o=false;var T=true;var A=null;A=function(){q(this).unbind("webkitTransitionEnd transitionend");if(!o){o=true}else{T=false;t.removeStyleClass("sapMNavItemSliding").removeStyleClass("sapMNavItemCenter");f.removeStyleClass("sapMNavItemSliding").addStyleClass("sapMNavItemHidden").removeStyleClass("sapMNavItemRight");c()}};f.$().bind("webkitTransitionEnd transitionend",A);t.$().bind("webkitTransitionEnd transitionend",A);if(sap.ui.Device.browser.webkit){window.setTimeout(function(){t.$().css("box-shadow","0em 1px 0em rgba(128, 128, 1280, 0.1)");window.setTimeout(function(){t.$().css("box-shadow","")},50)},0)}t.addStyleClass("sapMNavItemSliding").addStyleClass("sapMNavItemCenter").removeStyleClass("sapMNavItemLeft");f.addStyleClass("sapMNavItemSliding").removeStyleClass("sapMNavItemCenter").addStyleClass("sapMNavItemRight");window.setTimeout(function(){if(T){o=true;A.apply(f.$().add(t.$()))}},400)},100)}}}else{N.transitions["slide"]={to:function(f,t,c){var T=t.$();T.css("left","100%");t.removeStyleClass("sapMNavItemHidden");T.animate({left:"0%"},300);var F=f.$();F.animate({left:"-100%"},300,function(){f.addStyleClass("sapMNavItemHidden");F.css("left","0");c()})},back:function(f,t,c){var T=t.$();T.css("left","-100%");t.removeStyleClass("sapMNavItemHidden");T.animate({left:"0%"},300);var F=f.$();F.animate({left:"100%"},300,function(){f.addStyleClass("sapMNavItemHidden");F.css("left","0");c()})}}}if(q.support.cssTransitions){N.transitions["fade"]={to:function(f,t,c){t.addStyleClass("sapMNavItemTransparent");t.removeStyleClass("sapMNavItemHidden");window.setTimeout(function(){var A=null;var T=true;A=function(){q(this).unbind("webkitTransitionEnd transitionend");T=false;f.addStyleClass("sapMNavItemHidden");t.removeStyleClass("sapMNavItemFading").removeStyleClass("sapMNavItemOpaque");c()};t.$().bind("webkitTransitionEnd transitionend",A);t.addStyleClass("sapMNavItemFading").removeStyleClass("sapMNavItemTransparent").addStyleClass("sapMNavItemOpaque");window.setTimeout(function(){if(T){A.apply(t.$())}},600)},10)},back:function(f,t,c){f.addStyleClass("sapMNavItemOpaque");t.removeStyleClass("sapMNavItemHidden");window.setTimeout(function(){var A=null;var T=true;A=function(){q(this).unbind("webkitTransitionEnd transitionend");T=false;f.removeStyleClass("sapMNavItemFading").addStyleClass("sapMNavItemHidden");f.removeStyleClass("sapMNavItemTransparent");c()};f.$().bind("webkitTransitionEnd transitionend",A);f.addStyleClass("sapMNavItemFading").removeStyleClass("sapMNavItemOpaque");f.addStyleClass("sapMNavItemTransparent");window.setTimeout(function(){if(T){A.apply(t.$())}},600)},10)}}}else{N.transitions["fade"]={to:function(f,t,c){var T=t.$();T.css("opacity","0");t.removeStyleClass("sapMNavItemHidden");T.animate({opacity:"1"},500,function(){f.addStyleClass("sapMNavItemHidden");c()})},back:function(f,t,c){var F=f.$();t.removeStyleClass("sapMNavItemHidden");F.animate({opacity:"0"},500,function(){f.addStyleClass("sapMNavItemHidden");F.css("opacity","1");c()})}}}if(q.support.cssTransitions){N.transitions["flip"]={to:function(f,t,c){var b=this;window.setTimeout(function(){var i=(sap.ui.Device.os.android&&sap.ui.Device.os.version===2.3);!i&&b.$().addClass("sapMNavFlip");t.addStyleClass("sapMNavItemFlipNext");t.removeStyleClass("sapMNavItemHidden");window.setTimeout(function(){var o=false;var T=true;var A=null;A=function(){q(this).unbind("webkitTransitionEnd transitionend");if(!o){o=true}else{T=false;t.removeStyleClass("sapMNavItemFlipping");f.removeStyleClass("sapMNavItemFlipping").addStyleClass("sapMNavItemHidden").removeStyleClass("sapMNavItemFlipPrevious");!i&&b.$().removeClass("sapMNavFlip");c()}};f.$().bind("webkitTransitionEnd transitionend",A);t.$().bind("webkitTransitionEnd transitionend",A);t.addStyleClass("sapMNavItemFlipping").removeStyleClass("sapMNavItemFlipNext");f.addStyleClass("sapMNavItemFlipping").addStyleClass("sapMNavItemFlipPrevious");window.setTimeout(function(){if(T){o=true;A.apply(f.$().add(t.$()))}},600)},60)},0)},back:function(f,t,c){var b=this,i=(sap.ui.Device.os.android&&sap.ui.Device.os.version===2.3);!i&&b.$().addClass("sapMNavFlip");t.addStyleClass("sapMNavItemFlipPrevious");t.removeStyleClass("sapMNavItemHidden");window.setTimeout(function(){var o=false;var T=true;var A=null;A=function(){q(this).unbind("webkitTransitionEnd transitionend");if(!o){o=true}else{T=false;t.removeStyleClass("sapMNavItemFlipping");f.removeStyleClass("sapMNavItemFlipping").addStyleClass("sapMNavItemHidden").removeStyleClass("sapMNavItemFlipNext");!i&&b.$().removeClass("sapMNavFlip");c()}};f.$().bind("webkitTransitionEnd transitionend",A);t.$().bind("webkitTransitionEnd transitionend",A);t.addStyleClass("sapMNavItemFlipping").removeStyleClass("sapMNavItemFlipPrevious");f.addStyleClass("sapMNavItemFlipping").addStyleClass("sapMNavItemFlipNext");window.setTimeout(function(){if(T){o=true;A.apply(f.$().add(t.$()))}},600)},60)}}}else{N.transitions["flip"]=N.transitions["slide"]}if(q.support.cssTransitions){N.transitions["door"]={to:function(f,t,c){var b=this;window.setTimeout(function(){var i=(sap.ui.Device.os.android&&sap.ui.Device.os.version===2.3);!i&&b.$().addClass("sapMNavDoor");t.addStyleClass("sapMNavItemDoorInNext");t.removeStyleClass("sapMNavItemHidden");window.setTimeout(function(){var o=false;var T=true;var A=null;A=function(){q(this).unbind("webkitAnimationEnd animationend");if(!o){o=true}else{T=false;t.removeStyleClass("sapMNavItemDooring").removeStyleClass("sapMNavItemDoorInNext");f.removeStyleClass("sapMNavItemDooring").addStyleClass("sapMNavItemHidden").removeStyleClass("sapMNavItemDoorInPrevious");!i&&b.$().removeClass("sapMNavDoor");c()}};f.$().bind("webkitAnimationEnd animationend",A);t.$().bind("webkitAnimationEnd animationend",A);t.addStyleClass("sapMNavItemDooring");f.addStyleClass("sapMNavItemDooring").addStyleClass("sapMNavItemDoorInPrevious");window.setTimeout(function(){if(T){o=true;A.apply(f.$().add(t.$()))}},1000)},60)},0)},back:function(f,t,c){var b=this,i=(sap.ui.Device.os.android&&sap.ui.Device.os.version===2.3);!i&&b.$().addClass("sapMNavDoor");t.addStyleClass("sapMNavItemDoorOutNext");t.removeStyleClass("sapMNavItemHidden");window.setTimeout(function(){var o=false;var T=true;var A=null;A=function(){q(this).unbind("webkitAnimationEnd animationend");if(!o){o=true}else{T=false;t.removeStyleClass("sapMNavItemDooring").removeStyleClass("sapMNavItemDoorOutNext");f.removeStyleClass("sapMNavItemDooring").addStyleClass("sapMNavItemHidden").removeStyleClass("sapMNavItemDoorOutPrevious");!i&&b.$().removeClass("sapMNavDoor");c()}};f.$().bind("webkitAnimationEnd animationend",A);t.$().bind("webkitAnimationEnd animationend",A);t.addStyleClass("sapMNavItemDooring");f.addStyleClass("sapMNavItemDooring").addStyleClass("sapMNavItemDoorOutPrevious");window.setTimeout(function(){if(T){o=true;A.apply(f.$().add(t.$()))}},1000)},60)}}}else{N.transitions["door"]=N.transitions["slide"]}N.prototype.addCustomTransition=function(n,t,b){if(N.transitions[n]){q.sap.log.warning("Transition with name "+n+" already exists in "+this+". It is now being replaced by custom transition.")}N.transitions[n]={to:t,back:b};return this};N.addCustomTransition=N.prototype.addCustomTransition;N.prototype.forceInvalidation=N.prototype.invalidate;N.prototype.invalidate=function(s){if(s==this){}else if(!s){this.forceInvalidation()}else if(s instanceof C){var I=false,p=this.getPages(),l=p.length;for(var i=0;i<l;i++){if(p[i]===s){I=true;break}}if(!I||s.getId()===this.getCurrentPage()){this.forceInvalidation()}}else{this.forceInvalidation()}};N.prototype.removePage=function(p){p=this.removeAggregation("pages",p);if(p){p.removeStyleClass("sapMNavItemHidden");p.removeStyleClass("sapMNavItem")}return p};N.prototype.removeAllPages=function(){var p=this.getPages();if(!p){return[]}for(var i=0;i<p.length;i++){p[i].removeStyleClass("sapMNavItemHidden");p[i].removeStyleClass("sapMNavItem")}return this.removeAllAggregation("pages")};N.prototype.addPage=function(p){var b=this.getPages();if(q.inArray(p,b)>-1){return this}this.addAggregation("pages",p,true);p.addStyleClass("sapMNavItem");var i=b.length;if(i===0&&this.getPages().length===1&&this.getDomRef()){this._ensurePageStackInitialized();this.rerender()}return this};N.prototype.insertPage=function(p,i){this.insertAggregation("pages",p,i,true);p.addStyleClass("sapMNavItem");var b=this.getPages().length;if(b===0&&this.getPages().length===1&&this.getDomRef()){this._ensurePageStackInitialized();this.rerender()}return this};return N},true);
