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
                        "brand-tertiary": "#F6F7FD",
                    },
                },
            },
        }
    </script>
      <!-- Link Swiper's CSS -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.css" />

<!-- Demo styles -->
<style>
  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 760px) {
    .swiper-button-next {
      right: 20px;
      transform: rotate(90deg);
    }

    .swiper-button-prev {
      left: 20px;
      transform: rotate(90deg);
    }
  }
</style>
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
            <p class="px-3 sm:px-0 text-center sm:text-left">Simple, transparent pricing that grows with you. Try any plan free for 30 days.</p>
            <div class="shadow-lg flex rounded-lg w-max bg-brand-tertiary p-1">
                <div
                    class="active:outline outline-tertiary shadow-lg shadow-tertiary/20 font-medium select-none text-sm rounded-lg px-6 py-2.5 bg-tertiary text-brand-tertiary">
                    Monthly billing</div>
                <div class="font-medium select-none text-sm rounded-lg px-6 py-2.5">
                    Annual billing</div>
            </div>
            <!-- Cards -->
            <!-- <div class="relative mt-8 max-w-2xl mx-auto px-4 pb-8 sm:mt-12 sm:px-6 lg:max-w-7xl lg:px-8 lg:pb-0"> -->
                <!-- Decorative background -->
                <!-- <div aria-hidden="true"
                class="hidden absolute top-4 bottom-0 left-8 right-8 inset-0 bg-brand-tertiary shadow-lg rounded-lg lg:block">
            </div> -->
            <!-- Swiper -->
  <div class="swiper sm:max-w-2xl md:max-w-5xl xl:max-w-7xl w-full max-h-full">
    <div class="swiper-wrapper [&>.swiper-slide]:!h-max">
    <div class="swiper-slide">

                    <div class=" flex flex-col justify-between items-center bg-brand-tertiary shadow-lg rounded-3xl px-14 py-8">
                        <div class="w-full">
                            <h3 class="text-tertiary text-sm font-semibold uppercase tracking-wide">Starter</h3>
                            <div class="flex flex-col items-start">
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
                                <svg class="text-tertiary w-5 h-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clip-rule="evenodd" />
                                </svg>
                                <span class="text-tertiary ml-3 text-sm font-medium">Feature text goes
                                    here</span>
                            </li>

                            <li class="py-3 flex items-center">
                                <!-- Heroicon name: solid/check -->
                                <svg class="text-tertiary w-5 h-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clip-rule="evenodd" />
                                </svg>
                                <span class="text-tertiary ml-3 text-sm font-medium">Feature text goes
                                    here</span>
                            </li>

                            <li class="py-3 flex items-center">
                                <!-- Heroicon name: solid/check -->
                                <svg class="text-tertiary w-5 h-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clip-rule="evenodd" />
                                </svg>
                                <span class="text-tertiary ml-3 text-sm font-medium">Feature text goes
                                    here</span>
                            </li>

                            <li class="py-3 flex items-center">
                                <!-- Heroicon name: solid/check -->
                                <svg class="text-tertiary w-5 h-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clip-rule="evenodd" />
                                </svg>
                                <span class="text-tertiary ml-3 text-sm font-medium">Feature text goes
                                    here</span>
                            </li>

                            <li class="py-3 flex items-center">
                                <!-- Heroicon name: solid/check -->
                                <svg class="text-tertiary w-5 h-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clip-rule="evenodd" />
                                </svg>
                                <span class="text-tertiary ml-3 text-sm font-medium">Feature text goes
                                    here</span>
                            </li>
                        </ul>
                        <a href="#"
                            class="bg-tertiary text-brand-tertiary hover:text-tertiary hover:bg-tertiary/5 mt-6 inline-block py-2 px-8 border border-transparent rounded-full shadow-sm text-center text-sm font-medium sm:mt-0 sm:w-auto lg:mt-6 w-full hover:underline hover:decoration-dashed">Get
                            Started</a>
                    </div>
                    </div>
                    <div class="swiper-slide">

                    <div class="flex flex-col justify-between z-50 bg-tertiary  shadow-xl rounded-3xl px-14 py-8">
                        <div class="">
                            <div>
                                <h3 class="text-brand-tertiary text-sm font-semibold uppercase tracking-wide">Business
                                </h3>
                                <div
                                    class="flex flex-col items-start">
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
                            class="font-bold bg-brand-tertiary text-tertiary inline-block py-2 px-8 border border-transparent rounded-full shadow-sm text-center text-sm  mt-6 w-full underline decoration-dashed">Get
                            Started</a>
                    </div>
                    </div>

                    <div class="swiper-slide">


                    <div class="flex flex-col justify-between items-center bg-brand-tertiary shadow-lg rounded-3xl px-14 py-8">
                        <div>
                            <h3 class="text-tertiary text-sm font-semibold uppercase tracking-wide">Enterprise</h3>
                            <div
                                class="flex flex-col items-start ">
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
                                <svg class="text-tertiary w-5 h-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clip-rule="evenodd" />
                                </svg>
                                <span class="text-tertiary ml-3 text-sm font-medium">Feature text goes
                                    here</span>
                            </li>

                            <li class="py-3 flex items-center">
                                <!-- Heroicon name: solid/check -->
                                <svg class="text-tertiary w-5 h-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clip-rule="evenodd" />
                                </svg>
                                <span class="text-tertiary ml-3 text-sm font-medium">Feature text goes
                                    here</span>
                            </li>

                            <li class="py-3 flex items-center">
                                <!-- Heroicon name: solid/check -->
                                <svg class="text-tertiary w-5 h-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clip-rule="evenodd" />
                                </svg>
                                <span class="text-tertiary ml-3 text-sm font-medium">Feature text goes
                                    here</span>
                            </li>

                            <li class="py-3 flex items-center">
                                <!-- Heroicon name: solid/check -->
                                <svg class="text-tertiary w-5 h-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clip-rule="evenodd" />
                                </svg>
                                <span class="text-tertiary ml-3 text-sm font-medium">Feature text goes
                                    here</span>
                            </li>

                            <li class="py-3 flex items-center">
                                <!-- Heroicon name: solid/check -->
                                <svg class="text-tertiary w-5 h-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clip-rule="evenodd" />
                                </svg>
                                <span class="text-tertiary ml-3 text-sm font-medium">Feature text goes
                                    here</span>
                            </li>
                        </ul>
                        <a href="#"
                            class="bg-tertiary text-brand-tertiary hover:text-tertiary hover:bg-tertiary/5 inline-block py-2 px-8 border border-transparent rounded-full shadow-sm text-center text-sm font-medium mt-6 w-full hover:underline hover:decoration-dashed">Get
                            Started</a>
                    </div>
                    </div>
                    
                    <div class="swiper-slide">
                    <div class="flex flex-col justify-between items-center bg-brand-tertiary shadow-lg rounded-3xl px-14 py-8">
                        <div>
                            <h3 class="text-tertiary text-sm font-semibold uppercase tracking-wide">Enterprise</h3>
                            <div
                                class="flex flex-col items-start ">
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
                                <svg class="text-tertiary w-5 h-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clip-rule="evenodd" />
                                </svg>
                                <span class="text-tertiary ml-3 text-sm font-medium">Feature text goes
                                    here</span>
                            </li>

                            <li class="py-3 flex items-center">
                                <!-- Heroicon name: solid/check -->
                                <svg class="text-tertiary w-5 h-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clip-rule="evenodd" />
                                </svg>
                                <span class="text-tertiary ml-3 text-sm font-medium">Feature text goes
                                    here</span>
                            </li>

                            <li class="py-3 flex items-center">
                                <!-- Heroicon name: solid/check -->
                                <svg class="text-tertiary w-5 h-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clip-rule="evenodd" />
                                </svg>
                                <span class="text-tertiary ml-3 text-sm font-medium">Feature text goes
                                    here</span>
                            </li>

                            <li class="py-3 flex items-center">
                                <!-- Heroicon name: solid/check -->
                                <svg class="text-tertiary w-5 h-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clip-rule="evenodd" />
                                </svg>
                                <span class="text-tertiary ml-3 text-sm font-medium">Feature text goes
                                    here</span>
                            </li>

                            <li class="py-3 flex items-center">
                                <!-- Heroicon name: solid/check -->
                                <svg class="text-tertiary w-5 h-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clip-rule="evenodd" />
                                </svg>
                                <span class="text-tertiary ml-3 text-sm font-medium">Feature text goes
                                    here</span>
                            </li>
                        </ul>
                        <a href="#"
                            class="bg-tertiary text-brand-tertiary hover:text-tertiary hover:bg-tertiary/5 inline-block py-2 px-8 border border-transparent rounded-full shadow-sm text-center text-sm font-medium mt-6 w-full hover:underline hover:decoration-dashed">Get
                            Started</a>
                    </div>
    
                    </div>
                    
</div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>


      <!-- Swiper JS -->
      <script src="https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.js"></script>

<!-- Initialize Swiper -->
<script>
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

  function getDirection() {
    var windowWidth = window.innerWidth;
    var direction = window.innerWidth <= 760 ? 'vertical' : 'horizontal';

    return direction;
  }
</script>

        </div>
        <!-- Comparison table -->
        <div class="max-w-2xl mx-auto bg-brand-tertiary py-16 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
            <!-- xs to lg -->
            <div class="space-y-24 lg:hidden">
                <section>
                    <div class="px-4 mb-8">
                        <h2 class="text-lg leading-6 font-medium text-gray-900">Basic</h2>
                    </div>

                    <table class="w-full">
                        <caption
                            class="bg-gray-50 border-t border-gray-200 py-3 px-4 text-sm font-medium text-gray-900 text-left">
                            Features
                        </caption>
                        <thead>
                            <tr>
                                <th class="sr-only" scope="col">Feature</th>
                                <th class="sr-only" scope="col">Included</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200">
                            <tr class="border-t border-gray-200">
                                <th class="py-5 px-4 text-sm font-normal text-gray-500 text-left" scope="row">Molestie
                                    lobortis massa.</th>
                                <td class="py-5 pr-4">
                                    <!-- Heroicon name: solid/check -->
                                    <svg class="ml-auto h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clip-rule="evenodd" />
                                    </svg>
                                    <span class="sr-only">Yes</span>
                                </td>
                            </tr>

                            <tr class="border-t border-gray-200">
                                <th class="py-5 px-4 text-sm font-normal text-gray-500 text-left" scope="row">Urna purus
                                    felis.</th>
                                <td class="py-5 pr-4">
                                    <!-- Heroicon name: solid/check -->
                                    <svg class="ml-auto h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clip-rule="evenodd" />
                                    </svg>
                                    <span class="sr-only">Yes</span>
                                </td>
                            </tr>

                            <tr class="border-t border-gray-200">
                                <th class="py-5 px-4 text-sm font-normal text-gray-500 text-left" scope="row">Tellus
                                    pulvinar sit dictum.</th>
                                <td class="py-5 pr-4">
                                    <!-- Heroicon name: solid/minus -->
                                    <svg class="ml-auto h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                            clip-rule="evenodd" />
                                    </svg>
                                    <span class="sr-only">No</span>
                                </td>
                            </tr>

                            <tr class="border-t border-gray-200">
                                <th class="py-5 px-4 text-sm font-normal text-gray-500 text-left" scope="row">Convallis.
                                </th>
                                <td class="py-5 pr-4">
                                    <!-- Heroicon name: solid/minus -->
                                    <svg class="ml-auto h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                            clip-rule="evenodd" />
                                    </svg>
                                    <span class="sr-only">No</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <table class="w-full">
                        <caption
                            class="bg-gray-50 border-t border-gray-200 py-3 px-4 text-sm font-medium text-gray-900 text-left">
                            Reporting
                        </caption>
                        <thead>
                            <tr>
                                <th class="sr-only" scope="col">Feature</th>
                                <th class="sr-only" scope="col">Included</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200">
                            <tr class="border-t border-gray-200">
                                <th class="py-5 px-4 text-sm font-normal text-gray-500 text-left" scope="row">
                                    Adipiscing.</th>
                                <td class="py-5 pr-4">
                                    <!-- Heroicon name: solid/check -->
                                    <svg class="ml-auto h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clip-rule="evenodd" />
                                    </svg>
                                    <span class="sr-only">Yes</span>
                                </td>
                            </tr>

                            <tr class="border-t border-gray-200">
                                <th class="py-5 px-4 text-sm font-normal text-gray-500 text-left" scope="row">Eget risus
                                    integer.</th>
                                <td class="py-5 pr-4">
                                    <!-- Heroicon name: solid/minus -->
                                    <svg class="ml-auto h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                            clip-rule="evenodd" />
                                    </svg>
                                    <span class="sr-only">No</span>
                                </td>
                            </tr>

                            <tr class="border-t border-gray-200">
                                <th class="py-5 px-4 text-sm font-normal text-gray-500 text-left" scope="row">Gravida
                                    leo urna velit.</th>
                                <td class="py-5 pr-4">
                                    <!-- Heroicon name: solid/minus -->
                                    <svg class="ml-auto h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                            clip-rule="evenodd" />
                                    </svg>
                                    <span class="sr-only">No</span>
                                </td>
                            </tr>

                            <tr class="border-t border-gray-200">
                                <th class="py-5 px-4 text-sm font-normal text-gray-500 text-left" scope="row">Elementum
                                    ut dapibus mi feugiat cras nisl.</th>
                                <td class="py-5 pr-4">
                                    <!-- Heroicon name: solid/minus -->
                                    <svg class="ml-auto h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                            clip-rule="evenodd" />
                                    </svg>
                                    <span class="sr-only">No</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <table class="w-full">
                        <caption
                            class="bg-gray-50 border-t border-gray-200 py-3 px-4 text-sm font-medium text-gray-900 text-left">
                            Support
                        </caption>
                        <thead>
                            <tr>
                                <th class="sr-only" scope="col">Feature</th>
                                <th class="sr-only" scope="col">Included</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200">
                            <tr class="border-t border-gray-200">
                                <th class="py-5 px-4 text-sm font-normal text-gray-500 text-left" scope="row">Sit
                                    dignissim.</th>
                                <td class="py-5 pr-4">
                                    <!-- Heroicon name: solid/check -->
                                    <svg class="ml-auto h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clip-rule="evenodd" />
                                    </svg>
                                    <span class="sr-only">Yes</span>
                                </td>
                            </tr>

                            <tr class="border-t border-gray-200">
                                <th class="py-5 px-4 text-sm font-normal text-gray-500 text-left" scope="row">Congue at
                                    nibh et.</th>
                                <td class="py-5 pr-4">
                                    <!-- Heroicon name: solid/minus -->
                                    <svg class="ml-auto h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                            clip-rule="evenodd" />
                                    </svg>
                                    <span class="sr-only">No</span>
                                </td>
                            </tr>

                            <tr class="border-t border-gray-200">
                                <th class="py-5 px-4 text-sm font-normal text-gray-500 text-left" scope="row">Volutpat
                                    feugiat mattis.</th>
                                <td class="py-5 pr-4">
                                    <!-- Heroicon name: solid/minus -->
                                    <svg class="ml-auto h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                            clip-rule="evenodd" />
                                    </svg>
                                    <span class="sr-only">No</span>
                                </td>
                            </tr>

                            <tr class="border-t border-gray-200">
                                <th class="py-5 px-4 text-sm font-normal text-gray-500 text-left" scope="row">Tristique
                                    pellentesque ornare diam sapien.</th>
                                <td class="py-5 pr-4">
                                    <!-- Heroicon name: solid/minus -->
                                    <svg class="ml-auto h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                            clip-rule="evenodd" />
                                    </svg>
                                    <span class="sr-only">No</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="border-t border-gray-200 px-4 pt-5">
                        <a href="#"
                            class="flex justify-center items-center w-full active:outline outline-tertiary shadow-lg shadow-tertiary/20 font-medium select-none text-sm rounded-lg px-6 py-2.5 bg-tertiary text-brand-tertiary">Buy
                            Basic</a>
                    </div>
                </section>

                <section>
                    <div class="px-4 mb-8">
                        <h2 class="text-lg leading-6 font-medium text-gray-900">Essential</h2>
                    </div>

                    <table class="w-full">
                        <caption
                            class="bg-gray-50 border-t border-gray-200 py-3 px-4 text-sm font-medium text-gray-900 text-left">
                            Features
                        </caption>
                        <thead>
                            <tr>
                                <th class="sr-only" scope="col">Feature</th>
                                <th class="sr-only" scope="col">Included</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200">
                            <tr class="border-t border-gray-200">
                                <th class="py-5 px-4 text-sm font-normal text-gray-500 text-left" scope="row">Molestie
                                    lobortis massa.</th>
                                <td class="py-5 pr-4">
                                    <!-- Heroicon name: solid/check -->
                                    <svg class="ml-auto h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clip-rule="evenodd" />
                                    </svg>
                                    <span class="sr-only">Yes</span>
                                </td>
                            </tr>

                            <tr class="border-t border-gray-200">
                                <th class="py-5 px-4 text-sm font-normal text-gray-500 text-left" scope="row">Urna purus
                                    felis.</th>
                                <td class="py-5 pr-4">
                                    <!-- Heroicon name: solid/check -->
                                    <svg class="ml-auto h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clip-rule="evenodd" />
                                    </svg>
                                    <span class="sr-only">Yes</span>
                                </td>
                            </tr>

                            <tr class="border-t border-gray-200">
                                <th class="py-5 px-4 text-sm font-normal text-gray-500 text-left" scope="row">Tellus
                                    pulvinar sit dictum.</th>
                                <td class="py-5 pr-4">
                                    <!-- Heroicon name: solid/check -->
                                    <svg class="ml-auto h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clip-rule="evenodd" />
                                    </svg>
                                    <span class="sr-only">Yes</span>
                                </td>
                            </tr>

                            <tr class="border-t border-gray-200">
                                <th class="py-5 px-4 text-sm font-normal text-gray-500 text-left" scope="row">Convallis.
                                </th>
                                <td class="py-5 pr-4">
                                    <span class="block text-sm text-gray-700 text-right">Up to 20 users</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <table class="w-full">
                        <caption
                            class="bg-gray-50 border-t border-gray-200 py-3 px-4 text-sm font-medium text-gray-900 text-left">
                            Reporting
                        </caption>
                        <thead>
                            <tr>
                                <th class="sr-only" scope="col">Feature</th>
                                <th class="sr-only" scope="col">Included</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200">
                            <tr class="border-t border-gray-200">
                                <th class="py-5 px-4 text-sm font-normal text-gray-500 text-left" scope="row">
                                    Adipiscing.</th>
                                <td class="py-5 pr-4">
                                    <!-- Heroicon name: solid/check -->
                                    <svg class="ml-auto h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clip-rule="evenodd" />
                                    </svg>
                                    <span class="sr-only">Yes</span>
                                </td>
                            </tr>

                            <tr class="border-t border-gray-200">
                                <th class="py-5 px-4 text-sm font-normal text-gray-500 text-left" scope="row">Eget risus
                                    integer.</th>
                                <td class="py-5 pr-4">
                                    <!-- Heroicon name: solid/check -->
                                    <svg class="ml-auto h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clip-rule="evenodd" />
                                    </svg>
                                    <span class="sr-only">Yes</span>
                                </td>
                            </tr>

                            <tr class="border-t border-gray-200">
                                <th class="py-5 px-4 text-sm font-normal text-gray-500 text-left" scope="row">Gravida
                                    leo urna velit.</th>
                                <td class="py-5 pr-4">
                                    <!-- Heroicon name: solid/minus -->
                                    <svg class="ml-auto h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                            clip-rule="evenodd" />
                                    </svg>
                                    <span class="sr-only">No</span>
                                </td>
                            </tr>

                            <tr class="border-t border-gray-200">
                                <th class="py-5 px-4 text-sm font-normal text-gray-500 text-left" scope="row">Elementum
                                    ut dapibus mi feugiat cras nisl.</th>
                                <td class="py-5 pr-4">
                                    <!-- Heroicon name: solid/minus -->
                                    <svg class="ml-auto h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                            clip-rule="evenodd" />
                                    </svg>
                                    <span class="sr-only">No</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <table class="w-full">
                        <caption
                            class="bg-gray-50 border-t border-gray-200 py-3 px-4 text-sm font-medium text-gray-900 text-left">
                            Support
                        </caption>
                        <thead>
                            <tr>
                                <th class="sr-only" scope="col">Feature</th>
                                <th class="sr-only" scope="col">Included</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200">
                            <tr class="border-t border-gray-200">
                                <th class="py-5 px-4 text-sm font-normal text-gray-500 text-left" scope="row">Sit
                                    dignissim.</th>
                                <td class="py-5 pr-4">
                                    <!-- Heroicon name: solid/check -->
                                    <svg class="ml-auto h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clip-rule="evenodd" />
                                    </svg>
                                    <span class="sr-only">Yes</span>
                                </td>
                            </tr>

                            <tr class="border-t border-gray-200">
                                <th class="py-5 px-4 text-sm font-normal text-gray-500 text-left" scope="row">Congue at
                                    nibh et.</th>
                                <td class="py-5 pr-4">
                                    <!-- Heroicon name: solid/check -->
                                    <svg class="ml-auto h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clip-rule="evenodd" />
                                    </svg>
                                    <span class="sr-only">Yes</span>
                                </td>
                            </tr>

                            <tr class="border-t border-gray-200">
                                <th class="py-5 px-4 text-sm font-normal text-gray-500 text-left" scope="row">Volutpat
                                    feugiat mattis.</th>
                                <td class="py-5 pr-4">
                                    <!-- Heroicon name: solid/check -->
                                    <svg class="ml-auto h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clip-rule="evenodd" />
                                    </svg>
                                    <span class="sr-only">Yes</span>
                                </td>
                            </tr>

                            <tr class="border-t border-gray-200">
                                <th class="py-5 px-4 text-sm font-normal text-gray-500 text-left" scope="row">Tristique
                                    pellentesque ornare diam sapien.</th>
                                <td class="py-5 pr-4">
                                    <!-- Heroicon name: solid/minus -->
                                    <svg class="ml-auto h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                            clip-rule="evenodd" />
                                    </svg>
                                    <span class="sr-only">No</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="border-t border-gray-200 px-4 pt-5">
                        <a href="#"
                            class="flex justify-center items-center w-full active:outline outline-tertiary shadow-lg shadow-tertiary/20 font-medium select-none text-sm rounded-lg px-6 py-2.5 bg-tertiary text-brand-tertiary">Buy
                            Essential</a>
                    </div>
                </section>

                <section>
                    <div class="px-4 mb-8">
                        <h2 class="text-lg leading-6 font-medium text-gray-900">Premium</h2>
                    </div>

                    <table class="w-full">
                        <caption
                            class="bg-gray-50 border-t border-gray-200 py-3 px-4 text-sm font-medium text-gray-900 text-left">
                            Features
                        </caption>
                        <thead>
                            <tr>
                                <th class="sr-only" scope="col">Feature</th>
                                <th class="sr-only" scope="col">Included</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200">
                            <tr class="border-t border-gray-200">
                                <th class="py-5 px-4 text-sm font-normal text-gray-500 text-left" scope="row">Molestie
                                    lobortis massa.</th>
                                <td class="py-5 pr-4">
                                    <!-- Heroicon name: solid/check -->
                                    <svg class="ml-auto h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clip-rule="evenodd" />
                                    </svg>
                                    <span class="sr-only">Yes</span>
                                </td>
                            </tr>

                            <tr class="border-t border-gray-200">
                                <th class="py-5 px-4 text-sm font-normal text-gray-500 text-left" scope="row">Urna purus
                                    felis.</th>
                                <td class="py-5 pr-4">
                                    <!-- Heroicon name: solid/check -->
                                    <svg class="ml-auto h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clip-rule="evenodd" />
                                    </svg>
                                    <span class="sr-only">Yes</span>
                                </td>
                            </tr>

                            <tr class="border-t border-gray-200">
                                <th class="py-5 px-4 text-sm font-normal text-gray-500 text-left" scope="row">Tellus
                                    pulvinar sit dictum.</th>
                                <td class="py-5 pr-4">
                                    <!-- Heroicon name: solid/check -->
                                    <svg class="ml-auto h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clip-rule="evenodd" />
                                    </svg>
                                    <span class="sr-only">Yes</span>
                                </td>
                            </tr>

                            <tr class="border-t border-gray-200">
                                <th class="py-5 px-4 text-sm font-normal text-gray-500 text-left" scope="row">Convallis.
                                </th>
                                <td class="py-5 pr-4">
                                    <span class="block text-sm text-gray-700 text-right">Up to 50 users</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <table class="w-full">
                        <caption
                            class="bg-gray-50 border-t border-gray-200 py-3 px-4 text-sm font-medium text-gray-900 text-left">
                            Reporting
                        </caption>
                        <thead>
                            <tr>
                                <th class="sr-only" scope="col">Feature</th>
                                <th class="sr-only" scope="col">Included</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200">
                            <tr class="border-t border-gray-200">
                                <th class="py-5 px-4 text-sm font-normal text-gray-500 text-left" scope="row">
                                    Adipiscing.</th>
                                <td class="py-5 pr-4">
                                    <!-- Heroicon name: solid/check -->
                                    <svg class="ml-auto h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clip-rule="evenodd" />
                                    </svg>
                                    <span class="sr-only">Yes</span>
                                </td>
                            </tr>

                            <tr class="border-t border-gray-200">
                                <th class="py-5 px-4 text-sm font-normal text-gray-500 text-left" scope="row">Eget risus
                                    integer.</th>
                                <td class="py-5 pr-4">
                                    <!-- Heroicon name: solid/check -->
                                    <svg class="ml-auto h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clip-rule="evenodd" />
                                    </svg>
                                    <span class="sr-only">Yes</span>
                                </td>
                            </tr>

                            <tr class="border-t border-gray-200">
                                <th class="py-5 px-4 text-sm font-normal text-gray-500 text-left" scope="row">Gravida
                                    leo urna velit.</th>
                                <td class="py-5 pr-4">
                                    <!-- Heroicon name: solid/check -->
                                    <svg class="ml-auto h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clip-rule="evenodd" />
                                    </svg>
                                    <span class="sr-only">Yes</span>
                                </td>
                            </tr>

                            <tr class="border-t border-gray-200">
                                <th class="py-5 px-4 text-sm font-normal text-gray-500 text-left" scope="row">Elementum
                                    ut dapibus mi feugiat cras nisl.</th>
                                <td class="py-5 pr-4">
                                    <!-- Heroicon name: solid/check -->
                                    <svg class="ml-auto h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clip-rule="evenodd" />
                                    </svg>
                                    <span class="sr-only">Yes</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <table class="w-full">
                        <caption
                            class="bg-gray-50 border-t border-gray-200 py-3 px-4 text-sm font-medium text-gray-900 text-left">
                            Support
                        </caption>
                        <thead>
                            <tr>
                                <th class="sr-only" scope="col">Feature</th>
                                <th class="sr-only" scope="col">Included</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200">
                            <tr class="border-t border-gray-200">
                                <th class="py-5 px-4 text-sm font-normal text-gray-500 text-left" scope="row">Sit
                                    dignissim.</th>
                                <td class="py-5 pr-4">
                                    <!-- Heroicon name: solid/check -->
                                    <svg class="ml-auto h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clip-rule="evenodd" />
                                    </svg>
                                    <span class="sr-only">Yes</span>
                                </td>
                            </tr>

                            <tr class="border-t border-gray-200">
                                <th class="py-5 px-4 text-sm font-normal text-gray-500 text-left" scope="row">Congue at
                                    nibh et.</th>
                                <td class="py-5 pr-4">
                                    <!-- Heroicon name: solid/check -->
                                    <svg class="ml-auto h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clip-rule="evenodd" />
                                    </svg>
                                    <span class="sr-only">Yes</span>
                                </td>
                            </tr>

                            <tr class="border-t border-gray-200">
                                <th class="py-5 px-4 text-sm font-normal text-gray-500 text-left" scope="row">Volutpat
                                    feugiat mattis.</th>
                                <td class="py-5 pr-4">
                                    <!-- Heroicon name: solid/check -->
                                    <svg class="ml-auto h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clip-rule="evenodd" />
                                    </svg>
                                    <span class="sr-only">Yes</span>
                                </td>
                            </tr>

                            <tr class="border-t border-gray-200">
                                <th class="py-5 px-4 text-sm font-normal text-gray-500 text-left" scope="row">Tristique
                                    pellentesque ornare diam sapien.</th>
                                <td class="py-5 pr-4">
                                    <!-- Heroicon name: solid/check -->
                                    <svg class="ml-auto h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clip-rule="evenodd" />
                                    </svg>
                                    <span class="sr-only">Yes</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="border-t border-gray-200 px-4 pt-5">
                        <a href="#"
                            class="flex justify-center items-center w-full active:outline outline-tertiary shadow-lg shadow-tertiary/20 font-medium select-none text-sm rounded-lg px-6 py-2.5 bg-tertiary text-brand-tertiary">Buy
                            Premium</a>
                    </div>
                </section>
            </div>

            <!-- lg+ -->
            <div class="hidden lg:block">
                <table class="w-full h-px table-fixed">
                    <caption class="sr-only">
                        Pricing plan comparison
                    </caption>
                    <thead>
                        <tr>
                            <th class="pb-4 pl-6 pr-6 text-sm font-medium text-gray-900 text-left" scope="col">
                                <span class="sr-only">Feature by</span>
                                <span>Plans</span>
                            </th>

                            <th class="w-1/4 pb-4 px-6 text-lg leading-6 font-medium text-gray-900 text-left"
                                scope="col">Basic</th>

                            <th class="w-1/4 pb-4 px-6 text-lg leading-6 font-medium text-gray-900 text-left"
                                scope="col">Essential</th>

                            <th class="w-1/4 pb-4 px-6 text-lg leading-6 font-medium text-gray-900 text-left"
                                scope="col">Premium</th>
                        </tr>
                    </thead>
                    <tbody class="border-t border-gray-200 divide-y divide-gray-200">

                        <tr>
                            <th class="py-3 pl-6 bg-gray-50 text-sm font-medium text-gray-900 text-left" colspan="4"
                                scope="colgroup">Features</th>
                        </tr>

                        <tr>
                            <th class="py-5 pl-6 pr-6 text-sm font-normal text-gray-500 text-left" scope="row">Molestie
                                lobortis massa.</th>

                            <td class="py-5 px-6">
                                <!-- Heroicon name: solid/check -->
                                <svg class="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clip-rule="evenodd" />
                                </svg>
                                <span class="sr-only">Included in Basic</span>
                            </td>

                            <td class="py-5 px-6">
                                <!-- Heroicon name: solid/check -->
                                <svg class="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clip-rule="evenodd" />
                                </svg>
                                <span class="sr-only">Included in Essential</span>
                            </td>

                            <td class="py-5 px-6">
                                <!-- Heroicon name: solid/check -->
                                <svg class="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clip-rule="evenodd" />
                                </svg>
                                <span class="sr-only">Included in Premium</span>
                            </td>
                        </tr>

                        <tr>
                            <th class="py-5 pl-6 pr-6 text-sm font-normal text-gray-500 text-left" scope="row">Urna
                                purus felis.</th>

                            <td class="py-5 px-6">
                                <!-- Heroicon name: solid/check -->
                                <svg class="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clip-rule="evenodd" />
                                </svg>
                                <span class="sr-only">Included in Basic</span>
                            </td>

                            <td class="py-5 px-6">
                                <!-- Heroicon name: solid/check -->
                                <svg class="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clip-rule="evenodd" />
                                </svg>
                                <span class="sr-only">Included in Essential</span>
                            </td>

                            <td class="py-5 px-6">
                                <!-- Heroicon name: solid/check -->
                                <svg class="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clip-rule="evenodd" />
                                </svg>
                                <span class="sr-only">Included in Premium</span>
                            </td>
                        </tr>

                        <tr>
                            <th class="py-5 pl-6 pr-6 text-sm font-normal text-gray-500 text-left" scope="row">Tellus
                                pulvinar sit dictum.</th>

                            <td class="py-5 px-6">
                                <!-- Heroicon name: solid/minus -->
                                <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                        clip-rule="evenodd" />
                                </svg>
                                <span class="sr-only">Not included in Basic</span>
                            </td>

                            <td class="py-5 px-6">
                                <!-- Heroicon name: solid/check -->
                                <svg class="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clip-rule="evenodd" />
                                </svg>
                                <span class="sr-only">Included in Essential</span>
                            </td>

                            <td class="py-5 px-6">
                                <!-- Heroicon name: solid/check -->
                                <svg class="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clip-rule="evenodd" />
                                </svg>
                                <span class="sr-only">Included in Premium</span>
                            </td>
                        </tr>

                        <tr>
                            <th class="py-5 pl-6 pr-6 text-sm font-normal text-gray-500 text-left" scope="row">
                                Convallis.</th>

                            <td class="py-5 px-6">
                                <!-- Heroicon name: solid/minus -->
                                <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                        clip-rule="evenodd" />
                                </svg>
                                <span class="sr-only">Not included in Basic</span>
                            </td>

                            <td class="py-5 px-6">
                                <span class="block text-sm text-gray-700">Up to 20 users</span>
                            </td>

                            <td class="py-5 px-6">
                                <span class="block text-sm text-gray-700">Up to 50 users</span>
                            </td>
                        </tr>

                        <tr>
                            <th class="py-3 pl-6 bg-gray-50 text-sm font-medium text-gray-900 text-left" colspan="4"
                                scope="colgroup">Reporting</th>
                        </tr>

                        <tr>
                            <th class="py-5 pl-6 pr-6 text-sm font-normal text-gray-500 text-left" scope="row">
                                Adipiscing.</th>

                            <td class="py-5 px-6">
                                <!-- Heroicon name: solid/check -->
                                <svg class="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clip-rule="evenodd" />
                                </svg>
                                <span class="sr-only">Included in Basic</span>
                            </td>

                            <td class="py-5 px-6">
                                <!-- Heroicon name: solid/check -->
                                <svg class="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clip-rule="evenodd" />
                                </svg>
                                <span class="sr-only">Included in Essential</span>
                            </td>

                            <td class="py-5 px-6">
                                <!-- Heroicon name: solid/check -->
                                <svg class="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clip-rule="evenodd" />
                                </svg>
                                <span class="sr-only">Included in Premium</span>
                            </td>
                        </tr>

                        <tr>
                            <th class="py-5 pl-6 pr-6 text-sm font-normal text-gray-500 text-left" scope="row">Eget
                                risus integer.</th>

                            <td class="py-5 px-6">
                                <!-- Heroicon name: solid/minus -->
                                <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                        clip-rule="evenodd" />
                                </svg>
                                <span class="sr-only">Not included in Basic</span>
                            </td>

                            <td class="py-5 px-6">
                                <!-- Heroicon name: solid/check -->
                                <svg class="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clip-rule="evenodd" />
                                </svg>
                                <span class="sr-only">Included in Essential</span>
                            </td>

                            <td class="py-5 px-6">
                                <!-- Heroicon name: solid/check -->
                                <svg class="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clip-rule="evenodd" />
                                </svg>
                                <span class="sr-only">Included in Premium</span>
                            </td>
                        </tr>

                        <tr>
                            <th class="py-5 pl-6 pr-6 text-sm font-normal text-gray-500 text-left" scope="row">Gravida
                                leo urna velit.</th>

                            <td class="py-5 px-6">
                                <!-- Heroicon name: solid/minus -->
                                <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                        clip-rule="evenodd" />
                                </svg>
                                <span class="sr-only">Not included in Basic</span>
                            </td>

                            <td class="py-5 px-6">
                                <!-- Heroicon name: solid/minus -->
                                <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                        clip-rule="evenodd" />
                                </svg>
                                <span class="sr-only">Not included in Essential</span>
                            </td>

                            <td class="py-5 px-6">
                                <!-- Heroicon name: solid/check -->
                                <svg class="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clip-rule="evenodd" />
                                </svg>
                                <span class="sr-only">Included in Premium</span>
                            </td>
                        </tr>

                        <tr>
                            <th class="py-5 pl-6 pr-6 text-sm font-normal text-gray-500 text-left" scope="row">Elementum
                                ut dapibus mi feugiat cras nisl.</th>

                            <td class="py-5 px-6">
                                <!-- Heroicon name: solid/minus -->
                                <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                        clip-rule="evenodd" />
                                </svg>
                                <span class="sr-only">Not included in Basic</span>
                            </td>

                            <td class="py-5 px-6">
                                <!-- Heroicon name: solid/minus -->
                                <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                        clip-rule="evenodd" />
                                </svg>
                                <span class="sr-only">Not included in Essential</span>
                            </td>

                            <td class="py-5 px-6">
                                <!-- Heroicon name: solid/check -->
                                <svg class="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clip-rule="evenodd" />
                                </svg>
                                <span class="sr-only">Included in Premium</span>
                            </td>
                        </tr>

                        <tr>
                            <th class="py-3 pl-6 bg-gray-50 text-sm font-medium text-gray-900 text-left" colspan="4"
                                scope="colgroup">Support</th>
                        </tr>

                        <tr>
                            <th class="py-5 pl-6 pr-6 text-sm font-normal text-gray-500 text-left" scope="row">Sit
                                dignissim.</th>

                            <td class="py-5 px-6">
                                <!-- Heroicon name: solid/check -->
                                <svg class="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clip-rule="evenodd" />
                                </svg>
                                <span class="sr-only">Included in Basic</span>
                            </td>

                            <td class="py-5 px-6">
                                <!-- Heroicon name: solid/check -->
                                <svg class="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clip-rule="evenodd" />
                                </svg>
                                <span class="sr-only">Included in Essential</span>
                            </td>

                            <td class="py-5 px-6">
                                <!-- Heroicon name: solid/check -->
                                <svg class="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clip-rule="evenodd" />
                                </svg>
                                <span class="sr-only">Included in Premium</span>
                            </td>
                        </tr>

                        <tr>
                            <th class="py-5 pl-6 pr-6 text-sm font-normal text-gray-500 text-left" scope="row">Congue at
                                nibh et.</th>

                            <td class="py-5 px-6">
                                <!-- Heroicon name: solid/minus -->
                                <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                        clip-rule="evenodd" />
                                </svg>
                                <span class="sr-only">Not included in Basic</span>
                            </td>

                            <td class="py-5 px-6">
                                <!-- Heroicon name: solid/check -->
                                <svg class="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clip-rule="evenodd" />
                                </svg>
                                <span class="sr-only">Included in Essential</span>
                            </td>

                            <td class="py-5 px-6">
                                <!-- Heroicon name: solid/check -->
                                <svg class="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clip-rule="evenodd" />
                                </svg>
                                <span class="sr-only">Included in Premium</span>
                            </td>
                        </tr>

                        <tr>
                            <th class="py-5 pl-6 pr-6 text-sm font-normal text-gray-500 text-left" scope="row">Volutpat
                                feugiat mattis.</th>

                            <td class="py-5 px-6">
                                <!-- Heroicon name: solid/minus -->
                                <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                        clip-rule="evenodd" />
                                </svg>
                                <span class="sr-only">Not included in Basic</span>
                            </td>

                            <td class="py-5 px-6">
                                <!-- Heroicon name: solid/check -->
                                <svg class="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clip-rule="evenodd" />
                                </svg>
                                <span class="sr-only">Included in Essential</span>
                            </td>

                            <td class="py-5 px-6">
                                <!-- Heroicon name: solid/check -->
                                <svg class="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clip-rule="evenodd" />
                                </svg>
                                <span class="sr-only">Included in Premium</span>
                            </td>
                        </tr>

                        <tr>
                            <th class="py-5 pl-6 pr-6 text-sm font-normal text-gray-500 text-left" scope="row">Tristique
                                pellentesque ornare diam sapien.</th>

                            <td class="py-5 px-6">
                                <!-- Heroicon name: solid/minus -->
                                <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                        clip-rule="evenodd" />
                                </svg>
                                <span class="sr-only">Not included in Basic</span>
                            </td>

                            <td class="py-5 px-6">
                                <!-- Heroicon name: solid/minus -->
                                <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                        clip-rule="evenodd" />
                                </svg>
                                <span class="sr-only">Not included in Essential</span>
                            </td>

                            <td class="py-5 px-6">
                                <!-- Heroicon name: solid/check -->
                                <svg class="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clip-rule="evenodd" />
                                </svg>
                                <span class="sr-only">Included in Premium</span>
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr class="border-t border-gray-200">
                            <th class="sr-only" scope="row">Choose your plan</th>

                            <td class="pt-5 px-6">
                                <a href="#"
                                    class="flex justify-center items-center w-full active:outline outline-tertiary shadow-lg shadow-tertiary/20 font-medium select-none text-sm rounded-lg px-6 py-2.5 bg-tertiary text-brand-tertiary">Buy
                                    Basic</a>
                            </td>

                            <td class="pt-5 px-6">
                                <a href="#"
                                    class="flex justify-center items-center w-full active:outline outline-tertiary shadow-lg shadow-tertiary/20 font-medium select-none text-sm rounded-lg px-6 py-2.5 bg-tertiary text-brand-tertiary">Buy
                                    Essential</a>
                            </td>

                            <td class="pt-5 px-6">
                                <a href="#"
                                    class="flex justify-center items-center w-full active:outline outline-tertiary shadow-lg shadow-tertiary/20 font-medium select-none text-sm rounded-lg px-6 py-2.5 bg-tertiary text-brand-tertiary">Buy
                                    Premium</a>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    </div>
    </div>
    <!-- End Single Product Coding Here -->

    <?php wp_footer(); ?>

</body>

</html>