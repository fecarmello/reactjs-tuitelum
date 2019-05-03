import React from 'react'
import './Modal.css'
import classNames from 'classnames'
import Widget from '../Widget';
import PropTypes from 'prop-types';

export const Modal = ({ children, isOpen, onClose }) => {

    function handleBlackAreaClick(infosDoEvento) {
        console.log("Alguém clicou no modal!")
        const isModalTag = infosDoEvento.target.classList.contains('modal')
        if (isModalTag) onClose && onClose()
    }

    return (
        <div onClick={handleBlackAreaClick} className={
            classNames(
                "modal",
                {
                    "modal--active": isOpen
                }
            )
        }>
            <div className="modal__container">
                <Widget>
                    { isOpen && children() }
                </Widget>
            </div>
        </div>
    )
}

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.func.isRequired,
}
