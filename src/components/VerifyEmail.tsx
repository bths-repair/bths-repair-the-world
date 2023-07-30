import { Button } from "@material-tailwind/react";
import { signIn, signOut, useSession } from "next-auth/react";
import { FC, useEffect } from "react";
import useCountDown from "react-countdown-hook";
import { BiLinkExternal } from "react-icons/bi";

const VerifyEmail: FC = () => {
  const [timeLeft, { start, pause, resume, reset }] = useCountDown(25000, 1000);
  const { update } = useSession();
  useEffect(() => {
    start(-1);
  }, []);
  return (
    <div className="overflow-auto fixed top-0 left-0 flex-col p-10 w-screen h-screen text-center">
      <h1 className="vscale">Verify Your Email</h1>
      <div className="flex flex-row flex-wrap items-center w-full">
        <h4 className="w-full md:w-1/2 vscale">
          Not your account?
          <a onClick={() => signOut()} className="ml-2">
            Sign Out
          </a>
        </h4>
        <h4 className="w-full md:w-1/2 vscale">
          Verified through one of the following methods?
          <a onClick={() => signIn("auth0")} className="ml-2">
            Relogin to Confirm Verification
          </a>
        </h4>
      </div>
      <h5 className="vscale">
        Due to increased spam, this is now being enforced to alleviate it.
        Please follow the procedures below.
      </h5>
      <div className="flex flex-row flex-wrap w-full">
        <span className="p-2 w-full text-center md:w-1/2">
          <h3 className="vscale">Method 1.</h3>
          <p className="vscale">
            Due to a new club, messages may be sent to spam. Please check that.
            An email should have been sent the moment you registered. Then just
            relogin to confirm verification.
          </p>
          <Button
            color="blue"
            className="my-2 bg-blue-700 lg:p-4 p-[1.6vw] font-tyros vscale"
            ripple
            disabled={timeLeft > 0}
            onClick={() => {
              start(25000);
              fetch("/api/verify-email", { method: "POST" });
            }}
          >
            {timeLeft <= 0
              ? "Resend Email"
              : `Try another in ${Math.ceil(timeLeft / 1000)} seconds`}
          </Button>
        </span>
        <span className="w-full text-center md:w-1/2">
          <h3 className="vscale">Method 2.</h3>
          <p className="vscale">
            Head to our{" "}
            <a href={process.env.NEXT_PUBLIC_DISCORD_INVITE} target="_blank">
              Discord Server <BiLinkExternal className="inline" />
            </a>{" "}
            and verify your email there, by contacting a staff to obtain
            alternative means of verification.
          </p>
        </span>
      </div>
    </div>
  );
};

export default VerifyEmail;
