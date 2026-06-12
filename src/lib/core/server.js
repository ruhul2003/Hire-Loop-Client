const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const serverFetch = async (path) => {
    try {
        const res = await fetch(`${baseUrl}${path}`);

        // Handle bad HTTP statuses (401, 403, 404, 500, etc.)
        if (!res.ok) {
            console.error(`[serverFetch Error] Path: ${path} | Status: ${res.status}`);
            // You can add specific redirect logic for 401/403 here
            return null;
        }

        // Read the response as raw text first to see if it's empty
        const text = await res.text();
        if (!text) {
            return null; // Safe fallback if backend returns empty content
        }

        // Safely parse the valid JSON text
        return JSON.parse(text);
    } catch (error) {
        console.error(`[serverFetch Network/Parsing Exception] Path: ${path}:`, error);
        return null;
    }
}


export const serverMutation = async (path, data) => {
    try {
        const res = await fetch(`${baseUrl}${path}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            console.error(`[serverMutation Error] Path: ${path} | Status: ${res.status}`);
            return null;
        }

        const text = await res.text();
        if (!text) {
            return null; 
        }

        return JSON.parse(text);
    } catch (error) {
        console.error(`[serverMutation Exception] Path: ${path}:`, error);
        return null;
    }
}