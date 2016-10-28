import React                from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons }         from '@exponent/vector-icons';
import styles               from '../stylesheet';

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

export default ScreenshotButton;