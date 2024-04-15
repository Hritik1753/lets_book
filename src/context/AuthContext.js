// import React, { createContext, useEffect, useReducer } from "react";

// const INITIAL_STATE = {
//   user: null,
//   loading: false,
//   error: null,
// };

// const getUserFromLocalStorage = () => {
//   const storedUser = localStorage.getItem("user");
//   try {
//     return storedUser ? JSON.parse(storedUser) : null;
//   } catch (error) {
//     console.error("Error parsing user data from localStorage:", error);
//     return null;
//   }
// };

// const AuthContext = createContext(INITIAL_STATE);

// const AuthReducer = (state, action) => {
//   switch (action.type) {
//     case "LOGIN_START":
//       return {
//         user: null,
//         loading: true,
//         error: null,
//       };
//     case "LOGIN_SUCCESS":
//       return {
//         user: action.payload,
//         loading: false,
//         error: null,
//       };
//     case "LOGIN_FAILURE":
//       return {
//         user: null,
//         loading: false,
//         error: action.payload,
//       };
//     case "LOGOUT":
//       return {
//         user: null,
//         loading: false,
//         error: null,
//       };
//     default:
//       return state;
//   }
// };


  



// export const AuthContextProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

//   useEffect(() => {
//     const storedUser = getUserFromLocalStorage();
//     if (storedUser) {
//       dispatch({ type: "LOGIN_SUCCESS", payload: storedUser });
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("user", JSON.stringify(state.user));
//   }, [state.user]);



// //   return (
// //     <AuthContext.Provider
// //       value={{
// //         user: state.user,
// //         loading: state.loading,
// //         error: state.error,
// //         dispatch,
// //       }}
// //     >
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // };


  
//     return (
//       <AuthContext.Provider
//         value={{
//           user: state.user,
//           loading: state.loading,
//           error: state.error,
//           dispatch,
//         //   registerUser, // Include registerUser function in context value
//         }}
//       >
//         {children}
//       </AuthContext.Provider>
//     );
//   };
  
// export default AuthContext;




import React, { createContext, useEffect, useReducer } from "react";

const INITIAL_STATE = {
  user: null,
  loading: false,
  error: null,
};

const getUserFromLocalStorage = () => {
  const storedUser = localStorage.getItem("user");
  try {
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Error parsing user data from localStorage:", error);
    return null;
  }
};

const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
    case "REGISTER_START":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
    case "REGISTER_SUCCESS":
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
    case "REGISTER_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    const storedUser = getUserFromLocalStorage();
    if (storedUser) {
      dispatch({ type: "LOGIN_SUCCESS", payload: storedUser });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  const registerUser = async (userData) => {
    try {
      dispatch({ type: "REGISTER_START" });

      // Simulate async API call (replace with actual API call)
      const registeredUser = { ...userData, id: Math.random().toString() };
      // Assume successful registration (for demo purposes)
      dispatch({ type: "REGISTER_SUCCESS", payload: registeredUser });
    } catch (error) {
      dispatch({ type: "REGISTER_FAILURE", payload: error.message });
    }

    // useEffect(() => {
    //   const storedUser = getUserFromLocalStorage();
    //   if (storedUser) {
    //     dispatch({ type: "REGISTER_SUCCESS", payload: storedUser });
    //   }
    // }, []);
  
    // useEffect(() => {
    //   localStorage.setItem("user", JSON.stringify(state.user));
    // }, [state.user]);

  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
        registerUser, // Include registerUser function in context value
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;




