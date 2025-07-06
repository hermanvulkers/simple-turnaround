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
  const { data, error } = useSubscription<{ turnaroundUpdated: TurnaroundEvent }>(TURNAROUND_SUB);

  console.log("data", data);
  console.log('error', error);

  return data?.turnaroundUpdated;
};
