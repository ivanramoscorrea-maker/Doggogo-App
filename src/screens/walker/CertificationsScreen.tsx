import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Linking } from 'react-native';

const COURSES = [
  {
    id: '1',
    title: 'Maestría en Caminata Urbana y Autocontrol 🦮',
    description: 'Enseña al paseador técnicas avanzadas para mantener una correa floja, transiciones de ritmo (lento/rápido) y paradas automáticas en esquinas y cruces peatonales.',
    utility: 'Mejora su enfoque, reduce la ansiedad por tirar de la correa y convierte el paseo en una actividad estructurada y segura.',
    application: 'Se implementa de forma natural en los primeros 20-30 minutos del recorrido, estableciendo jerarquía y calma antes de llegar a la zona de juego.',
    unlocked: true,
  },
  {
    id: '2',
    title: 'Guía de "Sniffari" (Estimulación Olfativa en Ruta) 👃🌳',
    description: 'Capacita al paseador en cómo estructurar caminatas donde el olfato sea el protagonista (permitir rastreos controlados en áreas de pasto y árboles).',
    utility: 'Los perros experimentan el mundo a través del olfato; 15 minutos de olfateo intenso equivalen al cansancio mental de una hora de caminata física, reduciendo conductas destructivas en casa.',
    application: 'Ideal para la fase intermedia del paseo, cuando llegan a parques o zonas verdes.',
    unlocked: false,
  },
  {
    id: '3',
    title: 'Desensibilización a Distractores Urbanos 🏙️🐕',
    description: 'Métodos para acostumbrar al perro a ignorar estímulos estresantes de la calle (motocicletas, bicicletas, ruidos fuertes, otros perros a distancia) sin asustarse ni reaccionar agresivamente.',
    utility: 'Aumenta su confianza, estabilidad emocional y capacidad de adaptación al entorno urbano.',
    application: 'Se practica de manera dinámica a lo largo de todo el trayecto urbano conforme se cruzan con diferentes elementos de la ciudad.',
    unlocked: false,
  },
  {
    id: '4',
    title: 'Seguridad Activa: Comando "Deja" y "Suelta" en Movimiento 🛑🦴',
    description: 'Entrenamiento rápido para lograr que el perro suelte inmediatamente objetos peligrosos que encuentre en el suelo (comida en mal estado, basura, plásticos) o ignore distracciones repentinas.',
    utility: 'Es una herramienta de supervivencia urbana que previene intoxicaciones o accidentes graves en la vía pública.',
    application: 'Se realizan pequeños ejercicios de práctica con premios en puntos clave del camino para mantener el reflejo alerta.',
    unlocked: false,
  }
];

export const CertificationsScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView contentContainerStyle={{ padding: 24 }} showsVerticalScrollIndicator={false}>
        <View className="mb-6">
          <Text className="text-2xl font-bold text-gray-800">Cursos de Certificación</Text>
          <Text className="text-gray-500 mt-2">Sube de nivel, mejora la calidad de tus paseos y aumenta tu tarifa con nuestras certificaciones magistrales exclusivas para Paseadores DoggoGo.</Text>
        </View>

        {COURSES.map((course) => (
          <View key={course.id} className="bg-surface rounded-2xl p-5 mb-4 shadow-sm border border-gray-100" style={{ elevation: 2 }}>
            <View className="flex-row justify-between items-start mb-3">
              <Text className="text-lg font-bold text-gray-800 flex-1 mr-2">{course.title}</Text>
              {course.unlocked ? (
                <View className="bg-green-100 px-2 py-1 rounded">
                  <Text className="text-green-700 text-xs font-bold">COMPLETADO</Text>
                </View>
              ) : (
                <View className="bg-orange-100 px-2 py-1 rounded">
                  <Text className="text-orange-700 text-xs font-bold">BLOQUEADO</Text>
                </View>
              )}
            </View>
            
            <Text className="text-gray-700 text-sm mb-3">
              <Text className="font-bold">¿En qué consiste?: </Text>
              {course.description}
            </Text>
            
            <Text className="text-gray-700 text-sm mb-3">
              <Text className="font-bold">Utilidad para el perro: </Text>
              {course.utility}
            </Text>
            
            <Text className="text-gray-700 text-sm mb-4">
              <Text className="font-bold">Aplicación en paseo de 2h: </Text>
              {course.application}
            </Text>

            {!course.unlocked && (
              <TouchableOpacity className="bg-primary py-3 rounded-xl items-center mt-2">
                <Text className="text-white font-bold">Desbloquear Curso ($499 MXN)</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
        
        <View className="h-10" />
      </ScrollView>
    </SafeAreaView>
  );
};
