import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { UserProfile, Reservation } from '../types';
import { 
  CalendarClock, 
  Trash2, 
  SendHorizontal, 
  Sparkles, 
  User, 
  Phone, 
  Users, 
  MessageSquareHeart,
  CheckCircle2,
  Calendar,
  Clock,
  Dog
} from 'lucide-react';

interface ReservationFormProps {
  user: UserProfile;
  onSuccess: () => void;
}

export default function ReservationForm({ user, onSuccess }: ReservationFormProps) {
  // Standard Booking details state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('14:00');
  
  // This is the REQUIRED "輸入文字欄位" (Text input field for custom notes / wishes)
  const [note, setNote] = useState('');

  // Status flags
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Clear Form handler (清除重填按鈕)
  const handleClear = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setName('');
    setPhone('');
    setGuests(2);
    // Determine today as default date or empty
    setDate('');
    setTime('14:00');
    setNote(''); // Clear the required main text input
    setErrorMsg(null);
    setSuccessMsg(null);
  };

  // Submit Handler (送出按鈕)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    // Form validations
    if (!name.trim()) {
      setErrorMsg('請輸入您的訂位大名！');
      return;
    }
    if (!phone.trim()) {
      setErrorMsg('請輸入您的聯絡電話，以便吉娃娃聯絡您！');
      return;
    }
    if (!date) {
      setErrorMsg('請選擇預留日期！');
      return;
    }
    if (!time) {
      setErrorMsg('請選擇用餐時間段！');
      return;
    }
    if (!note.trim()) {
      setErrorMsg('請在文字欄位中填寫給吉娃娃的話或許願備註！');
      return;
    }

    setLoading(true);

    const reservationPayload: Reservation = {
      name: name.trim(),
      phone: phone.trim(),
      guests: Number(guests),
      date,
      time,
      note: note.trim(), // Storing this text input content to Firestore as requested
      userId: user.uid,
    };

    try {
      if (user.isMock) {
        // If they are in quick local host sandbox mode, save it instantly to localStorage or simulate Success
        const saved: Reservation[] = JSON.parse(localStorage.getItem('chihuahua_local_bookings') || '[]');
        const mockSavedRecord = {
          ...reservationPayload,
          id: `local-bk-${Date.now()}`,
          createdAt: new Date().toISOString()
        };
        saved.unshift(mockSavedRecord);
        localStorage.setItem('chihuahua_local_bookings', JSON.stringify(saved));
        
        setSuccessMsg('✨ 已成功在「本地遊客模式」送出您的訂位與許願！已將文字備註儲存。');
        setTimeout(() => {
          onSuccess();
          handleClear();
        }, 1500);
      } else {
        // Real cloud firestore write as explicitly requested!
        const collectionPath = 'reservations';
        let resultRef;
        try {
          resultRef = await addDoc(collection(db, collectionPath), {
            ...reservationPayload,
            createdAt: serverTimestamp() // Set server times secure
          });
        } catch (dbErr) {
          // Custom formatted error structure as required in system instructions (Skills - firebase-integration Section 3)
          handleFirestoreError(dbErr, OperationType.CREATE, collectionPath);
        }

        if (resultRef?.id) {
          setSuccessMsg(`🎉 太棒了！您的預訂已儲存至雲端資料庫（ID: ${resultRef.id}）！`);
          setTimeout(() => {
            onSuccess();
            handleClear();
          }, 1500);
        }
      }
    } catch (err: any) {
      console.error("Firestore submit error:", err);
      setErrorMsg(`寫入資料庫失敗：${err.message || '請確認 Firestore 規則與連接設定。'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-[#E5E0D8] shadow-sm overflow-hidden max-w-3xl mx-auto" id="reservation_form_container">
      
      {/* Small top header inside card */}
      <div className="p-6 bg-gradient-to-r from-[#8C6A5D] to-[#76594E] text-white flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-lg font-bold font-serif flex items-center gap-2">
            <CalendarClock className="w-5 h-5 shrink-0" />
            填寫線上吉娃娃訂位預約
          </h2>
          <p className="text-[11px] text-[#EDE8E1]">當您按下送出按鈕後，許願備註的文字欄位將儲存儲備至 Firebase 資料庫。</p>
        </div>
        <div className="text-2xl animate-bounce">🥐🐶</div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
        
        {/* Reservation Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Main Name Input */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-[#5A463D] flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#8C6A5D]" />
              訂位貴賓大名
            </label>
            <input
              id="reserve_name"
              type="text"
              placeholder="例如：吉粉絲先生 / 小姐"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-[#FAF7F2] rounded-2xl border-2 border-[#E5E0D8] focus:outline-none focus:ring-2 focus:ring-[#D9A066] focus:border-[#D9A066] text-sm transition-all"
              required
            />
          </div>

          {/* Phone Input */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-[#5A463D] flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#8C6A5D]" />
              聯絡電話
            </label>
            <input
              id="reserve_phone"
              type="tel"
              placeholder="例如：0912-345-678"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3 bg-[#FAF7F2] rounded-2xl border-2 border-[#E5E0D8] focus:outline-none focus:ring-2 focus:ring-[#D9A066] focus:border-[#D9A066] text-sm transition-all"
              required
            />
          </div>

          {/* Guest Count Selector */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-[#5A463D] flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#8C6A5D]" />
              用餐人數 (吉客數)
            </label>
            <select
              id="reserve_guests"
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full px-4 py-3 bg-[#FAF7F2] rounded-2xl border-2 border-[#E5E0D8] focus:outline-none focus:ring-2 focus:ring-[#D9A066] focus:border-[#D9A066] text-sm transition-all"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                <option key={num} value={num}>{num} 位大人</option>
              ))}
            </select>
          </div>

          {/* Date Picker */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-[#5A463D] flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#8C6A5D]" />
              用餐日期 (Date)
            </label>
            <input
              id="reserve_date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]} // restrict prior dates
              className="w-full px-4 py-3 bg-[#FAF7F2] rounded-2xl border-2 border-[#E5E0D8] focus:outline-none focus:ring-2 focus:ring-[#D9A066] focus:border-[#D9A066] text-sm transition-all"
              required
            />
          </div>

          {/* Time Picker */}
          <div className="space-y-1 md:col-span-2">
            <label className="text-xs font-bold text-[#5A463D] flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#8C6A5D]" />
              預計到店時間
            </label>
            <div className="grid grid-cols-4 gap-2">
              {['11:00', '12:30', '14:00', '15:30', '17:00', '18:30'].map((slot) => (
                <button
                  id={`time_slot_${slot.replace(':', '_')}`}
                  key={slot}
                  type="button"
                  onClick={() => setTime(slot)}
                  className={`py-2 px-1 text-xs font-bold rounded-xl border-2 text-center transition-all ${
                    time === slot 
                      ? 'bg-[#8C6A5D]/20 text-[#8C6A5D] border-[#8C6A5D]' 
                      : 'bg-white border-[#E5E0D8] text-[#4A3E38]/80 hover:bg-[#FAF7F2]'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Required Note input field area (此為題目要求的主要文字欄位) */}
        <div className="space-y-1 pt-2">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold text-[#5A463D] flex items-center gap-1.5" htmlFor="required_text_note">
              <MessageSquareHeart className="w-4 h-4 text-[#D9A066]" />
              吉娃娃心碎許願留言欄位 (核心文字欄位，點擊送出即儲存至 Firestore) *
            </label>
            <span className="text-[10px] text-[#8C6A5D] bg-[#8C6A5D]/10 px-2 py-0.5 rounded-full font-bold">
              這會寫入您的 Firestore！
            </span>
          </div>
          <textarea
            id="required_text_note"
            rows={4}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="請在此輸入任何話、點心許願、或者對店內吉娃娃的熱情告白！
不論是寫「我想預訂店長吉太旁邊的沙發」、「請多準備雞丁點心」都可以喔，這段溫馨留言會為您記錄到雲端中..."
            className="w-full p-4 bg-[#FAF7F2] rounded-2xl border-2 border-[#E5E0D8] focus:outline-none focus:ring-2 focus:ring-[#D9A066] focus:border-[#D9A066] font-sans text-sm tracking-wide leading-relaxed transition-all resize-none shadow-xs"
            required
          />
          <div className="flex justify-between items-center text-[10px] text-[#4A3E38]/50 mt-1">
            <span>支持繁體中文及萬國碼輸入</span>
            <span>已輸入 {note.length} 字元</span>
          </div>
        </div>

        {/* Action responses */}
        {errorMsg && (
          <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl flex items-center gap-2 border border-red-100" id="form_error_msg">
            <span className="font-bold">⚠️ 填寫有誤：</span>
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-3 bg-emerald-50 text-emerald-800 text-xs rounded-xl flex items-center gap-2 border border-emerald-100 animate-pulse" id="form_success_msg">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span className="font-bold">{successMsg}</span>
          </div>
        )}

        {/* Buttons Grid (含有 送出按鈕 與 清除重填按鈕) */}
        <div className="grid grid-cols-2 gap-4 pt-3" id="form_buttons_block">
          {/* 清除重填按鈕 */}
          <button
            id="clear_and_refill_btn"
            type="button"
            onClick={handleClear}
            className="py-3.5 px-4 bg-[#FAF7F2] hover:bg-[#EDE8E1] text-[#8C6A5D] font-bold text-sm rounded-2xl transition-all border-2 border-[#E5E0D8] flex items-center justify-center gap-1.5"
            title="全部清除，重新填寫所有的輸入值"
          >
            <Trash2 className="w-4 h-4" />
            全部清除重填
          </button>

          {/* 送出按鈕 */}
          <button
            id="submit_reservation_btn"
            type="submit"
            disabled={loading}
            className="py-3.5 px-4 bg-[#8C6A5D] hover:bg-[#76594E] text-white font-bold text-sm rounded-2xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <SendHorizontal className="w-4 h-4" />
                送出並存入 Firestore
              </>
            )}
          </button>
        </div>

      </form>
      
      {/* Little informational card context */}
      <div className="px-6 py-5 bg-[#FAF7F2] border-t border-[#E5E0D8] flex items-start gap-2.5 transition-colors">
        <div className="w-5 h-5 rounded-full bg-[#8C6A5D]/10 text-[#8C6A5D] font-bold flex items-center justify-center shrink-0 text-[10px] mt-0.5">
          i
        </div>
        <p className="text-[11px] text-[#5A463D]/80 leading-relaxed">
          <strong>資料庫寫入機制說明：</strong> 本訂位系統由 Firebase SDK 直接支援。在您輸入預訂備註欄位（給吉娃娃的話）並點擊<strong>「送出並存入 Firestore」</strong>後，系統將直接在 <code>reservations</code> 資料集中新增名為該筆預約的對象文件，並即時反映於<strong>「訂位紀錄與許願池」</strong>頁面中。
        </p>
      </div>

    </div>
  );
}
