function ListMenuExpandCollapse($scope,$window,$location) {
  /* widget controller */
  var c = this;
	
	c.go = function(menu){
		switch(menu.type){
			case 'sc':
			case 'kb':
			case 'page':
				$location.url(menu.href);	
				break;
			case 'url':
				$window.open(menu.url,menu.url_target);
				break;
/*				
			case 'sc_category':
				break;
			case 'sc_cat_item':
				break;
			case 'kb_topic':
				break;
			case 'kb_article':
				break;
			case 'kb_category':
				break;
			case 'filtered':
				break;
			case 'scripted':
				break;
*/				
			default:
				console.log(menu);
		}

	};
}
