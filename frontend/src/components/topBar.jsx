import { useAnimatedNumber } from "../hooks/useAnimatedNumber";
export default function TopBar({coins}) {
  const animatedCoins = useAnimatedNumber(coins);
  return (
    <div className="sticky top-0 z-10 bg-[#0b1e2d] px-4 py-2">
      <div className="flex items-center justify-end space-x-6 space-x-reverse">
        {/* Character */}
        <img
          src="/character.png"
          alt="User"
          className="w-10 h-10 rounded-full border-2 border-[#2eaefb]"
        />

        {/* Level */}
        <div className="text-[#2eaefb] font-semibold">
          Level: <span className="text-white">12</span>
        </div>

        {/* Streak */}
        <div className="text-[#2eaefb] font-semibold">
          Streak: <span className="text-white">7 🔥</span>
        </div>

        {/* Coins */}
        <div className="text-[#2eaefb] font-semibold">
          Coins: <span className="text-white">{animatedCoins} 💰</span>
        </div>
      </div>
    </div>
  );
}
