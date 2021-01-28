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
    AsyncStorage,
    Alert
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import Textarea from 'react-native-textarea';
import Axios from "react-native-axios";

export default class FeedBack extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            animation_login: new Animated.Value(width - 40),
            enable: true,
            isSubmit: false,
            success: false,
            message: '',
        };
    }
 addSubmit = async() => {
    const token = await AsyncStorage.getItem('token');
    let content = this.state.content || '';
    Axios.get(`http://hml-project.herokuapp.com/api/user/feedback?token=${token}&content=${content}`)
        .then((res) => {
            this.setState({isSubmit : true, success : res.data.success, message : res.data.message})
        })
        .catch((err) => console.log("loi", err));
 }


    render() {
        const width = this.state.animation_login;
        return (
            <View style={{width: '100%', height: '100%'}}>

            {this.state.isSubmit == true &&  (this.state.success ?
                Alert.alert(
                    'Thông báo',
                    this.state.message,
                    [{ text: 'OK' }]
                ):
                Alert.alert(this.state.message))
            }
            <ParallaxScrollView backgroundColor="white" contentBackgroundColor="white" parallaxHeaderHeight={0}>
                <TouchableWithoutFeedback
                    onPress={() => {
                        Keyboard.dismiss();
                    }}
                >
                    <View style={styles.container}>
                        <View style={styles.footer}>
                            <Text
                                style={[
                                    styles.title,
                                    {
                                        marginTop: 20,
                                        fontSize: 18,
                                        marginBottom: 10
                                    },
                                ]}
                            >
                                Nội dung góp ý
							</Text>
                            <View style={styles.action2}>
                                <Textarea
                                    placeholder=" Nội dung góp ý..."
                                    style={styles.textInput}
                                    onChange={(input) =>
                                        this.setState({ content: input.nativeEvent.text })
                                    }
                                />
                            </View>

                            <TouchableOpacity onPress={() => this.addSubmit()}>
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
            </View>

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
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
    },
    action2: {
        borderColor: '#f2f2f2',
        borderWidth: 1,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        flex: 1,
        marginTop: 5,
        paddingBottom: 5,
        color: 'gray',
        height: 30,
        textAlignVertical: 'top',
    },
    textInput2: {
        flex: 1,
        marginTop: 7,
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