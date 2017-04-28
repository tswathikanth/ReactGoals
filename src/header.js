import React from 'react';
import { Text, View } from 'react-native';

const Header = (props) => {
const { textStyle, viewStyle } = styles;

return(
  <View style={viewStyle}>
   <Text style={{color: '#3d3d3d', fontSize: 20}}> {props.headerText} </Text>
   </View>
);
};
const styles = {
  textStyle:{
    textColor:'#3d3d3d',
    fontSize:20
  },
  viewStyle:{
    backgroundColor:'#ffffff',
    justifyContent:'center',
    alignItems:'center',
    borderWidth: 5, 
borderColor: '#e8e9ed',
    height:60,
    shadowColor:'#000',
    shadowOffset:{width:0, height:2},
    shadowOpacity:0.5,
    elevation:2,
    position:'relative'
  }
};
export default Header;