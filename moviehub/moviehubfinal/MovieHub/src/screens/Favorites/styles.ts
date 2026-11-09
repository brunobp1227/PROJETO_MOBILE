import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101014',
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 15,
  },
  emptyText: {
    color: '#888888',
    textAlign: 'center',
    marginTop: 50,
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
    width: 70,
    height: 100,
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