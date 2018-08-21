import React from 'react'

import { Body, Button, Container, Header, Left, Right, Tab, TabHeading,
         Tabs, Content, Spinner } from 'native-base'
import { Image, Text, View } from 'react-native'
/**
 * @typedef {import('react-navigation').NavigationScreenProp<NavigationState>} NavigationScreenProp
 */

import styles from './style'

/**
 * @typedef {import('../definitions').NavigationState} NavigationState
 * @typedef {import('../definitions').NewsItem} NewsItem
 */
import Loader from '../utils/Loader'

import CardsTabController from '../CardsTab/CardsTabController'
import { fetchLatestNews, fetchRegionNews,
         fetchMostSeenNews } from '../CardsTab/CardsTabActions'
import { MOST_SEEN_LIMIT } from '../constants/config'


/**
 * @typedef HomeScreenProps
 * @prop {NavigationScreenProp} navigation Navigation screen prop
 */


/**
 *
 * @param {NavigationScreenProp} navigation Navigation screen prop
 */

const HomeScreenHeader = navigation => (
  <Header
    androidStatusBarColor="#D13030"
    style={styles.header}
    iosBarStyle="light-content"
    noShadow
  >
    <Left>
      <Button
        onPress={() => navigation.toggleDrawer()}
        transparent
      >
        <Image source={require('../assets/img/menu.png')} />
      </Button>
    </Left>
    <Body>
      <Image
        source={require('../assets/img/logo.png')}
        style={styles.image}
      />
    </Body>
    <Right>
      <Button transparent>
        <Image source={require('../assets/img/download.png')} />
      </Button>
    </Right>
  </Header>
)

/**
 * Renders the homescreen with the three main tabs (lo ultimo, regiones and
 * lo mas visto)
 * @param {HomeScreenProps} props
 */
const HomeScreen = ({ navigation }) => (
  <Container style={styles.rootContainer}>
    {HomeScreenHeader(navigation)}
    <Tabs
      edgeHitWidth={0}
      initialPage={0}
      tabBarUnderlineStyle={styles.underLineColor}
      tabContainerStyle={styles.tabContainerStyle}
    >
      { /* LATEST NEWS TAB */ }
      <Tab
        heading={(
          <TabHeading style={styles.tabContainer}>
            <Text style={styles.textTab}>
              Lo Último
            </Text>
          </TabHeading>
        )}
      >
        <Loader
          fetcherFunction={() => fetchLatestNews(1)}
          loadingElement={(
            <Container>
              <Content>
                <Spinner
                  color="#D13030"
                  style={styles.deadCenter}
                />
              </Content>
            </Container>
          )}
          signalErrorFn={() => {}}
          timeout={10000}
        >
          {
            (newsItems, err) => {
              if (err) {
                return (
                  <View style={styles.serverErrorText}>
                    <Text>
                      Error Sever | Error Connection
                    </Text>
                  </View>
                )
              }
              return (
                <CardsTabController
                  fetcher={fetchLatestNews}
                  initialNewsItems={/** @type {NewsItem[]} */ (newsItems)}
                  navigation={navigation}
                  isPaginated
                  defaultFetchValue={1}
                />
              )
            }
          }
        </Loader>
      </Tab>

      { /* MOST SEEN NEWS TAB */ }
      <Tab
        heading={(
          <TabHeading style={styles.tabContainer}>
            <Text style={styles.textTab}>
              Lo más visto
            </Text>
          </TabHeading>
        )}
      >
        <Loader
          fetcherFunction={() => fetchRegionNews(1)}
          loadingElement={(
            <Container>
              <Content>
                <Spinner
                  color="#D13030"
                />
              </Content>
            </Container>
          )}
          signalErrorFn={() => {}}
          timeout={10000}
        >
          {
            (newsItems, err) => {
              if (err) {
                return (
                  <View style={styles.serverErrorText}>
                    <Text>
                      Error Sever | Error Connection
                    </Text>
                  </View>
                )
              }
              return (
                <CardsTabController
                  fetcher={fetchMostSeenNews}
                  initialNewsItems={/** @type {NewsItem[]} */ (newsItems)}
                  navigation={navigation}
                  defaultFetchValue={MOST_SEEN_LIMIT}
                />
              )
            }
          }
        </Loader>
      </Tab>

      { /* REGIONES NEWS TAB */ }
      <Tab
        heading={(
          <TabHeading style={styles.tabContainer}>
            <Text style={styles.textTab}>
              Regiones
            </Text>
          </TabHeading>
        )}
      >
        <Loader
          fetcherFunction={() => fetchRegionNews(1)}
          loadingElement={(
            <Container>
              <Content>
                <Spinner
                  color="#D13030"
                />
              </Content>
            </Container>
          )}
          signalErrorFn={() => {}}
          timeout={10000}
        >
          {
            (newsItems, err) => {
              if (err) {
                return (
                  <View style={styles.serverErrorText}>
                    <Text>
                      Error Sever | Error Connection
                    </Text>
                  </View>
                )
              }
              return (
                <CardsTabController
                  fetcher={fetchRegionNews}
                  initialNewsItems={/** @type {NewsItem[]} */ (newsItems)}
                  navigation={navigation}
                  isPaginated
                  defaultFetchValue={1}
                />
              )
            }
          }
        </Loader>
      </Tab>
    </Tabs>
  </Container>
)

export default HomeScreen
