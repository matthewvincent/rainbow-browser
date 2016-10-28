import React  from 'react';
import styles from '../stylesheet';

import {
  View,
  Text,
  Dimensions
} from 'react-native';

const height = Dimensions.get('window').height;  

class Palette extends React.Component {

  constructor(props) { super(props) }

  render () {
    return (
      <View style={{flex: 1, height: height - 100}}>
        {this.props.selectedColors.map((c,i) => (
          <View 
            key={i} 
            style={[
              styles.jumboColor, 
              { backgroundColor: c }]}
          > 
            <Text style={styles.jumboColorHex}> 
              {c}
            </Text>
          </View>
        ))}
      </View>
    );
  }
}

export default Palette;