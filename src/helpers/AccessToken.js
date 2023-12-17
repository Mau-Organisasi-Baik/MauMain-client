import * as SecureStore from 'expo-secure-store';
export const access_token = async() => {
    const token = await SecureStore.getItemAsync('access_token')
    return token
}