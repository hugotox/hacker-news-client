import React from 'react';

export default class TopLinks extends React.Component {
	render() {
		return (
			<div className="top-links clearfix">
				<i className="fa fa-angle-left pull-left"/>
				<div className="pull-right right-icons">
					<i className="fa fa-upload"/>
					<i className="fa fa-newspaper-o"/>
					<i className="fa fa-ellipsis-v"/>
				</div>
			</div>
		);
	}
}
