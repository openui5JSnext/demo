/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/library','sap/ui/commons/library'],function(q){"use strict";sap.ui.getCore().initLibrary({name:"sap.ui.ux3",version:"1.26.1",dependencies:["sap.ui.core","sap.ui.commons"],types:["sap.ui.ux3.ActionBarSocialActions","sap.ui.ux3.ExactOrder","sap.ui.ux3.FeederType","sap.ui.ux3.FollowActionState","sap.ui.ux3.NotificationBarStatus","sap.ui.ux3.ShellDesignType","sap.ui.ux3.ShellHeaderType","sap.ui.ux3.ThingViewerHeaderType","sap.ui.ux3.VisibleItemCountMode"],interfaces:["sap.ui.ux3.DataSetView"],controls:["sap.ui.ux3.ActionBar","sap.ui.ux3.CollectionInspector","sap.ui.ux3.DataSet","sap.ui.ux3.DataSetSimpleView","sap.ui.ux3.Exact","sap.ui.ux3.ExactArea","sap.ui.ux3.ExactBrowser","sap.ui.ux3.ExactList","sap.ui.ux3.FacetFilter","sap.ui.ux3.FacetFilterList","sap.ui.ux3.Feed","sap.ui.ux3.FeedChunk","sap.ui.ux3.Feeder","sap.ui.ux3.NavigationBar","sap.ui.ux3.NotificationBar","sap.ui.ux3.Overlay","sap.ui.ux3.OverlayContainer","sap.ui.ux3.OverlayDialog","sap.ui.ux3.QuickView","sap.ui.ux3.Shell","sap.ui.ux3.ThingInspector","sap.ui.ux3.ThingViewer","sap.ui.ux3.ToolPopup"],elements:["sap.ui.ux3.Collection","sap.ui.ux3.DataSetItem","sap.ui.ux3.ExactAttribute","sap.ui.ux3.NavigationItem","sap.ui.ux3.Notifier","sap.ui.ux3.ThingAction","sap.ui.ux3.ThingGroup"]});sap.ui.ux3.ActionBarSocialActions={Update:"Update",Follow:"Follow",Flag:"Flag",Favorite:"Favorite",Open:"Open"};sap.ui.ux3.ExactOrder={Select:"Select",Fixed:"Fixed"};sap.ui.ux3.FeederType={Large:"Large",Medium:"Medium",Comment:"Comment"};sap.ui.ux3.FollowActionState={Follow:"Follow",Hold:"Hold",Default:"Default"};sap.ui.ux3.NotificationBarStatus={Default:"Default",Min:"Min",Max:"Max",None:"None"};sap.ui.ux3.ShellDesignType={Standard:"Standard",Light:"Light",Crystal:"Crystal"};sap.ui.ux3.ShellHeaderType={Standard:"Standard",BrandOnly:"BrandOnly",NoNavigation:"NoNavigation",SlimNavigation:"SlimNavigation"};sap.ui.ux3.ThingViewerHeaderType={Standard:"Standard",Horizontal:"Horizontal"};sap.ui.ux3.VisibleItemCountMode={Fixed:"Fixed",Auto:"Auto"};return sap.ui.ux3},false);
