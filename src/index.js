import _ from 'lodash';
import './style.css';

function use() {
  const a = _;
  if (a === '1') {
    return '';
  }
  return '';
}
use();

const name = document.querySelector('#name');
const score = document.querySelector('#score');
const btnSubmit = document.querySelector('#submit');
const refresh = document.querySelector('#refresh');
const scoreClasse = document.querySelector('.score');

const send = () => {
  fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/vVyOiAWy0mcFhfinoWrB/scores/', {
    method: 'POST',
    body: JSON.stringify({
      user: name.value, score: score.value,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
};

const arrange = (contenu) => {
  const table = document.createElement('table');
  table.setAttribute('id', 'customers');
  const tbody = document.createElement('tbody');
  table.appendChild(tbody);
  scoreClasse.appendChild(table);
  const long = contenu.result.length;

  for (let i = 0; i < long; i += 1) {
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    td.textContent = `${contenu.result[i].user} : ${contenu.result[i].score}`;
    tr.appendChild(td);
    tbody.appendChild(tr);
  }
};

async function received() {
  const requestUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/vVyOiAWy0mcFhfinoWrB/scores/';
  const request = new Request(requestUrl);
  const response = await fetch(request);
  const scoreNameTxt = await response.text();
  const scoreName = JSON.parse(scoreNameTxt);
  arrange(scoreName);
}

btnSubmit.addEventListener('click', () => {
  if (name.value !== '' && score.value !== '') {
    send();
    name.value = '';
    score.value = '';
  }
});
refresh.addEventListener('click', () => {
  const tables = document.querySelectorAll('table');
  for (let i = 0; i < tables.length; i += 1) {
    tables[i].remove();
  }
  received();
});