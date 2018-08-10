var ChildForm = Class.create();

ChildForm.prototype = Object.extendsObject(Child, {

	tableName: 'x_pisn_multiform_child_form',

	getTitle: function getTitle () {
		return this._gr.getValue('title');
	},

	getDescription: function getDescription () {
		return this._gr.getValue('description');
	},

	getTableName: function getTableName () {
		return this._gr.getValue('table');
	},

	getParentTable: function getParentTable() {
		var parent = this._gr.parent.getRefRecord();
		return parent.getValue('table');
	},

	getReferenceToParent: function getReferenceToParent() {
		return this._gr.getValue('reference_to_parent');
	},

	getReferenceToParentDisplay: function getReferenceToParentDisplay () {
		return this._gr.getDisplayValue('reference_to_parent');
	},

	getView: function getView () {
		return this._gr.getValue('view');
	},
	
	getMinChildRecords: function getMinChildRecords () {
		return parseInt(this._gr.getValue('min_child_records'));
	},
	
	getMaxChildRecords: function getMaxChildRecords () {
		return parseInt(this._gr.getValue('max_child_records'));
	},

	getChildFormModels: function getChildFormModel () {

		var formModels = [];
		var sysId = $sp.getParameter('sys_id');

		if (sysId) {

			var gr = new GlideRecord(this.getTableName());
			gr.addQuery(this.getReferenceToParent(), sysId);
			gr.query();

			while (gr.next()) {

				var fm = new FormModel(this.getTableName(),
									   gr.getUniqueValue(),
									   this.getView(),
									   this.getReferenceToParent(),
									   this.getReferenceToParentDisplay());

				formModels.push(fm);
			}
		}
		
		var diff = this.getMinChildRecords() - formModels.length;
		
		for (i = 0; i < diff; i++) {
			formModels.push(new FormModel(this.getTableName(),
										  '-1',
										  this.getView(),
										  this.getReferenceToParent(),
										  this.getReferenceToParentDisplay()));
		}

		return formModels;
	},

	toJSON: function toJSON () {

		var parentJSON = Child.prototype.toJSON.call(this);

		var json = {
			title: this.getTitle(),
			description: this.getDescription(),
			tableName: this.getTableName(),
			referenceToParent: this.getReferenceToParent(),
			formModels: this.getChildFormModels(),
			parentTable: this.getParentTable(),
			minChildRecords: this.getMinChildRecords(),
			maxChildRecords: this.getMaxChildRecords()
		};

		Object.keys(parentJSON).forEach(function(key) { json[key] = parentJSON[key]; });

		return json;

	},

	type: 'ChildForm'
});