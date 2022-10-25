<template>
    <div
        class="copy-page-container container relative flex flex-col items-center min-h-screen overflow-hidden mx-auto"
    >
        <div class="new-message-container relative">
            <new-message
                :recipient="phoneNumber"
                :body="body"
                class="transform scale-75 absolute top-0 transform"
                :style="{
                    '-webkit-mask-image': 'linear-gradient(to top, rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, 0.75) 40%)',
                    '--un-translate-x': `${-1 * ((defaultMockupWidth / .75) / 2 )}px`,
                    '--un-translate-y': `${-1 * (defaultMockupHeight * 0.25)}px`,
                    //left: `${defaultMockupWidth / 2}px`,
                }"
            />
        </div>

        <div class="spacer pt-36 pb-48" />

        <a
            role="button"
            :href="smsLaunchUrl"
            class="copy-button relative inline-flex items-center px-6 py-3 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
            Copy Message
            <DuplicateIcon class="ml-3 -mr-1 h-5 w-5" aria-hidden="true" />
        </a>

        <div
            class="spacer h-64"
        />

        <a
            role="button"
            href="/"
            class="make-button relative inline-flex items-center px-6 py-3 border border-transparent text-xs opacity-25 font-light rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
            Make Copy Message Link
        </a>
    </div>
</template>

<script>
import device from 'current-device'
import { DuplicateIcon } from '@heroicons/vue/solid'
import { defaultMockupWidth, defaultMockupHeight } from '../components/new-message.vue'

import { makeSmsUrlsFromUrl } from '../helpers/make-sms-urls.js'
import { messageStorage } from '../helpers/storage.js'

// console.log('defaultMockupWidth', defaultMockupWidth)

const currentUrl = new URL(window.location.href)

const smsUrls = makeSmsUrlsFromUrl(window.location.href)

function getDeviceSmsLaunchUrl(os) {
    if (['macos', 'ios'].includes(os))
        return smsUrls.ios

    // Android by default
    return smsUrls.android
}

const smsLaunchUrl = getDeviceSmsLaunchUrl(device.os)
const smsLaunchUrlTarget = (device.os === 'android') ? '_blank' : '_self'

// console.log('smsLaunchUrl', smsLaunchUrl)

export default {
    components: {
        DuplicateIcon,
    },
    data() {
        return {
            smsLaunchUrl,
            defaultMockupWidth,
            defaultMockupHeight,
        }
    },
    computed: {
        phoneNumber() {
            const path = currentUrl.pathname.split('/')[1]

            if (path === '_') return ''

            return path
        },
        body() {
            // const bodyParam = currentUrl.searchParams.get('body')
            return currentUrl.searchParams.get('body')// decodeURIComponent(bodyParam)
        },
    },
    mounted() {
        // console.log('device.os', device.os)

        window.open(smsLaunchUrl, smsLaunchUrlTarget)

        // Store message in local storage
        messageStorage.setLatestMessage({
            number: this.phoneNumber,
            body: this.body,
        })
    },
}
</script>
