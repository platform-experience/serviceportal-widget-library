var MfGrObject = Class.create();

MfGrObject.prototype = {
	
	tableName: false,
	
    initialize: function(sysId) {
		
		// Nasty. Ideally we'd pass in a GlideRecord, then
		// use getLocation() to save the location of the record
		// and restore it with setLocation(). However, neither 
		// of these are available in ScopedGlideRecord (yet?)
		// so this will have to do...
		
		if (!this.tableName) {
			throw "Table name not set";
		}
		
		if (typeof sysId !== 'string' || sysId.length !== 32) {
			throw "Sys ID not provided";
		}
		
		var gr = new GlideRecord(this.tableName);

        if (gr.get(sysId)) {
			
			this._gr = gr;
			
            return true;
			
        } else {
			throw "Record not found!";
		}
		
    },
	
	getSysId: function() {
        return this._gr.getValue('sys_id');
    },

    type: 'MfGrObject'
};