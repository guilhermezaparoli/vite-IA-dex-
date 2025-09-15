import axios from "axios";


export const api = axios.create({
    baseURL: 'http://localhost:5555/',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5YjA2NzE3Ny02ZTJjLTQ0NWItODI5MS0xYWEwZjY2YjE3NzciLCJpYXQiOjE3NTc5Nzg1MjYsImV4cCI6MTc1Nzk3OTEyNn0.WJDz6mI8vZ5oiCTSiQy41SviEzRHr1zbdVW3_G4vra8"
    }
})

