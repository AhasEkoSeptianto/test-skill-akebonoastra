import React from "react";

// mycss;
import s from "./../../assets/css/auth/login.module.css";

// icon material
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

// img logo
import Logo from "./../../assets/image/login.svg";

// axios
import axios from "axios";

// router
import { Redirect } from "react-router-dom";

// import { connect } from "react-redux";
class login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			redirect: false,
			isLoading: false,
		};
	}

	is_auth() {
		var storage = localStorage.getItem("username");
		if (storage) {
			this.setState({ redirect: true });
			return true;
		}
		return false;
	}

	validate = (item, id) => {
		if (item !== "") {
			document.getElementById(id).setAttribute("style", "border:none");
			return item;
		} else {
			document
				.getElementById(id)
				.setAttribute("style", "border:2px solid red;");
		}
	};

	submitForm = (e) => {
		e.preventDefault();
		let username = this.validate(e.target.username.value, "username");
		let password = this.validate(e.target.password.value, "password");

		if (username !== "" && password !== "") {
			let data = {
				username: username,
				password: password,
			};
			axios
				.post(
					"https://api-tesk-skill-akebonoastra.herokuapp.com/api/login",
					data,
					{
						headers: {
							"Content-Type": "application/json",
						},
					}
				)
				.then(async (response) => {
					let login = await response.data.login; // menunggu respone API db login
					//hadling user input jika user login salah maka akan show error
					let showerr = document.getElementById("wrong_user&pass");
					if (login === true) {
						// this.props.Login(username); //setting username user ke redux
						localStorage.setItem("auth-token", response.data.token);
						localStorage.setItem(
							"username",
							response.data.username
						);
						showerr.style.display = "none";
						this.setState({ redirect: true });
					} else {
						showerr.style.display = "flex";
					}
				})
				.catch((error) => {
					console.log(error);
				});
		} else {
			console.log("error");
		}
	};

	componentDidMount() {
		let is_login = this.is_auth(); //check jika user memiliki akses login
		if (is_login === true) {
			// this.props.Login(localStorage.getItem("username"));
			this.setState({ redirect: true });
		} else {
			alert(
				"untuk demo applikasi silahkan login dengan \n\nusername : admin\npassword : admin "
			);
		}
	}

	render() {
		if (this.state.redirect === true) {
			return <Redirect to="/dashboard" />;
		}
		return (
			<div className={s.bg}>
				<div className={s.container_login}>
					<div className={s.header_login}>
						<img src={Logo} className={s.img_logo} alt="none" />
						<p className={s.text_stikom}>StikomCKI.D</p>
					</div>
					<div
						className={s.container_wrong_pass}
						id="wrong_user&pass"
					>
						<p className={s.text_wrong_pass}>
							&sdot; Login gagal, mohon periksa kembali username
							dan password yang digunakan
						</p>
					</div>
					<form
						className={s.form}
						onSubmit={this.submitForm}
						method="post"
					>
						<div className={s.username} id="username">
							<AccountCircleRoundedIcon
								className={s.logo_login}
							/>
							<input
								type="text"
								name="username"
								placeholder="username"
								onClick={this.clickUsername}
								className={s.form_user}
							/>
						</div>
						<div className={s.password} id="password">
							<LockOutlinedIcon className={s.logo_login} />
							<input
								type="password"
								name="password"
								placeholder="password"
								className={s.form_user}
							/>
						</div>
						<button className={s.button} id="button">
							Login
						</button>
					</form>
				</div>
			</div>
		);
	}
}

// const mapStateToProps = (state) => {
// 	return {
// 		username: state.username,
// 	};
// };
//
// const mapDispatchToProps = (dispatch) => {
// 	return {
// 		Login: (user) => dispatch({ type: "login", user: user }),
// 		logout: () => dispatch({ type: "logout", user: "" }),
// 	};
// };

export default login;
