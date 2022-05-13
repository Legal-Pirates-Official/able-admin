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

import { getyoutube, deleteYoutube } from "../axios/youtube.axios";
import YoutubeDetails from "./youtubevideos.home";

const Showyoutube = ({ navigation }) => {
  const [youtubevideos, setYoutubeVideos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchyoutube = () =>
    getyoutube().then((res) => {
      setYoutubeVideos(res.data);
    });

  useEffect(() => {
    fetchyoutube();
  }, [youtubevideos]);

  return (
    <View style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
      {youtubevideos.length ? (
        <ScrollView>
          <View style={{ flex: 1 }}>
            <FlatList
              data={youtubevideos}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert(
                      "Delete",
                      "Are you sure you want to delete this video?",
                      [
                        {
                          text: "Cancel",
                          onPress: () => console.log("Cancel Pressed"),
                          style: "cancel",
                        },
                        {
                          text: "OK",
                          onPress: () => {
                            deleteYoutube(item.id).then(() => {
                              fetchyoutube();
                            });
                          },
                        },
                      ]
                    );
                  }}
                  style={styles.storyCard}
                >
                  <Image
                    source={{ uri: item.thumbnail }}
                    style={{ height: 200, width: 300 }}
                  />
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id}
            />
          </View>
        </ScrollView>
      ) : (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text>No data found.</Text>
        </View>
      )}
      <TouchableOpacity
        onPress={() => {
          setIsModalOpen(true);
        }}
        style={{ position: "absolute", bottom: 80, right: 30, elevation: 5 }}
      >
        <AntDesign name="pluscircle" size={50} color="#00b5ec" />
      </TouchableOpacity>
      <YoutubeDetails
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        youtubeVideos={youtubevideos}
        setYoutubeVideos={setYoutubeVideos}
      />
    </View>
  );
};

export default Showyoutube;

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
});
