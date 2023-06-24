import React from 'react';
import { useEffect } from 'react';

export function SignleApp(){

	function getDirection() {
		var windowWidth = window.innerWidth;
		var direction = window.innerWidth <= 760 ? 'vertical' : 'horizontal';

		return direction;
	}

	useEffect(()=>{
		var swiper = new Swiper('.swiper', {
			slidesPerView: 3,
			direction: getDirection(),
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			on: {
				resize: function () {
					swiper.changeDirection(getDirection());
				},
			},
		});
	}, []);

	return <div className="w-full h-full bg-content-bg text-tertiary flex justify-center">
		<div className="appstore-single-product-wrapper h-full w-full flex flex-col justify-between items-center gap-14 py-10">
			<div className="flex flex-col items-center justify-center gap-10">
				<img src="https://img.logoipsum.com/285.svg" className="w-36 h-20" alt="" />
				<div className="flex justify-between gap-5">
					<a
						className="active:animate-bounce active:text-tertiary text-sm select-none bg-tertiary/90 text-brand-tertiary font-semibold py-3 px-6 rounded-full shadow-lg ring-2 ring-tertiary/10">See
					How It Works</a>
					<a
						className="active:animate-bounce active:text-tertiary text-sm select-none text-tertiary bg-tertiary/10 font-semibold py-3 px-6 rounded-full shadow-lg">See
					Live Preview</a>
				</div>
			</div>
			<div className="flex flex-col justify-center items-center gap-5">
				<p className="px-3 sm:px-0 text-center sm:text-left">Simple, transparent pricing that grows with you. Try any plan free for 30 days.</p>
				<div className="shadow-lg flex rounded-lg w-max bg-brand-tertiary p-1">
					<div
						className="active:outline outline-tertiary shadow-lg shadow-tertiary/20 font-medium select-none text-sm rounded-lg px-6 py-2.5 bg-tertiary text-brand-tertiary">
						Monthly billing
					</div>
					<div className="font-medium select-none text-sm rounded-lg px-6 py-2.5">
						Annual billing
					</div>
				</div>
				<div className="swiper sm:max-w-2xl md:max-w-5xl xl:max-w-7xl w-full max-h-full">
					<div className="swiper-wrapper [&>.swiper-slide]:!h-max">
						<div className="swiper-slide">
							<div className=" flex flex-col justify-between items-center bg-brand-tertiary shadow-lg rounded-3xl px-14 py-8">
								<div className="w-full">
									<h3 className="text-tertiary text-sm font-semibold uppercase tracking-wide">Starter</h3>
									<div className="flex flex-col items-start">
										<div className="mt-3 flex items-center">
											<p className="text-tertiary text-4xl font-extrabold tracking-tight">$19</p>
											<div className="ml-4">
												<p className="text-tertiary text-sm">USD / mo</p>
												<p className="text-tertiary/70 text-sm">Billed yearly ($199)</p>
											</div>
										</div>
									</div>
								</div>
								<h4 className="sr-only">Features</h4>
								<ul role="list" className="mt-7 ">
									<li className="py-3 flex items-center">
										<svg className="text-tertiary w-5 h-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd" />
										</svg>
										<span className="text-tertiary ml-3 text-sm font-medium">Feature text goes
										here</span>
									</li>
									<li className="py-3 flex items-center">
										<svg className="text-tertiary w-5 h-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd" />
										</svg>
										<span className="text-tertiary ml-3 text-sm font-medium">Feature text goes
										here</span>
									</li>
									<li className="py-3 flex items-center">
										<svg className="text-tertiary w-5 h-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd" />
										</svg>
										<span className="text-tertiary ml-3 text-sm font-medium">Feature text goes
										here</span>
									</li>
									<li className="py-3 flex items-center">
										<svg className="text-tertiary w-5 h-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd" />
										</svg>
										<span className="text-tertiary ml-3 text-sm font-medium">Feature text goes
										here</span>
									</li>
									<li className="py-3 flex items-center">
										<svg className="text-tertiary w-5 h-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd" />
										</svg>
										<span className="text-tertiary ml-3 text-sm font-medium">Feature text goes
										here</span>
									</li>
								</ul>
								<a href="#"
									className="bg-tertiary text-brand-tertiary hover:text-tertiary hover:bg-tertiary/5 mt-6 inline-block py-2 px-8 border border-transparent rounded-full shadow-sm text-center text-sm font-medium sm:mt-0 sm:w-auto lg:mt-6 w-full hover:underline hover:decoration-dashed">Get
								Started</a>
							</div>
						</div>
						<div className="swiper-slide">
							<div className="flex flex-col justify-between z-50 bg-tertiary  shadow-xl rounded-3xl px-14 py-8">
								<div className="">
									<div>
										<h3 className="text-brand-tertiary text-sm font-semibold uppercase tracking-wide">Business
										</h3>
										<div
											className="flex flex-col items-start">
											<div className="mt-3 flex items-center">
												<p className="text-brand-tertiary text-4xl font-extrabold tracking-tight">$29</p>
												<div className="ml-4">
													<p className="text-brand-tertiary text-sm">USD / mo</p>
													<p className="text-brand-tertiary/70 text-sm">Billed yearly ($299)</p>
												</div>
											</div>
										</div>
									</div>
									<h4 className="sr-only">Features</h4>
									<ul role="list" className="mt-7 ">
										<li className="py-3 flex items-center">
											<svg className="text-brand-tertiary w-5 h-5 flex-shrink-0"
												xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
												aria-hidden="true">
												<path fillRule="evenodd"
													d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
													clipRule="evenodd" />
											</svg>
											<span className="text-brand-tertiary ml-3 text-sm font-medium">Feature text goes
											here</span>
										</li>
										<li className="py-3 flex items-center">
											<svg className="text-brand-tertiary w-5 h-5 flex-shrink-0"
												xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
												aria-hidden="true">
												<path fillRule="evenodd"
													d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
													clipRule="evenodd" />
											</svg>
											<span className="text-brand-tertiary ml-3 text-sm font-medium">Feature text goes
											here</span>
										</li>
										<li className="py-3 flex items-center">
											<svg className="text-brand-tertiary w-5 h-5 flex-shrink-0"
												xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
												aria-hidden="true">
												<path fillRule="evenodd"
													d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
													clipRule="evenodd" />
											</svg>
											<span className="text-brand-tertiary ml-3 text-sm font-medium">Feature text goes
											here</span>
										</li>
										<li className="py-3 flex items-center">
											<svg className="text-brand-tertiary w-5 h-5 flex-shrink-0"
												xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
												aria-hidden="true">
												<path fillRule="evenodd"
													d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
													clipRule="evenodd" />
											</svg>
											<span className="text-brand-tertiary ml-3 text-sm font-medium">Feature text goes
											here</span>
										</li>
										<li className="py-3 flex items-center">
											<svg className="text-brand-tertiary w-5 h-5 flex-shrink-0"
												xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
												aria-hidden="true">
												<path fillRule="evenodd"
													d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
													clipRule="evenodd" />
											</svg>
											<span className="text-brand-tertiary ml-3 text-sm font-medium">Feature text goes
											here</span>
										</li>
									</ul>
								</div>
								<a href="#"
									className="font-bold bg-brand-tertiary text-tertiary inline-block py-2 px-8 border border-transparent rounded-full shadow-sm text-center text-sm  mt-6 w-full underline decoration-dashed">Get
								Started</a>
							</div>
						</div>
						<div className="swiper-slide">
							<div className="flex flex-col justify-between items-center bg-brand-tertiary shadow-lg rounded-3xl px-14 py-8">
								<div>
									<h3 className="text-tertiary text-sm font-semibold uppercase tracking-wide">Enterprise</h3>
									<div
										className="flex flex-col items-start ">
										<div className="mt-3 flex items-center">
											<p className="text-tertiary text-4xl font-extrabold tracking-tight">$49</p>
											<div className="ml-4">
												<p className="text-tertiary text-sm">USD / mo</p>
												<p className="text-tertiary/80 text-sm">Billed yearly ($499)</p>
											</div>
										</div>
									</div>
								</div>
								<h4 className="sr-only">Features</h4>
								<ul role="list" className="w-full mt-7">
									<li className="py-3 flex items-center">
										<svg className="text-tertiary w-5 h-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd" />
										</svg>
										<span className="text-tertiary ml-3 text-sm font-medium">Feature text goes
										here</span>
									</li>
									<li className="py-3 flex items-center">
										<svg className="text-tertiary w-5 h-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd" />
										</svg>
										<span className="text-tertiary ml-3 text-sm font-medium">Feature text goes
										here</span>
									</li>
									<li className="py-3 flex items-center">
										<svg className="text-tertiary w-5 h-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd" />
										</svg>
										<span className="text-tertiary ml-3 text-sm font-medium">Feature text goes
										here</span>
									</li>
									<li className="py-3 flex items-center">
										<svg className="text-tertiary w-5 h-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd" />
										</svg>
										<span className="text-tertiary ml-3 text-sm font-medium">Feature text goes
										here</span>
									</li>
									<li className="py-3 flex items-center">
										<svg className="text-tertiary w-5 h-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd" />
										</svg>
										<span className="text-tertiary ml-3 text-sm font-medium">Feature text goes
										here</span>
									</li>
								</ul>
								<a href="#"
									className="bg-tertiary text-brand-tertiary hover:text-tertiary hover:bg-tertiary/5 inline-block py-2 px-8 border border-transparent rounded-full shadow-sm text-center text-sm font-medium mt-6 w-full hover:underline hover:decoration-dashed">Get
								Started</a>
							</div>
						</div>
						<div className="swiper-slide">
							<div className="flex flex-col justify-between items-center bg-brand-tertiary shadow-lg rounded-3xl px-14 py-8">
								<div>
									<h3 className="text-tertiary text-sm font-semibold uppercase tracking-wide">Enterprise</h3>
									<div
										className="flex flex-col items-start ">
										<div className="mt-3 flex items-center">
											<p className="text-tertiary text-4xl font-extrabold tracking-tight">$49</p>
											<div className="ml-4">
												<p className="text-tertiary text-sm">USD / mo</p>
												<p className="text-tertiary/80 text-sm">Billed yearly ($499)</p>
											</div>
										</div>
									</div>
								</div>
								<h4 className="sr-only">Features</h4>
								<ul role="list" className="w-full mt-7">
									<li className="py-3 flex items-center">
										<svg className="text-tertiary w-5 h-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd" />
										</svg>
										<span className="text-tertiary ml-3 text-sm font-medium">Feature text goes
										here</span>
									</li>
									<li className="py-3 flex items-center">
										<svg className="text-tertiary w-5 h-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd" />
										</svg>
										<span className="text-tertiary ml-3 text-sm font-medium">Feature text goes
										here</span>
									</li>
									<li className="py-3 flex items-center">
										<svg className="text-tertiary w-5 h-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd" />
										</svg>
										<span className="text-tertiary ml-3 text-sm font-medium">Feature text goes
										here</span>
									</li>
									<li className="py-3 flex items-center">
										<svg className="text-tertiary w-5 h-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd" />
										</svg>
										<span className="text-tertiary ml-3 text-sm font-medium">Feature text goes
										here</span>
									</li>
									<li className="py-3 flex items-center">
										<svg className="text-tertiary w-5 h-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd" />
										</svg>
										<span className="text-tertiary ml-3 text-sm font-medium">Feature text goes
										here</span>
									</li>
								</ul>
								<a href="#"
									className="bg-tertiary text-brand-tertiary hover:text-tertiary hover:bg-tertiary/5 inline-block py-2 px-8 border border-transparent rounded-full shadow-sm text-center text-sm font-medium mt-6 w-full hover:underline hover:decoration-dashed">Get
								Started</a>
							</div>
						</div>
					</div>
					<div className="swiper-button-next text-tertiary"></div>
					<div className="swiper-button-prev text-tertiary"></div>
				</div>
			</div>
			<div className="max-w-2xl mx-auto bg-brand-tertiary py-16 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
				<div className="space-y-24 lg:hidden">
					<section>
						<div className="px-4 mb-8">
							<h2 className="text-lg leading-6 font-medium text-gray-900">Basic</h2>
						</div>
						<table className="w-full">
							<caption
								className="bg-gray-50 border-t border-gray-200 py-3 px-4 text-sm font-medium text-gray-900 text-left">
								Features
							</caption>
							<thead>
								<tr>
									<th className="sr-only" scope="col">Feature</th>
									<th className="sr-only" scope="col">Included</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-200">
								<tr className="border-t border-gray-200">
									<th className="py-5 px-4 text-sm font-normal text-gray-500 text-left" scope="row">Molestie
										lobortis massa.
									</th>
									<td className="py-5 pr-4">
										<svg className="ml-auto h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd" />
										</svg>
										<span className="sr-only">Yes</span>
									</td>
								</tr>
								<tr className="border-t border-gray-200">
									<th className="py-5 px-4 text-sm font-normal text-gray-500 text-left" scope="row">Urna purus
										felis.
									</th>
									<td className="py-5 pr-4">
										<svg className="ml-auto h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd" />
										</svg>
										<span className="sr-only">Yes</span>
									</td>
								</tr>
								<tr className="border-t border-gray-200">
									<th className="py-5 px-4 text-sm font-normal text-gray-500 text-left" scope="row">Tellus
										pulvinar sit dictum.
									</th>
									<td className="py-5 pr-4">
										<svg className="ml-auto h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
												clipRule="evenodd" />
										</svg>
										<span className="sr-only">No</span>
									</td>
								</tr>
								<tr className="border-t border-gray-200">
									<th className="py-5 px-4 text-sm font-normal text-gray-500 text-left" scope="row">Convallis.
									</th>
									<td className="py-5 pr-4">
										<svg className="ml-auto h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
												clipRule="evenodd" />
										</svg>
										<span className="sr-only">No</span>
									</td>
								</tr>
							</tbody>
						</table>
						<table className="w-full">
							<caption
								className="bg-gray-50 border-t border-gray-200 py-3 px-4 text-sm font-medium text-gray-900 text-left">
								Reporting
							</caption>
							<thead>
								<tr>
									<th className="sr-only" scope="col">Feature</th>
									<th className="sr-only" scope="col">Included</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-200">
								<tr className="border-t border-gray-200">
									<th className="py-5 px-4 text-sm font-normal text-gray-500 text-left" scope="row">
										Adipiscing.
									</th>
									<td className="py-5 pr-4">
										<svg className="ml-auto h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd" />
										</svg>
										<span className="sr-only">Yes</span>
									</td>
								</tr>
								<tr className="border-t border-gray-200">
									<th className="py-5 px-4 text-sm font-normal text-gray-500 text-left" scope="row">Eget risus
										integer.
									</th>
									<td className="py-5 pr-4">
										<svg className="ml-auto h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
												clipRule="evenodd" />
										</svg>
										<span className="sr-only">No</span>
									</td>
								</tr>
								<tr className="border-t border-gray-200">
									<th className="py-5 px-4 text-sm font-normal text-gray-500 text-left" scope="row">Gravida
										leo urna velit.
									</th>
									<td className="py-5 pr-4">
										<svg className="ml-auto h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
												clipRule="evenodd" />
										</svg>
										<span className="sr-only">No</span>
									</td>
								</tr>
								<tr className="border-t border-gray-200">
									<th className="py-5 px-4 text-sm font-normal text-gray-500 text-left" scope="row">Elementum
										ut dapibus mi feugiat cras nisl.
									</th>
									<td className="py-5 pr-4">
										<svg className="ml-auto h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
												clipRule="evenodd" />
										</svg>
										<span className="sr-only">No</span>
									</td>
								</tr>
							</tbody>
						</table>
						<table className="w-full">
							<caption
								className="bg-gray-50 border-t border-gray-200 py-3 px-4 text-sm font-medium text-gray-900 text-left">
								Support
							</caption>
							<thead>
								<tr>
									<th className="sr-only" scope="col">Feature</th>
									<th className="sr-only" scope="col">Included</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-200">
								<tr className="border-t border-gray-200">
									<th className="py-5 px-4 text-sm font-normal text-gray-500 text-left" scope="row">Sit
										dignissim.
									</th>
									<td className="py-5 pr-4">
										<svg className="ml-auto h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd" />
										</svg>
										<span className="sr-only">Yes</span>
									</td>
								</tr>
								<tr className="border-t border-gray-200">
									<th className="py-5 px-4 text-sm font-normal text-gray-500 text-left" scope="row">Congue at
										nibh et.
									</th>
									<td className="py-5 pr-4">
										<svg className="ml-auto h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
												clipRule="evenodd" />
										</svg>
										<span className="sr-only">No</span>
									</td>
								</tr>
								<tr className="border-t border-gray-200">
									<th className="py-5 px-4 text-sm font-normal text-gray-500 text-left" scope="row">Volutpat
										feugiat mattis.
									</th>
									<td className="py-5 pr-4">
										<svg className="ml-auto h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
												clipRule="evenodd" />
										</svg>
										<span className="sr-only">No</span>
									</td>
								</tr>
								<tr className="border-t border-gray-200">
									<th className="py-5 px-4 text-sm font-normal text-gray-500 text-left" scope="row">Tristique
										pellentesque ornare diam sapien.
									</th>
									<td className="py-5 pr-4">
										<svg className="ml-auto h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
												clipRule="evenodd" />
										</svg>
										<span className="sr-only">No</span>
									</td>
								</tr>
							</tbody>
						</table>
						<div className="border-t border-gray-200 px-4 pt-5">
							<a href="#"
								className="flex justify-center items-center w-full active:outline outline-tertiary shadow-lg shadow-tertiary/20 font-medium select-none text-sm rounded-lg px-6 py-2.5 bg-tertiary text-brand-tertiary">Buy
							Basic</a>
						</div>
					</section>
					<section>
						<div className="px-4 mb-8">
							<h2 className="text-lg leading-6 font-medium text-gray-900">Essential</h2>
						</div>
						<table className="w-full">
							<caption
								className="bg-gray-50 border-t border-gray-200 py-3 px-4 text-sm font-medium text-gray-900 text-left">
								Features
							</caption>
							<thead>
								<tr>
									<th className="sr-only" scope="col">Feature</th>
									<th className="sr-only" scope="col">Included</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-200">
								<tr className="border-t border-gray-200">
									<th className="py-5 px-4 text-sm font-normal text-gray-500 text-left" scope="row">Molestie
										lobortis massa.
									</th>
									<td className="py-5 pr-4">
										<svg className="ml-auto h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd" />
										</svg>
										<span className="sr-only">Yes</span>
									</td>
								</tr>
								<tr className="border-t border-gray-200">
									<th className="py-5 px-4 text-sm font-normal text-gray-500 text-left" scope="row">Urna purus
										felis.
									</th>
									<td className="py-5 pr-4">
										<svg className="ml-auto h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd" />
										</svg>
										<span className="sr-only">Yes</span>
									</td>
								</tr>
								<tr className="border-t border-gray-200">
									<th className="py-5 px-4 text-sm font-normal text-gray-500 text-left" scope="row">Tellus
										pulvinar sit dictum.
									</th>
									<td className="py-5 pr-4">
										<svg className="ml-auto h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd" />
										</svg>
										<span className="sr-only">Yes</span>
									</td>
								</tr>
								<tr className="border-t border-gray-200">
									<th className="py-5 px-4 text-sm font-normal text-gray-500 text-left" scope="row">Convallis.
									</th>
									<td className="py-5 pr-4">
										<span className="block text-sm text-gray-700 text-right">Up to 20 users</span>
									</td>
								</tr>
							</tbody>
						</table>
						<table className="w-full">
							<caption
								className="bg-gray-50 border-t border-gray-200 py-3 px-4 text-sm font-medium text-gray-900 text-left">
								Reporting
							</caption>
							<thead>
								<tr>
									<th className="sr-only" scope="col">Feature</th>
									<th className="sr-only" scope="col">Included</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-200">
								<tr className="border-t border-gray-200">
									<th className="py-5 px-4 text-sm font-normal text-gray-500 text-left" scope="row">
										Adipiscing.
									</th>
									<td className="py-5 pr-4">
										<svg className="ml-auto h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd" />
										</svg>
										<span className="sr-only">Yes</span>
									</td>
								</tr>
								<tr className="border-t border-gray-200">
									<th className="py-5 px-4 text-sm font-normal text-gray-500 text-left" scope="row">Eget risus
										integer.
									</th>
									<td className="py-5 pr-4">
										<svg className="ml-auto h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd" />
										</svg>
										<span className="sr-only">Yes</span>
									</td>
								</tr>
								<tr className="border-t border-gray-200">
									<th className="py-5 px-4 text-sm font-normal text-gray-500 text-left" scope="row">Gravida
										leo urna velit.
									</th>
									<td className="py-5 pr-4">
										<svg className="ml-auto h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
												clipRule="evenodd" />
										</svg>
										<span className="sr-only">No</span>
									</td>
								</tr>
								<tr className="border-t border-gray-200">
									<th className="py-5 px-4 text-sm font-normal text-gray-500 text-left" scope="row">Elementum
										ut dapibus mi feugiat cras nisl.
									</th>
									<td className="py-5 pr-4">
										<svg className="ml-auto h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
												clipRule="evenodd" />
										</svg>
										<span className="sr-only">No</span>
									</td>
								</tr>
							</tbody>
						</table>
						<table className="w-full">
							<caption
								className="bg-gray-50 border-t border-gray-200 py-3 px-4 text-sm font-medium text-gray-900 text-left">
								Support
							</caption>
							<thead>
								<tr>
									<th className="sr-only" scope="col">Feature</th>
									<th className="sr-only" scope="col">Included</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-200">
								<tr className="border-t border-gray-200">
									<th className="py-5 px-4 text-sm font-normal text-gray-500 text-left" scope="row">Sit
										dignissim.
									</th>
									<td className="py-5 pr-4">
										<svg className="ml-auto h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd" />
										</svg>
										<span className="sr-only">Yes</span>
									</td>
								</tr>
								<tr className="border-t border-gray-200">
									<th className="py-5 px-4 text-sm font-normal text-gray-500 text-left" scope="row">Congue at
										nibh et.
									</th>
									<td className="py-5 pr-4">
										<svg className="ml-auto h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd" />
										</svg>
										<span className="sr-only">Yes</span>
									</td>
								</tr>
								<tr className="border-t border-gray-200">
									<th className="py-5 px-4 text-sm font-normal text-gray-500 text-left" scope="row">Volutpat
										feugiat mattis.
									</th>
									<td className="py-5 pr-4">
										<svg className="ml-auto h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd" />
										</svg>
										<span className="sr-only">Yes</span>
									</td>
								</tr>
								<tr className="border-t border-gray-200">
									<th className="py-5 px-4 text-sm font-normal text-gray-500 text-left" scope="row">Tristique
										pellentesque ornare diam sapien.
									</th>
									<td className="py-5 pr-4">
										<svg className="ml-auto h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
												clipRule="evenodd" />
										</svg>
										<span className="sr-only">No</span>
									</td>
								</tr>
							</tbody>
						</table>
						<div className="border-t border-gray-200 px-4 pt-5">
							<a href="#"
								className="flex justify-center items-center w-full active:outline outline-tertiary shadow-lg shadow-tertiary/20 font-medium select-none text-sm rounded-lg px-6 py-2.5 bg-tertiary text-brand-tertiary">Buy
							Essential</a>
						</div>
					</section>
					<section>
						<div className="px-4 mb-8">
							<h2 className="text-lg leading-6 font-medium text-gray-900">Premium</h2>
						</div>
						<table className="w-full">
							<caption
								className="bg-gray-50 border-t border-gray-200 py-3 px-4 text-sm font-medium text-gray-900 text-left">
								Features
							</caption>
							<thead>
								<tr>
									<th className="sr-only" scope="col">Feature</th>
									<th className="sr-only" scope="col">Included</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-200">
								<tr className="border-t border-gray-200">
									<th className="py-5 px-4 text-sm font-normal text-gray-500 text-left" scope="row">Molestie
										lobortis massa.
									</th>
									<td className="py-5 pr-4">
										<svg className="ml-auto h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd" />
										</svg>
										<span className="sr-only">Yes</span>
									</td>
								</tr>
								<tr className="border-t border-gray-200">
									<th className="py-5 px-4 text-sm font-normal text-gray-500 text-left" scope="row">Urna purus
										felis.
									</th>
									<td className="py-5 pr-4">
										<svg className="ml-auto h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd" />
										</svg>
										<span className="sr-only">Yes</span>
									</td>
								</tr>
								<tr className="border-t border-gray-200">
									<th className="py-5 px-4 text-sm font-normal text-gray-500 text-left" scope="row">Tellus
										pulvinar sit dictum.
									</th>
									<td className="py-5 pr-4">
										<svg className="ml-auto h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd" />
										</svg>
										<span className="sr-only">Yes</span>
									</td>
								</tr>
								<tr className="border-t border-gray-200">
									<th className="py-5 px-4 text-sm font-normal text-gray-500 text-left" scope="row">Convallis.
									</th>
									<td className="py-5 pr-4">
										<span className="block text-sm text-gray-700 text-right">Up to 50 users</span>
									</td>
								</tr>
							</tbody>
						</table>
						<table className="w-full">
							<caption
								className="bg-gray-50 border-t border-gray-200 py-3 px-4 text-sm font-medium text-gray-900 text-left">
								Reporting
							</caption>
							<thead>
								<tr>
									<th className="sr-only" scope="col">Feature</th>
									<th className="sr-only" scope="col">Included</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-200">
								<tr className="border-t border-gray-200">
									<th className="py-5 px-4 text-sm font-normal text-gray-500 text-left" scope="row">
										Adipiscing.
									</th>
									<td className="py-5 pr-4">
										<svg className="ml-auto h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd" />
										</svg>
										<span className="sr-only">Yes</span>
									</td>
								</tr>
								<tr className="border-t border-gray-200">
									<th className="py-5 px-4 text-sm font-normal text-gray-500 text-left" scope="row">Eget risus
										integer.
									</th>
									<td className="py-5 pr-4">
										<svg className="ml-auto h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd" />
										</svg>
										<span className="sr-only">Yes</span>
									</td>
								</tr>
								<tr className="border-t border-gray-200">
									<th className="py-5 px-4 text-sm font-normal text-gray-500 text-left" scope="row">Gravida
										leo urna velit.
									</th>
									<td className="py-5 pr-4">
										<svg className="ml-auto h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd" />
										</svg>
										<span className="sr-only">Yes</span>
									</td>
								</tr>
								<tr className="border-t border-gray-200">
									<th className="py-5 px-4 text-sm font-normal text-gray-500 text-left" scope="row">Elementum
										ut dapibus mi feugiat cras nisl.
									</th>
									<td className="py-5 pr-4">
										<svg className="ml-auto h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd" />
										</svg>
										<span className="sr-only">Yes</span>
									</td>
								</tr>
							</tbody>
						</table>
						<table className="w-full">
							<caption
								className="bg-gray-50 border-t border-gray-200 py-3 px-4 text-sm font-medium text-gray-900 text-left">
								Support
							</caption>
							<thead>
								<tr>
									<th className="sr-only" scope="col">Feature</th>
									<th className="sr-only" scope="col">Included</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-200">
								<tr className="border-t border-gray-200">
									<th className="py-5 px-4 text-sm font-normal text-gray-500 text-left" scope="row">Sit
										dignissim.
									</th>
									<td className="py-5 pr-4">
										<svg className="ml-auto h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd" />
										</svg>
										<span className="sr-only">Yes</span>
									</td>
								</tr>
								<tr className="border-t border-gray-200">
									<th className="py-5 px-4 text-sm font-normal text-gray-500 text-left" scope="row">Congue at
										nibh et.
									</th>
									<td className="py-5 pr-4">
										<svg className="ml-auto h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd" />
										</svg>
										<span className="sr-only">Yes</span>
									</td>
								</tr>
								<tr className="border-t border-gray-200">
									<th className="py-5 px-4 text-sm font-normal text-gray-500 text-left" scope="row">Volutpat
										feugiat mattis.
									</th>
									<td className="py-5 pr-4">
										<svg className="ml-auto h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd" />
										</svg>
										<span className="sr-only">Yes</span>
									</td>
								</tr>
								<tr className="border-t border-gray-200">
									<th className="py-5 px-4 text-sm font-normal text-gray-500 text-left" scope="row">Tristique
										pellentesque ornare diam sapien.
									</th>
									<td className="py-5 pr-4">
										<svg className="ml-auto h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd" />
										</svg>
										<span className="sr-only">Yes</span>
									</td>
								</tr>
							</tbody>
						</table>
						<div className="border-t border-gray-200 px-4 pt-5">
							<a href="#"
								className="flex justify-center items-center w-full active:outline outline-tertiary shadow-lg shadow-tertiary/20 font-medium select-none text-sm rounded-lg px-6 py-2.5 bg-tertiary text-brand-tertiary">Buy
							Premium</a>
						</div>
					</section>
				</div>
				<div className="hidden lg:block">
					<table className="w-full h-px table-fixed">
						<caption className="sr-only">
							Pricing plan comparison
						</caption>
						<thead>
							<tr>
								<th className="pb-4 pl-6 pr-6 text-sm font-medium text-gray-900 text-left" scope="col">
									<span className="sr-only">Feature by</span>
									<span>Plans</span>
								</th>
								<th className="w-1/4 pb-4 px-6 text-lg leading-6 font-medium text-gray-900 text-left"
									scope="col">Basic</th>
								<th className="w-1/4 pb-4 px-6 text-lg leading-6 font-medium text-gray-900 text-left"
									scope="col">Essential</th>
								<th className="w-1/4 pb-4 px-6 text-lg leading-6 font-medium text-gray-900 text-left"
									scope="col">Premium</th>
							</tr>
						</thead>
						<tbody className="border-t border-gray-200 divide-y divide-gray-200">
							<tr>
								<th className="py-3 pl-6 bg-gray-50 text-sm font-medium text-gray-900 text-left" colSpan="4"
									scope="colgroup">Features</th>
							</tr>
							<tr>
								<th className="py-5 pl-6 pr-6 text-sm font-normal text-gray-500 text-left" scope="row">Molestie
									lobortis massa.
								</th>
								<td className="py-5 px-6">
									<svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
										<path fillRule="evenodd"
											d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
											clipRule="evenodd" />
									</svg>
									<span className="sr-only">Included in Basic</span>
								</td>
								<td className="py-5 px-6">
									<svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
										<path fillRule="evenodd"
											d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
											clipRule="evenodd" />
									</svg>
									<span className="sr-only">Included in Essential</span>
								</td>
								<td className="py-5 px-6">
									<svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
										<path fillRule="evenodd"
											d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
											clipRule="evenodd" />
									</svg>
									<span className="sr-only">Included in Premium</span>
								</td>
							</tr>
							<tr>
								<th className="py-5 pl-6 pr-6 text-sm font-normal text-gray-500 text-left" scope="row">Urna
									purus felis.
								</th>
								<td className="py-5 px-6">
									<svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
										<path fillRule="evenodd"
											d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
											clipRule="evenodd" />
									</svg>
									<span className="sr-only">Included in Basic</span>
								</td>
								<td className="py-5 px-6">
									<svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
										<path fillRule="evenodd"
											d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
											clipRule="evenodd" />
									</svg>
									<span className="sr-only">Included in Essential</span>
								</td>
								<td className="py-5 px-6">
									<svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
										<path fillRule="evenodd"
											d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
											clipRule="evenodd" />
									</svg>
									<span className="sr-only">Included in Premium</span>
								</td>
							</tr>
							<tr>
								<th className="py-5 pl-6 pr-6 text-sm font-normal text-gray-500 text-left" scope="row">Tellus
									pulvinar sit dictum.
								</th>
								<td className="py-5 px-6">
									<svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
										<path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
											clipRule="evenodd" />
									</svg>
									<span className="sr-only">Not included in Basic</span>
								</td>
								<td className="py-5 px-6">
									<svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
										<path fillRule="evenodd"
											d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
											clipRule="evenodd" />
									</svg>
									<span className="sr-only">Included in Essential</span>
								</td>
								<td className="py-5 px-6">
									<svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
										<path fillRule="evenodd"
											d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
											clipRule="evenodd" />
									</svg>
									<span className="sr-only">Included in Premium</span>
								</td>
							</tr>
							<tr>
								<th className="py-5 pl-6 pr-6 text-sm font-normal text-gray-500 text-left" scope="row">
									Convallis.
								</th>
								<td className="py-5 px-6">
									<svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
										<path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
											clipRule="evenodd" />
									</svg>
									<span className="sr-only">Not included in Basic</span>
								</td>
								<td className="py-5 px-6">
									<span className="block text-sm text-gray-700">Up to 20 users</span>
								</td>
								<td className="py-5 px-6">
									<span className="block text-sm text-gray-700">Up to 50 users</span>
								</td>
							</tr>
							<tr>
								<th className="py-3 pl-6 bg-gray-50 text-sm font-medium text-gray-900 text-left" colSpan="4"
									scope="colgroup">Reporting</th>
							</tr>
							<tr>
								<th className="py-5 pl-6 pr-6 text-sm font-normal text-gray-500 text-left" scope="row">
									Adipiscing.
								</th>
								<td className="py-5 px-6">
									<svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
										<path fillRule="evenodd"
											d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
											clipRule="evenodd" />
									</svg>
									<span className="sr-only">Included in Basic</span>
								</td>
								<td className="py-5 px-6">
									<svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
										<path fillRule="evenodd"
											d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
											clipRule="evenodd" />
									</svg>
									<span className="sr-only">Included in Essential</span>
								</td>
								<td className="py-5 px-6">
									<svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
										<path fillRule="evenodd"
											d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
											clipRule="evenodd" />
									</svg>
									<span className="sr-only">Included in Premium</span>
								</td>
							</tr>
							<tr>
								<th className="py-5 pl-6 pr-6 text-sm font-normal text-gray-500 text-left" scope="row">Eget
									risus integer.
								</th>
								<td className="py-5 px-6">
									<svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
										<path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
											clipRule="evenodd" />
									</svg>
									<span className="sr-only">Not included in Basic</span>
								</td>
								<td className="py-5 px-6">
									<svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
										<path fillRule="evenodd"
											d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
											clipRule="evenodd" />
									</svg>
									<span className="sr-only">Included in Essential</span>
								</td>
								<td className="py-5 px-6">
									<svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
										<path fillRule="evenodd"
											d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
											clipRule="evenodd" />
									</svg>
									<span className="sr-only">Included in Premium</span>
								</td>
							</tr>
							<tr>
								<th className="py-5 pl-6 pr-6 text-sm font-normal text-gray-500 text-left" scope="row">Gravida
									leo urna velit.
								</th>
								<td className="py-5 px-6">
									<svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
										<path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
											clipRule="evenodd" />
									</svg>
									<span className="sr-only">Not included in Basic</span>
								</td>
								<td className="py-5 px-6">
									<svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
										<path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
											clipRule="evenodd" />
									</svg>
									<span className="sr-only">Not included in Essential</span>
								</td>
								<td className="py-5 px-6">
									<svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
										<path fillRule="evenodd"
											d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
											clipRule="evenodd" />
									</svg>
									<span className="sr-only">Included in Premium</span>
								</td>
							</tr>
							<tr>
								<th className="py-5 pl-6 pr-6 text-sm font-normal text-gray-500 text-left" scope="row">Elementum
									ut dapibus mi feugiat cras nisl.
								</th>
								<td className="py-5 px-6">
									<svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
										<path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
											clipRule="evenodd" />
									</svg>
									<span className="sr-only">Not included in Basic</span>
								</td>
								<td className="py-5 px-6">
									<svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
										<path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
											clipRule="evenodd" />
									</svg>
									<span className="sr-only">Not included in Essential</span>
								</td>
								<td className="py-5 px-6">
									<svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
										<path fillRule="evenodd"
											d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
											clipRule="evenodd" />
									</svg>
									<span className="sr-only">Included in Premium</span>
								</td>
							</tr>
							<tr>
								<th className="py-3 pl-6 bg-gray-50 text-sm font-medium text-gray-900 text-left" colSpan="4"
									scope="colgroup">Support</th>
							</tr>
							<tr>
								<th className="py-5 pl-6 pr-6 text-sm font-normal text-gray-500 text-left" scope="row">Sit
									dignissim.
								</th>
								<td className="py-5 px-6">
									<svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
										<path fillRule="evenodd"
											d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
											clipRule="evenodd" />
									</svg>
									<span className="sr-only">Included in Basic</span>
								</td>
								<td className="py-5 px-6">
									<svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
										<path fillRule="evenodd"
											d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
											clipRule="evenodd" />
									</svg>
									<span className="sr-only">Included in Essential</span>
								</td>
								<td className="py-5 px-6">
									<svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
										<path fillRule="evenodd"
											d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
											clipRule="evenodd" />
									</svg>
									<span className="sr-only">Included in Premium</span>
								</td>
							</tr>
							<tr>
								<th className="py-5 pl-6 pr-6 text-sm font-normal text-gray-500 text-left" scope="row">Congue at
									nibh et.
								</th>
								<td className="py-5 px-6">
									<svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
										<path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
											clipRule="evenodd" />
									</svg>
									<span className="sr-only">Not included in Basic</span>
								</td>
								<td className="py-5 px-6">
									<svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
										<path fillRule="evenodd"
											d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
											clipRule="evenodd" />
									</svg>
									<span className="sr-only">Included in Essential</span>
								</td>
								<td className="py-5 px-6">
									<svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
										<path fillRule="evenodd"
											d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
											clipRule="evenodd" />
									</svg>
									<span className="sr-only">Included in Premium</span>
								</td>
							</tr>
							<tr>
								<th className="py-5 pl-6 pr-6 text-sm font-normal text-gray-500 text-left" scope="row">Volutpat
									feugiat mattis.
								</th>
								<td className="py-5 px-6">
									<svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
										<path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
											clipRule="evenodd" />
									</svg>
									<span className="sr-only">Not included in Basic</span>
								</td>
								<td className="py-5 px-6">
									<svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
										<path fillRule="evenodd"
											d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
											clipRule="evenodd" />
									</svg>
									<span className="sr-only">Included in Essential</span>
								</td>
								<td className="py-5 px-6">
									<svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
										<path fillRule="evenodd"
											d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
											clipRule="evenodd" />
									</svg>
									<span className="sr-only">Included in Premium</span>
								</td>
							</tr>
							<tr>
								<th className="py-5 pl-6 pr-6 text-sm font-normal text-gray-500 text-left" scope="row">Tristique
									pellentesque ornare diam sapien.
								</th>
								<td className="py-5 px-6">
									<svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
										<path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
											clipRule="evenodd" />
									</svg>
									<span className="sr-only">Not included in Basic</span>
								</td>
								<td className="py-5 px-6">
									<svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
										<path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
											clipRule="evenodd" />
									</svg>
									<span className="sr-only">Not included in Essential</span>
								</td>
								<td className="py-5 px-6">
									<svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
										<path fillRule="evenodd"
											d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
											clipRule="evenodd" />
									</svg>
									<span className="sr-only">Included in Premium</span>
								</td>
							</tr>
						</tbody>
						<tfoot>
							<tr className="border-t border-gray-200">
								<th className="sr-only" scope="row">Choose your plan</th>
								<td className="pt-5 px-6">
									<a href="#"
										className="flex justify-center items-center w-full active:outline outline-tertiary shadow-lg shadow-tertiary/20 font-medium select-none text-sm rounded-lg px-6 py-2.5 bg-tertiary text-brand-tertiary">Buy
									Basic</a>
								</td>
								<td className="pt-5 px-6">
									<a href="#"
										className="flex justify-center items-center w-full active:outline outline-tertiary shadow-lg shadow-tertiary/20 font-medium select-none text-sm rounded-lg px-6 py-2.5 bg-tertiary text-brand-tertiary">Buy
									Essential</a>
								</td>
								<td className="pt-5 px-6">
									<a href="#"
										className="flex justify-center items-center w-full active:outline outline-tertiary shadow-lg shadow-tertiary/20 font-medium select-none text-sm rounded-lg px-6 py-2.5 bg-tertiary text-brand-tertiary">Buy
									Premium</a>
								</td>
							</tr>
						</tfoot>
					</table>
				</div>
			</div>
		</div>
	</div>
}