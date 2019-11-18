import React, {Component} from 'react';
import {View, Text, Modal, TouchableHighlight} from 'react-native';

export default class TodoEnterDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModelVisible: false,
    };
  }
  setModalVisible = visible => {
    this.setState({modalVisible: visible});
  };
  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#070B14',
        }}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.isModelVisible}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}>
          <View style={{marginTop: 22}}>
            <View>
              <Text>Hello World!</Text>
              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.isModelVisible);
                }}>
                <Text>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
