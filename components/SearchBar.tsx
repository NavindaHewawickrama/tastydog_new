"use client";

import React, { useState,useEffect } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { BiData } from "react-icons/bi";

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [allData, setAllData] = useState<any[]>([]); // State to store all data from API
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const router = useRouter();
  const filteredResults: unknown = [];

  // useEffect(() => {
  //   const filteredResults = allData.filter((item) =>
  //     item.itemName.toLowerCase().includes(query.toLowerCase())
  //   );
  //   setSearchResults(filteredResults);
  //   localStorage.setItem("searchResults", JSON.stringify(filteredResults));
  //   localStorage.setItem("query", query);
  // }, [query, allData]);

  useEffect(() => {
    fetchDataFromAPI();
  }, []);

  const fetchDataFromAPI = async () => {
    try {
      const response = await fetch(
        "https://tasty-dog.onrender.com/api/v1/shops/shops/getAllShopItems",
        { method: "POST" }
      );

      // console.log(response);
      if (!response.ok) {
        console.log(response);  
      }else{
        const data = await response.json();
        // console.log("data is ",data);
        // console.log(response);
        // console.log(data);
        setAllData(data);
      }
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    handleSearch();
    console.log(event.target.value);
  };



const handleSearch = () => {
  window.location.reload;
try{
  // console.log(filteredResults);
  if(query == ""){
    console.log('query is empty');
    setSearchResults(allData);
    console.log('worldss', allData);
    localStorage.setItem("searchResults", JSON.stringify(allData));
    localStorage.setItem("query", query);
    // console.log(filteredResults);
    router.push("/home/SearchResults");
  }else{
    console.log('query is not empty');
    const filteredResults = allData.filter((item) =>
      item.itemName.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults(filteredResults);
    localStorage.setItem("searchResults", JSON.stringify(filteredResults));
    localStorage.setItem("query", query);
    router.push("/home/SearchResults");
  }

  
}catch(e){
  console.log(e);
}
};

return (
  <div className="xl:w-[550px] lg:w-[350px] md:w-[250px] h-[40ppx] flex items-center flex-row rounded-lg border-2 border-lightGray py-[5px]">
    <button
      className="w-[8%] flex flex-col items-center justify-center"
      onClick={handleSearch}
    >
      <p className="text-lightGray transition-transform duration-300 ease-in-out transform hover:scale-[1.5]">
        <IoSearchOutline className="pl-2 lg:w-[22px] md:w-[22px] xl:w-[22px] w-[18px] lg:h-[22px] md:h-[22px] xl:h-[22px] h-[18px] " />
      </p>
    </button>
    <input
      type="text"
      value={query}
      onChange={handleInputChange}
      onKeyPress={(event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  }}
      placeholder="Search Foods or Restaurant"
      className="w-[92%] outline-none bg-transparent h-full font-normal xl:text-[14px] lg:text-[14px] md:text[14px] text-[9px] text-inputText px-4"
    />
  </div>
);
};

export default SearchBar;
