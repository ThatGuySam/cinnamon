


export class WebShare {
    constructor( options = {} ) {
        this.options = options
    }

    get canShare () {
        if ( typeof(navigator.canShare) !== 'function' ) {
            return false
        }

        if ( !navigator.canShare( this.options ) ) {
            return false
        }

        return true
    }

    async share () {

        if ( !this.canShare ) {
            console.info( 'WebShare: Cannot share' )

            return
        }

        try {

            await navigator.share( this.options )

        } catch (err) {
            if ( err.includes('AbortError') ) {
                console.info('User aborted share')

                return
            }

            console.error('Error sharing', err)
        }
    }
}

export function tryShare ( options = {} ) {
    const share = new WebShare( options )

    share.share()
}
