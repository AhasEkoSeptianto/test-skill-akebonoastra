import React from "react";

import styles from "./../../../assets/css/dashboard/input_data.module.css";

import {
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Button,
} from "@material-ui/core";

import axios from "axios";

class input_data extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tanggal: "",
			lokasi: "",
			item: "",
			qty: "",
		};
	}

	componentDidMount() {
		var today = new Date();
		var dd = String(today.getDate()).padStart(2, "0");
		var mm = String(today.getMonth() + 1).padStart(2, "0");
		var yyyy = today.getFullYear();

		today = mm + " " + dd + " " + yyyy;
		this.setState({ tanggal: today });
	}

	validate = (data) => {
		let res = +data;
		let id = document.getElementById("qty");
		if (res > 0) {
			id.setAttribute("style", "border:1px solid gray;padding:10px");
			return true;
		} else {
			id.setAttribute("style", "border:1px solid red;padding:10px");
			return false;
		}
	};

	get_nama_item = (data) => {
		switch (data) {
			case "M0001": {
				return "Bolpen";
				break;
			}
			case "M0002": {
				return "Pencil";
				break;
			}
			case "M0003": {
				return "Penghapus";
				break;
			}
			case "M0004": {
				return "Penggaris";
				break;
			}
		}
	};

	get_kode_lokasi = (data) => {
		switch (data) {
			case "jakarta": {
				return "L001";
				break;
			}
			case "bekasi": {
				return "L002";
				break;
			}
			case "cikarang": {
				return "L003";
				break;
			}
			case "banten": {
				return "L004";
				break;
			}
		}
	};

	submit = async () => {
		let get_nama_item = this.get_nama_item(this.state.item);
		let get_kode_lokasi = this.get_kode_lokasi(this.state.lokasi);
		let id = Math.floor(Math.random() * 1000000000000 + 1);

		let data = {
			id: id,
			tanggal: this.state.tanggal,
			lokasi: this.state.lokasi,
			item: this.state.item,
			nama_item: get_nama_item,
			kode_lokasi: get_kode_lokasi,
			qty: this.state.qty,
		};
		let result = this.validate(data.qty);
		if (result === true) {
			axios
				.post(
					"https://api-tesk-skill-akebonoastra.herokuapp.com/api/input",
					data,
					{
						headers: {
							"Content-Type": "application/json",
						},
					}
				)
				.then((response) => {
					alert("berhasil menambah data");
				});
		}
	};

	clear = () => {
		let all_id = ["lokasi", "item"];
		all_id.forEach(
			(item) => (document.getElementById(item).selectedIndex = 1)
		);
		document.getElementById("qty").value = "";
	};

	render() {
		let lokasi = ["jakarta", "bekasi", "cikarang", "banten"];

		let item = ["M0001", "M0002", "M0003", "M0004"];
		return (
			<div className={styles.container}>
				<div className={styles.header_color}></div>
				<div className={styles.main}>
					<h1 className={styles.info_nav}>Input data</h1>
					<div className={styles.forms}>
						<div className={styles.item_forms}>
							<p className={styles.para_forms}>tanggal</p>
							<input
								type="text"
								value={this.state.tanggal}
								onChange={(e) =>
									this.setState({ tanggal: e.target.value })
								}
							/>
						</div>
						<div className={styles.item_forms}>
							<p className={styles.para_forms}>lokasi</p>
							<FormControl className={styles.selected}>
								<Select
									labelId="demo-simple-select-helper-label"
									id="lokasi"
									className={styles.selectedchild}
									onChange={(e) =>
										this.setState({
											lokasi: e.target.value,
										})
									}
								>
									{lokasi.map((res) => (
										<MenuItem value={res}>{res}</MenuItem>
									))}
								</Select>
							</FormControl>
						</div>
						<div className={styles.item_forms}>
							<p className={styles.para_forms}>item</p>
							<FormControl className={styles.selected}>
								<Select
									labelId="demo-simple-select-helper-label"
									className={styles.selectedchild}
									id="item"
									onChange={(e) =>
										this.setState({ item: e.target.value })
									}
								>
									{item.map((res) => (
										<MenuItem value={res}>{res}</MenuItem>
									))}
								</Select>
							</FormControl>
						</div>
						<div className={styles.item_forms}>
							<p className={styles.para_forms}>Qty</p>
							<input
								type="number"
								id="qty"
								onChange={(e) =>
									this.setState({ qty: e.target.value })
								}
							/>
						</div>
						<div className={styles.item_forms}>
							<Button
								className={styles.button_forms}
								variant="contained"
								size="medium"
								color="primary"
								onClick={this.submit}
							>
								simpan
							</Button>
							<Button
								className={styles.button_forms}
								variant="contained"
								size="medium"
								color="primary"
								onClick={this.clear}
							>
								clear
							</Button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default input_data;
