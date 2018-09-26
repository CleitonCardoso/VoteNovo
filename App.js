import React from 'react'
import { StyleSheet, Text, View, Image, Animated } from 'react-native'
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
    headerMode: 'none'
  }
)

export default class App extends React.Component {
  render() {
    return <RootStack />
  }
}
