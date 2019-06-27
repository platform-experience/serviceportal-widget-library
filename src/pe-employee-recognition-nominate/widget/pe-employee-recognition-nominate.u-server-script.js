(function() {
	
	data.msgs = {
		success: gs.getMessage("Thank you for nominating."),
		error: gs.getMessage("Something didn't work."),
		no_value: gs.getMessage("No selection was detected."),
		your_selection: gs.getMessage("Your selection"),
		my_candidates: gs.getMessage("My Candidates")
	}
	
	var ucl = new sn_uc.UserCriteriaLoader();
	var currentUserCriteria = ucl.getAllUserCriteria();
	
	var scope_prefix = 'x_snc_empra_';
	var vote_cycle_table = scope_prefix + 'cycle';
	var vote_option_table = scope_prefix + 'candidate';
	var vote_cast_table = scope_prefix + 'vote_cast';
	
	if (input && input.action == 'nominate') {
		data.responses = {};
		var newNomGR = new GlideRecord(vote_option_table);
		newNomGR.initialize();
		newNomGR.user = input.candidate.value;
		newNomGR.name = input.candidate.displayValue;
		newNomGR.voting_cycle = input.voting_cycle.id;
		newNomGR.achievement = input.achievement;
		newNomGR.short_description = 'Nomination: '+input.candidate.displayValue+' for '+input.voting_cycle.name;
		newNomGR.approval = 'requested';
		if (newNomGR.insert())
			data.success = true;
		return;
	}
  
	var cycles = [];
	
	var gr = new GlideRecord(vote_cycle_table);
	gr.addQuery('state','1');
	gr.query();
	
	while (gr.next()) {
		var nominatorCriteriaId = gr.nominator_criteria.toString();
		if ( nominatorCriteriaId && currentUserCriteria.indexOf(nominatorCriteriaId) > -1 ) continue;
			
		var myCandidates = [];
		var myCandidateIds = [];

		var cGR = new GlideRecord(vote_option_table);
		cGR.addQuery('opened_by', gs.getUserID());
		cGR.addQuery('voting_cycle', gr.getUniqueValue());
		cGR.query();
		while( cGR.next() ) {
			myCandidates.push({
				name: cGR.name.toString(),
				user_id: cGR.user.toString(),
				achievement: cGR.achievement.toString(),
				approval: cGR.approval.getDisplayValue()
			});
			myCandidateIds.push(cGR.user.toString());
		}

		var options = [{ displayValue: '— Please Select —' }];
		var uGR = new GlideRecord('sys_user');
		uGR.addQuery('sys_id','!=', gs.getUserID());
		uGR.orderBy('user_name');
		uGR.query();

		while (uGR.next()) {
			if ( myCandidateIds.indexOf(uGR.getUniqueValue()) === -1 ) {
				options.push({
					value: uGR.getUniqueValue(),
					displayValue: uGR.getDisplayValue()
				});
			}
		}

		cycles.push({
			id: gr.getUniqueValue(),
			name: gr.name.toString(),
			question: gr.question.toString(),
			selected: null,
			myCandidates: myCandidates,
			options: options
		});
		
	}
	
	data.cycles = cycles;

})();