import axios from "axios";
import { v4 } from "uuid";
import {
  RecordIsBusyError,
  SuspiciousDuplicatedRegistriationError,
} from "../errors";
import {
  CreatePatientInput,
  CreatePatientOutput,
  DeletePatientInput,
  DeletePatientOutput,
  IORCAAPIClient,
} from "../interfaces";
import {
  CreatePatientRequestBody,
  CreatePatientResponseBody,
  DeletePatientRequestBody,
  DeletePatientResponseBody,
} from "../interfaces/api";
import { IHTTPClient } from "../interfaces/httpclient";

export class ORCAAPIClient implements IORCAAPIClient {
  #karteUID = v4();
  #httpClient: IHTTPClient;

  constructor({ httpClient }: { httpClient: IHTTPClient }) {
    this.#httpClient = httpClient;
  }

  static initialize({ baseURL }: { baseURL: string }): ORCAAPIClient {
    return new ORCAAPIClient({
      httpClient: axios.create({ baseURL }),
    });
  }

  createPatient = async (
    input: CreatePatientInput
  ): Promise<CreatePatientOutput> => {
    const body: CreatePatientRequestBody = {
      patientmodv3req1: {
        Request_Number: "01",
        Karte_Uid: this.#karteUID,
        Patient_ID: "*",
        Patient_Mode: "New",
        Orca_Uid: "",
        Select_Answer: "",
        Patient_Information: {
          WholeName: input.wholeName,
          WholeName_inKana: input.wholeNameInKana,
          BirthDate: input.birthDate,
          Sex: input.sex,
          EmailAddress: input.emailAddress,
          Home_Address_Information: {
            Address_ZipCode: input.homeAddressInformation.addressZipCode,
            WholeAddress1: input.homeAddressInformation.wholeAddress1,
            WholeAddress2: input.homeAddressInformation.wholeAddress2,
            PhoneNumber1: input.homeAddressInformation.phoneNumber1,
          },
        },
      },
    };
    const res = await this.#httpClient.post<CreatePatientResponseBody>(
      "/orca12/patientmodv31",
      body,
      {
        params: {
          format: "json",
        },
      }
    );

    const data = res.data;
    if (data.patientmodv3res1.Api_Result === "000") {
      const patientInfo = data.patientmodv3res1.Patient_Information;
      return {
        patientID: patientInfo.Patient_ID,
        wholeName: patientInfo.WholeName,
        wholeNameInKana: patientInfo.WholeName_inKana,
        birthDate: patientInfo.BirthDate,
        sex: Number(patientInfo.Sex),
        emailAddress: patientInfo.EmailAddress,
        homeAddressInformation: {
          addressZipCode: patientInfo.Home_Address_Information.Address_ZipCode,
          wholeAddress1: patientInfo.Home_Address_Information.WholeAddress1,
          wholeAddress2: patientInfo.Home_Address_Information.WholeAddress2,
          phoneNumber1: patientInfo.Home_Address_Information.PhoneNumber1,
        },
      };
    } else if (data.patientmodv3res1.Api_Result === "S20") {
      if (
        data.patientmodv3res1?.Patient_Select_Information?.Patient_Select ===
        "0101"
      ) {
        const msg =
          data.patientmodv3res1?.Patient_Select_Information
            ?.Patient_Select_Message;
        throw new SuspiciousDuplicatedRegistriationError(msg);
      }
    }
    throw new Error();
  };

  deletePatient = async (
    input: DeletePatientInput
  ): Promise<DeletePatientOutput> => {
    const body: DeletePatientRequestBody = {
      patientmodv3req1: {
        Request_Number: "01",
        Karte_Uid: this.#karteUID,
        Orca_Uid: "",
        Select_Answer: "",
        Patient_ID: input.patientID,
        Patient_Mode: "Delete",
      },
    };
    const res = await this.#httpClient.post<DeletePatientResponseBody>(
      "/orca12/patientmodv31",
      body,
      {
        params: {
          format: "json",
        },
      }
    );

    const data = res.data;
    if (data.patientmodv3res1.Api_Result === "000") {
      const patientInfo = data.patientmodv3res1.Patient_Information;
      return {
        patientID: patientInfo.Patient_ID,
        wholeName: patientInfo.WholeName,
        wholeNameInKana: patientInfo.WholeName_inKana,
        birthDate: patientInfo.BirthDate,
        sex: Number(patientInfo.Sex),
        emailAddress: patientInfo.EmailAddress,
        homeAddressInformation: {
          addressZipCode: patientInfo.Home_Address_Information.Address_ZipCode,
          wholeAddress1: patientInfo.Home_Address_Information.WholeAddress1,
          wholeAddress2: patientInfo.Home_Address_Information.WholeAddress2,
          phoneNumber1: patientInfo.Home_Address_Information.PhoneNumber1,
        },
      };
    } else if (data.patientmodv3res1.Api_Result === "E90") {
      throw new RecordIsBusyError(data.patientmodv3res1.Api_Result_Message);
    }
    throw new Error();
  };
}
