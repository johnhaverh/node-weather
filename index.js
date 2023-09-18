require('dotenv').config();
require('colors');

const { inquirerMenu, 
        pausa,
        leerInput,
        listarLugares,
        // confirmar,
        // mostrarListadoChecklist
} = require('./helpers/inquirer');

const Busquedas = require('./models/busquedas');

// const { guardarDB,
//         leerDB
// } = require('./helpers/guardarArchivo');


const main = async () => {

    let opt='';
    const busquedas = new Busquedas();

    // if (tareasDB){
    //     tareas.cargarTareasFromArray(tareasDB);
    // }

     do {
         opt = await inquirerMenu(); //impresión del menu
    
        switch (opt) {
            case 1:
                const criterio = await leerInput('Ciudad:'); 
                const lugares = await busquedas.Ciudad(criterio);
                const id = await listarLugares(lugares);
                const lugarSel= lugares.find( l => l.id === id);


                console.log('\nInformación de la ciudad\n'.green);
                console.log('Ciudad       : ', lugarSel.nombre);
                console.log('Latitud      : ', lugarSel.lat);
                console.log('Longitud     : ', lugarSel.lng);
                console.log('Tenmperatura : ',);
                console.log('Máxima       : ',);
                console.log('Mínima       : ',);
                break;           
            case 2:
                busquedas.historial();
                break;           
        }
    //     guardarDB(tareas.listadoArr);
        if (opt !== 0) await  pausa();
    } while (opt != 0);

}

main ();