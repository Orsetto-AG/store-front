'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Mock data
const mockRatings = {
  positive: 355,
  neutral: 0,
  negative: 0,
  total: 355,
  recentRatings: [
    {
      id: 1,
      buyer: 'chr_b5xc',
      type: 'positive',
      comment: 'Super ist schon zu schnell gekommen und ich noch eins mit blu ray Ronja vol. 2 du mir bestellen. Bitte Rechnung mir schicken ich bezahlen sofort.',
      articleNumber: '1241388622',
      date: '9. Jan. 2025'
    },
    {
      id: 2,
      buyer: 'Sirfreeze',
      type: 'positive',
      comment: 'Schnelle Lieferung und auch ein Top Service (Rückmeldung bei Anfragen etc.), sehr zu empfehlen!',
      articleNumber: '1251777700',
      date: '9. Jan. 2025'
    }
  ]
};

export default function ShopRatingsPage() {
  const [ratingType, setRatingType] = useState('all');

  return (
    <>
      {/* Ratings Summary */}
      <Card className="p-6 mb-8">
        <h2 className="text-xl font-bold mb-6">Bewertungen der letzten 12 Monate</h2>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div>
            <div className="text-2xl font-bold text-green-500">{mockRatings.positive}</div>
            <div className="text-sm text-gray-500">Positiv</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-500">{mockRatings.neutral}</div>
            <div className="text-sm text-gray-500">Neutral</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-red-500">{mockRatings.negative}</div>
            <div className="text-sm text-gray-500">Negativ</div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="text-sm text-gray-500">
            {mockRatings.total} Bewertungen insgesamt
          </div>
          <Select value={ratingType} onValueChange={setRatingType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Alle Bewertungen" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle Bewertungen</SelectItem>
              <SelectItem value="positive">Positive</SelectItem>
              <SelectItem value="neutral">Neutrale</SelectItem>
              <SelectItem value="negative">Negative</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Individual Ratings */}
        <div className="space-y-6">
          {mockRatings.recentRatings.map((rating) => (
            <div key={rating.id} className="border-t pt-6">
              <div className="flex justify-between mb-2">
                <div className="font-medium text-[#008e9b]">{rating.buyer}</div>
                <div className="text-sm text-gray-500">{rating.date}</div>
              </div>
              <p className="text-gray-700 mb-2">{rating.comment}</p>
              <div className="text-sm text-gray-500">
                Artikel: {rating.articleNumber}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}