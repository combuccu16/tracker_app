export default function IdiomCard({ idiom, price, isPurchased, onBuy }) {
  return (
    <div className="bg-[#0b1e2d] text-white rounded-md p-4 w-52 shadow hover:scale-105 transition-transform relative">
      {/* Price */}
      <div className="absolute top-2 right-2 bg-[#2eaefb] text-black text-xs px-2 py-1 rounded">
        💰 {price}
      </div>

      {/* Idiom Text */}
      <div className="text-center italic text-sm text-gray-300 mb-4">
        "{idiom}"
      </div>

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
