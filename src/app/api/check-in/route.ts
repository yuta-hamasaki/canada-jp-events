import {NextResponse} from "next/server";import {checkIn} from "@/lib/check-in";
export async function POST(req:Request){/* Replace actor header with Clerk auth() in production. */const actor=req.headers.get("x-organizer-id");if(!actor)return NextResponse.json({error:"Unauthorized"},{status:401});const {token}=await req.json();return NextResponse.json(await checkIn(token,actor));}
