// React
import React, { Component, Fragment } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import * as Keychain from 'react-native-keychain';

// External libraries
import qs from 'qs';
import moment from 'moment'

// Constants
import { fitBitAuthConfig } from '../../config';
import { fitBitConnectionValues, fitBitActivitySegments, fitBitResponseKeys } from '../../StaticConfig';

// Services
import { FitBitService } from '../services/fitBitService';

export default class Calories extends Component<{}> {
    constructor(props) {
        super(props);
    }

    private fb = new FitBitService();

    //get range data
    getActivityForDayRange = async (activitySegment?: string, startDay?: Date, endDay?: Date): Promise<any> => {
        //retrieve data from fitbit
        let fetchData = await this.fb.fetchActivityForDateRange(activitySegment, startDay, endDay);

        return new Promise((resolve) => {
            resolve(fetchData[fitBitResponseKeys.caloriesResponseKey])
        });
    }

    //get single day data
    getActivityDataForDay = async(activitySegment?: string, day?: Date): Promise<number> => {
        let fetchData = await this.fb.fetchActivityDataForDay(activitySegment, day);

        return new Promise((resolve) => {
            if (fetchData[fitBitResponseKeys.caloriesResponseKey] !== null && fetchData[fitBitResponseKeys.caloriesResponseKey].length > 0){
                fetchData[fitBitResponseKeys.caloriesResponseKey][0]["value"] === "" ? resolve(0)
                                                                                : resolve(parseInt(fetchData[fitBitResponseKeys.caloriesResponseKey][0]["value"]));
            }
        });
    }

    render() {
        return(
            <Fragment>
                <View>
                    <TouchableOpacity onPress={() => this.getActivityForDayRange(fitBitActivitySegments.calories, new Date("2020-09-01"), new Date("2020-09-30"))}>
                        <Text>Get calories for range</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <TouchableOpacity onPress={() => this.getActivityDataForDay(fitBitActivitySegments.calories, new Date("2020-09-12"))}>
                        <Text>Get calories for date</Text>
                    </TouchableOpacity>
                </View>
            </Fragment>
        )
    }
}