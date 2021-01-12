const select = document.querySelector("#denomination");
const button = document.querySelector("#search");
// const locationInput = document.querySelector("#locationInput");
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

function useAutoComplete() {
  const autocomplete = new google.maps.places.Autocomplete(locationInput);
}

function search() {
  list.innerHTML = "";
  console.log(select)
  let searchValue = select.value;
  // let locationValue = locationInput.value || "New York City";

  let request;

  navigator.geolocation.getCurrentPosition((pos) => {
    let lat = pos.coords.latitude;
    let lon = pos.coords.longitude;
    request = {
      location: new google.maps.LatLng(lat, lon),
      keyword: searchValue,
      rankBy: google.maps.places.RankBy.DISTANCE,
    };
    map = new google.maps.Map(document.getElementById("map"), {
      center: request.location,
      zoom: 15,
    });

    let service = new google.maps.places.PlacesService(map);

    console.log(request);
    service.nearbySearch(request, function (results, status) {
      console.log(status);
      if (!searchValue) return;
      else if (status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
        alert("Unfortunately, I was unable to find any results. Sorry.");
      } else if (status === google.maps.places.PlacesServiceStatus.OK) {
        console.log(results);
        for (let i = 0; i < results.length; i++) {
          createMarker(results[i]);
          detailDiv.innerHTML = `
        Here are some places that I found near you. Hope this helps!
        `;
          let li = document.createElement("li");
          li.innerHTML = `<b>${results[i].name}</b><br>
       ${results[i].vicinity}
       `;
          list.appendChild(li);
        }
      }
    });
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
// locationInput.addEventListener("change", useAutoComplete)
