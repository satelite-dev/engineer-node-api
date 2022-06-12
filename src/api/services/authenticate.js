import jwt from 'jsonwebtoken';
import checkSignature from './checkSignature'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()



const findOrCreateUser = async ({ wallet }) => {

    const found = await prisma.user.findUnique({
        where: {
            wallet,
        },
        include : {
        	projects : true
        }
    })

    if (!found) {
        const newUser = {
            wallet,
        }
        return await prisma.user.create({ data: newUser })
    } else {
        return found
    }
}


const generateJWT = (user) => {
    return jwt.sign({
        data: {
            user
        }
    }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24});
}

const auth = async (wallet, signature, message) => {
    try {

        checkSignature(message, signature, wallet);

        const user = await findOrCreateUser({
            wallet,
        })

        return { token: generateJWT(user) };
    } catch (err) {
        console.log(err);
        throw new Error("Unauthorized")
    }

}

export default auth;
