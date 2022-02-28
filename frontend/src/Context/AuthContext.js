import { useContext, createContext } from "react";
import { useState, useEffect, useReducer } from "react";
import getExistingUser from "../Utility/ultsAuth/getExistingUser";
import { initialState, Reducer } from "../Utility/ultsAuth/ReducerToAuthcheck";
import axios from "axios";
import useAlertToast from "../Utility/ToastGenerater";

//CREATE CONTEXT
const authContext = createContext();

// CREATE CUSTOM HOOK TO RETURN useContext() DATAS WITH authContext
export const useAuth = () => useContext(authContext);

//CREATE WRAPPING COMPONENT FOR Auth-Provider
export default function AuthProvider({ children }) {
  const [authCheck, dispatch] = useReducer(Reducer, initialState); //check Auth or not
  const [user, setuser] = useState({});

  //Toast generater
  const Toast = useAlertToast();

  // TRY TO GET USERS, IF USER ALLREADY BEEN LOGED IN
  useEffect(() => {
    //pass seUser to get the User-Data and dispatch to set authcheck
    getExistingUser(setuser, dispatch);
  }, []);

  //SIGNIN HANDLER
  const signin = async (name, email, password, confpassword) => {
    /*-----------name & phone & password & confpassword hase to be given----------*/
    if (!name || !email || !password || !confpassword) {
      Toast("Every single fild should be get filled!", "error");
      return;
    } else {
      /*----------------password and confpassword has to be same-----------------*/
      if (password !== confpassword) {
        Toast("password & confirm password are not same!");
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
              email,
              password,
            },
            config
          );
          // After getting Data successfully,store User Data --> local User State
          if (data.success) {
            //set user data
            setuser((_olduser) => {
              const newuser = { ...data.User };
              return newuser;
            });
            //set auth true
            dispatch({
              type: "USERIN",
            });
            Toast("Sign Up successfully!", "success");
          } else {
            /* Error handeling */
            Toast(data.msg, "error");
          }
        } catch (err) {
          console.log(err.message);
          Toast("Registration failed!", "error");
        }
      }
    }
  };

  //LOGIN HANDLER
  const login = async (email, password) => {
    /*-----------------phone & password has to be given-------------------*/
    if (!email || !password) {
      Toast("Every single fild should be get filled!", "error");
      return;
    } else {
      /*--------phone should have 10 nums & password should have 8 or more than 8 in count---------*/
      if (password.length < 8) {
        Toast("password should have 8 character", "error");
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
            "/auth/login",
            {
              email,
              password,
            },
            config
          );
          //After getting data successfully, store User-Data --> local-User
          if (data.success) {
            //get user details
            setuser((_olduser) => {
              const newuser = {
                ...data.User,
              };
              return newuser;
            });
            //set auth true
            dispatch({
              type: "USERIN",
            });
            Toast("Login successfull!", "success");
          } else {
            /*Error handeling */
            Toast("Athentication failed!", "error");
          }
        } catch (err) {
          console.log(err.message);
          Toast("Athentication failed!", "error");
        }
      }
    }
  };

  //LOGOUT HANDLER
  const logout = () => {};

  //STORE DATAS AS OBJ TO TRANSFER TO WRAPPED CMPONENTS
  const exportingValue = {
    user,
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
