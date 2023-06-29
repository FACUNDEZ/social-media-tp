
async function profile() {
    try {
        const userId = 21;
        const url = `http://localhost:3000/profile/${userId}`;

        const response = await fetch(url, {
            method: 'GET'
        });

        const data = await response.json();
        console.log(data);

        if (response.status === 401) {
            console.log(data.err);
        }
        if (response.status === 200) {
            console.log(data.message);
        }

        const p = document.createElement('p');

        if (data.profile) {
            p.textContent = `Firstname: ${data.profile.firstname}, Lastname: ${data.profile.lastname}`;
            console.log(data.message);
        } else {
            p.textContent = "No se encontró ningún perfil.";
            console.log(data.message);
        }
        document.body.appendChild(p);

    } catch (error) {
        console.log(error);
    }
}

profile();
