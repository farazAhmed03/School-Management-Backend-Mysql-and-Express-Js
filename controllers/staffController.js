const Staff = require("../models/Staff");

// Add Staff
const addStaff = async (req, res) => {

    const { name, fatherName, cnic, phone, address, designation, salary, joiningDate } = req.body;

    try {
        if (!name || !designation) {
            return res.status(400).json({ msg: "Name and designation are required" });
        }

        if (cnic) {
            const cnicExists = await Staff.findOne({ where: { cnic } });
            if (cnicExists) {
                return res.status(400).json({ msg: "CNIC already registered" });
            }
        }

        const staff = await Staff.create({
            name,
            name,
            fatherName: fatherName || null,
            cnic: cnic || null,
            phone: phone || null,
            address: address || null,
            designation,
            salary: salary || 0,
            joiningDate: joiningDate || new Date()
        });

        res.status(201).json({
            msg: "Staff member added successfully",
            staff
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Server error" });
    }
}

// Get All Staff
const getAllStaff = async (req, res) => {
    try {
        const staff = await Staff.findAll({
            order: [["designation", "ASC"], ["name", "ASC"]]
        });
        res.json(staff);
    } catch (error) {
        res.status(500).json({ msg: "Server error" });
    }
};

// Update Staff
const updateStaff = async (req, res) => {
    try {
        const staff = await Staff.findByPk(req.params.id);
        if (!staff) return res.status(404).json({ msg: "Staff not found" });

        await staff.update(req.body);

        res.json({
            msg: "Staff updated successfully",
            staff
        });
    } catch (error) {
        res.status(500).json({ msg: "Server error" });
    }
};

// Delete Staff
const deleteStaff = async (req, res) => {
    try {
        const staff = await Staff.findByPk(req.params.id);
        if (!staff) return res.status(404).json({ msg: "Staff not found" });

        await staff.destroy();
        res.json({ msg: "Staff deleted successfully" });
    } catch (error) {
        res.status(500).json({ msg: "Server error" });
    }
};

module.exports = { addStaff, getAllStaff, updateStaff, deleteStaff };