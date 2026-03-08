import react from "react";
import {FaDiscord, FaInstagram, FaTwitter, FaYoutube} from "react-icons/fa";
const Links = [{href: 'https://discord.com',icon: <FaDiscord />},
    {href :'https://twitter.com',icon: <FaTwitter />},
    {href:'https://youtube.com',icon: <FaYoutube />},
    {href:'https://www.instagram.com',icon: <FaInstagram />},
  ]
const Footer = () => {
    return (
       <footer className="w-screen bg-[#5724FF] py-4 text-black">
           <div className="container mx-auto flex flex-col items-center justify-center px-4 gap-4 md:flex-row md:justify-between">
               <p className="text-center text-sm md:text-light md:text-left">
                &copy;   Nova 2024. All rights reserved
               </p>
               <div className="flex justify-center gap-4 md:justify-start">
                   {Links.map((link) => (
                       <a key={link} href={link.href} target="_blank" rel="noopener noreferrer"
                       className="text-black tranitions-colors duration-500 ease-in-out hover:text-white hover:white">
                           {link.icon}
                       </a>
                   ))}
               </div>
               <a href="#privacy-policy"
               className="text-center text-sm hover:text-white md:text-right">
                   Privacy Policy
               </a>
           </div>
       </footer>
    )
}
export default Footer