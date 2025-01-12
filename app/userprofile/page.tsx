'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { CheckCircle2, HelpCircle } from 'lucide-react';

// Mock user data
const userData = {
  email: 'user@example.com',
  emailVerified: true,
  memberNumber: '355363311',
  language: 'Deutsch',
  accountType: 'Unternehmen',
  company: {
    name: 'Example GmbH',
    vatNumber: '(keine)',
    vatRegistered: true
  },
  personal: {
    title: 'Herr',
    name: 'Max Mustermann',
    username: 'maxmuster',
    dateOfBirth: '01.01.1980',
    phone: '+41 78 123 45 67',
    phoneVerified: false
  },
  address: {
    street: 'Musterstrasse 123',
    city: '8000 Zürich',
    country: 'CH',
    verified: true,
    billing: 'Musterstrasse 123, 8000 Zürich, CH'
  },
  twoFactor: {
    push: false,
    authenticator: false
  }
};

export default function UserProfilePage() {
  const [activeTab, setActiveTab] = useState('account');

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Benutzerkonto</h1>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="account" className="space-y-8">
            <TabsList className="w-full border-b bg-transparent p-0 mb-8">
              <div className="flex gap-8">
                <TabsTrigger
                  value="account"
                  className="border-b-2 border-transparent px-0 pb-4 data-[state=active]:border-[#008e9b] data-[state=active]:bg-transparent"
                >
                  Benutzerangaben
                </TabsTrigger>
                <TabsTrigger
                  value="payments"
                  className="border-b-2 border-transparent px-0 pb-4 data-[state=active]:border-[#008e9b] data-[state=active]:bg-transparent"
                >
                  Zahlungen
                </TabsTrigger>
                <TabsTrigger
                  value="notifications"
                  className="border-b-2 border-transparent px-0 pb-4 data-[state=active]:border-[#008e9b] data-[state=active]:bg-transparent"
                >
                  Benachrichtigungen
                </TabsTrigger>
              </div>
            </TabsList>

            {/* Account Information Tab */}
            <TabsContent value="account" className="space-y-8">
              {/* Account Details */}
              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-6">Kontoangaben</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2">
                    <div>
                      <div className="text-sm text-gray-500">E-Mail-Adresse</div>
                      <div className="flex items-center gap-2">
                        {userData.email}
                        {userData.emailVerified && (
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Verifiziert
                          </Badge>
                        )}
                      </div>
                    </div>
                    <Button variant="ghost" className="text-[#008e9b] hover:text-[#006d77]">
                      ÄNDERN
                    </Button>
                  </div>

                  <div className="flex justify-between items-center py-2 border-t">
                    <div>
                      <div className="text-sm text-gray-500">Passwort</div>
                      <div>••••••••</div>
                    </div>
                    <Button variant="ghost" className="text-[#008e9b] hover:text-[#006d77]">
                      ÄNDERN
                    </Button>
                  </div>

                  <div className="flex justify-between items-center py-2 border-t">
                    <div>
                      <div className="text-sm text-gray-500">Mitgliedsnummer</div>
                      <div>{userData.memberNumber}</div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center py-2 border-t">
                    <div>
                      <div className="text-sm text-gray-500">Sprache</div>
                      <div>{userData.language}</div>
                    </div>
                    <Button variant="ghost" className="text-[#008e9b] hover:text-[#006d77]">
                      ÄNDERN
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Two Factor Authentication */}
              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-6">Zwei-Faktor-Authentifizierung</h2>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Push-Benachrichtigung</div>
                      <div className="text-sm text-gray-500">
                        Authentifizierung via Push-Benachrichtigung, die an deine App gesendet wird.
                      </div>
                    </div>
                    <Switch checked={userData.twoFactor.push} />
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <div className="font-medium">Authentifizierungs-App</div>
                      <div className="text-sm text-gray-500">
                        Schütze dein Konto mit einer Authentifizierungs-App (z.B. Google Authenticator)
                      </div>
                    </div>
                    <Switch checked={userData.twoFactor.authenticator} />
                  </div>
                </div>
              </Card>

              {/* Personal Information */}
              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-6">Benutzerangaben</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2">
                    <div>
                      <div className="text-sm text-gray-500">Name</div>
                      <div className="flex items-center gap-2">
                        {userData.personal.name}
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Verifiziert
                        </Badge>
                      </div>
                    </div>
                    <Button variant="ghost" className="text-[#008e9b] hover:text-[#006d77]">
                      ÄNDERN
                    </Button>
                  </div>

                  <div className="flex justify-between items-center py-2 border-t">
                    <div>
                      <div className="text-sm text-gray-500">Benutzername</div>
                      <div>{userData.personal.username}</div>
                    </div>
                    <Button variant="ghost" className="text-[#008e9b] hover:text-[#006d77]">
                      ÄNDERN
                    </Button>
                  </div>

                  <div className="flex justify-between items-center py-2 border-t">
                    <div>
                      <div className="text-sm text-gray-500">Telefonnummer</div>
                      <div className="flex items-center gap-2">
                        {userData.personal.phone}
                        {!userData.personal.phoneVerified && (
                          <Badge variant="secondary" className="bg-gray-100">
                            Nicht verifiziert
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {!userData.personal.phoneVerified && (
                        <Button variant="outline" className="text-[#008e9b] hover:text-[#006d77]">
                          JETZT VERIFIZIEREN
                        </Button>
                      )}
                      <Button variant="ghost" className="text-[#008e9b] hover:text-[#006d77]">
                        ÄNDERN
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Addresses */}
              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-6">Adressen</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2">
                    <div>
                      <div className="text-sm text-gray-500">Adresse</div>
                      <div className="flex items-center gap-2">
                        {userData.address.street}, {userData.address.city}
                        {userData.address.verified && (
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            Bestätigt
                          </Badge>
                        )}
                      </div>
                    </div>
                    <Button variant="ghost" className="text-[#008e9b] hover:text-[#006d77]">
                      ÄNDERN
                    </Button>
                  </div>

                  <div className="flex justify-between items-center py-2 border-t">
                    <div>
                      <div className="text-sm text-gray-500">Rechnungsadresse</div>
                      <div>{userData.address.billing}</div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" className="text-red-600 hover:text-red-700">
                        ENTFERNEN
                      </Button>
                      <Button variant="ghost" className="text-[#008e9b] hover:text-[#006d77]">
                        ÄNDERN
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Delete Account */}
              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-6">Konto löschen</h2>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm text-gray-500">E-Mail-Adresse des Kontos</div>
                    <div>{userData.email}</div>
                  </div>
                  <Button variant="ghost" className="text-red-600 hover:text-red-700">
                    LÖSCHUNG BEANTRAGEN
                  </Button>
                </div>
              </Card>
            </TabsContent>

            {/* Payments Tab */}
            <TabsContent value="payments">
              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-4">Zahlungsmethoden</h2>
                <p className="text-gray-500">Keine Zahlungsmethoden hinterlegt</p>
              </Card>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications">
              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-6">Benachrichtigungseinstellungen</h2>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">E-Mail-Benachrichtigungen</div>
                      <div className="text-sm text-gray-500">
                        Erhalte Updates zu deinen Aktivitäten per E-Mail
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <div className="font-medium">Push-Benachrichtigungen</div>
                      <div className="text-sm text-gray-500">
                        Erhalte wichtige Updates direkt auf dein Gerät
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
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
        className="fixed bottom-6 right-6 h-12 w-12 rounded-full shadow-lg bg-white"
      >
        <HelpCircle className="h-6 w-6" />
      </Button>
    </div>
  );
}