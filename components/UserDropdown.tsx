"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";

import NavItems from "./NavItems";

import { useRouter } from "next/navigation";
import { signOut } from "@/lib/actions/auth.actions";

const UserDropdown = ({ user }: { user: User }) => {
  const router = useRouter();
  const handleSignOut = async () => {
    await signOut();

    router.push("/sign-in");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2  hover:bg-transparent! cursor-pointer  text-center"
        >
          <Avatar className="h-8 w-8">
            {user.image ? (
              <AvatarImage src={user.image} />
            ) : (
              <AvatarFallback className="bg-yellow-500 text-yellow-900 font-semibold text-sm">
                {user.name[0]}
              </AvatarFallback>
            )}
          </Avatar>

          <div className="hidden md:flex">
            <span className="text-sm font-semibold text-[#FFFFFF]">
              {user.name}
            </span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-black! mx-4!">
        <DropdownMenuLabel>
          <div className="flex relative items-center gap-3 py-2">
            <Avatar className="h-8 w-8">
              {user.image ? (
                <AvatarImage src={user.image} />
              ) : (
                <AvatarFallback className="bg-yellow-500 text-yellow-900 font-semibold text-sm">
                  {user.name[0]}
                </AvatarFallback>
              )}
            </Avatar>
            <div className="flex flex-col">
              <span className="text-base font-medium text-gray-400">
                {user.name}
              </span>
              <span className="text-sm text-gray-500">{user.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-gray-600" />
        <DropdownMenuItem
          onClick={handleSignOut}
          className="text-gray-100 text-base py-0! font-medium focus:bg-transparent focus:text-yellow-500 transition-colors cursor-pointer "
        >
          Log Out
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-gray-600" />
        <nav className="sm:hidden " onClick={() => console.log("Clicked")}>
          <NavItems />
        </nav>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
