let leafletMap = null;

function displayStickyMap(lat, long, zoom) {
  if (!leafletMap) {
    createStickyMap(lat, long, zoom);
  } else {
    moveStickyMapLocation(lat, long, zoom);
  }
  leafletMap.invalidateSize();
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
  console.log(`Creating map at ${lat}, ${long} zoom ${zoom}`);
  leafletMap = L.map("sticky-map-container").setView([lat, long], zoom);
  let tiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(leafletMap);

  leafletMap.scrollWheelZoom.disable();
}

// Add event listener to handle display changes
const mapContainer = document.getElementById("sticky-map-container");
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.attributeName === "style") {
      const display = window.getComputedStyle(mapContainer).display;
      if (display !== "none") {
        leafletMap.invalidateSize();
      }
    }
  });
});
