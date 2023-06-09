import { useState } from "react"

import { Button, Input } from 'antd';
import { addToIpfs } from "../../service/ipfs-service";
import { mintNFT } from "../../service/nft-service";
import { NftMeta } from "../../service/types";
import { useNavigate } from "react-router-dom"
import { messageBox } from "../../service/message-service";
import { storeMeta, storeNftImage } from '../../service/arweave-service';
import styles from './NftMintor.module.css';


function NftMintor() {

    const navigate = useNavigate()
    const [meta, updateMeta] = useState<NftMeta>({name: "", description: "", imageUri: "", uri: '', type: 'image'})
    const [uri, setUri] = useState("")
    const store = async (file: any) => {
        try {
            // const imageuri = await addToIpfs(file)
            const imageuri = await storeNftImage(file)
            messageBox("success", "", imageuri)
            setUri(imageuri);
        } catch (error) {
            if (error instanceof Error)
                messageBox("danger", "", error.message)
        }
    }
    const mint = async () => {
        try {
            const data: NftMeta = {...meta, imageUri: uri}
            const json = JSON.stringify(data);
            // const metauri = await addToIpfs(json)
            const metauri = await storeMeta(json)
            messageBox("success", "", metauri)
            const {success, tokenId} = await mintNFT(metauri);

            if (success && tokenId) {
                messageBox("success", "", tokenId?.toString())
                navigate("/personal/collectible-browse")
                // router.push("/mynft")
            } else {
                messageBox("danger", "", "mint failed")
            }
        } catch (error) {
            if (error instanceof Error)
                messageBox("danger", "", error.message)
        }
    }


    return (
        <div className={styles.CreatorWrapper}>
            <div className={styles.CreatorContainer}>

                <Input
                    placeholder="Asset Name"
                    className={styles.NftField}
                    onChange={(e) => updateMeta({...meta, name: e.target.value})}

                />


                <Input.TextArea
                    placeholder="Asset Description"
                    className={styles.NftField}
                    onChange={(e) => {
                        updateMeta({...meta, description: e.target.value})
                    }}
                />

                <Input
                    type='file'
                    placeholder="Asset Image"
                    className={styles.NftField}
                    onChange={(e) => {
                        e.target.files && store(e.target.files[0])
                    }}
                />

                {
                    uri && <img width="350" src={uri} className={styles.NftImage} alt="NFT图片"/>
                }

                <Button type="primary" onClick={mint}>
                    铸币
                </Button>


            </div>

        </div>
    )
}

export default NftMintor