---
layout: page
permalink: /status2/
title: "M-Lab Platform Status"
audience: statusmap
breadcrumb: data
---

# M-Lab Platform Status

M-Lab places server infrastructure for conductingt tests in diverse location around the world. Typically we seek hosting in well connected data centers where ISPs interconnect with one another. Each M-Lab "pod" consists of 3-4 servers and one switch, connected directly to an upstream provider. In large metro areas, we attempt to place multiple pods to obtain diversity in transit and routes.

## Infrastructure Map
<p>
<div id="map" class="map leaflet-container" style="height: 500px; width:100%; position:relative;"></div>
</p>
<script>
mapboxgl.accessToken = 'pk.eyJ1IjoibS1sYWIiLCJhIjoiY2p3eWtxOXZ4MDFkMzQ5cG95ODFhbWJieiJ9.9G1YGnkme4goR0Ly3kqovA';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/dark-v10',
  center: [12,25],
  zoom: 0.8
});

var url = '{{ site.baseurl }}/static/sitegeo.json';

map.on('load', function () {
  window.setInterval(function() {
    map.getSource('mlab-sites').setData(url);
  }, 43200000);

  map.addSource("mlab-sites", {
    type: "geojson",
    data: url,
    cluster: true,
    clusterMaxZoom: 25
  });
  map.addLayer({
    "id": "mlab-sites",
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
          "#fdffc2",
          2,
          "#c2ffc4",
          6,
          "#f7c2ff"
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
      "circle-color": "#c2edff",
      "circle-stroke-width": 1,
      "circle-stroke-color": "#000"
    }
  });

  map.on('click','mlab-sites', function(e) {
    var features = map.queryRenderedFeatures(e.features[0].geometry.coordinates.slice(), { layers: ['mlab-sites'] });
    var clusterId = features[0].properties.clusterId;
    map.getSource('mlab-sites').getClusterExpansionZoom(clusterId, function (err, zoom) {
        if (err)
          return;

        map.easeTo({
          center: features[0].geometry.coordinates,
          zoom: zoom
        });
    });
  });

  map.on('mouseenter','mlab-sites', function () {
    map.getCanvas().style.cursor = 'pointer';
  });
  map.on('mouseleave','mlab-sites', function () {
    map.getCanvas().style.cursor = '';
  });
});
</script>

## M-Lab Naming Service

M-Lab Naming Service (mlab-ns) is a distributed service based on Google AppEngine that ‘routes’ test requests from M-Lab measurement tools’ clients to the best M-Lab servers. "Best" is defined by different, client-defined policies. Selecting the proper server for a given measurement is critical to ensure that measurement tests collect robust and meaningful data.

- Homepage: <http://mlab-ns.appspot.com/>
- [M-Lab NS Design
  document](https://docs.google.com/a/google.com/document/d/1eJhS75EZHDLmC6exggStr_b1euiR24_MVBJc1L6eH2c/view)
- Mailing list:
  [discuss@measurementlab.net](https://groups.google.com/a/measurementlab.net/forum/#!forum/discuss)
