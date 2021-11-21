export type PatientMode = "New" | "Delete";

export type ApiResult = "000" | string;

export type PatientResponseBody = {
  patientmodv3res1: {
    Request_Number: string;
    Response_Number: string;
    Karte_Uid: string;
    Orca_Uid: string;
    Information_Date: string;
    Information_Time: string;
    Api_Result: ApiResult;
    Api_Result_Message: string;
    Reskey: string;
    Patient_Information: {
      Patient_ID: string;
      WholeName: string;
      WholeName_inKana: string;
      BirthDate: string;
      Sex: string;
      EmailAddress: string;
      Home_Address_Information: {
        Address_ZipCode: string;
        WholeAddress1: string;
        WholeAddress2: string;
        PhoneNumber1: string;
      };
      TestPatient_Flag: string;
      Reduction_Reason: string;
      Reduction_Reason_Name: string;
      Discount: string;
      Discount_Name: string;
      Condition1: string;
      Condition1_Name: string;
      Condition2: string;
      Condition2_Name: string;
      Condition3: string;
      Condition3_Name: string;
    };
    Patient_Select_Information?: {
      Patient_Select: string;
      Patient_Select_Message: string;
    };
  };
};

export type CreatePatientRequestBody = {
  patientmodv3req1: {
    Request_Number: string;
    Karte_Uid: string;
    Patient_ID: string;
    Patient_Mode: PatientMode;
    Orca_Uid: string;
    Select_Answer: string;
    Patient_Information: {
      WholeName: string;
      WholeName_inKana: string;
      BirthDate: string;
      Sex: number;
      EmailAddress: string;
      Home_Address_Information: {
        Address_ZipCode: string;
        WholeAddress1: string;
        WholeAddress2: string;
        PhoneNumber1: string;
      };
    };
  };
};

export type CreatePatientResponseBody = PatientResponseBody;

export type DeletePatientRequestBody = {
  patientmodv3req1: {
    Request_Number: string;
    Karte_Uid: string;
    Orca_Uid: string;
    Select_Answer: string;
    Patient_ID: string;
    Patient_Mode: PatientMode;
  };
};

export type DeletePatientResponseBody = PatientResponseBody;
