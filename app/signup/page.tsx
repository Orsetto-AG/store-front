"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock } from "lucide-react";

export default function SignUp() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Bitte füllen Sie alle Felder aus.");
      return;
    }

    if (!termsAccepted) {
      setError("Sie müssen die AGB und Datenschutzbestimmungen akzeptieren.");
      return;
    }

    setError("");
    console.log("Sign up:", formData);
    // Backend API call to send form data
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
              Create Account
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
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
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              {/* AGB ve Datenschutz Checkbox */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="termsAccepted"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="h-5 w-5 border-gray-300 rounded-md focus:ring-2 focus:ring-[#008e9b]"
                />
                <label
                  htmlFor="termsAccepted"
                  className="text-sm text-gray-700"
                >
                  Ich akzeptiere die{" "}
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="text-[#008e9b] underline hover:text-[#007a85] cursor-pointer"
                  >
                    AGB
                  </a>{" "}
                  und{" "}
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="text-[#008e9b] underline hover:text-[#007a85] cursor-pointer"
                  >
                    Datenschutzbestimmungen
                  </a>
                </label>
              </div>

              <Button
                type="submit"
                className={`w-full h-12 text-base font-medium rounded-xl transition-colors duration-200 ${
                  termsAccepted
                    ? "bg-[#008e9b] hover:bg-[#007a85] cursor-pointer"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
                disabled={!termsAccepted}
              >
                Sign Up
              </Button>
            </form>

            <p className="mt-6 text-center text-sm">
              Already have an account?{" "}
              <Link href="/signin" className="text-[#008e9b] hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
