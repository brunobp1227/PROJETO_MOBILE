import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import styles from './styles';

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export default function Settings() {
  const navigation = useNavigation<NavigationProps>();

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backText}> Voltar</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={[styles.title, { textAlign: 'center', marginBottom: 20 }]}>Sobre o App </Text>

        <View style={{ alignItems: 'center', marginBottom: 25 }}>
          <Image 
            source={require('../../../assets/logo.png')} 
            style={{ width: 80, height: 80, marginBottom: 10 }} 
            resizeMode="contain"
          />
          <Text style={{ color: '#FFFFFF', fontSize: 22, fontWeight: 'bold' }}>
            Film<Text style={{ color: '#E50914' }}>Center</Text>
          </Text>
          <Text style={{ color: '#888888', fontSize: 14, marginTop: 4 }}>Versão 1.2.4</Text>
        </View>

        <View style={styles.menuContainer}>
          <View style={[styles.menuItem, { flexDirection: 'column', alignItems: 'flex-start', paddingVertical: 15 }]}>
            <Text style={[styles.menuItemText, { fontWeight: 'bold', marginBottom: 5 }]}>🎬 Descrição do Projeto</Text>
            <Text style={{ color: '#AAAAAA', fontSize: 14, lineHeight: 20 }}>
              O FilmCenter é um aplicativo completo para explorarem lançamentos populares, favoritarem filmes, conferirem detalhes de exibições e darem opinião aos filmes.
            </Text>
          </View>

          <View style={[styles.menuItem, { flexDirection: 'column', alignItems: 'flex-start', paddingVertical: 15 }]}>
            <Text style={[styles.menuItemText, { fontWeight: 'bold', marginBottom: 5 }]}>👨‍💻 Desenvolvedor</Text>
            <Text style={{ color: '#AAAAAA', fontSize: 14, lineHeight: 20 }}>
              Desenvolvido por Arthur Henrique como parte de projetos de Programação Mobile utilizando React Native, Expo e TypeScript.
            </Text>
          </View>

          <View style={[styles.menuItem, { flexDirection: 'column', alignItems: 'flex-start', paddingVertical: 15 }]}>
            <Text style={[styles.menuItemText, { fontWeight: 'bold', marginBottom: 5 }]}>🛠️ Tecnologias Utilizadas</Text>
            <Text style={{ color: '#AAAAAA', fontSize: 14, lineHeight: 20 }}>
              • React Native & Expo{'\n'}
              • TypeScript{'\n'}
              • React Navigation{'\n'}
              • AsyncStorage
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}