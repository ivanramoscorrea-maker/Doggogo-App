import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TextInput, ScrollView, Image, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/common/Button';
import { db, storage } from '../../config/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const WalkerProfileScreen = () => {
  const { user } = useAuth();
  
  const [photo, setPhoto] = useState<string | null>(null);
  const [bio, setBio] = useState('');
  const [rate, setRate] = useState('');
  const [country, setCountry] = useState('México');
  const [state, setState] = useState('CDMX');
  const [city, setCity] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Cargar perfil existente desde Firestore al entrar
    const loadProfile = async () => {
      if (!user?.uid) return;
      try {
        const docRef = doc(db, 'walkers', user.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          setPhoto(data.photoURL || null);
          setBio(data.bio || '');
          setRate(data.rate ? data.rate.toString() : '');
          setCountry(data.country || 'México');
          setState(data.state || 'CDMX');
          setCity(data.city || '');
          setNeighborhood(data.neighborhood || '');
        }
      } catch (error) {
        console.error("Error cargando el perfil del paseador:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadProfile();
  }, [user]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const uploadImageToStorage = async (uri: string): Promise<string> => {
    if (!user?.uid) throw new Error("Usuario no autenticado");
    // Si la URI ya es de la web (http), no necesitamos re-subirla (ya estaba en Firestore)
    if (uri.startsWith('http')) return uri;

    const response = await fetch(uri);
    const blob = await response.blob();
    const storageRef = ref(storage, `profile_photos/${user.uid}`);
    await uploadBytes(storageRef, blob);
    return await getDownloadURL(storageRef);
  };

  const handleSave = async () => {
    if (!user?.uid) return;
    
    // Validaciones de seguridad
    if (!bio.trim() || !rate.trim() || !city.trim() || !neighborhood.trim()) {
      Alert.alert("Campos incompletos", "Por favor completa todos los campos obligatorios.");
      return;
    }
    
    const numericRate = parseFloat(rate);
    if (isNaN(numericRate) || numericRate < 0) {
      Alert.alert("Tarifa inválida", "La tarifa debe ser un número válido.");
      return;
    }

    setIsSaving(true);
    try {
      let photoUrlToSave = photo;
      if (photo) {
        photoUrlToSave = await uploadImageToStorage(photo);
      }

      // Guardado seguro en Firestore. Por las reglas, solo puede escribir en su propio UID
      await setDoc(doc(db, 'walkers', user.uid), {
        uid: user.uid,
        name: user.displayName || 'Paseador',
        photoURL: photoUrlToSave,
        bio: bio.trim(),
        rate: numericRate,
        country: country.trim(),
        state: state.trim(),
        city: city.trim(),
        neighborhood: neighborhood.trim(),
        updatedAt: new Date()
      }, { merge: true });

      Alert.alert("¡Éxito!", "Tu perfil profesional ha sido guardado de forma segura.");
    } catch (error: any) {
      console.error("Error guardando el perfil:", error);
      Alert.alert("Error", error.message || "No se pudo guardar el perfil. Verifica tu conexión y configuración.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-background justify-center items-center">
        <ActivityIndicator size="large" color="#F97316" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView contentContainerStyle={{ padding: 24 }} showsVerticalScrollIndicator={false}>
        <Text className="text-2xl font-bold text-gray-800 mb-6">Mi Perfil Profesional</Text>

        {/* Foto de perfil */}
        <View className="items-center mb-8">
          <TouchableOpacity onPress={pickImage} className="relative">
            <Image 
              source={{ uri: photo || 'https://i.pravatar.cc/300?u=walker' }} 
              className="w-32 h-32 rounded-full bg-gray-200"
            />
            <View className="absolute bottom-0 right-0 bg-primary p-2 rounded-full border-2 border-white">
              <Text className="text-white text-xs">📷</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Presentación */}
        <Text className="text-gray-600 font-semibold mb-2">Carta de Presentación *</Text>
        <TextInput
          multiline
          numberOfLines={4}
          value={bio}
          onChangeText={setBio}
          placeholder="Ej: Soy paseador certificado con 5 años de experiencia..."
          className="bg-surface border border-gray-200 rounded-xl p-4 text-gray-800 mb-6"
          style={{ textAlignVertical: 'top' }}
        />

        {/* Ubicación */}
        <Text className="text-gray-600 font-semibold mb-2">Zona de Servicio *</Text>
        <View className="flex-row justify-between mb-3">
          <TextInput value={country} onChangeText={setCountry} placeholder="País" className="bg-surface border border-gray-200 rounded-xl p-3 flex-1 mr-2" />
          <TextInput value={state} onChangeText={setState} placeholder="Estado" className="bg-surface border border-gray-200 rounded-xl p-3 flex-1 ml-2" />
        </View>
        <View className="flex-row justify-between mb-6">
          <TextInput value={city} onChangeText={setCity} placeholder="Ciudad" className="bg-surface border border-gray-200 rounded-xl p-3 flex-1 mr-2" />
          <TextInput value={neighborhood} onChangeText={setNeighborhood} placeholder="Colonia" className="bg-surface border border-gray-200 rounded-xl p-3 flex-1 ml-2" />
        </View>

        {/* Tarifa */}
        <Text className="text-gray-600 font-semibold mb-2">Tarifa por Mascota (1 hora) *</Text>
        <View className="flex-row items-center mb-8 bg-surface border border-gray-200 rounded-xl p-3">
          <Text className="text-lg font-bold text-gray-500 mr-2">$</Text>
          <TextInput 
            value={rate} 
            onChangeText={setRate} 
            keyboardType="numeric" 
            placeholder="15.00"
            className="flex-1 text-lg font-bold text-gray-800"
          />
          <Text className="text-gray-500">USD</Text>
        </View>

        <Button title="Guardar Cambios" onPress={handleSave} isLoading={isSaving} />
      </ScrollView>
    </SafeAreaView>
  );
};
