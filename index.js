/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {Navigator, StatusBar, TouchableHighlight,
   AppRegistry, StyleSheet, Text, View} from 'react-native';
import Home from './src/home.js';
import ViewGoal from './src/viewgoal.js';
import TimeLine from './src/timeline.js';
import AddGoal from './src/addgoal.js';
import EditGoal from './src/editgoal.js';
const routes = [
  {
    title: 'Goal!',
    index: 0
  }, {
    title: 'View Goal',
    index: 1
  },{
    title: 'Timeline',
    index: 2
  },{
    title: 'Add Goal',
    index: 3
  },{
    title: 'Edit Goal',
    index: 4
  }
]

class Goal extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="grey"
          barStyle="light-content" />
        <Navigator

          initialRoute={routes[0]}
          initialRouteStack={routes}
          renderScene={
            (route, navigator) => {
              switch (route.index) {
                case 0: return (<Home navigator={navigator} route={routes[route.index]} {...route.passProps}></Home>);
                case 1: return (<ViewGoal navigator={navigator} route={routes[route.index]} {...route.passProps}></ViewGoal>);
                case 2: return (<TimeLine navigator={navigator} route={routes[route.index]} {...route.passProps}></TimeLine>);
                case 3: return (<AddGoal navigator={navigator} route={routes[route.index]} {...route.passProps}></AddGoal>);
                case 4: return (<EditGoal navigator={navigator} route={routes[route.index]} {...route.passProps}></EditGoal>);
              }
            }
          }
          configureScene={
            (route, routeStack) =>
              Navigator.SceneConfigs.FloatFromBottom
          }
          
      />
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  navigationBar:{
    backgroundColor: 'grey',
  },
  navigationBarText:{
    color: 'white',
    padding: 10,
    fontSize: 15
  },
  titleText:{
    fontSize: 20,
    paddingTop:5
  }

});

AppRegistry.registerComponent('GridView', () => Goal);
