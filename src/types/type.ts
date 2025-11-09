export interface PersonOrGroup {
  id: string;
  name: string;
  email?: string;
  type: "Person" | "Group";
}

export interface AddListItemPayload {
  __metadata: { type: string };
  [key: string]: string | number | boolean | undefined | { type: string };
}

export interface IBazdidKonandeganListItem {
  Title: string;
  Company_Name: string;
  Job_Title: string;
  Phone_Number: string;
  Private_Number: string;
  Email: string;
  Address: string;
  Description: string;
  Expert_Name: string;
  Type_Of_Ownership: string;
  Representation_Request: string;
  City: string;
  Purchase_Volume: string;
  Fav_Products: string;
  Activity_Field: string;
  Modified: Date;
  Created: Date;
  Created_By: PersonOrGroup;
  Modified_By: PersonOrGroup;
}

export interface ITabPanelProps {
  index: number;
  value: number;
  children?: React.ReactNode;
}

export interface VisitorFormData {
  lastName: string;
  jobTitle: string;
  companyName: string;
  mobile: string;
  city: string;
  email: string;
  monthlyPurchase: string;
  favoriteProducts: string[];
  description: string;
}

export interface RepresentationFormData {
  fullName: string;
  shopCompanyName: string;
  ownershipType: "استیجاری" | "مالک" | "";
  mobile: string;
  landline: string;
  city: string;
  address: string;
  activityField: "عمده فروش" | "خرده فروش" | "انبوه ساز" | "پیمانکار" | "";
  expertOpinion: string;
}

export interface ICitiesApiItem {
  Title: string;
}


export interface ISharePointListItem {
  Title: string;
  [key: string]: any;
}

export interface ISharePointResponse {
  d: {
    results: ISharePointListItem[];
    __next?: string;
  };
}