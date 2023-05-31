import { create as ipfsHttpClient } from "ipfs-http-client";
import { IPFS } from "../config";
import axios from 'axios'
const ipfs =  ipfsHttpClient({
    host: IPFS.domain,
    port: 5001,
    protocol: 'http'

})
export const storeMeta = async (data:any) => {

    const json = JSON.stringify(data);
    alert(json);
    try {
        const added = await ipfs.add(json);
        alert(added.path)
    }catch (error) {
        alert(error);
    }

}
export const addToIpfs = async (entity:any) : Promise<string> => {
    const added = await ipfs.add(entity)
    const cid = added.path
    const rst = IPFS.url_prefix + cid;
    return rst;
}