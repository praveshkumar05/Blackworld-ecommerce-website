import axios from 'axios';

/**
 * Executes a common HTTP request with specified options.
 * @param {string} method - The HTTP method (e.g., 'GET', 'POST', etc.).
 * @param {Object} body - The request payload; required for methods like POST.
 * @param {Object} headers - Additional HTTP headers, defaults to application/json.
 * @param {string} url - The endpoint URL.
 * @returns {Promise<Object>} - The promise that resolves to the response data or error info.
 */
export const commonrequest = async (method, body, headers, url) => {
    const config = {
        method: method,
        url: url,
        headers: headers || { "Content-Type": "application/json" },
        data: body
    };

    try {
        const response = await axios(config);
        // Assuming the server responds with JSON data
        return { success: true, data: response.data };
    } catch (error) {
        // Handle errors more effectively
        console.error(`Error making ${method} request to ${url}`, error);
        return {
            success: false,
            message: error.response?.data?.message || 'An unknown error occurred',
            statusCode: error.response?.status
        };
    }
};
