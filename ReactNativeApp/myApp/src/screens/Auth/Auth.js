import React, { Component } from 'react';
import {
	View,
	Text,
	Button,
	StyleSheet,
	ImageBackground,
	Dimensions,
	KeyboardAvoidingView,
	Keyboard,
	TouchableWithoutFeedback,
	ActivityIndicator
} from 'react-native';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground';
import validate from '../../utility/validation';
import { connect } from 'react-redux';
import { tryAuth, authAutoSignIn } from '../../store/actions/index';
import { Navigation } from 'react-native-navigation';
console.disableYellowBox = true;
class AuthScreen extends Component {
	state = {
		viewMode: Dimensions.get('window').height > 500 ? 'portrait' : 'landscape',
		authMode: 'login',
		controls: {
			email: {
				value: '',
				valid: false,
				validationRules: {
					isEmail: true
				},
				touched: false
			},
			password: {
				value: '',
				valid: false,
				validationRules: {
					minLength: 6
				},
				touched: false
			},
			confirmPassword: {
				value: '',
				valid: false,
				validationRules: {
					equalTo: 'password'
				},
				touched: false
			}
		}
	};

	constructor(props) {
		super(props);
		Dimensions.addEventListener('change', this.updateStyles);
	}

	componentWillUnmount() {
		Dimensions.removeEventListener('change', this.updateStyles);
	}

	componentDidMount() {
		this.props.onAutoSignIn();
	}

	switchAuthModeHandler = () => {
		this.setState((prevState) => {
			return {
				authMode: prevState.authMode === 'login' ? 'signup' : 'login'
			};
		});
	};

	updateStyles = (dims) => {
		this.setState({
			viewMode: dims.window.height > 500 ? 'portrait' : 'landscape'
		});
	};

	authHandler = () => {
		const authData = {
			email: this.state.controls.email.value,
			password: this.state.controls.password.value
		};
		this.props.onTryAuth(authData, this.state.authMode);
	};

	updateInputState = (key, value) => {
		let connectedValue = {};
		if (this.state.controls[key].validationRules.equalTo) {
			const equalControl = this.state.controls[key].validationRules.equalTo;
			const equalValue = this.state.controls[equalControl].value;
			connectedValue = {
				...connectedValue,
				equalTo: equalValue
			};
		}

		if (key === 'password') {
			connectedValue = {
				...connectedValue,
				equalTo: value
			};
		}

		this.setState((prevState) => {
			return {
				controls: {
					...prevState.controls,
					confirmPassword: {
						...prevState.controls.confirmPassword,
						valid:
							key === 'password'
								? validate(
										prevState.controls.confirmPassword.value,
										prevState.controls.confirmPassword.validationRules,
										connectedValue
									)
								: prevState.controls.confirmPassword.valid
					},
					[key]: {
						...prevState.controls[key],
						value: value,
						valid: validate(value, prevState.controls[key].validationRules, connectedValue),
						touched: true
					}
				}
			};
		});
	};

	render() {
		let confirmPasswordControl = null;
		let submitButton = (
			<Button
				onPress={this.authHandler}
				title={this.state.authMode === 'login' ? 'Log In' : 'Register'}
				color="#4ABBCF"
				disabled={
					(!this.state.controls.confirmPassword.valid && this.state.authMode === 'signup') ||
					!this.state.controls.email.valid ||
					!this.state.controls.password.valid
				}
			/>
		);

		if (this.props.isLoading) {
			submitButton = <ActivityIndicator size="large" color="#0000ff" />;
		}

		if (this.state.authMode === 'signup') {
			confirmPasswordControl = (
				<View
					style={
						this.state.viewMode === 'portrait' || this.state.authMode === 'login' ? (
							styles.portraitPasswordWrapper
						) : (
							styles.landscapePasswordWrapper
						)
					}
				>
					<DefaultInput
						placeholder="Confirm Password"
						style={[ styles.input ]}
						value={this.state.controls.confirmPassword.value}
						onChangeText={(val) => this.updateInputState('confirmPassword', val)}
						valid={this.state.controls.confirmPassword.valid}
						touched={this.state.controls.confirmPassword.touched}
						secureTextEntry
					/>
				</View>
			);
		}

		return (
			<KeyboardAvoidingView style={styles.container} behavior="">
				<Text style={styles.heading}>{this.state.authMode === 'login' ? 'Log In' : 'Create'}</Text>
				<Text style={styles.subheading}>
					{this.state.authMode === 'login' ? 'with your account' : 'your account'}
				</Text>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<View style={styles.inputContainer}>
						<DefaultInput
							placeholder="Your Email Address"
							style={[ styles.input ]}
							value={this.state.controls.email.value}
							onChangeText={(val) => this.updateInputState('email', val)}
							valid={this.state.controls.email.valid}
							touched={this.state.controls.email.touched}
							autoCapitalize="none"
							autoCorrect={false}
							keyboardType="email-address"
						/>
						<View
							style={
								this.state.viewMode === 'portrait' || this.state.authMode === 'login' ? (
									styles.portraitPasswordContainer
								) : (
									styles.landscapePasswordContainer
								)
							}
						>
							<View
								style={
									this.state.viewMode === 'portrait' ? (
										styles.portraitPasswordWrapper
									) : (
										styles.landscapePasswordWrapper
									)
								}
							>
								<DefaultInput
									placeholder="Password"
									style={[ styles.input ]}
									value={this.state.controls.password.value}
									onChangeText={(val) => this.updateInputState('password', val)}
									valid={this.state.controls.password.valid}
									touched={this.state.controls.password.touched}
									secureTextEntry
								/>
							</View>
							{confirmPasswordControl}
						</View>
					</View>
				</TouchableWithoutFeedback>
				<View style={styles.authtype}>
					<Text style={{ marginRight: 7 }}>
						{this.state.authMode === 'login' ? 'Dont have an account ?' : 'Already have an account ?'}
					</Text>
					<ButtonWithBackground onPress={this.switchAuthModeHandler}>
						{this.state.authMode === 'login' ? 'Sign up' : 'Sign In'}
					</ButtonWithBackground>
				</View>
				<View style={styles.submitButton}>{submitButton}</View>
			</KeyboardAvoidingView>
		);
	}
}

const styles = StyleSheet.create({
	heading: {
		fontWeight: '400',
		fontSize: 27,
		color: 'black',
		marginBottom: 7
	},
	subheading: {
		fontSize: 18,
		marginBottom: 35,
		color: 'black'
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	authtype: {
		flexDirection: 'row',
		marginTop: 10
	},
	backgroundImage: {
		width: '100%',
		flex: 1
	},
	inputContainer: {
		width: '80%',
		marginLeft: '0%'
	},
	input: {
		backgroundColor: '#fff'
	},
	landscapePasswordContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	portraitPasswordContainer: {
		flexDirection: 'column',
		justifyContent: 'flex-start'
	},
	portraitPasswordWrapper: {
		width: '100%'
	},
	landscapePasswordWrapper: {
		width: '45%'
	},
	submitButton: {
		width: '80%',
		marginLeft: '0%',
		marginTop: 30
	}
});

const mapDispatchToProps = (dispatch) => {
	return {
		onTryAuth: (authData, authMode) => dispatch(tryAuth(authData, authMode)),
		onAutoSignIn: () => dispatch(authAutoSignIn())
	};
};

const mapStateToProps = (state) => {
	return {
		isLoading: state.ui.isLoading
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);
