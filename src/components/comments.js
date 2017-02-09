import React from 'react';
import Utils from '../utils';

export default class Comments extends React.Component {

	expandCommentsClickHandler(comment) {
		return (e) => {
			e.preventDefault();
			const {fetchedCommentsIds} = this.props;
			if (comment.kids && comment.kids.length) {
				// fetch kids comments only if not already fetched
				if(fetchedCommentsIds.indexOf(comment.id) === -1) {
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
		const {comments, triggerFetchKidComments, expandedCommentsIds, fetchedCommentsIds, expandCommentId} = this.props;
		if(expandedCommentsIds.indexOf(comment.id) === -1) {
			if(comment.kids && comment.kids.length) {
				return (
					<div>
						<a href="#" onClick={this.expandCommentsClickHandler(comment)} className="caret-link">
							<i className="fa fa-caret-down"/> See replies
						</a>
					</div>
				);
			} else {
				return null;
			}
		} else {
			return (
				<div>
					<a href="#" onClick={this.hideCommentsClickHandler(comment)} className="caret-link">
						<i className="fa fa-caret-up"/> Hide replies
					</a>
					<Comments
						parentId={comment.id}
						comments={comments}
						expandedCommentsIds={expandedCommentsIds}
						fetchedCommentsIds={fetchedCommentsIds}
						expandCommentId={expandCommentId}
						triggerFetchKidComments={triggerFetchKidComments}
					/>
				</div>
			);
		}
	}

	render() {
		const {comments, parentId} = this.props;
		return (
			<ul>
				{comments.map((comment, i) => {
					if(comment.parent === parentId) {
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
