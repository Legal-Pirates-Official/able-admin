import { StyleSheet, Text, View } from "react-native";
import Topnavigation from "./navigation/navigationtop";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Navigation from './navigation/navigation'
import Homeabout from "./screens/mainscreens/Homeabout";

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Topnavigation />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: "center",
    justifyContent: "center",
  },
});
