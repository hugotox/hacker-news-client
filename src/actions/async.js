import axios from 'axios';

const baseUrl = 'https://hacker-news.firebaseio.com';

export const fetchHNData = (storyId) => {
	return axios.get(`${baseUrl}/v0/item/${storyId}.json`);
};

