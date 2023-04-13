import { StatusBar } from "expo-status-bar";
import { Entypo } from '@expo/vector-icons';
import { useContext, useState } from "react";
import { Ionicons } from '@expo/vector-icons';
import { ImageBackground } from "react-native";
import { AppStateContext } from "../../utils/context";
import { doUserLogin } from "../../utils/communicateToDb";
import { SafeAreaView } from "react-native-safe-area-context";
import { Box, Button, Icon, Input, Pressable, Text, VStack, useTheme, useToast } from "native-base";

import trim from 'validator/lib/trim';
import escape from 'validator/lib/escape';
import equals from 'validator/lib/equals';
import isEmail from 'validator/lib/isEmail';
import isLength from 'validator/lib/isLength';
import normalizeEmail from 'validator/lib/normalizeEmail';
import isStrongPassword from 'validator/lib/isStrongPassword';
import { errorDisplay } from "../../utils/functions";

const image = require("../../../assets/images/Register.png")

const Signup = ({ navigation }) => {
  const toast = useToast();
  const { colors } = useTheme()

  const { setUser } = useContext(AppStateContext);

  const [show, setShow] = useState(false);
  const [userData, setUserData] = useState({ name: "", email: "", password: "", confirmPassword: "" })


  const registerMe = () => {
    let email = escape(trim(userData.email))
    const name = escape(trim(userData.name))
    const password = escape(trim(userData.password))
    const confirmPassword = escape(trim(userData.confirmPassword))

    email = normalizeEmail(email)

    if (!isLength(name, { min: 3, max: 12 })) { return errorDisplay(" Opss! Invalid name 3 - 12 charactors please.", "name") }
    if (!isEmail(userData.email)) { return errorDisplay("Opss! Invalid email.", "email") }
    if (!equals(password, confirmPassword)) { return errorDisplay(" Opss! Passwords do not match.", "same-pass") }
    if (!isStrongPassword(password, { minLength: 6, })) { return errorDisplay(" Weak! Passwork is weak, are you?", "strong-pass") }

    const data = doUserLogin(userData)

    if (data[0]) {
      try {
        //save to async storage

        //save to context


        //navigation.navigate("home")
      } catch (error) {

      }
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
            <Text fontSize={"6xl"} fontWeight={"bold"} color={colors.light[50]}>Sign up</Text>
            <Text fontSize={"md"} mb={"16"} color={colors.light[50]}>to start playing</Text>
          </Box>

          <Box>
            <Input
              p={"3"}
              mb={"5"}
              size={"lg"}
              autoComplete="name"
              placeholder="Name"
              borderColor={colors.dark[100]}
              w={{ base: "100%", md: "25%" }}
              InputLeftElement={
                <Icon as={
                  <Entypo name="add-user" size={22} color={colors.dark[50]} />
                }
                  size={5} ml="2"
                  color={colors.dark[50]}
                />
              }
              value={userData.name}
              onChangeText={(value) => setUserData({ ...userData, name: value })}
            />

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
              mb={"5"}
              size={"lg"}
              autoComplete="password-new"
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
            <Input
              p={"3"}
              mb={"10"}
              size={"lg"}
              autoComplete="password-new"
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
              value={userData.confirmPassword}
              onChangeText={(value) => setUserData({ ...userData, confirmPassword: value })}
            />
          </Box>
          <Button size={"lg"} p={"4"} fontSize={"lg"} onPress={() => registerMe()}>Sign up</Button>
        </VStack>
      </SafeAreaView>
    </ImageBackground >
  );
};

export default Signup;
