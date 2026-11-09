import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101014',
    paddingHorizontal: 15,
    paddingTop: 10,
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
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1C22',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
    marginBottom: 20,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 15,
  },
  clearText: {
    fontSize: 14,
    padding: 4,
  },
  emptyText: {
    color: '#888888',
    textAlign: 'center',
    marginTop: 40,
    fontSize: 15,
  },
  card: {
    backgroundColor: '#1C1C22',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cover: {
    width: 60,
    height: 85,
    borderRadius: 6,
  },
  info: {
    marginLeft: 15,
    flex: 1,
  },
  movieTitle: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  category: {
    color: '#888888',
    fontSize: 13,
    marginTop: 4,
  },
  rating: {
    color: '#FFD700',
    fontSize: 13,
    marginTop: 6,
  },
});

export default styles;