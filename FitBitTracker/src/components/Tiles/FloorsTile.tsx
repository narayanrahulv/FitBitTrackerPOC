// React
import React, { Component, Fragment } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import * as Keychain from 'react-native-keychain';

// External libraries
import qs from 'qs';
import moment from 'moment'

// Constants
import { fitBitAuthConfig } from '../../../config';
import { fitBitConnectionValues, fitBitActivitySegments, fitBitResponseKeys, icons } from '../../../StaticConfig';
import { Colors } from '../../../Colors';

// Services
import { FitBitService } from '../../services/fitBitService';

export default class FloorsTile extends Component<{navigation?: any}>{
    constructor(props) {
        super(props);
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