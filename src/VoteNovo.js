import React from 'react'

import ImageLoader from './ImageLoader'
import { StackNavigator } from 'react-navigation';

export default class VoteNovo extends React.Component {
  render() {
    return <ImageLoader source={require('../assets/novo_logo.png')} />
  }
}
