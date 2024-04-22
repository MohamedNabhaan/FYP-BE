export type LoginRes = {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
};

export type Patient = {
  firstName: string;
  lastName: string;
  contactNumber: string;
  gender: string;
  address: string;
  city: string;
  postcode: number;
  dob: string;
  emergencyFirstName: string;
  emergencyLastName: string;
  emergencyContact: string;
  emergencyRelationship: string;
  medicalDetails: string;
  allergicDetails: string;
};
