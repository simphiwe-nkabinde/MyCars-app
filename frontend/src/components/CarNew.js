import React from 'react'

class CarNew extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            make: '',
            error: null,
            allModels: ['-- Select a car Make --'],
            image: "",
            carInfo: {},
            carIsLoaded: false
        }
        this.fetchAllModels = this.fetchAllModels.bind(this);
        this.handleChangeOnCarModel = this.handleChangeOnCarModel.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //fetches all available models for the 'make' input value. uses Carquery API (https://www.carqueryapi.com/)
    fetchAllModels(e) {
        e.preventDefault()
        const newMake = e.target.value
        if (!newMake) {
            this.setState({allModels : ['-- Select a car Make --']});
            return
        }
        this.setState({allModels : ['Loading Models...']})
        this.setState({
            make: newMake,
        })

        //uses CORS proxy url prefix to avoid "NO Access-Control-Allow-Origin header" error from browser. (see link for details: https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe)    
        const corsUrl = 'https://vast-lake-47850.herokuapp.com/';
        //GET REQUEST to 3rd party api
        fetch(corsUrl + 'https://www.carqueryapi.com/api/0.3/?cmd=getModels&make='+ newMake)
        .then(resp => resp.json())
        .then(data => {
            this.setState({ allModels: this.extractModelNamestoArray(data['Models'])});
            if (!data['Models'][0]) {
                this.setState({allModels : ['Models Not found for '+ this.state.make]});
            }       
        },
        (error) => {
            this.setState({error});
            this.setState({allModels : ['error: could not get models']});
        });
    }

    //fetches car image and info by selected make and model
    handleChangeOnCarModel(e) {
        e.preventDefault();
        const newModel = e.target.value
        const make = this.state.make
        
        this.fetchImage(make, newModel)
        this.fecthModelInfo(make, newModel)
        
    }

    //POST request of new car using fetch API
    handleSubmit(e) {
        e.preventDefault()
        //get new car data from DOM elements
        const newCar = {
            make: document.getElementById('car-new-make').innerHTML,
            model: document.getElementById('car-new-model').innerHTML,
            country: document.getElementById('car-new-country').innerHTML,
            body: document.getElementById('car-new-body').innerHTML,
            drive: document.getElementById('car-new-drive').innerHTML,
            Transmission: document.getElementById('car-new-transmission').innerHTML,
            doors: document.getElementById('car-new-doors').innerHTML,
            image: document.getElementById('car-new-image').innerHTML
        }
        //POST REQUEST to custom local api
        fetch("/car/"+ sessionStorage.user, {
            method: "POST",
            body: JSON.stringify(newCar),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(resp => resp.text())
        .then(data => {
            const alertElement = document.getElementById('alertMessage')
            alertElement.firstChild.innerText = data;
            alertElement.classList.add('show')
            this.setState({
                image: '',
                carInfo: {},
                carIsLoaded: false
            });
            document.getElementById('car-new-display-image').attributes.src.value = "";

        },(error) => {console.log(error)});
    }


    //extracts all model names from array of objects and returns a single array of all extracted model names
    extractModelNamestoArray(objArray) {
        let modelsArray = []
        objArray.forEach(obj => {
          const model = obj["model_name"];
          modelsArray.push(model)
        });
        return modelsArray;
    }

    //fetches image url of car by make and model and sets it in state. uses carimagery API (https://www.carimagery.com/)    
    fetchImage(make, newModel) {
        //GET REQUEST to 3rd party api
        fetch('https://www.carimagery.com/api.asmx/GetImageUrl?searchTerm=' + make + '+' + newModel)
        .then(resp =>  resp.text())
        .then(data => {
            const parser = new DOMParser();
            const xml = parser.parseFromString(data, "application/xhtml+xml");
            const imageUrl = xml.documentElement.textContent;
            document.getElementById('car-new-image').innerHTML = imageUrl
            document.getElementById('car-new-display-image').attributes.src.value = imageUrl
        },
        (error) => {this.setState({error})})
    }

    //fetches car model info nad sets in in state object this.state.carInfo : {}
    fecthModelInfo(make, model) {
        //uses CORS proxy url prefix to avoid "NO Access-Control-Allow-Origin header" error from browser. (see link for details: https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe)    
        const corsUrl = 'https://vast-lake-47850.herokuapp.com/';
        //GET REQUEST to 3rd party API
        fetch(corsUrl + 'https://www.carqueryapi.com/api/0.3/?cmd=getTrims&make='+ make +'&model='+ model)
        .then(resp => resp.json())
        .then(data => {
            const modelData = data['Trims'][0];
            document.getElementById('car-new-make').innerHTML = modelData['model_make_id']
            document.getElementById('car-new-model').innerHTML = modelData['model_name']
            document.getElementById('car-new-country').innerHTML = modelData['make_country']
            document.getElementById('car-new-body').innerHTML = modelData['model_body']
            document.getElementById('car-new-drive').innerHTML = modelData['model_drive']
            document.getElementById('car-new-transmission').innerHTML = modelData['model_transmission_type']
            document.getElementById('car-new-doors').innerHTML = modelData['model_doors']

            this.setState({carIsLoaded: true})
        },
        (error) => {this.setState({error})})
    }

    render() {
        const {allModels} = this.state;
        //creates <option> list of car models by make to add to <select> element of the form
        const modelList = allModels.map(item => 
            <option key={item} value={item}>{item}</option>
        );
    
        return(
            <div>
                <p className="lead text-center my-4">
                    Add a new car to your collection by filling in the <strong>make</strong> and selecting a <strong>model</strong>.
                    Detailed fields will populate automatically. Press save to add the data to your collection
                </p>     

                <form className="border border- rounded p-4 bg-light row" onSubmit={this.handleSubmit}>
                    <div className="col-md-6 mb-3">    
                        <label className="form-label">Make</label>
                        <input type="text" id="makeInput" className="form-control" required placeholder="eg. Hyundai" onBlur={this.fetchAllModels}></input>
                    </div>
                    <div className="col-md-6 mb-3">    
                        <label className="form-label">
                            <span>Model</span>
                            {this.state.make && !this.state.allModels[1] ?
                                <div class="ms-3 spinner-border spinner-grow-sm text-primary" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                            : <span></span>}
                        </label>
                        <select type="text" required className="form-select" onChange={this.handleChangeOnCarModel}>
                            {modelList}
                        </select>
                    </div>

                    <img id="car-new-display-image"
                        src=""
                        className="img-thumbnail mx-auto my-2" 
                        alt=""
                        style={{maxWidth:'60%'}}
                    />
                    
                    {/* hide table if car data is not loaded */}
                    <div className={this.state.carIsLoaded ? "table-responsive" : "d-none"}>
                        <table className="table table-striped table-bordered ms-auto me-auto">
                            <tbody className="text-center">
                                <tr className="mb-3 col-md-6"> 
                                    <td>Make</td>
                                    <td id="car-new-make"></td>
                                </tr>
                                <tr className="mb-3 col-md-6"> 
                                    <td>Model</td>
                                    <td id="car-new-model"></td>
                                </tr>
                                <tr className="mb-3 col-md-6"> 
                                    <td>Country of Origin</td>
                                    <td id="car-new-country"></td>
                                </tr>
                                <tr className="mb-3 col-md-6"> 
                                    <td>Body</td>
                                    <td id="car-new-body"></td>
                                </tr>
                                <tr className="mb-3 col-md-6"> 
                                    <td>Drive</td>
                                    <td id="car-new-drive"></td>
                                </tr>
                                <tr className="mb-3 col-md-6"> 
                                    <td>Transmission</td>
                                    <td id="car-new-transmission"></td>
                                </tr>  
                                <tr className="mb-3 col-md-6"> 
                                    <td>Doors</td>
                                    <td id="car-new-doors"></td>
                                </tr>
                                <tr className="mb-3 col-md-6"> 
                                    <td>Image Url</td>
                                    <td id="car-new-image" className="text-break"></td>
                                </tr>                            
                            </tbody>
                        </table>
                    </div>

                    <button type="submit" className="btn btn-success">Save</button>
                </form>           
            </div>

        )
    }
}

export default CarNew