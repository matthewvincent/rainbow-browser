import {StyleSheet, Dimensions} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    height: 100, 
    width: width, 
    position: 'absolute', 
    top: 0,
    alignItems: 'center', 
    justifyContent:'center'
  },
  footer: {
    height: 60,
    width: width,
    position: 'absolute',
    bottom: 0
  },
  colorSwatch: {
    marginBottom: 4,
    flex: 1,
    height: 100,
    width: width
  },
  hexBubble: {
    position: 'absolute', 
    top: 10, 
    left: 10, 
    width: 80, 
    height: 80, 
    borderRadius: 40, 
    backgroundColor: 'white'
  },
  hexText: {
    flex: 1, 
    color: 'rgba(0,0,0,.8)', 
    backgroundColor: 'transparent',
    lineHeight: 80,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  addColorButton: {
    position: 'absolute',
    right: 10, 
    color: 'white', 
    marginTop: 30
  },
  openPaletteButton: {
    position: 'absolute', 
    right: 12, 
    marginTop: 5,
  },
  screenshotButton: {
    height: 40, 
    width: 50,
    position: 'absolute', 
    left: 20, 
    top: 35,
  },
  closeModalButton: {
    height: 40, 
    width: 50, 
    position: 'absolute', 
    right: 10, 
    top: 35, 
  },
  selectedColors: {
    maxWidth: width - 40,
  },
  selectedColor: {
    flex: 1, 
    height: 40, 
    width: 40, 
    borderRadius: 20,
    marginLeft: 5,
    marginRight: 5
  },
  modal: {
    position: 'absolute', 
    top: 0,
    width:width, 
    height: height,
    backgroundColor: 'rgba(0,0,0,.5)'
  },
  jumboColor: {
    flex: 1, 
    width: width, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  jumboColorHex: {
    fontSize: 30, 
    color: 'white', 
    fontWeight:'bold'
  },
  logo: {
    opacity: .8, 
    transform: [{scale: .25}]
  },
  logoWrapper: {
    marginTop: 20, 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  }
});

export default styles;

