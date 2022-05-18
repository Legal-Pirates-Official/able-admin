import axios from 'axios';
import { baseurl } from '../environment';

export const getyoutube = () => axios.get(`${baseurl}/admin/home/youtube`);
export const youtubeInsert = (values, photo) =>
	axios.post(`${baseurl}/admin/home/youtube`, { values, photo });
export const deleteYoutube = (id) =>
	axios.delete(`${baseurl}/admin/home/youtube/${id}`);
