const express = require("express");
const mysql = require ("mysql");
const app = express();

app.get("/",(req,res) => {

    res.send("hola mundo");

});

const port = 3000;

app.listen(port, ()=>{

console.log("Ejecutando en puerto " + port);

});

const db = mysql.createConnection({

    host: 'localhost',
    user:'root',
    password: '',
    database: 'mishibank'

});

db.connect((err)=>{

    if(err){
        console.error("No furulo perro");
    }
    else{
        console.log("Si furulo");
    }

});

process.on('SIGINT',()=>{

db.end((err)=>{

    if(err){
        console.error("No se desconecto" + err.message);
    }
    else{
        console.log("Conexion cerrada con exito");
    }

    process.exit();

    });

});

app.get('/logs',(req,res)=>{

    const sql = "SELECT * FROM logs";
    db.query(sql,(error, resultado)=>{

if(error){
    console.error("Error "+err.message);
    return res.status(500).send("Error al consultar los datos");
}

res.json(resultado);

    })

});

app.get('/agregar', (req,res)=>{

    const insertSQL = "INSERT INTO clients(id_client, client_name, phone,"+
         "address, birthday, rfc, created_at, active)"+
        "VALUES (?,?,?,?,?,?,?,?)";

    const datos = ['20','Julio','654-987-9632','afsafasfass',+
                    '2020-01-01','65151','2023-05-05','1'];

    db.query(insertSQL, datos, (error, resultado)=>{

        if(error){

            console.error("Ya valio la insercion a la base de datos"+
                            error.message);

        }else{

        console.log("Datos insertados de forma correcta");
        res.send("Datos insertados de forma fructifera");

        }
    });

});

app.get('/actualizar', (req,res)=>{

    const updateSQL = "UPDATE clients SET  client_name =" +
     "? WHERE id_client = ?";

    const datos = ['Paco','1'];

    db.query(updateSQL, datos, (error, resultado)=>{

        if(error){

            console.error("Ya valio la actualizacion a la base de datos"+
                            error.message);

        }else{

        console.log("Datos actualizados de forma correcta");
        res.send("Datos actualizados de forma fructifera");

        }
    });

});

app.get('/borrar', (req,res)=>{

    const deleteSQL = "DELETE FROM clients WHERE id_client = ?";

    const datos = ['20'];

    db.query(deleteSQL, datos, (error, resultado)=>{

        if(error){

            console.error("Ya valio la borracion a la base de datos"+
                            error.message);

        }else{

        console.log("Datos borrados de forma correcta");
        res.send("Datos borrados de forma fructifera");

        }
    });

});