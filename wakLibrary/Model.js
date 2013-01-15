
guidedModel =// @startlock
{
	Document_Price :
	{
		methods :
		{// @endlock
			newDocumentPrice:function(idDocumentFormat, idLanguage, idCurrency)
			{// @lock
				var documentFormat = ds.Document_Format.find("ID = " + idDocumentFormat),
					language = ds.Language.find("ID = " + idLanguage),
					currency = ds.Currency.find("ID = " + idCurrency),
					documentPrice = new ds.Document_Price({
						documentFormat : documentFormat,
						language: language, 
						currency: currency
					})
				;
				documentPrice.save();
				ds.Document_Price(documentPrice.ID);
				return documentPrice.ID;
			}// @startlock
		}
	},
	Document_Format :
	{
		methods :
		{// @endlock
			newDocumentFormat:function(idFormat, idDocument)
			{// @lock
				var format = ds.Format.find("ID = " + idFormat),
					doc = ds.Document.find("ID = " + idDocument),
					documentFormat = new ds.Document_Format({format: format, document: doc});
				;
				documentFormat.save();
				ds.Document_Format(documentFormat.ID);
				return documentFormat.ID;
			}// @startlock
		}
	},
	Document :
	{
		rating :
		{
			onSet:function(value)
			{// @endlock
				// Add your code here
			}// @startlock
		},
		entityMethods :
		{// @endlock
			saveRelations:function(publisherId, authors, keywords)
			{// @lock
				var publisher = ds.Publisher.find("ID = " + publisherId);
				this.publisher = publisher;
				this.save();
				// formats, languages, doivent être faits dans un autre temps
				authors.forEach(function(idAuthor){
					var author = ds.Author.find("ID = " + idAuthor);
					var docAuthor = new ds.Document_Author({
						document: this,
						author: author
					});
					docAuthor.save();
				}, this);
				
				keywords.forEach(function(idKeyword){
					var keyword = ds.Keyword.find("ID = " + idKeyword);
					var docKeyword = new ds.Document_Keyword({
						document: this,
						keyword: keyword
					});
					docKeyword.save();
				}, this);
			}// @startlock
		}
	}
};// @endlock
