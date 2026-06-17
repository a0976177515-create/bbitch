import React, { useState } from 'react';
import { auth } from '../firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
} from 'firebase/auth';
import { UserProfile } from '../types';
import { Coffee, Dog, Sparkles, LogIn, UserPlus, ShieldAlert } from 'lucide-react';

interface AuthScreenProps {
  onAuthSuccess: (user: UserProfile) => void;
}

export default function AuthScreen({ onAuthSuccess }: AuthScreenProps) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showSandboxHint, setShowSandboxHint] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!email || !password) {
      setError('請填寫所有欄位！');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('密碼長度必須至少為 6 個字元！');
      setLoading(false);
      return;
    }

    try {
      if (isRegistering) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        if (userCredential.user) {
          onAuthSuccess({
            uid: userCredential.user.uid,
            email: userCredential.user.email,
          });
        }
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        if (userCredential.user) {
          onAuthSuccess({
            uid: userCredential.user.uid,
            email: userCredential.user.email,
          });
        }
      }
    } catch (err: any) {
      console.error("Firebase auth error details:", err);
      let localizedMsg = '發生錯誤，請稍後再試。';
      if (err.code === 'auth/email-already-in-use') {
        localizedMsg = '此 Email 已經被註冊。如果您之前建立過此備份，可直接切換至登入模式！';
      } else if (err.code === 'auth/invalid-email') {
        localizedMsg = '無效的 Email 格式。';
      } else if (err.code === 'auth/weak-password') {
        localizedMsg = '密碼強度太弱 (至少6位數)。';
      } else if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        localizedMsg = 'Email 或密碼輸入錯誤，請重試。';
      } else if (err.code === 'auth/operation-not-allowed') {
        localizedMsg = 'Firebase 專案尚未啟用 電子郵件/密碼 登入方法。';
        setShowSandboxHint(true);
      } else {
        localizedMsg = `Firebase 錯誤: ${err.message}`;
        setShowSandboxHint(true);
      }
      setError(localizedMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleMockLogin = () => {
    // Elegant fallback simulation for fast testing or if they don't have email/pass enabled on Firebase console.
    onAuthSuccess({
      uid: 'mock-chihuahua-user-123',
      email: 'guest_chihuahua_lover@cafe.com',
      isMock: true
    });
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#4A3E38] flex flex-col justify-center items-center p-6 relative overflow-hidden" id="auth_container">
      {/* Decorative Chihuahua circles */}
      <div className="absolute top-[-100px] left-[-100px] w-96 h-96 rounded-full bg-[#8C6A5D]/10 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-96 h-96 rounded-full bg-[#D9A066]/10 blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md bg-white rounded-3xl shadow-sm border border-[#E5E0D8] overflow-hidden z-10" id="auth_card">
        {/* Banner header inside card */}
        <div className="p-8 bg-gradient-to-br from-[#8C6A5D] to-[#76594E] text-white text-center relative">
          <div className="absolute top-3 right-3 text-white/40 pointer-events-none">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          
          <div className="mx-auto w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4 border border-white/20">
            <Dog className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-2xl font-serif font-bold tracking-tight text-[#FAF7F2]">吉娃娃咖啡廳</h1>
          <p className="text-[#EDE8E1] text-xs mt-1">Chihuahua Cafe Booking System</p>
        </div>

        {/* Form area */}
        <div className="p-8">
          <div className="flex border-b border-[#E5E0D8] mb-6">
            <button
              id="tab_login_btn"
              type="button"
              className={`flex-1 pb-3 text-center font-bold tracking-wide transition-colors ${
                !isRegistering 
                  ? 'text-[#8C6A5D] border-b-2 border-[#8C6A5D]' 
                  : 'text-[#4A3E38]/50 hover:text-[#4A3E38]'
              }`}
              onClick={() => {
                setIsRegistering(false);
                setError(null);
              }}
            >
              會員登入
            </button>
            <button
              id="tab_register_btn"
              type="button"
              className={`flex-1 pb-3 text-center font-bold tracking-wide transition-colors ${
                isRegistering 
                  ? 'text-[#8C6A5D] border-b-2 border-[#8C6A5D]' 
                  : 'text-[#4A3E38]/50 hover:text-[#4A3E38]'
              }`}
              onClick={() => {
                setIsRegistering(true);
                setError(null);
              }}
            >
              免費註冊
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#5A463D] mb-1">
                電子郵件 信箱 (Email)
              </label>
              <input
                id="auth_email"
                type="email"
                placeholder="chihuahua@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-[#FAF7F2] rounded-2xl border-2 border-[#E5E0D8] focus:outline-none focus:ring-2 focus:ring-[#D9A066] focus:border-[#D9A066] transition-all text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#5A463D] mb-1">
                密碼 (Password)
              </label>
              <input
                id="auth_password"
                type="password"
                placeholder="輸入至少 6 位數密碼"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-[#FAF7F2] rounded-2xl border-2 border-[#E5E0D8] focus:outline-none focus:ring-2 focus:ring-[#D9A066] focus:border-[#D9A066] transition-all text-sm"
                required
              />
            </div>

            {error && (
              <div className="p-3 bg-rose-50 text-rose-700 text-xs rounded-xl flex flex-col gap-2 border border-rose-100" id="auth_error">
                <div className="flex items-start gap-2">
                  <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5 text-rose-500" />
                  <span>{error}</span>
                </div>
                {isRegistering && error.includes('已經被註冊') && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsRegistering(false);
                      setError(null);
                    }}
                    className="self-end mt-1 text-[11px] font-bold text-[#8C6A5D] hover:text-[#76594E] hover:underline bg-white px-2.5 py-1.5 rounded-lg border border-[#E5E0D8] transition-all cursor-pointer"
                  >
                    👉 立即切換至「會員登入」
                  </button>
                )}
              </div>
            )}

            <button
              id="auth_submit_btn"
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#8C6A5D] hover:bg-[#76594E] text-white font-bold rounded-2xl transition-all shadow-sm hover:shadow-md disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : isRegistering ? (
                <>
                  <UserPlus className="w-5 h-5" />
                  註冊及建立此備份
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  登入會員帳號
                </>
              )}
            </button>
          </form>

          {/* Fallback button to easily experience app on fresh Firebase setup without custom domain permissions configured */}
          <div className="mt-6 pt-6 border-t border-[#E5E0D8] text-center">
            <p className="text-[11px] text-[#4A3E38]/60 mb-2.5">
              還沒設定 Firebase Auth 驗證或想快速測試？
            </p>
            <button
              id="guest_mode_btn"
              type="button"
              onClick={handleMockLogin}
              className="px-4 py-2.5 bg-[#FAF7F2] hover:bg-[#EDE8E1] text-[#8C6A5D] text-xs font-bold rounded-xl transition-colors border-2 border-[#E5E0D8]"
            >
              🐕 快速遊客測試模式 (免驗證儲存)
            </button>
          </div>
        </div>
      </div>
      
      {showSandboxHint && (
        <div className="max-w-md mt-4 text-[11px] text-gray-500 bg-white/80 backdrop-blur-md p-4 rounded-xl border border-[#E5E0D8] text-center leading-relaxed shadow-xs">
          💡 <strong>溫馨提示：</strong> 若您看到「尚未啟用 Email」等錯誤，是由於新建立的 Firebase 專案需要在 Firebase Console 的 <strong>Authentication</strong> 選單中點擊<strong>「啟用 電子郵件/密碼 登入方式」</strong>。你可以直接點擊上方<strong>「快速遊客測試模式」</strong>，一樣可以使用您專屬的 Firestore 儲存與完整功能！
        </div>
      )}
    </div>
  );
}
