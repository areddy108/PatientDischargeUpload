import logo from './logo.svg';

import "./App.css";
import FileUpload from './FileUpload';
import { Routes, Route} from 'react-router-dom'
import PatientView from './PatientView';

 
function App() {
  return(
    <Routes>
        <Route path="/" element={<FileUpload/>}> </Route>
        <Route path="/patients" element={<PatientView/>}> </Route>
    </Routes>

   )
}
 
export default App;
