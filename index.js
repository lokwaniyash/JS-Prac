// Initialize Component
const container = document.getElementById("map");
if (container) {
  var map = L.map("map").setView([26.912434, 75.78727], 13);

  var tiles = L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",
    {
      maxZoom: 18,
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      id: "mapbox/streets-v11",
      tileSize: 512,
      zoomOffset: -1,
    }
  ).addTo(map);
}

// Submit Button

function submit() {
  let texts = document.getElementById("addr").value;
  texts = texts.split(",");
  console.log(texts);

  // ICON DECLARATIONS
  var greenIcon = new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  var redIcon = new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  var blueIcon = new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  var yellowIcon = new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  texts.forEach((value, index) => {
    let res = makeRequest(
      "GET",
      `https://api.traveltimeapp.com/v4/geocoding/search?query=${value}&limit=1`
    ).then((r) => {
      let response = JSON.parse(r);
      let coords = response.features[0].geometry.coordinates;
      console.log(coords);

      let iconToShow = yellowIcon;
      if (index == 0) iconToShow = blueIcon;
      else if (index == 1) iconToShow = greenIcon;
      else if (index == 2) iconToShow = redIcon;
      let marker = L.marker([coords[1], coords[0]], {
        icon: iconToShow,
      }).addTo(map);
      console.log(marker);
      // var map = L.map('map').setView([26.912434, 75.787270], 13);
    });
  });

  // console.log(res);
}

// API Request

function makeRequest(method, url) {
  return new Promise(function (resolve, reject) {
    let xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Accept-Language", "en-US");
    xhr.setRequestHeader("X-Application-Id", "ddd3dd50");
    xhr.setRequestHeader("X-Api-Key", "eab471cb56bc3b65d980c48015ad48b5");
    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        resolve(xhr.response);
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText,
        });
      }
    };
    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.statusText,
      });
    };
    xhr.send();
  });
}
