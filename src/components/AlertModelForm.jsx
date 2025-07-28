import React from 'react'

function AlertModelForm({ setAlertModelOpen, isConfirmAlertModal, modelAlertMessage, confirmActionRef }) {
    return (
        <>
            <div className="modal-backdrop fade show"></div>
            <div
                className="modal show d-block"
                tabIndex="-1"
                role="dialog"
                aria-modal="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Alert</h5>
                            <button
                                type="button"
                                className="btn-close"
                                aria-label="Close"
                                onClick={() => setAlertModelOpen(false)}
                            />
                        </div>
                        <div className="modal-body">
                            <p>{modelAlertMessage}</p>
                        </div>
                        <div className="modal-footer">
                            {isConfirmAlertModal ? (
                                <>
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => setAlertModelOpen(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={() => {
                                            setAlertModelOpen(false);
                                            if (confirmActionRef.current) {
                                                confirmActionRef.current();
                                                confirmActionRef.current = null;
                                            }
                                        }}
                                    >
                                        Confirm
                                    </button>
                                </>
                            ) : (
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => setAlertModelOpen(false)}
                                >
                                    OK
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AlertModelForm;
