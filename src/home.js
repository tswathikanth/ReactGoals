/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import {
  AppRegistry, 
  Image,
  Text,
  TouchableOpacity,
    Dimensions,
  StyleSheet,
  ScrollView,
  Navigator,
  View  
} from 'react-native';
import GridViews from 'react-native-super-grid';
import ViewGoal from './viewgoal';
import Header from './header';

const window = Dimensions.get('window');
var n = new Date().getFullYear()
export default class GridView extends Component {

  render() {

     const items = [
      { name: 'YEARLY', code: '#1abc9c', status: ' ' }, { name: 'QUATERLY', code: '#2ecc71', status: '(Coming Soon...)' },
      { name: 'WEEKLY', code: '#3498db', status: '(Coming Soon...)' }, { name: 'DAILY', code: '#9b59b6', status: '(Coming Soon...)' },
    ];
    return (
       <View style={{flex: 1, backgroundColor: '#e8e9ed' }}>
<Header headerText={'Goals!'} />
<ScrollView>
<Image
style={styles.banner}
          source={require('./goals.jpg')}  />
        <GridViews
        itemWidth={130}
        items={items}
        style={styles.gridView}
        renderItem={item => (
          <TouchableOpacity
  onPress={()=> this.props.navigator.push({index: 1,
               passProps:{imdbID: 'SMARTGoals'}})}>
          <View style={[styles.itemContainer, { backgroundColor: item.code }]}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemCode}>{item.status}</Text>
          </View>
          </TouchableOpacity>
        )}
      />
      </ScrollView>
</View>

    );
  }

}
var styles = StyleSheet.create({
 banner: {
    width: null, 
    marginTop : 10,
    marginBottom : 10,
    height: 180,
  },
  gridView: {
    paddingTop: 10,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 130,
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
  });

AppRegistry.registerComponent('GridView', () => GridView);
