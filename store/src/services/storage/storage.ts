export function saveToStorage(key: string, formData: object, status = true): void {
    const dataLS = { status, formData };
    const serializedData = JSON.stringify(dataLS);
    localStorage.setItem(key, serializedData);
}

export function loadFromStorage(key: string) {
    const serializedData = localStorage.getItem(key);
    if (serializedData === null) {
        return undefined;
    }
    return JSON.parse(serializedData);
}
