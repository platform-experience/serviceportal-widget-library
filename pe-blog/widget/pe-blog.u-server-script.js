(function() {
  activate();

  function activate() {
    getOptions();
    getKnowledgeItems();
    hasAdminRole();
  }

  function hasAdminRole() {
    var userRoles = gs.getUser().getUserRoles().toString();
    var userArray = userRoles.split(',');
    var hasRole = [];
    userArray.forEach(function(value, key) {
      var canEdit = options.roles.includes(value) === true ? true : false;
      hasRole.push(canEdit);
    });
    data.isAdmin = hasRole.join().includes(true) ? true : false;
    return data.isAdmin;
  }

  function getOptions() {
    var serverOptions = input.options ? input.options : input.parameters ? input.parameters : {};
    options.category = options.u_category_dv || serverOptions.u_category_dv;
    options.count = options.u_max_entries || serverOptions.u_max_entries;
    options.limit = options.u_excerpt_character_limit || serverOptions.u_excerpt_character_limit;
    options.excerpt = options.u_excerpt || serverOptions.u_excerpt;
    options.rating = options.u_ratings || serverOptions.u_ratings;
    options.theme = options.u_theme || serverOptions.u_theme;
    options.roles = options.u_edit_role_dv || serverOptions.u_edit_role_dv;
  }

  function getKnowledgeItems() {
    var grKnowledge = new GlideRecord('kb_knowledge');
    var encodedQuery = 'kb_category.label=' + options.category;
    var fields = 'author, kb_category, number, published, rating, short_description, sys_id, text';
    grKnowledge.addEncodedQuery(encodedQuery);
    grKnowledge.orderBy('published');
    grKnowledge.setLimit(options.count);
    grKnowledge.query();
    var items = [];
    var obj;
    while (grKnowledge.next()) {
      obj = {};
      $sp.getRecordElements(obj, grKnowledge, fields);
      items.push(obj);
    }
    data.items = items;
    return data.items;
  }
})();
