/*
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./Component','./UIComponentMetadata','./mvc/View'],function(q,C,U,V){"use strict";var a=C.extend("sap.ui.core.UIComponent",{constructor:function(i,s){try{C.apply(this,arguments)}catch(e){if(this._oRouter){this._oRouter.destroy()}throw e}},metadata:{"abstract":true,rootView:null,publicMethods:["render"],aggregations:{"rootControl":{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"}},routing:{}}},U);a.prototype.init=function(){var t=this;var p={};if(this.getAutoPrefixId()){p.id=function(i){return t.createId(i)}}var m=this.getMetadata();var r=q.extend({},m.getRoutingConfig());var R=m.getRoutes();if(R){q.sap.require("sap.ui.core.routing.Router");var f=r.routerClass||sap.ui.core.routing.Router;if(typeof f==="string"){f=q.sap.getObject(f)}this._oRouter=new f(R,r,this)}this.runAsOwner(function(){sap.ui.base.ManagedObject.runWithPreprocessors(function(){t.setAggregation("rootControl",t.createContent())},p)});var o=this.getAggregation("rootControl");if(o instanceof V){if(r.targetParent===undefined){r.targetParent=o.getId()}}};a.prototype.destroy=function(){if(this._oRouter){this._oRouter.destroy();delete this._oRouter}C.prototype.destroy.apply(this,arguments)};a.getRouterFor=function(c){var v=c;if(v instanceof sap.ui.core.mvc.Controller){v=v.getView()}if(v instanceof V){var o=sap.ui.core.Component.getOwnerComponentFor(v);if(o){return o.getRouter()}else{return undefined}}};a.prototype.getRouter=function(){return this._oRouter};a.prototype.getAutoPrefixId=function(){return false};a.prototype.byId=function(i){return sap.ui.getCore().byId(this.createId(i))};a.prototype.createId=function(i){if(!this.isPrefixedId(i)){i=this.getId()+"---"+i}return i};a.prototype.isPrefixedId=function(i){return(i&&i.indexOf(this.getId()+"---")===0)};a.prototype.createContent=function(){var r=this.getMetadata().getRootView();if(r){return sap.ui.view(r)}return null};a.prototype.render=function(r){var c=this.getAggregation("rootControl");if(c&&r){r.renderControl(c)}};a.prototype.getUIArea=function(){return(this.oContainer?this.oContainer.getUIArea():null)};a.prototype.getEventingParent=function(){return this.getUIArea()};a.prototype.setContainer=function(c){this.oContainer=c;return this};a.prototype.onBeforeRendering=function(){};a.prototype.onAfterRendering=function(){};return a},true);
