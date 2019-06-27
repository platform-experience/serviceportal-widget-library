function($scope) {
	
	$scope.responses = {
		success: {
			icon: 'check',
			context: 'primary',
			message: $scope.data.msgs.success
		},
		error: {
			icon: 'exclamation',
			context: 'danger',
			message: $scope.data.msgs.error
		}
	};
	
	$scope.submit = function(cycle, index) {
		if (!cycle.selected.value) {
			cycle.status = 'error';
			cycle.message = $scope.data.msgs.no_value;
		} else {
			$scope.server.get({
				action: 'nominate',
				candidate: cycle.selected,
				achievement: cycle.achievement,
				voting_cycle: {
					id: cycle.id,
					name: cycle.name
				}
			}).then(function(r){
				if (r.data.success) {
					cycle.status = 'success';
					cycle.message = $scope.data.msgs.your_selection + ': ' + cycle.selected.displayValue;
					cycle.options.splice( cycle.options.indexOf(cycle.selected), 1 );
					cycle.myCandidates.push({
						name: cycle.selected.displayValue,
						user_id: cycle.selected.value,
						achievement: cycle.achievement,
						approval: 'Requested'
					});
					cycle.selected = cycle.options[0];
					cycle.achievement = '';
				}
			});
		}
	}
}