const moongose = require('mongoose');

let SchemaTarea = new moongose.Schema({
    idTarea: Number,
    nombreTarea: String,
    detalleTarea: String
});

module.exports = moongose.model('tarea', SchemaTarea, 'Tareas');