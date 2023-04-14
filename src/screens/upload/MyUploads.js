//import { Ionicons } from "@expo/vector-icons";
import { Center, StatusBar, Text, VStack, View, useTheme } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";

const Upload = () => {
    const { colors } = useTheme();
    return (
        <SafeAreaView>
            <StatusBar backgroundColor={colors.primary[50]} />
            <View py="2" backgroundColor={"primary.50"} height={"100%"}>
                <VStack px="6">
                    <Center>
                        <Text>My Uploads</Text>
                    </Center>
                </VStack>
            </View>
        </SafeAreaView>
    );
};

export default Upload;
