import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from './styles';
import { updateMovie, getGenres } from '../../services/movieService';

export default function MovieEdit() {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const movie = route.params?.movie || {};

  const [title, setTitle] = useState(movie.title || '');
  const [category, setCategory] = useState(movie.genres?.name || movie.category || '');
  const [rating, setRating] = useState(movie.rating ? String(movie.rating) : '');
  const [youtubeId, setYoutubeId] = useState(movie.youtubeId || (movie.trailer_url ? String(movie.trailer_url).split('v=')[1] : '') || '');
  const [synopsis, setSynopsis] = useState(movie.description || movie.synopsis || '');
  const [year, setYear] = useState(String(movie.year || new Date().getFullYear()));
  const [director, setDirector] = useState(movie.director || '');
  const [duration, setDuration] = useState(String(movie.duration || ''));

  const handleUpdate = async () => {
    if (!title.trim() || !category.trim()) {
      Alert.alert('Atenção', 'Preencha pelo menos o Título e a Categoria.');
      return;
    }

    try {
      const genres = await getGenres();
      const firstCategory = category.split('/')[0].trim().toLocaleLowerCase('pt-BR');
      const genre = genres.find(item => item.name.toLocaleLowerCase('pt-BR') === firstCategory);
      await updateMovie(String(movie.id), { title: title.trim(), description: synopsis, year: Number(year), director, duration: duration ? Number(duration) : undefined, rating: rating ? Number(rating.replace(',', '.')) : null, genre_id: genre?.id ?? null, trailer_url: youtubeId ? `https://www.youtube.com/watch?v=${youtubeId}` : undefined });
      Alert.alert('Sucesso', 'Filme atualizado no banco de dados!', [{ text: 'OK', onPress: () => navigation.goBack() }]);
    } catch (error) { Alert.alert('Erro ao atualizar', error instanceof Error ? error.message : 'Verifique a conexão com a API.'); }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backText}>⬅️ Cancelar</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>✏️ Editar Filme</Text>

        <Text style={styles.label}>Título</Text>
        <TextInput
          style={styles.input}
          placeholder="Título do filme"
          placeholderTextColor="#888"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Ano</Text>
        <TextInput style={styles.input} placeholder="Ano" placeholderTextColor="#888" keyboardType="numeric" value={year} onChangeText={setYear} />

        <Text style={styles.label}>Diretor</Text>
        <TextInput style={styles.input} placeholder="Diretor" placeholderTextColor="#888" value={director} onChangeText={setDirector} />

        <Text style={styles.label}>Duração (minutos)</Text>
        <TextInput style={styles.input} placeholder="Duração" placeholderTextColor="#888" keyboardType="numeric" value={duration} onChangeText={setDuration} />

        <Text style={styles.label}>Categoria / Gênero</Text>
        <TextInput
          style={styles.input}
          placeholder="Categoria"
          placeholderTextColor="#888"
          value={category}
          onChangeText={setCategory}
        />

        <Text style={styles.label}>Nota (Rating)</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 4.8"
          placeholderTextColor="#888"
          keyboardType="numeric"
          value={rating}
          onChangeText={setRating}
        />

        <Text style={styles.label}>ID do Vídeo do YouTube</Text>
        <TextInput
          style={styles.input}
          placeholder="ID do YouTube"
          placeholderTextColor="#888"
          value={youtubeId}
          onChangeText={setYoutubeId}
        />

        <Text style={styles.label}>Sinopse</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Sinopse do filme..."
          placeholderTextColor="#888"
          multiline
          numberOfLines={4}
          value={synopsis}
          onChangeText={setSynopsis}
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleUpdate}>
          <Text style={styles.submitButtonText}>Salvar Alterações</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}