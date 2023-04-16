import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Avatar, Center, FlatList, HStack, Icon, Input, Modal, Pressable, Text } from 'native-base'

const SelectSongModal = (
    { modalVisible, setModalVisible, allSongs, setSongData }
) => {
    const [search, setSearch] = useState("");
    const [data, setData] = useState(allSongs);

    const doSearch = (text) => {
        setSearch(text)
        const newSongs = allSongs.filter(song => song.filename.toLocaleLowerCase().includes(text.toLocaleLowerCase()));
        setData(newSongs)
    }

    return (
        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)} avoidKeyboard justifyContent="flex-end" size="lg" safeAreaTop={true}>
            <Modal.Content  {...styles.top} maxH="80%">
                <Modal.Header >
                    <Input placeholder="Search by song name" variant="filled" width="80%" borderRadius="10" py="1" px="3"
                        fontSize={'md'}
                        InputLeftElement={<Icon ml="2" size="4" color="gray.400"
                            as={<Ionicons name="ios-search" />}
                        />}
                        onChangeText={(text) => doSearch(text)}
                        value={search}
                    /><Modal.CloseButton />
                </Modal.Header>
                <FlatList
                    px={'5'}
                    data={data}
                    renderItem={({ item }) => {
                        const seconds = Math.floor(item.duration % 60);
                        const time = `${Math.floor(item.duration / 60)}:${seconds < 10 ? `0${seconds}` : seconds}`
                        return (
                            <Pressable onPress={() => {
                                setSongData(prevState => ({ ...prevState, songName: item.filename, url: item.uri }));
                                setModalVisible(false)
                            }} py={5} _pressed={{ opacity: 0.5 }}>
                                <HStack alignItems={'center'} justifyContent={"space-between"}>
                                    <Avatar alignSelf="center" size="sm" >
                                        <Ionicons name="ios-musical-note" size={20} color="black" />
                                    </Avatar>
                                    <Text w={"70%"} px={'3'}>{item.filename.slice(0, 50)}</Text>
                                    <Text w={"15%"} textAlign={'right'}>{time}</Text>
                                </HStack>
                            </Pressable>
                        )
                    }
                    }

                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <Center>
                            <Text fontSize={'md'} py={'3'}>{search.length === 0 ? "Search to see songs" : "No songs found!"}</Text>
                        </Center>
                    }
                />
            </Modal.Content>
        </Modal>
    )
}

export default SelectSongModal

const styles = {
    top: {
        marginBottom: "auto",
        marginTop: 55
    },
};