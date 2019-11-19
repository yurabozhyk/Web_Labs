var storage;

document.addEventListener("DOMContentLoaded", function() {
  storage = new Provider();
  window.addEventListener('online', function() {
    storage.provider.get('news', function(data) {
      if (data) {
        for (i = 0; i < data.length; i++) {
          postNews(data[i].title, data[i].body);
        }
        storage.provider.delete('news');
        news = [];
        // Data Transfer function
        console.log('News successfuly transfered from provider to server!');
      }
    });
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
