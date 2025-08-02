"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Avatar from "../Avatar";
import MenuItems from "./MenuItems";
import { LuGlobe } from "react-icons/lu";
import { MdMenu } from "react-icons/md";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import useRentModal from "@/app/hooks/useRentModal";
import { useRouter } from "next/navigation";

interface MenuProps {
  currentUser?: SafeUser | null;
}

const Menu: React.FC<MenuProps> = ({ currentUser }) => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const toggleRent = useCallback(() => {
    if (!currentUser) {
      return registerModal.onOpen();
    }

    rentModal.onOpen();
    toggleOpen();
  }, [currentUser, registerModal, rentModal, toggleOpen]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div
      ref={menuRef}
      className="w-full hidden phone:flex items-center justify-end text-sm gap-2 relative"
    >
      <div
        onClick={rentModal.onOpen}
        className="font-bold whitespace-nowrap text-dark-gray p-3 hover:bg-hover-gray rounded-full cursor-pointer"
      >
        Airbnb your home
      </div>

      <span className="p-3 rounded-full hover:bg-hover-gray">
        <LuGlobe size={16} />
      </span>

      <div
        onClick={toggleOpen}
        className="flex items-center gap-2 px-2 py-1 rounded-full border border-border-gray shadow-sm hover:shadow-md cursor-pointer"
      >
        <MdMenu size={20} />
        <Avatar src={currentUser?.image} />
      </div>

      {isOpen && (
        <div className="absolute right-0 top-14 rounded-md card-shadow bg-white flex flex-col py-2 z-50">
          {currentUser ? (
            <>
              <MenuItems
                onClick={() => {
                  router.push("/listings");
                  setIsOpen(false);
                }}
                label="My properties"
                bold
              />
              <MenuItems
                onClick={() => {
                  router.push("/reservations");
                  setIsOpen(false);
                }}
                label="My Reservations"
                bold
              />
              <MenuItems
                onClick={() => {
                  router.push("/wishlist");
                  setIsOpen(false);
                }}
                label="Wishlist"
                border={true}
                bold
              />
              <MenuItems onClick={toggleRent} label="Airbnb your home" />
              <MenuItems onClick={() => {}} label="Account" border />
              <MenuItems onClick={() => {}} label="Help" />
              <MenuItems onClick={() => signOut()} label="Logout" />
            </>
          ) : (
            <>
              <MenuItems
                onClick={() => {
                  setIsOpen(false);
                  registerModal.onOpen();
                }}
                label="Sign up"
                bold
              />
              <MenuItems
                onClick={() => {
                  setIsOpen(false);
                  loginModal.onOpen();
                }}
                label="Log in"
                border
                bold
              />
              <MenuItems onClick={toggleRent} label="Airbnb your home" />
              <MenuItems onClick={() => {}} label="Help" />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Menu;
