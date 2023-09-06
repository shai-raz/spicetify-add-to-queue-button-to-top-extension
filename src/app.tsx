function waitForElm(selector: string): Promise<Element> {
    return new Promise((resolve) => {
        const element = document.querySelector(selector);
        if (element) {
            return resolve(element);
        }

        const observer = new MutationObserver((mutations) => {
            const element = document.querySelector(selector);
            if (element) {
                observer.disconnect();
                resolve(element);
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });
    });
}
function changeContextMenuOrder(): void {}

async function main() {
    waitForElm("#context-menu").then((elm: Element) => {
        console.log("Element is ready");
        console.log(elm);
    });
}

export default main;
