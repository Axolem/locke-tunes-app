import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from '@expo/vector-icons';
import { ImageBackground } from "react-native";
import { doPasswordReset } from "../../utils/communicateToDb";
import { SafeAreaView } from "react-native-safe-area-context";
import { Box, Button, Icon, Input, Pressable, Text, VStack, useTheme } from "native-base";

import trim from "validator/lib/trim";
import escape from "validator/lib/escape";
import isEmail from "validator/lib/isEmail";
import normalizeEmail from "validator/lib/normalizeEmail";
import { errorDisplay } from "../../utils/functions";

const image = require("../../../assets/images/Password.png")

const ResetPassword = ({ navigation }) => {
  const { colors } = useTheme();

  const [userData, setUserData] = useState({ email: "" })

  const passwordReset = () => {
    let email = escape(trim(userData.email))

    email = normalizeEmail(email)

    if (!isEmail(email)) { return errorDisplay("Opss! Invalid email.", "email") }

    doPasswordReset({ email })
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
              onChangeText={(value) => setUserData({ email: value })}
            />
          </Box>

          <Button size={"lg"} p={"4"} fontSize={"lg"} onPress={() => passwordReset()}>Promise not to forget it.</Button>
          <VStack>
            <Pressable onPress={() => navigation.navigate("signin")} _pressed={{ opacity: 0.5 }} mt={"3"}>
              <Text fontSize={"lg"} color={colors.dark[50]}>Yes! I remember it.</Text>
            </Pressable>
          </VStack>
        </VStack>
      </SafeAreaView>
    </ImageBackground >
  )
}

export default ResetPassword