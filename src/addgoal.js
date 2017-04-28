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
  TextInput,
  ToastAndroid,
    Dimensions,
     TouchableHighlight,
    Button,
    Alert,
  StyleSheet,
  PanResponder,
  View  
} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import DatePicker from './index.js';
import Header from './header';
import ViewGoal from './viewgoal';
import realm from './savedata';
const window = Dimensions.get('window');
export default class AddGoal extends Component {
    constructor(props) {
 super(props);
    this.state = {
      
      text:''
      
    };
    }


  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e) => {console.log('onStartShouldSetPanResponder'); return true;},
      onMoveShouldSetPanResponder: (e) => {console.log('onMoveShouldSetPanResponder'); return true;},
      onPanResponderGrant: (e) => console.log('onPanResponderGrant'),
      onPanResponderMove: (e) => console.log('onPanResponderMove'),
      onPanResponderRelease: (e) => console.log('onPanResponderRelease'),
      onPanResponderTerminate: (e) => console.log('onPanResponderTerminate')
    });
  }
   

  render() {
     var limit = 140;
    var remainder = limit - this.state.text.length;
    return (
       <View style={{flex: 1, backgroundColor : 'white' }}>
<View style={styles.viewStyle}>
<TouchableHighlight
  onPress={()=>this.props.navigator.push({
           index: 1,
           passProps:{imdbID: 'SMARTGoals'}
        })} >
        <Image style={{width: 15, height: 25, marginLeft: 10}} source={require('./left-arrow.png')}/>
         </TouchableHighlight>
   <Text style={{color: '#3d3d3d', fontSize: 18}}> Add Goal! </Text>
          <Image style={{width: 0, height: 0, marginRight: 10,}} source={require('./calendar.png')}/>
   </View>
   
       
        
       <View  style={{
   flexDirection: 'row',
        justifyContent: 'flex-end',
              }}>
          <TextInput style={styles.edtTxt}
          multiline={true}
          maxLength={limit}
          onChangeText={(text) => {
            
            this.setState({text});
          }}
             value={this.state.text}      />
        <Text style={[{color: 'red', marginTop:150}]}>
          {remainder}
        </Text>
        </View>
         <Button
          onPress={(this.onSubmitPressed.bind(this))}
          title="Save Goal"
          color="#841584"
         
        />
</View>
    );
  }
  
  onSubmitPressed() {
var add = Array.from(realm.objects('Person').sorted('id'));
    if(this.state.text == ''){
      Alert.alert("Please enter your message");

    }else{
      this.closeGoal();
    if (add.length == 0){
      realm.write(() => {
    let main = realm.create('Person',{
          id:1,
          message:this.state.text,
          creationDate:new Date(),
          selectDate: new Date(),
          conditionCheck: false,
        });
      });
  }else{
    if (add.length == 1){
      let last = add[add.length-1]
          realm.write(() => {
            realm.create('Person',{
              id:last.id+1,
              message:this.state.text,
          creationDate:new Date(),
          selectDate: new Date(),
          conditionCheck: false,
            });
          });
    }else {

      let last = add[add.length-1]
    
          realm.write(() => {
            realm.create('Person',{
              id:last.id+1,
             message:this.state.text,
          creationDate:new Date(),
          selectDate: new Date(),
          conditionCheck: false,
            });
          });
  }
    }
    }
     }
     closeGoal(){
      this.props.navigator.pop()
    }
     
    }

var styles = StyleSheet.create({
 banner: {
    width : window.width,
    marginTop : 10,
    marginBottom : 10,
    height: 180,
  },

  edtTxt:{
    width : 300, backgroundColor : '#f8f8f8',
height: 100, borderColor: 'gray', borderWidth: 1, marginTop : 50
  },
  txtStyle:{
color: 'black', fontSize: 18, marginRight: 10,marginTop:10
  },
  imgStyle:{
width: 25, height: 25,marginRight: 10,marginTop:10
  },
  viewStyle:{

        flexDirection: 'row',
        justifyContent: 'space-between',
    backgroundColor:'#ffffff',
    alignItems:'center',
    height:60,
    shadowColor:'#000',
    shadowOffset:{width:0, height:2},
    shadowOpacity:0.5,
    elevation:2,
    position:'relative'
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  });

