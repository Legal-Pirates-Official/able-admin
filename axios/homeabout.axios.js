import axios from "axios";

// const baseurl = 'http://192.168.43.30:8080';
const baseurl = 'https://able-server.herokuapp.com';

export const aboutget = () => axios.get(`${baseurl}/admin/home/about`);
export const aboutupdate = (values) => axios.post(`${baseurl}/admin/home/about`, { values });