// FETCHUNG DATA FROM API
function updateMap()
{
    fetch("./data/data.json")
    .then(response => response.json())
    .then(rsp => {
        // console.log(rsp.data)
        rsp.data.forEach(element => {
            id = element.id,
            infected = element.infected,
            recovered = element.recovered

            console.log(infected)
        })
    })
}

updateMap()


// LOADING MAP TO SERVE RESULTS
mapboxgl.accessToken = 'pk.eyJ1IjoiYXpsYWFuNCIsImEiOiJjazhhZGh1dngwZ3FzM2RvMWx0d2h2cDRvIn0.-QPY6ON5kK4IcpSpgZYE1w';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10',
    zoom: 1,
    center: [0,40]
});

// ADDING MARKER TO THE MAP
var marker = new mapboxgl.Marker({
        draggable: true,
        color: "rgb(255, 0, 0)"
    })
    .setLngLat([70, 30]) //([LONGITUDE, LATITUDE])
    .addTo(map);

// GETTING MARKER CO-ORDINATES AFTER DRAGGING
function onDragEnd() {
    var lngLat = marker.getLngLat();
    coordinates.style.display = 'block';
    coordinates.innerHTML =
    'Longitude: ' + lngLat.lng + '<br />Latitude: ' + lngLat.lat;
    }
        
    marker.on('dragend', onDragEnd);