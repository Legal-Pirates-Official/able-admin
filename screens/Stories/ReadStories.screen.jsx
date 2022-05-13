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
} from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

import { getStories, deleteStories } from "../../axios/stories.axios";
import StoryDetails from "./StoryDetails.modal";

const { height, width } = Dimensions.get("window");

const ReadStories = ({ navigation }) => {
  const [stories, setStories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateDetails, setUpdateDetails] = useState(null);

  const fetchStories = () =>
    getStories().then((res) => {
      setStories(res.data);
    });

  useEffect(() => {
    fetchStories();
  }, [stories]);

  return (
    <View style={{ flex: 1, paddingTop: StatusBar.currentHeight,}}>
      <View
        style={{
          width: width / 1.14,
          alignSelf: "center",
          position: "relative",
          top: '5%',
		  height: '15%',
        }}
      >
        <Text
          style={{
            alignSelf: "flex-start",
            fontSize: 25,
            fontWeight: "bold",
            borderBottomColor: "#000",
            borderBottomWidth: 3,
            borderRadius: 10,
          }}
        >
          Stories
        </Text>
      </View>
      {stories.length ? (
        <ScrollView>
          <View style={{ flex: 1 }}>
            <FlatList
              data={stories}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    setUpdateDetails(item);
                    setIsModalOpen(true);
                  }}
                  style={styles.storyCard}
                >
                  <View
                    style={{
                      width: Dimensions.get("window").width / 2.2,
                      height: "100%",
                      position: "relative",
                    }}
                  >
                    <View>
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: "700",
                          marginBottom: 3,
                        }}
                      >
                        {item.video_title.length > 20
                          ? item.video_title.substring(0, 20) + "..."
                          : item.video_title}
                      </Text>
                      <Text style={{ fontSize: 16, marginBottom: 3 }}>
                        {item.video_description.length > 50
                          ? item.video_description.substring(0, 40) + "..."
                          : item.video_description}
                      </Text>
                      <Text>{item.video_type}</Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        deleteStories(item.id);
                        fetchStories();
                      }}
                      style={{
                        position: "relative",
                        bottom: 10,
                        marginTop: 10,
                        width: 28,
                        height: 28,
                      }}
                    >
                      <MaterialIcons name="delete" size={28} color="black" />
                    </TouchableOpacity>
                  </View>
                  <Image
                    style={styles.thumbnail}
                    source={{ uri: item.video_thumbnail }}
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
          setUpdateDetails(null);
          setIsModalOpen(true);
        }}
        style={{ position: "absolute", bottom: 80, right: 30, elevation: 5 }}
      >
        <AntDesign name="pluscircle" size={50} color="#00b5ec" />
      </TouchableOpacity>
      <StoryDetails
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        updateDetails={updateDetails}
        setStories={setStories}
      />
    </View>
  );
};

export default ReadStories;

const styles = StyleSheet.create({
  storyCard: {
    padding: 10,
    margin: 10,
    borderRadius: 10,
    alignSelf: "center",
    width: width / 1.2,
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
    width: Dimensions.get("window").width / 3.1,
    height: Dimensions.get("window").width / 3.1,
    borderRadius: 10,
  },
});
