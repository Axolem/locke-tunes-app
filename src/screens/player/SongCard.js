import { Center, Pressable, Text, VStack, View, useTheme } from "native-base";
import CachedImage from "react-native-expo-cached-image";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { changeSongLike } from "../../utils/communicateToDb";

const SongCard = ({
  picture = "https://th.bing.com/th/id/R.11423d0fde75451de09d289906eef9e5?rik=vD7ClyGsRTObRw&pid=ImgRaw&r=0",
  title = "Monsters You Made",
  artist = "Axole",
  liked = false
}) => {
  const { colors } = useTheme();

  const [songLiked, setSongLiked] = useState(liked)

  const changeSongLikeState = (songId) => {
    setSongLiked(!songLiked)
    changeSongLike(songId, !songLiked)
  }


  return (
    <View py={20}>
      <VStack>
        <CachedImage
          style={{
            height: 300,
            width: 300,
            borderRadius: 20,
            shadowColor: colors.dark[50],
            shadowRadius: 20,
            shadowOpacity: 1,
          }}
          source={{
            uri: picture,
          }}
        />
      </VStack>
      <VStack>
        <Center>
          <Text color={colors.white[50]} fontSize={"2xl"} pt={3}>
            {title}
          </Text>
        </Center>
        <Center>
          <Text textTransform={"uppercase"} color={colors.dark[50]} fontSize={"lg"}>
            {artist}
          </Text>
        </Center>
        <Center mt={"4"}>
          <Pressable onPress={() => changeSongLikeState("1")}>
            <Ionicons name={songLiked ? "ios-heart-outline"
              : "ios-heart-sharp"} size={32} color={colors.dark[50]} />
          </Pressable>
        </Center>
      </VStack>
    </View>
  );
};

export default SongCard;
