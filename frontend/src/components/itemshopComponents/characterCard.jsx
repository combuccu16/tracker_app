export default function CharacterCard({ name, price, image, isPurchased, onBuy }) {
  return (
    <div className="bg-[#0b1e2d] text-white rounded-md p-4 w-52 shadow hover:scale-105 transition-transform relative flex flex-col items-center">

      {/* Price top-right */}
      <div className="absolute top-2 right-2 bg-[#2eaefb] text-black text-xs px-2 py-1 rounded">
        💰 {price}
      </div>

      {/* Name absolutely positioned top center */}
      <p
        className="absolute text-sm font-semibold text-center w-full"
        style={{ top: "10px", left: "50%", transform: "translateX(-50%)" }}
      >
        {name}
      </p>

      {/* Add some padding-top to prevent content overlap with the absolutely positioned name */}
      <div className="pt-7 flex-grow flex items-center justify-center mb-4 w-full">
        <img src={image} alt={name} className="h-24 w-auto object-contain mx-auto" />
      </div>

      {/* Purchase Button or Purchased Label */}
      {isPurchased ? (
        <div className="text-[#2eaefb] font-bold">Purchased ✅</div>
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
