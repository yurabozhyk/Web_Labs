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

function sendAppeal() {
  var text = document.getElementById('appeal').value;
  if (text.trim() == '') {
    alert('Appeal can not be empty!');
  }
  else {
    var date = new Date();
    var header = createAppeal('Fan name <br>'
    + formatDate(date.getHours()) + ':'
    + formatDate(date.getMinutes()) + '<br>'
    + formatDate(date.getDate()) + '.'
    + formatDate(date.getMonth() + 1) + '.'
    + formatDate(date.getFullYear() % 100), true);
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
