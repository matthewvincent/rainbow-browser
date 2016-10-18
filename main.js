import Exponent, { Components } from 'exponent';
import React from 'react';
import _ from 'underscore';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  ScrollView,
  Dimensions,
  StatusBar,
  TouchableHighlight,
  TouchableOpacity,
  Modal,
  Image,
  CameraRoll,
  ActionSheetIOS
} from 'react-native';


import RNViewShot from "react-native-view-shot";
import { takeSnapshot } from "react-native-view-shot";

import { Ionicons } from '@exponent/vector-icons';
import Logo from './rainbowBrowser.png';
import styles from './stylesheet';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;  


class App extends React.Component {
  constructor() {
    super()

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.state = {
      colors: [],
      oldColors: ['#ffffff'],
      selectedColors: [],
      ds: ds,
      modalVisible: false,
      previewSource: "",
      error: null,
      res: null,
      value: {
        format: "png",
        quality: 0.9,
        result: "file",
      },
    }
  }

  componentDidMount() {
    this.makeColors();
    console.log(  )
  }

  makeColors() {
    const newColors = [];
    let oldColors = this.state.oldColors.slice();

    function randomColor () {
      return '#'+(Math.random()*0xFFFFFF<<0).toString(16)
    }

    while(newColors.length < 15) {
      var newColor = randomColor();

      if (newColor.length === 7) {
        newColors.push(newColor)
      }
    }

    oldColors = oldColors.concat(newColors);

    this.setState({
      oldColors: oldColors,
      colors: this.state.ds.cloneWithRows(oldColors)
    });
  }

  addColor(c) {
    const sc = this.state.selectedColors;

    if (sc.length < 6) {
      this.setState({
        selectedColors: _.uniq(sc.concat(c))
      });
    }
  }

  removeColor(c) {
    const sc = this.state.selectedColors;

    this.setState({
      selectedColors: sc.filter(color => color !== c)
    });
  }

  setModalVisible() {
    var v = this.state.modalVisible;

    this.setState({
      modalVisible: !v
    });
  }

  showActionSheet = (cb) => {
    const BUTTONS = [
      'Save Palette',
      'Cancel',
    ];

    const CANCEL_INDEX = 1;

    ActionSheetIOS.showActionSheetWithOptions({
      options: BUTTONS,
      cancelButtonIndex: 1,
      tintColor: 'rgba(0,0,0,.8)',
    },
    (buttonIndex) => {
      if (buttonIndex === 0) {
        cb();
      }
    });
  }

  snapshot = refname => () =>
    takeSnapshot(this.refs[refname], this.state.value)
    .then(res =>
      this.state.value.result !== "file"
      ? res
      : new Promise((success, failure) =>
      // just a test to ensure res can be used in Image.getSize
      Image.getSize(
        res,
        (width, height) => (console.log(res, width, height), success(res)),
        failure)))
    .then(res => CameraRoll.saveToCameraRoll(res))
    .catch(error => this.setState({ error, res: null, previewSource: null }))


  render() {
    const modalVisible = this.state.modalVisible;

    if (this.state.oldColors.length > 1) {
      return (
        <View style={styles.container}>

          <StatusBar barStyle="default" />
          <Header logo={Logo}/>
          <ColorBrowser 
            colors={this.state.colors} 
            makeColors={this.makeColors.bind(this)} 
            addColor={this.addColor.bind(this)}
          />
      
          <Components.BlurView 
            tintEffect="light" 
            zIndex={100} 
            style={!modalVisible 
              ? {height: 0, width: 0} 
              : styles.modal}
          > 
              
            <View style={{flex: 1, marginBottom: 100}}>
              <TouchableOpacity 
                style={styles.screenshotButton}
                onPress={()=>this.showActionSheet(this.snapshot("colorPalette"))}
              >
                <Ionicons 
                  name="ios-download-outline" 
                  size={50} 
                  color="black" 
                />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.closeModalButton}
                onPress={this.setModalVisible.bind(this)}>
                <Ionicons 
                  name="ios-close-circle-outline" 
                  size={50} 
                  color="black" 
                />
              </TouchableOpacity>
            </View>
            <View 
              style={{flex: 1, height: height - 100}}
              ref={'colorPalette'} 
            >
              {this.state.selectedColors.map((c,i) => (
                <View 
                  key={i} 
                  style={[
                    styles.jumboColor, 
                    { backgroundColor: c }]}
                >
                  <Text style={styles.jumboColorHex}>{c}</Text>
                </View>
              ))}
            </View>
          </Components.BlurView>

          <Footer 
            selectedColors={this.state.selectedColors} 
            removeColor={this.removeColor.bind(this)}
            setModalVisible={this.setModalVisible.bind(this)}
          />
        </View>
      );
    } else { return <Text>Loading...</Text> }
  }
}

const ColorSwatch = ({c, addColor}) => (
  <View style={[
    styles.colorSwatch, {backgroundColor: c}
  ]}>
    <View 
      shadowOpacity={.2}
      shadowColor='black'
      shadowRadius={2}
      shadowOffset={{height: 2, width: 0}}
      style={c === '#ffffff' 
        ? {opacity: 0} 
        : styles.hexBubble}
    >
      <Text style={styles.hexText}>{c}</Text>
    </View>
    <TouchableOpacity onPress={()=>addColor(c)}>
      <Ionicons 
        name="ios-add-circle-outline" 
        size={40} 
        style={styles.addColorButton}
      />
    </TouchableOpacity>
  </View>
);

const ColorBrowser = ({
  colors, 
  makeColors, 
  addColor
}) => (
  <ListView 
    style={{flex: 1}}
    dataSource={colors}
    onEndReachedThreashold={4000}
    onEndReached={makeColors}
    renderRow={(color) => ( 
      <ColorSwatch 
        c={color} 
        addColor={addColor}
      /> 
    )}
  ></ListView>
);

const Header = ({logo}) => (
  <Components.BlurView 
    tintEffect="light" 
    style={styles.header}
  >
    <View style={styles.logoWrapper}>
      <Image 
        source={logo} 
        style={styles.logo}
      />
    </View>
  </Components.BlurView>
);

const Footer = ({
  selectedColors, 
  removeColor, 
  setModalVisible
}) => (
  <Components.BlurView 
    tintEffect="light" 
    style={styles.footer}
  >
    <TouchableOpacity onPress={()=>setModalVisible()}>
      <Ionicons 
        name="ios-color-palette" 
        size={50} 
        color="rgba(0,0,0,.8)" 
        style={styles.openPaletteButton}
      />
    </TouchableOpacity>
    <SelectedColors 
      selectedColors={selectedColors} 
      removeColor={removeColor}
    />
  </Components.BlurView>
);

const SelectedColors = ({selectedColors, removeColor}) => (
  <ScrollView 
    horizontal={true} 
    style={styles.selectedColors} 
    contentContainerStyle={{alignItems: 'center'}}
  >
    {selectedColors.map((c, i) => (
      <TouchableOpacity 
        key={i} 
        style={styles.selectedColor}
        onPress={() => removeColor(c)}
      >
        <View 
          style={[styles.selectedColor, {backgroundColor: c}]}
          shadowOpacity={.2}
          shadowColor='black'
          shadowRadius={2}
          shadowOffset={{height: 2, width: 0}}
        >
        </View>
      </TouchableOpacity>
    ))}
  </ScrollView>
);

Exponent.registerRootComponent(App);
