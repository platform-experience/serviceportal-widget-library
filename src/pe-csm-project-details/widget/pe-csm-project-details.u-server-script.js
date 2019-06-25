(function() {

	data.caseID = $sp.getParameter('sys_id');
	data.hasProject = caseHasProject(data.caseID);
	
	function caseHasProject(case_id) {
		var gr = new GlideRecord('sn_customerservice_case');
		gr.get('sys_id', case_id);
		
		if(gr.getValue('u_project')){
			data.proj = getProjectData(gr.getValue('u_project'));
			$sp.log(data.proj)
			return true;
		} else return false;
	}
	
	function getProjectData(project_id) {		
		var gr = new GlideRecord('pm_project');
		gr.get('sys_id', project_id);
		
		var start = getDate(gr.getValue('start_date'));
		var end = getDate(gr.getValue('end_date'));
		
		var proj = {
			name: gr.getValue('short_description'),
			start: start,
			end: end,
			state: gr.getDisplayValue('state'),
			status: gr.getDisplayValue('status'),
			percent_complete: gr.getDisplayValue('percent_complete'),
			phase: gr.getDisplayValue('phase'), 
			prj_mngr_val: gr.getValue('project_manager'),
			prj_mngr_img: getImage('d052ea29db66ae00580ed211ce96199e'),//userPhoto(gr.getValue('project_manager')),
			prj_mngr: gr.getDisplayValue('project_manager'),
			prj_mngr_init: getInitials(gr.getDisplayValue('project_manager')),
			risks: getRiskCount(gr.getUniqueValue()),
			issues: getIssueCount(gr.getUniqueValue()),
			actions: getActionCount(gr.getUniqueValue()),
			delayed_tasks: getTaskCount(gr.getUniqueValue()),
			milestone: getMissedMilestone(gr.getUniqueValue())
		};
		
		return proj;
	}
	
	function userPhoto(user_id) {
		if(user_id){
			var gr = new GlideRecord('sys_user');
			gr.get('sys_id', user_id);

			if(gr.getDisplayValue('photo')) {
				return gr.getValue('avatar');
			} else return '';
		} else return '';
	}

	function getInitials(string) {
		if(string){
			var names = string.split(' '),
					initials = names[0].substring(0, 1).toUpperCase();

			if (names.length > 1) {
				initials += names[names.length - 1].substring(0, 1).toUpperCase();
			}
			return initials;
		} else return '';
	}
	
	function getRiskCount(project_id){
		var gr = new GlideRecord('risk');
		gr.addQuery('task', project_id);
		gr.query();
		return gr.getRowCount();
	}
	
	function getIssueCount(project_id){
		var gr = new GlideRecord('issue');
		gr.addQuery('parent', project_id);
		gr.query();
		return gr.getRowCount();
	}
	
	function getActionCount(project_id){
		var gr = new GlideRecord('project_action');
		gr.addQuery('parent', project_id);
		gr.query();
		return gr.getRowCount();
	}
	
	function getTaskCount(project_id){
		var gr = new GlideRecord('pm_project_task');
		gr.addEncodedQuery('top_task=' + project_id + '^start_date<' + getToday());
		gr.query();
		return gr.getRowCount();
	}
	
	function getMissedMilestone(project_id){
		var milestone = {};
		
		var gr = new GlideRecord('pm_project_task');
		gr.addEncodedQuery('top_task=' + project_id + '^start_date<' + getToday() + '^milestone=true');
		gr.query();

		if(gr.hasNext()) {
			gr.next();

			milestone = {
				name: gr.getValue('short_description'),
				date: getDate(gr.getValue('start_date')).toString()
			};
		}

		return milestone;
	}
	
	function getToday(){
		var gdt = new GlideDateTime();
		return gdt.getDisplayValue();
	}
	
	function getDate(date_time) {
		var gdt = new GlideDateTime();
		gdt.setValue(date_time);
		var ans = gdt.getDate().toString();
		return ans;
	}

	function getImage(table_id){
		var gr = new GlideRecord('sys_attachment');
		gr.get('table_sys_id', table_id);
		return gr.getUniqueValue();	 									 
	}
	
})();