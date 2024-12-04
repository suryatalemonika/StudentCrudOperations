const Employee = require('../models/employeeModel');

exports.listEmployees = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const employees = await Employee.find()
            .skip((page - 1) * limit)
            .limit(Number(limit));
        res.json(employees);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch employees' });
    }
};

exports.addOrEditEmployee = async (req, res) => {
    try {
        const { id, name, age, department, salary, phoneNumber } = req.body;

        if (!id) {
            const newEmployee = new Employee({ name, age, department, salary, phoneNumber });
            await newEmployee.save();
            res.json({ message: 'Employee added successfully' });
        } else {
            await Employee.findByIdAndUpdate(id, { name, age, department, salary, phoneNumber });
            res.json({ message: 'Employee updated successfully' });
        }
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ error: 'Duplicate phone number' });
        } else {
            console.log(req.body)
            console.log(error);
            res.status(500).json({ error: 'Failed to add/edit employee' });
        }
    }
};

exports.deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        await Employee.findByIdAndDelete(id);
        res.json({ message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete employee' });
    }
};

exports.getStatistics = async (req, res) => {
    try {
        const stats = {};

        stats.highestSalaryByDepartment = await Employee.aggregate([
            { $group: { _id: '$department', maxSalary: { $max: '$salary' } } },
        ]);

        stats.salaryRangeCount = await Employee.aggregate([
            {
                $bucket: {
                    groupBy: '$salary',
                    boundaries: [0, 50000, 100000, Infinity],
                    default: '100000+',
                    output: { count: { $sum: 1 } },
                },
            },
        ]);

        stats.youngestEmployeeByDepartment = await Employee.aggregate([
            { $sort: { age: 1 } },
            { $group: { _id: '$department', youngest: { $first: '$$ROOT' } } },
            { $project: { _id: 0, department: '$_id', name: '$youngest.name', age: '$youngest.age' } },
        ]);

        res.json(stats);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch statistics' });
    }
};
