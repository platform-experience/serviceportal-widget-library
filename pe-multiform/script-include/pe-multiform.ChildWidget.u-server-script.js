var ChildWidget = Class.create();

ChildWidget.prototype = Object.extendsObject(Child, {
	
	tableName: 'x_pisn_multiform_child_widget',
	
	toJSON: function toJSON () {
		
		var parentJSON = Child.prototype.toJSON.call(this);
		
		var json = {
			widget: $sp.getWidget(this._gr.getValue('widget'), this._gr.getValue('widget_options'))
		};
		
		Object.keys(parentJSON).forEach(function(key) { json[key] = parentJSON[key]; });
		
		return json;
		
	},

    type: 'ChildWidget'
});