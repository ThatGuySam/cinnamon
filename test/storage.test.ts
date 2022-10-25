import { expect, test } from 'vitest'

import {
    messageStorage
} from '~/helpers/storage'



test(`Can read and write to message storage`, async () => {
    // console.log('t.context.sitemapUrls', t.context.sitemapUrls)

    const emptyMessage = await messageStorage.getLatestMessage()

    expect( emptyMessage.body ).toEqual( '' )
    expect( emptyMessage.number ).toEqual( '' )

    await messageStorage.setLatestMessage({
        body: 'AMOUNT Guts',
        number: '19185550123',
    })

    const filledMessage = await messageStorage.getLatestMessage()

    expect( filledMessage.body ).toEqual( 'AMOUNT Guts' )
    expect( filledMessage.number ).toEqual( '19185550123' )

})
