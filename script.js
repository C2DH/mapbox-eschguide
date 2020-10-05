
	mapboxgl.accessToken = 'pk.eyJ1Ijoib3JpZWxpc2FyYXR1bmlsdSIsImEiOiJja2ZwMXIwcXMwZHB6MnFwYWRncDhmcGdkIn0.zPOcZlp92FqMjaB_wocPBg';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/orielisaratunilu/ckfwcdaxq0a8d19mx05navfuq',
        zoom: 13,
        center: [49.4959628,5.9850306]
    });

    map.on('load', function () {
        // add source and layer for museums
        map.addSource('tours', {
            type: 'line',
            url: 'mapbox://mapbox.2uqgilx0'
        }); 
        map.addLayer({
            'id': 'tours',
            'type': 'line',
            'source': 'composite',
            'layout': {
                // make layer visible by default
                'visibility': 'visible'
            },
            'paint': {
                'circle-radius': 8,
                'circle-color': 'rgba(55,148,179,1)'
            },
            'source-layer': 'tour_01-07_12converted-0vz0ek'
        });

        // add source and layer for contours
        map.addSource('buildings', {
            type: 'fill',
            url: 'mapbox://mapbox.adx63690'
        });
        map.addLayer({
            'id': 'buildings',
            'type': 'fill',
            'source': 'composite',
            'source-layer': 'batiments_guide_historiquecon-9z4fr0',
            'layout': {
                // make layer visible by default
                'visibility': 'visible',
                'line-join': 'round',
                'line-cap': 'round'
            },
            'paint': {
                'line-color': '#877b59',
                'line-width': 1
            }
        });
    });

    // enumerate ids of the layers
    var toggleableLayerIds = ['tours', 'buildings'];

    // set up the corresponding toggle button for each layer
    for (var i = 0; i < toggleableLayerIds.length; i++) {
        var id = toggleableLayerIds[i];

        var link = document.createElement('a');
        link.href = '#';
        link.className = 'active';
        link.textContent = id;

        link.onclick = function (e) {
            var clickedLayer = this.textContent;
            e.preventDefault();
            e.stopPropagation();

            var visibility = map.getLayoutProperty(clickedLayer, 'visibility');

            // toggle layer visibility by changing the layout object's visibility property
            if (visibility === 'visible') {
                map.setLayoutProperty(clickedLayer, 'visibility', 'none');
                this.className = '';
            } else {
                this.className = 'active';
                map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
            }
        };

        var layers = document.getElementById('menu');
        layers.appendChild(link);
    }
