// import React, { useEffect } from "react";
// import { useCredentials } from "./useCredentials";
// import { useHistory } from "react-router";
//
// const authGuardContext = React.createContext<{
//   AuthGuard: React.FC;
// }>({
//   AuthGuard: () => null
// });
//
// export const ProvideAuthGuard = ({ children }: { children: any }) => {
//   const { AuthGuard } = useProvideAuthGuard();
//   return (
//       <authGuardContext.Provider value={{ AuthGuard }}>
//         {children}
//       </authGuardContext.Provider>
//   );
// }
//
// export const useAuthGuard = () => React.useContext(authGuardContext);
//
// function useProvideAuthGuard() {
//   const AuthGuard = () => {
//     const { accessToken } = useCredentials();
//     const history = useHistory();
//     useEffect(() => {
//       if (accessToken === null) {
//         history.push("/login");
//       } else {
//         history.push("/home");
//       }
//     }, [accessToken]);
//     return null;
//   }
//
//   return {
//     AuthGuard,
//   };
// }

export const caca = {};
