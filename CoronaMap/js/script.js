// FETCHUNG DATA FROM API
function updateMap()
{
    fetch("./data/dataset.json")
    .then(response => response.json())
    .then(rsp => {
        rsp.forEach(data => {
            // console.log(element.country + " ====> " + element.status)

            // SETTING DATA TO VARIABLE
            var id = data.id
            var country = data.country
            var status = data.status
            var coordinates = [data.long, data.lat]

            // CREATING CUSTOM MARKERS
            customMarkers(country, status, coordinates)
        })
    })
}

function customMarkers(country, status, coordinates)
{
    // SETTING IMAGE ELEMENT FOR MARKER
    var el = document.createElement('IMG');
    el.setAttribute('class', 'marker');
    el.setAttribute('width', '20');
    el.setAttribute('height', '20');
    el.setAttribute('alt', 'Custom Image Markers');
    el.setAttribute('data-name', country);
    el.setAttribute('data-status', status);
    el.setAttribute('data-coordinates', coordinates);

    // RETURNING ELEMENT ON CLICK
    el.setAttribute('onclick', "popUps(this);");

    if (status == "infected") {
        el.setAttribute('src', './icons/virus.svg');
    } else {
        el.setAttribute('src', './icons/no-virus.svg');
    }

    // CREATING MARKER FROM THE ELEMENT AND ADDING TO MAP
    new mapboxgl.Marker(el)
    .setLngLat(coordinates)
    .addTo(map);

}

// CREATING PUPOPS FOR MARKERS
function popUps(element)
{
    // FETCHING DIV FROM DOM TO SHOW INFORMATION
    var info_popup_div = document.getElementById('info-popup');

    var country = element.getAttribute('data-name');
    var status = element.getAttribute('data-status');
    var coordinates = element.getAttribute('data-coordinates');

    // CONVERTING COORDINATES TO TUPLE
    coordinates = coordinates.split(',');

    // CREATING INFO POPUP FOR CLICKED MARKER
    info = `<span>${country}</span><br />`+
            `<span class="${status == 'infected' ? 'red' : 'green'}">${status == 'infected' ? 'Infected' : 'Not-Infected Yet'}</span>`;
    info_popup_div.style.display = 'block';
    info_popup_div.innerHTML = info;

    // HIDING POPUP AFTER DELAY
    setTimeout(function () {
        info_popup_div.style.display='none';
    }, 5000);
}

updateMap()
