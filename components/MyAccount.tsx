"use client";

import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { FaCcVisa } from "react-icons/fa6";
import { RiDeleteBinLine } from "react-icons/ri";
import ChangePassword from "./models/AccountModels/ChangePassword";
import DeleteAccount from "./models/AccountModels/DeleteAccount";
import AddNewPayment from "./models/AccountModels/AddNewPayment";
import EditAccountInfo from "./models/AccountModels/EditAccountInfo";
import AddNewAddress from "./models/AccountModels/AddNewAddress";
import ChangeAddress from "./models/AccountModels/ChangeAddress";
import { MdEdit } from "react-icons/md";
import PageTransition from "./PageTransition";
import { get } from "http";
import CustomAlert from "./../app/alerts/customalert";
const MyAccount = () => {
  const [openPassword, setOpenPassword] = useState(false);
  const [deleteModel, setDeleteModel] = useState(false);
  const [newPaymentModel, setNewPaymentModel] = useState(false);
  const [updateAccountModal, setUpdateAccountModal] = useState(false);
  const [newAddress, setNewAddress] = useState(false);
  const [changeAddress, setChangeAddress] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [address1, setAddress1] = useState<any | null>([]);
  const [imageUrl, setImageUrl] = useState<string | null>("");
  const [cardNumber, setCardNumber]  = useState("");
  const [date, setDate]  = useState("");
  const [cvv, setCvv]  = useState("");
  const [cardname, setName]  = useState("");
  const [cardId, setCardId] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

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

    const handleShowAlert = () => {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000); // Auto-close after 3 seconds
    };
  const handleDelete = async ()=>{
    try{
      const response = await fetch(`https://tasty-dog.onrender.com/api/v1/cards/deleteCard/${cardId}`);
      const data = await response.json();
      if(!response.ok){
        // window.alert("Some kind of problem occured. Please try again.");
        setAlertMessage("Some kind of problem occured. Please try again.");
        handleShowAlert();
        console.log(data);
      }else{
        console.log(data);
        // window.alert("Card deleted successfully");
        setAlertMessage("Card deleted successfully");
        handleShowAlert();
        localStorage.removeItem("savedCardDetails");
      }
    }catch(e){
      console.log(e);
    }
  }

  const getUserAddress = async () => {
    const id = localStorage.getItem("userId");
    try{
      const response2 = await fetch(`https://tasty-dog.onrender.com/api/v1/addresses/${id}`);
      const data = await response2.json();
      if(!response2.ok){
        // window.alert("Some kind of problem occured. Please try again.");
        setAlertMessage("Some kind of problem occured. Please try again.");
        handleShowAlert();
        console.log(data);
      }else{
        // console.log(data);
        setAddress1(data);  
        localStorage.setItem("userAddress",data[0]);
      }
    }catch(error){
      console.error(error);
    }
  };


  const getSavedCardDetails = useCallback(() => {
    const savedCardDetails = localStorage.getItem("savedCardDetails");
    let currentYear = new Date().getFullYear();
    const [monthString, yearString] = date.split('/');
      const month = parseInt(monthString, 10);
      const year = parseInt(yearString, 10);

    if (month < 1 || month > 12) {
      console.log("Invalid month value. Please enter a value between 1 and 12.");
    } else if (year < currentYear) {
      console.log("Invalid year value. Please enter the current year or the year after.");
    } else {
      if (savedCardDetails) {
        const cardData = JSON.parse(savedCardDetails);
        setCardId(cardData._id || "");
        setCardNumber(cardData.cardNumber || "");
        setName(cardData.name || "");
        setDate(cardData.date || "");
        setCvv(cardData.cvv || "");
      }
    }
  },[date]);


  useEffect(() => {
    getUserInfor();
    getUserAddress();
    getSavedCardDetails();
    if (imageFile) {
      changePhoto();
    }
  },[getSavedCardDetails, imageFile]);

  const getUserInfor = async () => {
    const emails = localStorage.getItem("userEmail");
    const pkey = localStorage.getItem("pwReg");
    var userId = localStorage.getItem("userId");
    // console.log('email is ' + emails);
    // console.log('password is ' + pkey);
    // console.log('userId is ' + userId);
    try{
      const response = await fetch("https://tasty-dog.onrender.com/api/v1/customers/login",{
        method:"POST",
        headers: { 
          "Content-Type":"application/json",
        },
        body: JSON.stringify({
          emailOrPhoneNumber: emails,
          password: pkey,
        }),
      });
      const data = await response.json();
      console.log(data)
      if(!response.ok){
       // console.log(data);
      //  window.alert("Some kind of problem occured. Please try again.");
       setAlertMessage("Some kind of problem occured. Please try again.");
       handleShowAlert();
       console.log(data);
      }else{
        //console.log(data.customer._id);
        setUserId(data.customer._id);
        setUserName(data.customer.fullName);
        setEmail(data.customer.emailOrPhoneNumber);
        setPhoneNumber(data.customer.secondaryNumber);
        setImageUrl(data.customer.profilePhoto);
      }
    }catch(error){
      console.error(error);
    }
  };
  const handleAddressEdit = (id:any) =>{
    localStorage.setItem("addressId", id);
    setChangeAddress(true);
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newImage = event.target.files?.[0];
    if (newImage) {
      setImageUrl(URL.createObjectURL(newImage)); // Preview image locally (optional)
      setImageFile(newImage);
    }
  };

  const triggerFileInputClick = () => {
    document.getElementById("imageInput")?.click();
  };

  const changePhoto = async () => {
    try {
      const formData = new FormData();
      console.log("imageFile", imageFile);
      if (imageFile) {
        formData.append("image", imageFile);
      }
      
      const response = await fetch(`https://tasty-dog.onrender.com/api/v1/customers/uploadProfilePhoto/${userId}/image`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if(!response.ok){
        // window.alert("Some kind of problem occured. Please try again.");
        setAlertMessage("Some kind of problem occured. Please try again.");
        handleShowAlert();
        console.log(data);
      }else{
        console.log(data);
        setImageUrl(data.imageUrl);
        // window.alert("Profile photo updated successfully");
        setAlertMessage("Profile photo updated successfully");
        handleShowAlert();
      }
    } catch (error) {
      console.error(error);
    }
  }

  

  return (
    <>
     <CustomAlert 
              message={alertMessage}
              show={showAlert} 
              onClose={() => setShowAlert(false)} 
            />
      <PageTransition>
        {isDesktop ? (<div className="relative max-w-[950px] flex flex-col gap-10">
          <h2 className="text-[24px] font-semibold capitalize">my profile</h2>
            <div className="relative w-[146px] h-[146px] rounded-full mb-2 ">
              <Image
                src={imageUrl || "/profile.png"}
                alt="profile-pic"
                width={146}
                height={146}
                className="rounded-full object-cover w-full h-full overflow-hidden"
                
              />
              <br/>
              <input
                  type="file"
                  id="imageInput"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />

                <button
                  onClick={triggerFileInputClick}
                  className="absolute show bottom-0 right-0 w-[33px] h-[33px] bg-button2 rounded-full flex justify-center items-center transition-transform duration-300 ease-in-out transform hover:scale-[1.1] overflow-visible"
                >
                  <MdEdit size={23} color="white" />
                </button>
            </div>

          <div className="w-full flex flex-col gap-3">
            <div className="w-full flex justify-between items-center">
              <h3 className="text-[18px] font-bold capitalize">
                personal info
              </h3>
              <button
                className="w-[91px] h-[31px] bg-none border-2 border-button2 text-[14px] text-center rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-[1.1] mr-1"
                onClick={() => setUpdateAccountModal(true)}
              >
                Edit
              </button>
            </div>
            <div className="w-full h-[90px] shadow-xl  flex justify-center items-center gap-10">
              <div className="flex items-center gap-3">
                <p className="text-[14px] text-inputText capitalize">
                  full name:
                </p>
                <p className="text-[14px] text-detail font-bold capitalize">{userName}</p>
              </div>
              <div className="flex items-center gap-3">
                <p className="text-[14px] text-inputText capitalize">
                  Phone Number:
                </p>
                <p className="text-[14px] text-detail font-bold capitalize">
                  {phoneNumber}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <p className="text-[14px] text-inputText capitalize">email:</p>
                <p className="text-[14px] text-detail font-bold ">
                  {email}
                </p>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col gap-5">
            <h3 className="text-[16px] font-semibold capitalize">
              address book
            </h3>
            <div className="flex flex-row gap-4">
              {address1.length > 0 &&
                address1.slice(0, 3).map((address: any) => (
                  <div className="w-[377px] h-full px-[50px] py-[25px] bg-orangeLight " key={address._id}>
                    <div className="w-full flex justify-between">
                      <p className="text-[14px] text-inputText capitalize">
                        
                      </p>
                      <p
                        className="text-[14px] text-button2 underline cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-[1.1] "
                        onClick={() => handleAddressEdit(address._id)}
                      >
                        Edit
                      </p>
                    </div>

                    <div className="mt-[30px] flex flex-col gap-1">
                      <h3 className="text-[20px] font-semibold capitalize text-detail">
                        {address.userName}
                      </h3>
                      <p className="text-[17px] capitalize text-detail">
                        {address.aptSuite}, {address.streetAddress}, {address.city}, {address.state}, {address.landmark}, {address.country}
                      </p>
                      <p className="text-[17px] capitalize text-detail">
                       {phoneNumber}
                      </p>
                    </div>
                  </div>
                ))}
              <div
                className="w-[377px]  px-[50px] py-[25px] bg-orangeLight rounded-lg flex flex-col justify-center items-center gap-2 cursor-pointer"
                onClick={() => setNewAddress(true)}
              >
                <CiCirclePlus className="w-[50px] h-[50px] text-inputText transition-transform duration-300 ease-in-out transform hover:scale-[1.1]" />
                <h3 className="text-[16px] capitalize text-inputText">
                  Add New Address
                </h3>
              </div>
            </div>
          </div>
          <div className="w-full">
            <h3 className="text-[16px] font-semibold capitalize text-detail">
              Payment Method
            </h3>
            <div className="flex flex-col gap-2 mt-7">
              <h3 className="text-[14px] text-detail capitalize">
                saved cards
              </h3>
              {cardNumber && ( // Check if card details exist before rendering
                <div className="w-full flex justify-between px-[25px] py-[10px] border border-lightGray rounded-md items-center">
                  <div className="w-full flex gap-4">
                    <FaCcVisa className="text-[50px] text-blue-800" />
                    <div className="flex flex-col justify-center">
                      <p className="text-[16px]">{cardNumber}</p>
                      <p className="text-[13px] text-inputText ">Expires {date}</p>
                    </div>
                  </div>
                  <RiDeleteBinLine 
                    onClick={()=>handleDelete()}
                  className="text-[20px] cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-[1.2]" />
                </div>
              )}
              <p
                className="t-[14px] text-button2 underline capitalize cursor-pointer"
                onClick={() => setNewPaymentModel(true)}
              >
                Add New Payment Method
              </p>
            </div>
          </div>
          <div className="flex gap-5 mt-5">
            <button
              className="w-[320px] h-[50px] text-center text-white bg-Green2 rounded-lg capitalize text-[20px] transition-transform duration-300 ease-in-out transform hover:scale-95"
              onClick={() => setOpenPassword(true)}
            >
              change password
            </button>
            <button
              className="w-[320px] h-[50px] text-center text-red-600 bg-none rounded-lg capitalize text-[20px] border-2 border-red-600 transition-transform duration-300 ease-in-out transform hover:scale-95"
              onClick={() => setDeleteModel(true)}
            >
              deactivate account
            </button>
          </div>
        </div>) : (
          //Mobile view


          <div className="relative max-w-[950px] flex mt-8 flex-col gap-10">
          <h2 className="text-[24px] font-semibold capitalize mb-10 w-full flex flex-col items-center justify-center text-center align-middle">my profile</h2>
          <div className="relative mt-2 h-[146px] w-[146px] mb-5  flex-col items-center justify-center text-center align-middle rounded-full">
            <Image
              src={imageUrl || "/profile.png"}
              alt="profile-pic"
              width={146}
              height={146}
              className="rounded-full object-cover w-full h-full overflow-hidden"
            />
            <br/><br/>
            <input
                type="file"
                id="imageInput"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />

              <button
                onClick={triggerFileInputClick}
                className="absolute show bottom-0 right-0 w-[3vmax] h-[3vmax] bg-button2 rounded-full flex justify-center items-center transition-transform duration-300 ease-in-out transform hover:scale-[1.1]"
              >
                <MdEdit size={23} color="white" />
              </button>
          </div>

          <div className="w-full flex flex-col gap-3">
            <div className="w-full flex flex-col items-center justify-center text-center align-middle">
              <h3 className="text-[18px] font-bold capitalize mb-3">
                personal info
              </h3>
              <button
                className="w-[91px] h-[31px] bg-none border-2 border-button2 text-[14px] text-center rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-[1.1] mr-1"
                onClick={() => setUpdateAccountModal(true)}
              >
                Edit
              </button>
            </div>
            <div className=" h-[30vh]  justify-center items-center w-full flex flex-col text-center align-middle">
              <h3 className="text-[18px] font-bold capitalize mb-3"></h3>
              <div className="flex flex-col items-center gap-1">
                <p className="text-[14px] text-inputText capitalize">
                  full name:
                </p>
                <p className="text-[14px] text-detail font-bold mb-2 capitalize">{userName}</p>
              </div>
              <div className="flex flex-col items-center gap-1">
                <p className="text-[14px] text-inputText capitalize">
                  Phone Number:
                </p>
                <p className="text-[14px] text-detail mb-2 font-bold capitalize">
                  {phoneNumber}
                </p>
              </div>
              <div className="flex flex-col items-center gap-1">
                <p className="text-[14px] text-inputText capitalize">email:</p>
                <p className="text-[14px] text-detail font-bold ">
                  {email}
                </p>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col gap-5 items-center justify-center text-center align-middle">
            <h3 className="text-[16px] font-semibold capitalize">
              address book
            </h3>
            <div className=" flex-row gap-4">
              {address1.length > 0 &&
                address1.slice(0, 3).map((address: any) => (
                  <div className="flex flex-col items-center justify-center text-center align-middle w-[50vw] h-full px-[50px] py-[25px] bg-orangeLight " key={address._id}>
                    <div className="w-full flex justify-between">
                      <p className="text-[10px] text-inputText capitalize">
                        
                      </p>
                      <p
                        className="text-[3vmin] text-button2 underline cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-[1.1] "
                        onClick={() => handleAddressEdit(address._id)}
                      >
                        Edit
                      </p>
                    </div>

                    <div className="mt-[30px] flex flex-col gap-1">
                      <h3 className="text-[5vmin] font-semibold capitalize text-detail">
                        {address.userName}
                      </h3>
                      <p className="text-[4vmin] capitalize text-detail">
                        {address.aptSuite}, {address.streetAddress}, {address.city}, {address.state}, {address.landmark}, {address.country}
                      </p>
                      <p className="text-[17px] capitalize text-detail">
                       {phoneNumber}
                      </p>
                    </div>
                  </div>
                ))}
              <div
                className="w-[50vw]  px-[50px] py-[25px] bg-orangeLight rounded-lg flex flex-col justify-center items-center gap-2 cursor-pointer"
                onClick={() => setNewAddress(true)}
              >
                <CiCirclePlus className="w-[50px] h-[50px] text-inputText transition-transform duration-300 ease-in-out transform hover:scale-[1.1]" />
                <h3 className="text-[16px] capitalize text-inputText">
                  Add New Address
                </h3>
              </div>
            </div>
          </div>
          <div className="w-full">
            <h3 className="text-[16px] font-semibold capitalize text-detail w-full flex flex-col items-center justify-center text-center align-middle">
              Payment Method
            </h3>
            <div className="flex flex-col gap-2 mt-7w-full items-center justify-center text-center align-middle">
              <h3 className="text-[14px] text-detail capitalize">
                saved cards
              </h3>
              {cardNumber && ( // Check if card details exist before rendering
                <div className="w-full flex justify-between px-[25px] py-[10px] border border-lightGray rounded-md items-center flex-col text-center align-middle">
                  <div className="w-full flex gap-4">
                    <FaCcVisa className="text-[50px] text-blue-800" />
                    <div className="flex flex-col justify-center">
                      <p className="text-[16px]">{cardNumber}</p>
                      <p className="text-[13px] text-inputText ">Expires {date}</p>
                    </div>
                  </div>
                  <RiDeleteBinLine 
                    onClick={()=>handleDelete()}
                  className="text-[20px] cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-[1.2]" />
                </div>
              )}
              <p
                className="t-[14px] text-button2 underline capitalize cursor-pointer"
                onClick={() => setNewPaymentModel(true)}
              >
                Add New Payment Method
              </p>
            </div>
          </div>
          <div className="flex gap-5 mt-5">
            <button
              className="w-[320px] h-[50px] text-center text-white bg-Green2 rounded-lg capitalize text-[3vmin] transition-transform duration-300 ease-in-out transform hover:scale-95"
              onClick={() => setOpenPassword(true)}
            >
              change password
            </button>
            <button
              className="w-[70vw] h-[50px] text-center text-red-600 bg-none rounded-lg capitalize text-[3vmin] border-2 border-red-600 transition-transform duration-300 ease-in-out transform hover:scale-95"
              onClick={() => setDeleteModel(true)}
            >
              deactivate account
            </button>
          </div>
        </div>)}
        
      </PageTransition>

      <DeleteAccount open={deleteModel} onClose={() => setDeleteModel(false)} />

      <ChangePassword
        open={openPassword}
        onClose={() => setOpenPassword(false)}

        
      />

      <DeleteAccount open={deleteModel} onClose={() => setDeleteModel(false)} />

      <AddNewPayment
        open={newPaymentModel}
        onClose={() => setNewPaymentModel(false)}
      />
      <EditAccountInfo
        open={updateAccountModal}
        userName={userName} email={email} phoneNumber={phoneNumber} 
        onClose={() => setUpdateAccountModal(false)}
      />
      <AddNewAddress open={newAddress} onClose={() => setNewAddress(false)} />
      <ChangeAddress
      open={changeAddress}
      onClose={() => setChangeAddress(false)}
      addresses={address1}
    />

    </>
  );
};

export default MyAccount;
