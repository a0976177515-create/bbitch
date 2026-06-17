import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, limit, deleteDoc, doc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { UserProfile, Reservation } from '../types';
import { 
  FolderHeart, 
  Trash2, 
  Sparkles, 
  Users, 
  Calendar, 
  Clock, 
  MessageSquare, 
  Shuffle, 
  ShieldAlert,
  Search,
  Filter,
  RefreshCw,
  Dog
} from 'lucide-react';

interface ReservationListProps {
  user: UserProfile;
}

export default function ReservationList({ user }: ReservationListProps) {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorInfo, setErrorInfo] = useState<string | null>(null);
  
  // High fidelity filtering options
  const [showOnlyMine, setShowOnlyMine] = useState(false);
  const [searchWord, setSearchWord] = useState('');

  // Fetch Firestore reservations in real time as instructed!
  useEffect(() => {
    setLoading(true);
    setErrorInfo(null);

    const collectionPath = 'reservations';
    const reservationsCollection = collection(db, collectionPath);
    
    // Default Query: Retrieve latest 50 records in real time
    const q = query(reservationsCollection, orderBy('createdAt', 'desc'), limit(50));

    // Active real-time subscription with error callback (CRITICAL in Firebase Integration rule 3)
    const unsubscribe = onSnapshot(
      q, 
      (snapshot) => {
        const list: Reservation[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          list.push({
            id: docSnap.id,
            name: data.name || '神秘吉娃娃粉絲',
            phone: data.phone || '',
            guests: Number(data.guests) || 1,
            date: data.date || '',
            time: data.time || '',
            note: data.note || '',
            userId: data.userId || '',
            createdAt: data.createdAt ? (data.createdAt.seconds ? new Date(data.createdAt.seconds * 1000).toLocaleString() : String(data.createdAt)) : ''
          });
        });
        setReservations(list);
        setLoading(false);
      }, 
      (error) => {
        // Strict adherence to System Rule 3: Error logging to JSON
        try {
          handleFirestoreError(error, OperationType.GET, collectionPath);
        } catch (wrappedError: any) {
          setErrorInfo(wrappedError.message);
        }
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Helper delete item for convenient testing
  const handleDelete = async (id: string) => {
    if (!window.confirm('您確定要取消或刪除此筆吉娃娃訂位與願望記錄嗎？')) {
      return;
    }
    const collectionPath = 'reservations';
    try {
      if (user.isMock) {
        // Local simulation delete
        const saved: Reservation[] = JSON.parse(localStorage.getItem('chihuahua_local_bookings') || '[]');
        const updated = saved.filter(item => item.id !== id);
        localStorage.setItem('chihuahua_local_bookings', JSON.stringify(updated));
        
        // Update local state to match UI
        setReservations(prev => prev.filter(item => item.id !== id));
      } else {
        await deleteDoc(doc(db, collectionPath, id));
      }
    } catch (err: any) {
      console.error("Deleting reservation error:", err);
      alert(`刪除失敗： ${err.message}`);
    }
  };

  // Merge Firestore reservations with Local storage mock bookings if the user acts in mock session
  const getDisplayReservations = () => {
    let combined = [...reservations];
    
    if (user.isMock) {
      const localS: Reservation[] = JSON.parse(localStorage.getItem('chihuahua_local_bookings') || '[]');
      // unique combination by id
      const ids = new Set(combined.map(c => c.id));
      localS.forEach((loc) => {
        if (!ids.has(loc.id)) {
          combined.unshift(loc);
        }
      });
    }

    // Filter by Mine toggle
    if (showOnlyMine) {
      combined = combined.filter(res => res.userId === user.uid);
    }

    // Filter by search word
    if (searchWord.trim()) {
      const lower = searchWord.toLowerCase();
      combined = combined.filter(res => 
        res.name.toLowerCase().includes(lower) || 
        res.note.toLowerCase().includes(lower) ||
        res.phone.includes(lower)
      );
    }

    return combined;
  };

  const displayList = getDisplayReservations();

  return (
    <div className="space-y-6" id="records_view_wrapper">
      
      {/* Header and tools panel */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white p-5 rounded-2xl border border-[#E5E0D8] shadow-xs" id="records_header_box">
        <div>
          <h2 className="text-xl font-bold font-serif text-[#5A463D] flex items-center gap-2">
            <FolderHeart className="w-5.5 h-5.5 text-[#8C6A5D]" />
            線上願望許願池與訂位名冊 一覽
          </h2>
          <p className="text-xs text-[#4A3E38]/75 mt-1">目前由 Firestore 唯美即時同步：顯示所有已被送出登載與儲存的資料</p>
        </div>

        {/* Sync loading spinner */}
        <div className="flex items-center gap-2 text-xs font-bold text-[#8C6A5D] bg-[#8C6A5D]/10 px-3.5 py-1.5 rounded-xl border border-[#8C6A5D]/20 w-fit shrink-0">
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          {loading ? '即時雲端同步中...' : '已連線雲端 (即時)'}
        </div>
      </div>

      {/* Grid Filter Actions */}
      <div className="bg-white p-4 rounded-2xl border border-[#E5E0D8] flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 shadow-xs" id="filter_control_panel">
        
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#4A3E38]/50 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            id="records_search_input"
            type="text"
            placeholder="搜尋大名、電話或備註欄位..."
            value={searchWord}
            onChange={(e) => setSearchWord(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#FAF7F2] text-xs rounded-xl border border-[#E5E0D8] focus:ring-2 focus:ring-[#D9A066] focus:border-[#D9A066] focus:outline-none text-[#4A3E38]"
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2 shrink-0">
          <button
            id="filter_all_btn"
            onClick={() => setShowOnlyMine(false)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition-colors flex items-center gap-1.5 ${
              !showOnlyMine 
                ? 'bg-[#8C6A5D] text-white border-transparent shadow-xs' 
                : 'bg-white text-[#4A3E38] hover:bg-[#FAF7F2] border-[#E5E0D8]'
            }`}
          >
            <Shuffle className="w-3.5 h-3.5" />
            全部許願預約
          </button>
          
          <button
            id="filter_mine_btn"
            onClick={() => setShowOnlyMine(true)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition-colors flex items-center gap-1.5 ${
              showOnlyMine 
                ? 'bg-[#8C6A5D] text-white border-transparent shadow-xs' 
                : 'bg-white text-[#4A3E38] hover:bg-[#FAF7F2] border-[#E5E0D8]'
            }`}
          >
            <Filter className="w-3.5 h-3.5" />
            僅看我的預訂
          </button>
        </div>

      </div>

      {/* Error Info Box if rule failure */}
      {errorInfo && (
        <div className="p-4 bg-rose-50 text-rose-800 text-xs rounded-2xl border border-rose-200 space-y-2" id="db_error_info">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
            <strong className="font-extrabold text-sm">🔒 讀取權限或連接錯誤 (符合系統 JSON 日誌協定)</strong>
          </div>
          <p className="font-mono bg-white/60 p-2.5 rounded-lg text-[10px] whitespace-pre-wrap break-all leading-relaxed text-rose-900">
            {errorInfo}
          </p>
          <p className="leading-normal">
            <strong>可能原因：</strong> 如果您使用的是所有人都可以讀寫的 Firestore，請檢查您 Firebase 的規則配置與 API 金鑰網域是否已設定正確。或者您也可以點擊下方「登出」後，切換到<strong>「快速遊客測試模式」</strong>體驗本地存取機制。
          </p>
        </div>
      )}

      {/* Booking Grid rendering Cards */}
      {displayList.length === 0 ? (
        <div className="bg-white rounded-3xl border border-[#E5E0D8] p-12 text-center space-y-3" id="records_empty_state">
          <div className="text-4xl animate-pulse">🪵☕️</div>
          <p className="font-bold text-[#5A463D] text-sm">目前沒有找到任何符合的訂位與願望卡</p>
          <p className="text-xs text-[#4A3E38]/50">趕快前往「吉娃娃線上訂位」填寫表單送出第一筆資料吧！</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id="records_cards_grid">
          {displayList.map((res) => {
            const isOwnerObj = res.userId === user.uid;
            
            return (
              <div 
                key={res.id} 
                className="bg-white rounded-2xl border border-[#E5E0D8] shadow-xs p-5 hover:border-[#D9A066] transition-all flex flex-col justify-between space-y-4"
                id={`record_card_${res.id}`}
              >
                {/* Top info and delete */}
                <div className="space-y-1">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-1.5 font-sans">
                      <span className="text-[#5A463D] font-bold font-serif text-sm">{res.name}</span>
                      <span className="text-[9px] px-1.5 py-0.5 bg-[#FAF7F2] text-[#8C6A5D] border border-[#E5E0D8] rounded-full font-bold">
                        {isOwnerObj ? '您的紀錄' : '其他粉絲'}
                      </span>
                    </div>

                    {/* Delete and Cancel reservation */}
                    {(isOwnerObj || user.isMock) && (
                      <button
                        id={`delete_btn_${res.id}`}
                        onClick={() => res.id && handleDelete(res.id)}
                        className="p-1 hover:bg-rose-50 text-rose-500 rounded-md transition-colors"
                        title="取消預訂"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  
                  {/* Phone display for owners or fallback */}
                  <p className="text-[10px] text-[#4A3E38]/60 font-mono">
                    聯絡電話: {res.phone ? (isOwnerObj ? res.phone : `${res.phone.substring(0, 4)}****${res.phone.slice(-3)}`) : '未留'}
                  </p>
                </div>

                {/* Grid stats */}
                <div className="grid grid-cols-3 gap-2 bg-[#FAF7F2] p-2.5 rounded-xl border border-[#E5E0D8] text-[11px] text-[#4A3E38] font-bold">
                  <div className="flex flex-col items-center justify-center p-1 border-r border-[#E5E0D8]">
                    <Users className="w-3.5 h-3.5 text-[#8C6A5D] mb-1" />
                    <span>{res.guests} 貴賓</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-1 border-r border-[#E5E0D8]">
                    <Calendar className="w-3.5 h-3.5 text-[#8C6A5D] mb-1" />
                    <span className="truncate max-w-full">{res.date}</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-1">
                    <Clock className="w-3.5 h-3.5 text-[#8C6A5D] mb-1" />
                    <span>{res.time}</span>
                  </div>
                </div>

                {/* Message block holding requested custom note text input */}
                <div className="space-y-1.5 bg-[#FAF7F2] p-3 rounded-xl border border-[#E5E0D8] flex-1">
                  <span className="text-[9px] text-[#8C6A5D] uppercase tracking-wider font-extrabold flex items-center gap-1.5">
                    <MessageSquare className="w-3 h-3" />
                    許願備註 / 想說的話
                  </span>
                  <p className="text-xs text-[#4A3E38] leading-relaxed font-sans font-medium whitespace-pre-wrap break-all">
                    {res.note}
                  </p>
                </div>

                {/* Bottom datetime stamp */}
                <div className="flex justify-between items-center text-[10px] text-[#4A3E38]/50">
                  <span className="font-mono text-[9px]">同步系統: Firestore</span>
                  <span>{res.createdAt ? String(res.createdAt) : '即時上傳中'}</span>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
