var allAppeals = [];
document.addEventListener('DOMContentLoaded', function(){

  window.addEventListener('online', function() {
    if(localStorage.getItem('appeals')) {
      allAppeals = JSON.parse(localStorage.getItem('appeals'));
      for(i=0;i<allAppeals.length;i++) {
        sendAppeal(allAppeals[i].appeal_text);
      }
      localStorage.setItem('appeals', JSON.stringify([]));
    }
  });

  document.getElementById('send').addEventListener('click', function() {
    var appeal_text = document.getElementById('appeal').value.trim();
    if(appeal_text === '') {
      alert("Fill the fields!");
    } else {
      if(window.navigator.onLine) {
        alert('Working with server...');
        sendAppeal(appeal_text);
        localStorage.setItem('appeals', JSON.stringify([]));
      } else {
        allAppeals.push({appeal_text:appeal_text});
        localStorage.setItem('appeals', JSON.stringify(allAppeals));
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

function sendAppeal(text) {
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
