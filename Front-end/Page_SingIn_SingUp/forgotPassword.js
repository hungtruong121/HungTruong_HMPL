import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Animated,
    Dimensions,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
} from 'react-native';
import { TypingAnimation } from 'react-native-typing-animation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import Axios from "react-native-axios";

export default class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            typing_name: false,
            typing_email: false,
            typing_number: false,
            typing_content: false,
            animation_login: new Animated.Value(width - 40),
            enable: true,
        };
    }

    _foucus(value) {
        if (value == 'oldpassword') {
            this.setState({
                typing_oldpassword: true,
                typing_password: false,
                typing_repassword: false,
            });
        } else if (value == 'password') {
            this.setState({
                typing_oldpassword: false,
                typing_password: true,
                typing_repassword: false,
            });
        } else {
            this.setState({
                typing_oldpassword: false,
                typing_password: false,
                typing_repassword: true,
            });
        }
    }

    getRemoteData = () => {
        let username = this.state.username || '';
        console.log(username)
        Axios.post(
            `http://hml-project.herokuapp.com/api/user/forget?username=${username}`,
        )
            .then((res) => {
                if (res.data.success == true) {
                    Alert.alert(
                        'Thông báo',
                        res.data.message,
                        [{ text: 'OK' }]
                    )
                    this.props.navigation.navigate('Đăng nhập')
                } else {
                    Alert.alert(
                        'Thông báo',
                        res.data.message,
                        [{ text: 'OK' }]
                    )
                }
            })
            .catch((err) => console.log("loi", err));
    };

    _showAlert = () => {
        Alert.alert(
          "Thông báo",
          "Mật khẩu sẽ được gởi vào email của bạn!!!",
          [
            { text: "OK", onPress: () => console.log("OK Pressed") },
          ],
          { cancelable: false }
        );
      };

    render() {
        const width = this.state.animation_login;
        return (
            <ParallaxScrollView backgroundColor="white" contentBackgroundColor="white" parallaxHeaderHeight={0}>
                <TouchableWithoutFeedback
                    onPress={() => {
                        Keyboard.dismiss();
                        console.log('dismissed keyboard');
                    }}
                >
                    <View style={styles.container}>
                        <View style={styles.footer}>
                            <Text
                                style={[
                                    styles.title,
                                    {
                                        marginTop: 10,
                                        fontSize: 18,
                                    },
                                ]}
                            >
                                Nhập tên tài khoản
							</Text>
                            <View style={styles.action}>
                                <TextInput
                                    placeholder=" Nhập tên tài khoản..."
                                    style={styles.textInput}
                                    onFocus={() => this._foucus('oldpassword')}
                                    onChange={(input) =>
                                        this.setState({ username: input.nativeEvent.text })
                                    }
                                />
                            </View>
                            <Text style={{ marginTop: 15 }}>Mật khẩu mới sẽ được gửi về email của bạn</Text>

                            <TouchableOpacity onPress={() => this.getRemoteData()}>
                                <View style={styles.button_container}>
                                    <Animated.View
                                        style={[
                                            styles.animation,
                                            {
                                                width,
                                            },
                                        ]}
                                    >
                                        {this.state.enable ? (
                                            <Text style={styles.textLogin}>Gửi</Text>
                                        ) : (
                                                <Animatable.View animation="bounceIn" delay={50}>
                                                    <FontAwesome name="check" color="white" size={20} />
                                                </Animatable.View>
                                            )}
                                    </Animated.View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </ParallaxScrollView>
        );
    }
}

const width = Dimensions.get('screen').width;

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
    },
    footer: {
        flex: 2,
        padding: 20,
    },
    title: {
        color: 'black',
        fontWeight: 'bold',
    },
    action: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
    },
    textInput: {
        flex: 1,
        marginTop: 10,
        paddingBottom: 5,
        color: 'gray',
        height: 30,
    },
    button_container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    animation: {
        backgroundColor: 'green',
        paddingVertical: 10,
        marginTop: 30,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textLogin: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
    signUp: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
});
