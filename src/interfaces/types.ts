export type CreatePatientInput = {
  wholeName: string;
  wholeNameInKana: string;
  birthDate: string;
  sex: number;
  emailAddress: string;
  homeAddressInformation: {
    addressZipCode: string;
    wholeAddress1: string;
    wholeAddress2: string;
    phoneNumber1: string;
  };
};

export type CommonPatientOutput = {
  patientID: string;
  wholeName: string;
  wholeNameInKana: string;
  birthDate: string;
  sex: number;
  emailAddress: string;
  homeAddressInformation: {
    addressZipCode: string;
    wholeAddress1: string;
    wholeAddress2: string;
    phoneNumber1: string;
  };
};

export type CreatePatientOutput = CommonPatientOutput;

export type DeletePatientInput = {
  patientID: string;
};

export type DeletePatientOutput = CommonPatientOutput;
