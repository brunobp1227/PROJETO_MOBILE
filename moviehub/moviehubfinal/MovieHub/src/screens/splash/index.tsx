import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import styles from './styles';

const Splash: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Tela de Abertura</Text>
        <Text style={styles.text}>Tela de Tela de Abertura do MovieHub</Text>
      </View>
    </SafeAreaView>
  );
};

export default Splash;