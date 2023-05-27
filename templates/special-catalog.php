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

<body class="w-full h-full bg-primary text-tertiary flex justify-center">
    <!-- Fahad: Use raw HTML in this page -->

    <!-- Start Single Product Coding Here -->
    <div class="appstore-special-catalog-wrapper  max-w-screen-2xl w-full h-full py-10 px-5 flex flex-col gap-5">
        <div class="text-4xl font-black">Special Catalog</div>
		<div class="flex flex-col space-y-10">
            <div class="text-lg font-extrabold">— Featured Catalog</div>
            <div class="flex flex-wrap gap-10 justify-evenly items-center">
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
                    <!-- CTA -->
                    <div class="flex gap-3 pt-3">
                        <button class="hover:shadow-lg bg-tertiary text-brand-white px-6 py-2 rounded-md font-bold">Buy
                            Now</button>
                        <button
                            class="hover:shadow-lg bg-primary border-2 border-tertiary px-6 py-2 rounded-md  font-bold">Live
                            Preview</button>
                    </div>
                </div>
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
                    <!-- CTA -->
                    <div class="flex gap-3 pt-3">
                        <button class="hover:shadow-lg bg-tertiary text-brand-white px-6 py-2 rounded-md font-bold">Buy
                            Now</button>
                        <button
                            class="hover:shadow-lg bg-primary border-2 border-tertiary px-6 py-2 rounded-md  font-bold">Live
                            Preview</button>
                    </div>
                </div>
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
		<div class="flex flex-col space-y-10">
            <div class="text-lg font-extrabold">— Popular Catalog</div>
            <div class="flex flex-wrap gap-10 justify-evenly items-center">
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
                    <!-- CTA -->
                    <div class="flex gap-3 pt-3">
                        <button class="hover:shadow-lg bg-tertiary text-brand-white px-6 py-2 rounded-md font-bold">Buy
                            Now</button>
                        <button
                            class="hover:shadow-lg bg-primary border-2 border-tertiary px-6 py-2 rounded-md  font-bold">Live
                            Preview</button>
                    </div>
                </div>
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
                    <!-- CTA -->
                    <div class="flex gap-3 pt-3">
                        <button class="hover:shadow-lg bg-tertiary text-brand-white px-6 py-2 rounded-md font-bold">Buy
                            Now</button>
                        <button
                            class="hover:shadow-lg bg-primary border-2 border-tertiary px-6 py-2 rounded-md  font-bold">Live
                            Preview</button>
                    </div>
                </div>
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
		<div class="flex flex-col space-y-10">
            <div class="text-lg font-extrabold">— Category Name</div>
            <div class="flex flex-wrap gap-10 justify-evenly items-center">
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
                    <!-- CTA -->
                    <div class="flex gap-3 pt-3">
                        <button class="hover:shadow-lg bg-tertiary text-brand-white px-6 py-2 rounded-md font-bold">Buy
                            Now</button>
                        <button
                            class="hover:shadow-lg bg-primary border-2 border-tertiary px-6 py-2 rounded-md  font-bold">Live
                            Preview</button>
                    </div>
                </div>
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
                    <!-- CTA -->
                    <div class="flex gap-3 pt-3">
                        <button class="hover:shadow-lg bg-tertiary text-brand-white px-6 py-2 rounded-md font-bold">Buy
                            Now</button>
                        <button
                            class="hover:shadow-lg bg-primary border-2 border-tertiary px-6 py-2 rounded-md  font-bold">Live
                            Preview</button>
                    </div>
                </div>
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
    </div>
    <!-- End Single Product Coding Here -->

    <?php wp_footer(); ?>
</body>

</html>