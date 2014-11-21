/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global'],function(q){"use strict";var D={};D.render=function(r,c){var a=r,v=null;c.prepareRendering();a.write("<div");a.writeControlData(c);a.addClass("sapUiUx3DS");a.writeClasses();a.writeStyles();a.write(">");a.write("<div id='"+c.getId()+"-toolbar'");a.addClass('sapUiUx3DSToolbar');if(!c.getShowToolbar()){a.addClass('noPadding')}a.writeClasses();a.write(">");this.renderToolbar(a,c);a.write("</div>");a.write("<div id='"+c.getId()+"-filter'");a.addClass('sapUiUx3DSFilterArea');if(!c.getShowFilter()){a.addClass('noPadding')}a.writeClasses();a.write(">");this.renderFilterArea(a,c);a.write("</div>");a.write("<div");a.writeAttribute("id",c.getId()+"-items");a.addClass("sapUiUx3DSItems");a.writeClasses();a.write(">");v=sap.ui.getCore().byId(c.getSelectedView());a.renderControl(v);a.write("</div>");a.write("</div>")};D.renderToolbar=function(r,c){var a=r;if(c.getShowToolbar()){a.renderControl(c._getToolbar())}};D.renderFilterArea=function(r,c){var a=r,f=c.getFilter();if(c.getShowFilter()){q.each(f,function(i,F){a.renderControl(F)})}};return D},true);
