import React          from 'react';
import styles         from '../stylesheet';
import Logo           from '../rainbowBrowser.png';
import { Components } from 'exponent';
import {
  View,
  Image
} from 'react-native';

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

export default Header;