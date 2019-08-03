---
layout: page
permalink: /status/
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
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [12,25],
  zoom: 0.8
});

var url = '{{ site.baseurl }}/static/sitegeo.json';
map.on('load', function () {
  window.setInterval(function() {
    map.getSource('mlab-sites').setData(url);
  }, 43200000);

  map.addSource('mlab-sites', {
    'type': 'geojson',
    'data': url
  });
  map.addLayer({
    "id": "mlab-sites",
    "type": "circle",
    "source": "mlab-sites",
    "paint": {
      "circle-radius": {
        "base": 10,
        "stops": [[0, 8],[12, 5],[22, 5]]
      },
    "circle-color": [
      "match",
        ["get","uplink"],
      "1g", "#3bb2d0",
      "10g", "#223b53",
      "#ccc"
    ]}
  });

  map.on('click','mlab-sites', function(e) {
    var coordinates = e.features[0].geometry.coordinates.slice();
    var description = "<h4>" + e.features[0].properties.city + ", " +
      e.features[0].properties.name + "</h4>" +
      "Provider: " + e.features[0].properties.asn + " - " +
      e.features[0].properties.provider + "<br>" +
      "Uplink Speed: " + e.features[0].properties.uplink + "<br>" +
      "IPv4 Prefix: " + e.features[0].properties.ipv4_prefix + "<br>" +
      "IPv6 Prefix: " + e.features[0].properties.ipv6_prefix;

    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }
    new mapboxgl.Popup()
      .setLngLat(coordinates)
      .setHTML(description)
      .addTo(map);
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
