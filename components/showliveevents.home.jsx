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
  
  import { getEvents, deleteEvents } from "../axios/events.axios";
  import LiveEventsDetails from "./liveevents.home";
  
  const ShowLiveEvents = ({ navigation }) => {
    const [LiveEvents, setLiveEvents] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const fetchLiveEvents = () =>
      getEvents().then((res) => {
        setLiveEvents(res.data);
      });
  
    useEffect(() => {
      fetchLiveEvents();
    }, [LiveEvents]);
  
    return (
      <View style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
        {LiveEvents.length ? (
          <ScrollView>
            <View style={{ flex: 1 }}>
              <FlatList
                data={LiveEvents}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      Alert.alert(
                        "Delete",
                        "Are you sure you want to delete this Event?",
                        [
                          {
                            text: "Cancel",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel",
                          },
                          {
                            text: "OK",
                            onPress: () => {
                              deleteEvents(item.id).then(() => {
                                fetchLiveEvents();
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
        <LiveEventsDetails
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          LiveEvents={LiveEvents}
          setLiveEvents={setLiveEvents}
        />
      </View>
    );
  };
  
  export default ShowLiveEvents;
  
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
  