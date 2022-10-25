import React from 'react'
import './Accordian.css'
import accordianToggleIcon from '../../assets/accordianToggleIcon.svg'
import FileUploads from '../FileUploads';

const Accordian = ({ containerId, toggleContainer, isOpen, files, heading, emptyDataText, handleCancelFileUpload }) => {
  return (
    <div className="accordian-container">
      <div onClick={() => toggleContainer(containerId)} className="accordian-header">
        <p>{heading}</p>
        <img className={`accordian-toggle-icon ${isOpen && 'rotateUp'}`} src={accordianToggleIcon} alt="toggle-icon" />
      </div>
      <hr />
      {
        isOpen && (
          <div>
            { !files.length && (
              <p>
                {emptyDataText}
              </p>
            )}
            { files.map(file => (
              <FileUploads file={file} containerId={containerId} handleCancelFileUpload={handleCancelFileUpload} />
            ))}
          </div>
        )
      }
    </div>
  )
}

export default Accordian