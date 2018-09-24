import React from 'react'
import { View, StyleSheet } from 'react-native'
import { AppRegistry, Text, TextInput, Image } from 'react-native'
import { Button } from 'react-native'
import candidatos from '../candidatos.json'

import ImageLoader from './ImageLoader'

export default class RandomList extends React.Component {
  deputadosFederais
  deputadosEstaduais
  senadores
  governadores
  presidentes

  constructor(props) {
    super(props)
    this.state = {
      deputadoFederal: candidatos[4],
      deputadoEstadual: candidatos[4],
      senador1: candidatos[4],
      senador2: candidatos[4],
      governador: candidatos[4],
      presidente: candidatos[4]
    }
  }

  componentWillMount() {
    senadores = candidatos.filter((elem, i, array) => {
      return elem['exibir'] === 'sim' && elem['cargo']['slug'] === 'senador'
    })

    deputadosFederais = candidatos.filter((elem, i, array) => {
      return (
        elem['exibir'] === 'sim' && elem['cargo']['slug'] === 'deputado-federal'
      )
    })

    deputadosEstaduais = candidatos.filter((elem, i, array) => {
      return (
        elem['exibir'] === 'sim' &&
        elem['cargo']['slug'] === 'deputado-estadual'
      )
    })

    governadores = candidatos.filter((elem, i, array) => {
      return elem['exibir'] === 'sim' && elem['cargo']['slug'] === 'governador'
    })

    presidentes = candidatos.filter((elem, i, array) => {
      return elem['exibir'] === 'sim' && elem['cargo']['slug'] === 'presidente'
    })
  }

  componentDidMount() {}

  randomSelect = (list, ignoredItem) => {
    let thisList = [...list]
    if (ignoredItem != undefined) {
      thisList.splice(thisList.indexOf(ignoredItem), 1)
      console.log(thisList)
    }
    var listLength = thisList.length
    var randomIndex = Math.floor(Math.random() * listLength)
    return thisList[randomIndex]
  }

  randomRefresh = () => {
    var deputadoFederal = this.randomSelect(deputadosFederais)
    var deputadoEstadual = this.randomSelect(deputadosEstaduais)
    var senador1 = this.randomSelect(senadores)
    var senador2 = this.randomSelect(senadores, senador1)
    var governador = this.randomSelect(governadores)
    var presidente = this.randomSelect(presidentes)

    this.setState({
      deputadoFederal: deputadoFederal,
      deputadoEstadual: deputadoEstadual,
      senador1: senador1,
      senador2: senador2,
      governador: governador,
      presidente: presidente
    })
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'stretch',
          backgroundColor: '#f36f21'
        }}
      >
        {/* HEADER */}
        <View style={{ height: 50 }} />

        {/* DEPUTADO FEDERAL  */}
        <View style={styles.oddItem}>
          <Image
            style={styles.thumbStyle}
            source={{
              uri:
                'https://apicandidatos.novo.org.br/media/' +
                this.state.deputadoFederal['imagens']['thumb']
            }}
          />
        </View>

        {/* DEPUTADO ESTADUAL */}
        <View style={styles.evenItem}>
          <Image
            style={styles.thumbStyle}
            source={{
              uri:
                'https://apicandidatos.novo.org.br/media/' +
                this.state.deputadoEstadual['imagens']['thumb']
            }}
          />
        </View>

        {/* SENADOR */}
        <View style={styles.oddItem}>
          <Image
            style={styles.thumbStyle}
            source={{
              uri:
                'https://apicandidatos.novo.org.br/media/' +
                this.state.senador1['imagens']['thumb']
            }}
          />
        </View>
        {/* SENADOR */}
        <View style={styles.evenItem}>
          <Image
            style={styles.thumbStyle}
            source={{
              uri:
                'https://apicandidatos.novo.org.br/media/' +
                this.state.senador2['imagens']['thumb']
            }}
          />
        </View>
        {/* GOVERNADOR */}
        <View style={styles.oddItem}>
          <Image
            style={styles.thumbStyle}
            source={{
              uri:
                'https://apicandidatos.novo.org.br/media/' +
                this.state.governador['imagens']['thumb']
            }}
          />
        </View>
        {/* PRESIDENTE */}
        <View style={styles.evenItem}>
          <Image
            style={styles.thumbStyle}
            source={{
              uri:
                'https://apicandidatos.novo.org.br/media/' +
                this.state.presidente['imagens']['thumb']
            }}
          />
        </View>

        <View style={styles.randomButton}>
          <Button
            onPress={this.randomRefresh}
            title="Sugerir Candidatos"
            color="#165464"
            accessibilityLabel="Sugerir candidatos do partido Novo aleatóriamente"
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  thumbStyle: {
    borderWidth: 2,
    borderRadius: 3,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    marginLeft: 5,
    height: 90,
    width: 90
  },
  evenItem: {
    height: 100,
    backgroundColor: '#f9a572',
    alignContent: 'center',
    justifyContent: 'center'
  },
  oddItem: {
    height: 100,
    backgroundColor: '#165464',
    alignContent: 'center',
    justifyContent: 'center'
  },
  randomButton: {
    marginLeft: 20,
    marginRight: 20,
    height: 100,
    justifyContent: 'center',
    alignContent: 'center'
  }
})

{
  /* DEPUTADO ESTADUAL 5
DEPUTADO FEDERAL 4
senador 3
senador 3
governador 2
presidente 2 */
}
