import React from 'react'
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  PixelRatio,
  Button,
  Picker
} from 'react-native'

import candidatos from '../candidatos.json'
import { widthPercentageToDP, heightPercentageToDP } from './PixelToDp'

export default class RandomList extends React.Component {
  deputadosFederais
  deputadosEstaduais
  senadores
  governadores
  presidentes

  constructor( props ) {
    super( props )
    this.state = {
      pickerValue: "any"
    }
  }

  componentWillMount() {
    senadores = candidatos.filter( ( elem, i, array ) => {
      return elem[ 'exibir' ] === 'sim' && elem[ 'cargo' ][ 'slug' ] === 'senador'
    } )

    deputadosFederais = candidatos.filter( ( elem, i, array ) => {
      return (
        elem[ 'exibir' ] === 'sim' && elem[ 'cargo' ][ 'slug' ] === 'deputado-federal'
      )
    } )

    deputadosEstaduais = candidatos.filter( ( elem, i, array ) => {
      return (
        elem[ 'exibir' ] === 'sim' &&
        elem[ 'cargo' ][ 'slug' ] === 'deputado-estadual'
      )
    } )

    governadores = candidatos.filter( ( elem, i, array ) => {
      return elem[ 'exibir' ] === 'sim' && elem[ 'cargo' ][ 'slug' ] === 'governador'
    } )

    presidentes = candidatos.filter( ( elem, i, array ) => {
      return elem[ 'exibir' ] === 'sim' && elem[ 'cargo' ][ 'slug' ] === 'presidente'
    } )
  }

  componentDidMount() { }

  randomSelect = ( list, ignoredItem ) => {
    let thisList = [ ...list ]
    if ( this.state.pickerValue ) {
      anotherList = thisList.filter( ( elem, i, array ) => {
        return elem[ 'estado' ][ 'slug' ] === this.state.pickerValue
      } )
      if ( anotherList.length > 0 ) {
        thisList = anotherList
      }
    }

    if ( ignoredItem != undefined ) {
      thisList.splice( thisList.indexOf( ignoredItem ), 1 )
    }
    var listLength = thisList.length
    var randomIndex = Math.floor( Math.random() * listLength )
    return thisList[ randomIndex ]
  }

  randomRefresh = () => {
    var deputadoFederal = this.randomSelect( deputadosFederais )
    var deputadoEstadual = this.randomSelect( deputadosEstaduais )
    var senador1 = this.randomSelect( senadores )
    var senador2 = this.randomSelect( senadores, senador1 )
    var governador = this.randomSelect( governadores )
    var presidente = this.randomSelect( presidentes )

    this.setState( {
      deputadoFederal: deputadoFederal,
      deputadoEstadual: deputadoEstadual,
      senador1: senador1,
      senador2: senador2,
      governador: governador,
      presidente: presidente
    } )
  }

  changeFilter = ( itemValue, itemIndex ) => {
    this.setState( { pickerValue: itemValue }, () => {
      this.randomRefresh()
    } )
  }

  render() {
    return (
      <View style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.statePickerLabel} adjustsFontSizeToFit={true}>
            Por estado:
          </Text>

          <Picker
            prompt="Escolha o seu estado abaixo:"
            style={styles.statePicker}
            selectedValue={this.state.pickerValue}
            onValueChange={this.changeFilter}
            mode="dialog"
          >
            <Picker.Item label="Qualquer um" value="any" />
            <Picker.Item label="Acre (AC)" value="acre" />
            <Picker.Item label="Alagoas (AL)" value="alagoas" />
            <Picker.Item label="Amapá (AP)" value="amapa" />
            <Picker.Item label="Amazonas (AM)" value="amazonas" />
            <Picker.Item label="Bahia (BA)" value="bahia" />
            <Picker.Item label="Ceará (CE)" value="ceara" />
            <Picker.Item label="Distrito Federal (DF)" value="distrito-federal" />
            <Picker.Item label="Espírito Santo (ES)" value="espirito-santo" />
            <Picker.Item label="Goiás (GO)" value="goias" />
            <Picker.Item label="Maranhão (MA)" value="maranhao" />
            <Picker.Item label="Mato Grosso (MT)" value="mato-grosso" />
            <Picker.Item label="Mato Grosso do Sul (MS)" value="mato-grosso-do-sul" />
            <Picker.Item label="Minas Gerais (MG)" value="minas-gerais" />
            <Picker.Item label="Pará (PA)" value="para" />
            <Picker.Item label="Paraíba (PB)" value="paraiba" />
            <Picker.Item label="Paraná (PR)" value="parana" />
            <Picker.Item label="Pernambuco (PE)" value="pernambuco" />
            <Picker.Item label="Piauí (PI)" value="piaui" />
            <Picker.Item label="Rio de Janeiro (RJ)" value="rio-de-janeiro" />
            <Picker.Item label="Rio Grande do Norte (RN)" value="rio-grande-do-norte" />
            <Picker.Item label="Rio Grande do Sul (RS)" value="rio-grande-do-sul" />
            <Picker.Item label="Rondônia (RO)" value="rondonia" />
            <Picker.Item label="Roraima (RR)" value="roraima" />
            <Picker.Item label="Santa Catarina (SC)" value="santa-catarina" />
            <Picker.Item label="São Paulo (SP)" value="sao-paulo" />
            <Picker.Item label="Sergipe (SE)" value="sergipe" />
            <Picker.Item label="Tocantins (TO)" value="tocantins" />


          </Picker>
        </View>

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
                      this.state.deputadoFederal[ 'imagens' ][ 'thumb' ]
                  }
                  : require( '../assets/unknown_person.png' )
              }
            />
            <View style={styles.detailsWrapper}>
              <Text style={styles.roleLabel} adjustsFontSizeToFit={true}>
                Deputado Federal
              </Text>
              <Text style={styles.candidateName} adjustsFontSizeToFit={true}>
                {this.state.deputadoFederal
                  ? this.state.deputadoFederal[ 'nome' ].substring( 0, 19 )
                  : '?'}
              </Text>
            </View>
            <Text style={styles.candidateNumber}>
              {this.state.deputadoFederal
                ? this.state.deputadoFederal[ 'legenda' ]
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
                      this.state.deputadoEstadual[ 'imagens' ][ 'thumb' ]
                  }
                  : require( '../assets/unknown_person.png' )
              }
            />
            <View style={styles.detailsWrapper}>
              <Text style={styles.roleLabel} adjustsFontSizeToFit={true}>
                Deputado Estadual
              </Text>
              <Text style={styles.candidateName} adjustsFontSizeToFit={true}>
                {this.state.deputadoEstadual
                  ? this.state.deputadoEstadual[ 'nome' ].substring( 0, 19 )
                  : '?'}
              </Text>
            </View>
            <Text style={styles.candidateNumber}>
              {this.state.deputadoEstadual
                ? this.state.deputadoEstadual[ 'legenda' ]
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
                      this.state.senador1[ 'imagens' ][ 'thumb' ]
                  }
                  : require( '../assets/unknown_person.png' )
              }
            />
            <View style={styles.detailsWrapper}>
              <Text style={styles.roleLabel} adjustsFontSizeToFit={true}>
                Primeiro Senador
              </Text>
              <Text style={styles.candidateName} adjustsFontSizeToFit={true}>
                {this.state.senador1 ? this.state.senador1[ 'nome' ].substring( 0, 19 ) : '?'}
              </Text>
            </View>
            <Text style={styles.candidateNumber}>
              {this.state.senador1 ? this.state.senador1[ 'legenda' ] : '???'}
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
                      this.state.senador2[ 'imagens' ][ 'thumb' ]
                  }
                  : require( '../assets/unknown_person.png' )
              }
            />
            <View style={styles.detailsWrapper}>
              <Text style={styles.roleLabel} adjustsFontSizeToFit={true}>
                Segundo Senador
              </Text>
              <Text style={styles.candidateName} adjustsFontSizeToFit={true}>
                {this.state.senador2 ? this.state.senador2[ 'nome' ].substring( 0, 19 ) : '?'}
              </Text>
            </View>
            <Text style={styles.candidateNumber}>
              {this.state.senador2 ? this.state.senador2[ 'legenda' ] : '???'}
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
                      this.state.governador[ 'imagens' ][ 'thumb' ]
                  }
                  : require( '../assets/unknown_person.png' )
              }
            />
            <View style={styles.detailsWrapper}>
              <Text style={styles.roleLabel} adjustsFontSizeToFit={true}>
                Governador
              </Text>
              <Text style={styles.candidateName} adjustsFontSizeToFit={true}>
                {this.state.governador ? this.state.governador[ 'nome' ].substring( 0, 19 ) : '?'}
              </Text>
            </View>
            <Text style={styles.candidateNumber}>
              {this.state.governador ? this.state.governador[ 'legenda' ] : '??'}
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
                      this.state.presidente[ 'imagens' ][ 'thumb' ]
                  }
                  : require( '../assets/unknown_person.png' )
              }
            />
            <View style={styles.detailsWrapper}>
              <Text style={styles.roleLabel} adjustsFontSizeToFit={true}>
                Presidente
              </Text>
              <Text style={styles.candidateName} adjustsFontSizeToFit={true}>
                {this.state.presidente ? this.state.presidente[ 'nome' ].substring( 0, 19 ) : '?'}
              </Text>
            </View>
            <Text style={styles.candidateNumber}>
              {this.state.presidente ? this.state.presidente[ 'legenda' ] : '??'}
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

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#f36f21'
  },
  header: {
    height: heightPercentageToDP( '15%' ),
    marginLeft: widthPercentageToDP( '5%' ),
    marginRight: widthPercentageToDP( '5%' ),
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'row'
  },
  statePickerLabel: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: widthPercentageToDP( '4.5%' ),
    width: widthPercentageToDP( '40%' ),
    textShadowColor: '#f36f21',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    alignSelf: 'center'
  },
  statePicker: {
    color: 'white',
    width: widthPercentageToDP( '40%' ),
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center'
  },
  thumbStyle: {
    borderWidth: 2,
    borderRadius: 3,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    marginLeft: widthPercentageToDP( '5%' ),
    height: heightPercentageToDP( '11%' ),
    width: widthPercentageToDP( '19%' ),
    alignSelf: 'center'
  },
  evenItem: {
    height: heightPercentageToDP( '12%' ),
    backgroundColor: '#f9a572',
    alignContent: 'center',
    justifyContent: 'center'
  },
  oddItem: {
    height: heightPercentageToDP( '12%' ),
    backgroundColor: '#165464',
    alignContent: 'center',
    justifyContent: 'center'
  },
  randomButton: {
    height: heightPercentageToDP( '13%' ),
    marginLeft: widthPercentageToDP( '5%' ),
    marginRight: widthPercentageToDP( '5%' ),
    justifyContent: 'center',
    alignContent: 'center'
  },
  itemWrapper: {
    flexDirection: 'row'
  },
  detailsWrapper: {
    flexDirection: 'column',
    alignSelf: 'center',
    width: widthPercentageToDP( '22%' ),
    marginLeft: widthPercentageToDP( '3%' ),
    justifyContent: 'space-between'
  },
  roleLabel: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: widthPercentageToDP( '2%' )
  },
  candidateName: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: widthPercentageToDP( '4.5%' ),
    textShadowColor: '#f36f21',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2
  },
  candidateNumber: {
    color: 'white',
    textAlign: 'justify',
    fontWeight: 'bold',
    fontSize: widthPercentageToDP( '16%' ),
    marginLeft: widthPercentageToDP( '3%' ),
    textShadowColor: '#f36f21',
    textShadowOffset: { width: 1, height: 4 },
    textShadowRadius: 2
  }
} )
