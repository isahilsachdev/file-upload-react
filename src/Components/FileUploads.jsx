import React from 'react'
import success from '../assets/success.svg'
import failed from '../assets/failed.svg'

const textMapping = {
  "1": "Encrypting...",
  "2": "Waiting...", 
  "3": "Success",
  "4": "Failed", 
}

const FileUploads = ({file, containerId, handleCancelFileUpload}) => {
  return (
    <div key={file.id} className="file-upload-container">
      <div>
        <p>
          {file.name}
        </p>
        <p>
          {file.size}
        </p>
      </div>
      <div className="loader-container">
        {
          containerId === "3" ? (
            <img src={success} alt="success" />
          ) : containerId === "4" ? (
            <img src={failed} alt="failed" />
          ) : <div className={`${containerId === "1" ? "loader" : containerId === "2" ? "waiting-loader" : ""}`} />
        }
        <p>{textMapping[containerId]}</p>
      </div>
      { containerId === "2" && (
        <div className="cross" onClick={() => handleCancelFileUpload(file, containerId)}>
          x
        </div>
      ) }
    </div>
  ) 
}

export default FileUploads