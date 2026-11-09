import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StatusBar, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { POPULAR_MOVIES, ALL_MOVIES, CINEMA_MOVIES, MovieItem } from '../../data/movies';

export default function Favorites() {
  const navigation = useNavigation<any>();
  const [favoriteMovies, setFavoriteMovies] = useState<MovieItem[]>([]);

  const allMoviesList = [...POPULAR_MOVIES, ...ALL_MOVIES, ...CINEMA_MOVIES];

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  );

  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('@favorites');
      if (storedFavorites) {
        const favoriteIds: string[] = JSON.parse(storedFavorites);
        const uniqueIds = Array.from(new Set(favoriteIds));

        const filtered = allMoviesList
          .filter(movie => uniqueIds.includes(movie.id))
          .filter((movie, index, self) => index === self.findIndex(m => m.id === movie.id));

        setFavoriteMovies(filtered);
      } else {
        setFavoriteMovies([]);
      }
    } catch (error) {
      console.log('Erro ao carregar favoritos', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0B0B0F" />
      
      {/* Header com botão de voltar e título */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Meus Favoritos</Text>
        <View style={{ width: 38 }} /> {/* Espaçador para manter o título centralizado */}
      </View>
      
      {favoriteMovies.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>Sua lista está vazia</Text>
          <Text style={styles.emptyText}>Explore o catálogo e adicione seus filmes favoritos aqui.</Text>
        </View>
      ) : (
        <FlatList
          data={favoriteMovies}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.card}
              activeOpacity={0.85}
              onPress={() => navigation.navigate('MovieDetails', { id: item.id })}
            >
              <Image source={item.cover} style={styles.cover} />
              <View style={styles.info}>
                <Text style={styles.movieTitle} numberOfLines={1}>{item.title}</Text>
                <Text style={styles.category} numberOfLines={1}>{item.category}</Text>
                <View style={styles.ratingRow}>
                  <Text style={styles.rating}>⭐ {item.rating}</Text>
                </View>
              </View>
              <View style={styles.arrowContainer}>
                <Text style={styles.arrowText}>›</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0B0F',
  },
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
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#16161E',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#222230',
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  listContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: '#14141A',
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#222230',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  cover: {
    width: 65,
    height: 95,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  info: {
    marginLeft: 14,
    flex: 1,
  },
  movieTitle: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
  category: {
    color: '#8E8E93',
    fontSize: 12,
    marginTop: 3,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  rating: {
    color: '#FFD700',
    fontSize: 12,
    fontWeight: 'bold',
  },
  arrowContainer: {
    paddingHorizontal: 8,
  },
  arrowText: {
    color: '#555566',
    fontSize: 22,
    fontWeight: '300',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyIcon: {
    fontSize: 42,
    marginBottom: 12,
  },
  emptyTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
    textAlign: 'center',
  },
  emptyText: {
    color: '#8E8E93',
    textAlign: 'center',
    fontSize: 13,
    lineHeight: 18,
  },
});