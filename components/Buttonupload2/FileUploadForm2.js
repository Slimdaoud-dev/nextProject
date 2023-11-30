import { addFiletot } from "../../src/app/api/utils/uploadFiletot";
import { useState } from "react";
import Alert from "../alert/alert";
// Adjust the path as needed
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
const FileUploadForm2 = (path) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [updateTrigger, setUpdateTrigger] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setShowAlert(true);

    if (selectedFile) {
      const fileName = selectedFile.name;
      const response = await addFiletot(path, fileName);

      if (response) {
        setUpdateTrigger((prevTrigger) => !prevTrigger);

        // You can perform additional actions here after successful upload
      } else {
        console.error("File upload failed.");
        setUpdateTrigger((prevTrigger) => !prevTrigger);
      }
    } else {
      console.error("No file selected.");
      // Handle the case when no file is selected
    }
  };

  return (
    <>
    
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
    </>
  );
};

export default FileUploadForm2;
