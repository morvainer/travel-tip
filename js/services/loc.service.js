import { storageService } from './storage.service.js'


export const locService = {
    getLocs,
    saveAddPlace
}
let gPlaces = []
let gPlaceId = 1
const KEY = 'places_DB'
_createPlaces()




const locs = [
    { name: 'Greatplace', lat: 32.047104, lng: 34.832384 },
    { name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
]

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(gPlaces);
        }, 2000)
    });
}


function saveAddPlace(lat, lng, name) {
    var newPlace = createPlace(lat, lng, name);
    gPlaces.unshift(newPlace)
    _savegPlaceToStorage()
}

function createPlace(lat, lng, name) {
    return {
        id: gPlaceId++,
        name,
        lat,
        lng,
        weather: 'sun',
        createdAt: Date.now(),
        updatedAt: Date.now()
    }
}


function _createPlaces(lat, lng, name) {
    var loadedPlaces = storageService.loadFromStorage(KEY)
    console.log(loadedPlaces);
    if (!loadedPlaces) {
        loadedPlaces = []
    }
    gPlaces = loadedPlaces;
    _savegPlaceToStorage()
}

function _savegPlaceToStorage() {
    storageService.saveToStorage(KEY, gPlaces)
}