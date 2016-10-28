import React               from 'react';
import styles              from '../stylesheet';
import { View, StatusBar } from 'react-native';
import ColorBrowser        from './ColorBrowser';
import Header              from './Header';
import Footer              from './Footer'
import Logo                from '../rainbowBrowser.png'

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

export default Home;