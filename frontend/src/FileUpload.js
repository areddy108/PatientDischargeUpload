import axios from 'axios';

import React, { Component } from 'react';
import { useState } from 'react';
import getCookie from './helper';
import { Link } from 'react-router-dom';

const csrf_header = {headers : { 'X-CSRFToken': getCookie('csrftoken'), 'Content-Type': 'multipart/form-data'}};

function FileUpload(){
    const [selectedFile, setSelectedFile] = useState();
    const [uploadStatus, setUploadStatus] = useState(false);
    const [recentUpload, setRecentUpload] = useState()
    const [columnNames, setColumnNames] = useState();

	// On file select (from the pop up)
	const onFileChange = (event) => {
        if (event.target.files){
            setSelectedFile(event.target.files[0]);
        }
	};

	// On file upload (click the upload button)
	const onFileUpload = () => {
		// Create an object of formData
        if (selectedFile){
            const formData = new FormData();
            formData.append(
                "file",
                selectedFile,
                selectedFile.name
            );

            // Request made to the backend api
            // Send formData object
            axios.post("http://localhost:8000/patients/", formData, csrf_header).then(
                (response) => {
                    setUploadStatus(true)
                    setRecentUpload(response.data[0])
                    setColumnNames(Object.keys(response.data[0][0]))
                }
            )
            // get response and pass to to recentUpload
            // if successfull upload update upload status
        } 

	};

	// File content to be displayed after
	// file upload is complete
	const fileData = () => {
		if (selectedFile) {
			return (
				<div className='text-sm'>
					<p>File Type: {selectedFile.type}</p>
					<p>
						Last Modified:{" "}
						{selectedFile.lastModifiedDate.toDateString()}
					</p>

				</div>
			);
		} 
	};


    return (

        <div className= "h-screen p-4 bg-indigo-100  flex flex-col items-center space-y-2">
            <div className="w-full flex flex-row justify-between">
                <div className='w-60'>
                    <p></p>
                </div>
                <h1 className='text-3xl font-extrabold'> Patient Discharge Upload Service</h1>
                <Link to="/patients">
                    <button className="bg-indigo-600 text-white rounded-md p-2"> Click here to view ALL Patient data</button>
                </Link>
            </div>
                <div className='flex-col rounded-md p-4 border border-solid bg-white space-y-8'>
                    <div className='mt-2'>
                        <label for="client"> Hospital: </label>
                        <select className="border border-solid border-black" id="client" size="1">
                            <option> </option>
                            <option> Sacred Heart Hospital</option>
                        </select>
                    </div>
                    <div className='mt-2 border border-dashed rounded-lg p-2'>
                        <input className=""type="file" onChange={onFileChange} />
                        {fileData()}
                    </div>


                    <div> 
                        { !selectedFile && 
                            <p className='text-red-400'> Please Select a File. </p>
                        }
                        <button className="bg-blue-600 w-full p-1 text-center text-white rounded-md"onClick={onFileUpload}> Upload </button>
                    </div>

                    { uploadStatus && 
                        <div>
                            <div className='text-green-600'> 
                                Patient Discharge Information Successfully Uploaded.
                            </div>

                            <div>
                                <p className='mt-2 font-bold'>
                                    Patients that have been uploaded on most recent file:

                                </p>
                                {
                                    recentUpload.map((patient)=> 
                                        <p> {patient["name"]}</p>
                                    )
                                }
                            </div>
                        </div>
                    }       
                        
                </div>
        </div>
    );
	
}

export default FileUpload;
