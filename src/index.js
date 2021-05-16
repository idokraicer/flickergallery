import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
	<React.StrictMode>
		<App />
		<link
			rel='stylesheet'
			href='https://use.fontawesome.com/releases/v5.15.3/css/all.css'
			integrity='sha384-SZXxX4whJ79/gErwcOYf+zWLeJdY/qpuqC4cAa9rOGUstPomtqpuNWT9wdPEn2fk'
			crossOrigin='anonymous'></link>
		<script
			src='https://kit.fontawesome.com/60e55eeb4c.js'
			crossOrigin='anonymous'></script>
		<link
			rel='stylesheet'
			href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
		/>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
