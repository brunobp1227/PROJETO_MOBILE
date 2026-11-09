import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import styles from './styles';

const Trailer: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Trailer do Filme</Text>
        <Text style={styles.text}>Tela de Trailer do Filme do MovieHub</Text>
      </View>
    </SafeAreaView>
  );
};

export default Trailer;