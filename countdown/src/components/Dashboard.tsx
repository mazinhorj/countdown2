'use client';

import React, { useState } from 'react';
import { useEvents } from '@/contexts/EventContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Calendar, Clock, CheckCircle, XCircle, RotateCcw, LogOut } from 'lucide-react';
import { formatDate, getDaysUntilEvent, isEventExpired } from '@/utils/dateUtils';
import AddEventModal from '@/components/events/AddEventModal';
import EventView from '@/components/events/EventView';
import { Event } from '@/types/event';

const Dashboard: React.FC = () => {
  const { events } = useEvents();
  const { user, logout } = useAuth();
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Erro no logout:', error);
    }
  };

  // Se um evento está selecionado, mostrar a visualização detalhada
  if (selectedEventId) {
    return (
      <EventView 
        eventId={selectedEventId} 
        onBack={() => setSelectedEventId(null)} 
      />
    );
  }

  const getStatusText = (event: Event): string => {
    if (event.status === 'completed') {
      switch (event.completionStatus) {
        case 'realizado':
          return 'Realizado';
        case 'cancelado':
          return 'Cancelado';
        case 'remarcado':
          return 'Remarcado';
        default:
          return 'Concluído';
      }
    }
    
    if (isEventExpired(event.date)) {
      return 'Expirado';
    }
    
    const days = getDaysUntilEvent(event.date);
    if (days === 0) return 'Hoje!';
    if (days === 1) return '1 dia';
    return `${days} dias`;
  };

  const getCardStyle = (event: Event): string => {
    if (event.status === 'completed') {
      return 'opacity-60 border-gray-300';
    }
    
    if (isEventExpired(event.date)) {
      return 'border-red-300 bg-red-50';
    }
    
    const days = getDaysUntilEvent(event.date);
    if (days <= 7) return 'border-orange-300 bg-orange-50';
    if (days <= 30) return 'border-yellow-300 bg-yellow-50';
    return 'border-green-300 bg-green-50';
  };

  const getStatusIcon = (event: Event): React.ReactElement | null => {
    if (event.status === 'completed') {
      switch (event.completionStatus) {
        case 'realizado':
          return <CheckCircle className="h-5 w-5 text-green-600" />;
        case 'cancelado':
          return <XCircle className="h-5 w-5 text-red-600" />;
        case 'remarcado':
          return <RotateCcw className="h-5 w-5 text-orange-600" />;
        default:
          return <CheckCircle className="h-5 w-5 text-gray-600" />;
      }
    }
    return null;
  };

  const handleEventClick = (event: Event) => {
    if (event.status !== 'completed' && !isEventExpired(event.date)) {
      setSelectedEventId(event.id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 bg-purple-600 rounded-full flex items-center justify-center">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">
                Contagem Regressiva
              </h1>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600">
                Usuário: {user?.displayName || user?.email}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Meus Eventos</h2>
            <p className="text-gray-600 mt-1">
              {events.length === 0 
                ? 'Nenhum evento cadastrado ainda'
                : `${events.filter(e => e.status === 'active').length} eventos ativos`
              }
            </p>
          </div>
          
          <Button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Novo Evento
          </Button>
        </div>

        {/* Events Grid */}
        {events.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <div className="mx-auto h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Calendar className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nenhum evento cadastrado
              </h3>
              <p className="text-gray-600 mb-6">
                Comece criando seu primeiro evento para acompanhar a contagem regressiva
              </p>
              <Button
                onClick={() => setShowAddForm(true)}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Criar Primeiro Evento
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <Card 
                key={event.id} 
                className={`cursor-pointer transition-all hover:shadow-md ${getCardStyle(event)}`}
                onClick={() => handleEventClick(event)}
              >
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg line-clamp-2">
                      {event.title}
                    </CardTitle>
                    {getStatusIcon(event)}
                  </div>
                  <CardDescription className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {formatDate(event.date)}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {getStatusText(event)}
                      </span>
                    </div>
                    
                    {event.theme && (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {event.theme}
                      </span>
                    )}
                  </div>
                  
                  {event.description && (
                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                      {event.description}
                    </p>
                  )}

                  {/* Botão para marcar evento expirado como concluído */}
                  {event.status === 'active' && isEventExpired(event.date) && (
                    <div className="mt-3 pt-3 border-t">
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full text-xs"
                        onClick={(e) => {
                          e.stopPropagation();
                          // TODO: Implementar modal de conclusão
                          console.log('Marcar como concluído:', event.id);
                        }}
                      >
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Marcar como Concluído
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* Add Event Modal */}
      <AddEventModal 
        isOpen={showAddForm}
        onClose={() => setShowAddForm(false)}
      />
    </div>
  );
};

export default Dashboard;

