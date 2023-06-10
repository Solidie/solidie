<!doctype html>
<html>

<head>
    <?php wp_head(); ?>
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
    <div class="appstore-special-catalog-wrapper">
        <div>
            <!--
      Mobile filter dialog

      Off-canvas filters for mobile, show/hide based on off-canvas filters state.
    -->
            <div class="fixed inset-0 flex z-40 lg:hidden" role="dialog" aria-modal="true">
                <!--
        Off-canvas menu overlay, show/hide based on off-canvas menu state.

        Entering: "transition-opacity ease-linear duration-300"
          From: "opacity-0"
          To: "opacity-100"
        Leaving: "transition-opacity ease-linear duration-300"
          From: "opacity-100"
          To: "opacity-0"
      -->
                <div class="fixed inset-0 bg-black bg-opacity-25" aria-hidden="true"></div>

                <!--
        Off-canvas menu, show/hide based on off-canvas menu state.

        Entering: "transition ease-in-out duration-300 transform"
          From: "translate-x-full"
          To: "translate-x-0"
        Leaving: "transition ease-in-out duration-300 transform"
          From: "translate-x-0"
          To: "translate-x-full"
      -->
                <div
                    class="ml-auto relative max-w-xs w-full h-full bg-transparent shadow-xl py-4 pb-12 flex flex-col overflow-y-auto">
                    <div class="px-4 flex items-center justify-between">
                        <h2 class="text-lg font-medium text-gray-900">Filters</h2>
                        <button type="button"
                            class="-mr-2 w-10 h-10 bg-transparent p-2 rounded-md flex items-center justify-center text-gray-400">
                            <span class="sr-only">Close menu</span>
                            <!-- Heroicon name: outline/x -->
                            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <!-- Filters -->
                    <form class="mt-4 border-t border-gray-200">
                        <h3 class="sr-only">Categories</h3>
                        <ul role="list" class="font-medium text-gray-900 px-2 py-3">
                            <li>
                                <a href="#" class="block px-2 py-3"> Totes </a>
                            </li>

                            <li>
                                <a href="#" class="block px-2 py-3"> Backpacks </a>
                            </li>

                            <li>
                                <a href="#" class="block px-2 py-3"> Travel Bags </a>
                            </li>

                            <li>
                                <a href="#" class="block px-2 py-3"> Hip Bags </a>
                            </li>

                            <li>
                                <a href="#" class="block px-2 py-3"> Laptop Sleeves </a>
                            </li>
                        </ul>

                        <div class="border-t border-gray-200 px-4 py-6">
                            <h3 class="-mx-2 -my-3 flow-root">
                                <!-- Expand/collapse section button -->
                                <button type="button"
                                    class="px-2 py-3 bg-transparent w-full flex items-center justify-between text-gray-400 hover:text-gray-500"
                                    aria-controls="filter-section-mobile-0" aria-expanded="false">
                                    <span class="font-medium text-gray-900"> Color </span>
                                    <span class="ml-6 flex items-center">
                                        <!--
                    Expand icon, show/hide based on section open state.

                    Heroicon name: solid/plus-sm
                  -->
                                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                            fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd"
                                                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                                clip-rule="evenodd" />
                                        </svg>
                                        <!--
                    Collapse icon, show/hide based on section open state.

                    Heroicon name: solid/minus-sm
                  -->
                                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                            fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd"
                                                d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                                                clip-rule="evenodd" />
                                        </svg>
                                    </span>
                                </button>
                            </h3>
                            <!-- Filter section, show/hide based on section state. -->
                            <div class="pt-6" id="filter-section-mobile-0">
                                <div class="space-y-6">
                                    <div class="flex items-center">
                                        <input id="filter-mobile-color-0" name="color[]" value="white" type="checkbox"
                                            class="h-4 w-4 border-gray-300 rounded text-tertiary focus:ring-tertiary/60">
                                        <label for="filter-mobile-color-0" class="ml-3 min-w-0 flex-1 text-gray-500">
                                            White </label>
                                    </div>

                                    <div class="flex items-center">
                                        <input id="filter-mobile-color-1" name="color[]" value="beige" type="checkbox"
                                            class="h-4 w-4 border-gray-300 rounded text-tertiary focus:ring-tertiary/60">
                                        <label for="filter-mobile-color-1" class="ml-3 min-w-0 flex-1 text-gray-500">
                                            Beige </label>
                                    </div>

                                    <div class="flex items-center">
                                        <input id="filter-mobile-color-2" name="color[]" value="blue" type="checkbox"
                                            checked
                                            class="h-4 w-4 border-gray-300 rounded text-tertiary focus:ring-tertiary/60">
                                        <label for="filter-mobile-color-2" class="ml-3 min-w-0 flex-1 text-gray-500">
                                            Blue </label>
                                    </div>

                                    <div class="flex items-center">
                                        <input id="filter-mobile-color-3" name="color[]" value="brown" type="checkbox"
                                            class="h-4 w-4 border-gray-300 rounded text-tertiary focus:ring-tertiary/60">
                                        <label for="filter-mobile-color-3" class="ml-3 min-w-0 flex-1 text-gray-500">
                                            Brown </label>
                                    </div>

                                    <div class="flex items-center">
                                        <input id="filter-mobile-color-4" name="color[]" value="green" type="checkbox"
                                            class="h-4 w-4 border-gray-300 rounded text-tertiary focus:ring-tertiary/60">
                                        <label for="filter-mobile-color-4" class="ml-3 min-w-0 flex-1 text-gray-500">
                                            Green </label>
                                    </div>

                                    <div class="flex items-center">
                                        <input id="filter-mobile-color-5" name="color[]" value="purple" type="checkbox"
                                            class="h-4 w-4 border-gray-300 rounded text-tertiary focus:ring-tertiary/60">
                                        <label for="filter-mobile-color-5" class="ml-3 min-w-0 flex-1 text-gray-500">
                                            Purple </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="border-t border-gray-200 px-4 py-6">
                            <h3 class="-mx-2 -my-3 flow-root">
                                <!-- Expand/collapse section button -->
                                <button type="button"
                                    class="px-2 py-3 bg-transparent w-full flex items-center justify-between text-gray-400 hover:text-gray-500"
                                    aria-controls="filter-section-mobile-1" aria-expanded="false">
                                    <span class="font-medium text-gray-900"> Category </span>
                                    <span class="ml-6 flex items-center">
                                        <!--
                    Expand icon, show/hide based on section open state.

                    Heroicon name: solid/plus-sm
                  -->
                                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                            fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd"
                                                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                                clip-rule="evenodd" />
                                        </svg>
                                        <!--
                    Collapse icon, show/hide based on section open state.

                    Heroicon name: solid/minus-sm
                  -->
                                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                            fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd"
                                                d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                                                clip-rule="evenodd" />
                                        </svg>
                                    </span>
                                </button>
                            </h3>
                            <!-- Filter section, show/hide based on section state. -->
                            <div class="pt-6" id="filter-section-mobile-1">
                                <div class="space-y-6">
                                    <div class="flex items-center">
                                        <input id="filter-mobile-category-0" name="category[]" value="new-arrivals"
                                            type="checkbox"
                                            class="h-4 w-4 border-gray-300 rounded text-tertiary focus:ring-tertiary/60">
                                        <label for="filter-mobile-category-0" class="ml-3 min-w-0 flex-1 text-gray-500">
                                            New Arrivals </label>
                                    </div>

                                    <div class="flex items-center">
                                        <input id="filter-mobile-category-1" name="category[]" value="sale"
                                            type="checkbox"
                                            class="h-4 w-4 border-gray-300 rounded text-tertiary focus:ring-tertiary/60">
                                        <label for="filter-mobile-category-1" class="ml-3 min-w-0 flex-1 text-gray-500">
                                            Sale </label>
                                    </div>

                                    <div class="flex items-center">
                                        <input id="filter-mobile-category-2" name="category[]" value="travel"
                                            type="checkbox" checked
                                            class="h-4 w-4 border-gray-300 rounded text-tertiary focus:ring-tertiary/60">
                                        <label for="filter-mobile-category-2" class="ml-3 min-w-0 flex-1 text-gray-500">
                                            Travel </label>
                                    </div>

                                    <div class="flex items-center">
                                        <input id="filter-mobile-category-3" name="category[]" value="organization"
                                            type="checkbox"
                                            class="h-4 w-4 border-gray-300 rounded text-tertiary focus:ring-tertiary/60">
                                        <label for="filter-mobile-category-3" class="ml-3 min-w-0 flex-1 text-gray-500">
                                            Organization </label>
                                    </div>

                                    <div class="flex items-center">
                                        <input id="filter-mobile-category-4" name="category[]" value="accessories"
                                            type="checkbox"
                                            class="h-4 w-4 border-gray-300 rounded text-tertiary focus:ring-tertiary/60">
                                        <label for="filter-mobile-category-4" class="ml-3 min-w-0 flex-1 text-gray-500">
                                            Accessories </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="border-t border-gray-200 px-4 py-6">
                            <h3 class="-mx-2 -my-3 flow-root">
                                <!-- Expand/collapse section button -->
                                <button type="button"
                                    class="px-2 py-3 bg-transparent w-full flex items-center justify-between text-gray-400 hover:text-gray-500"
                                    aria-controls="filter-section-mobile-2" aria-expanded="false">
                                    <span class="font-medium text-gray-900"> Size </span>
                                    <span class="ml-6 flex items-center">
                                        <!--
                    Expand icon, show/hide based on section open state.

                    Heroicon name: solid/plus-sm
                  -->
                                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                            fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd"
                                                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                                clip-rule="evenodd" />
                                        </svg>
                                        <!--
                    Collapse icon, show/hide based on section open state.

                    Heroicon name: solid/minus-sm
                  -->
                                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                            fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd"
                                                d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                                                clip-rule="evenodd" />
                                        </svg>
                                    </span>
                                </button>
                            </h3>
                            <!-- Filter section, show/hide based on section state. -->
                            <div class="pt-6" id="filter-section-mobile-2">
                                <div class="space-y-6">
                                    <div class="flex items-center">
                                        <input id="filter-mobile-size-0" name="size[]" value="2l" type="checkbox"
                                            class="h-4 w-4 border-gray-300 rounded text-tertiary focus:ring-tertiary/60">
                                        <label for="filter-mobile-size-0" class="ml-3 min-w-0 flex-1 text-gray-500"> 2L
                                        </label>
                                    </div>

                                    <div class="flex items-center">
                                        <input id="filter-mobile-size-1" name="size[]" value="6l" type="checkbox"
                                            class="h-4 w-4 border-gray-300 rounded text-tertiary focus:ring-tertiary/60">
                                        <label for="filter-mobile-size-1" class="ml-3 min-w-0 flex-1 text-gray-500"> 6L
                                        </label>
                                    </div>

                                    <div class="flex items-center">
                                        <input id="filter-mobile-size-2" name="size[]" value="12l" type="checkbox"
                                            class="h-4 w-4 border-gray-300 rounded text-tertiary focus:ring-tertiary/60">
                                        <label for="filter-mobile-size-2" class="ml-3 min-w-0 flex-1 text-gray-500"> 12L
                                        </label>
                                    </div>

                                    <div class="flex items-center">
                                        <input id="filter-mobile-size-3" name="size[]" value="18l" type="checkbox"
                                            class="h-4 w-4 border-gray-300 rounded text-tertiary focus:ring-tertiary/60">
                                        <label for="filter-mobile-size-3" class="ml-3 min-w-0 flex-1 text-gray-500"> 18L
                                        </label>
                                    </div>

                                    <div class="flex items-center">
                                        <input id="filter-mobile-size-4" name="size[]" value="20l" type="checkbox"
                                            class="h-4 w-4 border-gray-300 rounded text-tertiary focus:ring-tertiary/60">
                                        <label for="filter-mobile-size-4" class="ml-3 min-w-0 flex-1 text-gray-500"> 20L
                                        </label>
                                    </div>

                                    <div class="flex items-center">
                                        <input id="filter-mobile-size-5" name="size[]" value="40l" type="checkbox"
                                            checked
                                            class="h-4 w-4 border-gray-300 rounded text-tertiary focus:ring-tertiary/60">
                                        <label for="filter-mobile-size-5" class="ml-3 min-w-0 flex-1 text-gray-500"> 40L
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <main class=" mx-auto px-4 sm:px-6 lg:px-8">
                <div class="relative z-10 flex items-baseline justify-between pt-24 pb-6 border-b border-gray-200">
                    <h1 class="text-4xl font-extrabold tracking-tight text-gray-900">New Arrivals</h1>

                    <div class="flex items-center">
                        <div class="relative inline-block text-left">
                            <div>
                                <button type="button"
                                    class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
                                    id="menu-button" aria-expanded="false" aria-haspopup="true">
                                    Sort
                                    <!-- Heroicon name: solid/chevron-down -->
                                    <svg class="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
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

                            <div class="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg shadow-tertiary/60 bg-primary ring-1 ring-black ring-opacity-5 focus:outline-none"
                                role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                                <div class="py-1" role="none">
                                    <!--
                  Active: "bg-gray-100", Not Active: ""

                  Selected: "font-medium text-gray-900", Not Selected: "text-gray-500"
                -->
                                    <a href="#" class="font-medium text-gray-900 block px-4 py-2 text-sm"
                                        role="menuitem" tabindex="-1" id="menu-item-0"> Most Popular </a>

                                    <a href="#" class="text-gray-500 block px-4 py-2 text-sm" role="menuitem"
                                        tabindex="-1" id="menu-item-1"> Best Rating </a>

                                    <a href="#" class="text-gray-500 block px-4 py-2 text-sm" role="menuitem"
                                        tabindex="-1" id="menu-item-2"> Newest </a>

                                    <a href="#" class="text-gray-500 block px-4 py-2 text-sm" role="menuitem"
                                        tabindex="-1" id="menu-item-3"> Price: Low to High </a>

                                    <a href="#" class="text-gray-500 block px-4 py-2 text-sm" role="menuitem"
                                        tabindex="-1" id="menu-item-4"> Price: High to Low </a>
                                </div>
                            </div>
                        </div>

                        <button type="button" class="p-2 -m-2 ml-5 sm:ml-7 text-gray-400 hover:text-gray-500">
                            <span class="sr-only">View grid</span>
                            <!-- Heroicon name: solid/view-grid -->
                            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20" fill="currentColor">
                                <path
                                    d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                            </svg>
                        </button>
                        <button type="button" class="p-2 -m-2 ml-4 sm:ml-6 text-gray-400 hover:text-gray-500 lg:hidden">
                            <span class="sr-only">Filters</span>
                            <!-- Heroicon name: solid/filter -->
                            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                                    clip-rule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>

                <section aria-labelledby="products-heading" class="pt-6 pb-24">
                    <h2 id="products-heading" class="sr-only">Products</h2>

                    <div class="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
                        <!-- Filters -->
                        <form class="hidden lg:block">
                            <h3 class="sr-only">Categories</h3>
                            <ul role="list"
                                class="text-sm font-medium text-gray-900 space-y-4 pb-6 border-b border-gray-200">
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

                            <div class="border-b border-gray-200 py-6">
                                <fieldset>
                                    <h3 class="-my-3 flow-root">
                                        <!-- Expand/collapse section button -->
                                        <button type="button"
                                            class="py-3 bg-transparent w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500"
                                            aria-controls="filter-section-1" aria-expanded="false">
                                            <legend class="font-medium text-gray-900"> Category </legend>
                                            <span class="ml-6 flex items-center">
                                                <!--
                      Expand icon, show/hide based on section open state.

                      Heroicon name: solid/plus-sm
                    -->
                                                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path fill-rule="evenodd"
                                                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                                        clip-rule="evenodd" />
                                                </svg>
                                                <!--
                      Collapse icon, show/hide based on section open state.

                      Heroicon name: solid/minus-sm
                    -->
                                                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path fill-rule="evenodd"
                                                        d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                                                        clip-rule="evenodd" />
                                                </svg>
                                            </span>
                                        </button>
                                    </h3>
                                    <!-- Filter section, show/hide based on section state. -->

                                    <div class="pt-6 space-y-6 sm:space-y-4">
                                        <div class="flex items-center text-base sm:text-sm">
                                            <input id="category-0" name="wordpress[]" value="0" type="checkbox"
                                                class="flex-shrink-0 h-4 w-4 border-tertiary/30 rounded text-tertiary focus:ring-tertiary/60">
                                            <label for="category-0" class="ml-3 min-w-0 flex-1 text-tertiary/80">
                                                Wordpress
                                            </label>
                                        </div>

                                        <div class="flex items-center text-base sm:text-sm">
                                            <input id="category-1" name="forms[]" value="25" type="checkbox"
                                                class="flex-shrink-0 h-4 w-4 border-tertiary/30 rounded text-tertiary focus:ring-tertiary/60">
                                            <label for="category-1" class="ml-3 min-w-0 flex-1 text-tertiary/80"> Forms
                                            </label>
                                        </div>

                                        <div class="flex items-center text-base sm:text-sm">
                                            <input id="category-2" name="ecommerce[]" value="50" type="checkbox"
                                                class="flex-shrink-0 h-4 w-4 border-tertiary/30 rounded text-tertiary focus:ring-tertiary/60">
                                            <label for="category-2" class="ml-3 min-w-0 flex-1 text-tertiary/80">
                                                eCommerce
                                            </label>
                                        </div>

                                        <div class="flex items-center text-base sm:text-sm">
                                            <input id="category-3" name="add-ons[]" value="75" type="checkbox"
                                                class="flex-shrink-0 h-4 w-4 border-tertiary/30 rounded text-tertiary focus:ring-tertiary/60">
                                            <label for="category-3" class="ml-3 min-w-0 flex-1 text-tertiary/80"> Add
                                                Ons
                                            </label>
                                        </div>
                                        <div class="flex items-center text-base sm:text-sm">
                                            <input id="category-4" name="calendars[]" value="white" type="checkbox"
                                                class="flex-shrink-0 h-4 w-4 border-tertiary/30 rounded text-tertiary focus:ring-tertiary/60">
                                            <label for="category-4" class="ml-3 min-w-0 flex-1 text-tertiary/80">
                                                Calendars
                                            </label>
                                        </div>

                                        <div class="flex items-center text-base sm:text-sm">
                                            <input id="category-5" name="interface-elements[]" value="beige"
                                                type="checkbox"
                                                class="flex-shrink-0 h-4 w-4 border-tertiary/30 rounded text-tertiary focus:ring-tertiary/60">
                                            <label for="category-5" class="ml-3 min-w-0 flex-1 text-tertiary/80">
                                                Interface
                                                Elements
                                            </label>
                                        </div>

                                        <div class="flex items-center text-base sm:text-sm">
                                            <input id="category-6" name="news-letters[]" value="blue" type="checkbox"
                                                class="flex-shrink-0 h-4 w-4 border-tertiary/30 rounded text-tertiary focus:ring-tertiary/60"
                                                checked>
                                            <label for="category-6" class="ml-3 min-w-0 flex-1 text-tertiary/80"> News
                                                letters
                                            </label>
                                        </div>
                                    </div>
                                </fieldset>
                            </div>

                            <div class="border-b border-gray-200 py-6">
                                <fieldset>
                                    <h3 class="-my-3 flow-root">
                                        <!-- Expand/collapse section button -->
                                        <button type="button"
                                            class="py-3 bg-transparent w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500"
                                            aria-controls="filter-section-1" aria-expanded="false">
                                            <legend class="font-medium text-gray-900"> Pricing </legend>
                                            <span class="ml-6 flex items-center">
                                                <!--
                      Expand icon, show/hide based on section open state.

                      Heroicon name: solid/plus-sm
                    -->
                                                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path fill-rule="evenodd"
                                                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                                        clip-rule="evenodd" />
                                                </svg>
                                                <!--
                      Collapse icon, show/hide based on section open state.

                      Heroicon name: solid/minus-sm
                    -->
                                                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path fill-rule="evenodd"
                                                        d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                                                        clip-rule="evenodd" />
                                                </svg>
                                            </span>
                                        </button>
                                    </h3>
                                    <!-- Filter section, show/hide based on section state. -->
                                    <div class="pt-6 space-y-6 sm:space-y-4">
                                        <div class="flex items-center text-base sm:text-sm">
                                            <input id="price-0" name="price[]" value="0" type="checkbox"
                                                class="flex-shrink-0 h-4 w-4 border-tertiary/30 rounded text-tertiary focus:ring-tertiary/60">
                                            <label for="price-0" class="ml-3 min-w-0 flex-1 text-tertiary/60"> $0 - $25
                                            </label>
                                        </div>

                                        <div class="flex items-center text-base sm:text-sm">
                                            <input id="price-1" name="price[]" value="25" type="checkbox"
                                                class="flex-shrink-0 h-4 w-4 border-tertiary/30 rounded text-tertiary focus:ring-tertiary/60">
                                            <label for="price-1" class="ml-3 min-w-0 flex-1 text-tertiary/60"> $25 - $50
                                            </label>
                                        </div>

                                        <div class="flex items-center text-base sm:text-sm">
                                            <input id="price-2" name="price[]" value="50" type="checkbox"
                                                class="flex-shrink-0 h-4 w-4 border-tertiary/30 rounded text-tertiary focus:ring-tertiary/60">
                                            <label for="price-2" class="ml-3 min-w-0 flex-1 text-tertiary/60"> $50 - $75
                                            </label>
                                        </div>

                                        <div class="flex items-center text-base sm:text-sm">
                                            <input id="price-3" name="price[]" value="75" type="checkbox"
                                                class="flex-shrink-0 h-4 w-4 border-tertiary/30 rounded text-tertiary focus:ring-tertiary/60">
                                            <label for="price-3" class="ml-3 min-w-0 flex-1 text-tertiary/60"> $75+
                                            </label>
                                        </div>
                                    </div>
                                </fieldset>
                            </div>
                            <div class="border-b border-gray-200 py-6">
                                <fieldset>
                                    <h3 class="-my-3 flow-root">
                                        <!-- Expand/collapse section button -->
                                        <button type="button"
                                            class="py-3 bg-transparent w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500"
                                            aria-controls="filter-section-1" aria-expanded="false">
                                            <legend class="font-medium text-gray-900"> Compatible With </legend>
                                            <span class="ml-6 flex items-center">
                                                <!--
                      Expand icon, show/hide based on section open state.

                      Heroicon name: solid/plus-sm
                    -->
                                                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path fill-rule="evenodd"
                                                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                                        clip-rule="evenodd" />
                                                </svg>
                                                <!--
                      Collapse icon, show/hide based on section open state.

                      Heroicon name: solid/minus-sm
                    -->
                                                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path fill-rule="evenodd"
                                                        d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                                                        clip-rule="evenodd" />
                                                </svg>
                                            </span>
                                        </button>
                                    </h3>
                                    <!-- Filter section, show/hide based on section state. -->
                                    <div class="pt-6 space-y-6 sm:space-y-4">
                                        <div class="flex items-center text-base sm:text-sm">
                                            <input id="compatible-with-0" name="compatible-with[]" value="block-editor"
                                                type="checkbox"
                                                class="flex-shrink-0 h-4 w-4 border-tertiary/30 rounded text-indigo-600 focus:ring-indigo-500">
                                            <label for="compatible-with-0" class="ml-3 min-w-0 flex-1 text-tertiary/60">
                                                Block
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
                            </div>

                            <div class="border-b border-gray-200 py-6">
                                <fieldset>
                                    <h3 class="-my-3 flow-root">
                                        <!-- Expand/collapse section button -->
                                        <button type="button"
                                            class="py-3 bg-transparent w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500"
                                            aria-controls="filter-section-1" aria-expanded="false">
                                            <legend class="font-medium text-gray-900">Sales</legend>
                                            <span class="ml-6 flex items-center">
                                                <!--
                      Expand icon, show/hide based on section open state.

                      Heroicon name: solid/plus-sm
                    -->
                                                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path fill-rule="evenodd"
                                                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                                        clip-rule="evenodd" />
                                                </svg>
                                                <!--
                      Collapse icon, show/hide based on section open state.

                      Heroicon name: solid/minus-sm
                    -->
                                                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path fill-rule="evenodd"
                                                        d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                                                        clip-rule="evenodd" />
                                                </svg>
                                            </span>
                                        </button>
                                    </h3>
                                    <!-- Filter section, show/hide based on section state. -->

                                    <div class="pt-6 space-y-6 sm:space-y-4">
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
                                            <label for="sales-1" class="ml-3 min-w-0 flex-1 text-tertiary/60"> Low
                                            </label>
                                        </div>

                                        <div class="flex items-center text-base sm:text-sm">
                                            <input id="sales-2" name="sales[]" value="medium" type="checkbox"
                                                class="flex-shrink-0 h-4 w-4 border-tertiary/30 rounded text-indigo-600 focus:ring-indigo-500">
                                            <label for="sales-2" class="ml-3 min-w-0 flex-1 text-tertiary/60"> Medium
                                            </label>
                                        </div>

                                        <div class="flex items-center text-base sm:text-sm">
                                            <input id="sales-3" name="sales[]" value="high" type="checkbox"
                                                class="flex-shrink-0 h-4 w-4 border-tertiary/30 rounded text-indigo-600 focus:ring-indigo-500">
                                            <label for="sales-3" class="ml-3 min-w-0 flex-1 text-tertiary/60"> High
                                            </label>
                                        </div>

                                        <div class="flex items-center text-base sm:text-sm">
                                            <input id="sales-4" name="sales[]" value="top-sellers" type="checkbox"
                                                class="flex-shrink-0 h-4 w-4 border-tertiary/30 rounded text-indigo-600 focus:ring-indigo-500">
                                            <label for="sales-4" class="ml-3 min-w-0 flex-1 text-tertiary/60"> Top
                                                Sellers
                                            </label>
                                        </div>

                                    </div>
                                </fieldset>
                            </div>

                            <div class="border-b border-gray-200 py-6">
                                <fieldset>
                                    <h3 class="-my-3 flow-root">
                                        <!-- Expand/collapse section button -->
                                        <button type="button"
                                            class="py-3 bg-transparent w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500"
                                            aria-controls="filter-section-1" aria-expanded="false">
                                            <legend class="font-medium text-gray-900">Rating</legend>
                                            <span class="ml-6 flex items-center">
                                                <!--
                      Expand icon, show/hide based on section open state.

                      Heroicon name: solid/plus-sm
                    -->
                                                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path fill-rule="evenodd"
                                                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                                        clip-rule="evenodd" />
                                                </svg>
                                                <!--
                      Collapse icon, show/hide based on section open state.

                      Heroicon name: solid/minus-sm
                    -->
                                                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path fill-rule="evenodd"
                                                        d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                                                        clip-rule="evenodd" />
                                                </svg>
                                            </span>
                                        </button>
                                    </h3>
                                    <!-- Filter section, show/hide based on section state. -->
                                    <div class="pt-6 space-y-6 sm:space-y-4">
                                        <div class="flex items-center">
                                            <input id="show-all" name="rating" type="radio" checked
                                                class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-tertiary/30">
                                            <label for="show-all" class="ml-3 block text-sm text-tertiary/70"> Show All
                                            </label>
                                        </div>

                                        <div class="flex items-center">
                                            <input id="one-star-and-higher" name="rating" type="radio"
                                                class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-tertiary/30">
                                            <label for="one-star-and-higher"
                                                class="ml-3 block text-sm text-tertiary/70"> 1
                                                Star and Higher</label>
                                        </div>

                                        <div class="flex items-center">
                                            <input id="two-star-and-higher" name="rating" type="radio"
                                                class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-tertiary/30">
                                            <label for="two-star-and-higher"
                                                class="ml-3 block text-sm text-tertiary/70"> 2
                                                Star and Higher</label>
                                        </div>

                                        <div class="flex items-center">
                                            <input id="three-star-and-higher" name="rating" type="radio"
                                                class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-tertiary/30">
                                            <label for="three-star-and-higher"
                                                class="ml-3 block text-sm text-tertiary/70"> 3
                                                Star and Higher</label>
                                        </div>

                                        <div class="flex items-center">
                                            <input id="four-star-and-higher" name="rating" type="radio"
                                                class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-tertiary/30">
                                            <label for="four-star-and-higher"
                                                class="ml-3 block text-sm text-tertiary/70"> 4
                                                Star and Higher</label>
                                        </div>

                                        <div class="flex items-center">
                                            <input id="five-star-and-higher" name="rating" type="radio"
                                                class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-tertiary/30">
                                            <label for="five-star-and-higher"
                                                class="ml-3 block text-sm text-tertiary/70"> 5
                                                Star and Higher</label>
                                        </div>
                                    </div>
                                </fieldset>
                            </div>


                            <div class="border-b border-gray-200 py-6">
                                <fieldset>
                                    <h3 class="-my-3 flow-root">
                                        <!-- Expand/collapse section button -->
                                        <button type="button"
                                            class="py-3 bg-transparent w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500"
                                            aria-controls="filter-section-1" aria-expanded="false">
                                            <legend class="font-medium text-gray-900">Date Added</legend>
                                            <span class="ml-6 flex items-center">
                                                <!--
                      Expand icon, show/hide based on section open state.

                      Heroicon name: solid/plus-sm
                    -->
                                                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path fill-rule="evenodd"
                                                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                                        clip-rule="evenodd" />
                                                </svg>
                                                <!--
                      Collapse icon, show/hide based on section open state.

                      Heroicon name: solid/minus-sm
                    -->
                                                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path fill-rule="evenodd"
                                                        d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                                                        clip-rule="evenodd" />
                                                </svg>
                                            </span>
                                        </button>
                                    </h3>
                                    <!-- Filter section, show/hide based on section state. -->
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
                                            <label for="in-the-last-year" class="ml-3 block text-sm text-tertiary/70">
                                                In the
                                                last year</label>
                                        </div>

                                        <div class="flex items-center">
                                            <input id="in-the-last-month" name="date-added" type="radio"
                                                class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-tertiary/30">
                                            <label for="in-the-last-month" class="ml-3 block text-sm text-tertiary/70">
                                                In the
                                                last month</label>
                                        </div>

                                    </div>
                                </fieldset>
                            </div>


                            <div class="border-b border-gray-200 py-6">
                                <fieldset>
                                    <h3 class="-my-3 flow-root">
                                        <!-- Expand/collapse section button -->
                                        <button type="button"
                                            class="py-3 bg-transparent w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500"
                                            aria-controls="filter-section-1" aria-expanded="false">
                                            <legend class="font-medium text-gray-900"> On Sale </legend>
                                            <span class="ml-6 flex items-center">
                                                <!--
                      Expand icon, show/hide based on section open state.

                      Heroicon name: solid/plus-sm
                    -->
                                                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path fill-rule="evenodd"
                                                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                                        clip-rule="evenodd" />
                                                </svg>
                                                <!--
                      Collapse icon, show/hide based on section open state.

                      Heroicon name: solid/minus-sm
                    -->
                                                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path fill-rule="evenodd"
                                                        d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                                                        clip-rule="evenodd" />
                                                </svg>
                                            </span>
                                        </button>
                                    </h3>
                                    <!-- Filter section, show/hide based on section state. -->
                                    <div class="pt-6 space-y-6 sm:space-y-4">
                                    <div class="flex items-center text-base sm:text-sm">
                                        <input id="on-sale-0" name="on-sale[]" value="true" type="checkbox"
                                            class="flex-shrink-0 h-4 w-4 border-tertiary/30 rounded text-indigo-600 focus:ring-indigo-500">
                                        <label for="on-sale-0" class="ml-3 min-w-0 flex-1 text-tertiary/60"> Yes
                                        </label>
                                    </div>
                                </div>
                                </fieldset>
                            </div>

                        </form>

                        <!-- Product grid -->
                        <div class="lg:col-span-3">
                            <!-- Replace with your content -->
                            <div class="border-4 border-dashed border-gray-200 rounded-lg h-96 lg:h-full p-10">
                                <div class="grid md:grid-cols-2 xl:grid-cols-2 gap-10 place-items-center">
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
                                        <div class="text-lg italic h-12">SUB TAG LINE, that has some features. some
                                            features!</div>
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
                                            <button
                                                class="hover:shadow-lg bg-tertiary text-brand-white px-6 py-2 rounded-md font-bold">Buy
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
                                        <div class="text-lg italic h-12">SUB TAG LINE, that has some features. some
                                            features!</div>
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
                                            <button
                                                class="hover:shadow-lg bg-tertiary text-brand-white px-6 py-2 rounded-md font-bold">Buy
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
                                        <div class="text-lg italic h-12">SUB TAG LINE, that has some features. some
                                            features!</div>
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
                                            <button
                                                class="hover:shadow-lg bg-tertiary text-brand-white px-6 py-2 rounded-md font-bold">Buy
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
                                        <div class="text-lg italic h-12">SUB TAG LINE, that has some features. some
                                            features!</div>
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
                                            <button
                                                class="hover:shadow-lg bg-tertiary text-brand-white px-6 py-2 rounded-md font-bold">Buy
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
                                        <div class="text-lg italic h-12">SUB TAG LINE, that has some features. some
                                            features!</div>
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
                                            <button
                                                class="hover:shadow-lg bg-tertiary text-brand-white px-6 py-2 rounded-md font-bold">Buy
                                                Now</button>
                                            <button
                                                class="hover:shadow-lg bg-primary border-2 border-tertiary px-6 py-2 rounded-md  font-bold">Live
                                                Preview</button>
                                        </div>
                                    </div>

                                </div>

                            </div>
                            <!-- /End replace -->
                        </div>
                    </div>
                </section>
            </main>
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

    <?php wp_footer(); ?>
</body>

</html>