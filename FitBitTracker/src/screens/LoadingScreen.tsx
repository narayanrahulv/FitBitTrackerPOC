// React
import React, { Component, Fragment } from 'react';
import { Text, View, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';

// Services
import { FitBitService } from '../services/fitBitService';

export default class LoadingScreen extends Component<{ navigation: any }>{
    componentDidMount = async () => {
        const fb = new FitBitService();
        await fb.authorizeFitBit();
        await fb.fetchActivityInRange("steps", new Date("2020-12-01"), new Date("2020-12-01"));
    }

    render(){
        return(
            <View>
                <Text>main fitbit tracker screen</Text>
            </View>
        )
    }
}