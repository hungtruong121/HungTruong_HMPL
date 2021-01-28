import React, { Component } from 'react';
import { StyleSheet, View, Text, AsyncStorage } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import PieChart from 'react-native-pie-chart';
import ParallaxScrollView from 'react-native-parallax-scroll-view';

export default class StatisticWeek extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableHead: ['Tên', 'Hàm lượng'],
            tableTitle: ['Chất đạm (%)', 'Tinh bột (%)', 'Chất béo (%)'],
            dataSource: [],
        }
    }

    async componentDidMount() {
        const token = await AsyncStorage.getItem('token');
        const response = await fetch(`https://hml-project.herokuapp.com/api/statistic/${token}`);
        const result = await response.json();
        console.log(result.data)
        this.setState({
            dataSource: result.data,
        })
    }

    render = () => {
        const state = this.state;
        const percentProtein = ((state.dataSource.protein * 100) / (state.dataSource.protein + state.dataSource.lipid + state.dataSource.glucid)).toFixed(2) || '0'
        const percentLipid = ((state.dataSource.lipid * 100) / (state.dataSource.protein + state.dataSource.lipid + state.dataSource.glucid)).toFixed(2) || '0'
        const percentGlucid = ((state.dataSource.glucid * 100) / (state.dataSource.protein + state.dataSource.lipid + state.dataSource.glucid)).toFixed(2) || '0'
        const tableData = [
            [percentProtein],
            [percentLipid],
            [percentGlucid],
        ]
        return (
            <ParallaxScrollView
                backgroundColor="white"
                contentBackgroundColor="white"
                parallaxHeaderHeight={0}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.container}>
                    <Text style={{ marginBottom: 20, fontSize: 18 }}>Thống kê dinh dưỡng của những thực phẩm bạn và gia đình tiêu thụ trong tuần.</Text>
                    <Table borderStyle={{ borderWidth: 1 }} data={this.dataSource}>
                        <Row data={state.tableHead} flexArr={[2, 4, 1, 1]} style={styles.head} textStyle={styles.text} />
                        <TableWrapper style={styles.wrapper}>
                            <Col data={state.tableTitle} style={styles.title} heightArr={[28, 28]} textStyle={styles.text} />
                            <Rows data={tableData} flexArr={[1, 1,]} style={styles.row} textStyle={styles.text} />
                        </TableWrapper>
                    </Table>
                    <View style={{marginLeft: -10}}>
                        <View style={{ alignItems: 'center', marginTop: 20 }}>
                            <Text style={{ fontSize: 18 }}>Tỉ lệ dinh dưỡng hợp lý cho bạn và gia đình:</Text>
                            <View style={styles.line}></View>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <Text style={{ fontSize: 18 }}>Protein chiếm từ: </Text>
                            <Text style={{fontSize: 18, color: 'green'}}>12-14% </Text>
                            <Text style={{ fontSize: 18 }}>trong khẩu phần ăn.</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 10}}>
                            <Text style={{ fontSize: 18 }}>Tinh bột chiếm từ: </Text>
                            <Text style={{fontSize: 18, color: 'green'}}>65-70% </Text>
                            <Text style={{ fontSize: 18 }}>trong khẩu phần ăn.</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 10}}>
                            <Text style={{ fontSize: 18 }}>Chất béo chiếm từ: </Text>
                            <Text style={{fontSize: 18, color: 'green'}}>18-20% </Text>
                            <Text style={{ fontSize: 18 }}>trong khẩu phần ăn.</Text>
                        </View>
                    </View>
                </View>
            </ParallaxScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        paddingTop: 30,
        backgroundColor: '#fff'
    },
    head: {
        height: 40,
        backgroundColor: '#f1f8ff'
    },
    wrapper: {
        flexDirection: 'row'
    },
    title: {
        flex: 1,
        backgroundColor: '#f6f8fa'
    },
    row: {
        height: 28
    },
    text: {
        textAlign: 'center'
    },
    chart: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        marginTop: 20,
    },
    symbol: {
        flexDirection: 'row',
        margin: 5,
    },
    colorProtein: {
        width: 12,
        height: 12,
        backgroundColor: '#FF9800',
        margin: 5,
    },
    colorStarch: {
        width: 12,
        height: 12,
        backgroundColor: '#2196F3',
        margin: 5,
    },
    colorFat: {
        width: 12,
        height: 12,
        backgroundColor: '#FFEB3B',
        margin: 5,
    },
    colorVegetable: {
        width: 12,
        height: 12,
        backgroundColor: '#4CAF50',
        margin: 5,
    },
    line: {
        borderWidth: 0.5,
        width: 100,
        borderColor: 'green',
        marginTop: 15,
        marginBottom: 10,
    }
});