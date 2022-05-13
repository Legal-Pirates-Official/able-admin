import axios from 'axios';

// const baseURL = 'http://192.168.0.103:8080';
const baseURL = 'https://able-server.herokuapp.com';

export const getAbout = async () => {
	return await axios.get(`${baseURL}/admin/about`);
};

export const updateOrInsertAbout = (values, id, photo) => {
	return axios.post(
		id ? `${baseURL}/admin/about/${id}` : `${baseURL}/admin/about`,
		{
			values,
			photo
		}
	);
};

export const deleteAbout = (id, values) =>
	axios.delete(`${baseURL}/admin/about/${id}`, values);
