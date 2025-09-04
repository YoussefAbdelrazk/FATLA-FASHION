'use client';

import ReturnReasonsTable from '@/components/returns/return-reasons-table';
import { ReturnReason } from '@/types/return';
import { ReturnReasonFormData } from '@/lib/schemas/return-reason-schema';
import { useEffect, useState } from 'react';

interface ReturnReasonsClientProps {
  initialReasons: ReturnReason[];
}

export default function ReturnReasonsClient({ initialReasons }: ReturnReasonsClientProps) {
  const [returnReasons, setReturnReasons] = useState<ReturnReason[]>(initialReasons);
  const [isLoading, setIsLoading] = useState(false);

  const handleReasonAdded = async (reasonData: ReturnReasonFormData) => {
    const newReason: ReturnReason = {
      ...reasonData,
      id: Date.now().toString(), // Simple ID generation for demo
      createdBy: 'المستخدم الحالي', // In real app, get from auth context
      createdAt: new Date().toISOString(),
    };

    setReturnReasons(prev => [...prev, newReason]);
  };

  const handleReasonUpdated = async (id: string, reasonData: ReturnReasonFormData) => {
    setReturnReasons(prev =>
      prev.map(reason => (reason.id === id ? { ...reason, ...reasonData } : reason)),
    );
  };

  const handleReasonDeleted = (id: string) => {
    setReturnReasons(prev => prev.filter(reason => reason.id !== id));
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      // In a real app, you would fetch fresh data from the API
      // For now, we'll just simulate a refresh
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Error refreshing return reasons:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ReturnReasonsTable
      returnReasons={returnReasons}
      onReasonAdded={handleReasonAdded}
      onReasonUpdated={handleReasonUpdated}
      onReasonDeleted={handleReasonDeleted}
      onRefresh={handleRefresh}
      isLoading={isLoading}
    />
  );
}
