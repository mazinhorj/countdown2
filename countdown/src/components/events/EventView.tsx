'use client';

import React, { useState, useEffect } from 'react';
import { useEvents } from '@/contexts/EventContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Edit, Trash2, Calendar, MapPin } from 'lucide-react';
import { formatDate } from '@/utils/dateUtils';
import CountdownTimer from './CountdownTimer';
import { Event } from '@/types/event';

interface EventViewProps {
  eventId: string;
  onBack: () => void;
}

const EventView: React.FC<EventViewProps> = ({ eventId, onBack }) => {
  const { events } = useEvents();
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const event = events.find((e: Event) => e.id === eventId);

  useEffect(() => {
    if (event?.theme) {
      // Simular busca de imagem baseada no tema
      const demoImages = {
        'casamento': [
          'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&h=800&fit=crop',
          'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1200&h=800&fit=crop',
          'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&h=800&fit=crop'
        ],
        'festa': [
          'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200&h=800&fit=crop',
          'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&h=800&fit=crop',
          'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&h=800&fit=crop'
        ],
        'viagem': [
          'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=800&fit=crop',
          'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&h=800&fit=crop',
          'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&h=800&fit=crop'
        ],
        'trabalho': [
          'https://images.unsplash.com/photo-1497032205916-ac775f0649ae?w=1200&h=800&fit=crop',
          'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200&h=800&fit=crop',
          'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&h=800&fit=crop'
        ],
        'formatura': [
          'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&h=800&fit=crop',
          'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=800&fit=crop',
          'https://images.unsplash.com/photo-1607013251379-e6eecfffe234?w=1200&h=800&fit=crop'
        ]
      };

      const themeImages = demoImages[event.theme.toLowerCase() as keyof typeof demoImages] || demoImages['festa'];
      const randomImage = themeImages[Math.floor(Math.random() * themeImages.length)];
      
      setBackgroundImage(randomImage);
    } else {
      // Imagem padrão se não houver tema
      setBackgroundImage('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop');
    }
    
    setLoading(false);
  }, [event]);

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Evento não encontrado</h2>
          <p className="text-gray-600 mb-4">O evento que você está procurando não existe.</p>
          <Button onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar ao Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        {loading ? (
          <div className="w-full h-full bg-gradient-to-br from-purple-600 to-blue-600" />
        ) : (
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${backgroundImage})`,
            }}
          />
        )}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-4 sm:p-6">
          <Button
            variant="secondary"
            onClick={onBack}
            className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
        </header>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center p-4 sm:p-6">
          <div className="w-full max-w-4xl">
            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
              <CardContent className="p-8 sm:p-12 text-center">
                {/* Event Title */}
                <h1 className="text-4xl sm:text-6xl font-bold mb-4 leading-tight">
                  {event.title}
                </h1>

                {/* Event Details */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 text-white/80">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    <span className="text-lg">{formatDate(event.date)}</span>
                  </div>
                  {event.theme && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      <span className="text-lg capitalize">{event.theme}</span>
                    </div>
                  )}
                </div>

                {/* Description */}
                {event.description && (
                  <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
                    {event.description}
                  </p>
                )}

                {/* Countdown Timer */}
                <div className="mb-8">
                  <CountdownTimer eventDate={event.date} />
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    variant="secondary"
                    className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
                    onClick={() => {
                      // TODO: Implementar edição
                      console.log('Editar evento:', event.id);
                    }}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Editar
                  </Button>
                  <Button
                    variant="destructive"
                    className="bg-red-500/80 backdrop-blur-sm border-red-400/30 text-white hover:bg-red-500/90"
                    onClick={() => {
                      // TODO: Implementar exclusão
                      console.log('Excluir evento:', event.id);
                    }}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Excluir
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventView;

