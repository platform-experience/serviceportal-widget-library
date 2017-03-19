function openChat(elem) {
  console.log('***** Opening Chat w/ ' + elem.id);
  var requestBody = '';
  var client = new XMLHttpRequest();
  var url = '/api/snc/pe_people_info_launch_connect/launch?user_id=' + elem.id;

  client.open('get', url, false);
  client.setRequestHeader('Accept', 'application/json');
  client.setRequestHeader('Content-Type', 'application/json');
  client.setRequestHeader('X-UserToken', window.g_ck);
  client.send(requestBody);
  if (client.status === 200) {
    var liveProfileID = JSON.parse(client.response).result;
    console.log('**** Channel ID received ' + liveProfileID.profile_id);
    url = '/$c.do#?user=' + liveProfileID.profile_id;
    window.open(url, '_blank');
  } else {
    console.log('**** No Channel ID received.');
    url = '/$c.do';
    window.open(url, '_blank');
  }
}