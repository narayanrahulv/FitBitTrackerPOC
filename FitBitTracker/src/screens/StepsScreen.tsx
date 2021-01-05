// React
import React, { Component, Fragment } from 'react';
import { Text, View, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

// Services
import { FitBitService } from '../services/fitBitService';

// Components
import Steps from '../components/Steps';
import Floors from '../components/Floors';
import Calories from '../components/Calories';
import Sleep from '../components/Sleep';

// Constants
import { Colors } from '../../Colors';
import { fitBitConnectionValues, fitBitActivitySegments, fitBitResponseKeys, icons } from '../../StaticConfig';

export default class StepsScreen extends Component<{ navigation?: any }> {
    private date = new Date();
    private setDate;
    private fb = new FitBitService();

    constructor(props) {
        super(props);
    }

    //get single day data
    getActivityDataForDay = async(activitySegment?: string, day?: Date): Promise<number> => {
        let fetchData = await this.fb.fetchActivityDataForDay(activitySegment, day);

        return new Promise((resolve) => {
            if (fetchData[fitBitResponseKeys.stepsResponseKey] !== null && fetchData[fitBitResponseKeys.stepsResponseKey].length > 0){
                console.log("we got data...");
                console.log(fetchData[fitBitResponseKeys.stepsResponseKey]);
                fetchData[fitBitResponseKeys.stepsResponseKey][0]["value"] === "" ? resolve(0)
                                                                                : resolve(parseInt(fetchData[fitBitResponseKeys.stepsResponseKey][0]["value"]));
            }
        });
    }

    render(){
        return(
            <ScrollView style={styles.mainContainer}>
                <View>
                    <Text style={styles.textstyle}>Steps display</Text>
                </View>
                

                {/* PUT A DATE PICKER START DATE AND END DATE CONTROL --> IF BOTH SELECTED, RETRIEVE THE RANGE, OTHERWISE JUST START DATE */}
                <View style={{backgroundColor: Colors.gainsboro, marginBottom: 10}}>
                    <DateTimePicker
                        value={this.date}
                        mode="date"
                        display="default"
                        //onChange={this.onDateChange}
                        locale="nl-NL"
                    />
                </View>

                <View style={{backgroundColor: Colors.gainsboro, marginBottom: 10}}>
                    <DateTimePicker
                        value={this.date}
                        mode="date"
                        display="default"
                        //onChange={this.onDateChange}
                        locale="nl-NL"
                    />
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => this.getActivityDataForDay(fitBitActivitySegments.steps, new Date("2020-09-12"))}>
                        <View>
                            <Text>get steps for day</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity>
                        <View>
                            <Text>get steps for day range</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    //container
    mainContainer: {
        backgroundColor: Colors.cadetBlue,
        marginTop: 40
    },
    buttonContainer: {
        borderRadius: 10,
        backgroundColor: Colors.darkOrange,

        marginVertical: 5,
        padding: 20,
        marginHorizontal: 80,
    },

    //text
    textstyle: {
        color: Colors.darkSlateBlue,
        fontSize: 30
    }
});