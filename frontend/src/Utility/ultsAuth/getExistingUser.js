//imp axios to do all fetch op
import axios from "axios";

//GET USERS, IF USER ALLREADY BEEN LOGED IN
const getExistingUser = async (setUser, dispatch) => {
  try {
    //fetch data by axios
    const { data } = await axios.get("/auth/");

    /*----after getting data successfully, store UserData -> local User and auth -> true----*/
    if (data.success) {
      //set the user data
      setUser((_olduser) => {
        const newuser = {
          ...data.user,
        };
        return newuser;
      });
      //set Auth -> true
      dispatch({
        type: "USERIN",
      });
    } else {
      /*Error handeling*/
    }
  } catch (err) {
    console.log(err.message);
  }
};

export default getExistingUser;
