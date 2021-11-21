import { ORCAAPIClient } from "../../src/client";
import {
  RecordIsBusyError,
  SuspiciousDuplicatedRegistriationError,
} from "../../src/errors";
import { createMockHTTPClient } from "./mock/httpclient";

describe("createPatient", () => {
  test("ok", async () => {
    const mock = jest.fn();
    mock.mockResolvedValueOnce({
      data: {
        patientmodv3res1: {
          Request_Number: "01",
          Response_Number: "00",
          Karte_Uid: "7c1680bd-44b1-47b1-a877-b7484916be0f",
          Orca_Uid: "39343ed6-8dc8-4d3e-95a2-bd4a53d3ef43",
          Information_Date: "2021-11-22",
          Information_Time: "00:12:04",
          Api_Result: "000",
          Api_Result_Message: "登録終了",
          Reskey: "Acceptance_Info",
          Patient_Information: {
            Patient_ID: "00096",
            WholeName: "日医　三郎",
            WholeName_inKana: "ニチイ　サブロウ",
            BirthDate: "1970-01-01",
            Sex: "1",
            EmailAddress: "test@tt.dot.jp",
            Home_Address_Information: {
              Address_ZipCode: "1060047",
              WholeAddress1: "東京都港区麻布十番",
              WholeAddress2: "１−２−３",
              PhoneNumber1: "070-0012-3456",
            },
            TestPatient_Flag: "0",
            Reduction_Reason: "00",
            Reduction_Reason_Name: "該当なし",
            Discount: "00",
            Discount_Name: "該当なし",
            Condition1: "00",
            Condition1_Name: "該当なし",
            Condition2: "00",
            Condition2_Name: "該当なし",
            Condition3: "00",
            Condition3_Name: "該当なし",
          },
        },
      },
    });
    const httpClient = createMockHTTPClient({ post: mock });
    const apiClient = new ORCAAPIClient({ httpClient });
    const res = await apiClient.createPatient({
      wholeName: "日医　三郎",
      wholeNameInKana: "ニチイ　サブロウ",
      birthDate: "1970-01-01",
      sex: 1,
      emailAddress: "test@tt.dot.jp",
      homeAddressInformation: {
        addressZipCode: "1060047",
        wholeAddress1: "東京都港区麻布十番",
        wholeAddress2: "１−２−３",
        phoneNumber1: "070-0012-3456",
      },
    });
    expect(res).toEqual({
      patientID: "00096",
      wholeName: "日医　三郎",
      wholeNameInKana: "ニチイ　サブロウ",
      birthDate: "1970-01-01",
      sex: 1,
      emailAddress: "test@tt.dot.jp",
      homeAddressInformation: {
        addressZipCode: "1060047",
        wholeAddress1: "東京都港区麻布十番",
        wholeAddress2: "１−２−３",
        phoneNumber1: "070-0012-3456",
      },
    });
  });

  test("二重登録疑い", async () => {
    const mock = jest.fn();
    mock.mockResolvedValueOnce({
      data: {
        patientmodv3res1: {
          Request_Number: "01",
          Response_Number: "02",
          Karte_Uid: "882e8e25-74fc-4551-8aa3-1f6dfbe4e673",
          Orca_Uid: "d1651b9d-32da-4ba3-a890-1abf8cd5d7b0",
          Information_Date: "2021-11-22",
          Information_Time: "00:13:04",
          Api_Result: "S20",
          Api_Result_Message:
            "選択項目があります。選択結果を返却してください。",
          Reskey: "Acceptance_Info",
          Patient_Information: {
            Patient_ID: "*",
            WholeName: "日医　三郎",
            WholeName_inKana: "ニチイ　サブロウ",
            BirthDate: "1900-01-01",
            Sex: "1",
            EmailAddress: "test@example.com",
            Home_Address_Information: {
              Address_ZipCode: "1060047",
              WholeAddress1: "東京都港区麻布十番",
              WholeAddress2: "１−２−３",
              PhoneNumber1: "070-0012-3456",
            },
            Reduction_Reason: "00",
            Reduction_Reason_Name: "該当なし",
            Discount: "00",
            Discount_Name: "該当なし",
            Condition1: "00",
            Condition1_Name: "該当なし",
            Condition2: "00",
            Condition2_Name: "該当なし",
            Condition3: "00",
            Condition3_Name: "該当なし",
          },
          Patient2_Information: [
            {
              Patient_ID: "00096",
              WholeName: "日医　三郎",
              WholeName_inKana: "ニチイ　サブロウ",
              BirthDate: "1970-01-01",
              Sex: "1",
              WholeAddress1: "東京都港区麻布十番",
              WholeAddress2: "１−２−３",
            },
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
          ],
          Patient_Select_Information: {
            Patient_Select: "0101",
            Patient_Select_Message:
              "二重登録疑いの患者が存在します。登録しますか？",
          },
        },
      },
    });
    const httpClient = createMockHTTPClient({ post: mock });
    const apiClient = new ORCAAPIClient({ httpClient });
    await expect(
      apiClient.createPatient({
        wholeName: "日医　三郎",
        wholeNameInKana: "ニチイ　サブロウ",
        birthDate: "1970-01-01",
        sex: 1,
        emailAddress: "test@tt.dot.jp",
        homeAddressInformation: {
          addressZipCode: "1060047",
          wholeAddress1: "東京都港区麻布十番",
          wholeAddress2: "１−２−３",
          phoneNumber1: "070-0012-3456",
        },
      })
    ).rejects.toThrow(SuspiciousDuplicatedRegistriationError);
  });
});

describe("deletePatient", () => {
  test("ok", async () => {
    const mock = jest.fn();
    mock.mockResolvedValueOnce({
      data: {
        patientmodv3res1: {
          Request_Number: "01",
          Response_Number: "02",
          Karte_Uid: "d9628074-83de-4e9b-a1ad-475e86b2d2b9",
          Orca_Uid: "d673a172-8bb8-434e-8e66-b05ff2994abc",
          Information_Date: "2021-11-21",
          Information_Time: "23:57:00",
          Api_Result: "000",
          Api_Result_Message: "検索処理終了",
          Reskey: "Acceptance_Info",
          Patient_Information: {
            Patient_ID: "00090",
            WholeName: "日医　太郎",
            WholeName_inKana: "ニチイ　タロウ",
            BirthDate: "1970-01-01",
            Sex: "1",
            EmailAddress: "test@example.com",
            Home_Address_Information: {
              Address_ZipCode: "1060047",
              WholeAddress1: "東京都港区麻布十番",
              WholeAddress2: "１−２−３",
              PhoneNumber1: "070-0012-3456",
            },
            TestPatient_Flag: "0",
            Reduction_Reason: "00",
            Reduction_Reason_Name: "該当なし",
            Discount: "00",
            Discount_Name: "該当なし",
            Condition1: "00",
            Condition1_Name: "該当なし",
            Condition2: "00",
            Condition2_Name: "該当なし",
            Condition3: "00",
            Condition3_Name: "該当なし",
          },
        },
      },
    });
    const httpClient = createMockHTTPClient({ post: mock });
    const apiClient = new ORCAAPIClient({ httpClient });
    const res = await apiClient.deletePatient({
      patientID: "00001",
    });
    expect(res).toEqual({
      patientID: "00090",
      wholeName: "日医　太郎",
      wholeNameInKana: "ニチイ　タロウ",
      birthDate: "1970-01-01",
      sex: 1,
      emailAddress: "test@example.com",
      homeAddressInformation: {
        addressZipCode: "1060047",
        wholeAddress1: "東京都港区麻布十番",
        wholeAddress2: "１−２−３",
        phoneNumber1: "070-0012-3456",
      },
    });
  });

  test("他端末使用中", async () => {
    const mock = jest.fn();
    mock.mockResolvedValueOnce({
      data: {
        patientmodv3res1: {
          Request_Number: "01",
          Response_Number: "01",
          Karte_Uid: "44f083b5-8bbf-4ea7-b6fd-588912df339b",
          Information_Date: "2021-11-21",
          Information_Time: "23:50:29",
          Api_Result: "E90",
          Api_Result_Message: "他端末使用中",
          Reskey: "Acceptance_Info",
          Patient_Information: { Patient_ID: "00090" },
        },
      },
    });
    const httpClient = createMockHTTPClient({ post: mock });
    const apiClient = new ORCAAPIClient({ httpClient });
    await expect(
      apiClient.deletePatient({
        patientID: "00001",
      })
    ).rejects.toThrow(RecordIsBusyError);
  });
});
