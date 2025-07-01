mapboxgl.accessToken = 'pk.eyJ1IjoibS1sYWIiLCJhIjoiY2xsdmN2NXBuMTl1ZDNmcGh1ZmxmaGwzcSJ9.3xXvAS4T6tZoahEeevGa4A';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/dark-v10',
  center: [5,17],
  zoom: 1.2
});

var url = 'https://locate.measurementlab.net/v2/siteinfo/registrations?format=geo&exp=ndt';

map.on('load', function () {

  const tenG = ['==', ['get','uplink'], '10g'];
  const oneG = ['==', ['get','uplink'], '1g'];

  map.addSource("mlab-sites", {
    type: "geojson",
    data: url,
    cluster: true,
    clusterRadius: 1,
    clusterProperties: {
      'oneG': ['+', ['case', oneG, 1, 0]],
      'tenG': ['+', ['case', tenG, 1, 0]],
    }
  });
  map.addLayer({
    "id": "clusters",
    "type": "circle",
    "source": "mlab-sites",
    "filter": ["has", "point_count"],
    "paint": {
      "circle-radius": [
        "step",
        ["get", "point_count"],
        7,     /* lt 3 -> 7 */
        3, 11, /* gte 3 -> 11 */
        6, 15, /* gte 6 -> 15 */
      ],
      "circle-color": [
        "step",
          ["get","point_count"],
          "#deebf7",
          3, "#9ecae1",
          6, "#3182bd"
      ]}
  });
  map.addLayer({
    "id": "cluster-count",
    "type": "symbol",
    "source": "mlab-sites",
    "filter": ["has", "point_count"],
    "layout": {
      "text-field": "{point_count_abbreviated}",
      "text-font": ["DIN Offc Pro Medium",
        "Arial Unicode MS Bold"],
        "text-size": 12
    }
  });
  map.addLayer({
    "id": "unclustered-point",
    "type": "circle",
    "source": "mlab-sites",
    "filter": ["!", ["has", "point_count"]],
    "paint": {
      "circle-radius": 7,
      "circle-color": "#deebf7",
      "circle-stroke-width": 0
    }
  });
  map.addLayer({
    "id": "unclustered-count",
    "type": "symbol",
    "source": "mlab-sites",
    "filter": ["!", ["has", "point_count"]],
    "layout": {
      "text-field": "1",
      "text-font": ["DIN Offc Pro Medium",
        "Arial Unicode MS Bold"],
        "text-size": 12
    }
  });

  var clusterPopup = new mapboxgl.Popup({
    className: 'cluster-popup'
  });
  var pointPopup = new mapboxgl.Popup({
    className: 'point-popup'
  });

  map.on('click','clusters', function(e) {
    var features = map.queryRenderedFeatures(e.point, { layers: ['clusters'] });
    var clusterId = features[0].properties.cluster_id,
    point_count = features[0].properties.point_count,
    clusterSource = map.getSource('mlab-sites');
    clusterNodes = clusterSource.getClusterLeaves(clusterId, point_count, 0, function(err, aFeatures){
      var desc = "";
      for (c=0; c < aFeatures.length; c++) {
        desc += "<div class='pod-popup'><h4>"+aFeatures[c].properties.machine+"</h4><br>"+
          "Org: "+aFeatures[c].properties.org+"<br>"+
          "Type: "+aFeatures[c].properties.type+"<br>"+
          "Uplink: "+aFeatures[c].properties.uplink+"</div>";
      }
      var coordinates = e.lngLat;
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }
      clusterPopup.setLngLat(coordinates).setHTML(desc).addTo(map);
    });
  });

  map.on('click','unclustered-point', function(e) {
    var coordinates = e.features[0].geometry.coordinates.slice();
    var description = "<div class='pod-popup'><h4>"+aFeatures[c].properties.machine+"</h4><br>"+
      "Org: "+aFeatures[c].properties.org+"<br>"+
      "Type: "+aFeatures[c].properties.type+"<br>"+
      "Uplink: "+aFeatures[c].properties.uplink+"</div>";

    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }
    pointPopup.setLngLat(coordinates).setHTML(description).addTo(map);
  });

  map.on('mouseenter','clusters', function (e) {
    map.getCanvas().style.cursor = 'pointer';
  });
  map.on('mouseleave','clusters', function () {
    map.getCanvas().style.cursor = '';
  });
  map.on('mouseenter','unclustered-point', function (e) {
    map.getCanvas().style.cursor = 'pointer';
  });
  map.on('mouseleave','unclustered-point', function () {
    map.getCanvas().style.cursor = '';
  });
});
