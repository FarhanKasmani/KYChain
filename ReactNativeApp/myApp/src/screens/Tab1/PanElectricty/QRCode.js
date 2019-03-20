import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { connect } from 'react-redux';
import { panStatus } from '../../../store/actions';
import { Navigation } from 'react-native-navigation';

class QRcode extends Component {
	constructor(props) {
		super(props);
		this.state = {
			qrcode: ''
		};
	}

	onBarCodeRead = (e) => {
		str = e.data;
		pan = str.slice(str.length - 10, str.length);
		this.props.unsetPanStatus();
		alert('Your Pan Number is: ' + pan);
		Navigation.push(this.props.componentId, {
			component: {
				name: 'PanElectricity.PanVerification',
				passProps: {
					panNumber: pan
				}
			}
		});
		this.setState({ qrcode: e.data });
	};

	render() {
		return (
			<View style={styles.container}>
				<RNCamera
					barCodeTypes={[ RNCamera.Constants.BarCodeType.qr ]}
					flashMode={RNCamera.Constants.FlashMode.on}
					style={styles.preview}
					onBarCodeRead={this.onBarCodeRead}
					ref={(cam) => (this.camera = cam)}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row'
	},
	preview: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'center'
	}
});

const mapDispatchToProps = (dispatch) => {
	return {
		unsetPanStatus: () => dispatch(panStatus(null))
	};
};

export default connect(null, mapDispatchToProps)(QRcode);
