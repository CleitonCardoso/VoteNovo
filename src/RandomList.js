import React from 'react'
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  PixelRatio,
  Button
} from 'react-native'

import candidatos from '../candidatos.json'
import { widthPercentageToDP, heightPercentageToDP } from './PixelToDp'

export default class RandomList extends React.Component {
  deputadosFederais
  deputadosEstaduais
  senadores
  governadores
  presidentes

  constructor(props) {
    super(props)
    this.state = {}
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
      <View style={styles.container}>
        {/* HEADER */}
        <View style={{ height: 50 }} />

        {/* DEPUTADO FEDERAL  */}
        <View style={styles.oddItem}>
          <View style={styles.itemWrapper}>
            <Image
              style={styles.thumbStyle}
              source={
                this.state.deputadoFederal
                  ? {
                      uri:
                        'https://apicandidatos.novo.org.br/media/' +
                        this.state.deputadoFederal['imagens']['thumb']
                    }
                  : require('../assets/unknown_person.png')
              }
            />
            <View style={styles.detailsWrapper}>
              <Text style={styles.roleLabel} adjustsFontSizeToFit={true}>
                Deputado Federal
              </Text>
              <Text style={styles.candidateName} adjustsFontSizeToFit={true}>
                {this.state.deputadoFederal
                  ? this.state.deputadoFederal['nome'].substring(0,20)
                  : '?'}
              </Text>
            </View>
            <Text style={styles.candidateNumber}>
              {this.state.deputadoFederal
                ? this.state.deputadoFederal['legenda']
                : '????'}
            </Text>
          </View>
        </View>

        {/* DEPUTADO ESTADUAL */}
        <View style={styles.evenItem}>
          <View style={styles.itemWrapper}>
            <Image
              style={styles.thumbStyle}
              source={
                this.state.deputadoEstadual
                  ? {
                      uri:
                        'https://apicandidatos.novo.org.br/media/' +
                        this.state.deputadoEstadual['imagens']['thumb']
                    }
                  : require('../assets/unknown_person.png')
              }
            />
            <View style={styles.detailsWrapper}>
              <Text style={styles.roleLabel} adjustsFontSizeToFit={true}>
                Deputado Estadual
              </Text>
              <Text style={styles.candidateName} adjustsFontSizeToFit={true}>
                {this.state.deputadoEstadual
                  ? this.state.deputadoEstadual['nome'].substring(0,20)
                  : '?'}
              </Text>
            </View>
            <Text style={styles.candidateNumber}>
              {this.state.deputadoEstadual
                ? this.state.deputadoEstadual['legenda']
                : '?????'}
            </Text>
          </View>
        </View>

        {/* SENADOR */}
        <View style={styles.oddItem}>
          <View style={styles.itemWrapper}>
            <Image
              style={styles.thumbStyle}
              source={
                this.state.senador1
                  ? {
                      uri:
                        'https://apicandidatos.novo.org.br/media/' +
                        this.state.senador1['imagens']['thumb']
                    }
                  : require('../assets/unknown_person.png')
              }
            />
            <View style={styles.detailsWrapper}>
              <Text style={styles.roleLabel} adjustsFontSizeToFit={true}>
                Primeiro Senador
              </Text>
              <Text style={styles.candidateName} adjustsFontSizeToFit={true}>
                {this.state.senador1 ? this.state.senador1['nome'].substring(0,20) : '?'}
              </Text>
            </View>
            <Text style={styles.candidateNumber}>
              {this.state.senador1 ? this.state.senador1['legenda'] : '???'}
            </Text>
          </View>
        </View>
        {/* SENADOR */}
        <View style={styles.evenItem}>
          <View style={styles.itemWrapper}>
            <Image
              style={styles.thumbStyle}
              source={
                this.state.senador2
                  ? {
                      uri:
                        'https://apicandidatos.novo.org.br/media/' +
                        this.state.senador2['imagens']['thumb']
                    }
                  : require('../assets/unknown_person.png')
              }
            />
            <View style={styles.detailsWrapper}>
              <Text style={styles.roleLabel} adjustsFontSizeToFit={true}>
                Segundo Senador
              </Text>
              <Text style={styles.candidateName} adjustsFontSizeToFit={true}>
                {this.state.senador2 ? this.state.senador2['nome'].substring(0,20) : '?'}
              </Text>
            </View>
            <Text style={styles.candidateNumber}>
              {this.state.senador2 ? this.state.senador2['legenda'] : '???'}
            </Text>
          </View>
        </View>
        {/* GOVERNADOR */}
        <View style={styles.oddItem}>
          <View style={styles.itemWrapper}>
            <Image
              style={styles.thumbStyle}
              source={
                this.state.governador
                  ? {
                      uri:
                        'https://apicandidatos.novo.org.br/media/' +
                        this.state.governador['imagens']['thumb']
                    }
                  : require('../assets/unknown_person.png')
              }
            />
            <View style={styles.detailsWrapper}>
              <Text style={styles.roleLabel} adjustsFontSizeToFit={true}>
                Governador
              </Text>
              <Text style={styles.candidateName} adjustsFontSizeToFit={true}>
                {this.state.governador ? this.state.governador['nome'].substring(0,20) : '?'}
              </Text>
            </View>
            <Text style={styles.candidateNumber}>
              {this.state.governador ? this.state.governador['legenda'] : '??'}
            </Text>
          </View>
        </View>
        {/* PRESIDENTE */}
        <View style={styles.evenItem}>
          <View style={styles.itemWrapper}>
            <Image
              style={styles.thumbStyle}
              source={
                this.state.presidente
                  ? {
                      uri:
                        'https://apicandidatos.novo.org.br/media/' +
                        this.state.presidente['imagens']['thumb']
                    }
                  : require('../assets/unknown_person.png')
              }
            />
            <View style={styles.detailsWrapper}>
              <Text style={styles.roleLabel} adjustsFontSizeToFit={true}>
                Presidente
              </Text>
              <Text style={styles.candidateName} adjustsFontSizeToFit={true}>
                {this.state.presidente ? this.state.presidente['nome'].substring(0,20) : '?'}
              </Text>
            </View>
            <Text style={styles.candidateNumber}>
              {this.state.presidente ? this.state.presidente['legenda'] : '??'}
            </Text>
          </View>
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
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#f36f21'
  },
  thumbStyle: {
    borderWidth: 2,
    borderRadius: 3,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    marginLeft: 5,
    height: heightPercentageToDP('12%'),
    width: widthPercentageToDP('21%')
  },
  evenItem: {
    height: heightPercentageToDP('13%'),
    backgroundColor: '#f9a572',
    alignContent: 'center',
    justifyContent: 'center'
  },
  oddItem: {
    height: heightPercentageToDP('13%'),
    backgroundColor: '#165464',
    alignContent: 'center',
    justifyContent: 'center'
  },
  randomButton: {
    height: heightPercentageToDP('13%'),
    marginLeft: widthPercentageToDP('5%'),
    marginRight: widthPercentageToDP('5%'),
    justifyContent: 'center',
    alignContent: 'center'
  },
  itemWrapper: {
    flexDirection: 'row'
  },
  detailsWrapper: {
    flexDirection: 'column',
    alignSelf: 'center',
    width: widthPercentageToDP('22%'),
    marginLeft: widthPercentageToDP('3%'),
    justifyContent: 'space-between'
  },
  roleLabel: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: widthPercentageToDP('1.5%')
  },
  candidateName: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: widthPercentageToDP('4.5%'),
    textShadowColor: '#f36f21',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2
  },
  candidateNumber: {
    color: 'white',
    textAlign: 'justify',
    fontWeight: 'bold',
    fontSize: widthPercentageToDP('16%'),
    marginLeft: widthPercentageToDP('3%'),
    textShadowColor: '#f36f21',
    textShadowOffset: { width: 1, height: 4 },
    textShadowRadius: 2
  }
})
