"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, HelpCircle, ChevronRight, Shield, Bell, Key, Building2, User, Globe, Wallet, MapPin, Trash2, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface Address {
  id: string;
  tag: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

const initialUserData = {
  email: "user@example.com",
  emailVerified: true,
  memberNumber: "355363311",
  language: "Deutsch",
  accountType: "Unternehmen",
  password: "12345",
  company: {
    name: "Example GmbH",
    vatNumber: "(keine)",
    vatRegistered: true,
    username: "examplecompany",
    handelsregisterNumber: "CH-123456",
  },
  personal: {
    title: "Herr",
    name: "Max Mustermann",
    username: "maxmuster",
    dateOfBirth: "01.01.1980",
    phone: "+41 78 123 45 67",
    personalVatNumber: "(keine)",
    phoneVerified: false,
  },
  twoFactor: {
    push: false,
    authenticator: false,
  },
  addresses: [
    {
      id: "1",
      tag: "Hauptadresse",
      street: "Musterstrasse 123",
      city: "Zürich",
      postalCode: "8000",
      country: "CH",
      isDefault: true,
    },
    {
      id: "2",
      tag: "Rechnungsadresse",
      street: "Geschäftsstrasse 45",
      city: "Basel",
      postalCode: "4051",
      country: "CH",
      isDefault: false,
    },
  ],
};

export default function UserProfilePage() {
  const [userData, setUserData] = useState(initialUserData);

  const [activeTab, setActiveTab] = useState("account");
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [addresses, setAddresses] = useState<Address[]>(userData.addresses);

  const [isNameModalOpen, setIsNameModalOpen] = useState(false);
  const [isVatModalOpen, setIsVatModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);

  const handleOpenNameModal = () => setIsNameModalOpen(true);
  const handleCloseNameModal = () => setIsNameModalOpen(false);

  const handleOpenVatModal = () => setIsVatModalOpen(true);
  const handleCloseVatModal = () => setIsVatModalOpen(false);

  const handleOpenEmailModal = () => setIsEmailModalOpen(true);
  const handleCloseEmailModal = () => setIsEmailModalOpen(false);

  const handleOpenPhoneModal = () => setIsPhoneModalOpen(true);
  const handleClosePhoneModal = () => setIsPhoneModalOpen(false);

  const [isUsernameModalOpen, setIsUsernameModalOpen] = useState(false);
  const [isHandelsregisterModalOpen, setIsHandelsregisterModalOpen] =
    useState(false);

  const handleOpenUsernameModal = () => setIsUsernameModalOpen(true);
  const handleCloseUsernameModal = () => setIsUsernameModalOpen(false);

  const handleOpenHandelsregisterModal = () =>
    setIsHandelsregisterModalOpen(true);
  const handleCloseHandelsregisterModal = () =>
    setIsHandelsregisterModalOpen(false);

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [companyData, setCompanyData] = useState({
    vatNumber: userData.company.vatNumber,
    email: userData.email,
    phone: userData.personal.phone,
  });

  const [personalData, setPersonalData] = useState({
    name: userData.personal.name,
    personalVatNumber: userData.personal.personalVatNumber,
    email: userData.email,
    phone: userData.personal.phone,
  });

  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);
  const [isPersonalModalOpen, setIsPersonalModalOpen] = useState(false);

  const handleCompanySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const updatedCompanyData = {
      vatNumber: formData.get("vatNumber") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
    };

    setUserData((prev) => ({
      ...prev,
      company: { ...prev.company, ...updatedCompanyData },
      email: updatedCompanyData.email,
    }));

    setIsCompanyModalOpen(false);
  };

  const handlePersonalSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const updatedPersonalData = {
      name: formData.get("name") as string,
      personalVatNumber: formData.get("personalVatNumber") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
    };

    setUserData((prev) => ({
      ...prev,
      personal: { ...prev.personal, ...updatedPersonalData },
      email: updatedPersonalData.email,
    }));

    setIsPersonalModalOpen(false);
  };

  const handleAddressSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const newAddress: Address = {
      id: editingAddress?.id || Date.now().toString(),
      tag: formData.get("tag") as string,
      street: formData.get("street") as string,
      city: formData.get("city") as string,
      postalCode: formData.get("postalCode") as string,
      country: formData.get("country") as string,
      isDefault: formData.get("isDefault") === "true",
    };

    if (editingAddress) {
      setAddresses(
        addresses.map((addr) =>
          addr.id === editingAddress.id ? newAddress : addr
        )
      );
    } else {
      setAddresses([...addresses, newAddress]);
    }

    setIsAddressModalOpen(false);
    setEditingAddress(null);
  };

  const handleEditAddress = (address: Address) => {
    setEditingAddress(address);
    setIsAddressModalOpen(true);
  };

  const handleDeleteAddress = (addressId: string) => {
    setAddresses(addresses.filter((addr) => addr.id !== addressId));
  };

  const addressTags = [
    { value: "home", label: "Hauptadresse" },
    { value: "billing", label: "Rechnungsadresse" },
    { value: "work", label: "Arbeitsadresse" },
    { value: "shipping", label: "Lieferadresse" },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-blue-500 rounded-2xl p-8 mb-8 text-white">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <span className="text-3xl font-bold">
                  {userData.personal.name.charAt(0)}
                </span>
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-1">
                  {userData.personal.name}
                </h1>
                <p className="text-sm font-medium text-gray-200 mb-3">
                  {userData.personal.dateOfBirth}
                </p>
                <div className="flex items-center gap-3">
                  <Badge className="bg-white/20 hover:bg-white/30 backdrop-blur-sm">
                    {userData.memberNumber}
                  </Badge>
                  {userData.emailVerified && (
                    <Badge className="bg-emerald-400/20 text-emerald-100 hover:bg-emerald-400/30 backdrop-blur-sm">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Verifiziert
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="account" className="space-y-8">
            <TabsList className="w-full grid grid-cols-3 gap-4 bg-transparent h-auto p-0">
              {[
                { id: "account", label: "Konto", icon: Shield },
                { id: "security", label: "Sicherheit", icon: Key },
                { id: "preferences", label: "Einstellungen", icon: Globe },
              ].map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="flex-1 bg-white hover:bg-gray-50 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 rounded-xl p-4 h-auto border border-gray-100 shadow-sm transition-all"
                >
                  <div className="flex flex-col items-center gap-2">
                    <tab.icon className="h-5 w-5" />
                    <span>{tab.label}</span>
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Account Tab */}
            <TabsContent value="account" className="space-y-6">
              {/* Personal Information */}
              <Card className="p-6 border-0 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      {userData.accountType === "Unternehmen" ? (
                        <Building2 className="h-5 w-5 text-blue-600" />
                      ) : (
                        <User className="h-5 w-5 text-blue-600" />
                      )}
                    </div>
                    <h2 className="text-xl font-semibold">
                      {userData.accountType === "Unternehmen"
                        ? "Unternehmensdaten"
                        : "Personaldaten"}
                    </h2>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                  {/* Name (Personal) veya Company Name (Unternehmen) */}
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm text-gray-500">
                        {userData.accountType === "Personal"
                          ? "Name"
                          : "Firmenname"}
                      </div>
                      <div className="font-medium mt-1">
                        {userData.accountType === "Personal"
                          ? userData.personal.name
                          : userData.company.name}
                      </div>
                    </div>
                  </div>

                  {/* MwSt-Nummer */}
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm text-gray-500">MwSt-Nummer</div>
                      <div className="font-medium mt-1">
                        {userData.accountType === "Personal"
                          ? userData.personal.personalVatNumber
                          : userData.company.vatNumber}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                      onClick={() => setIsVatModalOpen(true)}
                    >
                      Bearbeiten
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>

                  {/* MwSt-Nummer Dialog */}
                  <Dialog
                    open={isVatModalOpen}
                    onOpenChange={setIsVatModalOpen}
                  >
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>MwSt-Nummer bearbeiten</DialogTitle>
                      </DialogHeader>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          const formData = new FormData(e.currentTarget);
                          if (userData.accountType === "Personal") {
                            setUserData((prev) => ({
                              ...prev,
                              personal: {
                                ...prev.personal,
                                personalVatNumber: formData.get(
                                  "vatNumber"
                                ) as string,
                              },
                            }));
                          } else {
                            setUserData((prev) => ({
                              ...prev,
                              company: {
                                ...prev.company,
                                vatNumber: formData.get("vatNumber") as string,
                              },
                            }));
                          }
                          setIsVatModalOpen(false);
                        }}
                        className="space-y-6"
                      >
                        <div>
                          <Label htmlFor="vatNumber">MwSt-Nummer</Label>
                          <Input
                            id="vatNumber"
                            name="vatNumber"
                            defaultValue={
                              userData.accountType === "Personal"
                                ? userData.personal.personalVatNumber
                                : userData.company.vatNumber
                            }
                            required
                          />
                        </div>
                        <div className="flex justify-end gap-3">
                          <Button
                            variant="outline"
                            onClick={() => setIsVatModalOpen(false)}
                          >
                            Abbrechen
                          </Button>
                          <Button
                            type="submit"
                            className="bg-[#008e9b] hover:bg-[#007a85]"
                          >
                            Speichern
                          </Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>

                  {/* E-Mail */}
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm text-gray-500">E-Mail</div>
                      <div className="font-medium mt-1">{userData.email}</div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                      onClick={() => setIsEmailModalOpen(true)}
                    >
                      Bearbeiten
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>

                  {/* E-Mail Dialog */}
                  <Dialog
                    open={isEmailModalOpen}
                    onOpenChange={setIsEmailModalOpen}
                  >
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>E-Mail bearbeiten</DialogTitle>
                      </DialogHeader>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          const formData = new FormData(e.currentTarget);
                          setUserData((prev) => ({
                            ...prev,
                            email: formData.get("email") as string,
                          }));
                          setIsEmailModalOpen(false);
                        }}
                        className="space-y-6"
                      >
                        <div>
                          <Label htmlFor="email">E-Mail</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            defaultValue={userData.email}
                            required
                          />
                        </div>
                        <div className="flex justify-end gap-3">
                          <Button
                            variant="outline"
                            onClick={() => setIsEmailModalOpen(false)}
                          >
                            Abbrechen
                          </Button>
                          <Button
                            type="submit"
                            className="bg-[#008e9b] hover:bg-[#007a85]"
                          >
                            Speichern
                          </Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>

                  {/* Telefon */}
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm text-gray-500">Telefon</div>
                      <div className="font-medium mt-1">
                        {userData.personal.phone}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                      onClick={() => setIsPhoneModalOpen(true)}
                    >
                      Bearbeiten
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>

                  {/* Telefon Dialog */}
                  <Dialog
                    open={isPhoneModalOpen}
                    onOpenChange={setIsPhoneModalOpen}
                  >
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>Telefon bearbeiten</DialogTitle>
                      </DialogHeader>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          const formData = new FormData(e.currentTarget);
                          setUserData((prev) => ({
                            ...prev,
                            personal: {
                              ...prev.personal,
                              phone: formData.get("phone") as string,
                            },
                          }));
                          setIsPhoneModalOpen(false);
                        }}
                        className="space-y-6"
                      >
                        <div>
                          <Label htmlFor="phone">Telefon</Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            defaultValue={userData.personal.phone}
                            required
                          />
                        </div>
                        <div className="flex justify-end gap-3">
                          <Button
                            variant="outline"
                            onClick={() => setIsPhoneModalOpen(false)}
                          >
                            Abbrechen
                          </Button>
                          <Button
                            type="submit"
                            className="bg-[#008e9b] hover:bg-[#007a85]"
                          >
                            Speichern
                          </Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>

                  {/* Username */}
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm text-gray-500">Benutzername</div>
                      <div className="font-medium mt-1">
                        {userData.accountType === "Personal"
                          ? userData.personal.username
                          : userData.company.username}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                      onClick={handleOpenUsernameModal}
                    >
                      Bearbeiten
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>

                  {/* Username Dialog */}
                  <Dialog
                    open={isUsernameModalOpen}
                    onOpenChange={setIsUsernameModalOpen}
                  >
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>Benutzername bearbeiten</DialogTitle>
                      </DialogHeader>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          const formData = new FormData(e.currentTarget);
                          if (userData.accountType === "Personal") {
                            setUserData((prev) => ({
                              ...prev,
                              personal: {
                                ...prev.personal,
                                username: formData.get("username") as string,
                              },
                            }));
                          } else {
                            setUserData((prev) => ({
                              ...prev,
                              company: {
                                ...prev.company,
                                username: formData.get("username") as string,
                              },
                            }));
                          }
                          setIsUsernameModalOpen(false);
                        }}
                        className="space-y-6"
                      >
                        <div>
                          <Label htmlFor="username">Benutzername</Label>
                          <Input
                            id="username"
                            name="username"
                            defaultValue={
                              userData.accountType === "Personal"
                                ? userData.personal.username
                                : userData.company.username
                            }
                            required
                          />
                        </div>
                        <div className="flex justify-end gap-3">
                          <Button
                            variant="outline"
                            onClick={handleCloseUsernameModal}
                          >
                            Abbrechen
                          </Button>
                          <Button
                            type="submit"
                            className="bg-[#008e9b] hover:bg-[#007a85]"
                          >
                            Speichern
                          </Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>

                  {/* Handelsregisternummer */}
                  {userData.accountType === "Unternehmen" && (
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-sm text-gray-500">
                          Handelsregisternummer
                        </div>
                        <div className="font-medium mt-1">
                          {userData.company.handelsregisterNumber}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        onClick={handleOpenHandelsregisterModal}
                      >
                        Bearbeiten
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  )}

                  {/* Handelsregisternummer Dialog */}
                  <Dialog
                    open={isHandelsregisterModalOpen}
                    onOpenChange={setIsHandelsregisterModalOpen}
                  >
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>
                          Handelsregisternummer bearbeiten
                        </DialogTitle>
                      </DialogHeader>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          const formData = new FormData(e.currentTarget);
                          setUserData((prev) => ({
                            ...prev,
                            company: {
                              ...prev.company,
                              handelsregisterNumber: formData.get(
                                "handelregisternummer"
                              ) as string,
                            },
                          }));
                          setIsHandelsregisterModalOpen(false);
                        }}
                        className="space-y-6"
                      >
                        <div>
                          <Label htmlFor="handelregisternummer">
                            Handelsregisternummer
                          </Label>
                          <Input
                            id="handelregisternummer"
                            name="handelregisternummer"
                            defaultValue={
                              userData.company.handelsregisterNumber
                            }
                            required
                          />
                        </div>
                        <div className="flex justify-end gap-3">
                          <Button
                            variant="outline"
                            onClick={handleCloseHandelsregisterModal}
                          >
                            Abbrechen
                          </Button>
                          <Button
                            type="submit"
                            className="bg-[#008e9b] hover:bg-[#007a85]"
                          >
                            Speichern
                          </Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </Card>

              {/* Address Information */}
              <Card className="p-6 border-0 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-50 rounded-lg">
                      <MapPin className="h-5 w-5 text-purple-600" />
                    </div>
                    <h2 className="text-xl font-semibold">Adressen</h2>
                  </div>
                  <Dialog
                    open={isAddressModalOpen}
                    onOpenChange={setIsAddressModalOpen}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                        onClick={() => setEditingAddress(null)}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Neue Adresse
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>
                          {editingAddress
                            ? "Adresse bearbeiten"
                            : "Neue Adresse hinzufügen"}
                        </DialogTitle>
                      </DialogHeader>
                      <form
                        onSubmit={handleAddressSubmit}
                        className="space-y-6"
                      >
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="tag">Adresstyp</Label>
                            <Select
                              name="tag"
                              defaultValue={
                                editingAddress?.tag || addressTags[0].value
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Adresstyp wählen" />
                              </SelectTrigger>
                              <SelectContent>
                                {addressTags.map((tag) => (
                                  <SelectItem key={tag.value} value={tag.label}>
                                    {tag.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label htmlFor="street">
                              Strasse und Hausnummer
                            </Label>
                            <Input
                              id="street"
                              name="street"
                              defaultValue={editingAddress?.street}
                              required
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="postalCode">PLZ</Label>
                              <Input
                                id="postalCode"
                                name="postalCode"
                                defaultValue={editingAddress?.postalCode}
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="city">Ort</Label>
                              <Input
                                id="city"
                                name="city"
                                defaultValue={editingAddress?.city}
                                required
                              />
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="country">Land</Label>
                            <Select
                              name="country"
                              defaultValue={editingAddress?.country || "CH"}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Land wählen" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="CH">Schweiz</SelectItem>
                                <SelectItem value="DE">Deutschland</SelectItem>
                                <SelectItem value="AT">Österreich</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="pt-4">
                            <RadioGroup
                              name="isDefault"
                              defaultValue={
                                editingAddress?.isDefault ? "true" : "false"
                              }
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="true" id="default-yes" />
                                <Label htmlFor="default-yes">
                                  Als Standardadresse festlegen
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="false" id="default-no" />
                                <Label htmlFor="default-no">
                                  Nicht als Standardadresse festlegen
                                </Label>
                              </div>
                            </RadioGroup>
                          </div>
                        </div>

                        <div className="flex justify-end gap-3">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsAddressModalOpen(false)}
                          >
                            Abbrechen
                          </Button>
                          <Button
                            type="submit"
                            className="bg-[#008e9b] hover:bg-[#007a85]"
                          >
                            {editingAddress ? "Speichern" : "Hinzufügen"}
                          </Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="space-y-4">
                  {addresses.map((address) => (
                    <div key={address.id} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">{address.tag}</div>
                        <div className="flex items-center gap-2">
                          {address.isDefault && (
                            <Badge
                              variant="outline"
                              className="bg-green-50 text-green-700 border-green-200"
                            >
                              Standard
                            </Badge>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                            onClick={() => handleEditAddress(address)}
                          >
                            Bearbeiten
                          </Button>
                          {!address.isDefault && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              onClick={() => handleDeleteAddress(address.id)}
                            >
                              Löschen
                            </Button>
                          )}
                        </div>
                      </div>
                      <div className="text-gray-600">
                        {address.street}
                        <br />
                        {address.postalCode} {address.city}
                        <br />
                        {address.country === "CH"
                          ? "Schweiz"
                          : address.country === "DE"
                            ? "Deutschland"
                            : address.country === "AT"
                              ? "Österreich"
                              : address.country}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Notifications */}
              <Card className="p-6 border-0 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-50 rounded-lg">
                      <Bell className="h-5 w-5 text-amber-600" />
                    </div>
                    <h2 className="text-xl font-semibold">
                      Benachrichtigungen
                    </h2>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium">
                        E-Mail-Benachrichtigungen
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        Erhalte Updates zu deinen Aktivitäten
                      </div>
                    </div>
                    <Switch className="data-[state=checked]:bg-blue-600" />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium">Push-Benachrichtigungen</div>
                      <div className="text-sm text-gray-500 mt-1">
                        Erhalte Echtzeit-Updates auf deinem Gerät
                      </div>
                    </div>
                    <Switch className="data-[state=checked]:bg-blue-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-0 shadow-sm mt-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-50 rounded-lg">
                      <Trash2 className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-red-600">
                        Konto löschen
                      </h2>
                      <p className="text-sm text-gray-500 mt-1">
                        Diese Aktion kann nicht rückgängig gemacht werden
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    LÖSCHUNG BEANTRAGEN
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>

                <div className="p-4 bg-red-50 rounded-lg border border-red-100">
                  <div className="text-sm text-gray-600">
                    E-Mail-Adresse des Kontos
                  </div>
                  <div className="font-medium mt-1">{userData.email}</div>
                </div>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security" className="space-y-6">
              {/* Two Factor Authentication */}
              <Card className="p-6 border-0 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-50 rounded-lg">
                      <Shield className="h-5 w-5 text-green-600" />
                    </div>
                    <h2 className="text-xl font-semibold">
                      Zwei-Faktor-Authentifizierung
                    </h2>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium">Authenticator-App</div>
                      <div className="text-sm text-gray-500 mt-1">
                        Verwende eine Authenticator-App für zusätzliche
                        Sicherheit
                      </div>
                    </div>
                    <Switch className="data-[state=checked]:bg-green-600" />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium">SMS-Authentifizierung</div>
                      <div className="text-sm text-gray-500 mt-1">
                        Erhalte Codes per SMS auf dein Telefon
                      </div>
                    </div>
                    <Switch className="data-[state=checked]:bg-green-600" />
                  </div>
                </div>
              </Card>

              {/* Password */}
              <Card className="p-6 border-0 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-50 rounded-lg">
                      <Key className="h-5 w-5 text-red-600" />
                    </div>
                    <h2 className="text-xl font-semibold">
                      Passwort & Sicherheit
                    </h2>
                  </div>
                  <Button
                    variant="ghost"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={() => setIsPasswordModalOpen(true)}
                  >
                    Passwort ändern
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500">Letztes Update</div>
                  <div className="font-medium mt-1">Vor 3 Monaten</div>
                </div>
                <Dialog
                  open={isPasswordModalOpen}
                  onOpenChange={setIsPasswordModalOpen}
                >
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Passwort ändern</DialogTitle>
                    </DialogHeader>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (currentPassword !== userData.password) {
                          setErrorMessage("Das aktuelle Passwort ist falsch.");
                          setSuccessMessage("");
                          return;
                        }
                        if (newPassword === userData.password) {
                          setErrorMessage(
                            "Das neue Passwort darf nicht mit dem alten Passwort übereinstimmen."
                          );
                          setSuccessMessage("");
                          return;
                        }
                        setUserData((prev) => ({
                          ...prev,
                          password: newPassword,
                        }));
                        setErrorMessage("");
                        setSuccessMessage("Passwort erfolgreich geändert!");
                        setCurrentPassword("");
                        setNewPassword("");
                      }}
                      className="space-y-6"
                    >
                      <div>
                        <Label htmlFor="currentPassword">
                          Aktuelles Passwort
                        </Label>
                        <Input
                          id="currentPassword"
                          name="currentPassword"
                          type="password"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="newPassword">Neues Passwort</Label>
                        <Input
                          id="newPassword"
                          name="newPassword"
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          required
                        />
                      </div>

                      {errorMessage && (
                        <div className="flex items-center gap-2 text-red-700">
                          <CheckCircle2 className="h-5 w-5 inline-block mr-2" />
                          {errorMessage}
                        </div>
                      )}

                      {successMessage && (
                        <div className="flex items-center gap-2 text-green-600">
                          <CheckCircle2 className="h-5 w-5" />
                          <span>{successMessage}</span>
                        </div>
                      )}

                      <div className="flex justify-end gap-3">
                        <Button
                          variant="outline"
                          onClick={() => setIsPasswordModalOpen(false)}
                        >
                          Abbrechen
                        </Button>
                        <Button
                          type="submit"
                          className="bg-[#008e9b] hover:bg-[#007a85]"
                        >
                          Speichern
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </Card>
            </TabsContent>

            {/* Preferences Tab */}
            <TabsContent value="preferences" className="space-y-6">
              {/* Language & Region */}
              <Card className="p-6 border-0 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-50 rounded-lg">
                      <Globe className="h-5 w-5 text-indigo-600" />
                    </div>
                    <h2 className="text-xl font-semibold">Sprache & Region</h2>
                  </div>
                  <Button
                    variant="ghost"
                    className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
                  >
                    Ändern
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-500">Sprache</div>
                    <div className="font-medium mt-1">{userData.language}</div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-500">Zeitzone</div>
                    <div className="font-medium mt-1">Europe/Zurich</div>
                  </div>
                </div>
              </Card>

              {/* Payment Preferences */}
              <Card className="p-6 border-0 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-50 rounded-lg">
                      <Wallet className="h-5 w-5 text-emerald-600" />
                    </div>
                    <h2 className="text-xl font-semibold">
                      Zahlungseinstellungen
                    </h2>
                  </div>
                  <Button
                    variant="ghost"
                    className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                  >
                    Verwalten
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500">
                    Standardzahlungsmethode
                  </div>
                  <div className="font-medium mt-1">TWINT</div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Help Button */}
      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-6 right-6 h-12 w-12 rounded-full shadow-lg bg-white hover:bg-gray-50"
      >
        <HelpCircle className="h-6 w-6" />
      </Button>
    </div>
  );
}
