import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Utils from '../utils';

export default class Comments extends React.Component {

	// Uncomment this componentDidMount to load ALL subcomments at first load:
	// componentDidMount() {
	// 	this.props.comments.map((comment) => {
	// 		if (comment.parent === this.props.parentId) {
	// 			this.expandCommentsClickHandler(comment)();
	// 		}
	// 	});
	// }

	expandCommentsClickHandler(comment) {
		return (e) => {
			if (e) {
				e.preventDefault();
			}
			const {fetchedCommentsIds} = this.props;
			if (comment.kids && comment.kids.length) {
				// fetch kids comments only if not already fetched
				if (fetchedCommentsIds.indexOf(comment.id) === -1) {
					this.props.triggerFetchKidComments(comment.id, comment.kids);
				} else {
					// just add the comment id to the expanded comments ids
					this.props.expandCommentId(comment.id);
				}
			}
		};
	}

	hideCommentsClickHandler(comment) {
		return (e) => {
			e.preventDefault();
			this.props.hideComments(comment.id);
		};
	}

	renderKidComments(comment) {
		if (!comment.kids || comment.kids.length === 0) {
			return null;
		}

		const {comments, triggerFetchKidComments, expandedCommentsIds, fetchedCommentsIds, expandCommentId, hideComments} = this.props;

		if (expandedCommentsIds.indexOf(comment.id) === -1) {
			return (
				<div>
					<a href="#" onClick={this.expandCommentsClickHandler(comment)} className="caret-link">
						<i className="fa fa-caret-down"/> See replies
					</a>
				</div>
			);
		} else {
			return (
				<div>
					<a href="#" onClick={this.hideCommentsClickHandler(comment)} className="caret-link">
						<i className="fa fa-caret-up"/> Hide replies
					</a>
					<ReactCSSTransitionGroup
						transitionName="commentShowUp"
						transitionEnterTimeout={500}
						transitionLeaveTimeout={300}
						transitionAppear={true}
						transitionAppearTimeout={500}
					>
						<Comments
							parentId={comment.id}
							comments={comments}
							expandedCommentsIds={expandedCommentsIds}
							fetchedCommentsIds={fetchedCommentsIds}
							expandCommentId={expandCommentId}
							triggerFetchKidComments={triggerFetchKidComments}
							hideComments={hideComments}
						/>
					</ReactCSSTransitionGroup>
				</div>
			);
		}
	}

	render() {
		const {comments, parentId} = this.props;
		return (
			<ul>
				{comments.map((comment, i) => {
					if (comment.parent === parentId) {
						return (
							<li key={i} className="comment">
								<div className="author">
									<i className="fa fa-user"/> {comment.by}
									<span className="when">
										<i className="fa fa-clock-o"/> {Utils.getTimeFrom(comment.time)}
									</span>
								</div>
								<div dangerouslySetInnerHTML={{__html: comment.text}}></div>
								{this.renderKidComments(comment)}
							</li>
						);
					}
				})}
			</ul>
		);
	}
}
