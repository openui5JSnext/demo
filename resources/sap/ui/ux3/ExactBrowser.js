/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/commons/Button','sap/ui/commons/Menu','sap/ui/core/Control','./ExactAttribute','./ExactList','./library'],function(q,B,M,C,E,a,l){"use strict";var b=C.extend("sap.ui.ux3.ExactBrowser",{metadata:{library:"sap.ui.ux3",properties:{title:{type:"string",group:"Misc",defaultValue:null},headerTitle:{type:"string",group:"Misc",defaultValue:null},topListOrder:{type:"sap.ui.ux3.ExactOrder",defaultValue:sap.ui.ux3.ExactOrder.Select},enableListClose:{type:"boolean",group:"Misc",defaultValue:false},listHeight:{type:"int",group:"Appearance",defaultValue:290},showHeader:{type:"boolean",group:"Misc",defaultValue:false},showTopList:{type:"boolean",group:"Misc",defaultValue:true},enableReset:{type:"boolean",group:"Misc",defaultValue:true},enableSave:{type:"boolean",group:"Misc",defaultValue:false},topListWidth:{type:"int",group:"Misc",defaultValue:168}},defaultAggregation:"attributes",aggregations:{attributes:{type:"sap.ui.ux3.ExactAttribute",multiple:true,singularName:"attribute"},optionsMenu:{type:"sap.ui.commons.Menu",multiple:false},controls:{type:"sap.ui.core.Control",multiple:true,singularName:"control",visibility:"hidden"},rootAttribute:{type:"sap.ui.core.Element",multiple:false,visibility:"hidden"}},associations:{followUpControl:{type:"sap.ui.core.Control",multiple:false}},events:{attributeSelected:{parameters:{attribute:{type:"sap.ui.ux3.ExactAttribute"},allAttributes:{type:"object"}}},save:{}}}});(function(){b.prototype.init=function(){var t=this;this.data("sap-ui-fastnavgroup","true",true);this._rb=sap.ui.getCore().getLibraryResourceBundle("sap.ui.ux3");this._attributeRoot=new E();this.setAggregation("rootAttribute",this._attributeRoot);this._rootList=new a(this.getId()+"-rootlist");this._rootList.setData(this._attributeRoot);this.addAggregation("controls",this._rootList);this._resetButton=new B(this.getId()+"-RstBtn",{text:this._rb.getText("EXACT_BRWSR_RESET"),lite:true});this._resetButton.addStyleClass("sapUiUx3ExactBrwsrReset");this.addAggregation("controls",this._resetButton);this._resetButton.attachPress(function(){t.reset()});this._saveButton=new B(this.getId()+"-SvBtn",{text:this._rb.getText("EXACT_BRWSR_SAVE"),lite:true});this._saveButton.addStyleClass("sapUiUx3ExactBrwsrSave");this.addAggregation("controls",this._saveButton);this._saveButton.attachPress(function(){t.fireSave()});this._rootList.attachAttributeSelected(function(e){t.fireAttributeSelected({attribute:e.getParameter("attribute"),allAttributes:e.getParameter("allAttributes")})});this._rootList.attachEvent("_headerPress",function(e){var m=t.getOptionsMenu();if(m){var d=e.getParameter("domRef");m.open(e.getParameter("keyboard"),d,sap.ui.core.Popup.Dock.BeginTop,sap.ui.core.Popup.Dock.BeginBottom,d)}})};b.prototype.exit=function(){this._rootList.destroy();this._attributeRoot.destroy();this._rootList=null;this._attributeRoot=null;this._resetButton=null;this._saveButton=null;this._saveDialog=null;this._saveTextField=null;this._rb=null};b.prototype.onThemeChanged=function(e){if(this.getDomRef()){this.invalidate()}};b.prototype.getTitle=function(){return this._rootList.getTopTitle()};b.prototype.setTitle=function(t){this._rootList.setTopTitle(t);return this};b.prototype.setTopListOrder=function(L){this.setProperty("topListOrder",L,true);this._attributeRoot.setListOrder(L);return this};b.prototype.getTopListWidth=function(){return this._attributeRoot.getWidth()};b.prototype.setTopListWidth=function(w){this._attributeRoot.setWidth(w);return this};b.prototype.getHeaderTitle=function(){var t=this.getProperty("headerTitle");return t?t:this._rb.getText("EXACT_BRWSR_TITLE")};b.prototype.getEnableListClose=function(){return this._rootList.getShowClose()};b.prototype.setEnableListClose=function(e){this._rootList.setShowClose(e);return this};b.prototype.getListHeight=function(){return this._rootList.getTopHeight()};b.prototype.setListHeight=function(L){this._rootList.setTopHeight(L);return this};b.prototype.getAttributes=function(){return this._attributeRoot.getAttributesInternal()};b.prototype.insertAttribute=function(A,i){this._attributeRoot.insertAttribute(A,i);return this};b.prototype.addAttribute=function(A){this._attributeRoot.addAttribute(A);return this};b.prototype.removeAttribute=function(e){return this._attributeRoot.removeAttribute(e)};b.prototype.removeAllAttributes=function(){return this._attributeRoot.removeAllAttributes()};b.prototype.indexOfAttribute=function(A){return this._attributeRoot.indexOfAttribute(A)};b.prototype.destroyAttributes=function(){this._attributeRoot.destroyAttributes();return this};b.prototype.reset=function(){this._rootList._closeAll()};b.prototype.hasOptionsMenu=function(){return!!this.getOptionsMenu()}}());return b},true);
