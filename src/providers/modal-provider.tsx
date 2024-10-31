'use client';

import { useEffect, useState } from 'react';

import CardModal from '@/components/card/card-modal';

export const ModalProvider = () => {
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <CardModal />;
};
