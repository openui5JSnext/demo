/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./TextField','./library','sap/ui/model/type/Date'],function(q,T,l,D){"use strict";var a=T.extend("sap.ui.commons.DatePicker",{metadata:{library:"sap.ui.commons",properties:{locale:{type:"string",group:"Misc",defaultValue:null},yyyymmdd:{type:"string",group:"Misc",defaultValue:null}}}});(function(){a.prototype.init=function(){T.prototype.init.apply(this,arguments);this._oFormatYyyymmdd=sap.ui.core.format.DateFormat.getInstance({pattern:"yyyyMMdd",strictParsing:true});if(sap.ui.Device.browser.mobile){this._bMobile=true;this._oFormatMobile=sap.ui.core.format.DateFormat.getInstance({pattern:"yyyy-MM-dd",strictParsing:true})}};a.prototype.exit=function(){this._oDate=undefined;this._oLocale=undefined;if(this._oPopup){if(this._oPopup.isOpen()){this._oPopup.close()}delete this._oPopup}if(this._oCalendar){this._oCalendar.destroy();delete this._oCalendar}};a.prototype.onAfterRendering=function(){if(this._bMobile){if(this._oDate){var I=q(this.getInputDomRef());var o=this._oFormatMobile.format(this._oDate);I.val(o)}}};a.prototype.invalidate=function(o){if(!o||o!=this._oCalendar){sap.ui.core.Control.prototype.invalidate.apply(this,arguments)}};a.prototype.onsapshow=function(E){var t=this;e(t);E.preventDefault()};a.prototype.onsaphide=a.prototype.onsapshow;a.prototype.onsappageup=function(E){var t=this;i(t,1,"day");E.preventDefault()};a.prototype.onsappageupmodifiers=function(E){var t=this;if(!E.ctrlKey&&E.shiftKey){i(t,1,"month")}else{i(t,1,"year")}E.preventDefault()};a.prototype.onsappagedown=function(E){var t=this;i(t,-1,"day");E.preventDefault()};a.prototype.onsappagedownmodifiers=function(E){var t=this;if(!E.ctrlKey&&E.shiftKey){i(t,-1,"month")}else{i(t,-1,"year")}E.preventDefault()};a.prototype.onkeypress=function(E){if(E.charCode){var t=this;var F=_(t);var C=String.fromCharCode(E.charCode);if(C&&F.sAllowedCharacters&&F.sAllowedCharacters.indexOf(C)<0){E.preventDefault()}}};a.prototype.onclick=function(E){if(q(E.target).hasClass("sapUiTfDateIcon")&&!this._bMobile){var t=this;e(t)}};a.prototype.onsapfocusleave=function(E){if(this._oCalendar&&E.relatedControlId&&(q.sap.containsOrEquals(this._oCalendar.getDomRef(),sap.ui.getCore().byId(E.relatedControlId).getFocusDomRef())||this.getId()==E.relatedControlId)){return}T.prototype.onsapfocusleave.apply(this,arguments)};a.prototype.setValue=function(v){var o=this.getValue();if(v==o){return this}var t=this;c(t);this.setProperty("value",v,true);this._bValueSet=true;if(v){this._oDate=this._parseValue(v)}else{this._oDate=undefined}var y="";if(this._oDate){y=this._oFormatYyyymmdd.format(this._oDate)}this.setProperty("yyyymmdd",y,true);if(this.getDomRef()){var O="";var I=q(this.getInputDomRef());if(this._bMobile&&this._oDate){O=this._oFormatMobile.format(this._oDate)}else{O=v}I.val(O)}return this};a.prototype.setYyyymmdd=function(y){var o=this.getYyyymmdd();if(y==o){return this}this.setProperty("yyyymmdd",y,true);this._bValueSet=false;var v="";if(y){this._oDate=this._oFormatYyyymmdd.parse(y)}else{this._oDate=undefined}if(this._oDate){v=this._formatValue(this._oDate)}this.setProperty("value",v,true);if(this.getDomRef()){var O="";var I=q(this.getInputDomRef());if(this._bMobile&&this._oDate){O=this._oFormatMobile.format(this._oDate)}else{O=v}I.val(O)}return this};a.prototype.setLocale=function(L){var o=this.getLocale();if(L==o){return this}this.setProperty("locale",L,true);var t=this;c(t);this._oLocale=new sap.ui.core.Locale(L);this._sUsedPattern=undefined;var v="";if(this._bValueSet){v=this.getValue();if(v){this._oDate=this._parseValue(v)}else{this._oDate=undefined}var y="";if(this._oDate){y=this._oFormatYyyymmdd.format(this._oDate)}this.setProperty("yyyymmdd",y,true)}else{if(this._oDate){v=this._formatValue(this._oDate)}this.setProperty("value",v,true)}if(this.getDomRef()){var O="";var I=q(this.getInputDomRef());if(this._bMobile&&this._oDate){O=this._oFormatMobile.format(this._oDate)}else{O=v}I.val(O)}return this};a.prototype._checkChange=function(E){var I=this.getInputDomRef();var n=I&&I.value;if(this._bMobile&&n!=""){this._oDate=this._oFormatMobile.parse(n);n=this._formatValue(this._oDate)}if(this.getEditable()&&this.getEnabled()&&n!=this.getValue()){var w=false;if(n!=""){if(!this._bMobile){this._oDate=this._parseValue(n);if(this._oDate){n=this._formatValue(this._oDate);I.value=n;if(this._oPopup&&this._oPopup.isOpen()){this._oCalendar.focusDate(this._oDate);if(!this._oDateRange.getStartDate()||this._oDateRange.getStartDate().getTime()!=this._oDate.getTime()){this._oDateRange.setStartDate(new Date(this._oDate.getTime()))}}}else{w=true}}}else{this._oDate=undefined}this.setProperty("value",n,true);this._bValueSet=false;if(!w){var y="";if(this._oDate){y=this._oFormatYyyymmdd.format(this._oDate)}this.setProperty("yyyymmdd",y,true)}this.fireChange(w)}else if(this.getEditable()&&this.getEnabled()&&n==this.getYyyymmdd()){I.value=this.getValue()}};a.prototype.fireChange=function(I){this.fireEvent("change",{newValue:this.getValue(),newYyyymmdd:this.getYyyymmdd(),invalidValue:I});return this};a.prototype._parseValue=function(v){var t=this;var F=_(t);var o=F.parse(v);return o};a.prototype._formatValue=function(o){var t=this;var F=_(t);var v=F.format(o);return v};function _(t){var p="";var r=false;var B=t.getBinding("value");var L;if(B&&B.oType&&(B.oType instanceof D)){p=B.oType.getOutputPattern();r=!!B.oType.oOutputFormat.oFormatOptions.relative}if(!p){L=b(t);var o=sap.ui.core.LocaleData.getInstance(L);p=o.getDatePattern("medium")}if(p!=t._sUsedPattern){t._sUsedPattern=p;if(p=="short"||p=="medium"||p=="long"){t._oFormat=sap.ui.core.format.DateFormat.getInstance({style:p,strictParsing:true,relative:r},L)}else{t._oFormat=sap.ui.core.format.DateFormat.getInstance({pattern:p,strictParsing:true,relative:r},L)}}return t._oFormat}function b(t){var L=t.getLocale();var o;if(L){o=t._oLocale}else{o=sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale()}return o}function c(t){var B=t.getBinding("value");var L=t.getLocale();if(B&&B.oType&&(B.oType instanceof D)&&L){q.sap.log.warning("DatePicker "+t.getId()+": Using a locale and Databinding at the same time is not supported");t._bIgnoreLocale=true}}function d(t){if(!t._oPopup){q.sap.require("sap.ui.core.Popup");t._oPopup=new sap.ui.core.Popup();t._oPopup.setAutoClose(true);t._oPopup.setDurations(0,0);t._oPopup.attachClosed(h,t)}if(!t._oCalendar){sap.ui.getCore().loadLibrary("sap.ui.unified");q.sap.require("sap.ui.unified.library");t._oCalendar=new sap.ui.unified.Calendar(t.getId()+"-cal");t._oDateRange=new sap.ui.unified.DateRange();t._oCalendar.addSelectedDate(t._oDateRange);t._oCalendar.attachSelect(f,t);t._oCalendar.attachCancel(g,t);t._oPopup.setContent(t._oCalendar);t._oCalendar.addStyleClass("sapUiSizeCompact");t._oCalendar.setPopupMode(true);t._oCalendar.setParent(t,undefined,true)}t._checkChange();var o=t._oDate;if(o){t._oCalendar.focusDate(o);if(!t._oDateRange.getStartDate()||t._oDateRange.getStartDate().getTime()!=o.getTime()){t._oDateRange.setStartDate(new Date(o.getTime()))}}else{if(t._oDateRange.getStartDate()){t._oDateRange.setStartDate(undefined)}}if(!t._bIgnoreLocale){t._oCalendar.setLocale(t.getLocale())}t._oPopup.setAutoCloseAreas([t.getDomRef()]);var j=sap.ui.core.Popup.Dock;t._oPopup.open(0,j.BeginTop,j.BeginBottom,t,null,null,true)}function e(t){if(t.getEditable()&&t.getEnabled()){if(!t._oPopup||!t._oPopup.isOpen()){d(t)}else{t._oPopup.close();t.focus()}}}function f(E){var s=this._oCalendar.getSelectedDates();var o="";if(s.length>0){this._oDate=s[0].getStartDate();o=this._formatValue(this._oDate)}this._oPopup.close();this.focus();var n=this._formatValue(this._oDate);this.setProperty("value",n,true);this._bValueSet=false;var y=this._oFormatYyyymmdd.format(this._oDate);this.setProperty("yyyymmdd",y,true);var I=this.$("input");if(I.val()!==o){I.val(o);this._curpos=o.length;I.cursorPos(this._curpos)}this.fireChange()}function g(E){if(this._oPopup&&this._oPopup.isOpen()){this._oPopup.close();this.focus()}}function h(E){if(!q.sap.containsOrEquals(this.getDomRef(),document.activeElement)&&this.getRenderer().onblur){this.getRenderer().onblur(this)}}function i(t,n,u){var o=t._oDate;if(o&&t.getEditable()&&t.getEnabled()){var j=new Date(o.getTime());var I=q(t.getInputDomRef());var p=I.cursorPos();switch(u){case"day":j.setDate(j.getDate()+n);break;case"month":j.setMonth(j.getMonth()+n);break;case"year":j.setFullYear(j.getFullYear()+n);break;default:break}t._oDate=j;var O=t._formatValue(j);I.val(O);I.cursorPos(p)}}}());return a},true);
