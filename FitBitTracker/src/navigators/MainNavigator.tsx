//React
import React from 'react';
import { createAppContainer, createSwitchNavigator, } from 'react-navigation';

//Screens
import LoadingScreen from '../screens/LoadingScreen';
import DataDisplayScreen from '../screens/DataDisplayScreen';

const MainNavigator = createSwitchNavigator({
    Loading: { screen: LoadingScreen },
    DataDisplay: { screen: DataDisplayScreen}
},
{
    initialRouteName: 'Loading'
});

const AppContainer = createAppContainer(MainNavigator);

export default () => {
    return <AppContainer />
}