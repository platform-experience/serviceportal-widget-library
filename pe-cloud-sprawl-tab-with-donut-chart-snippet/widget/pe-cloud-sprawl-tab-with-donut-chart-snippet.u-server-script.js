(function() {
  data.chart1 = {
    primary_color: '#29bd00',
    background_color: '#b4b2b3',
    chart_width: '70',
    font_size: '18px',
    font_weight: '600',
    chart_data: {
      label: '$50k',
      current: 50,
      total: 200
    }
  };

  data.chart2 = {
    primary_color: '#f5a623',
    background_color: '#b4b2b3',
    chart_width: '70',
    font_size: '18px',
    font_weight: '600',
    chart_data: {
      label: '10',
      current: 10,
      total: 20
    }
  };

  data.secondTab = {
    name: 'expiring lease',
    badge_number: 5,
    badge_color: 'bg-orange',
    list: [{
      icon: '#icon-azure',
      company: 'Azure',
      lease: 'Jan 5 2017',
      vimnumber: 'VM1',
      vim_number: '',
      user: {
        fname: 'edward',
        lname: 'scott',
        name: 'Edward Scott',
        photo: '47161dae1358fe00f7f5bcc32244b03c.iix',
        title: 'IT Manager',
        phone: '8581234567'
      }
    }, {
      icon: '#icon-aws',
      company: 'AWS',
      lease: 'Feb 5 2017',
      vimnumber: 'VM23',
      vim_number: '',
      user: {
        fname: 'Andrew',
        lname: 'Garner',
        name: 'Jose Riley',
        photo: '90f8d5621398fe00f7f5bcc32244b00b.iix',
        title: 'Application Manager',
        phone: '8581234567'
      }
    }, {
      icon: '#icon-aws',
      company: 'AWS',
      lease: 'Feb 5 2017',
      vimnumber: 'VM13',
      vim_number: '',
      user: {
        fname: 'jose',
        lname: 'riley',
        name: 'Jose Riley',
        photo: 'fae1fa1013d07e00f7f5bcc32244b091.iix',
        title: 'Application Manager',
        phone: '8581234567'
      }
    }, {
      icon: '#icon-aws',
      company: 'AWS',
      lease: 'Feb 25 2017',
      vimnumber: 'VM4',
      vim_number: '',
      user: {
        fname: 'greg',
        lname: 'hill',
        name: 'Greg Hill',
        photo: '743a51a21398fe00f7f5bcc32244b067.iix',
        title: 'Application Manager',
        phone: '8581234567'
      }
    }, {
      icon: '#icon-aws',
      company: 'AWS',
      lease: 'Feb 35 2017',
      vimnumber: 'VM5',
      vim_number: '',
      user: {
        fname: 'David',
        lname: 'Hoffman',
        name: 'David Hoffman',
        photo: '22d959621398fe00f7f5bcc32244b0d2.iix',
        title: 'Application Manager',
        phone: '8581234567'
      }
    }, {
      icon: '#icon-aws',
      company: 'AWS',
      lease: 'Feb 45 2017',
      vimnumber: 'VM6',
      vim_number: '',
      user: {
        fname: 'Gary',
        lname: 'Kim',
        name: 'Gary Kim',
        photo: '61ba9d621398fe00f7f5bcc32244b023.iix',
        title: 'Application Manager',
        phone: '8581234567'
      }
    }, {
      icon: '#icon-azure',
      company: 'Azure',
      lease: 'Feb 5 2017',
      vimnumber: 'VM17',
      vim_number: '',
      user: {
        fname: 'edward',
        lname: 'scott',
        name: 'Edward Scott',
        photo: '47161dae1358fe00f7f5bcc32244b03c.iix',
        title: 'IT Manager',
        phone: '8581234567'
      }
    }, {
      icon: '#icon-azure',
      company: 'Azure',
      lease: 'Feb 5 2017',
      vimnumber: 'VM18',
      vim_number: '',
      user: {
        fname: 'edward',
        lname: 'scott',
        name: 'Edward Scott',
        photo: '47161dae1358fe00f7f5bcc32244b03c.iix',
        title: 'IT Manager',
        phone: '8581234567'
      }
    }, {
      icon: '#icon-vmware',
      company: 'VMW',
      lease: 'Feb 5 2017',
      vimnumber: 'VM39',
      vim_number: '',
      user: {
        fname: 'jose',
        lname: 'riley',
        name: 'Jose Riley',
        photo: 'fae1fa1013d07e00f7f5bcc32244b091.iix',
        title: 'Application Manager',
        phone: '8581234567'
      }
    }, {
      icon: '#icon-vmware',
      company: 'VMW',
      lease: 'Feb 5 2017',
      vimnumber: 'VM10',
      vim_number: '',
      user: {
        fname: 'jose',
        lname: 'riley',
        name: 'Jose Riley',
        photo: 'fae1fa1013d07e00f7f5bcc32244b091.iix',
        title: 'Application Manager',
        phone: '8581234567'
      }
    }]
  };

  data.userOne = {
    fname: 'jose',
    lname: 'riley',
    name: 'Jose Riley',
    photo: 'fae1fa1013d07e00f7f5bcc32244b091.iix',
    title: 'Application Manager',
    phone: '8581234567',
    spending: [{
      text: '$8K this month',
      icon: '#icon-aws',
      company: 'AWS'
    }, {
      text: '$22K this month',
      icon: '#icon-azure',
      company: 'Azure'
    }]
  };

  data.userTwo = {
    fname: 'edward',
    lname: 'scott',
    name: 'Edward Scott',
    photo: '47161dae1358fe00f7f5bcc32244b03c.iix',
    title: 'IT Manager',
    phone: '8581234567',
    spending: [{
      text: '$7K this month',
      icon: '#icon-aws',
      company: 'AWS'
    }, {
      text: '$13K this month',
      icon: '#icon-azure',
      company: 'Azure'
    }]
  };
})();