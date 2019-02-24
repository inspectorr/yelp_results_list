'use strict';

document.forms.search.addEventListener('submit', (event) => {
    event.preventDefault();
    const query = document.forms.search.query.value;
    const lat = document.forms.search.latitude.value;
    const lng = document.forms.search.longitude.value;
    search(query, {lat, lng}).then((result) => display(result));
});

function display(result) {
    console.dir(result);

    const disp = document.getElementById('display');
    disp.innerHTML = '';

    const h = document.createElement('h4');
    h.textContent = `Total found: ${result.total}`;
    disp.append(h);

    result.businesses.forEach((item) => {
        let p = document.createElement('p');
        p.textContent = item.name;
        disp.append(p);
    });
}

function search(term, location) {
    const promise = new Promise(function(resolve, reject) {
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        const targetUrl = `https://api.yelp.com/v3/businesses/search?term=${term}&latitude=${location.lat}&longitude=${location.lng}`;

        let result;

        fetch(proxyUrl + targetUrl, {
            method: 'GET',
            headers: {
                "Authorization": "Bearer TKnHblfy-eTZXnfF2mvWQeuwBm2JQWvFBAcUN9_ayHedr_jPlutVyQt_YQ6TBHFs9YhvNTH5BIPDHyPT8LgsdnB0urArp6OZGlVYI4aoEzPnpZ-moxCHcQe-heRxXHYx",
                "Content-Type": "text/plain"
            },
            mode: 'cors',
        })
        .then((res) => res.json().then((text) => result = text))
        .then(() => resolve(result))
        .catch(alert);
    });

    return promise;
}
