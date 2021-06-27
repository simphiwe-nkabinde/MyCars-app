import React from "react";

function About() {
    return (
        <div>
            <h1 className="text-center">About</h1>

            <p className="lead">
                My Cars App is a simple front and backend app built with <span className="text-info">Express</span> and <span className="text-info">React</span> JavaScript.
            </p>

            <p>
                The backend uses a <strong>custom Restful API</strong> to serve users their car collection data. The 
                data is stored in json files on the server. The API allows a user to <strong>Create, Read, Update, and Delete </strong>
                data from their car collection file stored on the server. Each user's car collection is stored in a seperate 
                json file as an array of car objects. When a user logs in with their username they have access to their car collection.
            </p>

            <p>The frontend uses 2 <span className="text-info">Open API's</span></p>
            <ul>
                <li>
                    <a href="https://www.carimagery.com/">Car Imagery API</a>:  allows access to car stock images based on the make and model. returns an image url embedded in <code>XML</code>.
                </li>
                <li>
                    <a href="https://www.carqueryapi.com/">Car Query API</a>:  JSON based API for retrieving detailed car information including year, make, model, trim, and specifications.
                </li>
            </ul>

            <p>
                The data received from these 2 APIs per request is stored in the user's car collection.
            </p>

            <div>
                <a href="https://github.com/simphiwe-nkabinde/MyCars-app" className="text-decoration-none">Github repo</a><br/>
                <a href="https://github.com/simphiwe-nkabinde" className="text-decoration-none">My Github Profile: Simphiwe Nkabinde</a>
            </div>

            <div className="text-muted mt-5 text-center">
                June 2021
            </div>

        </div>
    )
}

export default About