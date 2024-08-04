// Header.jsx
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Header = ({title}) => {
  return (
    <View style={styles.header}>
    <Image source={require('../../../public/logo.png')} style={styles.logo} />
    <Text style={styles.txtheader}>{title}</Text>
  </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'white',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
   /*  marginTop: 15, */
    marginBottom: 20,
    paddingRight: 30,
    borderBottomColor: '#2d9ca9',
    borderBottomWidth: 2,

  },
  logo: {
    width: 80,
    height: 65,
    marginBottom: 10,
  },
  txtheader: {
    fontSize: 24,
    textAlign: 'center',
    color: '#2d9ca9',
    fontWeight: '700',
  },
});

export default Header;
