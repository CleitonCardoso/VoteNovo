import React from 'react'
import { Animated } from 'react-native'

export default class ImageLoader extends React.Component {
  state = {
    opacity: new Animated.Value(0)
  }

  onLoad = () => {
    Animated.sequence([
      Animated.timing(this.state.opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      }),
      Animated.delay(500),
      Animated.timing(this.state.opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true
      })
    ]).start(status => {
      if (status.finished) {
        this.props.callback()
      }
    })
  }

  render() {
    return (
      <Animated.Image
        onLoad={this.onLoad}
        {...this.props}
        style={[
          {
            opacity: this.state.opacity,
            transform: [
              {
                scale: this.state.opacity.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.85, 1]
                })
              }
            ]
          },
          this.props.style
        ]}
      />
    )
  }
}
