import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import * as ScreenOrientation from 'expo-screen-orientation';
import { POPULAR_MOVIES, ALL_MOVIES, CINEMA_MOVIES, MovieItem } from '../../data/movies';

type RouteParams = {
  id: string;
};

export default function MovieDetails() {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params as RouteParams;

  const [rating, setRating] = useState<number>(0);
  const [userName, setUserName] = useState<string>('');
  const [reviewText, setReviewText] = useState<string>('');
  const [savedReview, setSavedReview] = useState<{ name: string; rating: number; text: string } | null>(null);

  const [isNameFocused, setIsNameFocused] = useState<boolean>(false);
  const [isReviewFocused, setIsReviewFocused] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const reviewInputRef = useRef<TextInput>(null);

  useFocusEffect(
    React.useCallback(() => {
      const unlockScreen = async () => {
        await ScreenOrientation.unlockAsync();
      };
      unlockScreen();

      return () => {
        const lockPortrait = async () => {
          await ScreenOrientation.lockAsync(
            ScreenOrientation.OrientationLock.PORTRAIT_UP
          );
        };
        lockPortrait();
      };
    }, [])
  );

  const allAvailableMovies: MovieItem[] = [...POPULAR_MOVIES, ...ALL_MOVIES, ...CINEMA_MOVIES];
  const movie = allAvailableMovies.find(item => item.id === id);

  if (!movie) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#141414', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#FFF', fontSize: 18 }}>Filme não encontrado.</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 20 }}>
          <Text style={{ color: '#E50914', fontSize: 16, fontWeight: 'bold' }}>Voltar</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const videoId = (movie as any)?.trailerUrl ? 
    ((movie as any).trailerUrl.includes('v=') ? (movie as any).trailerUrl.split('v=')[1]?.substring(0, 11) : '') 
    : movie.youtubeId || '';

  const normalWidth = Dimensions.get('window').width;
  const videoHeight = (normalWidth * 9) / 16;

  const handleStarPress = (starIndex: number) => {
    let newRating = starIndex;
    if (rating === starIndex) {
      newRating = starIndex - 0.5;
    } else if (rating === starIndex - 0.5) {
      newRating = starIndex - 1;
    }
    setRating(newRating);
    reviewInputRef.current?.focus();
  };

  const handleSaveReview = () => {
    if (!userName.trim() || !reviewText.trim() || rating === 0) {
      alert('Por favor, preencha o nome, a avaliação com estrelas e escreva sua opinião antes de salvar.');
      return;
    }

    setSavedReview({ name: userName, rating, text: reviewText });
    alert('Sua opinião foi salva com sucesso!');
  };

  const handleDeleteReview = () => {
    setSavedReview(null);
    setUserName('');
    setReviewText('');
    setRating(0);
    alert('Sua opinião foi excluída com sucesso!');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#141414' }}>
      {!isFullscreen && (
        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#141414' }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: 80 }}>
            <Text style={{ color: '#FFF', fontSize: 18, fontWeight: 'bold' }}>← Voltar</Text>
          </TouchableOpacity>

          <Text style={{ color: '#FFF', fontSize: 18, fontWeight: 'bold', flex: 1, textAlign: 'center' }} numberOfLines={1}>
            {movie.title}
          </Text>

          <View style={{ width: 80 }} />
        </View>
      )}

      <ScrollView 
        contentContainerStyle={{ paddingBottom: 30 }} 
        showsVerticalScrollIndicator={false} 
        scrollEnabled={!isFullscreen}
      >
        {videoId ? (
          <View 
            style={
              isFullscreen 
                ? { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 999, backgroundColor: '#000', height: '100%', width: '100%' }
                : { width: '100%', height: videoHeight, backgroundColor: '#000' }
            }
          >
            <WebView
              style={{ flex: 1, backgroundColor: '#000' }}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              allowsInlineMediaPlayback={true}
              mediaPlaybackRequiresUserAction={false}
              allowsFullscreenVideo={true}
              injectedJavaScript={`
                document.addEventListener('fullscreenchange', () => {
                  const isFs = !!document.fullscreenElement;
                  window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'fsChange', status: isFs }));
                });
                document.addEventListener('webkitfullscreenchange', () => {
                  const isFs = !!document.webkitFullscreenElement;
                  window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'fsChange', status: isFs }));
                });
                true;
              `}
              onMessage={async (event) => {
                try {
                  const data = JSON.parse(event.nativeEvent.data);
                  if (data.type === 'fsChange') {
                    if (data.status) {
                      setIsFullscreen(true);
                      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
                    } else {
                      setIsFullscreen(false);
                      await ScreenOrientation.unlockAsync();
                    }
                  }
                } catch (e) {
                  console.log(e);
                }
              }}
              source={{
                html: `
                  <!DOCTYPE html>
                  <html>
                    <head>
                      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
                      <style>
                        html, body { margin: 0; padding: 0; background-color: #000; width: 100%; height: 100%; overflow: hidden; display: flex; justify-content: center; align-items: center; }
                        .video-container { position: relative; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; }
                        iframe { width: 100%; height: 100%; position: absolute; top: 0; left: 0; border: none; }
                      </style>
                    </head>
                    <body>
                      <div class="video-container">
                        <iframe 
                          src="https://www.youtube.com/embed/${videoId}?autoplay=1&playsinline=1&rel=0&modestbranding=1&enablejsapi=1" 
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" 
                          allowfullscreen>
                        </iframe>
                      </div>
                    </body>
                  </html>
                `,
                baseUrl: 'https://youtube.com'
              }}
            />
          </View>
        ) : (
          <Image source={movie.cover} style={{ width: '100%', height: videoHeight }} resizeMode="cover" />
        )}

        {!isFullscreen && (
          <View style={{ padding: 20 }}>
            <Text style={{ color: '#FFF', fontSize: 24, fontWeight: 'bold', marginBottom: 8 }}>{movie.title}</Text>
            <Text style={{ color: '#A0A0A0', fontSize: 14, marginBottom: 16 }}>{movie.category} • ⭐ {movie.rating}</Text>
            
            <Text style={{ color: '#FFF', fontSize: 18, fontWeight: 'bold', marginTop: 10, marginBottom: 6 }}>Sinopse</Text>
            <Text style={{ color: '#CCC', fontSize: 14, lineHeight: 22, marginBottom: 20 }}>{movie.synopsis}</Text>

            <View style={{ alignItems: 'center', marginTop: 10, marginBottom: 20, width: '100%', backgroundColor: '#1f1f1f', padding: 20, borderRadius: 12 }}>
              <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: 'bold', marginBottom: 12, textAlign: 'center' }}>
                O que achou do filme? Deixe sua opinião:
              </Text>
              
              <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 15 }}>
                {[1, 2, 3, 4, 5].map((star) => {
                  const isFull = rating >= star;
                  const isHalf = rating >= star - 0.5 && rating < star;

                  return (
                    <TouchableOpacity key={star} onPress={() => handleStarPress(star)} style={{ marginHorizontal: 5, position: 'relative', width: 32, height: 32, justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ fontSize: 40, position: 'absolute', color: '#555' }}>☆</Text>
                      
                      {isFull ? (
                        <Text style={{ fontSize: 26, position: 'absolute', top: 5, left: 1 }}>⭐</Text>
                      ) : isHalf ? (
                        <View style={{ position: 'absolute', overflow: 'hidden', width: 18, height: 50, left: 0, top: 1 }}>
                          <Text style={{ fontSize: 30, position: 'absolute', left: 2 }}>⭐</Text>
                        </View>
                      ) : null}
                    </TouchableOpacity>
                  );
                })}
              </View>

              <Text style={{ color: '#FFD700', marginBottom: 15, fontSize: 14, fontWeight: 'bold' }}>
                Nota: {rating} / 5
              </Text>

              <TextInput
                style={{
                  width: '100%',
                  height: 45,
                  backgroundColor: '#2b2b2b',
                  color: '#FFF',
                  borderRadius: 8,
                  paddingHorizontal: 12,
                  fontSize: 14,
                  marginBottom: 12,
                  borderWidth: 1,
                  borderColor: isNameFocused ? '#E50914' : '#3a3a3a',
                  shadowColor: '#E50914',
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: isNameFocused ? 0.6 : 0,
                  shadowRadius: 6,
                  elevation: isNameFocused ? 4 : 0,
                }}
                selectionColor="#E50914"
                onFocus={() => setIsNameFocused(true)}
                onBlur={() => setIsNameFocused(false)}
                placeholder="Seu Nome"
                placeholderTextColor="#888"
                value={userName}
                onChangeText={setUserName}
              />

              <TextInput
                ref={reviewInputRef}
                style={{
                  width: '100%',
                  height: 90,
                  backgroundColor: '#2b2b2b',
                  color: '#FFF',
                  borderRadius: 8,
                  padding: 12,
                  textAlignVertical: 'top',
                  fontSize: 14,
                  marginBottom: 15,
                  borderWidth: 1,
                  borderColor: isReviewFocused ? '#E50914' : '#3a3a3a',
                  shadowColor: '#E50914',
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: isReviewFocused ? 0.6 : 0,
                  shadowRadius: 6,
                  elevation: isReviewFocused ? 4 : 0,
                }}
                selectionColor="#E50914"
                onFocus={() => setIsReviewFocused(true)}
                onBlur={() => setIsReviewFocused(false)}
                placeholder="Escreva sua Opinião ou comentário sobre o filme aqui..."
                placeholderTextColor="#888"
                multiline={true}
                value={reviewText}
                onChangeText={setReviewText}
              />

              <TouchableOpacity
                onPress={handleSaveReview}
                style={{
                  backgroundColor: '#E50914',
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  borderRadius: 8,
                  width: '100%',
                  alignItems: 'center',
                  opacity: (!userName.trim() || !reviewText.trim() || rating === 0) ? 0.6 : 1,
                }}
              >
                <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 15 }}>Salvar Opinião</Text>
              </TouchableOpacity>

              {savedReview && (
                <View style={{ marginTop: 20, width: '100%' }}>
                  <View style={{ height: 1, backgroundColor: '#555555d8', marginBottom: 18, width: '100%' }} />

                  <View style={{ backgroundColor: '#262626', borderRadius: 8, padding: 15 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                      {savedReview.name ? (
                        <Text style={{ color: '#E50914', fontWeight: 'bold', fontSize: 15 }}>{savedReview.name}</Text>
                      ) : <View />}
                      <Text style={{ color: '#FFD700', fontSize: 14, fontWeight: 'bold' }}>{savedReview.rating} estrelas ⭐</Text>
                    </View>

                    <Text style={{ color: '#CCC', fontSize: 14, lineHeight: 20, marginBottom: 15 }}>
                      {savedReview.text}
                    </Text>

                    <TouchableOpacity
                      onPress={handleDeleteReview}
                      style={{
                        backgroundColor: 'transparent',
                        borderWidth: 1,
                        borderColor: '#E50914',
                        paddingVertical: 8,
                        borderRadius: 8,
                        width: '100%',
                        alignItems: 'center'
                      }}
                    >
                      <Text style={{ color: '#E50914', fontWeight: 'bold', fontSize: 14 }}>Excluir Opinião</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}