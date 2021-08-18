import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

window.onload = onInit;
window.onAddMarker = onAddMarker;
window.onPanTo = onPanTo;
window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;
window.onDeletePos = onDeletePos;
console.log('hi');

function onInit() {
    //debugger
    mapService.initMap(renderPosList)
        .then(() => {
            console.log('Map is ready');
        })
        .catch(() => console.log('Error: cannot init map'));
}


function renderCurrLoc(loc) {
    console.log(loc);
    document.querySelector('.loc-name span').innerHTML = loc
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
            // debugger
            console.log(pos);
            mapService.initMap(renderPosList ,pos.coords.latitude, pos.coords.longitude);
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
    debugger
    let keySearch =document.querySelector("[name='search-box']").value
    mapService.getUserChosenPos(keySearch)
        .then((res) => mapService.panTo(res.lat, res.lng)
        )
}


// function renderPlaceTable(currLoc) {
//     var gPlace = getPlaceTbale()
//     var strHTMLs = ''
//     strHTMLs += gPlace.map(place => {
//         return `<tr>
//         <td>${place.name}</td>
//         <td>${place.lat}</td>
//         <td>${place.lng}</td>
//         <td onClick="onRemovePlace(${place.id})"><img src='img/close.png'></td>
//         </tr>
// `
//     }).join('')
//     document.querySelector('tbody').innerHTML = strHTMLs

// }

function onDeletePos(placeId) {
    deletePos(placeId);
    renderPosTable();

}
function renderPosTable(){
    var places = getPlaces();
    console.log('place is:', places);
    var strHtmls = places.map(function (place) {
        var strHtml = `<tr>
        <td>${place.name}</td>
        <td>${place.lat}</td>
        <td>${place.lng}</td>
        <td><button onclick="onDeletePos(${place.id})"> delete </button></td>
        </tr>`
       //  ${currLoc.id}
           var elPosTableBody = document.querySelector('.position-table-body');
        //    elPosTableBody.innerHTML = strHtml;
           elPosTableBody.innerHTML = strHtmls.join('');
           });

}
function renderPosList(currLoc) {
    //gets an object with position
    console.log('rendering');
    // var places = loadFromStorage(PLACES_KEY);
    // console.log('place is:', places);
    // var strHtmls = places.map(function (place) {
    var strHtml = `<tr>
 <td>${currLoc.name}</td>
 <td>${currLoc.lat}</td>
 <td>${currLoc.lng}</td>
 <td><button onclick="onDeletePos(${currLoc.id})"> delete </button></td>
 </tr>`
//  ${currLoc.id}
    var elPosTableBody = document.querySelector('.position-table-body');
    elPosTableBody.innerHTML += strHtml;
    // });
    // elPosTableBody.innerHTML = strHtmls.join('');
}