import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginPage } from './components/LoginPage';
import { Home } from './Pages/Home';
import { DataProvider } from './context/DataProvider';
import { AnalyseResponse } from './Pages/AnalyseResponse';
import { Analyser } from './Pages/Analyser';
import { PrivateRoute } from './components/PrivateRoute';
import { About } from './Pages/About';
import { Contact } from './Pages/Contact';
import { Feedbacks } from './Pages/Feedbacks';
import { MissingPage } from './Pages/MissingPage';
import { Question } from './Pages/Question';
import { Response } from './Pages/Response';
import './utils/AxiosConfig';
import { Profile } from './Pages/Profile';
import { EditProfile } from './Pages/EditProfile';
function App() {
  return (
    <div className='App'>
      <Router>
        <DataProvider>
            <Routes>
              {/* Default route to login page */}
              <Route path="/login" element={<LoginPage />} />

              {/* After login success */}
              <Route path="/" element={<PrivateRoute><Home/></PrivateRoute>}/>
              <Route path="/home" element={<PrivateRoute><Home/></PrivateRoute>} />
              <Route path="/profile" element={<PrivateRoute><Profile/></PrivateRoute>} />
              <Route path="/edit/profile" element={<PrivateRoute><EditProfile/></PrivateRoute>}/>
              <Route path="/about" element={<PrivateRoute><About/></PrivateRoute>} />
              <Route path="/contact" element={<PrivateRoute><Contact/></PrivateRoute>} />
              <Route path="/analyser" element={<PrivateRoute><Analyser/></PrivateRoute>}></Route>
              <Route path="/analyserResponse" element={<PrivateRoute><AnalyseResponse/></PrivateRoute>}></Route>
              <Route path="/feedbacks" element={<PrivateRoute><Feedbacks/></PrivateRoute>} />
              <Route path="/question" element={<PrivateRoute><Question/></PrivateRoute>} />
              <Route path="/response" element={<PrivateRoute><Response/></PrivateRoute>} />
              <Route path="*" element={<MissingPage />} />
            </Routes>
        </DataProvider>
      </Router>
    </div>
    
  );
}

export default App;
