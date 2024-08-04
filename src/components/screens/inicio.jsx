import React from "react";
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Inicio = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require('../../../public/inicio.png')}
      style={styles.backgroundImage}
    >
      <View style={styles.header}>
        <View style={styles.headerButtons}>
          <TouchableOpacity onPress={() => navigation.navigate('ListaMascotas')}>
            <Text style={styles.buttonText}>Invitado</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('InicioSesion')}>
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.mainContent}>
          <Text style={styles.title}>Bienvenidos a Ami Pets</Text>
          <Text style={styles.subtitle}>
            Te encontrarás con el amor de tu vida, de esas que no engañan dale
            la oportunidad a las relaciones peludas.
          </Text>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerTitle}>Síguenos en nuestras redes sociales</Text>
          <View style={styles.footerLinks}>
            <Text style={styles.footerLink}>@Ami_pets.com</Text>
            <Text style={styles.footerLink}>@Ami_pets</Text>
            <Text style={styles.footerLink}>@ami_pets</Text>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 80,
    backgroundColor: '#eadfda',
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 10,
  },
  headerButtons: {
    flexDirection: 'row',
  },
  buttonText: {
    fontSize: 24,
    marginHorizontal: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#F7B318',
    color: '#fff',
    height: 50,
    borderRadius: 10,
    textAlign: 'center',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContent: {
    marginTop: 60,
    marginBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 38,
    fontStyle: 'italic',
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginTop: 300,
  },
  subtitle: {
    fontSize: 20,
    marginTop: 10,
    color: '#fff',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  footer: {
    marginTop: 300,
    justifyContent: 'flex-end',
    marginBottom: 0,
    backgroundColor: 'gray',
    width: '100%',
    padding: 20,
    alignItems: 'center',
  },
  footerTitle: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 10,
  },
  footerLinks: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
  footerLink: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Inicio;
