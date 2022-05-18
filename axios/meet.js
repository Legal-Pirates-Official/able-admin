const axios = require('axios');
import { baseurl } from '../environment';


export const addSlot = async (dates, values, meetLink, email) => {
	// var json = JSON.stringify(values);
	try {
		console.log(dates, 'p', values, 'll');
		return await axios
			.post(`${baseurl}/meet/addslot`, {
				time_slot: values,
				date: dates,
				meetLink: meetLink,
				email: email
			})
			.then((res) => {
				console.log(res.data);
				return res.data;
			});
	} catch (error) {
		console.log(error);
	}
};

export const getSlot = async (date) => {
	console.log(date, 'p');
	try {
		// console.log(dates,'p',values,'ll');
		return await axios
			.post(`${baseurl}/meet/getslot/`, {
				date
			})
			.then((res) => {
				console.log(res.data);
				return res.data;
			});
	} catch (error) {
		console.log(error);
	}
};

export const getRequest = async () => {
	console.log('s', 'p');
	try {
		// console.log(dates,'p',values,'ll');
		return await axios.get(`${baseurl}/admin/request`).then((res) => {
			console.log(res.data);
			return res.data;
		});
	} catch (error) {
		console.log(error);
	}
};

export const sendMail = async (email, name, date, timeslot, slots) => {
	console.log(email, name, date, timeslot, 'p');
	try {
		// console.log(dates,'p',values,'ll');
		return await axios
			.post(`${baseurl}/meet/mail/`, {
				email,
				name,
				date,
				timeslot,
				slots
			})
			.then((res) => {
				console.log(res.data);
				return res.data;
			});
	} catch (error) {
		console.log(error);
	}
};

export const mailer = async (email, timeslot, date) => {
	return await axios.post(
		`${baseurl}/admin/mail/`,
		{
			email,
			timeslot,
			date
		},
		(err, res) => {
			if (err) {
				console.log(err);
			} else {
				console.log(res);
			}
		}
	);
};

export const meetLinkChange = async (meetLink, email, password) => {
	console.log(meetLink, email, password, 'p');
	return await axios.post(
		`${baseurl}/admin/meetlink/`,
		{
			meetLink,
			email,
			password
		},
		(err, res) => {
			if (err) {
				console.log(err);
			} else {
				console.log(res);
			}
		}
	);
};

export const rejectRequest = async (email, date) => {
	return await axios.post(
		`${baseurl}/admin/reject/`,
		{
			email,
			date
		},
		(err, res) => {
			if (err) {
				console.log(err);
			} else {
				console.log(res);
			}
		}
	);
};
