import { Box, Toast } from "native-base";

export const changeSongLike = async (songId, state) => {
    console.log(`Changed song ${songId} like to: `, state);
}

export const doUserLogin = async (data = { email: "", password: "" }) => {
    try {
        console.log(`Loging ${data.email} with pass: `, data.password);
        Toast.show({
            render: () => {
                return <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
                    Hello! You've got the keys.
                </Box>;
            }
        });
        return [true, {}]
    } catch (error) {
        Toast.show({
            render: () => {
                return <Box bg="red.500" px="2" py="1" rounded="sm" mb={5}>
                    Opss! Failed to log you in.
                </Box>;
            }
        });
        return [false]
    }

}

export const doUserRegister = async (data = { email: "", password: "" }) => {
    try {
        console.log(`Register ${data.email} with pass: `, data.password);
        Toast.show({
            render: () => {
                return <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
                    Hello! You've got the keys.
                </Box>;
            }
        });
        return [true, {}]
    } catch (error) {
        Toast.show({
            render: () => {
                return <Box bg="red.500" px="2" py="1" rounded="sm" mb={5}>
                    Opss! Failed to log you in.
                </Box>;
            }
        });
        return [false]
    }
}

export const doPasswordReset = async (data = { email: "" }) => {
    try {
        console.log(`Reset ${data.email} password`);
        Toast.show({
            render: () => {
                return <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
                    Hello! Check your mail to contunue.
                </Box>;
            }
        });
        return true

    } catch (error) {
        Toast.show({
            render: () => {
                return <Box bg="red.500" px="2" py="1" rounded="sm" mb={5}>
                    Opss! Failed to log you in.
                </Box>;
            }
        });
        return false
    }
}