import axios from "axios";

export async function axiosPostRequest(
    
  url,
  dataObject,
  wantAuthorizationHeader
) {
  try {
    let response = null;
    if (wantAuthorizationHeader) {
      response = await axios.post(url);
    } else {
      response = await axios.post(url, dataObject || {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return response;
  } catch (error) {
    console.log("Error in axios post request: "+error);
  }
}

export async function axiosGetRequest(url, wantAuthorizationHeader) {
  try {
    let response = null;
    if (wantAuthorizationHeader) {
      response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      response = await axios.get(url);
    }
  
    return response;
  } catch (error) {
    console.log("Error in axios get request: "+error);
  }
}
