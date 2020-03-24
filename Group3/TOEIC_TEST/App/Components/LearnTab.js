import React, { useEffect, useState, Component } from 'react'
import styles from './Styles/LearnTabStyles'
import { Icon } from 'react-native-elements'
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    ImageBackground,
    Image
} from 'react-native'
import { ButtonGroup } from 'react-native-elements'
import * as Animatable from 'react-native-animatable'
import { words } from '../Data/word'
import { learn } from '../Data/learn'

export default class LearnTab extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedIndex: 0,
            data: [],
        }
        this.updateIndex = this.updateIndex.bind(this)
    }
    componentDidMount() {
        this.setState({ selectedIndex: 0, data: learn })
    }
    updateIndex(selectedIndex) {
        this.setState({ selectedIndex: selectedIndex })
        if (selectedIndex == 0) this.setState({ data: learn })
        else if (selectedIndex == 1) this.setState({ data: words })
        else if (selectedIndex == 2) this.setState({ data: [] })
    }
    renderItem = ({ item, index }) => {
        var url = `${item.sourceImage}`
        return (
            <Animatable.View delay={index * 300} animation='zoomInLeft' >
                <TouchableOpacity
                    onPress={() => { }}
                >
                    <View style={styles.item}>
                        <Image
                            style={{ height: 150, flex: 1 }}
                            source={{ uri: url }}
                        />
                        <Text style={styles.lession}>Lession {item.id}: {item.name}</Text>
                        <Text style={styles.number}>Số từ vựng: {item.number}</Text>
                    </View>
                </TouchableOpacity>
            </Animatable.View >
        )
    }
    render() {
        const buttons = ['Bài học', 'Từ đánh dấu', 'Từ nhắc nhở']
        const { selectedIndex } = this.state
        return (
            <SafeAreaView style={{flex: 1}}>
                <View style={styles.linearGradient}>
                    <Icon name='search' size={24} type='FontAwesome' color='transparent' />
                    <Text style={styles.title}>TỪ VỰNG TOEIC</Text>
                    <TouchableOpacity
                        onPress={() => { this.props.navigation.navigate('Search') }}
                    >
                        <Icon name='search' size={27} type='FontAwesome' color='#F5F5F5'
                            containerStyle={styles.iconRight}
                        />
                    </TouchableOpacity>
                </View>
                <ButtonGroup
                    onPress={this.updateIndex}
                    selectedIndex={selectedIndex}
                    buttons={buttons}
                    containerStyle={{ height: 40, borderRadius: 20 }}
                />
                <FlatList
                    data={this.state.data}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            </SafeAreaView >
        )
    }
}
