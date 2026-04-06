import { getTargets } from "@/service/targets"

export async function GET() {
    try {
        const result = await getTargets()
        return Response.json(result)
    } catch (error) {
        return Response.json({ error: "Server error" }, { status: 500 })
    }
}
