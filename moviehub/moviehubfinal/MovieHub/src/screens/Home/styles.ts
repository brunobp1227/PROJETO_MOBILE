import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#101014' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#1C1C22',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoImage: {
    width: 32,
    height: 32,
  },
  logo: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    color: '#ffffffe3',

    textShadowColor: 'rgba(255, 255, 255, 0.8)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 18,
  },
  logoHighlight: {
    color: '#E50914',

    textShadowColor: '#E50914',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  headerActions: { flexDirection: 'row', gap: 15 },
  headerButtonText: { fontSize: 20 },
  scrollContent: { padding: 20 },
  navGrid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25 },
  navButton: { backgroundColor: '#1C1C22', padding: 12, borderRadius: 8, flex: 1, marginHorizontal: 4, alignItems: 'center' },
  navText: { color: '#FFF', fontWeight: '600', fontSize: 13 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#FFF', marginBottom: 15 },
  movieCard: { width: 130, marginRight: 15, position: 'relative' },
  movieCover: { width: 130, height: 180, borderRadius: 8, marginBottom: 8 },
  favButton: { position: 'absolute', top: 8, right: 8, backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 15, padding: 5 },
  movieTitle: { color: '#FFF', fontWeight: '600', fontSize: 14 },
  movieRating: { color: '#FFD700', fontSize: 12, marginTop: 2 },
});

export default styles;