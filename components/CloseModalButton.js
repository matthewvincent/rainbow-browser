import React                from 'react';
import styles               from '../stylesheet';
import { TouchableOpacity } from 'react-native';
import { Ionicons }         from '@exponent/vector-icons';

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

export default CloseModalButton;