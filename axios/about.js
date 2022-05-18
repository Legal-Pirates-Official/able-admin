import axios from 'axios';
import { baseurl } from '../environment';

export const getAbout = async () => {
	return await axios.get(`${baseurl}/admin/about`);
};

export const updateOrInsertAbout = (values, id, photo) => {
	return axios.post(
		id ? `${baseurl}/admin/about/${id}` : `${baseurl}/admin/about`,
		{
			values,
			photo
		}
	);
};

export const deleteAbout = (id, values) =>
	axios.delete(`${baseurl}/admin/about/${id}`, values);
