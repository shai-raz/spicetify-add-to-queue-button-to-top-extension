function waitForElmToExist(selector: string): Promise<Element> {
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

function waitForElmToDisappear(element: Element): Promise<void> {
    return new Promise((resolve) => {
        const observer = new MutationObserver((mutations) => {
            if (!document.body.contains(element)) {
                resolve();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });
    });
}
function changeContextMenuOrder(contextMenu: Element): void {
    const children: HTMLCollection = contextMenu.children[0].children;
    [children[0], children[2]] = [children[2], children[0]];
}

async function main() {
    while (true) {
        const contextMenu: Element = await waitForElmToExist("#context-menu");
        console.log("Element is ready");
        console.log(contextMenu);
        changeContextMenuOrder(contextMenu);
        await waitForElmToDisappear(contextMenu);
        console.log("Element disappeared");
    }
}

export default main;
