const btnLogOut = document.getElementById('log-out-button')
const inputPosts = document.getElementById('input-posts')
const form = document.getElementById('form')
const postSection = document.getElementById('posting-area')
const btnHappy = document.getElementById('btn-happy')
const btnAngry = document.getElementById('btn-angry')
const btnLucky = document.getElementById('btn-lucky')
const btnFunny = document.getElementById('btn-funny')
const btnLove = document.getElementById('btn-love')
const perfilButton = document.getElementById('perfil-button')

let arrPosts = [];

async function logout() {
  const url = 'http://localhost:3000/logout';

  try {
    const response = await fetch(url, {
      method: 'DELETE',
    });

    const data = response.json();
    console.log(data);
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
    text: inputPosts.value,
    registeredUser_id: JSON.parse(localStorage.getItem('usuario')).usuario.id
  });

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: header,
      body: body
    });

    const data = await response.json();
    console.log(data);

    const div = document.createElement('div');
    div.className = 'container-post';
    const p = document.createElement('p');
    p.textContent = inputPosts.value;
    div.appendChild(p);
    postSection.prepend(div);

    inputPosts.value = '';

    arrPosts.unshift(data.post);

    localStorage.setItem('arrPosts', JSON.stringify(arrPosts));
  } catch (error) {
    console.log(error);
  }
}

async function loadAllPosts() {
  const url = 'http://localhost:3000/allposts';

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (response.status === 200) {
      const allPosts = data.allposts;

      allPosts.forEach((post) => {
        const div = document.createElement('div');
        div.className = 'container-post';
        const p = document.createElement('p');
        p.textContent = post.text;
        div.appendChild(p);
        postSection.prepend(div);
      });
    } else {
      console.log(data.error);
    }
  } catch (error) {
    console.error(error);
  }
}

loadAllPosts();

form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (inputPosts.value !== '') {
    arrPosts.unshift(inputPosts.value);
    postThings(e);
    console.log(arrPosts);
  } else {
    alert('Publica algo');
  }
});

btnLogOut.addEventListener('click', function (e) {
  e.preventDefault();

  logout();

  window.location.href = 'main.html';
});

perfilButton.addEventListener('click', () => {
  window.location.href = 'perfil.html';
});

loadAllPosts();

