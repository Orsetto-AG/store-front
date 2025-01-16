"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Phone, Lock, ChevronDown } from "lucide-react";

const countryCodes = [
  { code: "+41", name: "CH", flag: "🇨🇭" },
  { code: "+49", name: "DE", flag: "🇩🇪" },
  { code: "+43", name: "AT", flag: "🇦🇹" },
  { code: "+33", name: "FR", flag: "🇫🇷" },
  { code: "+44", name: "UK", flag: "🇬🇧" },
];

interface SMSVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SMSVerificationModal({
  isOpen,
  onClose,
}: SMSVerificationModalProps) {
  const [step, setStep] = useState(1);
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSendCode = () => {
    if (!phoneNumber) {
      setError("Bitte geben Sie Ihre Telefonnummer ein.");
      return;
    }
    setError("");
    setStep(2);
    console.log("Code sent to:", selectedCountry.code + phoneNumber);
  };

  const handleVerifyCode = () => {
    if (!verificationCode) {
      setError("Bitte geben Sie den Code ein.");
      return;
    }
    setError("");
    console.log("Code verified:", verificationCode);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="text-xl font-bold text-center mb-6">
          {step === 1 ? "Telefonnummer eingeben" : "Bestätigungscode eingeben"}
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            step === 1 ? handleSendCode() : handleVerifyCode();
          }}
          className="space-y-6"
        >
          {step === 1 && (
            <>
              {/* Alan Kodu ve Telefon Numarası */}
              <div className="flex gap-4">
                {/* Alan kodu seçme */}
                <div className="relative w-32" ref={dropdownRef}>
                  <Label className="text-sm font-medium text-gray-700">
                    Alan Kodu
                  </Label>
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full h-11 pl-4 pr-8 border rounded-lg flex items-center justify-between bg-white"
                  >
                    <span className="flex items-center gap-2">
                      <span>{selectedCountry.flag}</span>
                      <span>{selectedCountry.code}</span>
                    </span>
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  </button>

                  {isDropdownOpen && (
                    <ul className="absolute top-full left-0 mt-2 w-full border rounded-lg bg-white shadow-lg z-10">
                      {countryCodes.map((country) => (
                        <li
                          key={country.code}
                          onClick={() => {
                            setSelectedCountry(country);
                            setIsDropdownOpen(false);
                          }}
                          className="px-4 py-2 flex items-center gap-2 cursor-pointer hover:bg-gray-100"
                        >
                          <span>{country.flag}</span>
                          <span className="truncate">{country.name}</span>
                          <span className="ml-auto text-gray-500">
                            {country.code}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Telefon numarası */}
                <div className="flex-1">
                  <Label
                    htmlFor="phone"
                    className="text-sm font-medium text-gray-700"
                  >
                    Telefonnummer
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="phone"
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="79 123 45 67"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <div>
              <Label
                htmlFor="code"
                className="text-sm font-medium text-gray-700"
              >
                Bestätigungscode
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="code"
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="6-stelliger Code"
                  className="pl-10"
                  required
                />
              </div>
            </div>
          )}

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button
            type="submit"
            className="w-full h-12 text-base font-medium bg-[#008e9b] hover:bg-[#007a85] transition-colors duration-200 rounded-xl"
          >
            {step === 1 ? "Code senden" : "Bestätigen"}
          </Button>
        </form>
      </div>
    </div>
  );
}
