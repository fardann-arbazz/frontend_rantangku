import { useState, useEffect } from "react";
import { Mail, ArrowLeft, Timer, Send, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldSet } from "@/components/ui/field";
import { getIconConfig } from "@/components/auth/icon-config";

const VerifyEmail = () => {
  const [verificationState, setVerificationState] = useState("pending");
  const [otpCode, setOtpCode] = useState(["", "", "", "", "", ""]);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (countdown > 0 && !canResend) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCanResend(true);
    }
  }, [countdown, canResend]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;

    const newOtp = [...otpCode];
    newOtp[index] = value;
    setOtpCode(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }

    if (index === 5 && value && newOtp.every((digit) => digit !== "")) {
      handleVerifyEmail(newOtp.join(""));
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !otpCode[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleVerifyEmail = async (code = otpCode.join("")) => {
    setVerificationState("verifying");
    console.log(code);

    setTimeout(() => {
      setVerificationState("success");
    }, 1500);
  };

  const handleResendCode = () => {
    setCanResend(false);
    setCountdown(60);
    setOtpCode(["", "", "", "", "", ""]);
    setVerificationState("pending");
  };

  const {
    icon: IconComponent,
    bgColor,
    iconColor,
    title,
    description,
  } = getIconConfig(verificationState);

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 to-slate-100 p-4 sm:p-6">
      <Card className="w-full max-w-md shadow-lg border-slate-200">
        <CardHeader className="space-y-1 pb-4 sm:pb-6">
          {verificationState === "pending" && (
            <div className="flex items-center gap-2 mb-4">
              <button
                type="button"
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors -ml-2"
              >
                <ArrowLeft className="h-4 w-4 text-slate-600" />
              </button>
            </div>
          )}

          <div className="flex justify-center mb-2 sm:mb-4">
            <div
              className={`h-12 w-12 rounded-xl ${bgColor} flex items-center justify-center`}
            >
              <IconComponent
                className={`h-6 w-6 ${iconColor} ${verificationState === "verifying" ? "animate-spin" : ""}`}
              />
            </div>
          </div>

          <CardTitle className="text-xl sm:text-2xl font-semibold text-center">
            {title}
          </CardTitle>
          <CardDescription className="text-center text-slate-500 text-sm">
            {description}
          </CardDescription>

          {verificationState === "pending" && (
            <div className="flex items-center justify-center gap-1.5 pt-1">
              <Mail className="h-4 w-4 text-slate-400" />
              <span className="text-sm font-medium text-slate-700">
                user@example.com
              </span>
            </div>
          )}
        </CardHeader>

        <CardContent className="px-4 sm:px-6">
          {/* Success State */}
          {verificationState === "success" && (
            <div className="space-y-4">
              <Button className="w-full font-medium" size="lg">
                Silahkan login ulang
              </Button>
            </div>
          )}

          {/* Error State */}
          {verificationState === "error" && (
            <div className="space-y-4">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setVerificationState("pending")}
                >
                  Coba Lagi
                </Button>
                <Button className="flex-1" onClick={handleResendCode}>
                  <Send className="h-4 w-4 mr-2" />
                  Kirim Ulang
                </Button>
              </div>
            </div>
          )}

          {/* Verifying State */}
          {verificationState === "verifying" && (
            <div className="space-y-4 py-4">
              <div className="flex flex-col items-center space-y-3">
                <p className="text-sm text-slate-500">
                  Memverifikasi kode keamanan
                </p>
              </div>
            </div>
          )}

          {/* Pending State */}
          {verificationState === "pending" && (
            <div className="space-y-6">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleVerifyEmail();
                }}
              >
                <FieldGroup>
                  <FieldSet>
                    <Field>
                      <div className="flex justify-center gap-2 sm:gap-3">
                        {otpCode.map((digit, index) => (
                          <div
                            key={index}
                            className="w-12 h-14 sm:w-14 sm:h-14"
                          >
                            <Input
                              id={`otp-${index}`}
                              type="text"
                              inputMode="numeric"
                              maxLength={1}
                              value={digit}
                              onChange={(e) =>
                                handleOtpChange(index, e.target.value)
                              }
                              onKeyDown={(e) => handleKeyDown(index, e)}
                              className="w-full h-full text-center text-xl sm:text-2xl font-semibold p-0"
                              autoComplete="one-time-code"
                              autoFocus={index === 0}
                            />
                          </div>
                        ))}
                      </div>
                    </Field>
                  </FieldSet>

                  <Field>
                    <Button
                      type="submit"
                      className="w-full font-medium"
                      size="lg"
                      disabled={otpCode.some((digit) => digit === "")}
                    >
                      <ShieldCheck className="h-4 w-4 mr-2" />
                      Verifikasi Email
                    </Button>
                  </Field>
                </FieldGroup>
              </form>

              <div className="space-y-3">
                <div className="flex items-center justify-center gap-2">
                  {!canResend ? (
                    <>
                      <Timer className="h-4 w-4 text-slate-400" />
                      <p className="text-sm text-slate-500">
                        Kirim ulang dalam{" "}
                        <span className="font-medium text-slate-700">
                          {Math.floor(countdown / 60)}:
                          {String(countdown % 60).padStart(2, "0")}
                        </span>
                      </p>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResendCode}
                      className="text-sm text-primary hover:text-primary/80 font-medium transition-colors flex items-center gap-1"
                    >
                      <Send className="h-4 w-4" />
                      Kirim ulang kode
                    </button>
                  )}
                </div>

                <p className="text-xs text-slate-400 text-center">
                  Tidak menerima email? Periksa folder spam atau{" "}
                  <button
                    type="button"
                    className="text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    coba alamat email lain
                  </button>
                </p>
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="justify-center pb-6 px-4 sm:px-6">
          <p className="text-sm text-slate-500 text-center">
            Butuh bantuan?{" "}
            <button
              type="button"
              className="text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Hubungi support
            </button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default VerifyEmail;
