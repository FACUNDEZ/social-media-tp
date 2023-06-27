const express = require('express');
const cors = require('cors');
const mysql = require('mysql2')

const app = express();

// MIDDLWEARES

app.use(express.json());
app.use(cors());

// CONNECT TO DATABASE

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '36779788',
    database: 'socialmedia',
    port: '3306',
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

// LOG IN

app.post("/login", (req, res) => {
    const { email, password } = req.body;
  
    const query = 'SELECT * FROM registeredUsers WHERE email = ? AND password = ?';
    const values = [email, password];
  
    connection.query(query, values, (err, results) => {
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

