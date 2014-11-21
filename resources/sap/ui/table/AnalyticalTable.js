/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/model/analytics/TreeBindingAdapter','./AnalyticalColumn','./Table','./library'],function(q,T,A,a,b){"use strict";var c=a.extend("sap.ui.table.AnalyticalTable",{metadata:{library:"sap.ui.table",properties:{sumOnTop:{type:"boolean",group:"Appearance",defaultValue:false},numberOfExpandedLevels:{type:"int",group:"Misc",defaultValue:0},columnVisibilityMenuSorter:{type:"any",group:"Appearance",defaultValue:null},dirty:{type:"boolean",group:"Appearance",defaultValue:null,deprecated:true}}}});c.prototype.init=function(){a.prototype.init.apply(this,arguments);this.addStyleClass("sapUiAnalyticalTable");this.attachBrowserEvent("contextmenu",this._onContextMenu);this.setSelectionMode(sap.ui.table.SelectionMode.MultiToggle);this.setShowColumnVisibilityMenu(true);this.setEnableColumnFreeze(true);this.setEnableCellFilter(true);this._aGroupedColumns=[];if(sap.ui.getCore().getConfiguration().getTheme()==="sap_bluecrystal"){q.sap.require("sap.ui.core.IconPool");sap.ui.core.IconPool.insertFontFaceStyle()}this._bBindingAttachedListener=false};c.prototype.setFixedRowCount=function(){q.sap.log.error("The property fixedRowCount is not supported by the AnalyticalTable and must not be set!");return this};c.prototype.setFixedBottomRowCount=function(){q.sap.log.error("The property fixedBottomRowCount is managed by the AnalyticalTable and must not be set!");return this};c.prototype.onAfterRendering=function(){a.prototype.onAfterRendering.apply(this,arguments);this.$().find("[role=grid]").attr("role","treegrid")};c.prototype.setDirty=function(d){q.sap.log.error("The property \"dirty\" is deprecated. Please use \"showOverlay\".");this.setProperty("dirty",d,true);this.setShowOverlay(this.getDirty());return this};c.prototype.getModel=function(m,n){var m=a.prototype.getModel.apply(this,arguments);if(m&&sap.ui.model.odata&&m instanceof sap.ui.model.odata.ODataModel){q.sap.require("sap.ui.model.analytics.ODataModelAdapter");sap.ui.model.analytics.ODataModelAdapter.apply(m)}return m};c.prototype._bindAggregation=function(n,p,t,s,f){if(n==="rows"){this.setProperty("firstVisibleRow",0,true)}return a.prototype._bindAggregation.apply(this,arguments)};c.prototype._onBindingChange=function(e){a.prototype._onBindingChange.apply(this,arguments);var r=typeof(e)==="object"?e.getParameter("reason"):e;if(r!=="sort"){this._invalidateColumnMenus()}};c.prototype.bindRows=function(B){var p,t,s,f;if(typeof B=="string"){p=arguments[0];t=arguments[1];s=arguments[2];f=arguments[3];B={path:p,sorter:s,filters:f};if(t instanceof sap.ui.base.ManagedObject){B.template=t}else if(typeof t==="function"){B.factory=t}}var C=this.getColumns();for(var i=0,l=C.length;i<l;i++){if(C[i].getSorted()){B.sorter=B.sorter||[];B.sorter.push(new sap.ui.model.Sorter(C[i].getSortProperty()||C[i].getLeadingProperty(),C[i].getSortOrder()===sap.ui.table.SortOrder.Descending))}}B.parameters=B.parameters||{};B.parameters.analyticalInfo=this._getColumnInformation();B.parameters.sumOnTop=this.getSumOnTop();B.parameters.numberOfExpandedLevels=this.getNumberOfExpandedLevels();var r=this.bindAggregation("rows",B);this._bSupressRefresh=true;this._updateColumns();this._bSupressRefresh=false;this._bBindingAttachedListener=false;return r};c.prototype.updateRows=function(r){this._attachBindingListener();a.prototype.updateRows.apply(this,arguments)};c.prototype.refreshRows=function(r){this._attachBindingListener();a.prototype.refreshRows.apply(this,arguments)};c.prototype._attachBindingListener=function(){if(!this._bBindingAttachedListener){this._bBindingAttachedListener=true;var B=this.getBinding("rows");var t=this;if(B){B.attachContextChange(function(e){if(!t._oSelection){return}var p=e.getParameters(),s=p.type,i=p.index,l=p.length;if(s==="remove"){t._oSelection.sliceSelectionInterval(i,Math.max(i,i+l-1))}else{t._oSelection.moveSelectionInterval(i,l)}})}}};c.prototype._getColumnInformation=function(){var C=[],t=this.getColumns();for(var i=0;i<this._aGroupedColumns.length;i++){var o=sap.ui.getCore().byId(this._aGroupedColumns[i]);if(!o){continue}C.push({name:o.getLeadingProperty(),visible:o.getVisible(),grouped:o.getGrouped(),total:o.getSummed(),sorted:o.getSorted(),sortOrder:o.getSortOrder(),inResult:o.getInResult(),formatter:o.getGroupHeaderFormatter()})}for(var i=0;i<t.length;i++){var o=t[i];if(q.inArray(o.getId(),this._aGroupedColumns)>-1){continue}if(!o instanceof A){q.sap.log.error("You have to use AnalyticalColumns for the Analytical table")}C.push({name:o.getLeadingProperty(),visible:o.getVisible(),grouped:o.getGrouped(),total:o.getSummed(),sorted:o.getSorted(),sortOrder:o.getSortOrder(),inResult:o.getInResult(),formatter:o.getGroupHeaderFormatter()})}return C};c.prototype._updateTableContent=function(){a.prototype._updateTableContent.apply(this,arguments);var B=this.getBinding("rows"),f=this.getFirstVisibleRow(),F=this.getFixedBottomRowCount(),C=this.getVisibleRowCount(),d=this.getColumns();if(!B){return}var e=this._getFirstMeasureColumnIndex(),m;if(e>-1){var h=this.getSelectionMode()!==sap.ui.table.SelectionMode.None&&this.getSelectionBehavior()!==sap.ui.table.SelectionBehavior.RowOnly;var $=this.$().find(".sapUiTableCtrlFirstCol > th");if(h){$=$.not(":nth-child(1)")}var o=$.get(0).getBoundingClientRect().left;var g=$.get(this._getFirstMeasureColumnIndex());if(g){var M=32+g.getBoundingClientRect().left-o;m=M+"px"}else{m="none"}}else{m="none"}var r=this.getRows();for(var R=0,l=Math.min(C,r.length);R<l;R++){var I=R>(C-F-1)&&B.getLength()>C,j=I?(B.getLength()-1-(C-1-R)):f+R,k=this.getContextInfoByIndex(j),n=r[R],p=n.$(),s=n.$("fixed"),t=this.$().find("div[data-sap-ui-rowindex="+p.attr("data-sap-ui-rowindex")+"]"),L=k?k.level:0;if(!k||!k.context){p.removeAttr("data-sap-ui-level");p.removeAttr('aria-level');p.removeAttr('aria-expanded');p.removeClass("sapUiTableGroupHeader");p.removeClass("sapUiAnalyticalTableSum");p.removeClass("sapUiAnalyticalTableDummy");s.removeAttr("data-sap-ui-level");s.removeAttr('aria-level');s.removeAttr('aria-expanded');s.removeClass("sapUiTableGroupHeader");t.removeClass("sapUiTableGroupHeader");t.html("");t.removeAttr("data-sap-ui-level");t.removeClass("sapUiAnalyticalTableSum");t.removeClass("sapUiAnalyticalTableDummy");if(k&&!k.context){p.addClass("sapUiAnalyticalTableDummy");t.addClass("sapUiAnalyticalTableDummy");t.html('<div class="sapUiAnalyticalTableLoading">Loading...</div>')}continue}if(B.indexHasChildren&&B.indexHasChildren(j)){p.addClass("sapUiTableGroupHeader");s.addClass("sapUiTableGroupHeader");var u=k.expanded?"sapUiTableGroupIconOpen":"sapUiTableGroupIconClosed";p.attr('aria-expanded',k.expanded);s.attr('aria-expanded',k.expanded);var G=B.getGroupName(k.context,k.level);t.html("<div class=\"sapUiTableGroupIcon "+u+"\" tabindex=\"-1\" title=\""+G+"\" style=\"max-width:"+m+"\">"+G+"</div>");if(k.expanded&&!this.getSumOnTop()){p.addClass("sapUiTableRowHidden")}p.removeClass("sapUiAnalyticalTableSum");t.removeClass("sapUiAnalyticalTableSum");p.removeClass("sapUiAnalyticalTableDummy");t.removeClass("sapUiAnalyticalTableDummy");t.addClass("sapUiTableGroupHeader").removeAttr("title")}else{p.attr('aria-expanded',false);p.removeClass("sapUiTableGroupHeader");p.removeClass("sapUiTableRowHidden");p.removeClass("sapUiAnalyticalTableSum");p.removeClass("sapUiAnalyticalTableDummy");s.attr('aria-expanded',false);s.removeClass("sapUiTableGroupHeader");t.html("");t.removeClass("sapUiTableGroupHeader");t.removeClass("sapUiAnalyticalTableDummy");t.removeClass("sapUiAnalyticalTableSum");if(k.sum&&k.context&&k.context.getObject()){p.addClass("sapUiAnalyticalTableSum");t.addClass("sapUiAnalyticalTableSum")}}p.attr("data-sap-ui-level",L);s.attr("data-sap-ui-level",L);t.attr("data-sap-ui-level",L);p.attr('aria-level',L+1);s.attr('aria-level',L+1);var v=n.getCells();for(var i=0,w=v.length;i<w;i++){var x=v[i].data("sap-ui-colindex");var y=d[x];var z=q(v[i].$().closest("td"));if(B.isMeasure(y.getLeadingProperty())){if(!k.sum||y.getSummed()){z.removeClass("sapUiTableCellHidden")}else{z.addClass("sapUiTableCellHidden")}}}}};c.prototype.onclick=function(e){if(q(e.target).hasClass("sapUiTableGroupIcon")){this._onNodeSelect(e)}else if(q(e.target).hasClass("sapUiAnalyticalTableSum")){e.preventDefault();return}else{if(a.prototype.onclick){a.prototype.onclick.apply(this,arguments)}}};c.prototype.onsapselect=function(e){if(q(e.target).hasClass("sapUiTableGroupIcon")){this._onNodeSelect(e)}else if(q(e.target).hasClass("sapUiAnalyticalTableSum")){e.preventDefault();return}else{var t=q(e.target),$=t.closest('div.sapUiTableRowHdr');if($.hasClass('sapUiTableGroupHeader')&&$.hasClass('sapUiTableRowHdr')){var r=this.getFirstVisibleRow()+parseInt($.attr("data-sap-ui-rowindex"),10);var B=this.getBinding("rows");B.toggleIndex(r);this.updateRows();return}if(a.prototype.onsapselect){a.prototype.onsapselect.apply(this,arguments)}}};c.prototype._onNodeSelect=function(e){var $=q(e.target).parent();if($.length>0){var r=this.getFirstVisibleRow()+parseInt($.attr("data-sap-ui-rowindex"),10);var B=this.getBinding("rows");B.toggleIndex(r);this.updateRows()}e.preventDefault();e.stopPropagation()};c.prototype._onContextMenu=function(e){if(q(e.target).closest('tr').hasClass('sapUiTableGroupHeader')||q(e.target).closest('.sapUiTableRowHdr.sapUiTableGroupHeader').length>0){this._iGroupedLevel=q(e.target).closest('[data-sap-ui-level]').data('sap-ui-level');var m=this._getGroupHeaderMenu();var d=sap.ui.core.Popup.Dock;m.open(false,e.target,d.LeftTop,d.LeftTop,document,(e.pageX-2)+" "+(e.pageY-2));e.preventDefault();e.stopPropagation();return}return true};c.prototype._getGroupHeaderMenu=function(){var t=this;function g(){var i=t._iGroupedLevel-1;if(t._aGroupedColumns[i]){var o=t.getColumns().filter(function(C){if(t._aGroupedColumns[i]==C.getId()){return true}})[0];return{column:o,index:q.inArray(o,t.getColumns())+1}}else{return undefined}}if(!this._oGroupHeaderMenu){this._oGroupHeaderMenu=new sap.ui.unified.Menu();this._oGroupHeaderMenuVisibilityItem=new sap.ui.unified.MenuItem({text:this._oResBundle.getText("TBL_SHOW_COLUMN"),select:function(){var G=g();if(G){var C=G.column;C.setShowIfGrouped(!C.getShowIfGrouped())}}});this._oGroupHeaderMenu.addItem(this._oGroupHeaderMenuVisibilityItem);this._oGroupHeaderMenu.addItem(new sap.ui.unified.MenuItem({text:this._oResBundle.getText("TBL_UNGROUP"),select:function(){var d=t.getColumns(),f=0,l=-1,u=-1,C;for(var i=0;i<d.length;i++){C=d[i];if(C.getGrouped()){f++;if(f==t._iGroupedLevel){C._bSkipUpdateAI=true;C.setGrouped(false);C._bSkipUpdateAI=false;u=i}else{l=i}}}if(l>-1&&u>-1&&u<l){var U=d[u];var h=U.getHeaderSpan();if(q.isArray(h)){h=h[0]}var r=[];for(var i=u;i<u+h;i++){r.push(d[i])}q.each(r,function(I,C){t.removeColumn(C);t.insertColumn(C,l)})}t._updateTableColumnDetails();t.updateAnalyticalInfo()}}));this._oGroupHeaderMenu.addItem(new sap.ui.unified.MenuItem({text:this._oResBundle.getText("TBL_UNGROUP_ALL"),select:function(){var d=t.getColumns();for(var i=0;i<d.length;i++){d[i]._bSkipUpdateAI=true;d[i].setGrouped(false);d[i]._bSkipUpdateAI=false}t._bSupressRefresh=true;t._updateTableColumnDetails();t.updateAnalyticalInfo();t._bSupressRefresh=false}}));this._oGroupHeaderMoveUpItem=new sap.ui.unified.MenuItem({text:this._oResBundle.getText("TBL_MOVE_UP"),select:function(){var G=g();if(G){var C=G.column;var i=q.inArray(C.getId(),t._aGroupedColumns);if(i>0){t._aGroupedColumns[i]=t._aGroupedColumns.splice(i-1,1,t._aGroupedColumns[i])[0];t.updateAnalyticalInfo()}}},icon:"sap-icon://arrow-top"});this._oGroupHeaderMenu.addItem(this._oGroupHeaderMoveUpItem);this._oGroupHeaderMoveDownItem=new sap.ui.unified.MenuItem({text:this._oResBundle.getText("TBL_MOVE_DOWN"),select:function(){var G=g();if(G){var C=G.column;var i=q.inArray(C.getId(),t._aGroupedColumns);if(i<t._aGroupedColumns.length){t._aGroupedColumns[i]=t._aGroupedColumns.splice(i+1,1,t._aGroupedColumns[i])[0];t.updateAnalyticalInfo()}}},icon:"sap-icon://arrow-bottom"});this._oGroupHeaderMenu.addItem(this._oGroupHeaderMoveDownItem);this._oGroupHeaderMenu.addItem(new sap.ui.unified.MenuItem({text:this._oResBundle.getText("TBL_SORT_ASC"),select:function(){var G=g();if(G){var C=G.column;C.sort(false)}},icon:"sap-icon://up"}));this._oGroupHeaderMenu.addItem(new sap.ui.unified.MenuItem({text:this._oResBundle.getText("TBL_SORT_DESC"),select:function(){var G=g();if(G){var C=G.column;C.sort(true)}},icon:"sap-icon://down"}));this._oGroupHeaderMenu.addItem(new sap.ui.unified.MenuItem({text:this._oResBundle.getText("TBL_COLLAPSE_LEVEL"),select:function(){t.getBinding("rows").collapseAll(t._iGroupedLevel);t._oSelection.clearSelection();t.updateRows()}}));this._oGroupHeaderMenu.addItem(new sap.ui.unified.MenuItem({text:this._oResBundle.getText("TBL_COLLAPSE_ALL"),select:function(){t.getBinding("rows").collapseAll();t._oSelection.clearSelection();t.updateRows()}}))}var G=g();if(G){var C=G.column;if(C.getShowIfGrouped()){this._oGroupHeaderMenuVisibilityItem.setText(this._oResBundle.getText("TBL_HIDE_COLUMN"))}else{this._oGroupHeaderMenuVisibilityItem.setText(this._oResBundle.getText("TBL_SHOW_COLUMN"))}this._oGroupHeaderMoveUpItem.setEnabled(G.index>0);this._oGroupHeaderMoveDownItem.setEnabled(G.index<this._aGroupedColumns.length-2)}else{this._oGroupHeaderMoveUpItem.setEnabled(true);this._oGroupHeaderMoveDownItem.setEnabled(true)}return this._oGroupHeaderMenu};c.prototype.expand=function(r){var B=this.getBinding("rows");if(B){var C=this.getContextByIndex(r);B.expand(C);this.updateRows()}};c.prototype.collapse=function(r){var B=this.getBinding("rows");if(B){var C=this.getContextByIndex(r);B.collapse(C);this.updateRows()}};c.prototype.isExpanded=function(r){var B=this.getBinding("rows");if(B){var C=this.getContextByIndex(r);return B.isExpanded(C)}return false};c.prototype.selectAll=function(){a.prototype.selectAll.apply(this);var s=this.getSelectionMode();if(!this.getEnableSelectAll()||(s!="Multi"&&s!="MultiToggle")){return this}var B=this.getBinding("rows");if(B){var l=(B.getLength()||0);for(var i=0;i<l;i++){var C=this.getContextInfoByIndex(i);if(C.sum||B.indexHasChildren(i)){this._oSelection.removeSelectionInterval(i,i)}}this.$("selall").attr('title',this._oResBundle.getText("TBL_DESELECT_ALL")).removeClass("sapUiTableSelAll")}return this};c.prototype.getContextInfoByIndex=function(i){var B=this.getBinding("rows");return i>=0&&B?B.getContextInfo(i):null};c.prototype._onColumnMoved=function(e){a.prototype._onColumnMoved.apply(this,arguments);this.updateAnalyticalInfo()};c.prototype.addColumn=function(C,s){var o=this._getColumn(C);if(o.getGrouped()){this._addGroupedColumn(o.getId())}return a.prototype.addColumn.call(this,o,s)};c.prototype.insertColumn=function(C,i,s){var o=this._getColumn(C);if(o.getGrouped()){this._addGroupedColumn(o.getId())}return a.prototype.insertColumn.call(this,o,i,s)};c.prototype.removeColumn=function(C,s){var o=a.prototype.removeColumn.apply(this,arguments);if(o){this._aGroupedColumns=q.grep(this._aGroupedColumns,function(v){return v!=o.getId()})}return o};c.prototype.removeAllColumns=function(s){this._aGroupedColumns=[];return a.prototype.removeColumn.apply(this,arguments)};c.prototype._getColumn=function(C){if(typeof C==="string"){var o=new A({leadingProperty:C,template:C,managed:true});return o}else if(C instanceof A){return C}else{throw new Error("Wrong column type. You need to define a string (property) or pass an AnalyticalColumnObject")}};c.prototype._updateColumns=function(){this._updateTableColumnDetails();this.updateAnalyticalInfo()};c.prototype.updateAnalyticalInfo=function(s){var B=this.getBinding("rows");if(B){var C=this._getColumnInformation();B.updateAnalyticalInfo(C);this._updateTotalRow(C,s);if(s||this._bSupressRefresh){return}this.refreshRows()}};c.prototype._updateTotalRow=function(C,s){var h=false;for(var i=0,l=C?C.length:0;i<l;i++){if(C[i].visible&&C[i].total){h=true;break}}var B=this.getBinding("rows");if(B&&(!B.bProvideGrandTotals||!B.hasTotaledMeasures())){h=false}var f=this.getFixedBottomRowCount();if(h){if(f!==1){this.setProperty("fixedBottomRowCount",1,s)}}else{if(f!==0){this.setProperty("fixedBottomRowCount",0,s)}}};c.prototype._updateTableColumnDetails=function(){var B=this.getBinding("rows"),r=B&&B.getAnalyticalQueryResult();if(r){var C=this.getColumns(),g=[],u=[],d=[],D={},e,f;for(var i=0;i<C.length;i++){e=C[i];e._isLastGroupableLeft=false;e._bLastGroupAndGrouped=false;e._bDependendGrouped=false;if(!e.getVisible()){continue}var l=e.getLeadingProperty();f=r.findDimensionByPropertyName(l);if(f){var h=f.getName();if(!D[h]){D[h]={dimension:f,columns:[e]}}else{D[h].columns.push(e)}if(e.getGrouped()&&q.inArray(h,g)==-1){g.push(h)}if(q.inArray(h,d)==-1){d.push(h)}}}u=q.grep(d,function(s){return(q.inArray(s,g)==-1)});if(g.length>0){q.each(g,function(i,s){q.each(D[s].columns,function(j,o){if(!o.getGrouped()){o._bDependendGrouped=true}})});if(g.length==d.length){f=r.findDimensionByPropertyName(sap.ui.getCore().byId(this._aGroupedColumns[this._aGroupedColumns.length-1]).getLeadingProperty());var G=D[f.getName()].columns;q.each(G,function(i,o){o._bLastGroupAndGrouped=true})}}if(u.length==1){q.each(D[u[0]].columns,function(j,o){o._isLastGroupableLeft=true})}}};c.prototype._getFirstMeasureColumnIndex=function(){var B=this.getBinding("rows"),r=B&&B.getAnalyticalQueryResult(),C=this._getVisibleColumns();if(!r){return-1}for(var i=0;i<C.length;i++){var o=C[i],l=o.getLeadingProperty();if(r.findMeasureByName(l)||r.findMeasureByPropertyName(l)){return i}}};c.prototype.getTotalSize=function(){var B=this.getBinding("rows");if(B){return B.getTotalSize()}return 0};c.prototype._hasData=function(){var B=this.getBinding("rows"),l=B&&(B.getLength()||0),h=B&&(B.hasGrandTotalDisplayed()&&B.hasTotaledMeasures());if(!B||(h&&l<2)||(!h&&l===0)){return false}return true};c.prototype._onPersoApplied=function(){a.prototype._onPersoApplied.apply(this,arguments);this._aGroupedColumns=[];var C=this.getColumns();for(var i=0,l=C.length;i<l;i++){if(C[i].getGrouped()){this._addGroupedColumn(C[i].getId())}}this._updateTableColumnDetails();this.updateAnalyticalInfo()};c.prototype._addGroupedColumn=function(C){if(q.inArray(C,this._aGroupedColumns)<0){this._aGroupedColumns.push(C)}};c.prototype._getSelectableRowCount=function(){var B=this.getBinding("rows");if(B){var C=B.getLength()||0;for(var i=0,l=C;i<l;i++){var o=this.getContextInfoByIndex(i);if(o.sum||B.indexHasChildren(i)){C--}}return C}else{return 0}};return c},true);
