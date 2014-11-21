/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/ValueStateSupport'],function(q,V){"use strict";var T={};T.render=function(r,c){var m=0;var R=false;var e=!!c.getEnabled();var a=!!c.getEditable();var i=false;var b=false;var s=c.getSelectionState();var d=s.toLowerCase();if(d=="checked"){d=true}else if(d=="unchecked"){d=false}var t=V.enrichTooltip(c,c.getTooltip_AsString());var f="sapUiAriaLabel"+c.getIdForLabel();if(c.getValueState()!=null){i=sap.ui.core.ValueState.Error==c.getValueState();b=sap.ui.core.ValueState.Warning==c.getValueState()}r.write("<span");r.writeControlData(c);r.addClass("sapUiTriCb");if(!!c.getWidth()){r.writeAttribute("style","width:"+c.getWidth()+";")}r.writeAccessibilityState(c,{"role":sap.ui.core.AccessibleRole.Checkbox.toLowerCase(),"checked":d});r.writeClasses();if(!e){m=-1}r.writeAttribute("tabIndex",m);r.write(">");r.write("<span");r.writeAccessibilityState(c,{"labelledby":f});if(t){r.writeAttributeEscaped("title",t)}if(!e){R=true;m=-1;r.write(" disabled='disabled'")}if(!a){R=true}if(R){r.write(" readOnly='readOnly'")}r.addClass("sapUiTriCbInner");if(!e){r.addClass("sapUiTriCbDis")}if(!a){r.addClass("sapUiTriCbRo")}if(i){r.addClass("sapUiTriCbErr")}else if(b){r.addClass("sapUiTriCbWarn")}if(s==="Checked"){r.addClass("sapUiTriCbCheck")}else if(s==="Mixed"){r.addClass("sapUiTriCbMix")}r.writeClasses();r.write(">");r.write("</span>");if(c.getText()){this.renderText(f,r,c.getText(),c.getTextDirection())}r.write("</span>")};T.renderText=function(l,r,t,e){var R=r;R.write("<span id="+l+" class=\"sapUiTriCbLbl\"");if(!e||e==sap.ui.core.TextDirection.Inherit){R.write(">");R.writeEscaped(t)}else{R.write(" style=\"direction:"+e.toLowerCase()+";\">");R.writeEscaped(t)}R.write("</span>")};return T},true);
