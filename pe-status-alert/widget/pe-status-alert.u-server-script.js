(function() {
  /* populate the 'data' object */
  /* e.g., data.table = $sp.getValue('table'); */

  var serverOptions = input.options ? input.options : (input.parameters ? input.parameters : {});
	options.incident = options.incident || serverOptions.incident || 'd71f7935c0a8016700802b64c67c11c6';
	options.probability = options.probability || serverOptions.probability || 67;
	options.outage_eta = options.outage_eta || serverOptions.outage_eta;


	if (options.incident){
		var incidentGR = new GlideRecord('incident');
		if (incidentGR.get(options.incident)) {
			var inc = {};
      inc.short_description = incidentGR.short_description.toString();
      inc.number = incidentGR.number.toString();
      inc.opened_at = incidentGR.opened_at.toString();
      inc.closed_at = incidentGR.closed_at.toString();
      inc.resolved_at = incidentGR.resolved_at.toString();
      inc.state = {};
      inc.state.value = incidentGR.state.toString();

      var state = new GlideRecord('sys_choice');
      state.addQuery('element','state');
      state.addQuery('name','incident');
      state.addQuery('value', incidentGR.state.toString() );
      state.query();
      while(state.next()){
      	inc.state.label = state.label.toString();
      }

      data.inc = inc;
		}
	}
	

  data.probabilityGauge = $sp.getWidget("pe-solid-gauge", {

  	script_include: 'PEChartData',
  	function_name: 'getData',
  	param1: options.probability,

    advance: JSON.stringify({
  		options: {
  			title: {
	  			text: null
	  		},
  			chart: {
					height: 140,
					width: 140,
					backgroundColor: null
				},
				pane: {
	  			background: {
	  				backgroundColor: 'rgba(255,255,255,0.5)',
	  				borderColor: null,
	  				shape: 'solid',
	  				innerRadius: '60%',
	  				outerRadius: '100%'
	  			}
	  		},
	  		exporting: {
	  			enabled: false
	  		},
	  		legend: {
	  			enabled: false
	  		},
	  		yAxis: {
	    		min: 0,
					max: 100,
					tickAmount: 0,
					tickWidth: 0,
		      stops: [
	          [0, 'rgba(255,255,255,0.5)'],
	          [1, 'rgba(255,255,255,1)']
		      ]
	    	},
	    	plotOptions: {
	    		solidgauge: {
	    			dataLabels: {
	    				format: "{y}%",
	    				color: "white",
	    				style: {
	    					fontFamily: "'SourceSansPro', Helvetica, Arial, sans-serif",
								fontSize: "24px",
								fontWeight: "400"
	    				},
	    				y: -20
	    			}
	    		}
	    	}
	  	}
  	
  	})
    
  });

})();