import React from 'react';
import baseApi from '../../config/http';
import { StyleSheet, Image, Alert, Dimensions, Picker, View, ToastAndroid, ActivityIndicator } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { Layout, Text, Input, Button, CheckBox, Icon, Radio, RadioGroup } from '@ui-kitten/components';
import { ScrollView } from 'react-native-gesture-handler';
import Geolocation from '@react-native-community/geolocation';
import ModalLoader from '../../components/ModalLoader';
import Search from './Search';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

export default class ComplainScreen extends React.Component {
	state = {
		visibleModal: false,
		checked: false,
		latitude: '',
		longitude: '',
		dataCategory: [],
		description: '',
		address: '',
		loadingCategory: true,
		category_id: '',
		isAnonym: 0,
		foto: null,
		loading: true
	};

	handleChoosefoto = () => {
		const options = {
			noData: true
		};
		ImagePicker.launchImageLibrary(options, (response) => {
			if (response.uri) {
				this.setState({ foto: response });
				console.info(this.state.foto);
			}
		});
	};

	componentDidMount() {
		Geolocation.getCurrentPosition(
			(position) => {
				this.setState({
					latitude: position.coords.latitude,
					longitude: position.coords.longitude,
					loading: false,
					error: null
				});
			},
			(error) => {
				alert(error);
				this.setState({
					error: error.message,
					loading: false
				});
			},
			{ enableHighAccuracy: true, timeout: 200000, maximumAge: 5000 }
		);

		this.getCategory();
	}

	handleSubmit = async () => {
		this.setState({ visibleModal: !this.state.visibleModal });
		const formData = new FormData();

		formData.append('foto', {
			uri: this.state.foto.uri,
			type: 'image/jpeg',
			name: this.state.foto.fileName
		}),
			// formData.append(this.state),
			formData.append('description', this.state.description),
			formData.append('category_id', this.state.category_id),
			formData.append('user_id', this.state.user_id),
			formData.append('address', this.state.address),
			formData.append('latitude', this.state.latitude),
			formData.append('longitude', this.state.longitude),
			formData.append('isAnonym', this.state.isAnonym);

		await baseApi
			.post('/complaint/create', formData)
			.then((res) => {
				this.setState({
					visibleModal: false,
					checked: false,
					latitude: '',
					longitude: '',
					dataCategory: [],
					description: '',
					address: '',
					category_id: '',
					isAnonym: 0,
					foto: null,
					loading: true
				});

				ToastAndroid.show('Success', ToastAndroid.LONG, ToastAndroid.CENTER);
				this.props.navigation.navigate('MyReport');
			})
			.catch((err) => {
				console.info(err);
			});
	};

	getCategory = async () => {
		await baseApi
			.get('/category')
			.then((res) => {
				this.setState({
					dataCategory: res.data.data,
					loadingCategory: false
				});
			})
			.catch((err) => {
				console.info(err);
			});
	};

	render() {
		return (
			<ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: 'white' }}>
				<ModalLoader visible={this.state.visibleModal} />
				<Layout style={StyleSheet.container}>
					<Layout style={{ padding: 15 }}>
						<Text status="info" category="h4">
							Create Complaint
						</Text>
					</Layout>
					<Layout style={styles.form}>
						<Input
							label="Title"
							size="small"
							status="basic"
							onChangeText={(description) => this.setState({ description: description })}
							value={this.state.description}
							editable={true}
						/>
						<Input
							label="Address"
							size="small"
							status="basic"
							numberOfLines={3}
							onChangeText={(address) => this.setState({ address: address })}
							value={this.state.address}
							multiline={true}
							editable={true}
						/>
						<Layout
							style={{
								flexWrap: 'wrap',
								flexDirection: 'row'
							}}
						/>
						<Text style={{ opacity: 0.5 }}>Category</Text>
						<RadioGroup
							style={styles.row}
							selectedIndex={this.state.category_id}
							onChange={(category_id) => this.setState({ category_id: category_id })}
						>
							{this.state.loadingCategory ? (
								<ActivityIndicator size="large" />
							) : (
								this.state.dataCategory.map((data, index) => {
									return <Radio key={index} style={styles.radio} text={data.name} />;
								})
							)}
						</RadioGroup>
						{this.state.foto == null ? (
							<Image source={require('../../../public/c3.png')} style={{ width: 300, height: 300 }} />
						) : (
							<Image source={this.state.foto} style={{ width: 300, height: 300 }} />
						)}
						<Button
							appearance="ghost"
							status="basic"
							icon={(styles) => <Icon {...styles} name="image-outline" width="32" height="32" />}
							onPress={this.handleChoosefoto}
						/>
						<CheckBox
							text="Report as Anonym"
							checked={this.state.isAnonym == 1 ? true : false}
							onChange={() => {
								this.setState({ isAnonym: this.state.isAnonym == 1 ? 0 : 1 });
							}}
							status="info"
						/>
						<Button
							status="info"
							disabled={this.state.isAnonym == 1 ? false : true}
							onPress={this.handleSubmit}
						>
							Submit
						</Button>
					</Layout>
				</Layout>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: 'white'
	},
	mapContainer: {
		alignItems: 'center',
		alignSelf: 'center',
		height: 320,
		width: Dimensions.get('screen').width
	},
	row: {
		flex: 1,
		flexWrap: 'wrap',
		flexDirection: 'row',
		padding: 10
	},
	radio: {
		flexBasis: '50%'
	},
	form: {
		padding: 20
	}
});
