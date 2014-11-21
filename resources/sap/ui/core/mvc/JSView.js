/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/library','./View'],function(q,l,V){"use strict";var J=V.extend("sap.ui.core.mvc.JSView",{metadata:{library:"sap.ui.core"}});(function(){var r={};sap.ui.jsview=function(i,v){var s={};if(v&&typeof(v)=="string"){s.viewName=v;s.controller=arguments[2];var o=new J(i,s);return o}else if(v&&typeof(v)=="object"){r[i]=v;q.sap.declare({modName:i,type:"view"},false)}else if(arguments.length==1&&typeof(arguments[0])=="string"){s.viewName=i;s.controller=arguments[1];var o=s.id?new J(s.id,s):new J(s);return o}else{throw new Error("Wrong arguments! Either call sap.ui.jsview([sId,] sViewName) to instantiate a View or sap.ui.jsview(sViewName, oViewImpl) to define a View type.")}};J.prototype.initViewSettings=function(s){if(!r[s.viewName]){q.sap.require({modName:s.viewName,type:"view"})}q.extend(this,r[s.viewName])};J.prototype.onControllerConnected=function(c){var t=this;var p={};if(this.getAutoPrefixId()){p.id=function(i){return t.createId(i)}}p.settings=this._fnSettingsPreprocessor;sap.ui.base.ManagedObject.runWithPreprocessors(function(){t.applySettings({content:t.createContent(c)})},p)};J.prototype.getAutoPrefixId=function(){return false}}());return J},true);
