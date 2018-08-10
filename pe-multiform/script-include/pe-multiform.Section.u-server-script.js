var Section = Class.create();

Section.prototype = {
	
    initialize: function(mfSysId, formSectionId) {
		this._isGlobal = typeof formSectionId === 'undefined';
		
		this._mfSysId = mfSysId;
		this._formSectionId = formSectionId;
    },

	toJSON: function toJSON () {
		
		var top = new Location(this._mfSysId, 'top', this._formSectionId);
		var bottom = new Location(this._mfSysId, 'bottom', this._formSectionId);
		var left = new Location(this._mfSysId, 'left', this._formSectionId);
		var right = new Location(this._mfSysId, 'right', this._formSectionId);
		
		var r = {};
		
		if (top.length > 0) {
			r.top = top;
		}
		
		if (bottom.length > 0) {
			r.bottom = bottom;
		}
		
		if (left.length > 0) {
			r.left = left;
		}
		
		if (right.length > 0) {
			r.right = right;
		}
		
		return r;
	},

    type: 'Section'
};