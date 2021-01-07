const select = document.querySelector("#denomination");
const button = document.querySelector("#search");
const locationInput = document.querySelector("#locationInput");
const detailDiv = document.querySelector("#details");
const list = document.querySelector("ol");

let map;
let service;
let infowindow;

function initMap() {
  let defaultLocation = new google.maps.LatLng(40.758611, -73.976389);

  infowindow = new google.maps.InfoWindow();

  map = new google.maps.Map(document.getElementById("map"), {
    center: defaultLocation,
    zoom: 15,
  });
}

function useAutoComplete () {
  const autocomplete = new google.maps.places.Autocomplete(locationInput);
}

function search() {
  let searchValue = select.value;
  let locationValue = locationInput.value || "New York City";

  let request = {
    location: new google.maps.LatLng(40.758611, -73.976389),
    type: searchValue,
    radius: 10000,
  };

  map = new google.maps.Map(document.getElementById("map"), {
    center: request.location,
    zoom: 15,
  });

  let service = new google.maps.places.PlacesService(map);

  service.nearbySearch(request, function (results, status) {
    if (!searchValue || !locationValue) return;
    else if (status === google.maps.places.PlacesServiceStatus.OK) {
      console.log(results);
      for (let i = 0; i < results.length; i++) {
        createMarker(results[i]);
        detailDiv.innerHTML = `
        Here's what I found, sorted by distance. Hope this helps!
        `;
        let li = document.createElement("li");
        li.innerHTML = `<b>${results[i].name}</b><br>
       ${results[i].vicinity}
       `;
        list.appendChild(li);
      }
      // map.setCenter(results[0].geometry.location);
    }
  });
}

function createMarker(place) {
  const marker = new google.maps.Marker({
    map,
    position: place.geometry.location,
  });
  google.maps.event.addListener(marker, "click", () => {
    infowindow.setContent(place.name);
    infowindow.open(map);
  });
}

button.addEventListener("click", search);
locationInput.addEventListener("change", useAutoComplete)
