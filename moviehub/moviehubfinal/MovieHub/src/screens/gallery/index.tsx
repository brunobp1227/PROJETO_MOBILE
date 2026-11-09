import React, { useRef, useState } from 'react';
import { View, Text, FlatList, Image, StatusBar, Pressable, Animated, Modal, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MOVIES_LIST } from '../Movies';
import styles from './styles';

const { width: screenWidth } = Dimensions.get('window');

// Componente animado para cada cartaz
function AnimatedPoster({ item, index, onOpenModal }: { item: any; index: number; onOpenModal: (movie: any) => void }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.93,
      useNativeDriver: true,
      speed: 20,
      bounciness: 10,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
      bounciness: 10,
    }).start();
  };

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={() => onOpenModal(item)}
    >
      <Animated.View 
        style={[
          styles.posterCard, 
          { transform: [{ scale: scaleAnim }] }
        ]}
      >
        <View style={styles.numberBadge}>
          <Text style={styles.numberText}>#{String(index + 1).padStart(2, '0')}</Text>
        </View>

        <Image source={item.cover} style={styles.posterImage} />
      </Animated.View>
    </Pressable>
  );
}

export default function Gallery() {
  const [selectedMovie, setSelectedMovie] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = (movie: any) => {
    setSelectedMovie(movie);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedMovie(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0B0B0F" />
      
      {/* Cabeçalho da Galeria */}
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.title}>Galeria de Cartazes</Text>
          <Text style={styles.subtitle}>Toque no pôster para ampliar</Text>
        </View>
        <View style={styles.counterBadge}>
          <Text style={styles.counterText}>{MOVIES_LIST.length} pôsteres</Text>
        </View>
      </View>

      <FlatList
        data={MOVIES_LIST}
        keyExtractor={item => item.id}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item, index }) => (
          <AnimatedPoster item={item} index={index} onOpenModal={handleOpenModal} />
        )}
      />

      {/* Modal de Visualização em Tela Cheia (Lightbox) */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity 
            style={styles.modalBackgroundTouch} 
            activeOpacity={1} 
            onPress={handleCloseModal}
          >
            <View style={styles.modalContent} onStartShouldSetResponder={() => true}>
              {selectedMovie && (
                <>
                  <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
                    <Text style={styles.closeButtonText}>✕</Text>
                  </TouchableOpacity>

                  <Image source={selectedMovie.cover} style={styles.modalImage} />

                  <View style={styles.modalInfo}>
                    <Text style={styles.modalTitle}>{selectedMovie.title}</Text>
                    <View style={styles.modalMetaRow}>
                      <Text style={styles.modalCategory}>{selectedMovie.category}</Text>
                      <Text style={styles.modalRating}>⭐ {selectedMovie.rating}</Text>
                    </View>
                  </View>
                </>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
}