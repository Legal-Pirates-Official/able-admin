import axios from 'axios';
import { baseurl } from '../environment';

export const getStories = () => axios.get(`${baseurl}admin/stories`);

export const updateOrInsertStories = (values, id, photo) => {
	return axios.post(
		id ? `${baseurl}admin/stories/${id}` : `${baseurl}admin/stories/`,
		{ values, photo }
	);
};
export const deleteStories = (id, values) =>
	axios.delete(`${baseurl}admin/stories/${id}`, values);
