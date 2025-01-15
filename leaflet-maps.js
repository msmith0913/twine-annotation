let leafletMap = null;

function displayStickyMap(lat, long, zoom) {
  if (!leafletMap) {
    createStickyMap(lat, long, zoom);
  } else {
    moveStickyMapLocation(lat, long, zoom);
  }
}

function moveStickyMapLocation(lat, long, zoom) {
  const options = {
    duration: 1.5, // Duration of the animation in seconds
    easeLinearity: 0.1, // How "smooth" the flyTo animation is
    noMoveStart: false, // Whether to trigger movestart event
  };
  leafletMap.flyTo([lat, long], zoom, options);
}

function createStickyMap(lat, long, zoom) {
  leafletMap = L.map("sticky-map").setView([lat, long], zoom);
  let tiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(leafletMap);

  leafletMap.scrollWheelZoom.disable();
}
