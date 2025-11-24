const API_URL = 'https://jharv5qc67.execute-api.us-east-1.amazonaws.com'

export const userAPI = {
    async login(email, password) {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        })
        return response.json()
    },
    async register(userData) {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        })
        return response.json()
    }
}

export const menuAPI = {
    async getAllMenu() {
        const response = await fetch(`${API_URL}/menu`)
        return response.json()
    },

    async getFoodById(foodId) {
        const response = await fetch(`${API_URL}/menu/${foodId}`)
        if (!response.ok) {
            throw new Error('Food item not found')
        }
        return response.json()
    }
}

export const orderAPI = {
    async createOrder(orderData) {
        const response = await fetch(`${API_URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData)
        })
        return response.json()
    },

    async getOrdersByUserId(userId) {
        const response = await fetch(`${API_URL}/orders?userId=${userId}`)
        return response.json()
    }
}
