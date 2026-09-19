import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/common/Button';

export const DashboardScreen = () => {
  const { signOut } = useAuth();
  const [activeTask, setActiveTask] = useState(false);
  const [iotStatus, setIotStatus] = useState({ battery: 85, signal: 'Fuerte' });

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView contentContainerStyle={{ padding: 24 }}>
        <View className="flex-row justify-between items-center mb-8">
          <View>
            <Text className="text-2xl font-bold text-gray-800">Panel de Control</Text>
            <Text className="text-gray-500">Hola, Paseador</Text>
          </View>
          <TouchableOpacity onPress={signOut} className="bg-gray-200 px-3 py-2 rounded-lg">
            <Text className="text-gray-700 font-semibold">Salir</Text>
          </TouchableOpacity>
        </View>

        {/* Status Metrics */}
        <View className="flex-row justify-between mb-8">
          <View className="bg-surface p-4 rounded-2xl flex-1 mr-2 items-center" style={{ elevation: 2 }}>
            <Text className="text-sm text-gray-500 mb-1">Ganancias (Hoy)</Text>
            <Text className="text-2xl font-bold text-accent">$45.00</Text>
          </View>
          <View className="bg-surface p-4 rounded-2xl flex-1 ml-2 items-center" style={{ elevation: 2 }}>
            <Text className="text-sm text-gray-500 mb-1">Reputación</Text>
            <Text className="text-2xl font-bold text-gray-800">⭐ 4.8</Text>
          </View>
        </View>

        {/* Current Task */}
        <Text className="text-xl font-bold text-gray-800 mb-4">Próximo Paseo</Text>
        <View className="bg-surface p-6 rounded-3xl mb-8" style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 3 }}>
          <Text className="text-lg font-bold text-gray-800 mb-1">Boby (Golden Retriever)</Text>
          <Text className="text-sm text-gray-500 mb-4">Dueño: Carlos Mendoza • 1.2 km</Text>
          
          <View className="bg-gray-50 p-4 rounded-xl mb-6">
            <Text className="text-sm font-semibold text-gray-700 mb-2">📡 Verificación de Hardware IoT</Text>
            <View className="flex-row justify-between mb-1">
              <Text className="text-gray-600">Batería del Collar GPS:</Text>
              <Text className="text-green-600 font-bold">{iotStatus.battery}%</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-gray-600">Conexión Celular:</Text>
              <Text className="text-green-600 font-bold">{iotStatus.signal}</Text>
            </View>
          </View>

          <Button 
            title={activeTask ? "Finalizar Paseo" : "Iniciar Paseo"} 
            variant={activeTask ? "danger" : "primary"}
            onPress={() => setActiveTask(!activeTask)}
          />
          {activeTask && (
            <Text className="text-center text-xs text-gray-400 mt-3">Comisión de $1.00 USD aplicable al finalizar.</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
