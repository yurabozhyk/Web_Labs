document.addEventListener("DOMContentLoaded", function() {
  if(!window.navigator.onLine) {
    alert("Latest news are not available...");
    window.addEventListener('online', function() {
      if(localStorage.getItem('news')) {
        var allNews = JSON.parse(localStorage.getItem('news'));
        for(i=0;i<allNews.length;i++) {
          postNews(allNews[i].title, allNews[i].text);
        }
        localStorage.setItem('news', JSON.stringify([]));
      }
    });
  } else {
    if(localStorage.getItem('news')) {
      var allNews = JSON.parse(localStorage.getItem('news'));
      for(i=0;i<allNews.length;i++) {
        postNews(allNews[i].title, allNews[i].text);
      }
      localStorage.setItem('news', JSON.stringify([]));
    }
  }
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
