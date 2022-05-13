import axios from 'axios';

const baseUrl = 'https://able-server.herokuapp.com/';
// const baseUrl = 'http://192.168.0.103:8080/';

export const getStories = () => axios.get(`${baseUrl}admin/stories`);

export const updateOrInsertStories = (values, id, photo, video) => {
	return axios.post(
		id ? `${baseUrl}admin/stories/${id}` : `${baseUrl}admin/stories/`,
		{ values, photo }
	);
};
export const deleteStories = (id, values) =>
	axios.delete(`${baseUrl}admin/stories/${id}`, values);
