import Database from "./backend";
import { errorDisplay, successDisplay } from "./functions";

const user = new Database.User();

export const changeSongLike = async (songId, state) => {
}

export const doUserLogin = async (data = { email: "", password: "" }) => {

    user.set("username", data.email.toLowerCase());
    user.set("password", data.password);

    return await user.logIn()
        .then(async (loggedInUser) => {
            successDisplay(`Hi, ${loggedInUser.get('username')}!`);
            const currentUser = await Database.User.currentAsync();
            if (loggedInUser === currentUser) {
                const data = loggedInUser.toJSON();
                return [true, data];
            }
            throw "Failed to verify user!"
        })
        .catch((error) => {
            errorDisplay(error.message.toString());
            return [false];
        }
        );
}

export const doUserRegister = async (data = { email: "", password: "", name: "", }) => {
    user.set("name", data.name)
    user.set("email", data.email.toLowerCase())
    user.set("username", data.email.toLowerCase())
    user.set("password", data.password)

    return await user.signUp()
        .then((createdUser) => {
            successDisplay(`Welcome ${createdUser.get("username")}!`)
            const data = createdUser.toJSON();
            return [true, data];
        })
        .catch((error) => {
            errorDisplay(error.message.toString());
            return [false];
        }
        );
}

export const doPasswordReset = async (data = { email: "" }) => {
    return await Database.User.requestPasswordReset(data.email)
        .then(() => {
            successDisplay(`Please check your email to proceed with password reset.`);
            return [true];
        })
        .catch((error) => {
            errorDisplay(error.message);
            return [false];
        }
        );
}

export const getCurrentUser = async () => {
    const currentUser = await Database.User.currentAsync();

    if (currentUser !== null) {
        const data = currentUser.toJSON();
        return [true, data];
    }
    return [false]
};

export const doUserLogOut = async () => {
    try {
        await Database.User.logOut();
        const currentUser = await Database.User.currentAsync();
        if (currentUser === null) {
            successDisplay("Logged out!")
        }
        return true;
    } catch (error) {
        errorDisplay(error.message);
        return false;
    }
};

export const uploadSong = async (song = {
    songName: "", artistName: "", visisbility: true, category: "", tags: [], songImage: ""
}
) => {

    try {
        const songFile = new Database.File(song.file.fileName, { base64: song.file.base64String }, song.file.fileMIMEType);

        const user = await Database.User.currentAsync();

        const responseFile = await songFile.save();

        const Music = Database.Object.extend('music');

        const music = new Music();

        music.set('sondFile', responseFile);
        music.set('songName', song.songName);
        music.set('artist', song.artistName);
        music.set('visibility', song.visisbility);
        music.set('category', song.category);
        music.set('tags', song.tags);
        music.set('owner', user);

        await music.save();

        successDisplay('Song uploaded successfully.', "saveSong");

    } catch (error) {
        errorDisplay(error.message, "saveSong")
    }
}