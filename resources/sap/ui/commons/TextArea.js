/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./TextField','./library'],function(q,T,l){"use strict";var a=T.extend("sap.ui.commons.TextArea",{metadata:{library:"sap.ui.commons",properties:{height:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},cols:{type:"int",group:"Dimension",defaultValue:null},rows:{type:"int",group:"Dimension",defaultValue:null},wrapping:{type:"sap.ui.core.Wrapping",group:"Appearance",defaultValue:null},cursorPos:{type:"int",group:"Appearance",defaultValue:null},explanation:{type:"string",group:"Misc",defaultValue:null},labeledBy:{type:"string",group:"Identification",defaultValue:null,deprecated:true}}}});a.prototype.exit=function(){this._detachEventHandler()};a.prototype.onBeforeRendering=function(){this._detachEventHandler()};a.prototype.onAfterRendering=function(){this._attachEventHandler()};a.prototype._attachEventHandler=function(){var $=this.$();this.pasteHandlerId=$.bind('paste',q.proxy(this.handlePaste,this));this.inputHandlerId=$.bind('input',q.proxy(this.handleInput,this));this.proChHandlerId=$.bind('propertychange',q.proxy(this.handleInput,this))};a.prototype._detachEventHandler=function(){var $=this.$();if(this.pasteHandlerId){$.unbind('paste',this.handlePaste);this.pasteHandlerId=null}if(this.inputHandlerId){$.unbind('input',this.handlePaste);this.inputHandlerId=null}if(this.proChHandlerId){$.unbind('propertychange',this.handlePaste);this.proChHandlerId=null}};a.prototype.onfocusin=function(e){T.prototype.onfocusin.apply(this,arguments);this.bFocus=true;e.preventDefault()};a.prototype.onsapfocusleave=function(e){T.prototype.onsapfocusleave.apply(this,arguments);var f=this.getFocusDomRef();if(f&&!!sap.ui.Device.browser.firefox){if(f.selectionStart!=f.selectionEnd){q(f).selectText(f.selectionStart,f.selectionStart)}}this.bFocus=false;e.preventDefault();e.stopPropagation()};a.prototype.getFocusInfo=function(){return{id:this.getId(),cursorPos:this.getCursorPos()}};a.prototype.applyFocusInfo=function(f){this.focus();var F=this.getFocusDomRef();q(F).cursorPos(this.getCursorPos())};a.prototype.onkeypress=function(e){T.prototype.onkeypress.apply(this,arguments);if(!this.getEditable()||!this.getEnabled()||this.getMaxLength()<=0){return}var k=q.sap.KeyCodes;var K=e.which||e.keyCode;var d=this.getDomRef();if(document.selection){var s=document.selection.createRange();if(s.text.length>0){return}}else{if(d.selectionStart!=d.selectionEnd){return}}if(d.value.length>=this.getMaxLength()&&(K>k.DELETE||K==k.ENTER||K==k.SPACE)&&!e.ctrlKey){e.preventDefault();e.stopPropagation()}};a.prototype.onkeyup=function(e){var d=this.getDomRef();this.setProperty('cursorPos',q(d).cursorPos(),true);T.prototype.onkeyup.apply(this,arguments)};a.prototype.onsapenter=function(e){e.stopPropagation()};a.prototype.onmouseup=function(e){var d=this.getDomRef();this.setProperty('cursorPos',q(d).cursorPos(),true)};a.prototype.handlePaste=function(e){if(!this.getEditable()||!this.getEnabled()||this.getMaxLength()<=0){return}var d=this.getDomRef();if(d.value.length>=this.getMaxLength()&&d.selectionStart==d.selectionEnd){e.preventDefault();e.stopPropagation()}};a.prototype.handleInput=function(e){if(e.originalEvent.propertyName&&e.originalEvent.propertyName.toLowerCase()!="value"){return}if(!this.getEditable()||!this.getEnabled()||this.getMaxLength()<=0){return}var d=this.getDomRef();if(d.value.length>this.getMaxLength()){d.value=d.value.substring(0,this.getMaxLength())}};a.prototype.setMaxLength=function(m){this.setProperty('maxLength',m,true);var d=this.getDomRef();if(d&&d.value.length>m&&m>0){d.value=d.value.substring(0,m)}var v=this.getValue();if(v.length>m&&m>0){this.setProperty('value',v.substring(0,m))}return this};a.prototype.setCursorPos=function(c){this.setProperty('cursorPos',c,true);if(this.bFocus){q(this.getDomRef()).cursorPos(c)}return this};return a},true);
