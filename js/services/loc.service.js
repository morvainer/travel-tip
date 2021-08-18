import { storageService } from './storage.service.js'

let gPlaces = []
let gPlaceId = 1

export const locService = {
    getLocs,
    saveAddPlace,
    getPlaces,
    _savegPlaceToStorage,
    deletePos,
    gPlaceId,
    gPlaces
}
const KEY = 'places_DB'
_createPlaces()


function getPlaces(){
    console.log('getting places');
    return gPlaces;
}

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

// function addPlace(lat, lng) {
//     var name = prompt('enter the place name')
//     if (!name) return
//     locService.saveAddPlace(lat, lng, name)
//     renderPlaceTbale()
// }
function deletePos(placeId){
    // let places = getPlaces();
    var placeIdx = gPlaces.findIndex(function (place) {// finds the index of the book we want to delete
        return placeId === place.id;
    });
    gPlaces.splice(placeIdx, 1)
    _savePlacesToStorage();

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
    console.log('saving to storage');
    storageService.saveToStorage(KEY, gPlaces)
}

