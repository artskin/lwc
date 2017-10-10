import { Element } from "engine";

function tmpl($api, $cmp, $slotset, $ctx) {
    return [$api.h(
        "section",
        {},
        [$api.t("Test")]
    )];
}

const Test = 1;
class ClassAndTemplate extends Element {
    constructor() {
        super();
        this.t = Test;
        this.counter = 0;
    }

    render() {
        return tmpl;
    }

}

export default ClassAndTemplate;