import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2, Lock, Mail } from "lucide-react";
import { login } from "@/api/login";
import { useUserStore } from "../../stores/UserStore";

// Validation Schema
const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export default function LoginPage() {
  const navigate = useNavigate();
  const { setUser } = useUserStore();

  // Initialize form
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {isSubmitting} = form.formState;

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      const res = await login(data);
      setUser(res?.data);
      navigate("/");
      toast.success(res?.message);
    } catch (error) {
      if (error?.response?.status === 401) {
        toast.error(error?.response?.data?.message);
      }
      else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-main-gold/20 via-white to-main-green/10 p-4">
      <Card className="w-full max-w-md shadow-2xl border-main-green/20">
        <CardHeader className="space-y-3 text-center">
          {/* Logo */}
          <div className="mx-auto w-20 h-20  rounded-2xl  overflow-hidden border-4 border-main-green shadow-lg">
            <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover" />
          </div>

          <CardTitle className="text-3xl font-bold text-main-green">
            Welcome Back
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-main-green font-semibold">Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          placeholder="your.email@example.com"
                          {...field}
                          className="pl-10 border-main-green/30 focus:border-main-green h-12"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-main-green font-semibold">Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          type="password"
                          placeholder="••••••••"
                          {...field}
                          className="pl-10 border-main-green/30 focus:border-main-green h-12"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Forgot Password Link */}
              {/* <div className="flex justify-end">
                <button
                  type="button"
                  className="text-sm text-main-green hover:underline font-medium"
                  onClick={() => toast.info("Password reset feature coming soon")}
                >
                  Forgot password?
                </button>
              </div> */}

              {/* Submit Button */}
              <Button
                disabled={isSubmitting}
                type="submit"
                className="w-full h-12 bg-main-green hover:bg-main-green/90 text-main-gold font-semibold text-lg shadow-lg"
              >
                {isSubmitting ? <Loader2 className="animate-spin"/> : "Login"}
              </Button>
            </form>
          </Form>


        </CardContent>
      </Card>
    </div>
  );
}
