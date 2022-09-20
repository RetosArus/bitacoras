//modulos a utilizar
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

//puerto a correr
const port = 3000;

//programas intermedios
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//conexion a mongodb
mongoose.connect("mongodb+srv://valeria:0000.@cluster1.7jt8vor.mongodb.net/?retryWrites=true&w=majority")
    .then (() => console.log('Connected to binnaclesDb in MongoDB Atlas'))
    .catch ((error) => console.error('Cannot connect to Db,  ' + error))

    //esquema visual como MongoDB
const binnacleSchema = new mongoose.Schema({

    nombre: {
        type: String,
        required: true,
       },

    idActividad: {
        type: Number,
        required: true
    },
    observacion: {
        type: String,
        required: true
    },
    FechaInicio: {
        type: Date,
        required: true
    },
}, {versionKey: false});

const binnacle = mongoose.model("binnacle", binnacleSchema);

//rutas
app.get('/index', (req, res) =>{
    res.sendFile(__dirname + "/index.html");
});

app.post('/addbinnacle', (req, res) => {
    const myData = new binnacle(req.body);
    myData.save()
        .then(item => {
            res.status(201).send(myData);
        })
        .catch(err => {
            res.status(400).send("no se pueden guardar los datos");
        });
});
app.get('/getbinnacle', (req, res) => {
    const date = new Date(req.query.buscar)
    console.log ({req: date}) 
    binnacle.find({date})
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(404).json('Error: ' + err));
})



//correr en terminal
app.listen(3000, () => {
 console.log("aplicacion corriendo en el puerto 3000");
})