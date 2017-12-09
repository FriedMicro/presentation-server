pageNumber = 0;

changePage = function(incrementCount){
  pageNumber += incrementCount;
  var params = buildParams(pageNumber);
  sendRequest(params, function(){});
}

goToStart = function(){
  pageNumber = 0;
  var params = buildParams(pageNumber);
  sendRequest(params, function(){});
}

buildParams = function(page){
  var password = document.getElementById("password").value;
  var params = {
    api_key: password,
    'page_number': page
  }
  return JSON.stringify(params);
}

sendRequest = function(params, callback){
  var http = new XMLHttpRequest();
  var destination = window.location.protocol + "//" + window.location.host;
  http.open("POST", destination + "/presentation-remote", true);
  http.setRequestHeader("Content-type", "application/json");
  http.onreadystatechange = function() {
    if (http.readyState == 4) {
      var response = JSON.parse(http.responseText);
      callback();
    }
  };
  http.send(params);
}
