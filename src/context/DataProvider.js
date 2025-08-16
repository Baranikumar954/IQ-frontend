import { createContext,useState } from "react";

const DataContext = createContext({});


export const DataProvider = ({ children }) => {
  const [profile, setProfile] = useState({
    _id: "",
    fullName: " - ",
    sureName: " - ",
    mobileNumber: " - ",
    email: " - ",
    gender: " - ",
    education: " - ",
    collegeName: " - ",
    aim: " - ",
    strike: 1,
    dob: " - ",
    createdAt: " - "
  });
  const [user, setUser] = useState({userName:'',mail:''});
  const [resumeText, setResumeText] = useState(null);
  const [analyseResponseData, setAnalyseResponseData] = useState(null);
  
  const [cmpny, setCmpny] = useState("");
  const [roleName, setRoleName] = useState("");
  const [qnType, setQnType] = useState(""); // ✅ You MUST define this
  const [experience, setExperience] = useState("");
  const [responseData, setResponseData] = useState([]);
  return (
    <DataContext.Provider
      value={{
        profile,
        setProfile,
        user,
        setUser,
        resumeText,
        setResumeText,
        analyseResponseData,
        setAnalyseResponseData,
        cmpny,
        setCmpny,
        roleName,
        setRoleName,
        qnType,
        setQnType,
        experience,
        setExperience,
        responseData,
        setResponseData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;

