import { config } from 'dotenv'
import { findUnique } from './project';
import request from './request'
config()

const getTokensFromContract = (contract, address) => {

    // contract, address
    let params = {
        hostname: 'api.etherscan.io',
        path: `/api?module=account&action=tokennfttx&contractaddress=${contract}&address=${address}&page=1&offset=100&startblock=0&endblock=27025780&sort=asc&apikey=${process.env.ETHERSCAN_API_KEY}`,
    }
    return request(params);
}



const gate = async (address, message, signature, profileId) => {

    const profile = await findUnique(profileId);

    if (!profile.rules) throw new Error("Unauthorized - No matching profile rules");

    const rules = await Promise.all(profile.rules.map(async (rule) => {
        return {
            etherscan_results: await getTokensFromContract(rule.reference.collectionAddress, address),
            details: rule,
        }
    }))

    const passes = rules.some((rule) => {
       const etherscan_results = JSON.parse(rule.etherscan_results);
       return etherscan_results.status === "1";
    })

   return {
       passes,
       ...profile,
    }
}

export default gate; 