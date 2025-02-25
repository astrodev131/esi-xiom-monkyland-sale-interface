import Link from "next/link";
import Image from "next/image";
import {
  Twitter,
  MessageCircle,
  Instagram,
  Youtube,
  Facebook,
} from "lucide-react";

export default function Footer() {
  return (
    <footer
      className="py-5 pt-12 bottom-0 w-full  border-b border-gray-800 bg-[#0A0B0D]/80 backdrop-blur-[32px] text-[#cfcfcf] z-50"
      style={{ boxShadow: "0px 1px 0px 0px rgba(255, 255, 255, 0.15)" }}
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 animate-fadeIn">
          {/* Social Media & Logo */}
          <div className="flex flex-col items-center gap-5 md:items-start">
            <Link href="/" className="flex items-center gap-4">
              <Image
                alt="logo"
                src="/images/logo.png"
                width={120}
                height={120}
                className="h-full pb-2 transition-transform hover:scale-110"
              />
            </Link>
            <div className="flex space-x-4">
              {[Twitter, MessageCircle, Instagram, Youtube, Facebook].map(
                (Icon, index) => (
                  <Link
                    key={index}
                    href="#"
                    className="hover:text-yellow-400 border-1 border-b-white transition-all transform hover:scale-125 hover:shadow-lg duration-300"
                  >
                    <Icon size={30} className="drop-shadow-md" />
                  </Link>
                )
              )}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col items-center">
            <h3 className="text-2xl font-bold mb-6  pb-2">Quick Links</h3>
            <nav className="grid grid-cols-2 gap-x-8 gap-y-4 text-center md:text-left">
              {["Swap", "Pool", "Buy SOLDEX", "How To Buy", "Invite"].map(
                (item, index) => (
                  <Link
                    key={index}
                    href="#"
                    className="hover:text-yellow-400 transition-transform transform hover:scale-110 duration-300"
                  >
                    {item}
                  </Link>
                )
              )}
            </nav>
          </div>

          {/* Terms & Policies */}
          <div className="flex flex-col items-center md:items-end">
            <h3 className="text-2xl font-bold mb-6 pb-2">Legal</h3>
            <nav className="flex flex-col space-y-4 text-center md:text-right">
              {[
                "Terms & Conditions",
                "Privacy Policy",
                "Cookie Policy",
                "Legal Notice",
              ].map((item, index) => (
                <Link
                  key={index}
                  href="#"
                  className="hover:text-yellow-400 border-b border-white transition-transform transform hover:scale-110 duration-300"
                >
                  {item}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-4 border-t border-white/20 text-center">
          <p className="opacity-80 text-lg">
            &copy; {new Date().getFullYear()} MonkyLand. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
