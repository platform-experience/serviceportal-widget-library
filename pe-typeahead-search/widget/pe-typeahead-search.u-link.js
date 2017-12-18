function(scope) {
  scope.$watch(scope.c, function(newValues, oldValues, scope) {
    console.log('scope.c', scope.c);
    scope.typeaheadElement = $(
      '#' + scope.c.idName + '.typeahead.form-control.pi-typeahead'
    );
    console.log('typeaheadElement', scope.typeaheadElement);

    scope.typeaheadContainer = scope.typeaheadElement.parent();

    scope.typeaheadElement.typeahead(
      {
        minLength: scope.c.minLength,
        highlight: false
      },
      {
        name: scope.c.name,
        limit: 100000,
        display: scope.c.fieldDisplay,
        source: function(query, syncResults, asyncResults) {
          var entrypoint =
            scope.c.apiUrl + '&sysparm_query=' + scope.c.fieldCondition + query;

          console.log('entrypoint', entrypoint);

          $.get(entrypoint, function(data) {
            console.log('REST response', data.result);
            asyncResults(data.result);
          });
        }
      }
    );

    scope.typeaheadElement.bind('typeahead:select', function(ev, suggestion) {
      scope.typeaheadContainer.removeClass('pi-search-dim');
      scope.c.selectRecord(suggestion);
    });
    scope.typeaheadElement.bind('typeahead:active', function(ev, suggestion) {
      scope.typeaheadContainer.addClass('pi-search-dim');
    });
    scope.typeaheadElement.bind('typeahead:close', function(ev, suggestion) {
      scope.typeaheadContainer.removeClass('pi-search-dim');
    });
  });
}
