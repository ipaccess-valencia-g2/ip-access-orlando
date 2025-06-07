const db = require("../db/connection");
const jwt = require('jsonwebtoken');

const Verify = async function (req, res, next)
{
    try
    {

        const authHeader = req.headers["cookie"];

        if (!authHeader)
        {
            return res.sendStatus(401);
        }

        const cookie = authHeader.split("=")[1];
        jwt.verify(cookie, process.env.SECRET_ACCESS_TOKEN, async (err, decoded) =>
        {
            if (err)
            {
                return res.status(401).json({ message: "This session has expired. Please login" });
            }

            const id = decoded;
            const {data} = await db.execute(
                'SELECT * FROM users WHERE userID = ?',
                [id]
            );
            req.user = data;
            next();
        });
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
}

module.exports = Verify;