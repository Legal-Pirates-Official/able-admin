import {
  View,
  Text,
  ScrollView,
  FlatList,
  StatusBar,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

import { aboutget } from "../axios/homeabout.axios";
import HomeaboutDetails from "./about.home";

const ShowHomeAbout = ({ navigation }) => {
  const [homeAbout, sethomeAbout] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchHomeAbout = () =>
    aboutget().then((res) => {
      sethomeAbout(res.data[0]);
    });

  useEffect(() => {
    fetchHomeAbout();
  }, [homeAbout]);
  return (
    <View style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
          <View style={styles.titleview}><Text style={styles.title}>HOME ABOUT</Text></View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity style={styles.storyCard}>
            <Text>{homeAbout.description}</Text>
          </TouchableOpacity>
        </View>

      <TouchableOpacity
        onPress={() => {
          setIsModalOpen(true);
        }}
        style={{ position: "absolute", bottom: 80, right: 30, elevation: 5 }}
      >
        <View style={styles.updatebtn}>
          <Text style={{color:"#fff"}}>Update</Text>
        </View>
      </TouchableOpacity>
      <HomeaboutDetails
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        homeAbout={homeAbout}
        dataid={homeAbout.id}
        sethomeAbout={sethomeAbout}
      />
    </View>
  );
};

export default ShowHomeAbout;

const styles = StyleSheet.create({
  storyCard: {
    padding: 10,
    margin: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  thumbnail: {
    width: Dimensions.get("window").width / 3,
    height: Dimensions.get("window").width / 3,
    borderRadius: 10,
  },
  updatebtn:{
    backgroundColor: "#00b5ec",
    padding: 20,
    borderRadius: 30,
  },
  titleview:{
      width: Dimensions.get("window").width,
      height: 80,
      justifyContent: "center",
  },
  title:{
    fontSize: 30,
    fontWeight: "bold",
    alignSelf: "center",
    borderBottomColor: "#000",
    borderBottomWidth: 3,
    borderRadius: 10,
    
  }
});
