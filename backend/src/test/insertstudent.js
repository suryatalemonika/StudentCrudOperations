const axios = require('axios')

// Base URL of your API
const BASE_URL = "http://localhost:3000";

const addStudent = async () => {
    try {
        // Make GET request to the endpoint
        const response = await axios.post(`${BASE_URL}/students`, {
            name: 'monika',
            age: 25,
            email: 'monika@gmail.com'
        });

        // Log the response data
        console.log("Student Details:", response.data);
    } catch (error) {
        // Handle errors
        if (error.response) {
            // Server responded with a status other than 200
            console.error("Error Response:", error.response.data);
        } else if (error.request) {
            // Request was made but no response received
            console.error("No Response Received:", error.request);
        } else {
            // Something else happened
            console.error("Error:", error.message);
        }
    }
};

// Function to fetch student by ID
const getStudentById = async (studentId) => {
    try {
        // Make GET request to the endpoint
        const response = await axios.get(`${BASE_URL}/students/${studentId}`);

        // Log the response data
        console.log("Student Details:", response.data);
    } catch (error) {
        // Handle errors
        if (error.response) {
            // Server responded with a status other than 200
            console.error("Error Response:", error.response.data);
        } else if (error.request) {
            // Request was made but no response received
            console.error("No Response Received:", error.request);
        } else {
            // Something else happened
            console.error("Error:", error.message);
        }
    }
};

const getallStudents = async () => {
    try {
        // Make GET request to the endpoint
        const response = await axios.get(`${BASE_URL}/students/`);

        // Log the response data
        console.log("Student Details:", response.data);
    } catch (error) {
        // Handle errors
        if (error.response) {
            // Server responded with a status other than 200
            console.error("Error Response:", error.response.data);
        } else if (error.request) {
            // Request was made but no response received
            console.error("No Response Received:", error.request);
        } else {
            // Something else happened
            console.error("Error:", error.message);
        }
    }
};

const updateStudents = async (studentId) => {
    try {
        // Make GET request to the endpoint
            const response = await axios.put(`${BASE_URL}/students/${studentId}`, {
                name: 'rupali',
                age: 22,
                email: 'rupali@gmail.com'
            });

        // Log the response data
        console.log("Student Details:", response.data);
    } catch (error) {
        // Handle errors
        if (error.response) {
            // Server responded with a status other than 200
            console.error("Error Response:", error.response.data);
        } else if (error.request) {
            // Request was made but no response received
            console.error("No Response Received:", error.request);
        } else {
            // Something else happened
            console.error("Error:", error.message);
        }
    }
};

const deleteStudent = async (studentId) => {
    try {
        // Make GET request to the endpoint
        const response = await axios.delete(`${BASE_URL}/students/${studentId}`);

        // Log the response data
        console.log("Student Details:", response.data);
    } catch (error) {
        // Handle errors
        if (error.response) {
            // Server responded with a status other than 200
            console.error("Error Response:", error.response.data);
        } else if (error.request) {
            // Request was made but no response received
            console.error("No Response Received:", error.request);
        } else {
            // Something else happened
            console.error("Error:", error.message);
        }
    }
};

//addStudent()
//getStudentById(1);
getallStudents()
//updateStudents(1)
//deleteStudent(2)
