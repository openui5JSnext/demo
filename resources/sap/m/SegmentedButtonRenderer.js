/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global'],function(q){"use strict";var S={};S.render=function(r,c){var b=c.getButtons(),s=c.getSelectedButton(),B,t,a,t,i=0;r.write("<ul");r.addClass("sapMSegB");r.addClass("sapMSegBHide");r.writeClasses();if(c.getWidth()&&c.getWidth()!==''){r.addStyle('width',c.getWidth())}r.writeStyles();r.writeControlData(c);t=c.getTooltip_AsString();if(t){r.writeAttributeEscaped("title",t)}r.write(">");for(;i<b.length;i++){B=b[i];r.write("<li");r.writeControlData(B);r.addClass("sapMSegBBtn");if(B.getEnabled()){r.addClass("sapMSegBBtnFocusable")}else{r.addClass("sapMSegBBtnDis")}if(s===B.getId()){r.addClass("sapMSegBBtnSel")}if(B.getIcon()&&B.getText()!==''){r.addClass("sapMSegBBtnMixed")}r.writeClasses();a=B.getWidth();if(a){r.addStyle('width',a);r.writeStyles()}t=B.getTooltip_AsString();if(t){r.writeAttributeEscaped("title",t)}r.writeAttribute("tabindex",B.getEnabled()?"0":"-1");r.write('>');if(B.getIcon()){var I=B._getImage((B.getId()+"-img"),B.getIcon());if(I instanceof sap.m.Image){if(I.onload===sap.m.Image.prototype.onload){I.onload=function(){if(sap.m.Image.prototype.onload){sap.m.Image.prototype.onload.apply(this,arguments)}window.setTimeout(function(){c._fCalcBtnWidth()},20)}}}r.renderControl(I)}if(B.getText()!==''){r.writeEscaped(B.getText(),false)}r.write("</li>")}r.write("</ul>")};return S},true);
