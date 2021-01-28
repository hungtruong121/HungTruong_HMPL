import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from "@expo/vector-icons";

export default class Menus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataSource: [],
            data: [],
            data_temp: [],
            search: "",
            select: this.props.list,
        };
    }

    async componentDidMount() {
        const response = await fetch('https://hml-project.herokuapp.com/api/foods/menu');
        const result = await response.json();
        this.setState({
            isLoading: false,
            dataSource: result["data"],
        })
    }
    _search(text) {
        this.setState({ search: text });
    }

    _filterItems() {
        if (this.state.search)
            return this.state.dataSource.filter((ele) =>
                ele.name.toLowerCase().includes(this.state.search.toLowerCase())
            );
        return this.state.dataSource;
    }

    _showPrice = (item) => {
        const price = item.price.toString();
        if (price.includes(".")) {
            return (
                <Text> {price}00 VNĐ</Text>
            )
        } else {
            return (
                <Text> {price}.000 VNĐ</Text>
            )
        }     
    }

    renderItem = ({ item }) => {
        const { navigate } = this.props.navigation;
        if (item.isSpecial === false) {
            return (
                <LinearGradient
                    colors={['#009245', '#Bcc631']}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.item}
                >
                    <TouchableOpacity
                        onPress={() => {
                            navigate('Món ăn', {
                                image: item.img,
                                price: item.price,
                                name: item.name,
                                key: item?.key
                            })
                        }}>
                        <View key={item.key} style={styles.image_container}>
                            <Image source={{ uri: item.img }} style={styles.image} />
                            <View style={styles.content}>
                                <Text numberOfLines={2} style={styles.name}>{item.name.toUpperCase()}</Text>
                            </View>
                            <View style={styles.price_container}>
                                <View style={styles.price}>
                                    <Text style={styles.textPrice}> Giá: {this._showPrice(item)} </Text>
                                </View>
                            </View>
                            <Text style={{color: '#fff', marginTop: 5}}>{item.message} </Text>
                        </View>
                    </TouchableOpacity>
                </LinearGradient>
            );
        }
    };

    render() {
        let { dataSource, isLoading } = this.state
        if (isLoading) {
            return (
                <View>
                    <ActivityIndicator size='large' animating />
                </View>
            )
        } else {
            return (
                <View style={styles.container}>
                    <View style={styles.section}>
                        <TextInput
                            placeholder="Tìm thực phẩm..."
                            style={{ flex: 1, marginLeft: 10 }}
                            value={this.state.search}
                            onChangeText={(text) => this._search(text)}
                        />
                        <TouchableOpacity style={{marginRight: 5}} onPress={() => this._search("")}>
                            <Ionicons name="ios-close" color="gray" size={23} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.flatList}>
                        <FlatList
                            data={this._filterItems()}
                            renderItem={this.renderItem}
                            keyExtractor={(item, index) => index.toString()}
                            ItemSeparatorComponent={this.ItemSeparatorComponent}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingLeft: 10,
        paddingRight: 10,
        // width: '95%',
    },
    flatList: {
        flex: 1,
        marginTop: 10,
    },
    item: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 10,
        flexDirection: 'column',
        borderRadius: 10,
        marginBottom: 10,
    },
    image_container: {
        width: '100%',
    },
    image: {
        width: '100%',
        height: 130,
        borderWidth: 5,
        borderColor: 'white',
        borderRadius: 10,
        margin: 'auto'
    },
    content: {
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    name: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 5,
    },
    rating: {
        marginTop: 8,
        marginLeft: 10,
        flexDirection: 'row',
    },
    counter: {
        color: 'white',
        textDecorationLine: 'underline',
        // marginLeft: '50%',
        marginRight: 5,
    },
    button: {
        width: 40,
        height: 40,
        backgroundColor: 'white',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 34,
        right: 20,
        position: 'absolute'
    },
    price_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
    },
    price: {
        backgroundColor: 'white',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 50,
        marginLeft: 10,
    },
    textPrice: {
        color: 'green',
        fontWeight: 'bold'
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 100,
        backgroundColor: '#f2f2f2',
        marginTop: 10,
    },
    input: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
        marginTop: -10,
    },
});