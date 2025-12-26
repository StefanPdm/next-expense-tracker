'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { themeColors } from '@/lib/theme-constants';

export default function Home() {
  const { theme } = useTheme();
  const colors = theme === 'dark' ? themeColors.dark : themeColors.light;

  return (
    <main className='flex-1'>
      {/* Hero Section */}
      <section className='relative overflow-hidden py-20 sm:py-32'>
        {/* Background Gradient */}
        <div
          className='absolute inset-0 -z-10'
          style={{
            background:
              theme === 'dark'
                ? 'radial-gradient(circle at 30% 50%, rgba(16, 185, 129, 0.15), transparent 50%), radial-gradient(circle at 70% 50%, rgba(20, 184, 166, 0.15), transparent 50%)'
                : 'radial-gradient(circle at 30% 50%, rgba(16, 185, 129, 0.08), transparent 50%), radial-gradient(circle at 70% 50%, rgba(20, 184, 166, 0.08), transparent 50%)',
          }}
        />

        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center'>
            {/* Badge */}
            <div
              className='inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 backdrop-blur-sm border shadow-lg'
              style={{
                backgroundColor: colors.cardBackground,
                borderColor: colors.border,
              }}>
              <span
                className='relative flex h-2 w-2'
                style={{ backgroundColor: colors.primary }}>
                <span
                  className='animate-ping absolute inline-flex h-full w-full rounded-full opacity-75'
                  style={{ backgroundColor: colors.primary }}></span>
                <span
                  className='relative inline-flex rounded-full h-2 w-2'
                  style={{ backgroundColor: colors.primary }}></span>
              </span>
              <span
                className='text-sm font-medium'
                style={{ color: colors.text }}>
                AI-Powered Financial Intelligence
              </span>
            </div>

            {/* Main Heading */}
            <h1
              className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight'
              style={{ color: colors.text }}>
              Smart Expense Tracking
              <br />
              <span className='bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 bg-clip-text text-transparent'>
                Powered by AI
              </span>
            </h1>

            {/* Subheading */}
            <p
              className='text-lg sm:text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed'
              style={{ color: colors.textSecondary }}>
              Take control of your finances with intelligent insights, automated categorization, and
              personalized recommendations. Your financial future starts here.
            </p>

            {/* CTA Buttons */}
            <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
              <button
                className='group relative overflow-hidden px-8 py-4 rounded-xl text-white font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 w-full sm:w-auto'
                style={{
                  background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryHover})`,
                }}>
                <span className='relative z-10 flex items-center justify-center gap-2'>
                  Get Started Free
                  <svg
                    className='w-5 h-5 group-hover:translate-x-1 transition-transform'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M13 7l5 5m0 0l-5 5m5-5H6'
                    />
                  </svg>
                </span>
                <div className='absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
              </button>

              <button
                className='group px-8 py-4 rounded-xl font-semibold text-lg backdrop-blur-sm border-2 transition-all duration-300 transform hover:scale-105 active:scale-95 w-full sm:w-auto'
                style={{
                  color: colors.text,
                  borderColor: colors.border,
                  backgroundColor: colors.cardBackground,
                }}>
                <span className='flex items-center justify-center gap-2'>
                  Watch Demo
                  <svg
                    className='w-5 h-5'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z'
                    />
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                  </svg>
                </span>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className='mt-16 flex flex-wrap justify-center items-center gap-8'>
              <div className='flex items-center gap-2'>
                <div className='flex -space-x-2'>
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className='w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold'
                      style={{
                        backgroundColor: colors.primary,
                        borderColor: colors.pageBackground,
                        color: 'white',
                      }}>
                      {i}
                    </div>
                  ))}
                </div>
                <span
                  className='text-sm font-medium'
                  style={{ color: colors.textSecondary }}>
                  10,000+ Happy Users
                </span>
              </div>

              <div className='flex items-center gap-2'>
                <div className='flex'>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg
                      key={i}
                      className='w-5 h-5'
                      style={{ color: colors.primary }}
                      fill='currentColor'
                      viewBox='0 0 20 20'>
                      <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                    </svg>
                  ))}
                </div>
                <span
                  className='text-sm font-medium'
                  style={{ color: colors.textSecondary }}>
                  4.9/5 Rating
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
