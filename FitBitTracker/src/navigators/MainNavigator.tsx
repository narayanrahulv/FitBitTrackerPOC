//React
import React from 'react';
import { createAppContainer, createSwitchNavigator, } from 'react-navigation';

//Screens
import LoadingScreen from '../screens/LoadingScreen';
import Steps from '../components/Steps';

const MainNavigator = createSwitchNavigator({
    Loading: { screen: LoadingScreen },
    Steps: {screen: Steps}
},
{
    initialRouteName: 'Loading'
});

const AppContainer = createAppContainer(MainNavigator);

export default () => {
    return <AppContainer />
}