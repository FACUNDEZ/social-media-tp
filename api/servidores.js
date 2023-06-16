const express = require('express');
const cors = require('cors');
const mysql = require('mysql')

const app = express();

// MIDDLWEARES

app.use(express.json());
app.use(cors());

// CONNECT TO DATABASE

const connection = mysql.createConnection({
    host: '192.168.0.210',
    user: 'root',
    password: '36779788'
});

connection.connect();

// REGISTER 

app.post("/signin", (req, res) => {
    const { name, lastName, email, password } = req.body

    const newUser = {
        name,
        lastName,
        email,
        password
    }

    res.json({ newUser })
})

// LOG IN

app.post("/login", (req, res) => {
    const { email, password } = req.body

    res.json({ email, password })
})

// LOG OUT
app.delete("/logout", (req, res) => {

    res.json({ message: "Logout exitoso" });
});

// POST OF USER 

let postArr = []

app.post("/posts", (req, res) => {
    try {
        const { writing } = req.body

        const post = {
            writing: writing,
        }

        postArr.unshift(post)

        res.json(postArr)
    }
    catch (error) {
        console.log(error)
    }
})

app.listen(3000, (req, res) => {
    console.log('El servidor esta corriendo en el puerto 3000')
})

