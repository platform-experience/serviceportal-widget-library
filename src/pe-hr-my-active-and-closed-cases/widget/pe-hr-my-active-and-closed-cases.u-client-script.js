function() {
	/* widget controller */
	var c = this;

	$(document).ready(function() {
		$(".tab-container .btn").click(function () {
			$(".tab-container .btn").removeClass("btn-active").addClass("btn-inactive");
			$(this).removeClass("btn-inactive").addClass("btn-active");   
		});
	});
}
