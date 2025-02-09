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

export async function deleteData(endpoint: string, id: number) {
    const numericId = Number(id); // 🔹 Convert to number before using it
    const url = `http://localhost:3000/${endpoint}/${numericId}`;

    try {
        console.log(`Sending DELETE request to: ${url}`);
        const response = await fetch(url, { method: "DELETE" });

        if (!response.ok) {
            throw new Error(`Failed to delete ${endpoint} with ID ${numericId}. Response: ${response.statusText}`);
        }

        console.log(`Successfully deleted ${endpoint} with ID ${numericId}`);
    } catch (error) {
        console.error("Delete error:", error);
    }
}
