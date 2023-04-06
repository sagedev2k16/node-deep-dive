sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"../model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (Controller, JSONModel, formatter, Filter, FilterOperator) {
	"use strict";
	const serverHost = "http://localhost:8888";

	return Controller.extend("sap.ui.demo.walkthrough.controller.HeroList", {
		formatter: formatter, 
		onInit : async function () {
			let serverResponse = await fetch(`${serverHost}/hero/heroes`);
			let serverResponseJson = await serverResponse.json();
			console.log(serverResponseJson);

			$.ajax({
				url: `${serverHost}/hero/heroes`,
				method: "get",
				success: function(data, status, xhr) {
					console.log(data);
				},
				error: function(xhr, status, error) {
					console.error(error);
				}
			});

			 var heroModel = new JSONModel(serverResponseJson);
			 this.getView().setModel(heroModel, "hero");
		},
		onFilterHeroes : function (oEvent) {
			// build filter array
			var aFilter = [];
			var sQuery = oEvent.getParameter("query");
			if (sQuery) {
				aFilter.push(new Filter("name", FilterOperator.Contains, sQuery));
			}

			// filter binding
			var oList = this.byId("heroList");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
		},

		checkServerConnection : async function () {
			let serverResponse = await fetch(`${serverHost}/test/hello`);
			let serverResponseJson = await serverResponse.json();
			console.log(serverResponseJson);
		},

		getAllUsers: async function() {

		}
	});
});