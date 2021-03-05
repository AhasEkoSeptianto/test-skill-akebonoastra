import React from "react";

// nav dashboard
import Nav_dashboard from "./../components/nav_dashboard";

// mycss
import styles from "./../../assets/css/layout/dashboard.module.css";

import { Switch, Route, Redirect } from "react-router-dom";

import Home_dasboard from "./dashboard/home";
import Input_data from "./dashboard/input_data";
import View_data from "./dashboard/view_data";
// ({ match });
class dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: this.props.match,
		};
	}
	componentDidMount() {
		var storage = localStorage.getItem("username");
		if (!storage) {
			window.location.href = "/login";
		} else {
			document
				.getElementById("main_router")
				.setAttribute("style", "height:100%;overflow:none");
		}
	}
	render() {
		return (
			<div className={styles.container} id="main_router">
				<Nav_dashboard />
				<Switch>
					<Route
						path={this.state.id.url}
						exact={true}
						component={Home_dasboard}
					/>
					<Route
						path={`${this.state.id.url}/input-data`}
						exact={true}
						component={Input_data}
					/>
					<Route
						path={`${this.state.id.url}/view-data`}
						exact={true}
						component={View_data}
					/>
				</Switch>
			</div>
		);
	}
}

export default dashboard;
