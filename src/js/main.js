// Initialize the map and set its view
var map = L.map('map').setView([45.2, 4.8], 8); // Centered on the Rhône region in France

// Add a tile layer (the base map)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Fetch and add the GeoJSON data to the map
fetch('src/src/data/RhoneValley.geojson')
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            style: function(feature) {
                return {
                    color: "#800000", // Dark red color for the borders
                    weight: 2,
                    fillOpacity: 0.5
                };
            },
            onEachFeature: function(feature, layer) {
                // Bind a popup to display the name of each wine region
                layer.bindPopup(`<strong>${feature.properties.name}</strong>`);

                // Optional: Open the popup when hovering over a region
                layer.on('mouseover', function(e) {
                    layer.openPopup();
                });
                layer.on('mouseout', function(e) {
                    layer.closePopup();
                });
            }
        }).addTo(map);
    })
    .catch(error => console.error('Error loading GeoJSON data:', error));
