/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./library','sap/ui/core/Control'],function(q,l,C){"use strict";var A=C.extend("sap.ui.commons.ApplicationHeader",{metadata:{library:"sap.ui.commons",properties:{logoSrc:{type:"sap.ui.core.URI",group:"Misc",defaultValue:null},logoText:{type:"string",group:"Misc",defaultValue:null},displayLogoff:{type:"boolean",group:"Misc",defaultValue:true},userName:{type:"string",group:"Misc",defaultValue:null},displayWelcome:{type:"boolean",group:"Misc",defaultValue:true}},events:{logoff:{}}}});A.prototype.init=function(){this.initializationDone=false};A.prototype.exit=function(){this.oLogo&&this.oLogo.destroy();this.oLogoText&&this.oLogoText.destroy();this.oLogoffBtn&&this.oLogoffBtn.destroy()};A.prototype.initControls=function(){var a=this.getId();var r=sap.ui.getCore().getLibraryResourceBundle("sap.ui.commons");this.oLogo&&this.oLogo.destroy();this.oLogo=new sap.ui.commons.Image(a+"-logoImg");this.oLogo.setTooltip(r.getText("APPHDR_LOGO_TOOLTIP"));this.oLogo.setParent(this);this.oLogoText&&this.oLogoText.destroy();this.oLogoText=new sap.ui.commons.TextView(a+"-logoText");this.oLogoText.setAccessibleRole(sap.ui.core.AccessibleRole.Heading);this.oLogoText.setParent(this);this.oLogoffBtn&&this.oLogoffBtn.destroy();this.oLogoffBtn=new sap.ui.commons.Button(a+"-logoffBtn");var L=r.getText("APPHDR_LOGOFF");this.oLogoffBtn.setText(L);this.oLogoffBtn.setTooltip(L);this.oLogoffBtn.attachPress(this.logoff,this);this.oLogoffBtn.setParent(this);this.oLogoffBtn.setLite(true)};A.prototype.logoff=function(e){this.fireLogoff()};A.prototype.setLogoSrc=function(L){this.initializationDone=false;this.setProperty("logoSrc",L);return this};A.prototype.setLogoText=function(L){this.initializationDone=false;this.setProperty("logoText",L);return this};A.prototype.setUserName=function(u){this.initializationDone=false;this.setProperty("userName",u);return this};A.prototype.setDisplayWelcome=function(d){this.initializationDone=false;this.setProperty("displayWelcome",d);return this};A.prototype.setDisplayLogoff=function(d){this.initializationDone=false;this.setProperty("displayLogoff",d);return this};return A},true);
