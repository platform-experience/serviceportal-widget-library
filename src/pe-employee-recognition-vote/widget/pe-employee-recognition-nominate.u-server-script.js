(function() {
 
	var ucl = new sn_uc.UserCriteriaLoader();
	var currentUserCriteria = ucl.getAllUserCriteria();
	
	var scope_prefix = 'x_snc_empra_';
	var vote_cycle_table = scope_prefix + 'cycle';
	var vote_option_table = scope_prefix + 'candidate';
	var vote_cast_table = scope_prefix + 'vote_cast';
	
	if (input && input.action == 'vote') {
		var newVoteGR = new GlideRecord(vote_cast_table);
		newVoteGR.initialize();
		newVoteGR.voter = gs.getUserID();
		newVoteGR.candidate = input.optionId;
		newVoteGR.insert();
		return;
	}
	
	var vote_cycles = [];
	
	var cycleGR = new GlideRecord(vote_cycle_table);
	cycleGR.addQuery('state', '2');
	cycleGR.query();
	while (cycleGR.next()) {
		
		var cycleId = cycleGR.getUniqueValue();
		var alreadyVoted = hasVotedForCycle( gs.getUserID(), cycleId );
		
		var voterCriteriaId = cycleGR.voter_criteria.toString();
		var meetsCriteria = !voterCriteriaId || currentUserCriteria.indexOf(voterCriteriaId) > -1;
		if (meetsCriteria) {
			
			var cycle = {
				name: cycleGR.name.toString(),
				question: cycleGR.question.toString(),
				short_description: cycleGR.short_description.toString(),
				id: cycleId,
				alreadyVoted: alreadyVoted,
				options: []
			};
			
			if (!alreadyVoted) {
				var optGR = new GlideRecord(vote_option_table);
				optGR.addQuery('voting_cycle', cycleId);
				optGR.addQuery('approval', 'approved');
				optGR.query();
				while (optGR.next()){
					cycle.options.push({
						name: optGR.name.toString(),
						user: optGR.user.toString(),
						achievement: optGR.achievement.toString(),
						id: optGR.getUniqueValue()
					});
				}
			}
			
			vote_cycles.push(cycle);
			
		}
		
	}
	
	data.ballots = vote_cycles;
	
	function hasVotedForCycle(userId, cycleId) {
		var optGR = new GlideRecord(vote_cast_table);
		optGR.addQuery('voter', userId);
		optGR.addQuery('candidate.voting_cycle', cycleId);
		optGR.query();
		return optGR.hasNext();
	}

})();