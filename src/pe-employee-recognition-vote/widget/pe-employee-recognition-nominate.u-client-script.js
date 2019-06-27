function voteCtrl($scope) {
	$scope.submit = function(cycleId, optionId, index) {
		
		$scope.server.get({
			action: 'vote',
			cycleId: cycleId,
			optionId: optionId,
			index: index
		}).then(function(r){
			$scope.data.ballots[index].alreadyVoted = true;
		});
	}
	
}