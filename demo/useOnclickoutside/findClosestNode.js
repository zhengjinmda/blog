const isNodeFound = (current, classNames) => {
    return classNames.reduce((result, className) => {
        return result || current.classList.contains(className);
    }, false);
};

const findClosestNode = (current, ignoreClass) => {
    const classNames = ignoreClass.split(' ');

    while (current.parentNode) {
        if (isNodeFound(current, classNames)) {
            return true;
        }
        current = current.parentNode;
    }
    return false;
};

export default findClosestNode