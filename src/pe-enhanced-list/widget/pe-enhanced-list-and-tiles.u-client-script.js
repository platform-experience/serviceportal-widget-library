function EnhancedList($scope,$location) {
  /* widget controller */
  var c = this;

	//Let's simplify the dataset in order to minimize the Angular coding in the HTML
	c.table = c.data.instance_table;
	
	//Some initilization
	c.$onInit = function(){
		c.currentPage = c.selectedItem = 1;
		c.itemsPerPage = c.table.viewby;
	};
	
	//What to do if the View All in the panel header is clicked
	$scope.headerMenu = function(){
			$location.url('?id='+ c.table.list_page + '&t=' + c.table.name);
	};
	
	//Return the proper date/time format
	$scope.getFormat = function(val,type){
		var d = moment(val);
		switch(type){
			case '1':
				return d.format('MM/DD/YYYY');
			case '2':
				return d.format('hh:mm:ss');
			case '3':
				return d.format('MM/DD/YYYY hh:mm:ss');
			default:
				return val;
		}
	};
	//What to do if an item's submenu choice is clicked
	$scope.itemMenu = function(item,choice,cat_item){
		if(choice=='view'){
			$scope.goItem(item);
		}
		if(choice=='sc'){
			if($scope.options.sc_item_id){
				cat_item = cat_item + '&item_sysid=' + item;
			}
			$location.url('?id=sc_cat_item&sys_id=' + cat_item);
		}
	};
	
	//What to do if the item is clicked
	$scope.goItem = function(item){
		var location = '?id='+ c.table.detail_page;
		//Add the item sys_id
		location += '&sys_id=' + item.sys_id.value;
		//Add the table
		location += '&t=' + c.table.name;
		//Add the view
		location += '&v=' + c.table.detail_view;
		$location.url( location );
	};
	
	//Function to determine the width of the widget and what to do about it
	$scope.ifWidth = function(size){
		var rtn = false;
		var el = angular.element(document.getElementById('x' + $scope.widget.rectangle_id));
		var width = parseInt(el[0].clientWidth);
		switch(size){
			case 'xs'	:
				rtn = (width <= 420);
				break;
			case 'sm' :
				rtn = ((width > 420) && (width <= 768));
				break;
			case 'md' :
				rtn = ((width > 768) && (width <= 1024));
				break;
			case 'lg' :
				rtn = (width > 1024);
				break;				
			default: 
				rtn = false;
		}
	
		return rtn;
	};
	
	//Function to set the currently being view pagination page
	$scope.setPage = function() {
		c.currentPage = c.selectedItem;
	};
	
	//Function to control the page being viewed when the left/right pagination arrows are clicked
	$scope.setPageNext = function(inc) {
		c.currentPage = c.currentPage + inc;
		if((c.currentPage<1) || (c.currentPage>c.table.pages.length)){
			c.currentPage = 1;
		}
		c.selectedItem = c.currentPage;
	};
	
	
}