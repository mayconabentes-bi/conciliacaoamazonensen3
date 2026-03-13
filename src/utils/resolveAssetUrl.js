const ABSOLUTE_URL_PATTERN = /^(?:[a-z]+:)?\/\//i;

export const resolveAssetUrl = (url) => {
    if (!url || typeof url !== 'string') return url;
    if (ABSOLUTE_URL_PATTERN.test(url) || url.startsWith('data:') || url.startsWith('blob:')) {
        return url;
    }

    const baseUrl = import.meta.env.BASE_URL || '/';
    if (url.startsWith(baseUrl)) return url;

    return `${baseUrl}${url.replace(/^\//, '')}`;
};
