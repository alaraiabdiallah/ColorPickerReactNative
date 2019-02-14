import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from "react-native";

import Picker from "./components/Picker"

export default class App extends Component {

  constructor(props) {
    super(props);
  
    this.state = {
      r:255,
      g:255,
      b:255,
      backgroundColor: "rgba(255,255,255,1)"
    };

    this.onRedDragged = this.onRedDragged.bind(this)
    this.onGreenDragged = this.onGreenDragged.bind(this)
    this.onBlueDragged = this.onBlueDragged.bind(this)
  }

  changeColor(){
    const color = "rgba("+this.state.r+","+this.state.g+","+this.state.b+",1)"
    // console.log(color)
    this.setState({
      backgroundColor: color
    })
  }


  onRedDragged(action){
    if (action=="dragleft") {
      if (this.state.r > 0) this.setState({r:this.state.r-1})
    }
    if (action=="dragright") {
      if (this.state.r < 255) this.setState({r:this.state.r+1})
    }
    this.changeColor()
  }

  onGreenDragged(action){
    if (action=="dragleft") {
      if (this.state.g > 0) this.setState({g:this.state.g-1})
    }
    if (action=="dragright") {
      if (this.state.g < 255) this.setState({g:this.state.g+1})
    }
    this.changeColor()
  }

  onBlueDragged(action){
    if (action=="dragleft") {
      if (this.state.b > 0) this.setState({b:this.state.b-1})
    }
    if (action=="dragright") {
      if (this.state.b < 255) this.setState({b:this.state.b+1})
    }
    this.changeColor()
  }

  render() {
    const {backgroundColor} = this.state
    return (
      <View style={styles.wrapper}>
        <View style={[styles.container,{backgroundColor}]}>
        </View>
        <View style={styles.picker}>
          <Picker color={styles.red} onDrag={this.onRedDragged} colorValue={this.state.r} />
          <Picker color={styles.green} onDrag={this.onGreenDragged} colorValue={this.state.g} />
          <Picker color={styles.blue} onDrag={this.onBlueDragged} colorValue={this.state.b} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper:{
    flex:1
  },
  container: {
    flex: 1,
    backgroundColor:'#fff'
  },
  red:{
    backgroundColor:"#EA2027"
  },
  green:{
    backgroundColor:"#009432"
  },
  blue:{
    backgroundColor:"#12CBC4"
  },
  picker:{
    flexDirection: 'row',
    height: 50
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});