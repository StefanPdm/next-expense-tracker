'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { themeColors } from '@/lib/theme-constants';
import { ReactNode } from 'react';

interface BodyWrapperProps {
  children: ReactNode;
}

export default function BodyWrapper({ children }: BodyWrapperProps) {
  const { theme } = useTheme();
  const colors = theme === 'dark' ? themeColors.dark : themeColors.light;

  return (
    <div
      className='min-h-screen transition-colors duration-300'
      style={{
        backgroundColor: colors.background,
        color: colors.text,
      }}>
      {children}
    </div>
  );
}