import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity, View, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { register } from '../../services/authService';

const Register: React.FC = () => {
  const navigation = useNavigation<any>();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const handleRegister = async () => {
    if (!nome.trim() || !email.trim() || !password) return Alert.alert('Atenção', 'Preencha todos os campos.');
    setLoading(true);
    try {
      const result = await register(nome.trim(), email.trim(), password);
      Alert.alert('Cadastro realizado', result.message, [{ text: 'OK', onPress: () => navigation.replace(result.session ? 'Home' : 'Login') }]);
    } catch (error) {
      Alert.alert('Erro no cadastro', error instanceof Error ? error.message : 'Tente novamente.');
    } finally { setLoading(false); }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 24 }}>
        <View style={{ width: '100%' }}>
          <Text style={styles.title}>Criar conta</Text>
          <Text style={[styles.text, { marginBottom: 24 }]}>Faça seu cadastro para começar a usar o MovieHub.</Text>
          <TextInput placeholder="Nome" placeholderTextColor="#888" value={nome} onChangeText={setNome} autoCapitalize="words" style={fieldStyle} />
          <TextInput placeholder="E-mail" placeholderTextColor="#888" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" style={fieldStyle} />
          <TextInput placeholder="Senha (mínimo 6 caracteres)" placeholderTextColor="#888" value={password} onChangeText={setPassword} secureTextEntry style={fieldStyle} />
          <TouchableOpacity onPress={handleRegister} disabled={loading} style={buttonStyle}><Text style={{ color: '#FFF', fontWeight: 'bold' }}>{loading ? 'Cadastrando...' : 'Cadastrar'}</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 20 }}><Text style={{ color: '#FFF', textAlign: 'center' }}>Já tenho uma conta. Voltar</Text></TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const fieldStyle = { backgroundColor: '#1C1C22', borderRadius: 8, padding: 14, color: '#FFF', marginBottom: 14 } as const;
const buttonStyle = { backgroundColor: '#E50914', borderRadius: 8, padding: 16, alignItems: 'center', marginTop: 8 } as const;
export default Register;
