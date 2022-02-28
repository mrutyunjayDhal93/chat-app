import { useContext, createContext } from "react";
import { useState, useEffect, useReducer } from "react";
import getExistingUser from "../Utility/ultsAuth/getExistingUser";
import { initialState, Reducer } from "../Utility/ultsAuth/ReducerToAuthcheck";
import axios from "axios";

//CREATE CONTEXT
const authContext = createContext();

// CREATE CUSTOM HOOK TO RETURN useContext() DATAS WITH authContext
export const useAuth = () => useContext(authContext);

//CREATE WRAPPING COMPONENT FOR Auth-Provider
export default function AuthProvider({ children }) {
  const [authCheck, dispatch] = useReducer(Reducer, initialState); //check Auth or not
  const [User, setUser] = useState({});

  // TRY TO GET USERS, IF USER ALLREADY BEEN LOGED IN
  useEffect(() => {
    //pass seUser to get the User-Data and dispatch to set authcheck
    getExistingUser(setUser, dispatch);
  });

  //SIGNIN HANDLER
  const signin = async (name, phone, password, confpassword) => {
    /*-----------name & phone & password & confpassword hase to be given----------*/
    if (!name || !phone || !password || !confpassword) {
      return;
    } else {
      /*----------------password and confpassword has to be same-----------------*/
      if (password !== confpassword) {
        return;
      } else {
        /*-------------------send data to BN & create an Account----------------*/

        try {
          //create header for content type
          const config = {
            headers: {
              "content-type": "application/json",
            },
          };
          // send req by axios & get User and all other data as res
          const { data } = await axios.post(
            "/auth/signin",
            {
              name,
              phone,
              password,
            },
            config
          );
          // After getting Data successfully,store User Data --> local User State
          if (data.success) {
            setUser((_olduser) => {
              const newuser = { ...data.user };
              return newuser;
            });
            //set auth true
            dispatch({
              type: "USERIN",
            });
          } else {
            /* Error handeling */
          }
        } catch (err) {
          console.log(err.message);
        }
      }
    }
  };

  //LOGIN HANDLER
  const login = async (phone, password) => {
    /*-----------------phone & password has to be given-------------------*/
    if (!phone || !password) {
      return;
    } else {
      /*--------phone should have 10 nums & password should have 8 or more than 8 in count---------*/
      if (phone.length !== 10 || password.length < 8) {
        return;
      } else {
        /*---------- check authraisetion by sending data to BN -----------*/
        try {
          //create header to define body content-type
          const config = {
            headers: {
              "content-type": "application/json",
            },
          };
          /* send req data to BN and 
          getting back User data as res
          and also store token in cookies/session
          /localstorages in BN */
          const { data } = await axios.post(
            "auth/login",
            {
              phone,
              password,
            },
            config
          );
          //After getting data successfully, store User-Data --> local-User
          if (data.success) {
            setUser((_olduser) => {
              const newuser = {
                ...data.user,
              };
              return newuser;
            });
            //set auth true
            dispatch({
              type: "USERIN",
            });
          } else {
            /*Error handeling */
          }
        } catch (err) {
          console.log(err.message);
        }
      }
    }
  };

  //LOGOUT HANDLER
  const logout = () => {};

  //STORE DATAS AS OBJ TO TRANSFER TO WRAPPED CMPONENTS
  const exportingValue = {
    User,
    authCheck,
    dispatch,
    signin,
    login,
    logout,
  };

  return (
    // wrapping childe component by context provider
    <authContext.Provider value={exportingValue}>
      {children}
    </authContext.Provider>
  );
}
