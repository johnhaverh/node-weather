const axios = require('axios');



class Busquedas {
    historial = [];
    constructor (){
    };
    
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
}


module.exports = Busquedas