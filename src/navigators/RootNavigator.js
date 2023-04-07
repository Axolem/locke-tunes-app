import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./AuthNavigator";
import { useContext } from "react";
import { AppStateContext } from "../utils/context";
import DrawerNavigation from "./DrawerNavigator";

const RootNavigator = () => {
  const { user } = useContext(AppStateContext);

  return (
    <NavigationContainer>
      {user ? <DrawerNavigation /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default RootNavigator;
