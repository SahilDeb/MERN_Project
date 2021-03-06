export default function catchErrors(error, displayError) {
  let errorMsg;
  if (error.response) {
    // The request was made and server responded with status code that is in the range of 2XX
    errorMsg = error.response.data;
    console.error("Error response: ", errorMsg);

    // For Cloudinary image uploads
    if (error.response.data.error) {
      errorMsg = error.response.data.error.message;
    }
  }
  else if (error.request) {
    // The request was made, but no response was received
    errorMsg = error.request;
    console.error("Error request: ", errorMsg);
  }
  else {
    errorMsg = error.message;
    console.error("Error message: ", errorMsg);
  }
  displayError(errorMsg);
}