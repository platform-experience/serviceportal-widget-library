var Child = Class.create();

Child.prototype = Object.extendsObject(MfGrObject, {
	
	tableName: 'x_pisn_multiform_child',
	
	getOrder: function getOrder() {
		return parseInt(this._gr.getValue('order'));
	},
	
	getType: function getType() {
		return this.type;
	},
	
	getFlexBasis: function getFlexBasis() {
		return this._gr.getValue('flex_basis');
	},
	
	getFlexGrow: function getFlexGrow() {
		return parseInt(this._gr.getValue('flex_grow'));
	},
	
	getFlexShrink: function getFlexShrink() {
		return parseInt(this._gr.getValue('flex_shrink'));
	},
	
	toJSON: function toJSON() {
		return {
			order: this.getOrder(),
			type: this.getType(),
			sysId: this.getSysId(),
			flexBasis: this.getFlexBasis(),
			flexGrow: this.getFlexGrow(),
			flexShrink: this.getFlexShrink()
		};
	},

    type: 'Child'
	
});