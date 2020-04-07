import React, { Component, Fragment } from 'react';
import { StyleSheet, View, Image, Dimensions, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Text, Card, Icon, Button } from '@ui-kitten/components';
import baseApi from '../../config/http';

class HomeScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			category: []
		};
	}
	getCategory = async () => {
		await baseApi.get('/category').then((res) => {
			this.setState({ category: res.data.data, isLoading: false });
		});
	};

	componentDidMount() {
		this.getCategory();
	}

	render() {
		const { width } = Dimensions.get('window');
		const { height } = Dimensions.get('screen');
		return (
			<ScrollView style={{ backgroundColor: 'white' }} showsVerticalScrollIndicator={false}>
				<View style={styles.container}>
					<View style={styles.title}>
						<Text status="info" category="h2">
							E-Complaint
						</Text>
						<Image
							source={require('../../../public/c1.png')}
							resizeMode="stretch"
							style={{ width: width, height: height * 0.25 }}
						/>
					</View>
					{/* <View
						style={{
							borderBottomColor: 'black',
							borderBottomWidth: 1
						}}
					/> */}
					<Text style={{ margin: '3%', opacity: 0.5 }} category="h6">
						Categories
					</Text>

					<View style={styles.header}>
						<View style={styles.row}>
							{this.state.isLoading === true ? (
								<ActivityIndicator size="large" />
							) : (
								this.state.category.map((data, index) => {
									return (
										<View
											key={index}
											style={{
												flexDirection: 'column',
												alignItems: 'center',
												backgroundColor: 'transparent'
											}}
										>
											<Button
												onPress={() =>
													this.props.navigation.navigate('Complaint', {
														category_id: data.id
													})}
												appearance="ghost"
												status="basic"
												style={styles.col}
												icon={(styles) => (
													<Icon {...styles} name={data.icon} width="32" height="32" />
												)}
											/>
											<Text style={{ opacity: 0.5 }}>{data.name}</Text>
										</View>
									);
								})
							)}
						</View>
					</View>
					<Text style={{ margin: '3%', opacity: 0.5 }} category="h6">
						News
					</Text>
					<Card style={styles.header}>
						<Text>Total Complaint : 150</Text>
					</Card>
					<Card style={styles.header}>
						<Text>Total Complaint : 150</Text>
					</Card>
					<Card style={styles.header}>
						<Text>Total Complaint : 150</Text>
					</Card>
				</View>
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
	title: {
		padding: 10
	},
	row: {
		flex: 1,
		flexWrap: 'wrap',
		flexDirection: 'row',
		// padding: 10,
		justifyContent: 'center'
	},
	col: {
		// padding: 10,
		flexBasis: '25%'
	},
	header: {
		borderRadius: 20,
		margin: 10,
		padding: 10,
		backgroundColor: 'white',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 12
		},
		shadowOpacity: 0.58,
		shadowRadius: 16.0,

		elevation: 24
	}
});

export default HomeScreen;
