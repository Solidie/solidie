import React from "react";
import { Image } from "../image/image.jsx";

export function Video({contents}) {
	// We can use same component for iamge and video as the layout and functionalities are pretty similar
	return <Image contents={contents}/>
}
