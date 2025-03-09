import { useState } from 'react';
import { MainLayout } from './shared/layouts/MainLayout';
import { Navigation } from './shared/components/Navigation';
import { HabitsPage } from './domains/habits/components/HabitsPage';
import { GraphicsPage } from './domains/graphics/components/GraphicsPage';

function App() {
  const [activePage, setActivePage] = useState<'habits' | 'graphics'>('habits');

  return (
    <MainLayout>
      <Navigation activePage={activePage} onNavigate={setActivePage} />
      
      {activePage === 'habits' ? (
        <HabitsPage />
      ) : (
        <GraphicsPage />
      )}
    </MainLayout>
  );
}

export default App;