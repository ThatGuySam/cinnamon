<script>
import { defaultMockupWidth } from '../components/new-message.vue'

const headerLinks = [
    {
        label: 'How it works',
        href: 'https://www.youtube.com/shorts/0TaPuwKhuyM',
        target: '_blank',
    },
    {
        label: 'Help via Twitter',
        href: 'https://twitter.com/ThatGuySam/',
        target: '_blank',
    },
    {
        label: 'Made with ❤️ by Sam',
        href: 'https://samcarlton.com',
        target: '_blank',
    }
]

const footerLinks = [
    {
        label: 'Home',
        href: '/',
    },
    {
        label: 'Help',
        href: 'https://github.com/ThatGuySam/messagefill-community/discussions',
    },
    {
        label: 'Request a Feature',
        href: 'https://github.com/ThatGuySam/messagefill-community/discussions?category=Ideas',
    },
]

export default {
    data() {
        return {
            headerLinks,
            footerLinks,
            defaultMockupWidth,
        }
    },
}
</script>

<template>
    <div class="">
        <div class="container text-sm mt-5 mx-auto space-x-4 max-w-5xl">
            <!-- Prefill Discussion URLs: https://github.com/github/feedback/discussions/2999 -->
            <a
                v-for="link in headerLinks"
                :key="link.label"
                :href="link.href"
                :target="link?.target || '_self'"
                class="opacity-50 hover:opacity-90 underline"
            >{{ link.label }}</a>
        </div>

        <div class="build-page p-4">
            <builder
                class="relative"
                :style="{
                    transform: `translateX(${-1 * (defaultMockupWidth / 2) + 'px'})`,
                    left: `${defaultMockupWidth / 2}px`,
                }"
            />
        </div>

        <div class="mt-5 mx-auto text-center text-sm space-x-4">
            <!-- Prefill Discussion URLs: https://github.com/github/feedback/discussions/2999 -->
            <a
                v-for="link in footerLinks"
                :key="link.label"
                :href="link.href"
                class="opacity-50 hover:opacity-90 underline"
            >{{ link.label }}</a>
        </div>
    </div>
</template>
