import { Company } from './Company';
import { Address } from './Address';

export interface Division extends Address {
  id: number;
  name: string;
  companies?: Array<Company>;
}
