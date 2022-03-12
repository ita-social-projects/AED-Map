import { Layer, Feature } from 'react-mapbox-gl';

import React from 'react';

export default function RouteLayer({ coordinates }) {
  return (
    <Layer
      id="route"
      type="line"
      layout={{
        'line-join': 'round',
        'line-cap': 'round'
      }}
      paint={{
        'line-color': '#3887be',
        'line-width': 5
      }}
    >
      <Feature coordinates={coordinates} />
    </Layer>
  );
}
