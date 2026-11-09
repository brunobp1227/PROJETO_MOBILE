import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import styles from './styles';

const ShareMovie: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Compartilhamento</Text>
        <Text style={styles.text}>Tela de Compartilhamento do MovieHub</Text>
      </View>
    </SafeAreaView>
  );
};

export default ShareMovie;