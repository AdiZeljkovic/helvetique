import { timingSafeEqual } from "node:crypto";
import { revalidatePath, revalidateTag } from "next/cache";
import { CMS_OZNAKA } from "@/content/cms";

/**
 * PortMix CMS zove ovo poslije svake izmjene sadržaja helvetique.ba.
 * Poništava keširani odgovor CMS-a i stranice, pa naredna posjeta dobija novi sadržaj.
 */
export async function POST(req: Request) {
  const tajna = process.env.CMS_OSVJEZI_TAJNA ?? "";
  const poslano = req.headers.get("x-cms-tajna") ?? "";
  const ok =
    tajna.length > 0 &&
    poslano.length === tajna.length &&
    timingSafeEqual(Buffer.from(poslano), Buffer.from(tajna));
  if (!ok) return Response.json({ ok: false }, { status: 401 });

  revalidateTag(CMS_OZNAKA, { expire: 0 });
  revalidatePath("/", "layout");
  return Response.json({ ok: true });
}
