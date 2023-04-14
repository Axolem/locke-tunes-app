import {
  Text,
  View,
  VStack,
  HStack,
  useTheme,
  FlatList,
  StatusBar,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

import SongCard from "./SongCard";

const songs = [1, 2, 3, 4];
const Home = ({ navigation }) => {
  const { colors } = useTheme();
  return (
    <SafeAreaView>
      <StatusBar backgroundColor={colors.primary[50]} />
      <View py="2" backgroundColor={"primary.50"} height={"100%"}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <VStack px="6">
            <HStack justifyContent={"space-between"}>
              <Ionicons
                name="ios-menu-outline"
                size={26}
                color={colors.white[50]}
                onPress={() => navigation.toggleDrawer()}
              />
              <Ionicons
                name="ios-search"
                size={26}
                color={colors.white[50]}
                onPress={() => navigation.navigate("search")}
              />
            </HStack>
          </VStack>
          <VStack mt={5}>
            <Text fontSize={"2xl"} px="6" fontWeight={"semibold"} mb={4}>
              Recommended for you
            </Text>
            <FlatList
              data={songs}
              renderItem={(item, index) => <SongCard key={index} />}
              keyExtractor={(item) => item}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          </VStack>
          <VStack mt={5}>
            <Text fontSize={"2xl"} px="6" fontWeight={"semibold"} mb={4}>
              Recent
            </Text>
            <FlatList
              data={songs}
              renderItem={(item, index) => <SongCard key={index} />}
              keyExtractor={(item) => item}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          </VStack>
          <VStack mt={5}>
            <Text fontSize={"2xl"} px="6" fontWeight={"semibold"} mb={4}>
              Trending
            </Text>
            <FlatList
              data={songs}
              renderItem={(item, index) => <SongCard key={index} />}
              keyExtractor={(item) => item}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          </VStack>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Home;
