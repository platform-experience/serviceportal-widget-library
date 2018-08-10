var Multiform = Class.create();

Multiform.prototype = Object.extendsObject(MfGrObject, {
	
	tableName: 'x_pisn_multiform_sp_instance',
	
	getGlobal: function getGlobal() {
		return new Section(this.getSysId());
	},
	
	getSections: function getSections() {
		
		var gr = new GlideRecord('sys_ui_section');
		gr.addQuery('view', this._gr.getValue('view'));
		gr.addQuery('name', this._gr.getValue('table'));
		gr.query();
		
		var sections = {};
		
		while (gr.next()) {
			sections[gr.getUniqueValue()] = new Section(this.getSysId(), gr.getUniqueValue());
		}
		
		return sections;
		
	},
	
	
	toJSON: function toJSON () {
		return {
			global: this.getGlobal(),
			sections: this.getSections()
		};
	},

    type: 'Multiform'
});