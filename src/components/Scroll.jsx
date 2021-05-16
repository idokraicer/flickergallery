import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import IconButton from "@material-ui/core/IconButton";

export default function Scroll({ showBelow }) {
	const [show, setshow] = useState(showBelow ? false : true);

	const useStyles = makeStyles((theme) => ({
		toTop: {
			zIndex: 1001,
			position: "fixed",
			bottom: "2vh",
			backgroundColor: "#DCDCDC",
			color: "black",
			"&:hover, &.Mui-focusVisible": {
				transition: "0.3s",
				color: "#397BA6",
				backgroundColor: "#DCDCDC",
			},
			right: "5%",
		},
	}));
	const classes = useStyles();

	const handleScroll = () => {
		if (window.pageYOffset > showBelow) {
			if (!show) setshow(true);
		} else {
			if (show) setshow(false);
		}
	};

	const handleClick = () => {
		window[`scrollTo`]({ top: 0, behavior: `smooth` });
	};

	useEffect(() => {
		if (showBelow) {
			window.addEventListener("scroll", handleScroll);
			return () => window.removeEventListener("scroll", handleScroll);
		}
	});
	return (
		<div>
			{show && (
				<IconButton onClick={handleClick} className={classes.toTop}>
					<ExpandLessIcon />
				</IconButton>
			)}
		</div>
	);
}
