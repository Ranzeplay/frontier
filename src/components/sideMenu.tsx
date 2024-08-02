import {
  BookHeart,
  Calendar,
  Image,
  LayoutDashboard,
  Notebook,
  Settings,
  Vault,
  Wallet,
} from "lucide-react";

export default function SideMenu() {
  return (
    <div className="h-screen sticky top-0 w-12 bg-blue-950 text-white py-2 flex flex-col z-50">
      <ul className="space-y-2 flex-grow -ml-0.5">
        <li className="p-2 hover:bg-blue-900 cursor-pointer">
          <a href="/">
            <LayoutDashboard size={30} strokeWidth={1.3} className="mx-auto" />
          </a>
        </li>
        <li className="p-2 hover:bg-blue-900 cursor-pointer">
          <a href="/notebook">
            <Notebook size={30} strokeWidth={1.3} className="mx-auto" />
          </a>
        </li>
        <li className="p-2 hover:bg-blue-900 cursor-pointer">
          <a href="/diary">
            <BookHeart size={30} strokeWidth={1.3} className="mx-auto" />
          </a>
        </li>
        <li className="p-2 hover:bg-blue-900 cursor-pointer">
          <a href="/calendar">
            <Calendar size={30} strokeWidth={1.3} className="mx-auto" />
          </a>
        </li>
        <li className="p-2 hover:bg-blue-900 cursor-pointer">
          <a href="/image">
            <Image size={30} strokeWidth={1.3} className="mx-auto" />
          </a>
        </li>
        <li className="p-2 hover:bg-blue-900 cursor-pointer">
          <a href="/accounting">
            <Wallet size={30} strokeWidth={1.3} className="mx-auto" />
          </a>
        </li>
        <li className="p-2 hover:bg-blue-900 cursor-pointer">
          <a href="/vault">
            <Vault size={30} strokeWidth={1.3} className="mx-auto" />
          </a>
        </li>
      </ul>

      <ul className="space-y-2 -ml-0.5">
        <li className="p-2 hover:bg-blue-900 cursor-pointer">
          <a href="/settings">
            <Settings size={30} strokeWidth={1.3} className="mx-auto" />
          </a>
        </li>
      </ul>
    </div>
  );
}
