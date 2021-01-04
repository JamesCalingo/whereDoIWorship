const detailDiv = document.querySelector("#details")
const select = document.querySelector("#denomination")
const button = document.querySelector("#search")

let map;
let service;
let infowindow;

function initMap() {
  let searchValue = select.value
  let defaultLocation = new google.maps.LatLng(40.758611, -73.976389);

  infowindow = new google.maps.InfoWindow();

  map = new google.maps.Map(
      document.getElementById('map'), {center: defaultLocation, zoom: 15});

  let request = {
    query: searchValue,
    fields: ['name', 'geometry', 'formatted_address'],
  };

  let service = new google.maps.places.PlacesService(map);

  service.findPlaceFromQuery(request, function(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      console.log(results)
      for (let i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
      map.setCenter(results[0].geometry.location);

      detailDiv.innerHTML = `
      I found this:<br>
      ${results[0].name}<br>
      ${results[0].formatted_address}
      `
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

button.addEventListener("click", initMap)