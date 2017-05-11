var ourCoords = {
    latitude: 37.383116,
    longitude: -121.971931
};

var options = {
    enableHighAccuracy: true,
    timeout:300000,
    maximumAge:200
};

var map;
var watchId;

window.onload   =   getMyLocation;

function getMyLocation()
{
    if(navigator.geolocation)
    {
        var watchButon              =   document.getElementById('watch');
        watchButon.onclick          =   watchLocation;

        var clearWatchButton        =   document.getElementById('clearWatch');
        clearWatchButton.onclick    =   clearWatch;
    }
    else
    {
        alert('sorry, there is no geolocation support');
    }
};

function clearWatch()
{
    if(watchId){
        navigator.geolocation.clearWatch(watchId);
        watchId =   null;
        document.getElementById('wrapperContent').className   =   'hide';
        alert('You are no longer being watched!');
    }
    else
    {
        alert('You are not being watched!');
    }
};

function watchLocation()
{
    watchId =   navigator.geolocation.watchPosition(displayLocation, displayError, options)
};

function displayLocation(position) {
    var lat             =   position.coords.latitude;
    var lng             =   position.coords.longitude;
    var div             =   document.getElementById('location');
    div.innerHTML       =   'You are at lat ' + lat + ' and lng ' + lng;

    var km              =   computeDistance(position.coords, ourCoords);
    var distance        =   document.getElementById("distance");
    distance.innerHTML  =   "You are " +km+ " km from UCSC Extension";
    div.innerHTML       +=  "<b> Accuracy : </b> (with " + position.coords.accuracy+ " meters accuracy)";

    showMap(position.coords);
};

function displayError(error) {
    var div = document.getElementById("error");

    switch(error.code) {
        case error.PERMISSION_DENIED:
            div.innerHTML = "Permission denied by user";
            break;
        case error.POSITION_UNAVAILABLE:
            div.innerHTML = "Position is not available";
            break;
        case error.TIMEOUT:
            div.innerHTML = "Request timed out";
            break;
        case error.UNKNOWN_ERROR:
            div.innerHTML = "Unknown error.";
            break;
    }
};

// Calculating Distance:
function computeDistance(startCoords, destCoords)
{
    var startLatRads    =   degreesToRadians(startCoords.latitude);
    var startLongRads   =   degreesToRadians(startCoords.longitude);
    var destLatRads     =   degreesToRadians(destCoords.latitude);
    var destLongRads    =   degreesToRadians(destCoords.longitude);
    var Radius          =   6371;

    // radius of the earth in km
    var distance = Math.acos(Math.sin(startLatRads) * Math.sin(destLatRads) + Math.cos(startLatRads) * Math.cos(destLatRads) * Math.cos(startLongRads-destLongRads)) * Radius;
    return distance;
};

function degreesToRadians(degrees) {
    var radians = (degrees * Math.PI)/180;
    return radians;
};

function showMap(coords) {
    var geocoder = new google.maps.Geocoder();
    document.getElementById('wrapperContent').className   =   '';
    var googleLatAndLong    =   new google.maps.LatLng(coords.latitude, coords.longitude);
    var mapOptions          =   {
        zoom: 15,
        center: googleLatAndLong,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var mapDiv              =   document.getElementById("map");
    map                     =   new google.maps.Map(mapDiv, mapOptions);

    geocoder.geocode({'latLng': googleLatAndLong}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            if (results[1]) {
                for (var i=0; i<results[0].address_components.length; i++) {
                    for (var b=0;b<results[0].address_components[i].types.length;b++) {
                        if (results[0].address_components[i].types[b] == "administrative_area_level_1") {
                            city= results[0].address_components[i];
                            break;
                        }
                    }
                }
                var div             =   document.getElementById('city');
                div.innerHTML       =   'You are at '+ results[0].formatted_address;
            } else {
                alert("No results found");
            }
        } else {
            alert("Geocoder failed due to: " + status);
        }
    });

    // add marker
    var title               =   "Your Location";
    var content             =   "Your are here with latitide " + coords.latitude + " and longitude " + coords.longitude;
    addMarker(map, googleLatAndLong, title, content);
};

function addMarker(map, latlong, title, content) {
    var markerOptions   =   {
        position: latlong,
        map: map,
        title: title,
        clickable: true
    };
    var marker          =   new google.maps.Marker(markerOptions);

    var infoWindowOptions   =   {
        content: content,
        position: latlong
    };
    var infoWindow          =   new google.maps.InfoWindow(infoWindowOptions);

    google.maps.event.addListener(marker, "click", function() {
        infoWindow.open(map);
    });
};