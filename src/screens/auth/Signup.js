import { Button, Spacer, Text, VStack } from "native-base";
import { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppStateContext } from "../../utils/context";

const Signup = ({ navigation }) => {
  const { setUser } = useContext(AppStateContext);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <VStack>
        <Text color="black">Signin</Text>
        <Spacer>
          <Button onPress={() => setUser("Axole")}>Signup</Button>
        </Spacer>
        <Spacer>
          <Button onPress={() => navigation.navigate("signin")}>Signin</Button>
        </Spacer>
      </VStack>
    </SafeAreaView>
  );
};

export default Signup;
