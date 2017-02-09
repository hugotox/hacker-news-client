import ActionTypes from '../actions/action-types';

const initialState = {
	fetchingStory: true,
	fetchingComments: false,
	storyData: null,
	comments: [],  // array of comment objects from all levels
	expandedCommentsIds: [],  // id of all parent objects with comments expanded
	fetchedCommentsIds: [],  // id of all parent objects who already fetched kids
};

const findKidNode = (id, node) => {
	if(id === node.id) {
		return node;
	} else {
		if(node.comments) {
			for (let i = 0; i < node.comments.length; i++) {
				let result = findKidNode(id, node.comments[i]);
				if (result) {
					return result;
				}
			}
		}
		return false;
	}
};

export default function reducer (state = initialState, action) {

	switch (action.type) {

		case (ActionTypes.FETCH_STORY_STARTED): {
			return Object.assign({}, state, {
				fetchingStory: true
			});
		}

		case (ActionTypes.FETCH_STORY_DONE): {
			return Object.assign({}, state, {
				fetchingStory: false,
				storyData: action.data,
				comments: []
			});
		}

		case (ActionTypes.FETCH_COMMENTS_STARTED): {
			return Object.assign({}, state, {
				fetchingComments: true
			});
		}

		case (ActionTypes.ADD_COMMENTS): {
			return Object.assign({}, state, {
				comments: action.data,
				fetchingComments: false,
				expandedCommentsIds: [action.data[0].parent],
				fetchedCommentsIds: [action.data[0].parent],
			});
		}

		case (ActionTypes.FETCH_KID_COMMENTS_DONE): {
			const allIds = state.comments.map(comment => comment.id);
			const commentsToAdd = action.data.filter(comment => allIds.indexOf(comment.id) === -1);
			let updatedExpandedIds, updatedFetchedIds;

			if(state.expandedCommentsIds.indexOf(action.parentId) === -1) {
				updatedExpandedIds = state.expandedCommentsIds.concat([action.parentId]);
			} else {
				updatedExpandedIds = state.expandedCommentsIds;
			}

			if(state.fetchedCommentsIds.indexOf(action.parentId) === -1) {
				updatedFetchedIds = state.fetchedCommentsIds.concat([action.parentId]);
			} else {
				updatedFetchedIds = state.fetchedCommentsIds;
			}

			return Object.assign({}, state, {
				comments: state.comments.concat(commentsToAdd),
				expandedCommentsIds: updatedExpandedIds,
				fetchedCommentsIds: updatedFetchedIds,
			});
		}

		case (ActionTypes.HIDE_COMMENTS): {
			let updatedExpandedIds = state.expandedCommentsIds.concat([]);
			const idx = state.expandedCommentsIds.indexOf(action.parentId);
			if(idx !== -1) {
				updatedExpandedIds.splice(idx, 1);
			}
			return Object.assign({}, state, {
				expandedCommentsIds: updatedExpandedIds
			});
		}

		case (ActionTypes.EXPAND_COMMENT_ID): {
			let updatedExpandedIds = state.expandedCommentsIds.concat([]);
			const idx = state.expandedCommentsIds.indexOf(action.id);
			if(idx === -1) {
				updatedExpandedIds.push(action.id);
			}
			return Object.assign({}, state, {
				expandedCommentsIds: updatedExpandedIds
			});
		}

		default:
			return state;

	}

};
