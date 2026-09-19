import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
// import MapView, { Marker } from 'react-native-maps'; // Comentado para evitar errores de enlace en web/simulador sin setup
import { Button } from '../../components/common/Button';

export const TrackingScreen = () => {
  const [isWalkActive, setIsWalkActive] = useState(true);

  const handlePanic = () => {
    Alert.alert(
      "¡EMERGENCIA!",
      "Se ha enviado una alerta crítica al paseador y se ha registrado en el sistema.",
      [{ text: "Entendido", style: "destructive" }]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-background relative">
      {/* Mock Map Area */}
      <View className="flex-1 bg-gray-300 items-center justify-center">
        {/* <MapView className="w-full h-full" /> */}
        <Text className="text-gray-500 font-bold text-lg mb-2">🗺 Mapa de Rastreo en Vivo (Mock)</Text>
        <Text className="text-gray-600">Conectado a Firebase RTDB...</Text>
      </View>

      {/* Floating Panel */}
      <View className="absolute bottom-6 left-6 right-6 bg-surface p-6 rounded-3xl shadow-lg" style={{ shadowColor: '#000', shadowOffset: { width: 0, height: -4 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 }}>
        <View className="flex-row justify-between items-center mb-4">
          <View>
            <Text className="text-gray-500 text-sm font-semibold">Distancia Recorrida</Text>
            <Text className="text-3xl font-bold text-primary">2.4 <Text className="text-lg">km</Text></Text>
          </View>
          <View className="items-end">
            <Text className="text-gray-500 text-sm font-semibold">Paseador</Text>
            <Text className="text-lg font-bold text-gray-800">Carlos M.</Text>
          </View>
        </View>

        {isWalkActive && (
          <TouchableOpacity 
            onPress={handlePanic}
            className="bg-red-500 py-4 rounded-2xl items-center flex-row justify-center mt-2"
          >
            <Text className="text-white font-bold text-lg">🚨 BOTÓN DE PÁNICO</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};
