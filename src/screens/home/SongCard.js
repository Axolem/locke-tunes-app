import { Center, Pressable, Text, VStack, View, useTheme } from "native-base";
import CachedImage from "react-native-expo-cached-image";

const SongCard = ({
  picture = "https://th.bing.com/th/id/R.11423d0fde75451de09d289906eef9e5?rik=vD7ClyGsRTObRw&pid=ImgRaw&r=0",
  title = "Monsters You Made",
  artist = "Axole",
}) => {
  const { colors } = useTheme();
  return (
    <View w={190}>
      <Pressable android_ripple={{ radius: 0.5, color: colors.dark[50], foreground: true }}>
        <VStack>
          <CachedImage
            style={{
              height: 180,
              width: 180,
              borderRadius: 5,
              shadowColor: colors.dark[50],
              shadowRadius: 50,
              shadowOpacity: 1,
            }}
            source={{
              uri: picture,
            }}
          />
        </VStack>
        <VStack>
          <Center>
            <Text color={colors.white[50]} fontSize={"lg"} pt={3}>
              {title}
            </Text>
          </Center>
          <Center>
            <Text textTransform={"uppercase"} color={colors.dark[50]}>
              {artist}
            </Text>
          </Center>
        </VStack>
      </Pressable>
    </View>
  );
};

export default SongCard;
