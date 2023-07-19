/* eslint-disable @next/next/no-img-element */
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

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
          <img src="/note.svg" alt="icono" width={48} height={48} />
          <div className="font-title inline-flex text-lg md:text-2xl">
            <span className="uppercase">M</span>
            <span className="lowercase">emowise</span>
          </div>
        </Link>
      </div>
      <div className="text-1xl flex-1 justify-end pl-5 font-bold">
        {sessionData?.user?.name ? sessionData.user.name : ""}
        <div className="flex-none justify-between gap-2">
          <div className="dropdown dropdown-end">
            {sessionData?.user ? (
              <label
                tabIndex={0}
                className="avatar btn btn-circle btn-ghost"
                onClick={() => void signOut()}
              >
                <div className="w-10 rounded-full">
                  <img
                    src={sessionData?.user?.image ?? ""}
                    alt={sessionData?.user?.name ?? ""}
                  />
                </div>
              </label>
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
    </div>
  );
}
