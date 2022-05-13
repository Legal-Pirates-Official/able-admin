import {
	ScrollView,
	StyleSheet,
	Text,
	View,
	StatusBar,
	TextInput,
	TouchableOpacity,
	Image,
	Dimensions,
	Button
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { getAbout, postAbout } from '../../axios/about';
import * as ImagePicker from 'expo-image-picker';

const AboutAdmin = ({ about }) => {
	const [aboutArray, setAboutArray] = useState([]);
	const [selectedImage, setSelectedImage] = React.useState(null);
	const [photo, setPhoto] = useState('');

	useEffect(async () => {
		await getAbout(about.params.id).then((res) => {
			setAboutArray(res.data);
		});
	}, []);

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			aspect: [4, 3],
			base64: true
		});

		if (!result.cancelled) {
			setSelectedImage({ localUri: result.uri });
			let base64Img = `data:image/jpg;base64,${result.base64}`;
			let data = {
				file: base64Img,
				upload_preset: 'xnjpoohq'
			};
			fetch('https://api.cloudinary.com/v1_1/dn3s6sgki/upload', {
				body: JSON.stringify(data),
				headers: {
					'content-type': 'application/json'
				},
				method: 'POST'
			})
				.then(async (r) => {
					let data = await r.json();
					// await uploadPhoto(data.secure_url);
					setPhoto(data.secure_url);
				})
				.catch((err) => console.log(err));
		}
	};

	const about_schema = Yup.object().shape({
		about_description: Yup.string().required(),
		card_title: Yup.string().required(),
		card_description: Yup.string().required(),
		card_image: Yup.string().required()
	});

	return (
		<Formik
			initialValues={{
				about_description: '',
				card_title: '',
				card_description: ''
				// card_image: "",
			}}
			validationSchema={about_schema}
			onSubmit={async (values) => {
				console.log(values);
				await postAbout(values, photo).then((res) => {
					console.log(res);
				});
			}}
		>
			{({ handleChange, handleBlur, handleSubmit, values, isValid }) => (
				<ScrollView style={styles.scrollView}>
					<View
						style={{
							alignItems: 'center',
							justifyContent: 'center',
							paddingBottom: 150,
							width: Dimensions.get('window').width
						}}
					>
						<Text style={styles.textHeading}>About Admin</Text>
						<View style={styles.inputView}>
							<Text style={styles.inputlabel}>Description</Text>
							<TextInput
								name='about_description'
								multiline={true}
								style={styles.textInput}
								onBlur={handleBlur('about_description')}
								onChangeText={handleChange('about_description')}
								value={values.about_description}
							/>
						</View>
						<View style={styles.inputView}>
							<Text style={styles.inputlabel}>Card Title</Text>
							<TextInput
								name='card_title'
								multiline={true}
								style={styles.inputTag}
								onBlur={handleBlur('card_title')}
								onChangeText={handleChange('card_title')}
								value={values.card_title}
							/>
						</View>
						<View style={styles.inputView}>
							<Text style={styles.inputlabel}>Card Description</Text>
							<TextInput
								name='card_description'
								multiline={true}
								style={styles.textInput}
								onBlur={handleBlur('card_description')}
								onChangeText={handleChange('card_description')}
								value={values.card_description}
							/>
						</View>
						<View>
							{selectedImage && (
								<Image
									source={{ uri: selectedImage.localUri }}
									style={styles.thumbnail}
								/>
							)}
						</View>
						<TouchableOpacity onPress={pickImage} style={styles.button}>
							<Text style={styles.buttonTextPicture}>Pick a photo</Text>
						</TouchableOpacity>
						<Button
							title='submit'
							onPress={() => {
								handleSubmit()
							}}
						/>
					</View>
				</ScrollView>
			)}
		</Formik>
	);
};

export default AboutAdmin;

const styles = StyleSheet.create({
	scrollView: {
		flex: 1,
		backgroundColor: '#fff',
		paddingTop: StatusBar.currentHeight
	},
	text: {
		fontSize: 20,
		fontWeight: 'bold'
	},
	textHeading: {
		fontSize: 30,
		fontWeight: 'bold',
		marginTop: 20,
		textAlign: 'center'
	},
	textInput: {
		height: 100,
		width: Dimensions.get('window').width / 1.2,
		borderColor: 'gray',
		borderWidth: 1,
		textAlignVertical: 'top',
		padding: 8
	},
	inputTag: {
		height: 50,
		width: Dimensions.get('window').width / 1.2,
		borderColor: 'gray',
		borderWidth: 1,
		textAlign: 'center'
	},
	inputlabel: {
		marginVertical: 8,
		justifyContent: 'center',
		alignItems: 'center',
		fontSize: 15
	},
	inputView: {
		flexDirection: 'column',
		justifyContent: 'space-between',
		margin: 10,
		alignItems: 'center'
	},
	buttonTextPicture: {
		padding: 10,
		borderWidth: 1,
		borderColor: '#000',
		margin: 10,
		color: 'black',
		fontSize: 20,
		fontWeight: 'bold',
		borderRadius: 10
	},
	submitButton: {
		backgroundColor: '#00b5ec',
		padding: 10,
		width: Dimensions.get('window').width / 2,
		margin: 10,
		color: 'white',
		fontSize: 20,
		fontWeight: 'bold',
		textAlign: 'center',
		borderRadius: 10
	},
	thumbnail: {
		width: 300,
		height: 300,
		resizeMode: 'contain'
	}
});
