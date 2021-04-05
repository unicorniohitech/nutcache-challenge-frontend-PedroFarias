import React, { useState, useEffect } from 'react'
import ReactDom from 'react-dom'


import './styles.css'


const Spinner = ({isShowingSpinner}) => { 
  return (
    isShowingSpinner ? ReactDom.createPortal(
      <div className="modal-spinner-wrapper">

      <div className="modal-spinner-overlay">
            <div className="spinner"></div>
      </div>
      </div>, document.body
    ) : null
  )
}

export const useSpinner = () => {
  const [isShowingSpinner, setIsShowingSpinner] = useState(false);

  function toggleSpinner(isShowing) {
    setIsShowingSpinner(isShowing);
  }

  return {
    isShowingSpinner,
    toggleSpinner,
  }
}

export default Spinner;