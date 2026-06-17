import React from 'react';
import { TabType } from '../types';
import { 
  Sparkles, 
  HandHeart, 
  Coffee, 
  HelpCircle, 
  ChevronRight, 
  Dog, 
  Heart, 
  ShieldAlert,
  FlameKindling
} from 'lucide-react';

interface ChihuahuaHomeProps {
  setTab: (tab: TabType) => void;
}

export default function ChihuahuaHome({ setTab }: ChihuahuaHomeProps) {
  const stats = [
    { value: '12 隻', label: '駐店吉娃娃明星', icon: Dog, color: 'bg-[#8C6A5D]/10 text-[#8C6A5D]' },
    { value: '100%', label: '有機特調手沖單品', icon: Coffee, color: 'bg-[#D9A066]/10 text-[#D9A066]' },
    { value: '38 次/秒', label: '平均顫抖頻率', icon: Sparkles, color: 'bg-[#8C6A5D]/10 text-[#8C6A5D]' },
    { value: '98%', label: '吉粉療癒滿意度', icon: Heart, color: 'bg-[#D9A066]/10 text-[#D9A066]' },
  ];

  const interactions = [
    {
      title: '請溫柔說話',
      desc: '吉娃娃聽覺極度敏銳，請避免大聲喧嘩。用細心、溫和的和悅聲音，最能贏得吉吉的青睞。',
      icon: HandHeart,
    },
    {
      title: '拍照時禁止閃光燈',
      desc: '為了吉娃娃大而圓潤的水汪汪大眼睛著想，本咖啡廳全面禁止使用拍照強烈閃光燈。',
      icon: ShieldAlert,
    },
    {
      title: '請主動拿小點心',
      desc: '店內備有「吉娃娃無鹽舒肥雞肉丁」，可以向櫃檯購買，只要手上有點心，秒變吉吉萬人迷！',
      icon: FlameKindling,
    }
  ];

  const drinksMenu = [
    { name: '顫抖吉娃娃特調拿鐵 (Shaking Latte)', price: '$180', desc: '杯緣撒上精細肉桂粉刻劃吉娃娃大頭，香暖中帶著微微肉桂辛香。', tag: '招牌必點' },
    { name: '大眼汪汪爆漿吉香奶霜 (Big-Eye Milk Foam)', price: '$190', desc: '極度濃厚的手打玄米奶蓋，搭配香純小農鮮奶，像極了吉吉清澈的大眼睛。', tag: '網紅拍照' },
    { name: '吉娃娃超吉黑糖珍珠歐蕾 (Chihuahua Brown Sugar)', price: '$160', desc: 'Q彈黑糖珍珠與香醇鮮乳，喝一口甜入心扉，讓憂鬱的煩惱跟著吉娃娃一起抖掉。', tag: '本日熱銷' },
    { name: '吉娃娃無鹽舒肥雞胸丁 (Chihuahua Healthy Snack)', price: '$100', desc: '全店吉娃娃最渴望的頂級能量小點。可用於投餵或當作拍照神器。', tag: '投餵神器' }
  ];

  return (
    <div className="space-y-8" id="home_view_wrapper">
      
      {/* Hero Banner Section */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#8C6A5D] via-[#76594E] to-[#5A463D] text-white p-8 md:p-12 shadow-sm z-1" id="hero_banner">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-linear-to-l from-white/10 to-transparent pointer-events-none" />
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-[#EDE8E1] text-xs font-bold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#D9A066]" />
            全新吉娃娃主題咖啡館
          </div>
          <h1 className="text-3xl md:text-5xl font-serif font-bold tracking-tight leading-tight text-[#FAF7F2]">
            全台首家！<br />
            體驗被十二大吉娃娃包圍的「顫抖之美」
          </h1>
          <p className="text-[#EDE8E1] text-sm md:text-base leading-relaxed">
            在這裡，你不僅能品嚐到精緻的義式手沖咖啡與主題甜點，還能與店裡個性十足、
            大眼汪汪的大吉娃娃、小吉娃娃近距離互動、拍照、甚至是投餵！立即預約您的專屬沙發，
            享受與吉吉攜手度過的療癒優雅午後。
          </p>
          <div className="pt-4 flex flex-wrap gap-4">
            <button
              id="hero_reserve_btn"
              onClick={() => setTab('reserve')}
              className="px-6 py-3 bg-white hover:bg-[#FAF7F2] text-[#8C6A5D] font-bold rounded-xl shadow-xs transition-all flex items-center gap-2 hover:scale-105"
            >
              立即預訂座位
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              id="hero_stars_btn"
              onClick={() => setTab('stars')}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-[#FAF7F2] font-semibold rounded-xl border border-white/20 transition-all text-sm"
            >
              認識駐店明星吉
            </button>
          </div>
        </div>
      </div>

      {/* Grid Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4" id="stats_grid">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white p-5 rounded-2xl border border-[#E5E0D8] shadow-xs flex items-center gap-4" id={`stat_card_${i}`}>
              <div className={`p-3 rounded-xl ${stat.color} shrink-0`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xl md:text-2xl font-black text-[#5A463D] font-serif tracking-tight">{stat.value}</p>
                <p className="text-xs text-[#4A3E38]/70 font-bold">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main split sections */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left column (8 cols): Interactive rules and menus */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Rules / Safe interaction card */}
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-[#E5E0D8] shadow-xs space-y-6" id="interaction_guide">
            <div>
              <h2 className="text-xl font-bold font-serif text-[#5A463D] flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D9A066]"></span>
                吉娃娃島生存法則 (吉粉守則)
              </h2>
              <p className="text-xs text-[#4A3E38]/75 mt-1">為了您與吉娃娃的安心相處，請務必配合</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {interactions.map((rule, idx) => {
                const Icon = rule.icon;
                return (
                  <div key={idx} className="p-4 bg-[#FAF7F2] rounded-xl border border-[#E5E0D8] space-y-2.5" id={`rule_${idx}`}>
                    <div className="w-8 h-8 rounded-lg bg-[#8C6A5D]/10 text-[#8C6A5D] flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-[#5A463D] text-sm">{rule.title}</h3>
                    <p className="text-xs text-[#4A3E38]/80 leading-relaxed">{rule.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Special drinks and dog foods cards */}
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-[#E5E0D8] shadow-xs space-y-6" id="menu_section">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold font-serif text-[#5A463D] flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#D9A066]"></span>
                  吉可挑選！咖啡與吉星主食
                </h2>
                <p className="text-xs text-[#4A3E38]/75 mt-1">點心即是王道，讓吉娃為您臣服的誘惑秘方</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {drinksMenu.map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-[#E5E0D8] hover:border-[#D9A066] hover:bg-[#FAF7F2] transition-colors flex flex-col justify-between" id={`menu_item_${idx}`}>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-[#5A463D] text-sm truncate pr-2" title={item.name}>
                        {item.name}
                      </h4>
                      <span className="text-[10px] font-bold text-[#8C6A5D] px-2 py-0.5 bg-[#8C6A5D]/10 rounded-md shrink-0 border border-[#8C6A5D]/20">
                        {item.tag}
                      </span>
                    </div>
                    <p className="text-xs text-[#4A3E38]/70 leading-relaxed">{item.desc}</p>
                  </div>
                  <div className="pt-2.5 border-t border-dashed border-[#E5E0D8] mt-3 flex items-center justify-between text-xs">
                    <span className="text-[#4A3E38]/50">現場單點價</span>
                    <strong className="text-[#8C6A5D] text-sm font-black">{item.price}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right column (4 cols): Side Info desk/cards */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Reservation Card Call To Action */}
          <div className="bg-[#EDE8E1] p-6 rounded-2xl border border-[#E5E0D8] space-y-4" id="home_booking_promo">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#8C6A5D] shadow-xs shrink-0">
              <Coffee className="w-6 h-6 animate-pulse" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold font-serif text-[#5A463D] text-base">假日熱門座位火速預訂</h3>
              <p className="text-xs text-[#4A3E38]/80 leading-relaxed">
                由於吉娃娃店面空間精緻，為了提供最安全寬敞的吉吉奔跑空間，我們每場次僅限預約 20 位貴賓。
              </p>
            </div>
            <div className="pt-2">
              <button
                id="booking_promo_btn"
                onClick={() => setTab('reserve')}
                className="w-full py-3 bg-[#8C6A5D] hover:bg-[#76594E] text-white font-bold rounded-xl text-xs transition-colors shadow-xs"
              >
                線上預約座位點此 👈
              </button>
            </div>
          </div>

          {/* Quote Card */}
          <div className="bg-gradient-to-b from-[#8C6A5D] to-[#5A463D] p-6 rounded-2xl text-[#FAF7F2] space-y-4" id="home_quote_card">
            <h4 className="text-[10px] text-[#D9A066] uppercase tracking-wider font-extrabold font-serif">吉言吉語</h4>
            <p className="italic text-xs font-serif leading-relaxed text-[#EDE8E1]">
              「吉娃娃並不是因為冷而發抖，而是牠們那嬌小的身軀，裝不下牠們對這個世界排山倒海、澎湃洶湧的熱情。」
            </p>
            <div className="border-t border-white/20 pt-3 flex items-center justify-between text-[10px] text-[#EDE8E1]">
              <span>—— 摘自吉娃學名著錄</span>
              <span className="text-xs">🐕✨</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
