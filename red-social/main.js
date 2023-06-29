const form = document.getElementById('form');
const inputEmail = document.getElementById('inputEmail');
const inputPassword = document.getElementById('inputPassword');
const registerForm = document.getElementById('register-form')
const newFirstName = document.getElementById('new-first-name')
const newLastName = document.getElementById('new-last-name')
const newEmail = document.getElementById('new-email')
const newPassword = document.getElementById('new-password')

// LOGIN

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

    if (response.status === 401) {
      alert(data.error);
      return;
    } else if (response.status === 200) {
      alert(data.message);
      window.location.href = 'inicio.html';
    }
  } catch (error) {
    console.error(error);
  }
}

form.addEventListener('submit', function (e) {
  e.preventDefault();

  if (inputEmail.value == '' || inputPassword.value == '') {
    return alert('INGRESE TODOS LOS DATOS POR FAVOR')
  } 
  
  login();
});

// REGISTER 

async function register() {
  const url = 'http://localhost:3000/signin';
  const headers = {
    'Content-Type': 'application/json'
  };
  const body = JSON.stringify({
    firstname: newFirstName.value,
    lastname: newLastName.value,
    email: newEmail.value,
    password: newPassword.value
  });

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: body
    })

    const data = await response.json()
    console.log(data)
  }
  catch (error) {
    console.log(error)
  }
}

registerForm.addEventListener('submit', (e) => {
    e.preventDefault()

    if (newFirstName.value === '' || newLastName.value === '' || newEmail.value === '' || newPassword.value === '') {
      alert('Completa todos los datos por favor')
    }

    register()

    newFirstName.value = ''
    newLastName.value = ''
    newEmail.value = ''
    newPassword.value = ''
})








