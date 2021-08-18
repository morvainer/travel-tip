import { locService } from './loc.service.js'

export const mapService = {
    initMap,
    addMarker,
    panTo,
    getMap
}
var gMap;
var gCurrLoc;
window.gMap = gMap;

function initMap(cb,lat = 32.0749831, lng = 34.9120554) {
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
                gCurrLoc = {lat: e.latLng.lat(), lng: e.latLng.lng()}
                locService.addPlace({lat: e.latLng.lat(), lng: e.latLng.lng()},cb)
                cb(gCurrLoc);
                
                //placeMarkerAndPanTo(e.latLng, map);
            });
        })
}

function addPlace(lat, lng) {
    var name = prompt('enter the place name')
    if (!name) return
    locService.saveAddPlace(lat, lng, name)
    renderPlaceTbale()
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
    debugger
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