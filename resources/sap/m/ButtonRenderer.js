/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global'],function(q){"use strict";var B={};B.render=function(r,b){var t=b.getType();var e=b.getEnabled();var w=b.getWidth();var T=b.getTooltip_AsString();var s=sap.ui.core.IconPool.getIconURI("nav-back");r.write("<button type=\"button\"");r.writeControlData(b);if(!b._isUnstyled()){r.addClass("sapMBtn");if((t===sap.m.ButtonType.Back||t===sap.m.ButtonType.Up)&&b.getIcon()&&!b.getText()){r.addClass("sapMBtnBack")}}r.writeAccessibilityState(b,{role:'button',disabled:!b.getEnabled()});if(!e){r.writeAttribute("disabled","disabled");if(!b._isUnstyled()){r.addClass("sapMBtnDisabled")}}else{switch(t){case sap.m.ButtonType.Accept:case sap.m.ButtonType.Reject:case sap.m.ButtonType.Emphasized:r.addClass("sapMBtnInverted");break;default:break}}if(T){r.writeAttributeEscaped("title",T)}r.writeClasses();if(w!=""||w.toLowerCase()==="auto"){r.addStyle("width",w);r.writeStyles()}r.write(">");r.write("<div");r.writeAttribute("id",b.getId()+"-inner");if(!b._isUnstyled()){r.addClass("sapMBtnInner")}if(b._isHoverable()){r.addClass("sapMBtnHoverable")}if(e){r.addClass("sapMFocusable")}if(this.renderButtonAttributes){this.renderButtonAttributes(r,b)}if(!b._isUnstyled()){if(!b.getIcon()){if(t!=sap.m.ButtonType.Back&&t!=sap.m.ButtonType.Up){r.addClass("sapMBtnPaddingLeft")}if(b.getText()){r.addClass("sapMBtnPaddingRight")}}else{if(b.getIcon()&&b.getText()&&b.getIconFirst()){r.addClass("sapMBtnPaddingRight")}if(b.getIcon()&&b.getText()&&!b.getIconFirst()){if(t!=sap.m.ButtonType.Back&&t!=sap.m.ButtonType.Up){r.addClass("sapMBtnPaddingLeft")}}}}if(!b._isUnstyled()&&t!==""){r.addClass("sapMBtn"+q.sap.escapeHTML(t))}r.writeClasses();r.write(">");if(t===sap.m.ButtonType.Back||t===sap.m.ButtonType.Up){this.writeInternalIconPoolHtml(r,b,s)}if(b.getIcon()){this.writeImgHtml(r,b)}if(b.getText()){r.write("<span");r.addClass("sapMBtnContent");if(b.getIcon()){if(b.getIconFirst()){if(t===sap.m.ButtonType.Back||t===sap.m.ButtonType.Up){r.addClass("sapMBtnBackContentRight")}else{r.addClass("sapMBtnContentRight")}}else{if(t===sap.m.ButtonType.Back||t===sap.m.ButtonType.Up){r.addClass("sapMBtnContentRight")}r.addClass("sapMBtnContentLeft")}}else if(t===sap.m.ButtonType.Back||t===sap.m.ButtonType.Up){r.addClass("sapMBtnContentRight")}r.writeClasses();r.writeAttribute("id",b.getId()+"-content");r.write(">");r.writeEscaped(b.getText());r.write("</span>")}r.write("</div>");r.write("</button>")};B.writeImgHtml=function(r,b){r.renderControl(b._getImage((b.getId()+"-img"),b.getIcon(),b.getActiveIcon(),b.getIconDensityAware()))};B.writeInternalIconPoolHtml=function(r,b,u){r.renderControl(b._getInternalIconBtn((b.getId()+"-iconBtn"),u))};return B},true);
