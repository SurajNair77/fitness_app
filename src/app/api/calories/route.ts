import { ValidationError } from "@/lib/apiErrors"
import { addCalorieEntry } from "@/service/calories"

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { name, calories } = body

        if (!name) {
            throw new ValidationError("name is required")
        }
        if (typeof name !== 'string' || name.trim().length === 0) {
            throw new ValidationError("name must be a non-empty string")
        }
        if (name.length > 100) {
            throw new ValidationError("name must be less than 100 characters")
        }
        if (!calories) {
            throw new ValidationError("calories is required")
        }
        if (isNaN(Number(calories))) {
            throw new ValidationError("calories must be a number")
        }
        if (Number(calories) < 0 || Number(calories) > 10000) {
            throw new ValidationError("calories must be between 0 and 10000")
        }

        await addCalorieEntry(name.trim(), calories)
        return Response.json({ success: true, message: "Calorie entry added" }, { status: 201 })

    } catch (error) {
        if (error instanceof ValidationError) {
            return Response.json({ error: error.message }, { status: error.status })
        }
        return Response.json({ error: "Server error" }, { status: 500 })
    }
}
