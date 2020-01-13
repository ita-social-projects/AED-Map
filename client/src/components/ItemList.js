import React from "react";
import Point from "./Point";

import { connect } from 'react-redux';

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

const mapStateToProps = ({defs, filter}) => ({
	defsState: defs,
	filter,
	filteredDefs: defs.data
                  .filter(item => item.address.toLowerCase()
						               .includes(filter.toLowerCase())),
});

export default connect(mapStateToProps, null)(ItemList);
