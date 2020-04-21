import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';

class History extends React.Component {
	state = {
		isLoading: true
	};
	render() {
		return (
			<ScrollView>
				<TouchableOpacity
					onPress={() => {
						alert('Clicked');
					}}
				>
					<ListComplaint
						title="Pelaporan Jalan Rusak"
						description="The key feature of wrapping custom list items into ListItem component is that it automatically"
						icon={FailIcon}
					/>
				</TouchableOpacity>
				<ListComplaint
					title="Pelaporan Lampu Merah"
					description="The key feature of wrapping custom list items into ListItem component is that it automatically"
					icon={StarIcon}
				/>
			</ScrollView>
		);
	}
}

export default History;
