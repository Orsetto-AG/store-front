import React, { useState } from 'react';
import { X, AlertTriangle } from 'lucide-react';

interface ComplaintModalProps {
  onClose: () => void;
}

export function ComplaintModal({ onClose }: ComplaintModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof complaintReasons | ''>('');
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [showThankYou, setShowThankYou] = useState(false);

  const complaintReasons = {
    'Produktqualität und Beschreibung': [
      'Falsche oder irreführende Produktbeschreibung',
      'Defektes oder beschädigtes Produkt',
      'Fehlende Teile oder Zubehör',
      'Gefälschtes oder nicht authentisches Produkt',
      'Unangemessene Bedingungen des Verkäufers',
    ],
    'Verkaufsrichtlinien und Inhalte': [
      'Verstoß gegen Markenrechte oder Urheberrechte',
      'Unangemessene Ausdrucksweise in der Artikelbeschreibung',
      'Veröffentlichung von Kontaktinformationen',
      'Links, Logos oder Videos mit unzulässigem Inhalt',
      'Angebote ohne echten Artikel',
    ],
    'Verkäuferverhalten und Aktivitäten': [
      'Betrügerische Verkaufsaktivitäten',
      'Aufforderung zur Bewertungsmanipulation',
      'Umgehung der eBay-Gebühren',
      'Manipulation von Suchergebnissen',
      'Unangemessenes oder unhöfliches Verkäuferverhalten',
    ],
    'Allgemeine Verstöße': [
      'Hehlerware oder illegaler Artikel',
      'Verbotene Zahlungsmethoden',
      'Unangemessene oder schädliche Kommentare',
      'Identische Angebote in großem Umfang',
      'Andere Gründe oder Verstöße',
    ],
    'Sonstiges': [
      'Preis-Leistungs-Verhältnis',
      'Kundenservice',
      'Andere Gründe',
    ],
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value as keyof typeof complaintReasons;
    setSelectedCategory(category);
    setSelectedReason('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowThankYou(true);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  if (showThankYou) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-12 rounded-xl shadow-2xl text-center max-w-lg mx-auto transform transition-all">
          <div className="mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Vielen Dank!</h3>
          <p className="text-gray-600">Ihre Meldung wurde erfolgreich übermittelt.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl relative">
        <div className="p-6 pb-0">
          <button
            onClick={onClose}
            className="absolute right-6 top-6 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Angebot Melden</h2>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Hauptkategorie
            </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all bg-white"
            >
              <option value="">Bitte wählen Sie eine Kategorie</option>
              {Object.keys(complaintReasons).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-2">
              Unterkategorie
            </label>
            <select
              id="reason"
              value={selectedReason}
              onChange={(e) => setSelectedReason(e.target.value)}
              disabled={!selectedCategory}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all bg-white disabled:bg-gray-50 disabled:text-gray-500"
            >
              <option value="">Bitte wählen Sie einen Grund</option>
              {selectedCategory &&
                complaintReasons[selectedCategory].map((reason) => (
                  <option key={reason} value={reason}>
                    {reason}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label htmlFor="comments" className="block text-sm font-medium text-gray-700 mb-2">
              Zusätzliche Kommentare (optional)
            </label>
            <textarea
              id="comments"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              placeholder="Beschreiben Sie Ihr Anliegen detailliert..."
              rows={5}
            />
          </div>

          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Abbrechen
            </button>
            <button
              type="submit"
              disabled={!selectedCategory || !selectedReason}
              className="flex-1 px-6 py-3 text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Meldung Senden
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
