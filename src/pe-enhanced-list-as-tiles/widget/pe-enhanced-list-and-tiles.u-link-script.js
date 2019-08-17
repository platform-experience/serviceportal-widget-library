function link(scope,el,attrs,ctrl){

	scope.$on('suppressHeader', function(action,data){

		var iframe = document.getElementById(data).contentDocument;
		var nav;

		var wait = setInterval(function(){
			nav = iframe.getElementsByTagName('nav')[0];	
			if(nav!=undefined){
				try{
					nav.style.display = 'none';
				}catch(e){
					console.log(e);
				}
				clearInterval(wait);
			}
		});

	});
}