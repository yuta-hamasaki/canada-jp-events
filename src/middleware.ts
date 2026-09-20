import {NextRequest,NextResponse} from "next/server";
export function middleware(req:NextRequest){const path=req.nextUrl.pathname;if(path==="/"){return NextResponse.redirect(new URL(`/ja`,req.url))}const locale=path.split("/")[1];if(!["ja","en","api"].includes(locale)&&!path.startsWith('/_next'))return NextResponse.redirect(new URL(`/ja${path}`,req.url));return NextResponse.next()}
export const config={matcher:["/((?!_next/static|_next/image|favicon.ico).*)"]};
