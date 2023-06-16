const btnLogOut = document.getElementById('log-out')

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

btnLogOut.addEventListener('click', function () {

  logout();

  window.location.href = 'main.html';
});
