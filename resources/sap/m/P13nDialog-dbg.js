/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides control sap.m.P13nDialog.
sap.ui.define(['jquery.sap.global', './Dialog', './IconTabBar', './IconTabFilter', './P13nDialogRenderer', './library',
		'sap/ui/core/EnabledPropagator', 'jquery.sap.xml'], function(jQuery, Dialog, IconTabBar, IconTabFilter,
		P13nDialogRenderer, library, EnabledPropagator/* , jQuerySap */) {
	"use strict";

	/**
	 * Constructor for a new P13nDialog.
	 * 
	 * @param {string}
	 *          [sId] id for the new control, generated automatically if no id is given
	 * @param {object}
	 *          [mSettings] initial settings for the new control
	 * 
	 * @class The P13nDialog control provides dialog that contains one or more panels. On each of the panels, one or more
	 *        changes with regards to a table can be processed. For example, a panel to set a column to invisible, change
	 *        the order of the columns or a panel to sort or filter tables.
	 * @extends sap.m.Dialog
	 * @author SAP SE
	 * @version 1.26.1
	 * 
	 * @constructor
	 * @public
	 * @since 1.26
	 * @alias sap.m.P13nDialog
	 * @ui5-metamodel This control/element also will be described in the UI5 (legacy) designtime metamodel
	 */
	var P13nDialog = Dialog.extend("sap.m.P13nDialog", /** @lends sap.m.P13nDialog.prototype */
	{
		metadata : {

			library : "sap.m",
			properties : {
				/**
				 * This property determines whether the 'Reset' button is shown inside the dialog. If this property is set to
				 * true, clicking the 'Reset' button will trigger the 'reset' event sending a notification that model data must
				 * be reset.
				 */
				showReset : {
					type : "boolean",
					group : "Appearance",
					defaultValue : false
				}
			},
			aggregations : {

				/**
				 * The dialog panels displayed in the dialog.
				 */
				panels : {
					type : "sap.m.P13nPanel",
					multiple : true,
					singularName : "panel",
					bindable : "bindable"
				}
			},
			events : {

				/**
				 * Event fired if the 'ok' button in P13nDialog is clicked.
				 */
				ok : {},
				/**
				 * Event fired if the 'cancel' button in P13nDialog is clicked.
				 */
				cancel : {},
				/**
				 * Event fired if the 'reset' button in P13nDialog is clicked.
				 */
				reset : {}
			}
		}
	});

	EnabledPropagator.apply(P13nDialog.prototype, [true]);

	P13nDialog.prototype.init = function(oEvent) {
		this.addStyleClass("sapMP13nDialog");
		Dialog.prototype.init.apply(this, arguments);
		this._oResourceBundle = sap.ui.getCore().getLibraryResourceBundle("sap.m");
		this._initDialog();
	};

	P13nDialog.prototype._initDialog = function() {
		var that = this;
		this.setContentWidth("50rem");
		this.setContentHeight("40rem");
		this.setSubHeader(new sap.m.Bar({
			contentLeft : [new sap.m.SegmentedButton({
				select : function(oEvent) {
					var oButton = oEvent.getParameter("button");
					that._switchPanel(oButton);
				},
				width : '100%'
			})]
		}));
		this.setTitle(this._oResourceBundle.getText("P13NDIALOG_VIEW_SETTINGS"));
		this.addButton(new sap.m.Button({
			text : this._oResourceBundle.getText("P13NDIALOG_OK"),
			press : function() {
				that.fireOk();
			}
		}));
		this.addButton(new sap.m.Button({
			text : this._oResourceBundle.getText("P13NDIALOG_CANCEL"),
			press : function() {
				that.fireCancel();
			}
		}));
		this._oResetButton = new sap.m.Button({
			text : this._oResourceBundle.getText("P13NDIALOG_RESET"),
			visible : this.getShowReset(),
			press : function() {
				that.fireReset({});
			}
		});
		this.addButton(this._oResetButton);
	};

	P13nDialog.prototype.setShowReset = function(bShow) {
		this._oResetButton.setVisible(bShow);
	};

	/*
	 * Adds some DialogItem <code>oDialogItem</code> to the aggregation named <code>DialogItems</code>.
	 * 
	 * @param {sap.m.P13nPanel} oDialogItem The DialogItem to add; if empty, nothing is added. @returns {P13nDialog}
	 * <code>this</code> to allow method chaining. @public @name P13nDialog#addDialogItem @function
	 */
	P13nDialog.prototype.addPanel = function(oPanel) {
		this.addAggregation("panels", oPanel);
		if (this._getSegmentedButton()) {
			var oButton = this._mapPanelToButton(oPanel);
			this._getSegmentedButton().addButton(oButton);
			this._setDialogTitleFor(oPanel, this.getContent().length);
			// TODO: workaround because SegmentedButton does not raise event when we set the "selectedButton"
			var bVisible = false;
			if (this.getContent().length === 1) {
				bVisible = true;
			}
			oPanel.setVisible(bVisible);
			if (bVisible) {
				this.setVerticalScrolling(oPanel.getVerticalScrolling());
			}
			this.getSubHeader().getContentLeft()[0].setVisible(!bVisible);
		}
		return this;
	};

	/*
	 * Inserts an item into the aggregation named <code>items</code>.
	 * 
	 * @param {sap.m.P13nPanel} oItem The item to insert; if empty, nothing is inserted. @param {int} iIndex The
	 * <code>0</code>-based index the item should be inserted at; for a negative value of <code>iIndex</code>, the
	 * item is inserted at position 0; for a value greater than the current size of the aggregation, the item is inserted
	 * at the last position. @returns {P13nDialog} <code>this</code> to allow method chaining. @public @name
	 * P13nDialog#insertItem @function
	 */
	P13nDialog.prototype.insertPanel = function(oPanel, iIndex) {
		this.insertAggregation("panels", oPanel, iIndex);
		if (this._getSegmentedButton()) {
			var oButton = this._mapPanelToButton(oPanel);
			this._getSegmentedButton().insertButton(oButton);
			// TODO: workaround because SegmentedButton does not raise event when we set the "selectedButton"
			var bVisible = false;
			if (this.getContent().length === 1) {
				bVisible = true;
			}
			oPanel.setVisible(bVisible);
			if (bVisible) {
				this.setVerticalScrolling(oPanel.getVerticalScrolling());
			}
		}
		return this;
	};

	/*
	 * Removes an item from the aggregation named <code>items</code>.
	 * 
	 * @param {int | string | sap.m.P13nPanel} vItem The item to remove or its index or id. @returns
	 * {sap.m.P13nPanel} The removed item or null. @public @name P13nDialog#removeItem @function
	 */
	P13nDialog.prototype.removePanel = function(vPanel) {
		vPanel = this.removeAggregation("panels", vPanel);
		if (this._getSegmentedButton()) {
			this._getSegmentedButton().removeButton(vPanel && vPanel.data(P13nDialogRenderer.CSS_CLASS + "Button"));
		}
		return vPanel;
	};

	/*
	 * Removes all the controls in the aggregation named <code>items</code>. Additionally unregisters them from the
	 * hosting UIArea and clears the selection.
	 * 
	 * @returns {sap.m.P13nPanel[]} An array of the removed items (might be empty). @public @name
	 * P13nDialog#removeAllItems @function
	 */
	P13nDialog.prototype.removeAllPanels = function() {
		var aPanels = this.removeAllAggregation("panels");
		if (this._getSegmentedButton()) {
			this._getSegmentedButton().removeAllButtons();
		}
		return aPanels;
	};

	/**
	 * Getter for the control's TabBar.
	 * 
	 * @returns {sap.m.IconTabBar}
	 * @private
	 */
	P13nDialog.prototype._getSegmentedButton = function() {
		return this.getSubHeader().getContentLeft()[0];
	};

	/*
	 * Map an item type of sap.m.P13nPanel to an item type of sap.m.IconTabBarFilter.
	 * 
	 * @param {sap.m.P13nPanel} oItem @returns {sap.m.IconTabFilter | null} @private @name
	 * P13nDialog#_mapItemToTabBarItem @function
	 */
	P13nDialog.prototype._mapPanelToButton = function(oPanel) {
		if (!oPanel) {
			return null;
		}

		var oButton = new sap.m.Button({
			type : sap.m.ButtonType.Default,
			text : oPanel.getBindingPath("title") ? "{" + oPanel.getBindingPath("title") + "}" : oPanel.getTitle()
		});

		oButton.setModel(oPanel.getModel());
		oPanel.data(P13nDialogRenderer.CSS_CLASS + "Button", oButton);

		this.addContent(oPanel);

		return oButton;
	};

	/**
	 * Switch panel.
	 * 
	 * @private
	 */
	P13nDialog.prototype._switchPanel = function(oButton) {
		var oPanel = this._getPanelByButton(oButton);
		this.setVerticalScrolling(oPanel.getVerticalScrolling());
		this.getContent().forEach(function(oPanel_) {
			if (oPanel_ === oPanel) {
				oPanel_.setVisible(true);
			} else {
				oPanel_.setVisible(false);
			}			
		}, this);
		this.invalidate();
		this.rerender();
	};

	/**
	 * Returns panel.
	 * 
	 * @private
	 */
	P13nDialog.prototype._getPanelByButton = function(oButton) {
		for (var i = 0, aPanels = this.getContent(), iPanelsLength = aPanels.length; i < iPanelsLength; i++) {
			if (aPanels[i].data(P13nDialogRenderer.CSS_CLASS + "Button") === oButton) {
				return aPanels[i];
			}
		}
		return null;
	};

	/**
	 * Sets title of dialog in regard to oPanel.
	 * 
	 * @private
	 */
	P13nDialog.prototype._setDialogTitleFor = function(oPanel, iPanelCount) {
		if (iPanelCount > 1) {
			this.setTitle(this._oResourceBundle.getText("P13NDIALOG_VIEW_SETTINGS"));
			return;
		}
		switch (oPanel.getType()) {
			case sap.m.P13nPanelType.filter :
				this.setTitle(this._oResourceBundle.getText("P13NDIALOG_TITLE_FILTER")); // "VALUEHELPDLG_RANGESTITLE"
				break;
			case sap.m.P13nPanelType.sort :
				this.setTitle(this._oResourceBundle.getText("P13NDIALOG_TITLE_SORT"));
				break;
			case sap.m.P13nPanelType.group :
				this.setTitle(this._oResourceBundle.getText("P13NDIALOG_TITLE_GROUP"));
				break;
			case sap.m.P13nPanelType.columns :
				this.setTitle(this._oResourceBundle.getText("P13NDIALOG_TITLE_COLUMNS"));
				break;
			default :
				this.setTitle(this._oResourceBundle.getText("P13NDIALOG_VIEW_SETTINGS"));
		}
	};

	/**
	 * Cleans up before destruction.
	 * 
	 * @private
	 */
	P13nDialog.prototype.exit = function() {
		Dialog.prototype.exit.apply(this, arguments);
		if (this.getSubHeader()) {
			this.getSubHeader().destroy();
		}
	};

	// /* =========================================================== */
	//
	// /* begin: forward aggregation methods to table */
	// /* =========================================================== */
	//
	// /*
	// * Set the model for the internal table AND the current control so that both controls can be used with data binding
	// *
	// * @overwrite @public @param {sap.ui.Model} oModel the model that holds the data for the table @param {string} sName
	// the
	// * optional model name @returns {this} this pointer for chaining @public
	// */
	// sap.m.P13nDialog.prototype._setModel = sap.m.P13nDialog.prototype.setModel;
	// sap.m.P13nDialog.prototype.setModel = function(oModel, sModelName) {
	// var aArgs = Array.prototype.slice.call(arguments);
	// // pass the model to the table and also to the local control to allow binding of own properties
	// this._getSegmentedButton().setModel(oModel, sModelName);
	// sap.m.P13nDialog.prototype._setModel.apply(this, aArgs);
	// return this;
	// };
	//
	// /*
	// * Forwards a function call to a managed object based on the aggregation name. If the name is items, it will be
	// * forwarded to the table, otherwise called locally
	// *
	// * @private @param {string} sFunctionName the name of the function to be called @param {string} sAggregationName the
	// * name of the aggregation asociated @returns {mixed} the return type of the called function
	// */
	// sap.m.P13nDialog.prototype._callMethodInManagedObject = function(sFunctionName, sName) {
	// var aArgs = Array.prototype.slice.call(arguments);
	// if (sName === "panels") {
	// // apply to the internal table
	// aArgs[1] = "buttons";
	// return this._getSegmentedButton()[sFunctionName].apply(this._getSegmentedButton(), aArgs.slice(1));
	// } else {
	// // apply to this control
	// return sap.ui.base.ManagedObject.prototype[sFunctionName].apply(this, aArgs.slice(1));
	// }
	// };
	//
	// /**
	// * Forwards aggregations with the name of items or columns to the internal table.
	// *
	// * @overwrite
	// * @public
	// * @param {string}
	// * sAggregationName the name for the binding
	// * @param {object}
	// * oBindingInfo the configuration parameters for the binding
	// * @returns {this} this pointer for chaining
	// */
	// sap.m.P13nDialog.prototype.bindAggregation = function() {
	// var args = Array.prototype.slice.call(arguments);
	// // propagate the bind aggregation function to list
	// this._callMethodInManagedObject.apply(this, ["bindAggregation"].concat(args));
	// return this;
	// };
	// sap.m.P13nDialog.prototype.validateAggregation = function(sAggregationName, oObject, bMultiple) {
	// return this._callMethodInManagedObject("validateAggregation", sAggregationName, oObject, bMultiple);
	// };
	//
	// sap.m.P13nDialog.prototype.setAggregation = function(sAggregationName, oObject, bSuppressInvalidate) {
	// this._callMethodInManagedObject("setAggregation", sAggregationName, oObject, bSuppressInvalidate);
	// return this;
	// };
	// sap.m.P13nDialog.prototype.getAggregation = function(sAggregationName, oDefaultForCreation) {
	// return this._callMethodInManagedObject("getAggregation", sAggregationName, oDefaultForCreation);
	// };
	//
	// sap.m.P13nDialog.prototype.indexOfAggregation = function(sAggregationName, oObject) {
	// return this._callMethodInManagedObject("indexOfAggregation", sAggregationName, oObject);
	// };
	//
	// sap.m.P13nDialog.prototype.insertAggregation = function(sAggregationName, oObject, iIndex, bSuppressInvalidate) {
	// this._callMethodInManagedObject("insertAggregation", sAggregationName, oObject, iIndex, bSuppressInvalidate);
	// return this;
	// };
	//
	// sap.m.P13nDialog.prototype.addAggregation = function(sAggregationName, oObject, bSuppressInvalidate) {
	// if (sAggregationName === "panels") {
	// this._callMethodInManagedObject("addAggregation", sAggregationName, this._mapPanelToButton(oObject),
	// bSuppressInvalidate);
	// return this;
	// }
	// this._callMethodInManagedObject("addAggregation", sAggregationName, oObject, bSuppressInvalidate);
	// return this;
	// };
	//
	// sap.m.P13nDialog.prototype.removeAggregation = function(sAggregationName, oObject, bSuppressInvalidate) {
	// this._callMethodInManagedObject("removeAggregation", sAggregationName, oObject, bSuppressInvalidate);
	// return this;
	// };
	//
	// sap.m.P13nDialog.prototype.removeAllAggregation = function(sAggregationName, bSuppressInvalidate) {
	// return this._callMethodInManagedObject("removeAllAggregation", sAggregationName, bSuppressInvalidate);
	// };
	//
	// sap.m.P13nDialog.prototype.destroyAggregation = function(sAggregationName, bSuppressInvalidate) {
	// this._callMethodInManagedObject("destroyAggregation", sAggregationName, bSuppressInvalidate);
	// return this;
	// };
	//
	// sap.m.P13nDialog.prototype.getBinding = function(sAggregationName) {
	// return this._callMethodInManagedObject("getBinding", sAggregationName);
	// };
	//
	// sap.m.P13nDialog.prototype.getBindingInfo = function(sAggregationName) {
	// return this._callMethodInManagedObject("getBindingInfo", sAggregationName);
	// };
	//
	// sap.m.P13nDialog.prototype.getBindingPath = function(sAggregationName) {
	// return this._callMethodInManagedObject("getBindingPath", sAggregationName);
	// };
	//
	// sap.m.P13nDialog.prototype.getBindingContext = function(sModelName) {
	// return this._getSegmentedButton().getBindingContext(sModelName);
	// };
	//
	// /*
	// * Set the binding context for the internal table AND the current control so that both controls can be used with the
	// * context
	// *
	// * @overwrite @public @param {sap.ui.model.Context} oContext the new context @param {string} sModelName the optional
	// * model name @returns {this} this pointer for chaining
	// */
	// sap.m.P13nDialog.prototype._setBindingContext = sap.m.P13nDialog.prototype.setBindingContext;
	// sap.m.P13nDialog.prototype.setBindingContext = function(oContext, sModelName) {
	// var args = Array.prototype.slice.call(arguments);
	// // pass the model to the list and also to the local control to allow binding of own properties
	// this._getSegmentedButton().setBindingContext(oContext, sModelName);
	// sap.m.P13nDialog.prototype._setBindingContext.apply(this, args);
	//
	// return this;
	// };
	// /* =========================================================== */
	// /* end: forward aggregation methods to table */
	// /* =========================================================== */

	return P13nDialog;

}, /* bExport= */true);
