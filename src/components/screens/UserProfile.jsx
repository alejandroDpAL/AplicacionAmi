import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axiosClient from '../client/axiosClient';
import { useFocusEffect } from '@react-navigation/native';
import Header from '../organisms/Header';

const UserProfile = ({ navigation }) => {
    const [profileData, setProfileData] = useState(null);

    const fetchProfileData = async () => {
        try {
            const response = await axiosClient.get('/usuario/perfil');
            if (response.data.status === 200) {
                setProfileData(response.data.data);
            } else {
                console.error(response.data.message);
            }
        } catch (error) {
            console.error("Error fetching profile data:", error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchProfileData();
        }, [])
    );

    if (!profileData) {
        return <Text>Cargando...</Text>; // Muestra un mensaje mientras se cargan los datos
    }

    return (
        <View style={styles.container}>
             <Header title="Perfil de usuario" />
            <TouchableOpacity style={styles.iconProfile}>
            <Image source={require('../../../public/logo.png')} style={styles.logo} resizeMode='cover' />
                <Text style={styles.nameProfile}>{profileData.nombres}</Text>
            </TouchableOpacity>
            <View style={styles.containerDataProfile}>
                <TouchableOpacity style={styles.dataProfile}>
                <Image source={require('../../../public/user.png')} style={styles.icon} resizeMode='cover' />
                    <Text style={styles.datatxt}>Rol: {profileData.rol}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.dataProfile}>
                <Image source={require('../../../public/user.png')} style={styles.icon} resizeMode='cover' />
                    <Text style={styles.datatxt}>{profileData.nombres}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.dataProfile}>
                <Image source={require('../../../public/correo.png')} style={styles.icon} resizeMode='cover' />
                    <Text style={[styles.datatxt, styles.datatxtemail]}>{profileData.correo}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.dataProfile}>
                <Image source={require('../../../public/telefono.png')} style={styles.icon} resizeMode='cover' />
                    <Text style={[styles.datatxt, styles.datatxtemail]}>{profileData.numero_cel}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.OptionsProfile}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('UpdatePerfil')}
                >
                    <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Inicio')}
                >
                    <Text style={styles.buttonText}>Cerrar Sesión</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    logo: {
        width: 90,
        height: 100,
    },
    /* Estilos de Profile */
    iconProfile: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
        marginTop: 50,
    },
    nameProfile: {
        fontWeight: '600',
        fontSize: 24,
        color: '#000',
        marginVertical: 20,
    },
    /* datos del Profile */
    containerDataProfile: {
        marginBottom: 30,
    },
    dataProfile: {
        flexDirection: 'row',
        marginLeft: 20,
        marginVertical: 10,
    },
    datatxt: {
        fontWeight: '500',
        color: '#000',
        fontSize: 18,
    },
    datatxtemail: {
        borderBottomWidth: 1,
        borderBottomColor: '#000',

    },
    /* Opciones de Profile */
    OptionsProfile: {
        marginVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        width: 150,
        height: 50,
        backgroundColor: 'orange',
        flexDirection: 'row',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 15,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    icon: {
        marginRight: 8,
        width: 20,
        height: 20,
    },
});

export default UserProfile;

