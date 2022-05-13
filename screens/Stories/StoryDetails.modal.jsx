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
import { updateOrInsertStories, getStories } from '../../axios/stories.axios';
import axios from 'axios';

const StoryDetails = ({
	isModalOpen,
	setIsModalOpen,
	updateDetails,
	setStories
}) => {
	const [selectedImage, setSelectedImage] = useState(null);
	const [photo, setPhoto] = useState('');
	const [base64Img, setBase64Img] = useState('');

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

	const storiesInsertSchema = Yup.object().shape({
		title: Yup.string().required(),
		description: Yup.string().required(),
		video_url: Yup.string().required(),
		video_type: Yup.string().required()
	});

	return (
		<Modal
			visible={isModalOpen}
			animationType='slide'
			onRequestClose={() => setIsModalOpen(false)}
		>
			<Formik
				initialValues={{
					title: updateDetails ? updateDetails.video_title : 'essgr',
					description: updateDetails
						? updateDetails.video_description
						: 'essgr',
					video_url: updateDetails ? updateDetails.video_url : 'essgr',
					video_type: updateDetails ? updateDetails.video_type : 'Mini clip'
				}}
				onSubmit={async (values, actions) => {
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
						await updateOrInsertStories(
							values,
							updateDetails ? updateDetails.id : null,
							photo
						).then((res) => {
							setIsModalOpen(false);
							setPhoto('');
							setSelectedImage(null);
							updateDetails(null);
							getStories().then((res) => {
								setStories(res.data);
							});
						});
					});
				}}
				validationSchema={storiesInsertSchema}
			>
				{({
					handleChange,
					handleSubmit,
					handleBlur,
					values,
					errors,
					touched
				}) => (
					<ScrollView style={styles.scrollView}>
						<View style={{ flex: 1 }}>
							<Text style={styles.textHeading}>Insert Stories</Text>
							<View style={styles.inputView}>
								<Text style={styles.inputlabel}>Title</Text>
								<TextInput
									name='title'
									multiline={true}
									style={styles.inputTag}
									onBlur={handleBlur('title')}
									onChangeText={handleChange('title')}
									value={values.title}
								/>
							</View>
							<View style={styles.inputView}>
								<Text style={styles.inputlabel}>Description</Text>
								<TextInput
									name='description'
									multiline={true}
									style={styles.textInput}
									onBlur={handleBlur('description')}
									onChangeText={handleChange('description')}
									value={values.description}
								/>
							</View>
							<Picker
								selectedValue={values.video_type}
								onValueChange={handleChange('video_type')}
							>
								<Picker.Item label='Select Category' value='' />
								<Picker.Item label='Mini Clip' value='Mini clip' />
								<Picker.Item label='Youtube' value='Youtube' />
							</Picker>
							<View style={styles.inputView}>
								<Text style={styles.inputlabel}>Video Url</Text>
								<TextInput
									name='video_url'
									multiline={true}
									style={styles.textInput}
									onBlur={handleBlur('video_url')}
									onChangeText={handleChange('video_url')}
									value={values.video_url}
								/>
							</View>
							<View style={styles.inputView}>
								<TouchableOpacity style={styles.button} onPress={pickImage}>
									<Text style={[styles.buttonTextPicture]}>
										{selectedImage ? 'Image Selected' : 'Select Thumbnail'}
									</Text>
								</TouchableOpacity>
							</View>
							<Button
								style={styles.buttonText}
								onPress={() => handleSubmit()}
								title='Submit'
							/>
						</View>
					</ScrollView>
				)}
			</Formik>
		</Modal>
	);
};

export default StoryDetails;

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
