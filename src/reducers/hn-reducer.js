import ActionTypes from '../actions/action-types';

const initialState = {
	fetchingStory: false,
	fetchingComments: false,
	storyData: null,
	comments: [],  // array of comment objects, each comment can have `comments` for his own
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
				fetchingComments: false
			});
		}

		case (ActionTypes.FETCH_KID_COMMENTS_DONE): {
			const stateUpdated = JSON.parse(JSON.stringify(state));

			// action.parentId
			// action.data
			let currentNode = findKidNode(action.parentId, stateUpdated);
			currentNode.comments = action.data;

			return stateUpdated;
		}

		default:
			return state;

	}

};
