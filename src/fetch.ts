interface ApiOptions {
    allow_notfound?: boolean
}

export async function apiFetch<T>(url: string, init?: RequestInit & ApiOptions): Promise<T | null> {
    const finalUrl = process.env.NEXT_PUBLIC_API_URL + url;
    // console.log('[fetch] Fetching', finalUrl);

    try {
        const res = await fetch(finalUrl, init);
        if (res.ok) {
            return await res.json();
        } else {
            if (res.status === 404) {
                return null;
            }
            console.log('[apiFetch] Request error: recieved code ' + res.status + ' from server!');
            const err = new Error('Request error: recieved code ' + res.status + ' from server!');
            (err as any).code = res.status; // attach status code to error object
            throw err;
        }
    } catch (e) {
        // this is bad error handling, but in certain cases it works
        console.error('[apiFetch] failed to fetch', e);
        return null;
    }
}

export function apiFetcher(url: string): Promise<any> {
    return apiFetch<any>(url);
}
