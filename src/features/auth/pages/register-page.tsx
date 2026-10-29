import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  UserPlus,
  // Github,
  Check,
  X,
  Loader2,
} from "lucide-react";
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
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import {
  type RegisterFormValues,
  registerSchema,
} from "../schemas/auth-schema";
import {
  calculatePasswordStrength,
  getPasswordStrengthColor,
} from "../utils/password";
import { useRegister } from "../hooks/use-auth";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const { mutate: registerMutate, isPending } = useRegister();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      phone: "",
    },
  });

  const {
    register,
    formState: { errors },
  } = form;

  const password = useWatch({
    control: form.control,
    name: "password",
    defaultValue: "",
  });

  const onSubmit = (values: RegisterFormValues) => {
    registerMutate(values);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 to-slate-100 p-4 sm:p-6">
      <Card className="w-full max-w-md shadow-lg border-slate-200">
        <CardHeader className="space-y-1 pb-4 sm:pb-6">
          <div className="flex justify-center mb-2 sm:mb-4">
            <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center">
              <UserPlus className="h-6 w-6 text-primary-foreground" />
            </div>
          </div>

          <CardTitle className="text-xl sm:text-2xl font-semibold text-center">
            Buat Akun Baru
          </CardTitle>
          <CardDescription className="text-center text-slate-500 text-sm">
            Daftar untuk memulai perjalanan Anda
          </CardDescription>
        </CardHeader>

        <CardContent className="px-4 sm:px-6">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              {/* Account Information */}
              <FieldSet>
                <Field>
                  <FieldLabel htmlFor="register-fullName">
                    Nama Lengkap
                  </FieldLabel>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      id="register-fullName"
                      placeholder="John Doe"
                      className="pl-9"
                      autoComplete="name"
                      {...register("fullName")}
                    />
                  </div>
                  {errors.fullName && (
                    <FieldDescription className="text-red-500 text-xs">
                      {errors.fullName.message}
                    </FieldDescription>
                  )}
                </Field>

                <Field>
                  <FieldLabel htmlFor="register-email">Email</FieldLabel>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      id="register-email"
                      placeholder="nama@email.com"
                      className="pl-9"
                      type="email"
                      autoComplete="email"
                      {...register("email")}
                    />
                  </div>
                  {errors.email && (
                    <FieldDescription className="text-red-500 text-xs">
                      {errors.email.message}
                    </FieldDescription>
                  )}
                </Field>

                <Field>
                  <FieldLabel htmlFor="register-password">Password</FieldLabel>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      id="register-password"
                      placeholder="Minimal 8 karakter"
                      className="pl-9 pr-10"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      {...register("password")}
                      onChange={(e) => {
                        register("password").onChange(e);
                        calculatePasswordStrength(
                          e.target.value,
                          setPasswordStrength,
                        );
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>

                  {/* Password Strength Indicator */}
                  {password && (
                    <div className="mt-2 space-y-2">
                      <Progress
                        value={passwordStrength}
                        className={`h-1.5 ${getPasswordStrengthColor(passwordStrength)}`}
                      />
                      <div className="grid grid-cols-2 gap-1 text-xs">
                        <div className="flex items-center gap-1">
                          {password.length >= 8 ? (
                            <Check className="h-3 w-3 text-green-500" />
                          ) : (
                            <X className="h-3 w-3 text-red-400" />
                          )}
                          <span className="text-slate-500">
                            Min. 8 karakter
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          {/[A-Z]/.test(password) ? (
                            <Check className="h-3 w-3 text-green-500" />
                          ) : (
                            <X className="h-3 w-3 text-red-400" />
                          )}
                          <span className="text-slate-500">Huruf besar</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {/[a-z]/.test(password) ? (
                            <Check className="h-3 w-3 text-green-500" />
                          ) : (
                            <X className="h-3 w-3 text-red-400" />
                          )}
                          <span className="text-slate-500">Huruf kecil</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {/[0-9]/.test(password) ? (
                            <Check className="h-3 w-3 text-green-500" />
                          ) : (
                            <X className="h-3 w-3 text-red-400" />
                          )}
                          <span className="text-slate-500">Angka</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {errors.password && (
                    <FieldDescription className="text-red-500 text-xs">
                      {errors.password.message}
                    </FieldDescription>
                  )}
                </Field>
              </FieldSet>

              <FieldSet>
                <Field>
                  <FieldLabel
                    htmlFor="register-phone"
                    className="flex items-center gap-1"
                  >
                    Nomor HP
                  </FieldLabel>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      id="register-phone"
                      placeholder="08123456789"
                      className="pl-9"
                      type="tel"
                      autoComplete="tel"
                      {...register("phone")}
                    />
                  </div>
                  {errors.phone && (
                    <FieldDescription className="text-red-500 text-xs">
                      {errors.phone.message}
                    </FieldDescription>
                  )}
                </Field>
              </FieldSet>

              {/* Submit Button */}
              <Field>
                <Button
                  type="submit"
                  className="w-full font-medium"
                  size="lg"
                  disabled={isPending}
                >
                  {isPending ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <UserPlus className="h-4 w-4 mr-2" />
                  )}
                  Daftar Sekarang
                </Button>
              </Field>
            </FieldGroup>
          </form>

          {/* Social Login Separator */}
          <div className="relative mt-6 mb-6">
            <FieldSeparator />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-xs text-slate-400">
              atau daftar dengan
            </span>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-1 gap-2">
            <Button variant="outline" type="button" className="w-full">
              {/* <Github className="h-4 w-4 mr-2" /> */}
              GitHub
            </Button>
          </div>
        </CardContent>

        <CardFooter className="justify-center pb-6 pt-4 px-4 sm:px-6">
          <p className="text-sm text-slate-500 text-center">
            Sudah punya akun?{" "}
            <Link
              to={"/login"}
              type="button"
              className="text-primary hover:text-primary/80 hover:underline font-medium transition-colors"
            >
              Masuk sekarang
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RegisterPage;
