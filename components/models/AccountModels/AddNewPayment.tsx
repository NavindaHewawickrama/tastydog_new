import React,{useState,useEffect} from "react";
import { motion } from "framer-motion";
import dropIn from "@/utils/motion";
import { useRouter } from "next/navigation";
import { BsCreditCard } from "react-icons/bs";
import { FaPaypal } from "react-icons/fa";
import CustomAlert from "../../../app/alerts/customalert";
interface ModalProps {
  open: boolean;
  onClose: () => void; // Add the onClose function prop
}

const AddNewPayment: React.FC<ModalProps> = ({ open, onClose }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [name,setName] = useState("");
  const [date,setDate] = useState("");
  const [cvv,setCvv] = useState("");
  const cardType = "Visa";
  const [saveForFuture,setSaveForFuture] = useState(false);
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
  
  if (!open) return null;
  

  const handleClick = ()=>{
    const uId = localStorage.getItem("userId");
    try{
      const response = fetch("https://tasty-dog.onrender.com/api/v1/cards/addCard",{
        method:"POST",
        headers: {
          "Content-Type":"application/json",
        },
        body: JSON.stringify({
          userId: uId,
          cardNumber: cardNumber,
          cardType: cardType,
          cardholderName: name,
          expirationDate: date,
        }),
      });
      if(!response){
        // window.alert("Some kind of problem occured. Please try again.");
        setAlertMessage("Some kind of problem occured. Please try again.");
        handleShowAlert();
        console.log(response);
      }else{
        // window.alert("Payment method added successfully.");
        setAlertMessage("Payment method added successfully.");
        handleShowAlert();
        console.log(response);
        window.location.reload();
      }
    }catch(error){
      // window.alert("Error in adding payment method");
      setAlertMessage("Error in adding payment method");
      handleShowAlert();
      console.log(error);
    }

  };

  const handleSaveForFuture = () => {
    // Toggle the saveForFuture state
    setSaveForFuture(!saveForFuture);
  
    if (!saveForFuture) {
      // If checkbox is checked, save card details in localStorage or state variable
      localStorage.setItem("savedCardDetails", JSON.stringify({ cardNumber, name, date, cvv }));
    } else {
      // If checkbox is unchecked, remove saved card details
      localStorage.removeItem("savedCardDetails");
    }
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove non-digit characters

    if (value.length > 16) {
      value = value.slice(0, 16);
    }

    const formattedValue = value
      .match(/.{1,4}/g)
      ?.join(" ")
      .trim() || "";

    setCardNumber(formattedValue);
  };

  

  return (
    <>
    {isDesktop?(
      <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <motion.div
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="w-[564px] bg-white shadow-xl py-[20px] rounded-xl"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="w-[452px] mx-auto">
          <div className="flex justify-between">
            <h3 className="text-[15px] capitalize font-semibold">
              Add New Payment method
            </h3>
            <h3
              className="text-[15px] capitalize cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-[1.3] hover:text-red-600"
              onClick={onClose}
            >
              X
            </h3>
          </div>
          <div className="w-full flex flex-col gap-3 mt-7">
            <h2 className="text-[24px] font-semibold capitalize">
              Select Payment Method
            </h2>
            <div className="w-full flex items-center gap-2">
              <button className="w-[224px] h-[48px] flex text-center bg-primary text-white text-[12px] rounded-[4px] justify-center items-center gap-3">
                <BsCreditCard className=" text-[20px]  text-white" />
                Credit/Debit Card
              </button>
              {/* <button className="w-[224px] h-[48px] flex text-center bg-none text-black border border-gray-400 justify-center items-center rounded-[4px] gap-3">
                <FaPaypal className="text-[20px] text-blue-900" />
                PayPal
              </button> */}
            </div>
          </div>
          <div className="w-full flex flex-col justify-center mt-10 ">
            <div className="w-full mb-4 flex flex-col gap-2">
              <p className="text-[12px] text-inputText capitalize">
                cardholder name
              </p>
              <div className="w-full h-[48px] bg-inputBlue  rounded-lg border-2 border-inputBorder">
                <input
                  type="text"
                  className="w-full outline-none bg-transparent h-full font-normal text-[14px] text-inputText px-4"
                  onChange={(e)=>setName(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full mb-4 flex flex-col gap-2 ">
              <p className="text-[12px] text-inputText capitalize">
                card Number
              </p>
              <div className="w-full h-[48px] bg-inputBlue  rounded-lg border-2 border-inputBorder">
              <input
                type="text"
                maxLength={19} // Limit input to 16 digits
                className="w-full outline-none bg-transparent h-full font-normal text-[14px] text-inputText px-4"
                value={cardNumber}
                onChange={handleCardNumberChange}
              />
              </div>
            </div>
            <div className="w-full mb-4 flex flex-col gap-2 ">
              <div className="flex flex-row item-center gap-3 w-full h-full">
                <div className="w-[225px]">
                  <p className="text-[12px] text-inputText capitalize mb-2">
                    Expiration Date (MM/YYYY)
                  </p>
                  <div className="w-full h-[48px] bg-inputBlue  rounded-lg border-2 border-inputBorder">
                    <input
                      type="text"
                      placeholder="MM/YYYY"
                      className="w-full outline-none bg-transparent h-full font-normal text-[14px] text-inputText px-4"
                      onChange={(e) => setDate(e.target.value)}
                      maxLength={7} // Limit input to MM/YYYY format
                      pattern="\d{2}/\d{4}" // Validate MM/YYYY format
                    />
                  </div>
                </div>
                <div className="w-[225px]">
                  <p className="text-[12px] text-inputText capitalize mb-2">
                    CVV
                  </p>
                  <div className="w-full h-[48px] bg-inputBlue  rounded-lg border-2 border-inputBorder">
                    <input
                      type="text"
                      placeholder="CVV"
                      className="w-full outline-none bg-transparent h-full font-normal text-[14px] text-inputText px-4"
                      onChange={(e)=>setCvv(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center mt-4">
          <input
              id="default-checkbox"
              type="checkbox"
              checked={saveForFuture}
              onChange={handleSaveForFuture}
              className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="save for future payments"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Save This Card For Future Payments
            </label>
          </div>

          <div className="w-full flex items-center gap-5 mt-[50px]">
            <button
              className="w-[214px] h-[38px] text-center bg-Green2 text-[14px] text-white rounded-md transition-transform duration-300 ease-in-out transform hover:scale-95"
              // onClick={() => window.location.reload()}
                onClick={()=>handleClick()}
            >
              Save
            </button>
            <button
              className="w-[214px] h-[38px] text-center bg-none text-[14px] text-button2 rounded-md border border-button2 transition-transform duration-300 ease-in-out transform hover:scale-95"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
        <CustomAlert 
              message={alertMessage}
              show={showAlert} 
              onClose={() => setShowAlert(false)} 
            />
      </motion.div>
    </div>
    ):(


      //mobile view

      <div
      className="fixed inset-0 z-50 flex items-center justify-start bg-black bg-opacity-50"
      onClick={onClose}
    >
      <motion.div
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="bg-white w-[100vw] py-[25px]  flex flex-col items-center rounded-xl align-middle"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="w-[452px] mx-auto">
          <div className="flex justify-between">
            <h3 className="text-[15px] capitalize p-2 font-semibold">
              Add New Payment method
            </h3>
            <h3
              className="text-[15px] capitalize cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-[1.3] hover:text-red-600"
              onClick={onClose}
            >
              X
            </h3>
          </div>
          <div className="w-full flex flex-col gap-3 mt-7">
            <h2 className="text-[24px] p-2 font-semibold capitalize">
              Select Payment Method
            </h2>
            <div className="w-full flex p-2 items-center gap-2">
              <button className="w-[224px] h-[48px] flex text-center bg-primary text-white text-[12px] rounded-[4px] justify-center items-center gap-3">
                <BsCreditCard className=" text-[20px]  text-white" />
                Credit/Debit Card
              </button>
              {/* <button className="w-[224px] h-[48px] flex text-center bg-none text-black border border-gray-400 justify-center items-center rounded-[4px] gap-3">
                <FaPaypal className="text-[20px] text-blue-900" />
                PayPal
              </button> */}
            </div>
          </div>
          <div className="w-full flex flex-col p-2 justify-center mt-10 ">
            <div className="w-full mb-4 flex flex-col gap-2">
              <p className="text-[12px] text-inputText capitalize">
                cardholder name
              </p>
              <div className="w-[90vw] h-[48px] bg-inputBlue  rounded-lg border-2 border-inputBorder">
                <input
                  type="text"
                  className="w-[85vw] outline-none bg-transparent h-full font-normal text-[14px] text-inputText px-4"
                  onChange={(e)=>setName(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full mb-4 flex flex-col gap-2 ">
              <p className="text-[12px] text-inputText capitalize">
                card Number
              </p>
              <div className="w-[90vw] h-[48px] bg-inputBlue  rounded-lg border-2 border-inputBorder">
              <input
                type="text"
                maxLength={19} // Limit input to 16 digits
                className="w-[85vw] outline-none bg-transparent h-full font-normal text-[14px] text-inputText px-4"
                value={cardNumber}
                onChange={handleCardNumberChange}
              />
              </div>
            </div>
            <div className="w-full mb-4 flex flex-col gap-2 ">
              <div className="flex flex-row item-center gap-3 w-full h-full">
                <div className="w-[225px]">
                  <p className="text-[12px] text-inputText capitalize mb-2">
                    Expiration Date (MM/YYYY)
                  </p>
                  <div className="w-[30vw] h-[48px] bg-inputBlue  rounded-lg border-2 border-inputBorder">
                    <input
                      type="text"
                      placeholder="MM/YYYY"
                      className="w-[30vw] outline-none bg-transparent h-full font-normal text-[14px] text-inputText px-4"
                      onChange={(e) => setDate(e.target.value)}
                      maxLength={7} // Limit input to MM/YYYY format
                      pattern="\d{2}/\d{4}" // Validate MM/YYYY format
                    />
                  </div>
                </div>
                <div className="w-[225px]">
                  <p className="text-[12px] text-inputText capitalize mb-2">
                    CVV
                  </p>
                  <div className="w-[30vw] h-[48px] bg-inputBlue  rounded-lg border-2 border-inputBorder">
                    <input
                      type="text"
                      placeholder="CVV"
                      className="w-[30vw] outline-none bg-transparent h-full font-normal text-[14px] text-inputText px-4"
                      onChange={(e)=>setCvv(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex p-2 items-center mt-4">
          <input
              id="default-checkbox"
              type="checkbox"
              checked={saveForFuture}
              onChange={handleSaveForFuture}
              className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="save for future payments"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Save This Card For Future Payments
            </label>
          </div>

          <div className="w-full flex flex-col items-center gap-5 mt-[50px]">
            <button
              className="w-[214px] h-[38px] text-center bg-Green2 text-[14px] text-white rounded-md transition-transform duration-300 ease-in-out transform hover:scale-95"
              // onClick={() => window.location.reload()}
                onClick={()=>handleClick()}
            >
              Save
            </button>
            <button
              className="w-[214px] h-[38px] text-center bg-none text-[14px] text-button2 rounded-md border border-button2 transition-transform duration-300 ease-in-out transform hover:scale-95"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
        <CustomAlert 
              message={alertMessage}
              show={showAlert} 
              onClose={() => setShowAlert(false)} 
            />
      </motion.div>
    </div>
    )}
    </>
    
  );
};

export default AddNewPayment;
