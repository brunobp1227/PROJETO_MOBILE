import React, { useCallback, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StatusBar, ActivityIndicator, Alert, RefreshControl, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { getMovies, ApiMovie, deleteMovie } from '../../services/movieService';

export default function Movies() {
  const navigation = useNavigation<any>();
  const [movies, setMovies] = useState<ApiMovie[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadMovies = useCallback(async () => {
    try { setMovies(await getMovies()); }
    catch (error) { Alert.alert('Erro ao carregar filmes', error instanceof Error ? error.message : 'Verifique a conexão com a API.'); }
    finally { setLoading(false); setRefreshing(false); }
  }, []);
  useFocusEffect(useCallback(() => { loadMovies(); }, [loadMovies]));

  const confirmDelete = (movie: ApiMovie) => Alert.alert('Excluir filme', `Deseja excluir ${movie.title}?`, [
    { text: 'Cancelar', style: 'cancel' },
    { text: 'Excluir', style: 'destructive', onPress: async () => {
      try { await deleteMovie(movie.id); await loadMovies(); }
      catch (error) { Alert.alert('Erro', error instanceof Error ? error.message : 'Não foi possível excluir.'); }
    } },
  ]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#101014', paddingHorizontal: 18 }}>
      <StatusBar barStyle="light-content" backgroundColor="#101014" />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 18 }}>
        <View><Text style={{ color: '#FFF', fontSize: 24, fontWeight: 'bold' }}>Minha coleção</Text><Text style={{ color: '#999', marginTop: 4 }}>Filmes salvos na sua conta</Text></View>
        <TouchableOpacity onPress={() => navigation.navigate('MovieCreate')} style={{ backgroundColor: '#E50914', padding: 12, borderRadius: 9 }}><Text style={{ color: '#FFF', fontWeight: 'bold' }}>＋ Novo</Text></TouchableOpacity>
      </View>
      {loading ? <ActivityIndicator color="#E50914" size="large" style={{ marginTop: 40 }} /> : (
        <FlatList
          data={movies}
          keyExtractor={item => item.id}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); loadMovies(); }} tintColor="#E50914" />}
          ListEmptyComponent={<Text style={{ color: '#AAA', textAlign: 'center', marginTop: 60 }}>Sua coleção ainda está vazia. Cadastre seu primeiro filme!</Text>}
          renderItem={({ item }) => (
            <View style={{ flexDirection: 'row', backgroundColor: '#1C1C22', borderRadius: 12, padding: 13, marginBottom: 12, gap: 12 }}>
              {item.image_url ? <Image source={{ uri: item.image_url }} style={{ width: 72, height: 104, borderRadius: 7 }} /> : <View style={{ width: 72, height: 104, borderRadius: 7, backgroundColor: '#30303A', alignItems: 'center', justifyContent: 'center' }}><Text style={{ color: '#AAA' }}>Filme</Text></View>}
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text style={{ color: '#FFF', fontSize: 16, fontWeight: 'bold' }}>{item.title}</Text>
                <Text style={{ color: '#AAA', marginTop: 4 }}>{item.year} • {item.genres?.name || 'Sem gênero'}</Text>
                <Text style={{ color: '#AAA', marginTop: 3 }}>Nota: {item.rating ?? '—'} • {item.status === 'watched' ? 'Assistido' : item.status === 'watching' ? 'Assistindo' : 'Quero assistir'}</Text>
                <View style={{ flexDirection: 'row', gap: 10, marginTop: 12 }}>
                  <TouchableOpacity onPress={() => navigation.navigate('MovieEdit', { movie: item })} style={{ backgroundColor: '#33333D', paddingHorizontal: 13, paddingVertical: 7, borderRadius: 6 }}><Text style={{ color: '#FFF' }}>Editar</Text></TouchableOpacity>
                  <TouchableOpacity onPress={() => confirmDelete(item)} style={{ backgroundColor: '#5A2025', paddingHorizontal: 13, paddingVertical: 7, borderRadius: 6 }}><Text style={{ color: '#FFF' }}>Excluir</Text></TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}
