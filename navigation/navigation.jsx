import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Homeabout from '../screens/mainscreens/Homeabout'
import ShowHomeAbout from '../components/showabout.home'
import Showyoutube from '../components/showyoutube.home'
import ShowLiveEvents from '../components/showliveevents.home'

const Stack = createNativeStackNavigator();

export default function Navigation() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Root"
                component={Homeabout}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="Abouthome"
                component={ShowHomeAbout}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="Youtubevideo"
                component={Showyoutube}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="LiveEvents"
                component={ShowLiveEvents}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    );
}
