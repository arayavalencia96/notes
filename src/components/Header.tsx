import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import SelectTheme from "./SelectTheme";
import Image from "next/image";

export default function Header() {
  const { data: sessionData } = useSession();
  return (
    <div className="navbar bg-primary text-primary-content">
      <div className="flex items-center gap-2">
        <Link
          href="/"
          aria-current="page"
          aria-label="HomePage"
          className="flex-0 btn btn-ghost gap-1 px-2 md:gap-2"
        >
          <Image src="/note.svg" alt="icono" width={48} height={48} />
          <div className="font-title inline-flex text-lg md:text-2xl">
            <span className="uppercase">M</span>
            <span className="lowercase">emowise</span>
          </div>
        </Link>
      </div>
      <div className="text-1xl flex-1 justify-end pl-5 font-bold">
        <SelectTheme />
        <div className="dropdown dropdown-end">
          {sessionData?.user ? (
            <div>
              <label tabIndex={0} className="avatar btn btn-circle btn-ghost">
                <div className="w-10 rounded-full">
                  <Image
                    width={48}
                    height={48}
                    src={sessionData?.user?.image ?? ""}
                    alt={sessionData?.user?.name ?? ""}
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="w-30 menu dropdown-content rounded-box menu-sm z-[1] mt-3 bg-base-100 p-2 shadow"
              >
                <li>
                  <a className="text-1xl flex-1 justify-center font-bold">
                    {sessionData?.user?.name ?? ""}
                  </a>
                </li>
                <li
                  className="text-1xl flex-1 justify-center font-bold"
                  onClick={() => void signOut()}
                >
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          ) : (
            <button
              className="btn-ghost.rounded-btn.btn"
              onClick={() => void signIn()}
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
