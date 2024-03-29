import { NextRequest, NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago"

const client = new MercadoPagoConfig({
    accessToken: process.env.ACCESS_TOKEN || ''
})

export async function GET(request: NextRequest, response: NextResponse) {
    try {
        return NextResponse.json({
            message: `Server mercadopago...`
        })
    } catch (error: any) {
        return NextResponse.json({
            message: `${error.message}`
        }, { status: 400 })
    }
}

export async function POST(request: NextRequest, response: NextResponse) {
    const req = await request.json();

    try {
        const body: any = {
            items: [...req.items],
            back_urls: {
                success: "http://localhost:19006/",
                failure: "http://localhost:19006/",
                pending: "http://localhost:19006/",
            },
            auto_return: "approved"
        }

        const preference = new Preference(client)
        const response = await preference.create({ body })

        return NextResponse.json({ id: response.id, url: response.sandbox_init_point });

    } catch (error: any) {
        return NextResponse.json(error.message, {
            status: 400,
        });
    }
}
