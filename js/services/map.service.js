import { locService } from './loc.service.js'
import { storageService } from './storage.service.js'

export const mapService = {
    initMap,
    addMarker,
    panTo,
    getMap,
    getUserChosenPos,
    panPos,
}
var gMap;
var gCurrLoc;
window.gMap = gMap;

function initMap(cb, lat = 32.0749831, lng = 34.9120554) {
    // debugger
    console.log('InitMap');
    return _connectGoogleApi()
        .then(() => {
            gMap = new google.maps.Map(
                document.querySelector('#map'),
                {
                    center: { lat, lng },
                    zoom: 15
                }

            )

            gMap.addListener("click", (e) => {
                // debugger;
                let locName = prompt('Enter Location Name');
                gCurrLoc = { id: locService.makeId(), name: locName, lat: e.latLng.lat(), lng: e.latLng.lng() }
                let places = locService.getPlaces();
                places.push(gCurrLoc);
                // locService.gPlaces.push(gCurrLoc);
                // console.log(locService.gPlaces);
                storageService.saveToStorage('places_DB', places)
                // locService._savegPlaceToStorage();
                // locService.addPlace({lat: e.latLng.lat(), lng: e.latLng.lng()},cb)
                cb(gCurrLoc);// sends an object with position

                //placeMarkerAndPanTo(e.latLng, map);
            });
        })
}


function panPos(placeId) {
    var places = locService.getPlaces();
    var place = places.find(function (place) {// finds the index of the book we want to delete
        return placeId === place.id;
    });
    panTo(place.lat, place.lng)

}

function getMap() {
    return gMap
}


function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: 'Hello World!'
    });
    return marker;
}

function panTo(lat, lng) {
    // debugger
    var laLatLng = new google.maps.LatLng(lat, lng);
    gMap.panTo(laLatLng);
}

function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyDU7dioNfhFTADeUY7K0oPN80S90jOUBpI'
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}

function getUserChosenPos(keySearch) {
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${keySearch}&key=AIzaSyDZfisC7PtmNg006K52KH5iJ3bERQWOP-o`)
        .then(res => res.data.results[0].geometry.location)
        .then(
            res => res
        )

}

