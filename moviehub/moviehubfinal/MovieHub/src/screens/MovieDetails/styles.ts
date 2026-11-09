import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101014',
    paddingHorizontal: 20,
  },
  backButton: {
    paddingVertical: 10,
    marginBottom: 5,
  },
  backText: {
    color: '#E50914',
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    alignItems: 'center',
    paddingBottom: 30,
  },
  banner: {
    width: '100%',
    height: 350,
    borderRadius: 12,
    marginBottom: 15,
  },
  videoContainer: {
    width: '100%',
    height: 230,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 15,
    backgroundColor: '#000',
  },
  closeTrailerButton: {
    backgroundColor: '#1C1C22',
    padding: 10,
    alignItems: 'center',
  },
  closeTrailerText: {
    color: '#FF4D4D',
    fontWeight: 'bold',
    fontSize: 13,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 5,
  },
  category: {
    fontSize: 14,
    color: '#AAA',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  synopsis: {
    color: '#CCC',
    fontSize: 14,
    lineHeight: 22,
    alignSelf: 'flex-start',
  },
  trailerButton: {
    backgroundColor: '#E50914',
    paddingVertical: 14,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginTop: 25,
    shadowColor: '#E50914',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 8,
  },
  trailerText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default styles;