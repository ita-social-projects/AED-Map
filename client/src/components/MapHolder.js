import React from "react";
import mapPin from "../icons/icons-location-world.png";
import myClasses from "../styles";

import { defsFilterSelector } from '../reducers/defReducer';
import { connect } from 'react-redux';
import ReactMapboxGl, {
	GeoJSONLayer,
	Image
} from "react-mapbox-gl";

const Map = ReactMapboxGl({
	accessToken:
		"pk.eyJ1Ijoib3Nrb3ZiYXNpdWsiLCJhIjoiY2s1NWVwcnhhMDhrazNmcGNvZjJ1MnA4OSJ9.56GsGp2cl6zpYh-Ns8ThxA"
});

const MapHolder = ({ filteredDefs, mapState }) => {
	const features = filteredDefs.map(point => ({
		type: "Feature",
		geometry: {
			type: point.location.type,
			coordinates: point.location.coordinates
		},
		properties: {
			title: point.title
		},
	}));

	const GEO_JSON_DATA = {
		type: "FeatureCollection",
		features
	};

	const SYMBOL_LAYOUT = {
		"icon-image": "pointer",
		"icon-size": 1,
		"icon-offset": [0, -20],
		"text-field": ["get", "title"],
		"text-font": [
			"Open Sans Semibold",
			"Arial Unicode MS Bold"
		],
		"text-offset": [0, 0.2],
		"text-anchor": "top"
	};
	const {lng, lat, zoom} = mapState;
	const symbolClick = event => {
		event.target.flyTo({
			center: [event.lngLat.lng, event.lngLat.lat]
		});
	};

	const mouseEnter = event => {
		event.target.getCanvas().style.cursor = "pointer";
	};

	const mouseLeave = event => {
		event.target.getCanvas().style.cursor = "";
	};

	return (
		<Map
			// eslint-disable-next-line react/style-prop-object
			style="mapbox://styles/mapbox/streets-v11"
			className={myClasses.mapOuterStyle}
			center={[lng, lat]}
			zoom={[zoom]}
			containerStyle={{
		    height: '100vh',
		    width: '100vw'
		  }}
		>
			<Image
				id={"pointer"}
				url={mapPin}
				options={{ pixelRatio: 2 }}
			/>
			<GeoJSONLayer
				id={"points"}
				type={"symbol"}
				data={GEO_JSON_DATA}
				symbolLayout={SYMBOL_LAYOUT}
				symbolOnClick={symbolClick}
				symbolOnMouseEnter={mouseEnter}
				symbolOnMouseLeave={mouseLeave}
			/>
		</Map>
	);
};

const mapStateToProps = (state) => ({
	defsState: state.defs,
	filter: state.filter,
	filteredDefs: defsFilterSelector(state),
	mapState: state.map
});

export default connect(mapStateToProps, null)(MapHolder);
