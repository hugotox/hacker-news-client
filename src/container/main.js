import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Header from '../components/header';
import Comments from '../components/comments';
import { triggerFetchStory, triggerFetchKidComments } from '../actions/sync';


function mapStateToProps(state) {
	return {
		fetchingStory: state.fetchingStory,
		storyData: state.storyData,
		comments: state.comments,
		fetchingComments: state.fetchingComments,
	};
}

function mapActionsToProps(dispatch) {
	return {
		triggerFetchStory: bindActionCreators(triggerFetchStory, dispatch),
		triggerFetchKidComments: bindActionCreators(triggerFetchKidComments, dispatch),
	}
}


class Main extends React.Component {

	componentWillMount() {
		this.props.triggerFetchStory(3410773);  // hardcoded story Id for this demo
	}

	render() {
		if(this.props.fetchingStory) {
			return (
				<div>Loading...</div>
			);
		}
		return (
			<div className="container">
				<Header/>
				{this.props.fetchingComments ?
					<div>Fetching comments...</div>
					:
					<Comments
						comments={this.props.comments}
						triggerFetchKidComments={this.props.triggerFetchKidComments}
					/>
				}
			</div>
		)
	}
}

export default connect(mapStateToProps, mapActionsToProps)(Main);
