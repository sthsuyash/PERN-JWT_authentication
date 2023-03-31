const db = require('../db');
const bcrypt = require('bcrypt');

// get user with matching id if authorized, if exists in database
exports.getUser = async (req, res) => {
    try {
        const user = await db.query("SELECT user_id, username, user_email FROM users WHERE user_id = $1", [req.user]);
        res.json(user.rows[0]);

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}


// edit user with matching id if authorized
exports.editUser = async (req, res) => {
    try {
        const { username, user_email } = req.body;
        const user = await db.query("UPDATE users SET username = $1, user_email = $2 WHERE user_id = $3 RETURNING *", [username, user_email, req.user]);
        res.json(user.rows[0]);

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// delete user with matching id if authorized
exports.deleteUser = async (req, res) => {
    try {
        const user = await db.query("DELETE FROM users WHERE user_id = $1", [req.user]);
        res.json(user.rows[0]);

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// change password if authorized and if the old password is correct
// old password should not be the same as the new password
exports.changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const user = await db.query("SELECT * FROM users WHERE user_id = $1", [req.user]);
        const validPassword = await bcrypt.compare(oldPassword, user.rows[0].password);
        if (!validPassword) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials',
            })
        }
        const saltRound = 10;
        const salt = await bcrypt.genSaltSync(saltRound);
        const bcryptPassword = await bcrypt.hash(newPassword, salt);
        const updatedUser = await db.query("UPDATE users SET password = $1 WHERE user_id = $2 RETURNING *", [bcryptPassword, req.user]);
        res.json(updatedUser.rows[0]);

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

