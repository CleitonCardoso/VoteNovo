import React from 'react'
import { createStackNavigator } from 'react-navigation'

import SplashScreen from './src/SplashScreen'
import Termos from './src/Termos'
import RandomList from './src/RandomList'

const RootStack = createStackNavigator(
  {
    home: SplashScreen,
    termos: Termos,
    candidateList: RandomList
  },
  {
    initialRouteName: 'home',
    headerMode: 'none',
    navigationOptions: {
      gesturesEnabled: false,
      swipeEnabled: false
    }
  }
)

export default class App extends React.Component {
  render() {
    return <RootStack />
  }
}
