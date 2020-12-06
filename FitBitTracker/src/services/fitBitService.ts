// React
import React, { Component } from 'react';
import { StyleSheet, Text, View, Linking, TouchableOpacity } from 'react-native';
import * as Keychain from 'react-native-keychain';

// External libraries
import qs from 'qs';
import moment from 'moment'

// Constants
import { fitBitAuthConfig } from '../../config';
import { fitBitConnectionValues } from '../../StaticConfig';

export class FitBitService {
    private clientId: string;

    constructor() {
        this.clientId = fitBitAuthConfig.client_id;
    }

    //authorization functions
    public async authorizeFitBit(): Promise<void> {
        Linking.addEventListener('url', this.processFitBitAuthResponse);

        //prepare and send fitBit authorization request
        const oauthurl = fitBitConnectionValues.oAuthUrl + `${qs.stringify({
            client_id: this.clientId,
            response_type: fitBitConnectionValues.responseType,
            scope: fitBitConnectionValues.scope,
            redirect_uri: fitBitConnectionValues.redirectUri,
            expires_in: fitBitConnectionValues.expiresIn,
        })}`;

        Linking.openURL(oauthurl)
            .catch(err => console.log('Error sending fitBit authorization request', err));
    }

    private async processFitBitAuthResponse(event) {
        Linking.removeEventListener('url', this.processFitBitAuthResponse);

        //retrieve access token from the deep link URL response associated with the authorization request above
        const [, query_string] = event.url.match(/\#(.*)/);
        const query = qs.parse(query_string);

        //store fitbit access token in the keychain
        await Keychain.setInternetCredentials('fitBitToken', 'fitBitToken', query.access_token);

        //store fitbit user_id associated with the access token in the keychain
        await Keychain.setInternetCredentials('fitBitUserId', 'fitBitUserId', query.user_id);
    }

    //activity functions
    public async fetchActivityInRange(activityType: string, startDay?: Date, endDay?: Date): Promise<any> {
        let fitBitToken = await Keychain.getInternetCredentials('fitBitToken')  
        let fitBitUserId = await Keychain.getInternetCredentials('fitBitUserId')

        let response: Response;
        let result: any;

        try {
            response = await fetch("https://api.fitbit.com/1.2/user/" + fitBitUserId.password
                                    + "/activities/tracker/steps/"
                                    + moment(startDay).format('YYYY-MM-DD') + '/' + moment(endDay).format('YYYY-MM-DD') + '.json',
                                    {
                                        method: 'GET',
                                        headers: {
                                            Authorization: `Bearer ${fitBitToken.password}`,
                                        },
                                    });

            console.log("------");
            console.log(response);
        }
        catch {
            //error retrieving activity data, return 0
            console.log("Error retrieving activity data from fitbit", response);

            return Promise.reject({ response, result });
        }
    }

    public async getActivityForDayRange(activityType?: string, startDay?: Date, endDay?: Date): Promise<any> {
        //retrieve data from fitbit
        let fetchData = await this.fetchActivityInRange(activityType, startDay, endDay);
    }
}