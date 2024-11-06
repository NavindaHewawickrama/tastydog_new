"use client";
import React from "react";
import Image from "next/image";

interface MyCartComponentProps {
  cartItems: any[];
  incrementQty: (index: number) => void;
  decrementQty: (index: number) => void;
  removeItem: (index: number) => void;
}

const MyCartComponent: React.FC<MyCartComponentProps> = ({
  cartItems,
  incrementQty,
  decrementQty,
  removeItem,
}) => {
  return (
    <div className="xl:w-full lg:w-full md:w-full w-[100%] flex flex-col">
      {cartItems.map((item, index) => (
        <div className="flex justify-between items-center py-[25px] px-[10px] shadow-xl" key={index}>
          <div className="flex items-center" style={{ width: '30%' }}>
            <Image
              src={item.itemImages ? item.itemImages : item.itemPhoto}
              alt="order_image"
              width={125}
              height={125}
              className="w-full h-full rounded-xl"
            />
          </div>
          <div className="gap-7" style={{ width: '65%' }}>
            <div>
              <h3  className="xl:text-[24px] lg:text-[24px] md:text-[18px] text-[15px] capitalize font-medium">
                {item.itemName}
              </h3>
            </div>
            <div  className="flex flex-col justify-center">
              <h3 className="xl:text-[28px] lg:text-[28px] md:text-[20px] text-[17px] text-primary font-medium mt-4">
                $ {item.price}
              </h3>
            </div>
            <div  className="flex items-left justify-left gap-4 pt-[20px]">
              <p className="xl:text-[18px] lg:text-[18px] md:text-[18px] text-[15px] text-inputText">Qty</p>
              <div className="flex items-center gap-4">
                <button
                  className="xl:text-[20px] lg:text-[20px] md:text-[20px] text-[15px] text-inputText cursor-pointer"
                  onClick={() => decrementQty(index)}
                >
                  -
                </button>
                <p className="xl:text-[18px] lg:text-[18px] md:text-[18px] text-[15px] text-inputText">{item.quantity}</p>
                <button
                  className="xl:text-[20px] lg:text-[20px] md:text-[20px] text-[15px] text-inputText cursor-pointer"
                  onClick={() => incrementQty(index)}
                >
                  +
                </button>
                <button
                  className="xl:text-[20px] lg:text-[20px] md:text-[20px] text-[15px] text-red-500 cursor-pointer"
                  onClick={() => removeItem(index)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyCartComponent;
