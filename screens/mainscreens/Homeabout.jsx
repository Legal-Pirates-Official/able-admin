import { View, Text, StyleSheet,Dimensions, StatusBar, TouchableOpacity } from 'react-native'
import React from 'react'
import Form from '../../components/Form'
import AboutHome from '../../components/about.home'

const {height, width} = Dimensions.get('window');

const Homeabout = ({navigation}) => {
  return (
    <View style={styles.homecont}>
        <Text style={styles.title}>HOME</Text>
        {/* <TouchableOpacity style={styles.aboutbtn} onPress={() => navigation.navigate("Abouthome")}>
            <Text style={styles.text}>About Able</Text>
        </TouchableOpacity> */}
        <TouchableOpacity style={styles.aboutbtn} onPress={() => navigation.navigate("LiveEvents")}>
            <Text style={styles.text}>Live Events</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.aboutbtn} onPress={() => navigation.navigate("Youtubevideo")}>
            <Text style={styles.text}>Youtube Video</Text>
        </TouchableOpacity>
    </View>
  )
};

export default Homeabout

const styles = StyleSheet.create({
    homecont:{
        paddingTop: StatusBar.currentHeight,
        justifyContent: "center",
        flex:1,
    },
    aboutbtn:{
        width: width/1.5,
        height: height/8,
        borderColor: '#00BFFF',
        borderWidth: 2,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        borderRadius: 20,
        marginBottom: 20,
        // shadowColor: "#000",
        // shadowOffset: { width: 3, height: 5 },
        // shadowOpacity: 0.8,
        // shadowRadius: 6,
        // elevation: 5,
    },
    
    title:{
        alignSelf: "center",
        marginBottom: 40,
        fontSize: 40,
        fontWeight: "bold",
        borderBottomColor: '#000',
        borderBottomWidth: 3,
        borderRadius: 20,
    },
    text:{
        fontSize: 20,
        fontWeight: "bold",
        color: '#000000',
    }
})
