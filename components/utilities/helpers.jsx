import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs)).classNames();
}

export function formatDate(input) {
  const date = new Date(input)
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function absoluteUrl(path) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`
}

export const getElementDataSet = element => {
	let {dataset = {}} = element;
	let data = {};
	for ( let k in dataset ) {
		data[k] = JSON.parse( dataset[k] );
	}

	return data;
}

export const getDashboardPath=(rel_path, append_slash=true)=>{
	const { home_path, settings: {dashboard: {slug: dashboard_slug}} } = window.Solidie;
	const slash = append_slash ? (rel_path.indexOf( '/' ) === 0 ? '' : '/') : '';
	return home_path + dashboard_slug + slash + rel_path;
}

export const goBack=()=>window.history.back();