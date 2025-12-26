'use client';

import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';
import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { themeColors } from '@/lib/theme-constants';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme } = useTheme();
  const colors = theme === 'dark' ? themeColors.dark : themeColors.light;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className='sticky top-0 z-50 backdrop-blur-xl border-b shadow-lg'
      style={{
        backgroundColor: theme === 'dark' ? 'rgba(31, 41, 55, 0.95)' : 'rgba(255, 255, 255, 0.95)',
        borderColor: colors.border,
        boxShadow: theme === 'dark' 
          ? '0 10px 15px -3px rgba(0, 0, 0, 0.3)' 
          : '0 10px 15px -3px rgba(0, 0, 0, 0.05)',
      }}>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-14 sm:h-16'>
          {/* Logo Section */}
          <div className='flex items-center'>
            <Link
              href='/'
              className='flex items-center gap-2 sm:gap-3 shrink-0 group transition-all duration-300 hover:scale-105'
              onClick={closeMobileMenu}>
              <div className='w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-linear-to-br from-emerald-500 via-green-500 to-teal-500 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:rotate-3'>
                <span className='text-white text-xs sm:text-sm md:text-lg font-bold'>💰</span>
              </div>
              <span className='text-sm sm:text-base md:text-lg lg:text-xl font-bold bg-linear-to-r from-emerald-600 via-green-500 to-teal-500 bg-clip-text text-transparent'>
                <span className='hidden sm:inline'>ExpenseTracker AI</span>
                <span className='sm:hidden'>ExpenseTracker</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className='hidden md:flex items-center space-x-1'>
            <Link
              href='/'
              className='relative px-3 lg:px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 group hover:bg-emerald-50/50'
              style={{ color: colors.text }}>
              <span className='relative z-10'>Home</span>
              <div 
                className='absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200'
                style={{ 
                  background: theme === 'dark' 
                    ? 'rgba(16, 185, 129, 0.2)' 
                    : 'rgba(16, 185, 129, 0.1)' 
                }}></div>
            </Link>

            <Link
              href='/about'
              className='relative px-3 lg:px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 group hover:bg-emerald-50/50'
              style={{ color: colors.text }}>
              <span className='relative z-10'>About</span>
              <div 
                className='absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200'
                style={{ 
                  background: theme === 'dark' 
                    ? 'rgba(16, 185, 129, 0.2)' 
                    : 'rgba(16, 185, 129, 0.1)' 
                }}></div>
            </Link>

            <Link
              href='/contact'
              className='relative px-3 lg:px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 group hover:bg-emerald-50/50'
              style={{ color: colors.text }}>
              <span className='relative z-10'>Contact</span>
              <div 
                className='absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200'
                style={{ 
                  background: theme === 'dark' 
                    ? 'rgba(16, 185, 129, 0.2)' 
                    : 'rgba(16, 185, 129, 0.1)' 
                }}></div>
            </Link>
          </div>

          {/* Right Section */}
          <div className='flex items-center space-x-1 sm:space-x-2'>
            {/* Theme Toggle */}
            <div className='p-0.5 sm:p-1 flex'>
              <ThemeToggle />
            </div>

            {/* Authentication - Desktop */}
            <div className='hidden sm:block'>
              <SignedOut>
                <SignInButton>
                  <button 
                    className='relative overflow-hidden text-white px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95'
                    style={{
                      background: 'linear-gradient(to right, #10b981, #14b8a6)',
                    }}>
                    <div className='relative z-10 flex items-center gap-1 sm:gap-2'>
                      <span>Sign In</span>
                      <svg
                        className='w-3 h-3 sm:w-4 sm:h-4'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'>
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1'
                        />
                      </svg>
                    </div>
                    <div className='absolute inset-0 bg-linear-to-r from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300'></div>
                  </button>
                </SignInButton>
              </SignedOut>

              <SignedIn>
                <div
                  className='flex p-0.5 sm:p-1 rounded-lg sm:rounded-xl backdrop-blur-sm'
                  style={{
                    background: theme === 'dark' 
                      ? 'linear-gradient(to right, rgba(16, 185, 129, 0.2), rgba(20, 184, 166, 0.2))' 
                      : 'linear-gradient(to right, rgba(16, 185, 129, 0.1), rgba(20, 184, 166, 0.1))',
                    border: `1px solid ${colors.border}`,
                  }}>
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox:
                          'w-6 h-6 sm:w-8 sm:h-8 hover:scale-110 transition-transform duration-200',
                        userButtonBox: 'flex items-center justify-center',
                      },
                    }}
                  />
                </div>
              </SignedIn>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className='md:hidden p-1.5 sm:p-2 rounded-lg sm:rounded-xl transition-all duration-200 active:scale-95'
              style={{ color: colors.text }}
              aria-label='Toggle mobile menu'>
              <svg
                className={`w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-200 ${
                  isMobileMenuOpen ? 'rotate-90' : ''
                }`}
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'>
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                ) : (
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M4 6h16M4 12h16M4 18h16'
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? 'max-h-96 opacity-100 pb-3 sm:pb-4'
              : 'max-h-0 opacity-0 overflow-hidden'
          }`}>
          <div
            className='px-2 pt-2 pb-3 space-y-1 backdrop-blur-sm rounded-xl mt-2 shadow-lg'
            style={{
              backgroundColor: colors.cardBackground,
              border: `1px solid ${colors.border}`,
            }}>
            {/* Mobile Navigation Links */}
            <Link
              href='/'
              className='flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 active:scale-95'
              style={{ color: colors.text }}
              onClick={closeMobileMenu}>
              <span className='text-base'>🏠</span>
              <span>Home</span>
            </Link>
            <Link
              href='/about'
              className='flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 active:scale-95'
              style={{ color: colors.text }}
              onClick={closeMobileMenu}>
              <span className='text-base'>ℹ️</span>
              <span>About</span>
            </Link>
            <Link
              href='/contact'
              className='flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 active:scale-95'
              style={{ color: colors.text }}
              onClick={closeMobileMenu}>
              <span className='text-base'>📞</span>
              <span>Contact</span>
            </Link>

            {/* Mobile Authentication */}
            <div
              className={`pt-3 border-t ${
                theme === 'dark' ? 'border-gray-600/50' : 'border-gray-200/50'
              }`}>
              <SignedOut>
                <SignInButton>
                  <button
                    className='w-full bg-linear-to-r from-emerald-500 via-green-500 to-teal-500 hover:from-emerald-600 hover:via-green-600 hover:to-teal-600 text-white px-4 py-3 rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 active:scale-95'
                    onClick={closeMobileMenu}>
                    <span>Sign In</span>
                    <svg
                      className='w-4 h-4'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1'
                      />
                    </svg>
                  </button>
                </SignInButton>
              </SignedOut>

              <SignedIn>
                <div
                  className={`flex items-center justify-center p-3 rounded-xl backdrop-blur-sm border ${
                    theme === 'dark'
                      ? 'bg-linear-to-r from-emerald-900/20 to-green-900/20 border-emerald-700/30'
                      : 'bg-linear-to-r from-emerald-100/50 to-green-100/50 border-emerald-200/30'
                  }`}>
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox: 'w-8 h-8 hover:scale-110 transition-transform duration-200',
                        userButtonBox: 'flex items-center justify-center',
                      },
                    }}
                  />
                </div>
              </SignedIn>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}