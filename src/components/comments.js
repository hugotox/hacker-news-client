import React from 'react';

export default class Comments extends React.Component {

	// componentDidMount() {
	// 	const {comments} = this.props;
	// 	if(comments.length) {
	// 		comments.map(comment => {
	// 			if (comment.kids && comment.kids.length) {
	// 				this.props.triggerFetchKidComments(comment.id, comment.kids);
	// 			}
	// 		});
	// 	}
	// }

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
						<a href="#" onClick={this.expandCommentsClickHandler(comment)}>Expand comments</a>
					</div>
				);
			} else {
				return null;
			}
		} else {
			return (
				<div>
					<a href="#" onClick={this.hideCommentsClickHandler(comment)}>Hide comments</a>
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
							<li key={i}>
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
