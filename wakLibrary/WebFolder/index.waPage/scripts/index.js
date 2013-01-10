
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
		
		// then a price
		
	};// @lock

	var getSelections = function(selection, selectionSource){
		var container = [];
		selection.forEach(function(position){
			sources[selectionSource].getElement(position, {sync: true, onSuccess: function(event){
				container.push({ID: event.element.ID});	
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
		sources.document.publisher = sources.publisher.query("ID = :1", $$("publisherCombo").getValue(), {
			onSuccess: function(event){
				var publisher = event.element;
				sources.document.publisher = publisher;
				sources.document.save({
					onSuccess: function(event){
						var doc = event.result;
						// then we save the relationships
						var authors = getSelections($$("docAuthorsGrid").getSelectedRows(), sources.author),
							keywords = getSelections($$("docKeywordsGrid").getSelectedRows(), sources.keyword)
						;
						
						// setPublisher
						// addFormat
						// addLanguage
						// addAuthor
						// addKeyword
						doc.saveRelations({
							onSuccess: function(event){
								sources.document.serverRefresh();
							}
						}, authors, keywords);
					},
					onError: function(event){
					}
				});
			}		
		});
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("addFormatAndPrice", "click", addFormatAndPrice.click, "WAF");
	WAF.addListener("documentTab", "click", documentTab.click, "WAF");
	WAF.addListener("saveDocument", "click", saveDocument.click, "WAF");
// @endregion
};// @endlock
