import React,{useEffect,useState} from "react";
import { motion } from "framer-motion";
import dropIn from "@/utils/motion";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface ModalProps {
  open: boolean;
  onClose: () => void; // Add the onClose function prop
}

const DeleteAccount: React.FC<ModalProps> = ({ open, onClose }) => {
  const router = useRouter();

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

  if (!open) return null;
  return (
    <>
    {isDesktop?(
      <div
      className="fixed top-0 left-0 z-50 w-full h-full flex  items-center justify-center bg-black  bg-opacity-50"
      onClick={onClose}
    >
      <motion.div
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="bg-white w-[540px] py-[25px] px-[48px] flex flex-col justify-center items-center rounded-xl "
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Image
          src="/deleteAcc.svg"
          alt="Delete-account"
          width={170}
          height={220}
        />

        <h2 className="text-[32px] capitalize text-center">
          Are You Sure You Want To Deactivate Your Account
        </h2>
        <div className="w-full flex items-center gap-5 mt-10">
          <button
            className="w-[214px] h-[38px] text-center bg-Red text-[14px] text-white rounded-md transition-transform duration-300 ease-in-out transform hover:scale-95"
            onClick={() => router.push("/")}
          >
            Deactivate
          </button>
          <button
            className="w-[214px] h-[38px] text-center bg-none text-[14px] text-button2 rounded-md border border-button2 transition-transform duration-300 ease-in-out transform hover:scale-95"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
    ):(
      //mobile view
      <div
      className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-start bg-black  bg-opacity-50 "
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
        <Image
          src="/deleteAcc.svg"
          alt="Delete-account"
          width={170}
          height={220}
        />

        <h2 className="text-[6vmin] capitalize text-center">
          Are You Sure You Want To Deactivate Your Account
        </h2>
        <div className="w-full flex flex-col items-center gap-5 mt-10 align-middle">
          <button
            className="w-[20vw] h-[38px] text-center bg-Red text-[14px] text-white rounded-md transition-transform duration-300 ease-in-out transform hover:scale-95"
            onClick={() => router.push("/")}
          >
            Deactivate
          </button>
          <button
            className="w-[20vw] h-[38px] text-center bg-none text-[14px] text-button2 rounded-md border border-button2 transition-transform duration-300 ease-in-out transform hover:scale-95"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
    )}
    </>
    
  );
};

export default DeleteAccount;
