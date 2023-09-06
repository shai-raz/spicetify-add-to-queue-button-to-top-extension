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
    let element: Element;

    while (!element || (element = waitForElm("#context-menu"))) {
        // element = await waitForElm("#context-menu")
        console.log("Element is ready");
        console.log(element);
    }
}

export default main;
