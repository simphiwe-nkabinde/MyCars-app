import React from "react";

function About() {
    return (
        <div>
            <h1 className="text-center">About</h1>

            <p className="lead">This app is part of a school task submission in line with given criteria. The following is a summary of the Task instructions and criteria:</p>
            <ul className="rounded task-list py-3">
                <li>
                    Create a Restful API using Express that will allow the user to store a list of cars.
                </li>
                <li>
                    The user should be able to make HTTP Get, Post, Delete and Put requests to show, add, delete or Update data respectively.
                </li>
                <li>
                    Create an attractive React front-end that can be used to interact with the cars 
                    API you built with Express.
                    <ul>
                        <li>
                            You should be able to use your React front-end to get a list of cars,
                            add additional cars to the list, modify the details about a specific car
                            and delete a car from the list.
                        </li>
                        <li>
                            For a bonus challenge, make one of the car properties a URL to an
                            image and display this image wherever you list a car item on your
                            frontend.
                        </li>
                    </ul>
                </li>
                <li>
                    Deploy this app to Heroku.
                </li>
            </ul>

            <p>The frontend uses 2 Open API's:</p>
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