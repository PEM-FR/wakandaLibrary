
guidedModel =// @startlock
{
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
			saveRelations:function(publisher, authors, keywords)
			{// @lock
				// formats, languages, doivent être faits dans un autre temps
				
				this.publisher = ds.Publisher.find("ID = " + publisher);
				authors.forEach(function(idAuthor){
					var author = ds.Author.find("ID = " + idAuthor);
					var docAuthor = new ds.Document_Author({
						document: this,
						author: author
					});
					docAuthor.save();
				}, this);
				// refresh of the current document's data
				this = ds.Document(this.ID);
				
				keywords.forEach(function(idKeyword){
					var keyword = ds.Keyword.find("ID = " + idKeyword);
					var docKeyword = new ds.Document_Keyword({
						document: this,
						keyword: keyword
					});
					docKeyword.save();
				}, this);
				// refresh of the current document's data
				this = ds.Document(this.ID);
			}// @startlock
		}
	}
};// @endlock
