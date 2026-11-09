import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { createMovie, getGenres } from '../../services/movieService';

export default function MovieCreate() {
  const navigation = useNavigation();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [rating, setRating] = useState('');
  const [youtubeId, setYoutubeId] = useState('');
  const [synopsis, setSynopsis] = useState('');
  const [year, setYear] = useState(String(new Date().getFullYear()));
  const [director, setDirector] = useState('');
  const [duration, setDuration] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!title.trim() || !category.trim()) {
      Alert.alert('Atenção', 'Preencha pelo menos o Título e a Categoria.');
      return;
    }

    setLoading(true);
    try {
      const genres = await getGenres();
      const firstCategory = category.split('/')[0].trim().toLocaleLowerCase('pt-BR');
      const genre = genres.find(item => item.name.toLocaleLowerCase('pt-BR') === firstCategory);
      await createMovie({ title: title.trim(), description: synopsis, year: Number(year), director, duration: duration ? Number(duration) : undefined, rating: rating ? Number(rating.replace(',', '.')) : null, status: 'want_to_watch', favorite: false, genre_id: genre?.id ?? null, trailer_url: youtubeId ? `https://www.youtube.com/watch?v=${youtubeId}` : undefined });
      Alert.alert('Sucesso', `Filme \"${title}\" cadastrado no banco!`, [{ text: 'OK', onPress: () => navigation.goBack() }]);
    } catch (error) {
      Alert.alert('Erro ao cadastrar', error instanceof Error ? error.message : 'Verifique a conexão com a API.');
    } finally { setLoading(false); }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backText}>⬅️ Voltar</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>➕ Adicionar Novo Filme</Text>

        <Text style={styles.label}>Título</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Homem-Aranha"
          placeholderTextColor="#888"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Ano</Text>
        <TextInput style={styles.input} placeholder="Ex: 2014" placeholderTextColor="#888" keyboardType="numeric" value={year} onChangeText={setYear} />

        <Text style={styles.label}>Diretor</Text>
        <TextInput style={styles.input} placeholder="Nome do diretor" placeholderTextColor="#888" value={director} onChangeText={setDirector} />

        <Text style={styles.label}>Duração (minutos)</Text>
        <TextInput style={styles.input} placeholder="Ex: 120" placeholderTextColor="#888" keyboardType="numeric" value={duration} onChangeText={setDuration} />

        <Text style={styles.label}>Categoria / Gênero</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Ação / Aventura"
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
          placeholder="Ex: d9MyW72ELxy"
          placeholderTextColor="#888"
          value={youtubeId}
          onChangeText={setYoutubeId}
        />

        <Text style={styles.label}>Sinopse</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Escreva uma breve sinopse..."
          placeholderTextColor="#888"
          multiline
          numberOfLines={4}
          value={synopsis}
          onChangeText={setSynopsis}
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleCreate}>
          <Text style={styles.submitButtonText}>{loading ? 'Cadastrando...' : 'Cadastrar Filme'}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}