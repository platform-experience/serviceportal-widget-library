(function() {
  var serverOptions = input.options ? input.options : (input.parameters ? input.parameters : {});
  options.problemNumber = options.problem_number || serverOptions.problem_number;

  var grMessages = new GlideRecord('sys_ui_message');
  grMessages.addQuery('key', 'STARTSWITH', 'Problem Msg');
  grMessages.query();

  var messages = [];
  while (grMessages.next()) {
    messages.push(grMessages.message.toString());
  }

  var grProblem = new GlideRecord('problem');
  grProblem.addQuery('number', options.problem_number);
  grProblem.query();

  if (!grProblem.next() && grProblem.number !== options.problem_number) {
    grProblem.initialize();
    grProblem.number = options.problemNumber;
    grProblem.priority = 1;
    grProblem.short_description = messages[1];
    grProblem.description = messages[0];
    grProblem.insert();
  }

  data.problemNumber = grProblem.number.toString();
  data.problemTime = grProblem.opened_at.toString();
  data.messageHeader = grProblem.short_description.toString();
  data.messageBody = grProblem.description.toString();
  data.today = new GlideDateTime().toString();
})();