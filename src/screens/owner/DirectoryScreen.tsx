import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, SafeAreaView, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../config/firebase';
import { collection, query, getDocs, limit, orderBy } from 'firebase/firestore';

interface WalkerData {
  uid: string;
  name: string;
  photoURL?: string;
  rate?: number;
  city?: string;
  neighborhood?: string;
  bio?: string;
  // Estos datos se calcularán de las reseñas más adelante en producción
  rating?: number;
  walks?: number;
}

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
  const [walkers, setWalkers] = useState<WalkerData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWalkers = async () => {
      try {
        const walkersRef = collection(db, 'walkers');
        const q = query(walkersRef, limit(20)); // Limitamos por rendimiento
        const querySnapshot = await getDocs(q);
        
        const walkersList: WalkerData[] = [];
        querySnapshot.forEach((doc) => {
          walkersList.push({ uid: doc.id, ...doc.data() } as WalkerData);
        });
        
        setWalkers(walkersList);
      } catch (error) {
        console.error("Error obteniendo paseadores: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWalkers();
  }, []);

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
      <Text className="text-2xl font-bold text-gray-800 mt-6 mb-2">Paseadores Cerca</Text>
    </View>
  );

  const renderWalker = ({ item }: { item: WalkerData }) => (
    <TouchableOpacity className="flex-row items-center bg-surface p-4 rounded-2xl mb-4 border border-gray-100 shadow-sm" style={{ elevation: 2 }}>
      <Image 
        source={{ uri: item.photoURL || 'https://i.pravatar.cc/150?u=' + item.uid }} 
        className="w-16 h-16 rounded-full bg-gray-200" 
      />
      <View className="flex-1 ml-4">
        <Text className="text-lg font-bold text-gray-800">{item.name || 'Paseador'}</Text>
        <Text className="text-gray-500 text-xs mb-1" numberOfLines={1}>{item.neighborhood || 'Zona no definida'}{item.city ? `, ${item.city}` : ''}</Text>
        <Text className="text-orange-500 text-sm font-semibold">
          ⭐ {item.rating || '5.0'} ({item.walks || '0'} paseos)
        </Text>
      </View>
      <View className="items-end">
        <Text className="text-lg font-bold text-primary">${item.rate || 0}</Text>
        <Text className="text-gray-400 text-xs">/hora</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="px-6 pt-6 pb-2 flex-row justify-between items-center">
        <Text className="text-3xl font-bold text-primary">DoggoGo</Text>
        <TouchableOpacity onPress={signOut}>
          <Text className="text-gray-400 text-sm font-semibold">Salir</Text>
        </TouchableOpacity>
      </View>
      
      {isLoading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#F97316" />
        </View>
      ) : (
        <FlatList
          data={walkers}
          keyExtractor={(item) => item.uid}
          renderItem={renderWalker}
          contentContainerStyle={{ padding: 24 }}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={renderAdBanner}
          ListEmptyComponent={
            <Text className="text-center text-gray-500 mt-10">Aún no hay paseadores registrados en tu zona.</Text>
          }
        />
      )}
    </SafeAreaView>
  );
};
