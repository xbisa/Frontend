import { Audit } from './Audit';

export interface Company extends Audit {
  id: number;
  name: string;
  divisionId: number;
  numberOfProperties: number;
  numberOfNotListedUnits: number;
  numberOfAvailableUnits: number;
  numberOfInProgressUnits: number;
  numberOfActiveUnits: number;
}
