import React  from 'react';
import styles from '../stylesheet';
import {
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

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

export default SelectedColors;