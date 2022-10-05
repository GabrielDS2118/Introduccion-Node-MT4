// console.log("Hola mundo genial")

const express = require('express');
const mongoose = require('mongoose');
const SchemaTarea = require("./modelos/Tarea");

//Configuraciones
const app = express();
const router = express.Router();


app.use(express.urlencoded({extended: true}));

//Permitir que se ingrese informacion en formato JSON
app.use(express.json());



//conexion a bases de datos
mongoose.connect('mongodb+srv://GabrielinAr:le89A19@ciclo4mt.q78oabo.mongodb.net/EjerciciosDB?retryWrites=true&w=majority');

//Operaciones crud

router.get('/', (req,res) => {
    res.send("Inicio de la api")
})

//Crear

router.post('/tarea', (req,res) => {

    let nuevaTarea = new SchemaTarea({
        idTarea: req.body.id,
        nombreTarea: req.body.nombre,
        detalleTarea: req.body.detalle
    });

    nuevaTarea.save(function(err,datos) {

        if(err){
            console.log(err);
        }
        res.send("Tarea correctamente almacenada")
    })
});

//Leer
router.get('/tarea', (req,res) => {
    SchemaTarea.find(function(err,datos){
        if(err) {
            console.log("Error para mostrar las tareas")
        } else {
            res.send(datos);
        }
    })
})

//Obtener una tarea
router.get('/unatarea/:id', (req,res) => {

    let { id } = req.params;
    let numberIdTarea = Number(id);

    SchemaTarea.findOne( 

        {idTarea: numberIdTarea}, 

        function(error, info) {

            if (error) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo encontrar la tarea',
                    err
                });
            } 
        
            else {
                res.json({
                    resultado: true,
                    info: info
                })
            }
    }
    
    )
})

//Actualizar
router.patch('/tarea/:id', function(req,res) {

    let { id } = req.params;

    let numberIdTarea = Number(id);
    console.log(numberIdTarea)

    SchemaTarea.updateOne( { idTarea : numberIdTarea }, {

            $set: req.body
       },

        function(error, info) {

            if (error) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo actualizar la tarea',
                    err
                });
            } 
            
            else {
                res.json({
                    resultado: true,
                    info: info
                })
            }
        }
     )
});

//Eliminar
router.delete('/tarea/:id', function(req,res) {

    let { id } = req.params;
    let numberIdTarea = Number(id);

    console.log(numberIdTarea);

    SchemaTarea.deleteOne( { idTarea: numberIdTarea},  
        
        function(error, info) {

            if (error) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo eliminar la tarea',
                    err
                });
            } 
        
            else {
                res.json({
                    resultado: true,
                    info: info
                })
            }
    })


})

app.use(router);

app.listen(3000, () => {
    console.log("Corriendo servidor en el puerto 3000")
})