"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, XCircle } from "lucide-react";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Şifre kriterlerini kontrol eden fonksiyon
  const passwordCriteria = {
    length: password.length >= 8 && password.length <= 20,
    specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    uppercase: /[A-Z]/.test(password),
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (
      !passwordCriteria.length ||
      !passwordCriteria.specialChar ||
      !passwordCriteria.uppercase
    ) {
      setError("Password does not meet all the criteria.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      // Simulate API request
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setSuccess("Your password has been reset successfully!");
      console.log("Password reset request sent with new password:", password);
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
            Reset Password
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Password Field */}
            <div>
              <Label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                New Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 rounded-lg"
                required
              />
              <ul className="mt-2 space-y-1 text-sm">
                <li className="flex items-center space-x-2">
                  {passwordCriteria.length ? (
                    <CheckCircle className="text-green-500 w-5 h-5" />
                  ) : (
                    <XCircle className="text-red-500 w-5 h-5" />
                  )}
                  <span>8-20 characters</span>
                </li>
                <li className="flex items-center space-x-2">
                  {passwordCriteria.specialChar ? (
                    <CheckCircle className="text-green-500 w-5 h-5" />
                  ) : (
                    <XCircle className="text-red-500 w-5 h-5" />
                  )}
                  <span>At least one special character</span>
                </li>
                <li className="flex items-center space-x-2">
                  {passwordCriteria.uppercase ? (
                    <CheckCircle className="text-green-500 w-5 h-5" />
                  ) : (
                    <XCircle className="text-red-500 w-5 h-5" />
                  )}
                  <span>At least one uppercase letter</span>
                </li>
              </ul>
            </div>

            {/* Confirm Password Field */}
            <div>
              <Label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-gray-700"
              >
                Confirm New Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="h-11 rounded-lg"
                required
              />
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
              {loading ? "Resetting..." : "Reset Password"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
