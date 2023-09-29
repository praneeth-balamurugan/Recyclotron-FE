import { User } from "./account/user.model";

export interface Scrap {
  _id?: string;
  product?: string;
  quantity?: string;
  location?: string;
  scrapProcessingDescription?: string;
  scrapProducedTime?: string;
  utilizableTime?: string;
  transportationAvailable?: boolean;
  image?: string;
  createdAt?: string;
  creator?: string | User;
  isLocked?: boolean;
}
