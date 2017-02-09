import ActionTypes from '../actions/action-types';
import * as async from './async';


export const fetchStoryStarted = () => {
	return {
		type: ActionTypes.FETCH_STORY_STARTED
	};
};

export const fetchStoryDone = (data) => {
	return {
		type: ActionTypes.FETCH_STORY_DONE,
		data
	};
};

export const fetchCommentsStarted = () => {
	return {
		type: ActionTypes.FETCH_COMMENTS_STARTED
	};
};

export const fetchCommentsDone = (data) => {
	return {
		type: ActionTypes.ADD_COMMENTS,
		data
	};
};

export const fetchKidCommentsDone = (parentId, data) => {
	return {
		type: ActionTypes.FETCH_KID_COMMENTS_DONE,
		parentId,
		data
	};
};

const fetchCommentHelper = (dispatch, id, comments, i, l) => {
	if(i === 0) {
		dispatch(fetchCommentsStarted());
	}
	return async.fetchHNData(id)
		.then(response => {
			if(response.status === 200) {
				comments.push(response.data);
				if(i === l-1) {
					dispatch(fetchCommentsDone(comments));
				}
			}
		});
};

export const triggerFetchKidComments = (parentId, kids) => {
	return (dispatch) => {
		const comments = [];  // temp variable to hold all comments and prevent reducer to run on every comment response
		const promises = [];
		for(let i=0, l=kids.length; i<l; i++) {
			promises.push(
				async.fetchHNData(kids[i])
					.then(response => {
						if (response.status === 200) {
							comments.push(response.data);
						}
					})
			);
		}
		Promise.all(promises)
			.then(() => {
				dispatch(fetchKidCommentsDone(parentId, comments));
			})
	};
};

export const triggerFetchStory = (id) => {
	return (dispatch) => {
		dispatch(fetchStoryStarted());
		return async.fetchHNData(id)
			.then(response => {
				if(response.status === 200) {

					// fetch comments
					const comments = [];  // temp variable to hold all comments and prevent reducer to run on every comment response
					let kids = response.data.kids;
					for(let i=0, l=kids.length; i<l; i++) {
						fetchCommentHelper(dispatch, kids[i], comments, i, l);
					}

					dispatch(fetchStoryDone(response.data));
				}
			})
	};
};

export const hideComments = (parentId) => {
	return {
		type: ActionTypes.HIDE_COMMENTS,
		parentId
	};
};

export const expandCommentId = (id) => {
	return {
		type: ActionTypes.EXPAND_COMMENT_ID,
		id
	};
};


