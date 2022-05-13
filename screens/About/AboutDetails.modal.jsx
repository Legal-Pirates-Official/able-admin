import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	TextInput,
	Image,
	ScrollView,
	StatusBar,
	Dimensions,
	Modal,
	Button,
	Picker
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import * as ImagePicker from 'expo-image-picker';
import { getAbout, updateOrInsertAbout } from '../../axios/about';

const AboutDetails = ({
	isModalOpen,
	setIsModalOpen,
	updateDetails,
	setUpdateDetails,
	setAbout
}) => {
	const [selectedImage, setSelectedImage] = useState(null);
	const [photo, setPhoto] = useState('');
	const [base64Img, setBase64Img] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			base64: true
		});

		if (!result.cancelled) {
			setSelectedImage({ localUri: result.uri });
			let base64Img = `data:image/jpg;base64,${result.base64}`;
			let data = {
				file: base64Img,
				upload_preset: 'xnjpoohq'
			};
			setBase64Img(data);
		}
	};

	const aboutInsertSchema = Yup.object().shape({
		// about_description: Yup.string().required(),
		card_title: Yup.string().required(),
		card_description: Yup.string().required()
	});

	return (
		<Modal
			visible={isModalOpen}
			animationType='slide'
			onRequestClose={() => setIsModalOpen(false)}
		>
			<Formik
				initialValues={{
					card_title: updateDetails ? updateDetails.card_title : '',
					card_description: updateDetails ? updateDetails.card_description : ''
				}}
				onSubmit={async (values, actions) => {
					setIsLoading(true);
					new Promise(async (resolve, reject) => {
						base64Img &&
							(await fetch('https://api.cloudinary.com/v1_1/dn3s6sgki/upload', {
								body: JSON.stringify(base64Img),
								headers: {
									'content-type': 'application/json'
								},
								method: 'POST'
							})
								.then(async (r) => {
									let data = await r.json();
									setPhoto(data.secure_url);
									resolve(data.secure_url);
								})
								.catch((err) => {
									console.log(err);
									resolve(null);
								}));
					}).then(async (photo) => {
						await updateOrInsertAbout(
							values,
							updateDetails ? updateDetails.id : null,
							photo
						).then((res) => {
							setPhoto('');
							setSelectedImage(null);
							setUpdateDetails(null);
							getAbout().then((res) => {
								setAbout(res.data);
							});
							setIsLoading(false);
							setIsModalOpen(false);
						});
					});
				}}
				validationSchema={aboutInsertSchema}
			>
				{({ handleChange, handleSubmit, handleBlur, values }) => (
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
							{/* <View style={styles.inputView}>
								<Text style={styles.inputlabel}>Description</Text>
								<TextInput
									name='about_description'
									multiline={true}
									style={styles.textInput}
									onBlur={handleBlur('about_description')}
									onChangeText={handleChange('about_description')}
									value={values.about_description}
								/>
							</View> */}
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
							{/* <View>
								{selectedImage && (
									<Image
										source={{ uri: selectedImage.localUri }}
										style={styles.thumbnail}
									/>
								)}
							</View> */}
							<TouchableOpacity onPress={pickImage} style={styles.button}>
								<Text style={styles.buttonTextPicture}>
									{selectedImage ? 'Image selected' : 'Pick a photo'}
								</Text>
							</TouchableOpacity>
							<Button
								disabled={isLoading}
								title='submit'
								onPress={() => handleSubmit()}
							/>
						</View>
					</ScrollView>
				)}
			</Formik>
		</Modal>
	);
};

export default AboutDetails;

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
		textAlign: 'center',
		color: '#000'
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
	buttonText: {
		backgroundColor: '#00b5ec',
		position: 'relative',
		padding: 10,
		width: Dimensions.get('window').width / 2,
		margin: 10,
		// paddingBottom: 20,
		left: '50%',
		transform: [{ translateX: -100 }],
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
