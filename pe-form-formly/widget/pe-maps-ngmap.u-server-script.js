(function () {
  data.form_fields = input.form_fields || options.form_fields;
  if (data.form_fields)
    data.form_fields = JSON.parse(data.form_fields);
  else //sample input fields data model
    data.form_fields = [{
      'key': 'email',
      'type': 'input',
      'templateOptions': {
        'type': 'email',
        'label': 'Email address',
        'placeholder': 'Enter email'
      }
    },
    {
      'key': 'password',
      'type': 'input',
      'templateOptions': {
        'type': 'password',
        'label': 'Password',
        'placeholder': 'Password'
      }
    },
    {
      'key': 'roles',
      'type': 'multiCheckbox',
      'templateOptions': {
        'label': 'Roles',
        'options': [{
          'id': 1,
          'title': 'Genius'
        },
        {
          'id': 2,
          'title': 'Administrator'
        },
        {
          'id': 3,
          'title': 'User'
        }
        ],
        'valueProp': 'id',
        'labelProp': 'title'
      }
    },
    {
      'key': 'geniusCheck',
      'type': 'checkbox',
      'templateOptions': {
        'label': 'Genius'
      }
    },
    {
      'key': 'bioText',
      'type': 'textarea',
      'templateOptions': {
        'label': 'Bio'
      }
    },
    {
      'key': 'feedback',
      'type': 'radio',
      'templateOptions': {
        'label': 'Do you love ServiceNow?',
        'options': [{
          'name': 'I love it!',
          'value': 'love'
        },
        {
          'name': 'I love it a lot!',
          'value': 'lovealot'
        },
        {
          'name': 'I can\'t live without',
          'value': 'extremelove'
        }
        ]
      }
    },
    {
      'key': 'transportation',
      'type': 'select',
      'templateOptions': {
        'label': 'How do you get around in the city',
        'valueProp': 'name',
        'options': [{
          'name': 'Car'
        },
        {
          'name': 'Helicopter'
        },
        {
          'name': 'Sport Utility Vehicle'
        },
        {
          'name': 'Bicycle',
          'group': 'low emissions'
        },
        {
          'name': 'Skateboard',
          'group': 'low emissions'
        },
        {
          'name': 'Walk',
          'group': 'low emissions'
        },
        {
          'name': 'Bus',
          'group': 'low emissions'
        },
        {
          'name': 'Scooter',
          'group': 'low emissions'
        },
        {
          'name': 'Train',
          'group': 'low emissions'
        },
        {
          'name': 'Hot Air Baloon',
          'group': 'low emissions'
        }
        ]
      }
    }
    ];

})();