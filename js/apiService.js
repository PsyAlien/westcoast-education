var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const BASE_URL = "http://localhost:3000";
function request(url_1) {
    return __awaiter(this, arguments, void 0, function* (url, options = {}) {
        try {
            const response = yield fetch(`${BASE_URL}/${url}`, options);
            if (!response.ok)
                throw new Error(`HTTP error! status: ${response.status}`);
            return response.json();
        }
        catch (error) {
            console.error(`Request error (${url}):`, error);
            throw error;
        }
    });
}
export function fetchData(endpoint) {
    return request(endpoint);
}
export function postData(endpoint, data) {
    return request(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
}
export function patchData(endpoint, data) {
    return request(endpoint, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
}
export function deleteData(endpoint, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const numericId = Number(id); // 🔹 Convert to number before using it
        const url = `http://localhost:3000/${endpoint}/${numericId}`;
        try {
            console.log(`Sending DELETE request to: ${url}`);
            const response = yield fetch(url, { method: "DELETE" });
            if (!response.ok) {
                throw new Error(`Failed to delete ${endpoint} with ID ${numericId}. Response: ${response.statusText}`);
            }
            console.log(`Successfully deleted ${endpoint} with ID ${numericId}`);
        }
        catch (error) {
            console.error("Delete error:", error);
        }
    });
}
