import { stringToU8a, numberToU8a, u8aToHex } from '@polkadot/util';
import { Keyring } from '@polkadot/keyring';
import { cryptoWaitReady, signatureVerify } from '@polkadot/util-crypto';
import { fourDigitU8ArrayFromNumber } from './helpers.mjs';

await cryptoWaitReady();
const keyring = new Keyring({ type: 'sr25519', ss58Format: 42 });


function u32ToU8(integer) {
    return "";
}

// create Alice based on the development seed
let users = ['teacher', 'student', 'employer', 'malicious'];
users.forEach(
    user => {
        const key = keyring.addFromUri(user);
        console.log(`${user} hex: ${u8aToHex(key.publicKey)};`)
        console.log(`${user}  u8: [${key.publicKey}];`)
        console.log("-----------")
    }
);

const teacher = keyring.addFromUri('teacher');
const student = keyring.addFromUri('student');
const employer = keyring.addFromUri('employer');
const malicious = keyring.addFromUri('malicious');

//[letterId, guaranteeAddress, workerAddress, employerAddress, amount , guaranteeSignOverReceipt, workerSignOverInsurance ]

const letterId = 1;
let buf = Buffer.allocUnsafe(2);
buf.writeUInt8(0x3, 0);

console.log("letter id u8: " + letterId)
console.log("letter    id: " + fourDigitU8ArrayFromNumber(letterId))
console.log("-----------")

//sign transactions:
let skill_receipt_data = [0, 0, 0, 1, 228, 167, 81, 18, 204, 23, 38, 108, 155, 194, 90, 41, 194, 163, 58, 60, 89, 176, 227, 117, 233, 66, 197, 106, 239, 232, 113, 141, 216, 124, 78, 49, 178, 77, 57, 242, 36, 161, 83, 238, 138, 176, 187, 13, 7, 59, 100, 92, 45, 157, 163, 43, 133, 176, 199, 22, 118, 202, 133, 229, 161, 199, 255, 75, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10];
const teacher_signature = teacher.sign(skill_receipt_data);
console.log(`Teacher signature: ${teacher_signature}`);

let skill_insurance_data = [0, 0, 0, 1, 228, 167, 81, 18, 204, 23, 38, 108, 155, 194, 90, 41, 194, 163, 58, 60, 89, 176, 227, 117, 233, 66, 197, 106, 239, 232, 113, 141, 216, 124, 78, 49, 178, 77, 57, 242, 36, 161, 83, 238, 138, 176, 187, 13, 7, 59, 100, 92, 45, 157, 163, 43, 133, 176, 199, 22, 118, 202, 133, 229, 161, 199, 255, 75, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 96, 20, 15, 21, 11, 137, 10, 192, 129, 3, 154, 34, 203, 118, 28, 19, 176, 54, 165, 181, 227, 156, 70, 197, 73, 86, 226, 111, 137, 243, 69, 95, 41, 74, 25, 254, 228, 34, 212, 189, 141, 134, 194, 44, 229, 172, 27, 43, 67, 73, 73, 58, 61, 63, 37, 176, 120, 195, 153, 198, 46, 42, 231, 129, 166, 82, 220, 58, 28, 232, 181, 15, 154, 161, 152, 109, 179, 47, 157, 32, 202, 28, 33, 243, 219, 161, 164, 110, 173, 174, 79, 180, 188, 244, 227, 86];


const student_signature = student.sign(skill_insurance_data);
console.log(`skill_insurance_data: ${skill_insurance_data}`);
console.log(`Student signature: ${student_signature}`);



