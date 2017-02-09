import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Header from '../components/header';
import Comments from '../components/comments';
import {
	triggerFetchStory,
	triggerFetchKidComments,
	hideComments,
	expandCommentId
} from '../actions/sync';


function mapStateToProps(state) {
	return {
		fetchingStory: state.fetchingStory,
		storyData: state.storyData,
		comments: state.comments,
		fetchingComments: state.fetchingComments,
		expandedCommentsIds: state.expandedCommentsIds,
		fetchedCommentsIds: state.fetchedCommentsIds,
	};
}

function mapActionsToProps(dispatch) {
	return {
		triggerFetchStory: bindActionCreators(triggerFetchStory, dispatch),
		triggerFetchKidComments: bindActionCreators(triggerFetchKidComments, dispatch),
		hideComments: bindActionCreators(hideComments, dispatch),
		expandCommentId: bindActionCreators(expandCommentId, dispatch),
	}
}


class Main extends React.Component {

	constructor(props) {
		super(props);

		// hardcoded story Id for this demo
		this.storyId = 3410773;
	}

	componentWillMount() {
		this.props.triggerFetchStory(this.storyId);
	}

	render() {
		if(this.props.fetchingStory) {
			return (
				<div>Loading...</div>
			);
		}
		return (
			<div className="container">
				<div className="row">
					<div className="col-xs-12">
						<Header
							data={this.props.storyData}
						/>
						{this.props.fetchingComments ?
							<div>Fetching comments...</div>
							:
							<div className="comments">
								<Comments
									parentId={this.storyId}
									comments={this.props.comments}
									expandedCommentsIds={this.props.expandedCommentsIds}
									fetchedCommentsIds={this.props.fetchedCommentsIds}
									expandCommentId={this.props.expandCommentId}
									triggerFetchKidComments={this.props.triggerFetchKidComments}
									hideComments={this.props.hideComments}
								/>
							</div>
						}
					</div>
				</div>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapActionsToProps)(Main);
