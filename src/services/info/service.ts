import Api from "../../common/twakeapi";
import assert from "assert";
// import config from "../../common/config";
import emojiData from '../../resources/emojis'

export default class InfoService {

    constructor(protected api: Api) {
    }


    getLocalizationStrings(lang: string) {

        let res = require('../../resources/localization/en.json')

        if (lang != 'en') {
            assert(/^[a-zA-Z]{2}$/.test(lang), 'wrong lang value')

            try {
                const loaded_lang = require(`../../resources/localization/${lang}.json`)
                res = {...res, ...loaded_lang}
            } catch (e) {
                // console.log(e)
                // do nothing
            }

        }

        return res
    }

    serverInfo() {
        return this.api.get('/ajax/core/version', {}).then(a => a.data).then(a => {

            if (a.auth && a.auth.console) {
                a.auth.console.mobile_endpoint_url = this.api.host + "/login?mobile_login=1"
            }
            a.core_endpoint_url = this.api.host
            a.socket_endpoint = {
                host: this.api.host,
                path: "/socket"
            }
            a.hostname = this.api.host.substr(this.api.host.indexOf("//")+2)
            a.ver = '123'
            return a
        })
    }

    emoji() {
        return new Promise(r => r(emojiData))
    }
}
