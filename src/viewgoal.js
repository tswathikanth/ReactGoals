/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import {
  AppRegistry, 
  Image,
  TextInput,
  Text,
  ToastAndroid,
    Dimensions,
  StyleSheet,
  Alert,
  Navigator,
  TouchableOpacity,
  TouchableHighlight,
   PanResponder,
   Button,
  View  
} from 'react-native';
import Menu, {
  MenuContext,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from 'react-native-popup-menu';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modalbox';
import realm from './savedata';
import { ListView } from 'realm/react-native';
import AddGoal from './addgoal';
import Home from './home';
import Header from './header';
import Timeline from './timeline';

import DatePicker from './index.js';
const window = Dimensions.get('window');
var width = Dimensions.get('window').width;
var screen = Dimensions.get('window');

export default class ViewGoal extends Component {

  constructor(props) {
    super(props);
  this.state = {
     
      date: '',
      time: '20:00',
      datetime: '2016-05-05 20:00',
      text:'',
      datetime1: '2016-05-05 20:00'
   };
    this.realm = realm;
    
   this.realm.addListener('change', () => {
                 this.setState({
             dataSource:this.state.dataSource.cloneWithRows(this.realmData)
           });
       });
        let dff = realm.objects('Person').sorted('creationDate',true);
           this.realmData = dff;
           const datasource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
           this.state = {
        dataSource: datasource.cloneWithRows([]),
           };
      // this.updateDB = this.updateDB.bind(this);
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
   
  componentDidMount(){
    this.setState({
      dataSource:this.state.dataSource.cloneWithRows(this.realmData),
    });
    // this.fetchLoadingData();
  }

  
  renderRow(rowData: string, sectionID: number, rowID: number){
    var conditionalOutput, achieveFlag, editFlag;
    var createDate = rowData.creationDate;
     var parts = createDate.toString().split(/[:\s]+/);
    var month = createDate.getMonth() + 1;
    
    var showDate = parts[3] + "/" +  month + "/" + parts[2] ;
    if (rowData.conditionCheck === true) {
      conditionalOutput = <Image source={require('./checked.png')}/>;
       achieveFlag = <MenuOption value="disabled" disabled={true} text='Achieve' />
     editFlag = <MenuOption value="disabled" disabled={true} text='Edit' />
    } else {
      conditionalOutput = <Image style={{width: 0, height: 0}} source={require('./success-flag.png')}/>;
      achieveFlag = <MenuOption value={rowData.id} onSelect={(value) => this.onAchieve(value)} text='Achieve' />
     editFlag = <MenuOption value={rowData.id} onSelect={(value) => this.onEditOption(value)} text='Edit' />
    }
    
    return(
       
        <View style={styles.incontainer}>
       <View style={{flexDirection: 'row',
        justifyContent: 'space-between'}}>
        <Text style={{color: '#0080ff', fontSize: 12, padding:5}} > {showDate} </Text>
        {conditionalOutput}
        <Menu >
        <MenuTrigger>
        <Image style={{width: 10, height: 15, marginRight: 5,}} source={require('./settings.png')}/>
   </MenuTrigger>
              <MenuOptions>
                      {editFlag}
                      <MenuOption value={rowData.id} onSelect={(value) => this.onOptionSelect(value)} text='Progress' />
                      {achieveFlag}
                      <MenuOption  value={rowData.id} onSelect={(value) => this.onDeleteOption(value)} text='Delete' />
                </MenuOptions>
              </Menu>
   </View>
                  <Text style={{color: '#3D3D3D', fontSize: 16, padding : 10}}>
          {rowData.message}
          </Text>
         
        </View>
           
    );
  }

  onDeleteOption = (value) => {
realm.write(() => {
  let del = realm.create('Person', {id: value, name: "eighteen"}, true);
  realm.delete(del)
 
});

  }
  onAchieve = (value) => {
    realm.write(() => {
    // Update book with new price keyed off the id
    realm.create('Person', {id: value, conditionCheck: true},true);
  });
  }
  onEditOption = (value) => {
    console.log(Array.from(value));
     let check = parseInt(value);

   if (Number.isInteger(check))
   {
    let main = Array.from(realm.objects('Person').filtered('id = ' +check));
    console.log(main);
    let msg = main[0].message
    this.props.navigator.push({
            index: 4,
             passProps:{userID: value,message: msg}
        });
   }
     
  }
 onOptionSelect = (value) => {
  
      this.props.navigator.push({
            index: 2,
             passProps:{userID: value}
        });
  }

  render() {
    var limit = 140;
    var currentYear = this.props.imdbID;
  //  var setYear = this.props.imdbID;
     if(this.state.date != null)
     {
      
      var currentYear = this.state.date;

      }
    // var remainder = limit - this.state.text.length;
    return (
<MenuContext style={{flex: 1}}>
       <View style={{flex: 1, backgroundColor: '#e8e9ed' }}>
<View style={styles.viewStyle}>
<TouchableOpacity
  onPress={()=>this.props.navigator.push({
           index: 0,
          
        })} >
        <Image style={{width: 15, height: 25, marginLeft: 10}} source={require('./left-arrow.png')} />
        </TouchableOpacity>
   
          <View style={styles.modal}>
         <DatePicker
          
          date={this.state.date}
          mode="date"
          placeholder="Date"
          format="YYYY/MM/DD"
          minDate="2017-01-01"
          maxDate="2117-12-31"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          text="date"
          onDateChange={(date) => {this.setState({date: date});}} /> 

          <Text style={{color: '#3d3d3d', fontSize: 16}} > {currentYear}  </Text>
          </View>
          <TouchableOpacity
  onPress={()=> this.props.navigator.push({index: 1,
          passProps:{imdbID: 'SMARTGoals'}})} >
        <Image style={{width: 12, height: 20, marginRight: 10, padding : 10}} source={require('./reload.png')} />
        </TouchableOpacity>
   </View>
   
      <ListView 
        style={{flex:1,marginTop:20}}
        enableEmptySections={true}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)}        />
        <ActionButton buttonColor="rgba(231,76,60,1)" onPress={()=> this.props.navigator.push({index: 3,
               })} style={styles.btn}>
          
          </ActionButton>
          
</View>
</MenuContext>
    );
  }
 
  onSubmitPressed() {
    var add = Array.from(realm.objects('Person').sorted('id'));
    if(this.state.text == ''){
      Alert.alert("Please enter your message");

    }else{
        
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
   
}

var styles = StyleSheet.create({
 banner: {
    width : window.width,
    marginTop : 10,
    marginBottom : 10,
    height: 180,
  },
  disabled: {
    color: '#ccc'
  },
  viewStyle:{
 borderWidth: 5, 
borderColor: '#e8e9ed',
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
  container:{
  backgroundColor:'#e8e9ed'
  },
  header:{
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: '#34AFD3',
    height: 50,
    shadowColor: "black",
  shadowOpacity: 0.8,
  shadowRadius: 2,
  shadowOffset: {
  height: 1,
  width: 0,
},
  },
  imgcont:{
   
    width:125,
    backgroundColor:'#ffffff',
    marginLeft:5,
    marginBottom:2,
    marginTop:2
  },
  txtcont:{
    backgroundColor:'#ffffff',
    marginLeft:2,
    marginBottom:2,
    marginTop:2,
marginRight:2,
    width:width    
  },
  headertxt:{
    fontSize:20,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  incontainer: {
   flex: 1,
  flexDirection: 'column',
borderWidth: 2, 
borderColor: '#e8e9ed',

    padding: 10,
    marginBottom: 10,
    marginHorizontal: 10,
    borderRadius: 15,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 2,
    shadowOpacity: 0.5
  },
  protitle: {
    fontSize:18,
    color: '#000000',
    marginLeft: 5,
    marginTop : 2
  },
  prodisc: {
    fontSize:18,
    color: '#ff0000',
    marginLeft: 5,
    marginTop : 10
  },
   proprice: {
    textDecorationLine: 'line-through', 
    textDecorationStyle: 'double',
    fontSize:18,
    color: '#e6258b',
    marginLeft:5,
    marginRight: 5,
    marginBottom : 5
  },
    proprice2: {
    
    fontSize:18,
    color: '#e6258b',
    marginLeft: 5,
    marginBottom : 5
  },
  btn: {
    margin: 10,
    backgroundColor: "#3B5998",
    color: "white",
    padding: 10
  },

  btnModal: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 50,
    height: 50,
    backgroundColor: "transparent"
  },

  text: {
    color: "black",
    fontSize: 22
  },
   modal: {
    justifyContent: 'center',
    alignItems: 'center',

  },
   modal3: {
    borderRadius: 15,
    height: window.height-320,
    width: 300
  },
  edtTxt:{
    padding : 20,
    marginRight : 20,
    marginLeft : 20,
     backgroundColor : '#f8f8f8',
height: 100, 
width: window.width-100,
borderColor: '#3d3d3d', borderWidth: 1, marginTop : 10,
marginBottom : 20,
  },
  });

