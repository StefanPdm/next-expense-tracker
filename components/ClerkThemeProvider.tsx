'use client';

import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { useTheme } from '@/contexts/ThemeContext';
import { themeColors, themeBorderRadius } from '@/lib/theme-constants';

interface ClerkThemeProviderProps {
  children: React.ReactNode;
}

export default function ClerkThemeProvider({ children }: ClerkThemeProviderProps) {
  const { theme } = useTheme();
  const colors = theme === 'dark' ? themeColors.dark : themeColors.light;

  return (
    <ClerkProvider
      appearance={{
        baseTheme: theme === 'dark' ? dark : undefined,
        variables: {
          colorPrimary: colors.primary,
          colorBackground: colors.background,
          colorInputBackground: colors.inputBackground,
          colorInputText: colors.inputText,
          borderRadius: themeBorderRadius,
        },
        elements: {
          formButtonPrimary: {
            backgroundColor: colors.primary,
            '&:hover': {
              backgroundColor: colors.primaryHover,
            },
          },
          card: {
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            backdropFilter: 'blur(16px)',
            border: `1px solid ${colors.border}`,
          },
          headerTitle: {
            color: colors.text,
          },
          headerSubtitle: {
            color: colors.textSecondary,
          },
          socialButtonsBlockButton: {
            border: `1px solid ${colors.border}`,
            backgroundColor: colors.cardBackground,
            backdropFilter: 'blur(8px)',
          },
          dividerLine: {
            backgroundColor: colors.border,
          },
          formFieldInput: {
            backgroundColor: colors.cardBackground,
            backdropFilter: 'blur(8px)',
            border: `1px solid ${colors.border}`,
          },
        },
      }}>
      {children}
    </ClerkProvider>
  );
}
