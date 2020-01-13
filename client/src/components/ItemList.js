import React from "react";
import Point from "./Point";

import { connect } from 'react-redux';
import { defsFilterSelector } from '../reducers/defReducer';
const ItemList = ({ defsState, filteredDefs }) => {
	const pointsRender = filteredDefs.map(point => (
		<Point key={point.id}
			 		 point={point}
		/>
	));
	return (
		<div>
			{pointsRender}
		</div>
	);
}

const mapStateToProps = (state) => ({
	defsState: state.defs,
	filter: state.filter,
	filteredDefs: defsFilterSelector(state)
});

export default connect(mapStateToProps, null)(ItemList);
