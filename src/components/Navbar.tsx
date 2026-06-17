import React from 'react';
import { UserProfile, TabType } from '../types';
import { Dog, LogOut, Menu, Sparkles, User, UserCheck } from 'lucide-react';

interface NavbarProps {
  user: UserProfile;
  currentTab: TabType;
  setTab: (tab: TabType) => void;
  onLogout: () => void;
  isSidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function Navbar({ 
  user, 
  currentTab, 
  setTab, 
  onLogout, 
  isSidebarOpen, 
  setSidebarOpen 
}: NavbarProps) {
  const getTabTitle = () => {
    switch (currentTab) {
      case 'home': return '吉娃娃咖啡廳簡介';
      case 'reserve': return '吉娃娃線上訂位';
      case 'records': return '訂位記錄與許願池';
      case 'stars': return '駐店吉娃娃明星';
      default: return '吉娃娃咖啡廳';
    }
  };

  return (
    <header className="bg-white border-b border-[#E5E0D8] sticky top-0 z-40 px-4 py-3 shadow-xs" id="main_navbar">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        
        {/* Left Side: Mobile Menu Button + App Branding */}
        <div className="flex items-center gap-3">
          <button 
            id="mobile_menu_toggle"
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="p-2 text-[#8C6A5D] hover:bg-[#FAF7F2] rounded-lg lg:hidden transition-colors"
            title="選單"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setTab('home')} id="navbar_logo">
            <div className="w-10 h-10 bg-[#8C6A5D] rounded-xl flex items-center justify-center text-white shadow-xs">
              <Dog className="w-6 h-6" />
            </div>
            <div>
              <span className="font-extrabold text-lg text-[#5A463D] tracking-tight flex items-center gap-1.5">
                吉吉咖啡 
                <span className="text-[10px] px-1.5 py-0.5 bg-[#8C6A5D]/10 text-[#8C6A5D] font-bold rounded-full">
                  Chihuahua
                </span>
              </span>
              <p className="text-[10px] text-[#8C6A5D]/80 font-mono hidden sm:block">
                ★ 顫抖之美與咖啡的完美結合 ★
              </p>
            </div>
          </div>
        </div>

        {/* Center: Current Tab Indicator */}
        <div className="hidden md:flex items-center gap-1 px-3.5 py-1 bg-[#FAF7F2] rounded-full border border-[#E5E0D8]">
          <Sparkles className="w-3.5 h-3.5 text-[#D9A066]" />
          <span className="text-xs font-bold text-[#8C6A5D]">{getTabTitle()}</span>
        </div>

        {/* Right Side: Logged-in User Information & Logout */}
        <div className="flex items-center gap-3" id="navbar_user_box">
          <div className="flex flex-col items-end text-sm">
            <div className="flex items-center gap-1.5 font-semibold text-[#5A463D]">
              {user.isMock ? (
                <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
              ) : (
                <span className="w-2 h-2 rounded-full bg-[#D9A066] animate-pulse"></span>
              )}
              <span className="text-xs max-w-[120px] sm:max-w-[200px] truncate" title={user.email || ''}>
                {user.email || '親愛的吉娃娃粉絲'}
              </span>
            </div>
            <span className="text-[10px] text-[#8C6A5D]/75">
              {user.isMock ? '遊客體驗帳號' : 'Firebase 會員'}
            </span>
          </div>

          <div className="h-8 w-px bg-[#E5E0D8] hidden sm:block"></div>

          <button
            id="navbar_logout_btn"
            onClick={onLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FAF7F2] hover:bg-[#8C6A5D]/10 text-[#8C6A5D] text-xs font-bold rounded-lg border border-[#E5E0D8] transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">登出</span>
          </button>
        </div>

      </div>
    </header>
  );
}
