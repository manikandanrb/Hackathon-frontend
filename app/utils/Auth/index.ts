import AsyncStorage from '@react-native-community/async-storage';

const authTokenKey = 'authToken';
const userLanguage = 'userLang';

const getAuthToken = async () => {
    const authToken = await AsyncStorage.getItem(authTokenKey);
    return authToken;
}

const setAuthToken = async (authToken) => {
    await AsyncStorage.setItem(authTokenKey, authToken);
}

const removeAuthToken = async () => {
    await AsyncStorage.removeItem(authTokenKey);
}


export { getAuthToken, setAuthToken, removeAuthToken };
