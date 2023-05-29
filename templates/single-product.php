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
                    "brand-tertiary": "#F6F7FD",
                },
            },
        },
    }
    </script>
</head>

<body class="w-full h-full bg-content-bg text-tertiary flex justify-center">
    <!-- Fahad: Use raw HTML in this page -->

    <!-- Start Single Product Coding Here -->
    <div class="appstore-single-product-wrapper h-full w-full flex flex-col justify-between items-center gap-14 py-10">
        <!-- LOGO & CTA -->
        <div class="flex flex-col items-center justify-center gap-10">
            <img src="https://img.logoipsum.com/285.svg" className="w-36 h-20" alt="" />
            <div class="flex justify-between gap-5">
                <a
                    class="active:animate-bounce active:text-brand-tertiary text-sm select-none bg-tertiary text-brand-tertiary font-semibold py-3 px-6 rounded-full shadow-lg">See
                    How It Works</a>
                <a
                    class="active:animate-bounce active:text-tertiary text-sm select-none text-tertiary bg-brand-tertiary font-semibold py-3 px-6 rounded-full shadow-lg">See
                    Live Preview</a>
            </div>
        </div>
        <div class="flex flex-col justify-center items-center gap-5">
            <p class="">Simple, transparent pricing that grows with you. Try any plan free for 30 days.</p>
            <div class="shadow-lg flex rounded-lg w-max bg-brand-tertiary p-1">
                <div
                    class="active:outline outline-tertiary shadow-lg shadow-tertiary/20 font-medium select-none text-sm rounded-lg px-6 py-2.5 bg-tertiary text-brand-tertiary">
                    Monthly billing</div>
                <div class="font-medium select-none text-sm rounded-lg px-6 py-2.5">
                    Annual billing</div>
            </div>
            <!-- Cards -->
            <div class="relative mt-8 max-w-2xl mx-auto px-4 pb-8 sm:mt-12 sm:px-6 lg:max-w-7xl lg:px-8 lg:pb-0">
                <!-- Decorative background -->
                <!-- <div aria-hidden="true"
                class="hidden absolute top-4 bottom-0 left-8 right-8 inset-0 bg-brand-tertiary shadow-lg rounded-lg lg:block">
            </div> -->

                <div class="relative space-y-6 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-2">
                    <div
                        class="flex flex-col justify-between items-center shadow-xl bg-brand-tertiary pt-6 px-6 pb-3 rounded-3xl lg:px-6 lg:py-8">
                        <div class="w-full">
                            <h3 class="text-tertiary text-sm font-semibold uppercase tracking-wide">Starter</h3>
                            <div
                                class="flex flex-col items-start sm:flex-row sm:items-center sm:justify-between lg:flex-col lg:items-start">
                                <div class="mt-3 flex items-center">
                                    <p class="text-tertiary text-4xl font-extrabold tracking-tight">$19</p>
                                    <div class="ml-4">
                                        <p class="text-tertiary text-sm">USD / mo</p>
                                        <p class="text-tertiary/70 text-sm">Billed yearly ($199)</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h4 class="sr-only">Features</h4>
                        <ul role="list" class="mt-7 ">
                            <li class="py-3 flex items-center">
                                <!-- Heroicon name: solid/check -->
                                <svg class="text-tertiary w-5 h-5 flex-shrink-0"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                    aria-hidden="true">
                                    <path fill-rule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clip-rule="evenodd" />
                                </svg>
                                <span class="text-tertiary ml-3 text-sm font-medium">Feature text goes
                                    here</span>
                            </li>

                            <li class="py-3 flex items-center">
                                <!-- Heroicon name: solid/check -->
                                <svg class="text-tertiary w-5 h-5 flex-shrink-0"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                    aria-hidden="true">
                                    <path fill-rule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clip-rule="evenodd" />
                                </svg>
                                <span class="text-tertiary ml-3 text-sm font-medium">Feature text goes
                                    here</span>
                            </li>

                            <li class="py-3 flex items-center">
                                <!-- Heroicon name: solid/check -->
                                <svg class="text-tertiary w-5 h-5 flex-shrink-0"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                    aria-hidden="true">
                                    <path fill-rule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clip-rule="evenodd" />
                                </svg>
                                <span class="text-tertiary ml-3 text-sm font-medium">Feature text goes
                                    here</span>
                            </li>

                            <li class="py-3 flex items-center">
                                <!-- Heroicon name: solid/check -->
                                <svg class="text-tertiary w-5 h-5 flex-shrink-0"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                    aria-hidden="true">
                                    <path fill-rule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clip-rule="evenodd" />
                                </svg>
                                <span class="text-tertiary ml-3 text-sm font-medium">Feature text goes
                                    here</span>
                            </li>

                            <li class="py-3 flex items-center">
                                <!-- Heroicon name: solid/check -->
                                <svg class="text-tertiary w-5 h-5 flex-shrink-0"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                    aria-hidden="true">
                                    <path fill-rule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clip-rule="evenodd" />
                                </svg>
                                <span class="text-tertiary ml-3 text-sm font-medium">Feature text goes
                                    here</span>
                            </li>
                        </ul>
                        <a href="#"
                            class="bg-tertiary text-brand-tertiary hover:text-tertiary hover:bg-tertiary/5 mt-6 w-full inline-block py-2 px-8 border border-transparent rounded-full shadow-sm text-center text-sm font-medium sm:mt-0 sm:w-auto lg:mt-6 lg:w-full hover:underline hover:decoration-dashed">Get Started</a>
                    </div>

                    <div
                        class="flex flex-col justify-between z-50 bg-tertiary lg:scale-105 shadow-xl lg:relative lg:bottom-3 px-6 py-3 rounded-3xl lg:px-12 lg:py-8">
                        <div class="">
                            <div>
                                <h3 class="text-brand-tertiary text-sm font-semibold uppercase tracking-wide">Business</h3>
                                <div
                                    class="flex flex-col items-start sm:flex-row sm:items-center sm:justify-between lg:flex-col lg:items-start">
                                    <div class="mt-3 flex items-center">
                                        <p class="text-brand-tertiary text-4xl font-extrabold tracking-tight">$29</p>
                                        <div class="ml-4">
                                            <p class="text-brand-tertiary text-sm">USD / mo</p>
                                            <p class="text-brand-tertiary/70 text-sm">Billed yearly ($299)</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <h4 class="sr-only">Features</h4>
                            <ul role="list" class="mt-7 ">
                                <li class="py-3 flex items-center">
                                    <!-- Heroicon name: solid/check -->
                                    <svg class="text-brand-tertiary w-5 h-5 flex-shrink-0"
                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                        aria-hidden="true">
                                        <path fill-rule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clip-rule="evenodd" />
                                    </svg>
                                    <span class="text-brand-tertiary ml-3 text-sm font-medium">Feature text goes
                                        here</span>
                                </li>

                                <li class="py-3 flex items-center">
                                    <!-- Heroicon name: solid/check -->
                                    <svg class="text-brand-tertiary w-5 h-5 flex-shrink-0"
                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                        aria-hidden="true">
                                        <path fill-rule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clip-rule="evenodd" />
                                    </svg>
                                    <span class="text-brand-tertiary ml-3 text-sm font-medium">Feature text goes
                                        here</span>
                                </li>

                                <li class="py-3 flex items-center">
                                    <!-- Heroicon name: solid/check -->
                                    <svg class="text-brand-tertiary w-5 h-5 flex-shrink-0"
                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                        aria-hidden="true">
                                        <path fill-rule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clip-rule="evenodd" />
                                    </svg>
                                    <span class="text-brand-tertiary ml-3 text-sm font-medium">Feature text goes
                                        here</span>
                                </li>

                                <li class="py-3 flex items-center">
                                    <!-- Heroicon name: solid/check -->
                                    <svg class="text-brand-tertiary w-5 h-5 flex-shrink-0"
                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                        aria-hidden="true">
                                        <path fill-rule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clip-rule="evenodd" />
                                    </svg>
                                    <span class="text-brand-tertiary ml-3 text-sm font-medium">Feature text goes
                                        here</span>
                                </li>

                                <li class="py-3 flex items-center">
                                    <!-- Heroicon name: solid/check -->
                                    <svg class="text-brand-tertiary w-5 h-5 flex-shrink-0"
                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                        aria-hidden="true">
                                        <path fill-rule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clip-rule="evenodd" />
                                    </svg>
                                    <span class="text-brand-tertiary ml-3 text-sm font-medium">Feature text goes
                                        here</span>
                                </li>
                            </ul>
                        </div>
                        <a href="#"
                            class="font-bold bg-brand-tertiary text-tertiary mt-6 w-full inline-block py-2 px-8 border border-transparent rounded-full shadow-sm text-center text-sm sm:mt-0 sm:w-auto lg:mt-6 lg:w-full underline decoration-dashed">Get Started</a>
                    </div>

                    <div
                        class="flex flex-col justify-between items-center shadow-xl bg-brand-tertiary pt-6 px-6 pb-3 rounded-3xl lg:px-6 lg:py-8">
                        <div>
                            <h3 class="text-tertiary text-sm font-semibold uppercase tracking-wide">Enterprise</h3>
                            <div
                                class="flex flex-col items-start sm:flex-row sm:items-center sm:justify-between lg:flex-col lg:items-start">
                                <div class="mt-3 flex items-center">
                                    <p class="text-tertiary text-4xl font-extrabold tracking-tight">$49</p>
                                    <div class="ml-4">
                                        <p class="text-tertiary text-sm">USD / mo</p>
                                        <p class="text-tertiary/80 text-sm">Billed yearly ($499)</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h4 class="sr-only">Features</h4>
                        <ul role="list" class="w-full mt-7">
                            <li class="py-3 flex items-center">
                                <!-- Heroicon name: solid/check -->
                                <svg class="text-tertiary w-5 h-5 flex-shrink-0"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                    aria-hidden="true">
                                    <path fill-rule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clip-rule="evenodd" />
                                </svg>
                                <span class="text-tertiary ml-3 text-sm font-medium">Feature text goes
                                    here</span>
                            </li>

                            <li class="py-3 flex items-center">
                                <!-- Heroicon name: solid/check -->
                                <svg class="text-tertiary w-5 h-5 flex-shrink-0"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                    aria-hidden="true">
                                    <path fill-rule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clip-rule="evenodd" />
                                </svg>
                                <span class="text-tertiary ml-3 text-sm font-medium">Feature text goes
                                    here</span>
                            </li>

                            <li class="py-3 flex items-center">
                                <!-- Heroicon name: solid/check -->
                                <svg class="text-tertiary w-5 h-5 flex-shrink-0"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                    aria-hidden="true">
                                    <path fill-rule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clip-rule="evenodd" />
                                </svg>
                                <span class="text-tertiary ml-3 text-sm font-medium">Feature text goes
                                    here</span>
                            </li>

                            <li class="py-3 flex items-center">
                                <!-- Heroicon name: solid/check -->
                                <svg class="text-tertiary w-5 h-5 flex-shrink-0"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                    aria-hidden="true">
                                    <path fill-rule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clip-rule="evenodd" />
                                </svg>
                                <span class="text-tertiary ml-3 text-sm font-medium">Feature text goes
                                    here</span>
                            </li>

                            <li class="py-3 flex items-center">
                                <!-- Heroicon name: solid/check -->
                                <svg class="text-tertiary w-5 h-5 flex-shrink-0"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                    aria-hidden="true">
                                    <path fill-rule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clip-rule="evenodd" />
                                </svg>
                                <span class="text-tertiary ml-3 text-sm font-medium">Feature text goes
                                    here</span>
                            </li>
                        </ul>
                        <a href="#"
                            class="bg-tertiary text-brand-tertiary hover:text-tertiary hover:bg-tertiary/5 mt-6 w-full inline-block py-2 px-8 border border-transparent rounded-full shadow-sm text-center text-sm font-medium sm:mt-0 sm:w-auto lg:mt-6 lg:w-full hover:underline hover:decoration-dashed">Get Started</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
    <!-- End Single Product Coding Here -->

    <?php wp_footer();?>
</body>

</html>