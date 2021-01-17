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
import { FitBitService } from '../services/fitBitService'

export default class DataDisplayScreen extends Component<
    { 
        navigation?: any,
        displayDataType?: string, 
    }, StateModel
    >{
    constructor(props) {
        super(props);

        this.state = {
            startDate: new Date(),
            endDate: new Date(),
            dayCountDisplayed: 0,
            dayRangeDisplayed: [],
            dataObtainedFor: '',
            dataType: this.props.navigation.state.params.displayDataType,
            emptyDataForRange: false
        }
    }

    private fb = new FitBitService();
    private dayCountObtained = 0;
    private dayRangeObtained = [];
    private dataActivitySegment = '';
    private dataActivityResponseKey = ''
    private emptyDataCountForRange = false;

    componentDidMount = async () => {
        switch(this.state.dataType.toLowerCase()){
            case "steps":
                this.dataActivitySegment = fitBitActivitySegments.steps
                this.dataActivityResponseKey = fitBitResponseKeys.stepsResponseKey
                break;
            case "floors":
                this.dataActivitySegment = fitBitActivitySegments.floors
                this.dataActivityResponseKey = fitBitResponseKeys.floorsResponseKey
                break;
            case "calories":
                this.dataActivitySegment = fitBitActivitySegments.calories
                this.dataActivityResponseKey = fitBitResponseKeys.caloriesResponseKey
                break;
            case "sleep":
                this.dataActivitySegment = fitBitActivitySegments.sleep
                this.dataActivityResponseKey = fitBitResponseKeys.sleepResponseKey
                break;
            default:
                this.dataActivitySegment = fitBitActivitySegments.steps
                this.dataActivityResponseKey = fitBitResponseKeys.stepsResponseKey
        }
    }

    goBack = async() => {
        this.props.navigation.navigate("Loading");
    }

    processClick = async (dataObtainedFor: string) => {
        if (dataObtainedFor.toLowerCase() === "day"){
            this.dayCountObtained = await this.getActivityDataForDay(this.dataActivitySegment, this.dataActivityResponseKey, this.state.startDate);
            //set the count to be displayed
            this.setState({
                dayCountDisplayed: this.dayCountObtained,
                dayRangeDisplayed: [],
                dataObtainedFor: dataObtainedFor.toLowerCase(),
            });
        }
        else {
            this.dayRangeObtained = await this.getActivityForDayRange(this.dataActivitySegment, this.dataActivityResponseKey, this.state.startDate, this.state.endDate);
            
            if (this.dayRangeObtained.length === 0){
                this.emptyDataCountForRange = true
            }
            this.setState({
                dayRangeDisplayed: this.dayRangeObtained,
                dataObtainedFor: dataObtainedFor.toLowerCase(),
                emptyDataForRange: this.emptyDataCountForRange
            });
        }
    }

    //get range data
    getActivityForDayRange = async (activitySegment?: string, activityResponseKey?: string, startDay?: Date, endDay?: Date): Promise<any> => {
        //retrieve data from fitbit
        let fetchData = await this.fb.fetchActivityForDateRange(activitySegment, startDay, endDay);

        return new Promise((resolve) => {
            resolve(fetchData[activityResponseKey])
        });
    }

    //get single day data
    getActivityDataForDay = async(activitySegment?: string, activityResponseKey?: string, day?: Date): Promise<number> => {
        let fetchData = await this.fb.fetchActivityDataForDay(activitySegment, day);

        return new Promise((resolve) => {
            if (fetchData[activityResponseKey] !== null && fetchData[activityResponseKey].length > 0){
                if(activitySegment === fitBitActivitySegments.sleep){
                    fetchData[fitBitResponseKeys.sleepResponseKey][0]["minutesAsleep"] === "" ? resolve(0)
                                                                                : resolve(parseInt(fetchData[fitBitResponseKeys.sleepResponseKey][0]["minutesAsleep"]));
                }
                else {
                    fetchData[activityResponseKey][0]["value"] === "" ? resolve(0)
                                                                       : resolve(parseInt(fetchData[activityResponseKey][0]["value"]));
                }
            }
            else {
                resolve(0);
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
                        <View style={styles.buttoncontainera}>
                            <Text>Get count for date</Text>
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
                        <View style={styles.buttoncontainerb}>
                            <Text>Get data for range</Text>
                        </View>
                    </TouchableOpacity>

                    <ScrollView style={{backgroundColor: Colors.gainsboro, width: "80%", height: "80%", alignSelf: 'center'}}>
                        {
                            this.state.emptyDataForRange &&
                            <View style={{flexDirection: 'row'}}>
                                <Text>No data available for range {moment(this.state.startDate).format("YYYY MM DD")} to {moment(this.state.endDate).format("YYYY MM DD")}</Text>
                            </View>
                        }
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
                            this.state.dayRangeDisplayed.map((dr, i) => {
                                return(
                                    <View style={{flexDirection: 'row'}} key={i}>
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

                    <TouchableOpacity onPress={this.goBack}>
                        <View style={styles.smallbuttoncontainer}>
                            <Text style={styles.whitetext}>Go to main screen</Text>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            </Fragment>
        )
    }
}

interface StateModel {
    startDate: Date;
    endDate: Date;
    dayCountDisplayed: number;
    dayRangeDisplayed: Array<RangeModel>
    dataObtainedFor: string;
    dataType: string;
    emptyDataForRange: boolean;
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
    buttoncontainera: {
        borderRadius: 10,
        backgroundColor: Colors.darkOrange,

        marginVertical: 5,
        padding: 20,
        marginHorizontal: 50,
    },
    buttoncontainerb: {
        borderRadius: 10,
        backgroundColor: Colors.lightBlue,

        marginVertical: 5,
        padding: 20,
        marginHorizontal: 50,
    },
    smallbuttoncontainer: {
        marginTop: 60,
        borderRadius: 10,
        backgroundColor: Colors.darkSlateBlue,

        marginVertical: 5,
        padding: 20,
        marginHorizontal: 100,

        alignSelf: 'center'
    },

    //text
    textstyle: {
        color: Colors.darkSlateBlue,
        fontSize: 30
    },
    whitetext: {
        color: Colors.floralWhite,
        fontSize: 20
    }
})