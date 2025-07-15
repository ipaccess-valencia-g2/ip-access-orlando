//const express = require('express');
//const router = express.Router();
const db = require("../db/connection");
const jwt = require('jsonwebtoken');

const Verify = async function (req, res, next)
{
    try
    {
        const token =
            req.cookies.SessionID ||
            (req.headers.authorization && req.headers.authorization.split(' ')[1]);
        if (!token) return res.sendStatus(401);
        jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, async (err, decoded) =>
        {
            if (err)
            {
                return res.status(401).json({ message: "This session has expired. Please login" });
            }

            const id = decoded.id;
            const [data] = await db.execute('SELECT * FROM users WHERE userID = ?', [id]);
            req.user = data;
            next();
        });
    }
    catch (err)
    {
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

const VerifyRole = async function (req, res, next)
{
    try
    {
        const user = req.user;

        if (user[0].isStaff !== 1)
        {
            return res.status(401).json({
                status: "failed",
                message: "You are not authorized to view this page."
            })
        }
        next();
    }
    catch (err)
    {
        res.status(500).json({
            status: "error",
            code: 500,
            data: [],
            message: "Internal Server Error"
        });
    }
};

module.exports =
    {
        Verify: Verify,
        VerifyRole: VerifyRole
    };