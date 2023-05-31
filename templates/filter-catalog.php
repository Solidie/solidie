<!doctype html>
<html>

<head>
    <?php wp_head();?>
    <script src="https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio,line-clamp"></script>
    <script>
    /** @type {import('tailwindcss').Config} */
    tailwind.config = {
        theme: {
            extend: {
                colors: {
                    primary: "#E5ECF2",
                    tertiary: "#091E42",
                    "content-bg": "#EFF1FC",
                    "lightest-version": "#fff",
                    "brand-white": "#F6F7FD",
                },
            },
        },
    }
    </script>
</head>

<body class="w-full h-full bg-content-bg text-tertiary flex justify-center">
    <!-- Fahad: Use raw HTML in this page -->

    <!-- Start Single Product Coding Here -->
    <div class="appstore-special-catalog-wrapper max-w-screen-2xl w-full h-full py-10 px-5 flex flex-col gap-5">
        <div class="">
            <div class="text-center py-16 px-4 sm:px-6 lg:px-8">
                <h1 class="text-4xl font-extrabold tracking-tight ">Catalog Page With Filters</h1>
                <p class="mt-4 max-w-xl mx-auto text-base text-tertiary/60">The secret to a tidy desk? Don't get rid of
                    anything, just put it in really really nice looking containers.</p>
            </div>

            <!-- Filters -->
            <section aria-labelledby="filter-heading"
                class="relative z-10 border-t border-b border-tertiary/20 grid items-center">
                <h2 id="filter-heading" class="sr-only">Filters</h2>
                <div class="relative col-start-1 row-start-1 py-4">
                    <div class="max-w-7xl mx-auto flex space-x-6 divide-x divide-tertiary/20 text-sm px-4 sm:px-6 lg:px-8">
                        <div>
                            <button type="button" class="group text-tertiary/70 font-medium flex items-center"
                                id="filter-btn" aria-controls="disclosure-1" aria-expanded="false"
                                onclick="onClickFilterBtn()">
                                <!-- Heroicon name: solid/filter -->
                                <svg class="flex-none w-5 h-5 mr-2 text-tertiary/40 group-hover:text-tertiary/50"
                                    aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                    fill="currentColor">
                                    <path fill-rule="evenodd"
                                        d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                                        clip-rule="evenodd" />
                                </svg>
                                2 Filters
                            </button>
                        </div>
                        <div class="pl-6">
                            <button type="button" class="text-tertiary/50">Clear all</button>
                        </div>
                    </div>
                </div>
                <div class="hidden border-t border-tertiary/20 py-10" id="filters-pannel">
                    <div
                        class="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-3 gap-4 px-4 text-sm sm:px-6 md:gap-6 lg:px-8">
                        <div class="grid grid-cols-1 gap-y-10 auto-rows-min md:grid-cols-2 md:gap-x-6">
                            <fieldset>
                                <legend class="block font-medium">Category</legend>
                                <div class="pt-6 space-y-6 sm:pt-4 sm:space-y-4">
                                    <div class="flex items-center text-base sm:text-sm">
                                        <input id="category-0" name="wordpress[]" value="0" type="checkbox"
                                            class="flex-shrink-0 h-4 w-4 border-tertiary/30 rounded text-indigo-600 focus:ring-indigo-500">
                                        <label for="category-0" class="ml-3 min-w-0 flex-1 text-tertiary/60"> Wordpress
                                        </label>
                                    </div>

                                    <div class="flex items-center text-base sm:text-sm">
                                        <input id="category-1" name="forms[]" value="25" type="checkbox"
                                            class="flex-shrink-0 h-4 w-4 border-tertiary/30 rounded text-indigo-600 focus:ring-indigo-500">
                                        <label for="category-1" class="ml-3 min-w-0 flex-1 text-tertiary/60"> Forms
                                        </label>
                                    </div>

                                    <div class="flex items-center text-base sm:text-sm">
                                        <input id="category-2" name="ecommerce[]" value="50" type="checkbox"
                                            class="flex-shrink-0 h-4 w-4 border-tertiary/30 rounded text-indigo-600 focus:ring-indigo-500">
                                        <label for="category-2" class="ml-3 min-w-0 flex-1 text-tertiary/60"> eCommerce
                                        </label>
                                    </div>

                                    <div class="flex items-center text-base sm:text-sm">
                                        <input id="category-3" name="add-ons[]" value="75" type="checkbox"
                                            class="flex-shrink-0 h-4 w-4 border-tertiary/30 rounded text-indigo-600 focus:ring-indigo-500">
                                        <label for="category-3" class="ml-3 min-w-0 flex-1 text-tertiary/60"> Add Ons
                                        </label>
                                    </div>
                                    <div class="flex items-center text-base sm:text-sm">
                                        <input id="category-4" name="calendars[]" value="white" type="checkbox"
                                            class="flex-shrink-0 h-4 w-4 border-tertiary/30 rounded text-indigo-600 focus:ring-indigo-500">
                                        <label for="category-4" class="ml-3 min-w-0 flex-1 text-tertiary/60"> Calendars
                                        </label>
                                    </div>

                                    <div class="flex items-center text-base sm:text-sm">
                                        <input id="category-5" name="interface-elements[]" value="beige" type="checkbox"
                                            class="flex-shrink-0 h-4 w-4 border-tertiary/30 rounded text-indigo-600 focus:ring-indigo-500">
                                        <label for="category-5" class="ml-3 min-w-0 flex-1 text-tertiary/60"> Interface
                                            Elements
                                        </label>
                                    </div>

                                    <div class="flex items-center text-base sm:text-sm">
                                        <input id="category-6" name="news-letters[]" value="blue" type="checkbox"
                                            class="flex-shrink-0 h-4 w-4 border-tertiary/30 rounded text-indigo-600 focus:ring-indigo-500"
                                            checked>
                                        <label for="category-6" class="ml-3 min-w-0 flex-1 text-tertiary/60"> News letters
                                        </label>
                                    </div>
                                </div>
                            </fieldset>
                            <fieldset>
                                <legend class="block font-medium">Price</legend>
                                <div class="pt-6 space-y-6 sm:pt-4 sm:space-y-4">
                                    <div class="flex items-center text-base sm:text-sm">
                                        <input id="price-0" name="price[]" value="0" type="checkbox"
                                            class="flex-shrink-0 h-4 w-4 border-tertiary/30 rounded text-indigo-600 focus:ring-indigo-500">
                                        <label for="price-0" class="ml-3 min-w-0 flex-1 text-tertiary/60"> $0 - $25
                                        </label>
                                    </div>

                                    <div class="flex items-center text-base sm:text-sm">
                                        <input id="price-1" name="price[]" value="25" type="checkbox"
                                            class="flex-shrink-0 h-4 w-4 border-tertiary/30 rounded text-indigo-600 focus:ring-indigo-500">
                                        <label for="price-1" class="ml-3 min-w-0 flex-1 text-tertiary/60"> $25 - $50
                                        </label>
                                    </div>

                                    <div class="flex items-center text-base sm:text-sm">
                                        <input id="price-2" name="price[]" value="50" type="checkbox"
                                            class="flex-shrink-0 h-4 w-4 border-tertiary/30 rounded text-indigo-600 focus:ring-indigo-500">
                                        <label for="price-2" class="ml-3 min-w-0 flex-1 text-tertiary/60"> $50 - $75
                                        </label>
                                    </div>

                                    <div class="flex items-center text-base sm:text-sm">
                                        <input id="price-3" name="price[]" value="75" type="checkbox"
                                            class="flex-shrink-0 h-4 w-4 border-tertiary/30 rounded text-indigo-600 focus:ring-indigo-500">
                                        <label for="price-3" class="ml-3 min-w-0 flex-1 text-tertiary/60"> $75+
                                        </label>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                        <div class="grid grid-cols-1 gap-y-10 auto-rows-min md:grid-cols-2 md:gap-x-6">
                            <fieldset>
                                <legend class="block font-medium">Compatible With</legend>
                                <div class="pt-6 space-y-6 sm:pt-4 sm:space-y-4">
                                    <div class="flex items-center text-base sm:text-sm">
                                        <input id="compatible-with-0" name="compatible-with[]" value="block-editor"
                                            type="checkbox"
                                            class="flex-shrink-0 h-4 w-4 border-tertiary/30 rounded text-indigo-600 focus:ring-indigo-500">
                                        <label for="compatible-with-0" class="ml-3 min-w-0 flex-1 text-tertiary/60"> Block
                                            Editor
                                        </label>
                                    </div>

                                    <div class="flex items-center text-base sm:text-sm">
                                        <input id="compatible-with-1" name="compatible-with[]" value="woocommerce"
                                            type="checkbox"
                                            class="flex-shrink-0 h-4 w-4 border-tertiary/30 rounded text-indigo-600 focus:ring-indigo-500">
                                        <label for="compatible-with-1" class="ml-3 min-w-0 flex-1 text-tertiary/60">
                                            WooCommerce
                                        </label>
                                    </div>

                                    <div class="flex items-center text-base sm:text-sm">
                                        <input id="compatible-with-2" name="compatible-with[]" value="elementor-pro"
                                            type="checkbox"
                                            class="flex-shrink-0 h-4 w-4 border-tertiary/30 rounded text-indigo-600 focus:ring-indigo-500">
                                        <label for="compatible-with-2" class="ml-3 min-w-0 flex-1 text-tertiary/60">
                                            Elementor Pro
                                        </label>
                                    </div>

                                    <div class="flex items-center text-base sm:text-sm">
                                        <input id="compatible-with-3" name="compatible-with[]" value="elementor"
                                            type="checkbox"
                                            class="flex-shrink-0 h-4 w-4 border-tertiary/30 rounded text-indigo-600 focus:ring-indigo-500">
                                        <label for="compatible-with-3" class="ml-3 min-w-0 flex-1 text-tertiary/60">
                                            Elementor
                                        </label>
                                    </div>
                                    <div class="flex items-center text-base sm:text-sm">
                                        <input id="compatible-with-4" name="compatible-with[]" value="bootstrap"
                                            type="checkbox"
                                            class="flex-shrink-0 h-4 w-4 border-tertiary/30 rounded text-indigo-600 focus:ring-indigo-500">
                                        <label for="compatible-with-4" class="ml-3 min-w-0 flex-1 text-tertiary/60">
                                            Bootstrap
                                        </label>
                                    </div>
                                </div>
                            </fieldset>

                            <fieldset>
                                <legend class="block font-medium">Sales</legend>
                                <div class="pt-6 space-y-6 sm:pt-4 sm:space-y-4">
                                    <div class="flex items-center text-base sm:text-sm">
                                        <input id="sales-0" name="sales[]" value="no-sales" type="checkbox"
                                            class="flex-shrink-0 h-4 w-4 border-tertiary/30 rounded text-indigo-600 focus:ring-indigo-500">
                                        <label for="sales-0" class="ml-3 min-w-0 flex-1 text-tertiary/60"> No Sales
                                        </label>
                                    </div>

                                    <div class="flex items-center text-base sm:text-sm">
                                        <input id="sales-1" name="sales[]" value="low" type="checkbox"
                                            class="flex-shrink-0 h-4 w-4 border-tertiary/30 rounded text-indigo-600 focus:ring-indigo-500"
                                            checked>
                                        <label for="sales-1" class="ml-3 min-w-0 flex-1 text-tertiary/60"> Low </label>
                                    </div>

                                    <div class="flex items-center text-base sm:text-sm">
                                        <input id="sales-2" name="sales[]" value="medium" type="checkbox"
                                            class="flex-shrink-0 h-4 w-4 border-tertiary/30 rounded text-indigo-600 focus:ring-indigo-500">
                                        <label for="sales-2" class="ml-3 min-w-0 flex-1 text-tertiary/60"> Medium </label>
                                    </div>

                                    <div class="flex items-center text-base sm:text-sm">
                                        <input id="sales-3" name="sales[]" value="high" type="checkbox"
                                            class="flex-shrink-0 h-4 w-4 border-tertiary/30 rounded text-indigo-600 focus:ring-indigo-500">
                                        <label for="sales-3" class="ml-3 min-w-0 flex-1 text-tertiary/60"> High </label>
                                    </div>

                                    <div class="flex items-center text-base sm:text-sm">
                                        <input id="sales-4" name="sales[]" value="top-sellers" type="checkbox"
                                            class="flex-shrink-0 h-4 w-4 border-tertiary/30 rounded text-indigo-600 focus:ring-indigo-500">
                                        <label for="sales-4" class="ml-3 min-w-0 flex-1 text-tertiary/60"> Top Sellers
                                        </label>
                                    </div>

                                </div>
                            </fieldset>
                        </div>
                        <div class="grid grid-cols-1 gap-y-10 auto-rows-min md:grid-cols-2 md:gap-x-6">
                            <fieldset>
                                <legend class="block font-medium">Rating</legend>
                                <div class="pt-6 space-y-6 sm:pt-4 sm:space-y-4">
                                    <div class="flex items-center">
                                        <input id="show-all" name="rating" type="radio" checked
                                            class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-tertiary/30">
                                        <label for="show-all" class="ml-3 block text-sm text-tertiary/70"> Show All
                                        </label>
                                    </div>

                                    <div class="flex items-center">
                                        <input id="one-star-and-higher" name="rating" type="radio"
                                            class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-tertiary/30">
                                        <label for="one-star-and-higher" class="ml-3 block text-sm text-tertiary/70"> 1
                                            Star and Higher</label>
                                    </div>

                                    <div class="flex items-center">
                                        <input id="two-star-and-higher" name="rating" type="radio"
                                            class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-tertiary/30">
                                        <label for="two-star-and-higher" class="ml-3 block text-sm text-tertiary/70"> 2
                                            Star and Higher</label>
                                    </div>

                                    <div class="flex items-center">
                                        <input id="three-star-and-higher" name="rating" type="radio"
                                            class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-tertiary/30">
                                        <label for="three-star-and-higher" class="ml-3 block text-sm text-tertiary/70"> 3
                                            Star and Higher</label>
                                    </div>

                                    <div class="flex items-center">
                                        <input id="four-star-and-higher" name="rating" type="radio"
                                            class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-tertiary/30">
                                        <label for="four-star-and-higher" class="ml-3 block text-sm text-tertiary/70"> 4
                                            Star and Higher</label>
                                    </div>

                                    <div class="flex items-center">
                                        <input id="five-star-and-higher" name="rating" type="radio"
                                            class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-tertiary/30">
                                        <label for="five-star-and-higher" class="ml-3 block text-sm text-tertiary/70"> 5
                                            Star and Higher</label>
                                    </div>
                                </div>
                            </fieldset>
                            <fieldset>
                                <legend class="block font-medium">Date Added</legend>
                                <div class="pt-6 space-y-6 sm:pt-4 sm:space-y-4">
                                    <div class="flex items-center">
                                        <input id="any-date" name="date-added" type="radio" checked
                                            class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-tertiary/30">
                                        <label for="any-date" class="ml-3 block text-sm text-tertiary/70"> Any date
                                        </label>
                                    </div>

                                    <div class="flex items-center">
                                        <input id="in-the-last-year" name="date-added" type="radio"
                                            class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-tertiary/30">
                                        <label for="in-the-last-year" class="ml-3 block text-sm text-tertiary/70"> In the
                                            last year</label>
                                    </div>

                                    <div class="flex items-center">
                                        <input id="in-the-last-month" name="date-added" type="radio"
                                            class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-tertiary/30">
                                        <label for="in-the-last-month" class="ml-3 block text-sm text-tertiary/70"> In the
                                            last month</label>
                                    </div>

                                </div>
                            </fieldset>
                        </div>
                        <div class="grid grid-cols-1 gap-y-10 auto-rows-min md:grid-cols-2 md:gap-x-6">
                            <fieldset>
                                <legend class="block font-medium">On Sale</legend>
                                <div class="pt-6 space-y-6 sm:pt-4 sm:space-y-4">
                                    <div class="flex items-center text-base sm:text-sm">
                                        <input id="on-sale-0" name="on-sale[]" value="true" type="checkbox"
                                            class="flex-shrink-0 h-4 w-4 border-tertiary/30 rounded text-indigo-600 focus:ring-indigo-500">
                                        <label for="on-sale-0" class="ml-3 min-w-0 flex-1 text-tertiary/60"> Yes
                                        </label>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                </div>
                <div class="col-start-1 row-start-1 py-4">
                    <div class="flex justify-end max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div class="relative inline-block">
                            <div class="flex">
                                <button type="button"
                                    class="group inline-flex justify-center text-sm font-medium text-tertiary/70 hover:text-tertiary/90"
                                    id="sort-menu" aria-expanded="false" aria-haspopup="true"
                                    onclick="onClickSortMenuBtn()">
                                    Sort
                                    <!-- Heroicon name: solid/chevron-down -->
                                    <svg class="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-tertiary/40 group-hover:text-tertiary/50"
                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                        aria-hidden="true">
                                        <path fill-rule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </button>
                            </div>

                            <!--
            Dropdown menu, show/hide based on menu state.

            Entering: "transition ease-out duration-100"
              From: "transform opacity-0 scale-95"
              To: "transform opacity-100 scale-100"
            Leaving: "transition ease-in duration-75"
              From: "transform opacity-100 scale-100"
              To: "transform opacity-0 scale-95"
          -->
                            <div id="sort-menu-dropdown"
                                class="hidden origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                                role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                                <div class="py-1" role="none">
                                    <!--
                Active: "bg-tertiary/10", Not Active: ""

                Selected: "font-medium text-tertiary/90", Not Selected: "text-tertiary/50"
              -->
                                    <a href="#" class="font-medium text-tertiary/90 block px-4 py-2 text-sm"
                                        role="menuitem" tabindex="-1" id="menu-item-0"> Most Popular </a>

                                    <a href="#" class="text-tertiary/50 block px-4 py-2 text-sm" role="menuitem"
                                        tabindex="-1" id="menu-item-1"> Best Rating </a>

                                    <a href="#" class="text-tertiary/50 block px-4 py-2 text-sm" role="menuitem"
                                        tabindex="-1" id="menu-item-2"> Newest </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>


        <!-- Cards -->
        <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-10 place-items-center">
            <!-- Card -->
            <div
                class=" h-max bg-brand-white hover:shadow-xl hover:shadow-tertiary/30 max-w-sm p-6 rounded-xl space-y-4 flex flex-col justify-between">
                <!-- Logo -->
                <div class="">
                    <img src="https://img.logoipsum.com/285.svg" className="w-36 h-10" alt="" />
                </div>
                <!-- Company Ipsum By Person Name & Price -->
                <div class="flex w-full justify-between">
                    <div class="flex flex-col justify-between">
                        <span class="font-bold text-lg">Company Name</span>
                        <pre class="italic text-xs">by "Person Name"</pre>
                    </div>
                    <div
                        class="flex items-center gap-5 border border-dashed border-tertiary rounded-lg h-max py-1 px-4">
                        <span class="text-xs">Price</span>
                        <span class=" font-bold">$20</span>
                    </div>
                </div>
                <!-- Subtitle -->
                <div class="text-lg italic h-12">SUB TAG LINE, that has some features. some features!</div>
                <!-- Software Versions -->
                <div class="italic">
                    <span class="font-bold ">Software Version:</span>
                    <span class="">App 4.9.x - 5.2.x, other</span>
                </div>
                <!-- File Types -->
                <div class="space-y-2">
                    <div class="font-bold">File Type Included:</div>
                    <!-- File Chips -->
                    <div class="flex flex-wrap gap-4">
                        <div class="bg-primary w-max rounded-md text-sm px-3">HTML</div>
                        <div class="bg-primary w-max rounded-md text-sm px-3">HTML</div>
                        <div class="bg-primary w-max rounded-md text-sm px-3">HTML</div>
                        <div class="bg-primary w-max rounded-md text-sm px-3">HTML</div>
                    </div>
                </div>
                <!-- CTA -->
                <div class="flex gap-3 pt-3">
                    <button class="hover:shadow-lg bg-tertiary text-brand-white px-6 py-2 rounded-md font-bold">Buy
                        Now</button>
                    <button
                        class="hover:shadow-lg bg-primary border-2 border-tertiary px-6 py-2 rounded-md  font-bold">Live
                        Preview</button>
                </div>
            </div>
            <!-- Card -->
            <div
                class="bg-brand-white hover:shadow-xl hover:shadow-tertiary/30 max-w-sm p-6 rounded-xl space-y-4 flex flex-col justify-between">
                <!-- Logo -->
                <div class="">
                    <img src="https://img.logoipsum.com/285.svg" className="w-36 h-10" alt="" />
                </div>
                <!-- Company Ipsum By Person Name & Price -->
                <div class="flex w-full justify-between">
                    <div class="flex flex-col justify-between">
                        <span class="font-bold text-lg">Company Name</span>
                        <pre class="italic text-xs">by "Person Name"</pre>
                    </div>
                    <div
                        class="flex items-center gap-5 border border-dashed border-tertiary rounded-lg h-max py-1 px-4">
                        <span class="text-xs">Price</span>
                        <span class=" font-bold">$20</span>
                    </div>
                </div>
                <!-- Subtitle -->
                <div class="text-lg italic h-12">SUB TAG LINE, that has some features. some features!</div>
                <!-- Software Versions -->
                <div class="italic">
                    <span class="font-bold ">Software Version:</span>
                    <span class="">App 4.9.x - 5.2.x, other</span>
                </div>
                <!-- File Types -->
                <div class="space-y-2">
                    <div class="font-bold">File Type Included:</div>
                    <!-- File Chips -->
                    <div class="flex flex-wrap gap-4">
                        <div class="bg-primary w-max rounded-md text-sm px-3">HTML</div>
                        <div class="bg-primary w-max rounded-md text-sm px-3">HTML</div>
                        <div class="bg-primary w-max rounded-md text-sm px-3">HTML</div>
                        <div class="bg-primary w-max rounded-md text-sm px-3">HTML</div>
                    </div>
                </div>
                <!-- CTA -->
                <div class="flex gap-3 pt-3">
                    <button class="hover:shadow-lg bg-tertiary text-brand-white px-6 py-2 rounded-md font-bold">Buy
                        Now</button>
                    <button
                        class="hover:shadow-lg bg-primary border-2 border-tertiary px-6 py-2 rounded-md  font-bold">Live
                        Preview</button>
                </div>
            </div>
            <!-- Card -->
            <div
                class="bg-brand-white hover:shadow-xl hover:shadow-tertiary/30 max-w-sm p-6 rounded-xl space-y-4 flex flex-col justify-between">
                <!-- Logo -->
                <div class="">
                    <img src="https://img.logoipsum.com/285.svg" className="w-36 h-10" alt="" />
                </div>
                <!-- Company Ipsum By Person Name & Price -->
                <div class="flex w-full justify-between">
                    <div class="flex flex-col justify-between">
                        <span class="font-bold text-lg">Company Name</span>
                        <pre class="italic text-xs">by "Person Name"</pre>
                    </div>
                    <div
                        class="flex items-center gap-5 border border-dashed border-tertiary rounded-lg h-max py-1 px-4">
                        <span class="text-xs">Price</span>
                        <span class=" font-bold">$20</span>
                    </div>
                </div>
                <!-- Subtitle -->
                <div class="text-lg italic h-12">SUB TAG LINE, that has some features. some features!</div>
                <!-- Software Versions -->
                <div class="italic">
                    <span class="font-bold ">Software Version:</span>
                    <span class="">App 4.9.x - 5.2.x, other</span>
                </div>
                <!-- File Types -->
                <div class="space-y-2">
                    <div class="font-bold">File Type Included:</div>
                    <!-- File Chips -->
                    <div class="flex flex-wrap gap-4">
                        <div class="bg-primary w-max rounded-md text-sm px-3">HTML</div>
                        <div class="bg-primary w-max rounded-md text-sm px-3">HTML</div>
                        <div class="bg-primary w-max rounded-md text-sm px-3">HTML</div>
                        <div class="bg-primary w-max rounded-md text-sm px-3">HTML</div>
                    </div>
                </div>
                <!-- CTA -->
                <div class="flex gap-3 pt-3">
                    <button class="hover:shadow-lg bg-tertiary text-brand-white px-6 py-2 rounded-md font-bold">Buy
                        Now</button>
                    <button
                        class="hover:shadow-lg bg-primary border-2 border-tertiary px-6 py-2 rounded-md  font-bold">Live
                        Preview</button>
                </div>
            </div>
            <!-- Card -->
            <div
                class="bg-brand-white hover:shadow-xl hover:shadow-tertiary/30 max-w-sm p-6 rounded-xl space-y-4 flex flex-col justify-between">
                <!-- Logo -->
                <div class="">
                    <img src="https://img.logoipsum.com/285.svg" className="w-36 h-10" alt="" />
                </div>
                <!-- Company Ipsum By Person Name & Price -->
                <div class="flex w-full justify-between">
                    <div class="flex flex-col justify-between">
                        <span class="font-bold text-lg">Company Name</span>
                        <pre class="italic text-xs">by "Person Name"</pre>
                    </div>
                    <div
                        class="flex items-center gap-5 border border-dashed border-tertiary rounded-lg h-max py-1 px-4">
                        <span class="text-xs">Price</span>
                        <span class=" font-bold">$20</span>
                    </div>
                </div>
                <!-- Subtitle -->
                <div class="text-lg italic h-12">SUB TAG LINE, that has some features. some features!</div>
                <!-- Software Versions -->
                <div class="italic">
                    <span class="font-bold ">Software Version:</span>
                    <span class="">App 4.9.x - 5.2.x, other</span>
                </div>
                <!-- File Types -->
                <div class="space-y-2">
                    <div class="font-bold">File Type Included:</div>
                    <!-- File Chips -->
                    <div class="flex flex-wrap gap-4">
                        <div class="bg-primary w-max rounded-md text-sm px-3">HTML</div>
                        <div class="bg-primary w-max rounded-md text-sm px-3">HTML</div>
                        <div class="bg-primary w-max rounded-md text-sm px-3">HTML</div>
                        <div class="bg-primary w-max rounded-md text-sm px-3">HTML</div>
                    </div>
                </div>
                <!-- CTA -->
                <div class="flex gap-3 pt-3">
                    <button class="hover:shadow-lg bg-tertiary text-brand-white px-6 py-2 rounded-md font-bold">Buy
                        Now</button>
                    <button
                        class="hover:shadow-lg bg-primary border-2 border-tertiary px-6 py-2 rounded-md  font-bold">Live
                        Preview</button>
                </div>
            </div>
            <!-- Card -->
            <div
                class="bg-brand-white hover:shadow-xl hover:shadow-tertiary/30 max-w-sm p-6 rounded-xl space-y-4 flex flex-col justify-between">
                <!-- Logo -->
                <div class="">
                    <img src="https://img.logoipsum.com/285.svg" className="w-36 h-10" alt="" />
                </div>
                <!-- Company Ipsum By Person Name & Price -->
                <div class="flex w-full justify-between">
                    <div class="flex flex-col justify-between">
                        <span class="font-bold text-lg">Company Name</span>
                        <pre class="italic text-xs">by "Person Name"</pre>
                    </div>
                    <div
                        class="flex items-center gap-5 border border-dashed border-tertiary rounded-lg h-max py-1 px-4">
                        <span class="text-xs">Price</span>
                        <span class=" font-bold">$20</span>
                    </div>
                </div>
                <!-- Subtitle -->
                <div class="text-lg italic h-12">SUB TAG LINE, that has some features. some features!</div>
                <!-- Software Versions -->
                <div class="italic">
                    <span class="font-bold ">Software Version:</span>
                    <span class="">App 4.9.x - 5.2.x, other</span>
                </div>
                <!-- File Types -->
                <div class="space-y-2">
                    <div class="font-bold">File Type Included:</div>
                    <!-- File Chips -->
                    <div class="flex flex-wrap gap-4">
                        <div class="bg-primary w-max rounded-md text-sm px-3">HTML</div>
                        <div class="bg-primary w-max rounded-md text-sm px-3">HTML</div>
                        <div class="bg-primary w-max rounded-md text-sm px-3">HTML</div>
                        <div class="bg-primary w-max rounded-md text-sm px-3">HTML</div>
                    </div>
                </div>
                <!-- CTA -->
                <div class="flex gap-3 pt-3">
                    <button class="hover:shadow-lg bg-tertiary text-brand-white px-6 py-2 rounded-md font-bold">Buy
                        Now</button>
                    <button
                        class="hover:shadow-lg bg-primary border-2 border-tertiary px-6 py-2 rounded-md  font-bold">Live
                        Preview</button>
                </div>
            </div>

        </div>
    </div>
    <script>
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
    </script>
    <!-- End Single Product Coding Here -->

    <?php wp_footer();?>
</body>

</html>