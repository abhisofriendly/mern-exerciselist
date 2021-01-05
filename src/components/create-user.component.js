import React, { Component } from 'react';
import axios from 'axios';

class CreateUser extends Component{
    constructor(){
        super()
    
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: ''
        }
    }

    componentDidMount(){
        this.setState({
            username: this.state.username
        })
    }

    onChangeUsername(e){
        this.setState({
             username : e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault();
        const user = {
            username: this.state.username
        }
        console.log(user)

        axios.post('http://localhost:5200/users/add', user)
            .then((res)=> console.log(res))

        this.setState({
            username: ''
        })
    }

    render(){
        return(
            <div>
                <h3>Create new user</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username : </label>
                        <input type="text" 
                        className="form-control"
                        required
                        value={this.state.username}
                        onChange={this.onChangeUsername} />
                    </div>
                    <div className="form-group">
                        <input type="submit" 
                        className="btn btn-primary"
                        value="create user" />
                    </div>
                </form>
            </div>
        )
    }
}

export default CreateUser