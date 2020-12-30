// React
import React, { Component, Fragment } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import * as Keychain from 'react-native-keychain';

// Constants
import { fitBitActivitySegments, fitBitResponseKeys, icons } from '../../StaticConfig';
import { Colors } from '../../Colors';

// Services
import { FitBitService } from '../services/fitBitService';

export default class Floors extends Component<{}>{
    constructor(props) {
        super(props);

        this.getActivityForDayRange = this.getActivityForDayRange.bind(this);
        this.getActivityDataForDay = this.getActivityDataForDay.bind(this);
    }

    private fb = new FitBitService();

    //get range data
    getActivityForDayRange =  async(activitySegment?: string, startDay?: Date, endDay?: Date): Promise<any> => {
        //retrieve data from fitbit
        let fetchData = await this.fb.fetchActivityForDateRange(activitySegment, startDay, endDay);

        return new Promise((resolve) => {
            resolve(fetchData[fitBitResponseKeys.floorsResponseKey])
        });
    }

    //get single day data
    getActivityDataForDay =  async(activitySegment?: string, day?: Date) => {
        let fetchData = await this.fb.fetchActivityDataForDay(activitySegment, day);

        return new Promise((resolve) => {
            if (fetchData[fitBitResponseKeys.floorsResponseKey] !== null && fetchData[fitBitResponseKeys.floorsResponseKey].length > 0){
                fetchData[fitBitResponseKeys.floorsResponseKey][0]["value"] === "" ? resolve(0)
                                                                                : resolve(parseInt(fetchData[fitBitResponseKeys.floorsResponseKey][0]["value"]));
            }
        });
    }

    render() {
        return(
            <Fragment>
                <View style={[{ alignItems: 'center', justifyContent:'space-between'}, styles.maincontainer]}>
                    <View style={{ alignItems: 'center'}}>
                        <View>
                            <Image source={icons['stairs']}/>
                        </View>
                        <View style={{marginLeft: 10}}>
                            <Text style={styles.textstyle}>Floors</Text>
                        </View>
                    </View>
                </View>
                {/* <View>
                    <TouchableOpacity onPress={() => this.getActivityForDayRange(fitBitActivitySegments.floors, 
                                                        new Date("2020-09-01"), 
                                                        new Date("2020-09-30"))}>
                        <Text>Get floors for range</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <TouchableOpacity onPress={() => this.getActivityDataForDay(fitBitActivitySegments.floors, 
                                                        new Date("2020-09-12"))}>
                        <Text>Get floors for single date</Text>
                    </TouchableOpacity>
                </View> */}
            </Fragment>
        )
    }
}

const styles = StyleSheet.create({
    //views
    maincontainer: {
        borderRadius: 10,
        backgroundColor: Colors.gainsboro,

        marginVertical: 5,
        padding: 20,
        marginHorizontal: 50,
    },

    //text
    textstyle: {
        color: Colors.darkSlateBlue,
        fontSize: 30
    }
})