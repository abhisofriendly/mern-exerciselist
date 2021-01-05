import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

class EditExercise extends Component {
    constructor(props) {
        super(props)

        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            users: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5200/exercises/'+this.props.match.params.id)
            .then((res)=>{
                console.log(res)
                this.setState({
                    username: res.data.username,
                    description: res.data.description,
                    duration: res.data.duration,
                    date: new Date(res.data.date)
                })
            })
    
        axios.get('http://localhost:5200/users/')
            .then(res=>{
                if(res.data.length > 0){
                    this.setState({
                        users: res.data.map(user=> user.username)
                    })
                }
            })
    }

    onChangeUserName(e) {
        this.setState({
            username: e.target.value
        })
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        })
    }

    onChangeDuration(e) {
        this.setState({
            duration: e.target.value
        })
    }

    onChangeDate(date) {
        this.setState({
            date: date
        })
    }

    onSubmit(e) {
        e.preventDefault();
        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }
        console.log(exercise)
        axios.post('http://localhost:5200/exercises/update/'+this.props.match.params.id, exercise)
            .then((res)=> console.log(res))
        window.location = '/'
    }

    render() {
        return (
            <div>
                <h3>Edit excercise logs</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>username</label>
                        <select ref="userInput"
                        required
                        className="form-control"
                        value={this.state.username}
                        onChange={this.onChangeUserName}>
                            {
                                this.state.users.map((user)=>(
                                    <option 
                                    key={user}
                                    value={user}>{user}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>description</label>
                        <input type="text"
                        className="form-control" 
                        required 
                        value={this.state.description}
                        onChange={this.onChangeDescription} />
                    </div>
                    <div className="form-group">
                        <label>Duration (in minutes)</label>
                        <input type="text" 
                        className="form-control"
                        value={this.state.duration}
                        onChange={this.onChangeDuration} />
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <DatePicker
                        selected={this.state.date}
                        onChange={this.onChangeDate} ></DatePicker>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="edit exercise log" className="btn btn-primary"  />
                    </div>
                </form>
            </div>
        )
    }
}

export default EditExercise