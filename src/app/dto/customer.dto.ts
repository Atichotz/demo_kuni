export interface StatusOption {
  id: number;
  status_name: string;
  sort_order: number | null;
}

export interface CreateCustomerPayload {
  display_name: string;
  project_type: string | null;
  project_location_name: string;
  type_of_customer_name: string;
  type_of_system_name: string;
  status_id: number | null;
  full_address: string | null;
  google_maps_link: string | null;
  contact: {
    firstname: string;
    lastname: string;
    tel: string;
    email: string;
  };
}
