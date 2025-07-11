import CharacterCard from "../components/itemshopComponents/characterCard";
import AnimationCard from "../components/itemshopComponents/animationCard";
import IdiomCard from "../components/itemshopComponents/idiomCard";
import { buyItem , getAnimations, getIdioms, getCharacters } from "../services/items";
import { useEffect, useState } from "react";

export default function ItemShopPage({setCoins, coins}) {
  const [animations, setAnimations] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [idioms, setIdioms] = useState([]);
  const [msg , setMsg] = useState(null)

  async function buy(id , type){
    const res = await buyItem(id , type)
    setMsg(res.message)
    if (res.ok) {
      if(type === "character"){
        setCharacters((prev) =>
          prev.map((item) =>
            item._id === id ? { ...item, isPurchased: true } : item
          )
        );
      }else if(type === "idiom"){
        setIdioms((prev) =>
          prev.map((item) =>
            item._id === id ? { ...item, isPurchased: true } : item
          )
        );
      }else{
        setAnimations((prev) =>
          prev.map((item) =>
            item._id === id ? { ...item, isPurchased: true } : item
          )
        );
      }
      setCoins(coins - res.item.price)
    }
  }

  useEffect(() => {
    async function fillItems() {
      const animation = await getAnimations();
      const idiom = await getIdioms();
      const character = await getCharacters();
      setAnimations(animation);
      setIdioms(idiom);
      setCharacters(character);
    }
    fillItems();
  }, []);


  return (
    <div className="mx-6 px-6 py-4 text-white flex flex-col gap-8">
      {msg && (
        <p
          className={`
            mt-4 text-sm px-4 py-2 rounded transition-all duration-700 transform  bg-[#132e42] cursor-pointer
            ${msg === "Item bought successfully" ? "text-green-400 " : "text-red-400"} 
            animate-fadeUp
          `}
          onClick={() => setMsg(null)}
        >
          {msg}
        </p>
      )}
      {/* Animations Section */}
      <section>
        <h2 className="text-xl font-bold mb-3 text-[#2eaefb]">Animations</h2>
        {animations.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {animations.map((a) => (
              <AnimationCard
                key={a._id}
                name={a.name}
                price={a.price}
                animation={a.cssClass}
                isPurchased={a.isPurchased}
                onBuy={() =>  buy(a._id , "animation")}
              />
            ))}
          </div>
        ) : (
          <p className="text-sm italic text-gray-400">No animations yet.</p>
        )}
      </section>

      {/* Characters Section */}
      <section>
        <h2 className="text-xl font-bold mb-3 text-[#2eaefb]">Characters</h2>
        {characters.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {characters.map((c) => (
              <CharacterCard
                key={c._id}
                name={c.name}
                price={c.price}
                image={`/assets/characters/${c.name}.jpg`}
                isPurchased={c.isPurchased}
                onBuy={() => buy(c._id , "character")}
              />
            ))}
          </div>
        ) : (
          <p className="text-sm italic text-gray-400">No characters yet.</p>
        )}
      </section>

      {/* Idioms Section */}
      <section>
        <h2 className="text-xl font-bold mb-3 text-[#2eaefb]">Idioms</h2>
        {idioms.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {idioms.map((i) => (
              <IdiomCard
                key={i._id}
                idiom={i.text}
                price={i.price}
                isPurchased={i.isPurchased}
                onBuy={() =>  buy(i._id , "idiom")}
              />
            ))}
          </div>
        ) : (
          <p className="text-sm italic text-gray-400">No idioms yet.</p>
        )}
      </section>
    </div>
  );
}
