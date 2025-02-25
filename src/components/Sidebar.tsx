import { useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa"; // Import icons

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // Mobile menu state

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden fixed md:flex flex-col bg-black w-64 h-screen p-4 text-white fixed top-0 left-0 z-[50] h-full">
        <h2 className="text-xl font-bold">SOLANEX</h2>
        <nav className="mt-4">
          <Link href="/swap" className="block py-2 px-3 hover:bg-gray-800">Swap</Link>
          <Link href="/pool" className="block py-2 px-3 hover:bg-gray-800">Pool</Link>
          <h3 className="mt-4 text-sm text-gray-400">Presale</h3>
          <Link href="/buy" className="block py-2 px-3 bg-purple-600 rounded">Buy SOLDEX</Link>
          <Link href="/how-to-buy" className="block py-2 px-3 hover:bg-gray-800">How To Buy</Link>
          <h3 className="mt-4 text-sm text-gray-400">Referral</h3>
          <Link href="/invite" className="block py-2 px-3 hover:bg-gray-800">Invite</Link>
        </nav>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden flex justify-between items-center p-4 bg-black text-white fixed w-full top-0 z-50">
        <h2 className="text-lg font-bold">SOLANEX</h2>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Sidebar (Slide-in effect) */}
      <div
        className={`fixed top-0 left-0 h-full bg-black text-white w-64 p-4 transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <button className="absolute top-4 right-4" onClick={() => setIsOpen(false)}>
          <FaTimes size={24} />
        </button>
        <nav className="mt-8">
          <Link href="/swap" className="block py-2 px-3 hover:bg-gray-800">Swap</Link>
          <Link href="/pool" className="block py-2 px-3 hover:bg-gray-800">Pool</Link>
          <h3 className="mt-4 text-sm text-gray-400">Presale</h3>
          <Link href="/buy" className="block py-2 px-3 bg-purple-600 rounded">Buy SOLDEX</Link>
          <Link href="/how-to-buy" className="block py-2 px-3 hover:bg-gray-800">How To Buy</Link>
          <h3 className="mt-4 text-sm text-gray-400">Referral</h3>
          <Link href="/invite" className="block py-2 px-3 hover:bg-gray-800">Invite</Link>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
