import React from 'react';
import { Linking } from 'expo';
import { StyleSheet, View, Text, ScrollView, ImageBackground, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';

export default class Tutorial extends React.Component {
    _handleOpenWithLinking = () => {
        const { navigation } = this.props;
        const name = navigation.getParam('name', 'some default value');
        Linking.openURL(`https://www.youtube.com/results?search_query=${name}`);
    }

    backDetail = () => {
        var { navigate } = this.props.navigation;
        navigate('Món ăn')
    }
    
    render() {
        const { navigation } = this.props;
        const url = navigation.getParam('url', 'default');
        return (
            <View style={styles.container}>
                <ScrollView style={styles.content}>
                    <View style={styles.scope}>
                        <WebView source={{ uri: url }} style={styles.webvieww} />
                    </View>
                </ScrollView>
                <View style={styles.videoContent}>
                    <TouchableOpacity onPress={this._handleOpenWithLinking} style={styles.button}>
                        <Text style={styles.buttonContent}>Xem Video hướng dẫn</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.backDetail()} style={styles.bottonChange}>
                        <Text style={{ color: 'green', fontSize: 18 }}>Món tiếp theo >></Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
    },
    content: {
        width: '100%',
        height: '100%',
    },
    text: {
        fontSize: 20,
    },
    video: {
        top: '100%',
        left: '30%',
        position: 'relative',
        height: 120
    },
    videoContent: {
        position: 'absolute',
        top: '82%',
        alignItems: 'center',
        width: '100%'
    },
    bottonChange: {
        paddingBottom: 30,
        marginLeft: 10,
        flexDirection: 'row',
        marginTop: 15,
    },
    button: {
        alignContent: 'center',
        backgroundColor: 'green',
        width: '60%',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 45,
    },
    buttonContent: {
        color: '#fff',
        fontSize: 17,
    },
    scope: {
        width: '100%',
        height: '70%',
    },
    webvieww: {
        height: 450,
        width: '100%',
    },
});