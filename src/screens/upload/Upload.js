import { Ionicons } from "@expo/vector-icons";
import { Box, Button, Center, CheckIcon, HStack, Icon, Input, Pressable, Select, StatusBar, Text, VStack, View, useTheme } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import { Octicons } from '@expo/vector-icons';
import { useState } from "react";

const Upload = () => {
  const { colors } = useTheme();
  const [songData, setSongData] = useState({ songName: "", artistName: "", visisbility: true, category: "", tags: "", songImage:"" })


  const submitSong = () => {

  }

  return (
    <SafeAreaView>
      <StatusBar backgroundColor={colors.primary[50]} />
      <View py="2" backgroundColor={"primary.50"} height={"100%"}>
        <VStack px="6">
          <Center>
            <Pressable
              _pressed={{ opacity: 0.5, }}
              onPress={() => { console.log("Picking a song..."); }}
              mt={"5"} borderColor={colors.dark[50]}
              borderRadius={"md"} borderWidth={"1"}
              width={"2/3"}
              py={"5"}
            >
              <VStack >
                <Center>
                  <Octicons name="single-select" size={84} color={colors.dark[50]} />
                  <Text fontSize={"xl"} color={colors.dark[50]}>Pick a song from your phone</Text>
                </Center>
              </VStack>
            </Pressable>
          </Center>

          <Box mt={"10"}>
            <Center>
              <Input
                p={"2"}
                mb={"5"}
                size={"lg"}
                variant={"rounded"}
                placeholder="Song name"
                borderColor={colors.dark[100]}
                w={{ base: "100%", md: "25%" }}
                InputLeftElement={
                  <Icon as={
                    <Ionicons name="ios-musical-note-outline" size={24} color={colors.dark[50]} />
                  }
                    size={5} ml="5" mr={"3"}
                    color={colors.dark[50]}
                  />
                }
                value={songData.songName}
                onChangeText={(value) => setUserData({ ...songData, songName: value })}
              />
              <Input
                p={"2"}
                mb={"5"}
                size={"lg"}
                variant={"rounded"}
                placeholder="Artist name"
                borderColor={colors.dark[100]}
                w={{ base: "100%", md: "25%" }}
                InputLeftElement={
                  <Icon as={
                    <MaterialCommunityIcons name="account-music-outline" size={24} color={colors.dark[50]} />
                  }
                    size={5} ml="5" mr={"3"}
                    color={colors.dark[50]}
                  />
                }
                value={songData.artistName}
                onChangeText={(value) => setUserData({ ...songData, artistName: value })}
              />
              <Input
                p={"2"}
                mb={"5"}
                size={"lg"}
                variant={"rounded"}
                placeholder="hashtag (#tunes, #locked, #deep)"
                borderColor={colors.dark[100]}
                w={{ base: "100%", md: "25%" }}
                InputLeftElement={
                  <Icon as={
                    <MaterialCommunityIcons name="music-accidental-sharp" size={24} color={colors.dark[50]} />
                  }
                    size={5} ml="5" mr={"3"}
                    color={colors.dark[50]}
                  />
                }
                value={songData.tags}
                onChangeText={(value) => setUserData({ ...songData, tags: value })}
              />

              <Select
                p={"2"}
                mb={"5"}
                size={"lg"}
                variant={"rounded"}
                borderColor={colors.dark[100]}
                w={{ base: "100%", md: "25%" }}
                accessibilityLabel="Choose Service"
                placeholder="Choose category"
                _selectedItem={{
                  endIcon:
                    <CheckIcon size="5" />
                }}
                InputLeftElement={
                  <Icon as={
                    <MaterialIcons name="category" size={24} color={colors.dark[50]} />
                  }
                    size={5} ml="5" mr={"3"}
                    color={colors.dark[50]}
                  />
                }
                selectedValue={songData.category}
                onValueChange={value => setSongData({ ...songData, category: value })}
              >
                <Select.Item label="Deep Soul" value="deep" />
                <Select.Item label="AmaPiano" value="piano" />
                <Select.Item label="Locked Tune" value="locked" />
              </Select>

              <Select
                p={"2"}
                mb={"5"}
                size={"lg"}
                variant={"rounded"}
                borderColor={colors.dark[100]}
                w={{ base: "100%", md: "25%" }}
                accessibilityLabel="Choose visibility"
                placeholder="Choose song visibility"
                _selectedItem={{
                
                  endIcon:
                    <CheckIcon size="5" />
                }}
                InputLeftElement={
                  <Icon as={
                    <MaterialIcons name="public" size={24} color={colors.dark[50]} />
                  }
                    size={5} ml="5" mr={"3"}
                    color={colors.dark[50]}
                  />
                }
                selectedValue={songData.visisbility}
                onValueChange={value => setSongData({ ...songData, visisbility: value })}
              >
                <Select.Item label="Public" value={true} />
                <Select.Item label="Private" value={false} />
              </Select>
            </Center>
          </Box>
          <Button mt={"5"} variant={"solid"} onPress={() => submitSong()}>Submit</Button>
        </VStack>
      </View>
    </SafeAreaView>
  );
};

export default Upload;
