//React
import React from 'react';
import { createAppContainer, createSwitchNavigator, } from 'react-navigation';

//Screens
import LoadingScreen from '../screens/LoadingScreen';
import StepsScreen from '../screens/StepsScreen';

const MainNavigator = createSwitchNavigator({
    Loading: { screen: LoadingScreen },
    Steps: { screen: StepsScreen}
},
{
    initialRouteName: 'Loading'
});

const AppContainer = createAppContainer(MainNavigator);

export default () => {
    return <AppContainer />
}