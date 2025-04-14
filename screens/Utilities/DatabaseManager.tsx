// // Async storage is use to store the local data and persistence
// import AsyncStorage from '@react-native-async-storage/async-storage';

// // function to store data in the async storage with email and password
// export const storeUser = async (user: { email: string; password: string }) => {
//     try {
//         await AsyncStorage.setItem('user', JSON.stringify(user));
//     } catch (error) {
//         console.error('Error saving user data:', error);
//     }
// };

// // function to get the data from the async storage with the key 'user'
// export const getStoredUser = async () => {
//     try {
//         const jsonValue = await AsyncStorage.getItem('user');
//         return jsonValue != null ? JSON.parse(jsonValue) : null;
//     } catch (error) {
//         console.error('Error reading user data:', error);
//         return null;
//     }
// };


import AsyncStorage from '@react-native-async-storage/async-storage';

const USERS_KEY = 'users';

export const storeUser = async (newUser: { email: string; password: string }) => {
    try {
        const usersData = await AsyncStorage.getItem(USERS_KEY);
        const users = usersData ? JSON.parse(usersData) : [];

        // Check if user already exists
        const userExists = users.some((user: any) => user.email === newUser.email);
        if (userExists) {
            throw new Error('User with this email already exists');
        }

        users.push(newUser);
        await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
    } catch (error) {
        throw error;
    }
};

export const getUserByEmail = async (email: string) => {
    try {
        const usersData = await AsyncStorage.getItem(USERS_KEY);
        const users = usersData ? JSON.parse(usersData) : [];

        const foundUser = users.find((user: any) => user.email === email);
        return foundUser || null;
    } catch (error) {
        console.error('Error reading user data:', error);
        return null;
    }
};
