import { Center, HStack, Pressable, Slider, Text, VStack, View, useTheme } from 'native-base'
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

const SongControls = ({ songLength = 3.45, currentTime = 3.45 }) => {
    const ICON_SIZE_S = 30;
    const ICON_SIZE_L = 40;

    const { colors } = useTheme()

    const [repeat, setRepeat] = useState(false)
    const [playing, setPlaying] = useState(false)
    const [shuffle, setShuffle] = useState(false)
    const [seek, setSeek] = useState(currentTime)

    const seekSong = (e) => {
        setSeek(e)
    }
    const songPlayingState = () => {
        setPlaying(!playing)
    }
    const repeatState = () => {
        setRepeat(!repeat)
    }
    const shuffleState = () => {
        setShuffle(!shuffle)
    }


    return (
        <VStack>
            <Center>

                <View mt={"1"} mb={"5"}>
                    <HStack justifyContent={'space-between'} w={"1/2"} >

                        <Ionicons name="ios-volume-low-outline" size={ICON_SIZE_S} color={colors.dark[100]} />

                        <Ionicons name="ios-shuffle" size={ICON_SIZE_S} color={shuffle ? colors.dark[50] : colors.dark[100]} onPress={() => shuffleState()} />

                        <Ionicons name="ios-repeat-outline" size={ICON_SIZE_S} color={repeat ? colors.dark[50] : colors.dark[100]} onPress={() => repeatState()} />

                    </HStack>
                </View>

                <HStack alignItems={'center'} justifyContent={'space-between'} w={'full'}>
                    <Text w={'10'} textAlign={"center"}>{seek.toString().replace('.', ':')}</Text>
                    <Slider w="3/4" value={seek} minValue={0} maxValue={songLength} step={0.01} onChange={(e) => seekSong(e)}>
                        <Slider.Track>
                            <Slider.FilledTrack bgColor={"dark.100"} />
                        </Slider.Track>
                        <Slider.Thumb bgColor={"dark.50"} />
                    </Slider>
                    <Text w={'10'} textAlign={"center"}>{songLength.toString().replace('.', ':')}</Text>
                </HStack>

                <View px={"20"} mt={"10"}>
                    <Center>
                        <HStack justifyContent={"space-between"} w={"full"} alignItems={"center"}>
                            <Pressable onPress={() => { }} _pressed={{ opacity: 0.5 }}>
                                <Ionicons name="ios-play-skip-back" size={ICON_SIZE_L - 10} color={colors.dark[100]} />
                            </Pressable>
                            <Pressable onPress={() => { songPlayingState() }} _pressed={{ opacity: 0.5 }} >
                                <Ionicons name={playing ? "ios-pause-outline" : "ios-play"} size={ICON_SIZE_L + 10} color={colors.dark[100]} />
                            </Pressable>
                            <Pressable onPress={() => { }} _pressed={{ opacity: 0.5 }}>
                                <Ionicons name="play-skip-forward" size={ICON_SIZE_L - 10} color={colors.dark[100]} />
                            </Pressable>
                        </HStack>
                    </Center>
                </View>

            </Center>
        </VStack>
    )
}

export default SongControls