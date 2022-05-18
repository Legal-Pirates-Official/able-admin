import axios from 'axios';
import { baseurl } from '../environment';


export const aboutget = () => axios.get(`${baseurl}/admin/home/about`);
export const aboutupdate = (values) =>
	axios.post(`${baseurl}/admin/home/about`, { values });
