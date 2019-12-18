var storage;

document.addEventListener('DOMContentLoaded', function() {
  storage = new Provider();

  sendAppeal();

  window.addEventListener('online', function() {
    storage.provider.get('appeals', function(data) {
      if (data) {
        for (i = 0; i < data.length; i++) {
          postAppeal(data[i].text);
        }
        storage.provider.delete('appeals');
        appeals = [];

        var req = new XMLHttpRequest();
        req.open("POST", "/fans_appeal", true);
        req.setRequestHeader('Content-Type', 'application/json');
        req.send(JSON.stringify(data));

        req.onreadystatechange = function() {
          if (req.readyState === XMLHttpRequest.DONE) {
            if (req.status != 200) {
              console.log("Error");
            } else {
              sendAppeal();
            }
          }
        }
      }
    });
  });

  document.getElementById('send').addEventListener('click', function() {
    var appeal_text = document.getElementById('appeal').value.trim();
    if (appeal_text === '') {
      alert("Fill the fields!");
    } else {
      var obj = {name: "name", text: appeal_text}
      if (window.navigator.onLine) {
        var req = new XMLHttpRequest();
        req.open("POST", "/fans_appeal", true);
        req.setRequestHeader('Content-Type', 'application/json');
        req.send(JSON.stringify(obj));

        req.onreadystatechange = function() {
          if (req.readyState === XMLHttpRequest.DONE) {
            if (req.status != 200) {
              alert("Something goes wrong");
            }
            else {
              postAppeal(obj.text)
            }
          }
        }
      } else {
        storage.provider.get('appeals', function(data) {
          var appeals
          if (data) {
            appeals = data;
          } else {
            appeals = [];
          }
          appeals.push({
            name: name,
            text: appeal_text
          });
          storage.provider.add('appeals', appeals);
          console.log("PROVIDER");
        });
      }
      document.getElementById('appeal').value = '';
    }
  });
});

function createAppeal(text, isHeader) {
  var card = document.createElement('div');
  card.className = 'card card-appeal ';
  if (isHeader) {
    card.className += 'float-left mr-3 ';
  }

  var cardBody = document.createElement('div');
  cardBody.className = 'card-body';
  cardBody.innerHTML = text;

  card.appendChild(cardBody);

  return card;
}

function formatDate(num) {
  if (num < 10) {
    return '0' + num;
  }
  return '' + num;
}

function postAppeal(text) {
  if (text.value == '') {
    alert('Appeal can not be empty!');
  } else {
    var date = new Date();
    var header = createAppeal('Fan name <br>' +
      formatDate(date.getHours()) + ':' +
      formatDate(date.getMinutes()) + '<br>' +
      formatDate(date.getDate()) + '.' +
      formatDate(date.getMonth() + 1) + '.' +
      formatDate(date.getFullYear() % 100), true);
    var body = createAppeal(text, false);
    var sect = document.createElement('section');
    sect.className = 'overflow-auto';
    sect.appendChild(header);
    sect.appendChild(body);

    var hr = document.createElement('hr');
    hr.className = 'fan-hr';

    document.getElementsByTagName('main')[0].insertBefore(sect, document.getElementsByTagName('h3')[0]);
    document.getElementsByTagName('main')[0].insertBefore(hr, document.getElementsByTagName('h3')[0]);
  }

  document.getElementById('appeal').value = '';
}

function sendAppeal() {
  if (window.navigator.onLine) {
    var req = new XMLHttpRequest();
    req.open("GET", "/fans_appeal", true);
    req.send();

    req.onreadystatechange = function() {
      if (req.readyState === XMLHttpRequest.DONE) {
        if (req.status != 200) {
          console.log("Something goes wrong!");
        }
        else {
          var data = JSON.parse(req.responseText);
          for (i = 0; i < data.length; i++) {
            postAppeal(data[i].text);
          }
        }
      }
    }
  }
}
