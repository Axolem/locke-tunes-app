import AsyncStorage from '@react-native-async-storage/async-storage';
import Database from 'parse/react-native';
import { JAVASCRIPT_KEY, APP_ID, APP_URI } from "@env";

Database.setAsyncStorage(AsyncStorage);
Database.initialize(APP_ID, JAVASCRIPT_KEY);
Database.serverURL = APP_URI

export default Database;