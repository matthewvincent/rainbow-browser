import React                from 'react';
import styles               from '../stylesheet';
import { Components }       from 'exponent';
import { TouchableOpacity } from 'react-native';
import { Ionicons }         from '@exponent/vector-icons';
import SelectedColors       from './SelectedColors';

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

export default Footer;