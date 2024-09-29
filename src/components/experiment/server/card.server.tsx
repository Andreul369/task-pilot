import React from 'react';

import { Tables } from '@/types/types_db';
import { CardDialog } from '../client/card.client';

interface CardServerProps {
  card: Tables<'cards'>;
  index: number;
}

const CardServer = async ({ card, index }: CardServerProps) => {
  return <CardDialog initialData={card} index={index} />;
};

export default CardServer;
