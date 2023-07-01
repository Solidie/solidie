<!doctype html>
<html data-theme="light" class="w-full h-full">

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
                        "brand-tertiary": "#F6F7FD",
                    },
                },
            },
        }
    </script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.5.2/cdn/themes/light.css" />
    <script type="module"
        src="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.5.2/cdn/shoelace-autoloader.js"></script>

</head>

<style>
    /* since nested groupes are not supported we have to use 
         regular css for the nested dropdowns
      */
    .dropdown-li>.dropdown-ul {
        transform: translatex(100%) scale(0);
    }

    .dropdown-li:hover>.dropdown-ul {
        transform: translatex(0%) scale(1);
    }

    .dropdown-li>.dropdown-button .dropdown-svg {
        transform: rotate(-90deg);
    }

    .dropdown-li:hover>.dropdown-button .dropdown-svg {
        transform: rotate(-270deg);
    }

    *::-webkit-scrollbar {
        height: 6px;
        width: 6px;
    }

    *::-webkit-scrollbar-track {
        background: rgba(9, 30, 66, .4);
    }

    *::-webkit-scrollbar-thumb {

        background-color: rgba(9, 30, 66, .7);
        border-radius: 20px;
        /* border: 3px solid rgba(9,30,66,1); */
        box-shadow: 2px solid rgba(9, 30, 66, .2);
    }

    /* header */

    .header {
        background-color: #fff;
        position: fixed;
        width: 100%;
        z-index: 3;
    }

    .header .menu {
        margin: 0;
        padding: 0;
        list-style: none;
        overflow: hidden;
    }

    .header .menu-li .menu-a {
        color: #091E42;
        font-size: 14px;
        font-weight: 500;
        text-decoration: none;
    }

    .header .logo {
        display: block;
        float: left;
        font-size: 2em;
        padding: 10px 20px;
        text-decoration: none;
    }

    /* menu */

    .header .menu {
        clear: both;
        max-height: 0;
        display: none;
        transition: max-height .2s ease-out;
    }

    /* menu icon */

    .header .menu-icon {
        cursor: pointer;
        display: flex;
        justify-content: end;
        float: right;
        padding: 28px 20px;
        position: relative;
        user-select: none;
    }

    .header .menu-icon .navicon {
        background: #333;
        display: block;
        height: 2px;
        position: relative;
        transition: background .2s ease-out;
        width: 18px;
    }

    .header .menu-icon .navicon:before,
    .header .menu-icon .navicon:after {
        background: #333;
        content: '';
        display: block;
        height: 100%;
        position: absolute;
        transition: all .2s ease-out;
        width: 100%;
    }

    .header .menu-icon .navicon:before {
        top: 5px;
    }

    .header .menu-icon .navicon:after {
        top: -5px;
    }

    /* menu btn */

    .header .menu-btn {
        display: none;
    }

    .header .menu-btn:checked~.menu {
        max-height: max-content;
        grid-column-start: 1;
        grid-column-end: 3;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .header .menu-btn:checked~.header {
        flex-wrap: wrap;
    }

    .header .menu-btn:checked~.logo-container {
        flex-grow: 1;
    }

    .header .menu-btn:checked~.menu-icon .navicon {
        background: transparent;
    }

    .header .menu-btn:checked~.menu-icon .navicon:before {
        transform: rotate(-45deg);
    }

    .header .menu-btn:checked~.menu-icon .navicon:after {
        transform: rotate(45deg);
    }

    .header .menu-btn:checked~.header {
        display: flex;
        flex-direction: column;
    }

    .header .menu-btn:checked~.menu-icon:not(.steps) .navicon:before,
    .header .menu-btn:checked~.menu-icon:not(.steps) .navicon:after {
        top: 0;
    }

    /* 48em = 768px */

    @media (min-width: 48em) {
        .header .menu-li {
            float: left;
        }

        .header .menu-li .menu-a {
            padding: 0px 0px;
        }

        .header .menu {
            clear: none;
            float: right;
            max-height: none;
            display: flex;
            align-items: center;
        }

        .header .menu-icon {
            display: none;
        }
    }
</style>

<body class="w-full h-full bg-primary  flex justify-center relative">
    <?php
    $svgIcon = '<svg class="fill-current h-4 w-4 transform transition duration-150 ease-in-out" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
      </svg>';

    $base64Icon = base64_encode($svgIcon);
    $accordianToggleIcon = 'data:image/svg+xml;base64,' . $base64Icon; ?>

    <div
        class="px-5 lg:px-10 Documentation w-full h-full flex-col justify-start items-start flex max-w-screen-2xl mx-auto">
        <header
            class="Frame873 sticky top-0 self-stretch py-3.5 gap-2.5 grid grid-cols-2 auto-rows-auto bg-primary/40 header">
            <img src="https://img.logoipsum.com/285.svg" class="logo w-[143.80px] h-[45px] relative" />
            <input class="menu-btn" type="checkbox" id="menu-btn" />
            <label class="menu-icon" for="menu-btn"><span class="navicon"></span></label>
            <ul
                class="menu w-full rounded-2xl bg-white/20 md:bg-transparent shadow-lg md:shadow-none !py-2 md:py-0 divide-y-2 md:divide-y-0 ">
                <li class="menu-li w-full flex justify-center items-center h-max py-2"><a class="menu-a" href="#work">
                        <div class="group inline-block">
                            <button aria-haspopup="true" aria-controls="menu"
                                class="outline-none focus:outline-none pr-3 py-1 rounded-sm flex items-center min-w-32">
                                <span
                                    class="pr-1 flex-1 text-slate-900 text-[14px] font-medium leading-tight">Dropdown</span>
                                <span>
                                    <svg class="fill-current h-4 w-4 transform group-hover:-rotate-180 transition duration-150 ease-in-out"
                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path
                                            d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                    </svg>
                                </span>
                            </button>
                            <ul id="menu" aria-hidden="true"
                                class="bg-gray-100 rounded-md shadow border border-slate-200 transform scale-0 group-hover:scale-100 absolute transition duration-150 ease-in-out origin-top min-w-32 space-y-2 p-3">
                                <li class="dropdown-li rounded-sm px-3 py-1 hover:bg-gray-100 text-sm ">Programming</li>
                                <li class="dropdown-li rounded-sm px-3 py-1 hover:bg-gray-100 text-sm">DevOps</li>
                                <li class="dropdown-li rounded-sm relative px-3 py-1 hover:bg-gray-100">
                                    <button aria-haspopup="true" aria-controls="menu-lang"
                                        class="dropdown-button w-full text-left flex items-center outline-none focus:outline-none">
                                        <span class=" dropdown-span pr-1 flex-1 text-sm">Langauges</span>
                                        <span class="dropdown-span mr-auto">
                                            <svg class="dropdown-svg fill-current h-4 w-4 transition duration-150 ease-in-out"
                                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                <path
                                                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                            </svg>
                                        </span>
                                    </button>
                                    <ul id="menu-lang" aria-hidden="true"
                                        class="dropdown-ul bg-gray-100 rounded-md shadow border border-slate-200 transform absolute transition duration-150 ease-in-out origin-top min-w-32 space-y-2 p-3">
                                        <li class="dropdown-li px-3 py-1 hover:bg-gray-100 text-sm">Javascript</li>
                                        <li
                                            class="dropdown dropdown-li rounded-sm relative px-3 py-1 hover:bg-gray-100">
                                            <button aria-haspopup="true" aria-controls="menu-lang-python"
                                                class="dropdown-button w-full text-left flex items-center outline-none focus:outline-none">
                                                <span class="dropdown-span pr-1 flex-1 text-sm">Python</span>
                                                <span class="dropdown-span mr-auto">
                                                    <svg class="dropdown-svg fill-current h-4 w-4 transition duration-150 ease-in-out"
                                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                        <path
                                                            d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                                    </svg>
                                                </span>
                                            </button>
                                            <ul id="menu-lang-python" aria-hidden="true"
                                                class="dropdown-ul group-hover:z-10 bg-gray-100 rounded-md shadow border border-slate-200 absolute top-0 right-0 transition duration-150 ease-in-out origin-top-left space-y-2 min-w-32 p-3">
                                                <li class="dropdown-li px-3 py-1 hover:bg-gray-100 text-sm">2.7</li>
                                                <li class="dropdown-li px-3 py-1 hover:bg-gray-100 text-sm">3+</li>
                                            </ul>
                                        </li>
                                        <li class="dropdown-li px-3 py-1 hover:bg-gray-100 text-sm">Go</li>
                                        <li class="dropdown-li px-3 py-1 hover:bg-gray-100 text-sm">Rust</li>
                                    </ul>
                                </li>
                                <li class="dropdown-li rounded-sm px-3 py-1 hover:bg-gray-100 text-sm">Testing</li>
                            </ul>
                        </div>

                    </a></li>
                <li class="menu-li w-full flex justify-center items-center h-max py-2"><a class="menu-a"
                        href="#about">About</a></li>
                <li class="menu-li w-full flex justify-center items-center h-max py-2"><a class="menu-a"
                        href="#careers">Careers</a></li>
                <li class="menu-li w-full flex justify-center items-center h-max py-2"><a class="menu-a"
                        href="#contact">Contact</a></li>
            </ul>
        </header>

        <div class="flex flex-col lg:flex-row w-full lg:h-full lg:pb-4">
            <div
                class="Frame874 !z-0 sticky top-0 bg-white bg-opacity-30 lg:w-max w-full h-max lg:h-full [overflow:unset;] self-stretch py-[1px] rounded-lg shadow justify-start items-start gap-2.5 flex flex-row lg:flex-col">
                <div class="w-full lg:!w-max lg:h-full !overflow-y-auto"
                    style="height: 100%; padding-top: 1px; padding-bottom: 1px; box-shadow: 0px 4px 6px -2px rgba(0, 0, 0, 0.05); border-radius: 15px; justify-content: flex-start; align-items: flex-start; gap: 10px; display: inline-flex;">
                    <div class="w-full lg:w-max !h-max lg:h-full flex items-center justify-center flex-row lg:flex-col lg:gap-4"
                        style="padding-left: 16px; padding-right: 16px; padding-top: 10px; padding-bottom: 10px; ">
                        <h2 class="pr-2 !text-lg lg:self-end lg:pl-32"
                            style="color: #0F172A; font-size: 14px;  font-style: italic; font-weight: 700; line-height: 20px; word-wrap: break-word">
                            Doc.</h2>
                        <div class="w-full lg:w-full lg:h-full overflow-x-auto thin-scroll-width ">
                            <div class="w-max !h-max lg:w-full lg:!h-full lg:overflow-y-auto flex items-center justify-center flex-row lg:flex-col gap-6 px-2 py-3 lg:py-0">

                                <div
                                    style="align-self: stretch; height: max-content; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 10px; display: flex">
                                    <div
                                        style="align-self: stretch; flex: 1 1 0; justify-content: flex-start; align-items: center; gap: 4px; display: inline-flex">
                                        <div class="w-max"
                                            style="color: #0F172A; font-size: 14px;  font-weight: 500; line-height: 20px; word-wrap: break-word">
                                            Getting Started</div>
                                    </div>
                                </div>
                                <div
                                    style="align-self: stretch; height: max-content; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 10px; display: flex">
                                    <div
                                        style="align-self: stretch; flex: 1 1 0; justify-content: flex-start; align-items: center; gap: 4px; display: inline-flex">
                                        <div class="w-max"
                                            style="color: #0F172A; font-size: 14px;  font-weight: 500; line-height: 20px; word-wrap: break-word">
                                            Initial Setup</div>
                                    </div>
                                </div>

                                <div class="group inline-block w-full ">
                                    <button aria-haspopup="true" aria-controls="menu"
                                        class="outline-none focus:outline-none rounded-sm flex justify-between items-center min-w-32">
                                        <span
                                            class="pr-1 flex-1 text-slate-900 text-[14px] font-medium leading-tight">Dropdown</span>
                                        <span>
                                            <svg class="fill-current h-4 w-4 transform group-hover:-rotate-180 transition duration-150 ease-in-out"
                                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                <path
                                                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                            </svg>
                                        </span>
                                    </button>
                                    <ul id="menu" aria-hidden="true"
                                        class="z-50 bg-gray-100 rounded-md shadow border border-slate-200 transform scale-0 group-hover:scale-100 absolute transition duration-150 ease-in-out origin-top min-w-32 space-y-2 p-3">
                                        <li class="dropdown-li rounded-sm px-3 py-1 hover:bg-gray-100 text-sm ">
                                            Programming
                                        </li>
                                        <li class="dropdown-li rounded-sm px-3 py-1 hover:bg-gray-100 text-sm">DevOps
                                        </li>
                                        <li class="dropdown-li rounded-sm relative px-3 py-1 hover:bg-gray-100">
                                            <button aria-haspopup="true" aria-controls="menu-lang"
                                                class="dropdown-button w-full text-left flex items-center outline-none focus:outline-none">
                                                <span class=" dropdown-span pr-1 flex-1 text-sm">Langauges</span>
                                                <span class="dropdown-span mr-auto">
                                                    <svg class="dropdown-svg fill-current h-4 w-4 transition duration-150 ease-in-out"
                                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                        <path
                                                            d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                                    </svg>
                                                </span>
                                            </button>
                                            <ul id="menu-lang" aria-hidden="true"
                                                class="dropdown-ul bg-gray-100 rounded-md shadow border border-slate-200 transform absolute transition duration-150 ease-in-out origin-top min-w-32 space-y-2 p-3">
                                                <li class="dropdown-li px-3 py-1 hover:bg-gray-100 text-sm">Javascript
                                                </li>
                                                <li
                                                    class="dropdown dropdown-li rounded-sm relative px-3 py-1 hover:bg-gray-100">
                                                    <button aria-haspopup="true" aria-controls="menu-lang-python"
                                                        class="dropdown-button w-full text-left flex items-center outline-none focus:outline-none">
                                                        <span class="dropdown-span pr-1 flex-1 text-sm">Python</span>
                                                        <span class="dropdown-span mr-auto">
                                                            <svg class="dropdown-svg fill-current h-4 w-4 transition duration-150 ease-in-out"
                                                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                                <path
                                                                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                                            </svg>
                                                        </span>
                                                    </button>
                                                    <ul id="menu-lang-python" aria-hidden="true"
                                                        class="dropdown-ul group-hover:z-10 bg-gray-100 rounded-md shadow border border-slate-200 absolute top-0 right-0 transition duration-150 ease-in-out origin-top-left space-y-2 min-w-32 p-3">
                                                        <li class="dropdown-li px-3 py-1 hover:bg-gray-100 text-sm">2.7
                                                        </li>
                                                        <li class="dropdown-li px-3 py-1 hover:bg-gray-100 text-sm">3+
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li class="dropdown-li px-3 py-1 hover:bg-gray-100 text-sm">Go</li>
                                                <li class="dropdown-li px-3 py-1 hover:bg-gray-100 text-sm">Rust</li>
                                            </ul>
                                        </li>
                                        <li class="dropdown-li rounded-sm px-3 py-1 hover:bg-gray-100 text-sm">Testing
                                        </li>
                                    </ul>
                                </div>
                                <div class="group inline-block w-full ">
                                    <button aria-haspopup="true" aria-controls="menu"
                                        class="outline-none focus:outline-none rounded-sm flex justify-between items-center min-w-32">
                                        <span
                                            class="pr-1 flex-1 text-slate-900 text-[14px] font-medium leading-tight">Dropdown</span>
                                        <span>
                                            <svg class="fill-current h-4 w-4 transform group-hover:-rotate-180 transition duration-150 ease-in-out"
                                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                <path
                                                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                            </svg>
                                        </span>
                                    </button>
                                    <ul id="menu" aria-hidden="true"
                                        class="z-50 bg-gray-100 rounded-md shadow border border-slate-200 transform scale-0 group-hover:scale-100 absolute transition duration-150 ease-in-out origin-top min-w-32 space-y-2 p-3">
                                        <li class="dropdown-li rounded-sm px-3 py-1 hover:bg-gray-100 text-sm ">
                                            Programming
                                        </li>
                                        <li class="dropdown-li rounded-sm px-3 py-1 hover:bg-gray-100 text-sm">DevOps
                                        </li>
                                        <li class="dropdown-li rounded-sm relative px-3 py-1 hover:bg-gray-100">
                                            <button aria-haspopup="true" aria-controls="menu-lang"
                                                class="dropdown-button w-full text-left flex items-center outline-none focus:outline-none">
                                                <span class=" dropdown-span pr-1 flex-1 text-sm">Langauges</span>
                                                <span class="dropdown-span mr-auto">
                                                    <svg class="dropdown-svg fill-current h-4 w-4 transition duration-150 ease-in-out"
                                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                        <path
                                                            d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                                    </svg>
                                                </span>
                                            </button>
                                            <ul id="menu-lang" aria-hidden="true"
                                                class="dropdown-ul bg-gray-100 rounded-md shadow border border-slate-200 transform absolute transition duration-150 ease-in-out origin-top min-w-32 space-y-2 p-3">
                                                <li class="dropdown-li px-3 py-1 hover:bg-gray-100 text-sm">Javascript
                                                </li>
                                                <li
                                                    class="dropdown dropdown-li rounded-sm relative px-3 py-1 hover:bg-gray-100">
                                                    <button aria-haspopup="true" aria-controls="menu-lang-python"
                                                        class="dropdown-button w-full text-left flex items-center outline-none focus:outline-none">
                                                        <span class="dropdown-span pr-1 flex-1 text-sm">Python</span>
                                                        <span class="dropdown-span mr-auto">
                                                            <svg class="dropdown-svg fill-current h-4 w-4 transition duration-150 ease-in-out"
                                                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                                <path
                                                                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                                            </svg>
                                                        </span>
                                                    </button>
                                                    <ul id="menu-lang-python" aria-hidden="true"
                                                        class="dropdown-ul group-hover:z-10 bg-gray-100 rounded-md shadow border border-slate-200 absolute top-0 right-0 transition duration-150 ease-in-out origin-top-left space-y-2 min-w-32 p-3">
                                                        <li class="dropdown-li px-3 py-1 hover:bg-gray-100 text-sm">2.7
                                                        </li>
                                                        <li class="dropdown-li px-3 py-1 hover:bg-gray-100 text-sm">3+
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li class="dropdown-li px-3 py-1 hover:bg-gray-100 text-sm">Go</li>
                                                <li class="dropdown-li px-3 py-1 hover:bg-gray-100 text-sm">Rust</li>
                                            </ul>
                                        </li>
                                        <li class="dropdown-li rounded-sm px-3 py-1 hover:bg-gray-100 text-sm">Testing
                                        </li>
                                    </ul>
                                </div>
                                <div class="group inline-block w-full ">
                                    <button aria-haspopup="true" aria-controls="menu"
                                        class="outline-none focus:outline-none rounded-sm flex justify-between items-center min-w-32">
                                        <span
                                            class="pr-1 flex-1 text-slate-900 text-[14px] font-medium leading-tight">Dropdown</span>
                                        <span>
                                            <svg class="fill-current h-4 w-4 transform group-hover:-rotate-180 transition duration-150 ease-in-out"
                                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                <path
                                                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                            </svg>
                                        </span>
                                    </button>
                                    <ul id="menu" aria-hidden="true"
                                        class="z-50 bg-gray-100 rounded-md shadow border border-slate-200 transform scale-0 group-hover:scale-100 absolute transition duration-150 ease-in-out origin-top min-w-32 space-y-2 p-3">
                                        <li class="dropdown-li rounded-sm px-3 py-1 hover:bg-gray-100 text-sm ">
                                            Programming
                                        </li>
                                        <li class="dropdown-li rounded-sm px-3 py-1 hover:bg-gray-100 text-sm">DevOps
                                        </li>
                                        <li class="dropdown-li rounded-sm relative px-3 py-1 hover:bg-gray-100">
                                            <button aria-haspopup="true" aria-controls="menu-lang"
                                                class="dropdown-button w-full text-left flex items-center outline-none focus:outline-none">
                                                <span class=" dropdown-span pr-1 flex-1 text-sm">Langauges</span>
                                                <span class="dropdown-span mr-auto">
                                                    <svg class="dropdown-svg fill-current h-4 w-4 transition duration-150 ease-in-out"
                                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                        <path
                                                            d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                                    </svg>
                                                </span>
                                            </button>
                                            <ul id="menu-lang" aria-hidden="true"
                                                class="dropdown-ul bg-gray-100 rounded-md shadow border border-slate-200 transform absolute transition duration-150 ease-in-out origin-top min-w-32 space-y-2 p-3">
                                                <li class="dropdown-li px-3 py-1 hover:bg-gray-100 text-sm">Javascript
                                                </li>
                                                <li
                                                    class="dropdown dropdown-li rounded-sm relative px-3 py-1 hover:bg-gray-100">
                                                    <button aria-haspopup="true" aria-controls="menu-lang-python"
                                                        class="dropdown-button w-full text-left flex items-center outline-none focus:outline-none">
                                                        <span class="dropdown-span pr-1 flex-1 text-sm">Python</span>
                                                        <span class="dropdown-span mr-auto">
                                                            <svg class="dropdown-svg fill-current h-4 w-4 transition duration-150 ease-in-out"
                                                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                                <path
                                                                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                                            </svg>
                                                        </span>
                                                    </button>
                                                    <ul id="menu-lang-python" aria-hidden="true"
                                                        class="dropdown-ul group-hover:z-10 bg-gray-100 rounded-md shadow border border-slate-200 absolute top-0 right-0 transition duration-150 ease-in-out origin-top-left space-y-2 min-w-32 p-3">
                                                        <li class="dropdown-li px-3 py-1 hover:bg-gray-100 text-sm">2.7
                                                        </li>
                                                        <li class="dropdown-li px-3 py-1 hover:bg-gray-100 text-sm">3+
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li class="dropdown-li px-3 py-1 hover:bg-gray-100 text-sm">Go</li>
                                                <li class="dropdown-li px-3 py-1 hover:bg-gray-100 text-sm">Rust</li>
                                            </ul>
                                        </li>
                                        <li class="dropdown-li rounded-sm px-3 py-1 hover:bg-gray-100 text-sm">Testing
                                        </li>
                                    </ul>
                                </div>
                                <div class="group inline-block w-full ">
                                    <button aria-haspopup="true" aria-controls="menu"
                                        class="outline-none focus:outline-none rounded-sm flex justify-between items-center min-w-32">
                                        <span
                                            class="pr-1 flex-1 text-slate-900 text-[14px] font-medium leading-tight">Dropdown</span>
                                        <span>
                                            <svg class="fill-current h-4 w-4 transform group-hover:-rotate-180 transition duration-150 ease-in-out"
                                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                <path
                                                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                            </svg>
                                        </span>
                                    </button>
                                    <ul id="menu" aria-hidden="true"
                                        class="z-50 bg-gray-100 rounded-md shadow border border-slate-200 transform scale-0 group-hover:scale-100 absolute transition duration-150 ease-in-out origin-top min-w-32 space-y-2 p-3">
                                        <li class="dropdown-li rounded-sm px-3 py-1 hover:bg-gray-100 text-sm ">
                                            Programming
                                        </li>
                                        <li class="dropdown-li rounded-sm px-3 py-1 hover:bg-gray-100 text-sm">DevOps
                                        </li>
                                        <li class="dropdown-li rounded-sm relative px-3 py-1 hover:bg-gray-100">
                                            <button aria-haspopup="true" aria-controls="menu-lang"
                                                class="dropdown-button w-full text-left flex items-center outline-none focus:outline-none">
                                                <span class=" dropdown-span pr-1 flex-1 text-sm">Langauges</span>
                                                <span class="dropdown-span mr-auto">
                                                    <svg class="dropdown-svg fill-current h-4 w-4 transition duration-150 ease-in-out"
                                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                        <path
                                                            d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                                    </svg>
                                                </span>
                                            </button>
                                            <ul id="menu-lang" aria-hidden="true"
                                                class="dropdown-ul bg-gray-100 rounded-md shadow border border-slate-200 transform absolute transition duration-150 ease-in-out origin-top min-w-32 space-y-2 p-3">
                                                <li class="dropdown-li px-3 py-1 hover:bg-gray-100 text-sm">Javascript
                                                </li>
                                                <li
                                                    class="dropdown dropdown-li rounded-sm relative px-3 py-1 hover:bg-gray-100">
                                                    <button aria-haspopup="true" aria-controls="menu-lang-python"
                                                        class="dropdown-button w-full text-left flex items-center outline-none focus:outline-none">
                                                        <span class="dropdown-span pr-1 flex-1 text-sm">Python</span>
                                                        <span class="dropdown-span mr-auto">
                                                            <svg class="dropdown-svg fill-current h-4 w-4 transition duration-150 ease-in-out"
                                                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                                <path
                                                                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                                            </svg>
                                                        </span>
                                                    </button>
                                                    <ul id="menu-lang-python" aria-hidden="true"
                                                        class="dropdown-ul group-hover:z-10 bg-gray-100 rounded-md shadow border border-slate-200 absolute top-0 right-0 transition duration-150 ease-in-out origin-top-left space-y-2 min-w-32 p-3">
                                                        <li class="dropdown-li px-3 py-1 hover:bg-gray-100 text-sm">2.7
                                                        </li>
                                                        <li class="dropdown-li px-3 py-1 hover:bg-gray-100 text-sm">3+
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li class="dropdown-li px-3 py-1 hover:bg-gray-100 text-sm">Go</li>
                                                <li class="dropdown-li px-3 py-1 hover:bg-gray-100 text-sm">Rust</li>
                                            </ul>
                                        </li>
                                        <li class="dropdown-li rounded-sm px-3 py-1 hover:bg-gray-100 text-sm">Testing
                                        </li>
                                    </ul>
                                </div>
                                <div class="group inline-block w-full ">
                                    <button aria-haspopup="true" aria-controls="menu"
                                        class="outline-none focus:outline-none rounded-sm flex justify-between items-center min-w-32">
                                        <span
                                            class="pr-1 flex-1 text-slate-900 text-[14px] font-medium leading-tight">Dropdown</span>
                                        <span>
                                            <svg class="fill-current h-4 w-4 transform group-hover:-rotate-180 transition duration-150 ease-in-out"
                                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                <path
                                                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                            </svg>
                                        </span>
                                    </button>
                                    <ul id="menu" aria-hidden="true"
                                        class="z-50 bg-gray-100 rounded-md shadow border border-slate-200 transform scale-0 group-hover:scale-100 absolute transition duration-150 ease-in-out origin-top min-w-32 space-y-2 p-3">
                                        <li class="dropdown-li rounded-sm px-3 py-1 hover:bg-gray-100 text-sm ">
                                            Programming
                                        </li>
                                        <li class="dropdown-li rounded-sm px-3 py-1 hover:bg-gray-100 text-sm">DevOps
                                        </li>
                                        <li class="dropdown-li rounded-sm relative px-3 py-1 hover:bg-gray-100">
                                            <button aria-haspopup="true" aria-controls="menu-lang"
                                                class="dropdown-button w-full text-left flex items-center outline-none focus:outline-none">
                                                <span class=" dropdown-span pr-1 flex-1 text-sm">Langauges</span>
                                                <span class="dropdown-span mr-auto">
                                                    <svg class="dropdown-svg fill-current h-4 w-4 transition duration-150 ease-in-out"
                                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                        <path
                                                            d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                                    </svg>
                                                </span>
                                            </button>
                                            <ul id="menu-lang" aria-hidden="true"
                                                class="dropdown-ul bg-gray-100 rounded-md shadow border border-slate-200 transform absolute transition duration-150 ease-in-out origin-top min-w-32 space-y-2 p-3">
                                                <li class="dropdown-li px-3 py-1 hover:bg-gray-100 text-sm">Javascript
                                                </li>
                                                <li
                                                    class="dropdown dropdown-li rounded-sm relative px-3 py-1 hover:bg-gray-100">
                                                    <button aria-haspopup="true" aria-controls="menu-lang-python"
                                                        class="dropdown-button w-full text-left flex items-center outline-none focus:outline-none">
                                                        <span class="dropdown-span pr-1 flex-1 text-sm">Python</span>
                                                        <span class="dropdown-span mr-auto">
                                                            <svg class="dropdown-svg fill-current h-4 w-4 transition duration-150 ease-in-out"
                                                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                                <path
                                                                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                                            </svg>
                                                        </span>
                                                    </button>
                                                    <ul id="menu-lang-python" aria-hidden="true"
                                                        class="dropdown-ul group-hover:z-10 bg-gray-100 rounded-md shadow border border-slate-200 absolute top-0 right-0 transition duration-150 ease-in-out origin-top-left space-y-2 min-w-32 p-3">
                                                        <li class="dropdown-li px-3 py-1 hover:bg-gray-100 text-sm">2.7
                                                        </li>
                                                        <li class="dropdown-li px-3 py-1 hover:bg-gray-100 text-sm">3+
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li class="dropdown-li px-3 py-1 hover:bg-gray-100 text-sm">Go</li>
                                                <li class="dropdown-li px-3 py-1 hover:bg-gray-100 text-sm">Rust</li>
                                            </ul>
                                        </li>
                                        <li class="dropdown-li rounded-sm px-3 py-1 hover:bg-gray-100 text-sm">Testing
                                        </li>
                                    </ul>
                                </div>
                                <div class="group inline-block w-full ">
                                    <button aria-haspopup="true" aria-controls="menu"
                                        class="outline-none focus:outline-none rounded-sm flex justify-between items-center min-w-32">
                                        <span
                                            class="pr-1 flex-1 text-slate-900 text-[14px] font-medium leading-tight">Dropdown</span>
                                        <span>
                                            <svg class="fill-current h-4 w-4 transform group-hover:-rotate-180 transition duration-150 ease-in-out"
                                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                <path
                                                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                            </svg>
                                        </span>
                                    </button>
                                    <ul id="menu" aria-hidden="true"
                                        class="z-50 bg-gray-100 rounded-md shadow border border-slate-200 transform scale-0 group-hover:scale-100 absolute transition duration-150 ease-in-out origin-top min-w-32 space-y-2 p-3">
                                        <li class="dropdown-li rounded-sm px-3 py-1 hover:bg-gray-100 text-sm ">
                                            Programming
                                        </li>
                                        <li class="dropdown-li rounded-sm px-3 py-1 hover:bg-gray-100 text-sm">DevOps
                                        </li>
                                        <li class="dropdown-li rounded-sm relative px-3 py-1 hover:bg-gray-100">
                                            <button aria-haspopup="true" aria-controls="menu-lang"
                                                class="dropdown-button w-full text-left flex items-center outline-none focus:outline-none">
                                                <span class=" dropdown-span pr-1 flex-1 text-sm">Langauges</span>
                                                <span class="dropdown-span mr-auto">
                                                    <svg class="dropdown-svg fill-current h-4 w-4 transition duration-150 ease-in-out"
                                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                        <path
                                                            d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                                    </svg>
                                                </span>
                                            </button>
                                            <ul id="menu-lang" aria-hidden="true"
                                                class="dropdown-ul bg-gray-100 rounded-md shadow border border-slate-200 transform absolute transition duration-150 ease-in-out origin-top min-w-32 space-y-2 p-3">
                                                <li class="dropdown-li px-3 py-1 hover:bg-gray-100 text-sm">Javascript
                                                </li>
                                                <li
                                                    class="dropdown dropdown-li rounded-sm relative px-3 py-1 hover:bg-gray-100">
                                                    <button aria-haspopup="true" aria-controls="menu-lang-python"
                                                        class="dropdown-button w-full text-left flex items-center outline-none focus:outline-none">
                                                        <span class="dropdown-span pr-1 flex-1 text-sm">Python</span>
                                                        <span class="dropdown-span mr-auto">
                                                            <svg class="dropdown-svg fill-current h-4 w-4 transition duration-150 ease-in-out"
                                                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                                <path
                                                                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                                            </svg>
                                                        </span>
                                                    </button>
                                                    <ul id="menu-lang-python" aria-hidden="true"
                                                        class="dropdown-ul group-hover:z-10 bg-gray-100 rounded-md shadow border border-slate-200 absolute top-0 right-0 transition duration-150 ease-in-out origin-top-left space-y-2 min-w-32 p-3">
                                                        <li class="dropdown-li px-3 py-1 hover:bg-gray-100 text-sm">2.7
                                                        </li>
                                                        <li class="dropdown-li px-3 py-1 hover:bg-gray-100 text-sm">3+
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li class="dropdown-li px-3 py-1 hover:bg-gray-100 text-sm">Go</li>
                                                <li class="dropdown-li px-3 py-1 hover:bg-gray-100 text-sm">Rust</li>
                                            </ul>
                                        </li>
                                        <li class="dropdown-li rounded-sm px-3 py-1 hover:bg-gray-100 text-sm">Testing
                                        </li>
                                    </ul>
                                </div>
                                <div class="group inline-block w-full ">
                                    <button aria-haspopup="true" aria-controls="menu"
                                        class="outline-none focus:outline-none rounded-sm flex justify-between items-center min-w-32">
                                        <span
                                            class="pr-1 flex-1 text-slate-900 text-[14px] font-medium leading-tight">Dropdown</span>
                                        <span>
                                            <svg class="fill-current h-4 w-4 transform group-hover:-rotate-180 transition duration-150 ease-in-out"
                                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                <path
                                                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                            </svg>
                                        </span>
                                    </button>
                                    <ul id="menu" aria-hidden="true"
                                        class="z-50 bg-gray-100 rounded-md shadow border border-slate-200 transform scale-0 group-hover:scale-100 absolute transition duration-150 ease-in-out origin-top min-w-32 space-y-2 p-3">
                                        <li class="dropdown-li rounded-sm px-3 py-1 hover:bg-gray-100 text-sm ">
                                            Programming
                                        </li>
                                        <li class="dropdown-li rounded-sm px-3 py-1 hover:bg-gray-100 text-sm">DevOps
                                        </li>
                                        <li class="dropdown-li rounded-sm relative px-3 py-1 hover:bg-gray-100">
                                            <button aria-haspopup="true" aria-controls="menu-lang"
                                                class="dropdown-button w-full text-left flex items-center outline-none focus:outline-none">
                                                <span class=" dropdown-span pr-1 flex-1 text-sm">Langauges</span>
                                                <span class="dropdown-span mr-auto">
                                                    <svg class="dropdown-svg fill-current h-4 w-4 transition duration-150 ease-in-out"
                                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                        <path
                                                            d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                                    </svg>
                                                </span>
                                            </button>
                                            <ul id="menu-lang" aria-hidden="true"
                                                class="dropdown-ul bg-gray-100 rounded-md shadow border border-slate-200 transform absolute transition duration-150 ease-in-out origin-top min-w-32 space-y-2 p-3">
                                                <li class="dropdown-li px-3 py-1 hover:bg-gray-100 text-sm">Javascript
                                                </li>
                                                <li
                                                    class="dropdown dropdown-li rounded-sm relative px-3 py-1 hover:bg-gray-100">
                                                    <button aria-haspopup="true" aria-controls="menu-lang-python"
                                                        class="dropdown-button w-full text-left flex items-center outline-none focus:outline-none">
                                                        <span class="dropdown-span pr-1 flex-1 text-sm">Python</span>
                                                        <span class="dropdown-span mr-auto">
                                                            <svg class="dropdown-svg fill-current h-4 w-4 transition duration-150 ease-in-out"
                                                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                                <path
                                                                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                                            </svg>
                                                        </span>
                                                    </button>
                                                    <ul id="menu-lang-python" aria-hidden="true"
                                                        class="dropdown-ul group-hover:z-10 bg-gray-100 rounded-md shadow border border-slate-200 absolute top-0 right-0 transition duration-150 ease-in-out origin-top-left space-y-2 min-w-32 p-3">
                                                        <li class="dropdown-li px-3 py-1 hover:bg-gray-100 text-sm">2.7
                                                        </li>
                                                        <li class="dropdown-li px-3 py-1 hover:bg-gray-100 text-sm">3+
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li class="dropdown-li px-3 py-1 hover:bg-gray-100 text-sm">Go</li>
                                                <li class="dropdown-li px-3 py-1 hover:bg-gray-100 text-sm">Rust</li>
                                            </ul>
                                        </li>
                                        <li class="dropdown-li rounded-sm px-3 py-1 hover:bg-gray-100 text-sm">Testing
                                        </li>
                                    </ul>
                                </div>
                                <div class="group inline-block w-full ">
                                    <button aria-haspopup="true" aria-controls="menu"
                                        class="outline-none focus:outline-none rounded-sm flex justify-between items-center min-w-32">
                                        <span
                                            class="pr-1 flex-1 text-slate-900 text-[14px] font-medium leading-tight">Dropdown</span>
                                        <span>
                                            <svg class="fill-current h-4 w-4 transform group-hover:-rotate-180 transition duration-150 ease-in-out"
                                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                <path
                                                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                            </svg>
                                        </span>
                                    </button>
                                    <ul id="menu" aria-hidden="true"
                                        class="z-50 bg-gray-100 rounded-md shadow border border-slate-200 transform scale-0 group-hover:scale-100 absolute transition duration-150 ease-in-out origin-top min-w-32 space-y-2 p-3">
                                        <li class="dropdown-li rounded-sm px-3 py-1 hover:bg-gray-100 text-sm ">
                                            Programming
                                        </li>
                                        <li class="dropdown-li rounded-sm px-3 py-1 hover:bg-gray-100 text-sm">DevOps
                                        </li>
                                        <li class="dropdown-li rounded-sm relative px-3 py-1 hover:bg-gray-100">
                                            <button aria-haspopup="true" aria-controls="menu-lang"
                                                class="dropdown-button w-full text-left flex items-center outline-none focus:outline-none">
                                                <span class=" dropdown-span pr-1 flex-1 text-sm">Langauges</span>
                                                <span class="dropdown-span mr-auto">
                                                    <svg class="dropdown-svg fill-current h-4 w-4 transition duration-150 ease-in-out"
                                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                        <path
                                                            d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                                    </svg>
                                                </span>
                                            </button>
                                            <ul id="menu-lang" aria-hidden="true"
                                                class="dropdown-ul bg-gray-100 rounded-md shadow border border-slate-200 transform absolute transition duration-150 ease-in-out origin-top min-w-32 space-y-2 p-3">
                                                <li class="dropdown-li px-3 py-1 hover:bg-gray-100 text-sm">Javascript
                                                </li>
                                                <li
                                                    class="dropdown dropdown-li rounded-sm relative px-3 py-1 hover:bg-gray-100">
                                                    <button aria-haspopup="true" aria-controls="menu-lang-python"
                                                        class="dropdown-button w-full text-left flex items-center outline-none focus:outline-none">
                                                        <span class="dropdown-span pr-1 flex-1 text-sm">Python</span>
                                                        <span class="dropdown-span mr-auto">
                                                            <svg class="dropdown-svg fill-current h-4 w-4 transition duration-150 ease-in-out"
                                                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                                <path
                                                                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                                            </svg>
                                                        </span>
                                                    </button>
                                                    <ul id="menu-lang-python" aria-hidden="true"
                                                        class="dropdown-ul group-hover:z-10 bg-gray-100 rounded-md shadow border border-slate-200 absolute top-0 right-0 transition duration-150 ease-in-out origin-top-left space-y-2 min-w-32 p-3">
                                                        <li class="dropdown-li px-3 py-1 hover:bg-gray-100 text-sm">2.7
                                                        </li>
                                                        <li class="dropdown-li px-3 py-1 hover:bg-gray-100 text-sm">3+
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li class="dropdown-li px-3 py-1 hover:bg-gray-100 text-sm">Go</li>
                                                <li class="dropdown-li px-3 py-1 hover:bg-gray-100 text-sm">Rust</li>
                                            </ul>
                                        </li>
                                        <li class="dropdown-li rounded-sm px-3 py-1 hover:bg-gray-100 text-sm">Testing
                                        </li>
                                    </ul>
                                </div>
                                <div class="group inline-block w-full ">
                                    <button aria-haspopup="true" aria-controls="menu"
                                        class="outline-none focus:outline-none rounded-sm flex justify-between items-center min-w-32">
                                        <span
                                            class="pr-1 flex-1 text-slate-900 text-[14px] font-medium leading-tight">Dropdown</span>
                                        <span>
                                            <svg class="fill-current h-4 w-4 transform group-hover:-rotate-180 transition duration-150 ease-in-out"
                                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                <path
                                                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                            </svg>
                                        </span>
                                    </button>
                                    <ul id="menu" aria-hidden="true"
                                        class="z-50 bg-gray-100 rounded-md shadow border border-slate-200 transform scale-0 group-hover:scale-100 absolute transition duration-150 ease-in-out origin-top min-w-32 space-y-2 p-3">
                                        <li class="dropdown-li rounded-sm px-3 py-1 hover:bg-gray-100 text-sm ">
                                            Programming
                                        </li>
                                        <li class="dropdown-li rounded-sm px-3 py-1 hover:bg-gray-100 text-sm">DevOps
                                        </li>
                                        <li class="dropdown-li rounded-sm relative px-3 py-1 hover:bg-gray-100">
                                            <button aria-haspopup="true" aria-controls="menu-lang"
                                                class="dropdown-button w-full text-left flex items-center outline-none focus:outline-none">
                                                <span class=" dropdown-span pr-1 flex-1 text-sm">Langauges</span>
                                                <span class="dropdown-span mr-auto">
                                                    <svg class="dropdown-svg fill-current h-4 w-4 transition duration-150 ease-in-out"
                                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                        <path
                                                            d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                                    </svg>
                                                </span>
                                            </button>
                                            <ul id="menu-lang" aria-hidden="true"
                                                class="dropdown-ul bg-gray-100 rounded-md shadow border border-slate-200 transform absolute transition duration-150 ease-in-out origin-top min-w-32 space-y-2 p-3">
                                                <li class="dropdown-li px-3 py-1 hover:bg-gray-100 text-sm">Javascript
                                                </li>
                                                <li
                                                    class="dropdown dropdown-li rounded-sm relative px-3 py-1 hover:bg-gray-100">
                                                    <button aria-haspopup="true" aria-controls="menu-lang-python"
                                                        class="dropdown-button w-full text-left flex items-center outline-none focus:outline-none">
                                                        <span class="dropdown-span pr-1 flex-1 text-sm">Python</span>
                                                        <span class="dropdown-span mr-auto">
                                                            <svg class="dropdown-svg fill-current h-4 w-4 transition duration-150 ease-in-out"
                                                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                                <path
                                                                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                                            </svg>
                                                        </span>
                                                    </button>
                                                    <ul id="menu-lang-python" aria-hidden="true"
                                                        class="dropdown-ul group-hover:z-10 bg-gray-100 rounded-md shadow border border-slate-200 absolute top-0 right-0 transition duration-150 ease-in-out origin-top-left space-y-2 min-w-32 p-3">
                                                        <li class="dropdown-li px-3 py-1 hover:bg-gray-100 text-sm">2.7
                                                        </li>
                                                        <li class="dropdown-li px-3 py-1 hover:bg-gray-100 text-sm">3+
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li class="dropdown-li px-3 py-1 hover:bg-gray-100 text-sm">Go</li>
                                                <li class="dropdown-li px-3 py-1 hover:bg-gray-100 text-sm">Rust</li>
                                            </ul>
                                        </li>
                                        <li class="dropdown-li rounded-sm px-3 py-1 hover:bg-gray-100 text-sm">Testing
                                        </li>
                                    </ul>
                                </div>
                                <div class="group inline-block w-full ">
                                    <button aria-haspopup="true" aria-controls="menu"
                                        class="outline-none focus:outline-none rounded-sm flex justify-between items-center min-w-32">
                                        <span
                                            class="pr-1 flex-1 text-slate-900 text-[14px] font-medium leading-tight">Dropdown</span>
                                        <span>
                                            <svg class="fill-current h-4 w-4 transform group-hover:-rotate-180 transition duration-150 ease-in-out"
                                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                <path
                                                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                            </svg>
                                        </span>
                                    </button>
                                    <ul id="menu" aria-hidden="true"
                                        class="z-50 bg-gray-100 rounded-md shadow border border-slate-200 transform scale-0 group-hover:scale-100 absolute transition duration-150 ease-in-out origin-top min-w-32 space-y-2 p-3">
                                        <li class="dropdown-li rounded-sm px-3 py-1 hover:bg-gray-100 text-sm ">
                                            Programming
                                        </li>
                                        <li class="dropdown-li rounded-sm px-3 py-1 hover:bg-gray-100 text-sm">DevOps
                                        </li>
                                        <li class="dropdown-li rounded-sm relative px-3 py-1 hover:bg-gray-100">
                                            <button aria-haspopup="true" aria-controls="menu-lang"
                                                class="dropdown-button w-full text-left flex items-center outline-none focus:outline-none">
                                                <span class=" dropdown-span pr-1 flex-1 text-sm">Langauges</span>
                                                <span class="dropdown-span mr-auto">
                                                    <svg class="dropdown-svg fill-current h-4 w-4 transition duration-150 ease-in-out"
                                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                        <path
                                                            d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                                    </svg>
                                                </span>
                                            </button>
                                            <ul id="menu-lang" aria-hidden="true"
                                                class="dropdown-ul bg-gray-100 rounded-md shadow border border-slate-200 transform absolute transition duration-150 ease-in-out origin-top min-w-32 space-y-2 p-3">
                                                <li class="dropdown-li px-3 py-1 hover:bg-gray-100 text-sm">Javascript
                                                </li>
                                                <li
                                                    class="dropdown dropdown-li rounded-sm relative px-3 py-1 hover:bg-gray-100">
                                                    <button aria-haspopup="true" aria-controls="menu-lang-python"
                                                        class="dropdown-button w-full text-left flex items-center outline-none focus:outline-none">
                                                        <span class="dropdown-span pr-1 flex-1 text-sm">Python</span>
                                                        <span class="dropdown-span mr-auto">
                                                            <svg class="dropdown-svg fill-current h-4 w-4 transition duration-150 ease-in-out"
                                                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                                <path
                                                                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                                            </svg>
                                                        </span>
                                                    </button>
                                                    <ul id="menu-lang-python" aria-hidden="true"
                                                        class="dropdown-ul group-hover:z-10 bg-gray-100 rounded-md shadow border border-slate-200 absolute top-0 right-0 transition duration-150 ease-in-out origin-top-left space-y-2 min-w-32 p-3">
                                                        <li class="dropdown-li px-3 py-1 hover:bg-gray-100 text-sm">2.7
                                                        </li>
                                                        <li class="dropdown-li px-3 py-1 hover:bg-gray-100 text-sm">3+
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li class="dropdown-li px-3 py-1 hover:bg-gray-100 text-sm">Go</li>
                                                <li class="dropdown-li px-3 py-1 hover:bg-gray-100 text-sm">Rust</li>
                                            </ul>
                                        </li>
                                        <li class="dropdown-li rounded-sm px-3 py-1 hover:bg-gray-100 text-sm">Testing
                                        </li>
                                    </ul>
                                </div>
                                <div class="group inline-block w-full ">
                                    <button aria-haspopup="true" aria-controls="menu"
                                        class="outline-none focus:outline-none rounded-sm flex justify-between items-center min-w-32">
                                        <span
                                            class="pr-1 flex-1 text-slate-900 text-[14px] font-medium leading-tight">Dropdown</span>
                                        <span>
                                            <svg class="fill-current h-4 w-4 transform group-hover:-rotate-180 transition duration-150 ease-in-out"
                                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                <path
                                                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                            </svg>
                                        </span>
                                    </button>
                                    <ul id="menu" aria-hidden="true"
                                        class="z-50 bg-gray-100 rounded-md shadow border border-slate-200 transform scale-0 group-hover:scale-100 absolute transition duration-150 ease-in-out origin-top min-w-32 space-y-2 p-3">
                                        <li class="dropdown-li rounded-sm px-3 py-1 hover:bg-gray-100 text-sm ">
                                            Programming
                                        </li>
                                        <li class="dropdown-li rounded-sm px-3 py-1 hover:bg-gray-100 text-sm">DevOps
                                        </li>
                                        <li class="dropdown-li rounded-sm relative px-3 py-1 hover:bg-gray-100">
                                            <button aria-haspopup="true" aria-controls="menu-lang"
                                                class="dropdown-button w-full text-left flex items-center outline-none focus:outline-none">
                                                <span class=" dropdown-span pr-1 flex-1 text-sm">Langauges</span>
                                                <span class="dropdown-span mr-auto">
                                                    <svg class="dropdown-svg fill-current h-4 w-4 transition duration-150 ease-in-out"
                                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                        <path
                                                            d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                                    </svg>
                                                </span>
                                            </button>
                                            <ul id="menu-lang" aria-hidden="true"
                                                class="dropdown-ul bg-gray-100 rounded-md shadow border border-slate-200 transform absolute transition duration-150 ease-in-out origin-top min-w-32 space-y-2 p-3">
                                                <li class="dropdown-li px-3 py-1 hover:bg-gray-100 text-sm">Javascript
                                                </li>
                                                <li
                                                    class="dropdown dropdown-li rounded-sm relative px-3 py-1 hover:bg-gray-100">
                                                    <button aria-haspopup="true" aria-controls="menu-lang-python"
                                                        class="dropdown-button w-full text-left flex items-center outline-none focus:outline-none">
                                                        <span class="dropdown-span pr-1 flex-1 text-sm">Python</span>
                                                        <span class="dropdown-span mr-auto">
                                                            <svg class="dropdown-svg fill-current h-4 w-4 transition duration-150 ease-in-out"
                                                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                                <path
                                                                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                                            </svg>
                                                        </span>
                                                    </button>
                                                    <ul id="menu-lang-python" aria-hidden="true"
                                                        class="dropdown-ul group-hover:z-10 bg-gray-100 rounded-md shadow border border-slate-200 absolute top-0 right-0 transition duration-150 ease-in-out origin-top-left space-y-2 min-w-32 p-3">
                                                        <li class="dropdown-li px-3 py-1 hover:bg-gray-100 text-sm">2.7
                                                        </li>
                                                        <li class="dropdown-li px-3 py-1 hover:bg-gray-100 text-sm">3+
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li class="dropdown-li px-3 py-1 hover:bg-gray-100 text-sm">Go</li>
                                                <li class="dropdown-li px-3 py-1 hover:bg-gray-100 text-sm">Rust</li>
                                            </ul>
                                        </li>
                                        <li class="dropdown-li rounded-sm px-3 py-1 hover:bg-gray-100 text-sm">Testing
                                        </li>
                                    </ul>
                                </div>
                                <div class="group inline-block w-full ">
                                    <button aria-haspopup="true" aria-controls="menu"
                                        class="outline-none focus:outline-none rounded-sm flex justify-between items-center min-w-32">
                                        <span
                                            class="pr-1 flex-1 text-slate-900 text-[14px] font-medium leading-tight">Dropdown</span>
                                        <span>
                                            <svg class="fill-current h-4 w-4 transform group-hover:-rotate-180 transition duration-150 ease-in-out"
                                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                <path
                                                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                            </svg>
                                        </span>
                                    </button>
                                    <ul id="menu" aria-hidden="true"
                                        class="z-50 bg-gray-100 rounded-md shadow border border-slate-200 transform scale-0 group-hover:scale-100 absolute transition duration-150 ease-in-out origin-top min-w-32 space-y-2 p-3">
                                        <li class="dropdown-li rounded-sm px-3 py-1 hover:bg-gray-100 text-sm ">
                                            Programming
                                        </li>
                                        <li class="dropdown-li rounded-sm px-3 py-1 hover:bg-gray-100 text-sm">DevOps
                                        </li>
                                        <li class="dropdown-li rounded-sm relative px-3 py-1 hover:bg-gray-100">
                                            <button aria-haspopup="true" aria-controls="menu-lang"
                                                class="dropdown-button w-full text-left flex items-center outline-none focus:outline-none">
                                                <span class=" dropdown-span pr-1 flex-1 text-sm">Langauges</span>
                                                <span class="dropdown-span mr-auto">
                                                    <svg class="dropdown-svg fill-current h-4 w-4 transition duration-150 ease-in-out"
                                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                        <path
                                                            d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                                    </svg>
                                                </span>
                                            </button>
                                            <ul id="menu-lang" aria-hidden="true"
                                                class="dropdown-ul bg-gray-100 rounded-md shadow border border-slate-200 transform absolute transition duration-150 ease-in-out origin-top min-w-32 space-y-2 p-3">
                                                <li class="dropdown-li px-3 py-1 hover:bg-gray-100 text-sm">Javascript
                                                </li>
                                                <li
                                                    class="dropdown dropdown-li rounded-sm relative px-3 py-1 hover:bg-gray-100">
                                                    <button aria-haspopup="true" aria-controls="menu-lang-python"
                                                        class="dropdown-button w-full text-left flex items-center outline-none focus:outline-none">
                                                        <span class="dropdown-span pr-1 flex-1 text-sm">Python</span>
                                                        <span class="dropdown-span mr-auto">
                                                            <svg class="dropdown-svg fill-current h-4 w-4 transition duration-150 ease-in-out"
                                                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                                <path
                                                                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                                            </svg>
                                                        </span>
                                                    </button>
                                                    <ul id="menu-lang-python" aria-hidden="true"
                                                        class="dropdown-ul group-hover:z-10 bg-gray-100 rounded-md shadow border border-slate-200 absolute top-0 right-0 transition duration-150 ease-in-out origin-top-left space-y-2 min-w-32 p-3">
                                                        <li class="dropdown-li px-3 py-1 hover:bg-gray-100 text-sm">2.7
                                                        </li>
                                                        <li class="dropdown-li px-3 py-1 hover:bg-gray-100 text-sm">3+
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li class="dropdown-li px-3 py-1 hover:bg-gray-100 text-sm">Go</li>
                                                <li class="dropdown-li px-3 py-1 hover:bg-gray-100 text-sm">Rust</li>
                                            </ul>
                                        </li>
                                        <li class="dropdown-li rounded-sm px-3 py-1 hover:bg-gray-100 text-sm">Testing
                                        </li>
                                    </ul>
                                </div>
                                <div class="group inline-block w-full ">
                                    <button aria-haspopup="true" aria-controls="menu"
                                        class="outline-none focus:outline-none rounded-sm flex justify-between items-center min-w-32">
                                        <span
                                            class="pr-1 flex-1 text-slate-900 text-[14px] font-medium leading-tight">Dropdown</span>
                                        <span>
                                            <svg class="fill-current h-4 w-4 transform group-hover:-rotate-180 transition duration-150 ease-in-out"
                                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                <path
                                                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                            </svg>
                                        </span>
                                    </button>
                                    <ul id="menu" aria-hidden="true"
                                        class="z-50 bg-gray-100 rounded-md shadow border border-slate-200 transform scale-0 group-hover:scale-100 absolute transition duration-150 ease-in-out origin-top min-w-32 space-y-2 p-3">
                                        <li class="dropdown-li rounded-sm px-3 py-1 hover:bg-gray-100 text-sm ">
                                            Programming
                                        </li>
                                        <li class="dropdown-li rounded-sm px-3 py-1 hover:bg-gray-100 text-sm">DevOps
                                        </li>
                                        <li class="dropdown-li rounded-sm relative px-3 py-1 hover:bg-gray-100">
                                            <button aria-haspopup="true" aria-controls="menu-lang"
                                                class="dropdown-button w-full text-left flex items-center outline-none focus:outline-none">
                                                <span class=" dropdown-span pr-1 flex-1 text-sm">Langauges</span>
                                                <span class="dropdown-span mr-auto">
                                                    <svg class="dropdown-svg fill-current h-4 w-4 transition duration-150 ease-in-out"
                                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                        <path
                                                            d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                                    </svg>
                                                </span>
                                            </button>
                                            <ul id="menu-lang" aria-hidden="true"
                                                class="dropdown-ul bg-gray-100 rounded-md shadow border border-slate-200 transform absolute transition duration-150 ease-in-out origin-top min-w-32 space-y-2 p-3">
                                                <li class="dropdown-li px-3 py-1 hover:bg-gray-100 text-sm">Javascript
                                                </li>
                                                <li
                                                    class="dropdown dropdown-li rounded-sm relative px-3 py-1 hover:bg-gray-100">
                                                    <button aria-haspopup="true" aria-controls="menu-lang-python"
                                                        class="dropdown-button w-full text-left flex items-center outline-none focus:outline-none">
                                                        <span class="dropdown-span pr-1 flex-1 text-sm">Python</span>
                                                        <span class="dropdown-span mr-auto">
                                                            <svg class="dropdown-svg fill-current h-4 w-4 transition duration-150 ease-in-out"
                                                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                                <path
                                                                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                                            </svg>
                                                        </span>
                                                    </button>
                                                    <ul id="menu-lang-python" aria-hidden="true"
                                                        class="dropdown-ul group-hover:z-10 bg-gray-100 rounded-md shadow border border-slate-200 absolute top-0 right-0 transition duration-150 ease-in-out origin-top-left space-y-2 min-w-32 p-3">
                                                        <li class="dropdown-li px-3 py-1 hover:bg-gray-100 text-sm">2.7
                                                        </li>
                                                        <li class="dropdown-li px-3 py-1 hover:bg-gray-100 text-sm">3+
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li class="dropdown-li px-3 py-1 hover:bg-gray-100 text-sm">Go</li>
                                                <li class="dropdown-li px-3 py-1 hover:bg-gray-100 text-sm">Rust</li>
                                            </ul>
                                        </li>
                                        <li class="dropdown-li rounded-sm px-3 py-1 hover:bg-gray-100 text-sm">Testing
                                        </li>
                                    </ul>
                                </div>
                                <div class="group inline-block w-full ">
                                    <button aria-haspopup="true" aria-controls="menu"
                                        class="outline-none focus:outline-none rounded-sm flex justify-between items-center min-w-32">
                                        <span
                                            class="pr-1 flex-1 text-slate-900 text-[14px] font-medium leading-tight">Dropdown</span>
                                        <span>
                                            <svg class="fill-current h-4 w-4 transform group-hover:-rotate-180 transition duration-150 ease-in-out"
                                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                <path
                                                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                            </svg>
                                        </span>
                                    </button>
                                    <ul id="menu" aria-hidden="true"
                                        class="z-50 bg-gray-100 rounded-md shadow border border-slate-200 transform scale-0 group-hover:scale-100 absolute transition duration-150 ease-in-out origin-top min-w-32 space-y-2 p-3">
                                        <li class="dropdown-li rounded-sm px-3 py-1 hover:bg-gray-100 text-sm ">
                                            Programming
                                        </li>
                                        <li class="dropdown-li rounded-sm px-3 py-1 hover:bg-gray-100 text-sm">DevOps
                                        </li>
                                        <li class="dropdown-li rounded-sm relative px-3 py-1 hover:bg-gray-100">
                                            <button aria-haspopup="true" aria-controls="menu-lang"
                                                class="dropdown-button w-full text-left flex items-center outline-none focus:outline-none">
                                                <span class=" dropdown-span pr-1 flex-1 text-sm">Langauges</span>
                                                <span class="dropdown-span mr-auto">
                                                    <svg class="dropdown-svg fill-current h-4 w-4 transition duration-150 ease-in-out"
                                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                        <path
                                                            d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                                    </svg>
                                                </span>
                                            </button>
                                            <ul id="menu-lang" aria-hidden="true"
                                                class="dropdown-ul bg-gray-100 rounded-md shadow border border-slate-200 transform absolute transition duration-150 ease-in-out origin-top min-w-32 space-y-2 p-3">
                                                <li class="dropdown-li px-3 py-1 hover:bg-gray-100 text-sm">Javascript
                                                </li>
                                                <li
                                                    class="dropdown dropdown-li rounded-sm relative px-3 py-1 hover:bg-gray-100">
                                                    <button aria-haspopup="true" aria-controls="menu-lang-python"
                                                        class="dropdown-button w-full text-left flex items-center outline-none focus:outline-none">
                                                        <span class="dropdown-span pr-1 flex-1 text-sm">Python</span>
                                                        <span class="dropdown-span mr-auto">
                                                            <svg class="dropdown-svg fill-current h-4 w-4 transition duration-150 ease-in-out"
                                                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                                <path
                                                                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                                            </svg>
                                                        </span>
                                                    </button>
                                                    <ul id="menu-lang-python" aria-hidden="true"
                                                        class="dropdown-ul group-hover:z-10 bg-gray-100 rounded-md shadow border border-slate-200 absolute top-0 right-0 transition duration-150 ease-in-out origin-top-left space-y-2 min-w-32 p-3">
                                                        <li class="dropdown-li px-3 py-1 hover:bg-gray-100 text-sm">2.7
                                                        </li>
                                                        <li class="dropdown-li px-3 py-1 hover:bg-gray-100 text-sm">3+
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li class="dropdown-li px-3 py-1 hover:bg-gray-100 text-sm">Go</li>
                                                <li class="dropdown-li px-3 py-1 hover:bg-gray-100 text-sm">Rust</li>
                                            </ul>
                                        </li>
                                        <li class="dropdown-li rounded-sm px-3 py-1 hover:bg-gray-100 text-sm">Testing
                                        </li>
                                    </ul>
                                </div>
                                <div class="group inline-block w-full ">
                                    <button aria-haspopup="true" aria-controls="menu"
                                        class="outline-none focus:outline-none rounded-sm flex justify-between items-center min-w-32">
                                        <span
                                            class="pr-1 flex-1 text-slate-900 text-[14px] font-medium leading-tight">Dropdown</span>
                                        <span>
                                            <svg class="fill-current h-4 w-4 transform group-hover:-rotate-180 transition duration-150 ease-in-out"
                                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                <path
                                                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                            </svg>
                                        </span>
                                    </button>
                                    <ul id="menu" aria-hidden="true"
                                        class="z-50 bg-gray-100 rounded-md shadow border border-slate-200 transform scale-0 group-hover:scale-100 absolute transition duration-150 ease-in-out origin-top min-w-32 space-y-2 p-3">
                                        <li class="dropdown-li rounded-sm px-3 py-1 hover:bg-gray-100 text-sm ">
                                            Programming
                                        </li>
                                        <li class="dropdown-li rounded-sm px-3 py-1 hover:bg-gray-100 text-sm">DevOps
                                        </li>
                                        <li class="dropdown-li rounded-sm relative px-3 py-1 hover:bg-gray-100">
                                            <button aria-haspopup="true" aria-controls="menu-lang"
                                                class="dropdown-button w-full text-left flex items-center outline-none focus:outline-none">
                                                <span class=" dropdown-span pr-1 flex-1 text-sm">Langauges</span>
                                                <span class="dropdown-span mr-auto">
                                                    <svg class="dropdown-svg fill-current h-4 w-4 transition duration-150 ease-in-out"
                                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                        <path
                                                            d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                                    </svg>
                                                </span>
                                            </button>
                                            <ul id="menu-lang" aria-hidden="true"
                                                class="dropdown-ul bg-gray-100 rounded-md shadow border border-slate-200 transform absolute transition duration-150 ease-in-out origin-top min-w-32 space-y-2 p-3">
                                                <li class="dropdown-li px-3 py-1 hover:bg-gray-100 text-sm">Javascript
                                                </li>
                                                <li
                                                    class="dropdown dropdown-li rounded-sm relative px-3 py-1 hover:bg-gray-100">
                                                    <button aria-haspopup="true" aria-controls="menu-lang-python"
                                                        class="dropdown-button w-full text-left flex items-center outline-none focus:outline-none">
                                                        <span class="dropdown-span pr-1 flex-1 text-sm">Python</span>
                                                        <span class="dropdown-span mr-auto">
                                                            <svg class="dropdown-svg fill-current h-4 w-4 transition duration-150 ease-in-out"
                                                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                                <path
                                                                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                                            </svg>
                                                        </span>
                                                    </button>
                                                    <ul id="menu-lang-python" aria-hidden="true"
                                                        class="dropdown-ul group-hover:z-10 bg-gray-100 rounded-md shadow border border-slate-200 absolute top-0 right-0 transition duration-150 ease-in-out origin-top-left space-y-2 min-w-32 p-3">
                                                        <li class="dropdown-li px-3 py-1 hover:bg-gray-100 text-sm">2.7
                                                        </li>
                                                        <li class="dropdown-li px-3 py-1 hover:bg-gray-100 text-sm">3+
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li class="dropdown-li px-3 py-1 hover:bg-gray-100 text-sm">Go</li>
                                                <li class="dropdown-li px-3 py-1 hover:bg-gray-100 text-sm">Rust</li>
                                            </ul>
                                        </li>
                                        <li class="dropdown-li rounded-sm px-3 py-1 hover:bg-gray-100 text-sm">Testing
                                        </li>
                                    </ul>
                                </div>
                                <div class="group inline-block w-full ">
                                    <button aria-haspopup="true" aria-controls="menu"
                                        class="outline-none focus:outline-none rounded-sm flex justify-between items-center min-w-32">
                                        <span
                                            class="pr-1 flex-1 text-slate-900 text-[14px] font-medium leading-tight">Dropdown</span>
                                        <span>
                                            <svg class="fill-current h-4 w-4 transform group-hover:-rotate-180 transition duration-150 ease-in-out"
                                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                <path
                                                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                            </svg>
                                        </span>
                                    </button>
                                    <ul id="menu" aria-hidden="true"
                                        class="z-50 bg-gray-100 rounded-md shadow border border-slate-200 transform scale-0 group-hover:scale-100 absolute transition duration-150 ease-in-out origin-top min-w-32 space-y-2 p-3">
                                        <li class="dropdown-li rounded-sm px-3 py-1 hover:bg-gray-100 text-sm ">
                                            Programming
                                        </li>
                                        <li class="dropdown-li rounded-sm px-3 py-1 hover:bg-gray-100 text-sm">DevOps
                                        </li>
                                        <li class="dropdown-li rounded-sm relative px-3 py-1 hover:bg-gray-100">
                                            <button aria-haspopup="true" aria-controls="menu-lang"
                                                class="dropdown-button w-full text-left flex items-center outline-none focus:outline-none">
                                                <span class=" dropdown-span pr-1 flex-1 text-sm">Langauges</span>
                                                <span class="dropdown-span mr-auto">
                                                    <svg class="dropdown-svg fill-current h-4 w-4 transition duration-150 ease-in-out"
                                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                        <path
                                                            d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                                    </svg>
                                                </span>
                                            </button>
                                            <ul id="menu-lang" aria-hidden="true"
                                                class="dropdown-ul bg-gray-100 rounded-md shadow border border-slate-200 transform absolute transition duration-150 ease-in-out origin-top min-w-32 space-y-2 p-3">
                                                <li class="dropdown-li px-3 py-1 hover:bg-gray-100 text-sm">Javascript
                                                </li>
                                                <li
                                                    class="dropdown dropdown-li rounded-sm relative px-3 py-1 hover:bg-gray-100">
                                                    <button aria-haspopup="true" aria-controls="menu-lang-python"
                                                        class="dropdown-button w-full text-left flex items-center outline-none focus:outline-none">
                                                        <span class="dropdown-span pr-1 flex-1 text-sm">Python</span>
                                                        <span class="dropdown-span mr-auto">
                                                            <svg class="dropdown-svg fill-current h-4 w-4 transition duration-150 ease-in-out"
                                                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                                <path
                                                                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                                            </svg>
                                                        </span>
                                                    </button>
                                                    <ul id="menu-lang-python" aria-hidden="true"
                                                        class="dropdown-ul group-hover:z-10 bg-gray-100 rounded-md shadow border border-slate-200 absolute top-0 right-0 transition duration-150 ease-in-out origin-top-left space-y-2 min-w-32 p-3">
                                                        <li class="dropdown-li px-3 py-1 hover:bg-gray-100 text-sm">2.7
                                                        </li>
                                                        <li class="dropdown-li px-3 py-1 hover:bg-gray-100 text-sm">3+
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li class="dropdown-li px-3 py-1 hover:bg-gray-100 text-sm">Go</li>
                                                <li class="dropdown-li px-3 py-1 hover:bg-gray-100 text-sm">Rust</li>
                                            </ul>
                                        </li>
                                        <li class="dropdown-li rounded-sm px-3 py-1 hover:bg-gray-100 text-sm">Testing
                                        </li>
                                    </ul>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div class="Frame875 pt-0 justify-start items-start gap-2.5 inline-flex flex-col w-full h-full ">
                <div
                    class="Frame875 xl:px-[30px] lg:px-[30px] py-5 justify-start items-start gap-2.5 flex w-full min-h-full">
                    <details class="group inline-block [&[open]>summary::before]:content-[url('<?php global $accordianToggleIcon;
                    echo $accordianToggleIcon; ?>')] [&[open]>summary::before]:rotate-180 ">
                        <summary class="before:content-[url('<?php global $accordianToggleIcon;
                        echo $accordianToggleIcon; ?>')]"
                            style="align-self: stretch; height: 36px; padding-top: 8px; padding-bottom: 8px; border-radius: 6px; display: flex;">
                            <div
                                style="align-self: stretch; flex: 1 1 0; justify-content: flex-start; align-items: center; gap: 4px; display: inline-flex">
                                <div
                                    style="color: #0F172A; font-size: 14px;  font-weight: 500; line-height: 20px; word-wrap: break-word">
                                    Components</div>
                            </div>
                        </summary>
                        <div class=""
                            style="padding-left: 5px; justify-content: flex-start;  align-items: flex-start; gap: 10px; display: inline-flex">
                            <div
                                style="margin-left: 2px; padding-left: 16px;   flex-direction: column; justify-content: flex-start; align-items: flex-start; display: inline-flex">
                                <div
                                    style="flex-direction: column; justify-content: flex-start; align-items: flex-start; display: flex">
                                    <details class="group inline-block [&[open]>summary::before]:content-[url('<?php global $accordianToggleIcon;
                                    echo $accordianToggleIcon; ?>')] [&[open]>summary::before]:rotate-180 ">
                                        <summary class="before:content-[url('<?php global $accordianToggleIcon;
                                        echo $accordianToggleIcon; ?>')]"
                                            style="align-self: stretch; height: 36px; padding-top: 8px; padding-bottom: 8px; border-radius: 6px; display: flex;">
                                            <div
                                                style="align-self: stretch; flex: 1 1 0; justify-content: flex-start; align-items: center; gap: 4px; display: inline-flex">
                                                <div
                                                    style="color: #0F172A; font-size: 14px;  font-weight: 500; line-height: 20px; word-wrap: break-word">
                                                    Components</div>
                                            </div>
                                        </summary>
                                        <div class="">something</div>
                                    </details>
                                </div>
                            </div>
                        </div>
                    </details>
                </div>
            </div>

        </div>
    </div>
    <?php wp_footer(); ?>
</body>

</html>