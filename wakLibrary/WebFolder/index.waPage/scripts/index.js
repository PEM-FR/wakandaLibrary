
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var addFormatAndPrice = {};	// @button
	var documentTab = {};	// @menuItem
	var saveDocument = {};	// @button
// @endregion// @endlock

// eventHandlers// @lock

	addFormatAndPrice.click = function addFormatAndPrice_click (event)// @startlock
	{// @endlock
		// Create a format first
		var idFormat = sources.format.ID,
			idDocument = sources.document.ID
		;
		sources.document_Format.newDocumentFormat({onSuccess: function(event){
			console.log("event: ", event);
			sources.document_Format.serverRefresh({forceReload: true});
			sources.document_Format.autoDispatch();
			var idLanguage = sources.language.ID,
				idCurrency = sources.currency.ID,
				idDocumentFormat = event.result
			;
			sources.document_Price.newDocumentPrice({
				onSuccess: function(rez){
					sources.document_Format.serverRefresh({forceReload: true});
					sources.document_Format.autoDispatch();
					sources.document.serverRefresh({forceReload: true});
					sources.document.autoDispatch();
				},
				onError: function(someError){
					console.log("an error occured : ", someError);
				}
			}, idDocumentFormat, idLanguage, idCurrency);
		}}, idFormat, idDocument);
	};// @lock

	var getSelections = function(selection, selectionSource){
		var container = [];
		selection.forEach(function(position){
			selectionSource.getElement(position, {sync: true, onSuccess: function(event){
				container.push(event.element.ID);
			}});
		});
		return container;
	};

	documentTab.click = function documentTab_click (event)// @startlock
	{// @endlock
		// first we create our document
		sources.document.addNewElement();
	};// @lock

	saveDocument.click = function saveDocument_click (event)// @startlock
	{// @endlock
		// setPublisher
		console.log("sources.publisher.getCurrentElement() : ", sources.publisher.getCurrentElement());
		sources.document.save({
			onSuccess: function(event){
				sources.document.serverRefresh();
				console.log("event onSave of doc: ", event);
				// then we save the relationships
				var publisher = sources.publisher.ID,
					authors = getSelections($$("docAuthorsGrid").getSelectedRows(), sources.author),
					keywords = getSelections($$("docKeywordsGrid").getSelectedRows(), sources.keyword)
				;
				// addFormat
				// addLanguage
				// addAuthor
				// addKeyword
				sources.document.getCurrentElement().saveRelations({
					onSuccess: function(event){
						sources.document.serverRefresh();
					}
				}, publisher, authors, keywords);
			},
			onError: function(event){
			}
		});
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("addFormatAndPrice", "click", addFormatAndPrice.click, "WAF");
	WAF.addListener("documentTab", "click", documentTab.click, "WAF");
	WAF.addListener("saveDocument", "click", saveDocument.click, "WAF");
// @endregion
};// @endlock
