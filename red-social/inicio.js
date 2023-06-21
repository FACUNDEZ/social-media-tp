const btnLogOut = document.getElementById('log-out-button')
const inputPosts = document.getElementById('input-posts')
const form = document.getElementById('form')
const postSection = document.getElementById('posting-area')
const btnHappy = document.getElementById('btn-happy')
const btnAngry = document.getElementById('btn-angry')
const btnLucky = document.getElementById('btn-lucky')
const btnFunny = document.getElementById('btn-funny')
const btnLove = document.getElementById('btn-love')

let arrPosts = []

async function logout() {
  const url = 'http://localhost:3000/logout';

  try {
    const response = await fetch(url, {
      method: 'DELETE',
    });

    const data = response.json()
    console.log(data)
  } catch (error) {
    console.error(error);
  }
}

async function postThings(e) {
  e.preventDefault();

  const url = 'http://localhost:3000/posts';
  const header = {
    'Content-Type': 'application/json'
  };
  const body = JSON.stringify({
    writing: inputPosts.value
  });

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: header,
      body: body
    });

    const data = await response.json();
    console.log(data);

    const div = document.createElement('div')
    div.className = 'container-post'
    const li = document.createElement('li')
    li.textContent = inputPosts.value
    li.style.listStyle = 'none'
    postSection.appendChild(div)
    div.appendChild(li);

    inputPosts.value = '';
  } catch (error) {
    console.log(error);
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (inputPosts.value !== '') {
    arrPosts.unshift(inputPosts.value);
    postThings(e);
  } else {
    alert('publica algo')
  }
});

btnLogOut.addEventListener('click', function (e) {
  e.preventDefault()

  logout();

  window.location.href = 'main.html';
});

