/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global'],function(q){"use strict";var G={};G.render=function(r,c){var I=/^([L](?:[0-9]|1[0-1]))? ?([M](?:[0-9]|1[0-1]))? ?([S](?:[0-9]|1[0-1]))?$/i;var S=/^([L](?:[1-9]|1[0-2]))? ?([M](?:[1-9]|1[0-2]))? ?([S](?:[1-9]|1[0-2]))?$/i;r.write("<div");r.writeControlData(c);r.addClass("sapUiRespGrid");var M=sap.ui.Device.media.getCurrentRange(sap.ui.Device.media.RANGESETS.SAP_STANDARD).name;r.addClass("sapUiRespGridMedia-Std-"+M);var h=c.getHSpacing();if(h==0.5){h="05"}else if((h!==0)&&(h!==1)&&(h!==2)){h=1}r.addClass("sapUiRespGridHSpace"+h);var v=c.getVSpacing();if(v==0.5){v="05"}else if((v!==0)&&(v!==1)&&(v!==2)){v=1}r.addClass("sapUiRespGridVSpace"+v);var p=c.getPosition();if(p){p=p.toUpperCase();if(p===sap.ui.layout.GridPosition.Center.toUpperCase()){r.addClass("sapUiRespGridPosCenter")}else if(p===sap.ui.layout.GridPosition.Right.toUpperCase()){r.addClass("sapUiRespGridPosRight")}}r.writeClasses();var w=c.getWidth();if(w!=="100%"&&w!=="auto"&&w!=="inherit"){if(h==0){w="width: "+w}else{w="width: -webkit-calc("+w+" - "+h+"rem); width: calc("+w+" - "+h+"rem); "}r.writeAttribute("style",w)}r.write(">");var a=c.getContent();var d=c.getDefaultSpan();var b=c.getDefaultIndent();var D=I.exec(b);var e=["","L3","M6","S12"];var f=S.exec(d);for(var i=0;i<a.length;i++){r.write("<div");var L=c._getLayoutDataForControl(a[i]);if(L){if(L.getLinebreak()===true){r.addClass("sapUiRespGridBreak")}else{if(L.getLinebreakL()===true){r.addClass("sapUiRespGridBreakL")}if(L.getLinebreakM()===true){r.addClass("sapUiRespGridBreakM")}if(L.getLinebreakS()===true){r.addClass("sapUiRespGridBreakS")}}var g;var k=L.getSpan();if(!k||!k.lenght==0){g=f}else{g=S.exec(k)}if(g){for(var j=1;j<g.length;j++){var n=g[j];if(!n){n=f[j];if(!n){n=e[j]}}var o=L.getSpanL();var t=L.getSpanM();var u=L.getSpanS();n=n.toUpperCase();if((n.substr(0,1)==="L")&&(o>0)&&(o<13)){r.addClass("sapUiRespGridSpanL"+o)}else if((n.substr(0,1)==="M")&&(t>0)&&(t<13)){r.addClass("sapUiRespGridSpanM"+t)}else if((n.substr(0,1)==="S")&&(u>0)&&(u<13)){r.addClass("sapUiRespGridSpanS"+u)}else{r.addClass("sapUiRespGridSpan"+n)}}}var x;var y=L.getIndent();if(!y||y.length==0){x=D}else{x=I.exec(y)}if(!x){x=D;if(!x){x=undefined}}if(x){for(var j=1;j<x.length;j++){var z=x[j];if(!z){if(D&&D[j]){z=D[j]}}if(z){z=z.toUpperCase();var A=L.getIndentL();var B=L.getIndentM();var C=L.getIndentS();if((z.substr(0,1)==="L")&&(A>0)&&(A<12)){r.addClass("sapUiRespGridIndentL"+A)}else if((z.substr(0,1)==="M")&&(B>0)&&(B<12)){r.addClass("sapUiRespGridIndentM"+B)}else if((z.substr(0,1)==="S")&&(C>0)&&(C<12)){r.addClass("sapUiRespGridIndentS"+C)}else{if(!(/^(L0)? ?(M0)? ?(S0)?$/.exec(z))){r.addClass("sapUiRespGridIndent"+z)}}}}}var l=L.getVisibleL(),m=L.getVisibleM(),s=L.getVisibleS();if(!l&&m&&s){r.addClass("sapUiRespGridHiddenL")}else if(!l&&!m&&s){r.addClass("sapUiRespGridVisibleS")}else if(l&&!m&&!s){r.addClass("sapUiRespGridVisibleL")}else if(!l&&m&&!s){r.addClass("sapUiRespGridVisibleM")}else if(l&&!m&&s){r.addClass("sapUiRespGridHiddenM")}else if(l&&m&&!s){r.addClass("sapUiRespGridHiddenS")}var E=L.getMoveBackwards();if(E&&E.length>0){var F=I.exec(E);if(F){for(var j=1;j<F.length;j++){var H=F[j];if(H){r.addClass("sapUiRespGridBwd"+H.toUpperCase())}}}}var J=L.getMoveForward();if(J&&J.length>0){var K=I.exec(J);if(K){for(var j=1;j<K.length;j++){var N=K[j];if(N){r.addClass("sapUiRespGridFwd"+N.toUpperCase())}}}}if(L._sStylesInternal){r.addClass(L._sStylesInternal)}}if(!L){var n="";if(f){for(var j=1;j<f.length;j++){n=f[j];if(!n){n=e[j]}r.addClass("sapUiRespGridSpan"+n.toUpperCase())}}else{for(var j=1;j<e.length;j++){n=e[j];r.addClass("sapUiRespGridSpan"+n.toUpperCase())}}var z="";if(D){for(var j=1;j<D.length;j++){z=D[j];if(z&&(z.substr(1,1)!=="0")){r.addClass("sapUiRespGridIndent"+z.toUpperCase())}}}}r.writeClasses();r.write(">");r.renderControl(a[i]);r.write("</div>")}r.write("</div>")};return G},true);
