import React from "react";
import { Linking } from "expo";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { WebView } from "react-native-webview";

export default class Tutorial extends React.Component {
  _handleOpenWithLinking = () => {
    const { navigation } = this.props;
    const name = navigation.getParam("name", "some default value");
    Linking.openURL(`https://www.youtube.com/results?search_query=${name}`);
  };

  backDetail = () => {
    var { navigate } = this.props.navigation;
    navigate("Món ăn");
  };
  render() {
    const { navigation } = this.props;
    const name = navigation.getParam("name", "default");
    const link = `https://www.google.com/search?q=${name}`;
    return (
      <View style={styles.container}>
       <View style={styles.dadOfWebView}>
          <WebView style={styles.webview} source={{ uri: link }}  />
        </View>
        <View style={styles.videoContent}>
          <TouchableOpacity
            onPress={this._handleOpenWithLinking}
            style={styles.button}
          >
            <Text style={styles.buttonContent}>Xem Video hướng dẫn</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.backDetail()}
            style={styles.bottonChange}
          >
            <Text style={{ color: "green", fontSize: 18 }}>
              Món tiếp theo >>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  content: {
    width: "85%",
    height: "100%",
    marginLeft: "6.5%",
  },
  text: {
    fontSize: 20,
  },
  video: {
    top: "100%",
    left: "30%",
    position: "relative",
    height: 120,
  },
  videoContent: {
    position: "absolute",
    top: "85%",
    alignItems: "center",
    width: "100%",
  },
  bottonChange: {
    paddingBottom: 30,
    marginLeft: 10,
    flexDirection: "row",
    marginTop: 10,
  },
  button: {
    alignContent: "center",
    backgroundColor: "green",
    width: "60%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 45,
  },
  buttonContent: {
    color: "#fff",
    fontSize: 17,
  },
  scope: {
    width: "100%",
    height: "80%",
  },
  webview: {
    width: "100%",
  },
  dadOfWebView:{
      height: "83%",
      width: "100%"
  }
});