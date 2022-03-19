import { useContext, createContext } from "react";
import { useState, useEffect, useReducer } from "react";
import getExistingUser from "../Utility/ultsAuth/getExistingUser";
import { initialState, Reducer } from "../Utility/ultsAuth/ReducerToAuthcheck";
import axios from "axios";
import useAlertToast from "../Utility/ToastGenerater";

//CREATE CONTEXT
const authContext = createContext();

// CUSTOM HOOK FOR useContext()
export const useAuth = () => useContext(authContext);

//CREATE WRAPPING COMPONENT Auth-Provider
function AuthProvider({ children }) {
  //GOLBAL STATE HANDLERS
  const [authCheck, dispatch] = useReducer(Reducer, initialState); //check Auth or not
  const [user, setuser] = useState({});

  //Toast generater
  const Toast = useAlertToast();

  /*  
    description :  get user data by using **userEffect()
    api : /auth/
    method : GET [PROTECTED]
    req : 
    res : User-{name,email} [200]/[401]  
  */
  useEffect(() => {
    getExistingUser(setuser, dispatch); //pass setUser to get the User-Data and dispatch to set authcheck
  }, []);

  /*------------------------- CREATE METHODS ------------------------ */
  /*  
    description :  signin to new user
    api : /auth/signin
    method : POST
    req : name,email,password,cheetCode
    res : [201]/[500]
  */
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

  /*  
    description :  user get logged in
    api : /auth/login
    method : POST 
    req : email,password
    res : User-{name,email} [200]/[401]/[401]  
  */
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

  /* TODO:
    description :  Logged out user 
    api : /auth/logout
    method : POST [PROTECTED]
    req : **not done yet
    res : **not done yet 
  */
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

  /*-----------------------RETURN TO RENDER------------------------*/
  return (
    // wrapping childe component by context provider
    <authContext.Provider value={exportingValue}>
      {children}
    </authContext.Provider>
  );
}

//export chat-context component
export default AuthProvider;
