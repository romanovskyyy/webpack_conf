import { animateScroll } from 'react-scroll';

export const scrollToFirstError = (errors) => {
    const errorFields = getErrorFieldNames(errors);
    // Using breakable for loop
    for (let i = 0; i < errorFields.length; i++) {
        const fieldName = `position-${errorFields[i]}`;
        // Checking if the marker exists in DOM
        const elements = document.querySelectorAll(`[name="${fieldName}"]`);
        if (elements.length) {
            if (elements[0].outerHTML === '<div name="position-tradeNumber"></div>') {
                animateScroll.scrollTo(elements[0].offsetParent.offsetParent.offsetTop - 50); // animate directly to the right position
            } else {
                animateScroll.scrollTo(elements[0].offsetParent.offsetTop - 50); // animate directly to the right position
            }
            break;
        }
    }
};

const getErrorFieldNames = (obj, name = '') => {
    const errorArr = [];
    errorArr.push(
        Object.keys(obj)
            .map((key) => {
                const next = obj[key];
                if (next) {
                    if (typeof next === 'string') {
                        return name + key;
                    }
                    // Keep looking
                    if (next.map) {
                        errorArr.push(
                            next
                                .map((item, index) =>
                                    getErrorFieldNames(item, `${name}${key}[${index}].`)
                                )
                                .filter((o) => o)
                        );
                    }
                }
                return null;
            })
            .filter((o) => o)
    );
    return flatten(errorArr);
};

const flatten = (arr) => {
    return arr.reduce(
        (flat, toFlatten) => flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten),
        []
    );
};
