import React from "react";

function CarFocus(props) {


    return (
        <div>
            {/* Button trigger modal */}
            <button id="focusModalBtnLaunch" className="invisible" data-bs-toggle="modal" data-bs-target="#exampleModal">Launch Modal</button>

            {/* Scrollable modal */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">{props.car.make + ' ' + props.car.model}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <img src={props.car.image} className="img-fluid mx-auto d-block" alt=""/>

                        <table className="table table-striped border mt-2">
                            <tbody>
                                <tr>
                                    <td>Make</td>
                                    <td>{props.car.make}</td>
                                </tr>
                                <tr>
                                    <td>Model</td>
                                    <td>{props.car.model}</td>
                                </tr>
                                <tr>
                                    <td>Country of Origin</td>
                                    <td>{props.car.country}</td>
                                </tr>
                                <tr>
                                    <td>Body</td>
                                    <td>{props.car.body}</td>
                                </tr>
                                <tr>
                                    <td>Drive</td>
                                    <td>{props.car.drive}</td>
                                </tr>
                                <tr>
                                    <td>Transmission</td>
                                    <td>{props.car.transmission}</td>
                                </tr>
                                <tr>
                                    <td>Doors</td>
                                    <td>{props.car.doors}</td>
                                </tr>                                
                            </tbody>
                        </table>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CarFocus