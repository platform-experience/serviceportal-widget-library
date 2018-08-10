var FormModel = Class.create();

FormModel.prototype = {

	initialize: function(parm1, sysId, view, parentRef, parentRefDisplay) {
		
		if (typeof view === 'undefined') {
			
			// Get a new record, using values from record
			
			var childId = parm1;
			
			var gr = new GlideRecord('x_pisn_multiform_child_form');
			gr.get(childId);
			
			this.tableName = gr.getValue('table');
			this.sysId = '-1';
			this.view = gr.getValue('view');
			this.parentRef = gr.getValue('reference_to_parent');
			this.parentRefDisplay = gr.getDisplayValue('reference_to_parent');
			
			
		} else {
			
			// Get an existing record, using values passed in
			
			this.tableName = parm1;
			this.sysId = sysId;
			this.view = view;
			this.parentRef = parentRef;
			this.parentRefDisplay = parentRefDisplay;
		}

	},

	getFormModel: function getFormModel () {

		var form = $sp.getForm(this.tableName, this.sysId, '', this.view);
		
		var gr = new GlideRecord('sys_dictionary');
		gr.addQuery('name', this.tableName);
		gr.addQuery('element', this.parentRef);
		gr.setLimit(1);
		gr.query();
		gr.next();

		form._fields[this.parentRef] = {
			"sys_mandatory": false,
			"visible": false,
			"dbType": 12,
			"label": this.parentRefDisplay,
			"sys_readonly": false,
			"type": "reference",
			"mandatory": false,
			"refTable": gr.getValue('reference'),
			"reference_type": "table",
			"displayValue": "",
			"readonly": false,
			"name": this.parentRef,
			"attributes": {},
			"reference_key": "sys_id",
			"readonlyClickthrough": false,
			"choice": 0,
			"value": "",
			"max_length": 32,
			"ed": {
				"reference": gr.getValue('reference'),
				"name": this.parentRef
			},
			"stagedValue": ""
		};

		form._view.push({
			"name": this.parentRef,
			"type": "field"
		});
		
		return form;

	},

	toJSON: function toJSON() {
		return this.getFormModel();
	},

	type: 'FormModel'
};