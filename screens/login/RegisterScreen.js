import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase/firebase';

const RegisterScreen = ({ navigation }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const handleSighup = ({ navigation }) => {
		// const email1 = email .getText().toString().trim()
		console.log('email: ', typeof email);
		auth
			.createUserWithEmailAndPassword(email.trim(), password)
			.then((userCredential) => {
				const user = userCredential.user;
				console.log('user: ', user);
				navigation.push('AdminMainPage');
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(error);
			});
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Register</Text>
			<TextInput
				placeholder='Enter your Email'
				style={styles.input}
				onChangeText={(text) => setEmail(text)}
				keyboardType='email-address'
				value={email}
			/>
			<TextInput
				placeholder='Enter your Password'
				style={styles.input}
				onChangeText={(text) => setPassword(text)}
				value={password}
				secureTextEntry={true}
			/>
			<TextInput
				placeholder='Enter your Confirm Password'
				style={styles.input}
				onChangeText={(text) => setConfirmPassword(text)}
				value={confirmPassword}
				secureTextEntry={true}
			/>
			<TouchableOpacity style={styles.button} onPress={handleSighup}>
				<Text style={styles.register}>Register</Text>
			</TouchableOpacity>

			<Text
				onPress={() => {
					navigation.push('LoginScreen');
				}}
				style={styles.login}
			>
				Already have an Account - Login
			</Text>
		</View>
	);
};

export default RegisterScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		fontSize: 30,
	},
	input: {
		width: '80%',
		borderWidth: 1,
		borderColor: '#ddd',
		padding: 10,
		marginBottom: 20,
	},
	button: {
		backgroundColor: '#0066ff',
		padding: 10,
		width: '50%',
		marginBottom: 20,
		alignContent: 'center',
		justifyContent: 'center',
	},
	register: {
		fontWeight: 'bold',
		color: '#fff',
	},
	login: {
		color: '#0066ff',
		fontSize: 15,
		marginTop: 10,
	},
	text: {
		color: '#0066ff',
		fontSize: 20,
		marginBottom: 20,
	},
});
