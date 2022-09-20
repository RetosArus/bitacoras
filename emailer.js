//Requerimos los paquetes

const nodemailer = require('nodemailer');

//Creamos el objeto de transporte
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'retos.arus@gmail.com',
    pass: 'oipucidgmdomlkeg'
  }
});

const mensaje = "reto velez"


const mailOptions = {
  from: 'retos.arus@gmail.com',
  to: 'vikkybeauty90@gmail.com',
  subject: 'Reto API nodejs',
  text: mensaje
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email enviado: ' + info.response);
  }
});