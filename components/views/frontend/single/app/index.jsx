import React, { useContext } from 'react';
import { useEffect } from 'react';
import { PlanCards } from './plans/plans.jsx';
import { ContextSingleData } from '../index.jsx';

export function SignleApp(){
	const content = useContext(ContextSingleData);

	return <div className={"w-full h-full text-tertiary flex justify-center".classNames()}>
		<div className={"appstore-single-product-wrapper h-full w-full flex flex-col justify-between items-center gap-14 py-10".classNames()}>
			<div className={"flex flex-col items-center justify-center gap-10".classNames()}>
				<img src={content.thumbnail_url} className={"w-36 h-20".classNames()} alt="" />
				<h3>{content.content_name}</h3>
				<p className={"px-3 sm:px-0 text-center sm:text-left".classNames()}>
					{content.content_excerpt}
				</p>

				<div className={"flex justify-between gap-5".classNames()}>
					<a className={"active:animate-bounce active:text-tertiary text-sm select-none bg-tertiary/90 text-brand-tertiary font-semibold py-3 px-6 rounded-full shadow-lg ring-2 ring-tertiary/10".classNames()}>See
						How It Works
					</a>
					<a className={"active:animate-bounce active:text-tertiary text-sm select-none text-tertiary bg-tertiary/10 font-semibold py-3 px-6 rounded-full shadow-lg".classNames()}>See
						Live Preview
					</a>
				</div>
			</div>
			<PlanCards/>
			<div className={"max-w-2xl mx-auto bg-brand-tertiary py-16 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8".classNames()}>
				<div className={"space-y-24 lg:hidden".classNames()}>
					<section>
						<div className={"px-4 mb-8".classNames()}>
							<h2 className={"text-lg leading-6 font-medium text-gray-900".classNames()}>Basic</h2>
						</div>
						<table className={"w-full".classNames()}>
							<caption
								className={"bg-gray-50 border-t border-gray-200 py-3 px-4 text-sm font-medium text-gray-900 text-left".classNames()}>
								Features
							</caption>
							<thead>
								<tr>
									<th className={"sr-only".classNames()} scope="col">Feature</th>
									<th className={"sr-only".classNames()} scope="col">Included</th>
								</tr>
							</thead>
							<tbody className={"divide-y divide-gray-200".classNames()}>
								<tr className={"border-t border-gray-200".classNames()}>
									<th className={"py-5 px-4 text-sm font-normal text-gray-500 text-left".classNames()} scope="row">Molestie
										lobortis massa.
									</th>
									<td className={"py-5 pr-4".classNames()}>
										<svg className={"ml-auto h-5 w-5 text-green-500".classNames()} xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd" />
										</svg>
										<span className={"sr-only".classNames()}>Yes</span>
									</td>
								</tr>
								<tr className={"border-t border-gray-200".classNames()}>
									<th className={"py-5 px-4 text-sm font-normal text-gray-500 text-left".classNames()} scope="row">Urna purus
										felis.
									</th>
									<td className={"py-5 pr-4".classNames()}>
										<svg className={"ml-auto h-5 w-5 text-green-500".classNames()} xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd" />
										</svg>
										<span className={"sr-only".classNames()}>Yes</span>
									</td>
								</tr>
								<tr className={"border-t border-gray-200".classNames()}>
									<th className={"py-5 px-4 text-sm font-normal text-gray-500 text-left".classNames()} scope="row">Tellus
										pulvinar sit dictum.
									</th>
									<td className={"py-5 pr-4".classNames()}>
										<svg className={"ml-auto h-5 w-5 text-gray-400".classNames()} xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
												clipRule="evenodd" />
										</svg>
										<span className={"sr-only".classNames()}>No</span>
									</td>
								</tr>
								<tr className={"border-t border-gray-200".classNames()}>
									<th className={"py-5 px-4 text-sm font-normal text-gray-500 text-left".classNames()} scope="row">Convallis.
									</th>
									<td className={"py-5 pr-4".classNames()}>
										<svg className={"ml-auto h-5 w-5 text-gray-400".classNames()} xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
												clipRule="evenodd" />
										</svg>
										<span className={"sr-only".classNames()}>No</span>
									</td>
								</tr>
							</tbody>
						</table>
						<table className={"w-full".classNames()}>
							<caption
								className={"bg-gray-50 border-t border-gray-200 py-3 px-4 text-sm font-medium text-gray-900 text-left".classNames()}>
								Reporting
							</caption>
							<thead>
								<tr>
									<th className={"sr-only".classNames()} scope="col">Feature</th>
									<th className={"sr-only".classNames()} scope="col">Included</th>
								</tr>
							</thead>
							<tbody className={"divide-y divide-gray-200".classNames()}>
								<tr className={"border-t border-gray-200".classNames()}>
									<th className={"py-5 px-4 text-sm font-normal text-gray-500 text-left".classNames()} scope="row">
										Adipiscing.
									</th>
									<td className={"py-5 pr-4".classNames()}>
										<svg className={"ml-auto h-5 w-5 text-green-500".classNames()} xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd" />
										</svg>
										<span className={"sr-only".classNames()}>Yes</span>
									</td>
								</tr>
								<tr className={"border-t border-gray-200".classNames()}>
									<th className={"py-5 px-4 text-sm font-normal text-gray-500 text-left".classNames()} scope="row">Eget risus
										integer.
									</th>
									<td className={"py-5 pr-4".classNames()}>
										<svg className={"ml-auto h-5 w-5 text-gray-400".classNames()} xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
												clipRule="evenodd" />
										</svg>
										<span className={"sr-only".classNames()}>No</span>
									</td>
								</tr>
								<tr className={"border-t border-gray-200".classNames()}>
									<th className={"py-5 px-4 text-sm font-normal text-gray-500 text-left".classNames()} scope="row">Gravida
										leo urna velit.
									</th>
									<td className={"py-5 pr-4".classNames()}>
										<svg className={"ml-auto h-5 w-5 text-gray-400".classNames()} xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
												clipRule="evenodd" />
										</svg>
										<span className={"sr-only".classNames()}>No</span>
									</td>
								</tr>
								<tr className={"border-t border-gray-200".classNames()}>
									<th className={"py-5 px-4 text-sm font-normal text-gray-500 text-left".classNames()} scope="row">Elementum
										ut dapibus mi feugiat cras nisl.
									</th>
									<td className={"py-5 pr-4".classNames()}>
										<svg className={"ml-auto h-5 w-5 text-gray-400".classNames()} xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
												clipRule="evenodd" />
										</svg>
										<span className={"sr-only".classNames()}>No</span>
									</td>
								</tr>
							</tbody>
						</table>
						<table className={"w-full".classNames()}>
							<caption
								className={"bg-gray-50 border-t border-gray-200 py-3 px-4 text-sm font-medium text-gray-900 text-left".classNames()}>
								Support
							</caption>
							<thead>
								<tr>
									<th className={"sr-only".classNames()} scope="col">Feature</th>
									<th className={"sr-only".classNames()} scope="col">Included</th>
								</tr>
							</thead>
							<tbody className={"divide-y divide-gray-200".classNames()}>
								<tr className={"border-t border-gray-200".classNames()}>
									<th className={"py-5 px-4 text-sm font-normal text-gray-500 text-left".classNames()} scope="row">Sit
										dignissim.
									</th>
									<td className={"py-5 pr-4".classNames()}>
										<svg className={"ml-auto h-5 w-5 text-green-500".classNames()} xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd" />
										</svg>
										<span className={"sr-only".classNames()}>Yes</span>
									</td>
								</tr>
								<tr className={"border-t border-gray-200".classNames()}>
									<th className={"py-5 px-4 text-sm font-normal text-gray-500 text-left".classNames()} scope="row">Congue at
										nibh et.
									</th>
									<td className={"py-5 pr-4".classNames()}>
										<svg className={"ml-auto h-5 w-5 text-gray-400".classNames()} xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
												clipRule="evenodd" />
										</svg>
										<span className={"sr-only".classNames()}>No</span>
									</td>
								</tr>
								<tr className={"border-t border-gray-200".classNames()}>
									<th className={"py-5 px-4 text-sm font-normal text-gray-500 text-left".classNames()} scope="row">Volutpat
										feugiat mattis.
									</th>
									<td className={"py-5 pr-4".classNames()}>
										<svg className={"ml-auto h-5 w-5 text-gray-400".classNames()} xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
												clipRule="evenodd" />
										</svg>
										<span className={"sr-only".classNames()}>No</span>
									</td>
								</tr>
								<tr className={"border-t border-gray-200".classNames()}>
									<th className={"py-5 px-4 text-sm font-normal text-gray-500 text-left".classNames()} scope="row">Tristique
										pellentesque ornare diam sapien.
									</th>
									<td className={"py-5 pr-4".classNames()}>
										<svg className={"ml-auto h-5 w-5 text-gray-400".classNames()} xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
												clipRule="evenodd" />
										</svg>
										<span className={"sr-only".classNames()}>No</span>
									</td>
								</tr>
							</tbody>
						</table>
						<div className={"border-t border-gray-200 px-4 pt-5".classNames()}>
							<a href="#"
								className={"flex justify-center items-center w-full active:outline outline-tertiary shadow-lg shadow-tertiary/20 font-medium select-none text-sm rounded-lg px-6 py-2.5 bg-tertiary text-brand-tertiary".classNames()}>Buy
							Basic</a>
						</div>
					</section>
					<section>
						<div className={"px-4 mb-8".classNames()}>
							<h2 className={"text-lg leading-6 font-medium text-gray-900".classNames()}>Essential</h2>
						</div>
						<table className={"w-full".classNames()}>
							<caption
								className={"bg-gray-50 border-t border-gray-200 py-3 px-4 text-sm font-medium text-gray-900 text-left".classNames()}>
								Features
							</caption>
							<thead>
								<tr>
									<th className={"sr-only".classNames()} scope="col">Feature</th>
									<th className={"sr-only".classNames()} scope="col">Included</th>
								</tr>
							</thead>
							<tbody className={"divide-y divide-gray-200".classNames()}>
								<tr className={"border-t border-gray-200".classNames()}>
									<th className={"py-5 px-4 text-sm font-normal text-gray-500 text-left".classNames()} scope="row">Molestie
										lobortis massa.
									</th>
									<td className={"py-5 pr-4".classNames()}>
										<svg className={"ml-auto h-5 w-5 text-green-500".classNames()} xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd" />
										</svg>
										<span className={"sr-only".classNames()}>Yes</span>
									</td>
								</tr>
								<tr className={"border-t border-gray-200".classNames()}>
									<th className={"py-5 px-4 text-sm font-normal text-gray-500 text-left".classNames()} scope="row">Urna purus
										felis.
									</th>
									<td className={"py-5 pr-4".classNames()}>
										<svg className={"ml-auto h-5 w-5 text-green-500".classNames()} xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd" />
										</svg>
										<span className={"sr-only".classNames()}>Yes</span>
									</td>
								</tr>
								<tr className={"border-t border-gray-200".classNames()}>
									<th className={"py-5 px-4 text-sm font-normal text-gray-500 text-left".classNames()} scope="row">Tellus
										pulvinar sit dictum.
									</th>
									<td className={"py-5 pr-4".classNames()}>
										<svg className={"ml-auto h-5 w-5 text-green-500".classNames()} xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd" />
										</svg>
										<span className={"sr-only".classNames()}>Yes</span>
									</td>
								</tr>
								<tr className={"border-t border-gray-200".classNames()}>
									<th className={"py-5 px-4 text-sm font-normal text-gray-500 text-left".classNames()} scope="row">Convallis.
									</th>
									<td className={"py-5 pr-4".classNames()}>
										<span className={"block text-sm text-gray-700 text-right".classNames()}>Up to 20 users</span>
									</td>
								</tr>
							</tbody>
						</table>
						<table className={"w-full".classNames()}>
							<caption
								className={"bg-gray-50 border-t border-gray-200 py-3 px-4 text-sm font-medium text-gray-900 text-left".classNames()}>
								Reporting
							</caption>
							<thead>
								<tr>
									<th className={"sr-only".classNames()} scope="col">Feature</th>
									<th className={"sr-only".classNames()} scope="col">Included</th>
								</tr>
							</thead>
							<tbody className={"divide-y divide-gray-200".classNames()}>
								<tr className={"border-t border-gray-200".classNames()}>
									<th className={"py-5 px-4 text-sm font-normal text-gray-500 text-left".classNames()} scope="row">
										Adipiscing.
									</th>
									<td className={"py-5 pr-4".classNames()}>
										<svg className={"ml-auto h-5 w-5 text-green-500".classNames()} xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd" />
										</svg>
										<span className={"sr-only".classNames()}>Yes</span>
									</td>
								</tr>
								<tr className={"border-t border-gray-200".classNames()}>
									<th className={"py-5 px-4 text-sm font-normal text-gray-500 text-left".classNames()} scope="row">Eget risus
										integer.
									</th>
									<td className={"py-5 pr-4".classNames()}>
										<svg className={"ml-auto h-5 w-5 text-green-500".classNames()} xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd" />
										</svg>
										<span className={"sr-only".classNames()}>Yes</span>
									</td>
								</tr>
								<tr className={"border-t border-gray-200".classNames()}>
									<th className={"py-5 px-4 text-sm font-normal text-gray-500 text-left".classNames()} scope="row">Gravida
										leo urna velit.
									</th>
									<td className={"py-5 pr-4".classNames()}>
										<svg className={"ml-auto h-5 w-5 text-gray-400".classNames()} xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
												clipRule="evenodd" />
										</svg>
										<span className={"sr-only".classNames()}>No</span>
									</td>
								</tr>
								<tr className={"border-t border-gray-200".classNames()}>
									<th className={"py-5 px-4 text-sm font-normal text-gray-500 text-left".classNames()} scope="row">Elementum
										ut dapibus mi feugiat cras nisl.
									</th>
									<td className={"py-5 pr-4".classNames()}>
										<svg className={"ml-auto h-5 w-5 text-gray-400".classNames()} xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
												clipRule="evenodd" />
										</svg>
										<span className={"sr-only".classNames()}>No</span>
									</td>
								</tr>
							</tbody>
						</table>
						<table className={"w-full".classNames()}>
							<caption
								className={"bg-gray-50 border-t border-gray-200 py-3 px-4 text-sm font-medium text-gray-900 text-left".classNames()}>
								Support
							</caption>
							<thead>
								<tr>
									<th className={"sr-only".classNames()} scope="col">Feature</th>
									<th className={"sr-only".classNames()} scope="col">Included</th>
								</tr>
							</thead>
							<tbody className={"divide-y divide-gray-200".classNames()}>
								<tr className={"border-t border-gray-200".classNames()}>
									<th className={"py-5 px-4 text-sm font-normal text-gray-500 text-left".classNames()} scope="row">Sit
										dignissim.
									</th>
									<td className={"py-5 pr-4".classNames()}>
										<svg className={"ml-auto h-5 w-5 text-green-500".classNames()} xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd" />
										</svg>
										<span className={"sr-only".classNames()}>Yes</span>
									</td>
								</tr>
								<tr className={"border-t border-gray-200".classNames()}>
									<th className={"py-5 px-4 text-sm font-normal text-gray-500 text-left".classNames()} scope="row">Congue at
										nibh et.
									</th>
									<td className={"py-5 pr-4".classNames()}>
										<svg className={"ml-auto h-5 w-5 text-green-500".classNames()} xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd" />
										</svg>
										<span className={"sr-only".classNames()}>Yes</span>
									</td>
								</tr>
								<tr className={"border-t border-gray-200".classNames()}>
									<th className={"py-5 px-4 text-sm font-normal text-gray-500 text-left".classNames()} scope="row">Volutpat
										feugiat mattis.
									</th>
									<td className={"py-5 pr-4".classNames()}>
										<svg className={"ml-auto h-5 w-5 text-green-500".classNames()} xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd" />
										</svg>
										<span className={"sr-only".classNames()}>Yes</span>
									</td>
								</tr>
								<tr className={"border-t border-gray-200".classNames()}>
									<th className={"py-5 px-4 text-sm font-normal text-gray-500 text-left".classNames()} scope="row">Tristique
										pellentesque ornare diam sapien.
									</th>
									<td className={"py-5 pr-4".classNames()}>
										<svg className={"ml-auto h-5 w-5 text-gray-400".classNames()} xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
												clipRule="evenodd" />
										</svg>
										<span className={"sr-only".classNames()}>No</span>
									</td>
								</tr>
							</tbody>
						</table>
						<div className={"border-t border-gray-200 px-4 pt-5".classNames()}>
							<a href="#"
								className={"flex justify-center items-center w-full active:outline outline-tertiary shadow-lg shadow-tertiary/20 font-medium select-none text-sm rounded-lg px-6 py-2.5 bg-tertiary text-brand-tertiary".classNames()}>Buy
							Essential</a>
						</div>
					</section>
					<section>
						<div className={"px-4 mb-8".classNames()}>
							<h2 className={"text-lg leading-6 font-medium text-gray-900".classNames()}>Premium</h2>
						</div>
						<table className={"w-full".classNames()}>
							<caption
								className={"bg-gray-50 border-t border-gray-200 py-3 px-4 text-sm font-medium text-gray-900 text-left".classNames()}>
								Features
							</caption>
							<thead>
								<tr>
									<th className={"sr-only".classNames()} scope="col">Feature</th>
									<th className={"sr-only".classNames()} scope="col">Included</th>
								</tr>
							</thead>
							<tbody className={"divide-y divide-gray-200".classNames()}>
								<tr className={"border-t border-gray-200".classNames()}>
									<th className={"py-5 px-4 text-sm font-normal text-gray-500 text-left".classNames()} scope="row">Molestie
										lobortis massa.
									</th>
									<td className={"py-5 pr-4".classNames()}>
										<svg className={"ml-auto h-5 w-5 text-green-500".classNames()} xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd" />
										</svg>
										<span className={"sr-only".classNames()}>Yes</span>
									</td>
								</tr>
								<tr className={"border-t border-gray-200".classNames()}>
									<th className={"py-5 px-4 text-sm font-normal text-gray-500 text-left".classNames()} scope="row">Urna purus
										felis.
									</th>
									<td className={"py-5 pr-4".classNames()}>
										<svg className={"ml-auto h-5 w-5 text-green-500".classNames()} xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd" />
										</svg>
										<span className={"sr-only".classNames()}>Yes</span>
									</td>
								</tr>
								<tr className={"border-t border-gray-200".classNames()}>
									<th className={"py-5 px-4 text-sm font-normal text-gray-500 text-left".classNames()} scope="row">Tellus
										pulvinar sit dictum.
									</th>
									<td className={"py-5 pr-4".classNames()}>
										<svg className={"ml-auto h-5 w-5 text-green-500".classNames()} xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd" />
										</svg>
										<span className={"sr-only".classNames()}>Yes</span>
									</td>
								</tr>
								<tr className={"border-t border-gray-200".classNames()}>
									<th className={"py-5 px-4 text-sm font-normal text-gray-500 text-left".classNames()} scope="row">Convallis.
									</th>
									<td className={"py-5 pr-4".classNames()}>
										<span className={"block text-sm text-gray-700 text-right".classNames()}>Up to 50 users</span>
									</td>
								</tr>
							</tbody>
						</table>
						<table className={"w-full".classNames()}>
							<caption
								className={"bg-gray-50 border-t border-gray-200 py-3 px-4 text-sm font-medium text-gray-900 text-left".classNames()}>
								Reporting
							</caption>
							<thead>
								<tr>
									<th className={"sr-only".classNames()} scope="col">Feature</th>
									<th className={"sr-only".classNames()} scope="col">Included</th>
								</tr>
							</thead>
							<tbody className={"divide-y divide-gray-200".classNames()}>
								<tr className={"border-t border-gray-200".classNames()}>
									<th className={"py-5 px-4 text-sm font-normal text-gray-500 text-left".classNames()} scope="row">
										Adipiscing.
									</th>
									<td className={"py-5 pr-4".classNames()}>
										<svg className={"ml-auto h-5 w-5 text-green-500".classNames()} xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd" />
										</svg>
										<span className={"sr-only".classNames()}>Yes</span>
									</td>
								</tr>
								<tr className={"border-t border-gray-200".classNames()}>
									<th className={"py-5 px-4 text-sm font-normal text-gray-500 text-left".classNames()} scope="row">Eget risus
										integer.
									</th>
									<td className={"py-5 pr-4".classNames()}>
										<svg className={"ml-auto h-5 w-5 text-green-500".classNames()} xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd" />
										</svg>
										<span className={"sr-only".classNames()}>Yes</span>
									</td>
								</tr>
								<tr className={"border-t border-gray-200".classNames()}>
									<th className={"py-5 px-4 text-sm font-normal text-gray-500 text-left".classNames()} scope="row">Gravida
										leo urna velit.
									</th>
									<td className={"py-5 pr-4".classNames()}>
										<svg className={"ml-auto h-5 w-5 text-green-500".classNames()} xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd" />
										</svg>
										<span className={"sr-only".classNames()}>Yes</span>
									</td>
								</tr>
								<tr className={"border-t border-gray-200".classNames()}>
									<th className={"py-5 px-4 text-sm font-normal text-gray-500 text-left".classNames()} scope="row">Elementum
										ut dapibus mi feugiat cras nisl.
									</th>
									<td className={"py-5 pr-4".classNames()}>
										<svg className={"ml-auto h-5 w-5 text-green-500".classNames()} xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd" />
										</svg>
										<span className={"sr-only".classNames()}>Yes</span>
									</td>
								</tr>
							</tbody>
						</table>
						<table className={"w-full".classNames()}>
							<caption
								className={"bg-gray-50 border-t border-gray-200 py-3 px-4 text-sm font-medium text-gray-900 text-left".classNames()}>
								Support
							</caption>
							<thead>
								<tr>
									<th className={"sr-only".classNames()} scope="col">Feature</th>
									<th className={"sr-only".classNames()} scope="col">Included</th>
								</tr>
							</thead>
							<tbody className={"divide-y divide-gray-200".classNames()}>
								<tr className={"border-t border-gray-200".classNames()}>
									<th className={"py-5 px-4 text-sm font-normal text-gray-500 text-left".classNames()} scope="row">Sit
										dignissim.
									</th>
									<td className={"py-5 pr-4".classNames()}>
										<svg className={"ml-auto h-5 w-5 text-green-500".classNames()} xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd" />
										</svg>
										<span className={"sr-only".classNames()}>Yes</span>
									</td>
								</tr>
								<tr className={"border-t border-gray-200".classNames()}>
									<th className={"py-5 px-4 text-sm font-normal text-gray-500 text-left".classNames()} scope="row">Congue at
										nibh et.
									</th>
									<td className={"py-5 pr-4".classNames()}>
										<svg className={"ml-auto h-5 w-5 text-green-500".classNames()} xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd" />
										</svg>
										<span className={"sr-only".classNames()}>Yes</span>
									</td>
								</tr>
								<tr className={"border-t border-gray-200".classNames()}>
									<th className={"py-5 px-4 text-sm font-normal text-gray-500 text-left".classNames()} scope="row">Volutpat
										feugiat mattis.
									</th>
									<td className={"py-5 pr-4".classNames()}>
										<svg className={"ml-auto h-5 w-5 text-green-500".classNames()} xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd" />
										</svg>
										<span className={"sr-only".classNames()}>Yes</span>
									</td>
								</tr>
								<tr className={"border-t border-gray-200".classNames()}>
									<th className={"py-5 px-4 text-sm font-normal text-gray-500 text-left".classNames()} scope="row">Tristique
										pellentesque ornare diam sapien.
									</th>
									<td className={"py-5 pr-4".classNames()}>
										<svg className={"ml-auto h-5 w-5 text-green-500".classNames()} xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd" />
										</svg>
										<span className={"sr-only".classNames()}>Yes</span>
									</td>
								</tr>
							</tbody>
						</table>
						<div className={"border-t border-gray-200 px-4 pt-5".classNames()}>
							<a href="#"
								className={"flex justify-center items-center w-full active:outline outline-tertiary shadow-lg shadow-tertiary/20 font-medium select-none text-sm rounded-lg px-6 py-2.5 bg-tertiary text-brand-tertiary".classNames()}>Buy
							Premium</a>
						</div>
					</section>
				</div>
				<div className={"hidden lg:block".classNames()}>
					<table className={"w-full h-px table-fixed".classNames()}>
						<caption className={"sr-only".classNames()}>
							Pricing plan comparison
						</caption>
						<thead>
							<tr>
								<th className={"pb-4 pl-6 pr-6 text-sm font-medium text-gray-900 text-left".classNames()} scope="col">
									<span className={"sr-only".classNames()}>Feature by</span>
									<span>Plans</span>
								</th>
								<th className={"w-1/4 pb-4 px-6 text-lg leading-6 font-medium text-gray-900 text-left".classNames()}
									scope="col">Basic</th>
								<th className={"w-1/4 pb-4 px-6 text-lg leading-6 font-medium text-gray-900 text-left".classNames()}
									scope="col">Essential</th>
								<th className={"w-1/4 pb-4 px-6 text-lg leading-6 font-medium text-gray-900 text-left".classNames()}
									scope="col">Premium</th>
							</tr>
						</thead>
						<tbody className={"border-t border-gray-200 divide-y divide-gray-200".classNames()}>
							<tr>
								<th className={"py-3 pl-6 bg-gray-50 text-sm font-medium text-gray-900 text-left".classNames()} colSpan="4"
									scope="colgroup">Features</th>
							</tr>
							<tr>
								<th className={"py-5 pl-6 pr-6 text-sm font-normal text-gray-500 text-left".classNames()} scope="row">Molestie
									lobortis massa.
								</th>
								<td className={"py-5 px-6".classNames()}>
									<svg className={"h-5 w-5 text-green-500".classNames()} xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
										<path fillRule="evenodd"
											d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
											clipRule="evenodd" />
									</svg>
									<span className={"sr-only".classNames()}>Included in Basic</span>
								</td>
								<td className={"py-5 px-6".classNames()}>
									<svg className={"h-5 w-5 text-green-500".classNames()} xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
										<path fillRule="evenodd"
											d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
											clipRule="evenodd" />
									</svg>
									<span className={"sr-only".classNames()}>Included in Essential</span>
								</td>
								<td className={"py-5 px-6".classNames()}>
									<svg className={"h-5 w-5 text-green-500".classNames()} xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
										<path fillRule="evenodd"
											d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
											clipRule="evenodd" />
									</svg>
									<span className={"sr-only".classNames()}>Included in Premium</span>
								</td>
							</tr>
							<tr>
								<th className={"py-5 pl-6 pr-6 text-sm font-normal text-gray-500 text-left".classNames()} scope="row">Urna
									purus felis.
								</th>
								<td className={"py-5 px-6".classNames()}>
									<svg className={"h-5 w-5 text-green-500".classNames()} xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
										<path fillRule="evenodd"
											d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
											clipRule="evenodd" />
									</svg>
									<span className={"sr-only".classNames()}>Included in Basic</span>
								</td>
								<td className={"py-5 px-6".classNames()}>
									<svg className={"h-5 w-5 text-green-500".classNames()} xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
										<path fillRule="evenodd"
											d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
											clipRule="evenodd" />
									</svg>
									<span className={"sr-only".classNames()}>Included in Essential</span>
								</td>
								<td className={"py-5 px-6".classNames()}>
									<svg className={"h-5 w-5 text-green-500".classNames()} xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
										<path fillRule="evenodd"
											d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
											clipRule="evenodd" />
									</svg>
									<span className={"sr-only".classNames()}>Included in Premium</span>
								</td>
							</tr>
							<tr>
								<th className={"py-5 pl-6 pr-6 text-sm font-normal text-gray-500 text-left".classNames()} scope="row">Tellus
									pulvinar sit dictum.
								</th>
								<td className={"py-5 px-6".classNames()}>
									<svg className={"h-5 w-5 text-gray-400".classNames()} xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
										<path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
											clipRule="evenodd" />
									</svg>
									<span className={"sr-only".classNames()}>Not included in Basic</span>
								</td>
								<td className={"py-5 px-6".classNames()}>
									<svg className={"h-5 w-5 text-green-500".classNames()} xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
										<path fillRule="evenodd"
											d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
											clipRule="evenodd" />
									</svg>
									<span className={"sr-only".classNames()}>Included in Essential</span>
								</td>
								<td className={"py-5 px-6".classNames()}>
									<svg className={"h-5 w-5 text-green-500".classNames()} xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
										<path fillRule="evenodd"
											d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
											clipRule="evenodd" />
									</svg>
									<span className={"sr-only".classNames()}>Included in Premium</span>
								</td>
							</tr>
							<tr>
								<th className={"py-5 pl-6 pr-6 text-sm font-normal text-gray-500 text-left".classNames()} scope="row">
									Convallis.
								</th>
								<td className={"py-5 px-6".classNames()}>
									<svg className={"h-5 w-5 text-gray-400".classNames()} xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
										<path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
											clipRule="evenodd" />
									</svg>
									<span className={"sr-only".classNames()}>Not included in Basic</span>
								</td>
								<td className={"py-5 px-6".classNames()}>
									<span className={"block text-sm text-gray-700".classNames()}>Up to 20 users</span>
								</td>
								<td className={"py-5 px-6".classNames()}>
									<span className={"block text-sm text-gray-700".classNames()}>Up to 50 users</span>
								</td>
							</tr>
							<tr>
								<th className={"py-3 pl-6 bg-gray-50 text-sm font-medium text-gray-900 text-left".classNames()} colSpan="4"
									scope="colgroup">Reporting</th>
							</tr>
							<tr>
								<th className={"py-5 pl-6 pr-6 text-sm font-normal text-gray-500 text-left".classNames()} scope="row">
									Adipiscing.
								</th>
								<td className={"py-5 px-6".classNames()}>
									<svg className={"h-5 w-5 text-green-500".classNames()} xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
										<path fillRule="evenodd"
											d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
											clipRule="evenodd" />
									</svg>
									<span className={"sr-only".classNames()}>Included in Basic</span>
								</td>
								<td className={"py-5 px-6".classNames()}>
									<svg className={"h-5 w-5 text-green-500".classNames()} xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
										<path fillRule="evenodd"
											d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
											clipRule="evenodd" />
									</svg>
									<span className={"sr-only".classNames()}>Included in Essential</span>
								</td>
								<td className={"py-5 px-6".classNames()}>
									<svg className={"h-5 w-5 text-green-500".classNames()} xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
										<path fillRule="evenodd"
											d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
											clipRule="evenodd" />
									</svg>
									<span className={"sr-only".classNames()}>Included in Premium</span>
								</td>
							</tr>
							<tr>
								<th className={"py-5 pl-6 pr-6 text-sm font-normal text-gray-500 text-left".classNames()} scope="row">Eget
									risus integer.
								</th>
								<td className={"py-5 px-6".classNames()}>
									<svg className={"h-5 w-5 text-gray-400".classNames()} xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
										<path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
											clipRule="evenodd" />
									</svg>
									<span className={"sr-only".classNames()}>Not included in Basic</span>
								</td>
								<td className={"py-5 px-6".classNames()}>
									<svg className={"h-5 w-5 text-green-500".classNames()} xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
										<path fillRule="evenodd"
											d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
											clipRule="evenodd" />
									</svg>
									<span className={"sr-only".classNames()}>Included in Essential</span>
								</td>
								<td className={"py-5 px-6".classNames()}>
									<svg className={"h-5 w-5 text-green-500".classNames()} xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
										<path fillRule="evenodd"
											d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
											clipRule="evenodd" />
									</svg>
									<span className={"sr-only".classNames()}>Included in Premium</span>
								</td>
							</tr>
							<tr>
								<th className={"py-5 pl-6 pr-6 text-sm font-normal text-gray-500 text-left".classNames()} scope="row">Gravida
									leo urna velit.
								</th>
								<td className={"py-5 px-6".classNames()}>
									<svg className={"h-5 w-5 text-gray-400".classNames()} xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
										<path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
											clipRule="evenodd" />
									</svg>
									<span className={"sr-only".classNames()}>Not included in Basic</span>
								</td>
								<td className={"py-5 px-6".classNames()}>
									<svg className={"h-5 w-5 text-gray-400".classNames()} xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
										<path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
											clipRule="evenodd" />
									</svg>
									<span className={"sr-only".classNames()}>Not included in Essential</span>
								</td>
								<td className={"py-5 px-6".classNames()}>
									<svg className={"h-5 w-5 text-green-500".classNames()} xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
										<path fillRule="evenodd"
											d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
											clipRule="evenodd" />
									</svg>
									<span className={"sr-only".classNames()}>Included in Premium</span>
								</td>
							</tr>
							<tr>
								<th className={"py-5 pl-6 pr-6 text-sm font-normal text-gray-500 text-left".classNames()} scope="row">Elementum
									ut dapibus mi feugiat cras nisl.
								</th>
								<td className={"py-5 px-6".classNames()}>
									<svg className={"h-5 w-5 text-gray-400".classNames()} xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
										<path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
											clipRule="evenodd" />
									</svg>
									<span className={"sr-only".classNames()}>Not included in Basic</span>
								</td>
								<td className={"py-5 px-6".classNames()}>
									<svg className={"h-5 w-5 text-gray-400".classNames()} xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
										<path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
											clipRule="evenodd" />
									</svg>
									<span className={"sr-only".classNames()}>Not included in Essential</span>
								</td>
								<td className={"py-5 px-6".classNames()}>
									<svg className={"h-5 w-5 text-green-500".classNames()} xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
										<path fillRule="evenodd"
											d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
											clipRule="evenodd" />
									</svg>
									<span className={"sr-only".classNames()}>Included in Premium</span>
								</td>
							</tr>
							<tr>
								<th className={"py-3 pl-6 bg-gray-50 text-sm font-medium text-gray-900 text-left".classNames()} colSpan="4"
									scope="colgroup">Support</th>
							</tr>
							<tr>
								<th className={"py-5 pl-6 pr-6 text-sm font-normal text-gray-500 text-left".classNames()} scope="row">Sit
									dignissim.
								</th>
								<td className={"py-5 px-6".classNames()}>
									<svg className={"h-5 w-5 text-green-500".classNames()} xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
										<path fillRule="evenodd"
											d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
											clipRule="evenodd" />
									</svg>
									<span className={"sr-only".classNames()}>Included in Basic</span>
								</td>
								<td className={"py-5 px-6".classNames()}>
									<svg className={"h-5 w-5 text-green-500".classNames()} xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
										<path fillRule="evenodd"
											d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
											clipRule="evenodd" />
									</svg>
									<span className={"sr-only".classNames()}>Included in Essential</span>
								</td>
								<td className={"py-5 px-6".classNames()}>
									<svg className={"h-5 w-5 text-green-500".classNames()} xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
										<path fillRule="evenodd"
											d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
											clipRule="evenodd" />
									</svg>
									<span className={"sr-only".classNames()}>Included in Premium</span>
								</td>
							</tr>
							<tr>
								<th className={"py-5 pl-6 pr-6 text-sm font-normal text-gray-500 text-left".classNames()} scope="row">Congue at
									nibh et.
								</th>
								<td className={"py-5 px-6".classNames()}>
									<svg className={"h-5 w-5 text-gray-400".classNames()} xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
										<path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
											clipRule="evenodd" />
									</svg>
									<span className={"sr-only".classNames()}>Not included in Basic</span>
								</td>
								<td className={"py-5 px-6".classNames()}>
									<svg className={"h-5 w-5 text-green-500".classNames()} xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
										<path fillRule="evenodd"
											d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
											clipRule="evenodd" />
									</svg>
									<span className={"sr-only".classNames()}>Included in Essential</span>
								</td>
								<td className={"py-5 px-6".classNames()}>
									<svg className={"h-5 w-5 text-green-500".classNames()} xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
										<path fillRule="evenodd"
											d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
											clipRule="evenodd" />
									</svg>
									<span className={"sr-only".classNames()}>Included in Premium</span>
								</td>
							</tr>
							<tr>
								<th className={"py-5 pl-6 pr-6 text-sm font-normal text-gray-500 text-left".classNames()} scope="row">Volutpat
									feugiat mattis.
								</th>
								<td className={"py-5 px-6".classNames()}>
									<svg className={"h-5 w-5 text-gray-400".classNames()} xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
										<path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
											clipRule="evenodd" />
									</svg>
									<span className={"sr-only".classNames()}>Not included in Basic</span>
								</td>
								<td className={"py-5 px-6".classNames()}>
									<svg className={"h-5 w-5 text-green-500".classNames()} xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
										<path fillRule="evenodd"
											d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
											clipRule="evenodd" />
									</svg>
									<span className={"sr-only".classNames()}>Included in Essential</span>
								</td>
								<td className={"py-5 px-6".classNames()}>
									<svg className={"h-5 w-5 text-green-500".classNames()} xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
										<path fillRule="evenodd"
											d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
											clipRule="evenodd" />
									</svg>
									<span className={"sr-only".classNames()}>Included in Premium</span>
								</td>
							</tr>
							<tr>
								<th className={"py-5 pl-6 pr-6 text-sm font-normal text-gray-500 text-left".classNames()} scope="row">Tristique
									pellentesque ornare diam sapien.
								</th>
								<td className={"py-5 px-6".classNames()}>
									<svg className={"h-5 w-5 text-gray-400".classNames()} xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
										<path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
											clipRule="evenodd" />
									</svg>
									<span className={"sr-only".classNames()}>Not included in Basic</span>
								</td>
								<td className={"py-5 px-6".classNames()}>
									<svg className={"h-5 w-5 text-gray-400".classNames()} xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
										<path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
											clipRule="evenodd" />
									</svg>
									<span className={"sr-only".classNames()}>Not included in Essential</span>
								</td>
								<td className={"py-5 px-6".classNames()}>
									<svg className={"h-5 w-5 text-green-500".classNames()} xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
										<path fillRule="evenodd"
											d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
											clipRule="evenodd" />
									</svg>
									<span className={"sr-only".classNames()}>Included in Premium</span>
								</td>
							</tr>
						</tbody>
						<tfoot>
							<tr className={"border-t border-gray-200".classNames()}>
								<th className={"sr-only".classNames()} scope="row">Choose your plan</th>
								<td className={"pt-5 px-6".classNames()}>
									<a href="#"
										className={"flex justify-center items-center w-full active:outline outline-tertiary shadow-lg shadow-tertiary/20 font-medium select-none text-sm rounded-lg px-6 py-2.5 bg-tertiary text-brand-tertiary".classNames()}>Buy
									Basic</a>
								</td>
								<td className={"pt-5 px-6".classNames()}>
									<a href="#"
										className={"flex justify-center items-center w-full active:outline outline-tertiary shadow-lg shadow-tertiary/20 font-medium select-none text-sm rounded-lg px-6 py-2.5 bg-tertiary text-brand-tertiary".classNames()}>Buy
									Essential</a>
								</td>
								<td className={"pt-5 px-6".classNames()}>
									<a href="#"
										className={"flex justify-center items-center w-full active:outline outline-tertiary shadow-lg shadow-tertiary/20 font-medium select-none text-sm rounded-lg px-6 py-2.5 bg-tertiary text-brand-tertiary".classNames()}>Buy
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

