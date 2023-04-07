import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";

import About from "../screens/about/About";
import Profile from "../screens/profile/Profile";
import Settings from "../screens/settings/Settings";
import AppNavigator from "./AppNavigator";
import {
  Avatar,
  Button,
  Center,
  HStack,
  Pressable,
  Text,
  VStack,
  View,
  useColorMode,
  useTheme,
} from "native-base";

import { Ionicons } from "@expo/vector-icons";

const Drawer = createDrawerNavigator();

const DrawerNavigation = ({ navigation }) => {
  const { colors } = useTheme();
  return (
    <Drawer.Navigator
      initialRouteName="App"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      defaultStatus="open"
      screenOptions={{
        headerShown: false,
        swipeEdgeWidth: 150,
        drawerStyle: {
          backgroundColor: colors.primary[50],
        },
      }}
    >
      <Drawer.Screen name="App" component={AppNavigator} options={{}} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen
        name="Playlists"
        options={{ drawerLabel: () => <Button>Play lists</Button> }}
        component={About}
      />
      <Drawer.Screen name="Settings" component={Settings} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;

function CustomDrawerContent(props) {
  const { toggleColorMode, colorMode } = useColorMode();
  const { colors } = useTheme();
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        pressColor="none"
        //style={{ display: "flex", justifyContent: "space-between" }}
        label={({ focused, color }) => (
          <HStack justifyContent={"space-between"} mb={4}>
            <VStack>
              <Avatar size={"lg"} />

              <Text
                colorScheme={"white"}
                color={"dark.50"}
                mt={3}
                fontSize={"lg"}
                fontWeight={"semibold"}
              >
                Axole Maranjana
              </Text>
              <Text
                colorScheme={"white"}
                color={"dark.50"}
                mt={3}
                fontSize={"md"}
                fontStyle={"italic"}
              >
                @Axolem
              </Text>
            </VStack>
            <Pressable
              bgColor={colors.coolGray[50]}
              onPress={toggleColorMode}
              height={"1"}
            >
              {colorMode === "dark" ? (
                <Ionicons
                  name="ios-sunny-outline"
                  size={30}
                  color={colors.dark[50]}
                />
              ) : (
                <Ionicons
                  name="ios-moon-outline"
                  size={30}
                  color={colors.primary[50]}
                />
              )}
            </Pressable>
          </HStack>
        )}
        //onPress={() => alert("Link to help")}
      />
      <DrawerItemList {...props} />
      <DrawerItem label="Help" onPress={() => alert("Link to help")} />
    </DrawerContentScrollView>
  );
}
