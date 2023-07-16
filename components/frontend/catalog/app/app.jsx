import React from 'react';

export function AppCatalog() {
	 // sort-menu-dropdown
    function onClickFilterBtn() {
        const filtersElement = document.querySelector("button#filter-btn");
        const filtersPannel = document.querySelector("#filters-pannel")
        const filtersPannelClassList = filtersPannel.classList;
        filtersPannelClassList.toggle("hidden")
        if (JSON.parse(filtersElement.ariaExpanded)) {
            filtersElement.ariaExpanded = `false`
        } else {
            filtersElement.ariaExpanded = `true`
        }
    }

    function onClickSortMenuBtn() {
        const sortMenuElement = document.querySelector("#sort-menu");
        const sortMenuDropdown = document.querySelector("#sort-menu-dropdown")
        const sortMenuDropdownClassList = sortMenuDropdown.classList;
        sortMenuDropdownClassList.toggle("hidden")
        if (JSON.parse(sortMenuElement.ariaExpanded)) {
            sortMenuElement.ariaExpanded = `false`
        } else {
            sortMenuElement.ariaExpanded = `true`
        }
        console.log({
            sortMenuElement,
            expanded: JSON.parse(sortMenuElement.ariaExpanded)
        })
    }
	
	return <div className={"w-full h-full bg-content-bg text-tertiary flex justify-center".classNames()}>
		<div className={"appstore-special-catalog-wrapper".classNames()}>
			<div>
				<div className={"fixed inset-0 flex z-40 lg:hidden".classNames()} role="dialog" aria-modal="true">
					<div className={"fixed inset-0 bg-black bg-opacity-25".classNames()} aria-hidden="true"></div>
					<div
					className={"ml-auto relative max-w-xs w-full h-full bg-transparent shadow-xl py-4 pb-12 flex flex-col overflow-y-auto".classNames()}>
					<div className={"px-4 flex items-center justify-between".classNames()}>
						<h2 className={"text-lg font-medium text-gray-900".classNames()}>Filters</h2>
						<button type="button"
							className={"-mr-2 w-10 h-10 bg-transparent p-2 rounded-md flex items-center justify-center text-gray-400".classNames()}>
							<span className={"sr-only".classNames()}>Close menu</span>
							<svg className={"h-6 w-6".classNames()} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
								stroke="currentColor" aria-hidden="true">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
								d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					</div>
					<form className={"mt-4 border-t border-gray-200".classNames()}>
						<h3 className={"sr-only".classNames()}>Categories</h3>
						<ul role="list" className={"font-medium text-gray-900 px-2 py-3".classNames()}>
							<li>
								<a href="#" className={"block px-2 py-3".classNames()}> Totes </a>
							</li>
							<li>
								<a href="#" className={"block px-2 py-3".classNames()}> Backpacks </a>
							</li>
							<li>
								<a href="#" className={"block px-2 py-3".classNames()}> Travel Bags </a>
							</li>
							<li>
								<a href="#" className={"block px-2 py-3".classNames()}> Hip Bags </a>
							</li>
							<li>
								<a href="#" className={"block px-2 py-3".classNames()}> Laptop Sleeves </a>
							</li>
						</ul>
						<div className={"border-t border-gray-200 px-4 py-6".classNames()}>
							<h3 className={"-mx-2 -my-3 flow-root".classNames()}>
								<button type="button"
								className={"px-2 py-3 bg-transparent w-full flex items-center justify-between text-gray-400 hover:text-gray-500".classNames()} aria-controls="filter-section-mobile-0" aria-expanded="false">
								<span className={"font-medium text-gray-900".classNames()}> Color </span>
								<span className={"ml-6 flex items-center".classNames()}>
									<svg className={"h-5 w-5".classNames()} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
										fill="currentColor" aria-hidden="true">
										<path fillRule="evenodd"
											d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
											clip-rule="evenodd" />
									</svg>
									<svg className={"h-5 w-5".classNames()} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
										fill="currentColor" aria-hidden="true">
										<path fillRule="evenodd"
											d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
											clip-rule="evenodd" />
									</svg>
								</span>
								</button>
							</h3>
							<div className={"pt-6".classNames()} id={"filter-section-mobile-0".idNames()}>
								<div className={"space-y-6".classNames()}>
								<div className={"flex items-center".classNames()}>
									<input id={"filter-mobile-color-0".idNames()} name="color[]" value="white" type="checkbox"
										className={"h-4 w-4 border-gray-300 rounded text-tertiary focus:ring-tertiary/60".classNames()}/>
									<label for="filter-mobile-color-0" className={"ml-3 min-w-0 flex-1 text-gray-500".classNames()}>
									White </label>
								</div>
								<div className={"flex items-center".classNames()}>
									<input id={"filter-mobile-color-1".idNames()} name="color[]" value="beige" type="checkbox"
										className={"h-4 w-4 border-gray-300 rounded text-tertiary focus:ring-tertiary/60".classNames()}/>
									<label for="filter-mobile-color-1" className={"ml-3 min-w-0 flex-1 text-gray-500".classNames()}>
									Beige </label>
								</div>
								<div className={"flex items-center".classNames()}>
									<input id={"filter-mobile-color-2".idNames()} name="color[]" value="blue" type="checkbox"
										checked
										className={"h-4 w-4 border-gray-300 rounded text-tertiary focus:ring-tertiary/60".classNames()}/>
									<label for="filter-mobile-color-2" className={"ml-3 min-w-0 flex-1 text-gray-500".classNames()}>
									Blue </label>
								</div>
								<div className={"flex items-center".classNames()}>
									<input id={"filter-mobile-color-3".idNames()} name="color[]" value="brown" type="checkbox"
										className={"h-4 w-4 border-gray-300 rounded text-tertiary focus:ring-tertiary/60".classNames()}/>
									<label for="filter-mobile-color-3" className={"ml-3 min-w-0 flex-1 text-gray-500".classNames()}>
									Brown </label>
								</div>
								<div className={"flex items-center".classNames()}>
									<input id={"filter-mobile-color-4".idNames()} name="color[]" value="green" type="checkbox"
										className={"h-4 w-4 border-gray-300 rounded text-tertiary focus:ring-tertiary/60".classNames()}/>
									<label for="filter-mobile-color-4" className={"ml-3 min-w-0 flex-1 text-gray-500".classNames()}>
									Green </label>
								</div>
								<div className={"flex items-center".classNames()}>
									<input id={"filter-mobile-color-5".idNames()} name="color[]" value="purple" type="checkbox"
										className={"h-4 w-4 border-gray-300 rounded text-tertiary focus:ring-tertiary/60".classNames()}/>
									<label for="filter-mobile-color-5" className={"ml-3 min-w-0 flex-1 text-gray-500".classNames()}>
									Purple </label>
								</div>
								</div>
							</div>
						</div>
						<div className={"border-t border-gray-200 px-4 py-6".classNames()}>
							<h3 className={"-mx-2 -my-3 flow-root".classNames()}>
								<button type="button"
								className={"px-2 py-3 bg-transparent w-full flex items-center justify-between text-gray-400 hover:text-gray-500".classNames()}
								aria-controls="filter-section-mobile-1" aria-expanded="false">
								<span className={"font-medium text-gray-900".classNames()}> Category </span>
								<span className={"ml-6 flex items-center".classNames()}>
									<svg className={"h-5 w-5".classNames()} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
										fill="currentColor" aria-hidden="true">
										<path fillRule="evenodd"
											d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
											clip-rule="evenodd" />
									</svg>
									<svg className={"h-5 w-5".classNames()} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
										fill="currentColor" aria-hidden="true">
										<path fillRule="evenodd"
											d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
											clip-rule="evenodd" />
									</svg>
								</span>
								</button>
							</h3>
							<div className={"pt-6".classNames()} id={"filter-section-mobile-1".idNames()}>
								<div className={"space-y-6".classNames()}>
								<div className={"flex items-center".classNames()}>
									<input id={"filter-mobile-category-0".idNames()} name="category[]" value="new-arrivals"
										type="checkbox"
										className={"h-4 w-4 border-gray-300 rounded text-tertiary focus:ring-tertiary/60".classNames()}/>
									<label for="filter-mobile-category-0" className={"ml-3 min-w-0 flex-1 text-gray-500".classNames()}>
									New Arrivals </label>
								</div>
								<div className={"flex items-center".classNames()}>
									<input id={"filter-mobile-category-1".idNames()} name="category[]" value="sale"
										type="checkbox"
										className={"h-4 w-4 border-gray-300 rounded text-tertiary focus:ring-tertiary/60".classNames()}/>
									<label for="filter-mobile-category-1" className={"ml-3 min-w-0 flex-1 text-gray-500".classNames()}>
									Sale </label>
								</div>
								<div className={"flex items-center".classNames()}>
									<input id={"filter-mobile-category-2".idNames()} name="category[]" value="travel"
										type="checkbox" checked
										className={"h-4 w-4 border-gray-300 rounded text-tertiary focus:ring-tertiary/60".classNames()}/>
									<label for="filter-mobile-category-2" className={"ml-3 min-w-0 flex-1 text-gray-500".classNames()}>
									Travel </label>
								</div>
								<div className={"flex items-center".classNames()}>
									<input id={"filter-mobile-category-3".idNames()} name="category[]" value="organization"
										type="checkbox"
										className={"h-4 w-4 border-gray-300 rounded text-tertiary focus:ring-tertiary/60".classNames()}/>
									<label for="filter-mobile-category-3" className={"ml-3 min-w-0 flex-1 text-gray-500".classNames()}>
									Organization </label>
								</div>
								<div className={"flex items-center".classNames()}>
									<input id={"filter-mobile-category-4".idNames()} name="category[]" value="accessories"
										type="checkbox"
										className={"h-4 w-4 border-gray-300 rounded text-tertiary focus:ring-tertiary/60".classNames()}/>
									<label for="filter-mobile-category-4" className={"ml-3 min-w-0 flex-1 text-gray-500".classNames()}>
									Accessories </label>
								</div>
								</div>
							</div>
						</div>
						<div className={"border-t border-gray-200 px-4 py-6".classNames()}>
							<h3 className={"-mx-2 -my-3 flow-root".classNames()}>
								<button type="button"
								className={"px-2 py-3 bg-transparent w-full flex items-center justify-between text-gray-400 hover:text-gray-500".classNames()}
								aria-controls="filter-section-mobile-2" aria-expanded="false">
								<span className={"font-medium text-gray-900".classNames()}> Size </span>
								<span className={"ml-6 flex items-center".classNames()}>
									<svg className={"h-5 w-5".classNames()} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
										fill="currentColor" aria-hidden="true">
										<path fillRule="evenodd"
											d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
											clip-rule="evenodd" />
									</svg>
									<svg className={"h-5 w-5".classNames()} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
										fill="currentColor" aria-hidden="true">
										<path fillRule="evenodd"
											d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
											clip-rule="evenodd" />
									</svg>
								</span>
								</button>
							</h3>
							<div className={"pt-6".classNames()} id={"filter-section-mobile-2".idNames()}>
								<div className={"space-y-6".classNames()}>
								<div className={"flex items-center".classNames()}>
									<input id={"filter-mobile-size-0".idNames()} name="size[]" value="2l" type="checkbox"
										className={"h-4 w-4 border-gray-300 rounded text-tertiary focus:ring-tertiary/60".classNames()}/>
									<label for="filter-mobile-size-0" className={"ml-3 min-w-0 flex-1 text-gray-500".classNames()}> 2L
									</label>
								</div>
								<div className={"flex items-center".classNames()}>
									<input id={"filter-mobile-size-1".idNames()} name="size[]" value="6l" type="checkbox"
										className={"h-4 w-4 border-gray-300 rounded text-tertiary focus:ring-tertiary/60".classNames()}/>
									<label for="filter-mobile-size-1" className={"ml-3 min-w-0 flex-1 text-gray-500".classNames()}> 6L
									</label>
								</div>
								<div className={"flex items-center".classNames()}>
									<input id={"filter-mobile-size-2".idNames()} name="size[]" value="12l" type="checkbox"
										className={"h-4 w-4 border-gray-300 rounded text-tertiary focus:ring-tertiary/60".classNames()}/>
									<label for="filter-mobile-size-2" className={"ml-3 min-w-0 flex-1 text-gray-500".classNames()}> 12L
									</label>
								</div>
								<div className={"flex items-center".classNames()}>
									<input id={"filter-mobile-size-3".idNames()} name="size[]" value="18l" type="checkbox"
										className={"h-4 w-4 border-gray-300 rounded text-tertiary focus:ring-tertiary/60".classNames()}/>
									<label for="filter-mobile-size-3" className={"ml-3 min-w-0 flex-1 text-gray-500".classNames()}> 18L
									</label>
								</div>
								<div className={"flex items-center".classNames()}>
									<input id={"filter-mobile-size-4".idNames()} name="size[]" value="20l" type="checkbox"
										className={"h-4 w-4 border-gray-300 rounded text-tertiary focus:ring-tertiary/60".classNames()}/>
									<label for="filter-mobile-size-4" className={"ml-3 min-w-0 flex-1 text-gray-500".classNames()}> 20L
									</label>
								</div>
								<div className={"flex items-center".classNames()}>
									<input id={"filter-mobile-size-5".idNames()} name="size[]" value="40l" type="checkbox"
										checked
										className={"h-4 w-4 border-gray-300 rounded text-tertiary focus:ring-tertiary/60".classNames()}/>
									<label for="filter-mobile-size-5" className={"ml-3 min-w-0 flex-1 text-gray-500".classNames()}> 40L
									</label>
								</div>
								</div>
							</div>
						</div>
					</form>
					</div>
				</div>
				<main className={" mx-auto px-4 sm:px-6 lg:px-8".classNames()}>
					<div className={"relative z-10 flex items-baseline justify-between pt-24 pb-6 border-b border-gray-200".classNames()}>
					<h1 className={"text-4xl font-extrabold tracking-tight text-gray-900".classNames()}>New Arrivals</h1>
					<div className={"flex items-center".classNames()}>
						<div className={"relative inline-block text-left".classNames()}>
							<div>
								<button type="button"
								className={"group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900".classNames()}
								id={"menu-button".idNames()} aria-expanded="false" aria-haspopup="true">
								Sort
								<svg className={"flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500".classNames()}
									xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
									aria-hidden="true">
									<path fillRule="evenodd"
										d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
										clip-rule="evenodd" />
								</svg>
								</button>
							</div>
							<div className={"origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg shadow-tertiary/60 bg-primary ring-1 ring-black ring-opacity-5 focus:outline-none".classNames()}
								role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
								<div className={"py-1".classNames()} role="none">
								<a href="#" className={"font-medium text-gray-900 block px-4 py-2 text-sm".classNames()}
									role="menuitem" tabindex="-1" id={"menu-item-0".idNames()}> Most Popular </a>
								<a href="#" className={"text-gray-500 block px-4 py-2 text-sm".classNames()} role="menuitem"
									tabindex="-1" id={"menu-item-1".idNames()}> Best Rating </a>
								<a href="#" className={"text-gray-500 block px-4 py-2 text-sm".classNames()} role="menuitem"
									tabindex="-1" id={"menu-item-2".idNames()}> Newest </a>
								<a href="#" className={"text-gray-500 block px-4 py-2 text-sm".classNames()} role="menuitem"
									tabindex="-1" id={"menu-item-3".idNames()}> Price: Low to High </a>
								<a href="#" className={"text-gray-500 block px-4 py-2 text-sm".classNames()} role="menuitem"
									tabindex="-1" id={"menu-item-4".idNames()}> Price: High to Low </a>
								</div>
							</div>
						</div>
						<button type="button" className={"p-2 -m-2 ml-5 sm:ml-7 text-gray-400 hover:text-gray-500".classNames()}>
							<span className={"sr-only".classNames()}>View grid</span>
							<svg className={"w-5 h-5".classNames()} aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20" fill="currentColor">
								<path
								d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
							</svg>
						</button>
						<button type="button" className={"p-2 -m-2 ml-4 sm:ml-6 text-gray-400 hover:text-gray-500 lg:hidden".classNames()}>
							<span className={"sr-only".classNames()}>Filters</span>
							<svg className={"w-5 h-5".classNames()} aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20" fill="currentColor">
								<path fillRule="evenodd"
								d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
								clip-rule="evenodd" />
							</svg>
						</button>
					</div>
					</div>
					<section aria-labelledby="products-heading" className={"pt-6 pb-24".classNames()}>
					<h2 id={"products-heading".idNames()} className={"sr-only".classNames()}>Products</h2>
					<div className={"grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10".classNames()}>
						<form className={"hidden lg:block".classNames()}>
							<h3 className={"sr-only".classNames()}>Categories</h3>
							<ul role="list"
								className={"text-sm font-medium text-gray-900 space-y-4 pb-6 border-b border-gray-200".classNames()}>
								<li>
								<a href="#"> Totes </a>
								</li>
								<li>
								<a href="#"> Backpacks </a>
								</li>
								<li>
								<a href="#"> Travel Bags </a>
								</li>
								<li>
								<a href="#"> Hip Bags </a>
								</li>
								<li>
								<a href="#"> Laptop Sleeves </a>
								</li>
							</ul>
							<div className={"border-b border-gray-200 py-6".classNames()}>
								<fieldset>
								<h3 className={"-my-3 flow-root".classNames()}>
									<button type="button"
										className={"py-3 bg-transparent w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500".classNames()}
										aria-controls="filter-section-1" aria-expanded="false">
										<legend className={"font-medium text-gray-900".classNames()}> Category </legend>
										<span className={"ml-6 flex items-center".classNames()}>
											<svg className={"h-5 w-5".classNames()} xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd"
												d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
												clip-rule="evenodd" />
											</svg>
											<svg className={"h-5 w-5".classNames()} xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd"
												d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
												clip-rule="evenodd" />
											</svg>
										</span>
									</button>
								</h3>
								<div className={"pt-6 space-y-6 sm:space-y-4".classNames()}>
									<div className={"flex items-center text-base sm:text-sm".classNames()}>
										<input id={"category-0".idNames()} name="wordpress[]" value="0" type="checkbox"
											className={"flex-shrink-0 h-4 w-4 border-tertiary/30 rounded text-tertiary focus:ring-tertiary/60".classNames()}/>
										<label for="category-0" className={"ml-3 min-w-0 flex-1 text-tertiary/80".classNames()}>
										Wordpress
										</label>
									</div>
									<div className={"flex items-center text-base sm:text-sm".classNames()}>
										<input id={"category-1".idNames()} name="forms[]" value="25" type="checkbox"
											className={"flex-shrink-0 h-4 w-4 border-tertiary/30 rounded text-tertiary focus:ring-tertiary/60".classNames()}/>
										<label for="category-1" className={"ml-3 min-w-0 flex-1 text-tertiary/80".classNames()}> Forms
										</label>
									</div>
									<div className={"flex items-center text-base sm:text-sm".classNames()}>
										<input id={"category-2".idNames()} name="ecommerce[]" value="50" type="checkbox"
											className={"flex-shrink-0 h-4 w-4 border-tertiary/30 rounded text-tertiary focus:ring-tertiary/60".classNames()}/>
										<label for="category-2" className={"ml-3 min-w-0 flex-1 text-tertiary/80".classNames()}>
										eCommerce
										</label>
									</div>
									<div className={"flex items-center text-base sm:text-sm".classNames()}>
										<input id={"category-3".idNames()} name="add-ons[]" value="75" type="checkbox"
											className={"flex-shrink-0 h-4 w-4 border-tertiary/30 rounded text-tertiary focus:ring-tertiary/60".classNames()}/>
										<label for="category-3" className={"ml-3 min-w-0 flex-1 text-tertiary/80".classNames()}> Add
										Ons
										</label>
									</div>
									<div className={"flex items-center text-base sm:text-sm".classNames()}>
										<input id={"category-4".idNames()} name="calendars[]" value="white" type="checkbox"
											className={"flex-shrink-0 h-4 w-4 border-tertiary/30 rounded text-tertiary focus:ring-tertiary/60".classNames()}/>
										<label for="category-4" className={"ml-3 min-w-0 flex-1 text-tertiary/80".classNames()}>
										Calendars
										</label>
									</div>
									<div className={"flex items-center text-base sm:text-sm".classNames()}>
										<input id={"category-5".idNames()} name="interface-elements[]" value="beige"
											type="checkbox"
											className={"flex-shrink-0 h-4 w-4 border-tertiary/30 rounded text-tertiary focus:ring-tertiary/60".classNames()}/>
										<label for="category-5" className={"ml-3 min-w-0 flex-1 text-tertiary/80".classNames()}>
										Interface
										Elements
										</label>
									</div>
									<div className={"flex items-center text-base sm:text-sm".classNames()}>
										<input id={"category-6".idNames()} name="news-letters[]" value="blue" type="checkbox"
											className={"flex-shrink-0 h-4 w-4 border-tertiary/30 rounded text-tertiary focus:ring-tertiary/60".classNames()}
											checked={true}/>
										<label for="category-6" className={"ml-3 min-w-0 flex-1 text-tertiary/80".classNames()}> News
										letters
										</label>
									</div>
								</div>
								</fieldset>
							</div>
							<div className={"border-b border-gray-200 py-6".classNames()}>
								<fieldset>
								<h3 className={"-my-3 flow-root".classNames()}>
									<button type="button"
										className={"py-3 bg-transparent w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500".classNames()}
										aria-controls="filter-section-1" aria-expanded="false">
										<legend className={"font-medium text-gray-900".classNames()}> Pricing </legend>
										<span className={"ml-6 flex items-center".classNames()}>
											<svg className={"h-5 w-5".classNames()} xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd"
												d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
												clip-rule="evenodd" />
											</svg>
											<svg className={"h-5 w-5".classNames()} xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd"
												d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
												clip-rule="evenodd" />
											</svg>
										</span>
									</button>
								</h3>
								<div className={"pt-6 space-y-6 sm:space-y-4".classNames()}>
									<div className={"flex items-center text-base sm:text-sm".classNames()}>
										<input id={"price-0".idNames()} name="price[]" value="0" type="checkbox"
											className={"flex-shrink-0 h-4 w-4 border-tertiary/30 rounded text-tertiary focus:ring-tertiary/60".classNames()}/>
										<label for="price-0" className={"ml-3 min-w-0 flex-1 text-tertiary/60".classNames()}> $0 - $25
										</label>
									</div>
									<div className={"flex items-center text-base sm:text-sm".classNames()}>
										<input id={"price-1".idNames()} name="price[]" value="25" type="checkbox"
											className={"flex-shrink-0 h-4 w-4 border-tertiary/30 rounded text-tertiary focus:ring-tertiary/60".classNames()}/>
										<label for="price-1" className={"ml-3 min-w-0 flex-1 text-tertiary/60".classNames()}> $25 - $50
										</label>
									</div>
									<div className={"flex items-center text-base sm:text-sm".classNames()}>
										<input id={"price-2".idNames()} name="price[]" value="50" type="checkbox"
											className={"flex-shrink-0 h-4 w-4 border-tertiary/30 rounded text-tertiary focus:ring-tertiary/60".classNames()}/>
										<label for="price-2" className={"ml-3 min-w-0 flex-1 text-tertiary/60".classNames()}> $50 - $75
										</label>
									</div>
									<div className={"flex items-center text-base sm:text-sm".classNames()}>
										<input id={"price-3".idNames()} name="price[]" value="75" type="checkbox"
											className={"flex-shrink-0 h-4 w-4 border-tertiary/30 rounded text-tertiary focus:ring-tertiary/60".classNames()}/>
										<label for="price-3" className={"ml-3 min-w-0 flex-1 text-tertiary/60".classNames()}> $75+
										</label>
									</div>
								</div>
								</fieldset>
							</div>
							<div className={"border-b border-gray-200 py-6".classNames()}>
								<fieldset>
								<h3 className={"-my-3 flow-root".classNames()}>
									<button type="button"
										className={"py-3 bg-transparent w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500".classNames()}
										aria-controls="filter-section-1" aria-expanded="false">
										<legend className={"font-medium text-gray-900".classNames()}> Compatible With </legend>
										<span className={"ml-6 flex items-center".classNames()}>
											<svg className={"h-5 w-5".classNames()} xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd"
												d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
												clip-rule="evenodd" />
											</svg>
											<svg className={"h-5 w-5".classNames()} xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd"
												d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
												clip-rule="evenodd" />
											</svg>
										</span>
									</button>
								</h3>
								<div className={"pt-6 space-y-6 sm:space-y-4".classNames()}>
									<div className={"flex items-center text-base sm:text-sm".classNames()}>
										<input id={"compatible-with-0".idNames()} name="compatible-with[]" value="block-editor"
											type="checkbox"
											className={"flex-shrink-0 h-4 w-4 border-tertiary/30 rounded text-tertiary focus:ring-tertiary/60".classNames()}/>
										<label for="compatible-with-0" className={"ml-3 min-w-0 flex-1 text-tertiary/60".classNames()}>
										Block
										Editor
										</label>
									</div>
									<div className={"flex items-center text-base sm:text-sm".classNames()}>
										<input id={"compatible-with-1".idNames()} name="compatible-with[]" value="woocommerce"
											type="checkbox"
											className={"flex-shrink-0 h-4 w-4 border-tertiary/30 rounded text-tertiary focus:ring-tertiary/60".classNames()}/>
										<label for="compatible-with-1" className={"ml-3 min-w-0 flex-1 text-tertiary/60".classNames()}>
										WooCommerce
										</label>
									</div>
									<div className={"flex items-center text-base sm:text-sm".classNames()}>
										<input id={"compatible-with-2".idNames()} name="compatible-with[]" value="elementor-pro"
											type="checkbox"
											className={"flex-shrink-0 h-4 w-4 border-tertiary/30 rounded text-tertiary focus:ring-tertiary/60".classNames()}/>
										<label for="compatible-with-2" className={"ml-3 min-w-0 flex-1 text-tertiary/60".classNames()}>
										Elementor Pro
										</label>
									</div>
									<div className={"flex items-center text-base sm:text-sm".classNames()}>
										<input id={"compatible-with-3".idNames()} name="compatible-with[]" value="elementor"
											type="checkbox"
											className={"flex-shrink-0 h-4 w-4 border-tertiary/30 rounded text-tertiary focus:ring-tertiary/60".classNames()}/>
										<label for="compatible-with-3" className={"ml-3 min-w-0 flex-1 text-tertiary/60".classNames()}>
										Elementor
										</label>
									</div>
									<div className={"flex items-center text-base sm:text-sm".classNames()}>
										<input id={"compatible-with-4".idNames()} name="compatible-with[]" value="bootstrap"
											type="checkbox"
											className={"flex-shrink-0 h-4 w-4 border-tertiary/30 rounded text-tertiary focus:ring-tertiary/60".classNames()}/>
										<label for="compatible-with-4" className={"ml-3 min-w-0 flex-1 text-tertiary/60".classNames()}>
										Bootstrap
										</label>
									</div>
								</div>
								</fieldset>
							</div>
							<div className={"border-b border-gray-200 py-6".classNames()}>
								<fieldset>
								<h3 className={"-my-3 flow-root".classNames()}>
									<button type="button"
										className={"py-3 bg-transparent w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500".classNames()}
										aria-controls="filter-section-1" aria-expanded="false">
										<legend className={"font-medium text-gray-900".classNames()}>Sales</legend>
										<span className={"ml-6 flex items-center".classNames()}>
											<svg className={"h-5 w-5".classNames()} xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd"
												d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
												clip-rule="evenodd" />
											</svg>
											<svg className={"h-5 w-5".classNames()} xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd"
												d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
												clip-rule="evenodd" />
											</svg>
										</span>
									</button>
								</h3>
								<div className={"pt-6 space-y-6 sm:space-y-4".classNames()}>
									<div className={"flex items-center text-base sm:text-sm".classNames()}>
										<input id={"sales-0".idNames()} name="sales[]" value="no-sales" type="checkbox"
											className={"flex-shrink-0 h-4 w-4 border-tertiary/30 rounded text-tertiary focus:ring-tertiary/60".classNames()}/>
										<label for="sales-0" className={"ml-3 min-w-0 flex-1 text-tertiary/60".classNames()}> No Sales
										</label>
									</div>
									<div className={"flex items-center text-base sm:text-sm".classNames()}>
										<input id={"sales-1".idNames()} name="sales[]" value="low" type="checkbox"
											className={"flex-shrink-0 h-4 w-4 border-tertiary/30 rounded text-tertiary focus:ring-tertiary/60".classNames()}
											checked={true}/>
										<label for="sales-1" className={"ml-3 min-w-0 flex-1 text-tertiary/60".classNames()}> Low
										</label>
									</div>
									<div className={"flex items-center text-base sm:text-sm".classNames()}>
										<input id={"sales-2".idNames()} name="sales[]" value="medium" type="checkbox"
											className={"flex-shrink-0 h-4 w-4 border-tertiary/30 rounded text-tertiary focus:ring-tertiary/60".classNames()}/>
										<label for="sales-2" className={"ml-3 min-w-0 flex-1 text-tertiary/60".classNames()}> Medium
										</label>
									</div>
									<div className={"flex items-center text-base sm:text-sm".classNames()}>
										<input id={"sales-3".idNames()} name="sales[]" value="high" type="checkbox"
											className={"flex-shrink-0 h-4 w-4 border-tertiary/30 rounded text-tertiary focus:ring-tertiary/60".classNames()}/>
										<label for="sales-3" className={"ml-3 min-w-0 flex-1 text-tertiary/60".classNames()}> High
										</label>
									</div>
									<div className={"flex items-center text-base sm:text-sm".classNames()}>
										<input id={"sales-4".idNames()} name="sales[]" value="top-sellers" type="checkbox"
											className={"flex-shrink-0 h-4 w-4 border-tertiary/30 rounded text-tertiary focus:ring-tertiary/60".classNames()}/>
										<label for="sales-4" className={"ml-3 min-w-0 flex-1 text-tertiary/60".classNames()}> Top
										Sellers
										</label>
									</div>
								</div>
								</fieldset>
							</div>
							<div className={"border-b border-gray-200 py-6".classNames()}>
								<fieldset>
								<h3 className={"-my-3 flow-root".classNames()}>
									<button type="button"
										className={"py-3 bg-transparent w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500".classNames()}
										aria-controls="filter-section-1" aria-expanded="false">
										<legend className={"font-medium text-gray-900".classNames()}>Rating</legend>
										<span className={"ml-6 flex items-center".classNames()}>
											<svg className={"h-5 w-5".classNames()} xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd"
												d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
												clip-rule="evenodd" />
											</svg>
											<svg className={"h-5 w-5".classNames()} xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd"
												d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
												clip-rule="evenodd" />
											</svg>
										</span>
									</button>
								</h3>
								<div className={"pt-6 space-y-6 sm:space-y-4".classNames()}>
									<div className={"flex items-center".classNames()}>
										<input id={"show-all".idNames()} name="rating" type="radio" checked
											className={"focus:ring-tertiary/60 h-4 w-4 text-tertiary border-tertiary/30".classNames()}/>
										<label for="show-all" className={"ml-3 block text-sm text-tertiary/70".classNames()}> Show All
										</label>
									</div>
									<div className={"flex items-center".classNames()}>
										<input id={"one-star-and-higher".idNames()} name="rating" type="radio"
											className={"focus:ring-tertiary/60 h-4 w-4 text-tertiary border-tertiary/30".classNames()}/>
										<label for="one-star-and-higher"
											className={"ml-3 block text-sm text-tertiary/70".classNames()}> 1
										Star and Higher</label>
									</div>
									<div className={"flex items-center".classNames()}>
										<input id={"two-star-and-higher".idNames()} name="rating" type="radio"
											className={"focus:ring-tertiary/60 h-4 w-4 text-tertiary border-tertiary/30".classNames()}/>
										<label for="two-star-and-higher"
											className={"ml-3 block text-sm text-tertiary/70".classNames()}> 2
										Star and Higher</label>
									</div>
									<div className={"flex items-center".classNames()}>
										<input id={"three-star-and-higher".idNames()} name="rating" type="radio"
											className={"focus:ring-tertiary/60 h-4 w-4 text-tertiary border-tertiary/30".classNames()}/>
										<label for="three-star-and-higher"
											className={"ml-3 block text-sm text-tertiary/70".classNames()}> 3
										Star and Higher</label>
									</div>
									<div className={"flex items-center".classNames()}>
										<input id={"four-star-and-higher".idNames()} name="rating" type="radio"
											className={"focus:ring-tertiary/60 h-4 w-4 text-tertiary border-tertiary/30".classNames()}/>
										<label for="four-star-and-higher"
											className={"ml-3 block text-sm text-tertiary/70".classNames()}> 4
										Star and Higher</label>
									</div>
									<div className={"flex items-center".classNames()}>
										<input id={"five-star-and-higher".idNames()} name="rating" type="radio"
											className={"focus:ring-tertiary/60 h-4 w-4 text-tertiary border-tertiary/30".classNames()}/>
										<label for="five-star-and-higher"
											className={"ml-3 block text-sm text-tertiary/70".classNames()}> 5
										Star and Higher</label>
									</div>
								</div>
								</fieldset>
							</div>
							<div className={"border-b border-gray-200 py-6".classNames()}>
								<fieldset>
								<h3 className={"-my-3 flow-root".classNames()}>
									<button type="button"
										className={"py-3 bg-transparent w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500".classNames()}
										aria-controls="filter-section-1" aria-expanded="false">
										<legend className={"font-medium text-gray-900".classNames()}>Date Added</legend>
										<span className={"ml-6 flex items-center".classNames()}>
											<svg className={"h-5 w-5".classNames()} xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd"
												d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
												clip-rule="evenodd" />
											</svg>
											<svg className={"h-5 w-5".classNames()} xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd"
												d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
												clip-rule="evenodd" />
											</svg>
										</span>
									</button>
								</h3>
								<div className={"pt-6 space-y-6 sm:pt-4 sm:space-y-4".classNames()}>
									<div className={"flex items-center".classNames()}>
										<input id={"any-date".idNames()} name="date-added" type="radio" checked
											className={"focus:ring-tertiary/60 h-4 w-4 text-tertiary border-tertiary/30".classNames()}/>
										<label for="any-date" className={"ml-3 block text-sm text-tertiary/70".classNames()}> Any date
										</label>
									</div>
									<div className={"flex items-center".classNames()}>
										<input id={"in-the-last-year".idNames()} name="date-added" type="radio"
											className={"focus:ring-tertiary/60 h-4 w-4 text-tertiary border-tertiary/30".classNames()}/>
										<label for="in-the-last-year" className={"ml-3 block text-sm text-tertiary/70".classNames()}>
										In the
										last year</label>
									</div>
									<div className={"flex items-center".classNames()}>
										<input id={"in-the-last-month".idNames()} name="date-added" type="radio"
											className={"focus:ring-tertiary/60 h-4 w-4 text-tertiary border-tertiary/30".classNames()}/>
										<label for="in-the-last-month" className={"ml-3 block text-sm text-tertiary/70".classNames()}>
										In the
										last month</label>
									</div>
								</div>
								</fieldset>
							</div>
							<div className={"border-b border-gray-200 py-6".classNames()}>
								<fieldset>
								<h3 className={"-my-3 flow-root".classNames()}>
									<button type="button"
										className={"py-3 bg-transparent w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500".classNames()}
										aria-controls="filter-section-1" aria-expanded="false">
										<legend className={"font-medium text-gray-900".classNames()}> On Sale </legend>
										<span className={"ml-6 flex items-center".classNames()}>
											<svg className={"h-5 w-5".classNames()} xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd"
												d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
												clip-rule="evenodd" />
											</svg>
											<svg className={"h-5 w-5".classNames()} xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fillRule="evenodd"
												d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
												clip-rule="evenodd" />
											</svg>
										</span>
									</button>
								</h3>
								<div className={"pt-6 space-y-6 sm:space-y-4".classNames()}>
									<div className={"flex items-center text-base sm:text-sm".classNames()}>
										<input id={"on-sale-0".idNames()} name="on-sale[]" value="true" type="checkbox"
											className={"flex-shrink-0 h-4 w-4 border-tertiary/30 rounded text-tertiary focus:ring-tertiary/60".classNames()}/>
										<label for="on-sale-0" className={"ml-3 min-w-0 flex-1 text-tertiary/60".classNames()}> Yes
										</label>
									</div>
								</div>
								</fieldset>
							</div>
						</form>
						<div className={"lg:col-span-3".classNames()}>
							<div className={"border-4 border-dashed border-gray-200 rounded-lg h-96 lg:h-full p-10".classNames()}>
								<div className={"grid md:grid-cols-2 xl:grid-cols-2 gap-10 place-items-center".classNames()}>
								<div
									className={" h-max bg-brand-white hover:shadow-xl hover:shadow-tertiary/30 max-w-sm p-6 rounded-xl space-y-4 flex flex-col justify-between".classNames()}>
									<div >
										<img src="https://img.logoipsum.com/285.svg" className={"w-36 h-10".classNames()} alt="" />
									</div>
									<div className={"flex w-full justify-between".classNames()}>
										<div className={"flex flex-col justify-between".classNames()}>
											<span className={"font-bold text-lg".classNames()}>Company Name</span>
											<pre className={"italic text-xs".classNames()}>by "Person Name"</pre>
										</div>
										<div
											className={"flex items-center gap-5 border border-dashed border-tertiary rounded-lg h-max py-1 px-4".classNames()}>
											<span className={"text-xs".classNames()}>Price</span>
											<span className={" font-bold".classNames()}>$20</span>
										</div>
									</div>
									<div className={"text-lg italic h-12".classNames()}>SUB TAG LINE, that has some features. some
										features!
									</div>
									<div className={"italic".classNames()}>
										<span className={"font-bold ".classNames()}>Software Version:</span>
										<span >App 4.9.x - 5.2.x, other</span>
									</div>
									<div className={"space-y-2".classNames()}>
										<div className={"font-bold".classNames()}>File Type Included:</div>
										<div className={"flex flex-wrap gap-4".classNames()}>
											<div className={"bg-primary w-max rounded-md text-sm px-3".classNames()}>HTML</div>
											<div className={"bg-primary w-max rounded-md text-sm px-3".classNames()}>HTML</div>
											<div className={"bg-primary w-max rounded-md text-sm px-3".classNames()}>HTML</div>
											<div className={"bg-primary w-max rounded-md text-sm px-3".classNames()}>HTML</div>
										</div>
									</div>
									<div className={"flex gap-3 pt-3".classNames()}>
										<button
											className={"hover:shadow-lg bg-tertiary text-brand-white px-6 py-2 rounded-md font-bold".classNames()}>Buy
										Now</button>
										<button
											className={"hover:shadow-lg bg-primary border-2 border-tertiary px-6 py-2 rounded-md  font-bold".classNames()}>Live
										Preview</button>
									</div>
								</div>
								<div
									className={"bg-brand-white hover:shadow-xl hover:shadow-tertiary/30 max-w-sm p-6 rounded-xl space-y-4 flex flex-col justify-between".classNames()}>
									<div >
										<img src="https://img.logoipsum.com/285.svg" className={"w-36 h-10".classNames()} alt="" />
									</div>
									<div className={"flex w-full justify-between".classNames()}>
										<div className={"flex flex-col justify-between".classNames()}>
											<span className={"font-bold text-lg".classNames()}>Company Name</span>
											<pre className={"italic text-xs".classNames()}>by "Person Name"</pre>
										</div>
										<div
											className={"flex items-center gap-5 border border-dashed border-tertiary rounded-lg h-max py-1 px-4".classNames()}>
											<span className={"text-xs".classNames()}>Price</span>
											<span className={" font-bold".classNames()}>$20</span>
										</div>
									</div>
									<div className={"text-lg italic h-12".classNames()}>SUB TAG LINE, that has some features. some
										features!
									</div>
									<div className={"italic".classNames()}>
										<span className={"font-bold ".classNames()}>Software Version:</span>
										<span >App 4.9.x - 5.2.x, other</span>
									</div>
									<div className={"space-y-2".classNames()}>
										<div className={"font-bold".classNames()}>File Type Included:</div>
										<div className={"flex flex-wrap gap-4".classNames()}>
											<div className={"bg-primary w-max rounded-md text-sm px-3".classNames()}>HTML</div>
											<div className={"bg-primary w-max rounded-md text-sm px-3".classNames()}>HTML</div>
											<div className={"bg-primary w-max rounded-md text-sm px-3".classNames()}>HTML</div>
											<div className={"bg-primary w-max rounded-md text-sm px-3".classNames()}>HTML</div>
										</div>
									</div>
									<div className={"flex gap-3 pt-3".classNames()}>
										<button
											className={"hover:shadow-lg bg-tertiary text-brand-white px-6 py-2 rounded-md font-bold".classNames()}>Buy
										Now</button>
										<button
											className={"hover:shadow-lg bg-primary border-2 border-tertiary px-6 py-2 rounded-md  font-bold".classNames()}>Live
										Preview</button>
									</div>
								</div>
								<div
									className={"bg-brand-white hover:shadow-xl hover:shadow-tertiary/30 max-w-sm p-6 rounded-xl space-y-4 flex flex-col justify-between".classNames()}>
									<div >
										<img src="https://img.logoipsum.com/285.svg" className={"w-36 h-10".classNames()} alt="" />
									</div>
									<div className={"flex w-full justify-between".classNames()}>
										<div className={"flex flex-col justify-between".classNames()}>
											<span className={"font-bold text-lg".classNames()}>Company Name</span>
											<pre className={"italic text-xs".classNames()}>by "Person Name"</pre>
										</div>
										<div
											className={"flex items-center gap-5 border border-dashed border-tertiary rounded-lg h-max py-1 px-4".classNames()}>
											<span className={"text-xs".classNames()}>Price</span>
											<span className={" font-bold".classNames()}>$20</span>
										</div>
									</div>
									<div className={"text-lg italic h-12".classNames()}>SUB TAG LINE, that has some features. some
										features!
									</div>
									<div className={"italic".classNames()}>
										<span className={"font-bold ".classNames()}>Software Version:</span>
										<span >App 4.9.x - 5.2.x, other</span>
									</div>
									<div className={"space-y-2".classNames()}>
										<div className={"font-bold".classNames()}>File Type Included:</div>
										<div className={"flex flex-wrap gap-4".classNames()}>
											<div className={"bg-primary w-max rounded-md text-sm px-3".classNames()}>HTML</div>
											<div className={"bg-primary w-max rounded-md text-sm px-3".classNames()}>HTML</div>
											<div className={"bg-primary w-max rounded-md text-sm px-3".classNames()}>HTML</div>
											<div className={"bg-primary w-max rounded-md text-sm px-3".classNames()}>HTML</div>
										</div>
									</div>
									<div className={"flex gap-3 pt-3".classNames()}>
										<button
											className={"hover:shadow-lg bg-tertiary text-brand-white px-6 py-2 rounded-md font-bold".classNames()}>Buy
										Now</button>
										<button
											className={"hover:shadow-lg bg-primary border-2 border-tertiary px-6 py-2 rounded-md  font-bold".classNames()}>Live
										Preview</button>
									</div>
								</div>
								<div
									className={"bg-brand-white hover:shadow-xl hover:shadow-tertiary/30 max-w-sm p-6 rounded-xl space-y-4 flex flex-col justify-between".classNames()}>
									<div >
										<img src="https://img.logoipsum.com/285.svg" className={"w-36 h-10".classNames()} alt="" />
									</div>
									<div className={"flex w-full justify-between".classNames()}>
										<div className={"flex flex-col justify-between".classNames()}>
											<span className={"font-bold text-lg".classNames()}>Company Name</span>
											<pre className={"italic text-xs".classNames()}>by "Person Name"</pre>
										</div>
										<div
											className={"flex items-center gap-5 border border-dashed border-tertiary rounded-lg h-max py-1 px-4".classNames()}>
											<span className={"text-xs".classNames()}>Price</span>
											<span className={" font-bold".classNames()}>$20</span>
										</div>
									</div>
									<div className={"text-lg italic h-12".classNames()}>SUB TAG LINE, that has some features. some
										features!
									</div>
									<div className={"italic".classNames()}>
										<span className={"font-bold ".classNames()}>Software Version:</span>
										<span >App 4.9.x - 5.2.x, other</span>
									</div>
									<div className={"space-y-2".classNames()}>
										<div className={"font-bold".classNames()}>File Type Included:</div>
										<div className={"flex flex-wrap gap-4".classNames()}>
											<div className={"bg-primary w-max rounded-md text-sm px-3".classNames()}>HTML</div>
											<div className={"bg-primary w-max rounded-md text-sm px-3".classNames()}>HTML</div>
											<div className={"bg-primary w-max rounded-md text-sm px-3".classNames()}>HTML</div>
											<div className={"bg-primary w-max rounded-md text-sm px-3".classNames()}>HTML</div>
										</div>
									</div>
									<div className={"flex gap-3 pt-3".classNames()}>
										<button
											className={"hover:shadow-lg bg-tertiary text-brand-white px-6 py-2 rounded-md font-bold".classNames()}>Buy
										Now</button>
										<button
											className={"hover:shadow-lg bg-primary border-2 border-tertiary px-6 py-2 rounded-md  font-bold".classNames()}>Live
										Preview</button>
									</div>
								</div>
								<div
									className={"bg-brand-white hover:shadow-xl hover:shadow-tertiary/30 max-w-sm p-6 rounded-xl space-y-4 flex flex-col justify-between".classNames()}>
									<div >
										<img src="https://img.logoipsum.com/285.svg" className={"w-36 h-10".classNames()} alt="" />
									</div>
									<div className={"flex w-full justify-between".classNames()}>
										<div className={"flex flex-col justify-between".classNames()}>
											<span className={"font-bold text-lg".classNames()}>Company Name</span>
											<pre className={"italic text-xs".classNames()}>by "Person Name"</pre>
										</div>
										<div
											className={"flex items-center gap-5 border border-dashed border-tertiary rounded-lg h-max py-1 px-4".classNames()}>
											<span className={"text-xs".classNames()}>Price</span>
											<span className={" font-bold".classNames()}>$20</span>
										</div>
									</div>
									<div className={"text-lg italic h-12".classNames()}>SUB TAG LINE, that has some features. some
										features!
									</div>
									<div className={"italic".classNames()}>
										<span className={"font-bold ".classNames()}>Software Version:</span>
										<span >App 4.9.x - 5.2.x, other</span>
									</div>
									<div className={"space-y-2".classNames()}>
										<div className={"font-bold".classNames()}>File Type Included:</div>
										<div className={"flex flex-wrap gap-4".classNames()}>
											<div className={"bg-primary w-max rounded-md text-sm px-3".classNames()}>HTML</div>
											<div className={"bg-primary w-max rounded-md text-sm px-3".classNames()}>HTML</div>
											<div className={"bg-primary w-max rounded-md text-sm px-3".classNames()}>HTML</div>
											<div className={"bg-primary w-max rounded-md text-sm px-3".classNames()}>HTML</div>
										</div>
									</div>
									<div className={"flex gap-3 pt-3".classNames()}>
										<button
											className={"hover:shadow-lg bg-tertiary text-brand-white px-6 py-2 rounded-md font-bold".classNames()}>Buy
										Now</button>
										<button
											className={"hover:shadow-lg bg-primary border-2 border-tertiary px-6 py-2 rounded-md  font-bold".classNames()}>Live
										Preview</button>
									</div>
								</div>
								</div>
							</div>
						</div>
					</div>
					</section>
				</main>
			</div>
		</div>
	</div>
}