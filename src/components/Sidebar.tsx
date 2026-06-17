import React from 'react';
import { TabType, UserProfile } from '../types';
import { 
  Home, 
  CalendarClock, 
  FolderHeart, 
  HelpCircle, 
  UsersRound, 
  X, 
  XCircle,
  Clock,
  CupSoda
} from 'lucide-react';

interface SidebarProps {
  currentTab: TabType;
  setTab: (tab: TabType) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  user: UserProfile;
}

export default function Sidebar({ 
  currentTab, 
  setTab, 
  isOpen, 
  setIsOpen,
  user
}: SidebarProps) {
  
  const menuItems = [
    {
      id: 'home' as TabType,
      label: '吉娃娃咖啡廳簡介',
      description: '環境、咖啡與消費規則',
      icon: Home,
      color: 'text-[#8C6A5D] bg-white'
    },
    {
      id: 'reserve' as TabType,
      label: '吉娃娃線上訂位',
      description: '填寫人數時間與祈福許願',
      icon: CalendarClock,
      color: 'text-[#D9A066] bg-white'
    },
    {
      id: 'records' as TabType,
      label: '訂位紀錄與許願池',
      description: '檢視和修改您的預約紀錄',
      icon: FolderHeart,
      color: 'text-[#8C6A5D] bg-white'
    },
    {
      id: 'stars' as TabType,
      label: '駐店吉娃娃明星',
      description: '看看今天是哪位大吉值班',
      icon: UsersRound,
      color: 'text-[#D9A066] bg-white'
    }
  ];

  const handleTabClick = (tabId: TabType) => {
    setTab(tabId);
    setIsOpen(false); // Close sidebar on mobile after clicking
  };

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden cursor-pointer"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar container */}
      <aside 
        id="app_sidebar"
        className={`fixed inset-y-0 left-0 w-72 bg-[#EDE8E1] border-r border-[#E5E0D8] z-50 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static transition-transform duration-300 ease-in-out flex flex-col`}
      >
        {/* Mobile Header in Sidebar */}
        <div className="p-4 border-b border-[#E5E0D8] lg:hidden flex items-center justify-between bg-white/40">
          <span className="font-bold text-[#5A463D] flex items-center gap-1.5 text-sm font-serif">
            吉吉咖啡 | Chihuahua Cafe
          </span>
          <button 
            id="close_sidebar_btn"
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-lg hover:bg-white/50 text-[#8C6A5D] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cafe Mascot Card inside Sidebar */}
        <div className="p-5 bg-white/40 border-b border-[#E5E0D8]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#D9A066] shrink-0 bg-[#F5E6D3] flex items-center justify-center font-bold text-xl">
              🐕
            </div>
            <div>
              <h3 className="font-extrabold text-[#5A463D] text-sm font-serif">店長 吉太 (Kita)</h3>
              <p className="text-[10px] text-[#8C6A5D] bg-[#8C6A5D]/10 inline-block px-1.5 py-0.5 rounded-md mt-1 font-bold">
                「今日主管：極速顫抖」
              </p>
            </div>
          </div>
        </div>

        {/* Operations navigation items */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <p className="text-[10px] uppercase tracking-wider text-[#8C6A5D] font-extrabold mb-3 px-2">
            主選單目錄
          </p>
          
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                id={`sidebar_tab_${item.id}`}
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`w-full flex items-start gap-3 p-3 rounded-xl transition-all text-left ${
                  isActive 
                    ? 'bg-[#8C6A5D] text-white shadow-sm font-bold ring-2 ring-[#8C6A5D]/20' 
                    : 'text-[#4A3E38] hover:bg-white/40 hover:text-[#5A463D]'
                }`}
              >
                <div className={`p-2 rounded-lg shrink-0 ${
                  isActive ? 'bg-white/20 text-white' : `${item.color} border border-[#E5E0D8]`
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="truncate">
                  <p className={`font-bold text-sm ${isActive ? 'text-white' : 'text-[#4A3E38]'}`}>
                    {item.label}
                  </p>
                  <p className={`text-[10px] ${isActive ? 'text-[#FAF7F2]/80' : 'text-[#4A3E38]/60'} truncate`}>
                    {item.description}
                  </p>
                </div>
              </button>
            );
          })}
        </nav>

        {/* Footer Area with operational status */}
        <div className="p-4 border-t border-[#E5E0D8] bg-white/20 text-xs text-[#4A3E38]/80 space-y-2">
          <div className="flex items-center justify-between text-[10px] text-[#8C6A5D] font-bold">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#D9A066]" />
              營業時間：10:00 - 20:00
            </span>
          </div>
          <div className="flex items-center gap-1.5 bg-[#8C6A5D]/10 p-2.5 rounded-xl border border-[#8C6A5D]/20">
            <CupSoda className="w-4 h-4 text-[#8C6A5D] shrink-0" />
            <div className="text-[10px] text-[#5A463D] leading-tight">
              <strong>吉客規則：</strong> 低消一杯飲品，限時 90 分鐘，吉娃娃顫抖時請勿喧嘩。
            </div>
          </div>
          <p className="text-[9px] text-center text-[#4A3E38]/40">
            © 2026 Chihuahua Cafe Inc.
          </p>
        </div>
      </aside>
    </>
  );
}
