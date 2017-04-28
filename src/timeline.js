import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
   TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
  AppRegistry,
  View
} from 'react-native';
import Timeline from 'react-native-timeline-listview'
import Header from './header';
import ViewGoal from './viewgoal';
import realm from './savedata';
var windowSize = Dimensions.get('window');
export default class timeline extends Component {
   constructor(props){
    super(props);

    this.realm = realm;

     this.realm.addListener('change', () => {
       this.forceUpdate();
        
       });
    this.state = {
      text:'',
      uID : this.props.userID
      
    }
    console.log(this.state.uID);
  // console.log("id = " +parseInt(this.state.uID));
  let checkNo = parseInt(this.state.uID);

  if (Number.isInteger(checkNo))
  {
    console.log("it is a number");
     // var no = "id = " +parseInt(this.state.uID);
 let person = realm.objects('Person').filtered("id = " +checkNo);
let nam = person[0].timeline
// console.log(nam);
this.progressDb = nam
this.realmData = nam;

this.dataDb = []

this.progressDb.forEach(({message,creationDate}) =>
this.dataDb.push({time:creationDate.toDateString(),description:message})
  );

  }else{
    console.log("it is not a number");


this.dataDb = []

  }

    // this.data = [
    //   {time: '01/03/2017', description: 'The Beginner Archery and Beginner Crossbow course does not require you to bring any equipment, since everything you need will be provided for the course. '},
    //   {time: '05/03/2017', description: 'Badminton is a racquet sport played using racquets to hit a shuttlecock across a net.'},
    //   {time: '12/05/2017', description: 'Badminton is a racquet sport played using racquets to hit a shuttlecock across a net.'},
    //   {time: '22/08/2017', description: 'Team sport played between two teams of eleven players with a spherical ball. '},
    //   {time: '29/12/2017', description: 'Look out for the Best Gym & Fitness Centers around me :)'}
    // ]
  } 

  render() {


    //'rgb(45,156,219)'
    return (
      
      <View style={{flex: 1 }}>
<View style={styles.viewStyle}>
<TouchableOpacity
  onPress={(this.buttonPressed.bind(this))} >
        <Image style={{width: 15, height: 25, marginLeft: 10}} source={require('./left-arrow.png')}/>
         </TouchableOpacity>
   <Text style={{color: '#3d3d3d', fontSize: 18}}> Timeline </Text>
          <Image style={{width: 0, height: 0, marginRight: 10,}} source={require('./calendar.png')}/>
   </View>
   <View style={styles.container}>
        <Timeline 
          style={styles.list}
          data={this.dataDb}
          enableEmptySections={true}
          circleSize={20}
          circleColor='rgb(45,156,219)'
          lineColor='rgb(45,156,219)'
          timeContainerStyle={{minWidth:52, marginTop: 0}}
          timeStyle={{textAlign: 'center', backgroundColor:'#009074', marginLeft: 5, color:'white', padding:5, borderRadius:13}}
          descriptionStyle={{color:'gray'}}
          options={{
            style:{paddingTop:5}
          }}
          innerCircle={'dot'}  />
    
        <View style={styles.inputContainer}>
          <View style={styles.textContainer}>
            <TextInput
              style={styles.input}
                onChangeText={(text) => this.setState({text})}
        value={this.state.text} 
                  />
          </View>
          <View style={styles.sendContainer}>
            <TouchableOpacity
              underlayColor={'#4e4273'}
              onPress={(this.sendProgress.bind(this))} >
            
              <Text style={styles.sendLabel}>SEND</Text>
            </TouchableOpacity>
          </View>
        </View>
        </View>
      </View>
    );
  }
  buttonPressed() {
      this.props.navigator.push({
           index: 1,
           passProps:{imdbID: 'SMARTGoals'}
        });
   }
   sendProgress(){
     let checkNo = parseInt(this.state.uID);

  if (Number.isInteger(checkNo))
  {
 realm.write(() => {
     let exercise = realm.create('Person',{id:checkNo},true);
     exercise.timeline.push({message:this.state.text,creationDate:new Date()});
   });
 this.props.navigator.push({
           index: 2,
           passProps:{userID: this.state.uID}
        });
this.forceUpdate()
}
   }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'stretch',
      backgroundColor: '#ffffff'
    },
    
  list: {
    flex: 11,
    paddingTop: 10,
      justifyContent: 'center',
      alignItems: 'stretch',
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
   inputContainer: {
      flex: 0,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',

      backgroundColor: '#a8afb3'
    },
    textContainer: {
      flex: 1,
      justifyContent: 'center'
    },
    sendContainer: {
      justifyContent: 'flex-end',
      paddingRight: 10
    },
    sendLabel: {
      color: '#ffffff',
      fontSize: 15
    },
    input: {
      width: windowSize.width - 70,
      color: '#555555',
      paddingRight: 10,
      paddingLeft: 10,
      paddingTop: 5,
      height: 35,
      borderColor: '#a8afb3',
      borderWidth: 2,
      borderRadius: 2,
      alignSelf: 'center',
      backgroundColor: '#ffffff'
    },
});