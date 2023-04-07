import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Signin from "../screens/auth/Signin";
import Signup from "../screens/auth/Signup";
import ResetPassword from "../screens/auth/ResetPassword";

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="signin"
      screenOptions={{
        headerShown: false,
      }}
      
    >
      <Stack.Screen name="signin" component={Signin} />
      <Stack.Screen name="signup" component={Signup} />
      <Stack.Screen name="reset-password" component={ResetPassword} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
