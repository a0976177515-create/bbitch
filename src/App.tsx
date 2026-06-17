import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, testConnection } from './firebase';
import { UserProfile, TabType } from './types';

// Import newly created modular components
import AuthScreen from './components/AuthScreen';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ChihuahuaHome from './components/ChihuahuaHome';
import ChihuahuaGallery from './components/ChihuahuaGallery';
import ReservationForm from './components/ReservationForm';
import ReservationList from './components/ReservationList';

import { Sparkles, Dog, Activity } from 'lucide-react';

export default function App() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [authInitialized, setAuthInitialized] = useState(false);
  const [currentTab, setTab] = useState<TabType>('home');
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Initialize and check Firestore connection on boot
  useEffect(() => {
    testConnection();
    
    // Subscribe to Firebase Auth and bind state
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
        });
      } else {
        // Only clear if we didn't log in as a sandbox mock-user
        setUser((prev) => (prev?.isMock ? prev : null));
      }
      setAuthInitialized(true);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Firebase Signout error:", err);
    }
    setUser(null);
    setTab('home');
  };

  const handleAuthSuccess = (authenticatedUser: UserProfile) => {
    setUser(authenticatedUser);
  };

  // If Auth states have not been read from Firebase yet, show a beautiful loader
  if (!authInitialized) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex flex-col justify-center items-center p-6 gap-3" id="app_loading_screen">
        <div className="w-14 h-14 bg-[#8C6A5D] rounded-2xl flex items-center justify-center text-white text-3xl animate-bounce shadow-md">
          🐶
        </div>
        <p className="text-sm font-bold text-[#8C6A5D] animate-pulse tracking-wide">
          吉娃娃咖啡廳專機啟動中...
        </p>
      </div>
    );
  }

  // If user is not logged in, render the login/signup screen
  if (!user) {
    return <AuthScreen onAuthSuccess={handleAuthSuccess} />;
  }

  // Render the dashboard grid layout once logged in
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#4A3E38] flex flex-col font-sans" id="app_root_dashboard">
      
      {/* Navbar Container */}
      <Navbar 
        user={user}
        currentTab={currentTab}
        setTab={setTab}
        onLogout={handleLogout}
        isSidebarOpen={isSidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Core Body */}
      <div className="flex-1 max-w-7xl mx-auto w-full flex flex-col lg:flex-row min-h-[calc(100vh-64px)]">
        
        {/* Sidebar Container */}
        <Sidebar 
          currentTab={currentTab}
          setTab={setTab}
          isOpen={isSidebarOpen}
          setIsOpen={setSidebarOpen}
          user={user}
        />

        {/* Content Panel Area */}
        <main className="flex-1 p-4 md:p-8 overflow-x-hidden min-w-0" id="main_content_pane">
          <div className="max-w-4xl mx-auto space-y-6">
            
            {/* Conditional Views Router */}
            {currentTab === 'home' && (
              <ChihuahuaHome setTab={setTab} />
            )}

            {currentTab === 'reserve' && (
              <ReservationForm user={user} onSuccess={() => setTab('records')} />
            )}

            {currentTab === 'records' && (
              <ReservationList user={user} />
            )}

            {currentTab === 'stars' && (
              <ChihuahuaGallery />
            )}

          </div>
        </main>

      </div>
    </div>
  );
}
