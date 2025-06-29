export interface Event {
  id: string;
  title: string;
  date: string;
  theme?: string;
  description?: string;
  status: 'active' | 'completed';
  completionStatus?: 'realizado' | 'cancelado' | 'remarcado';
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

export interface EventContextType {
  events: Event[];
  addEvent: (eventData: Omit<Event, 'id' | 'status' | 'createdAt' | 'updatedAt'>) => Event;
  updateEvent: (eventId: string, updates: Partial<Event>) => void;
  deleteEvent: (eventId: string) => void;
  markEventCompleted: (eventId: string, completionStatus: 'realizado' | 'cancelado' | 'remarcado') => void;
  reactivateEvent: (eventId: string) => void;
}

