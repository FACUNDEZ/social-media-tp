const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const dotenv = require('dotenv')

const app = express();

// MIDDLWEARES

app.use(express.json());
app.use(cors({ origin: "*" }));
dotenv.config();

// CONNECT TO DATABASE

const connection = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    port: process.env.DATABASE_PORT,
});

connection.connect((error) => {
    if (error) {
        console.error('Error al conectar con la base de datos:', error);
    } else {
        console.log('Conexión exitosa a la base de datos');
    }
});

// REGISTER 

app.post("/signin", (req, res) => {
    const { firstname, lastname, email, password } = req.body;

    const query = 'INSERT INTO registeredUsers (firstname, lastname, email, password) VALUES (?, ?, ?, ?)';
    const values = [firstname, lastname, email, password];

    connection.query(query, values, (err, results, fields) => {
        if (err) {
            res.status(500).json({ error: 'Error al insertar usuario' });
        } else {
            res.json({ results });
        }
    });
});

// CREATE PROFILE AFTER REGISTER AUTOMATICALLY

app.get("/profile/:userId", (req, res) => {
    const { userId } = req.params;

    const query = 'SELECT firstname, lastname FROM registeredUsers WHERE id = ?';
    const values = [userId];

    connection.query(query, values, (err, results, fields) => {
        if (err) {
            return res.status(500).json({ err: 'Error al consultar la base de datos' });
        }

        if (results.length === 0) {
            return res.status(401).json({ err: 'Usuario no encontrado' });
        }

        if (results.length !== 0) {
            const profile = {
                firstname: results[0].firstname,
                lastname: results[0].lastname
            }
          return res.status(200).json({ message: 'Perfil cargado exitosamente', profile });
        }
    });
})

// LOG IN

app.post("/login", (req, res) => {
    const { email, password } = req.body;

    const query = 'SELECT * FROM registeredUsers WHERE email = ? AND password = ?';
    const values = [email, password];

    connection.query(query, values, (err, results, fields) => {
        if (err) {
            return res.status(500).json({ error: 'Error al consultar la base de datos' });
        }

        if (results.length === 0) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        res.json({ message: 'Inicio de sesión exitoso' });
    });
});

// LOG OUT

app.delete("/logout", (req, res) => {

    res.json({ message: "Logout exitoso" });
});

// POST OF USER 

app.post("/posts", (req, res) => {
    const { writing } = req.body

    const post = {
        writing: writing
    }

    res.json(post)

    console.log(error)

})

// DELETE POST 

app.delete("/deletePost", (req, res) => {

    res.json()
})

app.listen(3000, (req, res) => {
    console.log('El servidor esta corriendo en el puerto 3000')
})



