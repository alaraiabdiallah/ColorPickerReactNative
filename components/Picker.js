import React, { Component } from "react"
import PropTypes from 'prop-types'
import {
  StatusBar,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  PanResponder,
  TouchableOpacity,
  Dimensions,
} from "react-native"

const { width, height } = Dimensions.get("window");

const getDirectionAndColor = ({ moveX, moveY, dx, dy }) => {
  const draggedDown = dy > 30;
  const draggedUp = dy < -30;
  const draggedLeft = dx < -30;
  const draggedRight = dx > 30;
  const isRed = moveY < 90 && moveY > 40 && moveX > 0 && moveX < width;
  const isBlue = moveY > height - 50 && moveX > 0 && moveX < width;
  let dragDirection = "";

  if (draggedDown || draggedUp) {
    if (draggedDown) dragDirection = "dragdown";
    if (draggedUp) dragDirection = "dragup";
  }

  if (draggedLeft || draggedRight) {
    if (draggedLeft) dragDirection = "dragleft";
    if (draggedRight) dragDirection = "dragright";
  }

  if (dragDirection) return dragDirection;
};

export default class Picker extends Component {
  state = {
    action: null
  };
  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => !!getDirectionAndColor(gestureState),
      onPanResponderMove: (evt, gestureState) => {
        const action = getDirectionAndColor(gestureState)
        this.props.onDrag(action)
        this.setState({action:action})
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
    });
  }

  render() {
    const {backgroundColor} = this.state
    return (
          <View style={[styles.picker,this.props.color]} {...this._panResponder.panHandlers}>
            <Text style={styles.center}>{this.props.colorValue}</Text>
          </View>
    );
  }
}

Picker.propTypes = {
  onDrag: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
  center: {
    textAlign:"center"
  },
  picker:{
    flex:1,
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'center'
  }
});