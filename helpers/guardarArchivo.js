const fs = require('fs');

const archivo = './db/database.json';

const guardarDB = (data) => {
    const payload = {
        historial: data,
    }
    fs.writeFileSync(archivo, JSON.stringify(payload));
}

const leerDB =  () => {
    if (!fs.existsSync(archivo)){
        return null;
    }

    const info = fs.readFileSync(archivo, {encoding: 'utf-8'});
    const data = JSON.parse(info);
    return data;
}
 

module.exports = {
    guardarDB,
    leerDB
};