"use client";
import React, { useState,useEffect } from "react";
// import TopFoods from "@/constants/TopFoods";
import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import AddToCart from "./models/AddToCart";
import PageTransition from "./PageTransition";
import { GrFormNextLink } from "react-icons/gr";

const FavoriteFoods = () => {
  const router = useRouter();

  const [toggle, setToggle] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const [visibleItems, setVisibleItems] = useState<any[]>([]);


  useEffect(() => {
    handleTopRatedFoods();
  }, []);

  const handleTopRatedFoods = async () => {
    try{
      const response = await fetch("https://tasty-dog.onrender.com/api/v1/shops/shops/getTopRatedShopItems",{method:"POST"});
      const data = await response.json();
      if(!response.ok){
        console.log(data.message || "An error occurred.");
      }else{
        setVisibleItems(data);
      }
    }catch(error){
      console.log("An error occurred. Please try again later." , error);
    }
  }

  const handleToggle = () => {
    setToggle(true);
  };

  const handleShopViewClick = () => {
    router.push("/home/shopview");
  };

  const handleProductViewClick = (id: string) => {
    localStorage.setItem("productIDFavouriteFoods", id);
    router.push("/home/productview");
  };

  return (
    <>
      <PageTransition>
        <div className="mt-[50px] w-full overflow-hidden">
          <div className="flex justify-between items-center">
            <h2 className="capitalize text-[24px] font-bold mb-[20px]">
              your favorites
            </h2>
            <Link
              href="/home/favorites"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="flex items-center gap-1 cursor-pointer mr-5"
            >
              <h4 className="text-[18px] text-inputText font-semibold capitalize">
                see all
              </h4>
              <GrFormNextLink
                size={30}
                className={`text-inputText ${
                  isHovered
                    ? "transition-transform transform ease-in-out translate-x-2"
                    : ""
                }`} // Conditionally apply ml-2 class when hovered
              />
            </Link>
          </div>

          <div className="grid  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  xl:gap-10 lg:gap-5 md:gap-5">
            {visibleItems.map((item) => (
              <div
                key={item._id}
                className="lg:w-full md:w-full xl:w-[95%] h-[300px] rounded-xl mb-5 shadow-lg z-0 cursor-pointer"
                onClick={() => handleProductViewClick(item._id)}
              >
                <div className="relative w-full h-[189px] rounded-t-xl z-0">
                  <Image
                    src={item.itemImages}
                    alt={item.itemName}
                    width={252}
                    height={189}
                    className="w-full h-full rounded-t-xl z-0"
                  />
                  <div
                    className="absolute bottom-[-20px] right-[20px] w-[40px] h-[40px] z-10 transition-transform duration-300 ease-in-out transform hover:scale-[1.2]"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent event bubbling to parent div
                      handleShopViewClick();
                    }}
                  >
                    <Image
                      src={item.shopProfilePhoto}
                      alt={item.itemName}
                      fill
                      className="rounded-full"
                    />
                  </div>
                </div>
                <div className="py-3 px-3">
                  <h3 className="text-[15px] text-detail capitalize font-medium">
                    {item.itemName}
                  </h3>
                  <h3 className="text-[20px] font-bold text-black ">
                    {item.price}
                  </h3>
                  <div className="w-full flex flex-row justify-between items-center mt-2">
                    <div className="flex items-center ">
                      <FaStar className="w-[12px] h-[12px] text-ratings" />
                      <p className="text-[13px] text-detail font-medium ml-1">
                      {item.averageRating}
                      </p>
                      <p className="text-[13px] text-detail">({item.totalRatings})</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent event bubbling to parent div
                        handleToggle();
                      }}
                      className="w-[86px] h-[27px] flex justify-center items-center bg-button2 rounded-xl text-[10px] text-white gap-2 transition-transform duration-300 ease-in-out transform hover:scale-[1.1]"
                    >
                      <FaCartShopping />
                      <p className="capitalize">add to cart</p>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </PageTransition>
      <AddToCart open={toggle} onClose={() => setToggle(false)} />
    </>
  );
};

export default FavoriteFoods;
