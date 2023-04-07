import {
  Center,
  HStack,
  StatusBar,
  Text,
  VStack,
  View,
  useTheme,
} from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const NowPlaying = () => {
  const { colors } = useTheme();
  return (
    <SafeAreaView>
      <StatusBar backgroundColor={colors.primary[50]} />
      <View py="2" px={"4"} backgroundColor={"primary.50"} height={"100%"}>
        <VStack px="6"></VStack>
      </View>
    </SafeAreaView>
  );
};

export default NowPlaying;
