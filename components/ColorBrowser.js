import { ListView } from 'react-native';
import ColorSwatch  from './ColorSwatch';
import React        from 'react';

const ColorBrowser = ({
  colors, 
  makeColors, 
  addColor
}) => (
  <ListView 
    style={{flex: 1}}
    dataSource={colors}
    onEndReachedThreashold={4000}
    onEndReached={makeColors}
    renderRow={(color) => ( 
      <ColorSwatch 
        c={color} 
        addColor={addColor}
      /> 
    )}
  ></ListView>
);

export default ColorBrowser;