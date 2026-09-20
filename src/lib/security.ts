import { createHash, randomBytes, timingSafeEqual } from "node:crypto";
export function createOpaqueToken(bytes=32){return randomBytes(bytes).toString("base64url")}
export function hashToken(token:string){const pepper=process.env.TOKEN_PEPPER;if(!pepper||pepper.length<32)throw new Error("TOKEN_PEPPER must contain at least 32 characters");return createHash("sha256").update(`${pepper}:${token}`).digest("hex")}
export function tokenMatches(token:string,hash:string){const actual=Buffer.from(hashToken(token));const expected=Buffer.from(hash);return actual.length===expected.length&&timingSafeEqual(actual,expected)}
export function normalizeEmail(email:string){return email.trim().toLowerCase()}
export function makeOrderNumber(){return `HND-${new Date().getUTCFullYear().toString().slice(-2)}${randomBytes(5).toString("hex").toUpperCase()}`}
export function makeTicketCode(){return `HND-${randomBytes(6).toString("hex").toUpperCase()}`}
