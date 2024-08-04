import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useTheme } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoginPets from './src/components/screens/LoginPets';

/* Usuario */
import ListsPetsU from './src/components/screens/ListsPetsU';
import MyListPetU from './src/components/screens/MyListPetU';
import UserProfile from './src/components/screens/UserProfile';
import UpdateProfile from './src/components/screens/UpdateProfile';

/* Administrador */
import ListsPetsA from './src/components/screens/ListsPetsA';
import Inicio from './src/components/screens/inicio';
import { Image } from 'react-native';
import ListNotificaciones from './src/components/screens/ListNotificaciones';
import GlobalProvider from './src/context/GlobalContext';
import Graficas from './src/components/screens/Grafica';


const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const UserTabs = () => {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="ListsPetsU"
      shifting={true}
      activeColor={colors.primary}
      inactiveColor={colors.text}
      barStyle={{ backgroundColor: colors.background }}
    >
      <Tab.Screen
        name="ListsPetsU"
        component={ListsPetsU}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('./public/Home.png')}
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="MyListsPetsU"
        component={MyListPetU}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={25} color={color} />
          ),
          tabBarLabel: 'Mis mascotas',
          tabBarColor: '#694fad',
        }}
      />
      <Tab.Screen
        name="UserProfile"
        component={UserProfile}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user-circle" size={25} color={color} />
          ),
          tabBarLabel: 'Perfil',
          tabBarColor: '#40c340',
        }}
      />
    </Tab.Navigator>
  );
};

const AdminTabs = () => {
  const { colors } = useTheme();

  return (
    <GlobalProvider>
    <Tab.Navigator
      initialRouteName="ListsPetsA"
      shifting={true}
      activeColor={colors.primary}
      inactiveColor={colors.text}
      barStyle={{ backgroundColor: colors.background }}
    >
      <Tab.Screen
        name="ListsPetsA"
        component={ListsPetsA}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user-circle" size={25} color={color} />
          ),
          tabBarLabel: 'Mascotas',
          tabBarColor: '#40c340',
        }}
      />
      <Tab.Screen
        name="Notificaciones"
        component={ListNotificaciones}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user-circle" size={25} color={color} />
          ),
          tabBarLabel: 'Mascotas',
          tabBarColor: '#40c340',
        }}
      />
{/*       <Tab.Screen
        name="Graficas"
        component={Graficas}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user-circle" size={25} color={color} />
          ),
          tabBarLabel: 'Graficas',
          tabBarColor: '#40c340',
        }}
      /> */}
      <Tab.Screen
        name="UserProfile"
        component={UserProfile}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user-circle" size={25} color={color} />
          ),
          tabBarLabel: 'Perfil',
          tabBarColor: '#40c340',
        }}
      />
    </Tab.Navigator>
    </GlobalProvider>
  );
};

const App = () => {
  const [initialRoute, setInitialRoute] = useState('Inicio');

  useEffect(() => {
    const checkUserRole = async () => {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        const { rol } = JSON.parse(user);
        if (rol === 'administrador') {
          setInitialRoute('AdminMain');
        } else {
          setInitialRoute('UserMain');
        }
      }
    };

    checkUserRole();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen
          name="Inicio"
          component={LoginPets}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="landpage"
          component={Inicio}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UserMain"
          component={UserTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AdminMain"
          component={AdminTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UpdatePerfil"
          component={UpdateProfile}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
