import Exponent, { Components } from 'exponent';
import React from 'react';
import _ from 'lodash';
import RNViewShot from "react-native-view-shot";
import { takeSnapshot } from "react-native-view-shot";
import { Ionicons } from '@exponent/vector-icons';
import Logo from './rainbowBrowser.png';
import styles from './stylesheet';

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
  LayoutAnimation,
  Modal,
  Image,
  CameraRoll,
  ActionSheetIOS
} from 'react-native';

const width  = Dimensions.get('window').width;
const height = Dimensions.get('window').height;  

class App extends React.Component {
  constructor() {
    super()

    // data source for colors browser
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.state = {
      colors: [],
      oldColors: ['#ffffff'],
      selectedColors: [],
      ds: ds,
      modalVisible: false,

    }
  }

  // initial batch of colors
 componentDidMount() {
    this.makeColors();
  }

  // randomly produce hex colors and add to browser view
  makeColors() {
    const newColors = [];
    let oldColors = this.state.oldColors.slice();

    function randomColor () {
      return '#'+(Math.random()*0xFFFFFF<<0).toString(16)
    }

    while(newColors.length < 100) {
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

  // add color to palette
  addColor(c) {
    const sc = this.state.selectedColors;

    if (sc.length < 6) {
      this.setState({
        selectedColors: _.uniq(sc.concat(c))
      });
    }
  }

  // remove color from palette
  removeColor(c) {
    const sc = this.state.selectedColors;

    this.setState({
      selectedColors: sc.filter(color => color !== c)
    });
  }

  // toggle palette view modal
  setModalVisible(visible) {
    this.setState({
      modalVisible: visible
    });
  }

  render() {
    if (this.state.oldColors.length > 1) {
      return (
        <View style={styles.container}>
         
          <Home 
            colors={this.state.colors}
            makeColors={this.makeColors.bind(this)}
            addColor={this.addColor.bind(this)}
            selectedColors={this.state.selectedColors}
            removeColor={this.removeColor.bind(this)}
            setModalVisible={this.setModalVisible.bind(this)}
          />
          
          <PaletteModal
            setModalVisible={this.setModalVisible.bind(this)}
            modalVisible={this.state.modalVisible}
            selectedColors={this.state.selectedColors}
          />

        </View>
      );
    } else { return <Text>Loading...</Text> }
  }
}

const Home = ({
  colors,
  makeColors,
  addColor,
  selectedColors,
  removeColor,
  setModalVisible
}) => (
  <View style={styles.container}>
    <StatusBar barStyle="default" />

    <ColorBrowser 
      colors={colors} 
      makeColors={makeColors} 
      addColor={addColor}
    /> 

    <Header logo={Logo} /> 
    
    <Footer 
      selectedColors={selectedColors} 
      removeColor={removeColor}
      setModalVisible={setModalVisible}
    /> 
  </View>
);

class PaletteModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      previewSource: "",
      error: null,
      res: null,
      value: {
        format: "png",
        quality: 1,
        result: "file",
      },
    }
  }

  // display action sheet in modal view
  // prompt to save palette to camera roll
  showActionSheet = (cb) => {
    const BUTTONS = [
      'Save To Camera Roll',
      'Cancel',
    ];

    ActionSheetIOS.showActionSheetWithOptions({
      options: BUTTONS,
      cancelButtonIndex: 1,
      tintColor: 'rgba(0,0,0,.8)',
    },
    (buttonIndex) => {
      if (buttonIndex === 0) { cb(); }
    });
  }

  // take screenshot of color palette in modal view
  // and save it to user camera roll
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

  render () {
    return (
      <Modal
        animationType={"slide"}
        transparent={true}
        visible={this.props.modalVisible}
        onRequestClose={() => this.props.setModalVisible(false)}
      >
        <Components.BlurView 
          tintEffect="light" 
          style={styles.modal}
        > 
          <ModalHeader 
            showActionSheet={this.showActionSheet.bind(this)}
            snapshot={this.snapshot.bind(this)}
            setModalVisible={this.props.setModalVisible}
          > </ModalHeader>
          <Palette 
            ref={'colorPalette'}
            selectedColors={this.props.selectedColors} 
          />
        </Components.BlurView>
      </Modal>
    );
  }
}


class Palette extends React.Component {
  constructor(props) {
    super(props)
  }

  render () {
    return (
      <View 
        style={{flex: 1, height: height - 100}}
      >
        {this.props.selectedColors.map((c,i) => (
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
    );
  }
}

const ModalHeader = ({
  showActionSheet, 
  snapshot, 
  setModalVisible
}) => (
  <View style={{flex: 1, marginBottom: 100}}>

    <ScreenshotButton 
      showActionSheet={showActionSheet}
      snapshot={snapshot}
    > </ScreenshotButton>

    <CloseModalButton 
      setModalVisible={setModalVisible}
    > </CloseModalButton>

  </View>
);

const ScreenshotButton = ({showActionSheet, snapshot}) => (
  <TouchableOpacity 
    style={styles.screenshotButton}
    onPress={() => showActionSheet(
      snapshot("colorPalette")
    )}
  >
    <Ionicons 
      name="ios-download-outline" 
      size={50} 
      color="black" 
    />
  </TouchableOpacity>
);

const CloseModalButton = ({setModalVisible}) => (
  <TouchableOpacity 
    style={styles.closeModalButton}
    onPress={() => setModalVisible(false)}
  >
    <Ionicons 
      name="ios-close-circle-outline" 
      size={50} 
      color="black" 
    />
  </TouchableOpacity>
);

// individual color component in browser 
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

// infinite list of colors to add to palette
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

// logo etc
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

// contains selected colors and link to palette 
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

// currently selected color palette
// displayed in footer of home page
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
        ></View>
      </TouchableOpacity>
    ))}
  </ScrollView>
);

Exponent.registerRootComponent(App);
