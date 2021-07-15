let pageNumber = 0;

const changePage = (incrementCount) => {
  pageNumber += incrementCount;
  const params = buildParams(pageNumber);
  sendRequest(params);
}

const goToStart = () => {
  pageNumber = 0;
  const params = buildParams(pageNumber);
  sendRequest(params);
}

const buildParams = (page) => {
  const password = readDomPassword();
  const params = {
    api_key: password,
    'page_number': page
  }
  return JSON.stringify(params);
}

const readDomPassword = () => {
  const password = document.getElementById("password").value;
  return password;
}

const sendRequest = (params) => {
  const http = new XMLHttpRequest();
  const destination = window.location.protocol + "//" + window.location.host;
  http.open("POST", destination + "/presentation-remote", true);
  http.setRequestHeader("Content-type", "application/json");
  return new Promise((resolve, reject) => {
    http.onreadystatechange = () => {
      if (http.readyState === 4) {
        const response = JSON.parse(http.responseText);
        resolve(response);
      }
    };
    http.send(params);
  })
}
