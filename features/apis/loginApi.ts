// import axios, { AxiosError } from "axios";

// export async function postKakaoLogin(email: string) {
//   try {
//     const response = await axios.post(
//       `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
//       {
//         email: email,
//       }
//     );
//     const { accessToken }: { accessToken: string } = response.data.data;
//     const { status } = response;

//     console.log("postKakaoLogin Success:", { accessToken, status });

//     return { accessToken, status };
//   } catch (error) {
//     const axiosError = error as AxiosError;

//     if (axiosError.response) {
//       // The request was made and the server responded with a status code
//       // that falls out of the range of 2xx
//       console.error(
//         "postKakaoLogin Error - Response Data:",
//         axiosError.response.data
//       );
//       console.error(
//         "postKakaoLogin Error - Response Status:",
//         axiosError.response.status
//       );
//     } else if (axiosError.request) {
//       // The request was made but no response was received
//       console.error("postKakaoLogin Error - No Response Received");
//     } else {
//       // Something happened in setting up the request that triggered an Error
//       console.error("postKakaoLogin Error:", axiosError.message);
//     }

//     throw error;
//   }
// }
