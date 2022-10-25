<script>
import { messageStorage } from '../helpers/storage.js'

export default {
    data() {
        return {
            loaded: false,
            phoneNumber: '',
            body: '',
            messageProviders: [
                { id: 1, name: 'SMS', value: true },
                { id: 1, name: 'Whatsapp' },
                { id: 2, name: 'Telegram' },
                { id: 3, name: 'Facebook' },
                { id: 4, name: 'WeChat' },
                { id: 5, name: 'Slack' },
                { id: 6, name: 'Discord' },
                { id: 7, name: 'Line' },
                // { id: 1, name: 'Signal' },
            ],
        }
    },
    methods: {
        // log(event) {
        //     console.log({
        //         event,
        //         value: event.target.value,
        //     })
        // },
        updateMessage ( propertyName, value ) {
            this[propertyName] = value

            // Update message storage
            // so that this new message is
            // available when the user
            // next loads the page
            messageStorage.setLatestMessage({
                number: this.phoneNumber,
                body: this.body,
            })
        },
    },
    mounted () {
        messageStorage.getLatestMessage()
            .then( message => {
                console.log({ message })
                this.phoneNumber = message.number
                this.body = message.body

                // Set state to loaded
                // so that our UI is revealed
                this.loaded = true
            })
    }
}
</script>

<template>
    <div
        v-if="loaded !== true"
        class="h-screen w-full flex justify-center items-center"
    >
        <div
            class="flex gap-3 text-2xl font-bold"
        ><div class="animate-spin">߷</div>Loading...</div>
    </div>
    <div
        v-else
        class="builder-container container flex flex-col md:flex-row gap-6 max-w-5xl mx-auto"
    >
        <div class="builder-device-container">
            <!-- phoneNumber: {{ phoneNumber }}
            message: {{ message }} -->
            <new-message
                :recipient="phoneNumber"
                :body="body"

                @update:recipient="updateMessage('phoneNumber', $event)"
                @update:body="updateMessage('body', $event)"
            />
        </div>

        <div class="options container space-y-6 p-6">
            <div
                id="options"
                class="text-xl font-light"
            >
                Options
            </div>

            <fieldset class="pointer-events-none px-6">
                <legend class="flex items-center gap-2 text-lg font-medium">
                    Messaging Providers
                </legend>
                <div class="relative mt-4 border-gray-200 divide-y divide-gray-500">
                    <div
                        v-for="(provider, providerIdx) in messageProviders"
                        :key="providerIdx"
                        class="opacity-25 relative flex items-start py-2"
                    >
                        <div class="min-w-0 flex-1 text-sm">
                            <label :for="`provider-${provider.id}`" class="font-medium select-none">{{ provider.name }}</label>
                        </div>
                        <div class="ml-3 flex items-center h-5">
                            <input
                                :id="`provider-${provider.id}`"
                                :name="`provider-${provider.id}`"
                                type="checkbox"
                                class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                :checked="provider?.value"
                            >
                        </div>
                    </div>

                    <div
                        class="absolute inset-0 flex flex-col justify-center items-center gap-3 px-6"
                        style="backdrop-filter: blur(1px);"
                    >
                        <div class="bg-gray-500 rounded-full px-2 text-center text-sm">
                            Providers Coming Soon
                        </div>
                        <a href="https://forms.gle/hcSthreX1xdWdoJPA" class="text-xs text-blue-500">
                            <button class="border border-blue-500 rounded px-2">Join Waitlist</button>
                        </a>
                    </div>
                </div>
            </fieldset>
        </div>
    </div>
</template>
