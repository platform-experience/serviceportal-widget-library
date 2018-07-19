var Location = Class.create();

Location.prototype = {
	
    initialize: function(mfSysId, locationName, formSectionId) {
		
		this._isGlobal = typeof formSectionId === 'undefined';
		
		this._mfSysId = mfSysId;
		this._formSectionId = formSectionId;
		this._locationName = locationName;
		
		this.setLength();
    },
	
	getChildGr: function getChildGr () {
		var gr = new GlideRecord('x_pisn_multiform_child');
		
		if (!this._isGlobal) {
			gr.addQuery('form_section', this._formSectionId);
		}
		
		gr.addQuery('apply_to', this._isGlobal ? 'entire_form' : 'single_section');
		gr.addQuery('parent', this._mfSysId);
		gr.addQuery('location', this._locationName);
		gr.addActiveQuery();
		gr.query();
		
		return gr;
	},
	
	setLength: function setLength () {
		var gr = this.getChildGr();
		this.length = gr.getRowCount();
	},
	
	getChildren: function getChildren () {
		
		var gr = this.getChildGr();
		
		var children = [];
		
		while (gr.next()) {
			var sId = gr.getUniqueValue();
			children.push(gr.getValue('sys_class_name') === 'x_pisn_multiform_child_form' ? new ChildForm(sId) : new ChildWidget(sId));
		}
		
		return children;
	},
	
	toJSON: function () {
		return this.getChildren();
	},

    type: 'Location'
};