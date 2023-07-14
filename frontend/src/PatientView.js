import React, { useState } from "react";
import axios from "axios";
import getCookie from "./helper";
import { Link } from "react-router-dom";

function PatientView(){
    const csrf_header = {headers : { 'X-CSRFToken': getCookie('csrftoken'), 'Content-Type': 'multipart/form-data'}};
    // here we will design a function that requests information from the backend
    // 

    const [patients, setPatients] = useState()
    const [hospital, setHospital] = useState("")

    const getPatients = () =>{
        if (hospital != ""){
            axios.get("http://localhost:8000/patients/"+hospital, csrf_header).then((response) => {
                console.log(response.data)
                setPatients(response.data)
            });
        }
    }

    
    return (
        <div className= "h-screen p-4 bg-indigo-100  flex flex-col items-center space-y-2">
            <div className="w-full flex flex-row justify-between">
                <div className='w-60'>
                    <p></p>
                </div>
                <h1 className='text-3xl font-extrabold'> View Uploaded Patients</h1>
                <Link to="/">
                    <button className="bg-indigo-600 text-white rounded-md p-2"> Click to Upload Patient Info</button>

                </Link>
            </div>

            <div className="flex flex-col items-center w-1/4 rounded-md p-4 border border-solid bg-white space-y-4">
                <label for="hospital">Choose a Hospital:  </label>
                <select className="border border-solid border-black" id="hospital" size="1" value={hospital} onChange={e => setHospital(e.target.value)}>
                    <option value=""> </option>
                    <option value="sacred_heart"> Sacred Heart Hospital</option>
                </select>
                <button className="bg-blue-600 w-full p-1 text-center text-white rounded-md" onClick={getPatients}> Get Patients</button>
            </div>

            
            { patients && 

                <table className="bg-white table-fixed">
                    {
                        Object.keys(patients[0]).map((col)=>
                            <th>
                                {col}
                            </th>
                        )
                    }
                    {

                        patients.map((patient) => (
                            <tr className=""> 
                                { 
                                    Object.values(patient).map((val) => (
                                        <td>{val}</td>
                                    )
                                    )
                                }
                            </tr>
                        ))
                    }
                </table>
            }


        
        </div>


    )

}

export default PatientView;
