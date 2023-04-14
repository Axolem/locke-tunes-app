import {
  Text,
  VStack,
  HStack,
  Avatar,
  useTheme,
  Pressable,
  useColorMode,
} from "native-base";
import {
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { useContext } from "react";
import Help from "../screens/help/Help";
import AppNavigator from "./AppNavigator";
import Profile from "../screens/profile/Profile";
import { AppStateContext } from "../utils/context";
import Settings from "../screens/settings/Settings";
import Playlists from "../screens/playlist/Playlists";
import { doUserLogOut } from "../utils/communicateToDb";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";



const iconSize = 24;
const Drawer = createDrawerNavigator();

const DrawerNavigation = ({ navigation }) => {
  const { colors } = useTheme();
  const { setUser, retryLogin } = useContext(AppStateContext);
  return (
    <Drawer.Navigator
      initialRouteName="App"
      drawerContent={(props) => <CustomDrawerContent {...props} />}

      screenOptions={{
        headerShown: false,
        swipeEdgeWidth: 150,
        drawerActiveTintColor: colors.dark[50],
        drawerLabelStyle: {
          color: colors.light[50],
          fontSize: 18,
        },
        drawerStyle: {
          backgroundColor: colors.primary[50],
        },
      }}
    >
      <Drawer.Screen
        name="app"
        component={AppNavigator}
        options={{
          title: "Home",
          drawerIcon: () => (
            <Ionicons
              name="ios-home-outline"
              size={iconSize}
              color={colors.dark[100]}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          drawerIcon: () => (
            <Ionicons
              name="ios-person-outline"
              size={iconSize}
              color={colors.dark[100]}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Playlists"
        options={{
          drawerIcon: () => (
            <MaterialCommunityIcons
              name="playlist-music-outline"
              size={iconSize}
              color={colors.dark[100]}
            />
          ),

        }}
        component={Playlists}

      />
      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{
          drawerIcon: () => (
            <Ionicons
              name="ios-settings-outline"
              size={iconSize}
              color={colors.dark[100]}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Help"
        component={Help}
        options={{
          drawerIcon: () => (
            <Ionicons
              name="ios-help-outline"
              size={iconSize}
              color={colors.dark[100]}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;

function CustomDrawerContent(props) {
  const { colors } = useTheme();
  const { toggleColorMode, colorMode } = useColorMode();
  const { setUser, retryLogin } = useContext(AppStateContext);
  
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        pressColor="none"
        label={({ focused, color }) => (
          <HStack justifyContent={"space-between"} mb={4}>
            <VStack>
              <Avatar size={"xl"} />

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
                mt={1}
                fontSize={"md"}
                fontStyle={"italic"}
              >
                @Axolem
              </Text>
            </VStack>
            <Pressable
              bgColor={colors.coolGray[800]}
              onPress={toggleColorMode}
              height={"1/4"}
              borderRadius={"lg"}
              p={"2"}
            >
              {colorMode === "dark" ? (
                <Ionicons
                  name="ios-sunny-outline"
                  size={iconSize}
                  color={colors.dark[50]}
                />
              ) : (
                <Ionicons
                  name="ios-moon-outline"
                  size={iconSize}
                  color={colors.primary[50]}
                />
              )}
            </Pressable>
          </HStack>
        )}
      />
      <DrawerItemList {...props} />
      <DrawerItem
        style={{ backgroundColor: colors.danger }}
        label={() => (
          <HStack>
            <Ionicons
              name="ios-exit-outline"
              size={iconSize}
              color={colors.dark[100]}
            />
            <Text color={colors.light[50]} fontSize={18} ml={"1/6"}>
              Logout
            </Text>
          </HStack>
        )}
        onPress={async () => {
          if (await doUserLogOut()) {
            setUser(null)
            retryLogin()
          }
        }}
      />
    </DrawerContentScrollView>
  );
}
