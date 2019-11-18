import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  StatusBar,
  Modal,
  TouchableHighlight,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-community/async-storage';
import TodoEnterDetailScreen from '../screens/todoEnterDetailScreen';

export default class TodoMainScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [1, 2, 3, 4, 5, 6, 7, 8],
      isModelVisible: false,
    };
    console.log(
      AsyncStorage.getAllKeys()
        .then(keys => {
          console.log(keys);
          return AsyncStorage.multiGet(keys)
            .then(result => {
              result.pop();
            })
            .catch(error => console.log('Multiget ERROR :', error));
        })
        .catch(error => console.log('Loading keys ERROR :', error)),
    );
  }

  componentDidMount() {
    const {navigation} = this.props;
    navigation.addListener('willFocus', () => {
      //   this.getAllSchedule();
    });
  }

  getAllSchedule = async () => {
    // collect all data...
    await AsyncStorage.getAllKeys()
      .then(keys => {
        return AsyncStorage.multiGet(keys)
          .then(result => {
            result.pop();
            this.setState({
              dataSource: result,
            });
          })
          .catch(error => console.log('Multiget ERROR :', error));
      })
      .catch(error => console.log('Loading keys ERROR :', error));
    console.log(this.state.dataSource);
  };

  render() {
    if (this.state.dataSource.length === 0) {
      return (
        <View style={styles.container}>
          <TouchableOpacity
            style={{
              flex: 1,
              alignSelf: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {
              this.props.navigation.navigate('GetDetailScreen');
            }}>
            <Image
              source={require('../assets/topicIcons/1.webp')}
              style={{width: 250, height: 250}}
            />
          </TouchableOpacity>
        </View>
      );
    }

    let color = [
      ['#CC736E', '#E5A65F'],
      ['#C37EF3', '#ED4884'],
      ['#7C4EB1', '#617CE5'],
      ['#4EABB1', '#617CE5'],
      ['#ffd89b', '#19547b'],
      ['#c33764', '#1d2671'],
      ['#5614B0', '#DBD65C'],
      ['#C02425', '#F0CB35'],
    ];

    return (
      <View style={{flex: 1, backgroundColor: '#070B14'}}>
        <StatusBar
          barStyle="light-content"
          hidden={false}
          backgroundColor="#070B14"
        />
        <Text
          style={{
            flex: 1,
            fontSize: 26,
            paddingLeft: (10 / 100) * Dimensions.get('screen').width,
            color: 'white',
            textAlignVertical: 'center',
          }}>
          {`Activity Schedule`}
        </Text>
        <View style={{flex: 4}}>
          <FlatList
            contentContainerStyle={{paddingBottom: 100}}
            data={this.state.dataSource}
            renderItem={({item, index}) => {
              // const details = JSON.parse(item[1]);
              // console.log(details.userLocation);
              return (
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => {
                    {
                      this.state.isModelVisible ? (
                        <TodoEnterDetailScreen />
                      ) : (
                        console.log('false')
                      );
                    }
                  }}
                  style={{
                    flex: 1,
                    backgroundColor: '#070B14',
                    borderRadius: 15,
                    height: null,
                    width: '100%',
                    alignItems: 'center',
                    marginBottom: 30,
                    paddingLeft: (10 / 100) * Dimensions.get('screen').width,
                    paddingRight: (10 / 100) * Dimensions.get('screen').width,
                  }}>
                  <LinearGradient
                    colors={[color[index][0], color[index][1]]}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    style={{
                      flex: 1,
                      borderRadius: 15,
                      height: '100%',
                      flexDirection: 'row',
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        alert('dot working');
                      }}
                      style={{
                        height: (9 / 100) * Dimensions.get('screen').width,
                        width: (9 / 100) * Dimensions.get('screen').width,
                        borderRadius:
                          ((9 / 100) * Dimensions.get('screen').width) / 2,
                        backgroundColor: '#070B14',
                        borderColor: 'white',
                        borderWidth: 2,
                        alignSelf: 'center',
                        marginLeft: (5 / 100) * Dimensions.get('screen').width,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <View
                        style={{
                          height: (3 / 100) * Dimensions.get('screen').width,
                          width: (3 / 100) * Dimensions.get('screen').width,
                          borderRadius:
                            ((3 / 100) * Dimensions.get('screen').width) / 2,
                          backgroundColor: 'white',
                          alignSelf: 'center',
                        }}
                      />
                    </TouchableOpacity>
                    <View
                      style={{
                        flex: 2,
                        justifyContent: 'center',
                        marginVertical: 10,
                        paddingLeft: (5 / 100) * Dimensions.get('screen').width,
                      }}>
                      <Text
                        style={{
                          color: '#FFF',
                          fontSize: 22,
                          paddingBottom: 5,
                        }}>
                        {/* {details.userLocation} */} Meeting with Nakul
                      </Text>
                      <Text style={{color: '#FFF', fontSize: 15}}>
                        {/* {details.landMark} */} Wed, 20 Nov 2019, 3:17 pm
                      </Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              );
            }}
            updateCellsBatchingPeriod={6}
            removeClippedSubviews={true}
            maxToRenderPerBatch={6}
            initialNumToRender={6}
            numColumns={1}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <TouchableOpacity
          style={styles.floatButton}
          onPress={() => {
            this.props.navigation.navigate('GetDetailScreen');
          }}>
          <EntypoIcon name="plus" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  floatButton: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    right: (8 / 100) * Dimensions.get('screen').width,
    bottom: (8 / 100) * Dimensions.get('screen').width,
    backgroundColor: '#504E4E',
    borderRadius: 30,
    elevation: 8,
    borderWidth: 5,
    borderColor: '#EAF0F1',
  },
});
