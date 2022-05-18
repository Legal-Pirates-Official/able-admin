import axios from 'axios';
import { baseurl } from '../environment';


export const getEvents = () => axios.get(`${baseurl}/admin/home/events`);
export const eventsInsert = (values, photo) =>
	axios.post(`${baseurl}/admin/home/events`, { values, photo });
export const deleteEvents = (id) =>
	axios.delete(`${baseurl}/admin/home/events/${id}`);
