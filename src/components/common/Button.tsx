import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'accent' | 'danger' | 'outline';
  isLoading?: boolean;
  className?: string;
}

export const Button = ({ title, onPress, variant = 'primary', isLoading, className = '' }: ButtonProps) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'accent':
        return 'bg-accent';
      case 'danger':
        return 'bg-red-500';
      case 'outline':
        return 'bg-transparent border-2 border-primary';
      case 'primary':
      default:
        return 'bg-primary';
    }
  };

  const getTextColor = () => {
    if (variant === 'outline') return 'text-primary';
    return 'text-white';
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isLoading}
      className={`py-4 rounded-2xl items-center justify-center flex-row ${getVariantStyles()} ${className} ${isLoading ? 'opacity-70' : ''}`}
      style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 }}
    >
      {isLoading ? (
        <ActivityIndicator color={variant === 'outline' ? '#3B82F6' : '#FFF'} />
      ) : (
        <Text className={`font-bold text-lg ${getTextColor()}`}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};
