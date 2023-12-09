type BasicDetails = {
  district: string;
  policeStation: string;
  year: string;
  firNumber: string;
  dateAndTimeOfRegistration: string;
};

type ViolatedActWithSectionNumber = {
  act: string;
  sectionNumber: string;
};

type PersonalDetails = {
  name: string;
  fatherName: string;
  dateOfBirth: string;
  uidNo: string;
  address: string;
  permanentAddress: string;
  mobileNumber: string;
  emailId: string;
};

type PropertyDetails = {
  propertyType: string;
  propertyDescription: string;
  propertyValue: string;
};

type FIR = {
  basicDetails: BasicDetails;
  violatedActsWithSectionNumbers: ViolatedActWithSectionNumber[];
  complainantDetails: PersonalDetails;
  propertyDetails: PropertyDetails;
  accusedDetails: PersonalDetails[];
  witnessDetails: PersonalDetails[];
};

export type { FIR };
