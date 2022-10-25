<script>
import getSynonyms from 'synonyms'
import { messageStorage } from '../helpers/storage.js'

function findSynonyms(word) {
    try {
        return getSynonyms(word).n
    }
    catch (error) {
        console.info('Error finding synonyms for', word)
        return []
    }
}

export default {
    data() {
        return {
            loaded: false,
            phoneNumber: '',
            body: '',
        }
    },
    computed: {
        synonyms() {
            const words = this.body.replace(/[^a-zA-Z]/g, ' ').split(' ')

            const synonyms = words.map((word) => {
                // Skip empty words
                if (word === '') return []

                const cleanedWord = word.toLowerCase()

                const wordSynomyms = findSynonyms(cleanedWord)

                console.log({ wordSynomyms })

                return wordSynomyms
            })

            return new Set(synonyms.flat())
        },

        synonymsString() {
            // If there are no words yet
            // return an empty string
            if (this.body.trim().length === 0) return ''

            // If there are no synonyms, return none found
            if (this.synonyms.length === 0) return 'No synonyms found'

            return this.synonyms.join(', ')
        },

    },
    mounted() {
        messageStorage.getLatestMessage()
            .then((message) => {
                this.phoneNumber = message.number
                this.body = message.body

                // Set state to loaded
                // so that our UI is revealed
                this.loaded = true
            })
    },
    methods: {
        // log(event) {
        //     console.log({
        //         event,
        //         value: event.target.value,
        //     })
        // },
        updateMessage(propertyName, value) {
            this[propertyName] = value

            // Update message storage
            // so that this new message is
            // available when the user
            // next loads the page
            messageStorage.setLatestMessage({
                body: this.body,
            })
        },
    },
}
</script>

<template>
    <div
        v-if="loaded !== true"
        class="h-screen w-full flex justify-center items-center"
    >
        <div
            class="flex gap-3 text-2xl font-bold"
        >
            <div class="animate-spin">
                ߷
            </div>Loading...
        </div>
    </div>
    <div
        v-else
        class="builder-container container flex flex-col md:flex-row gap-6 max-w-5xl mx-auto"
    >
        <div
            class="rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600 w-full"
        >
            <label for="name" class="block text-xs font-medium">Words</label>
            <textarea
                v-model="body"
                type="text"
                name="name"
                class="block w-full border-0 p-0 placeholder-gray-500 focus:ring-0 sm:text-sm bg-transparent"
                placeholder="Paste words here"
            />
        </div>

        <div
            class="rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600 w-full"
        >
            <label for="name" class="block text-xs font-medium">Synonyms </label>
            <textarea
                :value="synonymsString"
                type="text"
                name="name"
                class="block w-full border-0 p-0 placeholder-gray-500 focus:ring-0 sm:text-sm bg-transparent"
                placeholder=""
                readonly
            />
        </div>
    </div>
</template>
