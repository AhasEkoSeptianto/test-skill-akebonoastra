import React, { Fragment } from "react";

import Chart from "chart.js";

import axios from "axios";

class pie extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pencil: 0,
			penghapus: 0,
			bolpen: 0,
			penggaris: 0,
			isLoading: true,
		};
	}

	async componentDidMount() {
		await this.get_all_data();
		this.setState({ isLoading: false });
		// char pie
		var ctx = document.getElementById("myChart").getContext("2d");
		var myChart = new Chart(ctx, {
			type: "pie",
			data: {
				labels: ["Bolpen", "Pencil", "Penghapus", "Penggaris"],
				datasets: [
					{
						backgroundColor: [
							"#2ecc71",
							"#3498db",
							"#95a5a6",
							"#9b59b6",
							"#f1c40f",
							"#e74c3c",
							"#34495e",
						],
						data: [
							this.state.bolpen,
							this.state.pencil,
							this.state.penghapus,
							this.state.penggaris,
						],
					},
				],
			},
		});
	}

	get_all_data = async () => {
		let all_data = [];
		await axios
			.get("https://api-tesk-skill-akebonoastra.herokuapp.com/api")
			.then((res) => {
				all_data.push(res.data);
			});
		all_data[0].map((res) => {
			switch (res.nama_item) {
				case "Pencil": {
					this.setState({ pencil: this.state.pencil + 1 });
					break;
				}
				case "Bolpen": {
					this.setState({ bolpen: this.state.bolpen + 1 });
					break;
				}
				case "Penghapus": {
					this.setState({ penghapus: this.state.penghapus + 1 });
					break;
				}
				case "Penggaris": {
					this.setState({ penggaris: this.state.penggaris + 1 });
				}
			}
		});
	};

	render() {
		return (
			<Fragment>
				<p style={{ textAlign: "center" }}>item terjual</p>
				{this.state.isLoading === true ? (
					<p>wait...</p>
				) : (
					<canvas id="myChart"></canvas>
				)}
			</Fragment>
		);
	}
}

export default pie;
