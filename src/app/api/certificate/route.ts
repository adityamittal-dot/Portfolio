import { readFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

const CERT_PATH = path.join(
  process.cwd(),
  "src",
  "private-assets",
  "basepair-internship-certificate.pdf",
);

export async function GET() {
  const file = await readFile(CERT_PATH);
  return new NextResponse(new Uint8Array(file), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "inline",
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
