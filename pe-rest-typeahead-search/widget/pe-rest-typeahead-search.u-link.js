function Link(scope) {

  scope.cleanTypeahead = function () {
    scope.typeaheadElement.typeahead('val', '');
    scope.c.typing = false;
<<<<<<< HEAD
  };

  scope.$watch(scope.c.idName, function (newValues, oldValues, scope) {
    scope.typeaheadElement = $(
      '#' + scope.c.idName + '.typeahead.form-control.pe-rest-typeahead-search__input'
=======
    scope.c.selected = false;
    scope.c.current = {};
  };

  scope.$watch(scope, function (newValues, oldValues, scope) {
    scope.typeaheadElement = $(
      '.' + scope.c.className + '.typeahead.form-control.pe-rest-typeahead-search__input'
>>>>>>> c732b1814badc579887360f16d56556618af2c70
    );
    scope.typeaheadContainer = scope.typeaheadElement.parent();

    scope.typeaheadElement.typeahead({
      minLength: 1,
      delay: 200,
      highlight: false
    }, {
      name: scope.c.name,
      limit: scope.c.options.limit_result,
      display: scope.c.options.display_field,
      source: function (query, syncResults, asyncResults) {
<<<<<<< HEAD
        if (query && query.length > 1) {
          var entrypoint = scope.c.apiUrl + '&sysparm_query=' + scope.c.fieldCondition + query;
          $.get(entrypoint, function (data) {
            asyncResults(data.result);
          });
        }
=======

        if (query && query.length > 1) {
          if (scope.c.options.rest_instance_name && scope.c.options.rest_username && scope.c.options.rest_password) {
            scope.c.sendRequest(query, function (err, response) {
              asyncResults(response);
            });
          } else {
            var entrypoint = scope.c.apiUrl + '&sysparm_query=' + scope.c.fieldCondition + query;
            $.get(entrypoint, function (data) {
              asyncResults(data.result);
            });
          }
        }

>>>>>>> c732b1814badc579887360f16d56556618af2c70
      }
    });

    scope.typeaheadElement.bind('typeahead:select', function (ev, suggestion) {
      if (scope.options.overlay)
        scope.typeaheadContainer.removeClass('pe-rest-typeahead-search__dim');
<<<<<<< HEAD

=======
>>>>>>> c732b1814badc579887360f16d56556618af2c70
      scope.c.selected = true;
      scope.c.typing = false;
      scope.c.selectRecord(suggestion);
    });

    scope.typeaheadElement.bind('typeahead:active', function (ev, suggestion) {
      scope.c.selected = false;
      scope.c.typing = true;
<<<<<<< HEAD

=======
>>>>>>> c732b1814badc579887360f16d56556618af2c70
      if (scope.options.overlay)
        scope.typeaheadContainer.addClass('pe-rest-typeahead-search__dim');
    });

    scope.typeaheadElement.bind('typeahead:close', function (ev, suggestion) {
      if (scope.options.overlay)
        scope.typeaheadContainer.removeClass('pe-rest-typeahead-search__dim');
      if (!scope.c.selected)
        scope.typeaheadElement.typeahead('val', '');
      scope.c.typing = false;
    });
<<<<<<< HEAD

  });
=======
  });

>>>>>>> c732b1814badc579887360f16d56556618af2c70
}
