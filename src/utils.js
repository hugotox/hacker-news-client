import moment from 'moment';

const Utils = {
	getTimeFrom(timestamp) {
		const now = moment();
		const storyDate = moment(timestamp * 1000);
		return storyDate.from(now);
	}
};

export default Utils;
