import React from "react";

//handles login functionality of web app

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: sessionStorage.user
        }
        this.handleLogin = this.handleLogin.bind(this)
        this.handleLoginNewUser = this.handleLoginNewUser.bind(this)
    }

    
    //checks if user exists in server using API. if user exists, the page reloads, in order to load CarGroup component with the user car data
    //sets existing user in sessionStorage when 'login' button is clicked.
    handleLogin() {
        const username = document.getElementById('login-username').value
        if (!username) {
            document.getElementById('login-error').innerText = 'Enter Username';
            return
        }
        fetch('/login/'+username)
        .then(resp => resp.text())
        .then(data => {
            if(data === 'false') {
                document.getElementById('login-error').innerText = 'user does not exist.'
            } else {
                sessionStorage.user = username
                window.location.replace('/') //reload page                
            }
        }, (error) => {console.log(error)} )
    }
    //creates new user in server using API. reloads page
    //sets user in sessionStorage when 'new user' login button is clicked.
    handleLoginNewUser() {
        const username = document.getElementById('login-username').value
        if (!username) {
            document.getElementById('login-error').innerText = 'Enter Username';
            return
        }
        fetch('/login/'+username, {
            method: 'POST'
        })
        .then(resp => resp.text())
        .then(data => {
            if(data === 'false') {
                document.getElementById('login-error').innerText = 'user already exists. Try a different username'
            } else {
                sessionStorage.user = username     
                window.location.replace('/') //reload page                  
            }
        }, (error) => {console.log(error)} )
    }

    render() {

        let user;
        if (!this.state.user) {
            user = 'Login'
        } else {
            user = this.state.user
        }

        return (
            <div>
                {/*Login button triggers login modal */}
                <div className="my-2 text-end d-flex justify-content-end container">
                    <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#userLoginModal">
                        <i className="bi bi-person-fill"> {user}&nbsp;&nbsp;</i>
                        {(sessionStorage.user) ? <i className="bi bi-box-arrow-left"></i> : <span></span>}
                    </button>                    
                </div>


                {/* Modal */}
                <div className="modal fade" id="userLoginModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="userLoginModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered ">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="userLoginModalLabel">Login to see your cars</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="text-center">    
                            <label htmlFor="username" className="form-label">Username</label>
                            <input type="text" id="login-username" className="form-control" required/>
                        </div>
                        <div className="text-danger" id="login-error"></div>
                    </div>
                    <div className="modal-footer border-0 row">
                        <button type="button" className="btn btn-success col"  onClick={this.handleLogin}>login</button>
                        <button type="button" className="btn btn-primary col"  onClick={this.handleLoginNewUser}>New user</button>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}


export default Login