import React from "react";
import { shallow } from "enzyme";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import environmentSettings from "../../environment/environment";
import auth from "../Auth/auth";
import AuthCallbackComponent from "./auth.callback.component";

describe("Nav bar Component", () => {
  const clientSecretSpy = jest.spyOn(
    AuthCallbackComponent.prototype,
    "fetchClientSecret"
  );
  const fetchTokensSpy = jest.spyOn(
    AuthCallbackComponent.prototype,
    "fetchTokens"
  );
  const authCallbackComponent = shallow(<AuthCallbackComponent />);

  it("should renders without crashing", () => {
    shallow(<AuthCallbackComponent />);
  });

  it("should fetch client secret", () => {
    const URL = environmentSettings.serviceURL + "/fetchClientSecret";
    const mockData = { data: { client_secret: "abcd" } };
    const mock = new MockAdapter(axios);
    mock.onGet(URL).reply(200, mockData);
    const props = {
      location: {
        search: "?code=2DMLIdyqZb_DopVm09RwBoDwaMCR3zFmuo-UpQAB"
      }
    };
    const wrapper = shallow(<AuthCallbackComponent {...props} />);
    wrapper.setProps(props);
    const instance = authCallbackComponent.instance();
    instance.fetchClientSecret();
    expect(clientSecretSpy).toHaveBeenCalled();
  });

  it("should fail to get fetch client secret", () => {
    const URL = environmentSettings.serviceURL + "/fetchClientSecret";
    const mockData = { error: "bad" };
    const mock = new MockAdapter(axios);
    mock.onGet(URL).reply(500, mockData);
    const props = {
      location: {
        search: "?code=2DMLIdyqZb_DopVm09RwBoDwaMCR3zFmuo-UpQAB"
      }
    };
    const wrapper = shallow(<AuthCallbackComponent {...props} />);
    wrapper.setProps(props);
    const instance = authCallbackComponent.instance();
    instance.fetchClientSecret();
    expect(clientSecretSpy).toHaveBeenCalled();
  });

  it("should fail when location doesnt contains invalid url", () => {
    const props = {
      location: {
        search: "test.com/test"
      }
    };
    const wrapper = shallow(<AuthCallbackComponent {...props} />);
    wrapper.setProps(props);
    const instance = authCallbackComponent.instance();
    instance.fetchClientSecret();
  });

  it("should return data when fetchTokens is called", () => {
    const testParameter = "test";
    const URL =
      environmentSettings.oauthTokenURL +
      "&client_secret=" +
      testParameter +
      "&code=" +
      testParameter;
    const mockData = { data: "test" };
    const mock = new MockAdapter(axios);
    mock.onPost(URL).reply(200, mockData);
    const instance = authCallbackComponent.instance();
    instance.fetchTokens(testParameter, testParameter);
    expect(fetchTokensSpy).toHaveBeenCalled();
  });

  it("should set tokenData in auth class", () => {
    const tokenInput = {
      access_token: "test",
      id_token:
        "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.ErO0fS1yKjr73zJmeYqazVauy8z4Xwuhebs9fXVr3u4",
      refresh_token: "test",
      expires_in: "test"
    };
    const authTokenData = {
      accessToken: "test",
      idToken:
        "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.ErO0fS1yKjr73zJmeYqazVauy8z4Xwuhebs9fXVr3u4",
      refreshToken: "test",
      expireIn: "test",
      decodedIdToken: { sub: "1234567890" }
    };
    const props = { history: [] };
    const wrapper = shallow(<AuthCallbackComponent {...props} />);
    wrapper.setProps(props);
    const instance = wrapper.instance();
    instance.context = {
      setTokens: () => {
        auth.tokenData = authTokenData;
      }
    };
    instance.processFetchTokensResponse({ data: tokenInput });
    expect(auth.tokenData).toEqual(authTokenData);
  });

  it("should fail when context is undefined", () => {
    const tokenInput = {
      access_token: "test",
      id_token:
        "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.ErO0fS1yKjr73zJmeYqazVauy8z4Xwuhebs9fXVr3u4",
      refresh_token: "test",
      expires_in: "test"
    };
    const props = { history: [] };
    const wrapper = shallow(<AuthCallbackComponent {...props} />);
    wrapper.setProps(props);
    const instance = wrapper.instance();
    instance.context = "undefined";
    instance.processFetchTokensResponse({ data: tokenInput });
  });
});
