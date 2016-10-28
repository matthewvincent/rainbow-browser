import React        from 'react';
import styles       from '../stylesheet';
import { Ionicons } from '@exponent/vector-icons';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';

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
    <TouchableOpacity onPress={() => addColor(c)}>
      <Ionicons 
        name="ios-add-circle-outline" 
        size={40} 
        style={styles.addColorButton}
      />
    </TouchableOpacity>
  </View>
);

export default ColorSwatch;