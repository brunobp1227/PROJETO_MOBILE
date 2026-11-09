import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

// ⚠️ Mude esta linha para apontar para o seu arquivo de dados (ex: ../data/movies ou ../../data/movies)
import { ALL_MOVIES, MovieItem } from '../../data/movies'; 
import styles from './styles';

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export default function Search() {
  const navigation = useNavigation<NavigationProps>();
  const [query, setQuery] = useState('');

  const filteredMovies = ALL_MOVIES.filter((movie) =>
    movie.title.toLowerCase().includes(query.toLowerCase()) ||
    movie.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backText}>⬅️ Voltar</Text>
      </TouchableOpacity>

      <View style={styles.searchBar}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.input}
          placeholder="Buscar por título ou gênero..."
          placeholderTextColor="#888"
          value={query}
          onChangeText={setQuery}
          autoFocus
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => setQuery('')}>
            <Text style={styles.clearText}>❌</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={filteredMovies}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum filme encontrado.</Text>
        }
        renderItem={({ item }: { item: MovieItem }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('MovieDetails', { id: item.id })}
          >
            <Image source={item.cover} style={styles.cover} />
            <View style={styles.info}>
              <Text style={styles.movieTitle}>{item.title}</Text>
              <Text style={styles.category}>{item.category}</Text>
              <Text style={styles.rating}>⭐ {item.rating}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}