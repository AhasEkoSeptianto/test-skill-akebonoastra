import React from "react";

import styles from "./../../../assets/css/dashboard/view_data.module.css";

import { DataGrid } from "@material-ui/data-grid";

import { Button } from "@material-ui/core";

import axios from "axios";

class input_data extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			all_data: [],
			tanggal_form: "",
			lokasi_form: "",
			isLoading: true,
		};
	}

	async componentDidMount() {
		await this.get_all_data();
		this.setState({ isLoading: false });
	}

	get_all_data = async () => {
		await axios
			.get("https://api-tesk-skill-akebonoastra.herokuapp.com/api")
			.then((res) => {
				this.setState({ all_data: res.data });
			});
	};

	search = async () => {
		let tanggal = this.state.tanggal_form;
		let lokasi = this.state.lokasi_form;
		var result = [];
		await this.get_all_data();
		this.state.all_data.map((value, index) => {
			if (value.tanggal === tanggal || value.lokasi === lokasi) {
				result.push(value);
			}
		});
		this.setState({ all_data: result });
	};

	cari = () => {
		console.log(this.state.tanggal_form);
		console.log(this.state.lokasi_form);
	};

	render() {
		const columns = [
			{ field: "_id", headerName: "ID", width: 70 },
			{ field: "tanggal", headerName: "Tanggal", width: 130 },
			{ field: "item", headerName: "Kode Item", width: 130 },
			{ field: "nama_item", headerName: "Nama Item", width: 130 },
			{ field: "kode_lokasi", headerName: "Kode Lokasi", width: 130 },
			{ field: "lokasi", headerName: "Nama Lokasi", width: 130 },
			{
				field: "qty",
				headerName: "Qty Actual",
				type: "number",
				width: 130,
			},
		];

		return (
			<div className={styles.container}>
				<div className={styles.header_color}></div>
				<div className={styles.main}>
					<h1 className={styles.info_nav}>View data</h1>
					<div className={styles.filter_form}>
						<div className={styles.forms}>
							<p className={styles.para}>Tanggal</p>
							<input
								type="text"
								onChange={(e) =>
									this.setState({
										tanggal_form: e.target.value,
									})
								}
							/>
						</div>
						<div className={styles.forms}>
							<p className={styles.para}>Lokasi</p>
							<input
								type="text"
								onChange={(e) =>
									this.setState({
										lokasi_form: e.target.value,
									})
								}
							/>
						</div>
						<div className={styles.forms}>
							<Button
								variant="contained"
								color="primary"
								size="small"
								onClick={this.search}
							>
								Cari
							</Button>
							<Button
								variant="contained"
								color="primary"
								size="small"
								onClick={this.get_all_data}
							>
								Clear
							</Button>
						</div>
					</div>
					<div style={{ height: 400, width: "100%" }}>
						{this.state.isLoading === true ? (
							<p>wait...</p>
						) : (
							<DataGrid
								id="_id"
								rows={this.state.all_data}
								columns={columns}
								pageSize={5}
							/>
						)}
					</div>
				</div>
			</div>
		);
	}
}
export default input_data;
