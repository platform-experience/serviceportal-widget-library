(function() {
  var serverOptions = input.options ? input.options : (input.parameters ? input.parameters : {});
  options.title = options.title || serverOptions.title || 'Torrentjack Ransomware';
  options.messageTime = options.message_time || serverOptions.message_time || '38m ago';
  options.messageHeader = options.message_header || serverOptions.message_header || 'SIR0001932 - TorrentJack Ransomware';
  options.messageBody = options.message_body || serverOptions.message_body || 'Palo Alto Wildefire detected 1631 emails tied to a phishing attack.';
})();