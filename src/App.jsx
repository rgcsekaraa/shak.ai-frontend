import React from 'react';
import Footer from './components/Footer';
import Translator from './components/Translator';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-grow">
        <Translator />
      </main>
      <Footer />
    </div>
  );
}

export default App;
