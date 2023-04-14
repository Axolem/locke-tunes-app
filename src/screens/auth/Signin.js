import { StatusBar } from "expo-status-bar";
import { useContext, useState } from "react";
import { Ionicons } from '@expo/vector-icons';
import { ImageBackground } from "react-native";
import { AppStateContext } from "../../utils/context";
import { doUserLogin } from "../../utils/communicateToDb";
import { SafeAreaView } from "react-native-safe-area-context";
import { Box, Button, Icon, Input, Pressable, Text, VStack, useTheme, useToast } from "native-base";

const image = require("../../../assets/images/Login.png")

const Signin = ({ navigation }) => {
  const { colors } = useTheme()
  const { setUser, retryLogin } = useContext(AppStateContext);

  const [show, setShow] = useState(false);
  const [userData, setUserData] = useState({ email: "", password: "" })

  const logMeIn = async () => {
    if (userData.email.length < 3 && userData.email.length < 5) {
      return console.log("Ivalid login deatails", userData);
    }
    const data = await doUserLogin(userData)

    if (data[0]) {
      setUser(data[1])
      retryLogin()
    }
  }

  return (
    <ImageBackground source={image} resizeMode="cover" style={{
      flex: 1,
      justifyContent: 'center'
    }}>
      <StatusBar style="light" animated hideTransitionAnimation="fade" />
      <SafeAreaView >
        <VStack px={"10"}>
          <Box>
            <Text fontSize={"6xl"} fontWeight={"bold"} color={colors.light[50]}>Sign in</Text>
            <Text fontSize={"md"} mb={"12"} color={colors.light[50]}>to continue playing</Text>
          </Box>

          <Box>
            <Input
              p={"3"}
              mb={"5"}
              size={"lg"}
              autoComplete="email"
              placeholder="Email"
              keyboardType="email-address"
              borderColor={colors.dark[100]}
              w={{ base: "100%", md: "25%" }}
              InputLeftElement={
                <Icon as={
                  <Ionicons name="ios-person-outline" size={24} color={colors.dark[50]} />
                }
                  size={5} ml="2"
                  color={colors.dark[50]}
                />
              }
              value={userData.email}
              onChangeText={(value) => setUserData({ ...userData, email: value })}
            />

            <Input
              p={"3"}
              mb={"8"}
              size={"lg"}
              autoComplete="password"
              placeholder="Password"
              borderColor={colors.dark[100]}
              w={{ base: "100%", md: "25%" }}
              type={show ? "text" : "password"}
              InputLeftElement={
                <Icon as={
                  <Ionicons name="key-outline" size={24} color={colors.dark[50]} />
                }
                  size={5}
                  ml="2"
                  color={colors.dark[50]}
                />}
              InputRightElement={
                <Pressable onPress={() => setShow(!show)}>
                  <Icon as={<Ionicons name={show ? "ios-eye-outline" : "ios-eye-off-outline"} />} size={5} mr="2" color="muted.400" />
                </Pressable>
              }
              value={userData.password}
              onChangeText={(value) => setUserData({ ...userData, password: value })}
            />
          </Box>
          <Button size={"lg"} p={"4"} fontSize={"lg"} onPress={() => logMeIn()}>Sign in</Button>
          <VStack>
            <Pressable onPress={() => navigation.navigate("signup")} _pressed={{ opacity: 0.5 }} mt={"5"}>
              <Text fontSize={"xl"} color={colors.dark[50]}>I'm new here</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate("reset-password")} _pressed={{ opacity: 0.5 }} mt={"3"}>
              <Text fontSize={"lg"} color={colors.dark[50]}>Yoh! I fogot my keys</Text>
            </Pressable>
          </VStack>
        </VStack>
      </SafeAreaView>
    </ImageBackground >
  );
};

export default Signin;
