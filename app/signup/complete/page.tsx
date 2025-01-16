"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useRouter } from "next/navigation";
import SMSVerificationModal from "@/components/SMSVerificationModal";
import { User, Building2, MapPin, Calendar, Mail, Phone } from "lucide-react";
import { Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FormData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  country: string;
  postalCode: string;
  city: string;
  street: string;
  houseNumber: string;
  companyName: string;
  isTaxable: boolean;
  taxNumber: string;
  isRegistered: boolean;
  registrationNumber: string;
  isAuthorizedSignatory: boolean;
  authorizedGender: string;
  authorizedFirstName: string;
  authorizedLastName: string;
}

export default function SignUpComplete() {
  const [accountType, setAccountType] = useState<"private" | "business">(
    "private"
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    country: "",
    postalCode: "",
    city: "",
    street: "",
    houseNumber: "",
    companyName: "",
    isTaxable: false,
    taxNumber: "",
    isRegistered: false,
    registrationNumber: "",
    isAuthorizedSignatory: true,
    authorizedGender: "",
    authorizedFirstName: "",
    authorizedLastName: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName) newErrors.firstName = "Vorname ist erforderlich";
    if (!formData.lastName) newErrors.lastName = "Nachname ist erforderlich";
    if (!formData.dateOfBirth)
      newErrors.dateOfBirth = "Geburtsdatum ist erforderlich";
    if (!formData.country) newErrors.country = "Land ist erforderlich";
    if (!formData.postalCode) newErrors.postalCode = "PLZ ist erforderlich";
    if (!formData.city) newErrors.city = "Ort ist erforderlich";
    if (!formData.street) newErrors.street = "Strasse ist erforderlich";
    if (!formData.houseNumber)
      newErrors.houseNumber = "Hausnummer ist erforderlich";

    if (accountType === "business") {
      if (!formData.companyName)
        newErrors.companyName = "Firmenname ist erforderlich";
      if (formData.isTaxable && !formData.taxNumber) {
        newErrors.taxNumber = "Mehrwertsteuernummer ist erforderlich";
      }
      if (formData.isRegistered && !formData.registrationNumber) {
        newErrors.registrationNumber = "Handelsregisternummer ist erforderlich";
      }
      if (!formData.isAuthorizedSignatory) {
        if (!formData.authorizedGender)
          newErrors.authorizedGender = "Anrede ist erforderlich";
        if (!formData.authorizedFirstName)
          newErrors.authorizedFirstName = "Vorname ist erforderlich";
        if (!formData.authorizedLastName)
          newErrors.authorizedLastName = "Nachname ist erforderlich";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = validateForm(); // Form doğrulama fonksiyonunu çağır
    if (isValid) {
      console.log("Form data saved:", formData); // Form verilerini simule olarak kaydet

      // Ana sayfaya yönlendirme sırasında query param ekle
      router.push("/?showModal=true");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
              Account vervollständigen
            </h1>

            <form onSubmit={handleSubmit} className="space-y-10">
              {/* Account Type Selection */}
              <div className="space-y-4">
                <Label className="text-base font-semibold text-gray-700">
                  Account-Typ
                </Label>
                <RadioGroup
                  defaultValue="private"
                  onValueChange={(value) =>
                    setAccountType(value as "private" | "business")
                  }
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  <div
                    className={`relative flex items-center space-x-3 border-2 rounded-xl p-4 cursor-pointer transition-all duration-200 ${
                      accountType === "private"
                        ? "border-[#008e9b] bg-[#008e9b]/5"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <RadioGroupItem value="private" id="private" />
                    <User className="h-5 w-5 text-gray-500" />
                    <Label
                      htmlFor="private"
                      className="cursor-pointer font-medium"
                    >
                      Privatperson
                    </Label>
                  </div>
                  <div
                    className={`relative flex items-center space-x-3 border-2 rounded-xl p-4 cursor-pointer transition-all duration-200 ${
                      accountType === "business"
                        ? "border-[#008e9b] bg-[#008e9b]/5"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <RadioGroupItem value="business" id="business" />
                    <Building2 className="h-5 w-5 text-gray-500" />
                    <Label
                      htmlFor="business"
                      className="cursor-pointer font-medium"
                    >
                      Gewerbe
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Personal Information */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                  <User className="h-5 w-5 text-[#008e9b]" />
                  <h2 className="text-lg font-semibold text-gray-900">
                    Persönliche Informationen
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <Label
                      htmlFor="firstName"
                      className="text-sm font-medium text-gray-700"
                    >
                      Vorname
                    </Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`mt-1 h-11 rounded-lg transition-shadow focus:ring-2 focus:ring-[#008e9b]/20 ${
                        errors.firstName
                          ? "border-red-500"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.firstName}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label
                      htmlFor="lastName"
                      className="text-sm font-medium text-gray-700"
                    >
                      Nachname
                    </Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`mt-1 h-11 rounded-lg transition-shadow focus:ring-2 focus:ring-[#008e9b]/20 ${
                        errors.lastName
                          ? "border-red-500"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <Label
                    htmlFor="dateOfBirth"
                    className="text-sm font-medium text-gray-700"
                  >
                    Geburtsdatum
                  </Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      className={`mt-1 pl-10 h-11 rounded-lg transition-shadow focus:ring-2 focus:ring-[#008e9b]/20 ${
                        errors.dateOfBirth
                          ? "border-red-500"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    />
                  </div>
                  {errors.dateOfBirth && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.dateOfBirth}
                    </p>
                  )}
                </div>
              </div>

              {/* Address Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                  <MapPin className="h-5 w-5 text-[#008e9b]" />
                  <h2 className="text-lg font-semibold text-gray-900">
                    Adresse
                  </h2>
                </div>
                <div>
                  <Label
                    htmlFor="country"
                    className="text-sm font-medium text-gray-700"
                  >
                    Land
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, country: value }))
                    }
                  >
                    <SelectTrigger
                      className={`mt-1 h-11 rounded-lg ${errors.country ? "border-red-500" : "border-gray-200 hover:border-gray-300"}`}
                    >
                      <SelectValue placeholder="Land auswählen" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ch">Schweiz</SelectItem>
                      <SelectItem value="de">Deutschland</SelectItem>
                      <SelectItem value="at">Österreich</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.country && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.country}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <Label
                      htmlFor="postalCode"
                      className="text-sm font-medium text-gray-700"
                    >
                      PLZ
                    </Label>
                    <Input
                      id="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      className={`mt-1 h-11 rounded-lg ${errors.postalCode ? "border-red-500" : "border-gray-200 hover:border-gray-300"}`}
                    />
                    {errors.postalCode && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.postalCode}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label
                      htmlFor="city"
                      className="text-sm font-medium text-gray-700"
                    >
                      Ort
                    </Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={`mt-1 h-11 rounded-lg ${errors.city ? "border-red-500" : "border-gray-200 hover:border-gray-300"}`}
                    />
                    {errors.city && (
                      <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-2">
                    <Label
                      htmlFor="street"
                      className="text-sm font-medium text-gray-700"
                    >
                      Strasse
                    </Label>
                    <Input
                      id="street"
                      value={formData.street}
                      onChange={handleChange}
                      className={`mt-1 h-11 rounded-lg ${errors.street ? "border-red-500" : "border-gray-200 hover:border-gray-300"}`}
                    />
                    {errors.street && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.street}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label
                      htmlFor="houseNumber"
                      className="text-sm font-medium text-gray-700"
                    >
                      Nr.
                    </Label>
                    <Input
                      id="houseNumber"
                      value={formData.houseNumber}
                      onChange={handleChange}
                      className={`mt-1 h-11 rounded-lg ${errors.houseNumber ? "border-red-500" : "border-gray-200 hover:border-gray-300"}`}
                    />
                    {errors.houseNumber && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.houseNumber}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Business Information - Only shown when business type is selected */}
              {accountType === "business" && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                    <Building2 className="h-5 w-5 text-[#008e9b]" />
                    <h2 className="text-lg font-semibold text-gray-900">
                      Geschäftsinformationen
                    </h2>
                  </div>

                  {/* Firmenname */}
                  <div>
                    <Label htmlFor="companyName">Firmenname</Label>
                    <Input
                      id="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      className={`mt-1 h-11 rounded-lg transition-shadow focus:ring-2 focus:ring-[#008e9b]/20 ${
                        errors.companyName
                          ? "border-red-500"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    />
                    {errors.companyName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.companyName}
                      </p>
                    )}
                  </div>

                  {/* Mehrwertsteuerpflichtig */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border rounded-lg p-4">
                      <div>
                        <Label>Mehrwertsteuerpflichtig</Label>
                        <p className="text-sm text-gray-500">
                          Sind Sie mehrwertsteuerpflichtig?
                        </p>
                      </div>
                      <Switch
                        checked={formData.isTaxable}
                        onCheckedChange={(checked) =>
                          setFormData((prev) => ({
                            ...prev,
                            isTaxable: checked,
                          }))
                        }
                      />
                    </div>

                    {formData.isTaxable && (
                      <div>
                        <Label htmlFor="taxNumber">Mehrwertsteuernummer</Label>
                        <Input
                          id="taxNumber"
                          value={formData.taxNumber}
                          onChange={handleChange}
                          className={`mt-1 h-11 rounded-lg transition-shadow focus:ring-2 focus:ring-[#008e9b]/20 ${
                            errors.taxNumber
                              ? "border-red-500"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        />
                        {errors.taxNumber && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.taxNumber}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Handelsregister */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border rounded-lg p-4">
                      <div>
                        <Label>Handelsregister</Label>
                        <p className="text-sm text-gray-500">
                          Sind Sie im Handelsregister eingetragen?
                        </p>
                      </div>
                      <Switch
                        checked={formData.isRegistered}
                        onCheckedChange={(checked) =>
                          setFormData((prev) => ({
                            ...prev,
                            isRegistered: checked,
                          }))
                        }
                      />
                    </div>

                    {formData.isRegistered && (
                      <div>
                        <Label htmlFor="registrationNumber">
                          Handelsregisternummer
                        </Label>
                        <Input
                          id="registrationNumber"
                          value={formData.registrationNumber}
                          onChange={handleChange}
                          className={`mt-1 h-11 rounded-lg transition-shadow focus:ring-2 focus:ring-[#008e9b]/20 ${
                            errors.registrationNumber
                              ? "border-red-500"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        />
                        {errors.registrationNumber && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.registrationNumber}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Zeichnungsberechtigung */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border rounded-lg p-4">
                      <div>
                        <Label>Zeichnungsberechtigung</Label>
                        <p className="text-sm text-gray-500">
                          Sind Sie zeichnungsberechtigt?
                        </p>
                      </div>
                      <Switch
                        checked={formData.isAuthorizedSignatory}
                        onCheckedChange={(checked) =>
                          setFormData((prev) => ({
                            ...prev,
                            isAuthorizedSignatory: checked,
                          }))
                        }
                      />
                    </div>

                    {!formData.isAuthorizedSignatory && (
                      <div className="space-y-4 border rounded-lg p-4">
                        <h3 className="font-medium">
                          Zeichnungsberechtigte Person
                        </h3>
                        <div>
                          <Label htmlFor="authorizedGender">Anrede</Label>
                          <Select
                            onValueChange={(value) =>
                              setFormData((prev) => ({
                                ...prev,
                                authorizedGender: value,
                              }))
                            }
                          >
                            <SelectTrigger
                              className={`mt-1 h-11 rounded-lg ${
                                errors.authorizedGender
                                  ? "border-red-500"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                            >
                              <SelectValue placeholder="Anrede auswählen" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="mr">Herr</SelectItem>
                              <SelectItem value="mrs">Frau</SelectItem>
                            </SelectContent>
                          </Select>
                          {errors.authorizedGender && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.authorizedGender}
                            </p>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="authorizedFirstName">Vorname</Label>
                            <Input
                              id="authorizedFirstName"
                              value={formData.authorizedFirstName}
                              onChange={handleChange}
                              className={`mt-1 h-11 rounded-lg transition-shadow focus:ring-2 focus:ring-[#008e9b]/20 ${
                                errors.authorizedFirstName
                                  ? "border-red-500"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                            />
                            {errors.authorizedFirstName && (
                              <p className="text-red-500 text-sm mt-1">
                                {errors.authorizedFirstName}
                              </p>
                            )}
                          </div>
                          <div>
                            <Label htmlFor="authorizedLastName">Nachname</Label>
                            <Input
                              id="authorizedLastName"
                              value={formData.authorizedLastName}
                              onChange={handleChange}
                              className={`mt-1 h-11 rounded-lg transition-shadow focus:ring-2 focus:ring-[#008e9b]/20 ${
                                errors.authorizedLastName
                                  ? "border-red-500"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                            />
                            {errors.authorizedLastName && (
                              <p className="text-red-500 text-sm mt-1">
                                {errors.authorizedLastName}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Submit Button and Terms & Conditions */}
              <div className="space-y-4">
                <Button
                  type="submit"
                  className="w-full h-12 text-base font-medium bg-[#008e9b] hover:bg-[#007a85] transition-colors duration-200 rounded-xl"
                >
                  Weiter
                </Button>
              </div>
            </form>
            <SMSVerificationModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
