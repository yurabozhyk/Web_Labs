var storage;

window.addEventListener('DOMContentLoaded', function() {
  storage = new Provider();
});

function sendPost() {
  var title = document.getElementById('admin-title');
  var text = document.getElementById('admin-text');

  if (title.value.trim() == '') {
    title.style.outline = '3px solid red';
  } else {
    title.style.outline = 'none';
  }

  if (text.value.trim() == '') {
    text.style.outline = '3px solid red';
  } else {
    text.style.outline = 'none';
  }

  if (title.value.trim() != "" && text.value.trim() != "") {
    var obj = {title : title.value, text : text.value};

    if (window.navigator.onLine) {
      alert('Working with server...');
      var req = new XMLHttpRequest();
      req.open("POST", "/news", true);
      req.setRequestHeader('Content-Type', 'application/json');
      req.send(JSON.stringify(obj));

      req.onreadystatechange = function() {
        if (req.readyState === XMLHttpRequest.DONE) {
          if (req.status != 200) {
            alert("Error");
          } else {
            alert("Success!");
          }
        }
      }
      title.value = '';
      text.value = '';
    } else {
      storage.provider.get('news', function(data) {
        var news;
        if (data) {
          news = data;
        } else {
          news = [];
        }
        news.push({
          title: title.value,
          body: text.value
        });
        storage.provider.add('news', news);
        console.log("PROVIDER");
        title.value = '';
        text.value = '';
      });
    }
  } else {
    alert('Fill all the fields!')
  }

}
