import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importação das telas conforme a estrutura do seu projeto
import Login from '../screens/Login';
import Register from '../screens/Register';
import Home from '../screens/Home';
import Movies from '../screens/Movies';
import Favorites from '../screens/Favorites';
import Gallery from '../screens/gallery';
import MovieDetails from '../screens/MovieDetails';
import Search from '../screens/Search';
import Profile from '../screens/Profile';
import MovieCreate from '../screens/MovieCreate';
import MovieEdit from '../screens/MovieEdit';
import MovieDelete from '../screens/MovieDelete';
import Config from '../screens/config';

// Definição dos tipos de rotas
export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Movies: undefined;
  Favorites: undefined;
  gallery: undefined;
  Search: undefined;
  Profile: undefined;
  MovieDetails: { id: string };
  MovieCreate: undefined;
  MovieEdit: { movie: any };
  MovieDelete: { id: string };
  config: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Movies" component={Movies} />
      <Stack.Screen name="Favorites" component={Favorites} />
      <Stack.Screen name="gallery" component={Gallery} />
      <Stack.Screen name="MovieDetails" component={MovieDetails} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="MovieCreate" component={MovieCreate} />
      <Stack.Screen name="MovieEdit" component={MovieEdit} />
      <Stack.Screen name="MovieDelete" component={MovieDelete} />
      <Stack.Screen name="config" component={Config}/>
    </Stack.Navigator>
  );
}