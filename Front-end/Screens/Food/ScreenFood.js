import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import ScrollableTabView, {
  DefaultTabBar,
} from 'react-native-scrollable-tab-view';
import { Snackbar } from 'react-native-paper';
import Protein from '../../Screens_Food_child/Protein';
import Starch from '../../Screens_Food_child/Starch';
import Fat from '../../Screens_Food_child/Fat';
import Vegetable from '../../Screens_Food_child/Vegetable';
import { Ionicons } from '@expo/vector-icons';
const list = [];
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSnackbarVisible: false,
      total: 0,
    };
  }

  handleTriggerSnackbar = (number, id) => {
    const add = list.includes(id);
    if(!add) list.push(id);
    else list.splice(list.indexOf(id), 1);
    this.setState({
      isSnackbarVisible: true,
      total: this.state.total + number,
    });
    // console.log(list.join(','));
  };

  handleDismissSnackbar = () => {
    this.setState({
      isSnackbarVisible: true,
    });
  };

  handleDismissSnackbarClick = () => {
    this.setState({
      isSnackbarVisible: false,
    });
  };
  
  handleNavigateToDetailScreen = () => {
    const { navigation } = this.props;
    navigation.navigate('Món ăn', { total: this.state.total, list: list });
  };

  render() {
    const { total } = this.state;
    return (
      <View style={styles.container}>
        
        <View style={{ alignItems: 'center', flex: 1 }}>
          <View style={styles.tabbar}>
            <ScrollableTabView
              style={{ marginTop: 5 }}
              initialPage={0}
              tabBarActiveTextColor='green'
              renderTabBar={() => (
                <DefaultTabBar
                  underlineStyle={{
                    backgroundColor: 'green',
                  }}
                />
              )}
            >
              <Protein
                tabLabel='Chất đạm'
                sendVisibleStatus={this.handleTriggerSnackbar}
              />
              <Starch
                tabLabel='Tinh bột'
                sendVisibleStatus={this.handleTriggerSnackbar}
              />
              {/* <Fat
                tabLabel='Chất béo'
                sendVisibleStatus={this.handleTriggerSnackbar}
              /> */}
              <Vegetable
                tabLabel='Rau quả'
                sendVisibleStatus={this.handleTriggerSnackbar}
              />
            </ScrollableTabView>
          </View>
        </View>
        <Snackbar
          visible={this.state.total!=0}
          onDismiss={() => this.handleDismissSnackbar()}
          action={{
            label: 'NẤU NGAY',
            onPress: () => {this.handleDismissSnackbarClick(), this.handleNavigateToDetailScreen()}
          }}
          style = {{
            backgroundColor: 'green',
            width: '90%',
            marginLeft: 20,
          }}
        >
         Đã chọn {total} 
        </Snackbar>
      </View>
    );
  }
}
const width = Dimensions.get('screen').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // alignItems: 'center',
  },
  input: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tabbar: {
    flex: 1,
    width: '95%',
    paddingHorizontal: 0,
  },
  choose: {
    width: 150,
    height: 50,
    marginLeft: 20,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 100,
    backgroundColor: '#f2f2f2',
    marginTop: 15,
    marginLeft: 15,
    width: 200,
  },
  choose2: {
    width: 150,
    height: 50,
    marginRight: 20,
    marginTop: -10,
  },
});