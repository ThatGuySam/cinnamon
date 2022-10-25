import { createStorage } from 'unstorage'
import localStorageDriver from 'unstorage/drivers/localstorage'


class MessageStorage {
    constructor () {
        this.storageBase = 'messages:'
        this.numberKey = 'number'
        this.bodyKey = 'body'

        this.storage = createStorage({
            driver: localStorageDriver({ base: this.storageBase })
        })
    }

    async getLatestMessage () {

        const storedNumber = await this.storage.getItem(this.numberKey)
        const storedBody = await this.storage.getItem(this.bodyKey)

        return {
            number: !!storedNumber ? String( storedNumber ) : '',
            body: !!storedBody ? String( storedBody ) : '',
        }
    }

    async setLatestMessage ( options = {} ) {
        const {
            number,
            body,
        } = options

        // So that the JavaScript engine can store both values at the same time
        await Promise.all([
            this.storage.setItem(this.numberKey, number),
            this.storage.setItem(this.bodyKey, body)
        ])

        // console.log( 'setLatestMessage', await this.getLatestMessage() )
    }
}

export const messageStorage = new MessageStorage()
