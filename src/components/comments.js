import React from 'react';

export default class Comments extends React.Component {

	componentDidMount() {
		const {comments} = this.props;
		if(comments.length) {
			comments.map(comment => {
				if (comment.kids && comment.kids.length) {
					this.props.triggerFetchKidComments(comment.id, comment.kids);
				}
			});
		}
	}

	renderKidComments(comment) {
		if(comment.comments) {
			return (
				<Comments
					comments={comment.comments}
					triggerFetchKidComments={this.props.triggerFetchKidComments}
				/>
			);
		} else {
			return null;
		}
	}

	render() {
		const {comments} = this.props;
		return (
			<ul>
				{comments.map((comment, i) => {
					return (
						<li key={i}>
							<div dangerouslySetInnerHTML={{__html: comment.text}}></div>
							{this.renderKidComments(comment)}
						</li>
					);
				})}
			</ul>
		);
	}
}
