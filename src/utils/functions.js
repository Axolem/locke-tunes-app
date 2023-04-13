import { Box, Text, Toast } from "native-base";

export const errorDisplay = (massage = "", id = "123") => {

    if (!Toast.isActive(id)) {
        return Toast.show({
            id, 
            placement: "top",
            render: () => {
                return (
                    <Box id={id} key={id} bg="red.500" px="2" py="1" rounded="sm" mb={5} >
                        <Text fontSize={"md"}>{massage}</Text>
                    </Box>
                );
            },



        })
    }
}