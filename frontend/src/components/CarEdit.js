import React from "react";

function CarEdit(props) {


    return (
        <div>
            <div className="modal fade show" id="editModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-modal="true" role="dialog">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title"><span className="text-success">Edit info: </span>{props.car.make + ' ' + props.car.model}</h5>
                            <button type="button" className="btn-close" aria-label="Close" onClick={props.handleClickOnEditClose}></button>
                        </div>
                        <div className="modal-body">
                            <p id="edit-alert" className="text-info"></p>
                            <table className="table table-striped  table-hover border mt-2">
                                <tbody>
                                    <tr>
                                        <td className="p-0 border-0">
                                            <input readOnly id="edit-id" hidden value={props.car.id}/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Country:</td>
                                        <td>
                                            <textarea id="edit-country" className="editable" defaultValue={props.car.country}></textarea>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Body:</td>
                                        <td>
                                            <textarea id="edit-body" className="editable" defaultValue={props.car.body}></textarea>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Drive:</td>
                                        <td>
                                            <textarea id="edit-drive" className="editable" defaultValue={props.car.drive}></textarea>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Transmission:</td>
                                        <td>
                                            <textarea id="edit-transmission" className="editable" defaultValue={props.car.transmission}></textarea>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Doors:</td>
                                        <td>
                                            <input type="number" id="edit-doors" className="editable" defaultValue={props.car.doors}></input>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>image URL:</td>
                                        <td>
                                            <textarea id="edit-image" className="editable text-break" defaultValue={props.car.image}></textarea>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-success w-100" data-bs-dismiss="modal" onClick={props.handleClickOnUpdate}>save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div id="modal-bg" className="modal-backdrop fade show"></div>
        </div>
    )
}

export default CarEdit