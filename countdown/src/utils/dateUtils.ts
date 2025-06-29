import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds, format, parseISO, isValid } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return format(date, 'dd/MM/yyyy', { locale: ptBR });
  } catch {
    return 'Data inválida';
  }
};

export const formatDateTime = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return format(date, 'dd/MM/yyyy HH:mm', { locale: ptBR });
  } catch {
    return 'Data inválida';
  }
};

export const getDaysUntilEvent = (eventDate: string): number => {
  try {
    const event = new Date(eventDate);
    const now = new Date();
    return Math.max(0, differenceInDays(event, now));
  } catch {
    return 0;
  }
};

export const getTimeUntilEvent = (eventDate: string): CountdownTime => {
  try {
    const event = new Date(eventDate);
    const now = new Date();
    
    if (event <= now) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const totalSeconds = differenceInSeconds(event, now);
    const totalMinutes = differenceInMinutes(event, now);
    const totalHours = differenceInHours(event, now);
    const totalDays = differenceInDays(event, now);

    const days = totalDays;
    const hours = totalHours - (days * 24);
    const minutes = totalMinutes - (totalHours * 60);
    const seconds = totalSeconds - (totalMinutes * 60);

    return {
      days: Math.max(0, days),
      hours: Math.max(0, hours),
      minutes: Math.max(0, minutes),
      seconds: Math.max(0, seconds)
    };
  } catch {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
};

export const isEventExpired = (eventDate: string): boolean => {
  try {
    const event = new Date(eventDate);
    const now = new Date();
    return event < now;
  } catch {
    return true;
  }
};

export const getEventStatus = (eventDate: string): 'upcoming' | 'today' | 'expired' => {
  try {
    const event = new Date(eventDate);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const eventDay = new Date(event.getFullYear(), event.getMonth(), event.getDate());

    if (eventDay.getTime() === today.getTime()) {
      return 'today';
    } else if (event > now) {
      return 'upcoming';
    } else {
      return 'expired';
    }
  } catch {
    return 'expired';
  }
};

export const formatCountdownTime = (time: CountdownTime): string => {
  const { days, hours, minutes, seconds } = time;
  
  if (days > 0) {
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  } else if (hours > 0) {
    return `${hours}h ${minutes}m ${seconds}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  } else {
    return `${seconds}s`;
  }
};

export const getRelativeTimeText = (eventDate: string): string => {
  try {
    const days = getDaysUntilEvent(eventDate);
    
    if (isEventExpired(eventDate)) {
      return 'Expirado';
    }
    
    if (days === 0) {
      return 'Hoje!';
    } else if (days === 1) {
      return 'Amanhã';
    } else if (days <= 7) {
      return `Em ${days} dias`;
    } else if (days <= 30) {
      return `Em ${days} dias`;
    } else {
      return `Em ${days} dias`;
    }
  } catch {
    return 'Erro no cálculo';
  }
};

export const isValidDate = (dateString: string): boolean => {
  try {
    const date = parseISO(dateString);
    return isValid(date);
  } catch {
    return false;
  }
};

export const isFutureDate = (dateString: string): boolean => {
  try {
    const date = new Date(dateString);
    const now = new Date();
    return date > now;
  } catch {
    return false;
  }
};

