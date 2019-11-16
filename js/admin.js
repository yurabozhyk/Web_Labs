var news = [];
if(localStorage.getItem('news')) {
  news = JSON.parse(localStorage.getItem('news'));
}
function sendPost() {
  var title = document.getElementById('admin-title')
  var text = document.getElementById('admin-text')

  if (title.value.trim() == '') {
    title.style.outline = '3px solid red';
  }
  else {
    title.style.outline = 'none';
  }

  if (text.value.trim() == '') {
    text.style.outline = '3px solid red';
  }
  else {
    text.style.outline = 'none';
  }

  if (title.value.trim() != "" && text.value.trim() != "") {
    // alert('Post has been added!')
    news.push({title:title.value, text:text.value});
    if(window.navigator.onLine) {
      alert('Working with server...');
      localStorage.setItem('news', JSON.stringify(news));
    } else {
      localStorage.setItem('news', JSON.stringify(news));
    }
    title.value = '';
    text.value = '';

  } else {
    alert('Fill all the fields!')
  }

}
