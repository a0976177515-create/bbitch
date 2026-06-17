import React from 'react';
import { ChihuahuaStar } from '../types';
import { Heart, Sparkles, Dog, Dumbbell, Activity } from 'lucide-react';

export default function ChihuahuaGallery() {
  const chihuahuaStars: ChihuahuaStar[] = [
    {
      id: 'star-1',
      name: '吉太 (Kita)',
      title: '霸道店長',
      mood: '高冷且帶著狂熱顫抖 (100% 警戒)',
      favoriteSnack: '法式現烤舒肥雞肉乾',
      description: '吉娃娃咖啡廳的鎮店之寶兼大股東。脾氣火爆但其實很害羞。只要手裡拿著雞肉乾，他就是你最聽話的小跟班。',
      avatarUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=400' // beautiful puppy dog card
    },
    {
      id: 'star-2',
      name: '抖抖 (Doudou)',
      title: '特約公關總監',
      mood: '小幅微抖 (80% 迎賓興奮度)',
      favoriteSnack: '低卡無添加有機小地瓜條',
      description: '全店最親人的社交達人！擅長用圓滾滾的無辜大眼睛向客人討摸摸。喜歡靠在客人的大腿上睡覺。',
      avatarUrl: 'https://images.unsplash.com/photo-1518378188025-22bd89516ee2?auto=format&fit=crop&q=80&w=400' // friendly chihuahua style
    },
    {
      id: 'star-3',
      name: '波比 (Bobo)',
      title: '首席睡覺官兼甜點測試員',
      mood: '基本不抖 (10% 慵懶打盹中)',
      favoriteSnack: '烘烤香甜無鹽南瓜泥',
      description: '個性非常慵懶，每天有 20 小時都在暖呼呼的座墊上睡覺。偶爾會夢囈發抖，是咖啡店最萌的吉祥物。',
      avatarUrl: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=400' // sleepy sleeping puppy
    },
    {
      id: 'star-4',
      name: '雷神索爾 (Thor)',
      title: '保安大隊長 (體重僅1.5kg)',
      mood: '極速狂抖 (150% 捍衛領地)',
      favoriteSnack: '主廚招牌風乾牛肝丁',
      description: '威風凜凜的名字卻配上超級嬌小的身軀。每次有高大帥氣的客人進來時，他都會展開「戰術性狂叫」，其實是想引起你的注意！',
      avatarUrl: 'https://images.unsplash.com/photo-1593134257782-e89567b7718a?auto=format&fit=crop&q=80&w=400' // alert little puppy
    }
  ];

  return (
    <div className="space-y-6" id="gallery_view_wrapper">
      <div>
        <h2 className="text-2xl font-bold font-serif text-[#5A463D] flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-[#D9A066]" />
          全台最頂尖的駐店「吉吉明星」陣容
        </h2>
        <p className="text-sm text-[#4A3E38]/75 mt-1">每一隻吉娃娃都有精緻的職級與熱情，歡迎到店點名與牠們共學互動</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="stars_grid_container">
        {chihuahuaStars.map((star) => (
          <div 
            key={star.id} 
            className="bg-white rounded-3xl border border-[#E5E0D8] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row h-full"
            id={`star_profile_card_${star.id}`}
          >
            {/* Image section */}
            <div className="sm:w-44 h-48 sm:h-auto relative shrink-0">
              <img 
                src={star.avatarUrl} 
                alt={star.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#8C6A5D]/90 backdrop-blur-md rounded-full text-[10px] text-white font-extrabold flex items-center gap-1">
                <Dog className="w-3 h-3" />
                {star.title}
              </div>
            </div>

            {/* Content info section */}
            <div className="p-6 flex flex-col justify-between flex-1 space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold font-serif text-[#5A463D]">{star.name}</h3>
                  <span className="text-[10px] px-2 py-0.5 bg-[#FAF7F2] text-[#8C6A5D] border border-[#E5E0D8] rounded-full font-bold flex items-center gap-1">
                    <Activity className="w-3 h-3" />
                    {star.title}
                  </span>
                </div>
                
                <p className="text-xs text-[#4A3E38]/80 leading-relaxed min-h-[48px]">
                  {star.description}
                </p>
              </div>

              {/* Status details */}
              <div className="pt-3 border-t border-dashed border-[#E5E0D8] space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#4A3E38]/50">目前顫抖指數 (狀態)：</span>
                  <span className="font-bold text-[#8C6A5D]">{star.mood}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#4A3E38]/50">最渴望的美味：</span>
                  <span className="font-bold text-[#5A463D] bg-[#8C6A5D]/10 px-2 py-0.5 rounded-md">
                    {star.favoriteSnack}
                  </span>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
      
      {/* Footer hint */}
      <div className="bg-[#EDE8E1] p-5 rounded-2xl border border-[#E5E0D8] text-center text-xs text-[#5A463D] font-bold flex items-center justify-center gap-2">
        <span>🐾</span>
        <span>當前值班吉吉可能會隨時因「睡意、興奮、害羞」而調整崗位，請以現場實際發抖狀態為準！</span>
      </div>

    </div>
  );
}
