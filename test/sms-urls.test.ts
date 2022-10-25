import { expect, test } from 'vitest'

import {
    makeSmsUrlsFromUrl,
    makeLocalUrl,
} from '../src/helpers/make-sms-urls'

// test.before(async t => {
// })

const smsUrls = [
    {
        description: 'for Shortcode',
        input: 'http://localhost:3333/45777',
        android: 'sms://45777',
        ios: 'sms://45777',
    },
    {
        description: 'for Ten Digit',
        input: 'http://localhost:3333/19185550123?body=AMOUNT%20Guts',
        android: 'sms://19185550123/?body=AMOUNT%20Guts',
        ios: 'sms://19185550123/&body=AMOUNT%20Guts',
    },
    {
        description: 'for Ten Digit with dashes',
        input: 'http://localhost:3333/1-918-555-0123?body=AMOUNT%20Guts',
        android: 'sms://19185550123/?body=AMOUNT%20Guts',
        ios: 'sms://19185550123/&body=AMOUNT%20Guts',
    },
    {
        description: 'for Ten Digit with fancy formatting',
        input: 'http://localhost:3333/1 (918) 555-0123?body=AMOUNT%20Guts',
        android: 'sms://19185550123/?body=AMOUNT%20Guts',
        ios: 'sms://19185550123/&body=AMOUNT%20Guts',
    },
    {
        description: 'with Body',
        input: 'https://google.com/45777?body=AMOUNT%20Guts',
        android: 'sms://45777/?body=AMOUNT%20Guts',
        ios: 'sms://45777/&body=AMOUNT%20Guts',
    },
    {
        description: 'with Body and blank recipient',
        input: 'https://copy.gives/_?body=AMOUNT%20Guts',
        android: 'sms:///?body=AMOUNT%20Guts',
        ios: 'sms:///&body=AMOUNT%20Guts',
    },
    // https://copy.gives/94090?body=Wifi
    {
        description: 'for Notion Wifi',
        input: 'https://copy.gives/94090?body=Wifi',
        android: 'sms://94090/?body=Wifi',
        ios: 'sms://94090/&body=Wifi',
    },
]

for (const { description, input, android, ios } of smsUrls) {
    test(`Can correctly format sms URL ${description}`, () => {
        // console.log('t.context.sitemapUrls', t.context.sitemapUrls)

        const smsUrls = makeSmsUrlsFromUrl(input)

        // t.log({
        //     input,
        //     android
        //     ios
        // })

        expect(smsUrls.android).toEqual(android)
        expect(smsUrls.ios).toEqual(ios)
    })
}

type UrlMock = {
    description: string
    expectedUrl: string
    input: {
        number: string
        host?: string
        params: {
            body?: string
        }
    }
}

const localUrls:UrlMock[] = [
    {
        description: 'for Shortcode',
        expectedUrl: 'https://example.com/45777',
        input: {
            number: '45777',
            host: 'https://example.com/',
            params: {
                // body: 'AMOUNT Guts',
            },
        },
    },
    {
        description: 'for Ten Digit',
        expectedUrl: 'https://example.com/19185550123?body=AMOUNT+Guts',
        input: {
            number: '19185550123',
            host: 'https://example.com/',
            params: {
                body: 'AMOUNT Guts',
            },
        }
    },
    {
        description: 'for Ten Digit with dashes',
        expectedUrl: 'https://example.com/19185550123?body=AMOUNT+Guts',
        input: {
            number: '1-918-555-0123',
            host: 'https://example.com/',
            params: {
                body: 'AMOUNT Guts',
            },
        },
    },
    {
        description: 'for Ten Digit with fancy formatting',
        expectedUrl: 'https://example.com/19185550123?body=AMOUNT+Guts',
        input: {
            number: '1 (918) 555-0123',
            host: 'https://example.com/',
            params: {
                body: 'AMOUNT Guts',
            },
        },
    },
    {
        description: 'with Body',
        expectedUrl: 'https://example.com/45777?body=AMOUNT+Guts',
        input: {
            number: '45777',
            host: 'https://example.com/',
            params: {
                body: 'AMOUNT Guts',
            },
        },
    },
    {
        description: 'with Body and blank recipient',
        expectedUrl: 'https://example.com/_?body=AMOUNT+Guts',
        input: {
            number: '',
            host: 'https://example.com/',
            params: {
                body: 'AMOUNT Guts',
            },
        },
    },
    // https://copy.gives/94090?body=Wifi
    {
        description: 'for Notion Wifi',
        expectedUrl: 'https://example.com/94090?body=Wifi',
        input: {
            number: '94090',
            host: 'https://example.com/',
            params: {
                body: 'Wifi',
            },
        },
    },
]

for ( const mock of localUrls ) {
    test(`Can make local url ${ mock.description }`, () => {

        const localUrl = makeLocalUrl( mock.input )

        // Make sure the local url relative

        expect( mock.expectedUrl ).toEqual( localUrl )
    })
}
