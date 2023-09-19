const axios = require('axios');

const { guardarDB,
        leerDB
} = require('../helpers/guardarArchivo');


class Busquedas {
    historial = [];

    constructor (){
        const historialDB = leerDB();
        console.log(historialDB);
        
        if (historialDB){
            this.historial = historialDB.historial;
        }
    };

    get historialCapitalizado(){
        return this.historial.map(lugar => {
            let palabras = lugar.split(' ');
            palabras = palabras.map(p => p[0].toUpperCase() + p.substring(1));
            return palabras.join(' ');
        })
    }
    
    get paramsMapbox(){
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es',
        }
    }    

    get paramsOpenWeather(){
        return {
            appid: process.env.OPEN_WEATHER_KEY,
            units: 'metric',
            lang: 'es'
        }
    }

    async Ciudad (lugar = ''){
        try {
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapbox,
            });
            const resp = await instance.get();
            return resp.data.features.map(lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1],
            }));
            
        } catch (error) {
            console.log(error);
        }
    }

    async Weather (lat = '', lon=''){
        try {
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: { ...this.paramsOpenWeather, lat, lon },
            });
            const resp = await instance.get();
            const {weather, main} = resp.data
            
            return {
                temp: main.temp,
                min: main.temp_min,
                max: main.temp_max,
                desc: weather[0].description
            };
            
        } catch (error) {
            console.log(error);
        }
    }

    agregarHistorial(lugar=''){
        if (!this.historial.includes(lugar.toLocaleLowerCase())){
            this.historial = this.historial.splice(0,5);
            this.historial.unshift(lugar.toLocaleLowerCase())
        }
        guardarDB(this.historial);
    }
}

module.exports = Busquedas