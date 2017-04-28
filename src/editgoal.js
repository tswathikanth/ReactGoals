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
 // this.realm = realm;
 

    this.state = {
      uId: this.props.userID,
      msg: this.props.message,
      
      text:'',
     
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
   <Text style={{color: '#3d3d3d', fontSize: 18}}> Update Goal! </Text>
          <Image style={{width: 0, height: 0, marginRight: 10,}} source={require('./calendar.png')}/>
   </View>
   
       
        
       <View  style={{
   flexDirection: 'row',
        justifyContent: 'flex-end',
              }}>
          <TextInput style={styles.edtTxt}
          multiline={true}
          maxLength={limit}
          onChangeText={(msg) => {
            
            this.setState({msg});
          }}
             value={this.state.msg}     />
        <Text style={[{color: 'red', marginTop:150}]}>
          {remainder}
        </Text>
        </View>
         <Button
           onPress={(this.onSubmitPressed.bind(this))}
          title="Update Goal"
          color="#841584"
         
        />
</View>
    );
  }
   
  onSubmitPressed() {
var add = Array.from(realm.objects('Person').sorted('id'));
    if(this.state.msg == ''){
      Alert.alert("Please enter your message");

    }else{
       let checkNo = parseInt(this.state.uId);

  if (Number.isInteger(checkNo)){
      this.closeGoal();
     // console.log("Achieve "+value);
    realm.write(() => {
    // Update book with new price keyed off the id
    realm.create('Person', {id: checkNo,message:this.state.msg},true);
  });
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

