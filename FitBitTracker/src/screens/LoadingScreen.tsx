// React
import React, { Component, Fragment } from 'react';
import { Text, View, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';

// Services
import { FitBitService } from '../services/fitBitService';

// Components
// import Steps from '../components/Steps';
import Steps from '../components/Tiles/StepsTile';
import Floors from '../components/Floors';
import Calories from '../components/Calories';
import Sleep from '../components/Sleep';
import StepsTile from '../components/Tiles/StepsTile';
import FloorsTile from '../components/Tiles/FloorsTile';
import CaloriesTile from '../components/Tiles/CaloriesTile';
import SleepTile from '../components/Tiles/SleepTile';

// Constants
import { Colors } from '../../Colors';


export default class LoadingScreen extends Component<{ navigation?: any }>{
    componentDidMount = async () => {
        const fb = new FitBitService();
        await fb.authorizeFitBit();
    }

    render(){
        return(
            <ScrollView style={{backgroundColor: Colors.cadetBlue, marginTop: 40}}>
                <View style={styles.viewbottom}>
                    <StepsTile navigation={this.props.navigation} />
                </View>
                <View style={styles.viewbottom}>
                    <FloorsTile navigation={this.props.navigation} />
                </View>
                <View style={styles.viewbottom}>
                    <CaloriesTile navigation={this.props.navigation} />
                </View>
                <View style={styles.viewbottom}>
                    <SleepTile />
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