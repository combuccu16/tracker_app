import Sidebar from "../components/sideBar";
import TopBar from "../components/topBar";  
import ItemShopPage from "../pages/itemShopPage";
import { useState } from "react";
import { isValidElement , cloneElement } from "react";
export default function SideTopBarLayout({ children ,  }) {
  const [coins , setCoins] = useState(3000); 
  return (
    <div className="flex h-screen bg-[#12131c]">
      <Sidebar />

      {/* Main content section */}
      <div className="flex-1 overflow-y-auto">
        <TopBar coins = {coins}/>
        {isValidElement(children) && children.type === ItemShopPage
          ? cloneElement(children, { coins, setCoins })
          : children}
      </div>
    </div>
  );
}