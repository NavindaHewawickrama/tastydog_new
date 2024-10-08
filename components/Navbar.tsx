"use client";
import React,{useState,useEffect} from "react";
import { FaCartShopping } from "react-icons/fa6";
import { IoIosNotifications } from "react-icons/io";
import axios from 'axios';
import Link from "next/link";
import DropDownList from "./DropDownList";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [notificationLength,setNotificationLength] = useState("");

  useEffect(() => {
    const userIDSvd = localStorage.getItem("userId");
    setUserId(userIDSvd);
    fetchNotifications();
  }, [userId]);

  const fetchNotifications = async () => {
    
    try {
      const response = await axios.get(
        `https://tasty-dog.onrender.com/api/v1/notifications/userNoifications/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
          }
        }
      );
      var messageCount = 0
      response.data.notifications.forEach((element: { status: string; }) => {
        if(element.status == 'unread'){
          messageCount += 1;
        }
      });

      setNotificationLength(messageCount.toString());
      console.log(response.data.notifications.length);
      localStorage.setItem("notificationCount", notificationLength);

    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  return (
    <div className=" lg:px-[50px] md:px-[25px] py-[20px] md:ml-[45px]  lg:ml-0 shadow-xl">
      <div className="w-full flex flex-row items-center justify-between">
        <SearchBar />
        <div className="flex items-center xl:gap-6 md:gap-2 lg:gap-4">
          <Link
            href="/home/cart"
            className="cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-[1.4]"
          >
            <FaCartShopping className="text-inputText w-[27px] h-[27px]" />
          </Link>
          <Link
            href="/home/notifications"
            className="relative cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-[1.4]"
          >
            <IoIosNotifications className="text-inputText w-[27px] h-[27px]" />
            <div className="absolute top-0 right-0 w-[15px] h--[15px] rounded-full bg-button2 cursor-pointer flex justify-center items-center">
              <p className="text-[10px] text-white ">{notificationLength}</p>
            </div>
          </Link>
          <DropDownList />
        </div>
      </div>
    </div>
  );
};

export default Navbar;