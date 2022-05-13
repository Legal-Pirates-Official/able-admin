import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
} from "react-native";
import React, {useState, useEffect} from "react";
import {auth} from "../../firebase/firebase";
import {createUserWithEmailAndPassword} from "../../firebase/firebase";

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState(null);
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        auth.signInWithEmailAndPassword(email.trim(), password)
            .then((userCredential) => {
                const user = userCredential.user;
                if (user) {
                    navigation.push("AdminMainPage");
                }
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(error);
                setError(errorMessage);
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                placeholder="Enter your Email"
                style={styles.input}
                onChangeText={(text) => setEmail(text)}
                value={email}
                keyboardType="email-address"
            />
            <TextInput
                placeholder="Enter your Password"
                style={styles.input}
                onChangeText={(text) => setPassword(text)}
                value={password}
                secureTextEntry={true}
            />
            <Text style={styles.error}>{error}</Text>
            <TouchableOpacity>
                <Text style={styles.forgot}>Forgot Password ?</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text
                    style={styles.forgot}
                    onPress={() => {
                        navigation.navigate("RegisterScreen");
                    }}
                >
                    Create an account - Sign Up
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={{fontWeight: "bold", color: "#fff"}}>Login</Text>
            </TouchableOpacity>
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        padding: 10,
        width: "80%",
        marginBottom: 20,
    },
    forgot: {
        color: "#609BEB",
        fontSize: 15,
        marginTop: 10,
    },
    error: {
        color: "red",
        fontSize: 15,
        marginTop: 10,
        width: "80%",
        textAlign: "center",
    },
    button: {
        backgroundColor: "#609BEB",
        padding: 10,
        width: "50%",
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center",
    },
});
