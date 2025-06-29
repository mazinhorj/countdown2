'use client';

import React, { useState } from 'react';
import { useEvents } from '@/contexts/EventContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Calendar, Clock } from 'lucide-react';
import { isFutureDate, isValidDate } from '@/utils/dateUtils';

interface AddEventModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddEventModal: React.FC<AddEventModalProps> = ({ isOpen, onClose }) => {
  const { addEvent } = useEvents();
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    theme: '',
    description: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Título é obrigatório';
    }

    if (!formData.date) {
      newErrors.date = 'Data é obrigatória';
    } else if (!isValidDate(formData.date)) {
      newErrors.date = 'Data inválida';
    } else if (!isFutureDate(formData.date)) {
      newErrors.date = 'A data deve ser futura';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      await addEvent({
        title: formData.title.trim(),
        date: formData.date,
        theme: formData.theme.trim() || undefined,
        description: formData.description.trim() || undefined,
      });

      // Reset form
      setFormData({
        title: '',
        date: '',
        theme: '',
        description: ''
      });
      setErrors({});
      onClose();
    } catch (error) {
      console.error('Erro ao criar evento:', error);
      setErrors({ submit: 'Erro ao criar evento. Tente novamente.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({
      title: '',
      date: '',
      theme: '',
      description: ''
    });
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-purple-600 rounded-full flex items-center justify-center">
              <Calendar className="h-4 w-4 text-white" />
            </div>
            <div>
              <DialogTitle>Novo Evento</DialogTitle>
              <DialogDescription>
                Cadastre um novo evento para acompanhar a contagem regressiva
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">
              Título do Evento *
            </Label>
            <Input
              id="title"
              placeholder="Ex: Casamento, Formatura, Viagem..."
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className={errors.title ? 'border-red-500' : ''}
            />
            {errors.title && (
              <p className="text-sm text-red-600">{errors.title}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">
              Data do Evento *
            </Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => handleInputChange('date', e.target.value)}
              className={errors.date ? 'border-red-500' : ''}
            />
            {errors.date && (
              <p className="text-sm text-red-600">{errors.date}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="theme">
              Tema (opcional)
            </Label>
            <Input
              id="theme"
              placeholder="Ex: casamento, festa, viagem, trabalho..."
              value={formData.theme}
              onChange={(e) => handleInputChange('theme', e.target.value)}
            />
            <p className="text-xs text-gray-500">
              O tema será usado para buscar imagens de fundo relacionadas
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">
              Descrição (opcional)
            </Label>
            <Textarea
              id="description"
              placeholder="Adicione detalhes sobre o evento..."
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={3}
            />
          </div>

          {errors.submit && (
            <p className="text-sm text-red-600">{errors.submit}</p>
          )}

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="flex-1"
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1 flex items-center gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Clock className="h-4 w-4 animate-spin" />
                  Criando...
                </>
              ) : (
                <>
                  <Calendar className="h-4 w-4" />
                  Criar Evento
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEventModal;

