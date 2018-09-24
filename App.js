import React from 'react'
import { StyleSheet, Text, View, Image, Animated } from 'react-native'

import SplashScreen from './src/SplashScreen'
import VoteNovo from './src/VoteNovo'
import RandomList from './src/RandomList'

export default class App extends React.Component {
  render() {
    // return <SplashScreen />
    return <RandomList />
  }
}
