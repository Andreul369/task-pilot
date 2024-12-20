'use client';

import { useEffect, useState } from 'react';

import CardModal from '@/components/card/card-modal';
import ProModal from '@/components/pro-modal';

export const ModalProvider = () => {
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <ProModal />
      <CardModal />
    </>
  );
};
