function DebitDetailsCtrl(spUtil, $window, $timeout) {
	var c = this;
	
	c.routing = c.data.routing ? c.data.routing : '';
	c.account = c.data.account ? c.data.account : '';
	c.bank = c.data.bank ? c.data.bank : '';
	
	toMain();

	c.toConfirm = toConfirm;
	c.toMain = toMain;
	c.submit = submit;

	function submit() {
		c.server.get({
			action: 'submit',
			bank: c.bank,
			routing: c.routing,
			account: c.account
		}).then(function (response) {
			spUtil.addInfoMessage('Details submitted!');
			
			$timeout(function() {
				$window.location.reload();
			}, 2000);
		})
	}
	
	function toMain() {
		c.view = 'pe-foexp-debit-details-main.html';
		c.showBack = false;
	}
	
	function toConfirm() {
		if (!c.bank || !c.routing || !c.account) {
			spUtil.addErrorMessage("You haven't completed the form correctly. Please ensure all fields are completed.")
			return;
		}
		
		c.view = 'pe-foexp-debit-details-confirm.html';
		c.showBack = true;
	}
}