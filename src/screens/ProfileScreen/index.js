import React, { Component } from 'react';
import { Alert, StyleSheet, View, Modal, Animated, ActivityIndicator } from 'react-native';
import { Text, Button, Card, Spinner } from '@ui-kitten/components';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { AsyncStorage } from '@react-native-community/async-storage';
import baseApi from '../../config/http';

class ProfileScreen extends Component {
	state = {
		fadeAnim: new Animated.Value(0),
		isLoading: true,
		modal: false,
		name: '',
		email: '',
		accepted: 0,
		rejected: 0,
		total: 0
	};

	getProfile = async () => {
		await baseApi.get('/profile').then((res) => {});
	};

	handleLogout = async () => {
		this.setState({ modal: true });
		this.clearToken();

		setTimeout(() => {
			this.props.navigation.navigate('Auth');
			this.setState({ modal: false });
		}, 3000);
	};

	async clearToken() {
		await AsyncStorage.clear();
	}

	fadeIn = () => {
		// Will change fadeAnim value to 1 in 5 seconds
		Animated.timing(this.state.fadeAnim, {
			toValue: 1,
			duration: 2000
		}).start();
	};

	componentDidMount() {
		setTimeout(() => {
			this.fadeIn();
			this.setState({
				isLoading: false
			});
		}, 1000);
	}

	fadeOut = () => {
		// Will change fadeAnim value to 0 in 5 seconds
		Animated.timing(this.state.fadeAnim, {
			toValue: 0,
			duration: 2000
		}).start();
	};
	render() {
		if (this.state.isLoading) {
			return <ActivityIndicator size="large" color="#0000ff" />;
		}
		return (
			<ScrollView style={{ backgroundColor: 'white' }} showsVerticalScrollIndicator={false}>
				<Modal
					animationType="slide"
					transparent={true}
					transparent={true}
					backdropStyle={styles.backdrop}
					visible={this.state.modal}
				>
					<View style={styles.backdrop}>
						<Spinner size="giant" />
						<Text status="control">Load..</Text>
					</View>
				</Modal>
				<View
					style={{
						padding: 25
					}}
				>
					<Text status="info" category="h2">
						Profile
					</Text>
				</View>
				<Animated.View
					style={[
						styles.container,
						{
							opacity: this.state.fadeAnim // Bind opacity to animated value
						}
					]}
				>
					<Card style={styles.card}>
						<Text style={styles.text} category="h6">
							Name
						</Text>
						<TouchableOpacity>
							<Text style={styles.text}>Alfy Adinata</Text>
						</TouchableOpacity>
					</Card>
					<Card style={styles.card}>
						<Text style={styles.text} category="h6">
							Email
						</Text>
						<TouchableOpacity>
							<Text style={styles.text}>alfy@gmail.com</Text>
						</TouchableOpacity>
					</Card>

					<Card style={styles.card}>
						<Text style={styles.text} category="h4">
							Complaint
						</Text>
						<Text style={styles.text}>Total : 20</Text>
						<Text style={styles.text}>Accepted : 20</Text>
						<Text style={styles.text}>Rejected : 20</Text>
					</Card>
					<Card style={styles.card}>
						<TouchableOpacity onPress={this.handleLogout} style={styles.logout}>
							<Text style={styles.text} status="danger">
								Logout
							</Text>
						</TouchableOpacity>
					</Card>
				</Animated.View>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		padding: 35
	},
	text: {
		opacity: 0.5,
		fontWeight: 'bold'
	},
	backdrop: {
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		marginTop: '50%',
		alignSelf: 'center',
		padding: 20,
		borderRadius: 20
	},
	card: {
		marginBottom: '8%',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 11
		},
		shadowOpacity: 0.55,
		shadowRadius: 14.78,

		elevation: 22
	}
});

export default ProfileScreen;
