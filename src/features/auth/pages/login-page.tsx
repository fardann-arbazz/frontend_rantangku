import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Mail, Lock, LogIn, Loader2 } from "lucide-react";
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
import { Separator } from "@/components/ui/separator";

import {
  Field,
  FieldContent,
  FieldLabel,
  FieldError,
  FieldGroup,
  FieldSet,
} from "@/components/ui/field";
import { loginSchema, type LoginFormValues } from "../schemas/auth-schema";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/use-auth";

const LoginPage = () => {
  // const user = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: login, isPending } = useLogin();
  // const navigate = useNavigate();

  // if (user) {
  //   navigate("/home");
  // }

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: LoginFormValues) => {
    login(values);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 to-slate-100 p-4">
      <Card className="w-full max-w-md shadow-lg border-slate-200">
        {/* HEADER */}
        <CardHeader className="space-y-1 pb-6">
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center">
              <LogIn className="h-6 w-6 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl font-semibold text-center">
            Selamat Datang Kembali
          </CardTitle>
          <CardDescription className="text-center text-slate-500">
            Masuk ke akun Anda untuk melanjutkan
          </CardDescription>
        </CardHeader>

        {/* CONTENT */}
        <CardContent className="space-y-4">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldSet className="space-y-4">
              <FieldGroup>
                {/* EMAIL */}
                <Field>
                  <FieldLabel className="text-slate-700">Email</FieldLabel>
                  <FieldContent>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        {...form.register("email")}
                        type="email"
                        placeholder="nama@email.com"
                        className="pl-9"
                        autoComplete="email"
                      />
                    </div>
                  </FieldContent>
                  <FieldError className="text-xs">
                    {form.formState.errors.email?.message}
                  </FieldError>
                </Field>

                {/* PASSWORD */}
                <Field>
                  <FieldLabel className="text-slate-700">Password</FieldLabel>
                  <FieldContent>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        {...form.register("password")}
                        type={showPassword ? "text" : "password"}
                        placeholder="Masukkan password Anda"
                        className="pl-9 pr-10"
                        autoComplete="current-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </FieldContent>
                  <FieldError className="text-xs">
                    {form.formState.errors.password?.message}
                  </FieldError>
                </Field>
              </FieldGroup>

              {/* OPTIONS */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    className="rounded border-slate-300 text-primary focus:ring-primary/20"
                  />
                  Ingat saya
                </label>

                <button
                  type="button"
                  className="text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  Lupa password?
                </button>
              </div>

              {/* SUBMIT */}
              <Button
                type="submit"
                className="w-full font-medium"
                size="lg"
                disabled={isPending}
              >
                {isPending ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <LogIn className="h-4 w-4 mr-2" />
                )}
                Masuk
              </Button>
            </FieldSet>
          </form>

          {/* SEPARATOR */}
          <div className="relative">
            <Separator className="my-4" />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-xs text-slate-400">
              atau lanjutkan dengan
            </span>
          </div>

          <div className="grid grid-cols-1 gap-2 pt-2">
            {" "}
            <Button variant="outline" type="button" className="w-full">
              {" "}
              Google
            </Button>
          </div>
        </CardContent>

        {/* FOOTER */}
        <CardFooter className="justify-center pb-6">
          <p className="text-sm text-slate-500">
            Belum punya akun?{" "}
            <Link
              to={"/register"}
              type="button"
              className="text-primary hover:text-primary/80 hover:underline font-medium transition-colors"
            >
              Daftar sekarang
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
