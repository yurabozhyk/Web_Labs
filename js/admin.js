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
    alert('Post has been added!')

    title.value = '';
    text.value = '';

  } else {
    alert('Fill all the fields!')
  }

}
