import React from 'react';
import ReactDOM from 'react-dom/client';
import Moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

class Thumbnail extends React.Component {
	render() {
		return (
			<div className="thumbnail" id={this.props.user.id} onClick={() => this.props.onClick()}>
				<img className="picture" alt="" src={this.props.user.picture} />
				<p className="username">{this.props.user.title} {this.props.user.firstName} {this.props.user.lastName}</p>
			</div>
		);
	}
}

class UserList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			users: null,
		};
	}
	
	componentDidMount() {
		const options = { headers: new Headers({"app-id": "627917432a94aad98a2d80bd" }) };
		fetch("https://dummyapi.io/data/v1/user?page=1&limit=20", options).then(response => {
			return response.json();
		}).then(json => {
			this.setState({ users: json });
		});
	}
	
	handleClick(id) {
		this.props.onSelect(id);
	}

	render() {
		if (this.state.users) {
			const users = this.state.users.data;
			return (
				<div className="col-lg-8 user-list">
					{users.map((user, id)=>{
						return <Thumbnail key={id} user={user} onClick={() => this.handleClick(user.id)} />
					})}
				</div>
			);
		}
	}
}

class UserProfile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: null,
		};
	}
	
	componentDidMount() {
		const id = this.props.id;
		const options = { headers: new Headers({"app-id": "627917432a94aad98a2d80bd" }) };
		fetch("https://dummyapi.io/data/v1/user/"+id, options).then(response => {
			return response.json();
		}).then(json => {
			this.setState({ user: json });
		});
	}
	
	render() {
		if (this.state.user) {
			const user = this.state.user;
			const formatDoB = Moment(user.dateOfBirth).format('LL');
			return (
				<div className="col-lg-4 user-profile">
					<img className="picture" alt="" src={user.picture} />
					<h3>{user.title} {user.firstName} {user.lastName}</h3>
					<p><strong>Gender : </strong>{user.gender}</p>
					<p><strong>Born : </strong>{formatDoB}</p>
					<h3>Location</h3>
					<p><strong>Address : </strong>{user.location.street}</p>
					<p><strong>City : </strong>{user.location.city}</p>
					<p><strong>State : </strong>{user.location.state}</p>
					<p><strong>Country : </strong>{user.location.country}</p>
					<h3>Contact</h3>
					<p><strong>Phone : </strong>{user.phone}</p>
					<p><strong>Email : </strong>{user.email}</p>
				</div>
			);
		}
	}
}

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			selected: "60d0fe4f5311236168a109de",
		};
	}

	handleSelect(id) {
		this.setState({ selected: id });
	}
	
	render() {
		return (
			<div className="container">
				<h1>Dummy User App</h1>
				<div className="row">
					<UserList onSelect={(id) => this.handleSelect(id)} />
					<UserProfile key={this.state.selected} id={this.state.selected} />
				</div>
			</div>
		);    
	}
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);