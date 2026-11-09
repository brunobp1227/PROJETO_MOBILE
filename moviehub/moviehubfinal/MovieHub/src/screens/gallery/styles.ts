import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const horizontalPadding = 16;
const spacing = 10; 
const totalSpacing = spacing * 2; 
const posterWidth = (width - (horizontalPadding * 2) - totalSpacing) / 3;
const posterHeight = posterWidth * 1.45;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0B0F',
    paddingHorizontal: horizontalPadding,
    paddingTop: 8,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 20,
    marginTop: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 3,
  },
  counterBadge: {
    backgroundColor: '#16161E',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#262635',
  },
  counterText: {
    color: '#3498DB',
    fontSize: 11,
    fontWeight: 'bold',
  },
  listContainer: {
    paddingBottom: 24,
  },
  row: {
    justifyContent: 'flex-start',
    marginBottom: spacing,
  },
  posterCard: {
    width: posterWidth,
    height: posterHeight,
    borderRadius: 12,
    backgroundColor: '#14141A',
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: '#222230',
    marginRight: spacing,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 8,
  },
  numberBadge: {
    position: 'absolute',
    top: 6,
    left: 6,
    backgroundColor: 'rgba(11, 11, 15, 0.85)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    zIndex: 2,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  numberText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  posterImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  // Estilos do Modal de Tela Cheia
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(5, 5, 8, 0.92)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackgroundTouch: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: width * 0.8,
    backgroundColor: '#14141A',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#2A2A3C',
    alignItems: 'center',
    paddingBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalImage: {
    width: '100%',
    height: width * 1.1,
    resizeMode: 'cover',
  },
  modalInfo: {
    paddingHorizontal: 16,
    paddingTop: 16,
    width: '100%',
    alignItems: 'center',
  },
  modalTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 6,
  },
  modalMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  modalCategory: {
    color: '#8E8E93',
    fontSize: 13,
  },
  modalRating: {
    color: '#FFD700',
    fontSize: 13,
    fontWeight: 'bold',
  },
});

export default styles;