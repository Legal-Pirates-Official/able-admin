import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { AntDesign } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import AboutAdmin from "../screens/mainscreens/AboutAdmin";
import ReadStories from "../screens/Stories/ReadStories.screen";
import Meet from "../screens/mainscreens/meet";
import ShowRequests from "../screens/mainscreens/ShowRequests";
import Navigation from "./navigation";
import ReadAbout from "../screens/About/ReadAbout.screen";

const Tab = createMaterialTopTabNavigator();

function Topnavigation() {
  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      screenOptions={({ route }) => ({
        swipeEnabled: false,
        tabBarLabelStyle: { fontSize: 12 },
        // tabBarIndicator: () => null,
        tabBarIndicatorContainerStyle: {
          borderRadius: 20,
          overflow: "hidden",
        },
        tabBarIndicatorStyle: {
          backgroundColor: "#1D47BA",
          overflow: "hidden",
          top: 0,
          height: 4,
        },
        tabBarStyle: {
          backgroundColor: "#A3D4DE",
          width: "90%",
          height: "5%",
          alignSelf: "center",
          borderRadius: 20,
          marginBottom: 10,
          position: "absolute",
          bottom: 0,
        },
        initialRoute: "Stories",
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let iconsize;

          if (route.name === "homenavigator") {
            iconName = focused ? "home" : "home";
          } else if (route.name === "About") {
            iconName = focused ? "user" : "user";
          } else if (route.name === "Stories") {
            iconName = focused ? "clockcircle" : "clockcircle";
          } else if (route.name === "Meet") {
            iconName = focused ? "google" : "google";
          } else if (route.name === "ShowRequests") {
            iconName = focused ? "message1" : "message1";
          }
          // You can return any component that you like here!
          return <AntDesign name={iconName} size={20} color={color} />;
        },
        tabBarActiveTintColor: "#1D47BA",
        tabBarInactiveTintColor: "#5F9BA9",
        lazy: true,
        tabBarShowLabel: false,
      })}
      tabBarOptions={{
        onTabPress: (e) => {
          console.log(e);
        },
      }}
    >
      <Tab.Screen name="homenavigator" component={Navigation} />
      <Tab.Screen name="About" component={ReadAbout} />
      <Tab.Screen name="Stories" component={ReadStories} />
      <Tab.Screen name="Meet" component={Meet} />
      <Tab.Screen name="ShowRequests" component={ShowRequests} />
    </Tab.Navigator>
  );
}

export default Topnavigation;

const Styles = StyleSheet.create({
  navbar: {
    borderRadius: 20,
    width: "80%",
  },
});
