import { useTheme } from "native-base";
import Home from "../screens/home/Home";
import Upload from "../screens/upload/Upload";
import Playlists from "../screens/playlist/Playlists";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, MaterialCommunityIcons, Feather } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
const AppNavigator = () => {
  const { colors } = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.dark[50],
        tabBarAllowFontScaling: true,
        tabBarIconStyle: { color: colors.gray[100] },
        tabBarStyle: {
          backgroundColor: colors.primary[50],
          borderTopColor: colors.primary[50],
          paddingVertical: 2,
          height: 50,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name="ios-home-outline"
              size={focused ? size + 2 : size}
              color={color}
            />
          ),
          tabBarLabelStyle: { fontSize: 16 },
        }}
      />
      <Tab.Screen
        name="Playlist"
        component={Playlists}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons
              name="playlist-music-outline"
              size={focused ? size + 2 : size}
              color={color}
            />
          ),
          tabBarLabelStyle: { fontSize: 16 },
        }}
      />
      <Tab.Screen
        name="Upload"
        component={Upload}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Feather
              name="upload"
              size={focused ? size + 2 : size}
              color={color}
            />
          ),
          tabBarLabelStyle: { fontSize: 16 },
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
