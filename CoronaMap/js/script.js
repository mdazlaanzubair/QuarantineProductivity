// FETCHUNG DATA FROM API
function updateMap()
{
    fetch("./data/dataset.json")
    .then(response => response.json())
    .then(rsp => {
        rsp.forEach(data => {
            // PASSING JSON DATA TO THE FUNCTION
            customMarkers(data)
        })
    })
}

function customMarkers(data)
{
    if(data.long > 0 && data.lat > 0)
    {
        // SETTING IMAGE ELEMENT FOR MARKER
        var el = document.createElement('IMG');
        el.setAttribute('class', 'marker');
        el.setAttribute('width', '20');
        el.setAttribute('height', '20');
        el.setAttribute('alt', 'Custom Image Markers');

        // SETTING MARKER IMAGE TO DISPLAY (CUSTOM MARKER)
        el.setAttribute('src', './icons/virus.svg');

        // RETURNING ELEMENT ON CLICK
        el.setAttribute('onclick', `popUps(${JSON.stringify(data)});`);

        // CREATING MARKER FROM THE ELEMENT AND ADDING TO MAP
        new mapboxgl.Marker(el)
        .setLngLat([data.long, data.lat])
        .addTo(map);
    }

}

// CREATING PUPOPS FOR MARKERS
function popUps(data)
{
    // FETCHING DIV FROM DOM TO SHOW INFORMATION
    var info_popup_div = document.getElementById('info-popup');

    // HIDING OLD DIV BEFORE CREATING NEW ONE
    info_popup_div.style.display='none';

    console.log(data)

    // CREATING INFO POPUP FOR CLICKED MARKER
    info = 
            `<h3 class="text-warning">Latest Update</h3> <br />` +
            `<ul>` +
                `<h5>Country: <span class="text-primary">${(data.country === null || "") ? "NA" : data.country}</span></h5>` +
                `<h5>1<sup>st</sup>: <span class="text-success">${(data.first_case_reported === null) ? "0" : data.first_case_reported}</span></h5>` +
                
                `<h5>Active Cases: <span class="text-info">${(data.active_cases === null) ? "0" : data.active_cases}</span></h5>` +
                `<h5>Serious Cases: <span class="text-info">${(data.critical_cases === null) ? "0" : data.critical_cases}</span></h5>` +

                `<h5>New Cases: <span class="text-info">${(data.new_cases === null) ? "0" : data.new_cases}</span></h5>` +
                `<h5>New Deaths: <span class="text-info">${(data.new_deaths === null) ? "0" : data.new_deaths}</span></h5>` +

                `<h5>Total Recovered: <span class="text-info">${(data.total_recovered === null) ? "0" : data.total_recovered}</span></h5>` +
                `<h5>Total Deaths: <span class="text-info">${(data.total_deaths === null) ? "0" : data.total_deaths}</span></h5>` +
                `<h5>Total Cases: <span class="text-info">${(data.total_cases === null) ? "0" : data.total_cases}</span></h5>` +
                `<h5>Status: <span class="text-danger">Infected</span></h5>` +
            `</ul>` 
    info_popup_div.style.display = 'block';
    info_popup_div.innerHTML = info;

    // HIDING POPUP AFTER DELAY
    setTimeout(function () {
        info_popup_div.style.display='none';
    }, 8000);
}

updateMap()
