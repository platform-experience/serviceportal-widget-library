function($rootScope, $scope) {
  /* widget controller */
  var c = this;

  c.initialEvents = [
  	{ description: "Automated Event Correlation",
      time: "14:22",
      icon: "#flash",
      stats: [
        { name: "Events", value: 20 },
        { name: "Sources", value: 5 }
      ]
    },
  	{ description: "Automated Service Correlation",
      time: "14:22",
      icon: "#flash",
      stats: [
        { name: "In Total", value: 2 },
        { name: "Tier 1 Service", value: 1, iconSuffix: "#shopping" }
      ]
    },
    { description: "Automated Risk Assessment",
      time: "14:23",
      icon: "#flash",
      stats: [
        { value: '1.2M', icon: "#dollar" },
        { value: '42K', icon: "#people" },
        { value: '3', icon: '#world' }
      ]
    },
    { description: "Service Owners Notified",
      time: "14:26",
      icon: "#flash",
      users: [
        { photo: 'user1.jpg' },
        { photo: 'user2.jpg' },
        { photo: 'user3.jpg' }
      ]
    },
    { description: "Correlate Problems and Change History",
      time: "14:29",
      icon: "#flash",
      stats: [
        { name: "Changes", value: 3 },
        { name: "Problem", value: 1 }
      ]
    },
    { description: "Generate Remediate Actions",
      time: "14:32",
      icon: "#flash",
      stats: [
        { name: "Possible Actions", value: 3 }
      ]
    }
  ];

  c.remediationEvents = [
    { description: "CHG000693 Created", time: "14:35" },
    { description: "Temp Log File Size Increased", time: "14:37" },
    { description: "SQL2012 Hotfix Uninstalled", time: "14:41" },
    { description: "SQL Cluster Restarted – Active", time: "14:45" }
  ];

  c.newEvents = [
    { description: "Synthetic User Testing Completed",
      time: "14:45",
      icon: "#check-mark"
    },
    { description: "CHG000693 Closed",
      time: "14:46",
      icon: "#flash"
    },
    { description: "Business Owners Notified of Prevention",
      time: "14:48",
      users: [
        { photo: 'user1.jpg' },
        { photo: 'user2.jpg' },
        { photo: 'user3.jpg' }
      ],
      icon: "#flash"
    },
    { description: "Machine Learning Results Updated",
      time: "14:51",
      icon: "#flash"
    }
  ];

  $rootScope.$broadcast('countItems', { widget: 'outprev-remediation-timeline', count: c.initialEvents.length });

  $rootScope.$on('recovered', function(){
    c.recovered = true;
    c.shownInitialEvents = 0;
    $rootScope.$broadcast('countItems', {
      widget: 'outprev-remediation-timeline',
      count: 3 + c.newEvents.length
    });
  });
  c.fadeOldEvents = true;

  c.shownInitialEvents = 0;
  c.nextInitialEvent = function(){
  	if (c.shownInitialEvents < c.initialEvents.length) {
  		c.shownInitialEvents++
  	} else {
  		c.shownInitialEvents = 0;
      c.fadeOldEvents = true;
  	}
  }
  c.expandInitialEvents = function(){
    c.shownInitialEvents = c.initialEvents.length;
    c.fadeOldEvents = false;
  }
  c.collapseInitialEvents = function(){
    c.shownInitialEvents = 0;
    c.fadeOldEvents = true;
  }

  c.shownRemediationEvents = 0;
  c.expandRemediationEvents = function(){
    c.shownRemediationEvents = c.remediationEvents.length;
  }
  c.collapseRemediationEvents = function(){
    c.shownRemediationEvents = 0;
  }

}