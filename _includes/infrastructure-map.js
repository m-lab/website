<script>
mapboxgl.accessToken = 'pk.eyJ1IjoibS1sYWIiLCJhIjoiY2p3eWtxOXZ4MDFkMzQ5cG95ODFhbWJieiJ9.9G1YGnkme4goR0Ly3kqovA';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/dark-v10',
  center: [12,25],
  zoom: 0.8
});

var url = 'https://siteinfo.mlab-oti.measurementlab.net/v1/sites/geo.json';

map.on('load', function () {

  const tenG = ['==', ['get','uplink'], '10g'];
  const oneG = ['==', ['get','uplink'], '1g'];

  map.addSource("mlab-sites", {
    type: "geojson",
    data: url,
    cluster: true,
    clusterRadius: 10,
    clusterMaxZoom: 15,
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
        5,
        2,
        10,
        6,
        15
      ],
      "circle-color": [
        "step",
          ["get","point_count"],
          "#deebf7",
          2,
          "#9ecae1",
          6,
          "#3182bd"
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
      "circle-radius": 5,
      "circle-color": "#deebf7",
      "circle-stroke-width": 1,
      "circle-stroke-color": "#000"
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
        desc += "<div class='pod-popup'><h4>"+aFeatures[c].properties.city+" - "+
          aFeatures[c].properties.name+" - "+aFeatures[c].properties.uplink+"</h4>"+
          aFeatures[c].properties.provider + " ("+aFeatures[c].properties.asn+")<br>"+
          "IPv4 Prefix: "+aFeatures[c].properties.ipv4_prefix;
        if (aFeatures[c].properties.ipv6_prefix != null) {
          desc += "<br>IPv6 Prefix: "+aFeatures[c].properties.ipv6_prefix;
        }
        desc += "</div>";
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
    var description = "<h4>" + e.features[0].properties.city + " - " +
      e.features[0].properties.name + " - "+ e.features[0].properties.uplink +"</h4>" +
      e.features[0].properties.provider + " ("+e.features[0].properties.asn + ")<br>" +
      "IPv4 Prefix: " + e.features[0].properties.ipv4_prefix;
      if (e.features[0].properties.ipv6_prefix != null ) {
        description += "<br>IPv6 Prefix: " + e.features[0].properties.ipv6_prefix;
      }

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
</script>