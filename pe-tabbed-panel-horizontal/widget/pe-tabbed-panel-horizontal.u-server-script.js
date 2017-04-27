(function() {
  /* populate the 'data' object */
  /* e.g., data.table = $sp.getValue('table'); */

	/* Used to set the Tab's name property */
	var tabLabel = ["SPEND","PROJECTS","SERVICE QUALITY"];
	/* 
		Use Widget Schema options to set Frame Title and SubTitle
		OR hard code Title and SubTitle below.
	*/
	
	data.frame = {
		title: options.frame_title,
		subtitle: options.frame_sub_title
	}
	
	/* ITBM Demo Data - Comment out or Remove to use structure above */
	data.frame = {
		title: "Business Unit Performance",
		subtitle: "1 BU at risk"
	}
		
	/*
		Card's Tabs can have a different label by setting the 'name' property for the respective tab.
		Status values (1,2,3) of Cards and Tabs control colors red,orange,green [repectively] of Card's left borders and Tab's circles
	*/
	data.cards = [{
		name: "Human Resources",
		status: 1,
		tabs:[{
			name: tabLabel[0],
			status: 1
		},{
			name: tabLabel[1],
			status: 3
		},{
			name: tabLabel[2],
			status: 3
		}]
	},{
		name: "Marketing",
		status: 3,
		tabs:[{
			name: tabLabel[0],
			status: 3
		},{
			name: tabLabel[1],
			status: 3
		},{
			name: tabLabel[2],
			status: 3
		}]
	}]
	
	
	
})();