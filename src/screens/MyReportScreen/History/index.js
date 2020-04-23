import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import ListComplaint from '../../../components/ListComplaint';
import { Icon } from '@ui-kitten/components';
import baseApi from '../../../config/http';
import Loader from '../../../components/Loader';
import { View } from 'react-native';

class History extends React.Component {
	state = {
		isLoading: true,
		data: []
	};

	getData = async () => {
		baseApi
			.get('/complaint')
			.then((res) => {
				this.setState({ isLoading: false, data: res.data.data });
			})
			.catch((err) => {
				console.warn(err);
			});
	};

	componentDidMount() {
		this.getData();
	}
	render() {
		const SuccessIcon = (style) => <Icon {...style} name="checkmark" />;
		const FailIcon = (style) => <Icon {...style} name="close" />;

		if (this.state.isLoading) {
			return <Loader />;
		}
		return (
			<View style={{ backgroundColor: 'white' }}>
				<ScrollView>
					{this.state.data.map((data) => {
						return (
							<TouchableOpacity key={data.id}>
								<ListComplaint
									title={data.description}
									description={data.address}
									icon={data.status != 1 ? FailIcon : SuccessIcon}
								/>
							</TouchableOpacity>
						);
					})}
				</ScrollView>
			</View>
		);
	}
}

export default History;
