const form = document.getElementById('form');
const inputEmail = document.getElementById('inputEmail');
const inputPassword = document.getElementById('inputPassword');

async function login() {
  const url = 'http://localhost:3000/login';
  const headers = {
    'Content-Type': 'application/json'
  };
  const body = JSON.stringify({
    email: inputEmail.value,
    password: inputPassword.value
  });

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: body
    });

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

form.addEventListener('submit', function(e) {
  e.preventDefault();

  login();

  if (inputEmail.value == '' || inputPassword.value == '') {
    return alert('INGRESE TODOS LOS DATOS POR FAVOR')
  }

  window.location.href = 'inicio.html';
});


