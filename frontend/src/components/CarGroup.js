import React from 'react'
import ReactDOM from 'react-dom';
import { unmountComponentAtNode } from 'react-dom';
import CarCard from './CarCard'
import CarFocus from './CarFocus'
import CarEdit from './CarEdit';


class CarGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: sessionStorage.user,
            cars: [],
            focusCar: {}
        };
        this.handleClickOnDelete = this.handleClickOnDelete.bind(this)
        this.handleClickOnFocus = this.handleClickOnFocus.bind(this)
        this.handleClickOnEdit = this.handleClickOnEdit.bind(this)
        this.handleClickOnEditClose = this.handleClickOnEditClose.bind(this)
        this.handleClickOnUpdate = this.handleClickOnUpdate.bind(this)
        this.getUserCarsThenSetInState = this.getUserCarsThenSetInState.bind(this)
    }
    //when page loads, 
    componentDidMount() {
        this.getUserCarsThenSetInState()
    }
    //deletes car from collection. uses api
    handleClickOnDelete(e) {
        e.preventDefault();
        const id = e.currentTarget.id
        //DELETE REQUEST to custom local api
        fetch('/car/'+ sessionStorage.user + '?id=' + id, {
            method: 'DELETE'
        })
        .then(resp => resp.text())
        .then(data => {
            if (data) {
                const alertElement = document.getElementById('alertMessage')
                alertElement.firstChild.innerText = data;
                alertElement.classList.add('show')                
            }
        })
        this.getUserCarsThenSetInState()
    }

    /*takes car id of car that has been clicked on from CarCard component.
    *finds car of that id in 'state.cars' array. 
    *sets found car obj as 'state.focusCar'
    *simulates click to display bootstrap modal of CarFocus component.
    */
    handleClickOnFocus(e) {
        e.preventDefault();
        const id = e.currentTarget.id
        const carsArr = this.state.cars
        const car = carsArr.find((element) => {
            if (element['id'] === id) return element;
        });
        this.setState({focusCar : car})
        document.getElementById('focusModalBtnLaunch').click()
    }
    //renders CarEdit component modal with car info for editing
    handleClickOnEdit(e) {
        e.preventDefault()
        const id = e.currentTarget.id
        const carsArr = this.state.cars
        const car = carsArr.find((element) => {
            if (element['id'] === id) return element;
        });     
        //create and render modal component to DOM
        let editModal = <CarEdit 
                            car={car} 
                            handleClickOnEditClose={this.handleClickOnEditClose}
                            handleClickOnUpdate={this.handleClickOnUpdate}
                        />
        ReactDOM.render(editModal, document.getElementById('editModal-container'));
    }
    //removes CarEdit component modal from DOM
    handleClickOnEditClose() {
        unmountComponentAtNode(document.getElementById('editModal-container'))
    }

    handleClickOnUpdate() {
        //object with updated values to be sent in API post request
        const updateInfo = {
            id: document.getElementById('edit-id').value,
            country: document.getElementById('edit-country').value,
            body: document.getElementById('edit-body').value,
            drive: document.getElementById('edit-drive').value,
            transmission: document.getElementById('edit-transmission').value,
            doors: document.getElementById('edit-doors').value,
            image: document.getElementById('edit-image').value,
        }
        //POST REQUEST to cusotm local api
        fetch("/car/"+ sessionStorage.user, {
            method: "PUT",
            body: JSON.stringify(updateInfo),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(resp => resp.text())
        .then(data => {
            const alertElement = document.getElementById('alertMessage')
            alertElement.firstChild.innerText = data + '. Reload page to see changes';
            alertElement.classList.add('show')
            document.getElementById('edit-alert').innerText = 'changes saved'
        })
    }

    //this.state.user is set from sessionStorage.user data. user's car array is fetched from the API and set to state
    getUserCarsThenSetInState() {
        if (sessionStorage.user) {
            //GET REQUEST to custom local api
            fetch('/'+sessionStorage.user)
            .then(resp => resp.json())
            .then(data => {
                this.setState({ cars: data})
            })
        } else {
            this.setState({cars: []})
        }
    }


    render() {

        let carsDisplay = '';
        let carsArr = this.state.cars
        if (!sessionStorage.user) {
            carsDisplay = <div className="lead text-center w-100 text-muted mt-5">
                            Login with a username to see your car collection.
                          </div>
        } else if (!carsArr[0]) {
            carsDisplay = <div className="lead text-center w-100 text-muted mt-5">
                            You have no cars in your collection. Add a new car to your collection.
                          </div>
        } else {
            //map through cars Array and pass as props to CarCard component
            carsDisplay = carsArr.map(carObj => 
                <CarCard key={carObj.id}
                    car={carObj} 
                    handleClickOnDelete={this.handleClickOnDelete} 
                    handleClickOnFocus={this.handleClickOnFocus}
                    handleClickOnEdit={this.handleClickOnEdit}
                />
                );   
            }

        return (
            
            <div className="carGroup-component">
                <span id="editModal-container"></span>

                {/* show <p> only if sessionStorage.user is true*/}
                {(sessionStorage.user) ?
                <p className="lead text-center my-4">
                    Click on any car to edit, delete or see more information about the car. Add a new car to your collection 
                    by clicking the <em className="text-warning">New Car</em> button.
                </p>
                : <span></span>}
                
                {/* show 'add new car' button only if sessionStorage.user is true*/}
                {(sessionStorage.user) ?
                <a href="/create" className="new-car btn btn-warning">
                    <i className="bi bi-plus-lg">&nbsp; New Car</i>
                </a>
                : <span></span>}

                <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4">
                    {carsDisplay}
                </div>
               
                <CarFocus car={this.state.focusCar}/>
            </div>
        )
    }
}

export default CarGroup