import { useState } from "react";
//import SelectSongModal from "./SelectSongModal";
import { errorDisplay } from "../../utils/functions";
import { Octicons, Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Box, Button, Center, CheckIcon, Icon, Input, Pressable, Select, StatusBar, Text, VStack, View, useTheme } from "native-base";

import trim from 'validator/lib/trim';
import isLength from 'validator/lib/isLength';
import { uploadSong } from "../../utils/communicateToDb";

import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as DocumentPicker from 'expo-document-picker';
import { useCallback } from "react";



const Upload = () => {
  const { colors } = useTheme();
  const [songData, setSongData] = useState({ songName: "", artistName: "", visisbility: true, category: "", tags: "", songImage: "", file: {} })
  //const [allSongs, setAllSongs] = useState([])
  //const [modalVisible, setModalVisible] = useState(false);

  useFocusEffect(useCallback(() => {
    return async () => {

      const permission = await MediaLibrary.getPermissionsAsync();
      console.log("Ran", permission);
      if (permission.granted) {
        return
      }

      if (!permission.canAskAgain && !permission.granted) {
        await MediaLibrary.getPermissionsAsync();
      }

      if (!permission.granted && permission.canAskAgain) {
        const { status, canAskAgain } =
          await MediaLibrary.requestPermissionsAsync();
        if (status === 'denied' && canAskAgain) {
          await MediaLibrary.getPermissionsAsync();
        }
      }
    }
  }
  ))

  const getSongFronPhone = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: "audio/*", copyToCacheDirectory: true });
      if (result.type === 'cancel') throw "cancelled!";

      const fileUri = result.uri;
      const fileName = result.name;
      const fileSize = result.size;
      const fileMIMEType = result.type;

      const base64String = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const file = {
        fileName,
        fileSize,
        fileMIMEType,
        base64String
      }

      setSongData(prev => ({ ...prev, file, songName: fileName }))
    } catch (error) {
      errorDisplay(error.message, "picker");
    }
  }

  const submitSong = async () => {
    const name = trim(songData.songName)
    const aname = trim(songData.artistName)
    const tags = trim(songData.tags)

    if (!isLength(name, { min: 3, max: 20 })) { return errorDisplay("Invalid song name!", "songName") }
    if (!isLength(aname, { min: 3, max: 12 })) { return errorDisplay("Invalid artist name!", "aName") }
    if (!isLength(tags, { min: 3, max: 12 })) { return errorDisplay("Please enter 1 tag at least!", "tag") }

    const song = {
      ...songData, songName: name, artistName: aname, tags: tags.split(',')
    }

    await uploadSong(song)
  }

  return (
    <SafeAreaView>
      <StatusBar backgroundColor={colors.primary[50]} />
      <View py="2" backgroundColor={"primary.50"} height={"100%"}>
        <VStack px="6">
          <Center>
            <Pressable
              _pressed={{ opacity: 0.5, }}
              onPress={() => { getSongFronPhone() }}
              mt={"5"} borderColor={colors.dark[50]}
              borderRadius={"md"} borderWidth={"1"}
              width={"2/3"}
              py={"5"}
            >
              <VStack >
                <Center>
                  <Octicons name="single-select" size={84} color={colors.dark[50]} />
                  <Text fontSize={"xl"} color={colors.dark[50]}>
                    {songData.songName ? songData.songName : "Pick a song from your phone"}
                  </Text>
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
                onChangeText={(value) => setSongData({ ...songData, songName: value })}
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
                onChangeText={(value) => setSongData({ ...songData, artistName: value })}
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
                onChangeText={(value) => setSongData({ ...songData, tags: value })}
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
      {/* <SelectSongModal allSongs={allSongs} modalVisible={modalVisible} setModalVisible={setModalVisible} setSongData={setSongData} /> */}
    </SafeAreaView>
  );
};

export default Upload;
