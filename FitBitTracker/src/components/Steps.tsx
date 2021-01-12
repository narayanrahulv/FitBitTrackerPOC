// React
import React, { Component, Fragment } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import * as Keychain from 'react-native-keychain';
import DateTimePicker from '@react-native-community/datetimepicker'

// External libraries
import qs from 'qs';
import moment from 'moment'

// Constants
import { fitBitAuthConfig } from '../../config';
import { fitBitConnectionValues, fitBitActivitySegments, fitBitResponseKeys, icons } from '../../StaticConfig';
import { Colors } from '../../Colors';

// Services
import { FitBitService } from '../services/fitBitService';

export default class Steps extends Component<{navigation?: any}, StateModel> {
    constructor(props) {
        super(props);

        this.state = {
            startDate: new Date(),
            endDate: new Date(),
            dayCountDisplayed: 0,
            dayRangeData: [],
            dataObtainedFor: ''
        }
    }

    private fb = new FitBitService();
    private dayStepsObtained = 0;
    private dayRangeDataObtained = [];

    componentDidMount = async () => {
    }

    processClick = async (dataObtainedFor: string) => {
        if (dataObtainedFor.toLowerCase() === "day"){
            this.dayStepsObtained = await this.getActivityDataForDay(fitBitActivitySegments.steps, this.state.startDate);
            //set the count to be displayed
            this.setState({
                dayCountDisplayed: this.dayStepsObtained,
                dayRangeData: [],
                dataObtainedFor: dataObtainedFor.toLowerCase()
            });
        }
        else {
            this.dayRangeDataObtained = await this.getActivityForDayRange(fitBitActivitySegments.steps, this.state.startDate, this.state.endDate);
            this.setState({
                dayRangeData: this.dayRangeDataObtained,
                dataObtainedFor: dataObtainedFor.toLowerCase()
            });
        }
    }

    //get range data
    getActivityForDayRange = async (activitySegment?: string, startDay?: Date, endDay?: Date): Promise<any> => {
        //retrieve data from fitbit
        let fetchData = await this.fb.fetchActivityForDateRange(activitySegment, startDay, endDay);

        return new Promise((resolve) => {
            resolve(fetchData[fitBitResponseKeys.stepsResponseKey])
        });
    }

    //get single day data
    getActivityDataForDay = async(activitySegment?: string, day?: Date): Promise<number> => {
        let fetchData = await this.fb.fetchActivityDataForDay(activitySegment, day);

        return new Promise((resolve) => {
            if (fetchData[fitBitResponseKeys.stepsResponseKey] !== null && fetchData[fitBitResponseKeys.stepsResponseKey].length > 0){
                fetchData[fitBitResponseKeys.stepsResponseKey][0]["value"] === "" ? resolve(0)
                                                                                : resolve(parseInt(fetchData[fitBitResponseKeys.stepsResponseKey][0]["value"]));
            }
        });
    }

    onStartDateChange = (event, val) => {
        //set the value of startDate 
        this.setState({
            startDate: val
        })
    }

    onEndDateChange = (event, val) => {
        //set the value of endDate 
        this.setState({
            endDate: val
        })
    }

    render() {
        return(
            <Fragment>
                <ScrollView style={{backgroundColor: Colors.cadetBlue, marginTop: 40}}>
                    <View>
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={this.state.startDate}
                            is24Hour={true}
                            display="default"
                            onChange={this.onStartDateChange}
                            />
                    </View>
                    
                    <TouchableOpacity onPress={() => this.processClick("day")}>
                        <View style={styles.buttoncontainer}>
                            <Text>Get steps for date</Text>
                        </View>
                    </TouchableOpacity>
                    
                    <View>
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={this.state.endDate}
                            is24Hour={true}
                            display="default"
                            onChange={this.onEndDateChange}
                            />
                    </View>

                    <TouchableOpacity onPress={() => this.processClick("range")}>
                        <View style={styles.buttoncontainer}>
                            <Text>Get steps for range</Text>
                        </View>
                    </TouchableOpacity>

                    <ScrollView style={{backgroundColor: Colors.gainsboro, width: "80%", height: "80%", alignSelf: 'center'}}>
                        {
                            this.state.dataObtainedFor.toLowerCase() === "day" &&
                            <View style={{flexDirection: 'row'}}>
                                <View style={{marginLeft: 20}}>
                                    <Text>{moment(this.state.startDate).format("YYYY MM DD")}</Text>
                                </View>
                                <View style={{marginLeft: 20}}>
                                    <Text>{this.state.dayCountDisplayed}</Text>
                                </View>
                            </View>
                        }
                        {
                            this.state.dayRangeData.map((dr, i) => {
                                return(
                                    <View style={{flexDirection: 'row'}}>
                                        <View style={{marginLeft: 20}}>
                                            <Text>{dr.dateTime}</Text>
                                        </View>
                                        <View style={{marginLeft: 20}}>
                                            <Text>{dr.value}</Text>
                                        </View>
                                    </View>
                                )
                            })
                        }
                    </ScrollView>
                    
                </ScrollView>
            </Fragment>
        )
    }
}

interface StateModel {
    startDate: Date;
    endDate: Date;
    dayCountDisplayed: number;
    dayRangeData: Array<RangeModel>
    dataObtainedFor: string;
}

interface RangeModel {
    day: Date;
    dayCount: number;
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
    buttoncontainer: {
        borderRadius: 10,
        backgroundColor: Colors.darkOrange,

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