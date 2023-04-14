import { useTheme } from 'native-base';
import { Ionicons } from "@expo/vector-icons";
import Upload from '../screens/upload/Upload';
import MyUploads from '../screens/upload/MyUploads';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export const UploadStack = () => {
    const { colors } = useTheme();
    const navigation = useNavigation();

    return (
        <Stack.Navigator initialRouteName="upload"        >
            <Stack.Screen name="upload" component={Upload} options={{ headerShown: false, }} />
            <Stack.Screen
                name="my-uploads"
                component={MyUploads}
                options={{
                    headerShown: true,
                    title: "My uploads",
                    headerStyle: {
                        backgroundColor: colors.primary[50],
                    },
                    headerTitleStyle: {
                        color: "white",
                    },
                    headerLeft: () => <Ionicons
                        onPress={() => navigation.navigate("upload")}
                        name="ios-chevron-back-outline"
                        size={28}
                        color={colors.white[50]}
                    />,
                    headerTitleAlign: "center",
                }}
            />
        </Stack.Navigator>
    );
}