import React from 'react';
import { Image, Alert, StyleSheet, View, RefreshControl } from 'react-native';
import { Card, Text, Button, Icon, Layout } from '@ui-kitten/components';
import { ScrollView } from 'react-native-gesture-handler';
import baseApi from '../../../config/http';
import Loader from '../../../components/Loader';

class OnGoing extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			data: []
		};
	}

	async componentDidMount() {
		await this.getData();
	}

	getData = async () => {
		await baseApi
			.get('/complaint/on-going')
			.then((res) => {
				this.setState({
					isLoading: false,
					data: res.data.data
				});
			})
			.catch((err) => {
				alert('something is went wrong' + err);
			});
	};

	onRefresh() {
		this.setState({
			data: [],
			isLoading: true
		});
		this.getData();
	}

	handleCancel = async (id) => {
		await baseApi
			.delete(`/complaint/${id}/delete`)
			.then((res) => {
				Alert.alert('Success', 'Your Complaint has been deleted.', [ { text: 'Okay' } ]);
				this.getData();
			})
			.catch((err) => {
				console.warn(err);
			});
	};

	render() {
		if (this.state.isLoading) {
			return <Loader />;
		}
		return (
			<ScrollView
				maximumZoomScale={1}
				contentContainerStyle={{ paddingBottom: '20%' }}
				showsVerticalScrollIndicator={false}
				refreshControl={
					<RefreshControl refreshing={this.state.isLoading} onRefresh={this.onRefresh.bind(this)} />
				}
			>
				<Layout style={styles.container}>
					<Text style={{ alignSelf: 'center', opacity: 0.5 }}>Pull to refresh</Text>
					{this.state.data.map((item, index) => {
						return (
							<Layout style={styles.row} key={index}>
								<Card
									header={() => (
										<React.Fragment>
											<Text style={styles.headerText} status="info" category="h5">
												{item.description}
											</Text>
										</React.Fragment>
									)}
									footer={() => (
										<View style={styles.footerContainer}>
											<Button
												appearance="ghost"
												status="basic"
												icon={(style) => (
													<Icon {...style} name="pie-chart-outline" width="32" height="32" />
												)}
											>
												{new Date(item.createdAt).toLocaleDateString()}
											</Button>
											<Button
												style={styles.footerControl}
												appearance="ghost"
												size="small"
												status="basic"
												onPress={() =>
													Alert.alert(
														'Cancel ?',
														'If you cancel this complaint, we will deleted this complaint permanent.',
														[
															{ text: 'NO' },
															{ text: 'YES', onPress: () => this.handleCancel(item.id) }
														]
													)}
												icon={(style) => (
													<Icon {...style} name="close-outline" width="32" height="32" />
												)}
											/>
											<Button
												size="small"
												appearance="ghost"
												status="basic"
												onPress={() =>
													Alert.alert('Edit ?', '.', [
														{ text: 'NO', onPress: () => console.warn('NO Pressed') },
														{ text: 'YES', onPress: () => console.warn('YES Pressed') }
													])}
												icon={(style) => (
													<Icon {...style} name="edit-outline" width="32" height="32" />
												)}
											/>
										</View>
									)}
									style={styles.myCard}
								>
									<Image
										style={styles.headerImage}
										resizeMethod="scale"
										resizeMode="cover"
										source={{ uri: `http://192.168.43.136:5000/images/${item.foto}` }}
									/>
									<Text style={styles.headerText}>Address : {item.address}</Text>
									<Text style={styles.headerText} status="info" category="h6">
										#{item.categories.name}
									</Text>
								</Card>
							</Layout>
						);
					})}
				</Layout>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		// flexDirection: 'column',
		backgroundColor: 'white'
	},
	row: {
		padding: 10,
		backgroundColor: 'transparent'
	},
	headerText: {
		marginHorizontal: 24,
		marginVertical: 16,
		color: 'black',
		opacity: 0.5,
		fontWeight: 'bold'
	},
	footerContainer: {
		backgroundColor: 'transparent',
		flexDirection: 'row',
		justifyContent: 'flex-end'
	},
	footerControl: {
		marginHorizontal: 4
	},
	headerImage: {
		height: 300
	},
	myCard: {
		// backgroundColor: 'white',
		marginTop: '2%',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 11
		},
		shadowOpacity: 0.57,
		shadowRadius: 15.19,

		elevation: 23
	}
});

export default OnGoing;
