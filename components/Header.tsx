import Image from "next/image";
import NavItems from "./NavItems";
import UserDropdown from "./UserDropdown";

const Header = ({ user }: { user: User }) => {
  return (
    <nav className="bg-[#141414] lg:px-16 md:px-8 px-4 py-2 sm:py-4 flex items-center justify-between">
      <div   className="flex items-center cursor-pointer justify-center gap-2">
        <Image src="/Group(1).png" alt="Logo" width={30} height={300} />
        <span className="font-bold text-white text-xl">Signalist</span>
      </div>

      <div className="hidden md:block">
        <NavItems />
      </div>
      <UserDropdown user={user} />
    </nav>
  );
};

export default Header;
