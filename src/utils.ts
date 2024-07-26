export function joinPath(...parts: string[]) {
    return parts.join('/').replace(/\/+/g, '/');
}