import React from 'react';
import Axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const instance = Axios.create({
	baseURL: `http://192.168.43.136:5000`
});

async function getToken() {
	let token = await AsyncStorage.getItem('token');
	if (token) {
		instance.defaults.headers.common['authorization'] = `${JSON.parse(token)}`;
	}
}

getToken();

export default instance;
