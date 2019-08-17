function link(scope,el,attrs,ctrl){
	var $timeout = $injector.get("$timeout");
	
	$timeout(function(){

		var colEl = angular.element(el.find('.lmec-toc').parent().parent().parent());

		scope.lmecEl = {
			toggles : el.find('.link-toggle'),
			header : angular.element(el.find('.lmec-header')),
			title : angular.element(el.find('.lmec-title-text')),
			body : angular.element(el.find('.lmec-body')),
			toc : el.find('.lmec-toc'),
			col : colEl,
			colClass : colEl.prop('classList')[0]
		};

		scope.lmecEl.toggles.bind('click', function($event){

			angular.forEach(scope.lmecEl.toggles, function(value,key){
				angular.element(value).toggleClass('active');
			});

			scope.lmecEl.title.toggleClass('active');
			scope.lmecEl.body.toggleClass('active');
			scope.lmecEl.header.toggleClass('shrink');

			scope.lmecEl.col.toggleClass(scope.lmecEl.colClass).toggleClass('col-md-1');

		});
	});

}