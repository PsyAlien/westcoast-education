const BASE_URL = "http://localhost:3000";

async function request(url: string, options = {}) {
    try {
        const response = await fetch(`${BASE_URL}/${url}`, options);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
    } catch (error) {
        console.error(`Request error (${url}):`, error);
        throw error;
    }
}

export function fetchData(endpoint: string) {
    return request(endpoint);
}

export function postData(endpoint: string, data: object) {
    return request(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
}

export function patchData(endpoint: string, data: object) {
    return request(endpoint, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
}

export function deleteData(endpoint: string, id: number) {
    return request(`${endpoint}/${id}`, { method: "DELETE" });
}
