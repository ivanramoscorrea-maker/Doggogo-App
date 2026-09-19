import React, { useState } from 'react';
import { View, Text, SafeAreaView, TextInput, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/common/Button';

export const WalkerProfileScreen = () => {
  const { user } = useAuth();
  
  const [photo, setPhoto] = useState<string | null>(user?.photoURL || null);
  const [bio, setBio] = useState('Amante de los perros con 5 años de experiencia...');
  const [rate, setRate] = useState('15');
  
  // Ubicación
  const [country, setCountry] = useState('México');
  const [state, setState] = useState('CDMX');
  const [city, setCity] = useState('Cuauhtémoc');
  const [neighborhood, setNeighborhood] = useState('Condesa');

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
      // Aquí iría la lógica para subir a Firebase Storage
    }
  };

  const handleSave = () => {
    Alert.alert("Perfil Actualizado", "Tus datos han sido guardados exitosamente.");
    // Aquí iría la lógica para actualizar en Firestore la colección 'walkers'
  };

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
            <View className="absolute bottom-0 right-0 bg-primary p-2 rounded-full">
              <Text className="text-white text-xs">📷</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Presentación */}
        <Text className="text-gray-600 font-semibold mb-2">Carta de Presentación</Text>
        <TextInput
          multiline
          numberOfLines={4}
          value={bio}
          onChangeText={setBio}
          className="bg-surface border border-gray-200 rounded-xl p-4 text-gray-800 mb-6"
          style={{ textAlignVertical: 'top' }}
        />

        {/* Ubicación */}
        <Text className="text-gray-600 font-semibold mb-2">Zona de Servicio</Text>
        <View className="flex-row justify-between mb-3">
          <TextInput value={country} onChangeText={setCountry} placeholder="País" className="bg-surface border border-gray-200 rounded-xl p-3 flex-1 mr-2" />
          <TextInput value={state} onChangeText={setState} placeholder="Estado" className="bg-surface border border-gray-200 rounded-xl p-3 flex-1 ml-2" />
        </View>
        <View className="flex-row justify-between mb-6">
          <TextInput value={city} onChangeText={setCity} placeholder="Ciudad" className="bg-surface border border-gray-200 rounded-xl p-3 flex-1 mr-2" />
          <TextInput value={neighborhood} onChangeText={setNeighborhood} placeholder="Colonia" className="bg-surface border border-gray-200 rounded-xl p-3 flex-1 ml-2" />
        </View>

        {/* Tarifa */}
        <Text className="text-gray-600 font-semibold mb-2">Tarifa por Mascota (1 hora)</Text>
        <View className="flex-row items-center mb-8 bg-surface border border-gray-200 rounded-xl p-3">
          <Text className="text-lg font-bold text-gray-500 mr-2">$</Text>
          <TextInput 
            value={rate} 
            onChangeText={setRate} 
            keyboardType="numeric" 
            className="flex-1 text-lg font-bold text-gray-800"
          />
          <Text className="text-gray-500">USD</Text>
        </View>

        <Button title="Guardar Cambios" onPress={handleSave} />
      </ScrollView>
    </SafeAreaView>
  );
};
