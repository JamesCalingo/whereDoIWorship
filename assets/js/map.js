const detailDiv = document.querySelector("#details")
const select = document.querySelector("#denomination")
const button = document.querySelector("#search")
const locationInput = document.querySelector("#locationInput")

let map;
let service;
let infowindow;

function initMap() {
  
  let defaultLocation = new google.maps.LatLng(40.758611, -73.976389);

  infowindow = new google.maps.InfoWindow();

  map = new google.maps.Map(
      document.getElementById('map'), {center: defaultLocation, zoom: 15});

  
}

function search () {
  let searchValue = select.value
  console.log(searchValue)
  let locationValue = locationInput.value
  let request = {
    location: new google.maps.LatLng(40.758611, -73.976389),
    type: searchValue,
  
    radius: 10000
  };

  let service = new google.maps.places.PlacesService(map);

  service.nearbySearch(request, function(results, status) {
    if(!searchValue) return
    else if (status === google.maps.places.PlacesServiceStatus.OK) {
      console.log(results)
      for (let i = 0; i < results.length; i++) {
        createMarker(results[i]);
        detailDiv.innerHTML = `
        I found this:<br>
        ${results[i].name}<br>
        ${results[i].vicinity}
        `
      }
      map.setCenter(results[0].geometry.location);

   
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

button.addEventListener("click", search)