import Exponent, { Components } from 'exponent';
import React                    from 'react';
import RNViewShot               from "react-native-view-shot";
import { takeSnapshot }         from "react-native-view-shot";
import styles                   from '../stylesheet';
import ModalHeader              from './ModalHeader';
import Palette                  from './Palette';

import {
  Modal,
  CameraRoll,
  ActionSheetIOS
} from 'react-native';

class PaletteModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      error: null,
      res: null,
      value: {
        format: "png",
        quality: 1,
        result: "file",
      },
    }
  }

  // display action sheet and prompt to save palette to camera roll
  showActionSheet (cb) {
    const BUTTONS = ['Save To Camera Roll', 'Cancel'];

    ActionSheetIOS.showActionSheetWithOptions({
      options: BUTTONS,
      cancelButtonIndex: 1,
      tintColor: 'rgba(0,0,0,.8)',
    },
    i => i === 0 ? cb() : null);
  }

  // take screenshot of color palette and save it 
  snapshot = refname => () =>
    takeSnapshot(this.refs[refname], this.state.value)
    .then(res    => CameraRoll.saveToCameraRoll(res))
    .catch(error => this.setState({ error, res: null}))


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

export default PaletteModal;