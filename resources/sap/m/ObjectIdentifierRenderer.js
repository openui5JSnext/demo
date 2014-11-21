/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global'],function(q){"use strict";var O={};O.render=function(r,o){if(!o.getVisible()){return}r.write("<div");r.writeControlData(o);r.addClass("sapMObjectIdentifier");r.writeClasses();r.write(">");r.write("<div");r.addClass("sapMObjectIdentifierTopRow");r.writeClasses();r.write(">");r.write("<div");r.addClass("sapMObjectIdentifierIcons");r.writeClasses();r.write(">");if(o.getBadgeAttachments()){r.write("<span");r.addClass("sapMObjectIdentifierIconSpan");r.writeClasses();r.write(">");r.renderControl(o._getAttachmentsIcon());r.write("</span>")}if(o.getBadgeNotes()){r.write("<span");r.addClass("sapMObjectIdentifierIconSpan");r.writeClasses();r.write(">");r.renderControl(o._getNotesIcon());r.write("</span>")}if(o.getBadgePeople()){r.write("<span");r.addClass("sapMObjectIdentifierIconSpan");r.writeClasses();r.write(">");r.renderControl(o._getPeopleIcon());r.write("</span>")}r.write("</div>");r.write("<div id='"+o.getId()+"-title'");r.addClass("sapMObjectIdentifierTitle");r.writeClasses();r.write(">");r.renderControl(o._getTitleControl());r.write("</div>");r.write("</div>");r.write("<div id='"+o.getId()+"-text'");r.addClass("sapMObjectIdentifierText");if(!!o.getProperty("text")&&!!o.getProperty("title")){r.addClass("sapMObjectIdentifierTextBellow")}r.writeClasses();r.write(">");r.renderControl(o._getTextControl());r.write("</div>");r.write("</div>")};return O},true);
