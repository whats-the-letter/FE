// import axios from "axios";
// import { user } from "@/class/user";

// export async function getUser(): Promise<{}> {
//   try {
//     const response = await axios.get(``, {
//       headers: {
//         Authorization: `Bearer ${user.getAccessToken()}`,
//       },
//     });

//     const { status, data } = response;

//     const userData: {
//       email: string;
//       id: number;
//       name: string;
//       // role: "USER" | "ADMIN";
//     } = data;

//     return {
//       user: { ...userData },
//       status,
//     };
//   } catch (error) {
//     // Handle errors as needed
//     console.error("Error in getUser:", error);
//     throw error;
//   }
