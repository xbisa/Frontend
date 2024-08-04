import { Audit } from './Audit';

export interface Address extends Audit {
  zip: number;
  city: string;
}
