import Exponent     from 'exponent';
import React        from 'react';
import _            from 'lodash';
import styles       from './stylesheet';
import Home         from './components/Home';
import PaletteModal from './components/PaletteModal';

import {
  Text,
  View,
  ListView
} from 'react-native';



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

Exponent.registerRootComponent(App);