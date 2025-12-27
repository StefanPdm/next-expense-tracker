import { currentUser } from '@clerk/nextjs/server';
import { themeColors } from '@/lib/theme-constants';
import Guest from '@/components/Guest';

export default async function Home() {
  const user = await currentUser();

  if (!user) {
    return (
      <div>
        <Guest />
      </div>
    );
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <h1 style={{ color: themeColors.light.primary }}>Welcome to the Home Page</h1>
    </div>
  );
}
