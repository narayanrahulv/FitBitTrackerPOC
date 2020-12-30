// React
import React, { Component, Fragment } from 'react';
import { Text, View, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';

// Services
import { FitBitService } from '../services/fitBitService';

// Components
import Steps from '../components/Steps';
import Floors from '../components/Floors';
import Calories from '../components/Calories';
import Sleep from '../components/Sleep';

// Constants
import { Colors } from '../../Colors';

export default class LoadingScreen extends Component<{ navigation: any }>{
    componentDidMount = async () => {
        const fb = new FitBitService();
        await fb.authorizeFitBit();
    }

    render(){
        return(
            <ScrollView style={{backgroundColor: Colors.cadetBlue}}>
                <View style={styles.viewbottom}>
                    <Steps />
                </View>
                <View style={styles.viewbottom}>
                    <Floors />
                </View>
                <View style={styles.viewbottom}>
                    <Calories />
                </View>
                <View style={styles.viewbottom}>
                    <Sleep />
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    //views
    viewbottom: {
        marginBottom: 20
    }
})