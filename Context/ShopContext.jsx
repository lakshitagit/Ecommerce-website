import React, { createContext, useState } from "react";
import all_product from "../Components/Assets/all_product";

export const ShopContext= createContext(null);
    // for add to cart's functionality
    const getDefaultCart=()=>{
        let cart={};
        for(let index=0;index<all_product.length+1;index++){
            cart[index]=0;
        }
        return cart;
    }
const ShopContextProvider=(props)=>{ 

    const [cartItems,setCartItems]=useState(getDefaultCart());
    //by using context we can access any item present in cart
    // console.log();
    //key product id 
    // value no of items for that product id
    const addToCart=(itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        console.log(cartItems);
    }
    const removeFromCart=(itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    }
    const getTotalCartAmount=()=>{
        let totalAmount=0;
        for(const item in cartItems){
            if(cartItems[item]>0)
            {
                let itemInfo=all_product.find((product)=>product.id===Number(item))
                totalAmount += itemInfo.new_price * cartItems[item];

            }
        }
        return totalAmount;
    }
    const getTotalCartItems=()=>{
        let totalItem=0;
        for(const key in cartItems){
            if(cartItems[key]>0){
            totalItem+=cartItems[key];
            }
            }
            return totalItem;
    }
    const contextValue={getTotalCartItems,getTotalCartAmount,all_product,cartItems,addToCart,removeFromCart};
    return(
        <ShopContext.Provider value ={contextValue}>
            {props.children}
            </ShopContext.Provider>
    )
}

export default ShopContextProvider;