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

// LOG IN AND CHARGE PROFILE AFTER LOGIN AUTOMATICALLY

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

        res.json({ message: 'Inicio de sesión exitoso', usuario: { ...results[0] } });
    });
});

// LOG OUT

app.delete("/logout", (req, res) => {

    res.json({ message: "Logout exitoso" });
});

// POST OF USER 

app.post("/posts", (req, res) => {
    const { text, registeredUser_id } = req.body;

    const query = 'INSERT INTO postOfUser (registeredUser_id, date, text) VALUES (?, NOW(), ?)';
    const values = [registeredUser_id, text];

    connection.query(query, values, (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Error al insertar el post' });
            console.log({ error })
        } else {
            res.json({ message: 'Post insertado correctamente' });
        }
    });
});

// CHARGE POSTS OF USER ON PROFILE

app.get("/posts", (req, res) => {
    const { registeredUser_id } = req.query;
    const query = 'SELECT * FROM postOfUser WHERE registeredUser_id = ?';

    connection.query(query, registeredUser_id, (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Error al consultar los posts' });
            console.log({ error });
        } else {
            res.json({ message: 'Posts consultados correctamente', posts: results });
        }
    });
});

// CHARGE ALL POSTS ON LOBBY 

app.get("/allposts", (req, res) => {
    const query = 'SELECT * FROM postOfUser';

    connection.query(query, (error, results) => {
        if (error) {
            res.status(500).json({ error: "Error al consultar los posts" });
        } else {
            res.json({ message: "Posts cargados correctamente", allposts: results });
        }
    });
});

// DELETE POST 

app.delete("/deletePost", (req, res) => {

    res.json()
})

app.listen(3000, (req, res) => {
    console.log('El servidor esta corriendo en el puerto 3000')
})



