'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { Event, EventContextType } from '@/types/event';

const EventContext = createContext<EventContextType | undefined>(undefined);

export const useEvents = (): EventContextType => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvents deve ser usado dentro de um EventProvider');
  }
  return context;
};

interface EventProviderProps {
  children: ReactNode;
}

export const EventProvider: React.FC<EventProviderProps> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const { user } = useAuth();

  // Carregar eventos do localStorage quando o usuário estiver logado
  useEffect(() => {
    if (user) {
      const savedEvents = localStorage.getItem(`events_${user.uid}`);
      if (savedEvents) {
        try {
          setEvents(JSON.parse(savedEvents));
        } catch (error) {
          console.error('Erro ao carregar eventos:', error);
        }
      }
    } else {
      setEvents([]);
    }
  }, [user]);

  // Salvar eventos no localStorage sempre que a lista mudar
  useEffect(() => {
    if (user && events.length >= 0) {
      localStorage.setItem(`events_${user.uid}`, JSON.stringify(events));
    }
  }, [events, user]);

  const addEvent = (eventData: Omit<Event, 'id' | 'status' | 'createdAt' | 'updatedAt'>): Event => {
    const newEvent: Event = {
      id: Date.now().toString(),
      ...eventData,
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setEvents(prev => [...prev, newEvent]);
    return newEvent;
  };

  const updateEvent = (eventId: string, updates: Partial<Event>): void => {
    setEvents(prev => 
      prev.map(event => 
        event.id === eventId 
          ? { ...event, ...updates, updatedAt: new Date().toISOString() }
          : event
      )
    );
  };

  const deleteEvent = (eventId: string): void => {
    setEvents(prev => prev.filter(event => event.id !== eventId));
  };

  const markEventCompleted = (eventId: string, completionStatus: 'realizado' | 'cancelado' | 'remarcado'): void => {
    setEvents(prev => 
      prev.map(event => 
        event.id === eventId 
          ? { 
              ...event, 
              status: 'completed',
              completionStatus,
              completedAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            }
          : event
      )
    );
  };

  const reactivateEvent = (eventId: string): void => {
    setEvents(prev => 
      prev.map(event => 
        event.id === eventId 
          ? { 
              ...event, 
              status: 'active',
              completionStatus: undefined,
              completedAt: undefined,
              updatedAt: new Date().toISOString()
            }
          : event
      )
    );
  };

  // Ordenar eventos: ativos primeiro (por data), depois concluídos
  const sortedEvents = [...events].sort((a, b) => {
    if (a.status !== b.status) {
      return a.status === 'active' ? -1 : 1;
    }
    
    // Para eventos ativos, ordenar por data (mais próximos primeiro)
    if (a.status === 'active') {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    }
    
    // Para eventos concluídos, ordenar por data de conclusão (mais recentes primeiro)
    return new Date(b.completedAt || b.updatedAt).getTime() - new Date(a.completedAt || a.updatedAt).getTime();
  });

  const value: EventContextType = {
    events: sortedEvents,
    addEvent,
    updateEvent,
    deleteEvent,
    markEventCompleted,
    reactivateEvent
  };

  return (
    <EventContext.Provider value={value}>
      {children}
    </EventContext.Provider>
  );
};

