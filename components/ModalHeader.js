import React            from 'react';
import styles           from '../stylesheet';
import { View }         from 'react-native';
import ScreenshotButton from './ScreenshotButton';
import CloseModalButton from './CloseModalButton';


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

export default ModalHeader;