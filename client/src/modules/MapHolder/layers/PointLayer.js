import { Layer, Feature } from 'react-mapbox-gl';

import React from 'react';

export default function PointLayer({ coordinates }) {
  return (
    <Layer
      id="end"
      type="circle"
      paint={{
        'circle-radius': 10,
        'circle-color': '#f30'
      }}
    >
      <Feature
        coordinates={coordinates[coordinates.length - 1]}
      />
    </Layer>
  );
}
