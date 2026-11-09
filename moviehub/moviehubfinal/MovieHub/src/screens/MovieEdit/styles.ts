import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101014',
    paddingHorizontal: 20,
  },
  backButton: {
    paddingVertical: 10,
  },
  backText: {
    color: '#E50914',
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    paddingBottom: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginVertical: 15,
  },
  label: {
    color: '#AAA',
    fontSize: 14,
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#1C1C22',
    borderRadius: 8,
    paddingHorizontal: 15,
    height: 48,
    color: '#FFFFFF',
    marginBottom: 16,
    fontSize: 15,
  },
  textArea: {
    height: 100,
    paddingTop: 12,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#E50914',
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});