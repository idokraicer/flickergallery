import React from "react";
import FontAwesome from "react-fontawesome";
import { Button } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

export default function LoadPage({ page, setPage }) {
	return (
		<div>
			<Button
				variant='contained'
				color='primary'
				onClick={() => setPage(page + 1)}
				style={{
					marginBottom: "15px",
				}}
				endIcon={<NavigateNextIcon />}>
				To the next Page
			</Button>
		</div>
	);
}
