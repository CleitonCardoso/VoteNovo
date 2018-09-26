import React from 'react'
import { View, StyleSheet } from 'react-native'

import ImageLoader from './ImageLoader'

export default class SplashScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ImageLoader
          source={require('../assets/novo_logo.png')}
          callback={() => {
            this.props.navigation.navigate('termos')
          }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f36f21',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
