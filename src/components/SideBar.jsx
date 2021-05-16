import React from "react";
import FavImages from "./FavImages";

export default function SideBar({
	sidebar,
	setSidebar,
	favImages,
	setFavImages,
	images,
	setImages,
}) {
	return (
		<div className='sideBar' style={{ width: sidebar ? "24vw" : "" }}>
			<header>Your favorite images</header>
			<FavImages
				favImages={favImages}
				setFavImages={setFavImages}
				images={images}
				setImages={setImages}
			/>
		</div>
	);
}
