import { ArrowRight, Phone } from "lucide-react";
import type { GetServerSideProps } from "next";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/utils/api";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);
  return {
    props: { session },
  };
};

/* eslint-disable @next/next/no-img-element */
export default function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState<string>("+91");
  const [otp, setOtp] = useState<string>("");
  const [isOtpSent, setIsOtpSent] = useState(false);

  const { data: session } = useSession();

  useEffect(() => {
    console.log(session);
  }, [session]);

  const generateOtpMutation = api.twilioAuth.sendOTP.useMutation();
  const verifyOtpMutation = api.twilioAuth.verifyOTP.useMutation();

  const handleLogin = async () => {
    console.log("handleLogin");

    console.log({ phoneNumber, otp });
    if (isOtpSent) {
      if (!otp) return;

      const isVerified = await verifyOtpMutation.mutateAsync({
        phoneNumber,
        verificationCode: otp,
      });

      if (isVerified.status === "approved") {
        alert("Login success");
      } else {
        alert("Login failed");
      }

      console.log(isVerified);
    } else {
      if (!phoneNumber) return;
      setIsOtpSent(true);

      // send otp
      const otpID = await generateOtpMutation.mutateAsync({ phoneNumber });

      alert(`OTP sent to ${phoneNumber} with ID ${otpID.verificationSid}`);
    }
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 top-0 ">
      <div className="flex h-screen w-full bg-[#EDAE59] bg-[url(/dot_grid.png)] bg-right-bottom bg-no-repeat font-playfair">
        <div className="grid w-full grid-cols-12 gap-4">
          <div className="border-2xl col-span-3 justify-between rounded-tr-3xl bg-[#45259A]">
            <div className="flex h-full flex-col">
              <div className="flex flex-1 flex-col items-center justify-center">
                {session ? (
                  <div className="flex flex-col items-center justify-center gap-8">
                    <div>
                      <img
                        className="h-20 rounded-full ring-4 ring-white"
                        src="/PattaGobhi.png"
                        alt="patta"
                      />
                    </div>
                    <div className="flex gap-2 text-white transition-all duration-700">
                      <input
                        value={isOtpSent ? otp : phoneNumber}
                        onChange={(e) =>
                          isOtpSent
                            ? setOtp(e.currentTarget.value || "")
                            : setPhoneNumber(e.currentTarget.value || "")
                        }
                        onKeyDown={(e) =>
                          isOtpSent
                            ? setOtp(e.currentTarget.value || "")
                            : setPhoneNumber(e.currentTarget.value || "")
                        }
                        onKeyUp={(e) =>
                          isOtpSent
                            ? setOtp(e.currentTarget.value || "")
                            : setPhoneNumber(e.currentTarget.value || "")
                        }
                        className="rounded-md bg-[#9D5EE8] px-4 placeholder-white transition-all duration-700 focus:outline-none focus:ring-0"
                        placeholder={
                          isOtpSent ? "Enter OTP" : "Enter your phone number"
                        }
                      />
                      <div>
                        <button
                          onClick={() => {
                            void handleLogin();
                          }}
                          className="flex items-center justify-center rounded-md bg-[#EDAE59] px-4 py-3 transition-all duration-700"
                        >
                          {isOtpSent ? (
                            <ArrowRight color="black" />
                          ) : (
                            <Phone color="black" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => void signIn("discord")}
                    className="rounded bg-[#EDAE59] px-8 py-2 text-black"
                  >
                    Login
                  </button>
                )}
              </div>
              <div className="rounded-tr-3xl bg-[#240C64] px-6 py-12 text-3xl font-bold leading-none tracking-wide text-[#EDAE59]">
                Start creating and let inspiration follow
              </div>
            </div>
          </div>
          <div className="col-span-6">.</div>
        </div>
        <div className="absolute right-0 top-0 p-12">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className=" h-40" src="/squares.svg" alt="squares" />
        </div>
      </div>
    </div>
  );
}
