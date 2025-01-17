"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      // Simulate API request
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setSuccess(
        "If an account exists with this email, a reset link will be sent."
      );
      console.log("Forgot password request sent for:", email);
    } catch (error) {
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 flex justify-center items-center">
      <div className="w-full max-w-md px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
            Forgot Password
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <Label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-11 rounded-lg"
                  required
                />
              </div>
            </div>

            {/* Error and Success Messages */}
            {error && (
              <p className="text-red-500 text-sm font-medium text-center">
                {error}
              </p>
            )}
            {success && (
              <p className="text-green-500 text-sm font-medium text-center">
                {success}
              </p>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 text-base font-medium bg-[#008e9b] hover:bg-[#007a85] transition-colors duration-200 rounded-xl"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>

          {/* Links */}
          <p className="mt-6 text-center text-sm">
            Remember your password?{" "}
            <Link href="/signin" className="text-[#008e9b] hover:underline">
              Sign in
            </Link>
          </p>
          <p className="mt-4 text-center text-sm">
            Create an account{" "}
            <Link href="/signup" className="text-[#008e9b] hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
