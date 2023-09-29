import { User } from './account/user.model';
import { Scrap } from './scrap.model';

export interface Waste {
  _id?: string;
  edibility?: string;
  origin?: string;
  complexity?: string;
  treatment?: string;
  bioDegradability?: string;
  stageOfSupplyChain?: string;
  packaging?: string;
  packagingDegradability?: string;
  detail?: string;
  scrapId?: string | Scrap;
  ApprovedAdminId?: string | User;
  createdAt?: string;
}
