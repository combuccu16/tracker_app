export default function AnimationCard({ name, price, animation, isPurchased, onBuy }) {
  return (
    <div className="bg-[#0b1e2d] text-white rounded-md p-4 w-52 shadow hover:scale-105 transition-transform relative">
      {/* Price */}
      <div className="absolute top-2 right-2 bg-[#2eaefb] text-black text-xs px-2 py-1 rounded">
        💰 {price}
      </div>

      {/* Animated Box */}
      <div className="w-full h-24 mb-4 flex items-center justify-center">
        <div className={`w-12 h-12 ${animation}`}></div>
      </div>

      {/* Name */}
      <p className="text-sm font-semibold text-center mb-2">{name}</p>

      {/* Button */}
      {isPurchased ? (
        <div className="text-center text-[#2eaefb] font-bold">Purchased ✅</div>
      ) : (
        <button
          onClick={onBuy}
          className="bg-[#2eaefb] text-black w-full py-1 rounded hover:bg-[#2395d4] font-semibold"
        >
          Purchase
        </button>
      )}
    </div>
  );
}
