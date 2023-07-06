
function profile() {
  const usuario = JSON.parse(localStorage.getItem("usuario"))

  const p = document.createElement('p');

  if (usuario) {
    p.textContent = `Firstname: ${usuario.usuario.firstname}, Lastname: ${usuario.usuario.lastname}`;
    console.log(usuario)
  } else {
    p.textContent = "No se encontró ningún perfil.";
  }
  document.body.appendChild(p);
}

profile();

async function getPostsOfUser() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const registeredUser_id = usuario.usuario.id;

  const url = `http://localhost:3000/posts?registeredUser_id=${registeredUser_id}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const posts = data.posts;

    const postSection = document.getElementById("postSection");
    postSection.innerHTML = "";

    if (posts.length > 0) {
      posts.forEach((post) => {
        const p = document.createElement("p");
        p.textContent = post.text;
        postSection.prepend(p);
      });
    } else {
      const p = document.createElement("p");
      p.textContent = "No se encontraron posts del usuario";
      postSection.prepend(p);
    }
  } catch (error) {
    console.log(error);
  }
}

getPostsOfUser();





