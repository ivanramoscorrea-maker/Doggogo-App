import React from 'react';
import { View, Text, FlatList, Image, SafeAreaView, TouchableOpacity, Linking, ScrollView } from 'react-native';
import { useAuth } from '../../context/AuthContext';

const WALKERS = [
  { id: '1', name: 'Carlos R.', rating: 4.9, walks: 120, price: 15, avatar: 'https://i.pravatar.cc/150?u=carlos' },
  { id: '2', name: 'Ana M.', rating: 5.0, walks: 85, price: 18, avatar: 'https://i.pravatar.cc/150?u=ana' },
  { id: '3', name: 'Jorge T.', rating: 4.7, walks: 42, price: 12, avatar: 'https://i.pravatar.cc/150?u=jorge' },
];

const LOCAL_ADS = [
  {
    id: 'ad1',
    title: 'Vet Care Plus 🏥',
    description: 'Vacunas y estética canina con 20% de descuento al mostrar la app DoggoGo.',
    cta: 'Llamar ahora',
    color: 'bg-blue-50',
    borderColor: 'border-blue-200'
  },
  {
    id: 'ad2',
    title: 'PetShop La Mascota Feliz 🦴',
    description: 'Alimento premium a domicilio sin costo de envío.',
    cta: 'Ver catálogo',
    color: 'bg-orange-50',
    borderColor: 'border-orange-200'
  }
];

export const DirectoryScreen = () => {
  const { signOut } = useAuth();

  const renderAdBanner = () => (
    <View className="mb-6">
      <Text className="text-gray-500 font-bold mb-3 uppercase text-xs tracking-wider">Patrocinadores Locales</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-6 px-6">
        {LOCAL_ADS.map((ad) => (
          <TouchableOpacity 
            key={ad.id} 
            className={`w-72 p-4 rounded-2xl border mr-4 shadow-sm ${ad.color} ${ad.borderColor}`}
          >
            <Text className="font-bold text-gray-800 text-lg mb-1">{ad.title}</Text>
            <Text className="text-gray-600 text-sm mb-3" numberOfLines={2}>{ad.description}</Text>
            <Text className="text-primary font-bold text-sm">{ad.cta} →</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderWalker = ({ item }: { item: typeof WALKERS[0] }) => (
    <View className="flex-row items-center bg-surface p-4 rounded-2xl mb-4 border border-gray-100 shadow-sm" style={{ elevation: 2 }}>
      <Image source={{ uri: item.avatar }} className="w-16 h-16 rounded-full bg-gray-200" />
      <View className="flex-1 ml-4">
        <Text className="text-lg font-bold text-gray-800">{item.name}</Text>
        <Text className="text-gray-500 text-sm">⭐ {item.rating} ({item.walks} paseos)</Text>
      </View>
      <View className="items-end">
        <Text className="text-lg font-bold text-primary">${item.price}</Text>
        <Text className="text-gray-400 text-xs">/hora</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="px-6 pt-6 pb-2 flex-row justify-between items-center">
        <Text className="text-2xl font-bold text-gray-800">Paseadores Cerca</Text>
        <TouchableOpacity onPress={signOut}>
          <Text className="text-gray-400 text-sm font-semibold">Salir</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={WALKERS}
        keyExtractor={(item) => item.id}
        renderItem={renderWalker}
        contentContainerStyle={{ padding: 24 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={renderAdBanner}
      />
    </SafeAreaView>
  );
};
