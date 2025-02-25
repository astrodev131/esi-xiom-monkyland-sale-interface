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
    <footer className="py-10 bg-[#e7a324]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Social Media & Logo */}
          <div className="flex flex-col items-center gap-5 md:items-start">
            <Link
              href="/"
              className="flex flex-row items-center justify-start h-[120px] gap-4"
            >
              <Image
                alt="logo"
                src="/images/logo.png"
                width={120}
                height={120}
                className="h-full pb-2"
              />
            </Link>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="hover:text-yellow-300 transition-colors duration-300"
              >
                <Twitter size={28} />
              </Link>
              <Link
                href="#"
                className="hover:text-yellow-300 transition-colors duration-300"
              >
                <MessageCircle size={28} />
              </Link>
              <Link
                href="#"
                className="hover:text-yellow-300 transition-colors duration-300"
              >
                <Instagram size={28} />
              </Link>
              <Link
                href="#"
                className="hover:text-yellow-300 transition-colors duration-300"
              >
                <Youtube size={28} />
              </Link>
              <Link
                href="#"
                className="hover:text-yellow-300 transition-colors duration-300"
              >
                <Facebook size={28} />
              </Link>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col items-center">
            <h3 className="text-2xl font-bold mb-6">Quick Links</h3>
            <nav className="grid grid-cols-2 gap-x-8 gap-y-4 text-center md:text-left">
              <Link
                href="#"
                className="hover:text-yellow-300 transition-colors duration-300"
              >
                Swap
              </Link>
              <Link
                href="#"
                className="hover:text-yellow-300 transition-colors duration-300"
              >
                Pool
              </Link>

              <Link
                href="#"
                className="hover:text-yellow-300 transition-colors duration-300"
              >
                Buy SOLDEX
              </Link>
              <Link
                href="#"
                className="hover:text-yellow-300 transition-colors duration-300"
              >
                How To Buy
              </Link>

              <Link
                href="#"
                className="hover:text-yellow-300 transition-colors duration-300"
              >
                Invite
              </Link>
            </nav>
          </div>

          {/* Terms & Policies */}
          <div className="flex flex-col items-center md:items-end">
            <h3 className="text-2xl font-bold mb-6">Legal</h3>
            <nav className="flex flex-col space-y-4 text-center md:text-right">
              <Link
                href="#"
                className="hover:text-yellow-300 transition-colors duration-300"
              >
                Terms & Conditions
              </Link>
              <Link
                href="#"
                className="hover:text-yellow-300 transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="hover:text-yellow-300 transition-colors duration-300"
              >
                Cookie Policy
              </Link>
              <Link
                href="#"
                className="hover:text-yellow-300 transition-colors duration-300"
              >
                Legal Notice
              </Link>
            </nav>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-white/20 text-center">
          <p>
            &copy; {new Date().getFullYear()} MonkyLand. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
