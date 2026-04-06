import { ValidationError } from "@/lib/apiErrors"
import { setTargetCalories } from "@/service/targets"

export async function PUT(req: Request) {
    try {
        const body = await req.json()
        const { calories } = body

        if (!calories) {
            throw new ValidationError("calories is required")
        }
        if (isNaN(Number(calories))) {
            throw new ValidationError("calories must be a number")
        }
        if (Number(calories) < 0 || Number(calories) > 10000) {
            throw new ValidationError("calories must be between 0 and 10000")
        }

        await setTargetCalories(calories)
        return Response.json({ success: true, message: "Calorie target updated" })

    } catch (error) {
        if (error instanceof ValidationError) {
            return Response.json({ error: error.message }, { status: error.status })
        }
        return Response.json({ error: "Server error" }, { status: 500 })
    }
}
