var MFReferenceHelper = Class.create();
MFReferenceHelper.prototype = {
    initialize: function() {
    },
	
	relatedFormSections: function () {
		
		var q = '';
		
		/*if (parent.table) {
			q = 'name=' + parent.table;
		}
		
		if (parent.view) {
			if (q !== '') {
				q = q + '^';
			}
			
			q = q + 'view=' + parent.view;
		}*/

		return q;
	},

    type: 'MFReferenceHelper'
};