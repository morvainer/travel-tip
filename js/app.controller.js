import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

window.onload = onInit;
window.onAddMarker = onAddMarker;
window.onPanTo = onPanTo;
window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;
console.log('hi');
function onInit() {
    mapService.initMap()
        .then(() => {
            console.log('Map is ready');
        })
        .catch(() => console.log('Error: cannot init map'));
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos');
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function onAddMarker() {
    console.log('Adding a marker');
    mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
}

function onGetLocs() {
    locService.getLocs()
        .then(locs => {
            console.log('Locations:', locs)
            document.querySelector('.locs').innerText = JSON.stringify(locs)
        })
}

function onGetUserPos() {
    getPosition()
        .then(pos => {
            debugger
            console.log(pos);
            initMap(pos.coords.latitude, pos.coords.longitude);


            //console.log('User position is:', pos.coords);
            //document.querySelector('.user-pos').innerText =
            //    `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
        })
        .catch(err => {
            var locationError = document.getElementById("locationError");
            switch (err.code) {
                case 0:
                    locationError.innerHTML = "There was an error while retrieving your location: " + error.message;
                    break;
                case 1:
                    locationError.innerHTML = "The user didn't allow this page to retrieve a location.";
                    break;
                case 2:
                    locationError.innerHTML = "The browser was unable to determine your location: " + error.message;
                    break;
                case 3:
                    locationError.innerHTML = "The browser timed out before retrieving the location.";
                    break;
            }
        })
}
function onPanTo() {
    console.log('Panning the Map');
    mapService.panTo(35.6895, 139.6917);
}



function initMap(lat, lng) {
    renderPlaceTbale()
    console.log('lat', lat);
    console.log('lng', lng);
    var elMap = document.querySelector('#map');
    var options = {
        center: { lat, lng },
        zoom: 15
    };

    const map = new google.maps.Map(
        elMap,
        options
    )

    new google.maps.Marker({
        position: { lat, lng },
        map,
        title: 'Hello World!'
    });


    map.addListener("click", (e) => {
        console.log();
        console.log();
        debugger
        onAddPlace(e.latLng.lat(), e.latLng.lng())
        placeMarkerAndPanTo(e.latLng, map);
    });

    map.addListener("click", (mapsMouseEvent) => {
        console.log(mapsMouseEvent.latLng);
    });

}



function renderPlaceTbale() {
    var gPlace = getPlaceTbale()
    var strHTMLs = ''
    strHTMLs += gPlace.map(place => {
        return `<tr>
        <td>${place.name}</td>
        <td>${place.lat}</td>
        <td>${place.lng}</td>
        <td onClick="onRemovePlace(${place.id})"><img src='img/close.png'></td>
        </tr>
`
    }).join('')
    document.querySelector('tbody').innerHTML = strHTMLs

}
