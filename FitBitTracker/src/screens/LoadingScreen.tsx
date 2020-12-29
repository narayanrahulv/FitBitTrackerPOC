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

export default class LoadingScreen extends Component<{ navigation: any }>{
    componentDidMount = async () => {
        const fb = new FitBitService();
        await fb.authorizeFitBit();
    }

    render(){
        return(
            <View>
                <View style={{marginBottom: 50}}>
                    <Steps />
                </View>
                <View style={{marginBottom: 50}}>
                    <Floors />
                </View>
                <View style={{marginBottom: 50}}>
                    <Calories />
                </View>
                <View>
                    <Sleep />
                </View>
            </View>
        )
    }
}