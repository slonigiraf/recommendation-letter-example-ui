import { numberToU8a, stringToU8a } from '@polkadot/util';

//Max JS Number value (9007199254740992) exceeds max Rust u32 value (4294967295)
//TODO: add exception handling
export function numberToU8ArrayOfLength(number, length) {
    const shortResult = numberToU8a(number)
    if (shortResult.length < length) {
        const firstZeros = new Array(length - shortResult.length).fill(0);
        var concatArray = new Uint8Array([...firstZeros, ...shortResult]);
        return concatArray
    } else {
        return shortResult;
    }
}
export function getPublicDataToSignByGuarantee(letterId, guaranteeU8, workerU8, amount) {
    return new Uint8Array([...numberToU8ArrayOfLength(letterId, 4), ...guaranteeU8, ...workerU8, ...numberToU8ArrayOfLength(amount, 16)])
}

export function getPrivateDataToSignByGuarantee(textHash, letterId, guaranteeU8, workerU8, amount) {
    return new Uint8Array([...stringToU8a(textHash), ...numberToU8ArrayOfLength(letterId, 4), ...guaranteeU8, ...workerU8, ...numberToU8ArrayOfLength(amount, 16)])
}

export function getDataToSignByWorker(letterId, guaranteeU8, workerU8, amount, guaranteeSignatureU8, employerU8) {
    return new Uint8Array([...numberToU8ArrayOfLength(letterId, 4), ...guaranteeU8, ...workerU8, ...numberToU8ArrayOfLength(amount, 16), ...guaranteeSignatureU8, ...employerU8])
}

export function sign(signer, data) {
    return signer.sign(data)
}

export async function getIPFSContentID(ipfs, content) {
    const file = await ipfs.add(content)
    return file.cid
}

export async function getIPFSDataFromContentID(ipfs, cid) {
    const text = []
    for await (const chunk of ipfs.cat(cid)) {
        text.push(chunk)
    }
    return text.toString()
}