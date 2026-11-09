import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors?.background || '#101014',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors?.text || '#FFFFFF',
    marginBottom: 12,
  },
  text: {
    fontSize: 14,
    color: colors?.textSecondary || '#8E8E93',
  },
});

export default styles;