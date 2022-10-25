import React, { useEffect, useState } from 'react'
import Accordian from './Accordian/Accordian';
import { fileData } from '../data.js';
import { isUploadSuccess } from '../utils';

const UploadsContainer = () => {
  const [uploading, setUploading] = useState([]);
  const [next, setNext] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const [openAccordians, setOpenAccordians] = useState([]);
  const [files, setFiles] = useState(fileData);
  const [upload, setUpload] = useState({});

  const getNewFile = () => {
    const data = files;
    const fileToUpload = data.pop() || {};
    setFiles(files => data);
    setUpload(fileToUpload);
  };

  useEffect(() => {
    // if something is being uploaded, we will push the item to the next list else will upload it
    if (Object.keys(upload).length) {
      if (!uploading.length) {
        setUploading([upload])
        
        if (!openAccordians.includes("1")) {
          toggleContainer("1") // opening uploading accordian on initial upload
        }

        const uploadTimeout = setTimeout(() => {
          setUploading([]);
          // if some file got canceled and shifte to incomplete, dont put them in complete
          if (!incomplete.find(file => file.name === upload.name)) {
            if (isUploadSuccess()) {
              setCompleted(completed => [...completed, upload]);
            } else {
              setIncomplete(incompleted => [...incompleted, upload]);
            }
          }

          clearInterval(uploadTimeout);
        }, 5000)
      } else {
        setNext(next => [...next, upload])
      }
    }
  }, [upload]);

  useEffect(() => {
    if (!uploading.length && next.length) {
      setUploading([next[0]]);
      const uploadTimeout = setTimeout(() => {
        setUploading([]);
        // if some file got canceled and shifted to incomplete, dont put them in complete
        if (!incomplete.find(file => file.name === next[0].name)) {
          if (isUploadSuccess()) {
            setCompleted(completed => [...completed, next[0]]);
          } else {
            setIncomplete(incompleted => [...incompleted, next[0]]);
          }
        }

        clearInterval(uploadTimeout);
      }, 5000)
      const newList = next.slice(1);
      setNext(next => newList);
    }
  }, [uploading, next]);

  const handleCancelFileUpload = (fileToCancel, containerId) => {
    // removing file from the container it is in and moving it to incomplete
    if (containerId === "1") {
      setUploading([]); // as uploading only have 1 file
    } else {
      const newList = next.filter(file => file.id !== fileToCancel.id);
      setNext(next => newList);
    }
    // if some file is completed, dont put them in incomplete
    if (!completed.find(file => file.name === fileToCancel.name)) {
      setIncomplete(incompleted => [...incompleted, fileToCancel]);
    }
  };

  const toggleContainer = id => {
    if (openAccordians.includes(id)) {
      const newList = openAccordians.filter(accordian => accordian !== id);
      setOpenAccordians(openAccordians => newList)
    } else {
      setOpenAccordians(openAccordians => [...openAccordians, id])
    }
  };

  return (
    <div className="files-container">
      <div className="files-container-header">
        <div>
          Manage Files
        </div>
        <div onClick={getNewFile} className="plus-sign">
          +
        </div>
      </div>
      <Accordian containerId="1" isOpen={openAccordians.includes("1")} toggleContainer={toggleContainer} files={uploading} heading="Uploading" emptyDataText="No on going file uploads" handleCancelFileUpload={handleCancelFileUpload} />
      <Accordian containerId="2" isOpen={openAccordians.includes("2")} toggleContainer={toggleContainer} files={next} heading="Next Up" emptyDataText="No file uploads in pending" handleCancelFileUpload={handleCancelFileUpload} />
      <Accordian containerId="3" isOpen={openAccordians.includes("3")} toggleContainer={toggleContainer} files={completed} heading="Completed" emptyDataText="No file uploads completed" handleCancelFileUpload={handleCancelFileUpload} />
      <Accordian containerId="4" isOpen={openAccordians.includes("4")} toggleContainer={toggleContainer} files={incomplete} heading="Incomplete uploads" emptyDataText="No incomplete file uploads" handleCancelFileUpload={handleCancelFileUpload} />
    </div>
  )
}

export default UploadsContainer