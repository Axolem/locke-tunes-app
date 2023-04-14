import Home from "../screens/home/Home";
import { Pressable, useTheme } from "native-base";
import NowPlaying from "../screens/player/NowPlaying";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { UploadStack } from "./TabStacks";

import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

const Tab = createBottomTabNavigator();
const AppNavigator = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  function showHeader(route) {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'upload';
    return routeName === "upload"
  }

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
        name="Now Playing"
        component={NowPlaying}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name="ios-play-outline"
              size={focused ? size + 2 : size}
              color={color}
            />
          ),
          tabBarLabelStyle: { fontSize: 16 },
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.primary[50],
          },
          headerLeft: () => (
            <Pressable onPress={() => navigation.goBack()}>
              <Ionicons
                name="ios-chevron-back-outline"
                size={28}
                color={colors.white[50]}
              />
            </Pressable>
          ),
          headerLeftContainerStyle: {
            marginLeft: 20,
          },
          title: "Now playing",
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: colors.light[50],
          },
        }}
      />
      <Tab.Screen
        name="Upload"
        component={UploadStack}
        options={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => (
            <Feather
              name="upload"
              size={focused ? size + 2 : size}
              color={color}
            />
          ),
          tabBarLabelStyle: { fontSize: 16 },
          tabBarLabelStyle: { fontSize: 16 },
          headerShown: showHeader(route),
          headerStyle: {
            backgroundColor: colors.primary[50],
          },
          headerRight: () => (
            <Pressable onPress={() => navigation.navigate("my-uploads")}>
              <Ionicons
                name="ios-cloud-done-outline"
                size={28}
                color={colors.white[50]}
              />
            </Pressable>
          ),
          headerRightContainerStyle: {
            marginRight: 20,
          },
          title: "Uploads",
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: colors.light[50],
            marginLeft: 20
          },
          tabBarLabel: "Upload"
        })}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
