
// import Cookies from 'cookies'

import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'
const prisma = new PrismaClient()

const findUser = async ({ wallet }) => {

    return await prisma.user.findUnique({
        where: {
            wallet,
        },
        include: {
            projects: true
        }
    })
}

const authMiddleware = async (req, res) => {
    try {
        // verify json web token
        const token = req.headers['authorization'];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return await findUser(decoded.data.user);
    } catch (err) {
        console.log(err);
        res.status(401).send('Unauthorized').end();
        return null
    }
}


export const auth = authMiddleware