import AsyncStorage from '@react-native-async-storage/async-storage';

type LoginAsyncStorage = {
    email: string;
    password: string;
    name: string;
};

type PostAsyncStorage = {
    nama: string;
    barang: string;
    caption: string;
    gambar: string;
};

const getLoginAsyncStorage = async (): Promise<LoginAsyncStorage | null> => {
  try {
    const value = await AsyncStorage.getItem('user');
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const setLoginAsyncStorage = async (value: LoginAsyncStorage): Promise<void> => {
  try {
    await AsyncStorage.setItem('user', JSON.stringify(value));
  } catch (error) {
    console.log(error);
  }
};

const getPostAsyncStorage = async () => {
    try {
       const value = await AsyncStorage.getItem('post');
       
        return value != null ? JSON.parse(value) : null;
    } catch (error) {
        console.log(error);
    }
};

const setPostAsyncStorage = async (value: PostAsyncStorage) => {
    try {
        await AsyncStorage.setItem('post', JSON.stringify(value));
    } catch (error) {
        console.log(error);
    }
};
export { 
    getLoginAsyncStorage, 
    setLoginAsyncStorage,
    getPostAsyncStorage,
    setPostAsyncStorage,
    LoginAsyncStorage,
    PostAsyncStorage
};