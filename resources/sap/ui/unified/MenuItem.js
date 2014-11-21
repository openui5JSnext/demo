/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/IconPool','./MenuItemBase','./library'],function(q,I,M,l){"use strict";var a=M.extend("sap.ui.unified.MenuItem",{metadata:{library:"sap.ui.unified",properties:{text:{type:"string",group:"Appearance",defaultValue:''},icon:{type:"sap.ui.core.URI",group:"Appearance",defaultValue:''}}}});I.getIconInfo("","");a.prototype.render=function(r,i,m,o){var b=r;var s=i.getSubmenu();b.write("<li ");var c="sapUiMnuItm";if(o.iItemNo==1){c+=" sapUiMnuItmFirst"}else if(o.iItemNo==o.iTotalItems){c+=" sapUiMnuItmLast"}if(!m.checkEnabled(i)){c+=" sapUiMnuItmDsbl"}if(i.getStartsSection()){c+=" sapUiMnuItmSepBefore"}b.writeAttribute("class",c);if(i.getTooltip_AsString()){b.writeAttributeEscaped("title",i.getTooltip_AsString())}b.writeElementData(i);if(o.bAccessible){b.writeAttribute("role","menuitem");b.writeAttribute("aria-labelledby",m.getId()+" "+this.getId()+"-txt "+this.getId()+"-scuttxt");b.writeAttribute("aria-disabled",!m.checkEnabled(i));b.writeAttribute("aria-posinset",o.iItemNo);b.writeAttribute("aria-setsize",o.iTotalItems);if(s){b.writeAttribute("aria-haspopup",true);b.writeAttribute("aria-owns",s.getId())}}b.write("><div class=\"sapUiMnuItmL\"></div>");b.write("<div class=\"sapUiMnuItmIco\">");if(i.getIcon()){b.writeIcon(i.getIcon())}b.write("</div>");b.write("<div id=\""+this.getId()+"-txt\" class=\"sapUiMnuItmTxt\">");b.writeEscaped(i.getText());b.write("</div>");b.write("<div id=\""+this.getId()+"-scuttxt\" class=\"sapUiMnuItmSCut\"></div>");b.write("<div class=\"sapUiMnuItmSbMnu\">");if(s){b.write("<div class=\"sapUiIconMirrorInRTL\"></div>")}b.write("</div>");b.write("<div class=\"sapUiMnuItmR\"></div>");b.write("</li>")};a.prototype.hover=function(h,m){this.$().toggleClass("sapUiMnuItmHov",h)};return a},true);
