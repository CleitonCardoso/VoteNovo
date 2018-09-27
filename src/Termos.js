import React from 'react'

import { StyleSheet, Text, View, AsyncStorage, Button } from 'react-native'

export default class Termos extends React.Component {
  goToRandomList = () => {
    this._persistDecision()
    this.props.navigation.navigate('candidateList')
  }

  componentWillMount() {
    this._retrieveDecision()
  }

  _persistDecision = async () => {
    try {
      await AsyncStorage.setItem('VOTE_NOVO_TERMOS', true)
    } catch (error) {
      console.log(error)
    }
  }

  _retrieveDecision = async () => {
    try {
      const value = await AsyncStorage.getItem('VOTE_NOVO_TERMOS')
      if (value !== null && value === true) {
        this.goToRandomList()
      }
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.termosText} adjustsFontSizeToFit={true}>
          Olá. Tenha em mente que o
          <Text style={{ fontWeight: 'bold' }}> VoteNovo</Text> deve ser usado
          apenas como uma ferramenta de sugestão de candidatos do partido Novo.
        </Text>

        <Text style={styles.termosText} adjustsFontSizeToFit={true}>
          Procure conhecer melhor as propostas do partido Novo e dos candidatos
          aqui sugeridos antes de decidir sua escolha.
        </Text>

        <Text style={styles.termosText} adjustsFontSizeToFit={true}>
          Clique em "ENTENDI!" para confirmar que você entendeu o propósito do
          aplicativo. Uma boa eleição para todos!
        </Text>

        <View style={styles.randomButton}>
          <Button
            style={styles.acceptButton}
            onPress={this.goToRandomList}
            title="Entendi!"
            color="#165464"
            accessibilityLabel="Confirmo que entendi os termos apresentados"
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f36f21'
  },
  termosText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    margin: 20
  },
  acceptButton: {
    marginLeft: 20,
    marginRight: 20,
    justifyContent: 'center',
    alignContent: 'center'
  }
})
