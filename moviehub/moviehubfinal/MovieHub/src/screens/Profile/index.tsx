import React, { useState, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { RootStackParamList } from '../../navigation/AppNavigator';
import styles from './styles';
import { logout } from '../../services/authService';

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export default function Profile() {
  const navigation = useNavigation<NavigationProps>();
  const [favoritesCount, setFavoritesCount] = useState<number>(0);

  useFocusEffect(
    useCallback(() => {
      loadFavoritesCount();
    }, [])
  );

  const loadFavoritesCount = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('@favorites');
      if (storedFavorites) {
        const favoriteIds: string[] = JSON.parse(storedFavorites);
        const uniqueIds = Array.from(new Set(favoriteIds));
        setFavoritesCount(uniqueIds.length);
      } else {
        setFavoritesCount(0);
      }
    } catch (error) {
      console.log('Erro ao carregar contagem de favoritos', error);
      setFavoritesCount(0);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" backgroundColor="#0B0B0F" />
      
      {/* Header com Gradiente no topo atrás do perfil */}
      <LinearGradient colors={['#1A1A24', '#0B0B0F']} style={styles.headerGradient}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton} activeOpacity={0.7}>
            <Text style={styles.backText}>← Voltar</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Meu Perfil</Text>
          <View style={{ width: 60 }} />
        </View>

        <View style={styles.profileHeader}>
          <Image
            source={{ uri: 'https://github.com/Arthur-Thz.png' }}
            style={styles.avatar}
          />
          <Text style={styles.userName}>Arthur</Text>
          <Text style={styles.userEmail}>arthur@email.com</Text>
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Estatísticas do Usuário */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{favoritesCount}</Text>
            <Text style={styles.statLabel}>Favoritos</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>28</Text>
            <Text style={styles.statLabel}>Assistidos</Text>
          </View>
        </View>

        {/* Lista de Opções */}
        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Favorites')} activeOpacity={0.7}>
            <Text style={styles.menuItemText}>⭐ Meus Favoritos</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('gallery')} activeOpacity={0.7}>
            <Text style={styles.menuItemText}>🖼️ Galeria de Fotos</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuItem, { borderBottomWidth: 0 }]} onPress={() => navigation.navigate('config')} activeOpacity={0.7}>
            <Text style={styles.menuItemText}>⚙️ Sobre o Aplicativo</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Botão de Sair Moderno */}
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={async () => {
            await logout();
            navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
          }}
          activeOpacity={0.8}
        >
          <View style={styles.logoutContent}>
            <Text style={styles.logoutText}>Sair da Conta</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}