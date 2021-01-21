const select = document.querySelector("#denomination");
const geoSearchBtn = document.querySelector("#geoSearch");
const detailDiv = document.querySelector("#details");
const list = document.querySelector("ol");

function initAutocomplete() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 40.758611, lng: -73.976389 },
    zoom: 15,
  });
  
  const inputBtn = document.querySelector("#inputSearch");
  const input = document.getElementById("pac-input");
  const searchBox = new google.maps.places.SearchBox(input);


  map.addListener("bounds_changed", () => {
    searchBox.setBounds(map.getBounds());
  });

function inputSearch() {
  const places = searchBox.getPlaces();

  if (places.length == 0) {
    return;
  }
  const bounds = new google.maps.LatLngBounds();

    let lat = places[0].geometry.location.lat();
    let lon = places[0].geometry.location.lng();
    search(lat, lon);
}

  searchBox.addListener("places_changed", inputSearch);
  inputBtn.addEventListener("click", inputSearch)
}


function search(lat, lon) {
  detailDiv.innerHTML = "Gimme a sec here...";
  list.innerHTML = "";
  let searchValue = select.value;
  if (searchValue === "") {
    alert("You need to pick a religion/denomination to continue.");
    return;
  }

  let request = {
    location: new google.maps.LatLng(lat, lon),
    keyword: searchValue,
    rankBy: google.maps.places.RankBy.DISTANCE,
  };
  map = new google.maps.Map(document.getElementById("map"), {
    center: request.location,
    zoom: 15,
  });

  let service = new google.maps.places.PlacesService(map);

  infowindow = new google.maps.InfoWindow();

  service.nearbySearch(request, function (results, status) {
    if (status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
      alert("Unfortunately, I was unable to find any results. Sorry.");
      detailDiv.innerHTML = `NO RESULTS FOUND`;
    } else if (status === google.maps.places.PlacesServiceStatus.OK) {
      console.log(results);
      for (let i = 0; i < results.length; i++) {
        createMarker(results[i], (i + 1).toString());
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
}

function createMarker(place, index) {
  const marker = new google.maps.Marker({
    map,
    position: place.geometry.location,
    label: index,
  });
  google.maps.event.addListener(marker, "click", () => {
    infowindow.setContent(place.name);
    infowindow.open(map);
  });
}

function searchByGeolocation() {
  navigator.geolocation.getCurrentPosition((pos) => {
    let lat = pos.coords.latitude;
    let lon = pos.coords.longitude;
    search(lat, lon);
  });
}

geoSearchBtn.addEventListener("click", searchByGeolocation);
