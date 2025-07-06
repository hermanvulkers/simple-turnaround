import { gql, useSubscription } from '@apollo/client';

export type TurnaroundEvent = {
  flightId: string;
  type: string;
  timestamp: string;
  gate?: string;
};

const TURNAROUND_SUB = gql`
  subscription {
    turnaroundUpdated {
      flightId
      type
      timestamp
      gate
    }
  }
`;

export const useTurnaroundSubscription = () => {
  const { data, loading, error } = useSubscription<{ turnaroundUpdated: TurnaroundEvent }>(TURNAROUND_SUB);

  console.log('📡 Subscription loading:', loading);
  console.log('📡 Subscription data:', data);
  console.log('📡 Subscription error:', error);

  return data?.turnaroundUpdated;
};
