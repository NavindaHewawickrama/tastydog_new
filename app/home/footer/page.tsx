import Link from "next/link";
import { useEffect,useState } from "react";

export default function Footer() {

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
  return (
    <>
    {isDesktop?(
      <footer className="w-full py-4 bg-primary text-white">
      <div className="flex justify-between container mx-auto px-4">
        <div className="flex space-x-10">
          <Link href="/home" className="hover:underline">
            Home
          </Link>
          <Link href="/settings" className="hover:underline">
            Settings
          </Link>
          <Link href="https://tastydog.com.au/about-us" rel="noopener noreferrer" target="_blank" className="hover:underline">
            About
            </Link>
            <Link href="https://tastydog.com.au/contact-us"  rel="noopener noreferrer" target="_blank" className="hover:underline">
            Contact
            </Link>
        </div>
        <div className="flex space-x-10">
        <Link href="https://sites.google.com/view/tastydog-privacy-policy"  rel="noopener noreferrer" target="_blank" className="hover:underline">
            Privacy Policy
          </Link>
          <Link  href="https://sites.google.com/view/termsandconditions-tastydog"   rel="noopener noreferrer" target="_blank" className="hover:underline">
            Terms and Conditions
          </Link>
        </div>
      </div>
    </footer>
    ):(
      <footer className="w-full py-4 bg-primary text-white">
      <div className="flex justify-between container mx-auto px-4">
        <div className="flex space-x-[10vw] text-[0.5rem]">
          <Link href="/home" className="hover:underline">
            Home
          </Link>
          <Link href="/settings" className="hover:underline">
            Settings
          </Link>
          <Link href="https://tastydog.com.au/about-us" rel="noopener noreferrer" target="_blank" className="hover:underline">
            About
            </Link>
            <Link href="https://tastydog.com.au/contact-us"  rel="noopener noreferrer" target="_blank" className="hover:underline">
            Contact
            </Link>
          <Link href="https://sites.google.com/view/tastydog-privacy-policy"  rel="noopener noreferrer" target="_blank" className="hover:underline">
            Privacy Policy
          </Link>
          <Link  href="https://sites.google.com/view/termsandconditions-tastydog"   rel="noopener noreferrer" target="_blank" className="hover:underline">
            Terms and Conditions
          </Link>
        </div>
      </div>
    </footer>
    )}
    </>
    
  );
}
