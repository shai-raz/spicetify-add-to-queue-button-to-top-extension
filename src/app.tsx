const waitForElmToExist = (selector: string): Promise<Element> => {
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
};

const waitForElmToDisappear = (element: Element): Promise<void> => {
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
};

const findAddToQueueListElement = (listItems: HTMLCollection): HTMLLIElement | null => {
    if (!listItems) return null;
    let addToQueueElement: HTMLLIElement | null = null;

    for (let item of listItems) {
        const text = item.children[0].children[0].innerHTML;
        if (text.toLowerCase() === "add to queue") {
            addToQueueElement = item as HTMLLIElement;
            break;
        }
    }

    return addToQueueElement;
};

const changeContextMenuOrder = (contextMenu: Element): void => {
    const ul: HTMLUListElement = contextMenu.children[0] as HTMLUListElement;
    if (!ul) return;
    ul.style.display = "flex";
    ul.style.flexDirection = "column";
    
    const listItems: HTMLCollection = ul.children;
    const addToQueueListElement: HTMLLIElement | null = findAddToQueueListElement(listItems);
    if (!addToQueueListElement) return;

    addToQueueListElement.style.order = "-1";
};

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
