/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./BarRenderer'],function(q,B){"use strict";var D={};D.render=function(r,c){var a=c.getId(),t=c.getType(),h=c._getAnyHeader(),s=c.getSubHeader(),m=(t===sap.m.DialogType.Message),l=c.getBeginButton(),R=c.getEndButton(),H=c.getHorizontalScrolling(),v=c.getVerticalScrolling();if(h){h.applyTagAndContextClassFor("header")}if(s){s.applyTagAndContextClassFor("subheader")}r.write("<div");r.writeControlData(c);r.addClass("sapMDialog");r.addClass("sapMDialog-CTX");r.addClass("sapMPopup-CTX");r.addClass(sap.m.Dialog._mStateClasses[c.getState()]);if(c._forceDisableScrolling){r.addClass("sapMDialogWithScrollCont")}if(s){r.addClass("sapMDialogWithSubHeader")}if(m){r.addClass("sapMMessageDialog")}if(!v){r.addClass("sapMDialogVerScrollDisabled")}if(!H){r.addClass("sapMDialogHorScrollDisabled")}r.addClass("sapMDialogPhone");if(sap.m._bSizeCompact){r.addClass("sapUiSizeCompact")}r.writeClasses();var T=c.getTooltip_AsString();if(T){r.writeAttributeEscaped("title",T)}r.writeAttribute("tabindex","-1");r.write(">");if(sap.ui.Device.system.desktop){r.write('<span id="'+c.getId()+'-firstfe" tabindex="0"/>')}if(h){r.renderControl(h)}if(s){r.renderControl(s.addStyleClass("sapMDialogSubHeader"))}r.write('<section id="'+a+'-cont" style="width:'+c.getContentWidth()+'" class="sapMDialogSection">');r.write('<div id="'+a+'-scroll" class="sapMDialogScroll">');r.write('<div id="'+a+'-scrollCont" class="sapMDialogScrollCont">');var C=c.getContent();for(var i=0;i<C.length;i++){r.renderControl(C[i])}r.write("</div>");r.write("</div>");r.write("</section>");if(c._oToolbar&&c._oToolbar.getContent().length>1){r.renderControl(c._oToolbar)}else if(l||R){r.write('<footer id="'+a+'-footer" class="sapMDialogActions sapMBar-CTX sapMFooter-CTX sapMIBar-CTX">');if(l){r.write('<div class="sapMDialogAction">');r.renderControl(l.addStyleClass("sapMDialogBtn",true));r.write("</div>")}if(R){r.write('<div class="sapMDialogAction">');r.renderControl(R.addStyleClass("sapMDialogBtn",true));r.write("</div>")}r.write("</footer>")}if(sap.ui.Device.system.desktop){r.write('<span id="'+c.getId()+'-lastfe" tabindex="0"/>')}r.write("</div>")};return D},true);
