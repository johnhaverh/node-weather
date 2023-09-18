require('colors');

const { inquirerMenu, 
        pausa,
        leerInput,
        // listadoTareasBorrar,
        // confirmar,
        // mostrarListadoChecklist
} = require('./helpers/inquirer');
// const Tareas = require('./models/tareas');
// const { guardarDB,
//         leerDB
// } = require('./helpers/guardarArchivo');


const main = async () => {

    let opt='';
    // const tareas = new Tareas();
    // const tareasDB = leerDB();

    // if (tareasDB){
    //     tareas.cargarTareasFromArray(tareasDB);
    // }

     do {
         opt = await inquirerMenu(); //impresión del menu
    
        switch (opt) {
            case '1':
                const desc = await leerInput('Ciudad:'); 
                // tareas.crearTareas(desc);
                break;           
            case '2':
                // tareas.listadoCompleto();
                break;           
        }
    //     guardarDB(tareas.listadoArr);
        await  pausa();
    } while (opt != '0');

}

main ();