(function() {
	
	if (options.items) {
		
		data.items = options.items;
		
	} else {
		
		data.items = [
			{
				link: 'https://www.servicenow.com',
				title: 'My Friends',
				icon: 'fa fa-users',
				image: ''
			},
			{
				link: 'https://www.apple.com',
				title: 'My Events',
				icon: 'fa fa-calendar',
				image: ''
			},
			{
				link: 'https://www.google.com',
				title: 'My Books',
				icon: 'fa fa-book',
				image: ''
			}
		];
	}
	
	data.mainTitle = options.mainTitle ? options.mainTitle : 'Welcome, Fred!';
	data.mainIcon = options.mainIcon ? options.mainIcon : 'fa fa-bullseye';
	data.mainImage = options.mainImage ? options.mainImage : '';

})();