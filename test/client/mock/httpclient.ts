import { IHTTPClient } from "../../../src/interfaces/httpclient";

export const createMockHTTPClient = (props: {
  post?: jest.Mock;
}): IHTTPClient => {
  return {
    post: props.post || jest.fn(),
  };
};
