import { NextResponse } from "next/server"

/**
 * Early-access email signup.
 *
 * Where signups go (first one configured wins):
 *  1. Shopify: creates a customer subscribed to email marketing, so you can
 *     email them with Shopify Email. Needs SHOPIFY_STORE_DOMAIN + SHOPIFY_ADMIN_TOKEN.
 *  2. Any webhook (Google Apps Script → Sheets, Formspree, Zapier…): SIGNUP_WEBHOOK_URL.
 */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const SHOPIFY_API_VERSION = "2025-10"

const CUSTOMER_CREATE = `
  mutation SubscribeCustomer($input: CustomerInput!) {
    customerCreate(input: $input) {
      customer { id }
      userErrors { field message }
    }
  }
`

type Result = "new" | "existing"

async function subscribeWithShopify(email: string, domain: string, token: string): Promise<Result> {
  const res = await fetch(`https://${domain}/admin/api/${SHOPIFY_API_VERSION}/graphql.json`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Shopify-Access-Token": token },
    body: JSON.stringify({
      query: CUSTOMER_CREATE,
      variables: {
        input: {
          email,
          tags: ["early-access", "website-signup"],
          emailMarketingConsent: {
            marketingState: "SUBSCRIBED",
            marketingOptInLevel: "SINGLE_OPT_IN",
          },
        },
      },
    }),
  })

  if (!res.ok) throw new Error(`Shopify responded with ${res.status}`)

  const json = await res.json()
  if (json.errors) throw new Error(JSON.stringify(json.errors))

  const userErrors: { message: string }[] = json.data?.customerCreate?.userErrors ?? []
  if (userErrors.length === 0) return "new"
  if (userErrors.some((e) => /taken/i.test(e.message))) return "existing"
  throw new Error(userErrors.map((e) => e.message).join(", "))
}

async function subscribeWithWebhook(email: string, url: string): Promise<Result> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, source: "senyales-website", signedUpAt: new Date().toISOString() }),
  })
  if (!res.ok) throw new Error(`Webhook responded with ${res.status}`)
  return "new"
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : ""

  if (!EMAIL_PATTERN.test(email) || email.length > 254) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 })
  }

  const { SHOPIFY_STORE_DOMAIN, SHOPIFY_ADMIN_TOKEN, SIGNUP_WEBHOOK_URL } = process.env

  try {
    let result: Result
    if (SHOPIFY_STORE_DOMAIN && SHOPIFY_ADMIN_TOKEN) {
      result = await subscribeWithShopify(email, SHOPIFY_STORE_DOMAIN, SHOPIFY_ADMIN_TOKEN)
    } else if (SIGNUP_WEBHOOK_URL) {
      result = await subscribeWithWebhook(email, SIGNUP_WEBHOOK_URL)
    } else {
      console.warn("Email signup received but no signup destination is configured:", email)
      return NextResponse.json(
        { error: "Signups are not open yet. Please try again soon." },
        { status: 503 }
      )
    }

    return NextResponse.json({
      message:
        result === "existing"
          ? "You're already on the list. The sign is coming."
          : "You're on the list. Watch for the sign.",
    })
  } catch (err) {
    console.error("Signup failed:", err)
    return NextResponse.json(
      { error: "We couldn't save your email right now. Please try again." },
      { status: 502 }
    )
  }
}
