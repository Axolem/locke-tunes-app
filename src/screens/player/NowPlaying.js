import {
  Text,
  View,
  VStack,
  Center,
  HStack,
  useTheme,
  StatusBar,
} from "native-base";

import { SafeAreaView } from "react-native-safe-area-context";
import SongCard from "./SongCard";
import SongControls from "./SongControls";

const NowPlaying = () => {
  const { colors } = useTheme();
  return (
    <SafeAreaView>
      <StatusBar backgroundColor={colors.primary[50]} />
      <View  backgroundColor={"primary.50"} height={"100%"}>
        <VStack px="6">
          <Center>
            <SongCard />

          </Center>
          <SongControls />

        </VStack>
      </View>
    </SafeAreaView>
  );
};

export default NowPlaying;
