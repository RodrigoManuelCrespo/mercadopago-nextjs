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
            items: [{
                title: req.title,
                quantity: Number(req.quantity),
                unit_price: Number(req.price),
                currency_id: "ARS"
            }],
            back_urls: {
                success: "https://nextjs.org/docs/getting-started/installation",
                failure: "https://nextjs.org/docs/getting-started/installation",
                pending: "https://nextjs.org/docs/getting-started/installation",
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
