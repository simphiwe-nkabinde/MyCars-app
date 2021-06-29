import React from 'react'


function CarCard(props) {

    return (
        <div className="col btn">
            <div className="card shadow-sm btn-outline-danger text-dark h-100">
                <div className="d-flex justify-content-between">
                    <div className="btn btn-outline-secondary border-0 fs-4"  id={props.car.id} onClick={props.handleClickOnEdit}>
                        <i className="bi bi-pencil-square"></i>  
                    </div>
                    <div className="btn btn-outline-secondary border-0 fs-4" id={props.car.id} onClick={props.handleClickOnDelete}>
                        <i className="bi bi-trash-fill"></i>    
                    </div>
                </div>                
                <img src={props.car.image} className="card-img-top" alt="car" id={props.car.id} onClick={props.handleClickOnFocus}/>
                <div className="card-body text-center p-1 bg-light" id={props.car.id} onClick={props.handleClickOnFocus}>
                    <h4 className="display-6">{props.car.model}</h4>
                    <p className="lead">{props.car.make}</p>
                </div>
            </div>            
        </div>
    )
}



export default CarCard