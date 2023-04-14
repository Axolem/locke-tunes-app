import AuthNavigator from "./AuthNavigator";
import { useEffect, useContext } from "react";
import DrawerNavigation from "./DrawerNavigator";
import { AppStateContext } from "../utils/context";
import { getCurrentUser } from "../utils/communicateToDb";
import { NavigationContainer } from "@react-navigation/native";

const RootNavigator = () => {
  const { login, user, setUser } = useContext(AppStateContext);

  useEffect(() => {
    return async () => {
      const data = await getCurrentUser();
      if (data[0]) {
        setUser(data[1])
      }
    }
  }, [login])

  return (
    <NavigationContainer>
      {user ? <DrawerNavigation /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default RootNavigator;
