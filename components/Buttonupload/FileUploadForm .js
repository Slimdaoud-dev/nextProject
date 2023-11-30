/* eslint-disable @next/next/no-img-element */
import { addFile } from "@/app/api/utils/uploadFile";

import { useState } from "react";
import Alert from "../alert/alert";
// Adjust the path as needed
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
const FileUploadForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setShowAlert(true)
    if (selectedFile) {
      const fileName = selectedFile.name;
      const response = await addFile(fileName);

      if (response) {
        console.log("File uploaded successfully:", response);
        // You can perform additional actions here after successful upload
      } else {
        console.error("File upload failed.");
        // Handle the error case if needed
      }
    } else {
      console.error("No file selected.");
      // Handle the case when no file is selected
    }
  };

  return (
    
      <div >
        <div style={{marginBottom:10}}>{showAlert && <Alert />}</div>
      <form
        onSubmit={handleFormSubmit}
        className="flex items-center w-full "
      >
       
        <input type="file" className="file-input  max-w-xs" onChange={handleFileChange}/>
        <button type="submit" style={{marginLeft:4}} >
          <DownloadForOfflineIcon/>
        </button>
      </form>
      </div>
   
  );
};

export default FileUploadForm;
