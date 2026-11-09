import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, FlatList, StatusBar, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { POPULAR_MOVIES, ALL_MOVIES, CINEMA_MOVIES, MovieItem } from '../../data/movies';

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export default function Home() {
  const navigation = useNavigation<NavigationProps>();
  const [favorites, setFavorites] = useState<string[]>([]);

  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem('@favorites').then(data => {
        if (data) setFavorites(JSON.parse(data));
        else setFavorites([]);
      });
    }, [])
  );

  const toggleFavorite = async (id: string) => {
    let updatedFavorites;
    if (favorites.includes(id)) {
      updatedFavorites = favorites.filter(item => item !== id);
    } else {
      updatedFavorites = [...favorites, id];
    }
    setFavorites(updatedFavorites);
    await AsyncStorage.setItem('@favorites', JSON.stringify(updatedFavorites));
  };

  const renderMovieCard = (item: MovieItem) => {
    const isFav = favorites.includes(item.id);
    return (
      <View key={item.id} style={styles.movieCard}>
        <TouchableOpacity 
          activeOpacity={0.85}
          onPress={() => navigation.navigate('MovieDetails', { id: item.id })}
          style={styles.coverContainer}
        >
          <Image source={item.cover} style={styles.movieCover} />
          
          <TouchableOpacity 
            style={styles.favButton}
            onPress={() => toggleFavorite(item.id)}
            activeOpacity={0.7}
          >
            <Text style={{ fontSize: 13 }}>{isFav ? '❤️' : '🤍'}</Text>
          </TouchableOpacity>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => navigation.navigate('MovieDetails', { id: item.id })}
          activeOpacity={0.8}
        >
          <Text style={styles.movieTitle} numberOfLines={1}>{item.title}</Text>
          <View style={styles.metaRow}>
            <Text style={styles.movieRating}>⭐ {item.rating}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0B0B0F" />
      
      {/* Header Profissional */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image 
            source={require('../../../assets/logo.png')} 
            style={styles.logoImage} 
            resizeMode="contain"
          />
          <Text style={styles.logo}>
            Film<Text style={styles.logoHighlight}>Center</Text>
          </Text>
        </View>

        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Search')}>
            <Text style={styles.headerButtonText}>🔍</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.profileTouch}>
            <Image 
              source={{ uri: 'https://github.com/Arthur-Thz.png' }}
              style={styles.profileImage} 
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Atalhos Rápidos sem emojis */}
        <View style={styles.navGrid}>
          <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Movies')} activeOpacity={0.8}>
            <Text style={styles.navText}>Filmes</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Favorites')} activeOpacity={0.8}>
            <Text style={styles.navText}>Favoritos</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('gallery')} activeOpacity={0.8}>
            <Text style={styles.navText}>Galeria</Text>
          </TouchableOpacity>
        </View>

        {/* Banner de Criação */}
        <TouchableOpacity
          style={styles.createBanner}
          onPress={() => navigation.navigate('MovieCreate')}
          activeOpacity={0.85}
        >
          <View>
            <Text style={styles.createBannerTitle}>Quer cadatrar algum Filme?</Text>
            <Text style={styles.createBannerSubtitle}>Adicione um novo filme ao catálogo</Text>
          </View>
          <View style={styles.createBannerBtn}>
            <Text style={styles.createBannerBtnText}>＋ Novo</Text>
          </View>
        </TouchableOpacity>

        {/* Lançamentos Populares */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>🔥 Lançamentos Populares</Text>
          <FlatList
            horizontal
            data={POPULAR_MOVIES}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => renderMovieCard(item)}
            contentContainerStyle={styles.listPadding}
          />
        </View>

        {/* Filmes em Destaque */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>🎬 Filmes em Destaque</Text>
          <FlatList
            horizontal
            data={ALL_MOVIES}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => renderMovieCard(item)}
            contentContainerStyle={styles.listPadding}
          />
        </View>

        {/* Cinema */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>🍿 Em Exibição no Cinema</Text>
          <FlatList
            horizontal
            data={CINEMA_MOVIES}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => renderMovieCard(item)}
            contentContainerStyle={styles.listPadding}
          />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0B0F' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#1A1A24',
    backgroundColor: '#0B0B0F',
  },
  logoContainer: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  logoImage: { width: 28, height: 28 },
  logo: { fontSize: 20, fontWeight: 'bold', color: '#FFFFFF', letterSpacing: 0.5 },
  logoHighlight: { color: '#E50914' },
  headerActions: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  iconButton: {
    width: 36, height: 36, borderRadius: 18, backgroundColor: '#16161E',
    justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#222230',
  },
  headerButtonText: { fontSize: 16 },
  profileTouch: { borderRadius: 18, borderWidth: 1.5, borderColor: '#E50914', overflow: 'hidden' },
  profileImage: { width: 34, height: 34 },
  scrollContent: { paddingBottom: 30, paddingTop: 16 },
  navGrid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16, paddingHorizontal: 16, gap: 10 },
  navButton: { 
    backgroundColor: '#14141A', paddingVertical: 14, borderRadius: 12, flex: 1, alignItems: 'center',
    borderWidth: 1, borderColor: '#222230', shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2, shadowRadius: 3, elevation: 3,
  },
  navText: { color: '#FFF', fontWeight: '600', fontSize: 13 },
  createBanner: {
    backgroundColor: '#14141A', marginHorizontal: 16, marginBottom: 24, padding: 16, borderRadius: 14,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1.5, borderColor: '#262638',
  },
  createBannerTitle: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 15 },
  createBannerSubtitle: { color: '#8E8E93', fontSize: 11, marginTop: 2 },
  createBannerBtn: { backgroundColor: '#E50914', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 },
  createBannerBtnText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 12 },
  sectionContainer: { marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#FFF', marginBottom: 12, paddingHorizontal: 16, letterSpacing: 0.3 },
  listPadding: { paddingHorizontal: 16 },
  movieCard: { width: 130, marginRight: 14 },
  coverContainer: {
    position: 'relative', borderRadius: 10, backgroundColor: '#14141A', borderWidth: 1, borderColor: '#222230',
    overflow: 'hidden', marginBottom: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 4, elevation: 5,
  },
  movieCover: { width: '100%', height: 185, resizeMode: 'cover' },
  favButton: { 
    position: 'absolute', top: 6, right: 6, backgroundColor: 'rgba(11, 11, 15, 0.8)', 
    borderRadius: 14, width: 28, height: 28, justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)',
  },
  movieTitle: { color: '#FFFFFF', fontWeight: '600', fontSize: 13 },
  metaRow: { flexDirection: 'row', alignItems: 'center', marginTop: 3 },
  movieRating: { color: '#FFD700', fontSize: 11, fontWeight: 'bold' },
});