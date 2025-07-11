export async function getAnimations(){
    try{
        const response = await fetch("http://localhost:5000/api/items/getAnimations" , 
            {
                method : "GET" ,
                headers: {
                "Content-Type": "application/json",
                },
                credentials: "include",
            }
        )
        const data = await response.json()
        return data 
    }catch(err){
        console.log("something went wrong " , err)
        return {error : "something went wrong"}
    }
}

export async function getCharacters() {
  try {
    const response = await fetch("http://localhost:5000/api/items/getCharacters", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // to send session cookies
    });

    const data = await response.json();
    return data;
  } catch (err) {
    console.log("something went wrong", err);
    return { error: "something went wrong" };
  }
}

export async function getIdioms() {
  try {
    const response = await fetch("http://localhost:5000/api/items/getIdioms", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await response.json();
    return data;
  } catch (err) {
    console.log("something went wrong", err);
    return { error: "something went wrong" };
  }
}

export async function getEquippedItems() {
  try {
    const response = await fetch("http://localhost:5000/api/items/getEquippedItems", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // important for session-based auth
    });

    const data = await response.json();
    return data;
  } catch (err) {
    console.log("something went wrong", err);
    return { error: "something went wrong" };
  }
}

export async function equipItem(itemId, type) {
  try {
    const response = await fetch("http://localhost:5000/api/items/equip", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // send session cookie
      body: JSON.stringify({ itemId, type }),
    });

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Failed to equip item:", err);
    return { error: "Something went wrong" };
  }
}


export async function buyItem(itemId , type){
  try{
        const response = await fetch("http://localhost:5000/api/items/buyItem" , 
            {
                method : "POST" ,
                headers: {
                "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ itemId, type }),
            }
        )
        const data = await response.json()
        return data 
    }catch(err){
        console.log("something went wrong " , err)
        return {error : "something went wrong"}
    }
}