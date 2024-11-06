  "use client";
  import CartTotal from "@/components/CartTotal";
  import MyCartComponent from "@/components/MyCartComponent";
  import PageTransition from "@/components/PageTransition";
  import React, { useCallback, useEffect, useState } from "react";


  const Cart = () => {

    const [cartItems, setCartItems] = useState<any[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);

const [isDesktop, setIsDesktop] = useState(true);

//checking if window is desktop size or not
const checkWindowSize = () => {
  let windowWidth;
  if(typeof window !== "undefined") {
    windowWidth = window.innerWidth;
    console.log(windowWidth);
    if( windowWidth >= 1024){
      setIsDesktop(true);
    } else {
      setIsDesktop(false);
    }
  }

  
}

useEffect(() => {
  checkWindowSize();
}, [isDesktop])


//when window is resizing
  if(typeof window !== "undefined") {
    window.addEventListener('resize', checkWindowSize);
  }

    useEffect(() => {
      const storedCartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
      const initializedCartItems = storedCartItems.map((item: any) => ({
        ...item,
        quantity: item.quantity ?? 0,
      }));
      setCartItems(initializedCartItems);
    }, []);
  
    useEffect(() => {
      handleTotal();
    }, [cartItems]);

    const handleTotal = useCallback(() => {
      let total = 0;
      cartItems.forEach((item) => {
        total += item.price * item.quantity;
      });
      total = parseFloat(total.toFixed(2));
      setTotalPrice(total);
      localStorage.setItem("totalPriceCart", total.toFixed(2));
    }, [cartItems]);
 

    const updateLocalStorage = (updatedCartItems: any[]) => {
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      sessionStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    };
  
    const incrementQty = (index: number) => {
      const updatedCartItems = cartItems.map((item, i) => (
        i === index ? { ...item, quantity: item.quantity + 1 } : item
      ));
      setCartItems(updatedCartItems);
      updateLocalStorage(updatedCartItems);
    };
  
    const decrementQty = (index: number) => {
      const updatedCartItems = cartItems.map((item, i) => (
        i === index && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      ));
      setCartItems(updatedCartItems);
      updateLocalStorage(updatedCartItems);
    };
  
    const removeItem = (index: number) => {
      const updatedCartItems = cartItems.filter((_, i) => i !== index);
      setCartItems(updatedCartItems);
      updateLocalStorage(updatedCartItems);
    };
    
    return (
      <>
        <PageTransition>
          <div className="w-full px-[50px] py-[25px] xl:h-[100vh] lg:h-[100vh] md:h-[100vh] h-[130vh]">
            <h2 className="ml-[50px] xl:mt-0 lg:mt-0 md:mt-0 mt-10  capitalize mb-[20px] text-[24px] font-semibold">
              my cart
            </h2> 
                    {isDesktop?(
                      <div className="w-full flex lg:flex-row md:flex-col gap-6">
                      <div className="xl:w-[50%] lg:w-[60%] md:w-[90%] w-[80%]">
                      <MyCartComponent 
                        cartItems={cartItems}
                        incrementQty={incrementQty}
                        decrementQty={decrementQty}
                        removeItem={removeItem}
                        />
                        </div>
                      <div className="xl:w-[35%] lg:w-[40%] md:w-[80%] md:mx-auto  h-full">
                      <CartTotal 
                        cartItems={cartItems}
                        totalPrice={totalPrice}
                        />
                      </div>
                      </div>
                    ):(
                      <div className="w-full gap-6">
                    <div className="w-[80vw]">
                    <MyCartComponent 
                      cartItems={cartItems}
                      incrementQty={incrementQty}
                      decrementQty={decrementQty}
                      removeItem={removeItem}
                      />
                      </div>
                      <div className="w-[105%]  h-full">
                        <CartTotal 
                        cartItems={cartItems}
                        totalPrice={totalPrice}
                        />
                      </div>
                      </div>
                    )}
          </div>
        </PageTransition>
      </>
    );
  };

  export default Cart;
