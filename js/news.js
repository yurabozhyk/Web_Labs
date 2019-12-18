var storage;

document.addEventListener("DOMContentLoaded", function() {
  storage = new Provider();

  if (!window.navigator.onLine) {
    alert("Sorry lastest news aren't avalivle");
  } else {
    var req = new XMLHttpRequest();
    req.open("GET", "/news", true);
    req.send();

    req.onreadystatechange = function() {
      if (req.readyState === XMLHttpRequest.DONE) {
        if (req.status != 200) {
          console.log("Something goes wrong!");
        } else {
          var data = JSON.parse(req.responseText);
          for (i = 0; i < data.length; i++) {
            postNews(data[i].title, data[i].text);
          }
        }
      }
    }

    window.addEventListener('online', function() {
      storage.provider.get('news', function(data) {
        if (data) {
          for (i = 0; i < data.length; i++) {
            postNews(data[i]);
          }
          storage.provider.delete('news');
          news = [];

          var req = new XMLHttpRequest();
          req.open("POST", "/news", true);
          req.setRequestHeader('Content-Type', 'application/json');
          req.send(JSON.stringify(data));

          req.onreadystatechange = function() {
            if (req.readyState === XMLHttpRequest.DONE) {
              if (req.status != 200) {
                console.log("Something goes wrong!");
              } else {
                console.log('News successfuly transfered from provider to server!');
              }
            }
          }
        }
      });
    });

    function postNews(titleVar, textVar) {
      var card = document.createElement('div');
      var img = document.createElement('img');
      var body = document.createElement('div');
      var title = document.createElement('h5');
      var text = document.createElement('p');
      img.setAttribute('src', 'images/bbnos4.jpg');
      img.setAttribute('alt', 'bbno$ & green cap');
      img.setAttribute('class', 'card-img-top');
      card.setAttribute('class', 'card card-news');
      body.setAttribute('class', 'card-body');
      title.setAttribute('class', 'card-title');
      text.setAttribute('class', 'card-text');
      title.innerHTML = titleVar;
      text.innerHTML = textVar;
      body.appendChild(title);
      body.appendChild(text);
      card.appendChild(img);
      card.appendChild(body);
      document.getElementById('news').appendChild(card);
    }
  }
})
