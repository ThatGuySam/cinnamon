function isPhoneNumberPath(pathString) {
    if (pathString === '_')
        return true

    const isNumber = /^\d+$/.test(pathString)
    return isNumber
}

function parsePhoneNumberPath(pathString) {
    if (pathString === '_')
        return ''

    const cleanedPath = pathString.replace(/\D/g, '')

    return cleanedPath
}

function makeSmsUrl(options = {}) {
    const {
        number,
        deviceType,
        params = {},
    } = options

    const cleanedNumber = parsePhoneNumberPath(number)

    const paramsString = Object.keys(params).map(key => `${key}=${encodeURIComponent(params[key])}`).join('&')

    const smsUrlParts = [
        'sms://',
        // Clean out any non-numeric characters
        cleanedNumber,
    ]

    // Add any params
    if (paramsString.length !== 0) {
        // Add post number slash
        smsUrlParts.push('/')

        // Add params starter char
        smsUrlParts.push(({
            android: '?',
            ios: '&',
        })[deviceType])

        // Add stringified params
        smsUrlParts.push(paramsString)
    }

    return smsUrlParts.join('')
}

function getSiteHost () {
    const hasWindow = typeof window !== 'undefined'

    if ( !hasWindow && window.location.href.length > 2 ) {
        return window.location.href
    }

    return 'https://localhost:3333'
}


const localhostName = getSiteHost()

export function makeLocalUrl(options = {}) {
    const {
        number,
        host = localhostName,
        params = {},
    } = options

    const url = new URL( host )

    // Empty url hash
    url.hash = ''

    url.pathname = number.length ? parsePhoneNumberPath(number) : '_'

    for (const [key, value] of Object.entries(params)) {
        url.searchParams.set(key, value)
    }

    return url.toString()
}

export function makeSmsUrls(options = {}) {
    const {
        number,
        params = {},
    } = options

    return {
        android: makeSmsUrl({
            number,
            deviceType: 'android',
            params,
        }),
        ios: makeSmsUrl({
            number,
            deviceType: 'ios',
            params,
        }),
    }
}

export function makeSmsUrlsFromUrl(url) {
    const {
        pathname,
        searchParams,
    } = new URL(url)

    const phoneNumber = decodeURIComponent(pathname.split('/')[1])

    const params = Object.fromEntries(searchParams)

    // if ( !isPhoneNumberPath( phoneNumber ) ) {
    //     throw new Error(`Invalid phone number: ${phoneNumber}`)
    // }

    return makeSmsUrls({
        number: phoneNumber,
        params,
    })
}
