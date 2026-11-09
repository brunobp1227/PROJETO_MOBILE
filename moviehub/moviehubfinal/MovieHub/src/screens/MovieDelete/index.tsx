import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from './styles';
import { deleteMovie } from '../../services/movieService';

export default function MovieDelete() {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const movieTitle = route.params?.title || 'este filme';

  const handleDeleteConfirm = async () => {
    try {
      await deleteMovie(String(route.params?.id));
      Alert.alert('Sucesso', `O filme \"${movieTitle}\" foi excluído do banco de dados!`, [{ text: 'OK', onPress: () => navigation.navigate('Home' as never) }]);
    } catch (error) { Alert.alert('Erro ao excluir', error instanceof Error ? error.message : 'Verifique a conexão com a API.'); }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.icon}>⚠️</Text>
        <Text style={styles.title}>Confirmar Exclusão</Text>
        <Text style={styles.message}>
          Tem certeza de que deseja excluir o filme <Text style={styles.movieHighlight}>"{movieTitle}"</Text>? Esta ação não poderá ser desfeita.
        </Text>

        <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteConfirm}>
          <Text style={styles.deleteButtonText}>Sim, Excluir Filme</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
          <Text style={styles.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}