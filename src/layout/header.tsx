// import React from "react";
// import Link from "next/link";

// export default function Header() {
//   return (
//     <div className="flex flex-row justify-center">
//       <div
//         className="w-full max-w-[1440px] px-5 relative flex"
//         style={{ justifyContent: "space-between" }}
//       >
//         <Link
//           href="/"
//           className="flex flex-row items-center justify-start h-20 gap-4"
//         >
//           <img alt="logo" src="/images/monkey.png" className="h-full pb-2" />
//           <div className="hidden sm:flex h-full pt-1 pb-2">
//             <img alt="monkeyland" src="/images/monkeyland.png" className="" />
//           </div>
//         </Link>

//         <div
//           className="top-0 flex flex-row items-center  right-5"
//           style={{ width: "max-content" }}
//         >
//           <Link href="/presale">
//             <button className="px-5 py-2 bg-[#f67c2f] rounded-md text-[#eff3f6] h-12 text-base mr-4 ">
//               Presale
//             </button>
//           </Link>

//           <Link href="/affiliate" className="hidden md:flex">
//             <button className="px-5 py-2 bg-[#f67c2f] rounded-md text-[#eff3f6] h-12 text-base mr-4 ">
//               Affiliate
//             </button>
//           </Link>

//           <CustomWalletButton />
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CustomWalletButton } from "./WalletMultiButtonDynamic";

// import { Button } from "./Home/Button";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  return (
    <header
      className="fixed top-0 w-full border-b border-gray-800 bg-[#0A0B0D]/80 backdrop-blur-[32px] z-50"
      style={{ boxShadow: "0px 1px 0px 0px rgba(255, 255, 255, 0.15)" }}
    >
      <div className="max-w-[1540px] px-6 mt-1 mx-auto flex h-[71px] items-center justify-between">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="flex flex-row items-center min-w-[50px] justify-start h-16 gap-4"
          >
            <Image
              alt="logo"
              src="/images/monkey.png"
              className="h-full pb-2"
              width={60}
              height={50}
            />
            <div className="hidden sm:flex h-full pt-1 pb-2">
              <Image
                alt="monkeyland"
                src="/images/monkeyland.png"
                className=""
                width={120}
                height={50}
              />
            </div>
          </Link>
          <nav className="hidden xl:flex align-middle items-center gap-6">
            {[
              "How to Buy",
              "Tokenomics",
              "Whitepaper",
              "Roadmap",
              "Main Website",
              "Affiliate",
              "Audit Results",
            ].map((item) => (
              <Link
                key={item}
                href="#"
                className={`relative text-md text-[#cfcfcf] h-[70px] font-semibold hover:text-white transition-colors duration-500 flex items-center
        before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[2px] before:bg-[#f67c2f] before:transition-all before:duration-[1000ms] before:ease-in-out
        hover:before:w-full
        ${
          selectedItem === item ? "border-b-2 border-[#f67c2f] text-white" : ""
        }`}
                onClick={() => setSelectedItem(item)}
              >
                <div className="flex flex-col">
                  <div className="group">
                    <div className="block group-hover:opacity-0 group-hover:mb-7 duration-500">
                      {item}
                    </div>
                    <div className="opacity-0 absolute group-hover:opacity-100 group-hover:bottom-6 bottom-0 group-hover:block transition-all duration-500 ease-in-out">
                      {item}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex justify-end items-center gap-4">
          <div
            className="top-0 md:flex items-center right-5"
            style={{ width: "max-content" }}
          >
            <Link href="/presale">
              <button className="px-6 py-2 flex-row hidden  bg-[#f67c2f] rounded-md text-[#eff3f6] h-12 text-base mr-4">
                Presale
              </button>
            </Link>

            <Link href="/affiliate">
              <button className="px-5 py-2 flex-row hidden  bg-[#f67c2f] rounded-md text-[#eff3f6] h-12 text-base mr-4 ">
                Affiliate
              </button>
            </Link>

            <CustomWalletButton />
          </div>
          <div
            className="xl:hidden text-white cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="2xl:hidden z-50 flex flex-col items-center fixed top-0 left-0 h-screen w-full max-w-[600px] bg-[#0A0B0D]/90 border-l border-gray-800 shadow-xl backdrop-blur-lg animate-slideIn">
          <div
            className="absolute top-4 right-4 text-white cursor-pointer"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X className="h-6 w-6" />
          </div>
          {/* Navigation Links */}
          <nav className="px-6 w-full mt-20 py-6 space-y-3">
            {[
              "How to Buy",
              "Tokenomics",
              "Whitepaper",
              "Roadmap",
              "Main Website",
              "Affiliate",
              "Audit Results",
            ].map((item, index) => (
              <Link
                key={index}
                href="#"
                className="block text-xl text-[#cfcfcf] hover:text-white transition-transform hover:scale-105 duration-300 text-center py-2"
              >
                {item}
              </Link>
            ))}
          </nav>

          {/* Buttons */}
          <div className="w-[90%] flex flex-col gap-4 mt-6">
            <Link href="/presale">
              <button className="w-full py-3 bg-gradient-to-r from-[#f67c2f] to-[#ff9f1a] rounded-lg text-white font-semibold text-lg shadow-md hover:shadow-lg transform transition-all hover:scale-105">
                🚀 Presale
              </button>
            </Link>

            <Link href="/affiliate">
              <button className="w-full py-3 bg-gradient-to-r from-[#f67c2f] to-[#ff9f1a] rounded-lg text-white font-semibold text-lg shadow-md hover:shadow-lg transform transition-all hover:scale-105">
                🤝 Affiliate
              </button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
