export const locService = {
    getLocs,
    getPlaceTbale,
    addPlace
}


window.gPlaces = gPlaces

var gPlaces =[]



const locs = [
    { name: 'Greatplace', lat: 32.047104, lng: 34.832384 }, 
    { name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
]

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000)
    });
}

function getPlaceTbale(){

}


function addPlace(lat, lng, name) {
    var newPlace = createPlace(lat, lng, name);
    debugger
    gPlaces.unshift(newPlace)
    _savegPlaceToStorage()
}