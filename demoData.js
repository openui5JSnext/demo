function createDate() {

	return new sap.m.DatePicker("DP1", {
		change : function() {

		}
	});
};

function createActionSelect() {
	return new sap.m.ActionSelect({ // the selected item is not specified, the first one will be selected
		width : "33%",
		items : [ oItem0 = new sap.ui.core.Item({
			key : "0",
			text : "category 0"
		}),

		oItem1 = new sap.ui.core.Item({
			key : "1",
			text : "category 1"
		}),

		oItem2 = new sap.ui.core.Item({
			key : "2",
			text : "category 2"
		}),

		oItem3 = new sap.ui.core.Item({
			key : "3",
			text : "category 3"
		}),

		oItem4 = new sap.ui.core.Item({
			key : "4",
			text : "category 4"
		}),

		oItem5 = new sap.ui.core.Item({
			key : "5",
			text : "category 5"
		}) ],

		buttons : [ oButton0 = new sap.m.Button({
			text : "Add New",
			press : function() {
				//sap.m.MessageToast.show("Action 1 pressed");
			}
		}),

		oButton1 = new sap.m.Button({
			text : "Search",
			press : function() {
				//sap.m.MessageToast.show("Action 2 pressed");
			}
		}) ],

		change : function(oControlEvent) {
			jQuery.sap.log.info("Event fired: 'change' value property to " + oControlEvent.getParameter("selectedItem") + " on " + this);
		}
	});
};

function createObjectHeader() {

	var attrs = [ new sap.m.ObjectAttribute({
		text : "From physical stores"
	}), new sap.m.ObjectAttribute({
		text : "From internet store"
	}) ];

	return oh1 = new sap.m.ObjectHeader("oh1", {
		title : "pPhone total revenue",
		number : "36590,00",
		numberUnit : "Euro",
		numberState : sap.ui.core.ValueState.Success,
		statuses : [ new sap.m.ObjectStatus({
			text : "$26590,00",
			icon : sap.ui.core.IconPool.getIconURI("inbox"),
			state : sap.ui.core.ValueState.Success
		}), new sap.m.ObjectStatus({
			text : "$10000,00",
			icon : sap.ui.core.IconPool.getIconURI("inbox"),
			state : sap.ui.core.ValueState.Success
		}) ],
		attributes : attrs
	});
};

function createSlider() {
	return new sap.m.Slider();

};

function createObjectIdentifier() {
	return new sap.m.ObjectIdentifier({
		title : "Gummib\u00E4" + "r\u00E7" + "he\u00D1nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn",
		text : "Tiny Text",
		badgeNotes : true,
		badgePeople : true,
		badgeAttachments : true,
		visible : true
	});
};

function getGrowingList() {
	var dataGrowingList = {
		navigation : [ {
			title : "Abbas Jung, Mir Suhail",
			description : "i065939",
			num : 1,
			type : sap.m.ListType.Detail,
			press : "Content pressed"
		}, {
			title : "Aleksandrenko, Nikolay",
			description : "I312516",
			num : 2,
			type : sap.m.ListType.Detail,
			press : "Content pressed"
		}, {
			title : "Arnold, Arne",
			description : "d047076",
			num : 3,
			type : sap.m.ListType.Detail,
			press : "Content pressed"
		}, {
			title : "Arora, Neeraj",
			description : "d035244",
			num : 4,
			type : sap.m.ListType.Detail,
			press : "Content pressed"
		}, {
			title : "Ashok, Amita",
			description : "I066358",
			num : 5,
			type : sap.m.ListType.Detail,
			press : "Content pressed"
		}, {
			title : "Atanasov, Todor",
			description : "i043963",
			num : 6,
			type : sap.m.ListType.Detail,
			press : "Content pressed"
		}, {
			title : "Begovska, Petya",
			description : "i047339",
			num : 7,
			type : sap.m.ListType.Detail,
			press : "Content pressed"
		}, {
			title : "Berner, Lars Joern",
			description : "d052076",
			num : 8,
			type : sap.m.ListType.Detail,
			press : "Content pressed"
		}, {
			title : "Budhai, Roy",
			description : "i819267",
			num : 9,
			type : sap.m.ListType.Detail,
			press : "Content pressed"
		} ]
	};

	var oItemTemplate = new sap.m.StandardListItem({
		title : "{test>title}",
		description : "{test>description}",
		icon : sap.ui.core.IconPool.getIconURI("employee"),
		activeIcon : sap.ui.core.IconPool.getIconURI("employee"),
		iconInset : false,
		type : "{test>type}",
		unread : true,
		counter : "{test>num}",
		selected : false
	});

	var oList = new sap.m.List({
		growing : true,
		headerText : "Growing List",
		inset : false,
		footerText : "SAP Employees",
		growingThreshold : 5,
		mode : sap.m.ListMode.Delete,
		growingTriggerText : "More",
		showNoData : true,
		scrollToLoad : false
	});

	var oModel2 = new sap.ui.model.json.JSONModel();

	bindListData(dataGrowingList, oItemTemplate, oList);
	oModel2.setData(dataGrowingList);

	return [ oList ];
}

function bindListData(data, itemTemplate, list) {
	jQuery.sap.require("sap.ui.model.json.JSONModel");
	var oModel = new sap.ui.model.json.JSONModel();
	oModel.setData(data);
	// set the model to the list
	list.setModel(oModel, "test");
	//sap.ui.getCore().setModel(oModel);

	// create a CustomData template, set its key to "answer" and bind its value to the answer data
	var oDataTemplate = new sap.ui.core.CustomData({
		key : "xyz"
	});
	oDataTemplate.bindProperty("value", "press");

	// add the CustomData template to the item template
	itemTemplate.addCustomData(oDataTemplate);

	// bind Aggregation
	list.bindAggregation("items", "test>/navigation", itemTemplate);
}

function createPullToRefresh() {

	function getLastUpdated() {
		return "updated " + new Date().toLocaleTimeString();
	}

	function addItems(list, nItems) {
		var n = list.getItems().length + 1;
		for (var i = 0; i < nItems; i++) {
			list.insertItem(new sap.m.StandardListItem({
				title : "List item " + (n + i),
				type : sap.m.ListType.Active,
				press : function() {
					app.to("detailPage");
				}
			}), 0 // insert new items at the top of the list
			);
		}
	}

	var standardList = new sap.m.List({
		inset : false
	});

	var worstCaseAttrs = new Array();
	worstCaseAttrs.push(new sap.m.ObjectAttribute({
		text : "attribute text 1 attribute text 1",
		tooltip : "Attribute tip"
	}));
	worstCaseAttrs.push(new sap.m.ObjectAttribute({
		text : "attribute text 2 attribute text 1"
	}));
	worstCaseAttrs.push(new sap.m.ObjectAttribute({
		text : "Seven_seven-seven-seven-seven-seven_sevens_even"
	}));

/*---------------ObjectListItem data-----------------*/
/*---------------------------------------------------*/

	var worstCase = new sap.m.ObjectListItem({
		type : "Active",
		intro : "On behalf of John Smith",
		icon : sap.ui.core.IconPool.getIconURI("inbox"),
		title : "orst case item with all fields, large number, agçyfox",
		number : "999999999",
		numberUnit : "Euro",
		numberState : sap.ui.core.ValueState.Success,
		attributes : worstCaseAttrs,
		firstStatus : new sap.m.ObjectStatus({
			text : "Positive agçyfox",
			state : "Success",
			tooltip : "Status tip"
		}),
		secondStatus : new sap.m.ObjectStatus({
			text : "Negative agçyfox",
			state : "Error"
		}),
		showMarkers : true,
		markFlagged : true,
		markFavorite : true
	});
	standardList.addItem(worstCase);

	var longWordTitle = new sap.m.ObjectListItem({
		type : "Active",
		icon : sap.ui.core.IconPool.getIconURI("inbox"),
		title : "123456789012345678901234567890123456789012345678901234567890 This long word should be wrapped to another line",
		number : "999999999",
		numberUnit : "Euro",
		numberState : sap.ui.core.ValueState.Success,
		attributes : [ new sap.m.ObjectAttribute({
			text : "attribute text 1 attribute text 1",
			tooltip : "Attribute tip"
		}) ],
		firstStatus : new sap.m.ObjectStatus({
			text : "Positive agçyfox",
			state : "Success",
			tooltip : "Status tip"
		}),
		showMarkers : true,
		markFlagged : true,
		markFavorite : true
	});
	standardList.addItem(longWordTitle);

	var longWordTitleNoNumber = new sap.m.ObjectListItem({
		type : "Active",
		icon : sap.ui.core.IconPool.getIconURI("inbox"),
		title : "123456789012345678901234567890123456789012345678901234567890 This long word should be wrapped to another line",
		attributes : [ new sap.m.ObjectAttribute({
			text : "attribute text 1 attribute text 1",
			tooltip : "Attribute tip"
		}) ],
		firstStatus : new sap.m.ObjectStatus({
			text : "Positive agçyfox",
			state : "Success",
			tooltip : "Status tip"
		}),
		showMarkers : true,
		markFlagged : true,
		markFavorite : true
	});
	standardList.addItem(longWordTitleNoNumber);

	var longWordTitleOnly = new sap.m.ObjectListItem({
		title : "123456789012345678901234567890123456789012345678901234567890 This long word should be wrapped to another line",
		attributes : [ new sap.m.ObjectAttribute({
			text : "attribute text 1 attribute text 1",
			tooltip : "Attribute tip"
		}) ],
		firstStatus : new sap.m.ObjectStatus({
			text : "Positive agçyfox",
			state : "Success",
			tooltip : "Status tip"
		}),
		showMarkers : true,
		markFlagged : true,
		markFavorite : true
	});
	standardList.addItem(longWordTitleOnly);

	var bestCase = new sap.m.ObjectListItem({
		type : "Active",
		title : "Best case item with minimal fields, medium number",
		number : "3.62449",
		numberState : sap.ui.core.ValueState.Success
	});
	standardList.addItem(bestCase);

	var withImgIcon = new sap.m.ObjectListItem({
		type : "Active",
		intro : "On behalf of John Smith, agçyfox",
		icon : "images/action.png",
		activeIcon : "images/action_pressed.png",
		title : "Using image instead of icon font",
		number : "103",
		numberUnit : "%",
		numberState : sap.ui.core.ValueState.Success
	});
	standardList.addItem(withImgIcon);

	var bestVariation1 = new sap.m.ObjectListItem({
		type : "Active",
		intro : "On behalf of John Smith",
		title : "Best case item with number unit, small number",
		number : "-900,000,000.01",
		numberUnit : "Euro",
		numberState : sap.ui.core.ValueState.Error
	});
	standardList.addItem(bestVariation1);

	var bestVariation2 = new sap.m.ObjectListItem({
		type : "Active",
		intro : "On behalf of John Smith",
		title : "Best case item adding number unit",
		number : "3.6244",
		numberUnit : "Euro",
		numberState : sap.ui.core.ValueState.Error
	});
	standardList.addItem(bestVariation2);

	var bestVariation3Attrs = new Array();
	bestVariation3Attrs.push(new sap.m.ObjectAttribute({
		text : "attribute text 1"
	}));
	bestVariation3Attrs.push(new sap.m.ObjectAttribute({
		text : "attribute text 2"
	}));
	bestVariation3Attrs.push(new sap.m.ObjectAttribute({
		text : "attribute text 3"
	}));
	var bestVariation3 = new sap.m.ObjectListItem({
		type : "Active",
		intro : "On behalf of John Smith",
		title : "Best case item adding attributes aggregation only",
		number : "3.6244",
		numberUnit : "Euro",
		numberState : sap.ui.core.ValueState.Error,
		attributes : bestVariation3Attrs
	});
	standardList.addItem(bestVariation3);

	var bestVariation4 = new sap.m.ObjectListItem({
		type : "Active",
		intro : "On behalf of John Smith",
		title : "Best case item adding first and second status",
		number : "3.6244",
		numberUnit : "Euro",
		numberState : sap.ui.core.ValueState.Success,
		firstStatus : new sap.m.ObjectStatus({
			text : "Status state warning",
			state : "Warning"
		}),
		secondStatus : new sap.m.ObjectStatus({
			text : "Status state none",
			state : "None"
		})
	});
	standardList.addItem(bestVariation4);

/*---------------END ObjectListItem data-------------*/
/*---------------------------------------------------*/

	var pullToRefreshStd = new sap.m.PullToRefresh({
		description : getLastUpdated(),
		refresh : function() {
			setTimeout(function() {
				pullToRefreshStd.hide();
				addItems(standardList, 10);
				pullToRefreshStd.setDescription(getLastUpdated());
			}, 1000);
		}
	});

	var vBox = new sap.m.VBox({});
	vBox.addItem(pullToRefreshStd);
	vBox.addItem(standardList);

	return vBox;

};

function getAddProductDetails() {
	var content = [ createInput(), createInputError(), createInputWarning(), createInputDisabled(),
	//createActionSelect(), 
	createHboxSwitch0(), createHboxSwitch1(), createHboxSwitch2(), createHboxSwitch3(), createHBoxTextArea(), createSlider() ];
	return content;
}

function createSegmentedButton() {

	var Segmented2 = new sap.m.SegmentedButton('SegmentedCnt1', {
		select : function(oEvent) {
			jQuery.sap.log.info('press event segmented: ' + oEvent.getParameter('id'));
		},
		width : '100%'
	});

	Segmented2.createButton('Option1', null, true);
	Segmented2.createButton('Option2', null, true);
	Segmented2.createButton('Option3', null, true);

	return Segmented2;
};

function createInput() {

	return new sap.m.Input({
		value : "Normal Input",
		showValueHelp : true,
		valueHelpRequest : function(evt) {
			alert("Value help requested");
		}
	}).addStyleClass('myInput');
};
function createInputError() {

	return new sap.m.Input({
		valueState : "Error",
		valueStateText : "Error Message!!!!!!!!!",
		placeholder : "Error Input"
	});
};

function createInputWarning() {

	return new sap.m.Input({
		valueState : "Warning",
		valueStateText : "Warning Message!!!!!!!!!",
		placeholder : "Warning Input"
	});
};

function createInputDisabled() {
	return new sap.m.Input({
		value : "Disabled",
		enabled : false
	}).addStyleClass('myInput');
};

function createHboxSwitch0() {
	var oSwitch0 = new sap.m.Switch({
		state : true,
		customTextOn : "Yes",
		customTextOff : "No",
		change : function(oControlEvent) {
			jQuery.sap.log.info("Event fired: 'change' state property to " + oControlEvent.getParameter("state") + " on " + this);
		}
	});
	var label = new sap.m.Label({
		textAlign : "Begin",
		text : 'Unlocked to all operators'
	});
	var hBox = new sap.m.HBox({
		items : [ label, oSwitch0 ]
	});
	return hBox;
};

function createHboxSwitch1() {
	var oSwitch1 = new sap.m.Switch({
		customTextOn : "On",
		customTextOff : "Off",
		change : function(oControlEvent) {
			jQuery.sap.log.info("Event fired: 'change' state property to " + oControlEvent.getParameter("state") + " on " + this);
		}
	});
	var label = new sap.m.Label({
		textAlign : "Begin",
		text : 'International Tracking'
	});
	var hBox = new sap.m.HBox({
		items : [ label, oSwitch1 ]
	});
	return hBox;
};

function createHboxSwitch2() {
	var oSwitch2 = new sap.m.Switch({
		enabled : false,
		customTextOn : "Yes",
		customTextOff : "No",
	});
	var label = new sap.m.Label({
		textAlign : "Begin",
		text : 'Has two sim cards'
	});
	var hBox = new sap.m.HBox({
		items : [ label, oSwitch2 ]
	});
	return hBox;
};

function createHboxSwitch3() {
	var oSwitch5 = new sap.m.Switch({
		state : true,
		type : sap.m.SwitchType.AcceptReject
	});

	var label = new sap.m.Label({
		textAlign : "Begin",
		text : 'Has second camera'
	});
	var hBox = new sap.m.HBox({
		items : [ label, oSwitch5 ]
	});
	return hBox;
};

function createHBoxTextArea() {
	var textArea = new sap.m.TextArea({
		placeholder : "Text area",
		maxLength : 5,
		rows : 2
	})
	var label = new sap.m.Label({
		textAlign : "Begin",
		text : 'Additional Informaton: '
	});

	var hBox = new sap.m.HBox({
		items : [ label, textArea ]
	});

	return hBox;
}
function getPHoneDetailsPage() {
	var phoneDetailsList = new sap.m.List({
		mode : sap.m.ListMode.SingleSelectMaster,
		inset : false,
		showUnread : true,
		items : [ new sap.m.StandardListItem({
			title : "New stores in USA",
			iconInset : false,
			type : "Navigation",
			unread : true,
			counter : 1000,
			selected : false,
		}), new sap.m.StandardListItem({
			title : "New stores in Europe",
			iconInset : false,
			type : "Navigation",
			unread : true,
			counter : 1000,
			selected : false,
		}), new sap.m.StandardListItem({
			title : "New stores in Asia",
			iconInset : false,
			type : "Navigation",
			unread : true,
			counter : 2000,
			selected : false,
		}), new sap.m.InputListItem({
			label : "Label 1",
			type : "Navigation",
			unread : false,
			content : new sap.m.Input({
				type : "Number",
				placeholder : "Number"
			}),
		}), new sap.m.InputListItem({
			label : "Label 2",
			type : "Navigation",
			unread : false,
			content : new sap.m.Input({
				type : "Number",
				placeholder : "Number"
			}),
		}), new sap.m.InputListItem({
			label : "Label 3",
			type : "Navigation",
			unread : false,
			content : new sap.m.Input({
				type : "Number",
				placeholder : "Number"
			}),
		}), new sap.m.InputListItem({
			label : "Label 4",
			type : "Navigation",
			unread : false,
			content : new sap.m.Input({
				type : "Number",
				placeholder : "Number"
			}),
		}), new sap.m.DisplayListItem({
			label : "Work Accidents",
			icon : "sap-icon://e-care",
			iconInset : true,
			type : "Detail",
			unread : true,
			value : "None"
		}), new sap.m.DisplayListItem({
			label : "New hires",
			icon : "sap-icon://e-care",
			iconInset : true,
			type : "Detail",
			unread : true,
			value : "None"
		}) ]
	})
	return controlsDetails1 = [ createObjectHeader(), phoneDetailsList ];
}

function getPGalaxyDetailsPage() {
	var oh2 = new sap.m.ObjectHeader("oh2", {
		title : "Item 3",
		number : "150,00",
		numberUnit : "Euro",
		numberState : sap.ui.core.ValueState.Error,
		statuses : [ new sap.m.ObjectStatus({
			text : "Late Response",
			state : sap.ui.core.ValueState.Error
		}) ]
	});

	return [ oh2 ];
}
function getControlsDetails3() {
	var oh3 = new sap.m.ObjectHeader("oh3", {
		title : "All item sold",
		number : "150 00,00",
		numberUnit : "Euro",
		numberState : sap.ui.core.ValueState.Success,
	});

	return [ oh3, createPullToRefresh() ];
}

/*----------------------------------------RILA------------------*/
function getRilaPageControls() {

	// Object header =========================================================================================

	var itemObjectHeader = new sap.m.ObjectHeader("objectHeader", {
		number : "486.99 - 505.00",
		numberUnit : "USD",
		intro : "RTC One One M7 32GB - Factory Unlocked, US Warranty - Silver (Unlocked)",
		title : "RTC One",
		statuses : [ new sap.m.ObjectStatus({
			text : "Available",
			icon : sap.ui.core.IconPool.getIconURI("iphone"),
			state : sap.ui.core.ValueState.Success
		}) ],
		attributes : [ new sap.m.ObjectAttribute({
			text : "ID: #3256236"
		}) ]
	});

	// Top buttons =========================================================================================

	// dialog + carousel --------------------------------

	var oFirstDialog = new sap.m.Dialog({
		modal : true
	});
	oFirstDialog.setTitle("Images preview dialog");

	//images for first carousel
	var img1 = new sap.m.Image({
		src : "http://veui5infra.dhcp.wdf.sap.corp:8080/sapui5-sdk-dist/test-resources/sap/m/images/demo/nature/desert.jpg",
	}), img2 = new sap.m.Image({
		src : "http://veui5infra.dhcp.wdf.sap.corp:8080/sapui5-sdk-dist/test-resources/sap/m/images/demo/nature/elephant.jpg",
	}), img3 = new sap.m.Image({
		src : "http://veui5infra.dhcp.wdf.sap.corp:8080/sapui5-sdk-dist/test-resources/sap/m/images/demo/nature/fish.jpg",
	}), img4 = new sap.m.Image({
		src : "http://veui5infra.dhcp.wdf.sap.corp:8080/sapui5-sdk-dist/test-resources/sap/m/images/demo/nature/forest.jpg",
	}), img5 = new sap.m.Image({
		src : "http://veui5infra.dhcp.wdf.sap.corp:8080/sapui5-sdk-dist/test-resources/sap/m/images/demo/nature/huntingLeopard.jpg",
	}), img6 = new sap.m.Image({
		src : "http://veui5infra.dhcp.wdf.sap.corp:8080/sapui5-sdk-dist/test-resources/sap/m/images/demo/nature/prairie.jpg",
	});

	var oPictureCarousel = new sap.m.Carousel("picture_carousel", {
		activePage : "myPage1",
		height : "300px",
		width : "600px",
		pages : [ img1, img2, img3, img4, img5, img6 ]
	});

	oFirstDialog.addContent(oPictureCarousel);
	oFirstDialog.addButton(new sap.ui.commons.Button({
		text : "Close Photos",
		press : function() {
			oFirstDialog.close();
		}
	}));

	var modalBtn = new sap.m.Button({
		text : 'Product Photos',
		press : function(oEvent) {
			oFirstDialog.open();
		}
	});

	//busy indicator --------------------------------

	var busyDialog = new sap.m.BusyDialog();

	var busyIndicatorBtn = new sap.m.Button({
		text : 'Refresh Product Data',
		press : function(oEvent) {
			busyDialog.open();

			window.setTimeout(function() {
				busyDialog.close();
			}, 2000);
		}
	});

	//action sheet --------------------------------

	var moreBtn = new sap.m.Button({
		text : 'More',
		press : function(oEvent) {
			oActionSheet.openBy(oEvent.getSource());
		}
	});

	var oActionSheet = new sap.m.ActionSheet({
		placement : sap.m.PlacementType.Bottom,
		showCancelButton : false,
		buttons : [ new sap.m.Button({
			text : "Edit Details"
		}), new sap.m.Button({
			text : "Add/Remove Supplier"
		}), new sap.m.Button({
			text : "Remove Item"
		}) ]
	});

	var subHeaderButtons = new sap.ui.layout.HorizontalLayout('subHeaderButtons', {
		content : [ modalBtn, busyIndicatorBtn, moreBtn ]
	});

	// scroll container ====================================================================================

	var detailsLabel = new sap.m.Label({
		text : "Product Details:"
	});

	var bigContent = new sap.ui.core.HTML(
			{
				content : "<div id='cont1'>The RTC One's full metal body features a slim, solid construction with tapered edges for a satisfying grip, and it's complemented by a brilliant 4.7-inch Full HD 1080p display that resists scratches and reduces glare. It's powered by a 1.7 GHz quad-core processor, and it's packed with 32 GB of storage and 2 GB of RAM for excellent multitasking.<br/><br/> <b>RTC UltraPixel Camera with RTC Zoe: Your Photos Brought to Life</b><br/>The RTC UltraPixel Camera redefines how you capture, relive, and share your most precious moments. With this innovative camera technology, you'll be able to quickly shoot vivid, true-to-life images with a wide range of colors, even in low light conditions -- it lets in 300 percent more light, enabling you to take photos indoors without a flash. And this is accomplished not by increasing the number of megapixels in the camera, but by engineering a more advanced CMOS Sensor, ISP, and optical lens system that captures significantly more light than most 8 or 13 megapixel cameras.<br/><br/>Get Norton Security for One Device for $39.99 (30% off) when you purchase 1 or more select laptops, Android phones, or Android tablets offered by Amazon.com. Add both items to cart, and discount will be reflected at checkout. Here's how (restrictions apply) <br/><br/>Buy Used and Save: Buy a Used RTC One M7 32GB - Factory Unlocked, US Warranty -... and save 65% off the $649.99 list price. Buy with confidence as the condition of this item and its timely delivery are guaranteed under the See all Used offers.</div>"
			});
	var oScroll = new sap.m.ScrollContainer({
		content : [ bigContent ],
		height : "80px",
		width : "100%",
		vertical : true,
		horizontal : false,
		layoutData : new sap.m.FlexItemData({
			growRatio : 1
		})
	});

	// Table ==============================================================================================

	var tableLabel = new sap.m.Label({
		text : "Suppliers:"
	});

	var oTable = new sap.ui.table.Table({
		visibleRowCount : 5
	});

	var oControl = new sap.ui.commons.TextView({
		text : "{supplier}"
	}); // short binding notation
	oTable.addColumn(new sap.ui.table.Column({
		label : new sap.ui.commons.Label({
			text : "Supplier"
		}),
		template : oControl,
		sortProperty : "supplier",
		filterProperty : "supplier",
		width : "140px"
	}));

	var oControl = new sap.ui.commons.TextView({
		text : "{delivery}"
	}); // short binding notation
	oTable.addColumn(new sap.ui.table.Column({
		label : new sap.ui.commons.Label({
			text : "Delivery Time"
		}),
		template : oControl,
		sortProperty : "delivery",
		filterProperty : "delivery"
	}));

	var oControl = new sap.ui.commons.TextView({
		text : "{rating}"
	}); // short binding notation
	oTable.addColumn(new sap.ui.table.Column({
		label : new sap.ui.commons.Label({
			text : "Rating"
		}),
		template : oControl,
		sortProperty : "rating",
		filterProperty : "rating"
	}));

	var oCurrency = new sap.ui.unified.Currency({
		value : "{price}",
		currency : "USD"
	}); // short binding notation
	oTable.addColumn(new sap.ui.table.Column({
		label : new sap.ui.commons.Label({
			text : "Price per item"
		}),
		template : oCurrency,
		sortProperty : "price",
		filterProperty : "price",
		width : "100px"
	}));

	// create some local data =============================================================================
	var aData = [ {
		supplier : "Google",
		delivery : "12 Days",
		rating : "4/5",
		price : 486.99
	}, {
		supplier : "Samsung",
		delivery : "9 Days",
		rating : "2/5",
		price : 505.00
	}, {
		supplier : "HTC",
		delivery : "11 Days",
		rating : "3/5",
		price : 499.99
	}, {
		supplier : "Motorola",
		delivery : "10 Days",
		rating : "3/5",
		price : 489.99
	}, {
		supplier : "LG",
		delivery : "13 Days",
		rating : "3/5",
		price : 490.00
	} ];

	var oModel = new sap.ui.model.json.JSONModel();
	oModel.setData({
		modelData : aData
	});
	oTable.setModel(oModel);
	oTable.bindRows("/modelData");

	// Multi input  =======================================================================================

	var tagsLabel = new sap.m.Label({
		text : "Product tags:"
	});

	var multiInput = new sap.m.MultiInput({
		tokens : [ new sap.m.Token({
			key : "a",
			text : "UltraPixel"
		}), new sap.m.Token({
			key : "b",
			text : "Android "
		}), new sap.m.Token({
			key : "c",
			text : "Unlocked"
		}), new sap.m.Token({
			key : "d",
			text : "Unibody"
		}) ]
	});

	// Radio button group ==================================================================================

	var statusLabel = new sap.m.Label({
		text : "Product Status:"
	});

	var radio1 = new sap.m.RadioButton({
		groupName : "Gruppe4",
		text : 'Not editable',
		selected : true,
		enabled : true,
		editable : true
	})
	var radio2 = new sap.m.RadioButton({
		groupName : "Gruppe4",
		text : 'Not editable',
		selected : true,
		enabled : true,
		editable : true
	})
	var radio3 = new sap.m.RadioButton({
		groupName : "Gruppe4",
		text : 'Not editable',
		selected : true,
		enabled : true,
		editable : false
	})

	var radioGroup = new sap.m.RadioButtonGroup();
	radioGroup.addButton(radio1);
	radioGroup.addButton(radio2);
	radioGroup.addButton(radio3);

	// Buttons  ============================================================================================

	var updateBtn = new sap.m.Button({
		text : 'Update'
	});

	var cancelBtn = new sap.m.Button({
		text : 'Cancel'
	});

	var footerButtons = new sap.ui.layout.HorizontalLayout('footerButtons', {
		content : [ updateBtn, cancelBtn ]
	});

	// Page here  ==========================================================================================

	var controls = [ itemObjectHeader, subHeaderButtons, detailsLabel, oScroll, tableLabel, oTable, tagsLabel, multiInput, statusLabel,
			radioGroup, footerButtons ];

	// Page here  ==========================================================================================

	return controls;
}
